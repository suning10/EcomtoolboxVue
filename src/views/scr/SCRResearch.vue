<template>
    <div>

      <div class="tableBar">
        <label style="margin-right: 5px;">
          SCR Date
        </label>
        <el-date-picker
                  v-model="datePicked"
                  type="date"
                  placeholder="Pick a day"
                  style="margin-right: 5px;">
                </el-date-picker>
        <el-button type="primary" @click="updateTime" :loading = loader>Update</el-button>
      </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="SCR Summary" name="1">
        <scr-table
        :columnNames="['sloc','absoluteGapCost','netGapCost','absoluteGap','netGap','skuWithError','skuWithErrorNumber','nerpOverage','synapseOverage']"
        :rowData = rowData1
        includeSearch=0

        ></scr-table>
      </el-tab-pane>
      <el-tab-pane label="WC1E Gap" name="2">
        <scr-table
        :columnNames="['material','synapseTotal','nerpTotal','totalGap','absMapValue','netGap','netGapMapValue','sloc']"
        :rowData=rowData2
        includeSearch=1
        :start= start
        :end = end
        ></scr-table>

      </el-tab-pane>

      <el-tab-pane label="WC1E Raw" name="3">

          <scr-table
          :columnNames="['material','qiNerp','qi3pl','qiGap','unsNerp','uns3pl','unsGap','blkNerp','blk3pl','blkGap','totalNerp','total3pl','totalGap','sloc','valType','absoluteGapValue','date']"
          :rowData=rowData3
          includeSearch=1
          :start= start
          :end = end
          ></scr-table>
      </el-tab-pane>
      <el-tab-pane label="WR2E Gap" name="4">
        <scr-table
          :columnNames="['material','synapseTotal','nerpTotal','totalGap','absMapValue','netGap','netGapMapValue','sloc']"
          :rowData=rowData4
          includeSearch=1
          :start= start
          :end = end
          sloc = "WR2E"
        ></scr-table>

      </el-tab-pane>
      <el-tab-pane label="WR2E Raw" name="5">
        <scr-table
          :columnNames="['material','qiNerp','qi3pl','qiGap','unsNerp','uns3pl','unsGap','blkNerp','blk3pl','blkGap','totalNerp','total3pl','totalGap','sloc','valType','absoluteGapValue','date']"
          :rowData=rowData5
          includeSearch=1
          :start= start
          :end = end
          sloc = "WR2E"
          ></scr-table>

      </el-tab-pane>
      <el-tab-pane label="WR3E Gap" name="6">
        <scr-table
          :columnNames="['material','synapseTotal','nerpTotal','totalGap','absMapValue','netGap','netGapMapValue','sloc']"
          :rowData=rowData6
          includeSearch=1
          :start= start
          :end = end
          sloc = "WR3E"
        ></scr-table>
      </el-tab-pane>
      <el-tab-pane label="WR3E Raw" name="7">
        <scr-table
          :columnNames="['material','qiNerp','qi3pl','qiGap','unsNerp','uns3pl','unsGap','blkNerp','blk3pl','blkGap','totalNerp','total3pl','totalGap','sloc','valType','absoluteGapValue','date']"
          :rowData=rowData7
          includeSearch=1
          :start= start
          :end = end
          sloc = "WR3E"
          ></scr-table>
      </el-tab-pane>
      <el-tab-pane label="WC3E Gap" name="8">
        <scr-table
          :columnNames="['material','synapseTotal','nerpTotal','totalGap','absMapValue','netGap','netGapMapValue','sloc']"
          :rowData=rowData8
          includeSearch=1
          :start= start
          :end = end
          sloc = "WC3E"
        ></scr-table>
      </el-tab-pane>
      <el-tab-pane label="WC3E Raw" name="9">
        <scr-table
          :columnNames="['material','qiNerp','qi3pl','qiGap','unsNerp','uns3pl','unsGap','blkNerp','blk3pl','blkGap','totalNerp','total3pl','totalGap','sloc','valType','absoluteGapValue','date']"
          :rowData=rowData9
          includeSearch=1
          :start= start
          :end = end
          sloc = "WC3E"
          ></scr-table>
      </el-tab-pane>
      <el-tab-pane label="DOD WC1E" name="10">
        <scr-table
        :columnNames="['material','day15','day14','day13','day12','day11','day10','day9','day8','day7','day6','day5','day4','day3','day2','day1','today','dod']"
        :rowData = rowData10
        includeSearch=0

        ></scr-table>
      </el-tab-pane>
      <el-tab-pane label="DOD WR2E" name="11">
        <scr-table
        :columnNames="['material','day15','day14','day13','day12','day11','day10','day9','day8','day7','day6','day5','day4','day3','day2','day1','today','dod']"
        :rowData = rowData11
        includeSearch=0

        ></scr-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  


<script lang="ts">
import { scrReportSummary,scrReportgGap, scrReportDetail,scrReportDOD } from '@/api/scrReport';
import { Vue,Component} from 'vue-property-decorator'
import scrTable from './scrResearchComponent/scrResearchTabs.vue';
@Component({
  name: 'scrResearch',
  components: {
    scrTable
  }
})
export default class extends Vue{

  private activeName = "1";
  day = new Date() ;
  start:string 
  end:string
  datePicked = ''
  loader = false
  rowData1 = []
  rowData2 = []
  rowData3 = []
  rowData4 = []
  rowData5 = []
  rowData6 = []
  rowData7 = []
  rowData8 = []
  rowData9 = []
  rowData10 = []
  rowData11 = []


  created(){
    /*
      Todo: add logic deterimine start and end
    */

    this.end = new Date().toISOString().split('T')[0];
    this.day.setDate(this.day.getDate()-7);
    this.start =  this.day.toISOString().split('T')[0]
    this.populateData('0')
    
  }
    private handleClick(tab){
        
    }

    private populateData(diff:string){

    scrReportSummary(diff).then((res) =>{
    if(res.data.code == 1){
      this.rowData1 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportgGap(diff,'WC1E').then((res) =>{
    if(res.data.code == 1){
      this.rowData2 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })


    scrReportDetail(diff,'WC1E').then((res) =>{
    if(res.data.code == 1){
      this.rowData3 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportgGap(diff,'WR2E').then((res) =>{
    if(res.data.code == 1){
      this.rowData4 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportDetail(diff,'WR2E').then((res) =>{
    if(res.data.code == 1){
      this.rowData5 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportgGap(diff,'WR3E').then((res) =>{
    if(res.data.code == 1){
      this.rowData6 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportDetail(diff,'WR3E').then((res) =>{
    if(res.data.code == 1){
      this.rowData7 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportgGap(diff,'WC3E').then((res) =>{
    if(res.data.code == 1){
      this.rowData8 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportDetail(diff,'WC3E').then((res) =>{
    if(res.data.code == 1){
      this.rowData9 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportDOD('WC1E').then((res) =>{
    if(res.data.code == 1){
      this.rowData10 = res.data.data
      this.loader = false
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })

    scrReportDOD('WR2E').then((res) =>{
    if(res.data.code == 1){
      this.rowData11 = res.data.data
    }
    else{
    this.$message.error("No Records Can Be Found")
  }
    })
  }

  
  private updateTime(){
    this.loader = true
    let today = new Date().getDate() - new Date(this.datePicked).getDate()
    this.populateData(today.toString());
  }
}
</script>