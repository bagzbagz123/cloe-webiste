import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, ClipboardCheck, Dumbbell, MessageCircle, Utensils } from "lucide-react";
import { coachingLink } from "@/lib/coaching-contact";
import CoachingApplication from "./coaching-application";
import styles from "./coaching.module.css";
import sections from "./coaching-sections.module.css";

const instagram = "https://www.instagram.com/clotiicr/";

const benefits = [
  {
    title: "Training for your goals",
    copy: "A tailored workout plan that takes your experience, schedule, and equipment into account.",
    icon: Dumbbell,
  },
  {
    title: "Nutrition guidance",
    copy: "Practical guidance for building eating habits that support your training and fit your routine.",
    icon: Utensils,
  },
  {
    title: "Weekly accountability",
    copy: "Check in each week to review your progress, ask questions, and make adjustments with Clotilde.",
    icon: ClipboardCheck,
  },
];

const packages = [
  {
    id: "essential",
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
    id: "premium",
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
    title: "Fill out the application",
    copy: "Tell Clotilde what you want to achieve and which plan you’re considering.",
  },
  {
    title: "Send it on WhatsApp",
    copy: "Review your draft in WhatsApp and tap Send to share your answers with Clotilde.",
  },
  {
    title: "Find the right plan",
    copy: "Clotilde will help you choose the level of support that fits and explain how to get started.",
  },
];

const questions = [
  {
    question: "Do I need gym experience?",
    answer: "Your workouts are built around your current experience and the equipment you have access to. Tell Clotilde how you train now so she can help you get started.",
  },
  {
    question: "What’s the difference between the plans?",
    answer: "Essential gives you six months of structured coaching and weekly check-ins. Premium is a three-month block with a more detailed weekly review of your training and nutrition.",
  },
  {
    question: "How do I start?",
    answer: "Fill out the coaching application, then review your draft in WhatsApp and tap Send. Clotilde will help you choose a plan and walk you through getting started.",
  },
];

export default function Home() {
  return (
    <div className={styles.page} id="top">
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <header className={styles.header}>
        <div className={styles.shell}>
          <a className={styles.brand} href="#top" aria-label="Clotilde Fitness home">Clotilde<span>fitness</span></a>
          <nav className={styles.navigation} aria-label="Main navigation">
            <a className={styles.navLink} href="#coaching">Coaching</a>
            <a className={styles.navLink} href="#about">Meet Clotilde</a>
          </nav>
          <a className={styles.headerContact} href="#apply">Apply now <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <figure className={styles.heroVisual}>
            <Image className={styles.heroImage} src="/images/clotilde-portrait.webp" fill alt="Clotilde in pink workout clothes at the gym" sizes="(max-width: 760px) 100vw, 66vw" priority />
            <figcaption className={styles.imageCaption}><strong>Clotilde</strong><span>Personal trainer · Miami</span></figcaption>
          </figure>
          <div className={styles.shell}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle} id="hero-title"><span>Get stronger.</span><em>Feel more like you.</em></h1>
              <p className={styles.heroIntro}>1:1 online coaching with personalized training, nutrition guidance, and weekly support to help you feel more confident in the gym.</p>
              <CoachingApplication />
              <a className={styles.heroPlanLink} href="#coaching">See coaching plans <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className={`${sections.section} ${sections.methodSection}`} aria-labelledby="benefits-title">
          <div className={styles.shell}>
            <div className={sections.sectionIntro}>
              <h2 className={sections.sectionTitle} id="benefits-title">A plan that <em>fits your life.</em></h2>
              <p className={sections.sectionCopy}>Training, nutrition, and weekly check-ins with Clotilde, built around your goals and the time you have.</p>
            </div>
            <div className={sections.benefits}>
              {benefits.map(({ title, copy, icon: Icon }) => (
                <article className={sections.benefit} key={title}>
                  <span className={sections.benefitIcon}><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sections.section} ${sections.plansSection}`} id="coaching" aria-labelledby="coaching-title">
          <div className={styles.shell}>
            <div className={sections.sectionIntro}>
              <h2 className={sections.sectionTitle} id="coaching-title">Choose your <em>coaching plan.</em></h2>
              <p className={sections.sectionCopy}>Both plans are one-to-one and fully online. All prices are in USD.</p>
            </div>
            <div className={sections.planGrid}>
              {packages.map((plan) => (
                <article className={`${sections.plan} ${plan.name === "Premium" ? sections.featuredPlan : ""}`} key={plan.name}>
                  <div className={sections.planHead}>
                    <h3 className={sections.planName}>{plan.name}</h3>
                    <p className={sections.planSummary}>{plan.summary}</p>
                  </div>
                  <p className={sections.price}>${plan.monthly}<span className={sections.priceSuffix}> / month</span></p>
                  <p className={sections.term}>{plan.months}-month commitment · ${(plan.months * plan.monthly).toLocaleString("en-US")} total</p>
                  <ul className={sections.featureList}>
                    {plan.features.map((feature) => <li key={feature}><Check size={18} aria-hidden="true" />{feature}</li>)}
                  </ul>
                  <a className={sections.planAction} href={`/?plan=${plan.id}#apply`}>Apply for {plan.name} <ArrowUpRight size={18} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sections.section} ${sections.aboutSection}`} id="about" aria-labelledby="about-title">
          <div className={styles.shell}>
            <div className={sections.about}>
              <div className={sections.aboutContent}>
                <p className={sections.eyebrow}>Meet your coach</p>
                <h2 className={sections.sectionTitle} id="about-title">Hi, I’m <em>Clotilde.</em></h2>
                <p className={sections.sectionCopy}>I started triathlon at eight and later competed in weightlifting in France. I’m now a personal trainer based in Miami, helping clients build strength and find a routine they can stick with.</p>
              </div>
              <ol className={sections.steps} aria-label="How to get started">
                {steps.map((step, index) => (
                  <li className={sections.step} key={step.title}>
                    <span className={sections.stepNumber} aria-hidden="true">0{index + 1}</span>
                    <div><h3>{step.title}</h3><p>{step.copy}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={`${sections.section} ${sections.faqSection}`} aria-labelledby="faq-title">
          <div className={styles.shell}>
            <div className={sections.faqLayout}>
              <h2 className={sections.sectionTitle} id="faq-title">Common <em>questions.</em></h2>
              <div className={sections.faqList}>
                {questions.map(({ question, answer }) => (
                  <details className={sections.faqItem} key={question}>
                    <summary>{question}<ChevronDown size={20} strokeWidth={1.5} aria-hidden="true" /></summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div className={styles.shell}>
            <div className={styles.contactCopy}>
              <h2 className={styles.contactTitle} id="contact-title">Let’s talk <em>about your goals.</em></h2>
              <p>Tell me what you’re working toward in the application, or message me with a question about either plan.</p>
            </div>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#apply">Apply for coaching <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className={styles.secondaryButton} href={coachingLink()}><MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <a className={styles.brand} href="#top" aria-label="Clotilde Fitness home">Clotilde<span>fitness</span></a>
          <div className={styles.footerLinks}>
            <a href="#coaching">Coaching plans</a>
            <a href={instagram}>Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
