import request from '@/utils/request'
/**
 *
 * 员工管理
 *
 **/
// 登录
export const login = (data: any) =>
  request({
    'url': '/user/login',
    'method': 'post',
    data: data
  })

  // 退出
 export const userLogout = (params: any) =>
 request({
   'url': `/user/logout`,
   'method': 'post',
   params
 })

 export const getEmployeeList = (params: any) =>
  request({
    'url': `/user/page`,
    'method': 'get',
    'params':params
  })

  export const updateEmployeeStatus = (params: any) =>
    request({
      'url': `/user/status/${params.status}`,
      'method': 'post',
      'params':{'id': params.id}
    })

  export const addEmployee= (params: any) =>
      request({
        'url': `/user/`,
        'method': 'post',
        'data': params
      })

  export const getEmployeebyId = (id: any) =>
    request({
      'url': `/user/${id}`,
      'method': 'get'
    })

  export const updateEmployee = (params: any) =>
    request({
      'url': `/user/`,
      'method': 'put',
      'data':params
    })