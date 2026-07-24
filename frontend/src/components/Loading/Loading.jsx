import "./loading.css"

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
  };
  const { title, subtitle } = messages[stage];

  return (
    <div className="loading-overlay">
      <div className="loader" />

      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
