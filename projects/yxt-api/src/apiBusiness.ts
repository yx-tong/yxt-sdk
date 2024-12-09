import {ApiContext} from "./apiContext";
import {BusinessItem, BusinessQuery} from "./models";

const ctx = ApiContext.getInstance()

// 查询发布需求
export async function listBusiness(data: BusinessQuery) {
    return await ctx.apiRequest<BusinessItem[]>('POST', 'business/query', data) || []
}

export async function getBusinessDetail(id: any) {
    // let userId = '';
    // if (getdtype() == 'employer') {
    //     userId = uni.getStorageSync('uidemployer') || '';
    // } else {
    //     userId = uni.getStorageSync('uidemployee') || '';
    // }
    // const uid = userId || -1;
    // const res = await request({
    //     url: `${baseUrl}/business/detail/${id}/${uid}`,
    // });
    // return res;
    return ctx.apiRequest('POST', 'business/detail', id);
}

// 修改发布需求
export async function editBusiness(data: any) {
    return await ctx.apiRequest<number>('POST', 'business/edit', data) || 0
}


// 删除发布需求
export async function deleteBusiness(data: any) {
    return await ctx.apiRequest('DELETE', 'business/delete', data) || 0
}

