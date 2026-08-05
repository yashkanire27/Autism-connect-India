import React, { useEffect, useState } from "react";
import { activityApi } from "../services/api";
import { getRecommendedCategories } from "../utils/recommendations";

const placeholderImage = "https://picsum.photos/seed/activity-default/300/300";

/** Shows 3 activity suggestions matched to the child's autism level. */
export default function RecommendedActivities({ autismLevel }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const categories = getRecommendedCategories(autismLevel);

    Promise.all(categories.map((category) => activityApi.getAll({ category })))
      .then((responses) => {
        if (!mounted) return;
        const merged = responses.flatMap((res) => res.data);
        const unique = Array.from(new Map(merged.map((a) => [a.activityId, a])).values());
        setActivities(unique.slice(0, 3));
      })
      .catch(() => mounted && setActivities([]))
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [autismLevel]);

  if (loading) return <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Loading recommendations...</p>;
  if (activities.length === 0) return null;

  return (
    <div style={{ marginTop: 14, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12 }}>
      <p style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: 8 }}>Recommended activities</p>
      <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
        {activities.map((activity) => (
          <div key={activity.activityId} style={{ minWidth: 120, background: "rgba(255,255,255,0.6)", borderRadius: 12, overflow: "hidden" }}>
            <img
              src={activity.imageUrl || placeholderImage}
              alt={activity.title}
              style={{ width: "100%", height: 60, objectFit: "cover" }}
              onError={(e) => { e.target.src = placeholderImage; }}
            />
            <div style={{ padding: 8 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: 4 }}>{activity.title}</p>
              <div style={{ display: "flex", gap: 6 }}>
                {activity.youtubeLink && (
                  <a href={activity.youtubeLink} target="_blank" rel="noreferrer" style={{ fontSize: "0.7rem", color: "#D93025" }}>▶ Video</a>
                )}
                {activity.instagramLink && (
                  <a href={activity.instagramLink} target="_blank" rel="noreferrer" style={{ fontSize: "0.7rem", color: "#C13584" }}>📷 IG</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
