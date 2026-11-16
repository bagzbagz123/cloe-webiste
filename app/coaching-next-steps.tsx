import Image from "next/image";
import styles from "./coaching-next-steps.module.css";

const steps = [
  {
    title: "Tell me about your goals",
    description: "Answer five quick questions.",
  },
  {
    title: "Send your WhatsApp draft",
    description: "Review and send your answers to Clotilde.",
  },
  {
    title: "Talk through a plan",
    description: "We’ll talk about your goals and the coaching option that fits.",
  },
];

export default function CoachingNextSteps() {
  return (
    <section className={styles.section} aria-labelledby="next-steps-title">
      <div className={styles.layout}>
        <div className={styles.content}>
          <h2 id="next-steps-title">What happens next</h2>
          <ol className={styles.steps} role="list">
            {steps.map(({ title, description }, index) => (
              <li className={styles.step} key={title}>
                <span className={styles.number} aria-hidden="true">{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className={styles.photo}>
          <Image
            src="/images/clotilde-gym.webp"
            alt="Clotilde smiling at the gym"
            fill
            sizes="(max-width: 760px) calc(100vw - 2.5rem), (max-width: 1300px) 48vw, 595px"
          />
        </figure>
      </div>
    </section>
  );
}
