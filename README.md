# Academic Dashboard

A modern, neon-themed React dashboard for online learning, built with Vite. Features a vibrant blue/green neon look, techy Orbitron font, and interactive UI for course management, homework tracking, and more.

## Features

- **Neon blue/green theme** with adjustable neon intensity (slider)
- **Course management**: Enroll, unenroll, and mark courses as completed
- **Ongoing and completed courses**: Dashboard shows enrolled (ongoing) and completed courses persistently (localStorage)
- **Homework progress tracker**: Click to increment progress for each task
- **Ask Doubt modal**: Neon-styled modal simulates Google search for course-related questions
- **Search bar**: Filters courses across all pages, with instant feedback
- **Calendar**: Interactive, themed for May 2022
- **Premium section**: Anchored to sidebar bottom
- **Responsive, tech-inspired UI**: Orbitron font, gradients, glowing effects


## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```bash
cd dash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

- `src/App.jsx` — Main React component (dashboard logic/UI)
- `src/App.css` — Neon theme and responsive styles
- `src/main.jsx`, `src/index.css` — Entry point and base styles
- `public/` — Static assets (logo, etc.)

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Orbitron Google Font](https://fonts.google.com/specimen/Orbitron)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for persistence

## Customization

- **Neon Intensity**: Use the slider in the dashboard header to adjust the neon glow.
- **Course Data**: Edit the `newCourses` array in `App.jsx` to add/remove courses.

## License

This project is for educational/demo purposes. Add a LICENSE file if you wish to open source it.

---

Made with ❤️ using React + Vite
