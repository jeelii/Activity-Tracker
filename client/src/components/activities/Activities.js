import './Activities.css';
import React from 'react'

const Activities = ({ activities }) => {
  return (
    <section className='app__section activities-section'>
      {activities.map(a =>
        <div className='activity' key={a.activity_id}>
          <h2>{a.title}</h2>
          <p>{a.category}</p>
        </div>
      )}
    </section>
  )
}

export default Activities
