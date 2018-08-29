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
            <Select v-model="importSetting.account" filterable>
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
            <Select v-model="importSetting.source" filterable>
              <Option v-for="item in sourceInfo.source" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="数据分类">
            <Select v-model="importSetting.category" @on-change="onSelectCategory" filterable>
              <Option v-for="item in sourceInfo.category" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="子分类(tag)">
            <Select v-model="importSetting.subcategory" placeholder="先选择分类，才能勾选此项" filterable>
              <Option v-for="item in subcategoryCache" :value="item">{{item}}</Option>
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

      <Row span="24">
        <FormItem align="center">
          <Button type="primary">提交</Button>
          <Button style="margin-left: 8px">返回</Button>
        </FormItem>
      </Row>

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
        subcategoryCache: [],
        sourceInfo: {
          'account': ['pushenglin'],
          'source': ['fudu', 'subway'],
          'subcategory': {
            'fruit': [
              'apple',
              'peach'
            ],
            'subway': [
              'elevator-head',
              'failover'
            ]
          },
          'category': ["fruit", "subway"],
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
          account: '',
          title: '',
          data_path: '',
          desc: '',
          hasExtract: false,
          hasFaceDetect: false,
          source: '',
          category: '',
          subcategory: '',
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
      },
      onSelectCategory: function (category) {
        this.subcategoryCache = category? this.sourceInfo.subcategory[category]:[];
        this.importSetting.subcategory = this.subcategoryCache.length > 0? this.subcategoryCache[0]: '';
        console.info("select cateogry %s, subcategoryCache %s", category, this.subcategoryCache);
      }
    },
    mounted: function () {
      // getImportSourceInfo().then(res => {
      //   this.sourceInfo = res.data
      // }).catch(err => {
      //   console.log(err)
      // })

      // todo: 设置默认勾选值, 要注意在请求到数据后设置
      this.importSetting.source = this.sourceInfo.source[0];
      this.importSetting.category = this.sourceInfo.category[0];

      this.subcategoryCache = this.sourceInfo.subcategory[this.importSetting.category];
      this.importSetting.subcategory = this.sourceInfo.subcategory[this.importSetting.category][0];
    },
  }
</script>
