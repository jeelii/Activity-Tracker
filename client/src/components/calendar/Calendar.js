import './Calendar.css';
import React from 'react'
import Moment from 'react-moment';

const Calendar = ({ calendar }) => {
  return (
    <div className="dates">
      {calendar.map(date => (
        <span className={`date ${date.activeDay ? 'date--active' : 'date--inactive'}`} key={date.date}>
          <span className='date__weekday'>
            <Moment format="ddd">
              {date.date}
            </Moment>
          </span>
          <br />
          <span className='date__number'>
            <Moment format="DD">
              {date.date}
            </Moment>
          </span>
        </span>
      ))
      }
    </div>
  )
}

export default Calendar
