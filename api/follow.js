import { request } from '@/plugins/request'

// 获取profile
export const getProfiles = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`
    })
}

// 添加关注
export const addFollowUser = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
    })
}

// 取消关注
export const deleteFollowUser = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    })
}