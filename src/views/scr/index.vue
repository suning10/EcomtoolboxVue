<template>
   <div class="addBrand-container">
    <h2 style="text-align: center; margin-bottom: 10px;">Ecom Toolbox</h2>
    <div class="container">

        <router-view />

    </div>
</div>
</template>

<script lang="ts">
import { Vue,Component} from 'vue-property-decorator'

@Component({
  name: 'ageReturn'
})
export default class extends Vue{

    private handleTest(){
        this.$router.push('/')
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