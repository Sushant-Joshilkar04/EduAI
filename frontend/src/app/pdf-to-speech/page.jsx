"use client";

import { SidebarDemo } from '@/components/Sidebar';
import React, { useState, useEffect, useRef } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { 
  Play, Pause, Square, RotateCcw, FileText, Calendar, Download, Eye, Trash2, 
  Upload, ChevronDown, ChevronUp, Check, X, Headphones, Mic
} from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { getMyPodcasts, uploadPDFAndGeneratePodcast, getPodcastById, deletePodcast } from "@/api/speech";

const SpotlightCard = ({ children, className = "", spotlight = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-700 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

// Siri-Style Audio Player Component
const SiriAudioPlayer = ({ audioUrl, title, onPlayerReady }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [animationIntensity, setAnimationIntensity] = useState(0);
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setAnimationIntensity(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setInterval(() => {
        setAnimationIntensity(Math.random() * 100 + 50);
      }, 150);
    } else {
      clearInterval(animationRef.current);
      setAnimationIntensity(0);
    }

    return () => clearInterval(animationRef.current);
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const resetAudio = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (rate) => {
    const audio = audioRef.current;
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!audioUrl) return null;

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-2xl p-8 mb-8">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 text-center">
        <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
          <Headphones className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Now Playing</h3>
          <p className="text-gray-300 text-sm">{title || 'AI Generated Podcast'}</p>
        </div>
      </div>

      {/* Siri-style Animated Orb */}
      <div className="relative mb-8">
        <div 
          className="w-64 h-64 rounded-full relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(138,43,226,0.3) 30%, rgba(30,144,255,0.4) 60%, rgba(255,20,147,0.3) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 60px rgba(138,43,226,0.5)',
          }}
        >
          {/* Animated layers */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-300 ease-out"
            style={{
              background: `conic-gradient(from ${animationIntensity * 2}deg, 
                rgba(255,20,147,${isPlaying ? 0.6 : 0.2}) 0deg, 
                rgba(138,43,226,${isPlaying ? 0.7 : 0.3}) 120deg, 
                rgba(30,144,255,${isPlaying ? 0.8 : 0.2}) 240deg, 
                rgba(255,20,147,${isPlaying ? 0.6 : 0.2}) 360deg)`,
              transform: `rotate(${animationIntensity}deg) scale(${isPlaying ? 1.1 + (animationIntensity / 1000) : 1})`,
              filter: `blur(${isPlaying ? 8 + (animationIntensity / 20) : 4}px)`,
            }}
          />
          
          {/* Inner glow */}
          <div 
            className="absolute inset-8 rounded-full transition-all duration-200"
            style={{
              background: `radial-gradient(circle, 
                rgba(255,255,255,${isPlaying ? 0.8 : 0.3}) 0%, 
                rgba(138,43,226,${isPlaying ? 0.6 : 0.2}) 50%, 
                transparent 100%)`,
              transform: `scale(${isPlaying ? 1 + (animationIntensity / 500) : 0.8})`,
              filter: `blur(${isPlaying ? 2 + (animationIntensity / 50) : 1}px)`,
            }}
          />
          
          {/* Core light */}
          <div 
            className="absolute inset-20 rounded-full transition-all duration-100"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)',
              transform: `scale(${isPlaying ? 1 + (animationIntensity / 300) : 0.5})`,
              opacity: isPlaying ? 0.8 + (animationIntensity / 500) : 0.4,
            }}
          />
        </div>
        
        {/* Outer glow ring */}
        <div 
          className="absolute -inset-4 rounded-full transition-all duration-300"
          style={{
            background: `conic-gradient(from ${-animationIntensity}deg, 
              transparent 0deg, 
              rgba(138,43,226,${isPlaying ? 0.3 : 0.1}) 90deg, 
              rgba(30,144,255,${isPlaying ? 0.4 : 0.1}) 180deg, 
              rgba(255,20,147,${isPlaying ? 0.3 : 0.1}) 270deg, 
              transparent 360deg)`,
            filter: `blur(${isPlaying ? 12 + (animationIntensity / 10) : 6}px)`,
            opacity: isPlaying ? 0.7 : 0.3,
          }}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <button
          onClick={resetAudio}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={togglePlayPause}
          className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/25"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </button>
        
        <button
          onClick={stopAudio}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <Square className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 w-full max-w-md">
        <div className="flex justify-between text-sm text-white/70 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, 
                #8B5CF6 0%, 
                #EC4899 ${progress}%, 
                rgba(255,255,255,0.2) ${progress}%, 
                rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>
      </div>

      {/* Speed Controls */}
      <div className="text-center w-full max-w-md">
        <div className="text-white/70 text-sm mb-3">Playback Speed</div>
        <div className="flex justify-center gap-2 flex-wrap">
          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
            <button
              key={rate}
              onClick={() => handleSpeedChange(rate)}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                playbackRate === rate
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8B5CF6, #EC4899);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          transition: all 0.3s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8B5CF6, #EC4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

