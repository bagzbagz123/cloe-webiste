import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, ClipboardCheck, Dumbbell, Instagram, MessageCircle, Utensils } from "lucide-react";
import { coachingLink } from "@/lib/coaching-contact";
import CoachingApplication from "./coaching-application";
import ClotildeNav from "./clotilde-nav";
import JeanneResults from "./jeanne-results";
import styles from "./coaching.module.css";

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
      <ClotildeNav />

      <main className={styles.main} id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image className={styles.heroImage} src="/images/clotilde-portrait.webp" fill alt="Clotilde in pink workout clothes at the gym" sizes="100vw" priority />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Personal trainer in Miami · Online coaching</p>
            <h1 id="hero-title">Get stronger.<br /><em>Feel more like you.</em></h1>
            <p>One-to-one training, nutrition guidance, and weekly check-ins with Clotilde.</p>
            <div className={styles.actions}>
              <a className={styles.heroPrimary} href="#apply">Apply for coaching <ArrowDown size={16} aria-hidden="true" /></a>
              <a className={styles.heroSecondary} href="#coaching">Explore coaching plans</a>
            </div>
          </div>
        </section>

        <div className={styles.applicationBand}>
          <div className={`${styles.shell} ${styles.applicationLayout}`}>
            <div className={styles.applicationIntro}>
              <p className={styles.eyebrow}>Let’s get to know each other</p>
              <p className={styles.appHeading}>Start with <em>your goals.</em></p>
              <p>Answer five quick questions. You’ll get a WhatsApp draft to review and send to me when you’re ready.</p>
            </div>
            <div className={styles.applicationShell}>
              <CoachingApplication />
            </div>
          </div>
        </div>

        <section className={styles.aboutSection} id="about" aria-labelledby="about-title">
          <div className={`${styles.shell} ${styles.aboutLayout}`}>
            <div className={styles.biography}>
              <p className={styles.eyebrow}>Meet your coach</p>
              <h2 className={styles.sectionTitle} id="about-title">Hi, I’m <em>Clotilde.</em></h2>
              <figure className={styles.aboutPhoto}>
                <Image className={styles.aboutImage} src="/images/clotilde-gym.webp" alt="Clotilde smiling in black workout clothes at the gym" width={908} height={1210} sizes="(max-width: 600px) 72vw, 268px" />
              </figure>
              <p>I started racing triathlons in Costa Rica at eight, then competed in weightlifting in France. I’m now a certified personal trainer based in Miami.</p>
              <p>I spent years learning what helped me stay consistent. Now I coach people who want to get stronger and build a routine they can stick with.</p>
              <a className={styles.textLink} href={instagram}><Instagram size={16} aria-hidden="true" /> Find me on Instagram <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
            <div className={styles.benefits}>
              <p className={styles.eyebrow}>What we’ll work on</p>
              {benefits.map(({ title, copy, icon: Icon }) => (
                <article className={styles.benefit} key={title}>
                  <span className={styles.benefitIcon}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.plansSection} id="coaching" aria-labelledby="coaching-title">
          <div className={styles.shell}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>Online coaching</p>
              <h2 className={styles.sectionTitle} id="coaching-title">Find your <em>coaching plan.</em></h2>
              <p>Both plans are one-to-one and fully online. All prices are in USD.</p>
            </div>

            <div className={styles.planGrid}>
              {packages.map((plan) => (
                <article className={styles.plan} key={plan.id} data-featured={plan.id === "premium" ? "true" : undefined}>
                  <p className={styles.planLabel}>{plan.months}-month plan</p>
                  <h3>{plan.name}</h3>
                  <p className={styles.planSummary}>{plan.summary}</p>
                  <p className={styles.price}>${plan.monthly}<span> / month</span></p>
                  <p className={styles.term}>${(plan.months * plan.monthly).toLocaleString("en-US")} total</p>
                  <ul className={styles.featureList}>
                    {plan.features.map((feature) => <li key={feature}><Check size={17} aria-hidden="true" />{feature}</li>)}
                  </ul>
                  <a className={styles.planAction} href={`/?plan=${plan.id}#apply`}>Apply for {plan.name} <ArrowUpRight size={17} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <JeanneResults />

        <section className={styles.faqSection} aria-labelledby="faq-title">
          <div className={`${styles.shell} ${styles.faqLayout}`}>
            <div>
              <p className={styles.eyebrow}>Before you apply</p>
              <h2 className={styles.sectionTitle} id="faq-title">Common <em>questions.</em></h2>
            </div>
            <div>
              {questions.map(({ question, answer }) => (
                <details className={styles.faqItem} key={question}>
                  <summary>{question}<ChevronDown size={19} strokeWidth={1.5} aria-hidden="true" /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div className={styles.shell}>
            <p className={styles.eyebrow}>Work with Clotilde</p>
            <h2 className={styles.sectionTitle} id="contact-title">Let’s talk <em>about your goals.</em></h2>
            <p>Ready to get started? Fill out the application, or send me a WhatsApp message if you have a question.</p>
            <div className={styles.actions}>
              <a className={styles.heroPrimary} href="#apply">Apply for coaching <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className={styles.heroSecondary} href={coachingLink()}><MessageCircle size={17} aria-hidden="true" /> Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerLayout}`}>
          <a className={styles.footerBrand} href="#top" aria-label="Clotilde Fitness home">Clotilde <span>Fitness</span></a>
          <div className={styles.footerLinks}>
            <a href="#coaching">Coaching plans</a>
            <a href={instagram}>Instagram <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
