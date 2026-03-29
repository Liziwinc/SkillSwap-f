import type { ButtonHTMLAttributes } from "react";

export interface LikeButtonUIProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showNumberLike?: boolean;
  numberLikes?: number;
  isActive?: boolean;
}