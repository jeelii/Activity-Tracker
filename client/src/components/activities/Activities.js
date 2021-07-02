import './Activities.css';
import React from 'react'
import YoutubeEmbed from '../youtube/YoutubeEmbed';

const Activities = ({ activities }) => {
  return (
    <section className='app__section activities-section'>
      {activities.sort((a, b) => a.title > b.title ? 1 : -1).map(a =>
        <div className='activity' key={a.activity_id}>
          <h2 className='activity__header'>{a.title}</h2>
          {a.link
            && <YoutubeEmbed link={a.link} />
          }
          {a.category
            && <div className="activity__categories">
              {a.category.map(cat =>
                <span className='activity__tag' key={cat}>{cat}</span>
              )}</div>
          }
          <div className="activity__details">
            <p>{a.duration} min</p>
          </div>
          <button className="button activity__add-to-log-button">Add to log</button>
        </div>
      )}
    </section>
  )
}

export default Activities
