import { Button } from "@/components/ui/button";
import { InputField } from "./InputField";
import useRoom from "@/hooks/room/useRoom";
import useForm from "@/hooks/form/useForm";

const Form = () => {
  const { username, setUsername, roomId, setRoomId } = useRoom();
  const { handleJoin, handleCreateRoom } = useForm();
  return (
    <form onSubmit={handleJoin} className="w-full flex flex-col gap-6">
      <h1>Join Room</h1>
      <InputField
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter name (optional)"
        label="Username"
      />
      <div className="flex items-end gap-2">
        <InputField
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Room Id"
          label="Room Id"
        />
        <Button type="button" onClick={handleCreateRoom} variant="secondary">
          Generate
        </Button>
      </div>
      <Button type="submit" variant="default">
        Join Room
      </Button>
    </form>
  );
};

export default Form;
