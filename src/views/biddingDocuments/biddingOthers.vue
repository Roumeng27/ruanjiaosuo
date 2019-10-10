<template>
  <div class="myDiv">
        <div class="new_nav">
            <button class="nav_co nav_save">新增</button>
        </div>
       <div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                </el-table-column>
                <el-table-column  prop="entrySubcontractNumber"  label="材料名称">
                </el-table-column>
                <el-table-column prop="operation" label="查看">
                    <template slot-scope="scope">
                        <i class="el-icon-search" style="font-size:16px;cursor:pointer;"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="删除">
                    <template slot-scope="scope">
                        <i class="el-icon-delete" style="font-size:16px;cursor:pointer;"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        tableData:[],//列表
        currentPage:1,
    }
  },
  watch:{},
  computed:{},
  methods:{
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
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
.new_nav{
    background-color: #e2e2e2;
    height: 40px;
    margin-bottom: 20px;
}
.nav_co {
  padding: 8px 20px;
  background-color: #0095d5;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>