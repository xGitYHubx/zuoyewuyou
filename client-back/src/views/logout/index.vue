<template>
  <div class="teacher_command">
    <el-row>
      <el-col :span="12">
        <div class="commandContain">
          <div class="command_left">
            <el-input v-model="search_teacher" clearable placeholder="输入老师信息进行搜索"></el-input>
          </div>
          <div class="command_right">
            <!-- <el-button type="success" @click="newCommand">新建+</el-button> -->
          </div>
        </div>

        <el-table v-loading="tableLoading" :data="TtableDataFilter" element-loading-text="Loading" border fit highlight-current-row style="width: 95%">
          <el-table-column :show-overflow-tooltip="true" align="center" v-for="(item,index) in showCols" :key="index" :width="item.width" :prop="item.prop" :label="item.label"></el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="beforelogout(scope.row)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange"   :current-page='pagination1.page' :total="pagination1.total">
        </el-pagination>
      </el-col>

      <el-col :span="12">
        <div class="commandContain">
          <div class="command_left">
            <el-input v-model="search_student" clearable placeholder="输入学生信息进行搜索"></el-input>
          </div>
          <div class="command_right">
            <!-- <el-button type="success" @click="newCommand">新建+</el-button> -->
          </div>
        </div>

        <el-table v-loading="tableLoading" :data="StableDataFilter" element-loading-text="Loading" border fit highlight-current-row style="width: 95%">
          <el-table-column :show-overflow-tooltip="true" align="center" v-for="(item,index) in showCols" :key="index" :width="item.width" :prop="item.prop" :label="item.label"></el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="beforelogout(scope.row)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange2" :current-page='pagination2.page' :total="pagination2.total">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="兑换的学币数量" :label-width="formLabelWidth">
          <el-input v-model="coinCount" autocomplete="off" placeholder="（人民币）1:10（学币）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="recharge()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确定要注销该账号吗？" class="determine" :visible.sync='Determine' width="30%">
      <!-- <span>确定要注销该账号吗？</span> -->
      <p class="isLogout">账号：{{isLogoutAccount}}</p>
      <p class="isLogout">名字：{{isLogoutName}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Determine = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { getTeacherList, getStudentList } from "../../api/order";
import { logout } from "../../api/register";

export default {
  name: "exchange",
  data() {
    return {
      pagination1: {
        page: 1,
        total: 1
      },
      pagination2: {
        page: 1,
        total: 1
      },
      isLogoutAccount: null,
      isLogoutName: null,
      dialogVisible: false,
      search_teacher: "",
      account: "",
      tableLoading: false,
      coinCount: 0,
      deleteRow: null,
      tableData: [],
      TtableData: [],
      allTtableData: [],
      StableData: [],
      allStableData: [],

      page: 0,
      showCols: [
        {
          prop: "name",
          label: "名字"
        },
        {
          prop: "account",
          label: "手机号"
        },
        {
          prop: "coin",
          label: "学币余额"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      search_student: null,
      Determine: false,
      nowUser: {}, //当前选中的user
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    TtableDataFilter() {
      const peopleSearch = this.search_teacher; // 这里要定义
      // var page = this.pagination1.page;
      if (peopleSearch) {
        this.pagination1.page=1;
        let filter = this.TtableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            );
          });
        })
        this.pagination1.total=filter.length;
        console.log(this.pagination1.total)
        return filter.slice(
        (this.pagination1.page - 1) * 10,
        this.pagination1.page * 10
      );
      }
      this.pagination1.total=this.TtableData.length;
      return this.TtableData.slice(
        (this.pagination1.page - 1) * 10,
        this.pagination1.page * 10
      );
    },
    StableDataFilter() {
      const peopleSearch = this.search_student; // 这里要定义
      if (peopleSearch) {
        this.pagination2.page=1;
        let filter= this.StableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            );
          });
        })
        this.pagination2.total=filter.length;
        return filter.slice(
        (this.pagination2.page - 1) * 10,
        this.pagination2.page * 10
      );
      }
      this.pagination2.total=this.StableData.length;
      return this.StableData.slice(
        (this.pagination2.page - 1) * 10,
        this.pagination2.page * 10
      );
    }
  },
  methods: {
    changeDialogForm(row) {
      this.nowUser = row;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    changePage(page) {
      this.tableLoading = true;
      this.getTeacherList(page);
      this.getStudentList(page);
    },
    getTeacherList(page) {
      getTeacherList(page).then(res => {
        console.log(res);
        this.pagination1.total = res.result.length;
        this.TtableData = res.result;
        this.tableLoading = false;
      });
    },
    getStudentList(page) {
      getStudentList(page).then(res => {
        this.pagination2.total = res.result.length;
        this.StableData = res.result;
        this.tableLoading = false;
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination1.page = val;
      // this.getList();
    },
    handleCurrentChange2(val) {
      // console.log(`当前页: ${val}`);
      this.pagination2.page = val;
    },

    // setTeacherList(page){

    // },
    // setStudentList(page){

    // },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    beforelogout(row) {
      this.isLogoutAccount = row.account;
      this.isLogoutName = row.name;
      this.Determine = true;
    },
    logout() {
      this.Determine = false;
      var params = {
        account: this.isLogoutAccount
      };
      logout(params).then(res => {
        this.$message({
          message: "注销成功",
          type: "success"
        });
        this.tableData = [];
        this.changePage(0);
      });
    }
  },
  mounted() {
    this.tableData = [];
    this.changePage(0);
  },
  watch: {
    pagination2(newval) {
      console.log(this.pagination2.page);
    }
  }
};
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
