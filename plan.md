# Detaljni plan izrade Ninine fitness aplikacije

Ovaj dokument vodi izradu od prve odluke do javne web-aplikacije. Radi se redom, jednu manju cjelinu po razgovoru s Claude Codeom. Ne prelaziti na iduću fazu dok uvjeti završetka trenutne nisu ispunjeni.

## 1. Cilj i osnovna odluka

Izraditi web-portal za Ninu i njezine klijente. Nina upravlja klijentima i njihovim sadržajem. Klijent se prijavljuje vlastitim računom i vidi samo vlastite podatke i uključene funkcije.

Izvorni kod bit će javan na GitHubu, a aplikacija dostupna preko javne web-adrese. Javni repozitorij sadrži kod, ne tajne ili podatke korisnika. Lokalni `.env` i produkcijske tajne ne smiju se commitati.

**Osnovno ponašanje modula:** Nina zasebno uključuje ili isključuje module za svakog klijenta. Isključivanje uklanja modul iz klijentskog sučelja i odbija pristup njegovim funkcijama na poslužitelju i u bazi. Ne briše spremljene podatke. Ponovno uključivanje vraća pristup postojećim podacima.

## 2. Uloge

### Nina — trenerica

- Prijavljuje se na trenersku stranicu.
- Pregledava, pretražuje i otvara profile svojih klijenata.
- Poziva klijenta ili šalje novi poziv ako je poziv istekao.
- Uključuje i isključuje module za pojedinog klijenta.
- Uređuje profil, dodjeljuje planove i razmjenjuje poruke.
- Pregledava status pretplate.
- Ne može pristupiti računima klijenata koji nisu povezani s njezinim profilom.

### Klijent

- Aktivira račun putem poziva i prijavljuje se.
- Pregledava i uređuje samo ona polja profila koja su mu dopuštena.
- Vidi samo omogućen sadržaj i omogućen modul.
- Ne vidi druge klijente niti trenerske funkcije.

### Posjetitelj

- Može vidjeti javnu početnu stranicu i prijavu.
- Ne može vidjeti privatne stranice ili podatke.

## 3. Moduli

| Modul | Što radi prva verzija | Nina može | Klijent može |
|---|---|---|---|
| Trening | Planovi i evidencija odrađenih treninga | Izraditi, urediti, dodijeliti | Pregledati plan, zabilježiti odrađeno |
| Prehrana | Plan i bilješke | Izraditi, urediti, dodijeliti | Pregledati plan i dopuštene bilješke |
| Rezultati | Tjedna težina, cilj, mjere tijela i fotografije po tjednu | Pregledati i dodati dogovorene zapise | Pregledati i unijeti vlastite zapise |
| Poruke | Razgovor Nina–klijent s obavijestima | Slati i čitati poruke | Slati i čitati vlastiti razgovor |
| Pretplata | Ručni status članstva | Ažurirati status i datume | Pregledati status i osnovne detalje |

Moduli se uključuju po klijentu, ne globalno. Uključiti modul ne mora automatski stvoriti plan; klijent može vidjeti prazan početni prikaz s objašnjenjem da Nina još nije dodijelila sadržaj. Praćenje napretka je opcionalno za klijenta. Nina može zaključati, pauzirati ili ponovno otključati klijentski program u bilo kojem trenutku. Istek programa automatski zaključava klijentski pristup.

### Profil klijenta

Profil treba podržati:

- Ime i prezime.
- E-mail adresu i broj telefona.
- Datum rođenja ili dob (odabrati jedno kao izvor istine; dob se može računati iz datuma rođenja).
- Visinu, početnu težinu i cilj.
- Neobaveznu profilnu sliku ili avatar; Nina i klijent mogu dodati ili promijeniti sliku.
- Početni i završni datum programa/pretplate, status te eventualno pauzu.

Nina i klijent mogu unositi ili ažurirati visinu, težinu i cilj. Težina i dogovorene mjere napretka bilježe se tjedno. Promjene se spremaju kao povijest mjerenja, ne prepisuju preko starog podatka, kako bi graf mogao prikazati napredak.

