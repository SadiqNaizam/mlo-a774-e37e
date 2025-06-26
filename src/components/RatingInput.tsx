import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingInputProps {
  /**
   * The total number of stars to display.
   * @default 5
   */
  count?: number;
  /**
   * The current rating value.
   * @default 0
   */
  value?: number;
  /**
   * Callback function that is fired when the rating changes.
   */
  onChange?: (rating: number) => void;
  /**
   * The color of the filled star.
   * @default 'text-yellow-400'
   */
  color?: string;
  /**
   * The color of the empty star.
   * @default 'text-gray-300'
   */
  emptyColor?: string;
}

const RatingInput: React.FC<RatingInputProps> = ({
  count = 5,
  value = 0,
  onChange,
  color = 'text-yellow-400',
  emptyColor = 'text-gray-300',
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  console.log('RatingInput loaded');

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (onChange) {
      onChange(index + 1);
    }
  };

  const stars = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="flex items-center space-x-1">
      {stars.map((index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hoverRating || value);

        return (
          <Star
            key={index}
            className={cn(
              'h-6 w-6 cursor-pointer transition-colors',
              isFilled ? color : emptyColor
            )}
            fill={isFilled ? 'currentColor' : 'none'}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default RatingInput;