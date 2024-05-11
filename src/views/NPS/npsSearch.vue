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