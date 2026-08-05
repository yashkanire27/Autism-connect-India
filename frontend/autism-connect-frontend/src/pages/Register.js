import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phone: "", role: "PARENT" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="glass-card auth-card">
        <h2 style={{ marginBottom: 20, textAlign: "center" }}>Create Your Account</h2>
        {error && <p style={{ color: "crimson", marginBottom: 12 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input className="form-control" name="fullName" value={form.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
          </div>
          <div className="form-group">
            <label>I am a</label>
            <select className="form-control" name="role" value={form.role} onChange={handleChange}>
              <option value="PARENT">Parent</option>
              <option value="CONSULTANT">Consultant</option>
              <option value="DONOR">Donor</option>
            </select>
          </div>
          <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: 16 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
