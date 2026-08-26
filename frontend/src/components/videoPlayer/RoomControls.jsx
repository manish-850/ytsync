import { useState, useRef, useEffect } from "react";
import { Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VideoCard from "./VideoCard";
import { fetchSearchResults } from "@/api/searchResult";

export default function RoomControls() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const results = await fetchSearchResults(query, setIsLoading);
    setResults(results);
    setQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div ref={containerRef} className="load-video-container relative">
      <form onSubmit={handleVideoSubmit} className="url-input-group">
        <Input
          className="search-input"
          type="text"
          placeholder="Search youtube"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <Button type="submit" variant="default" size="icon">
          <Video size={18} />
        </Button>
      </form>
      {isOpen && (
        <div
          style={{ padding: "5px" }}
          className="search-result-container flex flex-col items-center gap-4 overflow-y-auto absolute bg-zinc-900 h-100 w-full top-[120%] backdrop-blur-2xl z-99 rounded"
        >
          {isLoading && (
            <div className="flex items-center justify-center h-full w-full">
              <p>Loading...</p>
            </div>
          )}
          {results?.map((video) => (
            <VideoCard key={video.id} video={video} setIsOpen={setIsOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
