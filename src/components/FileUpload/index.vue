
<template>
    <div class="upload-item">
        <el-upload
            :accept="type"
            class="upload-demo"
            ref="fileToUpload"
            action=""
            :auto-upload="false"
            :http-request="httpRequest"
            :before-upload="beforeUpload"

>
            <el-button slot="trigger" size="small" type="primary">select file</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" :loading = loading>upload to server</el-button>
        </el-upload>

    </div>
  </template>
  
  <script lang="ts">
  //import { uploadFile } from '@/api/common'
import { uploadFileFactory } from '@/api/commonFactory'
import { Vue, Component, Prop } from 'vue-property-decorator'

  //import { getToken } from '@/utils/cookies'
  @Component({
    name: 'UploadFile'
  })
  export default class extends Vue {
    @Prop({ default: ['txt','csv'] }) type!: Array<string>

    @Prop() actionUrl!: string

    @Prop() redirectUrl!: string

    @Prop() api!: string

    // for furture use 
    // private headers = {
    //   token: getToken()
    // }

    handleError(err, file, fileList) {
      console.log(err, file, fileList, 'handleError')
      this.$message({
        message: 'upload failed',
        type: 'error'
      })
    }

    private file;
    loading = false


    private httpRequest(data){
      this.file = data.file;

    }

    private checkExtension(fileName: string){

      if(fileName && fileName !=''){
        const ext_name = fileName.split('.').pop();
        if(!this.type.includes(ext_name)){
          this.$message.error('please upload the file with correct extension')
          return false;
        }

      }

      return true;

    }

    private beforeUpload(file){
      const filesize = file.size /1024/1024 < 30
      if(!filesize){
        this.$message.warning('file is too big')
        return false
      }
      const ext:string = file.name;
  
    }

    private submitUpload() {

        (this.$refs.fileToUpload as any).submit()
        if(!this.checkExtension(this.file.name)){
          return
        }
        this.loading = true
        const formData = new FormData();
        formData.append('file',this.file);

        const uploadFunction = uploadFileFactory(this.api);
        uploadFunction(formData).then(res =>{
            if(res.data.code === 0){
              if(res.data.msg!=''){
                this.loading = false
                this.$message.error(res.data.msg)
              }
              else{
                this.loading = false
                this.$message.error('error when uploading the file')
              }
                
            }
            if(res.data.code ===1){
              this.loading = false
              this.$message.success('import successfully')
              if(this.redirectUrl != ''){
                this.$router.push(this.redirectUrl)
              }
              
            }
        }).catch(error => {
          this.$msgbox.alert(error)
        });
      }
  
  }
  </script>

  <style lang='scss'>
  .borderNone {
    .el-upload {
      border: 1px solid #d9d9d9 !important;
    }
  }
  </style>
