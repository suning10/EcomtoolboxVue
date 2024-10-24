import * as flist from '@/api/scr'

export const scrApiFactory = (name:string) => {

    
    if(name == "skuComparison"){
        return flist.scrSKUComparison
    }

    if(name == "skuMissingNerp"){
        return flist.scrSKUComparisonMissingNerp
    }

    if(name == "skuMissingItemActivity"){
        return flist.scrSKUComparisonMissingItemActivity
    }

    if(name == "skuDetailNERPAdj"){
        return flist.skuDetailNERPAdj
    }

    if(name == "skuDetailSynapseAdj"){
        return flist.skuDetailSynapseAdj
    }

    if(name == "skuSummaryNERPAdj"){
        return flist.skuSummaryNERPAdj
    }
    if(name == "skuSummarySynapseAdj"){
        return flist.skuSummarySynapseAdj
    }

}