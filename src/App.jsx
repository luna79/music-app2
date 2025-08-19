import { useState, useEffect } from 'react';
import FollowButton from './components/FollowButton';
import TrackList from './components/TrackList';
import Player from './components/Player';

/** prueba 2 */
/** prueba 3 */
/** prueba 4 */

const fetchTracks = async () => {
  const url = 'https://itunes.apple.com/search?term=lo-fi+beats&entity=song&limit=20';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error de red: ${response.statusText}`);
    }
    const data = await response.json();
    
    const formattedTracks = data.results.map(track => ({
      id: track.trackId,
      title: track.trackName,
      artist: track.artistName,
      albumArtUrl: track.artworkUrl100,
    }));
    
    return formattedTracks;
  } catch (error) {
    console.error("No se pudieron cargar las canciones de la API de iTunes.", error);
    return [];
  }
};

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTracks()
      .then(data => {
        if (data.length > 0) {
          setTracks(data);
          setCurrentTrackId(data[0].id);
          setIsLoading(false);
        } else {
          setError('No se encontraron canciones. Inténtalo con otro término de búsqueda.');
          setIsLoading(false);
        }
      })
      .catch(err => {
        setError('No se pudieron cargar las canciones. Inténtalo de nuevo más tarde.');
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  const currentTrack = tracks.find(track => track.id === currentTrackId);
  const currentTrackIndex = tracks.findIndex(track => track.id === currentTrackId);

  const handlePlay = (id) => {
    if (currentTrackId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackId(id);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (tracks.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackId(tracks[nextIndex].id);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (tracks.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackId(tracks[prevIndex].id);
    setIsPlaying(true);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <p className="text-xl font-semibold">Cargando canciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 text-red-400 flex items-center justify-center p-4">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center p-4">
      <header className="w-full max-w-2xl flex items-center justify-between mb-8 md:mb-12">
        <div className="flex items-center gap-4">
          <img
            src="https://placehold.co/64x64/1f2937/d1d5db?text=User"
            alt="User Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">Lofi Radio</h1>
            <p className="text-sm text-neutral-400">@lofi-beats</p>
          </div>
        </div>
        <FollowButton isFollowing={isFollowing} onToggleFollow={handleToggleFollow} />
      </header>
      <main className="w-full max-w-2xl bg-neutral-900 rounded-2xl shadow-xl overflow-hidden mb-6">
        {currentTrack && (
          <TrackList
            tracks={tracks}
            onPlay={handlePlay}
            currentTrackId={currentTrackId}
            isPlaying={isPlaying}
          />
        )}
      </main>
      {currentTrack && (
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => handlePlay(currentTrackId)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default App;