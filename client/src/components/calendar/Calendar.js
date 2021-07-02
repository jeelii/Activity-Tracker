import './Calendar.css';
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

const Calendar = ({ calendar, setSelectedDate, selectedDate }) => {

  const location = useLocation();

  useEffect(() => {
    const hasDate = location.search.match(/date=([\d-]+)/);
    const pickDate = hasDate ? hasDate[1] : moment().format('YYYY-MM-DD');
    setSelectedDate(pickDate);
  }, [])

  return (
    <div className="dates">
      {calendar.map(date => (
        <Link to={`/log-activity?date=${date.date}`}>
          <span className={`date ${date.date === selectedDate ? 'date--selected' : ''} ${date.activeDay ? 'date--active' : ''}`} key={date.date}>
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
        </Link>
      ))
      }
    </div>
  )
}

export default Calendar
