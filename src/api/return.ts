import request from '@/utils/request'

export const searchByRDO = (data: any) =>
    request({
      'url': 'ageReturn/byRDO',
      'method': 'post',
      data: data
    })

export const searchByPO = (data: any) =>
  request({
    'url': 'ageReturn/byPO',
    'method': 'post',
    data: data
  })