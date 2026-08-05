import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const stats = [
  { label: "Families Supported", value: "0" },
  { label: "Verified Consultants", value: "0" },
  { label: "Learning Activities", value: "0" },
  { label: "Success Stories", value: "0" },
];

const features = [
  { icon: "🧩", title: "Interactive Activities", desc: "Curated learning activities across communication, motor, and sensory skills." },
  { icon: "📊", title: "Progress Tracking", desc: "Daily, weekly, and monthly charts to see how your child is growing." },
  { icon: "👩‍⚕️", title: "Expert Consultants", desc: "Book appointments with verified specialists in your preferred language." },
  { icon: "🎮", title: "Educational Puzzles", desc: "Fun, rewarding games that build memory, matching, and motor skills." },
  { icon: "🌐", title: "Multilingual", desc: "Available in English, Hindi, Marathi, and Kannada." },
  { icon: "💚", title: "Community & Donations", desc: "A support network that helps fund therapy and resources for families in need." },
];

const faqs = [
  { q: "Is Autism Connect India free to use?", a: "Yes, core features including activities and progress tracking are free for every parent." },
  { q: "How do I book a consultant?", a: "Go to the Consultants page, choose a specialist, and pick an available time slot." },
  { q: "Can I use the platform in Hindi or Marathi?", a: "Yes, switch languages anytime from the navigation bar." },
];

export default function Landing() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>{t("hero_title")}</h1>
          <p>{t("hero_subtitle")}</p>
          <Link to="/register" className="btn btn-primary">{t("hero_cta")}</Link>
        </div>
      </section>

      <section className="container" style={{ padding: "40px 20px" }}>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {stats.map((s) => (
            <div key={s.label} className="glass-card" style={{ textAlign: "center" }}>
              <h2 style={{ color: "var(--color-blue)" }}>{s.value}</h2>
              <p style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>{t("why_choose_us")}</h2>
        <div className="grid">
          {features.map((f) => (
            <div key={f.title} className="glass-card">
              <div style={{ fontSize: "2rem" }}>{f.icon}</div>
              <h3 style={{ margin: "12px 0 8px" }}>{f.title}</h3>
              <p style={{ color: "var(--color-text-muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>{t("faq")}</h2>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {faqs.map((f) => (
            <div key={f.q} className="glass-card" style={{ marginBottom: 16 }}>
              <strong>{f.q}</strong>
              <p style={{ color: "var(--color-text-muted)", marginTop: 8 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hero" style={{ padding: "60px 0" }}>
        <div className="container">
          <h2>Ready to start your child's journey?</h2>
          <p>Join thousands of parents already using Autism Connect India.</p>
          <Link to="/register" className="btn btn-primary">Create Free Account</Link>
        </div>
      </section>
    </div>
  );
}
