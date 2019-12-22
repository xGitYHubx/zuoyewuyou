/* eslint-disable vue/no-side-effects-in-computed-properties */
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
              <el-date-picker
                v-model="form.startTime"
                is-range="true"
                :picker-options="pickerOptions"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%;"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="资薪/每小时">
            <el-input v-model="form.cost" suffix-icon="el-icon-coin" />
          </el-form-item>
          <el-form-item label="辅导时长">
            <el-input
              v-model="form.duration"
              suffix-icon="el-icon-coin"
              type="number"
            />
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
            <el-button
              type="primary"
              @click="changeDialogForm()"
            >提交</el-button>
            <el-button @click="onCancel">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="12">
        <div class="grid-content  bg-purple">
          <el-input
            v-model="search_teacher"
            clearable
            placeholder="输入手机号或名字进行搜索"
          />
        </div>
        <el-table
          v-loading="listLoading"
          :data="search_teacher.trim()==''?list_teacher:teacherMange()"
          element-loading-text="Loading"
          align="center"
          highlight-current-row
          border
          fit
          @current-change="handleTeacherCurrentChange"
        >
          <el-table-column align="center" label="选中" width="50">
            <template slot-scope="scope">
              <svg-icon v-if="scope.row.checked == 1" icon-class="checked" />
              <!-- {{ scope.row.checked==1?"选中":"" }} -->
            </template>
          </el-table-column>
          <el-table-column align="center" label="名字">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="擅长科目">
            <template slot-scope="scope">
              {{ formatGoodAt(scope.row.goodAt) }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="pagination1.page"
          :total="pagination1.total"
          @current-change="handleCurrentChange"
        />
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" />
        <div class="grid-content  bg-purple">
          <el-input
            v-model="search_student"
            clearable
            placeholder="输入学生信息进行搜索"
          />
        </div>
        <el-table
          v-loading="listLoading"
          :data="search_student.trim()==''?list_student:studentMange()"
          element-loading-text="Loading"
          align="center"
          border
          fit
          highlight-current-row
          @current-change="handleStudentCurrentChange"
        >
          <el-table-column align="center" label="选中" width="50">
            <template slot-scope="scope">
              <svg-icon v-if="scope.row.checked == 1" icon-class="checked" />
              <!-- {{ scope.row.checked==1?"选中":"" }} -->
            </template>
          </el-table-column>
          <el-table-column align="center" label="名字">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="pagination2.page"
          :total="pagination2.total"
          @current-change="handleCurrentChange2"
        />
      </el-col>
    </el-row>

    <el-dialog title="确认订单信息" :visible.sync="dialogFormVisible">
      <div>
        <el-form ref="form" :inline="true" :model="form">
          <el-form-item label="辅导地点">
            <el-input :value="form.location" readonly />
          </el-form-item>
          <el-form-item label="辅导时间">
            <el-date-picker
              :value="form.startTime"
              format="yyyy-MM-dd HH:mm:ss"
              readonly
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
          <el-form-item label="资薪/每小时">
            <el-input :value="form.cost" suffix-icon="el-icon-coin" readonly />
          </el-form-item>
          <el-form-item label="辅导时长">
            <el-input
              :value="form.duration"
              suffix-icon="el-icon-coin"
              type="number"
              readonly
            />
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
import {
  getStudentList,
  getTeacherList,
  submitOrder,
  getTeacherListTotal,
  getStudentListTotal
} from '@/api/order'
import { beautyTime1 } from '@/utils/beauty'
import { searchFilter } from '@/utils/others.js'
import {
  getTeacherListBykeyword,
  getStudentListBykeyword
} from '@/api/user.js'

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
      tableRange: {},
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time)
        }
      }, // 日期设置对象,
      pagination1: {
        page: 0,
        total: 1
      },
      pagination2: {
        page: 0,
        total: 1
      },
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
  computed: {},
  watch: {
    search_teacher(newval) {
      if (newval.trim() != '') {
        getTeacherListBykeyword({ searchKey: newval }).then(res => {
          this.list_teacher = res.result
          this.pagination1.total = res.result.length
          this.pagination1.page = 0
        })
      } else {
        this.pagination1.page = 0
        this.fetchTeacherData()
        this.fetchTeacherDataCount()
      }
    },
    search_student(newval) {
      if (newval.trim() != '') {
        getStudentListBykeyword({ searchKey: newval }).then(res => {
          this.list_student = res.result
          this.pagination2.total = res.result.length
          this.pagination2.page = 0
        })
      } else {
        this.pagination2.page = 0
        this.fetchStudentData()
        this.fetchStudentDataCount()
      }
    }
  },
  created() {
    this.fetchTeacherData()
    this.fetchStudentData()
    this.fetchStudentDataCount()
    this.fetchTeacherDataCount()
  },
  methods: {
    dealDisabledDate(time) {
      const curDate = new Date().getTime()
      const day = 30 * 24 * 3600 * 1000
      return (
        time.getTime() < Date.now() - 8.64e7 || time.getTime() > day + curDate
      )
    },
    getStartData() {
      const date = new Date()
      this.tableRange.start = date.format('yyyy-MM-dd HH:mm:ss')
      date.setMonth(date.getMonth() + 1)
      this.tableRange.end = date.format('yyyy-MM-dd HH:mm:ss')
    },
    handleCurrentChange(val) {
      this.pagination1.page = val
      this.fetchTeacherData()
    },
    handleCurrentChange2(val) {
      this.pagination2.page = val
      this.fetchStudentData()
    },
    fetchTeacherDataCount() {
      this.listLoading = true
      getTeacherListTotal({}).then(res => {
        this.pagination1.total = res.result
      })
    },
    fetchTeacherData() {
      this.listLoading = true
      getTeacherList({ page: this.pagination1.page }).then(response => {
        this.list_teacher = response.result
        for (let index = 0; index < response.result.length; index++) {
          this.list_teacher[index].checked = 0
        }
        this.listLoading = false
      })
    },
    fetchStudentData() {
      this.listLoading = true
      getStudentList({ page: this.pagination2.page }).then(response => {
        this.list_student = response.result
        for (let index = 0; index < response.result.length; index++) {
          this.list_student[index].checked = 0
        }
        this.listLoading = false
      })
    },
    fetchStudentDataCount() {
      this.listLoading = true
      getStudentListTotal({}).then(res => {
        this.pagination2.total = res.result
      })
    },
    handleTeacherCurrentChange(currentRow, oldCurrentRow) {
      if (currentRow) {
        currentRow.checked = 1
        if (oldCurrentRow) {
          oldCurrentRow.checked = 0
        }
        this.form.receiver = currentRow.account
        this.form.receiverName = currentRow.name
      }
    },
    handleStudentCurrentChange(currentRow, oldCurrentRow) {
      if (currentRow) {
        currentRow.checked = 1
        if (oldCurrentRow) {
          oldCurrentRow.checked = 0
        }
        this.form.initiator = currentRow.account
        this.form.initiatorName = currentRow.name
      }
    },
    onSubmit() {
      var paramss = JSON.parse(JSON.stringify(this.form))
      if (
        paramss.startTime != null &&
        paramss.cost != null &&
        paramss.initiator != null &&
        paramss.receiver != null
      ) {
        paramss.startTime = beautyTime1(paramss.startTime)
        paramss.cost = paramss.duration * paramss.cost
        paramss.initiatorAccount = paramss.initiator
        paramss.receiverAccount = paramss.receiver
        submitOrder(paramss)
          .then(res => {
            this.onCancel(1)
            this.dialogFormVisible = false
          })
          .then(_ => {
            this.onCancel(true)
            this.dialogFormVisible = false
          })
      } else {
        this.$message('请检查信息是否完整')
      }
    },
    teacherMange() {
      return searchFilter(
        this.search_teacher,
        this.list_teacher,
        this.pagination1
      )
    },
    studentMange() {
      return searchFilter(
        this.search_student,
        this.list_student,
        this.pagination2
      )
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
      // this.teacherMange.forEach(element => {
      //   element.checked = 0
      // })
      // this.studentMange.forEach(element => {
      //   element.checked = 0
      // })
      this.fetchTeacherData()
      this.fetchStudentData()
      if (!notLog) {
        this.$message({
          message: '清空!',
          type: 'warning'
        })
      }
    },
    changeDialogForm(row) {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    formatGoodAt(code) {
      if (code != null) {
        var arr = code.split('-')
        var result = ''
        for (let index = 0; index < arr.length; index++) {
          arr[index] = this.subjectArr[arr[index]]
        }
        result = arr.join('、')
        return result
      } else {
        return ''
      }
    }
  }
}
</script>
<style scoped>
.app-container >>> .el-form-item {
  width: 22%;
  float: left;
}
.app-container >>> .XelRadio {
  width: 98%;
}
.el-pagination {
  margin-top: 20px;
  margin-left: 40px;
}
</style>
