


<template>

<div class="addBrand-container">
  <h2 style="text-align: center; margin-bottom: 10px;">Ecom Toolbox</h2>
    <div class="container">

      <upload-file 
      actionUrl="api/ageReturn/upload"
      type="csv"
      redirectUrl = "/AgedReturn/SimpleRDOSearch"
      api = "uploadFileAgeReturnSimple"
      ></upload-file>
    </div>

</div>

</template>

<script lang="ts">
import { Vue,Component, Ref} from 'vue-property-decorator'
import UploadFile from "@/components/FileUpload/index.vue"
//import { uploadFile } from '@/api/common'
@Component({
  name: 'agereturnimportSimple',
  components: {
    UploadFile
  }
})
export default class extends Vue{

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