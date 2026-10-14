import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'activities.json');

app.use(cors());
app.use(express.json());

// Helper to read activities
function getActivities() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading activities file:', err);
    return [];
  }
}

// Helper to write activities
function saveActivities(data) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving activities file:', err);
    return false;
  }
}

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    module: 'activity-module',
    version: '1.0.0',
    description: 'Autism Connect Activity Backend Service',
    totalActivities: getActivities().length,
  });
});

// ----------------------------------------------------
// GET /api/activities
// Filter by category or search term (matches MegaProject Spring Boot API)
// ----------------------------------------------------
app.get('/api/activities', (req, res) => {
  const { category, search } = req.query;
  let list = getActivities();

  if (category) {
    const targetCat = String(category).trim().toUpperCase();
    list = list.filter((act) => act.category?.toUpperCase() === targetCat);
  }

  if (search) {
    const term = String(search).trim().toLowerCase();
    list = list.filter((act) => {
      const inTitle = act.title?.toLowerCase().includes(term);
      const inDesc = act.description?.toLowerCase().includes(term);
      const inBenefits = act.benefits?.toLowerCase().includes(term);
      const inInstructions = act.instructions?.toLowerCase().includes(term);
      const inMaterials = act.materialsNeeded?.toLowerCase().includes(term);
      return inTitle || inDesc || inBenefits || inInstructions || inMaterials;
    });
  }

  res.json(list);
});

// ----------------------------------------------------
// GET /api/activities/recommendations
// Smart recommendations based on Observational Assessment scores
// ----------------------------------------------------
app.get('/api/activities/recommendations', (req, res) => {
  const commScore = Number(req.query.comm ?? 80);
  const socialScore = Number(req.query.social ?? 75);
  const dailyScore = Number(req.query.daily ?? 85);

  const allActivities = getActivities();

  // Score categories weighting
  // Lower score = higher intervention priority for that domain
  const prioritizedCategories = [];

  if (commScore <= 80) {
    prioritizedCategories.push('COMMUNICATION', 'SPEECH');
  }
  if (socialScore <= 80) {
    prioritizedCategories.push('SOCIAL_SKILLS', 'MATCHING');
  }
  if (dailyScore <= 80) {
    prioritizedCategories.push('SENSORY', 'MOTOR_SKILLS', 'LEARNING', 'SORTING');
  }

  // Fallback defaults if all scores are high
  if (prioritizedCategories.length === 0) {
    prioritizedCategories.push('SOCIAL_SKILLS', 'COMMUNICATION', 'SENSORY', 'MOTOR_SKILLS');
  }

  // Filter and decorate with recommendation reasoning
  const recommended = allActivities
    .filter((act) => prioritizedCategories.includes(act.category))
    .slice(0, 6)
    .map((act) => {
      let reason = 'General developmental enrichment';
      if (['COMMUNICATION', 'SPEECH'].includes(act.category)) {
        reason = `Tailored for Communication & Gesture development (Current Score: ${commScore}%)`;
      } else if (['SOCIAL_SKILLS', 'MATCHING'].includes(act.category)) {
        reason = `Recommended for Social Interaction & Joint Attention (Current Score: ${socialScore}%)`;
      } else if (['SENSORY', 'MOTOR_SKILLS', 'SORTING', 'LEARNING'].includes(act.category)) {
        reason = `Supports Daily Sensory Preferences & Routines (Current Score: ${dailyScore}%)`;
      }
      return { ...act, recommendationReason: reason };
    });

  res.json({
    assessmentScores: { commScore, socialScore, dailyScore },
    prioritizedCategories,
    count: recommended.length,
    recommendations: recommended,
  });
});

// ----------------------------------------------------
// GET /api/activities/:id
// ----------------------------------------------------
app.get('/api/activities/:id', (req, res) => {
  const id = req.params.id;
  const list = getActivities();
  const found = list.find((act) => String(act.activityId) === String(id));

  if (!found) {
    return res.status(404).json({ message: `Activity with id ${id} not found` });
  }

  res.json(found);
});

// ----------------------------------------------------
// POST /api/activities
// ----------------------------------------------------
app.post('/api/activities', (req, res) => {
  const {
    title,
    description,
    imageUrl,
    difficulty,
    durationMinutes,
    ageGroup,
    materialsNeeded,
    benefits,
    instructions,
    youtubeLink,
    instagramLink,
    category,
  } = req.body;

  if (!title || !title.trim() || !category) {
    return res.status(400).json({ message: 'Title and category are required.' });
  }

  const list = getActivities();
  const maxId = list.reduce((max, act) => Math.max(max, Number(act.activityId) || 0), 0);
  const newActivity = {
    activityId: maxId + 1,
    title: title.trim(),
    description: description || '',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    difficulty: difficulty || 'EASY',
    durationMinutes: durationMinutes ? Number(durationMinutes) : null,
    ageGroup: ageGroup || '',
    materialsNeeded: materialsNeeded || '',
    benefits: benefits || '',
    instructions: instructions || '',
    youtubeLink: youtubeLink || '',
    instagramLink: instagramLink || '',
    category: category.toUpperCase(),
    createdAt: new Date().toISOString(),
  };

  list.push(newActivity);
  saveActivities(list);

  res.status(201).json(newActivity);
});

// ----------------------------------------------------
// PUT /api/activities/:id
// ----------------------------------------------------
app.put('/api/activities/:id', (req, res) => {
  const id = req.params.id;
  const list = getActivities();
  const index = list.findIndex((act) => String(act.activityId) === String(id));

  if (index === -1) {
    return res.status(404).json({ message: `Activity with id ${id} not found` });
  }

  const existing = list[index];
  const updated = {
    ...existing,
    ...req.body,
    activityId: existing.activityId, // protect ID
    durationMinutes: req.body.durationMinutes !== undefined ? (req.body.durationMinutes ? Number(req.body.durationMinutes) : null) : existing.durationMinutes,
  };

  list[index] = updated;
  saveActivities(list);

  res.json(updated);
});

// ----------------------------------------------------
// DELETE /api/activities/:id
// ----------------------------------------------------
app.delete('/api/activities/:id', (req, res) => {
  const id = req.params.id;
  const list = getActivities();
  const filtered = list.filter((act) => String(act.activityId) !== String(id));

  if (filtered.length === list.length) {
    return res.status(404).json({ message: `Activity with id ${id} not found` });
  }

  saveActivities(filtered);
  // Match Spring Boot ApiResponse format:
  res.json({ success: true, message: 'Activity deleted successfully' });
});

// ----------------------------------------------------
// Start Server
// ----------------------------------------------------
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🧩 Autism Connect Activity Backend running on port ${PORT}`);
  console.log(`👉 API base URL: http://localhost:${PORT}/api/activities`);
  console.log(`====================================================`);
});
