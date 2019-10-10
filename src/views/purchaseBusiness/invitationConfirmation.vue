<template>
<!-- 邀请书确认 -->
    <div class="myDiv">
        <div class="wrapper">
            <div class="head_bottom">
                <span class="head_b_b">采购项目名称：<el-input v-model="entryName" placeholder="请输入内容"  @keyup.enter.native="searchList"></el-input></span>
                <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalId" placeholder="请输入内容"  @keyup.enter.native="searchList"></el-input></span>
                <span><button class="btn" @click="searchList()">搜索</button></span>
            </div>
            <!-- 主体 -->
            <div class="table_content">
                <div class="main_box">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="totalProjectId" label="招标项目(分包)编号" width="170">
                        </el-table-column>
                        <el-table-column prop="nameOfTenderProject" label="采购项目名称">
                        </el-table-column>
                        <el-table-column prop="subcontractName" label="分包名称">
                        </el-table-column>
                        <el-table-column prop="biddingProcurementMode" label="分包分类">
                        </el-table-column>
                        <el-table-column prop="bidState" label="状态" width="100">
                        </el-table-column>
                        <el-table-column prop="operation" label="操作" width="70"> 
                        <template slot-scope="scope">
                            <i style="cursor:pointer;" class="el-icon-setting" @click="lookUpFile(scope.row)"></i>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination" v-if="this.totalPages>1">
                    <template>
                        <Page :total="totalSize" :current="currentPage" :page-size='10' show-elevator show-total @on-change="page"></Page>
                    </template>
                </div>
            </div>
        </div>
        <!-- 邀请函信息弹框 -->
        <div class="sureWrapper" v-show="show">
            <div class="sureBox">
                <div class="sureTitle">
                    <p>邀请函确认</p>
                    <i class="el-icon-close" @click="close" style="cursor:pointer;"></i>
                </div>
                <div class="box">
                    <button class="btn nav_next" @click="joinCom">参加</button>
                    <button class="btn nav_save" @click="noParticipation">不参加</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 分包信息 -->
                        <el-collapse-item title="分包信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">入场项目分包编号：</div>
                                        <div class="editContent">{{totalNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包名称：</div>
                                        <div class="editContent">{{subcontractName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">邀请时间：</div>
                                        <div class="editContent">{{invitationTime}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">回复截止时间：</div>
                                        <div class="editContent">{{deadlineBidReceipt}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业资质要求：</div>
                                        <div class="editContent">{{enterpriseQualification}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">项目负责人资质要求：</div>
                                        <div class="editContent">{{qualificationProjectLeader}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">其他资格要求：</div>
                                        <div class="editContent">{{otherQualifications}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 填写信息 -->
                        <el-collapse-item title="填写信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业名称：</div>
                                        <div class="editContent">{{companyName}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">企业资质：</div>
                                        <div class="editContent">{{companyQualification}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业组织机构代码：</div>
                                        <div class="editContent">{{organizationCode}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">企业资质编号：</div>
                                        <div class="editContent">{{companyQualificationCode}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editChoise">
                                            <span>{{projectLeader}}</span>
                                            <el-button @click="chooseList()">选择</el-button>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">项目负责人专业：</div>
                                        <div class="editChoise">
                                            <span>{{projectLeaderMajor}}</span>
                                            <el-button @click="emptyList">清空</el-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业负责人：</div>
                                        <div class="editContent">
                                            <el-input v-model="conpanyLeader" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>投标联系人：</div>
                                        <div class="editContent">
                                            <el-input v-model="bidContacts" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公司电话：</div>
                                        <div class="editContent">
                                            <el-input v-model="companyPhone" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>联系手机：</div>
                                        <div class="editContent">
                                            <el-input v-model="telephone" clearable ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">传真：</div>
                                        <div class="editContent">
                                            <el-input v-model="fax" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">Email：</div>
                                        <div class="editContent">
                                            <el-input v-model="email" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 邀请函及回执函信息 -->
                        <el-collapse-item title="邀请函及回执函信息" name="3">
                            <div style="cursor:pointer;width:100%;height:60px;padding:20px;padding-left:10%;margin-bottom:20px;">
                                <i style="cursor:pointer;font-size:40px;color:#358cd3;" class="el-icon-message" @click="dianjiPdf()"></i>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        
        <!-- 选择项目负责人弹框 -->
        <div class="mask1"  v-show="chooseShow"></div>
        <div class="choose_box" v-show="chooseShow">
            <div class="new_head">
                <div style="padding-left:10px;">人员列表</div>
                <div @click="closeFile()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="head_bottom">
                <span class="head_b_b">姓名：<el-input v-model="name" placeholder="请输入内容" @keyup.enter.native="searchPeopleList"></el-input></span>
                <span><button class="btn" style="padding:4px 25px;border-radius:3px;" @click="searchPeopleList()">搜索</button></span>
            </div>
            <div>
                <el-table :data="chooseData" style="width: 100%" >
                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column  prop="professionalCertificateNumber" label="专业证明及编号" width="250">
                </el-table-column>
                <el-table-column  prop="projectNum" label="在施项目">
                </el-table-column>
                <el-table-column prop="operation" label="选择">
                    <template slot-scope="scope">
                        <i class="el-icon-plus" style="cursor:pointer;" @click="addChooseFile(scope.row)"></i>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 确认提交弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="submitBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>提交成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import baseUrl from '../../api/api'
import {formatDate,changeTime,checkPhone,isPoneAvailable,getIdcard,getName,checkEmail,dubRemove} from '../../api/base.js'
import dayjs from "dayjs"
export default {
    components:{},
    props:{},
    data(){
        return {
            invitationAttachmeId:'',//文件流keyID
            totalId:'',//入场项目编号搜索
            submitBox:false,
            invitationTime:'',//邀请时间
            name:'',
            chooseData:[],//人员数据
            chooseShow:false,//项目负责人弹框
            bidInforId:'',
            enterpriseQualification:'',//企业资质要求
            certificateBox:[],
            companyInfo:[],
            qualificationProjectLeader:'',//项目负责人资质邀请
            leaderBox:[],
            leaderInfo:[],
            otherQualifications:'',//其他资格要求
            nameOfTenderProject:'',//招标项目名称
            totalProjectId:'',
            value:'',
            entryName:'',//招标项目名称头部搜索
            totalProjectId:'',//入场分包编号投标搜索
            tableData:[],//表格数据
            totalPages:0,// 页数
            currentPage:1,//当前页
            pagesize:10, //每页条数
            pageTotal: 0, //总页数
            totalSize: 0, //总条数
            show:false,//邀请函信息确认
            activeName:['1','2','3'],
            entrySubcontractNumber:'',//分包编号
            subcontractName:'',//分包名称
            companyName:'',//企业名称
            organizationCode:'',//企业组织机构代码
            companyQualificationCode:'',//企业资质机构编号
            companyQualification:'',//企业资质
            projectLeader:'',//项目负责人
            projectLeaderMajor:'',//项目负责人专业
            conpanyLeader:'',//企业负责人
            bidContacts:'',//投标联系人
            companyPhone:'',//公司电话
            telephone:'',//联系手机
            fax:'',//传值
            email:'',//email
            pdfUrl:'',
            totalNumber:'',// 入场项目编号
            deadlineBidReceipt:'',//投标回执截至时间
        }
    },
    created(){
        this.getList();
    },
    methods:{
        //招标项目信息展示
        subPackList(){
            if(this.totalNumber.indexOf("-") != -1&& this.totalNumber!=null){
                //分包
                this.totalProjectId = this.entrySubcontractNumber;
            }else{
                // 总包
                this.totalProjectId = this.totalProjectId;
            }
            let lookArr = [];
            lookArr.push(this.totalProjectId)
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:lookArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    res.data.data.map((item,index)=>{
                        if(this.totalNumber.indexOf("-") != -1&& this.totalNumber!=null){
                            this.nameOfTenderProject = item.projectInformationVo.nameOfTenderProject;// 招标项目名称
                        }else{
                            this.nameOfTenderProject = item.nameOfTenderProject;// 招标项目名称
                        }
                        
                        this.subcontractName = item.subcontractName;// 分包名称
                        this.entrySubcontractNumber = item.entrySubcontractNumber;
                        this.totalProjectId = item.totalProjectId;
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //企业资质要求及项目负责人资质要求
        getOtherList(){
            let object={}
            if(this.totalNumber.indexOf("-") != -1&& this.totalNumber!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.entrySubcontractNumber
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.totalProjectId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/bidInvitationController/selectByCode',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data.qualificationProjectLeader == "[]"){
                        this.qualificationProjectLeader = ''
                    }else{
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
                    }
                    if(res.data.data.enterpriseQualification == "[]"){
                        this.enterpriseQualification = ''
                    }else{
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
                        this.otherQualifications = res.data.data.otherQualifications;//其他资格要求
                    }
                    this.otherQualifications = res.data.data.otherQualifications;//其他资格要求
                }
            })
        },
        //获取企业信息
        getCompanyList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/userController/selectByPersonnelId',
                data:{
                    personnelId:''
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.userId = res.data.data.userId;
                    this.companyName = res.data.data.companyName;
                    this.organizationCode = res.data.data.organizationCode;
                    this.companyQualificationCode = res.data.data.companyQualificationCode;
                    this.companyQualification = res.data.data.companyQualification;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //邀请时间
        getTimeList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/bidInforController/selectById',
                data:{
                    bidInforId:this.bidInforId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data.invitationTime == null){
                        this.invitationTime = ""
                    }else{
                        this.invitationTime = dayjs(res.data.data.invitationTime).format('YYYY-MM-DD HH:mm:ss');
                    }
                    this.conpanyLeader = res.data.data.conpanyLeader;
                    this.bidContacts = res.data.data.bidContacts;
                    this.companyPhone = res.data.data.companyPhone;
                    this.telephone = res.data.data.telephone;
                    this.fax = res.data.data.fax;
                    this.email = res.data.data.email;
                    this.projectLeader = res.data.data.projectLeader;
                    this.projectLeaderMajor = res.data.data.projectLeaderMajor;
                    this.pdfUrl = res.data.data.invitationUrl;
                    this.invitationAttachmeId = res.data.data.invitationAttachmeId;
                    if(res.data.data.deadlineBidReceipt == null){
                        this.deadlineBidReceipt = ''
                    }else{
                        this.deadlineBidReceipt = dayjs(res.data.data.deadlineBidReceipt).format('YYYY-MM-DD HH:mm:ss');
                    } 
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 8 + 1;
        },
        //分页
        page(val) {
            this.currentPage = val;
            this.getList();
        },
        //数据列表展示
        getList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selfTenderListForInvitation",
                data:{
                    pageSize:this.pagesize,
                    pageNo:this.currentPage,
                    procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data.data;
                    this.totalSize = res.data.data.data[0].total;// 总条数
                    this.totalPages = res.data.data.data[0].totalPages;//页数
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //搜索按钮
        searchList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selfTenderListForInvitation",
                data:{
                    pageSize:this.pagesize,
                    pageNo:this.currentPage,
                    nameOfTenderProject:this.entryName,
                    totalProjectId:this.totalId,
                    procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data.data;
                    this.totalSize = res.data.data.data[0].total;// 总条数
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查看
        lookUpFile(row){
            this.totalNumber = row.totalProjectId;// 入场项目编号
            if(row.totalProjectId.indexOf("-") != -1&& row.totalProjectId!=null){
                this.entrySubcontractNumber = row.totalProjectId;
            }else{
                this.totalProjectId = row.totalProjectId;
            }
            this.show = true;
            this.bidInforId = row.bidInforId;
            this.getOtherList();
            this.subPackList();
            this.getCompanyList();
            this.getTimeList();
            // this.getUpdateList();
            if(row.bidState == '不参加' ||row.bidState == '参加'){
                $('.nav_next').attr("disabled","disabled");
                $('.nav_next').css({"background-color":"#ccc"});
                $('.nav_save').attr("disabled","disabled");
                $('.nav_save').css({"background-color":"#ccc"})
            }else{
                $('.nav_next').removeAttr("disabled");
                $('.nav_next').css({"background-color":"#0095d5"})
                $('.nav_save').removeAttr("disabled");
                $('.nav_save').css({"background-color":"#0095d5"})
            }
        },
        //选择项目负责人弹框
        chooseList(){
            this.chooseShow = true;
            this.searchPeopleList();
        },
        //清空项目负责人及专业
        emptyList(){
            this.projectLeader = '';// 项目负责人
            this.projectLeaderMajor = '';// 项目负责人专业
        },
        //选择人员弹框列表
        searchPeopleList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/employeeInforController/selectList",
                data:{
                    name:this.name,
                    userId:this.userId,
                    state:'办理通过'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.chooseData = res.data.data.list;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //点击选择加号到外面的输入框
        addChooseFile(row){
            this.projectLeaderMajor = row.professionalCertificateNumber;// 专业及证书编号
            this.projectLeader = row.name;// 姓名
            this.chooseData = [];
            this.chooseShow = false;
        },
        //关闭负责人弹框
        closeFile(){
            this.chooseShow = false;
        },
        //参加
        joinCom(){
            if(!this.bidContacts){
                this.$layer.msg('请输入投标联系人');
                return false
            }else if(!this.telephone){
                this.$layer.msg('请输入联系方式！');
                return false;
            }else if(!isPoneAvailable(this.telephone) && !checkPhone(this.telephone)){
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }else if(this.email != "" && this.email != null && !checkEmail(this.email)){
                this.$layer.msg('请输入正确的邮箱！');
                return false;
            }else if(this.companyPhone != "" && this.companyPhone != null && !checkPhone(this.companyPhone)){
                this.$layer.msg('请输入正确的座机号码！例如：0000-0000000');
                return false;
            }else{
                let object={}
                if(this.totalNumber.indexOf("-") != -1&& this.totalNumber!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.entrySubcontractNumber,
                        invitationUnit:'邀请单位',
                        bidCompany:this.bidCompany,
                        bidContacts:this.bidContacts,
                        telephone:this.telephone,
                        companyPhone:this.companyPhone,
                        bidInforId:this.bidInforId,
                        fax:this.fax,
                        conpanyLeader:this.conpanyLeader,
                        email:this.email,
                        projectLeader:this.projectLeader,
                        projectLeaderMajor:this.projectLeaderMajor,
                        state:'报名成功'
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId,
                        invitationUnit:'邀请单位',
                        bidCompany:this.bidCompany,
                        bidContacts:this.bidContacts,
                        telephone:this.telephone,
                        companyPhone:this.companyPhone,
                        bidInforId:this.bidInforId,
                        fax:this.fax,
                        conpanyLeader:this.conpanyLeader,
                        email:this.email,
                        projectLeader:this.projectLeader,
                        projectLeaderMajor:this.projectLeaderMajor,
                        state:'报名成功'
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/bidInforController/update',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getList();
                        this.submitBox = true;
                        this.show = false;
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            
        },
        //不参加
        noParticipation(){
            if(!this.bidContacts){
                this.$layer.msg('请输入投标联系人');
                return false
            }else if(!this.telephone){
                this.$layer.msg('请输入联系方式！');
                return false;
            }else if(!isPoneAvailable(this.telephone) && !checkPhone(this.telephone)){
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }else if(this.email != "" && this.email != null && !checkEmail(this.email)){
                this.$layer.msg('请输入正确的邮箱！');
                return false;
            }else if(this.companyPhone != "" && this.companyPhone != null && !checkPhone(this.companyPhone)){
                this.$layer.msg('请输入正确的座机号码！例如：0000-0000000');
                return false;
            }else{
                let object={}
                if(this.totalNumber.indexOf("-") != -1&& this.totalNumber!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.entrySubcontractNumber,
                        invitationUnit:'邀请单位',
                        bidCompany:this.bidCompany,
                        bidContacts:this.bidContacts,
                        telephone:this.telephone,
                        companyPhone:this.companyPhone,
                        bidInforId:this.bidInforId,
                        fax:this.fax,
                        conpanyLeader:this.conpanyLeader,
                        email:this.email,
                        projectLeader:this.projectLeader,
                        projectLeaderMajor:this.projectLeaderMajor,
                        state:'报名失败'
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId,
                        invitationUnit:'邀请单位',
                        bidCompany:this.bidCompany,
                        bidContacts:this.bidContacts,
                        telephone:this.telephone,
                        companyPhone:this.companyPhone,
                        bidInforId:this.bidInforId,
                        fax:this.fax,
                        conpanyLeader:this.conpanyLeader,
                        email:this.email,
                        projectLeader:this.projectLeader,
                        projectLeaderMajor:this.projectLeaderMajor,
                        state:'报名失败'
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/bidInforController/update',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getList();
                        this.submitBox = true;
                        this.show = false;
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            
        },
        close(){
            this.show = false;
        },
        handleClose(){
            this.submitBox = false;
        },
        // blurPhone(){
        //     if(!isPoneAvailable(this.telephone)){
        //         this.$layer.msg('请输入正确的手机号码');
        //         return false;
        //     }
        // },
        dianjiPdf(){
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/downloadAttachem',
                data:{
                    attachmeId:this.invitationAttachmeId,
                    fileName:this.pdfUrl
                },
                responseType:"blob"
            }).then(res=>{
                var blob = res.data;
                var binaryData = [];
                binaryData.push(res.data);
                let url = window.URL.createObjectURL(new Blob(binaryData, {type:"application/zip"}));
                window.open('../../../static/pdf/web/viewer.html?file='+ url);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    
}
</script>
<style scoped>
.myDiv {
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
.sureWrapper{
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
.sureBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.sureTitle{
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
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.el-collapse{
    width: 80%;
    margin: 10px auto;
}
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
    height: 100%;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right:5px;
}

.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: flex-end;
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
/* 主体 */
.main_box{
  height: 400px;
  overflow-y: scroll;
}
.pagination {
  width: 100%;
  margin: 30px 0;
  text-align: right;
  /* position: fixed;
  right: 0;
  bottom: 10px; */
  margin-right: 30px;
  }
  .mask,.mask1,.mask2 {
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
   z-index:109;
}
.mask1{
  z-index: 109;
}
/* 新建项目 */
.new_pro {
  z-index: 3;
  background: #f0f4f6;
  width: 100%;
  height: 98%;
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate(-10%, -10%);
  overflow-y: hidden;
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
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.new_main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
}
.el-radio{
  height: 30px !important;
  line-height: 30px !important;
}
.el-radio:last-child{
  height: 30px !important;
  line-height: 30px !important;
}
/* 批复文件弹框 */
.mask1{
  z-index: 109;
}
.file_box{
  width: 900px;
  height: 416px;
  z-index: 9;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.file_head{
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  background: #0058a9 ;
  color: #ffffff;
}
.file_nav{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin-bottom: 1px;
}
.file_nav>button{
  border: none;
  background: #0095D5;
  color: #ffffff;
  padding:8px 14px;
  font-size: 16px;
  cursor: pointer;
}
.file_btn{
    position: absolute;
    right: 65px;
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
  .choose_box{
  width: 65%;
  height:600px;
  z-index: 110;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  overflow-y: hidden;
  }
  /* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success,.el-icon-question,.el-icon-warning{
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
.upload:hover{
    text-decoration: underline;
    color:#f00;
    cursor: pointer;
  }
.choose_box{
  width: 65%;
  /* height:600px; */
  z-index: 110;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:60%;
  transform: translate(-50%,-50%);
  overflow-y: hidden;
  }
  /* 列表展示 */
.edit_list{
    padding: 15px 20px;
}
.editItem{
    width: 100%;
    display: flex;
}
.editCenter{
    width: 50%;
    display: flex;
    padding: 5px 0;
}
.editName{
    width: 145px;
    display: flex;
    justify-content: flex-end;
}
.editContent{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
}
.editChoise{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.star{
    color: #f00;
}
</style>