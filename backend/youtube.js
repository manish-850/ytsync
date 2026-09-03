import { Innertube } from "youtubei.js";

let yt = null;
let ytPromise = null;
let searchRequestId = 0;

const initYt = async () => {
  if (yt) return yt;

  if (!ytPromise) {
    ytPromise = Innertube.create({
      lang: "en",
      location: "IN",
      client_type: "WEB",
      device_category: "DESKTOP",
    });
  }

  yt = await ytPromise;

  return yt;
};

export const fetchSearchResults = async (q) => {
  const requestId = ++searchRequestId;

  try {
    const youtube = await initYt();

    const search = await youtube.search(q, {
      type: "video",
    });

    // Ignore an older request if a newer search has already started.
    if (requestId !== searchRequestId) {
      return null;
    }

    return (search.videos ?? []).map((video) => ({
      id: video.id,
      title: video.title?.text ?? "",
      channel: video.author?.name ?? "",
      thumbnail:
        video.thumbnails?.[1]?.url ||
        video.thumbnails?.[0]?.url ||
        "",
      duration: video.duration?.seconds ?? 0,
    }));
  } catch (error) {
    console.error("YouTube search failed:", error);
    return [];
  }
};