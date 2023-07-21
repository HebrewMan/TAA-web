import request from "../request";

/* 用户列表 */
export const getUserInfo = (userAddress: string) =>
  request({
    url: `/address/${userAddress}`,
    method: "get",
  });

// 我的猫
export const getMyCats = (userAddress: string) =>
  request({
    url: `/my_cats/${userAddress}`,
    method: "get",
  });

// 市场列表
export const getMarketsCats = () =>
  request({
    url: `/markets/cat`,
    method: "get",
  });

// 道具列表
export const getMarketsProp = () =>
  request({
    url: `/markets/prop`,
    method: "get",
  });
