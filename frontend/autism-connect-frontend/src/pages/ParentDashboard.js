import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { childApi } from "../services/api";
import ChildFormModal from "../components/ChildFormModal";
import RecommendedActivities from "../components/RecommendedActivities";

export default function ParentDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingChild, setEditingChild] = useState(null);

  const loadChildren = () => {
    setLoading(true);
    childApi
      .myChildren()
      .then((res) => setChildren(res.data))
      .catch(() => setError("Could not load your children's profiles."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadChildren();
  }, []);

  const openAddForm = () => {
    setEditingChild(null);
    setShowForm(true);
  };

  const openEditForm = (child) => {
    setEditingChild(child);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    if (editingChild) {
      await childApi.update(editingChild.childId, formData);
    } else {
      await childApi.create(formData);
    }
    setShowForm(false);
    setEditingChild(null);
    loadChildren();
  };

  const handleDelete = async (childId) => {
    if (!window.confirm("Delete this child's profile? This cannot be undone.")) return;
    await childApi.remove(childId);
    loadChildren();
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h2>Welcome back, {user?.fullName?.split(" ")[0]} 👋</h2>
      <p style={{ color: "var(--color-text-muted)", marginBottom: 30 }}>
        Add your child's profile below, then edit or remove it anytime to see the CRUD flow in action.
      </p>

      {loading && <div className="spinner" />}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && children.length === 0 && (
        <div className="glass-card" style={{ textAlign: "center", marginBottom: 24 }}>
          <p>You haven't added a child profile yet.</p>
        </div>
      )}

      {!loading && (
        <div className="grid">
          {children.map((child) => (
            <div key={child.childId} className="glass-card">
              <h3>{child.name}</h3>
              <p style={{ color: "var(--color-text-muted)" }}>
                Age {child.age} · {child.autismLevel?.replace("_", " ")}
              </p>
              <p style={{ marginTop: 10 }}><strong>Interests:</strong> {child.interests || "—"}</p>
              <p style={{ marginTop: 6 }}><strong>Communication:</strong> {child.communicationSkills || "—"}</p>
              <p style={{ marginTop: 6, fontSize: "0.85rem", color: "var(--color-text-muted)" }}><strong>Behavior notes:</strong> {child.behaviorNotes || "—"}</p>
              <p style={{ marginTop: 4, fontSize: "0.85rem", color: "var(--color-text-muted)" }}><strong>Therapist notes:</strong> {child.therapistNotes || "—"}</p>
              <p style={{ marginTop: 4, fontSize: "0.85rem", color: "var(--color-text-muted)" }}><strong>Medical notes:</strong> {child.medicalNotes || "—"}</p>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button className="btn btn-secondary" style={{ flex: 1, padding: "8px 0" }} onClick={() => openEditForm(child)}>
                  Edit
                </button>
                <button
                  className="btn"
                  style={{ flex: 1, padding: "8px 0", background: "#FCEBEB", color: "#A32D2D" }}
                  onClick={() => handleDelete(child.childId)}
                >
                  Delete
                </button>
              </div>

              <RecommendedActivities autismLevel={child.autismLevel} />
            </div>
          ))}

          <div
            className="glass-card"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            onClick={openAddForm}
          >
            <span style={{ fontWeight: 600, color: "var(--color-blue)" }}>+ Add Child Profile</span>
          </div>
        </div>
      )}

      {showForm && (
        <ChildFormModal
          initialData={editingChild}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingChild(null); }}
        />
      )}
    </div>
  );
}
