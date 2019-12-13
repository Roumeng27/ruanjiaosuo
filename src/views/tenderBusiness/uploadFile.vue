<template>
    <div class="newBox">
        <!-- 上传投标文件 -->
        <div class="wrapper">
            <div class="boxTitle">
                <el-radio-group v-model="uploadState" @change="changeRadio">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="未上传">未上传</el-radio>
                    <el-radio label="已上传">已上传</el-radio>
                </el-radio-group>
            </div>
            <!-- 搜索的输入框 -->
            <div class="editItem">
                <div class="editCenter">
                    <div class="editName">入场项目(分包)编号：</div>
                    <div class="editContent">
                        <el-input v-model="numberItem" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                    </div>
                </div>
                <div class="editCenter">
                    <div class="editName">招标项目名称：</div>
                    <div class="editContent">
                        <el-input v-model="nameItem" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                    </div>
                </div>
                <div class="editBtn">
                    <button class="btn" @click="searchList">搜索</button>
                </div>
            </div>
            <div class="main_info">
                <el-table :data="resultData" stripe style="width: 100%">
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="totalProjectId" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="170">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="subcontractName" :show-overflow-tooltip ="true" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="startBidTime" :show-overflow-tooltip ="true" label="上传截止日期">
                    </el-table-column>
                    <el-table-column prop="uploadTime" :show-overflow-tooltip ="true" label="最新操作日期">
                    </el-table-column>
                    <el-table-column prop="operation" label="上传" width="70"> 
                        <template slot-scope="scope">
                            <i class="el-icon-s-order" style="cursor:pointer;" @click="goDetail(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页器 -->
            <div class="pagination" v-if="this.totalPages>1">
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
        <!-- 上传文件弹框 -->
		<div class="perfectWrapper" v-show="fileFlag">
            <div class="perfectBox">
                <div class="perfectTitle">
					<p>上传文件</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeFile"></i>
				</div>
                <div class="main_info">
					<el-collapse v-model="activeName" accordion>
                        <!--招标项目信息 -->
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包编号：</div>
                                        <div class="editContent">{{totalProjectId}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包名称：</div>
                                        <div class="editContent">{{subcontractName}} </div>
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
                                        <div class="editName">招标类别：</div>
                                        <div class="editContent">{{typesOfBiddingProjects}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标方式：</div>
                                        <div class="editContent">{{biddingOrganization}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">开标时间：</div>
                                        <div class="editContent">{{assessmentTime}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">标准时间：</div>
                                        <div class="editContent">{{myTime}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--上传操作 -->
                        <el-collapse-item title="上传操作" name="2">
                            <div class="uploadBox">
                                <div class="operateBox" v-show="infoFlag">
                                    <div class="operate" v-show="txtFlag" @click="getState">
                                        上传投标文件
                                    </div>
                                    <div class="operate" v-show="loadFileFlag">
                                        <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg" >
                                        上传投标文件
                                    </div>
                                    <div class="messageBox">
                                        <p>★ 请点击按钮上传投标文件，可以在投标截止时间前，修改或撤回投标文件！</p>
                                        <p>★ 如果要重新上传投标文件，必须将上次上传的投标文件撤销才可重新上传！</p>
                                        <p>★ 请充分考虑到传送的时间和自身的网络情况，在投标截止时间前完成投标，逾时传送会被判断为逾期送达！</p>
                                    </div>
                                </div>
                                <div class="revocationBox"  v-show="backoutFlag">
                                    <div class="revocation" @click="deleteFile">
                                        撤销本次投标
                                    </div>
                                </div>
                            </div>
                            
                        </el-collapse-item>
                        <!-- 操作历史 -->
                        <el-collapse-item title="操作历史" name="3">
                            <el-table
                                :data="historyData"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column
                                    label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="expertName"
                                    label="文件名">
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="idNumber"
                                    label="操作人单位">
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="company"
                                    label="操作人姓名">
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="company"
                                    label="操作日期">
                                </el-table-column>
                                <el-table-column
                                    prop="company"
                                    label="备注">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
					</el-collapse>
                </div>
            </div>
		</div>
        <el-dialog
            title="系统提示"
            :visible.sync="warnFlag"
            width="40%"
            :before-close="warnBtn">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>{{warnTitle}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="warnBtn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="系统提示"
            :visible.sync="successFlag"
            width="40%"
            :before-close="successBtn">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>{{successTitle}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '../../assets/css/style.css';
import baseUrl from '../../api/api';
import {formatDate,changeTime,isPoneAvailable,getIdcard,getName,checkPhone} from '../../api/base.js';
import dayjs from "dayjs";
export default {
    data(){
        return {
            // 主体页面所需字段
            uploadState:'',// 单选按钮
            numberItem:'',//搜索入场项目分包编号
            nameItem:'',// 招标项目名称
            resultData:[],// 上传投标文件列表
            // 分页器所需字段
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
            total: 0, // 总条数
            totalPages:'',// 后端返回页数
            // 分包所需字段
            totalProjectId:'',//分包编号
            entrySubcontractNumber:'',//分包编号
            subcontractName:'',//分包名称
            // 招标项目信息所需字段
            nameOfTenderProject:'',//招标项目名称
            tenderPurchaserName:'',//招标采购人
            biddingProjectNumber:'',//招标项目编号
            biddingOrganization:'',// 招标方式
            typesOfBiddingProjects:'',// 招标类别
            assessmentTime:'',// 开标时间
            myTime:'',// 标准时间
            amountId:'',//入场项目编号
            // 上传文件弹窗所需字段
            fileFlag:false,// 上传文件弹窗
            activeName:['1','2','3'],
            historyData:[],//操作历史数据
            uploadState:'',// 状态
            subcontractItePrimaryKeyId:'',// 分包的主键ID
            projectInformaPrimaryKeyId:'',// 总包的主键ID
            startBidTime:'',// 上传截止时间
            bidInforId:'',// 上传ID
            fileData:[],// 上传列表查询
            attachmeId:'',// 附件删除主键ID
            // 文件提示
            warnFlag:false,
            warnTitle:'',// 警告标题
            infoFlag:false,// 上传投标文件按钮
            backoutFlag:false,// 撤销本次投标按钮
            successFlag:false,
            successTitle:'',
            txtFlag:false,
            loadFileFlag:false,
            stateInfo:'',// 状态
        }
    },
    created(){
        setInterval(() => {
            this.myTime = dayjs().format("YYYY年MM月DD日 HH时mm分ss秒");
        }, 1000);
        this.getList();// 上传投标文件列表
    },
    methods:{
        // 分页器
        handleSizeChange(val) {
            // 每页条数
        },
        handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getList();// 上传投标文件列表
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        warnBtn(){
            this.warnFlag =false;  
        },
        successBtn(){
            this.successFlag = false;
        },
        //头部搜索
        changeRadio(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/projectInformationController/selfTenderListForDocuments',
                data:{
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    uploadState:this.uploadState,
                    procurementModes:["公开招标","邀请招标"]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.resultData = res.data.data.data;
                    this.resultData.forEach(item=>{
                        if(item.startBidTime !=null){
                            item.startBidTime = dayjs(item.startBidTime).format('YYYY-MM-DD HH:mm:ss');// 上传截止日期
                        }
                        if(item.uploadTime !=null){
                            item.uploadTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss');// 最新操作日期
                        }
                        this.total = item.total;// 总条数
                        this.totalPages = item.totalPages;// 后端返回页数
                    })
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // input搜索
        searchList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/projectInformationController/selfTenderListForDocuments',
                data:{
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    nameOfTenderProject:this.nameItem,
                    totalProjectId:this.numberItem,
                    procurementModes:["公开招标","邀请招标"]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.resultData = res.data.data.data;
                    this.resultData.forEach(item=>{
                        if(item.startBidTime !=null){
                            item.startBidTime = dayjs(item.startBidTime).format('YYYY-MM-DD HH:mm:ss');// 上传截止日期
                        }
                        if(item.uploadTime !=null){
                            item.uploadTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss');// 最新操作日期
                        }
                        this.total = item.total;// 总条数
                        this.totalPages = item.totalPages;// 后端返回页数
                    })
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 上传投标文件列表
        getList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/projectInformationController/selfTenderListForDocuments',
                data:{
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["公开招标","邀请招标"]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.resultData = res.data.data.data;
                    this.resultData.forEach(item=>{
                        if(item.startBidTime !=null){
                            item.startBidTime = dayjs(item.startBidTime).format('YYYY-MM-DD HH:mm:ss');// 上传截止日期
                        }
                        if(item.uploadTime !=null){
                            item.uploadTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss');// 最新操作日期
                        }
                        this.total = item.total;// 总条数
                        this.totalPages = item.totalPages;// 后端返回页数
                    })
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 打开上传文件弹框
        goDetail(row){
            let startBidTime = new Date(row.startBidTime).getTime();// 上传截止时间
            let todayTime = new Date().getTime();// 当前时间
            if(startBidTime<todayTime){
                this.fileFlag = false;
                this.warnFlag = true;
                this.warnTitle = '已到上传截止时间,无法查看!';
            }else{
                this.fileFlag = true;
                this.totalProjectId = row.totalProjectId;// 分包编号
                this.subcontractName = row.subcontractName;// 分包名称
                this.getbiddingInfo(row.projectInformaPrimaryKeyId);// 招标项目信息
                this.getSearchList(row.totalProjectId);// 获取开标时间
                this.uploadState = row.uploadState;// 状态
                this.subcontractItePrimaryKeyId  = row.subcontractItePrimaryKeyId;// 分包的主键ID
                this.projectInformaPrimaryKeyId = row.projectInformaPrimaryKeyId;// 总包的主键ID
                this.bidInforId = row.bidInforId;// 上传ID
                this.UploadList();// 查询附件列表
                this.selectTxt();// 上传投标文件状态查询
                this.getInfo();// 判断按钮的显示隐藏
            }
        },
        closeFile(){
            this.fileFlag = false;
            this.getList();// 上传投标文件列表
        },
        // 获取开标时间
        getSearchList(totalProjectId){
            let object={}
            if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                // 分包
                object={
                    entrySubcontractNumber:this.totalProjectId,
                    type:"场地预约"
                }
            }else{
                // 总包
                object ={
                    projectCode:this.totalProjectId,
                    type:"场地预约"
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/siteReservationController/select',
                data:object
            }).then(res=>{
                this.assessmentTime = dayjs(res.data.data[0].assessmentTime).format('YYYY-MM-DD HH:mm:ss');// 开标时间
            }) 
        },
        // 招标项目信息
        getbiddingInfo(projectInformaPrimaryKeyId){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+ projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                    this.biddingOrganization = res.data.data.biddingOrganization;// 招标方式
                    this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标类别
                    this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                    this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        selectTxt(){
            let object = {};
            if(this.totalProjectId.indexOf("-") != -1&& this.totalProjectId!=null){
                object={
                    subcontractItePrimaryKeyId:this.subcontractItePrimaryKeyId
                }
            }else{
                object = {
                    projectInformaPrimaryKeyId:this.projectInformaPrimaryKeyId
                }
            }
            return this.$axios({
                method:'POST',
                url:baseUrl+'/historyController/selectReceivingStatus',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.stateInfo = res.data.data;
                }
            })
        },
        // 判断按钮的显示隐藏
        async getInfo(){
            await this.selectTxt();
            if(this.stateInfo == '未领取' || this.stateInfo == null){
                this.txtFlag = true;
                this.loadFileFlag = false;
            }else{
                this.txtFlag = false;
                this.loadFileFlag = true;
            }
        },
        // 状态为null的时候的提示
        getState(){
            this.warnFlag = true;
            this.warnTitle = '您单位并无下载招标文件的记录,请先下载文件！'
        },
        // 上传文件
        loadFile(event){
            var file = event.target.files[0];
            var fileSize = file.size; 
            if(fileSize > 102400000) {
                this.$message.warning('图片大小不能超过102400KB');
                return false;
            }
            this.$refs.file.value = null;
            this.files = file;
            var formData = new FormData();
            formData.append("projectId", this.bidInforId);
            formData.append("file", this.files);
            formData.append("fileType", '投标文件');
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/multifileUpload',
                data:formData
            }).then(res=>{
                if(res.data.status == 200){
                    this.successFlag = true;
                    this.successTitle = '上传投标文件成功!';
                    this.infoFlag = false;//上传投标文件按钮(禁止上传)
                    this.backoutFlag = true;// 撤销本次投标文件按钮
                    this.UploadList();// 查询附件
                }else if(res.data.status == 501){
                    this.$message.warning('文件不完整或文件破坏，请重新上传!');
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 查询附件
        UploadList(){
            let object={
                    relevanceCorrelationId:this.bidInforId,
                    fileType:'投标文件'
                }
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/queryAttachme',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.fileData = res.data.data;
                    if(this.fileData.length !=0){
                        this.backoutFlag = true;
                        this.infoFlag = false;
                    }else{
                        this.infoFlag = true;
                        this.backoutFlag = false;
                    }
                    this.fileData.forEach(item=>{
                        this.attachmeId = item.attachmeId;// 附件删除主键ID
                    })
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 删除附件
        deleteFile(){
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/deleteAttachem',
                data:{
                    attachmeId:[this.attachmeId]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.successFlag = true;
                    this.successTitle = '撤销成功!';
                    this.UploadList();
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    },
}
</script>
<style scoped>
.newBox{
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
	display: flex;
	flex-direction: column;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.pagination{
    padding: 0 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.el-collapse{
    width: 80%;
    margin: 10px auto;
}
/* 弹性盒flex-end */
.boxTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px 0 0;
    background: #e2e2e2;
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
    padding: 0 10px;
    color: #6e622e;
}

.editContent>.el-select{
    width: 100% !important;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.editBtn{
    height: 35px;
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

.btn {
  	height: 100%;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}

.perfectWrapper{
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
.perfectBox{
	width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.perfectTitle{
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
.uploadBox{
    width: 100%;
    padding:30px 200px;
    display: flex;
    justify-content: space-between;
}
.operateBox{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.operate{
    width:245px;
    height:130px;
    background:#0095d5;
    color:#fff;
    font-size:30px;
    text-align:center;
    line-height:130px;
    cursor:pointer;
    position: relative;
}
.messageBox{
    color: #6e622e;
    padding: 30px 0;
}
.revocationBox{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.revocation{
    width:245px;
    height:130px;
    background:#0095d5;
    color:#fff;
    font-size:30px;
    text-align:center;
    line-height:130px;
    cursor:pointer;
    margin-left: 5px;
    margin: 0 auto;
}
.file_btn{
    position: absolute;
    right:0;
    bottom: 0;
    display: inline-block;
    border: none;
    outline: none;
    width:100%;
    height:100%;
	background-color: transparent;
	filter: alpha(opacity=0);
	-moz-opacity: 0;
	-khtml-opacity: 0;
    opacity: 0;
    background: #ccc;
    cursor: pointer;
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

</style>