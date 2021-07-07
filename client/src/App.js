import './style';
import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import getLog from './utils/getLog';
import getActivities from './utils/getActivities';
import getCategories from './utils/getCategories';
import getDates from './utils/getDates';
import Header from './components/header/Header';
import Activities from './components/activities/Activities';
import LogActivity from './components/add-logactivity/LogActivity';
import AddActivity from './components/add-logactivity/AddActivity';
import Log from './components/log/Log';
import moment from 'moment';

const App = () => {

  const location = useLocation();

  const getSelectedDate = () => {
    const hasDate = location.search.match(/date=([\d-]+)/);
    const pickDate = hasDate ? hasDate[1] : moment().format('YYYY-MM-DD');
    return pickDate;
  }

  const [activityLog, setActivityLog] = useState([]);
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [calendar, setCalendar] = useState(getDates());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  useEffect(() => {
    getLog().then(res => setActivityLog(res));
    getActivities().then(res => setActivities(res));
    getCategories().then(res => setCategories(res));
    setSelectedDate(getSelectedDate);
  }, []);

  useEffect(() => {
    const updateCalendar = calendar.map(d => (
      {
        ...d,
        activeDay: activityLog.some(activity => activity.date === d.date) ? true : false
      }
    ));
    setCalendar(updateCalendar);
  }, [activityLog])

  return (
    <main className="app__main">
      <Header calendar={calendar} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Switch>
        <Route path="/log-activity">
          <LogActivity calendar={calendar} activities={activities} selectedDate={selectedDate} selectedActivity={selectedActivity} setActivityLog={setActivityLog} activityLog={activityLog} />
          <Log activityLog={activityLog} activities={activities} />
        </Route>
        <Route path="/add-activity">
          <AddActivity categories={categories} activities={activities} setActivities={setActivities} />
        </Route>
        <Route path="/">
          <section className='app__section activities-section'>
            <h2>Activities</h2>
            <Link to="/add-activity"><button className="button">Add activity</button></Link>
          </section>
          <Activities activities={activities} setSelectedActivity={setSelectedActivity} />
        </Route>
      </Switch>
    </main>
  )
}

export default App
