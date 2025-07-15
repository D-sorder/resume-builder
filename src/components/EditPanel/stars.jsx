import React, { useState } from 'react';

const StarRating = ({ maxStars = 5, onChange, savedValue }) => {
  const [rating, setRating] = useState(savedValue);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index) => {
    setRating(index);
    if (onChange) {
      onChange(index);
    }
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div style={{ display: 'flex', cursor: 'pointer' }}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        return (
          <svg
            key={starNumber}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={
              starNumber <= (hoverRating || rating) ? 'orange' : 'lightgray'
            }
            onClick={() => handleClick(starNumber)}
            onMouseEnter={() => handleMouseEnter(starNumber)}
            onMouseLeave={handleMouseLeave}
            style={{ marginRight: '4px' }}
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;