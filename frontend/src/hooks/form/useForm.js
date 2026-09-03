import { generateRoomId } from "@/utils/roomId";
import useRoom from "../room/useRoom";

const useForm = () => {
  const { roomId, setRoomId, username, setIsLoading } = useRoom();
  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) localStorage.setItem("username", username);
    if (roomId.trim()) setIsLoading(true);
  };

  const handleCreateRoom = () => {
    const randomId = generateRoomId();
    setRoomId(randomId);
  };
  return { handleJoin, handleCreateRoom };
};

export default useForm;
