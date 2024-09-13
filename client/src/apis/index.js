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

export const uploadImageProfileApi = async (data) => {
  const response = await axiosIntansce({
    url: `/user/upload-image`,
    method: "post",
    data,
  });
  return response.data;
};
export const deleteImageProfileApi = async () => {
  const response = await axiosIntansce({
    url: "/user/remove-profile-image",
    method: "delete",
  });
  return response.data;
};
export const logoutApi = async () => {
  const response = await axiosIntansce({
    url: "/user/logout",
    method: "post",
  });
  return response.data;
};
export const searchContactsApi = async (searchValue) => {
  const response = await axiosIntansce({
    url: "/contacts/search",
    method: "post",
    data: { searchTerm:searchValue },
  });
  return response.data;
};
