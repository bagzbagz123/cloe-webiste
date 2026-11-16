"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from "lucide-react";
import styles from "./jeanne-results.module.css";

const source = "https://jeannemlgcoaching.lovable.app/#transformations";

const comparisons = [
  { number: 1, view: "Side view" },
  { number: 2, view: "Front view" },
  { number: 3, view: "Side view" },
  { number: 4, view: "Back view" },
  { number: 5, view: "Back view" },
  { number: 6, view: "Back view" },
  { number: 7, view: "Back view" },
  { number: 8, view: "Back view" },
  { number: 10, view: "Back view" },
  { number: 11, view: "Side view", width: 507, height: 492 },
  { number: 12, view: "Side view" },
];

export default function JeanneResults() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const active = activeIndex === null ? null : comparisons[activeIndex];
  const count = comparisons.length;

  function openComparison(index: number) {
    setActiveIndex(index);
    dialog.current?.showModal();
  }

  function stepComparison(direction: number) {
    setActiveIndex((index) => index === null ? null : (index + direction + count) % count);
  }

  function handleDialogKeys(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      stepComparison(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <section className={styles.section} id="transformations" aria-labelledby="transformations-title">
      <div className={styles.shell}>
        <header className={styles.intro}>
          <h2 id="transformations-title">Client transformations</h2>
          <p>These before-and-after photos show results from Jeanne MLG’s coaching clients.</p>
          <a className={styles.source} href={source}>
            View Jeanne MLG Coaching’s original gallery
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </header>

        <ul className={styles.grid}>
          {comparisons.map((comparison, index) => (
            <li key={comparison.number}>
              <button
                className={styles.tile}
                type="button"
                aria-label={`Enlarge comparison ${index + 1} of ${count}: ${comparison.view.toLowerCase()}`}
                aria-haspopup="dialog"
                onClick={() => openComparison(index)}
              >
                <Image
                  src={`/images/jeanne-results/transformation-${comparison.number}.webp`}
                  width={comparison.width ?? 500}
                  height={comparison.height ?? 500}
                  alt=""
                  unoptimized
                />
                <span className={styles.expand} aria-hidden="true">
                  <Maximize2 size={15} />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <dialog
          className={styles.dialog}
          ref={dialog}
          aria-label="Client transformation photos"
          onClose={() => setActiveIndex(null)}
          onKeyDown={handleDialogKeys}
        >
          <div className={styles.dialogBar}>
            <p aria-live="polite">
              {activeIndex === null ? "" : `Comparison ${activeIndex + 1} of ${count}`}
            </p>
            <button
              className={styles.dialogButton}
              type="button"
              aria-label="Close photo viewer"
              onClick={() => dialog.current?.close()}
            >
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          {active && (
            <Image
              className={styles.dialogImage}
              src={`/images/jeanne-results/transformation-${active.number}.webp`}
              width={active.width ?? 500}
              height={active.height ?? 500}
              alt={`${active.view}, side-by-side photo comparison from Jeanne MLG Coaching`}
              loading="eager"
              unoptimized
            />
          )}
          <div className={styles.dialogNavigation}>
            <button
              className={styles.dialogButton}
              type="button"
              aria-label="Previous comparison"
              onClick={() => stepComparison(-1)}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              className={styles.dialogButton}
              type="button"
              aria-label="Next comparison"
              onClick={() => stepComparison(1)}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </dialog>
      </div>
    </section>
  );
}