### Praćenje treninga i videa vježbi

- Vježba sadrži naziv, upute i poveznicu na Ninin video na Google Driveu.
- Gumb **Prikaži vježbu** otvara modalni prozor s ugrađenim videom. Video mora biti dostupan samo ovlaštenim korisnicima; Drive dozvole treba provjeriti prije puštanja u rad.
- U treningu klijent može unijeti težinu, serije i ponavljanja po vježbi/seriji. Unos nije obavezan: trening se može završiti i bez rezultata.
- Pri sljedećem treningu prikazuju se zadnje unesene vrijednosti kao podsjetnik, jasno označene kao prethodni rezultat.
- Nakon **Complete** prikazuje se zelena kvačica i datum završetka. Klijent može naknadno urediti zapis ili dodati bilješku; povijest izmjene ne smije slučajno izbrisati cijeli trening.
- Nina može zatražiti od klijenta video izvođenja određene vježbe. Klijent šalje video iz profila/treninga, a Nina ga pregledava u sigurnom prostoru. Video je neobavezan osim kada ga Nina zatraži i mora imati jasno ograničenu publiku i rok čuvanja.
- Za prvu verziju prihvatiti MP4 kao preporučeni format; na mobitelu omogućiti odabir ili snimanje videa. Postaviti veličinu i trajanje limita nakon probnog rada na stvarnim uređajima. Ne spremati video u javni GitHub repozitorij.

### Tjedni napredak i fotografije

- Napredak je opcionalan i Nina ga može uključiti za pojedinog klijenta.
- Po tjednu se može zabilježiti težina i mjere koje klijent odabere, primjerice struk, ramena, bedra i gluteus.
- Mjere su označene datumom i prikazane na grafu kroz vrijeme.
- Klijent može dodati fotografije u mapu/tjedni zapis. Fotografije su privatne, vidljive samo tom klijentu i Nini, i ne prikazuju se javno.
- Dogovoriti pravila za brisanje fotografija i videa te ograničiti veličinu datoteka.

### Poruke i obavijesti

- Nina i klijent imaju privatni razgovor jedan-na-jedan.
- Kad stigne nova poruka, druga strana dobiva obavijest.
- Prva verzija može imati obavijest unutar portala i e-mail obavijest; push obavijesti za instaliranu web-aplikaciju planirati nakon što osnovna aplikacija radi.
- Obavijest ne smije otkrivati osjetljiv sadržaj poruke na zaključanom zaslonu ili u e-mailu; dovoljno je javiti da postoji nova poruka.

### Točan tijek promjene modula

1. Nina otvori klijentov profil.
2. U odjeljku **Moduli** uključi ili isključi jedan modul.
3. Aplikacija prikaže potvrdu što će klijent vidjeti nakon promjene.
4. Pri spremanju se promijeni postavka vezana uz tog klijenta.
5. Klijentska navigacija se osvježi i prikaže samo dopuštene module.
6. Svaki zahtjev prema stranici, poslužiteljskom kodu i bazi zasebno provjeri ovlasti.
7. Ako je modul isključen, izravna adresa ili stari bookmark ne smiju omogućiti pristup.
8. Podaci ostaju spremljeni; Nina ih ponovno vidi, a klijent ih vidi kada modul ponovno uključi.

**Posebno:** isključenje poruka blokira pristup razgovoru, ali ne briše povijest. Isključenje pretplate skriva klijentski pregled modula, ali Nini ostavlja administrativni zapis. Brisanje računa ili zahtjev za brisanje podataka zaseban je postupak, ne isto što i isključenje modula.

## 4. Tehnološki prijedlog

