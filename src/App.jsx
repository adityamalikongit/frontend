/*import { useState } from 'react';
import './App.css';
import VideoPlayer from './VideoPlayer';

function App() {
  const [videoLink, setVideoLink] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setVideoLink(data.videoUrl); // this is the URL to the HLS video
  };

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL" // For HLS stream
      }
    ]
  };

  return (
    <>
      <h1>Video player</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Play</button>

      {videoLink && (
        <VideoPlayer options={videoPlayerOptions} />
      )}
    </>
  );
}

export default App;*/


















import { useState, useRef, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import './App.css';

function App() {
  const playerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch video list on component mount
  useEffect(() => {
    fetch('http://localhost:8000/videos')
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        if (data.length > 0) {
          setSelectedVideo(data[0].path);
        }
      });
  }, []);

  // Handle video selection
  const handleVideoChange = (e) => {
    setSelectedVideo(e.target.value);
  };

  // Player ready event
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  // Submit comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== '') {
      setComments(prev => [...prev, commentText]);
      setCommentText(''); // Clear comment input after submitting
    }
  };

  return (
    <>
      <div className="header">StreamStorm</div>

      <div className="video-container">
        <select onChange={handleVideoChange} className="button">
          {videos.map((video, index) => (
            <option key={index} value={video.path}>
              {video.name}
            </option>
          ))}
        </select>

        {selectedVideo && (
          <div className="video-player">
            <VideoPlayer
              options={{
                controls: true,
                responsive: true,
                fluid: true,
                sources: [{ src: selectedVideo, type: 'video/mp4' }]
              }}
              onReady={handlePlayerReady}
            />
          </div>
        )}

        <div className="comment-section">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              rows="4"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="button">Submit Comment</button>
          </form>

          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment">{comment}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
