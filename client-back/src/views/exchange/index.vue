<template>
  <div class="teacher_command">
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
      :data="tableDataFilter"
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
          <el-button type="primary" @click="changeDialogForm(scope.row)">兑换学币</el-button>
          <!-- <el-button type="danger" @click="changeDialogTable(scope.row)">历史记录</el-button> -->
        </template>
      </el-table-column>
    </el-table>

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
          <el-input v-model="coinCount" autocomplete="off" placeholder="（人民币）1:10（学币）"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="recharge()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTeacherList } from "../../api/order";
import { exchange } from "../../api/exchange";

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
    tableDataFilter() {
      const peopleSearch = this.search_teacher; // 这里要定义
      if (peopleSearch) {
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            );
          });
        });
      }
      return this.tableData;
    }
  },
  methods: {
    // changeDialogTable(id) {
    //   this.dialogTableVisible = !this.dialogTableVisible;
    // },
    changeDialogForm(row) {
      this.nowUser = row;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    changePage(page) {
      this.tableLoading = true;
      getTeacherList(page).then(res => {
        this.tableData = res.result;
        this.tableLoading = false;
      });
    },
    recharge() {
      var params = {
        coin: this.coinCount,
        account: this.nowUser.account
      };
      if (params.coin < this.nowUser.coin) {
        exchange(params)
          .then(res => {
            this.$message({
              message: "兑换成功！",
              type: "success"
            });
            this.dialogFormVisible = false;
            this.tableData = [];
            this.changePage(0);
          })
          .catch(err => {
            this.$message({
              message: "兑换失败",
              type: "error"
            });
          });
      } else {
        this.$message({
          message: "余额不足！",
        });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
