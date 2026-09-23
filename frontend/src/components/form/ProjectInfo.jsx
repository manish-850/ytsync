import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Star from "../svg/Star";
import Github from "../svg/Github";
import { Separator } from "../ui/separator";

const ProjectInfo = () => {
  const [stars, setStars] = useState(4);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.github.com/repos/manish-850/ytsync");
      const data = await res.json();
      setStars(data.stargazers_count);
    })();
  }, []);
  return (
    <div className="w-full flex items-stretch justify-center py-4">
      <div className="flex-1 flex items-center min-h-6 justify-end gap-1 pr-4">
        <Star />
        <small>{stars}</small>
      </div>
      <Separator orientation="vertical" />
      <div className="flex-1 flex items-center min-h-6 pl-4">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="https://github.com/manish-850/ytsync"
          className="flex items-center"
        >
          <Github className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectInfo;
