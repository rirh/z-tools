import request from "src/request";

export interface postGetUserInfoBody {
  uid: string;
}
export interface PostLogOutBody {
  token: string | Array<string>;
}

// 登录
export function postGetUserInfo(data: postGetUserInfoBody) {
  return request({
    url: "/getUserInfo",
    method: "post",
    data,
  });
}
// 登录
export function postLogOut(data: PostLogOutBody) {
  return request({
    url: "/logout",
    method: "post",
    data,
  });
}
// 上传文件
export function postUpdateUserInfo(data: any) {
  return request({
    url: "/updateUserInfo",
    method: "post",
    data,
  });
}

