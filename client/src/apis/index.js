import axiosIntansce from "../axios";

export const signUpApi = async (data) => {
  const response = await axiosIntansce({
    url: "/user/signup",
    method: "post",
    data,
  });
  return response.data;
};
export const loginApi = async (data) => {
  const response = await axiosIntansce({
    url: "/user/login",
    method: "post",
    data,
  });
  return response.data;
};

export const getUserApi = async () => {
  const response = await axiosIntansce({
    url: "/user/user-info",
    method: "get",
  });
  return response.data;
};
export const updateUserApi = async (id, userData) => {
  const response = await axiosIntansce({
    url: `/user/update-profile/${id}`,
    method: "put",
    data: userData,
  });
  return response.data;
};
