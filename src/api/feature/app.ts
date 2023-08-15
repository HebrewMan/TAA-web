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

// 任务详情/
export const getTaskDetail = (params: object, address: string) =>
  request({
    url: `/task/${address}`,
    method: "post",
    data: params,
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

// 使用道具
export const useProp = (params: object) =>
  request({
    url: `/use_prop`,
    method: "post",
    data: params,
  });

// 用户签到
export const doSign = (params: object) =>
  request({
    url: `/do_sign`,
    method: "post",
    data: params,
  });

// 获取卖出币种
export const payCoins = () =>
  request({
    url: `/pay_coins`,
    method: "get",
  });
