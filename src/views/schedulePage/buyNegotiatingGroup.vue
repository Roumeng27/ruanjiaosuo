<template>
    <div class="newBox">
        <!-- 组建谈判小组 -->
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
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="entrySubcontractNumber != null">
                                <el-table
                                    ref="multipleTable"
                                    :data="subpackageData"
                                    style="width: 100%">
                                <el-table-column
                                    label="序号"
                                    width="70">
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
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="lookFile(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="2">
                            <div class="edit_list">
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
                            </div>
                        </el-collapse-item>
                        <!-- 评标专家 -->
                        <el-collapse-item title="评标专家" name="3">
                            <div class="edit_list">
                                <el-table :data="ownerList" stripe style="width: 100%" >
                                    <el-table-column label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column  prop="expertName" :show-overflow-tooltip ="true"  label="姓名" >
                                    </el-table-column>
                                    <el-table-column  prop="company" :show-overflow-tooltip ="true"  label="工作单位">
                                    </el-table-column>
                                    <el-table-column  prop="certified" :show-overflow-tooltip ="true"  label="职称/执业资格">
                                    </el-table-column>
                                    <el-table-column  prop="specialty" :show-overflow-tooltip ="true"  label="从事专业">
                                    </el-table-column>
                                    <el-table-column  prop="committeeJob"  :show-overflow-tooltip ="true" label="评标委员会担任工作" width="150">
                                    </el-table-column>
                                    <el-table-column  prop="expertType" :show-overflow-tooltip ="true" label="专家类型" >
                                    </el-table-column>
                                    <el-table-column prop="operation" label="查看" width="70">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search" style="cursor:pointer;" @click="viewInfo(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 回避信息 -->
                        <el-collapse-item title="回避信息" name="4">
                            <div class="edit_list">
                                <el-table
                                    ref="multipleTable"
                                    :data="avoidData"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                    <el-table-column
                                        label="序号"
                                        width="70">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="avoidCompanyName"
                                        label="回避单位名称">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="avoidCompanyInstitutionCode"
                                        label="回避单位机构代码">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="avoidReason"
                                        label="回避原因">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="5">
                            <div class="edit_list">
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
                            </div>
                        </el-collapse-item>
                    </el-collapse>
				</div>
            </div>
        </div>
        <!-- 查看评标专家 -->
        <div class="lookWrapper" v-show="viewFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看评标专家</p>
                    <i class="el-icon-close" @click="closeView"></i>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!--评标专家信息 -->
                        <el-collapse-item title="评标专家信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专家姓名：</div>
                                        <div class="editContent">{{expertName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">性别：</div>
                                        <div class="editContent">{{sex}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">年龄：</div>
                                        <div class="editContent">{{age}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">学历：</div>
                                        <div class="editContent">{{education}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">身份证号：</div>
                                        <div class="editContent">{{idNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">职务：</div>
                                        <div class="editContent">{{position}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">评标专家来源：</div>
                                        <div class="editContent">{{expertSource}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">工作单位：</div>
                                        <div class="editContent">{{company}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专家手机：</div>
                                        <div class="editContent">{{phone}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">职称/执业资格：</div>
                                        <div class="editContent">{{certified}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专家类型：</div>
                                        <div class="editContent">{{expertType}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">评标委员会担任工作：</div>
                                        <div class="editContent">{{committeeJob}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">从事专业：</div>
                                        <div class="editContent">{{specialty}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 查看分包详情 -->
        <div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                    <div class="editCenter" v-if="biddingOrganization == '委托招标'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectNumber}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
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
                                        <div class="editName">采购范围：</div>
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
         <el-dialog title="请输入意见" :visible.sync="agreeFlag" width="50%" :before-close="agreeSure">
            <div class="box">
                <button class="btn" @click="agreeSubmit">确认提交</button>
                <button class="btn" @click="agreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="remarks" :rows="6" ></el-input>
            </div>
        </el-dialog>
        <el-dialog title="请输入意见" :visible.sync="disAgreeFlag" width="50%" :before-close="disAgreeSure">
            <div class="box">
                <button class="btn" @click="disAgreeBack">确认退回</button>
                <button class="btn" @click="disAgreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="remarks" :rows="6" ></el-input>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import baseUrl from '../../api/api'
    import dayjs from "dayjs"
    import '../../assets/css/style.css'
    export default {
        data(){
            return {
                biddingOrganization:'',
                biddingPurchasingAgencyName:'',
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6'],
                // 文件上传所需字段
                enclosureData:[{
                    appendixName: "*采购人评委相关证明",
                    attachlist: []
                }],
                // 文件查询
                fileData:[],
                // 弹窗所需字段
                agreeFlag:false,// 同意
                disAgreeFlag:false,// 不同意
                remarks:'',// 备注
                // 办理记录所需字段
                manageDate:[],
                creationTime:'',// 时间
                ownerList:[],//评标专家
                avoidData:[],// 回避信息
                // 分包所需字段
                subpackageData:[],// 分包信息
                lookFlag:false,
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                scopeOfTender:'',// 采购范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'是',// 是否电子招投标
                //采购项目信息所需字段
                nameOfTenderProject:'',//采购项目名称
                biddingProjectNumber:'',//采购项目编号
                tenderPurchaserName:'',//采购(采购)人
                budgetAmount:'',//采购项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',//采购采购方式
                biddingOrganization:'',//采购组织方式
                typesOfBiddingProjects:'',//采购项目类型
                // 查看评标专家所需字段
                viewFlag:false,// 弹窗
                expertName:'',// 专家姓名
                sex:'',// 性别
                age:'',// 年龄
                education:'',// 学历
                idNumber:'',// 身份证号码
                position:'',// 职务
                expertSource:'',// 评标专家来源
                company:'',// 工作单位
                phone:'',// 专家手机
                certified:'',// 职称/执业资格
                expertType:'',// 专家类型
                committeeJob:'',// 评标委员会担任工作
                specialty:'',// 从事专业
                expertsId:'',// 评标专家ID
                // 路由接收参数
                referenceId:'',// 关联ID
                toDoListId:'',// 待办事项id
                auditStatus:'',// 审核状态
                businessLinks:'',// 待办名称
                totalItemId:'',// 总包keyID
                entrySubcontractNumber:'',// 入场项目项目分包编号
                totalProjectNumber:'',// 总包编号
                subItemId:'',// 分包keyID
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
            this.biddingOrganization = this.waitCase.biddingOrganization;
            this.getpageInfo();// 通过关联ID查询入场项目编号
            this.getbiddingInfo();// 招标项目信息
            this.uploadList();// 附件查询
            this.getmanageInfo();// 办理记录
            if(this.entrySubcontractNumber !=null){
                this.getsubData();// 分包信息
            }
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
                    answer: "同意",
                    expertsMainId: this.referenceId,
                    type:'组建谈判小组'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/ownerExpertsController/approval',
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
                                remarks: this.remarks
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
                    answer: "不同意",
                    expertsMainId: this.referenceId,
                    type:'组建谈判小组'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/ownerExpertsController/approval',
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
                                remarks: this.remarks
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
                 this.$axios({
                    method:'GET',
                    url:baseUrl+"/ownerExpertsController/"+this.referenceId
                }).then(res=>{
                    if(res.data.status == 200){
                        this.avoidData = res.data.data.listAvoids;// 回避单位信息
                        this.ownerList = res.data.data.listExperts;// 专家信息
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
                        this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 分包信息
            getsubData(){
                let object = {};
                if(this.entrySubcontractNumber != null){
                    object = {
                        projectEntrySubcontractNumbers:[this.entrySubcontractNumber]
                    }
                }else{
                    object = {
                        projectEntrySubcontractNumbers:[this.totalProjectNumber]
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.subpackageData = res.data.data;// 项目分包列表
                        if(this.subpackageData.length>0){
                            this.subpackageData.forEach(item=>{
                                item.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                            })
                        }
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 查看分包信息
            lookFile(row){
                this.lookFlag = true;
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称 
                this.subcontractContents = row.subcontractContents;// 分包内容
                this.scopeOfTender = row.scopeOfTender;// 采购范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额  
                this.nameOfTenderProject  = row.projectInformationVo.nameOfTenderProject;// 招标(采购)项目名称
                this.biddingProjectNumber = row.projectInformationVo.biddingProjectNumber;// 招标项目编号
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            },
            closeLook(){
                this.lookFlag = false;
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
            // 评标专家查看
            viewInfo(row){
                this.viewFlag =true;
                this.expertName=row.expertName;// 专家姓名
                this.sex=row.sex;// 性别
                this.age=row.age;// 年龄
                this.education=row.education;// 学历
                this.idNumber=row.idNumber;// 身份证号码
                this.position=row.position;// 职务
                this.expertSource=row.expertSource;// 评标专家来源
                this.company=row.company;// 工作单位
                this.phone=row.phone;// 专家手机
                this.certified=row.certified;// 职称/执业资格
                this.expertType=row.expertType;// 专家类型
                this.committeeJob=row.committeeJob;// 评标委员会担任工作
                this.specialty=row.specialty;// 从事专业
            },
            closeView(){
                this.viewFlag =false;
            },
            // 下载
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
                        $("body").append(a); 
                        a.click();
                        $(a).remove();
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }, 
            //上传列表
            uploadList(){
                if(this.entrySubcontractNumber!=null){
                    var obj={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'采购人评委相关证明'
                    }
                }else{
                    var obj={
                        relevanceCorrelationId:this.totalItemId,
                        fileType:'采购人评委相关证明'
                    }
                }
                this.$axios({
                    method: 'POST',
                    url: baseUrl + '/attachmeController/queryAttachme',
                    data:obj
                }).then(res=>{
                    if(res.data.status == 200){
                        this.fileData = res.data.data;
                        var arr = [];
                        this.fileData.map((item,index)=>{
                            item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
                            arr.push(item)
                        })
                        this.enclosureData[0].attachlist = arr;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
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
</style>