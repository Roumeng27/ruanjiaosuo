<template>
  <div class="myDiv">
        <!-- 非此管理员出现这个界面 -->
        <el-dialog title="警告提示" :visible.sync="successBox"  width="40%" :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>未定义的角色！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose()">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        successBox:true,
    }
  },
  watch:{},
  computed:{},
  methods:{
      handleClose(){
          this.successBox = false;
      }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.el-icon-success,.el-icon-warning{
    font-size: 100px;
    color: #0a5e9d;
}
.el-icon-question{
    font-size: 100px;
    color: #0a5e9d;
}
.icon span{
    padding: 0 10px;
    font-size: 20px;
}
.dialog_header{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.dialog_header p span{
    color: red;
}
</style>