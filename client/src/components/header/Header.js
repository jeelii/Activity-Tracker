import './Header.css';
import React from 'react';
import Calendar from '../calendar/Calendar';

function Header({ calendar }) {
  return (
    <header className='header'>
      <h1 className='header__title'>My activities</h1>
      <Calendar calendar={calendar} />
    </header>
  );
}

export default Header;
