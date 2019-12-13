<template>
    <!-- 评标办法设置  -->
    <div class="newBox">
        <div class="wrapper">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="评标办法" name="1">
                    <div class="page">
                        <div class="box">
                            <button class="btn" @click="editbidInfo">修改评标办法</button>
                            <button class="btn">导入办法</button>
                        </div>
                        <div class="title">
                            <p>当前评标办法:综合评分法</p>
                        </div>
                        <div class="main_info">
                            <ul class="infoUl">
                                <li>
                                    <button class="btn">评标准备</button>
                                    <i class="el-icon-close"></i>
                                </li>
                                <li>
                                    <button class="btn">评标准备</button>
                                    <i class="el-icon-close"></i>
                                </li>
                                <li>
                                    <button class="btn">评标准备</button>
                                    <i class="el-icon-close"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="初步评审" name="2">
                    <div class="page">
                        <div class="pageTitle">
                            <div class="title_result">
                                <p>评审汇总结果</p>
                                <div class="result_box">
                                    <el-radio v-model="radio" label="一票否决">一票否决</el-radio>
                                    <el-radio v-model="radio" label="少数服从多数">少数服从多数</el-radio>
                                </div>
                            </div>
                            <div class="title_setting">
                                <button class="btn">保存设置</button>
                            </div>
                        </div>
                        <div class="pageTitle">
                            <div class="title_setting">
                                <button class="btn" @click="newratingPoint">新建评分点</button>
                            </div>
                            <div class="title_setting">
                                <el-radio-group v-model="radio">
                                    <el-radio label="形式评审">形式评审</el-radio>
                                    <el-radio label="资格评审">资格评审</el-radio>
                                    <el-radio label="响应性评审">响应性评审</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="main_info">
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column
                                    width="70px"
                                    label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip ="true" prop="handlingPersonnel"  label="评分点名称">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip ="true" prop="creationTime"  label="评审标准">
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
                    </div>
                </el-tab-pane>
                <el-tab-pane label="详细评审" name="3">
                    <div class="page">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1">经济标评审</el-menu-item>
                            <el-menu-item index="2">技术标评审</el-menu-item>
                            <el-menu-item index="3">商务标评审</el-menu-item>
                            <el-menu-item index="4">权重设置</el-menu-item>
                        </el-menu>
                        <!-- 经济标评审 -->
                        <div class="main_info" v-if="keyItem == '1'">
                            <div class="pageTitle">
                                <div class="titleBtn">
                                    <button class="btn" @click="newEconomy">新建评分点</button>
                                    <button class="btn">保存设置</button>
                                </div>
                                <p style="color:blue;">总分值:0分</p>
                            </div>
                            <div style="padding:10px;">
                                <table class="tableClass">
                                    <tr class="tableItem">
                                        <td class="tableTitle">评审结果</td>
                                        <td class="titleContent">
                                            <el-radio v-model="radio" label="1">分数汇总模式</el-radio>
                                        </td>
                                    </tr>
                                    <tr class="tableItem">
                                        <td class="tableTitle">评审汇总结果</td>
                                        <td class="titleContent">
                                            <el-radio v-model="radio" label="1">最终得分=按分项汇总规则汇总累加得分</el-radio>
                                            <el-radio v-model="radio" label="2">最终得分=去掉一个评委最高分去掉一个评委最低分,取其他评委的平均得分</el-radio>
                                            <el-radio v-model="radio" label="3">最终得分=取其他评委的平均得分</el-radio>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div style="margin-top:5px;">
                                <el-table :data="tableData" stripe style="width: 100%">
                                    <el-table-column
                                        width="70px"
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column  prop="handlingPersonnel"  label="评分点名称">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="评审标准">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="最低分">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="最高分">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="打分方式">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="评审标准">
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
                        </div>
                        <!-- 技术标评审 -->
                        <div class="main_info" v-if="keyItem == '2'">
                            <div class="pageTitle">
                                <div class="titleBtn">
                                    <button class="btn" @click="newEconomy">新建评分点</button>
                                    <button class="btn">保存设置</button>
                                </div>
                                <p style="color:blue;">总分值:0分</p>
                            </div>
                            <div style="padding:10px;">
                                <table class="tableClass">
                                    <tr class="tableItem">
                                        <td class="tableTitle">评审结果</td>
                                        <td class="titleContent">
                                            <el-radio v-model="radio" label="1">分数汇总模式</el-radio>
                                        </td>
                                    </tr>
                                    <tr class="tableItem">
                                        <td class="tableTitle">评审汇总结果</td>
                                        <td class="titleContent">
                                            <el-radio v-model="radio" label="1">最终得分=按分项汇总规则汇总累加得分</el-radio>
                                            <el-radio v-model="radio" label="2">最终得分=去掉一个评委最高分去掉一个评委最低分,取其他评委的平均得分</el-radio>
                                            <el-radio v-model="radio" label="3">最终得分=取其他评委的平均得分</el-radio>
                                        </td>
                                    </tr>
                                     <tr class="tableItem">
                                        <td class="tableTitle">明暗标设定</td>
                                        <td class="titleContent">
                                            <el-radio-group v-model="radio">
                                                <el-radio label="明标">明标</el-radio>
                                                <el-radio label="暗标">暗标</el-radio>
                                            </el-radio-group>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div style="margin-top:5px;">
                                <el-table :data="tableData" stripe style="width: 100%">
                                    <el-table-column
                                        width="70px"
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column  prop="handlingPersonnel" :show-overflow-tooltip ="true"  label="评分点名称">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="评审标准">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="最低分">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="最高分">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="打分方式">
                                    </el-table-column>
                                    <el-table-column  prop="creationTime" :show-overflow-tooltip ="true" label="评审标准">
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
                        </div>
                        <!-- 商务标评审 -->
                        <div class="main_info" v-if="keyItem == '3'">
                           <div class="box">
                               <button class="btn">保存权重</button>
                           </div>
                            <div class="edit_list">
                                <div class="itemList">
                                    <div class="listArea">
                                        <div class="areaName">经济标评审得分权重：</div>
                                        <div class="areaContent">
                                            <el-input v-model="number" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="listArea">
                                        <div class="areaName">技术标评审得分权重：</div>
                                        <div class="areaContent">
                                            <el-input v-model="number" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="listArea">
                                        <div class="areaName">商务标评审得分权重：</div>
                                        <div class="areaContent">
                                            <el-input v-model="number" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 权重设置 -->
                        <div class="main_info" v-if="keyItem == '4'">
                           <div class="box">
                               <button class="btn">保存权重</button>
                           </div>
                            <div class="edit_list">
                                <div class="itemList">
                                    <div class="listArea">
                                        <div class="areaName">经济标评审得分权重：</div>
                                        <div class="areaContent">
                                            <el-input v-model="number" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="listArea">
                                        <div class="areaName">技术标评审得分权重：</div>
                                        <div class="areaContent">
                                            <el-input v-model="number" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="listArea">
                                        <div class="areaName">商务标评审得分权重：</div>
                                        <div class="areaContent">
                                            <el-input v-model="number" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="无效文件条款" name="4">
                    <div class="page">
                        <div class="pageTop">
                            <p>输入无线文件条数</p>
                            <div>
                                <el-input v-model="number" clearable></el-input>
                            </div>
                            <button class="btn">搜索</button>
                        </div>
                        <div class="main_info">
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column
                                    width="70px"
                                    label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column  prop="handlingPersonnel" :show-overflow-tooltip ="true" label="无效文件条款">
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
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 初步评审 -> 新建评分点 -->
        <div class="pointWrapper" v-show="pointFlag">
            <div class="pointBox">
                <div class="point_title">
                    <p>新建评分点</p>
                    <i class="el-icon-close" @click="closePoint"></i>
                </div>
                <div class="box">
                    <button class="btn">修改保存</button>
                    <button class="btn">取消保存</button>
                </div>
                <div class="main_info">
                    <div class="edit_list">
                       <div class="editItem">
                            <div class="editCenter">
                                <div class="editName"><p class="star">*</p>序号：</div>
                                <div class="editContent">
                                    <el-input v-model="number" clearable></el-input>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">评分点名称：</div>
                                <div class="editContent">
                                    <el-input v-model="number" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">评审标准：</div>
                                <div class="editContent">
                                    <el-input v-model="number" type="textarea" :rows="3"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">打分方式：</div>
                                <div class="editContent">
                                    <el-select v-model="number" clearable placeholder="请选择">
                                        <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">是否必过项：</div>
                                <div class="editContent">
                                     <el-checkbox v-model="checked">备选项</el-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">评分查看地址：</div>
                                <div class="editContent">
                                    <p>跳转到标书中</p>
                                    <el-select v-model="number" clearable placeholder="请选择">
                                        <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <p>章节中</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 详细评审 -> 经济标评审 -> 新建评分点 -->
        <div class="pointWrapper" v-show="economyFlag">
            <div class="pointBox">
                <div class="point_title">
                    <p>新建评分点</p>
                    <i class="el-icon-close" @click="closeEconomy"></i>
                </div>
                <div class="box">
                    <button class="btn">修改保存</button>
                    <button class="btn">取消保存</button>
                </div>
                <div class="main_info">
                    <div class="edit_list">
                       <div class="editItem">
                            <div class="editCenter">
                                <div class="editName"><p class="star">*</p>序号：</div>
                                <div class="editContent">
                                    <el-input v-model="number" clearable></el-input>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">评分点名称：</div>
                                <div class="editContent">
                                    <el-input v-model="number" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">评审标准：</div>
                                <div class="editContent">
                                    <el-input v-model="number" type="textarea" :rows="3"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">打分方式：</div>
                                <div class="editContent">
                                    <el-select v-model="number" clearable placeholder="请选择">
                                        <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">基准值公示：</div>
                                <div class="editContent">
                                    <el-input v-model="number" type="textarea"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">扣分公示：</div>
                                <div class="editContent">
                                    <el-input v-model="number" type="textarea"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">评分查看地址：</div>
                                <div class="editContent">
                                    <p>跳转到标书中</p>
                                    <el-select v-model="number" clearable placeholder="请选择">
                                        <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <p>章节中</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评标办法-> 修改评标办法 -->
        <div class="infoWrapper" v-show="infoFlag">
            <div class="infoBox">
                <el-select v-model="number" clearable placeholder="请选择">
                    <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="editBtn">
                    <button class="btn">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../assets/css/style.css'
    export default {
        data(){
            return {
                activeName:'1',
                activeIndex:'1',
                radio:'',
                tableData:[],
                pointFlag:false,//  初步评审 -> 新建评分点
                economyFlag:false,// 详细评审 -> 经济标评审 -> 新建评分点
                infoFlag:false,// 
                number:'',
                optionState:[],
                checked:false,
                keyItem:'1',
            }
        },
        methods:{
            // tab 切换
            handleClick(tab, event) {
                
            },
            // menu 切换
            handleSelect(key, keyPath) {
                this.keyItem = key;
            },
            // 评标办法 -> 修改评标办法
            editbidInfo(){
                this.infoFlag = !this.infoFlag;
            },
            // 编辑
            editInfo(row){

            },
            // 删除
            deleteInfo(row){

            },
            // 初步评审 -> 新建评分点
            newratingPoint(){
                this.pointFlag = true;
            },
            closePoint(){
                this.pointFlag = false;
            },
            // 详细评审->经济标评审-> 新建评分点
            newEconomy(){
                this.economyFlag = true;
            },
            closeEconomy(){
                this.economyFlag = false;
            },
        }
    }
