"use client";

import { useEffect, useRef, useState } from "react";
import { MODULE_LABELS, type MockClient, type ModuleKey } from "@/lib/mock-data";
import styles from "./page.module.css";

type TabKey = "pregled" | "moduli" | ModuleKey;

const MODULE_KEYS = Object.keys(MODULE_LABELS) as ModuleKey[];

const TABS: { key: TabKey; label: string }[] = [
  { key: "pregled", label: "Pregled" },
  { key: "moduli", label: "Moduli" },
  ...MODULE_KEYS.map((m) => ({ key: m as TabKey, label: MODULE_LABELS[m] })),
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ClientTabs({ client }: { client: MockClient }) {
  const [tab, setTab] = useState<TabKey>("pregled");
  const [enabled, setEnabled] = useState<ModuleKey[]>(client.modules);
  const [pending, setPending] = useState<ModuleKey | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  // Na mobitelu okvir za potvrdu može biti ispod ruba ekrana: pomakni ga u vidokrug.
  useEffect(() => {
    if (pending) confirmRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [pending]);

  function confirmChange(m: ModuleKey) {
    const willBeOn = !enabled.includes(m);
    setEnabled(willBeOn ? [...enabled, m] : enabled.filter((x) => x !== m));
    setPending(null);
    setSaved(`${MODULE_LABELS[m]}: ${willBeOn ? "uključeno" : "isključeno"}. Promjena je spremljena.`);
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.avatar} aria-hidden="true">
          {initials(client.name)}
        </span>
        <div>
          <h1 className={styles.title}>{client.name}</h1>
          <p className={styles.meta}>
            <span className={`${styles.status} ${styles[client.status]}`}>{client.status}</span>
            <span>do {new Date(client.programEnd).toLocaleDateString("hr-HR")}</span>
          </p>
        </div>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Odjeljci profila klijenta">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            aria-selected={tab === t.key}
            className={tab === t.key ? styles.tabOn : styles.tab}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className={styles.panel} role="tabpanel">
        {tab === "pregled" && (
          <dl className={styles.details}>
            <dt>E-mail</dt>
            <dd>{client.email}</dd>
            <dt>Telefon</dt>
            <dd>{client.phone}</dd>
            <dt>Status programa</dt>
            <dd>{client.status}</dd>
            <dt>Kraj programa</dt>
            <dd>{new Date(client.programEnd).toLocaleDateString("hr-HR")}</dd>
            <dt>Uključeni moduli</dt>
            <dd>{enabled.length ? enabled.map((m) => MODULE_LABELS[m]).join(", ") : "nijedan"}</dd>
          </dl>
        )}

        {tab === "moduli" && (
          <>
            <p className={styles.hint}>
              Moduli vrijede samo za ovog klijenta. Isključivanje ne briše spremljene podatke.
            </p>
            <ul className={styles.modules}>
              {MODULE_KEYS.map((m) => {
                const on = enabled.includes(m);
                return (
                  <li key={m} className={styles.moduleRow}>
                    <span>{MODULE_LABELS[m]}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-label={`${MODULE_LABELS[m]} za ${client.name}`}
                      className={on ? styles.switchOn : styles.switchOff}
                      onClick={() => {
                        setSaved(null);
                        setPending(m);
                      }}
                    >
                      <span className={styles.knob} />
                    </button>
                  </li>
                );
              })}
            </ul>

            {pending && (
              <div ref={confirmRef} className={styles.confirm} role="alert">
                <p>
                  {enabled.includes(pending)
                    ? `Isključiti modul ${MODULE_LABELS[pending]}? Klijent ga više neće vidjeti ni otvoriti, ni preko stare adrese. Spremljeni podaci ostaju.`
                    : `Uključiti modul ${MODULE_LABELS[pending]}? Klijent će ga vidjeti u svom portalu. Ako je ranije imao podataka, ponovno će biti vidljivi.`}
                </p>
                <div className={styles.confirmButtons}>
                  <button type="button" className={styles.primaryBtn} onClick={() => confirmChange(pending)}>
                    Potvrdi
                  </button>
                  <button type="button" className={styles.secondaryBtn} onClick={() => setPending(null)}>
                    Odustani
                  </button>
                </div>
              </div>
            )}

            {saved && (
              <p className={styles.saved} role="status">
                ✓ {saved}
              </p>
            )}
          </>
        )}

        {tab !== "pregled" && tab !== "moduli" &&
          (enabled.includes(tab) ? (
            <p className={styles.placeholder}>
              Ovdje će biti sadržaj modula {MODULE_LABELS[tab]} za klijenta (dolazi u kasnijoj fazi).
            </p>
          ) : (
            <p className={styles.placeholder}>
              Modul {MODULE_LABELS[tab]} je isključen za ovog klijenta. Uključi ga u kartici Moduli.
            </p>
          ))}
      </section>
    </>
  );
}
