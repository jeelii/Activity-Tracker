import './style';
import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';
import getLog from './utils/getLog';
import getActivities from './utils/getActivities';
import getCategories from './utils/getCategories';
import getDates from './utils/getDates';
import Header from './components/header/Header';
import Activities from './components/activities/Activities';
import LogActivity from './components/add-logactivity/LogActivity';
import AddActivity from './components/add-logactivity/AddActivity';

const App = () => {

  const [activityLog, setActivityLog] = useState([]);
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [calendar, setCalendar] = useState(getDates());

  useEffect(() => {
    console.log('getting new log & getting activities & categories list...')
    getLog().then(res => setActivityLog(res))
    getActivities().then(res => setActivities(res))
    getCategories().then(res => setCategories(res))
  }, []);

  useEffect(() => {
    console.log('log updated:', activityLog);
    const updateCalendar = calendar.map(d => (
      {
        ...d,
        activeDay: activityLog.some(activity => activity.date === d.date) ? true : false
      }
    ));
    setCalendar(updateCalendar);
  }, [activityLog])

  useEffect(() => {
    console.log('cal updated:', calendar);
  }, [calendar])

  useEffect(() => {
    console.log('cats updated:', categories);
  }, [categories])

  return (
    <div className="App">
      <Header calendar={calendar} />
      <Switch>
        <Route path="/log-activity">
          <LogActivity calendar={calendar} activities={activities} />
        </Route>
        <Route path="/activities">
          <AddActivity categories={categories} />
          <Activities activities={activities} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
