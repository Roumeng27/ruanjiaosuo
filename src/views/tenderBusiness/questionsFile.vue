<template>
    <div class="newBox">
        <!-- 主页面 -->
        <div class="initWrapper">
            <!-- 搜索的输入框 -->
            <div class="editItem">
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
                    <button class="btn" @click="searchList">搜索</button>
                </div>
            </div>
            <div class="main_info">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="projcetNumber" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="180">
                    </el-table-column>
                    <el-table-column prop="projcetName" :show-overflow-tooltip ="true" label="招标项目名称" width="180">
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
                <div class="boxBtn">
                    <button class="btn" @click="addQuestion">新增投标询疑</button>
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
                        <el-table-column prop="problemDescription" label="问题描述" maxlength="120">
                        </el-table-column>
                        <el-table-column prop="questionTime" label="提问时间" >
                        </el-table-column>
                        <el-table-column prop="test" label="是否解答">
                            <template slot-scope="scope">
                                <span v-if="scope.row.replyId == null">否</span>
                                <span v-else>是</span>
                            </template>
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
        <!--填写问题详情  -->
        <div class="uploadWrapper" v-show="addFlag">
            <div class="uploadWrapperBox">
                <div class="uploadWrapper_title">
                    <p>新增投标询疑</p>
                    <i class="el-icon-close" style="cursor:pointer;"  @click="handleClose"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="sureSendInfo">确认发送</button>
                </div>
                <div class="main_info" style="padding:20px;">
                    <!-- <el-input type="textarea" v-model="problemDescription"  :rows="3"></el-input> -->
                    <el-collapse v-model="activeName" accordion>
						<!-- 招标项目信息 -->
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
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalItemId}}</div>
                                    </div>
                                </div>
                            </div>
						</el-collapse-item>
                        <!-- 提问信息 -->
                        <el-collapse-item title="提问信息" name="2">
                            <div class="edit_list">
                                <div class="editCenter">
                                    <div class="editName"><p class="star">*</p>问题描述:</div>
                                    <div class="editContent">
                                        <el-input type="textarea" id="focus1" v-model="problemDescription"></el-input>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">供应商：</div>
                                        <div class="editContent">
                                            {{companyName}}
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>联系人姓名：</div>
                                        <div class="editContent">
                                            <el-input v-model="questionPersonName"  id="focus2" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>联系电话：</div>
                                        <div class="editContent">
                                            <el-input v-model="questionPersonPhone" id="focus3"  clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>手机：</div>
                                        <div class="editContent">
                                            <el-input v-model="questionPersonTelephone" id="focus4"  clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!--查看问题详情  -->
        <div class="uploadWrapper" v-show="lookFlag">
            <div class="uploadWrapperBox">
                <div class="uploadWrapper_title">
                    <p>查看投标询疑</p>
                    <i class="el-icon-close" style="cursor:pointer;"  @click="handleClose"></i>
                </div>
               <div class="box" >
                    <button class="btn" @click="readyInfo" v-show="readyBtn">已阅</button>
                    <button class="disBtn" v-show="disBtnFlag">已阅</button>
                </div>
                <div class="main_info" style="padding:20px;">
                    <!-- <el-input type="textarea" v-model="problemDescription"  :rows="3" ></el-input> -->
                    <el-collapse v-model="activeName" accordion>
						<!-- 招标项目信息 -->
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
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalItemId}}</div>
                                    </div>
                                </div>
                            </div>
						</el-collapse-item>
                        <!-- 提问信息 -->
                        <el-collapse-item title="提问信息" name="2">
                            <div class="edit_list">
                                <div class="editCenter">
                                    <div class="editName">问题描述:</div>
                                    <div class="editContent">{{problemDescription}} </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">供应商：</div>
                                        <div class="editContent">{{companyName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系人姓名：</div>
                                        <div class="editContent">{{questionPersonName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">联系电话：</div>
                                        <div class="editContent">{{questionPersonPhone}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">手机：</div>
                                        <div class="editContent">{{questionPersonTelephone}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">提问时间：</div>
                                        <div class="editContent">{{questionTime}} </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                
                            </div>
                        </el-collapse-item>
                        <!-- 答复内容 -->
                        <el-collapse-item title="答复内容" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目(分包)名称：</div>
                                        <div class="editContent" >{{projectCode ==null ? subcontractName : projcetName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目(分包)编号：</div>
                                        <div class="editContent" >{{entrySubcontractNumber == null ? projectCode : entrySubcontractNumber}}</div>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">回复内容:</div>
                                    <div class="editContent">{{replyContent}} </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import baseUrl from '../../api/api'
import '../../assets/css/style.css'
import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkPhone,checkEmail,dubRemove,checkNumber} from '../../api/base.js'
import dayjs from "dayjs"
export default {
    data(){
        return {
            activeName:['1','2','3','4','5'],
            addFlag:false,
            nameItem:'',//头部名称
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
            // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            totalItemId:'',// 入场项目编号
            tenderPurchaserName:'',// 招标(采购)人
            projectInformaPrimaryKeyId:'',// 总包的keyID
            // 新增投标询疑所需字段
            problemDescription:'',// 问题描述
            questionPersonName:'',// 联系人姓名
            questionPersonPhone:'',// 联系人电话
            questionPersonTelephone:'',// 联系人手机
            questionTime:'',// 提问时间
            questionTime:'',// 提问时间
            replyContent:'',// 回复内容
            companyName:'',// 供应商
            comboApplyInfor:'',
            value1:'',
            suspectedReplyId:'',// 主键ID
            entrySubcontractNumber:'',// 分包编号
            subcontractName:'',// 分包项目名称
            projectCode:'',// 总包编号
            projcetName:'',// 总包项目名称
            isRead:'',// 是否已阅
            readyBtn:false,// 判断已阅 未读按钮是否展示隐藏
            disBtnFlag:false,// 置灰按钮
        }
    },
    created(){
        this.getQuestionData();// 答疑提问列表
    },
    methods:{
        // 分页器
        handleSizeChange(val) {
            // 每页条数
        },
        handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getQuestionData(); // 答疑提问列表
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        //头部搜索
        searchList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/answerNoticeController/selectAnswerNoticeList',
                data:{
                    pageSize:this.pageSize,
                    pageNo:this.currentPage,
                    projcetNumber:this.numberItem,
                    projcetName:this.nameItem,
                    procurementModes:["公开招标","邀请招标"]
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
        // 答疑提问列表
        getQuestionData(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/answerNoticeController/selectAnswerNoticeList',
                data:{
                    pageSize:this.pageSize,
                    pageNo:this.currentPage,
                    procurementModes:["公开招标","邀请招标"]
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
            this.projectInformaPrimaryKeyId = row.projectInformaPrimaryKeyId;
            this.projcetName = row.projcetName;// 招标项目名称
            this.subcontractName = row.subcontractName;// 分包名称
            this.getDetailList(); //详情列表
            this.writeFlag = true;
            this.getbiddingInfo(row.projectInformaPrimaryKeyId);// 招标项目信息
        },
        //详情列表
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
                url:baseUrl + '/suspectedReplyController/selectList',
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
                url:baseUrl + '/suspectedReplyController/selectList',
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
            this.lookFlag = true;
            this.suspectedReplyId = row.suspectedReplyId;// 主键ID
            this.getSearchItem(row.suspectedReplyId);// 查看投标询疑详情
        },
        // 查看投标询疑详情
        getSearchItem(suspectedReplyId){
            this.$axios({
                method:'POST',
                url:baseUrl + '/suspectedReplyController/selectById',
                data:{
                    suspectedReplyId:suspectedReplyId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    let arr = res.data.data.list;
                    arr.forEach(item => {
                        this.problemDescription = item.problemDescription;// 问题描述
                        this.questionPersonName = item.questionPersonName;// 提问人姓名
                        this.questionPersonPhone = item.questionPersonPhone;// 联系电话
                        this.questionPersonTelephone = item.questionPersonTelephone;// 提问人手机
                        // 提问时间
                        if(item.questionTime == '' || item.questionTime == null || item.questionTime == 0){
                            this.questionTime = '';
                        }else{
                            this.questionTime = dayjs(item.questionTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.replyContent = item.replyContent;// 回复内容
                        this.companyName = item.companyName;// 供应商
                        this.projectCode = item.projectCode;// 总包编号
                        this.entrySubcontractNumber = item.entrySubcontractNumber;// 分包编号
                        this.isRead = item.isRead;// 是否已阅
                        if(item.replyId != null && item.replyId != "" && this.isRead != '已阅'){
                            this.readyBtn = true;// 蓝色
                            this.disBtnFlag = false;// 置灰
                        }else if(item.replyId != null && item.replyId != "" && this.isRead == '已阅'){
                            this.disBtnFlag = true;// 置灰
                            this.readyBtn = false;// 蓝色
                        }else{
                            this.disBtnFlag = false;// 置灰
                            this.readyBtn = false;// 蓝色
                        }
                    });
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 已阅信息
        readyInfo(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/suspectedReplyController/reply',
                data:{
                    suspectedReplyId:this.suspectedReplyId,
                    isRead:'已阅'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.lookFlag = false;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //新增问题
        addQuestion(){
            this.problemDescription = '';// 问题描述
            this.questionPersonName = '';// 联系人姓名
            this.questionPersonPhone = '';// 联系人电话
            this.questionPersonTelephone = '';// 联系人手机
            this.addFlag = true;
            this.getCompanyList(); //获取企业信息
        },
        //获取企业信息
		getCompanyList(){
			this.$axios({
				method:'POST',
				url:baseUrl + '/userController/selectByPersonnelId',
				data:{}
			}).then(res=>{
				if(res.data.status == 200){
					this.companyName = res.data.data.companyName;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
        // 新增投标询疑 确定发送
        sureSendInfo(){
            if(!this.problemDescription){
                $('#focus1').focus();
               this.$message.warning('请输入问题描述!');
               return false;
            }else if(!this.questionPersonName){
                $('#focus2').focus();
                this.$message.warning("请填写联系人姓名!");
				return false;
            }else if(!this.questionPersonPhone){
                $('#focus3').focus();
                this.$message.warning("请填写电话号码!");
				return false;
            }else if(this.questionPersonPhone != '' && !checkPhone(this.questionPersonPhone)){
                $('#focus3').focus();
                this.$message.warning("请填写正确的电话号码!");
				return false;
            }else if(!this.questionPersonTelephone){
                $('#focus4').focus();
                this.$message.warning("请填写手机号码!");
				return false;
            }else if(this.questionPersonTelephone != '' && !isPoneAvailable(this.questionPersonTelephone)){
                $('#focus4').focus();
                this.$message.warning("请填写正确的手机号码!");
				return false;
            }else{
                let object = {};
                if(this.projcetNumber.indexOf('-') != -1){
                    object = {
                        entrySubcontractNumber:this.projcetNumber,
                        problemDescription:this.problemDescription,// 问题描述
                        questionPersonName:this.questionPersonName,// 提问人姓名
                        questionPersonPhone:this.questionPersonPhone,// 提问人电话
                        questionPersonTelephone:this.questionPersonTelephone,// 提问人手机
                    }
                }else{
                    object = {
                        projectCode:this.projcetNumber,
                        problemDescription:this.problemDescription,// 问题描述
                        questionPersonName:this.questionPersonName,// 提问人姓名
                        questionPersonPhone:this.questionPersonPhone,// 提问人电话
                        questionPersonTelephone:this.questionPersonTelephone,// 提问人手机
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/suspectedReplyController/save',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getDetailList(); // 详情列表
                        this.addFlag = false;
                        this.writeFlag = true;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        closeWrite(){
            this.writeFlag = false;
        },
        handleClose(){
            this.lookFlag = false;
            this.addFlag = false;
        },
        // 招标项目信息
		getbiddingInfo(projectInformaPrimaryKeyId){
			this.$axios({
				method: "GET",
				url: baseUrl+"/projectInformationController/selectById/"+projectInformaPrimaryKeyId,
			}).then(res=>{
				if(res.data.status == 200){
					this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
					this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
					this.totalItemId = res.data.data.totalProjectId;//入场项目编号
					this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
					
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err) 
			})
        },
    },
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
    padding: 30px 20px;
	z-index: 999;
}
.wrapperBox{
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.uploadWrapperBox{
	width: 100%;
    height:100%;
    background: #fff;
    display: flex;
    flex-direction: column;
	position: relative;
}
/* 标题 */
.wrapper_title,.uploadWrapper_title{
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
.star{
	color: #f00;
}
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
.star{
    color: #f00;
}
.disBtn{
     height: 100%;
    padding:0 25px;
    background-color: #ccc;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
</style>