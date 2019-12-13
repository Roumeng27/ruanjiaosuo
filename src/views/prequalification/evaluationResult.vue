<template>
    <!-- 资审申请评审结果  -->
    <div class="myDiv">
        <!-- 头部 -->
        <div class="head_box">
            <div class="head_l" @click="newManage()">新增资审结果</div>
            <div>
                <el-radio-group v-model="radio">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="编辑中">编辑中</el-radio>
                    <el-radio label="待办理">待办理</el-radio>
                    <el-radio label="办理通过">办理通过</el-radio>
                    <el-radio label="办理未通过">办理未通过</el-radio>
                </el-radio-group>
            </div>    
        </div>
        <div class="head_bottom">
            <span class="head_b_b">招标项目(分包)名称：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
            <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalProjectId" placeholder="请输入内容"></el-input></span>
            <span><button class="btn" @click="searchList()">搜索</button></span>
        </div>
        <div class="main_info">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                </el-table-column>
                <el-table-column prop="totalProjectId" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="180">
                </el-table-column>
                <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="招标项目名称" width="180">
                </el-table-column>
                <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="分包名称">
                </el-table-column>
                <el-table-column prop="state" label="状态">
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                    <template slot-scope="scope">
                        <i class="el-icon-search"  @click="lookItem(scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
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
        <!-- 挑选分包弹框 -->
        <div class="mask1" v-show="chooseSubShow"></div>
        <div v-show="chooseSubShow" class="fb_box">
            <div class="new_head">
                <div style="padding-left:10px;">挑选分包</div>
                <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_main">
                 <el-table :data="chooseSubData" stripe style="width: 100%">
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="totalProjectId" :show-overflow-tooltip ="true" label="入场项目分包编号">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="分包分类">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="招标方式">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="分包控制金额(万元)">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="状态">
                    </el-table-column>
                    <el-table-column prop="operation" label="选择">
                        <template slot-scope="scope">
                            <i class="el-icon-plus" style="cursor:pointer;" @click="chooseFile()"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 上一步弹框 -->
        <div class="mask1" v-show="show"></div>
        <div v-show="show" class="fb_box">
            <div class="new_head">
                <div style="padding-left:10px;">新增资格预审结果</div>
                <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_nav">
                <button class="nav_co nav_save">保存</button>
                <button class="nav_co nav_next" @click="nextTo()">下一步</button>
            </div>
            <div class="main top_box">
                <el-collapse v-model="activeName" accordion>
                    <!--招标项目信息 -->
                    <el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}}万元</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}}</div>
                                </div>
                            </div>
                        </div>
                        <div>   
                            <el-table
                                    ref="multipleTable"
                                    :data="subpackageData"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                    label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="entrySubcontractNumber"
                                    label="入场项目(分包)编号">
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="subcontractName"
                                    label="分包名称">
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="subcontractingControlAmount"
                                    label="分包控制金额(万元)">
                                </el-table-column>
                                <el-table-column
                                    label="查看">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!--资格预审结果 -->
                    <el-collapse-item title="资格预审结果" name="2">
                        <div class="choose">
                            <el-radio-group v-model="examinationResult" size="small" @change="changeRadio()">
                                <el-radio label="">全部</el-radio>
                                <el-radio label="通过">资审通过</el-radio>
                                <el-radio label="不通过">资审不通过</el-radio>
                            </el-radio-group>
                        </div>
                        <el-table :data="reasultData" stripe style="width: 100%">
                            <el-table-column  prop="index"  label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column :show-overflow-tooltip ="true" prop="companyName"  label="单位名称">
                            </el-table-column>
                            <el-table-column :show-overflow-tooltip ="true" prop="projectLeader" label="项目负责人">
                            </el-table-column>
                            <el-table-column prop="examinationResult" label="审查结果"></el-table-column>
                            <el-table-column prop="reason" label="原因"></el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-plus"  style="cursor: pointer;" @click="reasonChoose(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 下一步弹框 -->
        <div class="mask1" v-show="nextShow"></div>
        <div v-show="nextShow" class="fb_box">
            <div class="new_head">
                <div style="padding-left:10px;">资格预审结果</div>
                <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_nav">
                <button class="nav_co nav_save">提交</button>
                <button class="nav_co nav_next" @click="backTo()">上一步</button>
            </div>
            <div class="main top_box">
                <el-collapse v-model="activeName1" accordion>
                    <!--招标项目信息 -->
                    <el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}}万元</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}}</div>
                                </div>
                            </div>
                        </div>
                        <div>   
                                <el-table
                                        ref="multipleTable"
                                        :data="subpackageData"
                                        tooltip-effect="dark"
                                        style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="entrySubcontractNumber"
                                        label="入场项目(分包)编号">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="subcontractName"
                                        label="分包名称">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="subcontractingControlAmount"
                                        label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column
                                        label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                    </el-collapse-item>
                    <!-- 资格预审结果 -->
                    <el-collapse-item title="资格预审结果" name="2">
                        <div class="choose">
                            <el-radio-group v-model="examinationResult" size="small" @change="changeRadio()">
                                <el-radio label="">全部</el-radio>
                                <el-radio label="通过">资审通过</el-radio>
                                <el-radio label="不通过">资审不通过</el-radio>
                            </el-radio-group>
                        </div>
                        <el-table :data="reasultData" stripe style="width: 100%">
                            <el-table-column label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column  prop="companyName" :show-overflow-tooltip ="true"  label="单位名称">
                            </el-table-column>
                            <el-table-column prop="projectLeader" :show-overflow-tooltip ="true" label="项目负责人">
                            </el-table-column>
                            <el-table-column prop="examinationResult" :show-overflow-tooltip ="true" label="审查结果">
                            </el-table-column>
                            <el-table-column prop="reason" label="原因">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 相关附件 -->
                    <el-collapse-item title="相关附件" name="3">
                        <el-table :data="enclosureData" stripe style="width: 100%">
                            <el-table-column  prop="index"  label="附件名称">
                            </el-table-column>
                            <el-table-column  prop="number"  label="附件列表">
                            </el-table-column>
                            <el-table-column  label="管理">
                                <i class="el-icon-setting"  style="cursor: pointer;" @click="managementInfo()"></i>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="4">
                        <div>
                            <el-table :data="handleRecordData" stripe style="width: 100%">
                                <el-table-column prop="step" label="步骤"  width="180">
                                </el-table-column>
                                <el-table-column  prop="userName" :show-overflow-tooltip ="true" label="办理人员" width="180">
                                </el-table-column>
                                <el-table-column prop="creationTime" :show-overflow-tooltip ="true" label="时间">
                                </el-table-column>
                                <el-table-column prop="state" :show-overflow-tooltip ="true" label="状态">
                                </el-table-column>
                                <el-table-column prop="remarks" label="备注">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        radio:'',
        nameOfTenderProject:'',//招标项目名称
        totalProjectId:'',//入场项目编号
        tableData:[],//数据列表
        currentPage:1,//当前页
        PageSize: 20, //每页条数
        pageTotal: 0, //总页数
        totalSize: 0, //总条数
        chooseSubShow:false,//挑选分包弹框
        chooseSubData:[],//挑选分包数据
        show:false,//上一步弹框
        activeName:['1','2'],
        activeName1:['1','2','3','4'],
        nameOfPurchaser:'',//招标采购人
        budgetAmount:'',//招标项目预算金额
        biddingProjectNumber:'',//招标项目编号
        amountId:'',//入场项目编号
        subpackageData:[],//分包数据
        examinationResult:'',//是否通过
        reasultData:[],//资审结果数据
        nextShow:true,//下一步弹框
        enclosureData:[],//附件
        handleRecordData:[],//办理记录
    }
  },
  watch:{},
  computed:{},
  methods:{
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 20 + 1;
        },
        //分页
        page(val) {
            this.currentPage = val;
        },
        //新增资审结果按钮
        newManage(){
            this.chooseSubShow = true;
        },
        //选择++++按钮
        chooseFile(){
            this.show = true;
        },
        //下一步按钮
        nextTo(){
            this.nextShow = true;
            this.show = false;
        },
        //上一步弹框
        backTo(){
            this.nextShow = false;
            this.show = true;
        },
        closeSubShow(){
            this.chooseSubShow = false;
            this.show = false;
            this.nextShow = false;
        },
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
}
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 0 3px;
}
.head_l {
  padding: 2px 6px;
  background-color: #0095d5;
  color: #ffffff;
  cursor: pointer;
}
.head_bottom {
  width: 100%;
  text-align: center;
  margin: 1% 0;
  background: #f5f7fa;
}
.head_b_b > .el-input {
  width: 20% !important;
  height: 35px !important;
}
.btn {
  margin-left: 2%;
  padding: 8px 14px;
  background: #0095d5;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.mask,.mask1{
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #333;
  opacity: 0.3;
  overflow: hidden;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  background-color: rgb(0, 0, 0);
  filter: alpha(opacity=60);
  background-color: rgba(0, 0, 0, 0.6);
}
.mask{
   z-index: 2;
}
.mask1{
  z-index: 4;
}
/* 新建项目 */
.new_pro {
  z-index: 3;
  background: #f0f4f6;
  width: 98%;
  height: 98%;
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate(-9%, -10%);
  overflow-y: hidden;
}
.new_pro_top{
  z-index: 5;
}
.new_head {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #0058a9;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
.nav_co {
  padding: 8px 20px;
  background-color: #0095d5;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
}
/* 查看 */
.new_main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
}
.new_m_one {
    width: 100%;
}

