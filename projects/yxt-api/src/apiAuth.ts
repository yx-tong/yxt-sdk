import bcrypt from 'bcryptjs'
import {ApiContext} from "./apiContext";
import {AttachmentQuery, CaptchaCode, PasswordLogin, UserSessionTokens, WechatLogin} from "./models";

const ctx = ApiContext.getInstance();

function garble(text: string): Promise<string> {
    const salt = '$2y$10$YXT_COPYRIGHT20240101.'
    return new Promise((resolve, reject) => {
        bcrypt.hash(text, salt, (err, hash) => {
            if (err != null) {
                reject(err)
            }

            resolve(hash)
        })
    })
}

export async function encrypt(text: string): Promise<string> {
    const grab = await garble(text)
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(grab, salt, (err, hash) => {
                resolve(hash)
            })
        })
    })
}

export async function captchaCode() {
    return ctx.apiRequest<CaptchaCode>('GET', 'auth/captcha', {})
}

export async function passwordLogin(data: PasswordLogin) {
    const safe = {
        ...data,
        password: await encrypt(data.password)
    }
    return ctx.apiRequest<UserSessionTokens>('POST', 'auth/password/login', safe)
}

export async function wechatRegister(data: WechatLogin) {
    return ctx.apiRequest<UserSessionTokens>('POST', 'auth/wechat/register', data)
}

export async function wechatLogin(data: WechatLogin) {
    return ctx.apiRequest<UserSessionTokens>('POST', 'auth/wechat/login', data)
}

export async function userLogout(data: any) {
    return ctx.apiRequest<any>('POST', 'auth/logout', data)
}
