import {ApiContext} from "./apiContext";
import {BusinessItem, BusinessQuery, BusinessSetter} from "./models";

const ctx = ApiContext.getInstance()

// 查询发布需求
export async function listBusiness(data: BusinessQuery) {
    return await ctx.apiRequest<BusinessItem[]>('POST', 'business/query', data) || []
}

export async function getBusinessDetail(id: any) {
    return ctx.apiRequest('POST', 'business/detail', id);
}

// 修改发布需求
export async function editBusiness(data: BusinessSetter) {
    return await ctx.apiRequest<number>('POST', 'business/edit', data) || 0
}


// 删除发布需求
export async function deleteBusiness(data: any) {
    return await ctx.apiRequest<number>('DELETE', 'business/delete', data) || 0
}


/** 收藏或取消收藏 */
export async function markBusinessCollected(data: any) {
    return await ctx.apiRequest<number>('DELETE', 'business/collect/remark', data) || 0
}


/** 查询用户收藏 */
export async function listBusinessCollected(data: any) {
    return await ctx.apiRequest<number>('DELETE', 'business/collect/query', data) || []
}


/** 评论某个项目 */
export async function addBusinessComment(data: any) {
    return await ctx.apiRequest<number>('DELETE', 'business/comment/add', data) || 0
}

/** 列出所有评论 */
export async function listBusinessComment(business: string) {
    const data = {
        business_id: business
    }
    return await ctx.apiRequest<any[]>('GET', 'business/comment/query', data) || []
}

/** 列出所有评论 */
export async function listUserComment(user: string) {
    const data = {
        user_id: user
    }
    return await ctx.apiRequest<any[]>('GET', 'business/comment/query', data) || []
}
