# Marathi Bolibhasha Project 

Bolibhasha is a small React app for converting text between dialects and converting speech to text / text to speech. The app provides a simple UI with a navigation hamburger menu to switch between tools.

## Features

- Text-to-Text Dialect Converter (`DialectConverter`): convert text between dialect variations.
- TODO: Speech Converter (`SpeechConverter`): speech-to-text (listen) and text-to-speech (speak) functionality.

## Start Frontend

1. Install dependencies:

```
npm install
```

2. Run the development server:

```
npm run start
```

3. Open http://localhost:3000 in your browser.



## Start Backend

1. Install dependencies:

```
npm install
```


2. Run the development server:

```
node server.js
```

or 

```
nodemon server.js
```

## Project Structure (key files)

- `src/App.jsx` — main app container, renders header, navigation and selected component
- `src/components/Navigation.jsx` — hamburger menu and navigation
- `src/components/DialectConverter.jsx` — text-to-text dialect converter UI
- `src/components/SpeechConverter.jsx` — speech converter (speech-to-text, text-to-speech)
- `src/styles/Navigation.css` — navigation styles
- `src/styles/SpeechConverter.css` — speech converter styles

## Usage

- Click the hamburger menu at the top-right to open the menu.
- Select "Text to Text" to use the dialect converter.
- Select "Speech Converter" to use the speech features (browser support required).

Notes:
- Speech recognition uses the browser's `SpeechRecognition` API (webkitSpeechRecognition/SpeechRecognition). It may not work in all browsers; Chrome is recommended for best support.

## Development notes

- Components are implemented as React functional components.
- Styling is plain CSS under `src/styles/`.

If you'd like, I can add a CONTRIBUTING section, deployment instructions, or update the README with screenshots — tell me which you'd prefer next.
