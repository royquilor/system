import { Toggle } from "@/components/ui/toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heart, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageCard as ImageCardType, CardActions } from "@/types"

interface ImageCardProps {
  card: ImageCardType
  actions: CardActions
}

/**
 * ImageCard component displays a single image card with hover actions
 * Features:
 * - Hover overlay with Edit, Like (Toggle), and Set as Final (Toggle) buttons
 * - Final badge that appears when card is marked as final
 * - Visual indicators (borders, colors) for different states
 * - Smooth animations and transitions
 */
export function ImageCard({ card, actions }: ImageCardProps) {
  // Handle like toggle change
  const handleLikeChange = (pressed: boolean) => {
    if (pressed !== card.isLiked) {
      actions.onToggleLike(card.id)
    }
  }

  // Handle final toggle change
  const handleFinalChange = (pressed: boolean) => {
    if (pressed !== card.isFinal) {
      actions.onToggleFinal(card.id)
    }
  }

  // Handle edit button click
  const handleEdit = () => {
    actions.onEdit(card.id)
  }

  return (
    <div
      className={cn(
        "relative group rounded-lg overflow-hidden transition-all duration-150",
        "hover:shadow-xl hover:-translate-y-1",
        card.isFinal && "ring-2 ring-gray-700 animate-scale-card"
      )}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-neutral-100">
        <img
          src={card.imageUrl}
          alt={card.alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Handle image load failure - show placeholder
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            const placeholder = document.createElement("div")
            placeholder.className =
              "w-full h-full flex items-center justify-center bg-gray-200 text-gray-400"
            placeholder.innerHTML = `
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            `
            target.parentElement?.appendChild(placeholder)
          }}
        />
      </div>

      {/* Final Badge - Always visible when card is final */}
      {card.isFinal && (
        <Badge
          className={cn(
            "absolute top-2 left-2 bg-black/30 backdrop-blur-[8px] text-white z-30",
            "animate-slide-in-badge"
          )}
          aria-live="polite"
        >
          FINAL
        </Badge>
      )}

      {/* Top Gradient Overlay - Appears on hover for button visibility */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-20 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-b from-black/40 to-transparent",
          "transition-opacity duration-150 z-10 pointer-events-none"
        )}
      />

      {/* Edit and Like Buttons - Top Right, appears on hover */}
      <div
        className={cn(
          "absolute top-2 right-2 opacity-0 group-hover:opacity-100",
          "transition-opacity duration-150 flex items-center gap-2 z-20"
        )}
      >
        {/* Edit Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              aria-label="Edit image"
              className="text-white hover:text-white hover:bg-white/20"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        {/* Like Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={card.isLiked}
              onPressedChange={handleLikeChange}
              aria-label={card.isLiked ? "Unlike image" : "Like image"}
              variant="ghost"
              size="sm"
              className="transition-all duration-150 text-white hover:text-white hover:bg-white/20 data-[state=on]:bg-transparent data-[state=on]:hover:bg-white/20"
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-all duration-150",
                  card.isLiked && "fill-current text-white"
                )}
              />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>{card.isLiked ? "Unlike" : "Like"}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Set as Final Toggle - Bottom Center, appears on hover */}
      <div
        className={cn(
          "absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100",
          "transition-opacity duration-150 z-20"
        )}
      >
        <Toggle
          pressed={card.isFinal}
          onPressedChange={handleFinalChange}
          aria-label={
            card.isFinal ? "Remove final selection" : "Set as final"
          }
          variant="outline"
          size="sm"
          className={cn(
            "transition-all duration-150 text-xs h-7 px-2",
            "bg-white/90 hover:bg-white"
          )}
        >
          <span className="hidden sm:inline text-xs">
            {card.isFinal ? "Final" : "Set as Final"}
          </span>
          <span className="sm:hidden text-xs">{card.isFinal ? "Final" : "Final"}</span>
        </Toggle>
      </div>
    </div>
  )
}

