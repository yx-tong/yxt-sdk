import {ApiContext} from "./apiContext";
import {TagItem, TagQuery, TagType} from "./models";

const ctx = ApiContext.getInstance()

export async function getTagList(flag?: TagType) {
    const data: TagQuery = {
        page: 0,
        size: 1000,
        tag_type: flag || TagType.Normal
    }
    return await ctx.apiRequest<TagItem[]>('POST', '/tag/query', data) || [];
}


/** 标签树
 *  正常情况算好了缓存就行的, 但是微信体积炸了
 * */
export async function getTagTree(flag?: TagType) {
    return await makeTagTree(await getTagList(flag))
}


function makeTagMap(tags: TagItem[]): Record<string, TagItem> {
    return tags.reduce((map, tag) => ({
        ...map,
        [tag.tag_id]: tag
    }), {});
}

export async function makeTagTree(list: TagItem[]) {
    const all = makeTagMap(list)
    // 没有 parent_id 的节点
    let heads = Object.values(all).filter(tag => tag.parent_id == null);
    // 递归填充 children
    const fillChildren = (tags: TagItem[]): TagItem[] => tags.map(tag => ({
        ...tag,
        children: fillChildren(Object.values(all).filter(t => t.parent_id === tag.tag_id))
    }));
    return fillChildren(heads);
}
