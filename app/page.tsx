import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import styles from "./coaching.module.css";

export const metadata: Metadata = {
  title: "Cloe Fitness | Online Coaching with Clotilde",
  description: "Personalized online strength coaching, nutrition guidance, and weekly check-ins with Clotilde. Explore Essential and Premium coaching.",
};

const instagram = "https://www.instagram.com/clotiicr/";
const instagramDm = "https://ig.me/m/clotiicr";
const whatsappNumber = "17866356037";

function coachingLink(plan?: string) {
  const offer = plan ? `${plan} coaching` : "your online coaching";
  const message = `Hi Clotilde! I'm interested in ${offer}. Can you tell me how to get started?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const benefits = [
  {
    title: "Training for your goals",
    copy: "A tailored workout plan that takes your experience, schedule, and equipment into account.",
  },
  {
    title: "Nutrition guidance",
    copy: "Practical guidance for building eating habits that support your training and fit your routine.",
  },
  {
    title: "Weekly accountability",
    copy: "Check in each week to review your progress, ask questions, and make adjustments with Clotilde.",
  },
];

const packages = [
  {
    name: "Essential",
    months: 6,
    monthly: 130,
    summary: "Six months of structure and support to build consistency and make steady progress.",
    features: [
      "Personalized training program",
      "Nutrition guidance tailored to your goals",
      "Weekly check-in and progress review",
      "Training adjustments as you progress",
      "Direct WhatsApp access to Clotilde",
    ],
  },
  {
    name: "Premium",
    months: 3,
    monthly: 180,
    summary: "A focused three-month coaching block with a detailed weekly review of your plan.",
    features: [
      "Personalized training with planned progression",
      "Nutrition guidance tailored to your goals",
      "In-depth weekly review of training and nutrition",
      "Detailed adjustments based on your feedback",
      "Direct WhatsApp access to Clotilde",
    ],
  },
];

const steps = [
  {
    title: "Send a message",
    copy: "Tell Clotilde a little about what you want to achieve and how you train now.",
  },
  {
    title: "Find your fit",
    copy: "Talk through the two packages and see which commitment and level of support suit you.",
  },
  {
    title: "Start your plan",
    copy: "Get your training plan and agree on how you’ll check in each week.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <header className={styles.header}>
        <div className={styles.shell}>
          <a className={styles.brand} href="#top" aria-label="Cloe Fitness home">CLOE<span>FITNESS</span></a>
          <nav className={styles.navigation} aria-label="Main navigation">
            <a className={styles.navLink} href="#coaching">Coaching</a>
            <a className={styles.navLink} href="#about">Meet Clotilde</a>
          </nav>
          <a className={styles.headerContact} href={coachingLink()}>WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" aria-labelledby="hero-title">
          <div className={styles.shell}>
            <div className={styles.heroBody}>
              <p className={styles.kicker}>Online coaching with Clotilde</p>
              <h1 className={styles.heroTitle} id="hero-title">Get stronger.<br /><em>Feel more like you.</em></h1>
              <p className={styles.heroIntro}>Personalized training, nutrition guidance, and weekly support to help you get stronger and feel more confident in the gym.</p>
              <div className={styles.actions}>
                <a className={styles.primaryButton} href={coachingLink()}><MessageCircle size={20} aria-hidden="true" /> Chat on WhatsApp</a>
                <a className={styles.secondaryButton} href="#coaching">See coaching plans <ArrowDownRight size={18} aria-hidden="true" /></a>
              </div>
              <p className={styles.heroNote}>Prefer Instagram? <a href={instagramDm}>Send a DM</a>.</p>
            </div>
            <figure className={styles.heroVisual}>
              <Image className={styles.heroImage} src="/images/clotilde-portrait.webp" width={2070} height={1921} alt="Clotilde in pink workout clothes at the gym" sizes="(max-width: 760px) 100vw, 44vw" priority />
              <figcaption className={styles.imageCaption}><strong>Clotilde</strong><span>Personal trainer · Miami</span></figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-title">
          <div className={styles.shell}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle} id="benefits-title">What coaching includes</h2>
              <p className={styles.sectionCopy}>A plan for the time you have, with a coach you can check in with as you go.</p>
            </div>
            <div className={styles.benefits}>
              {benefits.map((benefit) => (
                <article className={styles.benefit} key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="coaching" aria-labelledby="coaching-title">
          <div className={styles.shell}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle} id="coaching-title">Choose your coaching plan</h2>
              <p className={styles.sectionCopy}>Both plans are one-to-one and fully online. All prices are in USD.</p>
            </div>
            <div className={styles.planGrid}>
              {packages.map((plan) => (
                <article className={`${styles.plan} ${plan.name === "Premium" ? styles.featuredPlan : ""}`} key={plan.name}>
                  <div className={styles.planHead}>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    <p className={styles.planSummary}>{plan.summary}</p>
                  </div>
                  <p className={styles.price}>${plan.monthly}<span className={styles.priceSuffix}> / month</span></p>
                  <p className={styles.term}>{plan.months}-month commitment · ${(plan.months * plan.monthly).toLocaleString("en-US")} total</p>
                  <ul className={styles.featureList}>
                    {plan.features.map((feature) => <li key={feature}><Check size={18} aria-hidden="true" />{feature}</li>)}
                  </ul>
                  <a className={styles.planAction} href={coachingLink(plan.name)}>Ask about {plan.name} <ArrowUpRight size={18} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="about" aria-labelledby="about-title">
          <div className={styles.shell}>
            <div className={styles.about}>
              <div className={styles.aboutContent}>
                <p className={styles.kicker}>Meet your coach</p>
                <h2 className={styles.sectionTitle} id="about-title">Hi, I’m Clotilde.</h2>
                <p className={styles.sectionCopy}>I started triathlon at eight and later competed in weightlifting in France. I’m now a personal trainer based in Miami, helping clients build strength and find a routine they can stick with.</p>
              </div>
              <ol className={styles.steps} aria-label="How to get started">
                {steps.map((step, index) => (
                  <li className={styles.step} key={step.title}>
                    <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                    <div><h3>{step.title}</h3><p>{step.copy}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div className={styles.shell}>
            <div className={styles.contactCopy}>
              <h2 className={styles.sectionTitle} id="contact-title">Let’s talk about your goals.</h2>
              <p>Have a question about either plan? Send a message and tell me what you’re working toward.</p>
            </div>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href={coachingLink()}><MessageCircle size={20} aria-hidden="true" /> Chat on WhatsApp</a>
              <a className={styles.secondaryButton} href={instagramDm}>DM on Instagram <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <a className={styles.brand} href="#top" aria-label="Cloe Fitness home">CLOE<span>FITNESS</span></a>
          <div className={styles.footerLinks}>
            <a href="#coaching">Coaching plans</a>
            <a href={instagram}>Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
