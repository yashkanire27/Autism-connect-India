import React, { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  imageUrl: "",
  difficulty: "EASY",
  durationMinutes: "",
  ageGroup: "",
  materialsNeeded: "",
  benefits: "",
  instructions: "",
  youtubeLink: "",
  instagramLink: "",
  category: "COMMUNICATION",
};

const categories = [
  "COMMUNICATION", "SOCIAL_SKILLS", "MOTOR_SKILLS", "LEARNING", "SENSORY",
  "SPEECH", "CREATIVITY", "MEMORY", "SORTING", "MATCHING", "INDOOR", "OUTDOOR",
];

/** Reusable Add/Edit form for an activity card, shown as a centered overlay. */
export default function ActivityFormModal({ initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData ? { ...emptyForm, ...initialData } : emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = !!initialData;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.category) {
      setError("Title and category are required.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...form,
        durationMinutes: form.durationMinutes ? Number(form.durationMinutes) : null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the activity.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(20, 20, 35, 0.45)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{ width: "90%", maxWidth: 520, background: "var(--color-white)", maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 18 }}>{isEditing ? "Edit Activity" : "Add Activity"}</h3>

        {error && <p style={{ color: "crimson", marginBottom: 12 }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" name="description" rows={2} value={form.description} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input className="form-control" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="/assets/activities/example.jpg" />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Difficulty</label>
              <select className="form-control" name="difficulty" value={form.difficulty} onChange={handleChange}>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Duration (minutes)</label>
              <input className="form-control" type="number" min="1" name="durationMinutes" value={form.durationMinutes} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Age Group</label>
              <input className="form-control" name="ageGroup" value={form.ageGroup} onChange={handleChange} placeholder="e.g. 3-6 years" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Category</label>
              <select className="form-control" name="category" value={form.category} onChange={handleChange}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c.replace("_", " ")}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Materials Needed</label>
            <input className="form-control" name="materialsNeeded" value={form.materialsNeeded} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Benefits</label>
            <textarea className="form-control" name="benefits" rows={2} value={form.benefits} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Instructions</label>
            <textarea className="form-control" name="instructions" rows={2} value={form.instructions} onChange={handleChange} />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>YouTube Link (demo video)</label>
              <input className="form-control" name="youtubeLink" value={form.youtubeLink} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Instagram Link</label>
              <input className="form-control" name="instagramLink" value={form.instagramLink} onChange={handleChange} placeholder="https://instagram.com/p/..." />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={saving}>
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
