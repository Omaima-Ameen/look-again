
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AttentionModes from "./pages/AttentionModes";
import FieldPrompt from "./pages/FieldPrompt";
import FieldSession from "./pages/FieldSession";
import Reflection from "./pages/Reflection";
import FieldNote from "./pages/FieldNote";
import Journal from "./pages/Journal";

function App() {
  const [screen, setScreen] = useState("home");
  const [selectedMode, setSelectedMode] = useState(null);
  const [userReflection, setUserReflection] = useState("");

  const startNewNote = () => {
    setSelectedMode(null);
    setUserReflection("");
    setScreen("attention");
  };

  return (
    <>
    


      {screen === "home" && (
        <Home
          onStart={() => setScreen("attention")}
          onJournal={() => setScreen("journal")}
        />
      )}

      {screen === "attention" && (
        <AttentionModes
          onBack={() => setScreen("home")}
          onContinue={(mode) => {
            setSelectedMode(mode);
            setScreen("prompt");
          }}
        />
      )}

      {screen === "prompt" && (
        <FieldPrompt
          mode={selectedMode}
          onBack={() => setScreen("attention")}
          onBegin={() => setScreen("session")}
        />
      )}

      {screen === "session" && (
        <FieldSession
          mode={selectedMode}
          onBack={() => setScreen("prompt")}
          onFinish={() => setScreen("reflection")}
        />
      )}

      {screen === "reflection" && (
        <Reflection
          mode={selectedMode}
          onBack={() => setScreen("session")}
          onContinue={(reflection) => {
            setUserReflection(reflection);
            setScreen("fieldNote");
          }}
        />
      )}

      {screen === "fieldNote" && (
        <FieldNote
          mode={selectedMode}
          reflection={userReflection}
          onBack={() => setScreen("reflection")}
          onNewNote={startNewNote}
          onJournal={() => setScreen("journal")}
        />
      )}

      {screen === "journal" && (
        <Journal onBack={() => setScreen("home")} />
      )}
    </>
  );
}

export default App;
