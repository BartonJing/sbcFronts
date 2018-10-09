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
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮件">
          </el-table-column>
          <el-table-column
            prop="locked"
            label="是否锁定">
            <template slot-scope="scope">
              <span>{{scope.row.locked | formatEncode(encodeMap,'YN')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="openUserRoleDialog(scope.row)" type="text" size="small">设置角色</el-button>
              <el-button @click="selectUserPermissions(scope.row)" type="text" size="small">查看权限</el-button>
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
      title="用户信息"
      :visible.sync="dialogSaveVisible">
      <el-form ref="userForm" :model="user" label-width="80px" v-if="user">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名"
                          prop="username"
                          :rules="[{ required: true, message: '请填写用户名', trigger: 'blur' }]">
              <el-input v-model="user.username" :disabled="user.id !== null && user.id !== ''" placeholder="请填写用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户姓名"
                          prop="name"
                          :rules="[{ required: true, message: '请填写用户姓名', trigger: 'blur' }]">
              <el-input v-model="user.name" placeholder="请填写用户姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱"
                          prop="email"
                          :rules="[{ required: true, message: '请填写邮箱', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
              <el-input v-model="user.email" placeholder="请填写邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话"
                          prop="mobile"
                          :rules="[{ validator: validateMobile, trigger: 'blur' }]">
              <el-input v-model="user.mobile" placeholder="请填写电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码"
                          prop="password"
                          :rules="[{ required: true, message: '请填写密码', trigger: 'blur' }]">
              <el-input v-model="user.password" type="password" :disabled="user.id !== null && user.id !== ''" placeholder="请填写密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码"
                          prop="passwordC"
                          :rules="[{ required: true, message: '请确认密码', trigger: 'blur' },{ validator: validatePass2, trigger: 'blur' }]">
              <el-input v-model="user.passwordC" type="password" :disabled="user.id !== null && user.id !== ''" placeholder="请认密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否锁定"
                          prop="locked"
                          :rules="[{ required: true, message: '是否锁定', trigger: 'blur' }]">
              <el-select v-model="user.locked" placeholder="是否锁定" v-if="encodeMap">
                <el-option
                  v-for="item in encodeMap.YN"
                  :key="item.id"
                  :label="item.encodeName"
                  :value="item.encode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm('userForm')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="用户角色信息"
      :visible.sync="dialogUserRoleVisible">
      <el-row>
        <el-col :span="24">
          <el-tree ref="roleTree"
            :data="roles"
            show-checkbox
            node-key="id"
            :props="rolesProps"
            default-expand-all>
          </el-tree>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUserRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUserRoles">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="用户权限信息"
      :visible.sync="dialogUserPermissionVisible">
      <el-row>
        <el-col :span="24">
          <el-tree ref="userPermissionTree"
                   node-key="id"
                   show-checkbox
                   :data="permissions"
                   :props="defaultProps"
                   default-expand-all></el-tree>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUserPermissionVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === null || value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (value === null || value === '') {
        callback(new Error('请输入电话号码'))
      } else if (value.length !== 11) {
        callback(new Error('电话号码格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      validatePass2: validatePass2,
      validateMobile: validateMobile,
      loading: false,
      pageData: {
        pageNum: 1,
        pageSize: 10,
        list: [],
        total: 0
      },
      dialogSaveVisible: false,
      user: null,
      permissions: null,
      dialogUserRoleVisible: null,
      encodeMap: null,
      userRoles: [],
      roles: [],
      currentRow: null,
      dialogUserPermissionVisible: null,
      userPermissions: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: true
      },
      rolesProps: {
        children: 'children',
        label: 'roleName'
      }
    }
  },
  mounted () {
    this.getTableData()
    this.initUser()
    this.getAllPermission()
    this.getEncode('YN')
    this.selectAllRoles()
  },
  methods: {
    initUser () {
      this.user = {
        id: '',
        username: null,
        name: null,
        email: null,
        mobile: null,
        locked: '0',
        password: null,
        passwordC: null
      }
    },
    getTableData () {
      const ths = this
      ths.loading = true
      this.getRequestParams('/auth/user/selectPage', {
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
      _this.getRequest('/auth/user/selectById?id=' + row.id).then(resp => {
        if (resp.status === 0) {
          _this.user = resp.data
          _this.dialogSaveVisible = true
        }
      })
    },
    selectAllRoles () {
      const _this = this
      _this.getRequest('/auth/role/selectAllRoles').then(resp => {
        if (resp !== null) {
          _this.roles = resp
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
        _this.getRequest('/auth/user/delete?id=' + row.id).then(resp => {
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
      this.initUser()
      this.dialogSaveVisible = true
    },
    closeDialog () {
      this.initUser()
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
            _this.postJsonRequest('/auth/user/save', JSON.stringify(_this.user)).then(resp => {
              if (resp.status === 0) {
                _this.$message({
                  type: 'success',
                  message: resp.msg
                })
                _this.dialogSaveVisible = false
                _this.initUser()
                _this.getTableData()
              } else {
                _this.$message({
                  type: 'error',
                  message: resp.msg
                })
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
    getAllPermission () {
      const ths = this
      this.getRequest('/auth/permission/selectAllPermissionToTree?hasRoot=1').then(resp => {
        ths.permissions = resp
      })
    },
    getEncode (kind) {
      const ths = this
      this.getRequestParams('/sys/encode/selectByKind?kind=' + kind).then(resp => {
        ths.encodeMap = resp
      })
    },
    openUserRoleDialog (row) {
      const _this = this
      _this.currentRow = row
      _this.getRequest('/auth/role/selectRolesByUserId?userId=' + row.id).then(resp => {
        if (resp != null) {
          setTimeout(function () {
            _this.$refs.roleTree.setCheckedKeys([])
          }, 5)
          _this.userRoles = []
          _this.dialogUserRoleVisible = true
          // 设置选中项
          if (resp != null && resp.length > 0) {
            for (let i = 0; i < resp.length; i++) {
              _this.userRoles.push(resp[i].id)
            }
          }
          setTimeout(function () {
            _this.$refs.roleTree.setCheckedKeys(_this.userRoles)
          }, 5)
        } else {
          setTimeout(function () {
            _this.$refs.roleTree.setCheckedKeys([])
          }, 5)
        }
      })
    },
    saveUserRoles () {
      const _this = this
      _this.$confirm('确定要保存页面所填数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var selectData = _this.$refs.roleTree.getCheckedKeys()
        _this.postRequest('/auth/user/saveUserRoles', {roles: selectData, userId: _this.currentRow.id}).then(resp => {
          if (resp.status === 0) {
            _this.$message({
              type: 'success',
              message: resp.msg
            })
            _this.dialogUserRoleVisible = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
    },
    selectUserPermissions (row) {
      const _this = this
      _this.getRequest('/auth/permission/selectUserPermissions?userId=' + row.id).then(resp => {
        if (resp != null) {
          _this.userPermissions = []
          _this.dialogUserPermissionVisible = true
          setTimeout(function () {
            _this.$refs.userPermissionTree.setCheckedKeys([])
          }, 50)
          // 设置选中项
          if (resp != null && resp.length > 0) {
            for (let i = 0; i < resp.length; i++) {
              _this.userPermissions.push(resp[i].id)
            }
            setTimeout(function () {
              _this.$refs.userPermissionTree.setCheckedKeys(_this.userPermissions)
            }, 50)
          }
        } else {
          setTimeout(function () {
            _this.$refs.userPermissionTree.setCheckedKeys([])
          }, 50)
        }
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
