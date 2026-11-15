"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { coachingLink, whatsappLink } from "@/lib/coaching-contact";
import styles from "./coaching-application.module.css";

const goals = ["Build strength and muscle", "Improve my fitness", "Train more consistently", "Find the right starting point"];
const routines = ["I’m just getting started", "I train on and off", "I train regularly", "I’m getting back into it"];
const plans = ["Essential", "Premium", "Help me choose"];

const questions = [
  "What’s your main goal?",
  "How often do you train now?",
  "What gets in the way?",
  "Which plan are you interested in?",
  "What should I call you?",
] as const;

type Answers = {
  goal: string;
  routine: string;
  challenge: string;
  plan: string;
  name: string;
};

const initialAnswers: Answers = { goal: "", routine: "", challenge: "", plan: "", name: "" };

function applicationLink(answers: Answers) {
  const challenge = answers.challenge.trim();
  const message = [
    "Hi Clotilde! I'd like to apply for 1:1 coaching.",
    "",
    `Name: ${answers.name.trim()}`,
    `Goal: ${answers.goal}`,
    `Current training: ${answers.routine}`,
    ...(challenge ? [`Biggest challenge: ${challenge}`] : []),
    `Plan: ${answers.plan}`,
  ].join("\n");

  return whatsappLink(message);
}

export default function CoachingApplication() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const questionRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const moveFocus = useRef(false);
  const finalStep = step === questions.length - 1;

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan")?.toLowerCase();
    if (plan === "essential" || plan === "premium") {
      setAnswers((current) => ({ ...current, plan: plan === "essential" ? "Essential" : "Premium" }));
    }
  }, []);

  useEffect(() => {
    if (moveFocus.current) {
      questionRef.current?.focus({ preventScroll: true });
      moveFocus.current = false;
    }
  }, [step]);

  function goTo(nextStep: number) {
    moveFocus.current = true;
    setError("");
    setDraft("");
    setStep(nextStep);
  }

  function select(key: "goal" | "routine" | "plan", value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
    goTo(step + 1);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 2) {
      goTo(step + 1);
      return;
    }
    if (!finalStep) return;
    if (!answers.name.trim()) {
      setError("Enter your name to continue.");
      nameRef.current?.focus();
      return;
    }
    const link = applicationLink(answers);
    setDraft(link);
    window.location.assign(link);
  }

  const choices = step === 0 ? { key: "goal" as const, options: goals }
    : step === 1 ? { key: "routine" as const, options: routines }
      : step === 3 ? { key: "plan" as const, options: plans }
        : null;

  return (
    <section className={styles.application} id="apply" aria-labelledby="application-title">
      <div className={styles.topline}>
        <h2 id="application-title">Apply for coaching</h2>
        <span aria-hidden="true">{step + 1} / {questions.length}</span>
      </div>
      <div
        className={styles.progress}
        role="progressbar"
        aria-label="Application progress"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={step + 1}
        aria-valuetext={`Step ${step + 1} of ${questions.length}`}
      >
        <span style={{ width: `${(step + 1) / questions.length * 100}%` }} />
      </div>

      <form className={styles.form} onSubmit={submit} noValidate>
        <h3 className={styles.question} id="application-question" ref={questionRef} tabIndex={-1}>
          {questions[step]}
        </h3>

        {choices && (
          <div className={styles.choices} role="group" aria-labelledby="application-question">
            {choices.options.map((option) => {
              const selected = answers[choices.key] === option;
              return (
                <button
                  key={option}
                  type="button"
                  className={styles.choice}
                  aria-pressed={selected}
                  onClick={() => select(choices.key, option)}
                >
                  <span>{option}</span>
                  {selected && <Check size={16} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <>
            <label className={styles.hint} htmlFor="application-challenge">Optional. A sentence or two is plenty.</label>
            <textarea
              className={styles.field}
              id="application-challenge"
              rows={3}
              maxLength={400}
              placeholder="For example: finding time to train around work."
              value={answers.challenge}
              onChange={(event) => setAnswers({ ...answers, challenge: event.target.value })}
            />
          </>
        )}

        {finalStep && (
          <>
            <label className={styles.hint} htmlFor="application-name">Your name</label>
            <input
              className={styles.field}
              id="application-name"
              ref={nameRef}
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              value={answers.name}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "application-error" : undefined}
              onChange={(event) => {
                setAnswers({ ...answers, name: event.target.value });
                setError("");
                setDraft("");
              }}
            />
            {error && <p className={styles.error} id="application-error" role="alert">{error}</p>}
            <p className={styles.hint}>Your answers will open as a WhatsApp draft. Review them and tap Send to apply.</p>
          </>
        )}

        {step > 0 && (
          <div className={styles.actions}>
            <button type="button" className={styles.back} onClick={() => goTo(step - 1)}>
              <ArrowLeft size={16} aria-hidden="true" /> Back
            </button>
            {(step === 2 || finalStep) && (
              <button className={styles.next} type="submit">
                {finalStep ? <>Open WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></> : <>Next <ArrowRight size={17} aria-hidden="true" /></>}
              </button>
            )}
          </div>
        )}
        {draft && <p className={styles.hint}>Didn’t open? <a href={draft}>Open your WhatsApp draft again.</a></p>}
      </form>
      <noscript><p className={styles.hint}>You can also <a href={coachingLink()}>apply on WhatsApp</a>.</p></noscript>
    </section>
  );
}
