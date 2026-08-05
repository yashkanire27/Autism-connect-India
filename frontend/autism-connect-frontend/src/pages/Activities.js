import React, { useEffect, useState } from "react";
import { activityApi } from "../services/api";
import ActivityFormModal from "../components/ActivityFormModal";

const placeholderImage = "https://picsum.photos/seed/activity-default/400/300";

const categories = [
  "COMMUNICATION", "SOCIAL_SKILLS", "MOTOR_SKILLS", "LEARNING", "SENSORY",
  "SPEECH", "CREATIVITY", "MEMORY", "SORTING", "MATCHING", "INDOOR", "OUTDOOR",
];

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const loadActivities = (params) => {
    setLoading(true);
    activityApi
      .getAll(params)
      .then((res) => setActivities(res.data))
      .catch(() => setError("Could not load activities."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCategory("");
    loadActivities(search ? { search } : undefined);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    setSearch("");
    loadActivities(value ? { category: value } : undefined);
  };

  const openAddForm = () => {
    setEditingActivity(null);
    setShowForm(true);
  };

  const openEditForm = (activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    if (editingActivity) {
      await activityApi.update(editingActivity.activityId, formData);
    } else {
      await activityApi.create(formData);
    }
    setShowForm(false);
    setEditingActivity(null);
    loadActivities();
  };

  const handleDelete = async (activityId) => {
    if (!window.confirm("Delete this activity? This cannot be undone.")) return;
    await activityApi.remove(activityId);
    loadActivities();
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <h2>Learning Activities</h2>
          <p style={{ color: "var(--color-text-muted)" }}>Add, edit, and browse activity cards.</p>
        </div>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 8 }}>
          <select className="form-control" value={category} onChange={handleCategoryChange} style={{ minWidth: 150 }}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c.replace("_", " ")}</option>
            ))}
          </select>
          <input
            className="form-control"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-secondary" type="submit">Search</button>
        </form>
      </div>

      {loading && <div className="spinner" />}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {activities.map((activity) => (
            <div key={activity.activityId} className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
              <img
                src={activity.imageUrl || placeholderImage}
                alt={activity.title}
                style={{ width: "100%", height: 140, objectFit: "cover" }}
                onError={(e) => { e.target.src = placeholderImage; }}
              />
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3>{activity.title}</h3>
                  <span style={{ fontSize: "0.75rem", background: "var(--color-blue-soft)", color: "var(--color-blue)", padding: "3px 10px", borderRadius: 20 }}>
                    {activity.difficulty}
                  </span>
                </div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: "8px 0" }}>{activity.description}</p>
                <p style={{ fontSize: "0.85rem" }}>
                  <strong>Duration:</strong> {activity.durationMinutes ? `${activity.durationMinutes} min` : "—"} ·{" "}
                  <strong>Age:</strong> {activity.ageGroup || "—"}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: 4 }}>
                  Category: {activity.category?.replace("_", " ")}
                </p>

                {(activity.youtubeLink || activity.instagramLink) && (
                  <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                    {activity.youtubeLink && (
                      <a href={activity.youtubeLink} target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", color: "#D93025", fontWeight: 600 }}>
                        ▶ Watch on YouTube
                      </a>
                    )}
                    {activity.instagramLink && (
                      <a href={activity.instagramLink} target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", color: "#C13584", fontWeight: 600 }}>
                        📷 View on Instagram
                      </a>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: "8px 0" }} onClick={() => openEditForm(activity)}>
                    Edit
                  </button>
                  <button
                    className="btn"
                    style={{ flex: 1, padding: "8px 0", background: "#FCEBEB", color: "#A32D2D" }}
                    onClick={() => handleDelete(activity.activityId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div
            className="glass-card"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", minHeight: 200 }}
            onClick={openAddForm}
          >
            <span style={{ fontWeight: 600, color: "var(--color-blue)" }}>+ Add Activity</span>
          </div>
        </div>
      )}

      {showForm && (
        <ActivityFormModal
          initialData={editingActivity}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingActivity(null); }}
        />
      )}
    </div>
  );
}
