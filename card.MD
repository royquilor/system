# Product Requirements Document: Card Selection System with "Set as Final" Feature

## Overview
A card-based image selection interface that allows designers to mark generated images with three distinct states: Edit, Like, and Set as Final. Multiple cards can be set as final simultaneously. The Like functionality uses a toggle component for consistent state management.

---

## User Stories

**As a designer, I want to:**
- View generated images in a card grid layout
- Hover over cards to reveal action buttons
- Like multiple images for consideration using a toggle interaction
- Set multiple images as "Final" selections
- Easily distinguish between liked and finalized images
- Toggle the "Final" state on/off
- See persistent visual indicators for finalized cards
- Have a consistent toggle experience across all interactive states

---

## Technical Specifications

### Tech Stack
- **Framework**: React
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: lucide-react

### Required shadcn/ui Components
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add card
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add toggle
npx shadcn-ui@latest add toggle-group
```

---

## Functional Requirements

### FR-1: Card Display
- Display images in a responsive grid (2 columns on mobile, 3-4 on desktop)
- Each card shows a product image with neutral background
- Cards have subtle hover elevation effect

### FR-2: Action Buttons (Hover State)
**Trigger**: User hovers over card
**Display**: Three action buttons appear as overlay using shadcn/ui components
- **Edit** (Pencil icon) - Left position - Standard Button
- **Like** (Heart icon) - Center position - **Toggle Component**
- **Set as Final** (Check icon) - Right position - **Toggle Component**

**Implementation Note**: Use `Toggle` component from shadcn/ui for Like and Set as Final actions to ensure consistent pressed/unpressed states and built-in accessibility.

### FR-3: Like Functionality (Toggle Component)
**Component**: `<Toggle>` from shadcn/ui

**Behavior**:
- Uses shadcn/ui Toggle component for on/off state
- Independent from "Final" state
- Can like without setting as final, and vice versa
- Pressed state persists across hover interactions

**Visual Feedback**:
- **Unpressed State**: 
  - Outline heart icon (`<Heart />` from lucide-react)
  - Default toggle styling
  - Gray color (#6b7280)
  
- **Pressed State**: 
  - Filled heart icon (`<Heart className="fill-current" />`)
  - Toggle "pressed" styling from shadcn/ui
  - Red color (#ef4444)
  - Slightly elevated appearance

**Props**:
```typescript
<Toggle
  pressed={card.isLiked}
  onPressedChange={(pressed) => toggleLike(card.id)}
  aria-label={card.isLiked ? "Unlike image" : "Like image"}
>
  <Heart className={card.isLiked ? "fill-current" : ""} />
</Toggle>
```

### FR-4: Set as Final - Multiple Selection Mode (Toggle Component)
**Component**: `<Toggle>` from shadcn/ui

**Behavior**:
- Uses shadcn/ui Toggle component for consistent state management
- Users can set multiple cards as "Final" simultaneously
- Pressing toggle sets the state ON/OFF
- No limit on number of final selections
- Toggle state synchronized with badge visibility

**Visual Feedback**:
- **Unpressed State**: 
  - "Set as Final" text with check icon
  - Default toggle styling
  - Outline appearance
  
- **Pressed State**: 
  - "Final ✓" text
  - Toggle "pressed" styling from shadcn/ui
  - Filled green background (#22c55e)
  - White text

**Additional Visual Indicators** (when pressed):
- **Final Badge**: Appears in top-right corner (persistent, always visible)
  - Badge component from shadcn/ui
  - Green background (#22c55e), white text
  - Text: "FINAL" with checkmark icon
  
- **Card Border**: Subtle green border (2px, #22c55e)

**Hover on Finalized Card**:
- Toggle shows "Remove Final" text
- Maintains pressed state styling
- Optional: slight red tint on hover to indicate removal (#fef2f2 background)

**Props**:
```typescript
<Toggle
  pressed={card.isFinal}
  onPressedChange={(pressed) => toggleFinal(card.id)}
  aria-label={card.isFinal ? "Remove final selection" : "Set as final"}
  className={cn(
    card.isFinal && "bg-green-500 hover:bg-green-600 text-white"
  )}
