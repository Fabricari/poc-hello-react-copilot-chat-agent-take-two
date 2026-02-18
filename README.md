# PoC Hello React — Take Two

## Purpose
This repository is a proof of concept to experiment with GitHub Copilot Chat Agents and evaluate whether the same end result can be reproduced through iterative prompting and collaboration.

This is **Take Two**.

For reference, **Take One** is here:
https://github.com/Fabricari/poc-hello-react-copilot-chat-agent-take-one

## Goal
Build a small React + Vite app while using Copilot Chat Agent-driven development and Git commits as checkpoints, then compare outcomes against a previous attempt.

## What We Built
The app evolved in small, committed steps:

1. Initialized Git and standardized branch setup.
2. Scaffolded a minimal React + Vite + TypeScript shell.
3. Added a semantic "Hello World" home view.
4. Styled the hero with:
   - Dark pastel background
   - SVG star as focal element
   - White blocky/cartoonish title text
5. Implemented per-letter rendering logic with kerning-aware positioning.
6. Added configurable letter wobble animation within the configured rotation range.
7. Added star rotation animation (clockwise, centered origin).
8. Added click/press interaction:
   - Mouse down: star shrinks and spin pauses
   - Mouse up: star restores and spin resumes
9. Added a modal on mouse release with an embedded YouTube video and a 10px white border.

## Process Notes
- Development was done through incremental prompts and response-driven edits.
- Requirements were clarified and refined in-flight.
- Behavior and visuals were validated repeatedly with local run/build checks.
- Changes were versioned as logical commits to preserve the decision trail.

## Conclusion
This iteration was a success.

Although the code implementation differed from previous attempts, the resulting behavior and UX were similar. The main differences came from requirement blindspots and how those details were clarified over time.

## Demo
This Take Two proof of concept was also recorded as a demo and will be shared on YouTube.

## Local Development
Install dependencies and run locally:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
