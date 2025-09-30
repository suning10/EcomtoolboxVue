<template>
    <div>
      <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="SKU" name="1">
        <el-table 
                :data="currentChange1"
                max-height="500"
                v-loading = loader
                border
                style="width: 100%">
                  <el-table-column 
                    prop="sku"
                    label= "SKU"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="category"
                    label= "Category"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="description"
                    label= "description"
                    width = 580>
                  </el-table-column>
                  <el-table-column label="Edit" width="300">
                    <template slot-scope="scope">
                      <el-button type= "primary" @click="updateSKU(scope.row.sku)">update</el-button>
                      <el-button type= "danger" @click="deleteSKU(scope.row.sku)">delete</el-button>
                    </template>
                </el-table-column>
          </el-table>
          <div style="margin-top: 20px;">          
            <el-button type= "primary" @click="add">Add a New SKU</el-button>
            <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>
            <el-button type="primary" @click="exportToXLSX">ExportToXLSX</el-button>
          </div>

          <el-pagination 
            style="text-align: right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10, 50, 100, 1000]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSummary">
          </el-pagination >

      </el-tab-pane>

      <el-tab-pane label="Add SKU in Bulk" name="2">
        <parseExcel             
            actionUrl=""
            redirectUrl = "/cStock/summary"
            :api = "this.api"
            keyName="sku"
            valueName="category"
            includeDescription="1"></parseExcel>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
  


<script lang="ts">
import { getCStockSKU,delCStockSKU,insertCStockSKU } from '@/api/cStock';
import parseExcel from "@/components/ParseExcel/index.vue"
import { Vue,Component} from 'vue-property-decorator'
import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
import {skuDTO} from '@/types/skuDTO'
import { warn } from '@vue/runtime-dom';

@Component({
  name: 'CStockSKU',
  components: {parseExcel
  }
})
export default class extends Vue{

  private activeName = "1";
  loader = false
  rowData = []
  rowDataRaw = []
  page = 1;
  pageSize = 20;
  totalRaw = 0
  totalSummary = 0
  skuDTOs:skuDTO[] = []
  api = insertCStockSKU;
  search =''


  created(){
    /*
      Todo: add logic deterimine start and end
    */
    this.populateData()
    
    
  }
    private handleClick(tab){
        
    }

    private populateData(){
        this.loader = true
    try{
        getCStockSKU().then((res) => {
            if(res.data.code === 1){
                this.rowData  = res.data.data
                this.totalRaw = this.rowData.length
                this.loader = false
                }
            else{
                this.$msgbox.alert("Server Error When Fetching Data")
            }
        }).catch(error =>{
            this.$msgbox.alert(error)
        }) ;
        }
        catch{
            this.$msgbox.alert("Server Error When Fetching Data")
        } 
  }

  updateSKU(data){
    this.$router.push(
          {
            path:'/Cstock/add' ,
            query:{'id':data}
          }
        )
  }

  add(){
    this.$router.push('/Cstock/add');
  }

  deleteSKU(sku:string){

    this.$confirm(`are you sure to delete row "${sku}"`,{confirmButtonText:"yes",cancelButtonText:"no",type:"warning"} ).
    then(() =>{
    this.loader = true
    try{
        delCStockSKU(sku).then((res) => {
            if(res.data.code === 1){
                this.loader = false
                // this.rowData = this.rowData.filter(item => item !== sku)
                // console.log(this.rowData)
                this.populateData()
                }
            else{
                this.$msgbox.alert("Server Error When delete" + sku)
            }
        }).catch(error =>{
            this.$msgbox.alert(error + "Server Error When delete" + sku)
        }) ;
        }
        catch{
            this.$msgbox.alert("Server Error When delete" + sku)
        }   }
  
    )
    
  }

  

    get currentChange1(){
    const start = this.pageSize * (this.page - 1);
    const end = start + this.pageSize;
    return this.rowData.filter(data => !this.search || data.sku.toLowerCase().includes(this.search.toLowerCase())).slice(start,end);

    } 

    get currentChange2(){
        const start = this.pageSize * (this.page - 1);
        const end = start + this.pageSize;
        return this.rowDataRaw.filter(data => !this.search || data.sku.toLowerCase().includes(this.search.toLowerCase())).slice(start,end);
    } 

    private handleSizeChange(size:number){
        this.pageSize = size;
        this.page = 1;
  }
  
  private handleCurrentChange(page:number){
    this.page = page
  }

  private exportToCSV() {
    var data = []
    if(this.activeName == '1'){
        data = this.rowData
      }
      if(this.activeName == '2'){
        data = this.rowDataRaw
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
    if (typeof value === 'string' && value.includes(',')) {
      return `"${value}"`;
    } else {
      return value;
    }
  }).join(',');
  });
  return header + '\n' + rows.join('\n');
  }
  

  private exportToXLSX(){


    var data = []
    if(this.activeName == '1'){
        data = this.rowData
      }
      if(this.activeName == '2'){
        data = this.rowDataRaw
      }
    const worksheet = XLSX.utils.json_to_sheet(data)
          // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Write the workbook to binary array
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    // Create a Blob and trigger download
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'export.xlsx')

  }

  
}
</script>