import axios from 'axios'

type Method = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';


export class ApiContext {
    private static instance: ApiContext;


    private constructor() {
        this.apiRequest = async (method: Method, endpoint: string, data: any) => {
            return null
        }
        this.apiRefresh = async () => {

        }
        this.getAccessToken = async () => {
            return null
        }
        this.setAccessToken = async (token: string) => {

        }
        this.getRefreshToken = async () => {
            return null
        }
        this.setRefreshToken = async (token: string) => {

        }
    }


    public static getInstance(): ApiContext {
        if (!ApiContext.instance) {
            ApiContext.instance = new ApiContext();
        }
        return ApiContext.instance;
    }

    public getAccessToken: () => Promise<string | null>;
    public setAccessToken: (token: string) => Promise<void>;
    public getRefreshToken: () => Promise<string | null>;
    public setRefreshToken: (token: string) => Promise<void>;
    /** 发送请求 */
    public apiRequest: <T>(method: Method, endpoint: string, data: any) => Promise<T | null>;
    /** 刷新 JwtTokens */
    public apiRefresh: () => Promise<void>;

    async makeAccessHeaders() {
        const headers: any = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        const token = await this.getAccessToken()
        if (token != null) {
            headers.Authorization = token
        }
        return headers
    }

    async makeRefreshHeaders() {
        const headers: any = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        const token = await this.getRefreshToken()
        if (token == null) {
            throw new Error('`REFRESH_TOKEN` not found!')
        }
        headers.Authorization = token
        return headers
    }

}

export function initializeAxios(host: string) {
    const ctx = ApiContext.getInstance()
    ctx.getAccessToken = async () => {
        return localStorage.getItem("YXT_ACCESS_TOKEN")
    }
    ctx.setAccessToken = async (token: string) => {
        return localStorage.setItem("YXT_ACCESS_TOKEN", token)
    }
    ctx.getRefreshToken = async () => {
        return localStorage.getItem("YXT_REFRESH_TOKEN")
    }
    ctx.setRefreshToken = async (token: string) => {
        return localStorage.setItem("YXT_REFRESH_TOKEN", token)
    }
    ctx.apiRequest = async (method: Method, endpoint: string, data: any) => {
        const headers = await ctx.makeAccessHeaders();
        try {
            const response = await axios({
                method: safeMethod(method),
                url: `${host}/${endpoint}`,
                headers: headers,
                data: data
            })
            if (response.status !== 200) {
                console.error(response.statusText)
                return null
            }
            const result = response.data
            if (result.code < 0) {
                console.error(result.message)
                return null
            } else {
                return result.data
            }
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export function initializeUni(host: string) {
    const ctx = ApiContext.getInstance()
    ctx.getAccessToken = async () => {
        return new Promise(
            (resolve, reject) => uni.getStorage({
                key: 'YXT_ACCESS_TOKEN',
                success: (res) => {
                    resolve(res.data)
                },
                fail() {
                    resolve(null)
                }
            })
        )
    }
    ctx.setAccessToken = async (token: string) => {
        uni.setStorage({
            key: 'YXT_ACCESS_TOKEN',
            data: token,
        })
    }
    ctx.getRefreshToken = async () => {
        return new Promise(
            (resolve, reject) => uni.getStorage({
                key: 'YXT_REFRESH_TOKEN',
                success: (res) => {
                    resolve(res.data)
                },
                fail() {
                    resolve(null)
                }
            })
        )
    }
    ctx.setRefreshToken = async (token: string) => {
        uni.setStorage({
            key: 'YXT_REFRESH_TOKEN',
            data: token,
        })
    }
    ctx.apiRequest = async (method: Method, endpoint: string, data: any) => {
        const headers = await ctx.makeAccessHeaders();
        return new Promise(
            (resolve, reject) => uni.request({
                url: `${host}/${endpoint}`,
                method: safeMethod(method),
                header: headers,
                data: data,
                success: (res) => {
                    if (res.statusCode != 200) {
                        resolve(null);
                    }
                    const response: any = res.data;
                    if (response.code < 0) {
                        console.error(response.message);
                        resolve(null);
                    }
                    resolve(response.data);
                },
                fail: (err) => {
                    console.error(err);
                    resolve(null)
                }
            })
        )
    }
}

function safeMethod(method: Method): "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS" | "HEAD" | "TRACE" | "CONNECT" {
    const unsafeMethods = [
        'GET',
        // 微信不支持 patch
        'PATCH'
    ];
    // @ts-ignore
    return unsafeMethods.includes(method) ? 'POST' : method;
}