>
  <Check className="mr-1" />
  {card.isFinal ? "Final ✓" : "Set as Final"}
</Toggle>
```

### FR-5: Toggle Group Consideration (Future Enhancement)
**Note**: While individual `Toggle` components are used for Like and Set as Final (since they're independent states), the `ToggleGroup` component could be utilized if we need to:
- Add mutually exclusive action modes (e.g., "Compare Mode" vs "Select Mode")
- Group related view options (e.g., "Grid View" | "List View" | "Masonry")

For current implementation, individual Toggle components are appropriate.

### FR-6: Edit Functionality
**Component**: Standard `<Button>` from shadcn/ui

**Behavior**: 
- Clicking opens edit modal/panel (implementation can be a placeholder for this PRD)
- Does not affect Like or Final states
- Standard button component (not a toggle)

---

## UI/UX Requirements

### UX-1: Micro-interactions
- **Card Hover**: Smooth elevation transition (150ms ease)
- **Toggle Interaction**: 
  - Uses native shadcn/ui toggle press animation
  - Smooth state transition (150ms)
  
- **Setting as Final**: 
  - Scale animation (1.02x for 200ms) on card
  - Badge slides in from top-right
  - Border color transition (300ms)
  
- **Like Toggle**: 
  - Heart icon fill animation
  - Color transition from gray to red

### UX-2: Visual Hierarchy
```
Priority Order:
1. Final Badge (always visible when set)
2. Image content
3. Action toggles (on hover)
4. Edit button (on hover)
```

### UX-3: Accessibility (Enhanced with Toggle Components)
- **Toggle Components** provide built-in accessibility:
  - Proper role="button" and aria-pressed attributes
  - Keyboard support (Space/Enter to toggle)
  - Focus management
  
- **Additional Requirements**:
  - All toggles have descriptive aria-labels
  - Badge has aria-live="polite" for screen readers
  - Keyboard navigation support:
    - Tab to navigate between cards and actions
    - Enter/Space to activate focused toggle
    - Focus visible styles for all interactive elements
  - Sufficient color contrast (WCAG AA minimum)
  - Screen reader announces: "Liked" / "Not liked", "Set as final" / "Not final"

### UX-4: Responsive Behavior
- **Mobile (<640px)**: 
  - 1-2 column grid
  - Larger toggle targets (min 44x44px)
  - Toggle text may condense ("Final" instead of "Set as Final")
  
- **Tablet (640-1024px)**: 2-3 column grid
- **Desktop (>1024px)**: 3-4 column grid
- Action toggles arrange horizontally with adequate spacing

---

## Component Structure

```tsx
<ImageSelectionGrid>
  └── <ImageCard> (multiple instances)
      ├── <CardContent>
      │   ├── <img> (product image)
      │   ├── <FinalBadge> (conditional, shadcn/ui Badge)
      │   └── <ActionOverlay> (hover state)
      │       ├── <Button variant="outline"> (Edit)
      │       ├── <Toggle pressed={isLiked}> (Like)
      │       └── <Toggle pressed={isFinal}> (Set as Final)
```

---

## Data Model

```typescript
interface ImageCard {
  id: string;
  imageUrl: string;
  alt: string;
  isLiked: boolean;      // Controls Toggle pressed state
  isFinal: boolean;      // Controls Toggle pressed state
  createdAt: Date;
}

interface CardActions {
  onEdit: (id: string) => void;
  onToggleLike: (id: string) => void;      // Toggle handler
  onToggleFinal: (id: string) => void;     // Toggle handler
}
```

---

## State Management

```typescript
// Component State
const [cards, setCards] = useState<ImageCard[]>([]);

// Toggle Functions (Compatible with shadcn/ui Toggle)
const toggleLike = (id: string) => {
  setCards(cards.map(card => 
    card.id === id ? { ...card, isLiked: !card.isLiked } : card
  ));
};

