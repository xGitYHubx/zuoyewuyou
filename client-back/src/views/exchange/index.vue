<template>
  <div class="teacher_command">
    <div class="commandContain">
      <div class="command_left">
        <el-input v-model="search_teacher" clearable placeholder="输入老师信息进行搜索" />
      </div>
      <div class="command_right">
        <!-- <el-button type="success" @click="newCommand">新建+</el-button> -->
      </div>
    </div>

    <el-table
      v-loading="tableLoading"

      :data="search_teacher.trim()==''?tableData:searchFilter()"

      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        v-for="(item,index) in showCols"
        :key="index"
        :show-overflow-tooltip="true"
        align="center"
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
      />

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="changeDialogForm(scope.row)">兑换学币</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :current-page="pagination1.page" :total="pagination1.total" @current-change="handleCurrentChange" />
    <!-- Table -->

    <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>-->

    <!-- Form -->

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="兑换的学币数量" :label-width="formLabelWidth">
          <el-input v-model="coinCount" autocomplete="off" placeholder="（人民币）1:10（学币）" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="recharge()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTeacherList, getTeacherListTotal } from '../../api/order'
import { exchange } from '../../api/exchange'
import { searchFilter } from '@/utils/others.js'
import {
  getTeacherListBykeyword
} from '@/api/user.js'

export default {
  name: 'Exchange',
  data() {
    return {
      pagination1: {
        page: 1,
        total: 1
      },
      dialogVisible: false,
      search_teacher: '',
      account: '',
      tableLoading: false,
      coinCount: 0,
      deleteRow: null,
      tableData: [],
      page: 0,
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
      //   gridData: [
      //     {
      //       date: "2016-05-02",
      //       name: "王小虎",
      //       address: "上海市普陀区金沙江路 1518 弄"
      //     },
      //     {
      //       date: "2016-05-04",
      //       name: "王小虎",
      //       address: "上海市普陀区金沙江路 1518 弄"
      //     },
      //     {
      //       date: "2016-05-01",
      //       name: "王小虎",
      //       address: "上海市普陀区金沙江路 1518 弄"
      //     },
      //     {
      //       date: "2016-05-03",
      //       name: "王小虎",
      //       address: "上海市普陀区金沙江路 1518 弄"
      //     }
      //   ],
      dialogTableVisible: false,
      dialogFormVisible: false,
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
  computed: {

  },
  watch: {
    search_teacher(newval) {
      if (newval.trim() != '') {
        getTeacherListBykeyword({ searchKey: newval }).then(res => {
          this.tableData = res.result
          this.pagination1.total = res.result.length
          this.pagination1.page = 0
        })
      } else {
        this.pagination1.page = 0
        this.changePage(0)
        this.fetchTeacherDataCount()
      }
    }
  },
  mounted() {
    this.tableData = []
    this.changePage(0)
    this.fetchTeacherDataCount()
  },
  methods: {

    changeDialogForm(row) {
      this.nowUser = row
      this.dialogFormVisible = !this.dialogFormVisible
    },
    changePage(page) {
      this.tableLoading = true
      getTeacherList({ page: page }).then(res => {
        this.tableData = res.result
        this.tableLoading = false
      })
    },
    fetchTeacherDataCount() {
      getTeacherListTotal({}).then(res => {
        this.pagination1.total = res.result
      })
    },
    handleCurrentChange(val) {
      this.pagination1.page = val
      this.changePage(val)
    },
    recharge() {
      var params = {
        coin: this.coinCount,
        account: this.nowUser.account
      }
      if (params.coin < this.nowUser.coin) {
        exchange(params)
          .then(res => {
            this.dialogFormVisible = false
            this.tableData = []
            this.changePage(0)
          })
      } else {
        this.$message({
          message: '余额不足！'
        })
      }
    },
    searchFilter() {
      return searchFilter(this.search_teacher, this.tableData, this.pagination1)
    }
  }
}
</script>

<style scoped>
.teacher_command {
  padding: 20px;
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
