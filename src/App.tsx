import './App.css';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

type HomeTheme = {
  backgroundColor: string;
  starColor: string;
  textColor: string;
};

type LetterLayout = {
  char: string;
  left: number;
  width: number;
  rotation: number;
};

const BASE_LETTER_ROTATION_DEG = 0;
const RANDOM_ROTATION_RANGE_DEG = 20;
const TITLE_FONT_WEIGHT = 900;
const TITLE_FONT_SIZE_PX = 72;
const TITLE_FONT_FAMILY = "Impact, Haettenschweiler, 'Arial Black', sans-serif";

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getLetterLayout(text: string): { letters: LetterLayout[]; totalWidth: number } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    const fallback = text.split('').map((char, index) => ({
      char,
      left: index * TITLE_FONT_SIZE_PX * 0.62,
      width: TITLE_FONT_SIZE_PX * 0.62,
      rotation: BASE_LETTER_ROTATION_DEG + randomInRange(-RANDOM_ROTATION_RANGE_DEG, RANDOM_ROTATION_RANGE_DEG)
    }));

    return {
      letters: fallback,
      totalWidth: fallback.length * TITLE_FONT_SIZE_PX * 0.62
    };
  }

  context.font = `${TITLE_FONT_WEIGHT} ${TITLE_FONT_SIZE_PX}px ${TITLE_FONT_FAMILY}`;

  const letters: LetterLayout[] = text.split('').map((char, index) => {
    const start = text.slice(0, index);
    const end = text.slice(0, index + 1);
    const left = context.measureText(start).width;
    const right = context.measureText(end).width;
    const width = right - left;

    return {
      char,
      left,
      width,
      rotation: BASE_LETTER_ROTATION_DEG + randomInRange(-RANDOM_ROTATION_RANGE_DEG, RANDOM_ROTATION_RANGE_DEG)
    };
  });

  return {
    letters,
    totalWidth: context.measureText(text).width
  };
}

export function App() {
  const greeting: string = 'HELLO WORLD';

  const theme: HomeTheme = {
    backgroundColor: '#4f5678',
    starColor: '#75699a',
    textColor: '#ffffff'
  };

  const styleVars = {
    '--background-color': theme.backgroundColor,
    '--star-color': theme.starColor,
    '--text-color': theme.textColor,
    '--title-font-size': `${TITLE_FONT_SIZE_PX}px`
  } as CSSProperties;

  const titleLayout = useMemo(() => getLetterLayout(greeting), [greeting]);

  const titleStyle = {
    width: `${titleLayout.totalWidth}px`
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
        <h1 className="hero-title" style={titleStyle}>
          {titleLayout.letters.map((letter, index) => {
            const letterStyle = {
              left: `${letter.left}px`,
              width: `${Math.max(letter.width, 1)}px`,
              transform: `rotate(${letter.rotation}deg)`
            } as CSSProperties;

            return (
              <span key={`${letter.char}-${index}`} className="hero-letter" style={letterStyle}>
                {letter.char === ' ' ? '\u00A0' : letter.char}
              </span>
            );
          })}
        </h1>
      </section>
    </main>
  );
}