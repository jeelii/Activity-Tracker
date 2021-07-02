import React from 'react'

const Log = ({ activityLog, activities }) => {
  return (
    <section className='app__section log-section'>
      {activityLog.map(log =>
        <div className='activity' key={log.activity_id}>
          <h2>{activities.find(a => a.activity_id = log.activity_id)}</h2>
          {log.category
            && <div className="activity__categories">
              {/* {a.category.map(cat =>
                <span className='activity__tag'>{cat}</span>
              )} */}
            </div>}
        </div>
      )}
    </section>
  )
}

export default Log
