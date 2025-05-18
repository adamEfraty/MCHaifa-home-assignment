import { useEffect, useRef, useState } from "react";
import { handleEmitter } from "../services/socket.service";
import type { SongModel } from "../models/song.model";
import { useNavigate } from "react-router";
import { useScreenSize } from "../custom-hooks/screenSize";
import { handleLongText } from "../services/util.service";

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
  const navigate = useNavigate();
  const { width } = useScreenSize();

  // Creates scrolling movment for song lyrics
  useEffect(() => {
    if (!scrollRef.current || !scrolling || !song) return;

    if (scrollInterval.current) clearInterval(scrollInterval.current);

    // Interval to advance lyrics position smoothly
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
    navigate("/admin");
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

  // Tenerary operation for active and unactive conditional rendering
  return song ? (
    <section className="columned-flex flex-center inner-main">
      <section className={`flex song-header ${width < 500 ? "column" : ""}`}>
        {/* handleLongText exists to shorten words too big for screen size */}
        <h2 className="title">{handleLongText(song.title, width / 1.8)}</h2>
        <h2>{song.artist}</h2>
      </section>
      <section className="song-display" ref={scrollRef}>
        {song.songLines.map((line, lineIndex) => (
          <div className="columned-flex" key={lineIndex}>
            {instrument !== "Singer" && line.chords && (
              <span className="chords">{line.chords}</span>
            )}
            <span className="lyrics">{line.lyrics}</span>
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
    <section className="columned-flex flex-center inner-main dashed-border">
      <div>
        <img width={125} src="images/song-icon.png" />
        <h2 className="waiting-msg">Waiting for next song...</h2>
      </div>
    </section>
  );
}

export default LivePageComponent;
