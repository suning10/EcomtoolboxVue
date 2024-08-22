<template>
<div class="addBrand-container">
  <h2 style="text-align: center; margin-bottom: 10px;">NPS Import</h2>
    <div class="container">
        <iframe src="http://105.52.72.150:19888/importNewData.php" 
        style="border:0px #ffffff none; text-align: center;" 
        name="myiFrame" scrolling="yes" 
        frameborder="1" marginheight="0px" 
        marginwidth="0px" 
        height="500px" width="100%" 
        allowfullscreen></iframe>


    </div>
</div>


</template>

<script lang="ts">
import { Vue,Component} from 'vue-property-decorator'
@Component({
  name: 'NPSImport',
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
      // min-height: 500px;
      .subBox {
        padding-top: 30px;
        text-align: center;
        border-top: solid 1px $gray-5;
      }
    }
    .idNumber {
      margin-bottom: 39px;
    }

    .el-form-item {
      margin-bottom: 29px;
    }

    .el-textarea{
      width: 50%;
    }
    .el-input {
      width: 100%;
    }
    .el-button{
        text-align: center;
    }
  }
}
</style>