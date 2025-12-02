import { useState } from "react"
import { ImageSelectionGrid } from "./components/ImageSelectionGrid"
import { ImageCard, CardActions } from "./types"

/**
 * Mock data for demonstration purposes
 * Using placeholder images from Unsplash for variety
 */
const initialCards: ImageCard[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    alt: "Beige crewneck sweatshirt on model",
    isLiked: false,
    isFinal: false,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    alt: "Beige crewneck sweatshirt front view",
    isLiked: true,
    isFinal: true,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop",
    alt: "Beige crewneck sweatshirt detail",
    isLiked: true,
    isFinal: false,
    createdAt: new Date("2024-12-02"),
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    alt: "Casual beige sweatshirt",
    isLiked: false,
    isFinal: false,
    createdAt: new Date("2024-12-02"),
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    alt: "Beige crewneck sweatshirt styling",
    isLiked: false,
    isFinal: true,
    createdAt: new Date("2024-12-03"),
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop",
    alt: "Beige sweatshirt product shot",
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
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ImageSelectionGrid cards={cards} actions={cardActions} />
      </main>
    </div>
  )
}

export default App

