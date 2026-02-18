import './App.css';
import type { CSSProperties } from 'react';

type HomeTheme = {
  backgroundColor: string;
  starColor: string;
  textColor: string;
};

export function App() {
  const greeting: string = 'Hello World';

  const theme: HomeTheme = {
    backgroundColor: '#4f5678',
    starColor: '#75699a',
    textColor: '#ffffff'
  };

  const styleVars = {
    '--background-color': theme.backgroundColor,
    '--star-color': theme.starColor,
    '--text-color': theme.textColor
  } as CSSProperties;

  return (
    <main className="home" style={styleVars}>
      <section className="hero" aria-label="Hello world hero">
        <svg
          className="hero-star"
          viewBox="0 0 100 100"
          role="img"
          aria-label="Star background"
        >
          <polygon points="50,4 61,36 96,36 68,56 79,90 50,70 21,90 32,56 4,36 39,36" />
        </svg>
        <h1 className="hero-title">{greeting}</h1>
      </section>
    </main>
  );
}