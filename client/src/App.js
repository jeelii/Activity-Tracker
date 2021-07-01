import './style';
import React from 'react'
import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import Activities from './components/Activities';
import getLog from './utils/getLog';
import getActivities from './utils/getActivities';
import getDates from './utils/getDates';

const App = () => {

  // getLog();

  const [activityLog, setActivityLog] = useState([]);
  const [activities, setActivities] = useState([]);
  const [calendar, setCalendar] = useState(getDates());

  useEffect(() => {
    console.log('getting new log & getting activities list...')
    getLog().then(res => setActivityLog(res))
    getActivities().then(res => setActivities(res))
  }, []);

  useEffect(() => {
    console.log('log updated:', activityLog);
    const updateCalendar = calendar.map(d => (
      {
        date: d.date,
        activeDay: activityLog.some(activity => activity.date === d.date) ? true : false
      }
    ));
    setCalendar(updateCalendar);
  }, [activityLog])

  useEffect(() => {
    console.log('cal updated:', calendar);
  }, [calendar])

  return (
    <div className="App">
      <Header />
      <Calendar calendar={calendar} />
      <Activities activities={activities} />
    </div>
  )
}

export default App
