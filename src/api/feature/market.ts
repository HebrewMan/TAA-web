import request from "../request";

// 市场列表
export const getMarketsCats = (params: any) =>
  request({
    url: `/markets/cat`,
    method: "get",
    params,
  });

// 道具列表
export const getMarketsProp = (params: any) =>
  request({
    url: `/markets/prop`,
    method: "get",
    params,
  });

export const getOrderInfo = (orderid: string) =>
  request({
    url: `/order/${orderid}`,
    method: "get",
  });
