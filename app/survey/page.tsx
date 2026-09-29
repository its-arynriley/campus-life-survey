"use client";

import { useEffect, useRef, useState } from "react";

import { SURVEY_QUESTIONS, toggleMultiSelect, validateRequiredAnswer, type SurveyAnswers } from "../../src/lib/survey";

export default function SurveyPage() {
  const [status, setStatus] = useState<"intro" | "survey" | "complete">("intro");
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const questionHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const currentQuestion = SURVEY_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === SURVEY_QUESTIONS.length - 1;

  useEffect(() => {
    if (status === "survey" && questionHeadingRef.current) {
      questionHeadingRef.current.focus();
    }
  }, [status, currentIndex]);

  const setAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((previous) => ({ ...previous, [questionId]: value }));
    setErrors((previous) => ({ ...previous, [questionId]: "" }));
  };

  const handleMultiSelectChange = (option: string) => {
    const question = SURVEY_QUESTIONS[currentIndex];
    const current = Array.isArray(answers[question.id]) ? (answers[question.id] as string[]) : [];

    if (current.includes(option)) {
      setAnswers((previous) => ({
        ...previous,
        [question.id]: current.filter((value) => value !== option),
      }));
      setErrors((previous) => ({ ...previous, [question.id]: "" }));
      return;
    }

    if (typeof question.maxSelections === "number" && current.length >= question.maxSelections) {
      setErrors((previous) => ({
        ...previous,
        [question.id]: `Please choose no more than ${question.maxSelections} options.`,
      }));
      return;
    }

    const nextValue = toggleMultiSelect(answers, question.id, option, question.maxSelections);
    setAnswers(nextValue);
    setErrors((previous) => ({ ...previous, [question.id]: "" }));
  };

  const validateCurrentQuestion = () => {
    const question = SURVEY_QUESTIONS[currentIndex];
    const error = validateRequiredAnswer(question, answers);

    if (error) {
      setErrors((previous) => ({ ...previous, [question.id]: error }));
      const target = question.type === "text"
        ? document.getElementById(`${question.id}-input`)
        : document.getElementById(`${question.id}-0`);

      window.requestAnimationFrame(() => target?.focus());
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) {
      return;
    }

    if (isLastQuestion) {
      setStatus("complete");
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
      return;
    }

    setStatus("intro");
  };

  const handleStartOver = () => {
    setStatus("intro");
    setAnswers({});
    setCurrentIndex(0);
    setErrors({});
  };

  if (status === "intro") {
    return (
      <main className="site-shell survey-shell">
        <section className="survey-intro" aria-labelledby="survey-intro-title">
          <p className="eyebrow">Campus Life Survey prototype</p>
          <h1 id="survey-intro-title">UVA Wise Campus Life Survey</h1>
          <p className="lede">
            This is a front-end-only prototype to explore the survey flow before any data is saved or sent.
            Your responses stay in memory for this demo only and are not stored anywhere.
          </p>
          <div className="cta-row">
            <button type="button" className="primary" onClick={() => setStatus("survey")}>
              Start the survey
            </button>
            <a href="/" className="secondary">
              Back to homepage
            </a>
          </div>
        </section>
      </main>
    );
  }

  if (status === "complete") {
    return (
      <main className="site-shell survey-shell">
        <section className="survey-card survey-complete" aria-labelledby="completion-title">
          <p className="eyebrow">Prototype complete</p>
          <h2 id="completion-title">Thanks for sharing your perspective.</h2>
          <p>
            This demo does not save or send responses. It is only a mock of the student experience for the M1 discovery phase.
          </p>
          <div className="cta-row">
            <button type="button" className="primary" onClick={handleStartOver}>
              Start over
            </button>
            <a href="/" className="secondary">
              Return home
            </a>
          </div>
        </section>
      </main>
    );
  }

  const selectedValues = Array.isArray(answers[currentQuestion.id]) ? (answers[currentQuestion.id] as string[]) : [];
  const textValue = typeof answers[currentQuestion.id] === "string" ? (answers[currentQuestion.id] as string) : "";

  return (
    <main className="site-shell survey-shell">
      <section className="survey-card survey-flow" aria-live="polite">
        <div className="survey-card-heading">
          <span className="status-dot" aria-hidden="true" />
          <p className="card-kicker">Campus Life Survey</p>
        </div>

        <p className="question-progress">Question {currentIndex + 1} of {SURVEY_QUESTIONS.length}</p>

        <h2 ref={questionHeadingRef} tabIndex={-1} id={`${currentQuestion.id}-heading`}>
          {currentQuestion.prompt}
        </h2>

        {currentQuestion.required ? <p className="required-note">Required</p> : <p className="required-note optional">Optional</p>}

        {currentQuestion.type === "single" && (
          <fieldset
            className="survey-options"
            aria-describedby={`${currentQuestion.id}-error`}
            aria-invalid={Boolean(errors[currentQuestion.id])}
          >
            <legend className="sr-only">{currentQuestion.prompt}</legend>
            {currentQuestion.options?.map((option, index) => {
              const optionId = `${currentQuestion.id}-${index}`;
              const isChecked = answers[currentQuestion.id] === option;

              return (
                <label className="option-row" htmlFor={optionId} key={optionId}>
                  <input
                    id={optionId}
                    name={currentQuestion.id}
                    type="radio"
                    checked={isChecked}
                    onChange={() => setAnswer(currentQuestion.id, option)}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </fieldset>
        )}

        {currentQuestion.type === "multi" && (
          <fieldset
            className="survey-options"
            aria-describedby={`${currentQuestion.id}-error`}
            aria-invalid={Boolean(errors[currentQuestion.id])}
          >
            <legend className="sr-only">{currentQuestion.prompt}</legend>
            {currentQuestion.options?.map((option, index) => {
              const optionId = `${currentQuestion.id}-${index}`;
              const isChecked = selectedValues.includes(option);

              return (
                <label className="option-row" htmlFor={optionId} key={optionId}>
                  <input
                    id={optionId}
                    name={currentQuestion.id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleMultiSelectChange(option)}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </fieldset>
        )}

        {currentQuestion.type === "text" && (
          <div className="text-field-wrap">
            <label className="sr-only" htmlFor={`${currentQuestion.id}-input`}>
              {currentQuestion.prompt}
            </label>
            <textarea
              id={`${currentQuestion.id}-input`}
              name={currentQuestion.id}
              value={textValue}
              maxLength={currentQuestion.maxLength ?? 500}
              rows={5}
              aria-invalid={Boolean(errors[currentQuestion.id])}
              onChange={(event) => setAnswer(currentQuestion.id, event.target.value)}
            />
            <p className="char-limit">{currentQuestion.maxLength ?? 500} character limit</p>
          </div>
        )}

        {errors[currentQuestion.id] && (
          <p id={`${currentQuestion.id}-error`} className="form-error" role="alert">
            {errors[currentQuestion.id]}
          </p>
        )}

        <div className="survey-navigation">
          <button type="button" className="secondary" onClick={handleBack}>
            Back
          </button>
          <button type="button" className="primary" onClick={handleNext}>
            {isLastQuestion ? "Finish" : "Next"}
          </button>
        </div>
      </section>
    </main>
  );
}
