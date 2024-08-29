import axiosIntansce from "../axios";

export const signUpApi = async (data) => {
  const response = await axiosIntansce({
    url: "/user/signup",
    method: "post",
    data,
  });
  return response.data;
};
export const loginApi = async(data)=>{
  const response = await axiosIntansce({
    url: "/user/login",
    method: "post",
    data,
  });
  return response.data;
}
