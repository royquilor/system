/**
 * ImageCard interface defines the structure for each card in the selection system
 */
export interface ImageCard {
  id: string;
  imageUrl: string;
  alt: string;
  isLiked: boolean;      // Controls Toggle pressed state for Like
  isFinal: boolean;      // Controls Toggle pressed state for Final
  createdAt: Date;
}

/**
 * CardActions interface defines the callback functions for card interactions
 */
export interface CardActions {
  onEdit: (id: string) => void;
  onToggleLike: (id: string) => void;      // Toggle handler for Like
  onToggleFinal: (id: string) => void;     // Toggle handler for Final
}

