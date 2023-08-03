import request from "../request";

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
