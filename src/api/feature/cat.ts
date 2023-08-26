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

// 开始挖矿
export const startWork = (params: object) =>
  request({
    url: `/start_work`,
    method: "post",
    data: params,
  });

// 关闭挖矿
export const stopWork = (params: object) =>
  request({
    url: `/stop_work`,
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

// 选择猫
export const selectCat = (params: object) =>
  request({
    url: `/select_cat`,
    method: "post",
    data: params,
  });

// 猫工作详情
export const catWorkInfo = (tokenid: string) =>
  request({
    url: `/cat_work_info/${tokenid}`,
    method: "get",
  });

// 领取挖矿收益
export const claimTaa = (params: object) =>
  request({
    url: `/claim_taa`,
    method: "post",
    data: params,
  });

export const propDetail = (tokenid: string) =>
  request({
    url: `/prop/${tokenid}`,
    method: "get",
  });
