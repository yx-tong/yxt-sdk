import {ApiContext} from "./apiContext";
import {UserGetter, UserItem, UserQuery, UserSetter} from "./models";


const ctx = ApiContext.getInstance();

export async function listExamples(data: any) {
    return await ctx.apiRequest<any[]>('POST', 'example/query', data) || []
}

export async function getUserData(data: any) {
    return ctx.apiRequest<any>('POST', 'example/get', data)
}

export async function setUserData(data: any) {
    return await ctx.apiRequest<number>('PATCH', 'example/set', data) || 0
}