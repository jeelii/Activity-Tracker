import React from 'react'
import YoutubeEmbed from '../youtube/YoutubeEmbed';
import { useHistory, Link } from 'react-router-dom';

const Activity = ({ activityLog, setSelectedActivity, activity }) => {
  let history = useHistory();

  const clickActivity = e => {
    const activity_id = e.currentTarget.getAttribute('value');
    e.preventDefault();
    history.push(`/log-activity?activity=${activity_id}`);
    setSelectedActivity(activity_id);
  }

  const latestInLog = activityLog.find(log => log.activity_id === activity.activity_id);

  return (
    <div className='activity' key={activity.activity_id}>
      <h2 className='activity__header'>{activity.title}</h2>
      {activity.link
        && <YoutubeEmbed link={activity.link} />
      }
      {activity.category
        && <div className="activity__categories">
          {activity.category.map(cat =>
            <span className='activity__tag' key={cat}>{cat}</span>
          )}</div>
      }
      <ul className="activity__details">
        {activity.duration
          && <li>{activity.duration} min</li>
        }
        {latestInLog
          && latestInLog.intensity
          && <li>Intensity: {latestInLog.intensity}</li>
        }
        {latestInLog
          && latestInLog.weights
          && latestInLog.weights.barbell && <li>Barbell: {latestInLog.weights.barbell} kg</li>
        }
        {latestInLog
          && latestInLog.weights
          && latestInLog.weights.dumbbell && <li>Dumbells: {latestInLog.weights.dumbbell} kg</li>
        }
        {latestInLog
          && latestInLog.count
          && latestInLog.count && <li>Latest count: {latestInLog.count}</li>
        }
      </ul>
      <Link to={`/log-activity?activity=${activity.activity_id}`} onClick={clickActivity} value={activity.activity_id}>
        <button className="button activity__add-to-log-button">Add to log</button>
      </Link>
    </div>
  )
}

export default Activity
