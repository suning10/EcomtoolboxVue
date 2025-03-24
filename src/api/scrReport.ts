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
  

export const scrResearchDOD = (material:string,sloc:string) =>  
  request({
  'url': `/scr/dodResearch`,
  'method': 'get',
  params: { material:material,sloc:sloc }
});

export const scrMissingTransactions = (start:string,end:string,email:string) =>  
  request({
  'url': `/scr/missingTransaction`,
  'method': 'get',
  params: { start:start,end:end,email:email }
});
  

