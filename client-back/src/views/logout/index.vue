<template>
  <div class="teacher_command">
    <el-row>
      <el-col :span="12">
        <div class="commandContain">
          <div class="command_left">
            <el-input
              v-model="search_teacher"
              clearable
              placeholder="输入手机号或姓名进行搜索"
            />
          </div>
          <div class="command_right">
            <!-- <el-button type="success" @click="newCommand">新建+</el-button> -->
          </div>
        </div>

        <el-table
          v-loading="tableLoading"
          :data="search_teacher.trim()==''?TtableData:TtableDataFilter()"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 95%"
        >
          <el-table-column
            v-for="(item, index) in showCols"
            :key="index"
            :show-overflow-tooltip="true"
            align="center"
            :width="item.width"
            :prop="item.prop"
            :label="item.label"
          />

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="beforelogout(scope.row)"
              >注销</el-button>
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
        <div class="commandContain">
          <div class="command_left">
            <el-input
              v-model="search_student"
              clearable
              placeholder="输入学生信息进行搜索"
            />
          </div>
          <div class="command_right">
            <!-- <el-button type="success" @click="newCommand">新建+</el-button> -->
          </div>
        </div>

        <el-table
          v-loading="tableLoading"
          :data="search_student.trim()==''?StableData:StableDataFilter()"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 95%"
        >
          <el-table-column
            v-for="(item, index) in showCols"
            :key="index"
            :show-overflow-tooltip="true"
            align="center"
            :width="item.width"
            :prop="item.prop"
            :label="item.label"
          />

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="beforelogout(scope.row)"
              >注销</el-button>
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

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="兑换的学币数量" :label-width="formLabelWidth">
          <el-input
            v-model="coinCount"
            autocomplete="off"
            placeholder="（人民币）1:10（学币）"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="recharge()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="确定要注销该账号吗？"
      class="determine"
      :visible.sync="Determine"
      width="30%"
    >
      <!-- <span>确定要注销该账号吗？</span> -->
      <p class="isLogout">账号：{{ isLogoutAccount }}</p>
      <p class="isLogout">名字：{{ isLogoutName }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Determine = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTeacherList,
  getStudentList,
  getTeacherListTotal,
  getStudentListTotal
} from '../../api/order'
import { logout } from '../../api/register'
import { searchFilter } from '@/utils/others.js'
import {
  getTeacherListBykeyword,
  getStudentListBykeyword
} from '@/api/user.js'

export default {
  name: 'Exchange',
  data() {
    return {
      pagination1: {
        page: 0,
        total: 1
      },
      pagination2: {
        page: 0,
        total: 1
      },
      isLogoutAccount: null,
      isLogoutName: null,
      dialogVisible: false,
      search_teacher: '',
      tableLoading: false,
      coinCount: 0,
      TtableData: [],
      StableData: [],
      showCols: [
        {
          prop: 'name',
          label: '名字'
        },
        {
          prop: 'account',
          label: '手机号'
        },
        {
          prop: 'coin',
          label: '学币余额'
        }
      ],
      dialogFormVisible: false,
      search_student: '',
      Determine: false,
      nowUser: {}, // 当前选中的user
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
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
        this.getTeacherList()
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
        this.getStudentList()
        this.fetchStudentDataCount()
      }
    }
  },
  mounted() {
    this.changePage(0)
  },
  methods: {
    changeDialogForm(row) {
      this.nowUser = row
      this.dialogFormVisible = !this.dialogFormVisible
    },
    changePage(page) {
      this.tableLoading = true
      this.getTeacherList()
      this.getStudentList()
      this.fetchTeacherDataCount()
      this.fetchStudentDataCount()
    },
    getTeacherList() {
      this.tableLoading = true
      getTeacherList({ page: this.pagination1.page }).then(res => {
        this.TtableData = res.result
        this.tableLoading = false
      })
    },
    fetchTeacherDataCount() {
      this.tableLoading = true
      getTeacherListTotal({}).then(res => {
        this.pagination1.total = res.result
      })
    },
    getStudentList() {
      this.tableLoading = true
      getStudentList({ page: this.pagination2.page }).then(res => {
        this.StableData = res.result
        this.tableLoading = false
      })
    },
    fetchStudentDataCount() {
      this.listLoading = true
      getStudentListTotal({}).then(res => {
        this.pagination2.total = res.result
      })
    },
    handleCurrentChange(val) {
      this.pagination1.page = val
      this.getTeacherList()
    },
    handleCurrentChange2(val) {
      this.pagination2.page = val
      this.getStudentList()
    },
    StableDataFilter() {
      return searchFilter(
        this.search_student,
        this.StableData,
        this.pagination2
      )
    },
    TtableDataFilter() {
      return searchFilter(
        this.search_teacher,
        this.TtableData,
        this.pagination1
      )
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    beforelogout(row) {
      this.isLogoutAccount = row.account
      this.isLogoutName = row.name
      this.Determine = true
    },
    logout() {
      this.Determine = false
      var params = {
        account: this.isLogoutAccount
      }
      logout(params).then(res => {
        this.$message({
          message: '注销成功',
          type: 'success'
        })
        this.changePage(0)
      })
    }
  }
}
</script>

<style scoped>
.teacher_command {
  padding: 20px;
}

.isLogout {
  padding-left: 80px;
  font-size: 1.3em;
}
.determine >>> .el-dialog__body {
  padding: 10px 20px;
}
.commandContain {
  width: 100%;
  margin: 15px auto;
  overflow: hidden;
}
.command_left {
  width: 80%;
  padding-left: 2%;
  float: left;
}
.command_right {
  /* width: 10%; */
  margin-left: 5%;
  float: left;
}
.preview_img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.el-pagination {
  margin-top: 20px;
  margin-left: 40px;
}
</style>
