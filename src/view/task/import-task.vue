<template>
  <Card>
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
            <Select v-model="importSetting.category">
              <Option v-for="(_, item) in sourceInfo.category" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="子分类(tag)">
            <Select v-model="importSetting.subcategory">
              <Option v-for="(_, item) in sourceInfo.subcategory" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="12">
        <Col span="12">
          <FormItem label="视频抽帧" label-position="right">
            <Select v-model="importSetting.extract.method" @on-change="onSelectExtract()">
              <Option v-for="(item, _) in sourceInfo.extract" :value="item.value">{{item.title}}</Option>
            </Select>
          </FormItem>

          <Col v-if="importSetting.hasExtract">
            <FormItem label="抽帧间隔">
              <Input v-model="importSetting.extract.value" placeholder="设置抽帧时间间隔，单位毫秒"></Input>
            </FormItem>
          </Col>
        </Col>
        <Col span="12">
          <FormItem label="人脸检测">
            <Select v-model="importSetting.facedetect.method" @on-change="onSelectFaceDet()">
              <Option v-for="(item, _) in sourceInfo.facedetect" :value="item.value">{{item.title}}</Option>
            </Select>
          </FormItem>

          <Col v-if="importSetting.hasFaceDetect">
            <FormItem label="置信度">
              <InputNumber :max="1" :min="0.1" :step="0.01" size="large" v-model="importSetting.facedetect.confidence"
                           placeholder="人脸检测置信度" style="width:100%"></InputNumber>
            </FormItem>

            <FormItem label="人脸尺寸">
              <Row>
                <Col span="11" style="text-align: left">
                  <InputNumber :min="100" :step="1" placeholder="高度" v-model="importSetting.facedetect.size.height"
                               style="width:100%"></InputNumber>
                </Col>
                <Col span="2" style="text-align: center">--</Col>
                <Col span="11" style="text-align: left">
                  <InputNumber :min="100" :step="1" placeholder="宽度" v-model="importSetting.facedetect.size.width"
                               style="width:100%"></InputNumber>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Checkbox v-model="importSetting.facedetect.crop">是否进行人脸抠图</Checkbox>
            </FormItem>
          </Col>
        </Col>
      </Row>

      <Col span="24">
        <FormItem align="center">
          <Button type="primary">提交</Button>
          <Button style="margin-left: 8px">返回</Button>
        </FormItem>
      </Col>

    </Form>
  </Card>
</template>

<script>
  import {getImportSourceInfo} from '@/api/task'
  import CollapsedMenu from "../main/components/side-menu/collapsed-menu";

  export default {
    name: 'data-import-task',
    components: {CollapsedMenu},
    data() {
      return {
        sourceInfo: {
          'account': ['pushenglin'],
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
              'title': '无',
              'value': 0
            },
            {
              'title': '按时间间隔',
              'value': 'fix-time'
            }
          ],
          'facedetect': [
            {
              'title': '无',
              'value': 0
            },
            {
              'title': 'SSD',
              'value': 'ssd'
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
            method: 0,
            value: 1000
          },
          facedetect: {
            method: 0,
            confidence: 0.99,
            size: {
              height: 1,
              width: 1
            },
            crop: false
          }
        }
      }
    },
    methods: {
      onSelectFaceDet: function () {
        this.importSetting.hasFaceDetect = !!this.importSetting.facedetect.method;
      },
      onSelectExtract: function () {
        this.importSetting.hasExtract = !!this.importSetting.extract.method;
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
