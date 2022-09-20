import request from '@/utils/request'
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
export const getlikings = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
export const deletelikings = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
export const addComments = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
