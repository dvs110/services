import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ totalStars, onRate }) => {
    const [selectedStars, setSelectedStars] = useState(0);

    const handleStarClick = (starCount) => {
        setSelectedStars(starCount === selectedStars ? 0 : starCount);
        onRate(starCount === selectedStars ? 0 : starCount);
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= selectedStars ? 'star selected' : 'star'}
                    onClick={() => handleStarClick(i)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