</script>

<style scoped>
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
.page{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
/* 头部按钮 */
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px 0 2px;
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
/* 初步评审 */
.pageTitle{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #e2e2e2;
    padding: 0 5px;
}
.title_result{
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title_setting{
    display: flex;
    justify-content: end;
}
.result_box{
    display: flex;
    flex-direction: column;
}
.main_info{
    width: 100%;
    margin-top: 5px;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
/* 弹窗 */
.pointWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 10px;
}
.pointBox{
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.point_title{
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
/* 表格 */
.tableClass{
    width: 100%;
}
table,td,th{   
    border-collapse:collapse;
    
}
.tableItem{
    width: 100%;
    height: auto;
    border:1px solid #95d7f9;     
    display: flex;
    justify-content: space-between;  
}
.tableTitle{
    width: 20%;
    text-align: center;
    border-right:1px solid #95d7f9;   
    display: flex;
    justify-content: center;
    align-items: center;
    background: #c9e7eb;
}
.titleContent{
    flex: 1;
    display: flex;
    justify-content: start;
    flex-direction: column;
    padding-left:10px;
}
.itemList{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.listArea{
    display: flex;
    align-items: center;
}
.areaContent>.el-input{
    width: 150px!important;
}
/* 无效文件条款 */
.pageTop{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    background: #e2e2e2;
    padding: 0 5px;
}
.pageTop>div{
    padding: 0 10px;
}
/* 评标方法 */
.title{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0058a9;
    text-align: center;
    color: #fff;
    font-size: 26px;
}
/* 中间的流程图 */
.infoUl{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.infoUl>li{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.infoUl>li>.btn{
    height: 40px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.infoUl>li>i{
    font-size: 45px;
}
.infoWrapper{
    position: absolute;
    top: 80px;
    left: 0;
    width: 360px;
    height: 300px;
    border:1px solid #ccc;
    z-index: 99;
    background: #fff;
}
.infoBox{
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.editBtn{
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>