import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';

function Header({ calendar, setSelectedDate, selectedDate }) {
  return (
    <header className='header'>
      <Link to="/"><h1 className='header__title'>My activity</h1></Link>
      <Calendar calendar={calendar} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </header>
  );
}

export default Header;
