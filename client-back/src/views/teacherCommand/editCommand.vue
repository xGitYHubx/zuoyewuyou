<template>
  <div>
    <el-row :gutter="20">

      <el-col :span="14">
        <el-input v-model="title" class="XYtitle" placeholder="输入标题" />

        <el-upload
          class="imgUpload"
          name="file"
          :limit="limit"
          :on-progress="onProgress"
          :on-error="onError"
          :file-list="fileList"
          :on-success="onUploadAvatarSuccess"
          :before-upload="beforeUploadAvatar"
          :action="Url"
          :data="avatarExdata"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <editor v-model="Value" class="editor" :url="Url" @on-ready="onEditorReady" @on-destroy="onEditorDestroy" @on-upload-success="onEditorUploadComplete" @on-upload-fail="onEditorUploadFail" />

        <el-button style="margin-left:50px;margin-bottom:40px;" type="primary" @click="save">保存</el-button>
        <el-button type="danger" @click="back">返回</el-button>
      </el-col>

      <el-col :span="8">
        <p>预览</p>
        <div id="" class="preview" name="" v-html="Value" />
      </el-col>
    </el-row>
    <el-dialog
      title="保存失败"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>请检查信息是否输入完整</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import editor from '@/components/tinymce/tinymce.vue'
// import { updataAboutUs, getAboutUs } from '@/api/aboutUs'
import { editTeacherCommand } from '../../api/teacherCommand'

export default {
  name: 'Editcmd',
  components: { editor },
  data() {
    return {
      Url: '/file/upload',
      Value: '',
      avatarUrl: '',
      limit: 1,
      avatarExdata: {
        fileName: 'recommand/' + new Date().getTime(),
        fileType: 'jpg'
      },
      title: null,
      dialogVisible: false,
      fileList: []
    }
  },
  mounted() {
    console.log(this.$route)
    this.recmdId = this.$route.query.recmdId
    this.title = this.$route.query.title
    this.Value = this.$route.query.content
    this.fileList = [
      {
        name: 'file',
        url: this.$route.query.sketch
      }
    ]
    this.avatarUrl = this.$route.query.sketch
  },
  methods: {
    save() {
      if (this.title != null && this.Value != null && this.avatarUrl != null) {
        const data = {
          title: this.title,
          content: this.Value,
          sketch: this.avatarUrl,
          recmdId: this.recmdId
        }

        editTeacherCommand(data).then(res => {
          if (res.success) {
            this.$router.push('/tchCommand/tchcmd')
          }
        })
      } else {
        this.dialogVisible = true
      }
    },
    back() {
      this.$router.push('/tchCommand/tchcmd')
    },
    handlePictureCardPreview(res) {
    },
    handleRemove(res) {
      this.avatarUrl = ''
    },
    onEditorReady(res) {},
    onEditorDestroy(res) {},
    onEditorUploadComplete(res) {},
    onEditorUploadFail(res) {},
    onError(res) {
      this.$message('上传失败')
    },
    onUploadAvatarSuccess(res) {
      this.avatarUrl = res.result
    },
    onProgress(event, file, fileList) {},
    beforeUploadAvatar(file) {
      this.avatarExdata.fileType = file.type.split('/')[1]
    }
  }
}
</script>

<style>
.editor {
  padding: 40px;
  padding-top: 20px;
}
.XYtitle {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
}
.imgUpload {
  padding-left: 40px;
  padding-top: 20px;
}
</style>
