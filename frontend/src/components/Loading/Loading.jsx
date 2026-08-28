import { Spinner } from "../ui/spinner";
import "./loading.css";

export default function Loading({ stage }) {
  const messages = {
    connecting: {
      title: "Connecting to room",
      subtitle: "Joining the room...",
    },
    player: {
      title: "Loading YouTube",
      subtitle: "Preparing video player...",
    },
    syncing: {
      title: "Synchronizing",
      subtitle: "Seeking to the correct timestamp...",
    },
    clockSyncing: {
      title: "Synchronizing clock",
      subtitle: "Syncing your clock with the server...",
    },
  };
  const { title, subtitle } = messages[stage];

  return (
    <div className="loading-overlay">
      <Spinner className="size-8" />
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  );
}
