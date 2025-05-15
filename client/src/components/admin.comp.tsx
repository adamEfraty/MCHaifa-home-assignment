import { useEffect, useState } from "react";
import { socket } from "../services/socket.service";
import { useNavigate } from "react-router";

function AdminPageComponent({ songsList }: any) {
  const [songs, setSongs] = useState<any[]>(songsList);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function handleQuery() {
      const regex = new RegExp(query, "i"); // case-insensitive
      const filtered = songsList.filter((song: any) => regex.test(song.title));
      setSongs(filtered);
    }

    handleQuery();
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
        <span className="search-icon">🔍</span>
      </div>

      {/* List */}
      <h3>Recommended song list</h3>
      <div className="song-list">
        sfsdfsdgfsdrfgsegtetr
        <button onClick={() => console.log("ddfsdf", songs)}>click</button>
        {songs.map((song, index) => (
          <div
            onClick={() => handleSongChosen(song)}
            className="song-item"
            key={index}
          >
            <div className="song-info">
              <img src={song.img} alt={song.title} />
              <span>{song.title}</span>
            </div>
            <div className="song-actions">
              <span>T</span>
              <span>🧾</span>
              <span>🎵</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}

export default AdminPageComponent;
