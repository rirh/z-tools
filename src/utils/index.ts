
export function getUserName (userInfo:any){
 return userInfo.nickName
 ||(userInfo?.username&&userInfo?.username.split('-')[1])
 ||(userInfo?.email&&userInfo?.email.split('@')[0])
 ||''
}

export function getUserAvatar (userInfo:any){
    return userInfo?.avatarUrl 
    ||userInfo?.username
    || userInfo?.email 
    ||''
}