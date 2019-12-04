<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="学生手机号">
        <template slot-scope="scope">
          {{ scope.row.initiatorAccount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="学生姓名">
        <template slot-scope="scope">
          {{ scope.row.initiatorName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="老师手机号">
        <template slot-scope="scope">
          {{ scope.row.receiverAccount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="老师姓名">
        <template slot-scope="scope">
          {{ scope.row.receiverName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="辅导时间">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="辅导地点">
        <template slot-scope="scope">
          {{ scope.row.location }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="辅导时长">
        <template slot-scope="scope">
          {{ scope.row.duration }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="资薪/每小时">
        <template slot-scope="scope">
          {{ scope.row.cost/scope.row.duration }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="科目">
        <template slot-scope="scope">
          {{ formatSubject(scope.row.subject) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          {{ formatOrderState(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单生成时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getHistOrder } from '@/api/order'

export default {
  name: 'HistOrder',
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
      list: null,
      listLoading: true
    }
  },
  computed: {

  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getHistOrder().then(response => {
        this.list = response.result

        this.listLoading = false
      })
    },
    formatSubject(index) {
      return this.subject[index]
    },
    formatOrderState(index) {
      return this.orderState[index]
    }
  }
}
</script>
