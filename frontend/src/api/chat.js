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

export const deleteChat = async (sessionId,token) => {
  const res = await axiosClient.delete(`/chat/delete/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; 
};

export const updateChatName = async (sessionId, newName, token) => {
  const res = await axiosClient.put(
    `/chat/update-name/${sessionId}`,
    { name: newName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data; 
};