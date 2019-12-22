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
      >
        <template slot-scope="scope">
          {{ item.filter?item.filter(scope.row[item.prop]):scope.row[item.prop] }}
        </template>
      </el-table-column>
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
    <el-pagination background layout="prev, pager, next" :current-page="pagination1.page" :total="pagination1.total" @current-change="handleCurrentChange" />

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
import { getDataBypage, deleteCommand, getCount } from '../../api/teacherCommand'
import { getSimpleText } from '@/utils/others.js'

export default {
  name: 'Tchcmd',
  data() {
    return {
      pagination1: {
        page: 1,
        total: 1
      },
      dialogVisible: false,
      search_command: '',
      tableLoading: false,
      deleteRow: null,
      tableData: [],
      page: 0,
      showCols: [
        {
          prop: 'recmdId',
          label: 'ID'
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
          label: '内容',
          filter: function(value) {
            return getSimpleText(value)
          }
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
    this.getCount()
  },
  methods: {
    changePage(page) {
      this.tableLoading = true
      getDataBypage(page).then(res => {
        this.tableData = res.result
        // this.pagination1.total=res.
        // this.tableData.forEach((element, index) => {
        //   element.content = this.getSimpleText(element.content)
        // })
        this.tableLoading = false
      })
    },
    getCount() {
      getCount().then(res => {
        this.pagination1.total = res.result
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
    handleCurrentChange(val) {
      this.pagination1.page = val
      this.changePage(val)
      // this.getList();
    },
    Determine() {
      const data = {
        recmdId: this.deleteRow.recmdId
      }
      deleteCommand(data).then(res => {
        if (res.success) {
          this.dialogVisible = false
          this.changePage(this.page)
          this.getCount()
        }
      })
    },
    editCmd(row) {
      this.$router.push({ path: '/tchCommand/editcmd', query: row })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
