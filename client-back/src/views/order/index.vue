<template>
  <div class="app-container">
    <el-row :gutter="6">
      <el-col :span="24">
        <div class="grid-content bg-purple" />
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="辅导地点">
            <el-input v-model="form.location" />
          </el-form-item>
          <el-form-item label="辅导时间">
            <el-col>
              <el-date-picker v-model="form.startTime" is-range="true" :picker-options="pickerOptions" type="datetime" placeholder="选择日期时间" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="资薪/每小时">
            <el-input v-model="form.cost" suffix-icon="el-icon-coin" />
          </el-form-item>
          <el-form-item label="每次辅导时长">
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
          <!-- <el-form-item label="Activity form">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onCancel">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="12">
        <div class="grid-content  bg-purple">
          <el-input v-model="search_teacher" clearable placeholder="输入老师信息进行搜索" /> </div>
        <el-table v-loading="listLoading" :data="teacherMange" element-loading-text="Loading" align='center' highlight-current-row border fit @current-change="handleTeacherCurrentChange">
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
          <el-table-column align='center' label="擅长科目">
            <template slot-scope="scope">
              {{ formatGoodAt(scope.row.goodAt) }}
            </template>
          </el-table-column>
          <el-table-column align='center' label="手机号">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :current-page='pagination1.page' :total="pagination1.total">
        </el-pagination>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" />
        <div class="grid-content  bg-purple">
          <el-input v-model="search_student" clearable placeholder="输入学生信息进行搜索" /> </div>
        <el-table v-loading="listLoading" :data="studentMange" element-loading-text="Loading" align='center' border fit highlight-current-row @current-change="handleStudentCurrentChange">
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
          <el-table-column align='center' label="手机号">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange2" :current-page='pagination2.page' :total="pagination2.total">
        </el-pagination>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { getStudentList, getTeacherList, submitOrder } from "@/api/order";
import { beautyTime1 } from "@/utils/beauty";

