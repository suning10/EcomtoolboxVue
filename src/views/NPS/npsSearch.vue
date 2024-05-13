<template>

<div>
<el-page-header  content="Aged Return Search">
</el-page-header>
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="RDOs">
    <el-input type="textarea" v-model="form.desc" placeholder="please enter RDO (Start with 8) here"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Search Return Tracking</el-button>
  </el-form-item>
</el-form>
<div>
</template>

<script>

  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>