<template>
  <div>
    <Row :gutter="20">
      <i-col span="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 20px;">
      <i-col span="8">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="数据来源"></chart-pie>
        </Card>
      </i-col>
      <i-col span="16">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周数据入库"/>
        </Card>
      </i-col>
    </Row>
    <Row style="margin-top: 20px;">
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '未标数据', icon: 'md-pint', count: 803, color: '#2d8cf0' },
        { title: '正在标注', icon: 'md-locate', count: 23432, color: '#19be6b' },
        { title: '已标注', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '废弃数据', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '数据导入', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '数据导出', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        {value: 335, name: 'flickr'},
        {value: 310, name: 'fudu'},
        {value: 234, name: 'subway'},
        {value: 135, name: 'street'},
        {value: 1548, name: 'crawl'}
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
