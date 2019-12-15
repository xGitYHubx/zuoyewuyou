<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="名字">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.account" type="number" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="text" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" type="number" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="form.school" />
      </el-form-item>

      <!-- <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>-->
      <!-- <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>-->
      <el-form-item label="擅长科目">
        <el-checkbox-group v-model="form.good_at">
          <el-checkbox
            v-for="(item,index) in subjectArr"
            :key="index"
            :label="item.name"
            name="type"
          />
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="地址">
        <el-input v-model="form.address" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定注册</el-button>
        <el-button @click="onCancel">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from "../../api/register";

export default {
  data() {
    return {
      form: {
        name: "",
        account: "",
        gender: "1",
        school: "",
        password: "",
        address: "",
        date1: "",
        good_at: [],
        age: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      subjectArr: [
        {
          value: 0,
          name: "语文",
          checked: false,
          hot: false
        },
        {
          value: 1,
          name: "数学",
          checked: false,
          hot: false
        },
        {
          value: 2,
          name: "英语",
          checked: false,
          hot: false
        },
        {
          value: 3,
          name: "物理",
          checked: false,
          hot: false
        },
        {
          value: 4,
          name: "化学",
          checked: false,
          hot: false
        },
        {
          value: 5,
          name: "生物",
          checked: false,
          hot: false
        },
        {
          value: 6,
          name: "政治",
          checked: false,
          hot: false
        },
        {
          value: 7,
          name: "历史",
          checked: false,
          hot: false
        },
        {
          value: 8,
          name: "地理",
          checked: false,
          hot: false
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      var params = JSON.parse(JSON.stringify(this.form));
      var good_at = [];
      for (let i = 0; i < params.good_at.length; i++) {
        for (let j = 0; j < this.subjectArr.length; j++) {
          if (params.good_at[i] == this.subjectArr[j].name) good_at.push(j);
        }
      }
      params.good_at = good_at.join("-");
      register(params)
        .then(res => {
          this.$message({
            message: "注册成功！",
            type: "success"
          });

          this.form = {
            name: "",
            account: "",
            gender: "1",
            school: "",
            address: "",
            password: "",
            date1: "",
            good_at: [],
            age: "",
            date2: "",
            delivery: false,
            type: [],
            resource: "",
            desc: ""
          };
        })
        .finally(res => {});
    },
    onCancel() {
      this.$message({
        message: "清空!",
        type: "warning"
      });
      this.form = {
        name: "",
        account: "",
        gender: "1",
        school: "",
        address: "",
        date1: "",
        good_at: [],
        age: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      };
    },
    tranType() {}
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

