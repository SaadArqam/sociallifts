"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const CDPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const discRef = useRef(null);
  
  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/audio/audio.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    // Keep disc rotating at all times
    if (discRef.current) {
      discRef.current.style.animationPlayState = 'running';
    }
    
    // Control audio playback only
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play prevented by browser'));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div 
      className="cd-player-container"
      onClick={togglePlayPause}
      style={{
        position: 'absolute',
        bottom: '40px',
        right: '40px',
        width: '80px',
        height: '80px',
        cursor: 'pointer',
        zIndex: 10
      }}
    >
      <div 
        ref={discRef}
        className="cd-disc"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, #111 0%, #111 30%, #333 30%, #333 31%, #111 31%, #111 34%, #333 34%, #333 35%, #111 35%, #111 45%, #333 45%, #333 46%, #111 46%, #111 48%, #333 48%, #333 49%, #111 49%, #111 58%, #333 58%, #333 59%, #111 59%, #111 100%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
          animation: 'rotate 8s linear infinite',
          animationPlayState: 'paused',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          className="cd-center"
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#ddd',
            boxShadow: 'inset 0 0 0 2px rgba(0, 0, 0, 0.2)'
          }}
        />
        
{/* Play/pause button removed */}
      </div>
      
      <style jsx>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .cd-player-container:hover .cd-disc {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CDPlayer;