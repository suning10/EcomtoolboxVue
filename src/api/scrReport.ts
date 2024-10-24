import request from '@/utils/request'

export const scrReportSummary = (date:string) =>  
  request({
  'url': `/scr/scrReportSummary`,
  'method': 'get',
  params: { date: date }
});


export const scrReportgGap = (date:string,sloc:string) =>  
  request({
  'url': `/scr/scrReportGap`,
  'method': 'get',
  params: { date: date,sloc:sloc }
});

export const scrReportDetail = (date:string,sloc:string) =>  
  request({
  'url': `/scr/scrReportDetail`,
  'method': 'get',
  params: { date: date,sloc:sloc }
});

export const scrReportDOD = (sloc:string) =>  
  request({
  'url': `/scr/scrReportDOD`,
  'method': 'get',
  params: { sloc:sloc }
});
  

