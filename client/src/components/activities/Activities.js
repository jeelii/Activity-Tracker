import './Activities.css';
import React from 'react'
import { useHistory, Link } from 'react-router-dom';
import YoutubeEmbed from '../youtube/YoutubeEmbed';

const Activities = ({ activities, setSelectedActivity }) => {

  let history = useHistory();

  const clickActivity = e => {
    const activity_id = e.currentTarget.getAttribute('value');
    e.preventDefault();
    history.push(`/log-activity?activity=${activity_id}`);
    setSelectedActivity(activity_id);
  }

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
          <Link to={`/log-activity?activity=${a.activity_id}`} onClick={clickActivity} value={a.activity_id}>
            <button className="button activity__add-to-log-button">Add to log</button>
          </Link>
        </div>
      )}
    </section>
  )
}

export default Activities
