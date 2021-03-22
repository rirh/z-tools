import request from "src/request";

export interface PostSignInBody {
  username: string;
  password: string;
}
export interface PostLogOutBody {
  token: string | Array<string>;
}

// 登录
export function postSignIn(data: PostSignInBody) {
  return request({
    url: "/login",
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
