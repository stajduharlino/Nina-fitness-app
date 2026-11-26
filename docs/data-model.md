# Podatkovni model (konceptualno)

Samo nacrt: tablice, veze i pravila pristupa. Migracije i SQL dolaze u Fazi 3.
Oznake pristupa: **N** = Nina, **K** = klijent (samo vlastiti zapisi). Svaka tablica s klijentskim sadržajem ima `client_id`. Uloga poslana iz preglednika nikad nije dokaz ovlasti.

| Tablica | Sadržaj | Čita | Stvara / uređuje |
|---|---|---|---|
| profiles | Račun, uloga, ime, kontakt, avatar, datum rođenja, visina, cilj | N (svoje klijente), K (svoj) | N: ime, e-mail, status programa; K: telefon, avatar, visina, težina, cilj |
| coach_clients | Veza Nina–klijent, status i datumi | N | N |
| client_modules | Klijent + modul, uključeno/isključeno, vrijeme (i tko je promijenio) | N, K | Samo N |
| training_plans | Planovi, dani, zadane serije/ponavljanja | N, K (ako je modul uključen) | N |
| exercises | Naziv, upute | N, K | N |
| exercise_media | Poveznice na videe vježbi | N, K | N |
| workout_logs | Završeni treninzi, datum, bilješka | N, K | K (uređuje svoje) |
| set_logs | Težina, serije, ponavljanja (opcionalno) | N, K | K |
| nutrition_plans | Prehrambeni plan i datumi važenja | N, K | N |
| progress_entries | Tjedna težina i mjere (povijest) | N, K | N i K (dogovoreno) |
| progress_media | Privatne fotografije napretka | N, K | K |
| form_video_requests | Ninini zahtjevi za video izvođenja | N, K | N |
| form_video_uploads | Klijentovi privatni videi | N, K | K |
| conversations | Razgovor povezan s klijentom | N, K | sustav |
| messages | Autor, vrijeme, tekst | N, K | N i K (svoje poruke) |
| subscriptions | Početak, istek, status (aktivna, pauzirana, zaključana, istekla), bilješka | N; K bez interne bilješke | Samo N |
| notifications | Primatelj, tip, pročitano, poveznica (bez teksta poruke) | primatelj | sustav |

## Pravila
- Svaki zahtjev provjerava: prijavljenog korisnika, vezu s klijentom, dopuštenu radnju i je li modul uključen.
- Isključen modul odbija pristup, ali ne briše podatke.
- Datoteke (avatar, fotografije, videi) su privatne, bez javnih URL-ova.
- `service_role` ključ samo na poslužitelju.
- Tijekom izrade samo izmišljeni podaci.
- Brisanje i rokovi čuvanja: otvoreno, vidi `open-questions.md`.
