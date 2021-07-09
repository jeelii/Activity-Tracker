import './YoutubeEmbed.css';
import React from "react";

const YoutubeEmbed = ({ link }) => {
  const getEmbedId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  const getTimeStamp = (url) => {
    const time = url.match(/t=(\d+)/);
    return time ? time[1] : false;
  }

  const startTime = getTimeStamp(link);
  const timestamp = startTime ? `?start=${startTime}` : '';

  return (
    < div className="activity-video" >
      <iframe className="activity-video__iframe"
        width="853"
        height="480"
        src={`https://www.youtube-nocookie.com/embed/${getEmbedId(link)}${timestamp}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div >
  )
};

export default YoutubeEmbed;