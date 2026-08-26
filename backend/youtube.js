import { Innertube } from "youtubei.js";

let yt = null;

const initYt = async () => {
  yt = await Innertube.create({
    lang: "en",
    location: "IN",
    client_type: "WEB",
    device_category: "DESKTOP",
  });
};

export const fetchSearchResults = async (q) => {
  if (!yt) await initYt();
  const search = await yt.search(q, {
    type: "video",
  });

  return search.videos.map((video) => ({
    id: video.id,
    title: video.title.text,
    channel: video.author?.name,
    thumbnail: video.thumbnails?.[0]?.url,
    duration: video.duration?.seconds,
  }));
};