- Next.js i TypeScript za web-sučelje i poslužiteljski dio.
- Supabase Auth za prijavu, PostgreSQL za bazu i Storage samo ako zatreba pohrana datoteka.
- Row Level Security (RLS) za ograničavanje pristupa zapisima na razini baze.
- Vercel za hosting aplikacije.
- GitHub za javni repozitorij i praćenje promjena.
- Progresivna web-aplikacija (PWA) kao cilj: portal radi u mobilnom pregledniku i može se dodati na početni zaslon. Push obavijesti ovise o podršci preglednika/uređaja i traže zasebnu provjeru.

Ovo je početni prijedlog; prije izrade Claude treba potvrditi da je prikladan. U prvoj verziji izbjegavati dodatne servise dok ne postoji konkretna potreba.

## 5. Stranice i navigacija

### Javni dio

- `/` — kratko predstavljanje usluge.
- `/login` — prijava.
- `/invite` — prihvat poziva i postavljanje računa.
- `/forgot-password` — oporavak pristupa.

### Trenerski dio

- `/coach` — pregled i popis klijenata.
- `/coach/clients/new` — poziv/povezivanje klijenta.
- `/coach/clients/[id]` — profil klijenta i kartice: pregled, moduli, trening, prehrana, rezultati, poruke, pretplata.

### Klijentski dio

- `/portal` — početni pregled i uključeni moduli.
- `/portal/profile` — vlastiti profil.
- `/portal/training` — samo ako je trening uključen.
- `/portal/nutrition` — samo ako je prehrana uključena.
- `/portal/progress` — tjedni graf, mjere i fotografije, samo ako je praćenje rezultata uključeno.
- `/portal/messages` — samo ako su poruke uključene.
- `/portal/subscription` — samo ako je pretplata uključena.
Nazivi i putanje mogu se promijeniti tijekom dizajna; ovlasti se ne smiju oslanjati samo na URL ili skrivanje gumba.

## 6. Konceptualni model podataka

Claude treba prije izrade baze nacrtati tablice, veze i pravila pristupa. Početni pojmovi:

- **profiles** — korisnički profil povezan s računom za prijavu; uloga trenerice ili klijenta, kontakt, avatar i dopušteni profilni podaci.
- **coach_clients** — veza između trenerice i klijenta, status odnosa i datumi.
- **client_modules** — jedan redak za klijenta i modul; uključen/isključen status i vrijeme promjene.
- **training_plans**, **exercises**, **workout_logs** i **set_logs** — planovi, vježbe, završeni treninzi te opcionalni rezultati serija.
- **exercise_media** — privatne poveznice ili reference na demonstracijske videozapise.
- **nutrition_plans** — prehrambeni planovi i datumi važenja.
- **progress_entries** i **progress_media** — tjedne težine/mjere i privatne fotografije napretka.
- **form_video_requests** i **form_video_uploads** — Ninini zahtjevi za video izvođenja i privatne datoteke klijenta.
- **conversations** i **messages** — razgovor povezan s klijentom; poruke imaju autora i vrijeme.
- **subscriptions** — početak, datum isteka, status (aktivna, pauzirana, zaključana, istekla) i bilješka; u prvoj verziji bez naplate karticom.
- **notifications** — primatelj, tip, pročitano/nepročitano i poveznica na događaj, bez kopiranja sadržaja privatne poruke.

Svaka tablica s klijentskim sadržajem treba sadržavati ili pouzdano povezivati `client_id`. Definirati tko smije čitati, stvarati, uređivati i brisati svaki tip zapisa. Ne koristiti ulogu poslanu iz preglednika kao dokaz ovlasti.

## 7. Faze rada korak po korak

### Faza 0 — Potvrda zahtjeva i opsega

1. Potvrditi da postoji jedna trenerica Nina i nema drugih trenera u prvoj verziji.
2. Potvrditi popis modula iz odjeljka 3.
3. Odlučiti poziva li Nina klijenta e-mailom ili ga prvo ručno evidentira pa poziva.
4. Odlučiti tko može uređivati svako polje profila.
5. Odlučiti koje podatke o rezultatima uopće treba spremati; ne skupljati „za svaki slučaj”.
6. Odlučiti da je pretplata u prvoj verziji ručni status, bez online naplate.
7. Potvrditi profilna polja, tjedno mjerenje, opcionalne fotografije i videozapise, uređivanje završenog treninga te vrstu obavijesti.
8. Zabilježiti otvorena pitanja u `docs/open-questions.md` i ne blokirati ostatak plana na nebitnim detaljima.

