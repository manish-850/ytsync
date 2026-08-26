import { useState, useRef, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import VideoCard from "./VideoCard";
import { fetchSearchResults } from "@/api/searchResult";
import { debounce } from "@/utils/debounce";
import { Spinner } from "../ui/spinner";

export default function RoomControls() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const debouncedSearch = useMemo(() => {
    return debounce(async (searchQuery) => {
      console.log("Debounced function fired:", searchQuery);
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      const results = await fetchSearchResults(searchQuery, setIsLoading);

      setResults(results);
    }, 500);
  }, []);
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
    <div ref={containerRef} className="relative flex-1 flex flex-col gap-5 lg:gap-10">
      <form onSubmit={(e) => e.preventDefault()} className="url-input-group flex items-center justify-between w-full">
        <Input
          className="search-input w-full"
          type="text"
          placeholder="Search youtube"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            debouncedSearch(value);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </form>
      {isOpen && (
        <div
          style={{ padding: "5px" }}
          className="search-result-container flex flex-col items-center gap-2 overflow-y-auto absolute bg-zinc-900 h-100 w-[80vw] translate-x-[-50%] left-[50%] lg:w-full top-[120%] z-99 rounded"
        >
          {isLoading && (
            <div className="flex items-center justify-center h-full w-full">
              <Spinner className="size-8" />
            </div>
          )}
          {!isLoading &&
            results?.map((video) => (
              <VideoCard key={video.id} video={video} setIsOpen={setIsOpen} />
            ))}
        </div>
      )}
    </div>
  );
}
