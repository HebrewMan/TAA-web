import request from "../request";

// 我的猫
export const getMyCats = (userAddress: string) =>
  request({
    url: `/my_cats/${userAddress}`,
    method: "get",
  });

// 猫的介绍
export const getCatInfo = (tokenid: string) =>
  request({
    url: `/cat/${tokenid}`,
    method: "get",
  });

// 猫的属性值
export const getCatStatus = (tokenid: string) =>
  request({
    url: `/cat_status/${tokenid}`,
    method: "get",
  });

// 猫的属性值
export const startWork = (params: object) =>
  request({
    url: `/start_work`,
    method: "post",
    data: params,
  });

// 设置猫的名字
export const setCatName = (params: object) =>
  request({
    url: `/set_cat_name`,
    method: "post",
    data: params,
  });