**Gotovo kada:** uloga, moduli, poziv klijenta i opseg prve verzije su jasno zapisani.

**Zadatak Claudeu:**

> Pročitaj ovaj plan. Nemoj pisati kod. Napravi popis nejasnoća koje utječu na podatkovni model, pristup ili opseg prve verzije. Razdvoji nužna pitanja od odluka koje se mogu odgoditi. Predloži izmjene plana, ali ga nemoj samostalno prepisivati.

### Faza 1 — Struktura projekta i GitHub

1. Napraviti mapu projekta i pokrenuti Git.
2. Kreirati javni GitHub repozitorij.
3. Napraviti početnu Next.js aplikaciju s TypeScriptom.
4. Dodati `.gitignore` koji isključuje `.env*` (osim predloška bez tajni), build datoteke i lokalne podatke.
5. Dodati `.env.example` s nazivima varijabli i lažnim vrijednostima, bez tajnih ključeva.
6. Napraviti početni `README.md` s opisom, tehnologijama i uputama za lokalno pokretanje.
7. Napraviti prvi commit s čistim početnim projektom.

**Gotovo kada:** aplikacija se pokreće lokalno, javni repozitorij ne sadrži tajne i README objašnjava osnovni početak.

### Faza 2 — Projektni dokumenti i dizajn

1. Napraviti `CLAUDE.md` s kratkim pravilima projekta, naredbama i sigurnosnim ograničenjima.
2. Napraviti `docs/roles.md`, `docs/modules.md`, `docs/data-model.md` i `docs/roadmap.md` iz ovog plana.
3. Odabrati vizualni smjer prije izrade konačnih stranica: primarne i sekundarne boje, boje pozadine i teksta, tipografiju, stil gumba, kartica, ikona i poruka.
4. Dodati Ninin logo i naslovnu sliku za početnu/prijavnu stranicu. Sačuvati originalne datoteke projekta u repozitoriju samo ako su namijenjene javnoj upotrebi; inače koristiti javne optimizirane kopije i provjeriti prava korištenja.
5. Skicirati Ninin popis klijenata, profil klijenta i klijentov mobilni portal.
6. Koristiti `frontend-design` za prototip s izmišljenim podacima.
7. Dizajnirati prvo mobile-first, a zatim prilagoditi tablet i desktop; testirati čitljivost, dodirne površine i navigaciju na mobitelu.
8. Prikazati probne module: graf napretka, unos serija, modal vježbe i indikator završetka treninga.

**Gotovo kada:** Nina može prepoznati gdje upravlja klijentima i modulima, a klijent razumije što mu je dostupno.

### Faza 3 — Baza i prijava

1. Kreirati razvojni Supabase projekt odvojen od budućeg produkcijskog projekta.
2. Dodati prijavu, odjavu, oporavak lozinke i zaštitu privatnih stranica.
3. Implementirati poziv klijenta i sigurno povezivanje računa s klijentovim profilom.
4. Uvesti provjeru uloge na poslužitelju.
5. Napraviti početne tablice i migracije za profile, veze trener–klijent i module.
6. Uključiti RLS i minimalna dopuštenja; `service_role` ključ koristiti samo na poslužitelju.
7. Kreirati odvojene razvojne račune Nine i dva izmišljena klijenta; nikad ne dijeliti istu lozinku između korisnika.

**Gotovo kada:** Nina se može prijaviti; klijent se može aktivirati pozivom; klijent A ne može vidjeti klijenta B; javni posjetitelj ne može otvoriti privatnu stranicu.

### Faza 4 — Klijenti i postavke modula

