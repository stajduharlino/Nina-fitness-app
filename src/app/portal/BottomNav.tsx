"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ModuleKey } from "@/lib/mock-data";
import styles from "./page.module.css";

const ICONS: Record<string, React.ReactNode> = {
  home: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />,
  training: <path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12" />,
  messages: <path d="M4 5h16v11H9l-5 4z" />,
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
};

export default function BottomNav({ modules }: { modules: ModuleKey[] }) {
  const pathname = usePathname();

  const items = [
    { href: "/portal", label: "Početna", icon: "home" },
    ...(modules.includes("training") ? [{ href: "/portal/training", label: "Trening", icon: "training" }] : []),
    ...(modules.includes("messages") ? [{ href: "/portal/messages", label: "Poruke", icon: "messages" }] : []),
    { href: "/portal/profile", label: "Profil", icon: "profile" },
  ];

  return (
    <nav className={styles.nav} aria-label="Glavna navigacija">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? styles.navItemOn : styles.navItem}
            aria-current={active ? "page" : undefined}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[item.icon]}
            </svg>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
