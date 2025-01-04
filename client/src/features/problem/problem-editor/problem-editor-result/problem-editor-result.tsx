import { env } from "@/config/env";
import { SubmissionResult } from "@/features/submission/models/submission-result.model";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type ProblemEditorProps = {
  submissionId?: string;
};

const socket: Socket = io(`${env.API_URL}/submission`, {
  autoConnect: false,
});

export const ProblemEditorResult = ({ submissionId }: ProblemEditorProps) => {
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  useEffect(() => {
    if (!submissionId) {
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("subscribeToSubmission", submissionId);

    const handleSubmissionUpdate = (data: SubmissionResult) => {
      if (data.token === submissionId) {
        setSubmissionResult(data);
      }
    };

    socket.on("submissionUpdate", handleSubmissionUpdate);

    return () => {
      socket.off("submissionUpdate", handleSubmissionUpdate);
      socket.emit("unsubscribeFromSubmission", submissionId);
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [submissionId]);

  if (!submissionId) {
    return null;
  }

  return null;
};
