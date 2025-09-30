<template>
  <div class="addBrand-container">
    <div class="container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
        <el-form-item label="SKU" prop="sku">
          <el-input v-model="ruleForm.sku" v-if="this.optType == 'update'" disabled></el-input>
          <el-input v-model="ruleForm.sku" v-if="this.optType == 'add'"></el-input>
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-input v-model="ruleForm.category"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="descripiton">
          <el-input v-model="ruleForm.description "></el-input>
        </el-form-item>
        <div class="subBox">
          <el-button type="primary" @click="submitForm('ruleForm',false)">Save</el-button>
          <el-button 
            v-if="this.optType === 'add'" 
            type="primary" 
            @click="submitForm('ruleForm',true)">Save and Add Another sku
          </el-button>
          <el-button @click="() => this.$router.push('/cStock/sku')">Go Back</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {insertCStockSKU,updateCStockSKU,getCStockSKUBySKU} from '@/api/cStock';


export default {

  created() {
    this.optType = this.$route.query.id ? 'update' : 'add'
    if(this.optType == 'update'){
        getCStockSKUBySKU(this.$route.query.id).then((res) =>{
        if(res.data.code === 1){
          this.ruleForm = res.data.data
        }
      })
    }

  },

  data() { return{
    optType: 'add',
    //ruleForm here must align with the prop
    ruleForm: {
      sku:'',
      category : '',
      description : ''
    },
    // form prop rules
    rules: {
      sku: [
        {required:true, message:'please enter a correct sku', trigger:'blur'}
      ],
      category: [
        {required:true, message:'please enter a correct category', trigger:'blur'}
      ]
    }
  }

  },

  methods:{
    submitForm(form,flagContinue){
      this.$refs[form].validate((valid) => {
        if(valid){
          // pass validation
          console.log("pass validation")
          //check if operation type = update or add
          if(this.optType === 'add'){
            insertCStockSKU([this.ruleForm]).then((res) =>{
            if(res.data.code === 1){
              this.$message.success("save successfully")

              if(flagContinue){
                this.ruleForm = {
                  sku:'',
                  category : '',
                  description : ''
                }
              }else{
                this.$router.push('/cStock/sku')
              }
            }else{
              this.$message.error("fail to save, please correct highlighted lines")
            }
          })
          }else{

            updateCStockSKU(this.ruleForm).then(res =>{
              if(res.data.code === 1){
                this.$message.success("save successfully")
                this.$router.push('/cStock/sku')
              }else{
                this.$message.error(res.data.msg);
                
              }
            })
          }

        }
      })
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
    .el-input {
      width: 293px;
    }
  }
}
</style>
