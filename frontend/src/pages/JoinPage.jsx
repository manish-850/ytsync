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
      <div className="join-container">
        <div className="form-wrapper">
          <Form />
          <ProjectInfo />
        </div>
      </div>
    );
};

export default JoinPage;
