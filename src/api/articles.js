import request from '@/utils/request.js'
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
export const getArticlesId = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
export const AddFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
export const DeleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

export const AddCollected = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
export const DeleteCollected = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
export const AddLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
export const DeleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
