import React, { useState } from "react";

const emptyForm = {
  name: "",
  age: "",
  gender: "MALE",
  autismLevel: "LEVEL_1",
  interests: "",
  communicationSkills: "",
  behaviorNotes: "",
  therapistNotes: "",
  medicalNotes: "",
  favoriteActivities: "",
};

/**
 * Reusable Add/Edit child form, shown as a centered overlay.
 * Pass `initialData` to edit an existing child, or leave it null to create a new one.
 */
export default function ChildFormModal({ initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData ? { ...emptyForm, ...initialData } : emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = !!initialData;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.age) {
      setError("Name and age are required.");
      return;
    }

    setSaving(true);
    try {
      await onSave({ ...form, age: Number(form.age) });
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the child profile.");
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
        style={{ width: "90%", maxWidth: 480, background: "var(--color-white)", maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 18 }}>{isEditing ? "Edit Child Profile" : "Add Child Profile"}</h3>

        {error && <p style={{ color: "crimson", marginBottom: 12 }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Child's Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Age</label>
              <input className="form-control" type="number" min="1" max="18" name="age" value={form.age} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Gender</label>
              <select className="form-control" name="gender" value={form.gender} onChange={handleChange}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Autism Level</label>
            <select className="form-control" name="autismLevel" value={form.autismLevel} onChange={handleChange}>
              <option value="LEVEL_1">Level 1</option>
              <option value="LEVEL_2">Level 2</option>
              <option value="LEVEL_3">Level 3</option>
            </select>
          </div>

          <div className="form-group">
            <label>Interests</label>
            <input className="form-control" name="interests" value={form.interests} onChange={handleChange} placeholder="e.g. Cars, puzzles, music" />
          </div>

          <div className="form-group">
            <label>Communication Skills</label>
            <input className="form-control" name="communicationSkills" value={form.communicationSkills} onChange={handleChange} placeholder="e.g. Uses short phrases" />
          </div>

          <div className="form-group">
            <label>Behavior Notes</label>
            <textarea className="form-control" name="behaviorNotes" rows={2} value={form.behaviorNotes} onChange={handleChange} placeholder="e.g. Gets overwhelmed by loud noises" />
          </div>

          <div className="form-group">
            <label>Therapist Notes</label>
            <textarea className="form-control" name="therapistNotes" rows={2} value={form.therapistNotes} onChange={handleChange} placeholder="Notes from the child's therapist" />
          </div>

          <div className="form-group">
            <label>Medical Notes</label>
            <textarea className="form-control" name="medicalNotes" rows={2} value={form.medicalNotes} onChange={handleChange} placeholder="Allergies, medications, diagnoses" />
          </div>

          <div className="form-group">
            <label>Favorite Activities</label>
            <input className="form-control" name="favoriteActivities" value={form.favoriteActivities} onChange={handleChange} placeholder="e.g. Shape matching, color match" />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={saving}>
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Child"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
