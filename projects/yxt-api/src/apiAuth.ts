import bcrypt from 'bcryptjs'
import {ApiContext} from "./apiContext";
import {AttachmentQuery, UserSessionTokens} from "./models";

const ctx = ApiContext.getInstance();

export async function encrypt(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(text, salt, (err, hash) => {
                resolve(hash)
            })
        })
    })
}

export async function passwordLogin(data: any) {
    const safe = {
        ...data,
        password: await encrypt(data.password)
    }
    return ctx.apiRequest<UserSessionTokens>('POST', 'auth/password/login', safe)
}

export async function wechatRegister(data: any) {
    return await ctx.apiRequest('POST', 'auth/wechat/register', data)
}

export async function wechatLogin(data: any) {
    return await ctx.apiRequest('POST', 'auth/wechat/login', data)
}

export async function userLogout(data: any) {
    return ctx.apiRequest<any>('POST', 'auth/logout', data)
}
