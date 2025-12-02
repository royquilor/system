import { ImageCard } from "./ImageCard"
import { ImageCard as ImageCardType, CardActions } from "@/types"
import { cn } from "@/lib/utils"

interface ImageSelectionGridProps {
  cards: ImageCardType[]
  actions: CardActions
}

/**
 * ImageSelectionGrid component displays a responsive grid of image cards
 * Features:
 * - Responsive grid layout (1-2 columns on mobile, 3-4 on desktop)
 * - Displays all image cards with their current states
 * - Handles empty state gracefully
 */
export function ImageSelectionGrid({
  cards,
  actions,
}: ImageSelectionGridProps) {
  // Empty state - no images to display
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No images generated yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Generate some images to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      )}
    >
      {cards.map((card) => (
        <ImageCard key={card.id} card={card} actions={actions} />
      ))}
    </div>
  )
}

