# PhysioFlow

## Innholdsfortegnelse

- [Introduksjon](#introduksjon)
- [Funksjoner](#funksjoner)
- [Teknologi](#teknologi)
- [Forutsetninger](#forutsetninger)
- [Komme i gang](#komme-i-gang)
  - [Klon repository](#klon-repository)
  - [Installer avhengigheter](#installer-avhengigheter)
  - [Start prosjektet](#start-prosjektet)
- [Bruk av Postman for API-testing](#bruk-av-postman-for-api-testing)
  - [Installering](#installering)
  - [Endepunkter](#endepunkter)
    - [Alle Øvelser](#alle-øvelser)
    - [Øvelser basert på Fokusområde](#øvelser-basert-på-fokusområde)
    - [AI Chat](#ai-chat)
- [Simulator](#simulator)
  - [Alternativ Metode uten Expo GO](#alternativ-metode-uten-expo-go)
    - [Android Emulator](#android-emulator)
    - [iOS Simulator](#ios-simulator)
- [Tømming av cache](#tømming-av-cache)
  - [Hvordan utføre tømming av cache](#hvordan-utføre-tømming-av-cache)
    - [1. Bruke Expo CLI](#1-bruke-expo-cli)
    - [2. Manuelt tømme cache](#2-manuelt-tømme-cache)
    - [3. Tømme cache i Expo GO appen](#3-tømme-cache-i-expo-go-appen)
  - [AI Chat med OpenAI GPT-3.5](#ai-chat-med-openai-gpt-35)

## Introduksjon

Vi har utviklet en app for fysioterapeuter og kiropraktorer som hjelper pasienter og brukere med å kunne diagnostiseres og få anbefalte rehabiliteringsøvelser uten å måtte være fysisk tilstede hos behandlere. Brukeren registrerer seg og legger inn informasjon som kjønn, vekt, høyde og alder, og etter å ha besvart en rekke spørsmål som skal danne grunnlaget for diagnosen som settes. Deretter får bruker tildelt x-antall øvelser som vedkommende kan legge til i sitt program, eller ved manglende dignostisering- bli henvist til å kontakte behandler. 

## Funksjoner

**Brukerregistrering:**

- Registrer brukerdata som kjønn, vekt, høyde og alder.

**Diagnose og øvelser:**

- Få en antatt diagnose og foreslåtte øvelser basert på svar på spørsmål om problemområder.

**AI Interaksjon:**

- Per dags dato, en enkel oppsatt GPT3.5 Chat.

## Teknologi

**Frontend:**

- React Native
- Typescript

**Backend:**

- Node.js Express

**Database:**

- Firestore

**Simulering:**

- Expo GO

**Plattform:**

- Android og iOS

## Forutsetninger

- [Node.js](https://nodejs.org/en/) installert på din maskin.
- [npm](https://www.npmjs.com/) installert på din maskin.
- [Expo CLI](https://expo.dev/tools#cli) installert globalt på din maskin: `npm install -g expo-cli`

**Opprette:** en `.env`-fil i rot-mappen for **backend** med følgende miljøvariabler:
  - `OPENAI_API_KEY`: API-nøkkel for OpenAI GPT-3.5.
  - `FIREBASE_PROJECT_ID`: Firebase Project ID.
  - `FIREBASE_PRIVATE_KEY`: Firebase Private Key.
  - `FIREBASE_CLIENT_EMAIL`: Firebase Client Email.

- **Opprette:** en `.env`-fil i rot-mappen for **frontend** med følgende miljøvariabler:
  - `API_KEY`: API-nøkkel for autentisering.
  - `AUTH_DOMAIN`: Autentiseringsdomene.
  - `PROJECT_ID`: Project ID.
  - `STORAGE_BUCKET`: Firebase Storage Bucket.
  - `MESSAGING_SENDER_ID`: Sender ID for meldingstjeneste.
  - `APP_ID`: App ID for React-appen.

## Komme i gang

### Klon repository

git clone https://github.com/TommyS-NO/PhysioGO.git

### Installer avhengigheter

#### Installer avhengigheter for frontend, backend og root:
npm install


### Start prosjektet

##### Start prosjektet fra root-mappen:
npm start


## Bruk av Postman for API-testing

### Installering

- Last ned og følg installeringsveiviseren for [Postman](https://postman.com).

### Endepunkter

#### Alle øvelser

**[/api/exercises](http://localhost:3000/api/exercises/)**

- Metode: GET
- Beskrivelse: Henter alle øvelser
- Parametere: Ingen

#### Øvelser basert på fokusområde

**[/api/exercises/:focusarea](http://localhost:3000/api/survey/neck)**

- Metode: GET
- Beskrivelse: Henter øvelser for spesifikk fokusområde (neck, elbow, knee, shoulder, ankle, lowBack, upperBack)
- Parametere: ingen

#### AI Chat ###

**[/api/chat/start](http://localhost:3000/api/chat/start)**

- Metode: POST
- Beskrivelse: Start en chat-økt
- Parametere: 
  Headers: Content-Type:application/json
  Body: {"userId: "exampleUserId"}

  **[/api/chat/](http://localhost:3000/api/chat/:sessionId/message)**

- Metode: POST
- Beskrivelse: Send Melding
- Parametere: 
  Headers: Content-Type:application/json
  Body: {"message: "hello world"}

## Simulator

For å simulere appen under utvikling, bruk Expo GO:

- Åpne Expo GO: Start Expo GO-appen på din mobile enhet.
- Skann QR-kode: Skann QR-koden som vises i terminalen etter å ha kjørt `npm start`.
- Test appen: Appen vil åpnes i Expo GO, hvor du kan teste funksjonaliteten på både Android og iOS.

### Alternativ metode uten Expo GO

Hvis du ikke ønsker å bruke Expo GO, kan du bruke en Android Emulator eller iOS Simulator:

#### Android emulator

- Installer Android Studio fra Android Developer.
- Følg instruksjonene for å sette opp en virtuell enhet (AVD).
- Start emulatoren og kjør `npm start`.

#### iOS simulator

- Krever en Mac med Xcode installert fra Mac App Store.
- Åpne Xcode og gå til Xcode > Preferences > Components for å installere en simulator.
- Start iOS simulatoren og kjør `npm start`.

## Tømming av cache

Når du bruker Expo GO til å utvikle og teste React Native-applikasjoner, kan det hende at du støter på problemer som skyldes cache. Cache er en lagringsmekanisme som brukes til å raskt hente tidligere lastede data, men noen ganger kan det føre til at gamle eller feilaktige data blir brukt i stedet for oppdaterte versjoner. Dette kan føre til problemer som:

- Utdatert kode: Endringer du har gjort i koden din vises ikke i appen.
- Feil under utvikling: Appen kan oppføre seg uforutsigbart på grunn av konflikter med gamle data.
- Ytelsesproblemer: Akkumulering av cache kan påvirke appens ytelse negativt.

### Hvordan utføre tømming av cache

Tømming av cache kan gjøres på flere måter, avhengig av hvilket verktøy eller hvilken metode du bruker. Her er noen vanlige metoder for å tømme cache når du bruker Expo GO:

#### 1. Bruke Expo CLI

Den enkleste måten å tømme cache på er ved å bruke Expo CLI-kommandoen `expo start -c`. Denne kommandoen starter prosjektet ditt på nytt og tømmer cachen samtidig.

#### 2. Manuelt tømme cache

Noen ganger kan det være nødvendig å tømme cache manuelt ved å slette spesifikke mapper. Dette inkluderer:

- node_modules katalogen
- package-lock.json filen
- Expo cache katalogen (vanligvis .expo)

Her er et eksempel på hvordan du kan gjøre dette:

rm -rf node_modules
rm package-lock.json
rm -rf .expo
npm install
expo start -c


#### 3. Tømme cache i Expo GO appen

Hvis du mistenker at problemet er med cachen i Expo GO appen på din mobile enhet:

- For Android: Gå til Innstillinger > Apper > Expo GO > Lagring > Tøm cache.
- For iOS: Det er ingen direkte metode for å tømme cache på iOS, men du kan prøve å slette

## AI Chat med OpenAI GPT-3.5

Denne applikasjonen inkluderer en enkel chat-funksjon som benytter OpenAI GPT-3.5, en avansert språkmodell for naturlig språkprosessering. Denne funksjonen gjør det mulig for brukere å føre en samtale med en virtuell assistent og stille spørsmål eller be om veiledning innenfor appens domene.

For å bruke AI Chat-funksjonen, følg disse trinnene:

1. Gå til chat-seksjonen i appen.
2. Skriv inn ditt spørsmål eller melding i inndatafeltet.
3. Send meldingen din, og vent på at den virtuelle assistenten responderer.

Merk at denne chat-funksjonen er ment som en enkel demonstrasjon av mulighetene til GPT-3.5, og har visse begrensninger. For eksempel har den begrenset kunnskap, og svarene den gir kan være upresise eller feilaktige. Derfor anbefales det å ta svarene fra den virtuelle assistenten med en klype salt, og konsultere andre pålitelige kilder ved behov.

For mer informasjon om OpenAI GPT-3.5 og mulighetene det gir, besøk [OpenAI](https://www.openai.com).