.new_m_t {
  width: 98%;
  height: 40px;
  line-height: 40px;
  background: #d1d1d1;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
   padding:0 10px;
}
.new_m_b{
    width: 100%;
    height: auto;
    padding-bottom: 10px;
    background: #ffffff;
}
.new_m_b2{
  width: 90%;
  margin:0 auto;
}
.noteBox {
  height: 40px;
  line-height: 40px;
  color: #333;
}
.noteBox .noteContent {
		display: flex;
		width: 100%;
}
	
.noteContent .noteLeft {
  display: inline-block;
}

.noteContent .noteFlex {
  flex: 1;
  flex-direction: column;
  display: inline-block;
}
.new_m_two{
  margin:10px 0;
}
.fail_box{
  width:100%;
  margin:0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px dashed #333;
}
.top_box{
    width: 85%;
    height:99%;
    margin: 0 auto;
    overflow: scroll;
}
.editItem{
    width: 100%;
    display: flex;
    align-items:center;
}
.editCenter{
    flex: 1;
    display: flex;
    align-items: center;
    padding: 5px 0;
}
.editName{
    width: 145px;
    line-height: 40px;
    display: flex;
    justify-content: flex-end;
}
.star{
    color: #f00;
}
.editContent{
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #6e622e;
}
.editContent>p{
    width: 30%;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.editMain{
    flex:1;
        padding: 5px 0;
    display: flex;
    justify-content: space-between;
}
.mainItem{
    flex:1;
    margin:0 0 0 5px;
    display: flex;
    flex-direction: column;
}
.item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #E1E1E1;
    padding: 0 5px;
}
.itemBox{
    width: 100%;
    height:auto;
}
.itemBox>table{
    border-collapse: collapse;
    word-break: break-all;
}
.itemBox>tr{
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}
.GridTitle.Room{
    width: 11%;
}
.GridTitle{
    background-color: #009EE0;
    border: 1px solid;
    border-color: White;
    color: #FFF;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    font-family: 微软雅黑;
}
.GridContent{
    text-align: center;
    background-color: #E5F5FC;
    border: 2px solid;
    border-color: White;
}
.editTit{
    display: flex;
}
.fb_box{
    width: 95%;
    height: 95%;
    z-index: 20;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background:#f0f4f6;
    overflow: hidden;
}
.sureSelect{
    position: fixed;
    bottom: 5%;
    left:50%;
}
.certificateWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.certificateBox{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.certificate_main{
    flex:1;
    overflow: hidden;
    overflow-y: scroll;
}
.lookBox,.winBox,.searchBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
    overflow: hidden;
    overflow-y: scroll;
}
.look_title,.win_title,.search_title,.certificate_title{
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
.choose{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding:  0 20px;
}
</style>