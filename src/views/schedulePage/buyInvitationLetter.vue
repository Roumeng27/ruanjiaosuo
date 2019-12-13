<template>
    <!-- 邀请函 -->
    <div class="newBox">
        <div class="backlogWrapper">
            <div class="backlogBox">
                 <div class="pageTitle">
                    <p>查看{{businessLinks}}</p>
                    <i class="el-icon-close" @click="closePage"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="agreeInfo">同意</button>
                    <button class="btn" @click="disAgree">不同意</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 采购项目信息 -->
                        <el-collapse-item title="采购项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">地址：</div>
                                        <div class="editContent">{{address}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{contactInformation}}</div>
                                    </div>
                                </div>
                                <div v-if="biddingOrganization == '委托招标'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">地址：</div>
                                            <div class="editContent">
                                                <span>{{agentAddress}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem" >
                                        <div class="editTextarea">
                                            <div class="editName">联系方式：</div>
                                            <div class="editContent">
                                                <span>{{agentPhone}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 邀请函信息 -->
                        <el-collapse-item title="邀请函信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业资质要求：</div>
                                        <div class="editContent">{{enterpriseQualification}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人资质要求：</div>
                                        <div class="editContent">{{qualificationProjectLeader}}</div>
                                    </div>
                                </div>
                                <div  class="noteBox" style="height:auto !important;">
                                    <div class="noteContent">
                                        <div class="noteLeft">其他资格要求：</div>
                                        <div class="noteFlex">
                                            <span style="color:#6e622e;height:200px;">
                                                {{otherQualifications}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购文件发售时间：</div>
                                        <div class="editContent">
                                            {{saleTenderDocumentsStartTime}}到{{saleTenderDocumentsEndTime}} 上午{{morningbegin}}到{{morningend}}，下午{{afterbegin}}到{{afterend}}
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购文件发售地点：</div>
                                        <div class="editContent">{{venueBiddingDocuments}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购文件工本费(元)：</div>
                                        <div class="editContent">{{costBiddingDocuments}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:160px !important;">采购文件工本费接收账户：</div>
                                        <div class="editContent">{{costBiddingDocumentsAccount}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">投标人需提交资料：</div>
                                        <div class="editContent">{{biddersRequiredSubmitInformation}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{contactMode}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">{{remarks}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="办理记录" name="3">
                            <div class="edit_list">
                                <el-table :data="manageDate" stripe style="width: 100%">
                                    <el-table-column prop="step" label="步骤"  width="180">
                                    </el-table-column>
                                    <el-table-column  prop="userName" label="办理人员" width="180">
                                    </el-table-column>
                                    <el-table-column prop="creationTime" label="时间">
                                    </el-table-column>
                                    <el-table-column prop="state" label="状态">
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
        <el-dialog title="请输入意见" :visible.sync="agreeFlag" width="50%" :before-close="agreeSure">
            <div class="box">
                <button class="btn" @click="agreeSubmit">确认提交</button>
                <button class="btn" @click="agreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="infoRemark" :rows="6" ></el-input>
            </div>
        </el-dialog>
        <el-dialog title="请输入意见" :visible.sync="disAgreeFlag" width="50%" :before-close="disAgreeSure">
            <div class="box">
                <button class="btn" @click="disAgreeBack">确认退回</button>
                <button class="btn" @click="disAgreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="infoRemark" :rows="6" ></el-input>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import baseUrl from '../../api/api'
    import dayjs from "dayjs"
    import '../../assets/css/style.css'
    import {dubRemove} from '../../api/base.js'
    export default {
        data(){
            return {
                agentPhone:'',
                agentAddress:'',
                biddingPurchasingAgencyName:'',
                biddingOrganization:'',
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6'],
                // 文件查询
                fileData:[],
                // 弹窗所需字段
                agreeFlag:false,// 同意
                disAgreeFlag:false,// 不同意
                infoRemark:'',// 备注
                // 办理记录所需字段
                manageDate:[],
                creationTime:'',// 时间
                // 路由接收参数
                referenceId:'',// 关联ID
                toDoListId:'',// 待办事项id
                auditStatus:'',// 审核状态
                businessLinks:'',// 待办名称
                totalItemId:'',// 总包keyID
                entrySubcontractNumber:'',// 入场项目项目分包编号
                totalProjectNumber:'',// 总包编号
                subItemId:'',// 分包keyID
                 // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                tenderPurchaserName:'',// 招标(采购)人
                budgetAmount:'',// 招标项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',// 招标采购方式
                biddingOrganization:'',// 招标组织方式
                typesOfBiddingProjects:'',// 招标项目类型
                // 投标邀请书所需字段
                address:'',//地址
                contactInformation:'',//联系方式
                certificateBox:[],//企业资质表
                companyInfo:[],
                leaderBox:[],//项目负责人资质表
                leaderInfo:[],
                enterpriseQualification:'',//企业资质要求
                qualificationProjectLeader:'',//项目负责人资质要求
                otherQualifications:'',// 其他资格要求
                saleTenderDocumentsStartTime:'',//招标文件开始时间
                saleTenderDocumentsEndTime:'',//招标文件结束时间
                saleTimeMorning:'',//大上午
                saleTimeAfternoon:'',//大下午
                morningbegin:'8:00',//上午
                morningend:'12:00',//上午
                afterbegin:'14:00',//下午
                afterend:'17:30',//下午结束
                venueBiddingDocuments:'',//发售地点
                costBiddingDocuments:'',//文件工本费
                costBiddingDocumentsAccount:'',//账户
                biddersRequiredSubmitInformation:'',//投标人提交资料
                submitTime:'',//递交投标文件截止时间
                projectLeader:'',//项目负责人
                contactMode:'',//联系方式
                remarks:"",//备注
            }
        },
        created(){
            this.referenceId = this.waitCase.referenceId;// 关联ID
            this.toDoListId = this.waitCase.toDoListId;// 待办事项id
            this.auditStatus = this.waitCase.auditStatus;// 审核状态
            this.businessLinks = this.waitCase.businessLinks;// 待办名称
            this.totalItemId = this.waitCase.totalItemId;// 总包的keyid
            this.entrySubcontractNumber= this.waitCase.entrySubcontractNumber;// 分包编号
            this.totalProjectNumber= this.waitCase.totalProjectNumber;// 总包编号
            this.subItemId= this.waitCase.subItemId;// 分包的keyid
            this.biddingOrganization = this.waitCase.biddingOrganization;//招标组织方式
            this.getpageInfo();// 通过关联ID查询入场项目编号
            this.getbiddingInfo();// 招标项目信息
            this.getmanageInfo();// 办理记录
        },
        methods: {
            // 返回到待办页面
            closePage(){
                this.$router.push({ name:'NotHandled'})
                this.$parent.getHandleList();
            },
            // 同意
            agreeInfo(){
                this.agreeFlag = true;
            },
            // 确认提交
            agreeSubmit(){
                let object = {
                    invitationBidId:this.referenceId,
                    answer:'同意',
                    operationFlow:'邀请函',
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/bidInvitationController/approval',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$axios({
                            method: "POST",
                            url: baseUrl+"/toDoListController/update",
                            data:{
                                toDoListId: this.toDoListId,
                                auditStatus: "办理通过",
                                state: "已办理",
                                remarks: this.infoRemark
                            }
                        }).then(res=>{
                            if(res.data.status == 200){
                                this.$router.push({ name:'NotHandled'})
                            this.$parent.getHandleList();
                            }else{
                                this.$message.warning(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            // 同意的确定按钮
            agreeSure(){
                this.agreeFlag = false;
            },
            // 不同意
            disAgree(){
                this.disAgreeFlag = true;
            },
            // 确定退回
            disAgreeBack(){
                let object = {
                    invitationBidId:this.referenceId,
                    answer:'不同意',
                    operationFlow:'邀请函',
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/bidInvitationController/approval',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$axios({
                            method: "POST",
                            url: baseUrl+"/toDoListController/update",
                            data:{
                                toDoListId: this.toDoListId,
                                auditStatus: "办理未通过",
                                state: "已办理",
                                remarks: this.infoRemark
                            }
                        }).then(res=>{
                            if(res.data.status == 200){
                            this.$router.push({ name:'NotHandled'})
                            this.$parent.getHandleList();
                            }else{
                                this.$message.warning(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            // 不同意的关闭按钮
            disAgreeSure(){
                this.disAgreeFlag = false;
            },
            // 通过关联ID查询入场项目编号
            getpageInfo(){
                let object={}
                if(this.entrySubcontractNumber!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.entrySubcontractNumber
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectNumber
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl+"/bidInvitationController/selectByCode",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.agentPhone = res.data.data.agentPhone;
                        this.agentAddress = res.data.data.agentAddress;
                        this.address = res.data.data.address;// 地址
                        this.contactInformation = res.data.data.contactInformation;// 联系方式
                        this.certificateBox = JSON.parse(res.data.data.enterpriseQualification);// 企业资质要求
                        if(this.certificateBox.length>0){
                            this.certificateBox = dubRemove(this.certificateBox);
                            let arr = [];
                            this.certificateBox.forEach(item=>{
                                arr.push(item.label);
                            })
                            this.companyInfo = arr;
                            this.enterpriseQualification = this.companyInfo.toString();
                        }
                        this.leaderBox = JSON.parse(res.data.data.qualificationProjectLeader);// 项目负责人资质要求
                        if(this.leaderBox.length>0){
                            this.leaderBox = dubRemove(this.leaderBox);
                            let newArr = [];
                            this.leaderBox.forEach(item=>{
                                newArr.push(item.label);
                            })
                            this.leaderInfo = newArr;
                            this.qualificationProjectLeader = this.leaderInfo.toString();
                        }
                        // this.enterpriseQualification = res.data.data.enterpriseQualification;// 企业资质要求
                        // this.qualificationProjectLeader = res.data.data.qualificationProjectLeader;//项目负责人资质要求
                        this.otherQualifications = res.data.data.otherQualifications;//其他资格要求
                        this.saleTenderDocumentsStartTime = dayjs(res.data.data.saleTenderDocumentsStartTime).format('YYYY-MM-DD');//招标文件发售开始时间
                        this.saleTenderDocumentsEndTime = dayjs(res.data.data.saleTenderDocumentsEndTime).format('YYYY-MM-DD');//招标文件发售结束时间
                        //上午下午时间
                        this.saleTimeMorning=res.data.data.saleTimeMorning.split(',');
                        this.morningbegin = this.saleTimeMorning[0];
                        this.morningend = this.saleTimeMorning[1];
                        this.saleTimeAfternoon=res.data.data.saleTimeAfternoon.split(',');
                        this.afterbegin = this.saleTimeAfternoon[0];
                        this.afterend = this.saleTimeAfternoon[1];
                        this.venueBiddingDocuments = res.data.data.venueBiddingDocuments;//发售地点
                        this.costBiddingDocuments = res.data.data.costBiddingDocuments;//工本费
                        this.costBiddingDocumentsAccount = res.data.data.costBiddingDocumentsAccount;//工本费接收账户
                        this.biddersRequiredSubmitInformation = res.data.data.biddersRequiredSubmitInformation;//投标人需提交资料
                        this.projectLeader = res.data.data.projectLeader;//项目负责人
                        this.contactMode = res.data.data.contactMode;//联系方式
                        this.remarks = res.data.data.remarks;//备注
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            // 招标项目信息
            getbiddingInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+this.totalItemId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标方式
                        this.biddingOrganization = res.data.data.biddingOrganization;// 招标组织方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
                        this.tenderContents = res.data.data.tenderContents;// 招标内容
                        this.sourceOfFunds = res.data.data.sourceOfFunds;// 资金来源
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            downLoadupFile(item){
                this.downloadFile(item.attachmeId,item.fileName);
            },
            //下载文件列表
            downloadFile(attachmeId,fileName){
                this.$axios({
                    method: 'POST',
                    url: baseUrl + '/attachmeController/downloadAttachem',
                    data:{
                        attachmeId:attachmeId,
                        fileName:fileName
                    },
                    responseType:'blob'
                }).then(res=>{
                    var blob = res.data;
                    var name = JSON.parse(res.config.data).fileName;
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = function (e) {
                        var a = document.createElement("a");
                        a.download = name;
                        // a.href = e.target.result;
                        a.href = URL.createObjectURL(blob)
                        $("body").append(a); 
                        a.click();
                        $(a).remove();
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }, 
            // 办理记录
            getmanageInfo(){
                let object = {};
                if(this.entrySubcontractNumber!=null){
                    object={
                        itemNumber:this.entrySubcontractNumber,
                        relatedId:this.referenceId
                    }
                }else{
                    object={
                        itemNumber:this.totalProjectNumber,
                        relatedId:this.referenceId
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/historyController/selectHistoryList',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.manageDate = res.data.data
                        this.manageDate.map((item,index)=>{
                            item.creationTime = dayjs(item.creationTime).format('YYYY-MM-DD')
                        })
                    }else{
                        this.$message.warning(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
        },
    }
</script>

<style scoped>
.newBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.backlogWrapper{
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
.lookWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 9999;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
}
.backlogBox,.lookBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.pageTitle,.lookTitle{
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
    justify-content: flex-start;
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
.editContent>p{
    width: 25%;
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
.notic{
    color: #f00;
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
</style>