const toggleFinal = (id: string) => {
  setCards(cards.map(card => 
    card.id === id ? { ...card, isFinal: !card.isFinal } : card
  ));
};

// Alternative: Using the pressed parameter from Toggle
const handleLikeChange = (id: string, pressed: boolean) => {
  setCards(cards.map(card => 
    card.id === id ? { ...card, isLiked: pressed } : card
  ));
};

const handleFinalChange = (id: string, pressed: boolean) => {
  setCards(cards.map(card => 
    card.id === id ? { ...card, isFinal: pressed } : card
  ));
};
```

---

## Visual Specifications

### Colors (shadcn/ui Compatible)
```css
/* Final State */
--final-badge-bg: hsl(142, 71%, 45%) /* green-500 */
--final-badge-text: hsl(0, 0%, 100%)
--final-border: hsl(142, 71%, 45%)
--final-border-width: 2px
--final-toggle-bg: hsl(142, 71%, 45%)
--final-toggle-hover: hsl(142, 71%, 40%)

/* Like State */
--like-active: hsl(0, 84%, 60%) /* red-500 */
--like-inactive: hsl(220, 9%, 46%) /* gray-500 */
--like-toggle-pressed: hsl(0, 84%, 60%)

/* Toggle States (shadcn/ui defaults) */
--toggle-pressed: var(--accent)
--toggle-hover: var(--accent-hover)

/* Hover States */
--overlay-bg: rgba(0, 0, 0, 0.6)
--toggle-hover-scale: 1.05

/* Card */
--card-bg: hsl(0, 0%, 100%)
--card-hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

### Spacing
```css
--card-padding: 1rem
--badge-padding: 0.25rem 0.5rem
--toggle-gap: 0.5rem
--grid-gap: 1.5rem
--toggle-min-height: 2.5rem /* 40px */
--toggle-padding: 0.5rem 1rem
```

### Typography
```css
/* Badge */
--badge-font-size: 0.75rem (12px)
--badge-font-weight: 600

/* Toggle Buttons */
--toggle-font-size: 0.875rem (14px)
--toggle-font-weight: 500

/* Icons in Toggles */
--toggle-icon-size: 1rem (16px)
```

---

## Animation Specifications

```css
/* Card Hover */
transition: transform 150ms ease, box-shadow 150ms ease;

/* Toggle Press Animation (built into shadcn/ui) */
/* Additional custom animations */

/* Final Badge Appearance */
@keyframes slideInBadge {
  from { 
    transform: translateY(-100%); 
    opacity: 0;
  }
  to { 
    transform: translateY(0); 
    opacity: 1;
  }
}
animation: slideInBadge 200ms ease-out;

/* Set as Final Click (Card) */
@keyframes scaleCard {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
animation: scaleCard 200ms ease;

/* Border Color Transition */
transition: border-color 300ms ease;

/* Heart Icon Fill */
.heart-icon {
  transition: fill 150ms ease, color 150ms ease;
}
```

---

## shadcn/ui Toggle Component Customization

### Custom Toggle Variants

```typescript
// In your component file or custom variants
const toggleVariants = {
  variant: {
    default: "...", // shadcn default
    like: cn(
      "data-[state=on]:bg-red-500",
      "data-[state=on]:text-white",
      "hover:bg-red-50"
    ),
    final: cn(
      "data-[state=on]:bg-green-500",
      "data-[state=on]:text-white",
      "data-[state=on]:hover:bg-green-600"
    ),
  }
}
```

### Usage Example

