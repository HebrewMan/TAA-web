import request from "../request";

/* 用户信息 */
export const getUserInfo = (userAddress: string) =>
  request({
    url: `/address/${userAddress}`,
    method: "get",
  });

/* 用户信息 */
export const setUserName = (params: object) =>
  request({
    url: `/set_name`,
    method: "post",
    data: params,
  });

// 任务列表/
export const getTasks = () =>
  request({
    url: `/tasks`,
    method: "get",
  });

// 任务奖励/my_bag
export const taskReward = (params: object) =>
  request({
    url: `/claim_task_award`,
    method: "post",
    data: params,
  });

// 我的背包
export const getMybag = (userAddress: string) =>
  request({
    url: `/my_bag/${userAddress}`,
    method: "get",
  });
