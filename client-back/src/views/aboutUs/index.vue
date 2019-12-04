<template>
  <div>
    <el-row :gutter="20">

      <el-col :span="16">
        <editor
          v-model="Value"
          class="editor"
          :url="Url"
          @on-ready="onEditorReady"
          @on-destroy="onEditorDestroy"
          @on-upload-success="onEditorUploadComplete"
          @on-upload-fail="onEditorUploadFail"
        />
      </el-col>
      <el-col
        :span="3"
        class="editor"
      >
        <el-button type="button" @click="save">保存</el-button>

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
    }, onEditorDestroy(res) {
    }, 
    onEditorUploadComplete(res) {
    }, onEditorUploadFail(res) {
    },
    getAbout() {
      getAboutUs().then(res => {
        this.Value = res.result
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

<style>
.editor{
  padding: 40px;
}
</style>
