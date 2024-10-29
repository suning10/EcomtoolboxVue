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

export const uploadFileSCRReport = (data: any) =>
        request({
          'url': '/scr/scrReportImport',
          'method': 'post',
          'headers': {
            'Content-Type': 'multipart/form-data'
          },
          data: data
        })



export const uploadFileskuMB51= (data: any) =>
  request({
    'url': '/scr/skuMB51Import',
    'method': 'post',
    'headers': {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
          
export const uploadFileSkuItemActivity = (data: any) =>
  request({
    'url': '/scr/skuItemActivityImport',
    'method': 'post',
    'headers': {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })