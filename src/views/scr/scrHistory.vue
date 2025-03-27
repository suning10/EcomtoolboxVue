<template> 
    <div class="dashboard-container">

        <div class="dataSelect">
            <div>
                <el-form ref="form"  label-width="240px">
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
                    <el-form-item>
                    <el-button type="primary" @click="enqueueRequest" :loading = loader>Submit</el-button>
                </el-form-item>
                <!-- <span @click="checkaffterDate('week', 'after')">Next Week</span> -->
                </el-form>
            </div>

        </div>
        <!-- <h3 style="text-align: center;">SCR Trend SCR Abs Gap Value</h3> -->
        <div id = "test" ref="chart" style="width: 80%; height: 400px;"></div>
        <!-- <h3 style="text-align: center;">SCR Trend SCR Abs Gap</h3> -->
        <div id = "test2" ref="chart2" style="width: 80%; height: 400px;"></div>
    </div>
        

</template> 
<script lang="ts"> 

import { Component, Vue, Watch } from 'vue-property-decorator' 
import * as echarts from 'echarts' 
import { scrTrend } from '@/api/scrReport';

@Component
export default class MyChart extends Vue { 

private selectedDate = '';
private loader = false;
private currentData = [];


created() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()-7);
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    try{
            scrTrend(start,end).then((res) => {
            if(res.data.code === 1){
                this.currentData = res.data.data
                }
            else{
                this.$msgbox.alert("Failed to queue your request due to network or server issue, Please reach out to eCommTeam@sea.samsung.com")
            }
        }).catch(error =>{
            this.$msgbox.alert(error)
        }) ;
        }
        catch{
            this.$msgbox.alert("Failed to queue your request due to network or server issue, Please reach out to eCommTeam@sea.samsung.com")
        }

  }


@Watch('currentData')
private changeData(newVal ,oldVal){
    console.log(newVal)
          this.int()
        }


mounted() { 
        this.int()
        } 


private int(){
    const chartDom = this.$refs.chart as HTMLDivElement 
    
if (chartDom) { 
    const myChart = echarts.init(chartDom) 
    const option = { 
        title: { 
            text: 'Abs Value' }, 
            tooltip: {trigger: 'axis'}, 
            legend: {
                data: ['WC1E','WR2E','WR3E','WC3E']
            },
            xAxis: { 
                data: this.currentData.filter(entry=> entry.sloc == 'WC1E').map(e=>e.date) }, 
            yAxis: {}, 
            series: [ 
                    {   name: 'WC1E', 
                        type: 'line', 
                        data: this.currentData.filter(entry=> entry.sloc == 'WC1E').map(e=>e.absGapValue),
                        label:{
                            show:false,
                            position:'top'
                        }
                        
                    },
                    { name: 'WR2E', 
                    type: 'line', 
                    data: this.currentData.filter(entry=> entry.sloc == 'WR2E').map(e=>e.absGapValue),
                        label:{
                            show:false,
                            position:'top'
                        } 
                    },
                    { name: 'WR3E', 
                    type: 'line', 
                    data: this.currentData.filter(entry=> entry.sloc == 'WR3E').map(e=>e.absGapValue),
                        label:{
                            show:false,
                            position:'top'
                        } 
                    },
                    { name: 'WC3E', 
                    type: 'line', 
                    data: this.currentData.filter(entry=> entry.sloc == 'WC3E').map(e=>e.absGapValue),
                        label:{
                            show:false,
                            position:'top'
                        } 
                    },
                    ] 
        } 
    myChart.setOption(option) }
    
    const chartDom2 = this.$refs.chart2 as HTMLDivElement 
    if (chartDom) { 
    const myChart2 = echarts.init(chartDom2) 
    const option = { 
        title: { 
            text: 'Abs Gap' }, 
            tooltip: {trigger: 'axis'}, 
            legend: {
                data: ['WC1E','WR2E','WR3E','WC3E']
            },
            xAxis: { 
                data: this.currentData.filter(entry=> entry.sloc == 'WC1E').map(e=>e.date) }, 
            yAxis: {}, 
            series: [ 
                    {   name: 'WC1E', 
                        type: 'line', 
                        data: this.currentData.filter(entry=> entry.sloc == 'WC1E').map(e=>e.absGap),
                        label:{
                            show:false,
                            position:'top'
                        }
                        
                    },
                    { name: 'WR2E', 
                    type: 'line', 
                    data: this.currentData.filter(entry=> entry.sloc == 'WR2E').map(e=>e.absGap),
                        label:{
                            show:false,
                            position:'top'
                        } 
                    },
                    { name: 'WR3E', 
                    type: 'line', 
                    data: this.currentData.filter(entry=> entry.sloc == 'WR3E').map(e=>e.absGap),
                        label:{
                            show:false,
                            position:'top'
                        } 
                    },
                    { name: 'WC3E', 
                    type: 'line', 
                    data: this.currentData.filter(entry=> entry.sloc == 'WC3E').map(e=>e.absGap),
                        label:{
                            show:false,
                            position:'top'
                        } 
                    },
                    ] 
        } 
    myChart2.setOption(option) }
}


