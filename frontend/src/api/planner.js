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
