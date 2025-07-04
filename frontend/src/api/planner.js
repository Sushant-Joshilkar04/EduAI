import axiosClient from "@/lib/axiosClient";

export const generateStudyPlan = async ({ topics, deadlineDays, hoursPerDay }, token) => {
  const res = await axiosClient.post(
    "/study/study-plan",
    { topics, deadlineDays, hoursPerDay },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getAllStudyPlans = async (token) => {
  const res = await axiosClient.get("/study/study-plans", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export const getStudyPlanById = async (id, token) => {
  const res = await axiosClient.get(`/study/study-plan/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteStudyPlan = async (id, token) => {
  const res = await axiosClient.delete(`/study/study-plan/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};