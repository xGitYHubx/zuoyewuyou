<template>
  <div class="teacher_command">
    <div class="commandContain">
      <div class="command_left">
        <el-input
          v-model="search_command"
          clearable
          placeholder="输入推荐信息进行搜索"
        />
      </div>
      <div class="command_right">
        <el-button type="primary" @click="newCommand">新建+</el-button>
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
        v-for="(item, index) in showCols"
        :key="index"
        :show-overflow-tooltip="true"
        align="center"
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
      />

      <el-table-column align="center" label="图片">
        <template slot-scope="scope">
          <img
            :src="tableData[scope.$index].sketch"
            class="preview_img"
            alt="图片加载失败"
          >
          <!-- {{scope.row.sketch}} -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editCmd(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            @click="deleteCmd(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDataBypage, deleteCommand } from '../../api/teacherCommand'
export default {
  name: 'Tchcmd',
  data() {
    return {
      dialogVisible: false,
      search_command: '',
      tableLoading: false,
      deleteRow: null,
      tableData: [],
      page: 0,
      showCols: [
        {
          prop: 'recmdId',
          label: 'id'
        },
        {
          prop: 'title',
          label: '标题'
        },
        // {
        //     prop:'sketch',
        //     label:'图片'
        // },
        {
          prop: 'content',
          label: '内容'
        },
        {
          prop: 'createTime',
          label: '创建时间'
        },
        {
          prop: 'updateTime',
          label: '更新时间'
        }
      ]
    }
  },
  computed: {
    tableDataFilter() {
      const peopleSearch = this.search_command // 这里要定义
      if (peopleSearch) {
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(peopleSearch) > -1
            )
          })
        })
      }
      return this.tableData
    }
  },
  mounted() {
    this.changePage(0)
  },
  methods: {
    // 搜索

    changePage(page) {
      this.tableLoading = true
      getDataBypage(page).then(res => {
        this.tableData = res.result
        this.tableLoading = false
      })
    },
    newCommand() {
      this.$router.push('/tchCommand/addcmd')
    },
    deleteCmd(row) {
      this.deleteRow = row
      this.dialogVisible = true

      // deleteCommand();
    },
    Determine() {
      const data = {
        recmdId: this.deleteRow.recmdId
      }
      deleteCommand(data).then(res => {
        if (res.success) {
          this.dialogVisible = false
          this.changePage(this.page)
        }
      })
    },
    editCmd(row) {
      this.$router.push({ path: '/tchCommand/editcmd', query: row })
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
</style>
