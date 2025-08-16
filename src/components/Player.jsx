import Icon from './Icon';

const Player = ({ currentTrack, isPlaying, onTogglePlay, onNext, onPrev }) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-700 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1 flex items-center gap-4 w-full md:w-auto min-w-0">
        <img
          src={currentTrack.albumArtUrl}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{currentTrack.title}</p>
          <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={onPrev} className="text-neutral-400 hover:text-white transition-colors duration-200">
          <Icon name="rewind" size={20} />
        </button>
        <button
          onClick={onTogglePlay}
          className="bg-white text-neutral-900 rounded-full w-12 h-12 flex items-center justify-center hover:bg-neutral-200 transition-colors duration-200"
        >
          {isPlaying ? <Icon name="pause" size={24} /> : <Icon name="play" size={24} />}
        </button>
        <button onClick={onNext} className="text-neutral-400 hover:text-white transition-colors duration-200">
          <Icon name="fast-forward" size={20} />
        </button>
      </div>

      <div className="flex-1 w-full md:w-auto h-1 bg-neutral-700 rounded-full relative">
        <div className="bg-indigo-600 absolute left-0 top-0 h-full rounded-full" style={{ width: '40%' }}></div>
      </div>
    </div>
  );
};

export default Player;