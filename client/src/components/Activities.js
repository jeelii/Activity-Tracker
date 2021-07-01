import React from 'react'

const Activities = ({ activities }) => {
  return (
    <div>
      {activities.map(a =>
        <p key={a.activity_id}>{a.title}</p>
      )}
    </div>
  )
}

export default Activities
