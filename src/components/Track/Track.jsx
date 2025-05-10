import audioController from "../../utils/AudioController";
import scene from "../../webgl/Scene";
import s from "./Track.module.scss";

const Track = ({ title, cover, src, duration, index, isActive, onClick }) => {
  const getSeconds = () => {
    const minutes = Math.floor(duration / 60);
    let seconds = Math.round(duration - minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  };

  const handleClick = () => {
    audioController.play(src);
    scene.cover.setCover(cover);
    onClick();
  };

  return (
    <div className={`${s.track} ${isActive ? s.active : ""}`} onClick={handleClick}>
      <span className={s.order}>{index + 1}</span>
      <div className={s.title}>
        <img src={cover} alt="" className={s.cover} />
        <div className={s.details}>
          <span className={s.trackName}>{title}</span>
        </div>
      </div>
      <span className={s.duration}>{getSeconds()}</span>
    </div>
  );
};

export default Track;