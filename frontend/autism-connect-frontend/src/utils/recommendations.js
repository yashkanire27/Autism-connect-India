// Maps each autism level to the activity categories most commonly recommended
// by occupational/behavioral therapists for that level. This is a starting
// heuristic for the demo — a real system would factor in the child's
// interests and therapist notes too.
const LEVEL_CATEGORY_MAP = {
  LEVEL_1: ["SOCIAL_SKILLS", "COMMUNICATION", "CREATIVITY"],
  LEVEL_2: ["SENSORY", "MOTOR_SKILLS", "MATCHING"],
  LEVEL_3: ["SENSORY", "COMMUNICATION", "SORTING"],
};

export function getRecommendedCategories(autismLevel) {
  return LEVEL_CATEGORY_MAP[autismLevel] || ["LEARNING"];
}
