"use client";

import { Menu, X } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./clotilde-nav.module.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#coaching", label: "Coaching" },
  { href: "#transformations", label: "Results" },
  { href: "#contact", label: "Contact" },
];

export default function ClotildeNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  function handleEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      toggle.current?.focus();
    }
  }

  return (
    <header className={styles.header} onKeyDown={handleEscape}>
      <div className={styles.inner}>
        <a className={styles.wordmark} href="#top" aria-label="Clotilde Fitness home" onClick={() => setIsOpen(false)}>
          Clotilde<span>Fitness</span>
        </a>
        <button
          className={styles.toggle}
          type="button"
          ref={toggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="clotilde-navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
        <nav
          className={styles.navigation}
          id="clotilde-navigation"
          aria-label="Main navigation"
          data-open={isOpen}
        >
          {links.map(({ href, label }) => (
            <a className={styles.link} key={href} href={href} onClick={() => setIsOpen(false)}>
              {label}
            </a>
          ))}
          <a className={styles.apply} href="#apply" onClick={() => setIsOpen(false)}>
            Apply for coaching
          </a>
        </nav>
      </div>
    </header>
  );
}