export default {
  name: "Order",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableRange: {},
      pickerOptions: {
        // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
        disabledDate: (time) => {
          // 如果函数处理比较简单,可以直接在这里写逻辑方法
          // return time.getTime() < Date.now() - 8.64e7

          // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
          return this.dealDisabledDate(time)
        }
      }, // 日期设置对象,
      pagination1: {
        page: 1,
        total: 1
      },
      pagination2: {
        page: 1,
        total: 1
      },
      list_teacher: null,
      list_student: null,
      subjectArr: [
        "语文",
        "数学",
        "英语",
        "物理",
        "化学",
        "生物",
        "政治",
        "历史",
        "地理"
      ],
      listLoading: false,
      search_teacher: "",
      search_student: "",
      form: {
        initiator: "",
        receiver: "",
        initiatorName: "",
        receiverName: "",
        location: "",
        startTime: "",
        region: "",
        duration: 0,
        cost: 0,
        subject: 0
      }
    };
  },
  computed: {
    // 人员搜索

    teacherMange() {
      const peopleSearch = this.search_teacher; // 这里要定义
      // var page = this.pagination1.page;
      if (peopleSearch) {
        this.pagination1.page = 1;
        let filter = this.list_teacher.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            );
          });
        });
        // console.log(filter)
        this.pagination1.total = filter.length;
        console.log(this.pagination1.total);
        return filter.slice(
          (this.pagination1.page - 1) * 10,
          this.pagination1.page * 10
        );
      }
      if (this.list_teacher != null) {
        this.pagination1.total = this.list_teacher.length;
        return this.list_teacher.slice(
          (this.pagination1.page - 1) * 10,
          this.pagination1.page * 10
        );
      } else return null;
    },
    studentMange() {
      const peopleSearch = this.search_student; // 这里要定义
      if (peopleSearch) {
        this.pagination2.page = 1;
        let filter = this.list_student.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            );
          });
        });
        this.pagination2.total = filter.length;
        return filter.slice(
          (this.pagination2.page - 1) * 10,
          this.pagination2.page * 10
        );
      }
      if (this.list_student != null) {
        this.pagination2.total = this.list_student.length;
        return this.list_student.slice(
          (this.pagination2.page - 1) * 10,
          this.pagination2.page * 10
        );
      } else return null;
    }
  },
  created() {
    // this.getStartData2();
    this.fetchTeacherData();
    this.fetchStudentData();
  },
  methods: {
    dealDisabledDate (time) {
      // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
      // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较

      const curDate = (new Date()).getTime()
    const day = 30 * 24 * 3600 * 1000;
      return time.getTime() < Date.now() - 8.64e7||time.getTime()>(day+curDate)
    },
    getStartData() {
      Date.prototype.format = function(fmt) {
        //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };

      let date = new Date();
      // this.tableRange.push(
      //    date.format("yyyy-MM-dd HH:mm:ss"),
      //   date
      // );
      this.tableRange.start=date.format("yyyy-MM-dd HH:mm:ss"),
      date.setMonth(date.getMonth() + 1);
      // this.tableRange.push(
      //   // date.format('yyyy-MM-dd HH:mm:ss')
      //   date
      // )
      this.tableRange.end=date.format("yyyy-MM-dd HH:mm:ss"),
      console.log(date.setMonth(date.getMonth() + 1))
      console.log(this.tableRange);
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
    fetchTeacherData() {
      this.listLoading = true;
      getTeacherList().then(response => {
        this.list_teacher = response.result;
        for (let index = 0; index < response.result.length; index++) {
          this.list_teacher[index].checked = 0;
        }
        this.listLoading = false;
      });
    },
    fetchStudentData() {
      this.listLoading = true;
      getStudentList().then(response => {
        this.list_student = response.result;
        for (let index = 0; index < response.result.length; index++) {
          this.list_student[index].checked = 0;
        }
        this.listLoading = false;
      });
    },
    handleTeacherCurrentChange(currentRow, oldCurrentRow) {
      currentRow.checked = 1;
      if (oldCurrentRow) {
        oldCurrentRow.checked = 0;
      }
      this.form.receiver = currentRow.account;
      this.form.receiverName = currentRow.name;
    },
    handleStudentCurrentChange(currentRow, oldCurrentRow) {
      currentRow.checked = 1;
      if (oldCurrentRow) {
        oldCurrentRow.checked = 0;
      }
      this.form.initiator = currentRow.account;
      this.form.initiatorName = currentRow.name;
    },
    onSubmit() {
      if (
        this.form.startTime != null &&
        this.form.cost != null &&
        this.form.initiatorAccount != null &&
        this.receiverAccount != null
      ) {
        var paramss = this.form;
        paramss.startTime = beautyTime1(paramss.startTime);
        console.log(paramss.startTime);
        paramss.cost = paramss.duration * paramss.cost;
        paramss.initiatorAccount = paramss.initiator;
        paramss.receiverAccount = paramss.receiver;

        console.log(paramss);

        submitOrder(paramss).then(res => {
          this.$message("订单生成！");
          this.onCancel(1);
        });
      } else {
        this.$message("请检查信息是否完整");
      }
    },
    onCancel(notLog) {
      this.form = {
        initiator: "",
        receiver: "",
        location: "",
        startTime: "",
        region: "",
        duration: 0,
        cost: 0,
        subject: 0
      };
      this.teacherMange.forEach(element => {
        element.checked = 0;
      });
      this.studentMange.forEach(element => {
        // console.log(element);
        element.checked = 0;
      });
      this.fetchTeacherData();
      this.fetchStudentData();
      if (!notLog) {
        this.$message({
          message: "清空!",
          type: "warning"
        });
      }
    },
    formatGoodAt(code) {
      // console.log(code)
      if (code != null) {
        var arr = code.split("-");
        var result = "";
        for (let index = 0; index < arr.length; index++) {
          arr[index] = this.subjectArr[arr[index]];
        }
        result = arr.join("、");
        return result;
      } else {
        return "";
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  width: 22%;
  float: left;
}
.XelRadio {
  width: 98%;
}
.el-pagination {
  margin-top: 20px;
  margin-left: 40px;
}
</style>

