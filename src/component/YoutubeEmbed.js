import React from 'react';

const YouTubeEmbed = ({ embedId }) => (
    <div className="embed-responsive embed-responsive-4by3">
    <iframe
      width="100%"
      height="315"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YouTubeEmbed;
