import './AddLogActivity.css';
import React, { useState, useEffect } from 'react'
import { postToActivity } from '../../utils/postToApi.js';

const AddActivity = ({ categories }) => {
  const emptyActivity = { title: '', duration: 10, link: 'https://', warmup: false, intensity: 3 };
  const [newActivity, setNewActivity] = useState(emptyActivity);

  useEffect(() => {
    categories.map(cat => emptyActivity[cat] = false);
    console.log('cats updated:', emptyActivity);
  }, [categories])

  const constructNewActivity = activity => {
    const cats = [];
    categories.map(cat => activity[cat] ? cats.push(cat) : '');
    return {
      title: activity.title,
      duration: activity.duration,
      intensity: activity.intensity,
      link: activity.link === 'https://' ? '' : activity.link,
      category: cats,
      warmup: activity.warmup
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    // if (validateInput(newActivity)) {
    const activityToAdd = constructNewActivity(newActivity);
    postToActivity(activityToAdd);
    setNewActivity(emptyActivity);
    // }
  };

  const newActivityInput = e => {
    const { name } = e.target;
    if (e.target.type === 'checkbox') {
      return setNewActivity({
        ...newActivity,
        [name]: e.target.checked,
      });
    }
    setNewActivity({
      ...newActivity,
      [name]: e.target.value,
    });
  };


  return (
    <section className='app__section add-activity-section'>
      <h2 className='add-activity__title'>Add activity</h2>
      <form id='add-activity' onSubmit={onSubmit} noValidate>
        <label htmlFor='title' className='add-activity__label'>Name</label>
        <input
          type='text'
          name='title'
          value={newActivity.title}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <label htmlFor='link' className='add-activity__label'>Link</label>
        <input
          type='url'
          name='link'
          value={newActivity.link}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <label htmlFor='duration' className='add-activity__label'>Default duration (minutes)</label>
        <input
          type='number'
          name='duration'
          value={newActivity.duration}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <label htmlFor='intensity' className='add-activity__label'>Default intensity (1–5)</label>
        <input
          type='number'
          name='intensity'
          value={newActivity.intensity}
          onChange={newActivityInput}
          className='add-activity__input'
          autoComplete='off'
        />
        <input
          type='checkbox'
          name='warmup'
          value={newActivity.warmup}
          onChange={newActivityInput}
          defaultChecked={newActivity.warmup}
          className='add-activity__checkbox'
          autoComplete='off'
        />
        <label htmlFor='warmup' className='add-activity__label'>Includes warmup</label>
        <br />
        <h3 className='add-activity__sub-title'>Category</h3>
        {categories.map(cat =>
          <div>
            <input
              type='checkbox'
              name={cat}
              value={newActivity[{ cat }]}
              onChange={newActivityInput}
              defaultChecked={newActivity[{ cat }]}
              className={`add-activity__checkbox ${cat}`}
              autoComplete='off'
            />
            <label htmlFor={cat} className='add-activity__label'>{cat}</label>
            <br />
          </div>
        )}
        <button type='submit' className='button'>
          Add activity</button>
      </form>
    </section>
  )
}

export default AddActivity
