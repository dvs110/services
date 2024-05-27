import React, { useState } from 'react';
import './feedback.css';
import StarRating from './StarRating';
const Feedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Feedback:', feedback);
        // You can add code here to send the feedback to a server, etc.
    };

    return (
        <div className="feedback-form-container">
            <form className="feedback-form" onSubmit={handleSubmit}>
                <h2>Feedback Form</h2>
                <div className="form-group">
                    <label htmlFor="name">Service Provider Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Service:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rate your experience:</label>
                    <StarRating totalStars={5} onRate={setRating} />
                </div>
                <div className='btn-div'>
                    {/* <button type="submit" className="form-btn100">Submit</button>
                     */}
                    Submit
                </div>

            </form>
        </div>
    );
};

export default Feedback;
