import './AddLogActivity.css';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { postToActivity } from '../../utils/postToApi.js';

const AddActivity = ({ categories, setActivities, activities }) => {
  const emptyActivity = { title: '', duration: 10, link: 'https://' };
  const [newActivity, setNewActivity] = useState(emptyActivity);

  let history = useHistory();

  useEffect(() => {
    if (categories.categories !== undefined && categories.props !== undefined) {
      categories.categories.map(cat => emptyActivity[cat] = false);
      categories.props.map(cat => emptyActivity[cat] = false);
    }
  }, [categories])

  const constructNewActivity = activity => {
    const cats = [];
    const props = [];
    categories.categories.map(cat => activity[cat] ? cats.push(cat) : '');
    categories.props.map(cat => activity[cat] ? cats.push(cat) : '');
    return {
      title: activity.title,
      duration: activity.duration,
      link: activity.link === 'https://' ? '' : activity.link,
      category: cats,
      props: props,
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // if (validateInput(newActivity)) {
    const activityToAdd = constructNewActivity(newActivity);
    const newId = await postToActivity(activityToAdd);
    setNewActivity(emptyActivity);
    if (newId) {
      activityToAdd.activity_id = newId;
      setActivities([...activities, activityToAdd])
      history.push('/');
    }

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
      <h2 className='add-activity__title'>Add new activity</h2>
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
        <h3 className='add-activity__sub-title'>Props</h3>
        {categories.props !== undefined
          && categories.props.map((cat, i) =>
            <div className='add-activity__category' key={i}>
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
            </div>
          )}
        <h3 className='add-activity__sub-title'>Category</h3>
        {categories.categories !== undefined
          && categories.categories.map((cat, i) =>
            <div className='add-activity__category' key={i}>
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
            </div>
          )}
        <br />
        <button type='submit' className='button'>
          Add activity</button>
      </form>
    </section>
  )
}

export default AddActivity
