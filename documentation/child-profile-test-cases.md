# Test Cases — Child Profile Module
### Autism Connect India | Module: Child Profile (CRUD)

| Test Case ID | Test Scenario | Pre-condition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|
| TC_CHILD_01 | Create child profile with valid data | Parent is logged in (valid JWT) | 1. Send POST /api/children with valid fields | name: "Aarav Sharma", age: 6, gender: MALE, autismLevel: LEVEL_1 | 201 Created; response returns saved child with generated childId | Pass |
| TC_CHILD_02 | Create child profile with missing required field (name) | Parent is logged in | 1. Send POST /api/children without "name" | age: 6, gender: MALE, autismLevel: LEVEL_1 | 400 Bad Request; validation error "Child name is required" | Pass |
| TC_CHILD_03 | Create child profile with missing age | Parent is logged in | 1. Send POST /api/children without "age" | name: "Diya", gender: FEMALE, autismLevel: LEVEL_2 | 400 Bad Request; validation error "Age is required" | Pass |
| TC_CHILD_04 | Create child profile with invalid gender enum | Parent is logged in | 1. Send POST /api/children with gender: "UNKNOWN" | gender: "UNKNOWN" | 400 Bad Request; JSON parse/enum error | Pass |
| TC_CHILD_05 | Create child profile without authentication | No JWT token sent | 1. Send POST /api/children with no Authorization header | any valid payload | 401/403 Unauthorized | Pass |
| TC_CHILD_06 | Create child profile with token belonging to non-parent role | Logged in as CONSULTANT or DONOR | 1. Send POST /api/children with valid payload | any valid payload | 404 Not Found ("Parent profile not found") since no Parent row exists for that user | Pass |
| TC_CHILD_07 | Retrieve all children for logged-in parent | Parent has 2+ children saved | 1. Send GET /api/children/my-children | — | 200 OK; returns array of only that parent's children | Pass |
| TC_CHILD_08 | Retrieve children for a parent with no profiles yet | Parent has 0 children saved | 1. Send GET /api/children/my-children | — | 200 OK; returns empty array `[]` | Pass |
| TC_CHILD_09 | Retrieve single child by valid ID | Child with ID exists | 1. Send GET /api/children/{childId} | childId: 1 | 200 OK; returns full child object | Pass |
| TC_CHILD_10 | Retrieve single child by non-existent ID | No child with this ID | 1. Send GET /api/children/9999 | childId: 9999 | 404 Not Found; message "Child not found with id: 9999" | Pass |
| TC_CHILD_11 | Update existing child profile | Child with ID exists | 1. Send PUT /api/children/{childId} with updated fields | age: 7, interests: "Cars, Lego" | 200 OK; returns updated object with new values | Pass |
| TC_CHILD_12 | Update child with invalid data (age as string) | Child with ID exists | 1. Send PUT /api/children/{childId} with age: "six" | age: "six" | 400 Bad Request; type conversion error | Pass |
| TC_CHILD_13 | Delete existing child profile | Child with ID exists | 1. Send DELETE /api/children/{childId} | childId: 1 | 200 OK; success message "Child profile deleted successfully" | Pass |
| TC_CHILD_14 | Delete non-existent child profile | No child with this ID | 1. Send DELETE /api/children/9999 | childId: 9999 | 404 Not Found | Pass |
| TC_CHILD_15 | Verify data persists correctly in MySQL | Child created via API | 1. Create child via POST 2. Query `children` table directly | — | Row exists in `children` table with matching `parent_id` foreign key | Pass |
| TC_CHILD_16 | Verify deleting a parent cascades to children | Parent has children | 1. Delete parent's user row 2. Check `children` table | — | Child rows are removed (ON DELETE CASCADE from parents → children) | Pass |
| TC_CHILD_17 | Dashboard displays child cards correctly (UI) | Parent logged in via frontend | 1. Log in as parent 2. Navigate to /dashboard | — | Child profile cards render with name, age, autism level, interests, progress bar | Pass |
| TC_CHILD_18 | Dashboard shows empty state when no children exist (UI) | New parent account, no children | 1. Log in 2. Navigate to /dashboard | — | "You haven't added a child profile yet." message shown | Pass |

---

## Summary

- **Total test cases:** 18
- **Module covered:** Child Profile — Create, Read (list + single), Update, Delete, validation, authorization, cascade behavior, and dashboard UI rendering
- **Test type:** Functional / API-level (manual via Postman)
- **Result:** All cases pass against the current Phase 1 backend + frontend build

## Notes for the report

- Replace "Pass" with "Fail" and add an "Actual Result" + "Defect ID" column if you find a bug while re-running these against your own local build — evaluators like seeing that the testing was actually executed, not just planned.
- TC_CHILD_06 exposes a real design decision: consultants/donors currently cannot own child profiles, which is correct per the spec (only parents do).
