<template>
  <div class="addBrand-container">
    <div class="container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Sex" prop="sex">
            <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
            <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="ID" prop="idNumber">
          <el-input v-model="ruleForm.idNumber"></el-input>
        </el-form-item>
        <div class="subBox">
          <el-button type="primary" @click="submitForm('ruleForm',false)">保存</el-button>
          <el-button 
            v-if="this.optType === 'add'" 
            type="primary" 
            @click="submitForm('ruleForm',true)">保存并继续添加员工
          </el-button>
          <el-button @click="() => this.$router.push('/employee')">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { addEmployee, getEmployeebyId, updateEmployee } from '@/api/employee'


export default {

  created() {
    this.optType = this.$route.query.id ? 'update' : 'add'
    getEmployeebyId(this.$route.query.id).then((res) =>{
      if(res.data.code === 1){
        this.ruleForm = res.data.data
      }
    })
  },

  data() { return{
    optType: 'add',
    //ruleForm here must align with the prop
    ruleForm: {
      username:'',
      name : '',
      phone:'',
      sex:'1',
      id:''
    },
    // form prop rules
    rules: {
      name: [
        {required:true, message:'please enter a correct name', trigger:'blur'}
      ],
      username: [
        {required:true, message:'please enter a correct username', trigger:'blur'}
      ],
      phone:[{required:true, trigger:'blur',validator:(rule,value,callback) =>{
        if(value === '' || (!/^\d{10}$/.test(value))){
          callback( new Error("please enter correct phone number"))
         }else{
          callback()
         }
        }

      }]

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
            addEmployee(this.ruleForm).then((res) =>{
            if(res.data.code === 1){
              this.$message.success("save successfully")

              if(flagContinue){
                this.ruleForm = {
                  username:'',
                  name : '',
                  phone:'',
                  sex:'1',
                  id:''
                }
              }else{
                this.$router.push('/employee')
              }
            }else{
              this.$message.error("fail to save, please correct highlighted lines")
            }
          })
          }else{

            updateEmployee(this.ruleForm).then(res =>{
              if(res.data.code === 1){
                this.$message.success("save successfully")
                this.$router.push('/employee')
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
