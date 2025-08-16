import TrackItem from './TrackItem';

const TrackList = ({ tracks, onPlay, currentTrackId, isPlaying }) => {
  return (
    <div className="flex-1 space-y-2 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Lo-fi beats</h2>
      <div className="flex flex-col gap-2">
        {tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            onPlay={onPlay}
            isPlaying={isPlaying && currentTrackId === track.id}
            isActive={currentTrackId === track.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackList;