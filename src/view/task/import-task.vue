<template>
  <Row :gutter="24">
    <Form :model="importSetting" :label-width="80">
      <Row :gutter="24">
        <Col span="12">
          <FormItem label="任务标题">
            <Input v-model="importSetting.title" placeholder="任务标题"></Input>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="任务描述">
            <Input v-model="importSetting.desc" placeholder="可选"></Input>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="导入用户">
            <Select v-model="importSetting.account">
              <Option v-for="item in sourceInfo.account" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="数据路径">
            <Input v-model="importSetting.title" placeholder="请选择用于对应的nfs路径"></Input>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="数据来源">
            <Select v-model="importSetting.account">
              <Option v-for="item in sourceInfo.account" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="数据分类">
            <Select v-model="sourceInfo.category">
              <Option v-for="item in sourceInfo.category" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="子分类(tag)">
            <Select v-model="sourceInfo.category">
              <Option v-for="item in sourceInfo.category" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="24">
        <Col span="12">
          <FormItem label="人脸检测" label-position="right">
            <Select v-model="sourceInfo.category">
              <Option value="item">无</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="视频抽帧">
            <Select v-model="sourceInfo.category">
              <Option value="item">无</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Col span="24">
        <FormItem align="center">
          <Button type="primary">提交</Button>
          <Button style="margin-left: 8px">返回</Button>
        </FormItem>
      </Col>

    </Form>
  </Row>
</template>

<script>
import {getImportSourceInfo} from '@/api/task'

export default {
  name: 'data-import-task',
  components: {},
  data () {
    return {
      sourceInfo: {
        'account': ['pushenglin' ],
        'source': ['fudu', 'subway'],
        'category': {
          'fruit': {
            'apple': 100,
            'peach': 1001
          },
          'subway': {
            'elevator-head': 1000,
            'failover': 10001
          }
        },
        'extract': [
          {
            'title': '按时间间隔',
            'item': 'fix-time'
          }
        ],
        'facedetect': [
          {
            'title': '按时间间隔',
            'item': 'fix-time'
          }
        ]
      },
      importSetting: {
        account: null,
        title: null,
        data_path: null,
        desc: '',
        hasExtract: false,
        hasFaceDetect: false,
        source: {
          source: null,
          category: null,
          subcategory: null
        },
        extract: {
          method: null,
          value: null
        },
        facedetect: {
          method: null,
          confidence: null,
          size: [],
          crop: false
        }
      }
    }
  },
  mounted: function () {
    // getImportSourceInfo().then(res => {
    //   this.sourceInfo = res.data
    // }).catch(err => {
    //   console.log(err)
    // })
  }
}
</script>
