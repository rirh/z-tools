import request from "src/request";

export interface PostSignInBody {
  username: string;
  password: string;
}

// 指标
export function postSignIn(data: PostSignInBody) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
