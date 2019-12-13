<template>
    <!-- 资审结果通知书 -->
    <div class="newBox">
        <div class="wrapper">
            <div class="box">
                <div></div>
                <el-radio-group v-model="radio" size="small" @change="changeRadio">
                    <el-radio label="全部">全部</el-radio>
                    <el-radio label="未发出">未发出</el-radio>
                    <el-radio label="已发出">已发出</el-radio>
                </el-radio-group> 
            </div>
             <!-- 搜索的输入框 -->
            <div class="editItem">
                <div class="editCenter">
                    <div class="editName">招标项目(分包)名称：</div>
                    <div class="editContent">
                        <el-input v-model="nameOfTenderProject" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                    </div>
                </div>
                <div class="editCenter">
                    <div class="editName">入场项目(分包)编号：</div>
                    <div class="editContent">
                        <el-input v-model="totalProjectId" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                     </div>
                </div>
                <div class="editBtn">
                    <button class="btn" @click="searchList">搜索</button>
                </div>
            </div>
            <div class="main_info">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="totalProjectId" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="150">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="招标项目名称" width="120">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="nameOfPurchaser" :show-overflow-tooltip ="true" label="回复情况">
                        <template slot-scope="scope">
                            <i class="el-icon-search" style="cursor:pointer;" @click="replySituation"></i>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                            <i class="el-icon-setting" style="cursor:pointer;" @click="handleInfo"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
             <!-- 分页器 -->
            <div class="pagination">
                <template>
                    <Page :total="totalSize" :current="PageNum" :page-size='20' show-elevator @on-change="page" v-if="pageTotal>1"></Page>
                </template>
            </div>
        </div>
        <!-- 查看邀请反馈情况 -->
        <div class="inviteWrapper" v-show="inviteFlag">
            <div class="inviteBox">
                <div class="invite_title">
                    <p>查看邀请反馈情况</p>
                    <i class="el-icon-close" @click="closeInvite"></i>
                </div>
                <div class="main_info">
                    <el-table :data="inviteData" stripe style="width: 100%">
                        <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="totalProjectId" :show-overflow-tooltip ="true" label="单位名称">
                        </el-table-column>
                        <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="联系人">
                        </el-table-column>
                        <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="是否通过审核">
                        </el-table-column>
                        <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="通知书发出状态">
                        </el-table-column>
                        <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="是否参加">
                        </el-table-column>
                        <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="项目负责人">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 资审结果通知书 -->
        <div class="resultWrapper" v-show="resultFlag">
            <div class="resultBox">
                <div class="result_title">
                    <p>资审结果通知书</p>
                    <i class="el-icon-close" @click="closeResult"></i>
                </div>
                <div class="main_info">
                    <div class="boxTitle">
                        <button class="btn">保存</button>
                        <button class="btn">确认通知完毕</button>
                    </div>
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
                                        <div class="editContent">{{nameOfPurchaser}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标项目金额(万元)：</div>
                                        <div class="editContent">{{amountOfBiddingProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProId}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--通知书信息 -->
                        <el-collapse-item title="通知书信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editTit"><p class="star">*</p>招标文件发售时间：</div>
                                        <div class="editContent">
                                            <!-- <el-date-picker
                                                placeholder="起始日期"
                                                v-model="saleReceiveStartDate"
                                            >
                                            </el-date-picker>
                                            <p>至</p>
                                            <el-date-picker
                                                placeholder="结束日期"
                                                v-model="saleReceiveEndDate"
                                            >
                                            </el-date-picker> -->
                                            <el-date-picker v-model="collectTime" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editTit">上午：</div>
                                        <div class="editContent">
                                            <el-time-select
                                                placeholder="开始时间"
                                                v-model="morningbegin"
                                                :picker-options="{
                                                    start: '08:00',
                                                    step: '00:30',
                                                    end: '17:30'
                                                }">
                                            </el-time-select>
                                            <span>-</span>
                                            <el-time-select
                                                placeholder="结束时间"
                                                v-model="morningend"
                                                :picker-options="{
                                                    start: '08:00',
                                                    step: '00:30',
                                                    end: '17:30'
                                                }">
                                            </el-time-select>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editTit">下午：</div>
                                        <div class="editContent">
                                            <el-time-select
                                                placeholder="开始时间"
                                                v-model="afterbegin"
                                                :picker-options="{
                                                    start: '08:00',
                                                    step: '00:30',
                                                    end: '17:30'
                                                }">
                                            </el-time-select>
                                            <span>-</span>
                                            <el-time-select
                                                placeholder="结束时间"
                                                v-model="afterend"
                                                :picker-options="{
                                                    start: '08:00',
                                                    step: '00:30',
                                                    end: '17:30'
                                                }">
                                            </el-time-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标文件发售地点：</div>
                                        <div class="editContent">
                                        <el-input v-model="tenderDocumentsSaleSite" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>招标文件工本费：</div>
                                        <div class="editContent">
                                            <p>人民币</p>
                                            <el-input v-model="tenderDocumentsCost" clearable></el-input>
                                            <p>元</p>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">招标文件工本费接收账户：</div>
                                        <div class="editContent">
                                            <el-input v-model="costAcceptAccount" type="textarea" clearable></el-input>
                                        </div>
                                        <!-- <el-button plain>设置账户</el-button> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">递交投标文件截止时间：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                v-model="value1"
                                                type="datetime"
                                                placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"></div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">递交投标文件地点：</div>
                                        <div class="editContent">
                                            <el-input v-model="costAcceptAccount" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">
                                            <el-input v-model="costAcceptAccount" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">
                                            <el-input v-model="costAcceptAccount" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">
                                            <el-input v-model="remark" type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--资审通过通知书 -->
                        <el-collapse-item title="资审通过通知书" name="3">
                            <div style="height:40px;">
                                <button class="btn" @click="sendNotice">发送通知书</button>
                            </div>
                            <div class="star">注：对任一单位的资审通过通知书/资审结果通知书签章后，会自动对其他单位的资审通过通知书/资审结果通知书进行自动批量签章。</div>
                            <el-table :data="passBookData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55" align='center'>
                                </el-table-column>
                                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                </el-table-column>
                                <el-table-column  prop="unitName" :show-overflow-tooltip ="true"  label="单位名称">
                                </el-table-column>
                                <el-table-column  prop="noticeIssueUnitName"  :show-overflow-tooltip ="true" label="项目负责人">
                                </el-table-column>
                                <el-table-column  prop="issueTime" :show-overflow-tooltip ="true" label="发出时间">
                                </el-table-column>
                                <el-table-column  prop="auditResults" :show-overflow-tooltip ="true"  label="资审结果">
                                </el-table-column>
                                <el-table-column label="通知书状态">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.noticeStatus}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!--资审结果通知书 -->
                        <el-collapse-item title="资审结果通知书" name="4">
                            <div style="height:40px;">
                                <button class="btn" @click="sendNotice">发送通知书</button>
                            </div>
                            <el-table :data="auditResultData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55" align='center'>
                                </el-table-column>
                                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                </el-table-column>
                                <el-table-column  prop="unitName" :show-overflow-tooltip ="true"  label="单位名称">
                                </el-table-column>
                                <el-table-column  prop="noticeIssueUnitName" :show-overflow-tooltip ="true"  label="项目负责人">
                                </el-table-column>
                                <el-table-column  prop="issueTime" :show-overflow-tooltip ="true"  label="发出时间">
                                </el-table-column>
                                <el-table-column  prop="auditResults" :show-overflow-tooltip ="true"  label="资审结果">
                                </el-table-column>
                                <el-table-column label="通知书状态" >
                                    <template slot-scope="scope">
                                        <span>{{scope.row.noticeStatus}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../assets/css/style.css'
export default {
  components:{},
  props:{},
  data(){
    return {
        electronicBidEvaluation:'',//电子化开评标
        qualificationExaminationMethod:'',//资格审查方式
        subcontractingControlAmount:'',//分包控制金额
        scopeOfTender:'',//招标范围
        subcontractContents:'',//分包内容
        subcontractName:'',//分包名称
        entrySubcontractNumber:"",//入场项目分包编号
        totalProId:'',//入场项目编号
        radio:'',
        nameOfTenderProject:'',//招标项目名称
        totalProjectId:'',//入场项目分包编号
        PageNum:1,//当前页
        PageSize: 20, //每页条数
        pageTotal: 0, //总页数
        totalSize: 0, //总条数
        tableData:[
            {
                totalProjectId: '2016-05-02',
                nameOfTenderProject: '王小虎',
                biddingProjectNumber: '上海市普陀',
                nameOfPurchaser:'分类',
                state:'未通过',
                biddingProcurementMode:'未发布',
                biddingProcurementMode:'2019年3月1日'
            }
        ],//列表数据
        inviteFlag:false,
        resultFlag:false,
        inviteData:[],//邀请反馈情况数据
        sendFileShow:false,//发出通知书
        activeName:['1','2','3','4'],
        nameOfPurchaser:'',//招标采购人
        amountOfBiddingProject:'',//招标项目金额
        biddingProjectNumber:'',//招标项目编号
        totalProId:'',//入场项目编号
        enclosureData:[],//分包数据
        tenderTime:'',//招标文件发售时间
        morningbegin:'',//上午上
        morningend:'',//上午下
        afterbegin:"",//下午上
        afterend:'',//下午下
        venueBiddingDocuments:'',//招标文件发售地点
        costBiddingDocuments:'',//文件工本费
        costBiddingDocumentsAccount:'',//工本费接收账户
        submissionDocumentsEndTime:'',//递交文件截止时间
        submissionTenderDocuments:'',//递交投标文件地点
        projectLeader:'',//项目负责人
        contactInformation:'',//联系方式
        remarks:'',//备注
        passBookData:[],//资审通过通知书数据列表
        auditResultData:[],//资审结果通知书数据列表
        subcontractInforShow:true,//分包信息弹框
    }
  },
  watch:{},
  computed:{},
  methods:{
        //编号问题
        typeIndex(index) {
            return index + (this.PageNum - 1) * 20 + 1;
        },
        // 单选框查询项目分包列表 
		changeRadio(){
			
        },
        // 搜索
        searchList(){

        },
        //分页
        page(val) {
            this.PageNum = val;
        },
        // 回复情况
        replySituation(){
            this.inviteFlag = true;// 查看邀请反馈情况
        },
        closeInvite(){
            this.inviteFlag = false;// 查看邀请反馈情况
        },
        // 操作
        handleInfo(){
            this.resultFlag = true;
        },
        closeResult(){
            this.resultFlag = false;
        },
        handleSelectionChange(){

        },
        // 发出通知书
        sendNotice(){

        },
        
  },
  created(){},
  mounted(){}
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
.inviteWrapper,.resultWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.inviteBox,.resultBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.invite_title,.result_title{
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
.box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 0;
    background: #e2e2e2;
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
.main_info{
     width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}

.boxTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px 0 0;
    background: #e2e2e2;
}
.editTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px 0 0;
}
.el-collapse{
    width: 80%;
    margin: 10px auto;
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
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.el-pagination__editor.el-input {
    width: 50px!important;
}
.editBtn{
    height: 35px;
}
.editTit{
    display: flex;
}
.star{
    color: #f00;
}
</style>