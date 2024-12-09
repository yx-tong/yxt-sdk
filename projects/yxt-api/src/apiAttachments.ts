import {ApiContext} from "./apiContext";
import {AttachmentDelete, AttachmentGetter, AttachmentQuery, AttachmentSetter} from "./models";

const ctx = ApiContext.getInstance();

export async function listAttachments(data: AttachmentQuery) {
    return await ctx.apiRequest<any[]>('GET', 'attachment/get', data) || []
}

export async function getAttachments(data: AttachmentGetter): Promise<any[]> {
    return await ctx.apiRequest<any[]>('GET', 'attachment/get', data) || []
}

export async function newAttachments(data: AttachmentSetter) {
    return await ctx.apiRequest<number>('PUT', 'attachment/create', data) || 0
}

export async function setAttachments(data: AttachmentSetter) {
    return await ctx.apiRequest('PATCH', 'attachment/set', data) || 0
}

export async function deleteAttachments(data: AttachmentDelete) {
    return await ctx.apiRequest<number>('DELETE', 'attachment/delete', data) || 0
}