```tsx
// Like Toggle with custom styling
<Toggle
  pressed={card.isLiked}
  onPressedChange={(pressed) => handleLikeChange(card.id, pressed)}
  aria-label={card.isLiked ? "Unlike image" : "Like image"}
  className={cn(
    "transition-all",
    card.isLiked && "bg-red-500 text-white hover:bg-red-600"
  )}
>
  <Heart className={cn(
    "w-4 h-4",
    card.isLiked && "fill-current"
  )} />
  <span className="ml-1 hidden sm:inline">
    {card.isLiked ? "Liked" : "Like"}
  </span>
</Toggle>

// Final Toggle with custom styling
<Toggle
  pressed={card.isFinal}
  onPressedChange={(pressed) => handleFinalChange(card.id, pressed)}
  aria-label={card.isFinal ? "Remove final selection" : "Set as final"}
  className={cn(
    "transition-all",
    card.isFinal && "bg-green-500 text-white hover:bg-green-600"
  )}
>
  <Check className="w-4 h-4 mr-1" />
  {card.isFinal ? "Final" : "Set as Final"}
</Toggle>
```

---

## Edge Cases & Error Handling

### EC-1: Image Load Failure
- Show placeholder with broken image icon
- Display alt text
- Maintain card structure and toggle functionality

### EC-2: Rapid Toggle Clicks
- Toggle component handles debouncing internally
- State updates queue properly
- No race conditions with pressed state

### EC-3: Empty State
- Show empty state message: "No images generated yet"
- Provide CTA to generate images
- No toggles visible in empty state

### EC-4: Toggle State Synchronization
- Ensure `pressed` prop stays synchronized with state
- Handle controlled component pattern correctly
- Validate state updates before rendering

### EC-5: Maximum Selections
- No maximum limit for this implementation
- Future consideration: Add optional max final selections prop
- If limit added, disable final toggle when limit reached

---

## Testing Requirements

### Unit Tests
- [ ] Toggle like state correctly using Toggle component
- [ ] Toggle final state correctly using Toggle component
- [ ] Multiple cards can have final toggle pressed simultaneously
- [ ] Badge renders only when isFinal is true
- [ ] Toggle pressed state persists across re-renders
- [ ] Toggle onPressedChange callbacks fire correctly
- [ ] Toggle aria-pressed attribute updates correctly

### Integration Tests
- [ ] Hover reveals action toggles and button
- [ ] Toggle interactions update card state
- [ ] Animations complete without errors
- [ ] Keyboard navigation works with Toggle components
- [ ] Toggle pressed state synchronized with visual indicators
- [ ] Badge appears/disappears with final toggle

### Accessibility Tests
- [ ] Screen reader announces toggle states correctly
- [ ] All Toggle components keyboard accessible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible on toggles
- [ ] aria-pressed attribute properly set
- [ ] aria-label descriptive and dynamic

### Component Tests (shadcn/ui Toggle)
- [ ] Toggle component renders correctly
- [ ] Pressed/unpressed states work as expected
- [ ] Custom styling applies correctly
- [ ] Toggle integrates with card hover states
- [ ] Toggle state persists when hover ends

---

## Implementation Phases

### Phase 1: Core Structure ✓
- Set up card grid layout
- Implement basic card component
- Add hover overlay structure
- Install shadcn/ui toggle component

### Phase 2: Toggle Integration ✓
- Replace like button with Toggle component
- Replace set as final button with Toggle component
- Implement toggle state management
- Connect toggles to card state
- Add custom toggle styling

### Phase 3: Visual Polish ✓
- Add final badge with animations
- Implement border styling for final state
- Style toggle pressed/unpressed states
- Add heart fill animation for like toggle
- Implement micro-interactions and transitions

### Phase 4: Accessibility & Polish ✓
- Verify toggle keyboard navigation
- Implement dynamic aria-labels
- Test with screen readers
- Responsive design refinements
- Test toggle interactions on mobile

---

