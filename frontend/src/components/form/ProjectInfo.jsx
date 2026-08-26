import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Star from "../svg/Star";
import Github from "../svg/Github";
import { Separator } from "../ui/separator";

const ProjectInfo = () => {
  const [stars, setStars] = useState(3);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.github.com/repos/manish-850/ytsync");
      const data = await res.json();
      setStars(data.stargazers_count);
    })();
  }, []);
  return (
    <div className="project-info">
      <div className="star">
        <Star />
        <small>{stars}</small>
      </div>
      <Separator orientation="vertical" />
      <div className="github">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="https://github.com/manish-850/ytsync"
        >
          <Github />
        </Link>
      </div>
    </div>
  );
};

export default ProjectInfo;
