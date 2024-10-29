import * as flist from '@/api/common'

export const uploadFileFactory = (name:string) => {

    if(name == "uploadFileAgeReturn"){
        return flist.uploadFileAgeReturn
    }

    if(name == "uploadFileAgeReturnSimple"){
        return flist.uploadFileAgeReturnSimple
    }

    if(name == "uploadFileSCRReport"){
        return flist.uploadFileSCRReport
    }

    if(name == "uploadFileskuMB51"){
        return flist.uploadFileskuMB51
    }

    if(name == "uploadFileSkuItemActivity"){
        return flist.uploadFileSkuItemActivity
    }

}