import { useEffect, useState } from "react";
import { socket } from "../services/socket.service";
import { useNavigate } from "react-router";
import { useScreenSize } from "../custom-hooks/screenSize";
import { debounce, handleLongText } from "../services/util.service";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SearchIcon from "@mui/icons-material/Search";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import type { SongModel } from "../models/song.model";

function AdminPageComponent({ songsList }: any) {
  const [songs, setSongs] = useState<any[]>(songsList);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  const { width } = useScreenSize();

  useEffect(() => {
    const filterDebounce = debounce(() => {
      const regex = new RegExp(query, "i");
      const filtered = songsList.filter((song: SongModel) => regex.test(song.title));
      setSongs(filtered);
    }, 1000);
    filterDebounce();
  }, [query]);

  const changeQuery = (e: any) => setQuery(e.target.value);

  function handleSongChosen(song: any) {
    socket.emit("set song back", song);
    navigate("/");
  }

  return songs ? (
    <div className="recommended-container">
      <div className="search-box">
        <input
          onChange={changeQuery}
          type="text"
          placeholder="Search any song..."
        />
        <SearchIcon />
      </div>

      {/* List */}
      <h3>Recommended song list</h3>
      <div className="song-list">
        {songs[0] ? (
          songs.map((song, index) => (
            <div
              onClick={() => handleSongChosen(song)}
              className="flex-s-betw song-item"
              key={index}
            >
              <div className="song-info">
                <img src={song.imageUrl} alt={song.title} />
                <span>{handleLongText(song.title, width / 2)}</span>
              </div>
              <div className="song-actions">
                <TextFieldsIcon />
                <SlideshowIcon />
                <MusicNoteIcon />
              </div>
            </div>
          ))
        ) : (
          <h2>No matching songs</h2>
        )}
      </div>
    </div>
  ) : null;
}

export default AdminPageComponent;
