import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/mainStyles.scss";
import LogPage from "./pages/login-page";
import MainPage from "./pages/main-page.layout";
import MainPageLayout from "./pages/main-page.layout";
import LivePageComponent from "./components/live.comp";
import AdminPageComponent from "./components/admin.comp";
import type { UserModel } from "./models/user.model";
import { useEffect, useState } from "react";
import { validateUser } from "./services/user.service";
import { getScrapedSongs } from "./services/songs.service";
import { socket } from "./services/socket.service";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);
  const [songsList, setSongsList] = useState<any[]>([]);
  const [songToPlay, setSongToPlay] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    socket.on("set song front", (msg: any) => {
      setSongToPlay(msg);
    });

    return () => {
      socket.off("set song front");
    };
  }, []);

  useEffect(() => {
    async function init() {
      const data = await validateUser();
      setLoggedInUser(data);
      const songs = await getScrapedSongs();
      setSongsList(songs);
      setIsLoading(false)
    }

    init();
  }, []);

  return isLoading ? (
    <div className="flex-center h-view">
      <ClipLoader color="#36d7b7" size={250} />
    </div>
  ) : (
    <BrowserRouter>
      {loggedInUser?.username ? (
        <Routes>
          <Route
            path="/"
            element={
              <MainPageLayout
                childComponent={
                  <LivePageComponent
                    isAdmin={loggedInUser.role === "admin"}
                    instrument={loggedInUser.instrument}
                    song={songToPlay}
                  />
                }
              />
            }
          />
          {loggedInUser.role === "admin" ? (
            <Route
              path="/admin"
              element={
                <MainPage
                  childComponent={<AdminPageComponent songsList={songsList} />}
                />
              }
            />
          ) : null}
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LogPage />} />
          <Route path="/:adminUrl" element={<LogPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
