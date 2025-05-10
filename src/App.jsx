import { useState } from "react";

import Canvas from "./components/Canvas/Canvas";
import Landing from "./components/Landing/Landing";
import Dropzone from "./components/Dropzone/Dropzone";
import Tracks from "./components/Tracks/Tracks";
import Picker from "./components/Picker/Picker";
import Visualizer from "./components/Visualizer/Visualizer";

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleActiveTrackChange = (track) => {
    setCurrentTrack(track);
    console.log("Track active mise à jour :", track);
  };


  return (
    <>
      <Landing />
      <Dropzone />
      <Picker />
      {currentTrack && <Visualizer currentTrack={currentTrack} />}
      <Tracks onActiveTrackChange={handleActiveTrackChange} />
      <Canvas />
    </>
  );
}

export default App;