// private changeDate(val: string) {
//     if (this.stateTime == '' || this.endTime == '' || this.dataTime == null) {
//       this.$message.error('检索日期不能为空！')
//       this.stateTime = moment().format('YYYY-MM-DD')
//       this.endTime = moment().format('YYYY-MM-DD')
//       return
//     }
//     if (val === 'day') {
//       this.stateTime = moment(this.dataTime).format('YYYY-MM-DD')
//       this.endTime = moment(this.dataTime).format('YYYY-MM-DD')

//         this.getData()

        
//         } 

//     }
private getData(){
    console.log("test")
}

private checkaffterDate(week, before){

}

private enqueueRequest(){

    const start = new Date(this.selectedDate[0]).toISOString().slice(0,10);
    let end = new Date(this.selectedDate[1]).toISOString().slice(0,10);
    const diff = new Date(this.selectedDate[1]).getDate() - new Date(this.selectedDate[0]).getDate();

    let endDate:Date = new Date(this.selectedDate[1])
    endDate.setDate(new Date(this.selectedDate[1]).getDate() + 1);
    end = endDate.toISOString().slice(0,10);


        try{
            scrTrend(start,end).then((res) => {
            if(res.data.code === 1){
                this.currentData = res.data.data
                }
            else{
                this.$msgbox.alert("Failed to queue your request due to network or server issue, Please reach out to eCommTeam@sea.samsung.com")
            }
        }).catch(error =>{
            this.$msgbox.alert(error)
        }) ;
        }
        catch{
            this.$msgbox.alert("Failed to queue your request due to network or server issue, Please reach out to eCommTeam@sea.samsung.com")
        }

        
  }
}

</script> 

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .headBut {
      span {
        cursor: pointer;
        margin: 0 10px;
        font-size: 18px;
        padding: 16px 0px;
      }
      .act {
        border-bottom: solid 4px $mine;
        font-weight: bold;
      }
    }
    .topLable {
      font-size: 16px;
      background: #fff;
      position: relative;
      z-index: 1;
      padding: 15px 28px;
      margin-bottom: 30px;
      border-radius: 4px;
      .tit {
        line-height: 40px;
        color: $mine;
      }
      .dataSelect {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        div:first-child {
          span:first-child {
            margin-right: 10px;
            cursor: pointer;
          }
          span:last-child {
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
      .but {
        background: $mine;
        cursor: pointer;
        display: inline-block;
        color: #fff;
        padding: 0px 20px;
        line-height: 30px;
        height: 30px;
        border-radius: 4px;
        font-size: 14px;
      }
    }
    .container {
      background: #fff;
      position: relative;
      z-index: 1;
      padding: 30px 28px;
      border-radius: 4px;
      margin-bottom: 30px;
      .topDataBox {
        display: flex;
        margin-bottom: 15px;
        .icon {
          width: 80px;
          height: 80px;
          /*padding-top: 15px;*/
          border-radius: 100%;
          background: #fff;
          margin-right: 10px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .box {
          margin-right: 15px;
          display: flex;
          padding: 15px;
          flex: 1;
          border-radius: 5px;
          color: #fff;
          .item {
            div:nth-child(2) {
              font-size: 18px;
              line-height: 36px;
            }
          }
        }
        .nowData {
          background: linear-gradient(
            63deg,
            rgba(85, 169, 255, 1) 24%,
            rgba(55, 154, 255, 1) 100%
          );
        }
        .noData {
          background: linear-gradient(
            63deg,
            rgba(255, 168, 104, 1) 33%,
            rgba(255, 144, 61, 1) 100%
          );
        }
        .employee {
          margin-right: 0;
          background: linear-gradient(
            121deg,
            rgba(255, 136, 136, 1) 24%,
            rgba(245, 108, 108, 1) 100%
          );
        }
      }
      .chartBox {
        display: flex;
        div {
          flex: 1;
        }
        .itemList {
          .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .item {
            display: flex;
            line-height: 45px;
            padding: 0 20px;
            border-bottom: solid 1px #f0f1f4;
            span {
              flex: 1;
              text-align: center;
            }
            span:first-child {
              text-align: left;
            }
          }
          .topLab {
            background: #f0f1f4;
            border-radius: 4px;
          }
        }
      }
    }
    .topButBox {
      position: absolute;
      right: 20px;
      top: 0;
      z-index: 9999;
      font-size: 12px;
      span {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 4px;
        cursor: pointer;
      }
      .butAct {
        background: #3a9bff;
        color: #fff;
      }
    }
  }
}
</style>