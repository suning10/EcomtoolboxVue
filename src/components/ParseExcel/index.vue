
<template>
  <div class="container">
    <div class="box">    
        <el-input type="textarea" 
        v-model="rawInput"
        placeholder="Paste Excel rows here"
        rows="23"
        
        />
        <div style="margin-top: 20px;">        
          <el-button type = "primary" @click="parseExcelData" v-if="this.includeDescription != '1'">Parse</el-button>
          <el-button type = "primary" @click="parseExcelDataD" v-if="this.includeDescription == '1'">Parse</el-button>
          <el-button type="primary" @click="upload" :loading = loading>Submit</el-button>
          <p style="margin-top: 10px;"> Please hit Parse Before Submit</p>
        </div>

      </div>

      <el-table :data="tableData" border max-height="500" class="box">
        <el-table-column label="Key">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sku" placeholder="Key" />
          </template>
        </el-table-column>

        <el-table-column label="Value">
          <template slot-scope="scope">
            <el-input v-model="scope.row.category" placeholder="Value" />
          </template>
        </el-table-column>

        <el-table-column label="Description" v-if="includeDescription == '1'">
          <template slot-scope="scope">
            <el-input v-model="scope.row.description" placeholder="description" />
          </template>
        </el-table-column>

        <el-table-column label="Actions" width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="removeRow(scope.$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>


</template>
  
  <script lang="ts">
  //import { uploadFile } from '@/api/common'
import { uploadFileFactory } from '@/api/commonFactory'
import { Vue, Component, Prop } from 'vue-property-decorator'

  //import { getToken } from '@/utils/cookies'
  @Component({
    name: 'parseExcel'
  })
  export default class extends Vue {

    @Prop() actionUrl!: string

    @Prop() redirectUrl!: string

    @Prop() api!: any

    @Prop() keyName:string

    @Prop() valueName:string

    @Prop() validationUrl: any

    @Prop() includeDescription: string

    

    // for furture use 
    // private headers = {
    //   token: getToken()
    // }

    loading = false

  items = []
  pumiQty = []
  tableData = [];
  page = 1;
  pageSize = 20;
  totalRaw = 0
  totalSummary = 0
  flagParse = false

  //excel
  rawInput: string = ""; // pasted text from Excel
  keys: string[] = [];
  values: string[] = [];
  values2: string[] = [];
  payload = [];

  // Parse raw Excel-like text into arrays
  parseExcelData(): void {
    this.tableData = [];
    const lines = this.rawInput.split(/\r?\n/);
    lines.forEach(line => {
      if (!line.trim()) return;
      const parts = line.split(/\t/); // Excel uses tab separator
      this.tableData.push({
        key: parts[0] || "",
        value: parts[1] || ""
      });
      const [key,value] = parts;
      this.payload.push({[this.keyName] : key,[this.valueName]: value})
    });
    //this.validationUrl()

    this.flagParse = true;

  }

  parseExcelDataD(): void {
    this.tableData = [];
    const lines = this.rawInput.split(/\r?\n/);
    lines.forEach(line => {
      if (!line.trim()) return;
      const parts = line.split(/\t/); // Excel uses tab separator
      this.tableData.push({
        [this.keyName] : parts[0] || "",
        [this.valueName]: parts[1] || "",
        description:parts[2] || ""
      });
      const [key,value,description] = parts;
      this.payload.push({[this.keyName] : key,[this.valueName]: value, description:description});
    });
    //this.validationUrl()

    this.flagParse = true;

  }

  removeRow(index: number): void {
    this.tableData.splice(index, 1);
    this.payload.splice(index,1);
  }



  private  upload() {
        if(!this.flagParse){
          this.$msgbox.alert("please parse first");
          return;
        } 
        this.loading = true;
        this.api(this.tableData).then(res =>{
            if(res.data.code === 0){
              if(res.data.msg!=''){
                this.loading = false
                this.$message.error(res.data.msg)
              }
              else{
                this.loading = false
                this.$message.error('error when uploading the file')
              }
                
            }
            if(res.data.code ===1){
              this.loading = false
              this.$message.success('import successfully')
              if(this.redirectUrl != ''){
                this.$router.push(this.redirectUrl)
              }
              
            }
        }).catch(error => {
          this.loading = false;
          this.$msgbox.alert(error)
        });
        this.flagParse = false;
      }
  
  }
  </script>

<style scoped>
.container {
  display: flex;
  gap: 20px; /* space between textarea and table */
  align-items: stretch; /* makes both the same height */
}

.box {
  flex: 1; /* both take equal width */
  min-height: 300px; /* set a base height */
}
</style>
