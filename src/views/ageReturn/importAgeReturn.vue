<template>
<div>
    <div class="addBrand-container">
        <div class="container">
            <div class="upload-demo">
                <el-upload
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="text"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    >
                <el-button size="small" type="primary">Select Files</el-button>
                <div slot="tip" class="el-upload__tip">Only jpg/png files with a size less than 500kb are allowed.</div>
                </el-upload>
                <el-button size="small" type="success" @click="submitUpload">Upload Files</el-button>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
            </div>
            
        </div>
    </div>
</div>


</template>

<script lang="ts">
import { Vue,Component, Ref} from 'vue-property-decorator'
@Component({
  name: 'agereturnimport',
})
export default class extends Vue{


    private fileList = [];

    private handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      }
    
    private submit(){
        console.log(this.fileList)
    } 

    @Ref('upload') readonly upload!: { submit: () => void };
  dialogImageUrl: string = '';
  dialogVisible: boolean = false;


  handleRemove(file: any, fileList: any[]) {
    console.log(file, fileList);
  }

  submitUpload() {
    console.log(this.upload)
    if (this.upload) {
      this.upload.submit();
    }
}
}
</script>


<style lang="scss" scoped>
.addBrand {
  &-container {
    margin: 30px;
    margin-top: 30px;
    .HeadLable {
      background-color: transparent;
      margin-bottom: 0px;
      padding-left: 0px;
    }
    .container {
      position: relative;
      z-index: 1;
      background: #fff;
      padding: 30px;
      border-radius: 4px;
      text-align: center;
      // min-height: 500px;
      .subBox {
        padding-top: 30px;
        text-align: center;
        border-top: solid 1px $gray-5;
      }
    }
  }
}
</style>