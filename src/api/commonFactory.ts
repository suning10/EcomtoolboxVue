import * as flist from '@/api/common'

export const uploadFileFactory = (name:string) => {

    if(name == "uploadFileAgeReturn"){
        return flist.uploadFileAgeReturn
    }

}