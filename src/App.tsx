import './App.css';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

type HomeTheme = {
  backgroundColor: string;
  starColor: string;
  textColor: string;
};

type LetterLayout = {
  char: string;
  left: number;
  width: number;
  phaseOffsetSeconds: number;
};

const BASE_LETTER_ROTATION_DEG = 0;
const RANDOM_ROTATION_RANGE_DEG = 20;
const LETTER_SPACING_PX = 4;
const WOBBLE_CYCLE_SECONDS = 3.2;
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
      left: index * (TITLE_FONT_SIZE_PX * 0.62 + LETTER_SPACING_PX),
      width: TITLE_FONT_SIZE_PX * 0.62,
      phaseOffsetSeconds: randomInRange(0, WOBBLE_CYCLE_SECONDS)
    }));

    return {
      letters: fallback,
      totalWidth:
        fallback.length * TITLE_FONT_SIZE_PX * 0.62 +
        Math.max(0, fallback.length - 1) * LETTER_SPACING_PX
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
      left: left + index * LETTER_SPACING_PX,
      width,
      phaseOffsetSeconds: randomInRange(0, WOBBLE_CYCLE_SECONDS)
    };
  });

  return {
    letters,
    totalWidth: context.measureText(text).width + Math.max(0, text.length - 1) * LETTER_SPACING_PX
  };
}

export function App() {
  const greeting: string = 'HELLO WORLD';
  const [isPressed, setIsPressed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme: HomeTheme = {
    backgroundColor: '#4f5678',
    starColor: '#75699a',
    textColor: '#ffffff'
  };

  const styleVars = {
    '--background-color': theme.backgroundColor,
    '--star-color': theme.starColor,
    '--text-color': theme.textColor,
    '--title-font-size': `${TITLE_FONT_SIZE_PX}px`,
    '--wobble-min-deg': `${BASE_LETTER_ROTATION_DEG - RANDOM_ROTATION_RANGE_DEG}deg`,
    '--wobble-max-deg': `${BASE_LETTER_ROTATION_DEG + RANDOM_ROTATION_RANGE_DEG}deg`,
    '--wobble-duration': `${WOBBLE_CYCLE_SECONDS}s`
  } as CSSProperties;

  const titleLayout = useMemo(() => getLetterLayout(greeting), [greeting]);

  const titleStyle = {
    width: `${titleLayout.totalWidth}px`
  } as CSSProperties;

  function handleMouseUp() {
    if (isPressed) {
      setIsModalOpen(true);
    }

    setIsPressed(false);
  }

  return (
    <main className="home" style={styleVars}>
      <section
        className={`hero${isPressed ? ' hero--pressed' : ''}`}
        aria-label="Hello world hero"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPressed(false)}
      >
        <div className="hero-star-wrap" aria-hidden="true">
          <svg
            className="hero-star"
            viewBox="0 0 100 100"
            role="img"
            aria-label="Star background"
          >
            <polygon points="50,4 64,31 96,36 73,60 79,90 50,79 21,90 27,60 4,36 36,31" />
          </svg>
        </div>
        <h1 className="hero-title" style={titleStyle}>
          {titleLayout.letters.map((letter, index) => {
            const letterStyle = {
              left: `${letter.left}px`,
              width: `${Math.max(letter.width, 1)}px`,
              animationDelay: `-${letter.phaseOffsetSeconds}s`
            } as CSSProperties;

            return (
              <span key={`${letter.char}-${index}`} className="hero-letter" style={letterStyle}>
                {letter.char === ' ' ? '\u00A0' : letter.char}
              </span>
            );
          })}
        </h1>
      </section>

      {isModalOpen ? (
        <div className="video-modal-overlay" role="dialog" aria-modal="true" aria-label="YouTube video">
          <div className="video-modal">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/mHONNcZbwDY?si=JHS5_THr9NwfH5ac"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}