1. Izraditi Ninin popis klijenata s imenom, statusom i osnovnim modulima.
2. Dodati traženje i pregled pojedinog klijenta.
3. Napraviti panel **Moduli** s jasnim prekidačima i stanjem spremljeno/greška.
4. Spremati svaku promjenu za točno odabranog klijenta.
5. Napraviti zajedničku provjeru ovlasti: prijavljen korisnik, veza s klijentom, modul uključen.
6. Primijeniti provjeru na klijentske stranice, poslužiteljske akcije i RLS politike.
7. Kada je modul isključen, prikazati pristojnu poruku i put natrag na početnu stranicu; ne prikazivati sadržaj iz cachea.
8. Zabilježiti tko je promijenio modul i kada, ako je to potrebno za administrativni trag.

**Gotovo kada:** Nina mijenja module jednog klijenta bez utjecaja na druge; izravna adresa ne zaobilazi isključenje; ponovno uključenje vraća prethodne zapise.

### Faza 5 — Profil klijenta

1. Dodati ime, e-mail, telefon, datum rođenja (ili dob), visinu, početnu težinu, cilj i status programa.
2. Omogućiti opcionalni avatar/sliku koju može dodati Nina ili klijent.
3. Razdvojiti polja koja uređuje Nina od onih koja može uređivati klijent.
4. Omogućiti prikaz i uređivanje uz validaciju na poslužitelju.
5. Ne unositi osjetljive zdravstvene podatke dok nisu dogovoreni svrha, pravna osnova i pravila čuvanja.

**Gotovo kada:** Nina i klijent vide ispravne podatke, a klijent ne može promijeniti zaštićena polja ili podatke druge osobe.

### Faza 6 — Modul treninga

1. Dogovoriti strukturu plana: naziv, opis, raspored dana, vježbe, zadani broj serija/ponavljanja i napomene.
2. Omogućiti Nini izradu, spremanje, uređivanje i dodjelu plana.
3. Omogućiti klijentu pregled plana samo ako je modul treninga uključen.
4. Za svaku vježbu prikazati **Prikaži vježbu**, koja otvara modal s Drive videom.
5. Dodati neobavezne unose opterećenja, ponavljanja i ostalih dogovorenih podataka za svaku seriju.
6. Prikazati prethodni rezultat kao podsjetnik pri sljedećem treningu.
7. Dopustiti završetak bez unesenih rezultata; po završetku prikazati zelenu kvačicu i vrijeme.
8. Dopustiti kasnije uređivanje zapisa i dodavanje bilješke.
9. Nina može zatražiti video izvođenja vježbe; klijent može učitati MP4 s mobitela, a Nina ga može pregledati privatno.
10. Omogućiti Nini pregled zapisa klijenta.
11. Sačuvati prethodne planove kada se zamijene ili arhiviraju, ako je potrebna povijest.

**Gotovo kada:** cijeli tijek Nina dodijeli → klijent pregleda → klijent zabilježi → Nina pregleda radi samo za pravog klijenta i uz uključen modul.

### Faza 7 — Prehrana i rezultati

1. Dogovoriti koja polja prehrambeni plan sadrži; izbjeći medicinske preporuke izvan Ninine stručnosti.
2. Omogućiti Nini unos i dodjelu prehrambenog plana.
3. Uvesti tjedne zapise težine i opcionalnih mjera: struk, ramena, bedra, gluteus i prilagodljiva dodatna mjera.
4. Prikazati mjere na grafu s datumima, bez povezivanja različitih jedinica na istu skalu.
5. Omogućiti fotografije po tjednom zapisu/mapi uz privatni pristup i brisanje.
6. Jasno ograničiti koji podaci klijent može dodati, a koje samo Nina.
7. Primijeniti ista pravila uključivanja modula i pristupa kao kod treninga.

**Gotovo kada:** svaki sadržaj vidljiv je samo pravom klijentu, a isključeni modul odbija i izravne zahtjeve.

### Faza 8 — Poruke

