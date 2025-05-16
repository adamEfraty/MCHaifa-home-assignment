import { useEffect, useRef, useState } from "react";
import { handleEmitter } from "../services/socket.service";
import type { SongModel } from "../models/song.model";
import { useNavigate } from "react-router";

function LivePageComponent({
  isAdmin,
  instrument,
  song,
}: {
  isAdmin: boolean;
  instrument: string;
  song: SongModel;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const scrollingRef = useRef(true);
  const [scrolling, setScrolling] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (!scrollRef.current || !scrolling || !song) return;

    if (scrollInterval.current) clearInterval(scrollInterval.current);

    scrollInterval.current = setInterval(() => {
      if (scrollRef.current && scrollingRef.current) {
        scrollRef.current.scrollBy({ top: 1, behavior: "smooth" });
      }
    }, 30);

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
    };
  }, [scrolling, song]);

  const quitSong = () => {
    navigate("/admin")
    handleEmitter("set song back", null);
  };

  const stopScrolling = () => {
    setScrolling(false);
    scrollingRef.current = false;
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  const resumeScrolling = () => {
    setScrolling(true);
    scrollingRef.current = true;
  };

  return song ? (
    <section className="inner-main">
      <section className="song-display" ref={scrollRef}>
        {song.songLines.map((line, lineIndex) => (
          <div key={lineIndex}>
            {instrument !== "Singer" && line.chords && (
              <span
                style={{
                  textAlign: "start",
                  display: "block",
                  color: "#fbbf24", // yellow
                  fontWeight: "bold",
                  marginLeft: "0.25rem",
                }}
              >
                {line.chords}
              </span>
            )}
            <span>{line.lyrics}</span>
          </div>
        ))}
      </section>
      <section className="btn-section">
        {isAdmin && <button onClick={quitSong}>Quit</button>}
        <button onClick={scrolling ? stopScrolling : resumeScrolling}>
          {scrolling ? "Stop scrolling" : "Resume scrolling"}
        </button>
      </section>
    </section>
  ) : (
    <section className="inner-main dashed-border">
      <div>
        <img width={125} src="images/song-icon.png" />
        <h2>Waiting for next song...</h2>
      </div>
    </section>
  );
}

export default LivePageComponent;
