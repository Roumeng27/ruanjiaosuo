<template>
    <!-- 开标一览表 -->
    <div class="newBox">
        <div class="wrapper">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="1">
                    <div class="pageWrapper">
                        <div class="pageBox">
                            <div class="page_title">
                                <p>新增信息</p>
                                <i class="el-icon-close"></i>
                            </div>
                            <div class="main_info">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">填写项：</div>
                                            <div class="editContent">
                                                <el-input v-model="number" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">单位：</div>
                                            <div class="editContent">
                                                <el-input v-model="number" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">填写类型：</div>
                                            <div class="editContent">
                                                <el-select v-model="number" clearable placeholder="请选择">
                                                    <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editBtn">
                                        <button class="btn">添加保存</button>
                                        <button class="btn">取消</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="投标总价报价" name="2">
                    <div class="page">
                        <el-table :data="tableData" stripe style="width: 100%">
                            <el-table-column
                                width="70px"
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="填写项">
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="填写类型">
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="单位">
                            </el-table-column>
                            <el-table-column
                                width="70px"
                                label="编辑">
                                <template slot-scope="scope">
                                    <i class="el-icon-edit" @click="editInfo(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="70px"
                                label="删除">
                                <template slot-scope="scope">
                                    <i class="el-icon-close" @click="deleteInfo(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="投标单价报价" name="3">
                    <div class="page">
                        <el-table :data="tableData" stripe style="width: 100%">
                            <el-table-column
                                width="70px"
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="填写项">
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="填写类型">
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="单位">
                            </el-table-column>
                            <el-table-column
                                width="70px"
                                label="编辑">
                                <template slot-scope="scope">
                                    <i class="el-icon-edit" @click="editInfo(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="70px"
                                label="删除">
                                <template slot-scope="scope">
                                    <i class="el-icon-close" @click="deleteInfo(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                 </el-tab-pane>
                <el-tab-pane label="费率报价" name="4">
                    <div class="page">
                        <el-table :data="tableData" stripe style="width: 100%">
                            <el-table-column
                                width="70px"
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="填写项">
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="填写类型">
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="单位">
                            </el-table-column>
                            <el-table-column
                                width="70px"
                                label="编辑">
                                <template slot-scope="scope">
                                    <i class="el-icon-edit" @click="editInfo(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="70px"
                                label="删除">
                                <template slot-scope="scope">
                                    <i class="el-icon-close" @click="deleteInfo(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                activeName:'1',
                tableData:[],
                number:"",
                optionState:[],
            }
        },
        methods:{
            // tab 切换
            handleClick(tab, event) {
                
            },
            // 编辑
            editInfo(row){

            },
            // 删除
            deleteInfo(row){

            },
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
.pageWrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pageBox{
   width:600px;
   height: 300px;
   border: 1px solid #ccc;
}
.page_title{
    width: 100%;
    height: 35px;
    padding: 0 20px;
    background: #0058a9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 18px;
}
.main_info{
    width: 100%;
    margin-top: 5px;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
/* 列表展示 */
.edit_list{
    padding: 15px 20px;
}
.editItem{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.editCenter{
    flex: 1;
    display: flex;
    padding: 5px 0;
}
.editName{
    width: 145px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.editContent{
    flex: 1;
    display: flex;
    align-items: center;
    color: #6e622e;
}
.editContent>p{
    padding: 0 5px;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.star{
    color: #f00;
    padding-right: 2px;
}
.editBtn{
    margin-top: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn{
    height: 40px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
</style>