1. Dodati jedan razgovor Nine s pojedinim klijentom.
2. Spremati autora, vrijeme i tekst poruke.
3. Ograničiti razgovor na Ninu i tog klijenta.
4. Ako su poruke isključene, blokirati čitanje i slanje, ali zadržati povijest.
5. Dodati obavijest za drugu stranu o novoj poruci; u početku koristiti obavijest u portalu i e-mail.
6. Planirati push obavijesti za instaliranu web-aplikaciju kao zaseban korak nakon osnovne PWA funkcionalnosti.
7. U prvoj verziji koristiti obične poruke bez privitaka i bez kompliciranih statusa dostave.

**Gotovo kada:** Nina i klijent vide isti razgovor, drugi klijent mu nema pristup, a isključivanje blokira čitanje i slanje.

### Faza 9 — Pretplata

1. Za prvu verziju definirati ručne statuse, primjerice aktivna, pauzirana, istekla.
2. Omogućiti Nini unos razdoblja i interne bilješke.
3. Klijentu prikazati samo dogovorene podatke o vlastitom statusu.
4. Ne spremati kartične podatke.
5. Automatiziranu naplatu planirati kao zaseban projektni korak tek kada su razrađeni cijene, otkazivanje, povrati i obavijesti.

**Gotovo kada:** status je dosljedan u Nininom i klijentskom prikazu, bez mogućnosti klijenta da ga sam promijeni.

### Faza 10 — Objavljivanje i početak korištenja

1. Napraviti odvojeno razvojno i produkcijsko okruženje.
2. Postaviti produkcijske tajne u postavke hostinga, ne u GitHub.
3. Povezati repozitorij s hostingom i dodati domenu/HTTPS.
4. Unijeti samo potrebne produkcijske postavke u Supabaseu i ograničiti pristup.
5. Provjeriti poziv, prijavu, odjavu, oporavak računa i svaku ulogu.
6. Provjeriti uključenje/isključenje svakog modula s računom Nine i najmanje dva testna klijenta.
7. Provjeriti sigurnosne kopije i dogovoriti tko reagira ako aplikacija ne radi.
8. Pripremiti obavijest o privatnosti, rokove čuvanja i postupak za ispravak/brisanje podataka.
9. Tek nakon provjera pozvati prve stvarne klijente.

**Gotovo kada:** aplikacija je dostupna na domeni, tajne nisu u repozitoriju i provjere pristupa prolaze za sve uloge.

## 8. Pravila zaštite i privatnosti

- Tijekom izrade koristiti samo izmišljene podatke.
- Prikupljati samo ono što Nina stvarno treba za uslugu.
- Podatke o zdravlju, ozljedama, težini ili prehrani tretirati kao potencijalno osjetljive; prije stvarnih podataka utvrditi pravnu osnovu, obavijest i rok čuvanja.
- Svaki API/poslužiteljski postupak provjerava identitet, odnos s klijentom, dopuštenje radnje i stanje modula.
- Za svaku izloženu tablicu baze definirati minimalna dopuštenja i RLS pravila.
- Nikada ne slati tajne klijentu pregledniku; javna/publishable oznaka nije isto što i tajni servisni ključ.
- Isključenje modula, deaktivacija računa i brisanje podataka su tri odvojene radnje.
- Slike, fotografije napretka i klijentski videozapisi moraju biti pohranjeni privatno; ne koristiti javne URL-ove bez autentikacije za osjetljive datoteke.
- Postaviti razumna ograničenja formata, trajanja i veličine za učitane fotografije i videozapise te dogovoriti rok čuvanja.

## 9. Vizualni identitet i responzivnost

Vizualni smjer definirati sada, prije izrade stranica; pojedinačne detalje moguće je usavršavati kasnije. Prije implementacije prikupiti:

