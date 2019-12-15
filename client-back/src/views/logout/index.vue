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

        <el-table
          v-loading="tableLoading"
          :data="TtableDataFilter"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            :show-overflow-tooltip="true"
            align="center"
            v-for="(item,index) in showCols"
            :key="index"
            :width="item.width"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="logout(scope.row)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="12">
        <div class="commandContain">
          <div class="command_left">
            <el-input v-model="search_teacher" clearable placeholder="输入老师信息进行搜索"></el-input>
          </div>
          <div class="command_right">
            <!-- <el-button type="success" @click="newCommand">新建+</el-button> -->
          </div>
        </div>

        <el-table
          v-loading="tableLoading"
          :data="StableDataFilter"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            :show-overflow-tooltip="true"
            align="center"
            v-for="(item,index) in showCols"
            :key="index"
            :width="item.width"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="logout(scope.row)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  </div>
</template>

<script>
import { getTeacherList, getStudentList } from "../../api/order";
import { logout } from "../../api/register";

export default {
  name: "exchange",
  data() {
    return {
      dialogVisible: false,
      search_teacher: "",
      account: "",
      tableLoading: false,
      coinCount: 0,
      deleteRow: null,
      tableData: [],
      TtableData: [],
      StableData: [],
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
      if (peopleSearch) {
        return this.TtableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            );
          });
        });
      }
      return this.TtableData;
    },
    StableDataFilter() {
      const peopleSearch = this.search_teacher; // 这里要定义
      if (peopleSearch) {
        return this.StableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            );
          });
        });
      }
      return this.StableData;
    }
  },
  methods: {
    changeDialogForm(row) {
      this.nowUser = row;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    changePage(page) {
      this.tableLoading = true;

      getTeacherList(page).then(res => {
        this.TtableData = res.result;
        this.tableLoading = false;
      });

      getStudentList(page).then(res => {
        this.StableData = res.result;
        this.tableLoading = false;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    logout(row) {
      var params = {
        account: row.account
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
  }
};
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
</style>
