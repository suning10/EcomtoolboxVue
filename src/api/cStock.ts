import request from '@/utils/request'

export const cStockRaw = () =>  
    request({
    'url': `/cstock/minQty`,
    'method': 'get'
  });

export const cStockSummary = () =>  
    request({
    'url': `/cstock/minQtySummary`,
    'method': 'get'
  });


  export const getCStockSKU = () =>  
    request({
    'url': `/cstock/getSKUCategory`,
    'method': 'get'
  });

  
export const insertCStockSKU = (data:any) =>  
  request({
  'url': `/cstock/uploadSKUCategory`,
  'method': 'post',
  'data':data
});


export const updateCStockSKU = (data:any) =>  
  request({
  'url': `/cstock`,
  'method': 'put',
  data
});


export const delCStockSKU = (data:any) =>  
  request({
  'url': `/cstock/delSKUCategory`,
  'method': 'get',
  'params':{'sku':data}
});

export const getCStockSKUBySKU = (data:any) =>  
  request({
  'url': `/cstock/getSKUCategoryBySKU`,
  'method': 'get',
  'params':{'sku':data}
});