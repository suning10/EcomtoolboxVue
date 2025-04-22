
<template>
    <div>
      <!-- <el-form ref="form"  label-width="240px">
              <el-form-item label = "Update Date" style="display: inline-block; margin-right: 5%;">
                <el-date-picker       
                  v-model="selectedDate"
                  type="daterange"
                  range-separator="To"
                  unlink-panels
                  start-placeholder="Start date"
                  end-placeholder="End date">
                </el-date-picker>
              </el-form-item>    
              <el-form-item style="display: inline-block; margin-right: 5%;">
                  <el-button type="primary" @click="updateTime" :loading = loader>Update</el-button>
              </el-form-item>
      </el-form> -->

      <div class="tableBar">
        <label style="margin-right: 5px;">
          Activity Date
        </label>
        <el-date-picker       
                  v-model="selectedDate"
                  type="daterange"
                  range-separator="To"
                  unlink-panels
                  start-placeholder="Start date"
                  end-placeholder="End date">
          </el-date-picker>
        <el-button type="primary" @click="updateTime" :loading = loader>Update</el-button>
        <p style="text-align: right;" ><i>{{ updateDate }}</i></p>
      </div>

      <el-tabs v-model="active_name" @tab-click="handleClick">
        <el-tab-pane label= "Reference" name="1">
          <el-table 
                :data="currentChange1"
                :default-sort = "{prop: 'postDate', order: 'descending'}"
                v-loading = loader
                border
                max-height="500"
                style="width: 100%">
                  <el-table-column 
                    fixed = "left"
                    prop="reference"
                    label= "Ref"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="item"
                    label= "Item"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="transactionType"
                    label= "Type"
                    sortable
                    width = 120>
                  </el-table-column>
                  <el-table-column 
                    prop="po"
                    label= "PO"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="inventoryStatus"
                    label= "inventoryStatus"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="mvt"
                    label= "Mvt"
                    width = 80>
                  </el-table-column>
                  <el-table-column 
                    prop="postDate"
                    label= "PostDate"
                    sortable
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="postTime"
                    label= "PostTime"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="entryDate"
                    label= "EntryDate"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="synapseQty"
                    label= "SynapseQty"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="nerpQty"
                    label= "nerpQty"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="valType"
                    label= "Val"
                    width = 80>
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
            :total="total1">
          </el-pagination >
      </el-tab-pane>
      
      <el-tab-pane label= "Miss Reference Synapse" name="2">
          <el-table 
                :data="currentChange2"
                max-height="500"
                v-loading = loader
                border
                style="width: 100%">
                  <el-table-column 
                    prop="reference"
                    label= "ref"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="material"
                    label= "material"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="plnt"
                    label= "plnt"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="sloc"
                    label= "sloc"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="mvt"
                    label= "mvt"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="matDoc"
                    label= "matDoc"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="postDate"
                    label= "postDate"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="entryDate"
                    label= "entryDate"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="qty"
                    label= "qty"
                    width = 100>
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
            :total="total2">
          </el-pagination >
      </el-tab-pane>
      <el-tab-pane label= "Miss Reference NERP" name="3">
        <el-tooltip class="item" effect="dark" content="Synapse Has Reference while Nerp not" placement="top">
          <el-table 
                :data="currentChange3"
                border
                max-height="500"
                v-loading = loader
                style="width: 100%">
                <el-table-column 
                    prop="reference"
                    label= "ref"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="item"
                    label= "material"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="slot"
                    label= "sloc"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="po"
                    label= "PO"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="transactionDate"
                    label= "transactionDate"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="transactionType"
                    label= "transactionType"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="inventoryStatus"
                    label= "inventoryStatus"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="qty"
                    label= "qty"
                    width = 100>
                  </el-table-column>
          </el-table>
        </el-tooltip>
          <el-pagination 
            style="text-align: right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10, 50, 100, 1000]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total3">
          </el-pagination >
      </el-tab-pane>

      <el-tab-pane label= "Adjustment" name="4">

          
          <div style="display: flex; gap: 20px">
            <el-table 
                :data="currentChange4"
                :default-sort = "{prop: 'date', order: 'descending'}"
                max-height="500"
                border
                style="width: 50%">
              <el-table-column :label=adjSummaryNerpTotalText>
                  <el-table-column 
                    prop="date"
                    label= "Date"
                    fixed = "left"
                    sortable
                    width = 120
                    >
                  </el-table-column>
                  <el-table-column 
                    prop="item"
                    label= "Item"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="movement"
                    label= "Mvt"
                    sortable=""
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="source"
                    label= "Source"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="qty"
                    label= "qty"
                    width = 180>
                  </el-table-column>
                </el-table-column>
          </el-table>
          <el-table 
                :data="currentChange5"
                border
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 50%"
                max-height="500">
                <el-table-column :label=adjSummarySynapseTotalText>
                  <el-table-column 
                    prop="date"
                    label= "Date"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="item"
                    label= "Item"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="movement"
                    label= "Mvt"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="source"
                    label= "Source"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="qty"
                    label= "qty"
                    width = 180>
                  </el-table-column>
                </el-table-column>
          </el-table>
          </div>
          
      </el-tab-pane>

      <el-tab-pane label= "Adjustment Details NERP" name="5">
        <el-table 
                :data="currentChange6"
                max-height="500"
                :default-sort = "{prop: 'postDate', order: 'descending'}"
                border
                style="width: 100%">
                  <el-table-column 
                    prop="reference"
                    label= "ref"
                    width = 80>
                  </el-table-column>
                  <el-table-column 
                    prop="material"
                    label= "material"
                    width = 180
                    fixed>
                  </el-table-column>
                  <el-table-column 
                    prop="plnt"
                    label= "plnt"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="sloc"
                    label= "sloc"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="mvt"
                    label= "mvt"
                    width = 100
                    sortable>
                  </el-table-column>
                  <el-table-column 
                    prop="matDoc"
                    label= "matDoc"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="postDate"
                    label= "postDate"
                    sortable
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="entryDate"
                    label= "entryDate"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="qty"
                    label= "qty"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="valType"
                    label= "valType"
                    width = 100>
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
            :total="total6">
          </el-pagination >
      </el-tab-pane>

      <el-tab-pane label= "Adjustment Details Synpase" name="6">
        <el-table 
                :data="currentChange7"
                border
                max-height="500"
                :default-sort = "{prop: 'transactionDate', order: 'descending'}"
                style="width: 100%">
                <el-table-column 
                    prop="reference"
                    label= "ref"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="item"
                    label= "material"
                    width = 180
                    fixed>
                  </el-table-column>
                  <el-table-column 
                    prop="slot"
                    label= "sloc"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="po"
                    label= "PO"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="transactionDate"
                    label= "transactionDate"
                    sortable
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="transactionType"
                    label= "transactionType"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="inventoryStatus"
                    label= "inventoryStatus"
                    sortable=""
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="qty"
                    label= "qty"
                    width = 100>
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
            :total="total7">
          </el-pagination >
      </el-tab-pane>
      <el-tab-pane label= "All References" name="7">
          <el-table 
                :data="currentChange8"
                :default-sort = "{prop: 'postDate', order: 'descending'}"
                v-loading = loader
                border
                max-height="500"
                style="width: 100%">
                  <el-table-column 
                    fixed = "left"
                    prop="reference"
                    label= "Ref"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="item"
                    label= "Item"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="transactionType"
                    label= "Type"
                    sortable
                    width = 120>
                  </el-table-column>
                  <el-table-column 
                    prop="po"
                    label= "PO"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="inventoryStatus"
                    label= "inventoryStatus"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="mvt"
                    label= "Mvt"
                    width = 80>
                  </el-table-column>
                  <el-table-column 
                    prop="postDate"
                    label= "PostDate"
                    sortable
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="postTime"
                    label= "EnterTime"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="entryDate"
                    label= "EntryDate"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="synapseQty"
                    label= "SynapseQty"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="nerpQty"
                    label= "nerpQty"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="valType"
                    label= "Val"
                    width = 80>
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
            :total="total8">
          </el-pagination >
      </el-tab-pane>
      
      </el-tabs>
      <p><i>Default Date Range is last 7 Days</i></p>
      <br>
      <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>


    </div>
  
  
  </template>
  
  <script lang="ts">
  import { getUpdateDate } from '@/api/scr';
