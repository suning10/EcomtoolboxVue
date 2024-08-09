import request from '@/utils/request'

export const uploadFileAgeReturn = (data: any) =>
    request({
      'url': 'ageReturn/upload',
      'method': 'post',
      'headers': {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })

export const uploadFileAgeReturnSimple = (data: any) =>
      request({
        'url': 'ageReturn/uploadSimple',
        'method': 'post',
        'headers': {
          'Content-Type': 'multipart/form-data'
        },
        data: data
      })