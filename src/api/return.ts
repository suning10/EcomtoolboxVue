import request from '@/utils/request'

export const searchByRDO = (data: any) =>
    request({
      'url': 'return/byRDO',
      'method': 'post',
      data: data
    })

export const searchByPO = (data: any) =>
  request({
    'url': 'return/byPO',
    'method': 'post',
    data: data
  })