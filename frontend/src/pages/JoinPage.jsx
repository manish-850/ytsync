import Form from "../components/form/Form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRoom from "@/hooks/room/useRoom";
import ProjectInfo from "@/components/form/ProjectInfo";

const JoinPage = () => {
  const { roomId, isLoading } = useRoom();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) navigate(`/room/${roomId}`);
  }, [isLoading, roomId]);

  if (!isLoading)
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-primary-foreground border overflow-hidden rounded-2xl flex flex-col items-center justify-center p-8 gap-2 max-w-100 min-h-75">
          <Form />
          <ProjectInfo />
        </div>
      </div>
    );
};

export default JoinPage;
