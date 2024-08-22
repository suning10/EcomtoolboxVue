<template>

<div class="addBrand-container">
  <h2 style="text-align: center; margin-bottom: 10px;">Age Return Search</h2>
    <div class="container">

        <el-form ref="form" :model="ruleform " label-width="120px" v-if="!displayResult">

          <el-form-item label = "Search By">
            <el-select v-model=emptyRDO placeholder="Select" >
              <el-option
                label="RDO"
                :value=true>
              </el-option>
              <el-option
                label="PO&SKU"
                :value=false>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="RDOs" v-if="emptyRDO">
              <el-input type="textarea" v-model="ruleform.id" 
              placeholder="please enter RDO (Start with 8) here" 
              rows="30"
              ></el-input>
          </el-form-item>
          <el-form-item label="PO&SKUs" v-else>
              <el-input type="textarea" v-model="ruleform.poId" 
              placeholder="please enter PO and SKU here eg. sa1234567SM-F721"
              rows="30"
              >
              </el-input>

          </el-form-item>
          <el-form-item v-if="emptyRDO">
              <el-button type="primary" @click="rdoSearch">Search Return Tracking</el-button>
          </el-form-item>

          <el-form-item v-else>
              <el-button type="primary" @click="poSearch">PO&SKU Search</el-button>
          </el-form-item>

        </el-form>
        <div v-else>
          <el-table 
          :data="currentChange"
          border
          style="width: 100%">
            <el-table-column
              prop="poLookupKey"
              label="poLookupKey"
              width="180">
            </el-table-column>
            <el-table-column
              prop="rdoId"
              label="rdo"
              width="180">
            </el-table-column>
            <el-table-column
              prop="returnTrackingId"
              label="returnTrackingId"
              width="180">
            </el-table-column>
            <el-table-column
              prop="poId"
              label="poId">
            </el-table-column>
            <el-table-column
              prop="trackingId"
              label="Outbound Tracking"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sku"
              label="sku"
              width="180">
            </el-table-column>
            <el-table-column
              prop="rsoId"
              label="rsoId">
            </el-table-column>
            <el-table-column
              prop="refundDt"
              label="refundDt"
              width="180">
            </el-table-column>
            <el-table-column
              prop="currentRefundStatus"
              label="currentRefundStatus">
            </el-table-column>
          </el-table>

          <el-pagination 
            style="text-align: right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10, 50, 100, 1000]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

          <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>
          <el-button type="primary" @click="goBack(false)">Back</el-button>
          <el-button type="primary" @click="goBack(true)">Clear and Back</el-button>

        </div>
        <br>
        <h3>Check Refund Status
          <br>
          <a href="http://stacs/sites/Logistics/_layouts/15/DocIdRedir.aspx?ID=W52DUE32R37W-21-2126" style="color: blue; text-decoration: underline;">Link to Template</a>
        </h3>
        <img src ="../../assets/AgingReturn.png">


    </div>


</div>
</template>
    
<script lang="ts">

import { searchByPO, searchByRDO } from '@/api/return';
import { computed } from '@vue/runtime-dom';

import { Vue,Component} from 'vue-property-decorator'
@Component({
    name: 'AgeReturnSearch'

  })
export default class extends Vue
{


    private ruleform = {

        id: '',
        poId:''
    }

    //pagination settings
    private page = 1;
    private pageSize = 25;
    private total = 0;
    private currentData = [];



    get currentChange(){
      const start = this.pageSize * (this.page - 1);
      const end = start + this.pageSize;
      return this.tableData.slice(start,end);
    } 

    private handleSizeChange(size:number){
      this.pageSize = size;
      this.page = 1;
    }

    private handleCurrentChange(page:number){
      this.page = page
    }

    private emptyRDO = true;
    private displayResult = false;


    private tableData = [];



    private rdoSearch(){

      if(this.ruleform.id.length > 1){
        const data = this.ruleform.id.split('\n').filter(
            item => item.trim().length > 0
          )
          const d = Array.from(new Set(data))
        const payload = {'rdo':d};
        searchByRDO(payload).then((res) =>{
        if(res.data.code === 1){
          console.log(res.data);
          this.tableData = res.data.data
          this.total = this.tableData.length;
        }
      })
        this.displayResult = !this.displayResult;
      } 

      else{
        this.$message.error('Please enter RDO or PO&SKU ')
      }

    }

    private poSearch(){

        if(this.ruleform.poId.length > 1){
          // split by \n and remove blank
          const data = this.ruleform.poId.split('\n').filter(
            item => item.trim().length > 0
          )
          const d = Array.from(new Set(data))

          const payload = {'rdo':d};
          searchByPO(payload).then((res) =>{
          if(res.data.code === 1){
            this.tableData = res.data.data
            this.total = this.tableData.length;
          }
          else{
            this.$message.warning("no result found")
          }
        })
          this.displayResult = !this.displayResult;
        } 

        else{
          this.$message.error('Please enter RDO or PO&SKU ')
        }

    }

    private exportToCSV() {
      const csvContent = this.convertToCSV(this.tableData);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'data.csv';
      link.click();
    }
    private convertToCSV(data) {
      const header = Object.keys(data[0]).join(',');
      const rows = data.map(row => {
        return Object.values(row).map(value => {
          // If the value contains a comma, enclose it in double quotes
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          } else {
            return value;
          }
        }).join(',');
      });
      return header + '\n' + rows.join('\n');
    }

    private goBack(clean:boolean){
      if(clean){
        this.ruleform = {

        id: '',
        poId:''
        }
      }
      this.displayResult = !this.displayResult;
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
  }
}
</style>
