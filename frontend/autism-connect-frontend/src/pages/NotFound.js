import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1 style={{ fontSize: "4rem", color: "var(--color-blue)" }}>404</h1>
      <p style={{ marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
