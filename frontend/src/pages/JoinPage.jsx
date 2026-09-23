import Form from "../components/form/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoom from "@/hooks/room/useRoom";
import ProjectInfo from "@/components/form/ProjectInfo";
import RoomCard from "@/components/form/RoomCard";
import { getSocket } from "@/services/socket";

const JoinPage = () => {
  const { roomId, isLoading } = useRoom();
  const [publicRooms, setPublicRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) navigate(`/room/${roomId}`);
  }, [isLoading, roomId]);

  useEffect(() => {
    const socket = getSocket();
    const handlePublicRooms = (data) => {
      setPublicRooms(data.filter(Boolean));
      console.log(data);
    };
    socket.on("public-rooms-data", handlePublicRooms);
    socket.emit("get-public-rooms-data");
    return () => {
      socket.off("public-rooms-data", handlePublicRooms);
    };
  }, []);

  if (!isLoading)
    return (
      <div className="flex flex-col items-center justify-center flex-1 pt-25 pb-10 gap-16 min-h-screen">
        <div className="bg-primary-foreground border overflow-hidden rounded-2xl flex flex-col items-center justify-center p-8 gap-2 max-w-100 min-h-75 shrink-0">
          <Form />
          <ProjectInfo />
        </div>
        <div className="w-full flex-1 flex flex-col items-center gap-2 shrink-0">
          <div className="w-100 p-2 uppercase text-neutral-500 font-bold">
            <p className="text-sm">Public rooms</p>
          </div>
          {publicRooms.length === 0 ? (
            <p className="text-neutral-500 mt-5 text-sm">
              No public rooms found
            </p>
          ) : (
            publicRooms.map((data) => (
              <RoomCard
                key={data.id}
                title={data.title}
                thumbnail={data.thumbnail}
                id={data.id}
                users={data.users}
                isPlaying={data.isPlaying}
              />
            ))
          )}
        </div>
      </div>
    );
};

export default JoinPage;
