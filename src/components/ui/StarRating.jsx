import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';

export const StarRating = ({ rating, setRating, readOnly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          className={clsx("transition-colors", readOnly ? "cursor-default" : "cursor-pointer")}
          onClick={() => setRating && setRating(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        >
          <Star
            size={20}
            fill={star <= (hover || rating) ? "#FACC15" : "transparent"}
            className={star <= (hover || rating) ? "text-yellow-400" : "text-[var(--color-border)]"}
          />
        </button>
      ))}
    </div>
  );
};