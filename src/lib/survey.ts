export type SurveyQuestionType = "single" | "multi" | "text";

export type SurveyAnswerValue = string | string[] | undefined;

export type SurveyAnswers = Record<string, SurveyAnswerValue>;

export interface SurveyQuestion {
  id: string;
  prompt: string;
  type: SurveyQuestionType;
  required?: boolean;
  options?: string[];
  maxLength?: number;
  helperText?: string;
}

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: "overallExperience",
    prompt: "How would you rate your overall experience at UVA Wise?",
    type: "single",
    required: true,
    options: ["Very positive", "Positive", "Neutral", "Negative", "Very negative"],
  },
  {
    id: "campusConnection",
    prompt: "How connected do you currently feel to the UVA Wise community?",
    type: "single",
    required: true,
    options: ["Very connected", "Connected", "Somewhat connected", "Slightly connected", "Not connected"],
  },
  {
    id: "connectedSupport",
    prompt: "What helps you feel connected to campus?",
    type: "multi",
    options: [
      "Classes and faculty",
      "Friends and classmates",
      "Student organizations",
      "Athletics and campus events",
      "Residence life",
      "Campus jobs or service",
      "Campus traditions",
      "Other",
    ],
  },
  {
    id: "campusParticipation",
    prompt: "Which parts of campus life have you participated in recently?",
    type: "multi",
    options: [
      "Student organizations",
      "Athletics",
      "Arts and performances",
      "Service or volunteer work",
      "Academic events",
      "Residence-life activities",
      "Campus traditions",
      "None of these",
    ],
  },
  {
    id: "participationBarriers",
    prompt: "What makes it difficult to participate in campus life?",
    type: "multi",
    options: [
      "Time or schedule",
      "Transportation",
      "Cost",
      "Not knowing what is available",
      "Feeling unsure where I belong",
      "Work or family responsibilities",
      "Accessibility or accommodation needs",
      "Nothing currently",
      "Other",
    ],
  },
  {
    id: "priorityAreas",
    prompt: "Which areas should UVA Wise prioritize improving?",
    type: "multi",
    required: true,
    maxLength: 3,
    options: [
      "Sense of belonging",
      "Student activities",
      "Communication about events",
      "Dining or common spaces",
      "Residence life",
      "Academic support",
      "Wellness and mental health support",
      "Transportation or parking",
      "Career preparation",
      "Other",
    ],
  },
  {
    id: "whatWorks",
    prompt: "What is one thing UVA Wise is doing well for students?",
    type: "text",
    maxLength: 500,
    helperText: "Optional short response.",
  },
  {
    id: "oneImprovement",
    prompt: "If you could improve one part of campus life, what would you change?",
    type: "text",
    maxLength: 500,
    helperText: "Optional short response.",
  },
];

export function toggleMultiSelect(answers: SurveyAnswers, questionId: string, optionValue: string): SurveyAnswers {
  const current = Array.isArray(answers[questionId]) ? (answers[questionId] as string[]) : [];
  const next = current.includes(optionValue)
    ? current.filter((value) => value !== optionValue)
    : [...current, optionValue];

  return {
    ...answers,
    [questionId]: next,
  };
}

export function validateRequiredAnswer(question: SurveyQuestion, answers: SurveyAnswers): string | null {
  const value = answers[question.id];

  if (!question.required) {
    return null;
  }

  if (question.type === "single") {
    return typeof value === "string" && value.trim().length > 0 ? null : "Please select an option.";
  }

  if (question.type === "multi") {
    if (!Array.isArray(value) || value.length === 0) {
      return "Please choose at least one option.";
    }

    if (question.maxLength && value.length > question.maxLength) {
      return `Please choose no more than ${question.maxLength} options.`;
    }

    return null;
  }

  if (question.type === "text") {
    return typeof value === "string" && value.trim().length > 0 ? null : "Please provide a response.";
  }

  return null;
}

export function isSurveyComplete(answers: SurveyAnswers): boolean {
  return SURVEY_QUESTIONS.every((question) => !question.required || validateRequiredAnswer(question, answers) === null);
}
