import axiosClient from "@/lib/axiosClient";


export const uploadPDF = async (formData, token) => {
  const res = await axiosClient.post("/pdf/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getDocumentById = async (id, token) => {
  const res = await axiosClient.get(`/pdf/data/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; 
};

export const getMyDocuments = async (token) => {
  const res = await axiosClient.get("/pdf/mydocs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; 
};

export const deleteDocument = async (token) => {
  const res = await axiosClient.get("/pdf/delete/:id", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; 
};
