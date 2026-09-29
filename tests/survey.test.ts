import { describe, expect, it } from "vitest";

import { SURVEY_QUESTIONS, isSurveyComplete, toggleMultiSelect, validateRequiredAnswer } from "../src/lib/survey";

describe("survey validation", () => {
  it("requires a value for required single-choice questions", () => {
    expect(validateRequiredAnswer(SURVEY_QUESTIONS[0], {})).toBe("Please select an option.");
  });

  it("allows a required question to pass once answered", () => {
    expect(validateRequiredAnswer(SURVEY_QUESTIONS[0], { overallExperience: "Positive" })).toBeNull();
  });

  it("keeps multi-select answers stable while toggling", () => {
    const withOne = { campusConnection: ["Classes and faculty"] };
    const toggled = toggleMultiSelect(withOne, "campusConnection", "Friends and classmates");

    expect(toggled.campusConnection).toEqual(["Classes and faculty", "Friends and classmates"]);
    expect(toggleMultiSelect(toggled, "campusConnection", "Classes and faculty").campusConnection).not.toContain("Classes and faculty");
  });

  it("marks the mock complete only after all required answers are present", () => {
    const partial = {
      overallExperience: "Positive",
      campusConnection: "Connected",
    };

    expect(isSurveyComplete(partial)).toBe(false);
    expect(
      isSurveyComplete({
        ...partial,
        priorityAreas: ["Sense of belonging", "Wellness and mental health support"],
      }),
    ).toBe(true);
  });
});
