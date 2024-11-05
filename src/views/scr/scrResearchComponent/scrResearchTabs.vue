
<template>
  <div>
    <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
    <el-table 
            :data="currentChange"
            border
            max-height="500"
            style="width: 100%">
            <!-- <el-table-column v-if="includeSearch == 1" label="Research" width="150">
                <template slot-scope="scope">
                  <el-button type="text" @click="researchSKU(scope.row.material,0)">Check Activity</el-button>
                </template>
              </el-table-column> -->
              <el-table-column v-if="includeSearch == 1" label="Research" width="150">
                <el-button type="text" @click="dialogVisible = true">Research</el-button>
              </el-table-column>

              <el-dialog
                title="Research"
                :visible.sync="dialogVisible"
                width="30%"
                >
                <span>Choose Research All Sloc or Only Current Sloc</span>
                <span slot="footer" class="dialog-footer">
                  <template slot-scope="scope">
                  <el-button type="text" @click="researchSKU(scope.row.material,0)">Currrent Sloc</el-button>
                  <el-button type="text" @click="researchSKU(scope.row.material,1)">All Sloc</el-button>
                </template>              
                </span>
              </el-dialog>
              <el-table-column v-for="column in columnNames"
                :key = "column"
                :prop="column"
                :label="column"
                :fixed="column == 'material' ? 'left':false"
                sortable
                width = 180>
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

    <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>

  </div>


</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'scrTable',
})
export default class extends Vue {
  @Prop() private columnNames!: []
  @Prop() private rowData!: any
  @Prop({ default: 0 }) private includeSearch!: number
  @Prop({ default: 0 }) private start!: any
  @Prop({ default: 0 }) private end!: any
  @Prop({ default: 'WC1E' }) private sloc!: any

      page = 1;
      pageSize = 20;
      total = 0;
      search =''
      dialogVisible = false
  created(){
      this.page = 1;
      this.pageSize = 20;
      this.total = this.rowData.length;
      this.dialogVisible = false
  }



get currentChange(){
const start = this.pageSize * (this.page - 1);
const end = start + this.pageSize;
this.total = this.rowData.length
return this.rowData.filter(data => !this.search || data.material.toLowerCase().includes(this.search.toLowerCase())).slice(start,end);
} 


private handleSizeChange(size:number){
this.pageSize = size;
this.page = 1;
}

private handleCurrentChange(page:number){
this.page = page
}

  private exportToCSV() {
    const csvContent = this.convertToCSV(this.rowData);
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
  if(typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('\r') )) {
    return `"${value}"`;
  } else {
    return value;
  }
  }).join(',');
  });
  return header + '\n' + rows.join('\n');
  }

  private researchSKU(sku,flag){
    this.$router.push(
      {
            path:'/scr/skuReasearch' ,
            query:{'sku':sku,
                  'start':this.start,
                  'end':this.end,
                  'sloc': flag ==0 ? this.sloc :'all'
            }
          }
    ) 
  }

}
</script>

