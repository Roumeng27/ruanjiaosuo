<template>
    <div class="newBox">
        <div v-show="passJudgeShow">
            <!-- 项目分包 -->
            <div class="Wrapper" v-show="writeFlag">
                <el-collapse v-model="activeName" accordion>
                    <!--招标项目信息 -->
                    <el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter" style="color:red;">
                                    <div class="editName">项目编号(赋码)：</div>
                                    <div class="editContent"> </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter" style="color:red;">
                                    <div class="editName">招标项目编号(赋码)：</div>
                                    <div class="editContent"> </div>
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
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目金额：</div>
                                    <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目类型：</div>
                                    <div class="editContent">{{typesOfBiddingProjects}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标采购方式：</div>
                                    <div class="editContent">{{biddingProcurementMode}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标组织方式：</div>
                                    <div class="editContent">{{biddingOrganization}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 附件 -->
                    <el-collapse-item title="附件" name="2">
                        <el-table :data="enclosureData" stripe style="width: 100%">
                            <el-table-column prop="appendixName" label="附件名称" width="150">
                            </el-table-column>
                            <el-table-column label="附件列表(点击查看)">
                                <template slot-scope="scope">
                                    <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="liItem">
                                        {{item.fileName}}
                                    </li>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 分包信息 -->
                    <el-collapse-item title="分包信息" name="3">
                        <el-table
                            ref="multipleTable"
                            :data="subpackageData"
                            style="width: 100%">
                            <el-table-column
                                label="序号"
                                width="120">
                                <template slot-scope="scope">{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                prop="subcontractName"
                                label="分包名称"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="subcontractingControlAmount"
                                label="分包控制金额(万元)"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="projectSubcontractCreationTime"
                                label="创建时间"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column fixed="right" label="查看" width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 相关分包信息 -->
                    <el-collapse-item title="相关分包信息" name="4">
                        <el-table
                            ref="multipleTable"
                            :data="aboutList"
                            style="width: 100%">
                            <el-table-column
                                label="序号"
                                width="120">
                                <template slot-scope="scope">{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                prop="subcontractName"
                                label="分包名称"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="subcontractingControlAmount"
                                label="分包控制金额(万元)"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="projectSubcontractCreationTime"
                                label="创建时间"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column fixed="right" label="查看" width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="5">
                        <el-table :data="manageDate" stripe style="width: 100%">
                            <el-table-column  prop="step"  label="步骤">
                            </el-table-column>
                            <el-table-column  prop="userName"  label="办理人员">
                            </el-table-column>
                            <el-table-column  prop="creationTime"  label="时间">
                            </el-table-column>
                            <el-table-column  prop="state"  label="状态">
                            </el-table-column>
                            <el-table-column  prop="remarks"  label="备注">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <!-- 查看详情 -->
            <div class="lookWrapper" v-show="lookFlag">
                <div class="lookBox">
                    <div class="look_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeLook"></i>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="searchName" accordion>
                            <!--招标项目信息 -->
                            <el-collapse-item title="招标项目信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目名称：</div>
                                            <div class="editContent">{{nameOfTenderProject}} </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">招标项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人：</div>
                                            <div class="editContent">{{tenderPurchaserName}}</div>
                                        </div>
                                        <div class="editCenter" v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">入场项目编号：</div>
                                            <div class="editContent">{{amountId}}</div>
                                        </div>
                                    </div>
                            </div>
                            </el-collapse-item>
                            <!--分包信息 -->
                            <el-collapse-item title="分包信息" name="2">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter" style="color:red;">
                                            <div class="editName">标段包编号(赋码)：</div>
                                            <div class="editContent"> </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter" style="color:red;">
                                            <div class="editName">统一交易标志码：</div>
                                            <div class="editContent"> </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">入场项目分包编号：</div>
                                            <div class="editContent">{{entrySubcontractNumber}} </div>
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
                                            <div class="editName">分包内容：</div>
                                            <div class="editContent">{{subcontractContents}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标范围：</div>
                                            <div class="editContent">{{scopeOfTender}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">分包控制金额：</div>
                                            <div class="editContent">{{subcontractingControlAmount}}万元</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">资格审查方式：</div>
                                            <div class="editContent">{{qualificationExaminationMethod}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">是否电子招投标：</div>
                                            <div class="editContent">{{electronicBidEvaluation}} </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    
                </div>
            </div>
            <div class="uploadWrapper" v-show="uploadFlag">
                <div class="uploadBox">
                    <div class="upload_title">
                        <p>{{uploadTitle}}</p>
                        <i class="el-icon-close" @click="closeUpload"></i>
                    </div>
                    <div class="upload_btn">
                        <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
                        <button class="btn">上传</button>
                        <button class="btn" @click="deleteFile">删除</button>
                    </div>
                    <div class="main_info" style="display:flex;flex-direction:column;">
                        <el-table :data="fileData" style="width: 100%"  @selection-change="handleUploadChange">
                            <el-table-column type="selection" width="55" align='center'>
                            </el-table-column>
                            <el-table-column width="70" label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column prop="fileName" label="文件名称"  width="180">
                            </el-table-column>
                            <el-table-column  prop="fileSize" label="文件大小">
                            </el-table-column>
                            <el-table-column  prop="uploadingPeople" label="上传人">
                            </el-table-column>
                            <el-table-column  prop="formatTime" label="上传时间"  width="170">
                            </el-table-column>
                            <el-table-column prop="operation" label="下载">
                                <template slot-scope="scope">
                                    <span class="upload" @click="downloadFile(scope.row.attachmeId,scope.row.fileName)">点击下载</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <p class="star">★：附件上传大小限制为102400000 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 判断弹框 -->
        <div v-show="frameShow">
            <el-dialog
                title="系统提示"
                :visible.sync="frameShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>尚未发提交通过，无法进行项目分包操作!</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleClose()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div v-show="frameShow">
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
                    <el-button type="primary" @click="handleClose">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
    
</template>

<script>
import baseUrl from '../../../api/api.js'
import '../../../assets/css/style.css'
import {formatDate,isEmpty,formatTime} from '../../../api/base.js'
export default {
    data(){
        return {
            str_entrust_type:window.sessionStorage.str_entrust_type,
            role_types:window.localStorage.role_types,
            biddingPurchasingAgencyName:'',//招标代理机构
            dialogVisible:false,
            frameShow:false,
            passJudgeShow:true,//判断弹框
            activeName:['1','2','3','4','5','6'],// 主页面 卡片
            searchName:['1','2'],// 查看详情页面 卡片
            projectObj:JSON.parse(window.localStorage.projectObj),
            // 分页所需字段
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            tenderPurchaserName:'',// 招标(采购)人
			budgetAmount:'',// 招标项目预算金额
			amountOfBiddingProject:'',//招标项目金额
			biddingProcurementMode:'',// 招标采购方式
			biddingOrganization:'',// 招标组织方式
            typesOfBiddingProjects:'',// 招标项目类型
            amountId:'',// 总包 入场项目编号
            entrySubcontractNumber:'',//分包  入场项目编号
            // 分包信息所需字段
            subpackageData:[],
            // 相关分包信息所需字段
            aboutList:[],// 列表
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            // 展示页面所需字段
            writeFlag:true,
            entrySubcontractNumber:'',// 入场项目分包编号
            subcontractName:'',// 分包名称
            subcontractContents:'',// 分包内容
            scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
            // 查看详情所需字段
            lookFlag:false,
            // 文件上传所需字段
            enclosureData:[
                {
                    appendixName: "招标项目相关附件",
                    attachlist: []
                }
            ],
            headerBtn:true,
            uploadFlag:false,//
            uploadTitle:'',
            state:'', 
            num:'',
            params_type:'',
            files:{},//文件
            fileName:'',//上传文件名称
            fileSize:'',//上传文件大小
            uploadingPeople:'',//上传人
            uploadTime:'',//上传时间
            fileData:[],//上传文件表格
            attachmeId:[],// 选中的ID
            num:'',
            alertMsg:''

        }
    },
    created(){
        // this.getDecideList();
        this.getbiddingInfo();// 招标项目信息
        this.getlookOverInfo();// 分包信息
        this.getAboutInfo();// 相关分包信息
        this.getmanageInfo();// 办理记录
        this.uploadList();//上传列表
    },
    methods:{// 查看详情
        lookoverItem(row){
            this.getbiddingInfo();
            this.lookFlag = true
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            this.subcontractName = row.subcontractName;// 分包名称
            this.subcontractContents = row.subcontractContents;// 分包内容
            this.scopeOfTender = row.scopeOfTender;// 招标范围
            this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额
            this.qualificationExaminationMethod = row.qualificationExaminationMethod;// 资格审查方式
            this.electronicBidEvaluation = row.electronicBidEvaluation;// 资格审查方式		
        },
        // 关闭查看详情
        closeLook(){
            this.lookFlag = false
        },
        // 招标项目信息
        getbiddingInfo(){
            return this.$axios({
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
                    this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;//招标采购代理机构
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 分包信息
        getlookOverInfo(){
            let lookArr = [];
            lookArr.push(this.projectObj.totalProjectId)
            this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
				data:{
					projectEntrySubcontractNumbers:lookArr
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.subpackageData = res.data.data;// 项目分包列表
                    if(this.subpackageData.length>0){
                        this.subpackageData.forEach((item,index) => {
                            //  过滤时间格式
                            if(item.projectSubcontractCreationTime !=null){
                                item.projectSubcontractCreationTime = formatDate(item.projectSubcontractCreationTime)
                            }
                        });
                    }
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 相关分包信息
        async getAboutInfo(){
            await this.getbiddingInfo();// 招标项目信息
            this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectListByTotalProjectId",
				data:{
                    totalProjectId:this.amountId,// 入场项目（分包）编号
					pageNo:this.currentPage,
					pageSize:this.pageSize
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.aboutList = res.data.data.list;// 项目分包列表
                    if(this.aboutList.length>0){
                        this.aboutList.forEach((item,index) => {
                            //  过滤时间格式
                            if(item.projectSubcontractCreationTime != null && item.projectSubcontractCreationTime != ''){
                                item.projectSubcontractCreationTime = formatDate(item.projectSubcontractCreationTime)
                            }
                        });
                    }
                    
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
         // 办理记录
        getmanageInfo(){
            let object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.projectObj.subcontractItePrimaryKeyId
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
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
        },
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName);
        },
        //上传列表
        uploadList(){
            var object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'招标项目相关附件'
                }
            }else{
                // 入场项目编号
                object ={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'招标项目相关附件'
                }
            }
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/queryAttachme',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.fileData = res.data.data;
                    var arr = [];
                    this.fileData.map((item,index)=>{
                        if(item.uploadTime != null && item.uploadTime != ''){
                            item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
                        }
                        arr.push(item)
                    })
                    this.enclosureData[0].attachlist = arr;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        handleUploadChange(val){
            let deleteArr = [];
            for(let i in val){
                deleteArr.push(val[i].attachmeId);
            }
            this.attachmeId = deleteArr;
        },
        //删除文件列表
        deleteFile(){
            if(this.attachmeId.length<=0){
                this.$layer.msg('请选择要删除的文件!')
                return false;
            }else {
                this.$axios({
                    method: 'POST',
                    url: baseUrl + '/attachmeController/deleteAttachem',
                    data:{
                        attachmeId:this.attachmeId
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.uploadList();
                        for(var i=0;i<this.fileData.length;i++){
                            for(var j=0;j<this.attachmeId.length;j++){
                                if(this.fileData[i].attachmeId == this.attachmeId[j]){
                                    this.fileData.splice(i,1);
                                }
                            }
                        }
                }else{
                    this.$layer.msg(res.data.msg);
                }
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        //上传文件
        loadFile(event){
            var file = event.target.files[0];
            var fileSize = file.size; 
            if(fileSize > 102400000) {
                this.$layer.msg('图片大小不能超过102400000KB');
                return false;
            }
            this.$refs.file.value = null;
            this.files = file;
            var formData = new FormData();
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", "招标项目相关附件");
            }else{
                // 入场项目编号
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", "招标项目相关附件");
            }
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/multifileUpload',
                data:formData
            }).then(res=>{
                if(res.data.status == 200){
                    // debugger;
                    this.uploadList();
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
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
        //新建弹框下一步中的点击附件
        goUploadPage(row,num){
            this.uploadFlag = true;
            this.num = num;
            this.uploadTitle = row.appendixName;// 标题
            this.uploadList();
        },
        // 关闭弹窗
        closeUpload(){
            this.uploadFlag = false;
            this.uploadList();
        },
        //判断是否可以跳转下一个界面
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
                    let obj = {};
                    res.data.data.map((item,index)=>{
                        if(item.value == '招标异常'){
                            obj.zhaobiao = item;
                        }
                        if(item.value == '项目分包'){
                            obj.houxuanren = item
                        }
                        if(item.value == '项目入场登记'){
                            obj.ruchang = item
                        }
                    })
                    //招标勾且本业勾，可以看，
                    if(obj.zhaobiao.state == '办理通过' && obj.houxuanren.state == '办理通过'){
                        this.passJudgeShow = true;
                        this.frameShow = false;
                    //如果上一步打钩，进一步判断
                    }else if(obj.ruchang.state == '办理通过' ){
                        //如果招标打钩，则本业必须打勾
                        if(obj.zhaobiao.state == '办理通过'&& obj.houxuanren.state == '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                            //如果招标不打勾
                        }else if(obj.zhaobiao.state != '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        }else{
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成项目入场登记,无法进行项目分包!'
                            }
                        }
                    }else{
                        //其他的都不能看
                        this.passJudgeShow = false;
                        this.frameShow = true;
                        if(obj.zhaobiao.state == '办理通过'){
                            this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                        }else{
                            this.alertMsg = '尚未完成项目入场登记,无法进行招项目分包!'
                        }
                    }
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        handleClose(){
            this.frameShow = false;
            this.cancelShow = false;
        }
    }
}
</script>

<style scoped>
.newBox{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
}
.wrapper,.nextWrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
/* 检索页面 */
.lookWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
    display: flex;
    flex-direction: column;
	
}
.lookBox{
    width: 87%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.look_title{
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
	flex: 1;
	overflow: hidden;
	overflow-y: scroll;
}
.el-icon-close{
    font-size: 24px; 
}
.search_input{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 50px;
}
.write{
    display: flex;
    align-items: center;
}
.write p{
    width: 220px;
}
.pick_btn {
    position: absolute;
    left: 0;
    top: 500px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 40px;
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
    margin-right: 2px;
}
.el-collapse{
    width: 80%;
    margin: 10px auto;
}

.btn{
    padding: 10px;
}
.notic,h6,b{
    color:red;
}
/* 清空信息 */
.clear{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
}

.star{
    color: red;
    padding-right: 5px;
}

/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success,.el-icon-warning{
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
    text-align:right;
}
.editContent{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
}
.uploadWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding:50px;
    display: flex;
    flex-direction: column;
}
.uploadBox{
    width: 65%;
    height: 70%;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-top: 10%;
}
.upload_title{
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
.upload_btn{
	width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
	position: relative;
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
.file_btn{
    position: absolute;
    right: 85px;
    top: 0;
    display: inline-block;
    border:none;
    outline: none;
    width: 7%;
    height:100%;
	background-color: transparent;
	filter: alpha(opacity=0);
	-moz-opacity: 0;
	-khtml-opacity: 0;
    opacity: 0;
    background: #0095d5;
    cursor: pointer;
}
.main_info{
    width: 100%;
    margin-top: 2px;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
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
</style>