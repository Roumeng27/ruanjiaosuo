<template>
<!-- 采购询疑答复 -->
    <div class="newBox">
        <div v-show="passJudgeShow" style="height:100%;overflow:hidden;">
            <!-- 主页面 -->
            <div class="initWrapper">
                <!-- 搜索的输入框 -->
                <!-- <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">招标项目(分包)名称：</div>
                        <div class="editContent">
                            <el-input v-model="nameItem" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">入场项目(分包)编号：</div>
                        <div class="editContent">
                            <el-input v-model="numberItem" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                        </div>
                    </div>
                    <div class="editBtn">
                        <button class="btn" @click="searchList()">搜索</button>
                    </div>
                </div> -->
                <div class="main_info">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="projcetNumber" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="180">
                        </el-table-column>
                        <el-table-column prop="projcetName" :show-overflow-tooltip ="true" label="采购项目名称" width="180">
                        </el-table-column>
                        <el-table-column prop="subcontractName" :show-overflow-tooltip ="true" label="分包名称">
                        </el-table-column>
                        <el-table-column prop="bidProjectsType" :show-overflow-tooltip ="true" label="服务分类">
                        </el-table-column>
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <i class="el-icon-edit" style="cursor:pointer;"  @click="lookItem(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination" v-if="this.pages>1">
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
            <!-- 详情 -->
            <div class="wrapper" v-show="writeFlag">
                <div class="wrapperBox">
                    <div class="wrapper_title">
                        <p>查看</p>
                        <i class="el-icon-close" style="cursor:pointer;"  @click="closeWrite"></i>
                    </div>
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">提问时间：</div>
                            <div class="editContent">
                                <el-date-picker 
                                    v-model="startTime" 
                                    type="datetime" 
                                    placeholder="开始时间" 
                                    align="right" 
                                    value-format="timestamp" 
                                    @keyup.enter.native="searchTimeList"
                                >
                                </el-date-picker>
                            </div>-
                            <div class="editContent">
                                <el-date-picker 
                                    v-model="endTime" 
                                    type="datetime" 
                                    placeholder="结束时间" 
                                    align="right" 
                                    value-format="timestamp" 
                                    @keyup.enter.native="searchTimeList"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="editBtn">
                            <button class="btn" @click="searchTimeList()">搜索</button>
                        </div>
                    </div>
                    <div class="main_info">
                        <el-table :data="timesData" stripe style="width: 100%">
                            <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                            </el-table-column>
                            <el-table-column prop="problemDescription" :show-overflow-tooltip ="true" label="问题描述" maxlength="120">
                            </el-table-column>
                            <el-table-column prop="questionTime" :show-overflow-tooltip ="true" label="提问时间" >
                            </el-table-column>
                            <el-table-column label="是否回复" >
                                <template slot-scope="scope">
                                    <div>{{scope.row.replyId != null? '已回复' :'未回复'}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="isRead" label="是否已读" >
                            </el-table-column>
                            <el-table-column prop="operation" label="操作">
                                <template slot-scope="scope">
                                    <i class="el-icon-search" style="cursor:pointer;"  @click="lookTimeItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <!--查看问题详情  -->
            <div class="uploadWrapper" v-show="lookFlag">
                <div class="uploadWrapperBox">
                    <div class="uploadWrapper_title">
                        <p>查看问题</p>
                        <i class="el-icon-close" style="cursor:pointer;"  @click="handleClose"></i>
                    </div>
                    <div class="box"  v-show="sureFlag">
                        <button class="btn" @click="sure_question()">确认</button>
                    </div>
                    <div class="main_info" style="padding:20px;">
                        <el-collapse v-model="activeName" accordion>
                            <!--采购项目信息 -->
                            <el-collapse-item title="采购项目信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购项目名称：</div>
                                            <div class="editContent">{{nameOfTenderProject}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人：</div>
                                            <div class="editContent">{{tenderPurchaserName}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目编号：</div>
                                            <div class="editContent">{{amountId}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!--提问信息 -->
                            <el-collapse-item title="提问信息" name="2">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">问题描述：</div>
                                            <div class="editContent">{{problemDescription}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">供应商：</div>
                                            <div class="editContent">{{companyName}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">联系人姓名：</div>
                                            <div class="editContent">{{questionPersonName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系电话：</div>
                                            <div class="editContent">{{questionPersonPhone}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">手机：</div>
                                            <div class="editContent">{{questionPersonTelephone}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">提问时间：</div>
                                            <div class="editContent">{{questionTime}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!--答复内容 -->
                            <el-collapse-item title="答复内容" name="3">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">项目(分包)名称：</div>
                                            <div class="editContent">{{subcontractName == null ? nameOfTenderProject : subcontractName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">项目(分包)编号：</div>
                                            <div class="editContent">{{entrySubcontractNumber == null ? amountId : entrySubcontractNumber}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span style="color:#f00;">*</span>回复：</div>
                                            <div class="editContent" v-show="look_edit_show">
                                                <el-input type="textarea" id="focus1"  v-model="replyContent" :rows="3"></el-input>
                                            </div>
                                            <div class="editContent" v-show="!look_edit_show">
                                                <span>{{replyContent}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">是否已读：</div>
                                            <div class="editContent">{{isRead}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="系统提示"
            :visible.sync="frameShow"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>{{alertMsg}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import baseUrl from '../../../api/api'
import dayjs from "dayjs"
import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkPhone,checkEmail,dubRemove,checkNumber} from '../../../api/base.js'
export default {
  data(){
    return {
        look_edit_show:true,
        passJudgeShow:true,
        alertMsg:'',
        frameShow:false,
        str_entrust_type:window.sessionStorage.str_entrust_type,
        biddingPurchasingAgencyName:'',
        role_types:window.localStorage.role_types,
        subcontractName:'',//分包名称
        entrySubcontractNumber:'',//分包编号
        questionPersonName:'',//提问人姓名
        questionPersonPhone:'',//提问人电话
        questionPersonTelephone:'',//提问人电话
        isRead:'',// 是否已读
        activeName:['1','2','3'],
        nameOfTenderProject:'',//采购项目名称
        tenderPurchaserName:"",//采购人
        amountId:'',//入场项目编号
        biddingProjectNumber:'',//招标项目编号
        nameItem:'',//头部名称
        projectObj:JSON.parse(window.localStorage.projectObj),
        numberItem:"",//头部编号
        tableData:[],//表格数据
         // 分页器
        currentPage:1,// 当前页
        pageSize: 10, // 每页条数
        pageTotal: 0, //总页数
        total: 0, //总条数
        pages:0,//后端返回的页数
        writeFlag:false,//详情
        timesData:[],//时间表格
        lookFlag:false,//查看问题描述详情
        projcetNumber:'',
        startTime:"",//开始时间
        endTime:'',//结束时间
        problemDescription:'',//问题描述
        replyContent:'',//回复
        suspectedReplyId:'',//主键id
        questionTime:'',//提问时间
        companyName:'',//单位名称
        sureFlag:false,// 判断确认是否展示
    }
  },
  methods:{
        // 招标项目信息
        getbiddingInfo(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
					this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
					this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
					this.biddingOrganization = res.data.data.biddingOrganization;// 招标组织方式
					this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
					this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
					this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
					this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                }else{  
                    this.$message.warning(res.data.msg);;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //招标项目信息--》表格分包
        getsubList(){
            let lookArr = [];
            lookArr.push(this.projectObj.totalProjectId);
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:lookArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.subcontractName = res.data.data[0].subcontractName;
                    this.entrySubcontractNumber = res.data.data[0].entrySubcontractNumber;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 分页器
		handleSizeChange(val) {
			// 每页条数
		},
		handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getList(); // 项目入场登记列表
        },
        //编号问题
		typeIndex(index) {
			return index + (this.currentPage - 1) * 10 + 1;
        },
        //头部搜索
        // searchList(){
        //     this.$axios({
        //         method:'POST',
        //         url:baseUrl + '/answerNoticeController/selectAnswerNoticeList',
        //         data:{
        //             pageSize:this.pageSize,
        //             pageNo:this.currentPage,
        //             projcetNumber:this.numberItem,
        //             projcetName:this.nameItem,
        //             itemNumber:this.projectObj.totalProjectId
        //         }
        //     }).then(res=>{
        //         if(res.data.status == 200){
        //             this.tableData = res.data.data.list;
		// 			this.total = res.data.data.total;// 总条数
		// 			this.pages = res.data.data.pages;
        //         }
        //     }).catch(err=>{
        //         console.log(err)
        //     })
        // },
        //首页数据列表
        getList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/answerNoticeController/selectAnswerNoticeList',
                data:{
                    pageSize:this.pageSize,
                    pageNo:this.currentPage,
                    itemNumber:this.projectObj.totalProjectId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data.list;
					this.total = res.data.data.total;// 总条数
					this.pages = res.data.data.pages;
                }else{
                     this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查看详情
        lookItem(row){
            this.projcetNumber = row.projcetNumber;
            if(row.projcetNumber != null){
                this.getDetailList();
            }
            this.writeFlag = true;
        },//详情列表
        getDetailList(){
            let obj = {};
            if(this.projcetNumber.indexOf('-') != -1){
                obj = {
                    pageSize:this.pageSize,
                    pageNo:this.currentPage,
                    entrySubcontractNumber:this.projcetNumber
                }
            }else{
                obj = {
                    pageSize:this.pageSize,
                    pageNo:this.currentPage,
                    projectCode:this.projcetNumber
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/suspectedReplyController/queryList',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.timesData = res.data.data.list;
                    res.data.data.list.map((item,index)=>{
                        item.questionTime = dayjs(item.questionTime).format('YYYY-MM-DD HH:mm:ss');
                    })
					this.total = res.data.data.total;// 总条数
					this.pages = res.data.data.pages;
                }else{
                     this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //时间搜索
        searchTimeList(){
            if(this.startTime == ""){
                this.startTime = null
            }else if(this.endTime == ""){
                this.endTime = null
            }
            let obj = {};
            if(this.projcetNumber.indexOf('-') != -1){
                obj = {
                    pageSize:this.pageSize,
                    pageNo:this.currentPage,
                    entrySubcontractNumber:this.projcetNumber,
                    startTime:this.startTime,
                    endTime:this.endTime
                }
            }else{
                obj = {
                    pageSize:this.pageSize,
                    pageNo:this.currentPage,
                    projectCode:this.projcetNumber,
                    startTime:this.startTime,
                    endTime:this.endTime
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/suspectedReplyController/queryList',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.timesData = res.data.data.list;
                    res.data.data.list.map((item,index)=>{
                        item.questionTime = dayjs(item.questionTime).format('YYYY-MM-DD HH:mm:ss');
                    })
					this.total = res.data.data.total;// 总条数
					this.pages = res.data.data.pages;
                }else{
                     this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查看时间详情
        lookTimeItem(row){
            this.problemDescription = row.problemDescription;
            this.suspectedReplyId = row.suspectedReplyId;
            this.questionTime = row.questionTime;
            this.replyContent = row.replyContent;
            this.getbiddingInfo();// 招标项目信息
            this.getsubList();//招标项目信息--》表格分包
            this.getTimeDetail();//查看弹框详情
            this.lookFlag = true;
        },
        //查看弹框详情
        getTimeDetail(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/suspectedReplyController/selectById',
                data:{
                    suspectedReplyId:this.suspectedReplyId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    res.data.data.list.map((item,index)=>{
                        this.problemDescription = item.problemDescription;
                        this.companyName = item.companyName;
                        this.questionPersonName = item.questionPersonName;
                        if(item.questionTime == null){
                            this.questionTime = ""
                        }else{
                            this.questionTime = dayjs(item.questionTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.questionPersonTelephone = item.questionPersonTelephone;
                        this.replyContent = item.replyContent;
                        this.questionPersonPhone = item.questionPersonPhone;
                        this.isRead = item.isRead;// 是否已读
                        if(item.replyId != null ){
                            this.sureFlag = false;
                        }else{
                            this.sureFlag = true;
                        }
                    })
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //点击确认回复
        sure_question(){
            if(!this.replyContent){
                $('#focus1').focus();
                this.$message.warning('请输入回复字段!');
                return false;
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/suspectedReplyController/reply',
                data:{
                    suspectedReplyId:this.suspectedReplyId,
                    replyContent:this.replyContent,
                     isRead:'未读'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.getDetailList();
                    this.lookFlag = false;
                }else{
                     this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getDecideList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/interfaceTableController/selfTendering',
                data:{
                    dropDownBox:'自行招标',
                    projectEntrySubcontractNumbers:this.projectObj.totalProjectId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    if(window.sessionStorage.str_entrust_type != '委托角色' && this.role_types != '招标(采购)代理'){
                        this.look_edit_show = false;
                        this.sureFlag = false;
                    }else{
                        let obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '询疑答复'){
                                obj.houxuanren = item
                            }
                            if(item.value == '采购文件'){
                                obj.ruchang = item
                            }
                        })
                        //采购勾且本业勾，可以看，
                        if(obj.zhaobiao.state == '办理通过' && obj.houxuanren.state == '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        //如果上一步打钩，进一步判断
                        }else if(obj.ruchang.state == '办理通过' ){
                            //如果采购打钩，则本业必须打勾
                            if(obj.zhaobiao.state == '办理通过'&& obj.houxuanren.state == '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                                //如果采购不打勾
                            }else if(obj.zhaobiao.state != '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                            }else{
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未完成采购文件,无法进行询疑答复!'
                                }
                            }
                        }else{
                            //其他的都不能看
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成采购文件,无法进行询疑答复!'
                            }
                        } 
                    }
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        }, 
        closeWrite(){
            this.writeFlag = false;
        },
        handleClose(){
            this.lookFlag = false;
            this.frameShow = false;
        }
  },
  created(){
      this.getList();
      this.getDecideList();
  },
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
.initWrapper{
	width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.wrapper,.nextWrapper{
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
.pickWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 80px 300px;
    display: flex;
    flex-direction: column;
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
.boxBtn{
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
/* 输入搜索框 */
.pick_input{
    width: 100%;
    padding: 0 30px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.noteItem{
    display: flex;
    align-items: center;
}
.noteItem p{
    padding:  0 5px;
}
.noteLeft{
    width: 130px;
    display: flex;
    justify-content: flex-end;
}
.write_input{
    width: 200px;
}
.write_input>.el-select{
    width: 250px;
}
.owner_btn{
    height: 35px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.pagination {
  width: 100%;
  padding: 20px 60px ;
  display: flex;
  justify-content: flex-end;
}
.main_info{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.uploadWrapper{
	width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
	position: fixed;
	left: 0;
	top:0;
	bottom: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
}
.wrapperBox,.nextWrapperBox{
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.uploadWrapperBox{
	width: 99%;
    height:100%;
    background: #fff;
    display: flex;
    flex-direction: column;
	position: relative;
}
.pickBox{
	width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.pick_main{
	 width: 100%;
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
}
.pick_btn {
    position: absolute;
    left: 0;
    top: 400px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 120px;
    height: 40px;
}
/* 标题 */
.wrapper_title,.nextWrapper_title,.uploadWrapper_title,.pick_title{
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
.el-icon-close{
    font-size: 24px; 
    cursor: pointer;
}
/* 按钮 */
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px 0 2px;
}
.upload_box{
	width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
.editContent>.el-select{
	width: 100% !important;
}
.editContent>.el-cascader{
	width: 100% !important;
}
.editContent>p{
    width: 30%;
}
.editBtn{
	height: 35px;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.contentBox{
	flex: 1;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	flex-wrap: wrap;
}
.contentArea{
	width: 100%;
	display: flex;
	margin-bottom: 10px;
}
.contentItem{
	flex:1;
	display: flex;
	align-items: center;
}
.contentItem>span{
	display: flex;
	width: 32%;
	justify-content: flex-end;
}
.contentItem>p{
	width: 10%;
	padding: 0 5px;
}
.star{
	color: #f00;
}
/* 弹窗 */

/* .dialog_header{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.dialog_header p span{
    color: red;
}
.item_title{
	line-height: 30px;
	font-weight: bold;
	padding: 0 10px;
}
.el-icon-plus{
	font-size: 26px;
} */
.file_btn{
    position: absolute;
    right: 95px;
    top:35px;
    display: inline-block;
    width: 59px;
    height: 40px;
    border:none;
    outline: none;
	background-color: transparent;
	filter: alpha(opacity=0);
	-moz-opacity: 0;
	-khtml-opacity: 0;
    opacity: 0;
    background: #0095d5;
    cursor: pointer;
}
.el-table th>.cell{
	text-align: center !important;
}
.upload:hover{
    text-decoration: underline;
    color:#f00;
    cursor: pointer;
}
.liItem{
    cursor: pointer;
}
.liItem:hover{
	color: #f00;
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
.item_title{
    line-height: 30px;
    font-weight: bold;
    padding: 0 10px;
}
.el-icon-plus{
    font-size: 26px;
}
</style>