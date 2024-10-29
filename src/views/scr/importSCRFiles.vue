


<template>

<div class="addBrand-container">
  <h2 style="text-align: center; margin-bottom: 10px;">Ecom Toolbox</h2>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Import SCR" name="1">
          <h2>Upload SCR Report</h2>
          <br>
          <upload-file 
            actionUrl=""
            type="txt"
            redirectUrl = ""
            api = "uploadFileSCRReport"
      ></upload-file>
        </el-tab-pane>

        <el-tab-pane label="Import NERP MB51" name="2">
          <h2>Upload SKU MB51 Report</h2>
          <br>
          <upload-file 
            actionUrl=""
            type="txt"
            redirectUrl = ""
            api = "uploadFileskuMB51"
      ></upload-file>
        </el-tab-pane>

        <el-tab-pane label="Import Item Activity" name="3">
          <h2>Upload Visbility Item Activity Streamlined Report</h2>
          <br>
          <upload-file 
            actionUrl=""
            type="txt"
            redirectUrl = ""
            api = "uploadFileSkuItemActivity"
      ></upload-file>
        </el-tab-pane>
      </el-tabs>
    </div>

</div>

</template>

<script lang="ts">
import { Vue,Component, Ref} from 'vue-property-decorator'
import UploadFile from "@/components/FileUpload/index.vue"
//import { uploadFile } from '@/api/common'
@Component({
  name: 'importSCRFiles',
  components: {
    UploadFile
  }
})
export default class extends Vue{

  activeName = '1';
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