<template>
    <div class="newBox">
        <div class="wrapper" v-show="writeFlag">
            <div class="wrapperBox">
                <div class="wrapper_title">
                    <p>新建项目入场登记信息</p>
                    <!-- <i class="el-icon-close"></i> -->
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
                                        <div class="editName"><p class="star">*</p>审批权限：</div>
                                        <div class="editContent">
											<el-select  v-model="approvalJurisdiction" clearable>
												<el-option v-for="item in approvalData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
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
                                        <div class="editName"><p class="star">*</p>工程性质：</div>
                                        <div class="editContent">
											<el-select  v-model="engineeringProperties" clearable >
												<el-option v-for="item in dropData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
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
											<el-input v-model="totalProjectFunds" clearable></el-input>
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
													<el-input v-model="stateOwnedFundsPercentage" style="width:110px  !important;"></el-input>
													<p>%</p>
												</div>
												<div class="contentItem">
													<span>自有资金：</span>
													<el-input @blur="ownMoney" v-model="ownFunds" style="width:110px  !important;"></el-input>
													<p>万元</p>
													<el-input v-model="ownFundsPercentage" style="width:110px !important;"></el-input>
													<p>%</p>
												</div>
											</div>
											<div class="contentArea">
												<div class="contentItem">
													<span>外国政府及组织资金：</span>
													<el-input @blur="foreignMoney" v-model="foreignGovernmentsAndOrganizationalFunds" style="width:110px  !important;"></el-input>
													<p>万元</p>
													<el-input v-model="foreignGovernmentsAndOrganizationalFundsPercentage" style="width:110px  !important;"></el-input>
													<p>%</p>
												</div>
												<div class="contentItem">
													<span>境外私人投资：</span>
													<el-input @blur="abroadMoney" v-model="overseasPrivateInvestment" style="width:110px  !important;"></el-input>
													<p>万元</p>
													<el-input v-model="overseasPrivateInvestmentPercentage" style="width:110px !important;"></el-input>
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
											<el-select  v-model="projectIndustryClassification" clearable placeholder="请选择" >
												<el-option v-for="item in industryData" :key="item.value" :label="item.label" :value="item.value">
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
											<el-date-picker value-format="timestamp" v-model="projectEstablishmentTime" type="datetime" placeholder="选择日期时间">
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
                                        <div class="editName"><p class="star">*</p>预算金额：</div>
                                        <div class="editContent">
											<el-input v-model="budgetAmount" clearable></el-input>
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
                      
                      <!-- 招标项目信息 -->
                      <el-collapse-item title="招标项目信息" name="4">
						  <div class="edit_list">
							   <div class="editItem">
									<div class="editTextarea">
										<div class="editName"><p class="star">*</p>招标项目名称：</div>
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
											说明：若当前项目是由于招标异常产生的，请点击挑选项目；否则，请勿点击
										</div>
									</div>
                            	</div> -->
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>招标项目编号：</div>
                                        <div class="editContent">
											<el-input v-model="biddingProjectNumber" clearable></el-input>
										</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>招标项目金额：</div>
                                        <div class="editContent">
											<el-input v-model="amountOfBiddingProject" clearable></el-input>
										</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>招标采购方式：</div>
                                        <div class="editContent">
											<el-select  v-model="biddingProcurementMode" clearable>
												<el-option v-for="item in openTenderData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>招标组织方式：</div>
                                        <div class="editContent">
											<el-select  v-model="biddingOrganization" clearable placeholder="请选择" disabled="disabled">
												<el-option v-for="item in organizaData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>招标项目类型：</div>
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
                                        <div class="editName"><p class="star">*</p>是否涉密：</div>
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
											<el-radio-group v-model="isSubcontracting" @change="isCheckradio()">
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
												<el-select  v-model="qualificationExaminationMethod" clearable placeholder="请选择" >
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
											<div class="editName"><p class="star">*</p>招标内容：</div>
											<div class="editContent">
												<el-input v-model="tenderContents" clearable></el-input>
											</div>
										</div>
										<el-button plain>挑选</el-button>
									</div>
								</div>
						  </div>
                      </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
		<div class="nextWrapper" v-show="nextFlag">
			<div class="nextWrapperBox">
				<div class="nextWrapper_title">
                    <p>查看项目入场登记信息</p>
                    <!-- <i class="el-icon-close"></i> -->
                </div>
                <div class="box">
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
                                        <div class="editName">审批权限：</div>
                                        <div class="editContent">{{approvalJurisdiction}}</div>
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
                                        <div class="editName">工程性质：</div>
                                        <div class="editContent">{{engineeringProperties}}</div>
                                    </div>
									<div class="editCenter">
                                        <div class="editName">是否为政府和社会资本合作PPP类项目：</div>
                                        <div class="editContent">{{projectType}}</div>
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
								<el-table-column fixed="right" label="操作" width="100">
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
											<div class="editContent">{{projectScale}}</div>
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
											<div class="editContent">{{budgetAmount}}</div>
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
						<!-- 招标项目信息 -->
						<el-collapse-item title="招标项目信息" name="5">
							<div class="edit_list">
								<div class="editItem">
										<div class="editTextarea">
											<div class="editName">入场项目编号：</div>
											<div class="editContent">{{totalProjectId}}</div>
										</div>
									</div>
								<div class="editItem">
										<div class="editTextarea">
											<div class="editName">招标项目名称：</div>
											<div class="editContent">{{nameOfTenderProject}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">招标项目编号：</div>
											<div class="editContent">{{biddingProjectNumber}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">招标项目金额：</div>
											<div class="editContent">{{amountOfBiddingProject}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">招标采购方式：</div>
											<div class="editContent">{{biddingProcurementMode}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">招标组织方式：</div>
											<div class="editContent">{{biddingOrganization}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">招标项目类型：</div>
											<div class="editContent">{{typesOfBiddingProjects}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">专业类别：</div>
											<div class="editContent">{{professionalCategory}}</div>	
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">是否涉密：</div>
											<div class="editContent">{{whetherAnnounceBudget}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">是否分包：</div>
											<div class="editContent">{{isSubcontracting}}</div>	
										</div>
									</div>
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
											<div class="editName"><p class="star">*</p>招标内容：</div>
											<div class="editContent">{{tenderContents}}</div>
										</div>
									</div>
							</div>
						</el-collapse-item>
						<!-- 办理记录 -->
						<el-collapse-item title="办理记录" name="6">
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
					<el-table :data="fileData" style="width: 100%"  @selection-change="handleSelectionChange">
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
	import baseUrl from '../../api/api.js';
	import {isPoneAvailable,formatDate} from '../../api/base.js';
	import '.././../assets/css/base.css'
	import dayjs from "dayjs";
    export default {
        data(){
            return {
				activeName: ['1','2','3','4','5','6'],//弹框折叠效果 
				writeFlag:true,// 有保存和下一步按钮
				nextFlag:false,// 有上一步和提交按钮
				isShowFlag:false,// 点击是否分包 如果是否 展示下边的内容
				successBox:false,// 成功弹窗
				successTitle:'',// 
				uploadFlag:false,// 上传弹窗
				uploadTitle:'',//
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
				organizaData:[],//招标组织方式
				bidProjectData:[],//招标项目类型
				academicDirectionData:[],//专业类别
				titleExaminationData:[],//资格审查方式
				options: [{ //select选项
					value: '选项1',
					label: '黄金糕'
					}, {
					value: '选项2',
					label: '双皮奶'
					}, {
					value: '选项3',
					label: '蚵仔煎'
					}, {
					value: '选项4',
					label: '龙须面'
					}, {
					value: '选项5',
					label: '北京烤鸭'
					}],
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
				// 文件上传所需字段
				files:{},//文件
				fileName:'',//上传文件名称
				fileSize:'',//上传文件大小
				uploadingPeople:'',//上传人
				uploadTime:'',//上传时间
				fileData:[],//上传文件表格
            }
		},
		created(){
			if(this.projectInformaPrimaryKeyId!= ''){
				this.getBackinfo();// 初始化查询
			}
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
		},
		methods:{
			handleClose(){
				this.successBox = false;
			},
			// 成功确定
			successSure(){
				this.successBox = false;
			},
			// 保存和下一步
			newly(num){
				if(num == 1){
					// 保存
					if(!this.approvalProjectName) {
						this.$message.warning("请输入批复项目名称");
						return false;
					}else if(!this.approvalNumber){
						this.$message.warning("请输入批复文号");
						return false;
					}else if(!this.approvalAndApprovalDepartment){
						this.$message.warning("请输入核准部门");
						return false;
					}else if(!this.supervisionDepartment){
						this.$message.warning("请输入监督部门");
						return false;
					}else if(!this.auditDepartment){
						this.$message.warning("请输入核准部门");
						return false;
					}else if(!this.localName){
						this.$message.warning("请选择项目所在地");
						return false;
					}else if(!this.approvalJurisdiction){
						this.$message.warning("请输入审批权限");
						return false;
					}else if(!this.isItConfidential){
						this.$message.warning("请选择是否涉密");
						return false;
					}else if(!this.engineeringProperties){
						this.$message.warning("请选择工程性质");
						return false;
					}else if(!this.projectType){
						this.$message.warning("请选择项目类型");
						return false;
					}else if(!this.sourceOfFunds){
						this.$message.warning("请填写资金来源");
						return false;
					}else if(!this.totalProjectFunds){
						this.$message.warning("请填写项目资金总额");
						return false;
					}else if(!this.projectApprovalDocumentsName){
						this.$message.warning("请填写项目审批名称");
						return false;
					}else if(!this.investmentProjectsUnifiedCode){
						this.$message.warning("请填写北京投资项目统一代码");
						return false;
					}else if(!this.projectLegalPerson){
						this.$message.warning("请填写项目法人");
						return false;
					}else if(!this.projectLegalPersonCode){
						this.$message.warning("请填写项目法人代码");
						return false;
					}else if(!this.projectIndustryClassification){
						this.$message.warning("请选择项目行业分类");
						return false;
					}else if(!this.projectScale){
						this.$message.warning("请填写项目规模");
						return false;
					}else if(!this.projectEstablishmentTime){
						this.$message.warning("请填写项目建立时间");
						return false;
					}else if(!this.contacts){
						this.$message.warning("请填写联系人");
						return false;
					}else if(!this.contactInformation){
						this.$message.warning("请填写联系方式");
						return false;
					}else if(!this.entryName){
						this.$message.warning("请填写项目名称");
						return false;
					}else if(!this.budgetProjectApprovalRecordNumber){
						this.$message.warning("请填写项目批准备案文号");
						return false;
					}else if(!this.budgetRecipientUnit){
						this.$message.warning("请填写预算受文单位");
						return false;
					}else if(!this.budgetRecipientUnitCode){
						this.$message.warning("请填写预算受文单位代码");
						return false;
					}else if(!this.budgetAmount){
						this.$message.warning("请填写预算金额");
						return false;
					}else if(!this.nameOfPurchaser){
						this.$message.warning("请填写采购人名称");
						return false;
					}else if(!this.purchaserCode){
						this.$message.warning("请填写采购人代码");
						return false;
					}else if(!this.nameOfTenderProject){
						this.$message.warning("请填写招标项目名称");
						return false;
					}else if(!this.biddingProjectNumber){
						this.$message.warning("请填写招标项目编号");
						return false;
					}else if(!this.amountOfBiddingProject){
						this.$message.warning("请填写招标项目金额");
						return false;
					}else if(!this.biddingProcurementMode){
						this.$message.warning("请填写招标采购方式");
						return false;
					}else if(!this.typesOfBiddingProjects){
						this.$message.warning("请填写招标项目类型");
						return false;
					}else if(!this.professionalCategory){
						this.$message.warning("请选择专业类别");
						return false;
					}else if(!this.whetherAnnounceBudget){
						this.$message.warning("请选择是否公布预算");
						return false;
					}else if(!this.isSubcontracting){
						this.$message.warning("请选择是否分包");
						return false;
					}else if(Number(this.stateOwnedFunds) + Number(this.ownFunds) + Number(this.foreignGovernmentsAndOrganizationalFunds) + Number(this.overseasPrivateInvestment) != this.totalProjectFunds){
						this.$message.warning("请查看资金构成是否等于项目资金总额");
						return false;
					}else if(this.amountOfBiddingProject > this.totalProjectFunds){
						this.$message.warning("招标项目金额不能大项目资金总额");
						return false;
					}else{
						this.saveInfo(num);// 保存
					}
				}else{
					// 下一步
					if(!this.approvalProjectName) {
						this.$message.warning("请输入批复项目名称");
						return false;
					}else if(!this.approvalNumber){
						this.$message.warning("请输入批复文号");
						return false;
					}else if(!this.approvalAndApprovalDepartment){
						this.$message.warning("请输入核准部门");
						return false;
					}else if(!this.supervisionDepartment){
						this.$message.warning("请输入监督部门");
						return false;
					}else if(!this.auditDepartment){
						this.$message.warning("请输入核准部门");
						return false;
					}else if(!this.localName){
						this.$message.warning("请选择项目所在地");
						return false;
					}else if(!this.approvalJurisdiction){
						this.$message.warning("请输入审批权限");
						return false;
					}else if(!this.isItConfidential){
						this.$message.warning("请选择是否涉密");
						return false;
					}else if(!this.engineeringProperties){
						this.$message.warning("请选择工程性质");
						return false;
					}else if(!this.projectType){
						this.$message.warning("请选择项目类型");
						return false;
					}else if(!this.sourceOfFunds){
						this.$message.warning("请填写资金来源");
						return false;
					}else if(!this.totalProjectFunds){
						this.$message.warning("请填写项目资金总额");
						return false;
					}else if(!this.projectApprovalDocumentsName){
						this.$message.warning("请填写项目审批名称");
						return false;
					}else if(!this.investmentProjectsUnifiedCode){
						this.$message.warning("请填写北京投资项目统一代码");
						return false;
					}else if(!this.projectLegalPerson){
						this.$message.warning("请填写项目法人");
						return false;
					}else if(!this.projectLegalPersonCode){
						this.$message.warning("请填写项目法人代码");
						return false;
					}else if(!this.projectIndustryClassification){
						this.$message.warning("请选择项目行业分类");
						return false;
					}else if(!this.projectScale){
						this.$message.warning("请填写项目规模");
						return false;
					}else if(!this.projectEstablishmentTime){
						this.$message.warning("请填写项目建立时间");
						return false;
					}else if(!this.contacts){
						this.$message.warning("请填写联系人");
						return false;
					}else if(!this.contactInformation){
						this.$message.warning("请填写联系方式");
						return false;
					}else if(!this.entryName){
						this.$message.warning("请填写项目名称");
						return false;
					}else if(!this.budgetProjectApprovalRecordNumber){
						this.$message.warning("请填写项目批准备案文号");
						return false;
					}else if(!this.budgetRecipientUnit){
						this.$message.warning("请填写预算受文单位");
						return false;
					}else if(!this.budgetRecipientUnitCode){
						this.$message.warning("请填写预算受文单位代码");
						return false;
					}else if(!this.budgetAmount){
						this.$message.warning("请填写预算金额");
						return false;
					}else if(!this.nameOfPurchaser){
						this.$message.warning("请填写采购人名称");
						return false;
					}else if(!this.purchaserCode){
						this.$message.warning("请填写采购人代码");
						return false;
					}else if(!this.nameOfTenderProject){
						this.$message.warning("请填写招标项目名称");
						return false;
					}else if(!this.biddingProjectNumber){
						this.$message.warning("请填写招标项目编号");
						return false;
					}else if(!this.amountOfBiddingProject){
						this.$message.warning("请填写招标项目金额");
						return false;
					}else if(!this.biddingProcurementMode){
						this.$message.warning("请填写招标采购方式");
						return false;
					}else if(!this.typesOfBiddingProjects){
						this.$message.warning("请填写招标项目类型");
						return false;
					}else if(!this.professionalCategory){
						this.$message.warning("请选择专业类别");
						return false;
					}else if(!this.whetherAnnounceBudget){
						this.$message.warning("请选择是否公布预算");
						return false;
					}else if(!this.isSubcontracting){
						this.$message.warning("请选择是否分包");
						return false;
					}else if(Number(this.stateOwnedFunds) + Number(this.ownFunds) + Number(this.foreignGovernmentsAndOrganizationalFunds) + Number(this.overseasPrivateInvestment) != this.totalProjectFunds){
						this.$message.warning("请查看资金构成是否等于项目资金总额");
						return false;
					}else if(this.amountOfBiddingProject > this.totalProjectFunds){
						this.$message.warning("招标项目金额不能大项目资金总额");
						return false;
					}else{
						this.writeFlag = false;// 有保存和下一步按钮
						this.nextFlag = true;// 有上一步和提交按钮
						this.saveInfo(num);// 保存
					}
				}
			},
			// 上一步
			goBack(){
				this.getBackinfo();// 上一步查询
				this.writeFlag = true;// 有保存和下一步按钮
				this.nextFlag = false;// 有上一步和提交按钮
			},
			// 提交
			submitInfo(){
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
					}else{
						this.$message.warning(res.data.msg);
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			// 保存的方法
			saveInfo(num){
				this.projectLocation = this.localName.join('');// 转成数组
				this.$axios({
					method: "POST",
					url: baseUrl+"/projectInformationController/saveOrNextStep",
					data:{
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
						projectInformaPrimaryKeyId:this.projectInformaPrimaryKeyId
					}
				}).then(res=>{
					if(res.data.status == 200){
						if(num == 1){
							this.successBox = true;
							this.successTitle = '保存成功!'
						}else{
							this.successBox = false;
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
					}else{
						this.$message.warning(res.data.msg);
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 项目所在地
			handleChange(value) {
				console.log(value);
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
					}else{
						this.$message.warning(res.data.msg);
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			downLoadupFile(item){
      			this.downloadFile(item.attachmeId,item.fileName)
			},
			 //上传列表
			uploadList(){
				var obj = {}
				if(this.num == 1){
					obj={
						relevanceCorrelationId:this.projectInformaPrimaryKeyId,
						fileType:'立项批复文件'
					}
				}else{
					obj={
						relevanceCorrelationId:this.projectInformaPrimaryKeyId,
						fileType:'项目负责人授权书'
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
						}else{
							this.enclosureData[1].attachlist = arr
						}
					}else{
						this.$message.warning(res.data.msg);
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			//删除文件列表
			deleteFile(){
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
					this.$message.warning(res.data.msg);
				}
				}).catch(err=>{
					console.log(err);
				})
			},
			//上传文件
			loadFile(event){
				var file = event.target.files[0];
				var fileSize = file.size; 
				if(fileSize > 102400000) {
					this.$message.warning('图片大小不能超过102400000KB');
					return false;
				}
				this.files = file;
				var formData = new FormData();
				formData.append("projectId", this.projectInformaPrimaryKeyId);
				formData.append("file", this.files);
				formData.append("user", '张三');
				if(this.num == 1){
					formData.append("fileType", '立项批复文件');
				}else{
					formData.append("fileType", '项目负责人授权书');
				}
				this.$axios({
					method: 'POST',
					url: baseUrl + '/attachmeController/multifileUpload',
					data:formData
				}).then(res=>{
					if(res.data.status == 200){
						this.uploadList();
					}else{
						this.$message.warning(res.data.msg);
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
				}else{
					this.uploadTitle = '项目负责人授权书'
				}
			},
			closeUpload(){
				this.uploadFlag = false;
			},
			 handleSelectionChange(val){
				let deleteArr = [];
				for(let i in val){
				deleteArr.push(val[i].attachmeId);
				}
				this.attachmeId = deleteArr;
			},
			// 办理记录
			getmanageInfo(){
				this.$axios({
					method: "POST",
					url: baseUrl+"/subcontractItemController/selectHistory",
					data:{
						entrySubcontractNumber:this.projectObj.totalProjectId
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.manageDate = res.data.data;
						this.manageDate.forEach(item => {
							item.creationTime = formatDate(item.creationTime)
						});
					}else{
						this.$message.warning(res.data.msg);
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 检验
			sumAccount(){
				this.stateOwnedFundsPercentage = (this.stateOwnedFunds/this.totalProjectFunds*100).toFixed(2);
			},
			ownMoney(){
				this.ownFundsPercentage = (this.ownFunds/this.totalProjectFunds*100).toFixed(2);
			},
			foreignMoney(){
				this.foreignGovernmentsAndOrganizationalFundsPercentage = (this.foreignGovernmentsAndOrganizationalFunds/this.totalProjectFunds*100).toFixed(2);
			},
			abroadMoney(){
				this.overseasPrivateInvestmentPercentage = (this.overseasPrivateInvestment/this.totalProjectFunds*100).toFixed(2);
			},
			//校验手机号联系方式
			blurPhone(){
				if(!isPoneAvailable(this.contactInformation)){
					this.$message.warning('请输入正确的联系方式');
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
						this.$message.warning(res.data.msg);
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
						this.$message.warning(res.data.data.msg)
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
						this.$message.warning(res.data.data.msg)
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
						this.$message.warning(res.data.data.msg)
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
						this.$message.warning(res.data.data.msg)
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
						dropDownBox:'招标采购方式'
					}
				}).then(res=>{
					if(res.data.data.status == 200){
						this.openTenderData = res.data.data.data;
					}else{
						this.$message.warning(res.data.data.msg)
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
						this.biddingOrganization = res.data.data.data[0].value;
					}else{
						this.$message.warning(res.data.data.msg)
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
						dropDownBox:'招标项目类型'
					}
				}).then(res=>{
					if(res.data.data.status == 200){
						this.bidProjectData = res.data.data.data;
					}else{
						this.$message.warning(res.data.data.msg)
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
						this.$message.warning(res.data.data.msg)
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
						this.$message.warning(res.data.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
    }
</script>

<style scoped>
.newBox{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    padding: 10px;
    position: absolute;
    left: 0;
    top: 0;
}
.wrapper,.nextWrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
	position: relative;
	z-index: 2;
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
	z-index: 9;
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
/* 标题 */
.wrapper_title,.nextWrapper_title,.uploadWrapper_title{
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
</style>