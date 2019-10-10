<template>
	<!-- 项目入场登记 -->
  	<div class="newBox">
		<!-- 主页面 -->
    	<div class="initWrapper">
			<div class="boxBtn">
                <button class="btn" @click="newManage">新建项目</button>
                <el-radio-group v-model="radio" size="small" @change="changeRadio">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="编辑中">编辑中</el-radio>
                    <el-radio label="待办理">待办理</el-radio>
                    <el-radio label="办理通过">办理通过</el-radio>
                    <el-radio label="办理未通过">办理未通过</el-radio>
                </el-radio-group> 
            </div>
			<!-- 搜索的输入框 -->
            <div class="editItem">
                <div class="editCenter">
                    <div class="editName">采购项目(分包)名称：</div>
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
					<el-table-column prop="totalProjectId" label="入场项目编号" width="180">
					</el-table-column>
					<el-table-column prop="nameOfTenderProject" label="采购项目名称" width="180">
					</el-table-column>
					<el-table-column prop="biddingProjectNumber" label="采购项目编号">
					</el-table-column>
					<el-table-column prop="nameOfPurchaser" label="招标(采购)人">
					</el-table-column>
					<el-table-column prop="biddingProcurementMode" label="招标采购方式">
					</el-table-column>
					<el-table-column prop="state" label="状态">
					</el-table-column>
					<el-table-column prop="operation" label="操作">
						<template slot-scope="scope">
							<i class="el-icon-edit" style="cursor:pointer;"  v-if="scope.row.state == '编辑中'" @click="lookItem(scope.row)"></i>
							<i class="el-icon-search" style="cursor:pointer;"  @click="lookItem(scope.row)" v-else></i>
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
		<!-- 保存及下一步页面 -->
		<div class="wrapper" v-show="writeFlag">
            <div class="wrapperBox">
                <div class="wrapper_title">
                    <p>{{titleInfo}}</p>
                    <i class="el-icon-close" @click="closeWrite"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="newly(1)">保存</button>
                    <button class="btn" @click="newly(2)">下一步</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                      	<!-- 立项基本信息 -->
                      	<el-collapse-item title="立项基本信息" name="1">
						  	<div class="edit_list">
							  	<div class="editItem">
									<div class="editTextarea">
										<div class="editName"><p class="star">*</p>批复项目名称：</div>
										<div class="editContent">
											<el-input v-model="approvalProjectName" clearable></el-input>
										</div>
									</div>
                            	</div>
								<!-- <div class="editItem">
									<div class="editCenter">
										<div class="editName">
											<el-button plain>挑选按钮</el-button>
										</div>
										<div class="editContent" style="color:#f00;">
											说明：此处为挑选立项信息项目;否则,请勿点击
										</div>
									</div>
                            	</div> -->
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>批复文号：</div>
                                        <div class="editContent">
											<el-input v-model="approvalNumber" clearable></el-input>
										</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>批复核准部门：</div>
                                        <div class="editContent">
											<el-input v-model="approvalAndApprovalDepartment" clearable></el-input>
										</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>监督部门：</div>
                                        <div class="editContent">
											<el-input v-model="supervisionDepartment" clearable></el-input>
										</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>核准部门：</div>
                                        <div class="editContent">
											<el-input v-model="auditDepartment" clearable></el-input>
										</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>项目所在地：</div>
                                        <div class="editContent">
											<el-cascader :options="addressData" v-model="localName" @change="handleChange" :props="props">
                                        	</el-cascader>
										</div>
                                    </div>
									<div class="editCenter">
                                        <div class="editName"><p class="star">*</p>是否为政府和社会资本合作PPP类项目：</div>
                                        <div class="editContent">
											<el-radio-group v-model="projectType">
												<el-radio  label="是">是</el-radio>
												<el-radio  label="否">否</el-radio>
											</el-radio-group>
										</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>是否涉密：</div>
                                        <div class="editContent">
											<el-radio-group v-model="isItConfidential">
												<el-radio label="是">是</el-radio>
												<el-radio label="否">否</el-radio>
											</el-radio-group>
										</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>资金来源：</div>
                                        <div class="editContent">
											<el-select  v-model="sourceOfFunds" clearable>
												<el-option v-for="item in SourcefundsData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</div>
                                    </div>
									<div class="editCenter">
                                        <div class="editName"><p class="star">*</p>项目资金总额(万元)：</div>
                                        <div class="editContent">
											<el-input v-model="totalProjectFunds" clearable @blur="checkMoney"></el-input>
										</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>资金构成：</div>
                                        <div class="contentBox">
											<div class="contentArea">
												<div class="contentItem">
													<span>国有资金：</span>
													<el-input @blur="sumAccount" v-model="stateOwnedFunds" style="width:110px  !important;"></el-input>
													<p>万元</p>
													<el-input  v-model="stateOwnedFundsPercentage" style="width:110px  !important;" disabled></el-input>
													<p>%</p>
												</div>
												<div class="contentItem">
													<span>自有资金：</span>
													<el-input @blur="ownMoney" v-model="ownFunds" style="width:110px  !important;"></el-input>
													<p>万元</p>
													<el-input   v-model="ownFundsPercentage" style="width:110px !important;" disabled></el-input>
													<p>%</p>
												</div>
											</div>
											<div class="contentArea">
												<div class="contentItem">
													<span>外国政府及组织资金：</span>
													<el-input @blur="foreignMoney" v-model="foreignGovernmentsAndOrganizationalFunds" style="width:110px  !important;"></el-input>
													<p>万元</p>
													<el-input  v-model="foreignGovernmentsAndOrganizationalFundsPercentage" style="width:110px  !important;" disabled></el-input>
													<p>%</p>
												</div>
												<div class="contentItem">
													<span>境外私人投资：</span>
													<el-input @blur="abroadMoney" v-model="overseasPrivateInvestment" style="width:110px  !important;"></el-input>
													<p>万元</p>
													<el-input  v-model="overseasPrivateInvestmentPercentage" style="width:110px !important;" disabled></el-input>
													<p>%</p>
												</div>
											</div>
										</div>
                                    </div>
                                </div>
						  </div>
                      	</el-collapse-item>
						<!-- 项目基本信息 -->
						<el-collapse-item title="项目基本信息" name="2">
								<div class="edit_list">
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>项目审批文件名称：</div>
											<div class="editContent">
												<el-input v-model="projectApprovalDocumentsName"></el-input>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>北京投资项目统一代码：</div>
											<div class="editContent">
												<el-input v-model="investmentProjectsUnifiedCode"></el-input>
											</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>项目法人：</div>
											<div class="editContent">
												<el-input v-model="projectLegalPerson"></el-input>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>项目法人代码：</div>
											<div class="editContent">
												<el-input v-model="projectLegalPersonCode"></el-input>
											</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>项目行业分类：</div>
											<div class="editContent">
												<el-select v-model="projectIndustryClassification" filterable placeholder="请选择">
													<el-option
													v-for="item in industryData"
													:key="item.value"
													:label="item.label"
													:value="item.value">
													</el-option>
												</el-select>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"></div>
											<div class="editContent"></div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>项目规模：</div>
											<div class="editContent">
												<el-input v-model="projectScale"></el-input>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>项目建立时间：</div>
											<div class="editContent">
												<el-date-picker value-format="timestamp" :picker-options="pickerOptions0" v-model="projectEstablishmentTime" type="datetime" placeholder="选择日期时间">
												</el-date-picker>
											</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>联系人：</div>
											<div class="editContent">
												<el-input v-model="contacts"></el-input>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>联系方式：</div>
											<div class="editContent">
												<el-input v-model="contactInformation" @blur="blurPhone"></el-input>
											</div>
										</div>
									</div>
								</div>
						</el-collapse-item>
						<!-- 项目预算信息 -->
						<el-collapse-item title="项目预算信息" name="3">
								<div class="edit_list">
									<div class="editItem">
										<div class="editTextarea">
											<div class="editName"><p class="star">*</p>项目名称：</div>
											<div class="editContent">
												<el-input v-model="entryName" clearable></el-input>
											</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>预算项目批准备案文号：</div>
											<div class="editContent">
												<el-input v-model="budgetProjectApprovalRecordNumber" clearable></el-input>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>预算受文单位：</div>
											<div class="editContent">
												<el-input v-model="budgetRecipientUnit" clearable></el-input>
											</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>预算受文单位代码：</div>
											<div class="editContent">
												<el-input v-model="budgetRecipientUnitCode" clearable></el-input>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>预算金额(万元)：</div>
											<div class="editContent">
												<el-input v-model="budgetAmount" clearable @blur="checkBudget"></el-input>
											</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>采购人名称：</div>
											<div class="editContent">
												<el-input v-model="nameOfPurchaser" clearable></el-input>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>采购人代码：</div>
											<div class="editContent">
												<el-input v-model="purchaserCode" clearable></el-input>
											</div>
										</div>
									</div>
								</div>
						</el-collapse-item>
						<!-- 采购项目信息 -->
						<el-collapse-item title="采购项目信息" name="4">
							<div class="edit_list">
								<div class="editItem">
										<div class="editTextarea">
											<div class="editName"><p class="star">*</p>采购项目名称：</div>
											<div class="editContent">
												<el-input v-model="nameOfTenderProject" clearable></el-input>
											</div>
										</div>
									</div>
									<!-- <div class="editItem">
										<div class="editCenter">
											<div class="editName">
												<el-button plain>挑选按钮</el-button>
											</div>
											<div class="editContent" style="color:#f00;">
												说明：若当前项目是由于采购异常产生的，请点击挑选项目；否则，请勿点击
											</div>
										</div>
									</div> -->
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>采购项目编号：</div>
											<div class="editContent">
												<el-input v-model="biddingProjectNumber" clearable></el-input>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>采购项目金额(万元)：</div>
											<div class="editContent">
												<el-input v-model="amountOfBiddingProject" clearable @blur="checkAmount()"></el-input>
											</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>招标采购方式：</div>
											<div class="editContent">
												<el-select  v-model="biddingProcurementMode" clearable  @change="getJudgeList()">
													<el-option v-for="item in openTenderData" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>招标(采购)组织方式：</div>
											<div class="editContent" >
												<el-select  v-model="biddingOrganization" clearable placeholder="请选择" disabled="disabled">
													<el-option v-for="item in organizaData" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>采购项目类型：</div>
											<div class="editContent">
												<el-select  v-model="typesOfBiddingProjects" clearable placeholder="请选择" >
													<el-option v-for="item in bidProjectData" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>专业类别：</div>
											<div class="editContent">
												<el-select  v-model="professionalCategory" clearable placeholder="请选择">
													<el-option v-for="item in academicDirectionData" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</div>	
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>是否公布预算：</div>
											<div class="editContent">
												<el-radio-group v-model="whetherAnnounceBudget">
													<el-radio label="是">是</el-radio>
													<el-radio label="否">否</el-radio>
												</el-radio-group>
											</div>
										</div>
										<div class="editCenter">
											<div class="editName"><p class="star">*</p>是否分包：</div>
											<div class="editContent">
												<el-radio-group v-model="isSubcontracting" @change="isCheckradio">
													<el-radio label="是">是</el-radio>
													<el-radio label="否">否</el-radio>
												</el-radio-group>
											</div>	
										</div>
									</div>
									<div v-show="isShowFlag">
										<div class="editItem">
											<div class="editCenter">
												<div class="editName"><p class="star">*</p>资格审查方式：</div>
												<div class="editContent">
													<el-select class="examination" :disabled="this.biddingProcurementMode === '邀请招标'?true:false"  v-model="qualificationExaminationMethod" clearable placeholder="请选择" >
														<el-option v-for="item in  titleExaminationData" :key="item.value" :label="item.label" :value="item.value">
														</el-option>
													</el-select>
												</div>
											</div>
											<div class="editCenter">
												<div class="editName"><p class="star">*</p>电子化开评标：</div>
												<div class="editContent">
													<el-radio-group v-model="electronicBidEvaluation">
														<el-radio label="是">是</el-radio>
														<el-radio label="否">否</el-radio>
													</el-radio-group>
												</div>	
											</div>
										</div>
										<div class="editItem">
											<div class="editTextarea">
												<div class="editName"><p class="star">*</p>采购内容：</div>
												<div class="editContent">
													<el-input v-model="tenderContents" readonly type="textarea" :rows="3"></el-input>
												</div>
											</div>
											<el-button plain @click="pickInfo">挑选</el-button>
										</div>
									</div>
							</div>
						</el-collapse-item>
						<!-- 委托代理协议 -->
						<el-collapse-item title="委托代理协议" name="5" v-if="role_types != '招标(采购)人'">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>委托代理协议名称：</div>
										<div class="editContent">
											<el-input v-model="agencyAgreementName" clearable></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editTextarea">
										<div class="editName"><p class="star">*</p>招标(采购)人：</div>
										<div class="editContent">
											<el-input v-model="tenderPurchaserName" disabled="disabled"></el-input>
										</div>
									</div>
									<el-button plain @click="pickWork()">挑选</el-button>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>项目负责人：</div>
										<div class="editContent">
											<el-input v-model="projectLeader" clearable></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>联系方式：</div>
										<div class="editContent">
											<el-input v-model="contactWay" clearable @click="phone_blur()"></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>招标(采购)代理机构：</div>
										<div class="editContent">
											<el-input v-model="biddingPurchasingAgencyName" disabled="disabled" clearable></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>项目负责人：</div>
										<div class="editContent">
											<el-input v-model="projectManager" clearable></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>联系方式：</div>
										<div class="editContent">
											<el-input v-model="relationWay" clearable @click="phone_blur()"></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>委托代理服务期限：</div>
										<div class="editContent">
											<el-date-picker
												v-model="serviceTime"
												:picker-options="pickerOptions0"
												type="daterange"
												value-format = "timestamp"
												range-separator="至"
												start-placeholder="开始日期"
												end-placeholder="结束日期"
												clearable>
											</el-date-picker>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>委托代理金额(万元)：</div>
										<div class="editContent">
											<el-input v-model="authorizedAmount" clearable></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName" style="width:220px;"><p class="star">*</p>委托代理服务收费金额(万元)：</div>
										<div class="editContent">
											<el-input v-model="agencyAuthorizedAmount" clearable></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>委托代理协议权限：</div>
										<div class="editContent">
											<el-checkbox-group v-model="agencyAgreementAuthority" @change="handleCheckedCitiesChange">
												<el-checkbox v-for="(item,index) in jurisdictionData" :label="item" :key="index">{{item}}</el-checkbox>
											</el-checkbox-group>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">其他：</div>
										<div class="editContent">
											<el-input v-model="rest" type="textarea"  clearable></el-input>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
		<!-- 上一步及提交页面 -->
		<div class="nextWrapper" v-show="nextFlag">
			<div class="nextWrapperBox">
				<div class="nextWrapper_title">
                    <p>{{titleInfo}}</p>
                    <i class="el-icon-close" @click="closeNext"></i>
                </div>
                <div class="box" v-show="headerBtn">
                    <button class="btn" @click="goBack">上一步</button>
                    <button class="btn" @click="submitInfo">提交</button>
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
													<span>国有资金：</span>
													<b style="width:110px  !important;">{{stateOwnedFunds}}</b>
													<p>万元</p>
													<b style="width:110px  !important;">{{stateOwnedFundsPercentage}}</b>
													<p>%</p>
												</div>
												<div class="contentItem">
													<span>自有资金：</span>
													<b style="width:110px  !important;">{{ownFunds}}</b>
													<p>万元</p>
													<b style="width:110px  !important;">{{ownFundsPercentage}}</b>
													<p>%</p>
												</div>
											</div>
											<div class="contentArea">
												<div class="contentItem">
													<span>外国政府及组织资金：</span>
													<b style="width:110px  !important;">{{foreignGovernmentsAndOrganizationalFunds}}</b>
													<p>万元</p>
													<b style="width:110px  !important;">{{foreignGovernmentsAndOrganizationalFundsPercentage}}</b>
													<p>%</p>
												</div>
												<div class="contentItem">
													<span>境外私人投资：</span>
													<b style="width:110px  !important;">{{overseasPrivateInvestment}}</b>
													<p>万元</p>
													<b style="width:110px  !important;">{{overseasPrivateInvestmentPercentage}}</b>
													<p>%</p>
												</div>
											</div>
										</div>
                                    </div>
                                </div>
						  </div>
                      	</el-collapse-item>
					  	<!-- 附件 -->
						<el-collapse-item title="附件" name="2" v-if="role_types == '招标(采购)人'">
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
								<el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem != '办理通过' && this.stateItem != '待办理'">
									<template slot-scope="scope">
										<i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row.id)"></i>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
						<el-collapse-item title="附件" name="2" v-else>
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
								<el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem != '办理通过' && this.stateItem != '待办理'">
									<template slot-scope="scope">
										<i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row.id)"></i>
									</template>
								</el-table-column>
							</el-table>
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
										<div class="editCenter">
											<div class="editName"></div>
											<div class="editContent"></div>
										</div>
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
						<el-collapse-item title="委托代理协议" name="6" v-if="role_types != '招标(采购)人'">
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
			</div>
		</div>
		<!-- 文件上传页面 -->
		<div class="uploadWrapper" v-show="uploadFlag">
			<div class="uploadWrapperBox">
				<div class="uploadWrapper_title">
					<p>{{uploadTitle}}</p>
					<i class="el-icon-close" @click="closeUpload"></i>
				</div>
				<div class="upload_box">
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
		<!-- 挑选页面 -->
        <div class="pickWrapper" v-show="pickFlag">
            <div class="pickBox">
                <div class="pick_title">
                    <p>分包内容</p>
                    <i class="el-icon-close" @click="closePick"></i>
                </div>
                <div class="pick_input">
                    <div class="noteItem">
                        <div class="noteLeft" style="width:140px;">请输入查找关键字：</div>
                        <div class="write_input" >
                            <el-input v-model="newName" clearable @keyup.enter.native="getPickInfo"></el-input>
                        </div>
                    </div>
                    <el-button plain @click="getPickInfo">检索</el-button>
                </div>
                <div class="pick_main">
                    <el-tree
                        :data="groupTreeData"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="DeviceGroupTree"
                        highlight-current
                        :props="defaultProps"
                        @check="checkGroupNode"
                    >
                    </el-tree>
                </div>
                <div class="pick_btn">
                    <button class="btn" @click="pickSure">确定选择</button>
                </div>
            </div>
        </div>
		<!-- 招标代理挑选页面 -->
		<div class="choisePage"  v-show="agentFlag">
			<div class="choiseBox">
				<div class="add_title">
					<p>单位列表</p>
					<i class="el-icon-close" @click="closePick"></i>
				</div>
				<div class="editItem">
					<div class="editCenter">
						<div class="editName">单位名称：</div>
						<div class="editContent">
							<el-input v-model="companyname" clearable  @keyup.enter.native="searchWorkData()"></el-input>
						</div>
					</div>
					<div class="editCenter">
						<div class="editName">组织机构代码：</div>
						<div class="editContent">
							<el-input v-model="organizationCode" clearable  @keyup.enter.native="searchWorkData()"></el-input>
						</div>
					</div>
					<button class="edit_btn" @click="searchWorkData()">搜索</button>
				</div>
				<div class="choise_main">
					<el-table
						ref="multipleTable"
						:data="workData"
						tooltip-effect="dark"
						style="width: 100%">
						<el-table-column align="center" width="55" label="" >
							<template slot-scope="scope">
								<el-radio :label="scope.row.ausId" v-model="templateRadio" @change.native="getWorkRow(scope.row)">&nbsp;</el-radio>
							</template>
						</el-table-column>
						<el-table-column
							label="序号">
							<template slot-scope="scope">{{ scope.$index+1 }}</template>
						</el-table-column>
						<el-table-column
							prop="companyName"
							label="单位名称">
						</el-table-column>
						<el-table-column
							prop="isStartUsing"
							label="单位状态">
						</el-table-column>
						<el-table-column
							label="选择">
							<template slot-scope="scope">
								<i class="el-icon-plus" @click="copyWorkItem(scope.row)"></i>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div>
					<!-- <div class="pagination" >
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page.sync="currentPage"
							:page-size="pageSize"
							layout="total, prev, pager, next, jumper"
							:total="total">
						</el-pagination>
					</div> -->
					<div style="text-align:center;padding-bottom:20px;">
						<button class="btn" @click="choiseWorkSure()">确定选择</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 保存弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="successBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>{{successTitle}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successSure">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import baseUrl from '../../api/api'
