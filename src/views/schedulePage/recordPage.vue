<template>
    <!-- 合同备案 -->
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
                        <!-- 招标项目信息 -->
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">招标项目名称：</div>
										<div class="editContent">{{nameOfTenderProject}}</div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">招标(采购)人：</div>
										<div class="editContent">{{tenderPurchaserName}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">招标项目金额：</div>
										<div class="editContent">{{amountOfBiddingProject}}万元</div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">招标项目编号：</div>
										<div class="editContent">{{biddingProjectNumber}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">入场项目编号：</div>
										<div class="editContent">{{totalProjectNumber}}</div>
									</div>
								</div>
                                <div class="table_box"  v-if="this.entrySubcontractNumber!=null">
                                    <el-table :data="subpackageInfo" stripe style="width: 100%">
                                        <el-table-column
                                            label="序号"
                                            width="70">
                                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                        </el-table-column>
                                        <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractName"  label="分包名称">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="font-size:16px;cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
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
                                            <li v-for='(item,index) in scope.row.attachlist' :key="index" @click="downLoadupFile(item)" class="liItem">
                                                {{item.fileName}}
                                            </li>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                         <!-- 中标人信息 -->
                        <el-collapse-item title="中标人信息" name="3">
                            <div class="edit_list">
                                <el-table :data="winningBidData" stripe style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column label="中标单位名称" width="150">
                                        <template slot-scope="scope">
                                            <span>{{nameOfSuccessfulSupplier}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="projectLeader" label="项目负责人" >
                                    </el-table-column>
                                    <el-table-column label="中标金额(万元)" >
                                        <template slot-scope="scope">
                                            <span>{{winningAmountLowercase}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="winningBidPeriod" label="工期(日历天)" >
                                    </el-table-column>
                                    <el-table-column prop="qualityGradeOfWinningBid" label="质量等级" >
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 合同信息 -->
                        <el-collapse-item title="合同信息" name="4">
                            <div class="edit_list">
                                <!-- <div class="editItem">
									<div class="editCenter">
										<div class="editName">是否公示：</div>
										<div class="editContent">{{isPublicity}} </div>
									</div>
								</div> -->
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">合同编号：</div>
										<div class="editContent">{{contractCode}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">合同名称：</div>
										<div class="editContent">{{contractName}}</div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">合同金额(元)：</div>
										<div class="editContent">{{contractAmount}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">合同期限(日历天)：</div>
										<div class="editContent">{{contractDeadline}}</div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">合同签署时间：</div>
										<div class="editContent">{{contractSignTime}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">洽谈地点：</div>
										<div class="editContent">{{discussLocation}}</div>
									</div>
								</div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">质量要求：</div>
                                        <div class="editContent">{{qualityRequirements}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">合同主要内容：</div>
                                        <div class="editContent">{{contractContent}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公司内容 -->
                        <el-collapse-item title="公示内容" name="5">
                            <div class="edit_list">
                                <div class="infobox_title">
                                    <span>{{nameOfTenderProject}}</span>
                                    <h1>合同公示</h1>
                                    <p>{{createTime}}</p>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)人</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标人全称：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标人地址：</div>
                                        <div class="editContent">{{address}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标人联系方式：</div>
                                        <div class="editContent">{{contactInformation}}</div>
                                    </div>
                                </div>
                                <div  v-if="biddingOrganization == '委托招标'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:160px;">招标(采购)代理机构全称：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:160px;">招标(采购)代理机构地址：</div>
                                            <div class="editContent">{{agentAddress}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:180px;">招标(采购)代理机构联系方式：</div>
                                            <div class="editContent">{{agentPhone}}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- 中标人（成交供应商） -->
                                <div style="font-weight:bold;">中标人（成交供应商）</div>
                                <!--中标人（成交供应商）全称  -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:220px;">中标人（成交供应商）全称：</div>
                                        <div class="editContent">
                                            <span>{{nameOfSuccessfulSupplier}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!--中标人（成交供应商）地址  -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:220px;">中标人（成交供应商）地址：</div>
                                        <div class="editContent">
                                            <span>{{addressOfSuccessfulSupplier}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!--中标人（成交供应商）联系方式  -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:220px;">中标人（成交供应商）联系方式：</div>
                                        <div class="editContent">
                                            <span>{{phoneOfSuccessfulSupplier}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">合同内容</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">合同编号：</div>
                                        <div class="editContent">{{contractCode}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">合同名称：</div>
                                        <div class="editContent">{{contractName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">合同金额(元)：</div>
                                        <div class="editContent">{{contractAmount}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">合同期限(天)：</div>
                                        <div class="editContent">{{contractDeadline}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">合同签署时间：</div>
                                        <div class="editContent">{{contractSignTime}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">洽谈地点：</div>
                                        <div class="editContent">{{discussLocation}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">质量要求：</div>
                                        <div class="editContent">{{qualityRequirements}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">合同主要内容：</div>
                                        <div class="editContent">{{contractContent}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" >备注说明：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">项目联系人：</div>
                                        <div class="editContent">{{contacts}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">联系方式：</div>
                                        <div class="editContent">{{contactInformation}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">备注：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                                <div class="infobox_footer">
                                    <h3>{{creatorCompanyName}}</h3>
                                    <h3>{{createTime}}</h3>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="6">
                            <div class="edit_list">
                                <el-table :data="manageDate" style="width: 100%">
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
                                        <div class="editName">招标(采购)项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{nameOfPurchaser}} </div>
                                    </div>
                                    <div class="editCenter"  v-if="biddingOrganization == '委托招标'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)项目编号：</div>
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
    export default {
        data(){
            return {
                agentAddress:'',
                agentPhone : '',
                biddingOrganization:'',
                biddingPurchasingAgencyName:'',
                nameOfSuccessfulSupplier:'',//中标人名称
                addressOfSuccessfulSupplier:'',//地址
                phoneOfSuccessfulSupplier:'',//手机
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6'],
                // 文件查询
                fileData:[],
                // 文件上传所需字段
                enclosureData:[{
                    appendixName: "*合同签署",
                    attachlist: []
                }], 
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
                // 合同备案所需字段
                contacts:'',//联系人
                contactInformation:'',//联系方式
                isPublicity:'',//是否公示
                contractCode:'',//合同编号
                contractName:'',//合同名称
                contractAmount:'',//合同金额
                contractDeadline:'',//合同期限
                contractSignTime:'',//合同签署时间
                discussLocation:'',//洽谈地点
                qualityRequirements:'',//质量要求
                contractContent:'',//合同主要内容
                remark:'',// 备注说明
                creatorCompanyName:'',// 创建人名字
                createTime:'',// 创建时间
                projectLeader:'',// 项目联系人
                // 中标人信息
                winningBidData:[],
                address:'',// 招标（采购）人地址
                lookFlag:false,
                subpackageInfo:[],
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'是',// 是否电子招投标
                nameOfPurchaser:'',
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
            this.getWiningInforList();// 中标信息查询
            this.uploadList();// 附件查询列表
            if(this.entrySubcontractNumber !=null){
                this.getsubData();// 分包信息
            }
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
                    contractId:this.referenceId,
                    answer:'同意'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/contractController/approval',
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
                                this.$layer.msg(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$layer.msg(res.data.msg);
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
                    contractId:this.referenceId,
                    answer:'不同意'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/contractController/approval',
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
                                this.$layer.msg(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$layer.msg(res.data.msg);
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
                    url:baseUrl+"/contractController/"+this.referenceId
                }).then(res=>{
                    if(res.data.status == 200){
                        this.isPublicity = res.data.data.isPublicity ;//是否公示
                        this.contractCode = res.data.data.contractCode ;//合同编号
                        this.contractName = res.data.data.contractName ;//合同名称
                        this.contractAmount = res.data.data.contractAmount ;//合同金额
                        this.contractDeadline = res.data.data.contractDeadline ;//合同期限
                        this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD') ;//合同签署时间
                        this.discussLocation = res.data.data.discussLocation ;//洽谈地点
                        this.qualityRequirements = res.data.data.qualityRequirements ;//质量要求
                        this.contractContent = res.data.data.contractContent ;//合同主要内容
                        this.remark = res.data.data.remark ;// 备注说明
                        this.createTime = dayjs(res.data.data.createTime).format('YYYY-MM-DD');// 创建时间
                        this.creatorCompanyName = res.data.data.creatorCompanyName;// 创建人名称
                    }else{
                        this.$layer.msg(res.data.msg);
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
                        this.contactInformation = res.data.data.contactInformation//联系方式
                        this.contacts = res.data.data.contacts//联系人
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
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
                        this.subpackageInfo = res.data.data;// 项目分包列表
                        if(this.subpackageInfo.length>0){
                            this.subpackageInfo.forEach(item=>{
                                item.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                            })
                        }
                    }else{
                        this.$layer.msg(res.data.msg);
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
                this.scopeOfTender = row.scopeOfTender;// 招标范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额  
                this.nameOfTenderProject  = row.projectInformationVo.nameOfTenderProject;// 招标(采购)项目名称
                this.nameOfPurchaser = row.projectInformationVo.nameOfPurchaser;// 招标(采购)人
                this.biddingProjectNumber = row.projectInformationVo.biddingProjectNumber;// 招标项目编号
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            },
            closeLook(){
                this.lookFlag = false;
            },
            //中标信息
            getWiningInforList(){
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
                    url:baseUrl + '/winnResultController/select',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        let proNum = "";
                        this.winningBidData = res.data.data;
                        this.winningBidData.map((item,index)=>{
                            this.projectLeader = item.projectLeader;// 项目负责人
                            this.address = item.address;// 招标（采购）人地址
                            this.agentAddress = item.agentAddress;
                            this.agentPhone = item.agentPhone;
                        })
                        res.data.data[0].items.forEach((item)=>{
                            this.nameOfSuccessfulSupplier = item.nameOfSuccessfulSupplier;// 中标单位名称
                            this.winningAmountLowercase = item.winningAmountLowercase;// 中标金额
                            // if(this.entrySubcontractNumber != null){
                            //     proNum = item.entrySubcontractNumber
                            // }else{
                            //     proNum = item.projectCode
                            // }
                            // if(proNum == this.totalProjectNumber){
                                this.addressOfSuccessfulSupplier = item.addressOfSuccessfulSupplier;
                                this.nameOfSuccessfulSupplier = item.nameOfSuccessfulSupplier;
                                this.phoneOfSuccessfulSupplier = item.phoneOfSuccessfulSupplier;
                            // }
                        })
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 附件查询列表
            uploadList(){
                 var obj = {}
                if(this.entrySubcontractNumber!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'合同签署'
                    }
                }else{
                    // 入场项目编号
                    obj={
                        relevanceCorrelationId:this.totalItemId,
                        fileType:'合同签署'
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
                        this.$layer.msg(res.data.msg);
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
                        this.$layer.msg(res.data.msg)
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
/* 表格 */
.infobox{
    width: 100%;
    padding: 0 40px;
}
.infobox_title{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px dotted #7F7F7F;
}
.infobox_title span{
    font-size: 20px;
}
.infobox_title h1{
    font-size: 22px;
    font-weight: normal;
}
.infobox_title p{
    font-size: 12px;
}
.infobox_item{
    padding: 10px 0 10px 0;
}
.infobox_item>table>tr{
    text-align: center;
}
.infobox_footer{
    width: 100%;
    text-align: end;
}
</style>