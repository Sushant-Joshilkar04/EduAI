import axiosClient from "@/lib/axiosClient";

export const uploadPDFAndGeneratePodcast = async (pdfFile, token) => {
  const formData = new FormData();
  formData.append('pdf', pdfFile);
  
  const res = await axiosClient.post("/speech/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMyPodcasts = async (token) => {
  const res = await axiosClient.get("/speech/my-podcasts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getPodcastById = async (id, token) => {
  const res = await axiosClient.get(`/speech/podcast/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deletePodcast = async (id, token) => {
  const res = await axiosClient.delete(`/speech/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};