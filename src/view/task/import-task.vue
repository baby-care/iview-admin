<template>
  <Row :gutter="10">
    {{this.sourceInfo}}
  </Row>
</template>

<script>
import {getImportSourceInfo} from '@/api/task'

export default {
  name: 'data-import-task',
  components: {
  },
  data () {
    return {
      sourceInfo: {}
    }
  },
  mounted: function () {
    getImportSourceInfo().then(res => {
      this.sourceInfo = res.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
