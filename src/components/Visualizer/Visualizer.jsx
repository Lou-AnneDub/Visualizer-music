import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import audioController from "../../utils/AudioController";
import s from "./Visualizer.module.scss";

const Visualizer = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioController.pause();
    } else {
      audioController.play(currentTrack.preview);
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className={s.visu}>
      {currentTrack ? (
        <>
          <img src={currentTrack.album.cover_xl} alt="" className={s.cover} />
          <span className={s.title}>{currentTrack.title}</span>
          <button onClick={handlePlayPause} className={s.playPauseButton}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </>
      ) : (
        <span>Aucun track sélectionné</span>
      )}
    </div>
  );
};

export default Visualizer;