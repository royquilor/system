# Card Selection System

A card-based image selection interface that allows designers to mark generated images with three distinct states: Edit, Like, and Set as Final. Multiple cards can be set as final simultaneously.

## Features

- **Card Grid Layout**: Responsive grid (1-2 columns on mobile, 3-4 on desktop)
- **Hover Actions**: Edit, Like, and Set as Final buttons appear on hover
- **Toggle Components**: Like and Set as Final use shadcn/ui Toggle components for consistent state management
- **Visual Indicators**: 
  - Final badge appears in top-right corner when card is marked as final
  - Green border around finalized cards
  - Red heart icon when liked
- **Smooth Animations**: Card hover effects, badge slide-in, and toggle transitions
- **Accessibility**: Full keyboard navigation and screen reader support

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Button, Badge, Toggle)
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **TypeScript**: Full type safety

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Hover over any card** to reveal the action buttons
2. **Click the heart icon** to like/unlike a card (toggle)
3. **Click "Set as Final"** to mark a card as final (toggle)
4. **Multiple cards** can be set as final simultaneously
5. **Final cards** show a green badge and border
6. **Liked cards** show a filled red heart icon

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components (Button, Badge, Toggle)
│   ├── ImageCard.tsx # Individual card component
│   └── ImageSelectionGrid.tsx # Grid container component
├── lib/
│   └── utils.ts      # Utility functions (cn for class merging)
├── types/
│   └── index.ts      # TypeScript interfaces
├── App.tsx           # Main app component with state management
├── main.tsx          # Application entry point
└── index.css         # Global styles and Tailwind directives
```

## Component Details

### ImageCard
- Displays product image
- Shows final badge when `isFinal` is true
- Hover overlay with three actions: Edit, Like (Toggle), Set as Final (Toggle)
- Handles image load errors gracefully

### ImageSelectionGrid
- Responsive grid layout
- Empty state handling
- Renders multiple ImageCard components

## State Management

The app uses React's `useState` hook to manage card states:
- `isLiked`: Boolean for like toggle state
- `isFinal`: Boolean for final toggle state

Both states are independent and can be toggled separately.

## Customization

### Colors
- Final state: Green (#22c55e)
- Like state: Red (#ef4444)
- Hover overlay: Black with 60% opacity

### Animations
- Card hover: 150ms ease transition
- Badge appearance: 200ms slide-in animation
- Toggle transitions: 150ms ease

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

