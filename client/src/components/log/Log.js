import React from 'react'
import LogItem from '../logitem/LogItem';

const Log = ({ activityLog, activities }) => {

  const getActivity = (id) => {
    const index = activities.findIndex(a => a.activity_id === id);
    return activities[index];
  }

  return (
    <section className='app__section log-section'>
      {activityLog.map((log, index) =>
        <LogItem key={index} log={log} activity={getActivity(log.activity_id)} />
      )}
    </section>
  )
}

export default Log
