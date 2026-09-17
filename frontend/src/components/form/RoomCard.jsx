import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ title, thumbnail, users, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/room/${id}`);
      }}
      className="w-100 h-20 shrink-0 flex justify-between gap-4 hover:bg-zinc-900 p-2 rounded cursor-pointer"
    >
      <div className="h-full w-[25%] overflow-hidden p-1">
        <img className="w-full h-full object-cover rounded" src={thumbnail} alt="" />
      </div>
      <div className="h-full flex-1 flex flex-col gap-1 justify-center py-1">
        <p className="text-sm line-clamp-2 leading-4">{title}</p>
        <p className="text-xs text-neutral-600">
          {id}{" "}
          <span className="mx-1.5 inline-block size-0.75 rounded-full bg-neutral-600 align-middle"></span>{" "}
          {users} users
        </p>
      </div>
      <div className="h-full flex items-center justify-center">
        <ChevronRight />
      </div>
    </div>
  );
};

export default RoomCard;
