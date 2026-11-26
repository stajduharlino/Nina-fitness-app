"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MOCK_CLIENTS, MODULE_LABELS, type ModuleKey } from "@/lib/mock-data";
import styles from "./page.module.css";

const ALL_MODULES = Object.keys(MODULE_LABELS) as ModuleKey[];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("hr-HR");
}

export default function CoachPage() {
  const [query, setQuery] = useState("");
  const clients = MOCK_CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Image src="/brand/nina-logo-white.png" alt="Nina Gauš" width={970} height={965} className={styles.logo} />
        <div>
          <h1 className={styles.title}>Klijenti</h1>
          <p className={styles.count}>{MOCK_CLIENTS.length} ukupno</p>
        </div>
      </header>

      <input
        className={styles.search}
        type="search"
        placeholder="Traži klijenta"
        aria-label="Traži klijenta"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {clients.length === 0 ? (
        <p className={styles.empty}>Nema klijenata za taj upit.</p>
      ) : (
        <ul className={styles.list}>
          {clients.map((client) => (
            <li key={client.id}>
              <Link href={`/coach/clients/${client.id}`} className={styles.card}>
                <span className={styles.avatar} aria-hidden="true">
                  {initials(client.name)}
                </span>
                <span className={styles.info}>
                  <span className={styles.name}>{client.name}</span>
                  <span className={styles.meta}>
                    <span className={`${styles.status} ${styles[client.status]}`}>{client.status}</span>
                    <span>do {formatDate(client.programEnd)}</span>
                  </span>
                  <span className={styles.chips}>
                    {ALL_MODULES.map((m) => (
                      <span
                        key={m}
                        className={client.modules.includes(m) ? styles.chipOn : styles.chipOff}
                      >
                        {MODULE_LABELS[m]}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
