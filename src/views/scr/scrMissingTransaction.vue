<template>

    <div class="addBrand-container">
      <h2 style="text-align: center; margin-bottom: 10px;">Missing Transactions</h2>
        <div class="container">
            <el-form ref="form" :model="ruleform " label-width="240px">
              <el-form-item label = "Please Choose Date Range">
                    <el-date-picker       
                    v-model="selectedDate"
                    type="daterange"
                    range-separator="To"
                    unlink-panels
                    start-placeholder="Start date"
                    end-placeholder="End date">
                    </el-date-picker>
                    <br>
                    <p> To choose a single day, click on that date twice. Otherwise, select a range</p>
                </el-form-item>
              <el-form-item label="Please enter your email address">
                  <el-input  v-model="email" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="enqueueRequest" :loading = loader>Submit</el-button>
              </el-form-item>
  
              
    
            </el-form>
    
    
    
        </div>
    
    
    </div>
    </template>

<script lang="ts">


import { scrMissingTransactions } from '@/api/scrReport';
import { Vue,Component} from 'vue-property-decorator'
@Component({
  name: 'MissingTransactions',
})
export default class extends Vue{
  private ruleform = {

  }

//pagination settings

private selectedDate = '';

private loader = false;

private email = 'eCommTeam@sea.samsung.com';


private enqueueRequest(){
    
    const start = new Date(this.selectedDate[0]).toISOString().slice(0,10);
    let end = new Date(this.selectedDate[1]).toISOString().slice(0,10);
    const diff = new Date(this.selectedDate[1]).getDate() - new Date(this.selectedDate[0]).getDate();

    let endDate:Date = new Date(this.selectedDate[1])
    endDate.setDate(new Date(this.selectedDate[1]).getDate() + 1);
    end = endDate.toISOString().slice(0,10);
    this.loader = true;
    if(diff > 15){
        this.loader = false
        this.$message.error("for better performance, please choose date range less than 15 days");
    }
    else{
        try{
            scrMissingTransactions(start,end,this.email).then((res) => {
            if(res.data.code === 1){
                this.loader = false
                this.$msgbox.alert("your task has been queued and will send to your email")

                }
            else{
                this.loader = false
                this.$msgbox.alert("Failed to queue your request due to network or server issue, Please reach out to eCommTeam@sea.samsung.com")
            }
        }).catch(error =>{
            this.loader = false
            this.$msgbox.alert(error + "<br> Failed to queue your request due to network or server issue, Please reach out to eCommTeam@sea.samsung.com")
        }) ;
        }
        catch{
            this.loader = false
            this.$msgbox.alert("Failed to queue your request due to network or server issue, Please reach out to eCommTeam@sea.samsung.com")
        }

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

    .el-textarea{
      width: 50%;
    }
    .el-input {
      width: 100%;
    }
    .el-button{
        text-align: center;
    }
    .loader {
		transform: translate(-50%, -50%);
    	border: 10px solid #f3f3f3; /* Light grey */
    	border-top: 8px solid #3498db; /* Blue */
    	border-radius: 50%;
    	width: 100px;
    	height: 100px;
    	animation: spin 2s linear infinite;
	}

	  @keyframes spin {
    	0% { transform: rotate(0deg); }
    	100% { transform: rotate(360deg); }
	  }
  }
}
</style>