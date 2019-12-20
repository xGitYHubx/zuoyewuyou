<template>
  <div>
    <el-row :gutter="6" class="app-container">
      <el-col :span="24">
        <div class="grid-content bg-purple" />
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="辅导地点">
            <el-input v-model="form.location" />
          </el-form-item>
          <el-form-item label="辅导时间">
            <el-col>
              <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="资薪/每小时">
            <el-input v-model="form.cost" suffix-icon="el-icon-coin" />
          </el-form-item>
          <el-form-item label="辅导时长">
            <el-input v-model="form.duration" suffix-icon="el-icon-coin" type="number" />
          </el-form-item>
          <el-form-item class="XelRadio" label="辅导科目">
            <el-radio-group v-model="form.subject">
              <el-radio label="0">语文</el-radio>
              <el-radio label="1">数学</el-radio>
              <el-radio label="2">英语</el-radio>
              <el-radio label="3">物理</el-radio>
              <el-radio label="4">化学</el-radio>
              <el-radio label="5">生物</el-radio>
              <el-radio label="6">政治</el-radio>
              <el-radio label="7">历史</el-radio>
              <el-radio label="8">地理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeDialogForm()">提交</el-button>
            <el-button @click="onCancel">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="12">
        <div class="grid-content  bg-purple">
          <el-input v-model="search_teacher" clearable placeholder="输入老师信息进行搜索" /> </div>
        <el-table v-loading="listLoading" :data="teacherMange" element-loading-text="Loading" highlight-current-row border fit @current-change="handleTeacherCurrentChange">
          <el-table-column align="center" label="选中" width="50">
            <template slot-scope="scope">
              <svg-icon v-if="scope.row.checked==1" icon-class="checked" />
              <!-- {{ scope.row.checked==1?"选中":"" }} -->
            </template>
          </el-table-column>
          <el-table-column align="center" label="名字">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="擅长科目">
            <template slot-scope="scope">
              {{ formatGoodAt(scope.row.goodAt) }}
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" />
        <div class="grid-content  bg-purple">
          <el-input v-model="search_student" clearable placeholder="输入学生信息进行搜索" /> </div>
        <el-table v-loading="listLoading" :data="studentMange" element-loading-text="Loading" border fit highlight-current-row @current-change="handleStudentCurrentChange">
          <el-table-column align="center" label="选中" width="50">
            <template slot-scope="scope">
              <svg-icon v-if="scope.row.checked==1" icon-class="checked" />
              <!-- {{ scope.row.checked==1?"选中":"" }} -->
            </template>
          </el-table-column>
          <el-table-column align="center" label="名字">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="确认订单信息" :visible.sync="dialogFormVisible">
      <div>
        <el-form ref="form" :inline="true" :model="form">
          <el-form-item label="辅导地点">
            <el-input :value="form.location" readonly />
          </el-form-item>
          <el-form-item label="辅导时间">
            <el-date-picker :value="form.startTime" format="yyyy-MM-dd HH:mm:ss" readonly type="datetime" placeholder="选择日期时间" />
          </el-form-item>
          <el-form-item label="资薪/每小时">
            <el-input :value="form.cost" suffix-icon="el-icon-coin" readonly />
          </el-form-item>
          <el-form-item label="辅导时长">
            <el-input :value="form.duration" suffix-icon="el-icon-coin" type="number" readonly />
          </el-form-item>
          <el-form-item class="XelRadio" label="辅导科目">
            <el-radio-group :value="form.subject" readonly>
              <el-radio label="0">语文</el-radio>
              <el-radio label="1">数学</el-radio>
              <el-radio label="2">英语</el-radio>
              <el-radio label="3">物理</el-radio>
              <el-radio label="4">化学</el-radio>
              <el-radio label="5">生物</el-radio>
              <el-radio label="6">政治</el-radio>
              <el-radio label="7">历史</el-radio>
              <el-radio label="8">地理</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStudentList, getTeacherList, submitOrder } from '@/api/order'
import { beautyTime1 } from '@/utils/beauty'

export default {
  name: 'Order',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list_teacher: null,
      list_student: null,
      dialogFormVisible: false,
      subjectArr: [
        '语文',
        '数学',
        '英语',
        '物理',
        '化学',
        '生物',
        '政治',
        '历史',
        '地理'
      ],
      listLoading: false,
      search_teacher: '',
      search_student: '',
      form: {
        initiator: '',
        receiver: '',
        initiatorName: '',
        receiverName: '',
        location: '',
        startTime: '',
        region: '',
        duration: 0,
        cost: 0,
        subject: 0
      }
    }
  },
  computed: {
    // 人员搜索

    teacherMange() {
      const peopleSearch = this.search_teacher
      if (peopleSearch) {
        return this.list_teacher.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            )
          })
        })
      }
      return this.list_teacher
    },
    studentMange() {
      const peopleSearch = this.search_student
      if (peopleSearch) {
        return this.list_student.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            )
          })
        })
      }
      return this.list_student
    }
  },
  created() {
    this.fetchTeacherData()
    this.fetchStudentData()
  },
  methods: {
    fetchTeacherData() {
      this.listLoading = true
      getTeacherList().then(response => {
        this.list_teacher = response.result
        for (let index = 0; index < response.result.length; index++) {
          this.list_teacher[index].checked = 0
        }
        this.listLoading = false
      })
    },
    fetchStudentData() {
      this.listLoading = true
      getStudentList().then(response => {
        this.list_student = response.result
        for (let index = 0; index < response.result.length; index++) {
          this.list_student[index].checked = 0
        }
        this.listLoading = false
      })
    },
    handleTeacherCurrentChange(currentRow, oldCurrentRow) {
      currentRow.checked = 1
      if (oldCurrentRow) {
        oldCurrentRow.checked = 0
      }
      this.form.receiver = currentRow.account
      this.form.receiverName = currentRow.name
    },
    handleStudentCurrentChange(currentRow, oldCurrentRow) {
      currentRow.checked = 1
      if (oldCurrentRow) {
        oldCurrentRow.checked = 0
      }
      this.form.initiator = currentRow.account
      this.form.initiatorName = currentRow.name
    },
    onSubmit() {
      var paramss = this.form
      paramss.startTime = beautyTime1(paramss.startTime)
      paramss.cost = paramss.duration * paramss.cost
      paramss.initiatorAccount = paramss.initiator
      paramss.receiverAccount = paramss.receiver

      console.log(paramss)

      submitOrder(paramss).then(res => {
        this.$message('订单生成！')
        this.onCancel(1)
      })
    },
    onCancel(notLog) {
      this.form = {
        initiator: '',
        receiver: '',
        location: '',
        startTime: '',
        region: '',
        duration: 0,
        cost: 0,
        subject: 0
      }
      if (!notLog) {
        this.$message({
          message: '清空!',
          type: 'warning'
        })
      }
    },
    changeDialogForm(row) {
      // this.nowUser = row
      this.dialogFormVisible = !this.dialogFormVisible
      console.log(this.form)
    },
    formatGoodAt(code) {
      var arr = code.split('-')
      var result = ''
      for (let index = 0; index < arr.length; index++) {
        arr[index] = this.subjectArr[arr[index]]
      }
      result = arr.join('、')
      return result
    }
  }
}
</script>
<style scoped>
.app-container >>> .el-form-item {
  width: 22%;
  float: left;
}
.app-container >>> .XelRadio{
  width: 98%;
}
</style>

