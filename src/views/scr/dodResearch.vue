
<template>

    <div class="addBrand-container">
        <h2 style="text-align: center; margin-bottom: 10px;">DOD Research</h2>
          <div class="container">
              <el-form ref="form"  label-width="240px" v-if="!displayResult">
      
                <el-form-item label = "SLOC">
                    <el-select v-model=sloc placeholder="Select" >
                        <el-option
                        label="WC1E"
                        value="WC1E">
                        </el-option>
                        <el-option
                        label="WR2E"
                        value="WR2E">
                        </el-option>
                        <el-option
                        label="WR3E"
                        value="WR3E">
                        </el-option>
                        <el-option
                        label="WC3E"
                        value="WC3E">
                        </el-option>
                    </el-select>        
                </el-form-item>  
    
                <el-form-item label="SKU" >
                  <el-input type="textarea" v-model="sku" 
                  placeholder="Please Enter SKU" 
                  rows="1"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dodResearch" :loading = loader>Search</el-button>
                </el-form-item>
    
                <div class="loader" v-if="loader"></div>
    
              </el-form>
              <div v-else>
    
                <el-table 
                :data="currentChange"
                border
                max-height="500"
                style="width: 100%">
                  <el-table-column
                    prop="material"
                    label="Material"
                    width="250">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="Date"
                    width="250">
                  </el-table-column>
                  <el-table-column
                    prop="gap"
                    label="Gap"
                    width="250">
                  </el-table-column>
                  <el-table-column label="Research" width="150">
                    <template slot-scope="scope">
                      <el-button type="text" @click="researchSKU(scope.row.material,1,scope.row.date)">AllSloc</el-button>
                      <el-button type="text" @click="researchSKU(scope.row.material,0,scope.row.date)">{{sloc}}</el-button>
                    </template>
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
              </el-pagination >
              <p><i>Research is chosen day - 1 to chosen day</i></p>
              <br>
              <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>
              <el-button type="primary" @click="goBack(false)">Back</el-button>
              <el-button type="primary" @click="goBack(true)">Clear and Back</el-button>
      
              </div>
      
      
      
          </div>
      
      
      </div>
    </template>
    
    <script lang="ts">
    import { scrResearchDOD } from '@/api/scrReport';
    import { Vue,Component} from 'vue-property-decorator'

    @Component({
      name: 'dod Research',
    })
    export default class extends Vue{
    

    //pagination settings
    private page = 1;
    private pageSize = 20;
    private total = 0;
    private currentData = [];
    private selectedDate = '';
    private sloc = ''
    private sku = ''
    
    
    private summaryFlag = true;
    
    //control the spin 
    private loader = false;
    
    
    
    
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
    
    private radio = "1";
    private displayResult = false;
    
    
    private tableData = [];
    
    
    
    private dodResearch(){    
    
      this.loader = true
      try{  
      scrResearchDOD(this.sku,this.sloc).then((res) =>{
      if(res.data.code === 1){
        this.tableData = res.data.data
        this.total = this.tableData.length;
        this.loader = false;
        this.displayResult = !this.displayResult;
      }
      else{
        this.$message.error("No Records Can Be Found")
        this.loader = false
      }
      })}catch(error){this.$message.error(error);}
    
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
    this.sku = ''
    }
    this.displayResult = !this.displayResult;
    }

    private researchSKU(sku,flag,date:string){
    
    var stripdate = date.includes('\r') ? date.replace('\r','') : date
    var formatDate = stripdate.replace(/(..).(..).(....)/, "$3-$1-$2");
    var start = new Date(formatDate)
    start.setDate(start.getDate() - 1)
    var strStart = start.toISOString().split('T')[0]
    console.log(strStart)

    this.$router.push(
      {
            path:'/scr/skuReasearch' ,
            query:{'sku':sku,
                  'start':strStart,
                  'end':formatDate,
                  'sloc': flag == 0 ? this.sloc :'all'
            }
          }
    ) 
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