// Previous Podcasts Dropdown with Delete Functionality
const PreviousPodcastsDropdown = ({ podcasts, onSelectPodcast, onDeletePodcast, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  if (podcasts.length === 0) return null;

  const handleDelete = async (e, podcastId) => {
    e.stopPropagation(); // Prevent triggering the select action
    if (confirm('Are you sure you want to delete this podcast?')) {
      setDeletingId(podcastId);
      try {
        await onDeletePodcast(podcastId);
      } catch (error) {
        console.error('Error deleting podcast:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-lg transition-colors text-sm sm:text-base border border-gray-700"
      >
        <Mic className="w-4 h-4" />
        <span>Previous Podcasts ({podcasts.length})</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="relative group hover:bg-gray-800/50 transition-colors border-b border-gray-800 last:border-b-0"
            >
              <button
                onClick={() => {
                  onSelectPodcast(podcast);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 pr-12" // Add right padding for delete button
              >
                <div className="flex items-center gap-3">
                  <Mic className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {podcast.title || podcast.name || 'Untitled Podcast'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(podcast.createdAt || podcast.uploadDate || new Date()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </button>
              
              {/* Delete Button */}
              <button
                onClick={(e) => handleDelete(e, podcast.id)}
                disabled={deletingId === podcast.id}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                title="Delete podcast"
              >
                {deletingId === podcast.id ? (
                  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 text-red-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function PodcastPlayerPage() {
  const [files, setFiles] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load previous podcasts on component mount
  useEffect(() => {
    loadPodcasts();
  }, []);

  const loadPodcasts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        const response = await getMyPodcasts(token);
        setPodcasts(response.podcasts || []);
      }
    } catch (error) {
      console.error('Error loading podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    setFiles(files);
    
    if (files.length > 0) {
      const file = files[0];
      try {
        setProcessing(true);
        const token = localStorage.getItem('token');
        
        if (token) {
          const result = await uploadPDFAndGeneratePodcast(file, token);
          
          setSelectedPodcast({
            id: result.documentId,
            title: result.fileName,
            name: result.fileName,
            audioUrl: result.audioUrl,
            createdAt: new Date().toISOString()
          });
          
          await loadPodcasts();
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file and generating podcast. Please try again.');
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleSelectPodcast = async (podcast) => {
    try {
      setProcessing(true);
      const token = localStorage.getItem('token');
      if (token) {
        const response = await getPodcastById(podcast.id, token);
        setSelectedPodcast(response.podcast);
      }
    } catch (error) {
      console.error('Error fetching podcast:', error);
      alert('Error loading podcast. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeletePodcast = async (podcastId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await deletePodcast(podcastId, token);
        
        // If the currently selected podcast is being deleted, reset the selection
        if (selectedPodcast && selectedPodcast.id === podcastId) {
          setSelectedPodcast(null);
        }
        
        // Reload the podcasts list
        await loadPodcasts();
      }
    } catch (error) {
      console.error('Error deleting podcast:', error);
      alert('Error deleting podcast. Please try again.');
      throw error; // Re-throw to handle in the dropdown component
    }
  };

  const resetToUpload = () => {
    setFiles([]);
    setSelectedPodcast(null);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-950">
        <div className={sidebarOpen ? "w-[270px] min-w-[220px] max-w-xs transition-all duration-300" : "w-[60px] min-w-[60px] max-w-[60px] transition-all duration-300 sticky top-0 h-screen"}>
          <SidebarDemo open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Header Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4 sm:p-6 md:p-8 lg:p-10 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
                AI Podcast Generator
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-300 mb-4 sm:mb-5 md:mb-6 lg:mb-8 px-2">
                Upload PDFs &lt;10MB → AI generates podcasts for you
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400" />
                  <span className="font-medium text-sm sm:text-base md:text-lg">AI Narration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
                  <span className="font-medium text-sm sm:text-base md:text-lg">Smart Audio</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" />
                  <span className="font-medium text-sm sm:text-base md:text-lg">PDF to Audio</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              {/* File Upload Section */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">
                    Upload Document
                  </h2>
                  <div className="flex items-center gap-4">
                    <PreviousPodcastsDropdown 
                      podcasts={podcasts}
                      onSelectPodcast={handleSelectPodcast}
                      onDeletePodcast={handleDeletePodcast}
                      loading={loading}
                    />
                    {selectedPodcast && (
                      <button
                        onClick={resetToUpload}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                      >
                        <Upload className="w-4 h-4" />
                        New Upload
                      </button>
                    )}
                  </div>
                </div>
                
                {!selectedPodcast && <FileUpload onChange={handleFileUpload} />}
                
                {selectedPodcast && (
                  <SpotlightCard className="p-4 sm:p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                        <Mic className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {selectedPodcast.title || selectedPodcast.name || 'Podcast'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Podcast generated • Ready to listen
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                )}
              </div>

              {/* Processing State */}
              {processing && (
                <div className="flex items-center justify-center p-8 mb-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Generating podcast with AI...</p>
                  </div>
                </div>
              )}

              {selectedPodcast && selectedPodcast.audioUrl && !processing && (
                <SiriAudioPlayer 
                  audioUrl={selectedPodcast.audioUrl}
                  title={selectedPodcast.title || selectedPodcast.name}
                />
              )}

              {loading && (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  <span className="ml-3 text-gray-400">Loading podcasts...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}