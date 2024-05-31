import React, { useState } from 'react';
import './feedback.css';
import StarRating from './StarRating';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const Feedback = () => {

    const [rating, setRating] = useState(0);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        work: "",
        feedback: ""
    });
    const navigate = useNavigate();
    const onChangeHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Feedback:', feedback);
        // You can add code here to send the feedback to a server, etc.
        const feedbackData = {
            ...data,
            rating: rating.toString()
        };
        try {
            console.log(data);
            const url = "http://localhost:8080/carrers/update-worker-byname";
            const res = await axios.post(url, feedbackData);
            console.log(res.data);
            navigate('/');
        }
        catch {

        }
    };

    return (
        <div className="feedback-form-container">
            <form className="feedback-form" onSubmit={handleSubmit}>
                <h2>Feedback Form</h2>
                <div className="form-group">
                    <label htmlFor="firstname">Service Provider First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name='firstname'
                        value={data.firstname}
                        onChange={onChangeHandle}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Service Provider Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name='lastname'
                        value={data.lastname}
                        onChange={onChangeHandle}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="work">Service:</label>
                    <input
                        type="text"
                        id="work"
                        name='work'
                        value={data.work}
                        onChange={onChangeHandle}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        name='feedback'
                        value={data.feedback}
                        onChange={onChangeHandle}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rate your experience:</label>
                    <StarRating totalStars={5} onRate={setRating} />
                </div>
                <div className='btn-div' onClick={handleSubmit}>
                    {/* <button type="submit" className="form-btn100">Submit</button>
                     */}
                    Submit
                </div>

            </form>
        </div>
    );
};

export default Feedback;
