# Nina Fitness App

## O meni
- Ja (Lino) nisam programer. Objašnjavaj jednostavno i na hrvatskom.
- Aplikacija je za fitness trenericu Ninu. Plan projekta je u PLAN.md.

## Pravila rada
- Radi SAMO ono što tražim. Ne dodaji funkcije, ne "poboljšavaj" usput i ne mijenjaj datoteke koje nisam spomenuo.
- Prije većih promjena (više od 2 datoteke, brisanje, novi paket) reci što ćeš napraviti i pričekaj moj OK.
- Radi jedan mali korak odjednom.
- Nakon svake cjeline koja radi predloži git commit.

## Štednja konteksta
- Ne čitaj cijeli projekt. Čitaj samo datoteke koje su potrebne za trenutni zadatak.
- Ne čitaj node_modules, .next, dist, build, package-lock.json ni .env.
- Odgovori kratko: reci što si promijenio i u kojoj datoteci, bez prepričavanja koda.
- Ne ispisuj cijele datoteke u razgovoru, samo promijenjene dijelove.
- Kad nisi siguran što želim, pitaj umjesto da pogađaš.

## Sigurnost
- Nikad ne stavljaj lozinke, API ključeve ni osobne podatke u kod.
- Tajne vrijednosti idu ui u .gitignore.
- Ne pokreći destruktivne naredbe (brisanje, git reset --hard, force push) bez mog odobrenja.

## Tehnologija
- Next.js (App Router) + TypeScript. Planirano: Supabase (prijava, baza, RLS) i Vercel.
- Pokretanje: `npm install`, zatim `npm run dev` (http://localhost:3000).
- Provjera koda: `npm run lint` i `npm run build`. Automatskih testova još nema.
- Dokumenti: `plan.md`, `docs/roles.md`, `docs/modules.md`, `docs/data-model.md`, `docs/roadmap.md`, `docs/open-questions.md`.
