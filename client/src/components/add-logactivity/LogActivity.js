import { postToLog } from '../../utils/postToApi.js';
import './AddLogActivity.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const LogActivity = ({ calendar, activities, selectedDate, selectedActivity, setActivityLog, activityLog }) => {

  const emptyActivity = { activity_id: selectedActivity, duration: '', date: selectedDate, intensity: '', count: '' };

  const [newActivity, setNewActivity] = useState(emptyActivity);

  useEffect(() => {
    setNewActivity({
      ...newActivity,
      date: selectedDate,
    });
  }, [selectedDate])

  useEffect(() => {
    setNewActivity({
      ...newActivity,
      activity_id: selectedActivity,
    });
  }, [selectedActivity])

  const schema = {
    activity_id: value => parseInt(value) === Number(value) && value >= 1,
    duration: value => parseInt(value) === Number(value) && value >= 1,
    intensity: value => parseInt(value) === Number(value) && value >= 1,
    date: value => /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value)
  };

  const validate = (object, schema) => Object
    .keys(schema)
    .filter(key => !schema[key](object[key]))
    .map(key => new Error(`Please enter ${key}.`));

  const validateInput = (activity) => {
    const errors = validate(activity, schema);
    if (errors.length > 0) {
      const validationErrorContainer = document.querySelector('.add-activity__validation-error');
      validationErrorContainer.innerHTML = '';
      for (const { message } of errors) {
        console.log(message);
        validationErrorContainer.innerHTML += `<p>${message}</p>`;
      }
      return false;
    } else {
      return true;
    }
  }

  const constructNewActivity = activity => {
    return {
      activity_id: activity.activity_id,
      date: activity.date,
      duration: activity.duration,
      intensity: activity.intensity,
      count: activity.count,
      weights: { dumbbell: activity.dumbbell, barbell: activity.barbell }
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    if (validateInput(newActivity)) {
      const activityToAdd = constructNewActivity(newActivity);
      postToLog(activityToAdd);
      setNewActivity(emptyActivity);
      setActivityLog([...activityLog, activityToAdd])
    }
  };

  const newActivityInput = e => {
    const { name } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: e.target.value,
    });
  };

  return (
    <section className='app__section log-activity-section'>
      <h2>Log activity</h2>
      <form id='add-to-log' onSubmit={onSubmit} noValidate>
        <label htmlFor='activity_id' className='add-activity__label'>Activity</label>
        <select
          className='add-activity__select'
          name='activity_id'
          onChange={newActivityInput} value={newActivity.activity_id}>
          {activities.map(a =>
            <option value={a.activity_id} key={a.activity_id}>
              {a.title}
            </option>
          )}
        </select>
        <p><Link to="/add-activity"><button className="button">Edit activities</button></Link></p>
        <label htmlFor='date' className='add-activity__label'>Day</label>
        <select
          className='add-activity__select'
          name='date'
          onChange={newActivityInput}
          value={newActivity.date}
        >
          {calendar.map(d =>
            <option value={d.date} key={d.date} >
              {moment(d.date).format("ddd MMMM DD")}
            </option>
          )}
        </select>
        <label htmlFor='intensity' className='add-activity__label'>Intensity (1–5)</label>
        <input
          type='number'
          name='intensity'
          max='5'
          value={newActivity.intensity}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <label htmlFor='duration' className='add-activity__label'>Duration (minutes)</label>
        <input
          type='number'
          name='duration'
          min='1'
          value={newActivity.duration}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <label htmlFor='barbell' className='add-activity__label'>Barbell (kg)</label>
        <input
          type='number'
          name='barbell'
          value={newActivity.barbell}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <label htmlFor='dumbbell' className='add-activity__label'>Dumbbell (kg)</label>
        <input
          type='number'
          name='dumbbell'
          value={newActivity.dumbbell}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <label htmlFor='count' className='add-activity__label'>Count</label>
        <input
          type='number'
          name='count'
          value={newActivity.count}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <span className="add-activity__validation-error"></span>
        <button type='submit' className='button'>
          Add to log</button>
      </form>
    </section >
  );
};

export default LogActivity;
