import request from '@/utils/request'
export const allChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
export const addChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

export const deleteChannels = channelID => {
  return request({
    method: 'delect',
    url: `/v1_0/user/channels/${channelID}`
  })
}