- Ninin logo u najboljoj dostupnoj kvaliteti i varijantu za svijetlu/tamnu pozadinu ako postoji.
- Naslovnu fotografiju za javnu/prijavnu stranicu i potvrdu da se smije koristiti.
- Primarnu boju brenda, jednu ili dvije pomoćne boje i neutralnu paletu za pozadine/tekst.
- Stil: energičan, smiren, elegantan, sportski ili drugi smjer koji odgovara Nini.
- Font za naslove i font za tekst; provjeriti čitljivost hrvatskih znakova (č, ć, đ, š, ž).
- Oblik gumba, kartica, ikona, oznaka statusa i grafova.

Izrada je mobile-first: prvo se oblikuje i provjerava prikaz na mobitelu, zatim se proširuje za desktop. Portal treba biti pogodan za dodavanje na početni zaslon kao PWA. Prikaz ne smije zahtijevati vodoravno pomicanje za osnovne radnje.

## 10. Kako raditi s Claude Codeom bez rasipanja vremena i tokena

1. Prije svakog zadatka reci Claudeu koje dokumente treba pročitati; ne lijepi cijeli plan svaki put.
2. Jedan zadatak neka mijenja jednu funkciju ili mali skup povezanih datoteka.
3. Za arhitekturu ili promjenu baze prvo zatraži plan bez izmjena.
4. Nakon plana traži implementaciju samo odobrenog opsega.
5. Na kraju zatraži: sažetak, promijenjene datoteke, ručne korake provjere i poznata ograničenja.
6. Ako Claude ponovi pogrešku ili previd, dodaj kratko pravilo u `CLAUDE.md`.
7. Nakon dovršene faze spremi promjene u Git commit s jasnim nazivom.
8. Ako razgovor postane dug, započni novi i uputi Claudea na `plan.md` i konkretan sljedeći korak.

### Predložak zadatka za svaku fazu

> Pročitaj `CLAUDE.md` i relevantne dijelove `plan.md`. Radi samo na fazi: [naziv faze]. Prije izmjene napiši kratak plan, datoteke koje ćeš mijenjati i eventualne pretpostavke. Nemoj širiti opseg na druge faze. Nakon izmjene sažmi što je napravljeno, navedi kako mogu ručno provjeriti prihvatne uvjete i istakni što nije dovršeno.

## 11. Početni prioriteti

**Prva verzija obavezno:** prijava i poziv klijenta, profil s kontaktima i avatarom, popis klijenata, ovlasti, moduli po klijentu, trening s evidencijom serija, tjedni graf napretka i opcionalne fotografije, prehrana, ručna pretplata s automatskim istekom/zaključavanjem, poruke s obavijestima, mobile-first/PWA.

**Odgoditi:** mobilnu aplikaciju, automatiziranu naplatu, videopozive, push obavijesti, integraciju s pametnim satovima, više trenerica i naprednu analitiku.

## 12. Završni kriteriji prve verzije

- Nina se prijavljuje i upravlja svojim klijentima.
- Klijent se aktivira pozivom i vidi samo svoj profil.
- Nina mijenja postavku svakog modula za svakog klijenta zasebno.
- Isključeni modul nije dostupan kroz izbornik, izravni URL ni poslužiteljski/bazni zahtjev.
- Ponovno uključenje modula vraća pristup sačuvanim podacima.
- Klijenti ne mogu vidjeti podatke jedni drugih.
- Nina ne može pristupiti klijentu koji nije povezan s njezinim računom.
- Javni GitHub repozitorij nema tajne ili stvarne osobne podatke.
- Produkcijska aplikacija koristi odvojene tajne i bazu od razvojnog okruženja.
- Profil podržava kontaktne podatke, cilj i neobaveznu sliku; povijest težine i mjera daje graf.
- Klijent može završiti trening bez rezultata ili unijeti serije, težinu i ponavljanja te kasnije urediti zapis.
- Nina može zatražiti privatni video izvođenja vježbe od klijenta.
- Program se automatski zaključa nakon isteka; Nina može zaključati, pauzirati ili otključati pristup ručno.
- Poruka stvara obavijest drugoj strani bez izlaganja teksta poruke u obavijesti.
- Osnovne funkcije rade na mobitelu i desktopu, a portal se može instalirati na početni zaslon kao PWA.
