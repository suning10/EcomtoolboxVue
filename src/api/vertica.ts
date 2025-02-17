import request from '@/utils/request'

export const pkgCountDelivered = (startDate, endDate) =>  
    request({
    'url': `/vertica/pbDelivered`,
    'method': 'get',
    params: { start: startDate,end:endDate }
  });

  export const pkgCountshipped = (startDate, endDate) =>  
    request({
    'url': `/vertica/pbDelivered`,
    'method': 'get',
    params: { start: startDate,end:endDate }
  });

  export const pkgCountDeliveredSummary = (startDate, endDate) =>  
    request({
    'url': `/vertica/pbDeliveredSummary`,
    'method': 'get',
    params: { start: startDate,end:endDate }
  });

  export const pkgCountshippedSummary = (startDate, endDate) =>  
    request({
    'url': `/vertica/pbDeliveredSummary`,
    'method': 'get',
    params: { start: startDate,end:endDate }
  });

  
  export const upsTracking = (data:any) =>  
    request({
    'url': `/vertica/ups`,
    'method': 'post',
    data
  });

  export const fedexTracking = (data:any) =>  
    request({
    'url': `/vertica/fedex`,
    'method': 'post',
    data
  });

  //eddDTO {idList:[],searchFlag:PO/DO/Tracking}
  export const eddSearch = (data:any) =>  
    request({
    'url': `/vertica/edd`,
    'method': 'post',
    data
  });


    export const OriginScanUPSSearch = (start,end) =>  
      request({
      'url': `/vertica/originScanUPS`,
      'method': 'get',
      params: { start: start,end:end }
    });


  