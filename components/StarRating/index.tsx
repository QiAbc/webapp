"use client";
import React, { useState } from "react";
import "./style.css";

const StarRating = ({ rating, onRatingChange, disabled }: any) => {
  const [hover, setHover] = useState<number | any>(null);
  const [val, setVal] = useState<number | any>(null);
  const handleClick = (value: number) => {
    if (disabled) {
      return;
    }
    setVal(value);
    onRatingChange(value);
  };

  const handleMouseEnter = (value: number) => {
    if (disabled) {
      return;
    }
    setHover(value);
  };

  const handleMouseLeave = () => {
    if (disabled) {
      return;
    }
    setHover(null);
  };

  const getStarClass = (index: number) => {
    if (hover !== null) {
      return index <= hover ? "star filled" : "star";
    }

    return index <= rating ? "star filled" : "star";
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={index}
            className={getStarClass(starValue - 0.5)}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue - 0.5)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </span>
        );
      })}
      {!disabled && <span>&nbsp; {val}</span>}
    </div>
  );
};

export default StarRating;
