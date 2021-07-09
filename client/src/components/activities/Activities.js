import './Activities.css';
import React from 'react'
import Activity from '../activity/Activity';

const Activities = ({ activities, setSelectedActivity, activityLog }) => {

  return (
    <section className='app__section activities-section'>
      {activities.sort((a, b) => a.title > b.title ? 1 : -1).map((activity, i) =>
        <Activity activityLog={activityLog} activity={activity} setSelectedActivity={setSelectedActivity} key={i} />
      )
      }
    </section >
  )
}

export default Activities
