import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Track from "../Track/Track";
import useStore from "../../utils/store";
import { fetchMetadata } from "../../utils/utils";
import TRACKS from "../../utils/TRACKS";

import fetchJsonp from "fetch-jsonp";

import s from "./Tracks.module.scss";

const Tracks = ({ onActiveTrackChange }) => {
  const [showTracks, setShowTracks] = useState(false);
  const {tracks, setTracks } = useStore();
  const [activeTrack, setActiveTrack] = useState(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(null);
  const [searchInput, setSearchInput] = useState("");


  // écouter la variable tracks qui vient du store
  useEffect(() => {
    if (tracks.length > TRACKS.length) {
      setShowTracks(true);
    }
  }, [tracks]);

  useEffect(() => {
    fetchMetadata(TRACKS, tracks, setTracks);
  }, []);

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      // l'utilisateur a appuyé sur sa touche entrée
      const userInput = e.target.value;

      // appeler la fonction
      getSongs(userInput);
    }
  };

  const getSongs = async (userInput) => {
    let response = await fetchJsonp(
      `https://api.deezer.com/search?q=${userInput}&output=jsonp`
    );

    if (response.ok) {
      response = await response.json();

      // récupérer le tableau de tracks du store existant
      const _tracks = [...tracks];

      // pour chaque track renvoyée par l'API
      response.data.forEach((result) => {
        _tracks.push(result);
      });

      // màj le store
      setTracks(_tracks);

      console.log(_tracks);
    } else {
      // erreurs
      console.error("Erreur lors de la récupération des données");
    }
  };
  
  const handleTrackClick = (index) => {
    setActiveTrackIndex(index);
    setActiveTrack(tracks[index]);
    console.log("Track sélectionné :", tracks[index]); 

    if (onActiveTrackChange) {
      onActiveTrackChange(tracks[index]);
    }
  };

  const handleSearchClear = () => {
    setSearchInput("");
    fetchMetadata(TRACKS, [], setTracks); // Réinitialise les tracks par défaut
  };

  console.log("TRACKS par défaut :", TRACKS);


  return (
    <>
      <div
        className={s.toggleTracks}
        onClick={() => setShowTracks(!showTracks)}
      >
        tracklist
      </div>

      <section
        className={`
      ${s.wrapper}
      ${showTracks ? s.wrapper_visible : ""}`}
      >
        <div className={s.tracks}>
          <div className={s.header}>
            <span className={s.order}>#</span>
            <span className={s.title}>Titre</span>
            <span className={s.duration}>Durée</span>
          </div>

          {tracks.map((track, i) => {
            if (!track || !track.album || !track.album.cover_xl) {
              return null; // Ignore les tracks invalides
            }

            return (
              <Track
                key={track.title + i}
                title={track.title}
                duration={track.duration}
                cover={track.album.cover_xl}
                src={track.preview}
                index={i}
                isActive={i === activeTrackIndex}
                onClick={() => handleTrackClick(i)}
              />
            );
          })}
        </div>

        <div className={s.searchContainer}>
          <input
            type="text"
            placeholder="Chercher un artiste"
            className={s.searchInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            className={s.clearButton}
            onClick={handleSearchClear}
          >
            <FaTimes />
          </button>
        </div>
      </section>
    </>
  );
};

export default Tracks;
