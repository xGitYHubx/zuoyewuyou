<template>
  <div>
    <el-row :gutter="20">

      <el-col :span="16">
        <el-input class="XYtitle" v-model="title" placeholder="输入标题"></el-input>

        <el-upload class="imgUpload" name="file" :limit="limit" :on-progress="onProgress" :on-error="onError" :file-list="fileList" :on-success="onUploadAvatarSuccess" :before-upload="beforeUploadAvatar" :action="Url" :data="avatarExdata" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <editor v-model="Value" class="editor" :url="Url" @on-ready="onEditorReady" @on-destroy="onEditorDestroy" @on-upload-success="onEditorUploadComplete" @on-upload-fail="onEditorUploadFail" />
      </el-col>
      <el-col :span="3" class="editor">
        <el-button type="button" @click="save">保存</el-button>
        <el-button type="danger" @click="back">返回</el-button>
      </el-col>
    </el-row>
    <el-dialog title="保存失败" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>请检查信息是否输入完整</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import editor from "@/components/tinymce/tinymce.vue";
import { updataAboutUs, getAboutUs } from "@/api/aboutUs";
import { editTeacherCommand } from "../../api/teacherCommand";
import { constants } from 'fs';

export default {
  name: "editcmd",
  components: { editor },
  data() {
    return {
      Url: "http://47.93.22.56:8082/file/upload",
      Value: "",
      avatarUrl: "",
      limit: 1,
      avatarExdata: {
        fileName: "recommand/" + new Date().getTime(),
        fileType: "jpg"
      },
      title: null,
      dialogVisible: false,
      fileList:[],
    };
  },
  mounted() {
      console.log(this.$route)
      this.recmdId=this.$route.query.recmdId
      this.title=this.$route.query.title
      this.Value=this.$route.query.content
      this.fileList=[{
          name:'file',
          url:this.$route.query.sketch
      }]
      this.avatarUrl=this.$route.query.sketch
      

  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    save() {
      if (this.title != null && this.Value != null && this.avatarUrl != null) {
        let data = {
          title: this.title,
          content: this.Value,
          sketch: this.avatarUrl,
          recmdId:this.recmdId
        };
        console.log(data);
        
        editTeacherCommand(data).then(res => {
          console.log(res);
          if(res.success){
            this.$router.push('/tchCommand/tchcmd')
          }
          
        });
      } else {
        console.log(this.title )
        console.log(this.Value)
        console.log(this.avatarUrl)
        this.dialogVisible=true
      }
    },
    back(){
      this.$router.push('/tchCommand/tchcmd')
    },
    handlePictureCardPreview(res) {
      // console.log(res);
    },
    handleRemove(res) {
      this.avatarUrl = "";
    },
    onEditorReady(res) {},
    onEditorDestroy(res) {},
    onEditorUploadComplete(res) {},
    onEditorUploadFail(res) {},
    onError(res) {
      this.$message("上传失败");
    },
    onUploadAvatarSuccess(res) {
      this.avatarUrl = res.result;
    },
    onProgress(event, file, fileList) {
    },
    beforeUploadAvatar(file) {
      this.avatarExdata.fileType = file.type.split("/")[1];
    }
  }
};
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
