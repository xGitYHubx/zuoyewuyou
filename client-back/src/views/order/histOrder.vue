<template>
  <div class="app-container">
    <div class="grid-content  bg-purple">
      <el-input v-model="search_teacher" clearable placeholder="输入老师信息进行搜索" />
    </div>
    <el-table v-loading="listLoading" :data="searchFilter()" element-loading-text="Loading" border fit highlight-current-row>
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
          {{ scope.row.cost / scope.row.duration }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="科目">
        <template slot-scope="scope">
          {{ formatSubject(scope.row.subject) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <i :class="orderStatus(scope.row.status)" /> {{ formatOrderState(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单生成时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==0||scope.row.status==1"
            type="warning"
            @click="cancelOrder(scope.row)"
          >撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :current-page="pagination1.page" :total="pagination1.total" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { getHistOrder, changeOrderStatus, getHistOrderCount } from '@/api/order'
import { searchFilter } from '@/utils/others.js'
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
      pagination1: {
        page: 1,
        total: 1
      },
      search_teacher: '',
      list: [],
      listLoading: true
    }
  },
  computed: {},
  created() {
    this.fetchData(0)
    this.fetchCount()
  },
  methods: {
    fetchData(page) {
      this.listLoading = true
      getHistOrder(page).then(response => {
        this.list = response.result
        this.listLoading = false
      })
    },
    searchFilter() {
      return searchFilter(this.search_teacher, this.list, this.pagination1)
    },
    fetchCount() {
      getHistOrderCount().then(res => {
        this.pagination1.total = res.result
      })
    },
    handleCurrentChange(val) {
      this.pagination1.page = val
      this.fetchData(val - 1)
    },
    formatSubject(index) {
      return this.subject[index]
    },
    formatOrderState(index) {
      return this.orderState[index]
    },
    cancelOrder(row) {
      changeOrderStatus({
        orderId: row.orderId,
        status: 4
      }).then(res => {
        this.list = []
        this.pagination1.page = 1
        this.fetchData(0)
      })
    },
    orderStatus(status) {
      if (status == 0) {
        return 'el-icon-question'
      } else if (status == 1) {
        return 'el-icon-success'
      } else if (status == 2) {
        return 'el-icon-s-check'
      } else if (status == 3) {
        return 'el-icon-money'
      } else if (status == 4) {
        return 'el-icon-circle-close'
      }
    }
  }
}
</script>
<style>
.el-pagination {
  margin-top: 20px;
  margin-left: 40px;
}
</style>

