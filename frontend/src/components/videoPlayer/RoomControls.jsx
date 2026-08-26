import { useState } from "react";
import { Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socket } from "../../services/socket";
import useRoom from "@/hooks/room/useRoom";
import axios from "axios";
import VideoCard from "./VideoCard";

export default function RoomControls() {
  const [videoUrl, setVideoUrl] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  

  const extractVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*$/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    // const id = extractVideoId(videoUrl);
    // setVideoId(id);
    // if (id) {
    //   handleChangeVideo(id);
    //   setVideoUrl("");
    // }

    const { data } = await api.get(`/search?q=${videoUrl}`);
    setResults(data.results);
    setVideoUrl("");
  };

  return (
    <div className="load-video-container relative">
      <form onSubmit={handleVideoSubmit} className="url-input-group">
        <Input
          className="search-input"
          type="text"
          placeholder="Search youtube"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
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
          {results?.map((video) => (
            <VideoCard key={video.id} video={video} setIsOpen={setIsOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
