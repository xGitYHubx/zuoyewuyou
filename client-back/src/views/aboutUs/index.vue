<template>
  <div class="box">
    <el-row style="" :gutter="20">
<el-button type="primary" class="refreshBtn" @click="Refresh">刷新</el-button>
      <el-col :span="16">
        <p>编辑</p>
        <editor
          v-model="Value"
          class="editor"
          :url="Url"
          @on-ready="onEditorReady"
          @on-destroy="onEditorDestroy"
          @on-upload-success="onEditorUploadComplete"
          @on-upload-fail="onEditorUploadFail"
        />

        <el-button type="button" class="" @click="save">保存</el-button>

      </el-col>
      <el-col :span="8">
        <p>预览</p>
        <div class="preview" name="" id="" v-html="Value"></div>
      </el-col>
      <el-col
        :span="3"
        class="editor"
      >

      </el-col>
    </el-row>

  </div>
</template>

<script>
import editor from '@/components/tinymce/tinymce.vue'
import { updataAboutUs, getAboutUs } from '@/api/aboutUs'

export default {
  name: 'AboutUS',
  components: { editor },
  data() {
    return {
      Url: 'http://47.93.22.56:8082/file/upload',
      Value: ''
    }
  },
  mounted() {
    this.getAbout()
  },
  methods: {
    onEditorReady(res) {
      console.log(res)
    }, onEditorDestroy(res) {
    }, 
    onEditorUploadComplete(res) {
      console.log(res)
    }, onEditorUploadFail(res) {
    },
    Refresh(){
      // this.getAbout();
      location.reload();
    },
    getAbout() {
      getAboutUs().then(res => {
        console.log('111')
        console.log(res)
        this.Value = res.result
        // this.Value=JSON.parse(JSON.stringify(this.Value))
      })
    },
    save() {
      updataAboutUs({ aboutUs: this.Value }).then(res => {
        this.$message('保存成功')
      })
    }
  }
}
</script>

<style scoped>
.editor{
  /* padding: 40px; */
}

.box{
  padding: 20px;

}

.preview{
  width: 100%;
  height: 700px;
  border-radius: 10px;
  border: 1px solid gray;
  padding:5px 20px;

}
.preview img{
  max-width: 100%;
}
.refreshBtn{
  left:60%;
  position: absolute;
}
</style>
