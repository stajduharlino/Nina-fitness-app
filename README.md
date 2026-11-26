# Nina Fitness App

Web-portal za fitness trenericu Ninu i njezine klijente. Nina upravlja klijentima i uključuje module (trening, prehrana, rezultati, poruke, pretplata) za svakog klijenta zasebno.

Plan izrade: `plan.md`. Otvorena pitanja: `docs/open-questions.md`.

## Tehnologije
Next.js, TypeScript. Planirano: Supabase (prijava i baza), Vercel (hosting).

## Lokalno pokretanje
1. `npm install`
2. Kopiraj `.env.example` u `.env.local` (kasnije, kad se spoji baza).
3. `npm run dev`
4. Otvori http://localhost:3000

## Sigurnost
Tajne i stvarni podaci ne idu u repozitorij. Datoteke `.env*` su u `.gitignore`.
