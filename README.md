# Personal Portfolio

A React TypeScript portfolio showcasing Vishwajeet Bharadia's work as a Software Engineer.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

## Build

```bash
npm run build
```

Output goes to the `dist/` folder. Use `npm run preview` to preview the production build locally.

## Project Structure

```
src/
├── components/     # Reusable components (Navbar)
├── contexts/       # React context (Theme)
├── data/           # Static content (blog posts, projects)
├── pages/          # Route pages (Home, Projects, Blog, etc.)
├── styles/         # CSS files
└── main.tsx
```

## Features

- Dark/light theme toggle with localStorage persistence
- Responsive design with mobile hamburger menu
- System design diagrams with lightbox viewer
- Expandable project cards
- Blog with pagination
