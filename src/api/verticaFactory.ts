import * as flist from '@/api/vertica'

export const verticaApiFactory = (name:string) => {

    if(name == "pbDel"){
        return flist.pkgCountDelivered
    }

    if(name == "pbShip"){
        return flist.pkgCountshipped
    }

    if(name == "pbDelSummary"){
        return flist.pkgCountDeliveredSummary
    }

    if(name == "pbShipSummary"){
        return flist.pkgCountshippedSummary
    }

    if(name == "edd"){
        return flist.eddSearch
    }
    if(name == "originScanUPS"){
        return flist.OriginScanUPSSearch
    }


}