import request from '@/utils/request'

export const scrSKUComparison = (data:any) =>  
    request({
    'url': `/scr/skuComparision`,
    'method': 'post',
    data
  });

  export const scrSKUComparisonAll = (data:any) =>  
    request({
    'url': `/scr/skuComparisionAll`,
    'method': 'post',
    data
  });

  export const scrSKUComparisonMissingNerp = (data:any) =>  
    request({
    'url': `/scr/skuComparisionMissingNerp`,
    'method': 'post',
    data
  });

  export const scrSKUComparisonMissingItemActivity = (data:any) =>  
    request({
    'url': `/scr/skuComparisionMissingItemActivity`,
    'method': 'post',
    data
  });

  export const skuDetailNERPAdj = (data:any) =>  
    request({
    'url': `/scr/skuDetailNERPAdj`,
    'method': 'post',
    data
  });

  export const skuDetailSynapseAdj = (data:any) =>  
    request({
    'url': `/scr/skuDetailSynapseAdj`,
    'method': 'post',
    data
  });

  export const skuSummarySynapseAdj = (data:any) =>  
    request({
    'url': `/scr/skuSummarySynapseAdj`,
    'method': 'post',
    data
  });

  export const skuSummaryNERPAdj = (data:any) =>  
    request({
    'url': `/scr/skuSummaryNERPAdj`,
    'method': 'post',
    data
  });

  export const skuComparisionMissingItemActivityEmail = (data:any) =>  
    request({
    'url': `/scr/skuComparisionMissingItemActivityEmail`,
    'method': 'post',
    data
  });

  export const skuComparisionMissingNerpEmail = (data:any) =>  
    request({
    'url': `/scr/skuComparisionMissingNerpEmail`,
    'method': 'post',
    data
  });

  export const getUpdateDate = () =>  
    request({
    'url': `/scr/getLatestResearchDate`,
    'method': 'get'
  });

