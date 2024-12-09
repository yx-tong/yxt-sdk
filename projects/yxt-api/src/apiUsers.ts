import {ApiContext} from "./apiContext";
import {UserGetter, UserItem, UserQuery, UserSetter} from "./models";


const ctx = ApiContext.getInstance();

export async function listUserData(data: UserQuery) {
    return ctx.apiRequest<UserItem[]>('POST', 'user/get', data)
}

export async function getUserData(data: UserGetter) {
    return ctx.apiRequest<UserItem>('POST', 'user/get', data)
}

export async function setUserData(data: UserSetter) {
    return await ctx.apiRequest('PATCH', 'user/set', data)
}