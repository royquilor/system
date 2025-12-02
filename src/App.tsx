import { useState } from "react"
import { ImageSelectionGrid } from "./components/ImageSelectionGrid"
import { ImageCard, CardActions } from "./types"
import { TooltipProvider } from "./components/ui/tooltip"

/**
 * Mock data for demonstration purposes
 * Using local nature images from public/images folder
 */
const initialCards: ImageCard[] = [
  {
    id: "1",
    imageUrl: "/images/martin-katler-60e34yYuEzY-unsplash 1.png",
    alt: "Stark black and white mountain range under bright sky",
    isLiked: false,
    isFinal: false,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    imageUrl: "/images/martin-katler-msmJv8fwnoo-unsplash 1.png",
    alt: "Dramatic coastal landscape with verdant cliff and blue ocean",
    isLiked: true,
    isFinal: true,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "3",
    imageUrl: "/images/martin-katler-MpBMDyLzcSM-unsplash 1.png",
    alt: "Reddish-brown bull resting in vibrant green pasture",
    isLiked: true,
    isFinal: false,
    createdAt: new Date("2024-12-02"),
  },
  {
    id: "4",
    imageUrl: "/images/martin-katler-XiZmQFffO7U-unsplash 1.png",
    alt: "Mountain peak emerging from sea of white clouds",
    isLiked: false,
    isFinal: false,
    createdAt: new Date("2024-12-02"),
  },
  {
    id: "5",
    imageUrl: "/images/martin-katler-cRsK_b3UAM8-unsplash 1.png",
    alt: "Minimalist misty forest with autumnal colors",
    isLiked: false,
    isFinal: true,
    createdAt: new Date("2024-12-03"),
  },
  {
    id: "6",
    imageUrl: "/images/martin-katler-i7FtnKClXS8-unsplash 1.png",
    alt: "Crescent-shaped tropical island surrounded by clear blue ocean",
    isLiked: true,
    isFinal: false,
    createdAt: new Date("2024-12-03"),
  },
]

/**
 * Main App component
 * Manages card state and provides action handlers
 */
function App() {
  // State management for cards
  const [cards, setCards] = useState<ImageCard[]>(initialCards)

  // Toggle like state for a specific card
  const toggleLike = (id: string) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isLiked: !card.isLiked } : card
      )
    )
  }

  // Toggle final state for a specific card
  const toggleFinal = (id: string) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isFinal: !card.isFinal } : card
      )
    )
  }

  // Handle edit action (placeholder for now)
  const handleEdit = (id: string) => {
    console.log("Edit card:", id)
    // In a real implementation, this would open an edit modal/panel
    alert(`Edit functionality for card ${id} - This is a placeholder`)
  }

  // Card actions object passed to grid and cards
  const cardActions: CardActions = {
    onEdit: handleEdit,
    onToggleLike: toggleLike,
    onToggleFinal: toggleFinal,
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ImageSelectionGrid cards={cards} actions={cardActions} />
        </main>
      </div>
    </TooltipProvider>
  )
}

export default App