## Component Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  }
}
```

**Note**: These are installed automatically with shadcn/ui toggle components.

---

## Future Enhancements
- Filter tabs using ToggleGroup: "All" | "Liked" | "Final"
- Bulk actions: "Set all liked as final"
- View mode toggle: "Grid" | "List" using ToggleGroup
- Undo/Redo functionality
- Export final selections
- Comparison view for final selections
- Analytics: track which images are most liked/finalized
- Sort mode toggle: "Recent" | "Most Liked" | "Finalized First"

---

## Success Metrics
- Users can successfully toggle multiple cards as final
- Final state is clearly visible without hovering
- Toggle interactions feel responsive and natural
- Less than 2 seconds to understand card states
- Zero accessibility violations in automated tests
- Smooth animations with no janky behavior (60fps)
- Toggle components maintain state correctly across interactions

---

## Open Questions
1. Should there be a confirmation when toggling off final status?
   - **Decision**: No, Toggle component provides clear on/off feedback
   
2. Maximum number of final selections?
   - **Decision**: No limit for v1, can add optional prop later
   
3. Should final cards appear at top of grid?
   - **Decision**: Not for v1, maintain chronological/original order
   
4. Should we show toggle text labels on mobile?
   - **Decision**: Icon only on mobile (<640px), full text on tablet+

5. Should Like toggle show text or icon only?
   - **Decision**: Icon + text on desktop, icon only on mobile

---

## Appendix A: Example Mock Data

```typescript
const mockCards: ImageCard[] = [
  {
    id: "1",
    imageUrl: "/images/beige-sweatshirt-1.jpg",
    alt: "Beige crewneck sweatshirt on model",
    isLiked: false,
    isFinal: false,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    imageUrl: "/images/beige-sweatshirt-2.jpg",
    alt: "Beige crewneck sweatshirt front view",
    isLiked: true,
    isFinal: true,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "3",
    imageUrl: "/images/beige-sweatshirt-3.jpg",
    alt: "Beige crewneck sweatshirt detail",
    isLiked: true,
    isFinal: false,
    createdAt: new Date("2024-12-02"),
  },
];
```

---

## Appendix B: Full Component Example

```tsx
import { Toggle } from "@/components/ui/toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Check, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageCard({ card, onEdit, onToggleLike, onToggleFinal }) {
  return (
    <div className={cn(
      "relative group rounded-lg overflow-hidden transition-all",
      "hover:shadow-xl hover:-translate-y-1",
      card.isFinal && "ring-2 ring-green-500"
    )}>
      {/* Image */}
      <img 
        src={card.imageUrl} 
        alt={card.alt}
        className="w-full aspect-square object-cover"
      />
      
      {/* Final Badge */}
      {card.isFinal && (
        <Badge 
          className="absolute top-2 right-2 bg-green-500 text-white"
          aria-live="polite"
        >
          <Check className="w-3 h-3 mr-1" />
          FINAL
        </Badge>
      )}
      
      {/* Action Overlay */}
      <div className={cn(
        "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100",
        "transition-opacity flex items-center justify-center gap-2"
      )}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(card.id)}
          aria-label="Edit image"
        >
          <Pencil className="w-4 h-4" />
        </Button>
        
        <Toggle
          pressed={card.isLiked}
          onPressedChange={() => onToggleLike(card.id)}
          aria-label={card.isLiked ? "Unlike image" : "Like image"}
          className={cn(
            card.isLiked && "bg-red-500 text-white hover:bg-red-600"
          )}
        >
          <Heart className={cn("w-4 h-4", card.isLiked && "fill-current")} />
        </Toggle>
        
        <Toggle
          pressed={card.isFinal}
          onPressedChange={() => onToggleFinal(card.id)}
          aria-label={card.isFinal ? "Remove final" : "Set as final"}
          className={cn(
            card.isFinal && "bg-green-500 text-white hover:bg-green-600"
          )}
        >
          <Check className="w-4 h-4 mr-1" />
          {card.isFinal ? "Final" : "Set as Final"}
        </Toggle>
      </div>
    </div>
  )
}
```

---

**Document Version**: 2.0  
**Last Updated**: December 2, 2024  
**Author**: Product Team  
**Status**: Ready for Implementation  
**Change Log**: Added shadcn/ui Toggle and ToggleGroup component integration