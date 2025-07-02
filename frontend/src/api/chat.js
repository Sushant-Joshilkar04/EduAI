import axiosClient from "@/lib/axiosClient";

export const askTutor = async ({ message, context, sessionId }, token) => {
  const res = await axiosClient.post(
    "/chat/ask",
    { message, context, sessionId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data; 
};

export const getChatHistory = async (token) => {
  const res = await axiosClient.get("/chat/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; 
};