import {isPoneAvailable,formatDate,checkNumber,checkPhone} from '../../api/base.js'
import '../../assets/css/style.css'
import dayjs from "dayjs";
export default {
	components: {},
	props: {},
	data() {
		return {
			templateRadio:'',
			companyname:'',//单位名称
			organizationCode:'',//组织机构代码
			workData:[],//单位列表
			agentFlag:false,
			pickerOptions0: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
			},
			role_types:window.localStorage.role_types,
			agencyAgreementName:"",//委托代理协议名称
			tenderPurchaser:'',//招标采购人id
			tenderPurchaserName:'',//招标采购人名称
			projectLeader:'',//项目负责人
			contactWay:'',//联系方式
			biddingPurchasingAgency:window.localStorage.biddingPurchasingAgency,//招标采购代理机构id
			biddingPurchasingAgencyName:window.localStorage.biddingPurchasingAgencyName,//招标代理机构名称
			biddingPurchasingAgencyUserId:window.localStorage.biddingPurchasingAgencyUserId,//招标代理企业id
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
			arrLength:'',
			stateItem:'',
			activeName: ['1','2','3','4','5','6','7'],//弹框折叠效果 
			numberItem:'',// 搜索编号
			nameItem:'',// 搜索名称
			writeFlag:false,// 有保存和下一步按钮
			nextFlag:false,// 有上一步和提交按钮
			headerBtn:true,// 按钮展示
			isShowFlag:false,// 点击是否分包 如果是否 展示下边的内容
			successBox:false,// 成功弹窗
			successTitle:'',// 
			uploadFlag:false,// 上传弹窗
			uploadTitle:'',//入场项目(分包)编号
			pickFlag:false,// 挑选弹窗
			 // 分页器
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
			total: 0, //总条数
			pages:0,//后端返回的页数
			// 单选框
			radio:'',
			nameOfTender:'',// 招标项目(分包)名称
			totalProjectId:'',// 
			tableData:[],// 主体表格
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
			// 下拉框
			dropData:[],// 工程性质
			approvalData:[],//审批权限
			SourcefundsData:[],//资金来源
			industryData:[],//项目行业分类
			openTenderData:[],//招标采购方式
			
			bidProjectData:[],//招标项目类型
			academicDirectionData:[],//专业类别
			titleExaminationData:[],//资格审查方式
			addressData:[],//项目所在地data值
			localName:[],//项目所在地数组
			props: {
				label:'label',
				value:'label',
				children: 'children'
			},
			// 办理记录
			manageDate:[],
			creationTime:'',// 时间
			projectInformaPrimaryKeyId:'',// 保存完成后返回的主键ID
			state:'',// 状态
			totalProjectId:'',// 入场项目编号
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
				},
			],
			// 文件上传所需字段
			files:{},//文件
			fileName:'',//上传文件名称
			fileSize:'',//上传文件大小
			uploadingPeople:'',//上传人
			uploadTime:'',//上传时间
			fileData:[],//上传文件表格
			// 四级菜单
            groupTreeData:[],
            defaultProps: {
                children: 'children',
                label: 'label'
			},
			newName:'',// 
			newString:'',// 四级多选框选中的
			readonly:true,// input 只可读不可编辑
			titleInfo:'',// 弹窗标题
			attachmeId:'',// 删除所需ID
			rowWorkItem:'',
			userId:'',
			limits:'',//权限单独	
		}
	},
	created() {
		this.getList();// 项目入场登记列表
  	},
	methods: {
		getJudgeList(){
			if(this.biddingProcurementMode == "邀请招标"){
				this.qualificationExaminationMethod = '资格后审';
			}
		},
		handleCheckedCitiesChange(val) {
			
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
		// 项目入场登记列表
		getList(){
			let obj = {};
			if(this.role_types == "招标(采购)人"){
				obj = {
					pageSize:this.pageSize,
					pageNo:this.currentPage,
					procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
					biddingOrganization:'自行招标'
				}
			}else{
				obj = {
					pageSize:this.pageSize,
					pageNo:this.currentPage,
					procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
					biddingOrganization:'委托招标'
				}
			}
			this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selectList",
				data:obj
			}).then(res=>{
				if(res.data.status == 200){
					this.tableData = res.data.data.list;
					this.total = res.data.data.total;// 总条数
					this.pages = res.data.data.pages;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//搜索列表
		searchList(){
			let obj = {};
			if(this.role_types == "招标(采购)人"){
				obj = {
					totalProjectId:this.totalProjectId,
					nameOfTenderProject:this.nameItem,
					biddingProjectNumber:this.numberItem,
					nameOfPurchaser:this.nameOfPurchaser,
					biddingProcurementMode:this.biddingProcurementMode,
					state:this.state,
					pageSize:this.pageSize,
					pageNo:this.currentPage,
					procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
					biddingOrganization:'自行招标'
				}
			}else{
				obj = {
					totalProjectId:this.totalProjectId,
					nameOfTenderProject:this.nameItem,
					biddingProjectNumber:this.numberItem,
					nameOfPurchaser:this.nameOfPurchaser,
					biddingProcurementMode:this.biddingProcurementMode,
					state:this.state,
					pageSize:this.pageSize,
					pageNo:this.currentPage,
					procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
					biddingOrganization:'委托招标'
				}
			}
			this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selectList",
				data:obj
			}).then(res=>{
				if(res.data.status == 200){
					this.tableData = res.data.data.list;
					this.totalSize = res.data.data.total;
					this.pages = res.data.data.pages;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		//头部单选框的搜索
		changeRadio(){
			let obj = {};
			if(this.role_types == "招标(采购)人"){
				obj = {
					state:this.radio,
					pageSize:this.pageSize,
					pageNo:this.currentPage,
					procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
					biddingOrganization:'自行招标'
				}
			}else{
				obj = {
					state:this.radio,
					pageSize:this.pageSize,
					pageNo:this.currentPage,
					procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
					biddingOrganization:'委托招标'
				}
			}
			this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selectList",
				data:obj
			}).then(res=>{
				if(res.data.status == 200){
					this.tableData = res.data.data.list;
					this.totalSize = res.data.data.total;
					this.pages = res.data.data.pages;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		//编号问题
		typeIndex(index) {
			return index + (this.currentPage - 1) * 10 + 1;
		},
		// 新建项目
		newManage(){
			this.titleInfo = '新建项目入场登记信息';
			this.writeFlag = true;
			this.approvalProjectName='';//批复项目名称
			this.approvalNumber='';//批复文号
			this.approvalAndApprovalDepartment='';//核准部门
			this.supervisionDepartment='';//监督部门
			this.auditDepartment='';//核准部门
			this.projectLocation='';//项目所在地
			this.approvalJurisdiction='';//审批权限
			this.isItConfidential='';//是否涉密
			this.engineeringProperties='';//工程性质
			this.projectType='';//项目类型
			this.sourceOfFunds='';//资金来源
			this.totalProjectFunds=''; //项目资金总额
			this.stateOwnedFunds=''; //国有资金
			this.stateOwnedFundsPercentage=''; //国有资金百分比
			this.ownFunds=''; //自有资金
			this.ownFundsPercentage=''; //自有资金百分比
			this.foreignGovernmentsAndOrganizationalFunds=''; //外国政府
			this.foreignGovernmentsAndOrganizationalFundsPercentage=''; //外国政府百分比
			this.overseasPrivateInvestment=''; //境外人投资
			this.overseasPrivateInvestmentPercentage=''; //境外人投资百分比
			this.projectApprovalDocumentsName=''; //项目审批名称
			this.investmentProjectsUnifiedCode=''; //北京投资项目统一代码
			this.projectLegalPerson=''; //项目法人
			this.projectLegalPersonCode=''; //项目法人代码
			this.projectIndustryClassification='';//项目行业分类
			this.projectScale=''; //项目规模
			this.projectEstablishmentTime='';//项目建立时间
			this.contacts=''; //联系人
			this.contactInformation=''; //联系方式
			this.entryName=''; //项目名称
			this.budgetProjectApprovalRecordNumber=''; //项目批准备案文号
			this.budgetRecipientUnit='';//预算受文单位
			this.budgetRecipientUnitCode='';//预算受文单位代码
			this.budgetAmount=''; //预算金额
			this.nameOfPurchaser='';//采购人名称
			this.purchaserCode='';//采购人代码
			this.nameOfTenderProject='';//招标项目名称
			this.biddingProjectNumber='';//招标项目编号
			this.amountOfBiddingProject='';//招标项目金额
			this.biddingProcurementMode='';//招标采购方式
			this.biddingOrganization='';//招标组织方式
			this.typesOfBiddingProjects='';//招标项目类型
			this.professionalCategory='';//专业类别
			this.whetherAnnounceBudget='';//是否公布预算
			this.isSubcontracting='';//是否分包
			this.qualificationExaminationMethod='';//资格审查方式
			this.electronicBidEvaluation='';//电子化开评标
			this.tenderContents='';//招标内容
			this.agencyAgreementName = "";//委托代理协议名称
			this.tenderPurchaserName = "";//招标采购人
			this.projectLeader = "";//项目负责人
			this.contactWay = "";//联系方式
			this.biddingPurchasingAgencyName = window.localStorage.biddingPurchasingAgencyName;//招标采购代理机构
			this.projectManager = "";//项目负责人
			this.relationWay = "";//联系方式
			this.serviceTime = [];//期限
			this.authorizedAmount = "";//金额
			this.agencyAuthorizedAmount = "";//委托代理服务收费金额
			this.agencyAgreementAuthority = [];//权限
			this.rest = "";//其他
			this.projectInformaPrimaryKeyId = '';
			this.enclosureData[0].attachlist = [];
			this.enclosureData[1].attachlist = [];
			this.AnnexData[0].attachlist = [];
			this.AnnexData[1].attachlist = [];
			this.AnnexData[2].attachlist = [];
			this.addressList();// 项目所在地
			this.dropDown();// 工程性质
			this.approval();// 审批权限
			this.Sourcefunds();// 资金来源
			this.industryList();// 项目行业分类
			this.openTenderList();// 招标采购方式
			this.organizaList();// 招标组织方式
			this.bidProjectList();// 招标项目类型
			this.academicDirectionList();// 专业类别
			this.titleExaminationList();// 资格审查方式
			this.principalAgent();//委托代理权限
		},
		// 关闭新建项目弹窗
		closeWrite(){
			this.writeFlag = false;
		},
		// 查看
		lookItem(row){
			this.stateItem = row.state;
			if(row.state == '' || row.state == null){
				this.nextFlag = false;
				this.writeFlag = true;
			}else if(row.state == '编辑中' || row.state == '办理未通过'){
				this.nextFlag = true;
				this.writeFlag = false;
				this.headerBtn = true;
			}else{
				this.nextFlag = true;
				this.headerBtn = false;
				this.writeFlag = false;
			}
			this.totalProjectId = row.totalProjectId;
			this.titleInfo = '查看项目入场登记信息';
			this.approvalProjectName=row.approvalProjectName,//批复项目名称
			this.approvalNumber=row.approvalNumber;//批复文号
			this.approvalAndApprovalDepartment=row.approvalAndApprovalDepartment;//核准部门
			this.supervisionDepartment=row.supervisionDepartment;//监督部门
			this.auditDepartment=row.auditDepartment;//核准部门
			this.projectLocation=row.projectLocation;//项目所在地
			this.approvalJurisdiction=row.approvalJurisdiction;//审批权限
			this.isItConfidential=row.isItConfidential;//是否涉密
			this.engineeringProperties=row.engineeringProperties;//工程性质
			this.projectType=row.projectType;//项目类型
			this.sourceOfFunds=row.sourceOfFunds;//资金来源
			this.totalProjectFunds=row.totalProjectFunds;//项目资金总额
			this.stateOwnedFunds=row.stateOwnedFunds;//国有资金
			this.stateOwnedFundsPercentage=row.stateOwnedFundsPercentage;//国有资金百分比
			this.ownFunds=row.ownFunds;//自有资金
			this.ownFundsPercentage=row.ownFundsPercentage;//自有资金百分比
			this.foreignGovernmentsAndOrganizationalFunds=row.foreignGovernmentsAndOrganizationalFunds;//外国政府
			this.foreignGovernmentsAndOrganizationalFundsPercentage=row.foreignGovernmentsAndOrganizationalFundsPercentage;//外国政府百分比
			this.overseasPrivateInvestment=row.overseasPrivateInvestment;//境外人投资
			this.overseasPrivateInvestmentPercentage=row.overseasPrivateInvestmentPercentage;//境外人投资百分比
			this.projectApprovalDocumentsName=row.projectApprovalDocumentsName;//项目审批名称
			this.investmentProjectsUnifiedCode=row.investmentProjectsUnifiedCode;//北京投资项目统一代码
			this.projectLegalPerson=row.projectLegalPerson;//项目法人
			this.projectLegalPersonCode=row.projectLegalPersonCode;//项目法人代码
			this.projectIndustryClassification=row.projectIndustryClassification;//项目行业分类
			this.projectScale=row.projectScale;//项目规模
			this.projectEstablishmentTime=formatDate(row.projectEstablishmentTime);//项目建立时间
			this.contacts=row.contacts;//联系人
			this.contactInformation=row.contactInformation;//联系方式
			this.entryName=row.entryName;//项目名称
			this.budgetProjectApprovalRecordNumber=row.budgetProjectApprovalRecordNumber;//项目批准备案文号
			this.budgetRecipientUnit=row.budgetRecipientUnit;//预算受文单位
			this.budgetRecipientUnitCode=row.budgetRecipientUnitCode;//预算受文单位代码
			this.budgetAmount=row.budgetAmount;//预算金额
			this.nameOfPurchaser=row.nameOfPurchaser;//采购人名称
			this.purchaserCode=row.purchaserCode;//采购人代码
			this.nameOfTenderProject=row.nameOfTenderProject;//招标项目名称
			this.biddingProjectNumber=row.biddingProjectNumber;//招标项目编号
			this.amountOfBiddingProject=row.amountOfBiddingProject;//招标项目金额
			this.biddingProcurementMode=row.biddingProcurementMode;//招标采购方式
			this.biddingOrganization=row.biddingOrganization;//招标组织方式
			this.typesOfBiddingProjects=row.typesOfBiddingProjects;//招标项目类型
			this.professionalCategory=row.professionalCategory;//专业类别
			this.whetherAnnounceBudget=row.whetherAnnounceBudget;//是否公布预算
			this.isSubcontracting=row.isSubcontracting;//是否分包
			this.qualificationExaminationMethod=row.qualificationExaminationMethod;//资格审查方式
			this.electronicBidEvaluation=row.electronicBidEvaluation;//电子化开评标
			this.tenderContents=row.tenderContents;//招标内容
			this.projectInformaPrimaryKeyId = row.projectInformaPrimaryKeyId;
			//7.24新增
			this.agencyAgreementName = row.agencyAgreementName;//委托代理名称
			this.tenderPurchaser = row.tenderPurchaser;//招标代理人
			this.tenderPurchaserName = row.tenderPurchaserName;
			this.projectLeader = row.projectLeader;//项目负责人
			this.contactWay = row.contactWay;//联系方式
			this.biddingPurchasingAgency = row.biddingPurchasingAgency;//招标代理机构
			this.biddingPurchasingAgencyName = row.biddingPurchasingAgencyName;
			this.biddingPurchasingAgencyUserId = row.biddingPurchasingAgencyUserId;
			this.projectManager = row.projectManager;//项目负责人
			this.relationWay = row.relationWay;//联系方式
			this.servicePeriodOfAgencyStart = dayjs(row.servicePeriodOfAgencyStart).format('YYYY-MM-DD');
			this.servicePeriodOfAgencyEnd = dayjs(row.servicePeriodOfAgencyEnd).format('YYYY-MM-DD');
			this.authorizedAmount = row.authorizedAmount;//金额
			this.agencyAuthorizedAmount = row.agencyAuthorizedAmount;//委托代理金额
			this.stragencyAgreementAuthority = row.agencyAgreementAuthority;//权限
			this.rest = row.rest;//其他
			if(row.isSubcontracting == '否'){
				this.isShowFlag = true;
			}else{
				this.isShowFlag = false;
			}
			this.getmanageInfo();// 办理记录
			this.getOneList();// 立项批复文件附件
			this.getTwoList();// 项目负责人授权书附件
			this.getThreeList();//委托代理协议
		},
		handleClose(){
			this.successBox = false;
		},
		// 成功确定
		successSure(){
			this.successBox = false;
		},
		// 挑选单位列表
        pickWork(){
            this.agentFlag = true;
            this.companyname ='';
            this.organizationCode = '';
        },
        // 单位列表 搜索
        searchWorkData(){ 
            if(this.companyname == '' && this.organizationCode == ''){
                return ;       
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/userController/selectList",
                    data:{
                        companyName:this.companyname,
                        organizationCode:this.organizationCode,
                        type:'同步企业'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.workData = res.data.data.data;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
		},
		// 单位列表 单选框选择
        getWorkRow(row){
            this.rowWorkItem = row;
        },
        // 单位列表 确定选择
        choiseWorkSure(){
            this.agentFlag = false;
            this.tenderPurchaserName = this.rowWorkItem.companyName;// 企业名称
            this.bidCompany = this.rowWorkItem.userId;// 投标人ID
            this.organizationCode = this.rowWorkItem.organizationCode;// 企业组织机构代码
            this.tenderPurchaser = this.rowWorkItem.userId;// 企业ID
            this.workData = [];
        },
        // 单位列表 +
        copyWorkItem(row){
            this.agentFlag = false;
            this.tenderPurchaserName = row.companyName;// 企业名称
            this.bidCompany = row.userId;// 投标人ID
            this.organizationCode = row.organizationCode;// 企业组织机构代码
            this.tenderPurchaser = row.userId;// 企业ID
            this.workData = [];
			// this.getLever();// 获取企业资质和企业编号
        },
		// 保存和下一步
		newly(num){
			//保存
			if(this.role_types == "招标(采购)人"){
				if(!this.approvalProjectName) {
					this.$layer.msg("请输入批复项目名称");
					return false;
				}else if(!this.approvalNumber){
					this.$layer.msg("请输入批复文号");
					return false;
				}else if(!this.approvalAndApprovalDepartment){
					this.$layer.msg("请输入核准部门");
					return false;
				}else if(!this.supervisionDepartment){
					this.$layer.msg("请输入监督部门");
					return false;
				}else if(!this.auditDepartment){
					this.$layer.msg("请输入核准部门");
					return false;
				}else if(this.localName.length <= 0){
					this.$layer.msg("请选择项目所在地");
					return false;
				}else if(!this.isItConfidential){
					this.$layer.msg("请选择是否涉密");
					return false;
				}else if(!this.projectType){
					this.$layer.msg("请选择项目类型");
					return false;
				}else if(!this.sourceOfFunds){
					this.$layer.msg("请填写资金来源");
					return false;
				}else if(this.totalProjectFunds !='' && this.totalProjectFunds !=null  && !checkNumber(this.totalProjectFunds)){
					this.$layer.msg("请填写正确的项目资金总额");
					return false;
				}else if(!this.projectApprovalDocumentsName){
					this.$layer.msg("请填写项目审批名称");
					return false;
				}else if(!this.investmentProjectsUnifiedCode){
					this.$layer.msg("请填写北京投资项目统一代码");
					return false;
				}else if(!this.projectLegalPerson){
					this.$layer.msg("请填写项目法人");
					return false;
				}else if(!this.projectLegalPersonCode){
					this.$layer.msg("请填写项目法人代码");
					return false;
				}else if(!this.projectIndustryClassification){
					this.$layer.msg("请选择项目行业分类");
					return false;
				}else if(!this.projectScale){
					this.$layer.msg("请填写项目规模");
					return false;
				}else if(!this.projectEstablishmentTime){
					this.$layer.msg("请填写项目建立时间");
					return false;
				}else if(!this.contacts){
					this.$layer.msg("请填写联系人");
					return false;
				}else if(this.contactInformation != '' && this.contactInformation != null && !isPoneAvailable(this.contactInformation) && !checkPhone(this.contactInformation)){
					this.$layer.msg("请填写联系方式");
					return false;
				}else if(!this.entryName){
					this.$layer.msg("请填写项目名称");
					return false;
				}else if(!this.budgetProjectApprovalRecordNumber){
					this.$layer.msg("请填写项目批准备案文号");
					return false;
				}else if(!this.budgetRecipientUnit){
					this.$layer.msg("请填写预算受文单位");
					return false;
				}else if(!this.budgetRecipientUnitCode){
					this.$layer.msg("请填写预算受文单位代码");
					return false;
				}else if(this.budgetAmount!='' && this.budgetAmount!=null && !checkNumber(this.budgetAmount)){
					this.$layer.msg("请填写正确的预算金额");
					return false;
				}else if(!this.nameOfPurchaser){
					this.$layer.msg("请填写采购人名称");
					return false;
				}else if(!this.purchaserCode){
					this.$layer.msg("请填写采购人代码");
					return false;
				}else if(!this.nameOfTenderProject){
					this.$layer.msg("请填写采购项目名称");
					return false;
				}else if(!this.biddingProjectNumber){
					this.$layer.msg("请填写采购项目编号");
					return false;
				}else if(this.amountOfBiddingProject !='' && this.amountOfBiddingProject!=null && !checkNumber(this.amountOfBiddingProject)){
					this.$layer.msg("请填写正确的采购项目金额");
					return false;
				}else if(!this.biddingProcurementMode){
					this.$layer.msg("请填写招标采购方式");
					return false;
				}else if(!this.typesOfBiddingProjects){
					this.$layer.msg("请填写招标(采购)项目类型");
					return false;
				}else if(!this.professionalCategory){
					this.$layer.msg("请选择专业类别");
					return false;
				}else if(!this.whetherAnnounceBudget){
					this.$layer.msg("请选择是否公布预算");
					return false;
				}else if(!this.isSubcontracting){
					this.$layer.msg("请选择是否分包");
					return false;
				}else if(Number(this.stateOwnedFunds) + Number(this.ownFunds) + Number(this.foreignGovernmentsAndOrganizationalFunds) + Number(this.overseasPrivateInvestment) != this.totalProjectFunds){
					this.$layer.msg("请查看资金构成是否等于项目资金总额");
					return false;
				}else if(this.amountOfBiddingProject > this.totalProjectFunds){
					this.$layer.msg("采购项目金额不能大项目资金总额");
					return false;
				}else{
					// 判断是否分包
					if(this.isShowFlag == true){
						if(!this.qualificationExaminationMethod){
							this.$layer.msg("请输入资格审查方式!");
							return false;
						}else if(!this.electronicBidEvaluation){
							this.$layer.msg("请输入电子化开评标!");
							return false;
						}else if(!this.tenderContents){
							this.$layer.msg('请输入采购内容！');
							return false;
						}
						if(num == 1){
							this.saveInfo(num);// 保存
						}else{
							this.writeFlag = false;// 有保存和下一步按钮
							this.nextFlag = true;// 有上一步和提交按钮
							this.headerBtn = true;
							this.saveInfo(num);// 保存
						}
					}else {
						if(num == 1){
							this.saveInfo(num);// 保存
						}else{
							this.writeFlag = false;// 有保存和下一步按钮
							this.nextFlag = true;// 有上一步和提交按钮
							this.headerBtn = true;
							this.saveInfo(num);// 保存
						}
					}
				}
			}else{
				if(!this.approvalProjectName) {
					this.$layer.msg("请输入批复项目名称");
					return false;
				}else if(!this.approvalNumber){
					this.$layer.msg("请输入批复文号");
					return false;
				}else if(!this.approvalAndApprovalDepartment){
					this.$layer.msg("请输入核准部门");
					return false;
				}else if(!this.supervisionDepartment){
					this.$layer.msg("请输入监督部门");
					return false;
				}else if(!this.auditDepartment){
					this.$layer.msg("请输入核准部门");
					return false;
				}else if(this.localName.length <= 0){
					this.$layer.msg("请选择项目所在地");
					return false;
				}else if(!this.isItConfidential){
					this.$layer.msg("请选择是否涉密");
					return false;
				}else if(!this.projectType){
					this.$layer.msg("请选择项目类型");
					return false;
				}else if(!this.sourceOfFunds){
					this.$layer.msg("请填写资金来源");
					return false;
				}else if(this.totalProjectFunds !='' && this.totalProjectFunds !=null  && !checkNumber(this.totalProjectFunds)){
					this.$layer.msg("请填写正确的项目资金总额");
					return false;
				}else if(!this.projectApprovalDocumentsName){
					this.$layer.msg("请填写项目审批名称");
					return false;
				}else if(!this.investmentProjectsUnifiedCode){
					this.$layer.msg("请填写北京投资项目统一代码");
					return false;
				}else if(!this.projectLegalPerson){
					this.$layer.msg("请填写项目法人");
					return false;
				}else if(!this.projectLegalPersonCode){
					this.$layer.msg("请填写项目法人代码");
					return false;
				}else if(!this.projectIndustryClassification){
					this.$layer.msg("请选择项目行业分类");
					return false;
				}else if(!this.projectScale){
					this.$layer.msg("请填写项目规模");
					return false;
				}else if(!this.projectEstablishmentTime){
					this.$layer.msg("请填写项目建立时间");
					return false;
				}else if(!this.contacts){
					this.$layer.msg("请填写联系人");
					return false;
				}else if(this.contactInformation != '' && this.contactInformation != null && !isPoneAvailable(this.contactInformation) && !checkPhone(this.contactInformation)){
					this.$layer.msg("请填写联系方式");
					return false;
				}else if(!this.entryName){
					this.$layer.msg("请填写项目名称");
					return false;
				}else if(!this.budgetProjectApprovalRecordNumber){
					this.$layer.msg("请填写项目批准备案文号");
					return false;
				}else if(!this.budgetRecipientUnit){
					this.$layer.msg("请填写预算受文单位");
					return false;
				}else if(!this.budgetRecipientUnitCode){
					this.$layer.msg("请填写预算受文单位代码");
					return false;
				}else if(this.budgetAmount!='' && this.budgetAmount!=null && !checkNumber(this.budgetAmount)){
					this.$layer.msg("请填写正确的预算金额");
					return false;
				}else if(!this.nameOfPurchaser){
					this.$layer.msg("请填写采购人名称");
					return false;
				}else if(!this.purchaserCode){
					this.$layer.msg("请填写采购人代码");
					return false;
				}else if(!this.nameOfTenderProject){
					this.$layer.msg("请填写采购项目名称");
					return false;
				}else if(!this.biddingProjectNumber){
					this.$layer.msg("请填写采购项目编号");
					return false;
				}else if(this.amountOfBiddingProject !='' && this.amountOfBiddingProject!=null && !checkNumber(this.amountOfBiddingProject)){
					this.$layer.msg("请填写正确的采购项目金额");
					return false;
				}else if(!this.biddingProcurementMode){
					this.$layer.msg("请填写招标采购方式");
					return false;
				}else if(!this.typesOfBiddingProjects){
					this.$layer.msg("请填写招标(采购)项目类型");
					return false;
				}else if(!this.professionalCategory){
					this.$layer.msg("请选择专业类别");
					return false;
				}else if(!this.whetherAnnounceBudget){
					this.$layer.msg("请选择是否公布预算");
					return false;
				}else if(!this.isSubcontracting){
					this.$layer.msg("请选择是否分包");
					return false;
				}else if(!this.agencyAgreementName){
					this.$layer.msg("请填写委托代理协议名称");
					return false;
				}else if(!this.tenderPurchaserName){
					this.$layer.msg("请填写招标采购人");
					return false;
				}else if(!this.projectLeader){
					this.$layer.msg("请填写项目负责人");
					return false;
				}else if(!this.contactWay){
					this.$layer.msg("请填写联系方式");
					return false;
				}else if(this.contactWay != '' && this.contactWay != null && !isPoneAvailable(this.contactWay) && !checkPhone(this.contactWay)){
					this.$layer.msg("请填写正确的联系方式");
					return false;
				}else if(!this.relationWay){
					this.$layer.msg("请填写联系方式");
					return false;
				}else if(this.relationWay != '' && this.relationWay != null && !isPoneAvailable(this.relationWay) && !checkPhone(this.relationWay)){
					this.$layer.msg("请填写正确的联系方式");
					return false;
				}else if(!this.biddingPurchasingAgencyName){
					this.$layer.msg("请填写招标(采购)代理机构");
					return false;
				}else if(!this.projectManager){
					this.$layer.msg("请填写项目负责人");
					return false;
				}else if(this.serviceTime.length == 0){
					this.$layer.msg("请填写委托代理服务期限");
					return false;
				}else if(!this.authorizedAmount){
					this.$layer.msg("请填写委托代理金额");
					return false;
				}else if(this.authorizedAmount != '' && this.authorizedAmount != null && !checkNumber(this.authorizedAmount)){
					this.$layer.msg("请填写正确的委托代理金额");
					return false;
				}else if(!this.agencyAuthorizedAmount){
					this.$layer.msg("请填写委托代理服务收费金额");
					return false;
				}else if(this.agencyAuthorizedAmount != '' && this.agencyAuthorizedAmount != null && !checkNumber(this.agencyAuthorizedAmount)){
					this.$layer.msg("请填写委托代理金额");
					return false;
				}else if(this.agencyAgreementAuthority.length == 0){
					this.$layer.msg("请选择委托代理协议权限");
					return false;
				}else if(Number(this.stateOwnedFunds) + Number(this.ownFunds) + Number(this.foreignGovernmentsAndOrganizationalFunds) + Number(this.overseasPrivateInvestment) != this.totalProjectFunds){
					this.$layer.msg("请查看资金构成是否等于项目资金总额");
					return false;
				}else if(this.amountOfBiddingProject > this.totalProjectFunds){
					this.$layer.msg("采购项目金额不能大项目资金总额");
					return false;
				}else{
					// 判断是否分包
					if(this.isShowFlag == true){
						if(!this.qualificationExaminationMethod){
							this.$layer.msg("请输入资格审查方式!");
							return false;
						}else if(!this.electronicBidEvaluation){
							this.$layer.msg("请输入电子化开评标!");
							return false;
						}else if(!this.tenderContents){
							this.$layer.msg('请输入采购内容！');
							return false;
						}
						if(num == 1){
							this.saveInfo(num);// 保存
						}else{
							this.writeFlag = false;// 有保存和下一步按钮
							this.nextFlag = true;// 有上一步和提交按钮
							this.headerBtn = true;
							this.saveInfo(num);// 保存
						}
					}else {
						if(num == 1){
							this.saveInfo(num);// 保存
						}else{
							this.writeFlag = false;// 有保存和下一步按钮
							this.nextFlag = true;// 有上一步和提交按钮
							this.headerBtn = true;
							this.saveInfo(num);// 保存
						}
					}
				}
			}
		},
		// 保存的方法
		saveInfo(num){
			this.projectLocation = this.localName.join('');// 转成数组
			let object = {
				approvalProjectName:this.approvalProjectName,//批复项目名称
				approvalNumber:this.approvalNumber,//批复文号
				approvalAndApprovalDepartment:this.approvalAndApprovalDepartment,//核准部门
				supervisionDepartment:this.supervisionDepartment,//监督部门
				auditDepartment:this.auditDepartment,//核准部门
				projectLocation:this.projectLocation,//项目所在地
				approvalJurisdiction:this.approvalJurisdiction,//审批权限
				isItConfidential:this.isItConfidential,//是否涉密
				engineeringProperties:this.engineeringProperties,//工程性质
				projectType:this.projectType,//项目类型
				sourceOfFunds:this.sourceOfFunds,//资金来源
				totalProjectFunds:this.totalProjectFunds,//项目资金总额
				stateOwnedFunds:this.stateOwnedFunds,//国有资金
				stateOwnedFundsPercentage:this.stateOwnedFundsPercentage,//国有资金百分比
				ownFunds:this.ownFunds,//自有资金
				ownFundsPercentage:this.ownFundsPercentage,//自有资金百分比
				foreignGovernmentsAndOrganizationalFunds:this.foreignGovernmentsAndOrganizationalFunds,//外国政府
				foreignGovernmentsAndOrganizationalFundsPercentage:this.foreignGovernmentsAndOrganizationalFundsPercentage,//外国政府百分比
				overseasPrivateInvestment:this.overseasPrivateInvestment,//境外人投资
				overseasPrivateInvestmentPercentage:this.overseasPrivateInvestmentPercentage,//境外人投资百分比
				projectApprovalDocumentsName:this.projectApprovalDocumentsName,//项目审批名称
				investmentProjectsUnifiedCode:this.investmentProjectsUnifiedCode,//北京投资项目统一代码
				projectLegalPerson:this.projectLegalPerson,//项目法人
				projectLegalPersonCode:this.projectLegalPersonCode,//项目法人代码
				projectIndustryClassification:this.projectIndustryClassification,//项目行业分类
				projectScale:this.projectScale,//项目规模
				projectEstablishmentTime:this.projectEstablishmentTime,//项目建立时间
				contacts:this.contacts,//联系人
				contactInformation:this.contactInformation,//联系方式
				entryName:this.entryName,//项目名称
				budgetProjectApprovalRecordNumber:this.budgetProjectApprovalRecordNumber,//项目批准备案文号
				budgetRecipientUnit:this.budgetRecipientUnit,//预算受文单位
				budgetRecipientUnitCode:this.budgetRecipientUnitCode,//预算受文单位代码
				budgetAmount:this.budgetAmount,//预算金额
				nameOfPurchaser:this.nameOfPurchaser,//采购人名称
				purchaserCode:this.purchaserCode,//采购人代码
				nameOfTenderProject:this.nameOfTenderProject,//招标项目名称
				biddingProjectNumber:this.biddingProjectNumber,//招标项目编号
				amountOfBiddingProject:this.amountOfBiddingProject,//招标项目金额
				biddingProcurementMode:this.biddingProcurementMode,//招标采购方式
				biddingOrganization:this.biddingOrganization,//招标组织方式
				typesOfBiddingProjects:this.typesOfBiddingProjects,//招标项目类型
				professionalCategory:this.professionalCategory,//专业类别
				whetherAnnounceBudget:this.whetherAnnounceBudget,//是否公布预算
				isSubcontracting:this.isSubcontracting,//是否分包
				qualificationExaminationMethod:this.qualificationExaminationMethod,//资格审查方式
				electronicBidEvaluation:this.electronicBidEvaluation,//电子化开评标
				tenderContents:this.tenderContents,//招标内容
				//7.24新增
				agencyAgreementName : this.agencyAgreementName,//委托代理名称
				tenderPurchaser : this.tenderPurchaser,//招标代理人
				tenderPurchaserName:this.tenderPurchaserName,
				projectLeader : this.projectLeader,//项目负责人
				contactWay : this.contactWay,//联系方式
				biddingPurchasingAgencyName:this.biddingPurchasingAgencyName,
				biddingPurchasingAgency : window.localStorage.biddingPurchasingAgency,//招标代理机构
				biddingPurchasingAgencyUserId:window.localStorage.biddingPurchasingAgencyUserId,//委托代理机构企业id
				projectManager : this.projectManager,//项目负责人
				relationWay : this.relationWay,//联系方式
				servicePeriodOfAgencyStart : this.serviceTime[0],
				servicePeriodOfAgencyEnd : this.serviceTime[1],
				authorizedAmount : this.authorizedAmount,//金额
				agencyAuthorizedAmount : this.agencyAuthorizedAmount,//委托代理金额
				agencyAgreementAuthority : this.agencyAgreementAuthority.join(','),//权限
				rest : this.rest,//其他
				projectInformaPrimaryKeyId:this.projectInformaPrimaryKeyId
			}
			this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/saveOrNextStep",
				data:object
			}).then(res=>{
				if(res.data.status == 200){
					if(num == 1){
						this.successBox = true;
						this.successTitle = '保存成功!'
					}else{
						this.projectInformaPrimaryKeyId = res.data.data.projectInformaPrimaryKeyId;// 主键id
						this.successBox = false;
						this.getOneList();// 立项批复文件附件
						this.getTwoList();// 项目负责人授权书附件
						this.getThreeList();
					}
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
					this.stateOwnedFunds=res.data.data.stateOwnedFunds;//国有资金
					this.stateOwnedFundsPercentage=res.data.data.stateOwnedFundsPercentage;//国有资金百分比
					this.ownFunds=res.data.data.ownFunds;//自有资金
					this.ownFundsPercentage=res.data.data.ownFundsPercentage;//自有资金百分比
					this.foreignGovernmentsAndOrganizationalFunds=res.data.data.foreignGovernmentsAndOrganizationalFunds;//外国政府
					this.foreignGovernmentsAndOrganizationalFundsPercentage=res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage;//外国政府百分比
					this.overseasPrivateInvestment=res.data.data.overseasPrivateInvestment;//境外人投资
					this.overseasPrivateInvestmentPercentage=res.data.data.overseasPrivateInvestmentPercentage;//境外人投资百分比
					this.projectApprovalDocumentsName=res.data.data.projectApprovalDocumentsName;//项目审批名称
					this.investmentProjectsUnifiedCode=res.data.data.investmentProjectsUnifiedCode;//北京投资项目统一代码
					this.projectLegalPerson=res.data.data.projectLegalPerson;//项目法人
					this.projectLegalPersonCode=res.data.data.projectLegalPersonCode;//项目法人代码
					this.projectIndustryClassification=res.data.data.projectIndustryClassification;//项目行业分类
					this.projectScale=res.data.data.projectScale;//项目规模
					this.projectEstablishmentTime=formatDate(res.data.data.projectEstablishmentTime);//项目建立时间
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
					this.state = res.data.data.state;// 状态
					//7.24
					this.agencyAgreementName = res.data.data.agencyAgreementName;//委托代理名称
					this.tenderPurchaserName = res.data.data.tenderPurchaserName;//招标代理人
					this.tenderPurchaser = res.data.data.tenderPurchaser;//代理人id
					this.projectLeader = res.data.data.projectLeader;//项目负责人
					this.contactWay = res.data.data.contactWay;//联系方式
					this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;//招标代理机构
					this.biddingPurchasingAgencyUserId = res.data.data.biddingPurchasingAgencyUserId;
					this.biddingPurchasingAgency = res.data.data.biddingPurchasingAgency;
					this.projectManager = res.data.data.projectManager;//项目负责人
					this.relationWay = res.data.data.relationWay;//联系方式
					if(res.data.data.servicePeriodOfAgencyStart == null){
						this.servicePeriodOfAgencyStart = ""
					}else{
						this.servicePeriodOfAgencyStart = dayjs(res.data.data.servicePeriodOfAgencyStart).format('YYYY-MM-DD');
					}
					if(res.data.data.servicePeriodOfAgencyEnd == null){
						this.servicePeriodOfAgencyEnd = ""
					}else{
						this.servicePeriodOfAgencyEnd = dayjs(res.data.data.servicePeriodOfAgencyEnd).format('YYYY-MM-DD');
					}
					this.authorizedAmount = res.data.data.authorizedAmount;//金额
					this.agencyAuthorizedAmount = res.data.data.agencyAuthorizedAmount;//委托代理金额
					this.stragencyAgreementAuthority = res.data.data.agencyAgreementAuthority;//权限
					this.rest = res.data.data.rest;//其他
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 关闭查看
		closeNext(){
			this.nextFlag = false;
		},
		// 上一步
		goBack(){
			this.getBackinfo();// 上一步查询
			this.writeFlag = true;// 有保存和下一步按钮
			this.nextFlag = false;// 有上一步和提交按钮
			this.addressList();// 项目所在地
			this.dropDown();// 工程性质
			this.approval();// 审批权限
			this.Sourcefunds();// 资金来源
			this.industryList();// 项目行业分类
			this.openTenderList();// 招标采购方式
			this.organizaList();// 招标组织方式
			this.bidProjectList();// 招标项目类型
			this.academicDirectionList();// 专业类别
			this.titleExaminationList();// 资格审查方式
			this.principalAgent();
		},
		// 提交
		submitInfo(){
			if(this.role_types == '招标(采购)人'){
				if(this.enclosureData[0].attachlist == ""){
					this.$layer.msg('请选择立项批复文件');
					return false;
				}
			}else{
				if(this.AnnexData[0].attachlist == ""){
					this.$layer.msg('请选择立项批复文件');
					return false;
				}else if(this.AnnexData[2].attachlist == ""){
					this.$layer.msg('请选择委托代理协议');
					return false;
				}
			}
			this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/admissionProjectSubmission",
				data:{
					projectInformaPrimaryKeyId:this.projectInformaPrimaryKeyId,
					state:'待办理'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.successBox = true;
					this.successTitle ='提交成功！';
					this.nextFlag = false;// 有提交和上一步按钮
					this.writeFlag =false;// 有保存和下一步按钮
					this.getList();// 入场项目登记
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		// 项目所在地
		handleChange(value) {
			console.log(value)
		},
		// 是否分包
		isCheckradio(){
			if(this.isSubcontracting == '否'){
				this.isShowFlag = true;
			}else{
				this.isShowFlag = false;
			}
		},
		// 上一步查询
		getBackinfo(){
			this.$axios({
				method: "GET",
				url: baseUrl+"/projectInformationController/selectById/"+this.projectInformaPrimaryKeyId,
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
					this.stateOwnedFunds=res.data.data.stateOwnedFunds;//国有资金
					this.stateOwnedFundsPercentage=res.data.data.stateOwnedFundsPercentage;//国有资金百分比
					this.ownFunds=res.data.data.ownFunds;//自有资金
					this.ownFundsPercentage=res.data.data.ownFundsPercentage;//自有资金百分比
					this.foreignGovernmentsAndOrganizationalFunds=res.data.data.foreignGovernmentsAndOrganizationalFunds;//外国政府
					this.foreignGovernmentsAndOrganizationalFundsPercentage=res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage;//外国政府百分比
					this.overseasPrivateInvestment=res.data.data.overseasPrivateInvestment;//境外人投资
					this.overseasPrivateInvestmentPercentage=res.data.data.overseasPrivateInvestmentPercentage;//境外人投资百分比
					this.projectApprovalDocumentsName=res.data.data.projectApprovalDocumentsName;//项目审批名称
					this.investmentProjectsUnifiedCode=res.data.data.investmentProjectsUnifiedCode;//北京投资项目统一代码
					this.projectLegalPerson=res.data.data.projectLegalPerson;//项目法人
					this.projectLegalPersonCode=res.data.data.projectLegalPersonCode;//项目法人代码
					this.projectIndustryClassification=res.data.data.projectIndustryClassification;//项目行业分类
					this.projectScale=res.data.data.projectScale;//项目规模
					this.projectEstablishmentTime=res.data.data.projectEstablishmentTime;//项目建立时间
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
					
					this.agencyAgreementAuthority = res.data.data.agencyAgreementAuthority.split(',');//权限
					this.rest = res.data.data.rest;//其他
					this.serviceTime = [];
					this.serviceTime.push(res.data.data.servicePeriodOfAgencyStart,res.data.data.servicePeriodOfAgencyEnd)
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		downLoadupFile(item){
			this.downloadFile(item.attachmeId,item.fileName)
		},
		// 立项批复文件附件
		getOneList(){
			var obj={
				relevanceCorrelationId:this.projectInformaPrimaryKeyId,
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
					this.AnnexData[0].attachlist = arr;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		// 项目负责人授权书附件
		getTwoList(){
			var obj={
				relevanceCorrelationId:this.projectInformaPrimaryKeyId,
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
		getThreeList(){
			var obj={
				relevanceCorrelationId:this.projectInformaPrimaryKeyId,
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
		//上传列表
		uploadList(){
			var obj = {}
			if(this.num == 1){
				obj={
					relevanceCorrelationId:this.projectInformaPrimaryKeyId,
					fileType:'立项批复文件'
				}
			}else if(this.num == 2){
				obj={
					relevanceCorrelationId:this.projectInformaPrimaryKeyId,
					fileType:'项目负责人授权书'
				}
			}else{
				obj={
					relevanceCorrelationId:this.projectInformaPrimaryKeyId,
					fileType:'委托代理协议'
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
					if(this.num == 1){
						this.enclosureData[0].attachlist = arr
						this.AnnexData[0].attachlist = arr
					}else if(this.num == 2){
						this.enclosureData[1].attachlist = arr
						this.AnnexData[1].attachlist = arr
					}else{
						this.AnnexData[2].attachlist = arr
					}
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
			formData.append("projectId", this.projectInformaPrimaryKeyId);
			formData.append("file", this.files);
			if(this.num == 1){
				formData.append("fileType", '立项批复文件');
			}else if(this.num == 2){
				formData.append("fileType", '项目负责人授权书');
			}else{
				formData.append('fileType','委托代理协议')
			}
			this.$axios({
				method: 'POST',
				url: baseUrl + '/attachmeController/multifileUpload',
				data:formData
			}).then(res=>{
				if(res.data.status == 200){
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
		goUploadPage(num){
			this.uploadFlag = true;
			this.num = num;
			if(num == 1){
				this.uploadTitle = '立项批复文件'
			}else if(num == 2){
				this.uploadTitle = '项目负责人授权书'
			}else{
				this.uploadTitle = '委托代理协议'
			}
			this.uploadList();
		},
		closeUpload(){
			this.uploadFlag = false;
			this.uploadList();
		},
		// 办理记录
		getmanageInfo(){
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
		// 检验
		sumAccount(){
			if(this.totalProjectFunds !='' && this.totalProjectFunds !=null){
				this.stateOwnedFundsPercentage = (this.stateOwnedFunds/this.totalProjectFunds*100).toFixed(2);
			}
		},
		ownMoney(){
			if(this.totalProjectFunds !='' && this.totalProjectFunds !=null){
				this.ownFundsPercentage = (this.ownFunds/this.totalProjectFunds*100).toFixed(2);
			}
		},
		foreignMoney(){
			if(this.totalProjectFunds !='' && this.totalProjectFunds !=null){
				this.foreignGovernmentsAndOrganizationalFundsPercentage = (this.foreignGovernmentsAndOrganizationalFunds/this.totalProjectFunds*100).toFixed(2);
			}
		},
		abroadMoney(){
			if(this.totalProjectFunds !='' && this.totalProjectFunds !=null){
				this.overseasPrivateInvestmentPercentage = (this.overseasPrivateInvestment/this.totalProjectFunds*100).toFixed(2);
			}
		},
		checkMoney(){
			if(!checkNumber(this.totalProjectFunds)){
				this.$layer.msg('请输入数字类型');
			}
		},
		checkBudget(){
			if(!checkNumber(this.budgetAmount)){
				this.$layer.msg('请输入数字类型');
			}
		},
		checkAmount(){
			if(!checkNumber(this.amountOfBiddingProject)){
				this.$layer.msg('请输入数字类型');
			}
		},
		//校验手机号联系方式
		blurPhone(){
			if(!isPoneAvailable(this.contactInformation) && !checkPhone(this.contactInformation)){
				this.$layer.msg('请输入正确的联系方式');
			}
		},
		// 下拉框
		// 项目所在地
		addressList(){
			this.$axios({
				method:'GET',
				url:baseUrl + '/adderssController/selectAdderssList'
			}).then(res=>{
				if(res.data.status == 200){
					this.addressData = res.data.data
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
		},
			// 工程性质
		dropDown(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
				dropDownBox:'工程性质'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.dropData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 审批权限
		approval(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'审批权限'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.approvalData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 资金来源
		Sourcefunds(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'资金来源'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.SourcefundsData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 项目行业分类
		industryList(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'项目行业分类'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.industryData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 招标采购方式
		openTenderList(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'采购方式'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.openTenderData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 招标组织方式
		organizaList(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'招标组织方式'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.organizaData = res.data.data.data;
					if(this.role_types == "招标(采购)人"){
						this.biddingOrganization = res.data.data.data[0].value;
					}else{
						this.biddingOrganization = res.data.data.data[1].value;
					}
					
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 招标项目类型
		bidProjectList(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'采购项目类型'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.bidProjectData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 专业类别
		academicDirectionList(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'专业类别'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.academicDirectionData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//委托代理权限
		principalAgent(){
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'委托代理协议权限'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					let entrusted = [];
					res.data.data.data.forEach(item=>{
						entrusted.push(item.value);
					})
					this.jurisdictionData = entrusted;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 资格审查方式
		titleExaminationList(){ 
			this.$axios({
				method:'POST',
				url:baseUrl+'/interfaceTableController/selectByname',
				data:{
					dropDownBox:'资格审查方式'
				}
			}).then(res=>{
				if(res.data.data.status == 200){
					this.titleExaminationData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 挑选
		pickInfo(){
            this.pickFlag = true;
            this.getlevelList();// 四级菜单
        },
		// 四级菜单
        getlevelList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/qualificationMenuController/queryMenuList",
                data:{
					menuType:"标段(包)内容"
				}
            }).then(res=>{
                if(res.data.status == 200){
                    this.groupTreeData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
		},
		getPickInfo(){
			this.$axios({
                method: "POST",
                url: baseUrl+"/qualificationMenuController/queryMenuList",
                data:{
					menuType:"标段(包)内容",
					label:this.newName
				}
            }).then(res=>{
                if(res.data.status == 200){
                    this.groupTreeData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
			})
		},
		// 四级选中的内容
        checkGroupNode: function (a, b) {
			let arr = b.checkedNodes;
			this.arrLength = a.children.length
			let newArr = [];
			arr.forEach(item => {
				newArr.push(item.label)
			});
            this.newString = newArr.toString();
            if (b.checkedKeys.length > 0) {
                this.$refs.DeviceGroupTree.setCheckedKeys([a.id]);
            }
        },
        // 四级菜单 确定选择
        pickSure(){
			if(this.arrLength== 0){
				this.tenderContents = this.newString;
				this.pickFlag = false;
			}else{
				this.$layer.msg('请选择具体信息！');
			}
			
        },
        closePick(){
			this.pickFlag = false;
			this.agentFlag = false;
        },
 	},
};
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
	z-index: 99;
}
.wrapperBox,.nextWrapperBox{
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.uploadWrapperBox{
	width: 80%;
    height:70%;
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
    padding: 12px 20px;
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
    padding:12px 25px;
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
    width:200px;
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
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success,.el-icon-question{
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
.pickWrapper,.choisePage{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 9999;
    padding:100px 210px;
}
.pickBox,.lookBox,.winBox,.addBox,.editBox{
    width: 90%;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.mainInfo{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.choiseBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column; 
}
.choise_main{
    width: 100%;
    flex:1;
    overflow: hidden;
    overflow-y: scroll;
}
.choise_footer{
    width: 100%;
    height: 100px;
    padding:10px 20px;
    background-color: #eaeaea;
}
.pick_title,.search_title,.add_title,.edit_title{
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
.edit_btn{
    width: 120px;
    height: 35px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
    display: flex;
    justify-content: center;
    align-items: center;    
}
.pick_input{
    width: 100%;
    padding: 0 30px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sure_btn{
    position: absolute;
    left: 0;
    top: 460px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 140px;
    height: 40px;
}
.pagination{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>