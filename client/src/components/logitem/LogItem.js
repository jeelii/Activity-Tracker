import './LogItem.css';
import React from 'react'
import Moment from 'react-moment';

const LogItem = ({ log, activity }) => {
  return (
    <div className='log-item' key={log.activity_id}>
      <h2 className='log-item__title'>
        <span className="log-item__date">
          <Moment format="ddd MMM D">
            {log.date}
          </Moment>
        </span>
        {activity.title}{" "}
        {activity.category
          && <div className="log-item__categories">
            {activity.category.map(cat =>
              <span className='activity__tag log-item__tag' key={cat}>{cat}</span>
            )}
          </div>}
        {/* {log.weights
          && {<div className="log-item__categories">
            <span className='activity__tag log-item__tag'>Barbell: {log.weights.barbell}</span>
          </div>} */}
      </h2>
    </div>
  )
}

export default LogItem
