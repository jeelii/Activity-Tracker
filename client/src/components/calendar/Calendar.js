import './Calendar.css';
import { useHistory, Link } from 'react-router-dom';
import Moment from 'react-moment';

const Calendar = ({ calendar, setSelectedDate, selectedDate }) => {

  let history = useHistory();

  const clickDate = e => {
    // console.log(e.currentTarget.getAttribute('value'));
    const date = e.currentTarget.getAttribute('value');
    e.preventDefault();
    // console.log(history.location.pathname);
    history.push(`/log-activity?date=${date}`);
    setSelectedDate(date);
  }

  return (
    <div className="dates">
      {calendar.map(date => (
        <Link to={`/log-activity?date=${date.date}`} onClick={clickDate} key={date.date} value={date.date}>
          <span
            className={`date ${date.date === selectedDate ? 'date--selected' : ''} ${date.activeDay ? 'date--active' : ''}`}>
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
