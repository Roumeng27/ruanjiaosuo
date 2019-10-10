<template>
    <!-- 询疑答复 -->
    <div class="newBox">
        <div class="wrapper">
             <!-- 搜索的输入框 -->
            <div class="editItem">
                <div class="editCenter">
                    <div class="editName">招标项目(分包)名称：</div>
                    <div class="editContent">
                        <el-input v-model="name" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                    </div>
                </div>
                <div class="editCenter">
                    <div class="editName">入场项目(分包)编号：</div>
                    <div class="editContent">
                        <el-input v-model="name" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                     </div>
                </div>
                <div class="editBtn">
                    <button class="btn" @click="searchList">搜素</button>
                </div>
            </div>
            <div class="main_info">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" label="序号" :index="typeIndex" width="70">
                    </el-table-column>
                    <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号">
                    </el-table-column>
                    <el-table-column prop="entrySubcontractNumber" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="提问时间">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="是否回复">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="回复">
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <div class="pagination" v-if="this.currentPage>1">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import baseUrl from '../../api/api'
    import '../../assets/css/style.css'
    import {formatDate,isEmpty} from '../../api/base.js'
    export default {
        data(){
            return {
                // 不标准的字段
                name:'',
                tableData:[],
                // 分页器
                currentPage:1,// 当前页
                pageSize: 10, // 每页条数
                pageTotal: 0, //总页数
                total: 0, //总条数
            }
        },
        created(){

        },
        methods:{
            // 分页器
            handleSizeChange(val) {
                // 每页条数
            },
            handleCurrentChange(val) {
                // 当前页数
                this.currentPage = val;
                this.getInitList(); // 项目分包列表
            },
            //编号问题
            typeIndex(index) {
                return index + (this.currentPage - 1) * 10 + 1;
            },
            searchList(){
                
            }
        }
    }
</script>

<style  scoped>
.newBox {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
}
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.main_info{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
/* 分液器 */
.pagination {
  width: 100%;
  padding: 20px 60px ;
  display: flex;
  justify-content: flex-end;
}
/* 按钮 */
.editBtn{
    height: 35px;
}
.btn{
    height: 100%;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
  /* 列表展示 */
.edit_list{
    padding: 15px 20px;
}
.editItem{
    width: 100%;
    display: flex;
    align-items: center;
}
.editCenter{
    flex: 1;
    display: flex;
    align-items: center;
    padding: 5px 0;
}
.editName{
    width: 145px;
    display: flex;
    justify-content: flex-end;
}
.editContent{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: #6e622e;
}
.editContent>p{
    width: 25%;
}
.editContent>.el-select{
    width: 100%!important;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
</style>