import { scrApiFactory } from '@/api/scrFactory';
import { Component, Prop, Vue ,Watch} from 'vue-property-decorator'
  
  @Component({
    name: 'skuResearch',
  })
  export default class extends Vue {

        page = 1;
        pageSize = 20;
        sku:any
        rowData1 = []
        rowData2 = []
        rowData3 = []
        rowData4 = []
        rowData5 = []
        rowData6 = []
        rowData7 = []
        rowData8 = []
        total1 = 0;
        total2 = 0;
        total3 = 0;
        total4 = 0;
        total5 = 0;
        total6 = 0;
        total7 = 0;
        total8=0
        start:any
        end: any
        sloc: any
        active_name = '1'
        scrMethod:any
        private selectedDate = '';
        loader = false;
        adjSummaryNerpTotal = 0
        adjSummarySynapseTotal = 0
        adjSummaryNerpTotalText = ''
        adjSummarySynapseTotalText = ''
        updateDate = ''

        created(){

            this.sku = this.$route.query.sku;
            this.start = this.$route.query.start;
            this.end = this.$route.query.end;
            this.sloc = this.$route.query.sloc;
            this.active_name = '1'
            this.getUpdateDateFromDB()
            this.populateData()
            


        }

        @Watch('active_name')
        onTabChange(newVal){
            if(newVal == '7'){
              this.loader = true
              let payload = {'sku':this.sku,
                    'start': this.start,
                    'end' : this.end,
                    'sloc': this.sloc
    }
              let apiCall = scrApiFactory("skuComparisonAll")
              apiCall(payload).then((res) =>{
              if(res.data.code == 1){
                this.rowData8 = res.data.data
                this.total8 = this.rowData8.length;
                this.loader = false
                
              }
              else{
              this.$message.error("No Records Can Be Found")
            }
              })
            }
        }


        
  get currentChange1(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.rowData1.slice(start,end);
  } 

  get currentChange2(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.rowData2.slice(start,end);
  } 

  get currentChange3(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.rowData3.slice(start,end);
  } 

  get currentChange4(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.rowData4.slice(start,end);
  } 

  get currentChange5(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.rowData5.slice(start,end);
  } 

  get currentChange6(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.rowData6.slice(start,end);
  } 

  get currentChange7(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.rowData7.slice(start,end);
  } 

  get currentChange8(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.rowData8.slice(start,end);
  } 
  
  private handleSizeChange(size:number){
  this.pageSize = size;
  this.page = 1;
  }
  
  private handleCurrentChange(page:number){
  this.page = page
  }
  
  private getUpdateDateFromDB(){

    getUpdateDate().then((res) =>{
      if(res.data.code == 1){
        this.updateDate = res.data.data
        console.log(res.data.data)
      }
    })
  }



  private updateTime(){
    this.loader = true
    this.start = new Date(this.selectedDate[0]).toISOString().slice(0,10);
    this.end = new Date(this.selectedDate[1]).toISOString().slice(0,10);
    this.populateData();
  }

  private populateData(){
    this.loader = true
    let apiCall = scrApiFactory("skuComparison")
    let payload = {'sku':this.sku,
                    'start': this.start,
                    'end' : this.end,
                    'sloc': this.sloc
    }
    apiCall(payload).then((res) =>{
    if(res.data.code == 1){
      this.rowData1 = res.data.data
      this.total1 = this.rowData1.length;
      
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    apiCall = scrApiFactory("skuMissingNerp")
    apiCall(payload).then((res) =>{
    if(res.data.code == 1){
      this.rowData2 = res.data.data
      this.total2 = this.rowData2.length;
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    apiCall = scrApiFactory("skuMissingItemActivity")
    apiCall(payload).then((res) =>{
    if(res.data.code == 1){
      this.rowData3 = res.data.data
      this.total3 = this.rowData3.length;
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    apiCall = scrApiFactory("skuSummaryNERPAdj")
    apiCall(payload).then((res) =>{
    if(res.data.code == 1){
      this.rowData4 = res.data.data.data
      this.total4 = this.rowData4.length;
      this.adjSummaryNerpTotal = res.data.data.total
      this.adjSummaryNerpTotalText = "Total Nerp Adj is " + this.adjSummaryNerpTotal
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    apiCall = scrApiFactory("skuSummarySynapseAdj")
    apiCall(payload).then((res) =>{
    if(res.data.code == 1){
      this.rowData5 = res.data.data.data
      this.total5 = this.rowData5.length;
      this.adjSummarySynapseTotal = res.data.data.total
      this.adjSummarySynapseTotalText = "Total Synapse Adj is " + this.adjSummarySynapseTotal
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })
    //adj detail Nerp
    apiCall = scrApiFactory("skuDetailNERPAdj")
    apiCall(payload).then((res) =>{
    if(res.data.code == 1){
      this.rowData6 = res.data.data
      this.total6 = this.rowData6.length;
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    apiCall = scrApiFactory("skuDetailSynapseAdj")
    apiCall(payload).then((res) =>{
    if(res.data.code == 1){
      this.rowData7 = res.data.data
      this.total7 = this.rowData5.length;
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    /*
    apiCall = scrApiFactory("skuComparisonAll")
    apiCall(payload).then((res) =>{
    if(res.data.code == 1){
      this.rowData8 = res.data.data
      this.total8 = this.rowData8.length;
      this.loader = false
      
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })
    */
  }
  
  private handleClick(tab){

    }

    private exportToCSV() {


      var data = []
      //check which tab is active
      if(this.active_name == '1'){
        data = this.rowData1
      }
      if(this.active_name == '2'){
        data = this.rowData2
      }
      if(this.active_name == '3'){
        data = this.rowData3
      }
      if(this.active_name == '4'){
        data = this.rowData4.concat(this.rowData5)
      }
      if(this.active_name == '5'){
        data = this.rowData6 
      }
      if(this.active_name == '6'){
        data = this.rowData7 
      }
      if(this.active_name == '7'){
        data = this.rowData8 
      }
      
      const csvContent = this.convertToCSV(data);
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
    if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('\r') )) {
      return `"${value}"`;
    } else {
      return value;
    }
    }).join(',');
    });
    return header + '\n' + rows.join('\n');
    }
  
  }
  </script>
  
  