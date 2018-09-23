<template>
  <div style="margin-top: 20px;">
    <el-row style="margin-bottom: 10px">
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="pageData.list"
          border
          style="width: 100%"
          v-loading="loading">
          <el-table-column
            prop="name"
            label="name">
          </el-table-column>
          <el-table-column
            prop="url"
            label="url">
          </el-table-column>
          <el-table-column
            prop="path"
            label="path">
          </el-table-column>
          <el-table-column
            prop="component"
            label="component">
          </el-table-column>
          <el-table-column
            prop="icon"
            label="icon">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.pageNum"
          :page-sizes="[10, 100, 300, 400]"
          :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'PermissionView',
  data () {
    return {
      isCollapse: false,
      loading: false,
      pageData: {
        pageNum: 1,
        pageSize: 10,
        list: [],
        total: 0
      }
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      const ths = this
      ths.loading = true
      this.getRequestParams('/auth/permission/selectPage', {
        pageNum: ths.pageData.pageNum,
        pageSize: ths.pageData.pageSize
      }).then(resp => {
        ths.pageData = resp
        ths.loading = false
      })
    },
    handleSizeChange (val) {
      this.pageData.pageSize = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      this.pageData.pageNum = val
      this.getTableData()
    },
    edit (row) {
      console.log(row)
    },
    delete (row) {
      console.log(row)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
