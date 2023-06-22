import React from 'react';
import { Link } from 'react-router-dom';
import "./ScheduleMeeting.scss"
import Home from '../Home/Home';

// TEACHER questionnaire to book a 20 minute virtual meeting:
// * = required field

// *Name - 
// *Email address - 
// *Title - (example: Classroom Teacher; example: Math Coach, etc)
// *Level - (example: Elementary; Secondary)
// Employment Type - (example: Private; Public; home)
// *Employment Region - (example: NYC, Nassau, Suffolk)
// * Reason for scheduling the meeting - 

// PARENT questionnaire to book a 20 minute virtual meeting:
// * required field

// * Name - 
// * Email address - 
// * Child's grade level - 
//  School type: (private; public; home)
// *School Region - (NYC, Nassau, Suffolk)
// * Reason for scheduling the meeting - 

const ScheduleMeeting = () => {
    return (
        <div className="schedule-meeting-wrapper">
            <form action="">
                <div className="schedule-label-w">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name-m" placeholder='Enter name' />
                </div>
                <div className="input-w">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email-m" placeholder='Enter email' />
                </div>
                <div className="input-w">
                    <label htmlFor="grade-level">Child's Grade Level</label>
                    <select name="grade-level" id="c-grade-level" required>
                        <option value="">-- Select Grade --</option>
                        <option value="Elementary">Elementary School &#40;K-5&#41; </option>
                        <option value="Middle">Middle School &#40;6-8&#41;</option>
                        <option value="High">High School &#40;9-12&#41;</option>
                    </select>
                </div>
                <div className="input-w">
                    <label htmlFor="school-type">School Type</label>
                    <input type="checkbox" name="home" id="home-btn" value={'home'}/>
                    <input type="checkbox" name="home" id="private-btn" value={'private'}/>
                    <input type="checkbox" name="home" id="public-btn" value={'public'}/>
                    <input type="checkbox" name="home" id="other-btn" value={'other'}/>
                </div>
                <div className="input-w">
                    <label htmlFor="school-location">School District</label>
                    <select name="school-location" id="school-location" required>
                        <option value="">-- Select Disctrict --</option>
                        <option value="Manhattan">Manhattan</option>
                        <option value="Bronx">Bronx</option>
                        <option value="Brooklyn">Brooklyn</option>
                        <option value="Queens">Queens</option>
                        <option value="Staten Island">Staten Island</option>
                        <option value="Nassau">Nassau Counties</option>
                        <option value="Suffolk">Suffolk Counties</option>
                    </select>
                </div>
                <div className="input-w">
                    <label htmlFor="reason">Reason for Meeting</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <button type="submit" id='create-account-btn'>Schedule a Meeting</button>

            </form>
            <button id='login-instead-btn'><Link to={"/user/login"}>Login</Link></button>
        </div>
    );
}

export default ScheduleMeeting;