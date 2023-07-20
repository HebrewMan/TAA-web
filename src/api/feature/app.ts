import request from "../request";

/* 用户列表 */
export const getUserInfo = (userAddress: string) =>
  request({
    url: `/api/address/${userAddress}`,
    method: "get",
  });
