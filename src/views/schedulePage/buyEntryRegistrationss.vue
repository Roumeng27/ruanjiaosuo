<template>
    <div class="newBox">
        <!-- 采购项目入场登记 -->
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
                      	<!-- 立项基本信息 -->
                      	<el-collapse-item title="立项基本信息" name="1">
						  	<div class="edit_list">
							  	<div class="editItem">
									<div class="editTextarea">
										<div class="editName">批复项目名称：</div>
										<div class="editContent">{{approvalProjectName}}</div>
									</div>
                            	</div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">批复文号：</div>
                                        <div class="editContent">{{approvalNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">批复核准部门：</div>
                                        <div class="editContent">{{approvalAndApprovalDepartment}}</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">监督部门：</div>
                                        <div class="editContent">{{supervisionDepartment}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">核准部门：</div>
                                        <div class="editContent">{{auditDepartment}}</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目所在地：</div>
                                        <div class="editContent">{{projectLocation}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">是否为政府和社会资本合作PPP类项目：</div>
                                        <div class="editContent"  style="padding-top:22px;">{{projectType}}</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">是否涉密：</div>
                                        <div class="editContent">{{isItConfidential}}</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">资金来源：</div>
                                        <div class="editContent">{{sourceOfFunds}}</div>
                                    </div>
									<div class="editCenter">
                                        <div class="editName">项目资金总额(万元)：</div>
                                        <div class="editContent">{{totalProjectFunds}}</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">资金构成：</div>
                                        <div class="contentBox">
											<div class="contentArea">
												<div class="contentItem">
													国有资金：{{stateOwnedFunds}}万元 {{stateOwnedFundsPercentage}}%
												</div>
												<div class="contentItem">
													自有资金：{{ownFunds}}万元 {{ownFundsPercentage}}%
												</div>
											</div>
											<div class="contentArea">
												<div class="contentItem">
													外国政府及组织资金：{{foreignGovernmentsAndOrganizationalFunds}} 万元 {{foreignGovernmentsAndOrganizationalFundsPercentage}}%
												</div>
												<div class="contentItem">
													境外私人投资：{{overseasPrivateInvestment}} 万元 {{overseasPrivateInvestmentPercentage}} %
												</div>
											</div>
										</div>
                                    </div>
                                </div>
						  </div>
                      	</el-collapse-item>
                        <!-- 附件 -->
						<el-collapse-item title="附件" name="2" v-if="biddingOrganization == '委托招标'">
							<div class="edit_list">
                                <el-table :data="AnnexData" stripe style="width: 100%">
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
					  	<!-- 附件 -->
						<el-collapse-item title="附件" name="2" v-else>
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
						<!-- 项目基本信息 -->
						<el-collapse-item title="项目基本信息" name="3">
								<div class="edit_list">
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">项目审批文件名称：</div>
											<div class="editContent">{{projectApprovalDocumentsName}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">北京投资项目统一代码：</div>
											<div class="editContent">{{investmentProjectsUnifiedCode}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">项目法人：</div>
											<div class="editContent">{{projectLegalPerson}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">项目法人代码：</div>
											<div class="editContent">{{projectLegalPersonCode}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">项目行业分类：</div>
											<div class="editContent">{{projectIndustryClassification}}</div>
										</div>
										<div class="editCenter"></div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">项目规模：</div>
											<div class="editContent">{{projectScale}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">项目建立时间：</div>
											<div class="editContent">{{projectEstablishmentTime}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">联系人：</div>
											<div class="editContent">{{contacts}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">联系方式：</div>
											<div class="editContent">{{contactInformation}}</div>
										</div>
									</div>
								</div>
						</el-collapse-item>
						<!-- 项目预算信息 -->
						<el-collapse-item title="项目预算信息" name="4">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">项目名称：</div>
                                        <div class="editContent">{{entryName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">预算项目批准备案文号：</div>
                                        <div class="editContent">{{budgetProjectApprovalRecordNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">预算受文单位：</div>
                                        <div class="editContent">{{budgetRecipientUnit}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">预算受文单位代码：</div>
                                        <div class="editContent">{{budgetRecipientUnitCode}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人名称：</div>
                                        <div class="editContent">{{nameOfPurchaser}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购人代码：</div>
                                        <div class="editContent">{{purchaserCode}}</div>
                                    </div>
                                </div>
                            </div>
						</el-collapse-item>
						<!-- 采购项目信息 -->
						<el-collapse-item title="采购项目信息" name="5">
							<div class="edit_list">
								<div class="editItem">
										<div class="editTextarea">
											<div class="editName">入场项目编号：</div>
											<div class="editContent">{{totalProjectId}}</div>
										</div>
									</div>
								<div class="editItem">
										<div class="editTextarea">
											<div class="editName">采购项目名称：</div>
											<div class="editContent">{{nameOfTenderProject}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">采购项目编号：</div>
											<div class="editContent">{{biddingProjectNumber}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">采购项目金额：</div>
											<div class="editContent">{{amountOfBiddingProject}}万元</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">招标采购方式：</div>
											<div class="editContent">{{biddingProcurementMode}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">招标(采购)组织方式：</div>
											<div class="editContent">{{biddingOrganization}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">采购项目类型：</div>
											<div class="editContent">{{typesOfBiddingProjects}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">专业类别：</div>
											<div class="editContent">{{professionalCategory}}</div>	
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">是否公布预算：</div>
											<div class="editContent">{{whetherAnnounceBudget}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">是否分包：</div>
											<div class="editContent">{{isSubcontracting}}</div>	
										</div>
									</div>
									<div v-show="isShowFlag"> 
										<div class="editItem">
											<div class="editCenter">
												<div class="editName">资格审查方式：</div>
												<div class="editContent">{{qualificationExaminationMethod}}</div>
											</div>
											<div class="editCenter">
												<div class="editName">电子化开评标：</div>
												<div class="editContent">{{electronicBidEvaluation}}</div>	
											</div>
										</div>
										<div class="editItem">
											<div class="editTextarea">
												<div class="editName">采购内容：</div>
												<div class="editContent">{{tenderContents}}</div>
											</div>
										</div>
									</div>
							</div>
						</el-collapse-item>
                        <!-- 委托代理协议 -->
						<el-collapse-item title="委托代理协议" name="6" v-if="biddingOrganization == '委托招标'">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">委托代理协议名称：</div>
										<div class="editContent">
											<span>{{agencyAgreementName}}</span>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editTextarea">
										<div class="editName">招标(采购)人：</div>
										<div class="editContent">
											<span>{{tenderPurchaserName}}</span>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">项目负责人：</div>
										<div class="editContent">
											<span>{{projectLeader}}</span>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">联系方式：</div>
										<div class="editContent">
											<span>{{contactWay}}</span>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">招标(采购)代理机构：</div>
										<div class="editContent">
											<span>{{biddingPurchasingAgencyName}}</span>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">项目负责人：</div>
										<div class="editContent">
											<span>{{projectManager}}</span>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">联系方式：</div>
										<div class="editContent">
											<span>{{relationWay}}</span>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">委托代理服务期限：</div>
										<div class="editContent">
											<span>{{servicePeriodOfAgencyStart}} -- {{servicePeriodOfAgencyEnd}}</span>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">委托代理金额(万元)：</div>
										<div class="editContent">
											<span>{{authorizedAmount}}</span>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName" style="width:220px;">委托代理服务收费金额(万元)：</div>
										<div class="editContent">
											<span>{{agencyAuthorizedAmount}}</span>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">委托代理协议权限：</div>
										<div class="editContent">
											<span>{{stragencyAgreementAuthority}}</span>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">其他：</div>
										<div class="editContent">
											<span>{{rest}}</span>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<!-- 办理记录 -->
						<el-collapse-item title="办理记录" name="7">
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
        <el-dialog title="请输入意见" :visible.sync="agreeFlag" width="50%" :before-close="agreeSure">
            <div class="box">
                <button class="btn" @click="agreeSubmit">确认提交</button>
                <button class="btn" @click="agreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="remarks" :rows="6"  ></el-input>
            </div>
        </el-dialog>
        <el-dialog title="请输入意见" :visible.sync="disAgreeFlag" width="50%" :before-close="disAgreeSure">
            <div class="box">
                <button class="btn" @click="disAgreeBack">确认退回</button>
                <button class="btn" @click="disAgreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="remarks" :rows="6"  ></el-input>
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
                agencyAgreementName:"",//委托代理协议名称
                tenderPurchaser:'',//招标采购人id
                tenderPurchaserName:'',//招标采购人名称
                projectLeader:'',//项目负责人
                contactWay:'',//联系方式
                biddingPurchasingAgency:'',//招标采购代理机构id
                biddingPurchasingAgencyName:"",//招标代理机构名称
                biddingPurchasingAgencyUserId:"",//招标代理企业id
                projectManager:'',//项目负责人
                relationWay:'',//联系方式
                servicePeriodOfAgencyStart:'',//委托代理服务期限(开始)
                servicePeriodOfAgencyEnd:"",//委托代理服务期限(开始)
                serviceTime:[],//委托代理期限
                authorizedAmount:"",//委托代理金额
                agencyAuthorizedAmount:"",//委托代理服务收费金额
                agencyAgreementAuthority:[],//委托代理协议权限
                stragencyAgreementAuthority:'',
                jurisdictionData:[],//权限数据
                rest:"",//其他
                waitCase:JSON.parse(window.localStorage.waitCase),
                stateItem:'',
                entrySubcontractNumber:"",//入场项目分包编号
                activeName:['1','2','3','4','5','6','7'],
                // 分包信息所需字段
                subpackageData:[],// 列表
                // 招标项目信息所需字段
                tenderPurchaserName:'',// 招标(采购)人
                scopeOfTender:'',// 招标范围	
                amountId:'',// 总包
                projectInformaPrimaryKeyId:'',// 详情ID
                subpackageInfo:[],// 修改项目分包 分包信息
                // 办理记录
                manageDate:[],
                creationTime:'',// 时间
                totalProjectFunds:'',// 项目资金总额
                // 文件上传所需字段
                enclosureData:[ //新建项目
                    {
                        id:1,
                        appendixName: "*立项批复文件",
                        attachlist: []
                    },
                    {
                        id:2,
                        appendixName: "项目负责人授权书",
                        attachlist: []
                    }
                ],
                AnnexData:[
                    {
                        id:1,
                        appendixName: "*立项批复文件",
                        attachlist: []
                    },
                    {
                        id:2,
                        appendixName: "项目负责人授权书",
                        attachlist: []
                    },
                    {
                        id:3,
                        appendixName: "*委托代理协议",
                        attachlist: []
                    }
                ],
                // 路由传参
                referenceId:'',// 关联ID
                toDoListId:'',// 待办事项id
                auditStatus:'',// 审核状态
                businessLinks:'',// 待办名称
                biddingOrganization:'',//招标组织方式
                subcontractItePrimaryKeyId:'',// 分包的keyID 
                projectCode:'',// 总包
                agreeFlag:false,
                disAgreeFlag:false,
                remarks:'',// 备注信息
                // 立项基本信息所需字段
                approvalProjectName:'',//批复项目名称
                approvalNumber:'',//批复文号
                approvalAndApprovalDepartment:'',//批复核准部门
                supervisionDepartment:'',//监督部门
                auditDepartment:'',//核准部门
                projectLocation:'',//项目所在地
                approvalJurisdiction:'',//审批权限
                isItConfidential:'是',//是否涉密
                engineeringProperties:'',//工程性质
                projectType:'是',//项目类型
                sourceOfFunds:'',//资金来源
                totalProjectFunds:'',//项目资金总额
                stateOwnedFunds:'',//国有资金
                stateOwnedFundsPercentage:'',//国有资金百分比
                ownFunds:'',//自有资金
                ownFundsPercentage:'',//自有资金百分比
                foreignGovernmentsAndOrganizationalFunds:'',//外国政府资金
                foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国政府资金百分比
                overseasPrivateInvestment:'',//境外人投资
                overseasPrivateInvestmentPercentage:'',//境外人投资百分比 
                // 项目基本信息所需字段
                projectApprovalDocumentsName:'',//项目审批名称
                investmentProjectsUnifiedCode:'',//北京投资项目统一代码
                projectLegalPerson:'',//项目法人
                projectLegalPersonCode:'',//项目法人代码
                projectIndustryClassification:'',//项目行业分类
                projectScale:'',//项目规模
                projectEstablishmentTime:'',//项目建立时间
                contacts:'',//联系人
                contactInformation:'',//联系方式
                // 项目预算信息所需字段
                entryName:'',//项目名称
                budgetProjectApprovalRecordNumber:'',//项目批准备案文号
                budgetRecipientUnit:'',//预算受文单位
                budgetRecipientUnitCode:'',//预算受文单位代码
                budgetAmount:'',//预算金额
                nameOfPurchaser:'',//采购人名称
                purchaserCode:'',//采购人代码
                // 招标项目信息所需字段
                nameOfTenderProject:'',//招标项目名称
                biddingProjectNumber:'',//招标项目编号
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',//招标采购方式
                organizaData:[],//招标组织方式
                biddingOrganization:'',//招标组织方式
                typesOfBiddingProjects:'',//招标项目类型
                professionalCategory:'',//专业类别
                whetherAnnounceBudget:'是',//是否公布预算
                isSubcontracting:'',//是否分包
                qualificationExaminationMethod:'',//资格审查方式
                electronicBidEvaluation:'是',//电子化开评标
                tenderContents:'',//招标内容
                totalProjectId:'',
                isShowFlag:false,
                // 文件查询
                fileData:[],
            }
        },
        created(){
            this.referenceId = this.waitCase.referenceId;// 关联ID
            this.toDoListId = this.waitCase.toDoListId;// 待办事项id
            this.auditStatus = this.waitCase.auditStatus;// 审核状态
            this.businessLinks = this.waitCase.businessLinks;// 待办名称
            this.biddingOrganization = this.waitCase.biddingOrganization;//招标组织方式
            this.getpageInfo();// 通过关联ID查询入场项目编号
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
                    answer: "同意",
                    projectInformaPrimaryKeyId: this.referenceId
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/projectInformationController/approval',
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
                    answer: "不同意",
                    projectInformaPrimaryKeyId: this.referenceId
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/projectInformationController/approval',
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
               return this.$axios({
                    method:'GET',
                    url:baseUrl+"/projectInformationController/selectById/"+this.referenceId
                }).then(res=>{
                    if(res.data.status == 200){
                        this.approvalProjectName=res.data.data.approvalProjectName,//批复项目名称
                        this.approvalNumber=res.data.data.approvalNumber;//批复文号
                        this.approvalAndApprovalDepartment=res.data.data.approvalAndApprovalDepartment;//核准部门
                        this.supervisionDepartment=res.data.data.supervisionDepartment;//监督部门
                        this.auditDepartment=res.data.data.auditDepartment;//核准部门
                        this.projectLocation=res.data.data.projectLocation;//项目所在地
                        this.approvalJurisdiction=res.data.data.approvalJurisdiction;//审批权限
                        this.isItConfidential=res.data.data.isItConfidential;//是否涉密
                        this.engineeringProperties=res.data.data.engineeringProperties;//工程性质
                        this.projectType=res.data.data.projectType;//项目类型
                        this.sourceOfFunds=res.data.data.sourceOfFunds;//资金来源
                        this.totalProjectFunds=res.data.data.totalProjectFunds;//项目资金总额
                        //国有资金
                        if(res.data.data.stateOwnedFunds == null){
                            this.stateOwnedFunds=0;
                        }else{
                            this.stateOwnedFunds=res.data.data.stateOwnedFunds;
                        }
                        //国有资金百分比
                        if(res.data.data.stateOwnedFundsPercentage == null){
                            this.stateOwnedFundsPercentage =0;
                        }else{
                            this.stateOwnedFundsPercentage=res.data.data.stateOwnedFundsPercentage;
                        }
                        //自有资金
                        if(res.data.data.ownFunds == null){
                            this.ownFunds=0;
                        }else{
                            this.ownFunds=res.data.data.ownFunds;
                        }
                        //自有资金百分比
                        if(res.data.data.ownFundsPercentage == null){
                            this.ownFundsPercentage =0;
                        }else{
                            this.ownFundsPercentage=res.data.data.ownFundsPercentage;
                        }
                        //外国政府
                        if(res.data.data.foreignGovernmentsAndOrganizationalFunds == null){
                            this.foreignGovernmentsAndOrganizationalFunds=0;
                        }else{
                            this.foreignGovernmentsAndOrganizationalFunds=res.data.data.foreignGovernmentsAndOrganizationalFunds;
                        }
                        //外国政府百分比
                        if(res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage == null){
                            this.foreignGovernmentsAndOrganizationalFundsPercentage =0;
                        }else{
                            this.foreignGovernmentsAndOrganizationalFundsPercentage=res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage;
                        }
                        //境外人投资
                        if(res.data.data.overseasPrivateInvestment == null){
                            this.overseasPrivateInvestment=0;
                        }else{
                            this.overseasPrivateInvestment=res.data.data.overseasPrivateInvestment;
                        }
                        //境外人投资百分比
                        if(res.data.data.overseasPrivateInvestmentPercentage == null){
                            this.overseasPrivateInvestmentPercentage =0;
                        }else{
                            this.overseasPrivateInvestmentPercentage=res.data.data.overseasPrivateInvestmentPercentage;
                        }
                        this.projectApprovalDocumentsName=res.data.data.projectApprovalDocumentsName;//项目审批名称
                        this.investmentProjectsUnifiedCode=res.data.data.investmentProjectsUnifiedCode;//北京投资项目统一代码
                        this.projectLegalPerson=res.data.data.projectLegalPerson;//项目法人
                        this.projectLegalPersonCode=res.data.data.projectLegalPersonCode;//项目法人代码
                        this.projectIndustryClassification=res.data.data.projectIndustryClassification;//项目行业分类
                        this.projectScale=res.data.data.projectScale;//项目规模
                        this.projectEstablishmentTime=dayjs(res.data.data.projectEstablishmentTime).format('YYYY-MM-DD HH:mm:ss');//项目建立时间
                        this.contacts=res.data.data.contacts;//联系人
                        this.contactInformation=res.data.data.contactInformation;//联系方式
                        this.entryName=res.data.data.entryName;//项目名称
                        this.budgetProjectApprovalRecordNumber=res.data.data.budgetProjectApprovalRecordNumber;//项目批准备案文号
                        this.budgetRecipientUnit=res.data.data.budgetRecipientUnit;//预算受文单位
                        this.budgetRecipientUnitCode=res.data.data.budgetRecipientUnitCode;//预算受文单位代码
                        this.budgetAmount=res.data.data.budgetAmount;//预算金额
                        this.nameOfPurchaser=res.data.data.nameOfPurchaser;//采购人名称
                        this.purchaserCode=res.data.data.purchaserCode;//采购人代码
                        this.nameOfTenderProject=res.data.data.nameOfTenderProject;//招标项目名称
                        this.biddingProjectNumber=res.data.data.biddingProjectNumber;//招标项目编号
                        this.amountOfBiddingProject=res.data.data.amountOfBiddingProject;//招标项目金额
                        this.biddingProcurementMode=res.data.data.biddingProcurementMode;//招标采购方式
                        this.biddingOrganization=res.data.data.biddingOrganization;//招标组织方式
                        this.typesOfBiddingProjects=res.data.data.typesOfBiddingProjects;//招标项目类型
                        this.professionalCategory=res.data.data.professionalCategory;//专业类别
                        this.whetherAnnounceBudget=res.data.data.whetherAnnounceBudget;//是否公布预算
                        this.isSubcontracting=res.data.data.isSubcontracting;//是否分包
                        this.qualificationExaminationMethod=res.data.data.qualificationExaminationMethod;//资格审查方式
                        this.electronicBidEvaluation=res.data.data.electronicBidEvaluation;//电子化开评标
                        this.tenderContents=res.data.data.tenderContents;//招标内容
                        this.projectInformaPrimaryKeyId = res.data.data.projectInformaPrimaryKeyId;// 主键id
                        this.totalProjectId = res.data.data.totalProjectId;// 入场项目编号
                        this.getOneList(res.data.data.projectInformaPrimaryKeyId);// 立项批复文件附件
                        this.getTwoList(res.data.data.projectInformaPrimaryKeyId);// 项目负责人授权书附件
                        this.getThreeList(res.data.data.projectInformaPrimaryKeyId)
                        //7.24
                        this.agencyAgreementName = res.data.data.agencyAgreementName;//委托代理名称
                        this.tenderPurchaser = res.data.data.tenderPurchaser;
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;//招标代理人
                        this.projectLeader = res.data.data.projectLeader;//项目负责人
                        this.contactWay = res.data.data.contactWay;//联系方式
                        this.biddingPurchasingAgency = res.data.data.biddingPurchasingAgency;
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;//招标代理机构
                        this.biddingPurchasingAgencyUserId = res.data.data.biddingPurchasingAgencyUserId;
                        this.projectManager = res.data.data.projectManager;//项目负责人
                        this.relationWay = res.data.data.relationWay;//联系方式
                        
                        this.authorizedAmount = res.data.data.authorizedAmount;//金额
                        this.agencyAuthorizedAmount = res.data.data.agencyAuthorizedAmount;//委托代理金额
                        
                        this.stragencyAgreementAuthority = res.data.data.agencyAgreementAuthority;//权限
                        this.rest = res.data.data.rest;//其他
                        this.servicePeriodOfAgencyStart = dayjs(res.data.data.servicePeriodOfAgencyStart).format('YYYY-MM-DD');
                        this.servicePeriodOfAgencyEnd = dayjs(res.data.data.servicePeriodOfAgencyEnd).format('YYYY-MM-DD');
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                })
            },
            // 办理记录
            async getmanageInfo(){
                await this.getpageInfo()
                let object={
                        projectId:this.projectInformaPrimaryKeyId,
                        relatedId:this.projectInformaPrimaryKeyId
                    }
                    
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/historyController/selectRegistrationList',
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
                        a.href = URL.createObjectURL(blob)
                        $("body").append(a); 
                        a.click();
                        $(a).remove();
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }, 
            // 立项批复文件附件
            getOneList(projectInformaPrimaryKeyId){
                var obj={
                    relevanceCorrelationId:projectInformaPrimaryKeyId,
                    fileType:'立项批复文件'
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
                        this.enclosureData[0].attachlist = arr
                        this.AnnexData[0].attachlist = arr
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            // 项目负责人授权书附件
            getTwoList(projectInformaPrimaryKeyId){
                var obj={
                    relevanceCorrelationId:projectInformaPrimaryKeyId,
                    fileType:'项目负责人授权书'
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
                        this.enclosureData[1].attachlist = arr
                        this.AnnexData[1].attachlist = arr
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            // 委托代理协议附件
            getThreeList(projectInformaPrimaryKeyId){
                var obj={
                    relevanceCorrelationId:projectInformaPrimaryKeyId,
                    fileType:'委托代理协议'
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
                        this.AnnexData[2].attachlist = arr
                    }else{
                        this.$layer.msg(res.data.msg);
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
.backlogBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.pageTitle{
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