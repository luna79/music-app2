import Icon from './Icon';

const TrackItem = ({ track, onPlay, isPlaying, isActive }) => {
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive ? 'bg-neutral-700' : 'hover:bg-neutral-800'
      }`}
      onClick={() => onPlay(track.id)}
    >
      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={track.albumArtUrl}
          alt={track.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
          {isPlaying ? (
            <Icon name="pause" size={24} className="text-white" />
          ) : (
            <Icon name="play" size={24} className="text-white" />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-neutral-200'}`}>
          {track.title}
        </p>
        <p className={`text-xs truncate ${isActive ? 'text-neutral-400' : 'text-neutral-500'}`}>
          {track.artist}
        </p>
      </div>
      <div className="flex items-center gap-4 text-neutral-400">
        <Icon name="heart" size={16} className="hover:text-red-500 transition-colors duration-200" />
        <Icon name="more-horizontal" size={16} />
      </div>
    </div>
  );
};

export default TrackItem;