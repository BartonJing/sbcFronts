<template>
  <div style="margin-top: 20px;">
    <el-row style="margin-bottom: 10px">
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
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
            prop="roleName"
            label="roleName">
          </el-table-column>
          <el-table-column
            prop="roleCode"
            label="roleCode">
          </el-table-column>
          <el-table-column
            prop="level"
            label="level">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="addPermission(scope.row)" type="text" size="small">设置权限</el-button>
              <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
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
    <el-dialog
      title="角色信息"
      :visible.sync="dialogSaveVisible">
      <el-form ref="roleForm" :model="role" label-width="80px" v-if="role">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称"
                          prop="roleName"
                          :rules="[{ required: true, message: '请填写角色名称', trigger: 'blur' }]">
              <el-input v-model="role.roleName" placeholder="请填写角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色编码"
                          prop="roleCode"
                          :rules="[{ required: true, message: '请填写角色编码', trigger: 'blur' }]">
              <el-input v-model="role.roleCode" placeholder="请填写角色编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="级别"
                          prop="level"
                          :rules="[{ required: true, message: '请填写级别', trigger: 'blur' }]">
              <el-input v-model="role.level" placeholder="请填写级别"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="角色菜单信息"
      :visible.sync="dialogRolePermissionVisible">
      <el-row>
        <el-col :span="24">
          <el-tree ref="roleTree"
                   node-key="id"
                   show-checkbox
                   :data="permissions"
                   :props="defaultProps"
                   default-expand-all></el-tree>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRolePermissionVisible = false">取消</el-button>
        <el-button type="warning" @click="clearTreeSelect">清空</el-button>
        <el-button type="primary" @click="saveRolePermissions">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleView',
  data () {
    return {
      loading: false,
      pageData: {
        pageNum: 1,
        pageSize: 10,
        list: [],
        total: 0
      },
      dialogSaveVisible: false,
      role: null,
      permissions: null,
      rolePermissions: [],
      dialogRolePermissionVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      currentRow: null
    }
  },
  mounted () {
    this.getTableData()
    this.initRole()
    this.getAllPermission()
  },
  methods: {
    initRole () {
      this.role = {
        id: '',
        roleName: null,
        roleCode: null
      }
    },
    getTableData () {
      const ths = this
      ths.loading = true
      this.getRequestParams('/auth/role/selectPage', {
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
      const _this = this
      _this.getRequest('/auth/role/selectById?id=' + row.id).then(resp => {
        if (resp != null) {
          _this.role = resp
          _this.dialogSaveVisible = true
        }
      })
    },
    remove (row) {
      const _this = this
      _this.$confirm('确定要删除此条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.getRequest('/auth/role/delete?id=' + row.id).then(resp => {
          if (resp.status === 0) {
            _this.$message({
              type: 'success',
              message: resp.msg
            })
            _this.getTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    openAddDialog () {
      this.initRole()
      this.dialogSaveVisible = true
    },
    closeDialog () {
      this.initRole()
      this.dialogSaveVisible = false
    },
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$confirm('确定要保存页面所填数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.postJsonRequest('/auth/role/save', JSON.stringify(_this.role)).then(resp => {
              if (resp.status === 0) {
                _this.$message({
                  type: 'success',
                  message: resp.msg
                })
                _this.dialogSaveVisible = false
                _this.initRole()
                _this.getTableData()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消保存'
            })
          })
        } else {
          _this.$message({
            type: 'error',
            message: '页面数据校验失败!'
          })
          return false
        }
      })
    },
    addPermission: function (row) {
      const _this = this
      _this.currentRow = row
      _this.getRequest('/auth/permission/selectPermissionsByRoleId?roleId=' + row.id).then(resp => {
        if (resp != null) {
          setTimeout(function () {
            _this.$refs.roleTree.setCheckedKeys([])
          }, 50)
          _this.rolePermissions = []
          _this.dialogRolePermissionVisible = true
          // 设置选中项
          if (resp != null && resp.length > 0) {
            for (let i = 0; i < resp.length; i++) {
              _this.rolePermissions.push(resp[i].id)
            }
            setTimeout(function () {
              _this.$refs.roleTree.setCheckedKeys(_this.rolePermissions)
            }, 50)
          }
        } else {
          setTimeout(function () {
            _this.$refs.roleTree.setCheckedKeys([])
          }, 50)
        }
      })
    },
    getAllPermission () {
      const ths = this
      this.getRequest('/auth/permission/selectAllPermissionToTree?hasRoot=1').then(resp => {
        ths.permissions = resp
      })
    },
    clearTreeSelect () {
      this.$refs.roleTree.setCheckedKeys([])
    },
    saveRolePermissions () {
      const _this = this
      var selectData = _this.$refs.roleTree.getCheckedKeys()
      _this.$confirm('确定要保存页面所填数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.postRequest('/auth/role/saveRolePermissions', {permissions: selectData, roleId: _this.currentRow.id}).then(resp => {
          if (resp.status === 0) {
            _this.$message({
              type: 'success',
              message: resp.msg
            })
            _this.dialogRolePermissionVisible = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
