<template>
    <div class="newBox">
		<div  v-show="passJudgeShow" style="height:100%;overflow-y:scroll;">
			<!-- 成交通知书 -->
			<div class="wrapper" v-show="writeFlag">
				<div class="box">
					<button class="btn" @click="newly(1)">保存</button>
					<button class="btn" @click="newly(2)">下一步</button>
				</div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!--招标项目信息 -->
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
									<div class="editCenter">
										<div class="editName">入场项目编号：</div>
										<div class="editContent">{{amountId}}</div>
									</div>
								</div>
							</div>
							<div v-show="breakBagFlag">   
								<el-table
										ref="multipleTable"
										:data="subpackageData"
										tooltip-effect="dark"
										style="width: 100%">
									<el-table-column
										label="序号">
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
											<i class="el-icon-search"  style="cursor: pointer;" @click="lookInfo(scope.row)"></i>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-item>
						<!-- 中标单位信息 -->
						<el-collapse-item title="成交单位信息" name="2">
							<el-table
									ref="multipleTable"
									:data="unitsInfo"
									tooltip-effect="dark"
									style="width: 100%">
								<el-table-column
									label="序号">
									<template slot-scope="scope">{{ scope.$index+1 }}</template>
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="nameOfWinningBidder"
									label="成交单位名称">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="projectLeader"
									label="项目负责人">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="winningAmount"
									label="成交价格">
								</el-table-column>
								<!-- <el-table-column
									prop="winningBidPeriod"
									label="中标工期(天)">
								</el-table-column>
								<el-table-column
									prop="qualityGradeOfWinningBid"
									label="中标质量等级">
								</el-table-column> -->
								<el-table-column
									label="查看">
									<template slot-scope="scope">
										<i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
						<!-- 成交通知书 -->
						<el-collapse-item title="成交通知书" name="3">
							<el-table
									ref="multipleTable"
									:data="winAdvice"
									tooltip-effect="dark"
									style="width: 100%">
								<el-table-column
									label="序号">
									<template slot-scope="scope">{{ scope.$index+1 }}</template>
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="companyName"
									label="单位名称">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="projectLeader"
									label="项目负责人">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="contacts"
									label="联系人">
								</el-table-column>
								<el-table-column
									label="通过原因">
									<template slot-scope="scope">
										<i class="el-icon-edit-outline"  style="cursor: pointer;" @click="passThrough(scope.row,1)"></i>
									</template>
								</el-table-column>
								<el-table-column
									prop="state"
									label="通知书状态">
								</el-table-column>
								<!-- <el-table-column
									label="生成通知书">
									<template slot-scope="scope">
										<i class="el-icon-tickets"  style="cursor: pointer;" @click="createAdviceBook(scope.row,1)"></i>
									</template>
								</el-table-column> -->
							</el-table>
						</el-collapse-item>
						<!-- 招标结果通知书 -->
						<el-collapse-item title="采购结果通知书" name="4">
							<div class="notic" style="padding:10px;">注：对任一单位的招标结果通知书签章后，会自动对其他单位的招标结果通知书进行自动批量签章。</div>
							<el-table
									ref="multipleTable"
									:data="resultAdvice"
									tooltip-effect="dark"
									style="width: 100%">
								<el-table-column
									label="序号">
									<template slot-scope="scope">{{ scope.$index+1 }}</template>
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="companyName"
									label="单位名称">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="projectLeader"
									label="项目负责人">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="contacts"
									label="联系人">
								</el-table-column>
								<el-table-column
									label="原因">
									<template slot-scope="scope">
										<i class="el-icon-edit-outline"  style="cursor: pointer;" @click="passThrough(scope.row,2)"></i>
									</template>
								</el-table-column>
								<el-table-column
									label="通知书状态">
									<template slot-scope="scope">
										<i class="el-icon-message"  style="cursor: pointer;" ></i>
									</template>
								</el-table-column>
								<el-table-column
									label="生成通知书">
									<template slot-scope="scope">
										<i class="el-icon-tickets"  style="cursor: pointer;" @click="createAdviceBook(scope.row,2)"></i>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
			<!-- 下一步 -->
			<div class="nextWrapper" v-show="nextFlag">
				<div class="box" v-show="headerBtn">
					<button class="btn" @click="goBack">上一步</button>
					<button class="btn" @click="submitInfo">提交</button>
				</div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!--招标项目信息 -->
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
										<div class="editName">招标(采购)人：</div>
										<div class="editContent">{{tenderPurchaserName}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">采购项目预算金额：</div>
										<div class="editContent">{{budgetAmount}}万元</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">采购项目编号：</div>
										<div class="editContent">{{biddingProjectNumber}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">入场项目编号：</div>
										<div class="editContent">{{amountId}}</div>
									</div>
								</div>
								<div v-show="breakBagFlag">   
									<el-table
											ref="multipleTable"
											:data="subpackageData"
											tooltip-effect="dark"
											style="width: 100%">
										<el-table-column
											label="序号">
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
												<i class="el-icon-search"  style="cursor: pointer;" @click="lookInfo(scope.row)"></i>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</div>
						</el-collapse-item>
						<!-- 相关附件 -->
						<el-collapse-item title="相关附件" name="2">
							<el-table :data="enclosureData" stripe style="width: 100%">
								<el-table-column prop="appendixName" label="附件名称" width="200">
								</el-table-column>
								<el-table-column label="附件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="liItem">
											{{item.fileName}}
										</li>
									</template>
								</el-table-column>
								<el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem != '办理通过' && this.stateItem != '待办理'">
									<template slot-scope="scope">
										<i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
						<!-- 中标单位信息 -->
						<el-collapse-item title="成交单位信息" name="3">
							<el-table
									ref="multipleTable"
									:data="unitsInfo"
									tooltip-effect="dark"
									style="width: 100%">
								<el-table-column
									label="序号">
									<template slot-scope="scope">{{ scope.$index+1 }}</template>
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="nameOfWinningBidder"
									label="成交单位名称">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="projectLeader"
									label="项目负责人">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="winningAmount"
									label="成交价格">
								</el-table-column>
								<!-- <el-table-column
									prop="winningBidPeriod"
									label="中标工期(天)">
								</el-table-column>
								<el-table-column
									prop="qualityGradeOfWinningBid"
									label="中标质量等级">
								</el-table-column> -->
								<el-table-column
									label="查看">
									<template slot-scope="scope">
										<i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
						<!-- 成交通知书 -->
						<el-collapse-item title="成交通知书" name="4">
							<el-table
									ref="multipleTable"
									:data="winAdvice"
									tooltip-effect="dark"
									style="width: 100%">
								<el-table-column
									label="序号">
									<template slot-scope="scope">{{ scope.$index+1 }}</template>
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="companyName"
									label="单位名称">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="projectLeader"
									label="项目负责人">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="contacts"
									label="联系人">
								</el-table-column>
								<el-table-column
									prop="reason"
									:show-overflow-tooltip ="true"
									label="通过原因">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="state"
									label="通知书状态">
								</el-table-column>
								<!-- <el-table-column
									label="生成通知书">
									<template slot-scope="scope">
										<i class="el-icon-tickets"  style="cursor: pointer;" @click="createAdviceBook(scope.row,1)"></i>
									</template>
								</el-table-column> -->
							</el-table>
						</el-collapse-item>
						<!-- 招标结果通知书 -->
						<el-collapse-item title="采购结果通知书" name="5">
							<div class="notic" style="padding:10px;">注：对任一单位的采购结果通知书签章后，会自动对其他单位的采购结果通知书进行自动批量签章。</div>
							<el-table
									ref="multipleTable"
									:data="resultAdvice"
									tooltip-effect="dark"
									style="width: 100%">
								<el-table-column
									label="序号">
									<template slot-scope="scope">{{ scope.$index+1 }}</template>
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="companyName"
									label="单位名称">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="projectLeader"
									label="项目负责人">
								</el-table-column>
								<el-table-column
									:show-overflow-tooltip ="true"
									prop="contacts"
									label="联系人">
								</el-table-column>
								<el-table-column
									label="原因">
									<template slot-scope="scope">
										<i class="el-icon-edit-outline"  style="cursor: pointer;" @click="passThrough(scope.row,2)"></i>
									</template>
								</el-table-column>
								<el-table-column
									label="通知书状态">
									<template slot-scope="scope">
										<i class="el-icon-message"  style="cursor: pointer;" ></i>
									</template>
								</el-table-column>
								<el-table-column
									label="生成通知书">
									<template slot-scope="scope">
										<i class="el-icon-tickets"  style="cursor: pointer;" @click="createAdviceBook(scope.row,2)"></i>
									</template>
								</el-table-column>
							</el-table>
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
			<!-- 上传文件 -->
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

			<!-- 分包信息 -->
			<div class="searchWrapper" v-show="lookInfoFlag">
				<div class="searchBox">
					<div class="search_title">
						<p>分包信息</p>
						<i class="el-icon-close" @click="closeLookInfo"></i>
					</div>
					<div class="main_info">
						<el-collapse v-model="activeName" accordion>
							<!-- 采购项目信息 -->
							<el-collapse-item title="采购项目信息" name="1">
								<div class="edit_list">
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">采购项目名称：</div>
											<div class="editContent">{{nameOfTenderProject}} </div>
										</div>
										<div class="editCenter">
											<div class="editName">采购项目编号：</div>
											<div class="editContent">{{biddingProjectNumber}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">招标(采购)人：</div>
											<div class="editContent">{{tenderPurchaserName}}</div>
										</div>
										<div class="editCenter"  v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
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
							<!-- 分包信息-->
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
											<div class="editContent">{{subcontractingControlAmount}}<b style="color:#000;">万元</b></div>
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
			<!-- 查看成交单位 -->
			<div class="searchWrapper" v-show="lookFlag">
				<div class="searchBox">
					<div class="search_title">
						<p>查看成交单位</p>
						<i class="el-icon-close" @click="closeLookoverItem"></i>
					</div>
					<div class="main_info">
						<el-collapse v-model="activeName" accordion>
							<!-- 成交单位信息 -->
							<el-collapse-item title="成交单位信息" name="1">
								<div class="edit_list">
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">成交单位名称：</div>
											<div class="editContent">{{nameOfWinningBidder}} </div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">项目负责人：</div>
											<div class="editContent">{{projectLeader}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">评委会成员名单：</div>
											<div class="editContent">{{bidEvaluationCommitteeList}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">成交价格：</div>
											<div class="editContent">{{winningAmount}}万元</div>
										</div>
									</div>
									<!-- <div class="editItem">
										<div class="editCenter">
											<div class="editName">成交工期(日历天)：</div>
											<div class="editContent">{{winningBidPeriod}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">成交质量等级：</div>
											<div class="editContent">{{qualityGradeOfWinningBid}}</div>
										</div>
									</div> -->
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">成交说明：</div>
											<div class="editContent">{{winningBidDescription}}</div>
										</div>
									</div>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</div>
			</div>
			<!-- 通过原因 -->
			<div class="passWrapper" v-show="passFlag">
				<div class="passBox">
					<div class="pass_title">
						<p>{{passTitle}}</p>
						<i class="el-icon-close" @click="closePassThrough"></i>
					</div>
					<div class="box">
						<button class="btn" @click="sureSave" v-if="this.stateItem != '办理通过' && this.stateItem != '待办理'">确定保存</button>
					</div>
					<div class="write_textarea" style="padding:5px 0;">
						<el-input
							type="textarea"
							:rows="14"
							v-model="reason">
						</el-input>
					</div>
				</div>
			</div>
			<!-- 生成通知书 -->
			<div class="createWrapper" v-show="createFlag">
				<div class="createBox">
					<div class="create_title">
						<p v-show="createAdvice">生成成交通知书</p>
						<p v-show="createResultAdvice">生成成交结果通知书</p>
						<i class="el-icon-close" @click="closeCreateAdviceBook"></i>
					</div>
				</div>
			</div>
			<!-- 提交弹窗 -->
			<el-dialog
				title="系统提示"
				:visible.sync="sureSubmitBox"
				width="40%"
				:before-close="handleClose">
				<div class="icon">
					<i class="el-icon-success"></i>
					<span>提交成功！</span>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="sureBtn">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 保存弹窗 -->
			<el-dialog
				title="执行成功"
				:visible.sync="saveBox"
				width="40%"
				:before-close="handleClose">
				<div class="icon">
					<i class="el-icon-success"></i>
					<span>保存成功！</span>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="saveBoxSure()">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 点击上一步弹窗 -->
			<el-dialog
				title="信息确认"
				:visible.sync="laststepBox"
				width="40%"
				:before-close="handleClose">
				<div class="icon">
					<i class="el-icon-question"></i>
					<span>修改信息将导致电子件列表中的 [采购公告] 重新生成，您确认要继续吗？</span>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="laststepBoxSure()">确 定</el-button>
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
                    <el-button type="primary" @click="handleClose()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
  export default {
    data() {
		return {
			str_entrust_type:window.sessionStorage.str_entrust_type,
			role_types:window.localStorage.role_types,
            biddingPurchasingAgencyName:'',
			zhuangtai:'',
			alertMsg:'',
			cancelShow:false,
			stateItem:'',
			frameShow:false,
			passJudgeShow:true,
			writeFlag:true,// 首页
			projectObj:JSON.parse(window.localStorage.projectObj),// localstroge 获取的ID
			activeName:['1','2','3','4','5','6'],
			tableData:[
				{
					entrySubcontractNumber:'11'
				}
			],
			// 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            tenderPurchaserName:'',// 招标(采购)人
			budgetAmount:'',// 招标项目预算金额
			amountOfBiddingProject:'',//招标项目金额
			biddingProcurementMode:'',// 招标采购方式
			biddingOrganization:'',// 招标组织方式
            typesOfBiddingProjects:'',// 招标项目类型
            amountId:'',// 总包
            entrySubcontractNumber:'',// 入场项目编号 分包
			projectCode:'',//入场项目编号 总包
			// 分包信息
			breakBagFlag:false,// 列表
			subpackageData:[],
			lookInfoFlag:false,// 查看弹窗
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
			// 中标单位信息
			lookFlag:false,
			nameOfWinningBidder:'',// 中标单位名称
			projectLeader:'',// 项目负责人
			bidEvaluationCommitteeList:'',// 评委会成员名单
			winningAmount:'',// 中标价格
			winningBidPeriod:'',// 中标工期(日历天)
			qualityGradeOfWinningBid:'',// 中标质量等级
			winningBidDescription:'',// 中标说明
			winnNoticeId:'',// 成交通知书ID
			// 通过原因
			passFlag:false,
			reason:'',// 原因 
			passTitle:'',// 原因标题
			companyId:'',// 公司id
			// 生成通知书
			createFlag:false,
			createAdvice:false,// 生成成交通知书
			createResultAdvice:false,// 生成招标结果通知书
			// 下一步
			headerBtn:true,// 提交和上一步的按钮
			nextFlag:false,// 下一步
			// 办理记录
            manageDate:[],
			creationTime:'',// 时间
			// 列表
			unitsInfo:[],
			adviceInfo:[],// 返回的成交通知书及成交通知书总数据
			winAdvice:[],// 成交通知书
			resultAdvice:[],// 招标结果通知书
			// 提交弹窗
			sureSubmitBox:false,
			// 保存
			winnNoticeItemId:'',// 成交通知书条目ID
			saveBox:false,// 保存弹窗
			// 上一步
			laststepBox:false,
			// 文件上传所需字段
			enclosureData:[{
				id:1,
				appendixName: "招标（采购）人确认附件",
				attachlist: []
			},
			{
				id:2,
				appendixName: "成交通知书",
				attachlist: []
			}],
			uploadFlag:false,//
			uploadTitle:'',
			state:'', 
			num:'',
			files:{},//文件
			fileName:'',//上传文件名称
			fileSize:'',//上传文件大小
			uploadingPeople:'',//上传人
			uploadTime:'',//上传时间
			fileData:[],//上传文件表格
			attachmeId:[],// 选中的ID
		};
	},
	created(){
		if(this.projectObj.totalProjectId.indexOf("-") != -1){
            // 分包
            this.entrySubcontractNumber = this.projectObj.totalProjectId;
            this.breakBagFlag = true;
            this.getItemInfo();// 根据项目入场分包编号查询
        }else{
            // 总包
            this.projectCode = this.projectObj.totalProjectId;
            this.breakBagFlag = false;
        }
		this.getbiddingInfo();// 招标项目信息
		// this.getInitInfo();// 初始化查询
		this.getDecideList();
		this.uploadList();//上传列表
		this.getOneList();// 招标（采购）人确认函附件
		this.getTwoList();// 招标公告附件
		this.getmanageInfo();// 办理记录
	},
    methods: {
		// 保存和下一步公用方法
        newly(num){
            if(num == 1){
                // 保存
                this.saveInfo(num)
            }else{
				// 下一步
                this.writeFlag = false;// 输入框的页面
                this.nextFlag = true;// 下一步页面
				this.saveInfo(num);// 保存
            }
		},
		// 上一步
		goBack(){
			this.writeFlag = true;// 输入框的页面
			this.nextFlag = false;// 下一步页面
			// this.laststepBox = true;// 点击上一步弹窗
		},
		// 保存弹窗 ---> 确定	
		saveBoxSure(){
			this.saveBox = false;
		},
		// 点击上一步弹窗
		laststepBoxSure(){
			this.laststepBox =false;
		},
		// 提交
		submitInfo(){
			this.$axios({
                method: "POST",
                url: baseUrl+"/winnNoticeController/submit",
                data:{
					state:'待办理',
					winnNoticeId:this.winnNoticeId,
					operationFlow:'成交通知书',
				}
            }).then(res=>{
                if(res.data.status == 200){
					this.sureSubmitBox = true;
					this.getInitInfo();// 初始化查询
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
		},
		// 弹窗 ---> 关闭
		handleClose(){
			this.sureSubmitBox = false;
			this.saveBox = false;
			this.laststepBox = false;
			this.frameShow = false;
			this.cancelShow = false;
		},
		// 确定
		sureBtn(){
			this.sureSubmitBox = false;
			this.getmanageInfo();// 办理记录查询列表
		},
		// 分包信息 ---> 查看
		lookInfo(row){
			// 分包信息所需字段
			this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
			this.subcontractName = row.subcontractName;// 分包名称 
			this.subcontractContents = row.subcontractContents;// 分包内容
			this.scopeOfTender = row.scopeOfTender;// 招标范围
			this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
			this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
			this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标

			this.lookInfoFlag = true;
		},
		// 分包信息 ---> 关闭
		closeLookInfo(){
			this.lookInfoFlag = false;
		},
		// 中标单位信息 ---> 查看
		lookoverItem(row){
			this.nameOfWinningBidder = row.nameOfWinningBidder;// 中标单位名称
			this.projectLeader = row.projectLeader;// 项目负责人
			this.bidEvaluationCommitteeList = row.bidEvaluationCommitteeList;// 评委会成员名单
			this.winningAmount = row.winningAmount;// 中标价格
			this.winningBidPeriod = row.winningBidPeriod;// 中标工期(日历天)
			this.qualityGradeOfWinningBid = row.qualityGradeOfWinningBid;// 中标质量等级
			this.winningBidDescription = row.winningBidDescription;// 中标说明
			this.lookFlag = true;
		},
		// 中标单位信息 ---> 关闭
		closeLookoverItem(){
			this.lookFlag = false;
		},
		// 通过原因 ---> 查看
		passThrough(row,num){
			this.winnNoticeItemId = row.winnNoticeItemId;// 成交通知书条目ID
			this.companyId = row.companyId;// 公司ID
			if(num == 1){
				// 通过原因
				this.passTitle = '通过原因';
				this.reason = row.reason;
			}else{
				// 不通过原因
				this.passTitle = '不通过原因';
				this.reason = row.reason;
			}
			this.passFlag = true;
		},
		// 通过原因 ---> 关闭
		closePassThrough(){
			this.passFlag = false;
		},
		// 通过原因 ---> 确定保存
		sureSave(){
			if(this.passTitle == '通过原因'){
				this.adviceInfo.forEach(item=>{
					if(item.companyId == this.companyId){
						item.reason = this.reason
					}
				})
			}else{
				this.adviceInfo.forEach(item=>{
					if(item.companyId == this.companyId){
						item.reason = this.reason
					}
				})
			}
			this.passFlag = false;
			this.reason = '';
		},
		// 生成成交通知书 ---> 查看
		createAdviceBook(row,num){
			if(num == 1){
				// 生成成交通知书
				this.createAdvice = true;
				this.createResultAdvice = false;
			}else{
				// 生成招标结果通知书
				this.createAdvice = false;
				this.createResultAdvice = true;
			}
			this.createFlag = true;
		},
		// 生成成交通知书 ---> 关闭
		closeCreateAdviceBook(){
			this.createFlag = false;
		},
		// 保存
		saveInfo(num){
			this.unitsInfo.forEach(item=>{
				this.nameOfWinningBidder = item.nameOfWinningBidder;// 中标单位名称
				this.projectLeader = item.projectLeader;// 项目负责人
				this.bidEvaluationCommitteeList = item.bidEvaluationCommitteeList;// 评委会成员名单
				this.winningAmount = item.winningAmount;// 中标价格
				this.winningBidPeriod = item.winningBidPeriod;// 中标工期(日历天)
				this.qualityGradeOfWinningBid = item.qualityGradeOfWinningBid;// 中标质量等级
				this.winningBidDescription = item.winningBidDescription;// 中标说明
			})
			let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
					bidEvaluationCommitteeList:this.bidEvaluationCommitteeList,
					items:this.adviceInfo,
					nameOfWinningBidder: this.nameOfWinningBidder,
					projectLeader: this.projectLeader,
					qualityGradeOfWinningBid: this.qualityGradeOfWinningBid,
					winningAmount: this.winningAmount,
					winningBidDescription: this.winningBidDescription,
					winningBidPeriod: this.winningBidPeriod,
					operationFlow:'成交通知书',
				}
				
            }else{
                // 入场项目编号
                object ={
					projectCode:this.projectObj.totalProjectId,
					bidEvaluationCommitteeList:this.bidEvaluationCommitteeList,
					items:this.adviceInfo,
					nameOfWinningBidder: this.nameOfWinningBidder,
					projectLeader: this.projectLeader,
					qualityGradeOfWinningBid: this.qualityGradeOfWinningBid,
					winnNoticeId: this.winnNoticeId,
					winningAmount: this.winningAmount,
					winningBidDescription: this.winningBidDescription,
					winningBidPeriod: this.winningBidPeriod,
					operationFlow:'成交通知书',
                }
			}
			this.$axios({
                method:'POST',
                url:baseUrl + '/winnNoticeController/saveOrUpdate',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        // 保存
						this.saveBox = true;
                    }else{
                        // 下一步
                        this.saveBox = false;
					}
					this.winnNoticeId = res.data.data.winnNoticeId;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
		},
		// 招标项目信息
        getbiddingInfo(){
            this.$axios({
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
					this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
		},
		// 根据项目入场分包编号查询
        getItemInfo(){
            let arr =[];
            arr.push(this.entrySubcontractNumber)
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:arr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.subpackageData = res.data.data;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
		// 办理记录
        async getmanageInfo(){
			await this.getInitInfo()
			let object = {};
			if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
				object={
					itemNumber:this.projectObj.totalProjectId,
					relatedId:this.winnNoticeId
				}
			}else{
				object={
					itemNumber:this.projectObj.totalProjectId,
					relatedId:this.winnNoticeId
				}
			}
            this.$axios({
                method: "POST",
                url: baseUrl+"/historyController/selectHistoryList",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
					this.manageDate = res.data.data;
					if(this.manageDate.length>0){
						this.manageDate.forEach(item => {
							if(item.creationTime !=null){
								item.creationTime = dayjs(item.creationTime).format('YYYY-MM-DD')
							}
						});
					}
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
		},
		// 初始化查询
		getInitInfo(){
			let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }else{

                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId
                }
            }
			return this.$axios({
                method: "POST",
                url: baseUrl+"/winnNoticeController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
					this.unitsInfo = res.data.data;
					this.unitsInfo.forEach(item=>{
						this.zhuangtai = item.state;
						this.stateItem = item.state;
						this.adviceInfo = item.items;
						this.winnNoticeId = item.winnNoticeId;
						// 判断状态控制页面的展示
						if(res.data.data == null || item.state == null){
							this.writeFlag = true;
							this.nextFlag = false;
						}else if (item.state == '编辑中' || item.state == '办理未通过'){
							this.nextFlag = true;
							this.writeFlag = false;
						}else{
							this.nextFlag = true;
							this.headerBtn = false;
							this.writeFlag = false;
						}
					})
					if(this.adviceInfo.length>0){
						let arr =  [];
						let newArr = [];
						this.adviceInfo.forEach(item=>{
							if(item.type == '中标单位'){
								arr.push(item);
							}else{
								newArr.push(item);
							}
						})
						this.winAdvice = arr;
						this.resultAdvice = newArr;
					}
					
                }else{
                   this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
		},
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
					if(window.sessionStorage.str_entrust_type != '委托角色' && this.role_types != '招标(采购)代理'){
						let obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '成交通知书'){
                                obj.houxuanren = item
                            }
                            if(item.value == '成交结果公告'){
                                obj.ruchang = item
                            }
                        })
                        if(obj.houxuanren.state != '办理通过'){
                            this.alertMsg = '项目经办人尚未执行此操作，不可查看!'
                            this.passJudgeShow = false;
                            this.frameShow = true;
                        }else{
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        }
					}else{
						var obj = {};
						res.data.data.map((item,index)=>{
							if(item.value == '采购异常'){
								obj.zhaobiao = item;
							}
							if(item.value == '成交通知书'){
								obj.tongzhi = item
							}
							if(item.value == '成交结果公告'){
								obj.gonggao = item
							}
						})
						
						//招标勾且本业勾，可以看，
						if(obj.zhaobiao.state == '办理通过' && obj.tongzhi.state == '办理通过'){
							this.passJudgeShow = true;
							this.frameShow = false;
						//如果上一步打钩，进一步判断
						}else if(obj.gonggao.state == '办理通过' ){
							//如果招标打钩，则本业必须打勾
							if(obj.zhaobiao.state == '办理通过'&& obj.tongzhi.state == '办理通过'){
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
									this.alertMsg = '尚未完成成交结果公告，无法发出成交通知书!'
								}
							}
						}else{
							//其他的都不能看
							this.passJudgeShow = false;
							this.frameShow = true;
							if(obj.zhaobiao.state == '办理通过'){
								this.alertMsg = '作废标段尚未执行此操作，不可查看!'
							}else{
								this.alertMsg = '尚未完成成交结果公告，无法发出成交通知书!'
							}
						}
					}
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
		},
		// 招标（采购）人确认函附件
		getOneList(){
			let object={}
			if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
				// 分包
				object={
					relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
					fileType:'招标（采购）人确认附件'
				}
			}else{
				//  总包
				object ={
					relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
					fileType:'招标（采购）人确认附件'
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
		// 成交通知书
		getTwoList(){
			let object={}
			if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
				// 入场项目分包编号
				object={
					relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
					fileType:'成交通知书'
				}
			}else{
				// 入场项目编号
				object ={
					relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
					fileType:'成交通知书'
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
						if(item.uploadTime !=null){
							item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
						}
						arr.push(item)
					})
					this.enclosureData[1].attachlist = arr;
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
		//上传列表
		uploadList(){
			let object={}
			if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
				// 分包
				if(this.num == 1){
					object={
						relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
						fileType:'招标（采购）人确认附件'
					}
				}else{
					object={
						relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
						fileType:'成交通知书'
					}
				}
			}else{
				//  总包
				if(this.num == 1){
					object={
						relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
						fileType:'招标（采购）人确认附件'
					}
				}else{
					object={
						relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
						fileType:'成交通知书'
					}
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
					if(this.num == 1){
						this.enclosureData[0].attachlist = arr;
					}else{
						this.enclosureData[1].attachlist = arr;
					}
				}else{
					this.$message.warning(res.data.msg);
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
				this.$message.warning('请选择要删除的文件!')
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
					this.$message.warning(res.data.msg);
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
				this.$message.warning('图片大小不能超过102400000KB');
				return false;
			}
			this.$refs.file.value = null;
			this.files = file;
			var formData = new FormData();
			if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
				// 分包
				formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
				formData.append("file", this.files);
				if(this.num == 1){
					formData.append("fileType", '招标（采购）人确认附件');
				}else{
					formData.append("fileType", '成交通知书');
				}
			}else{
				// 总包
				formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
				formData.append("file", this.files);
				if(this.num == 1){
					formData.append("fileType", '招标（采购）人确认附件');
				}else{
					formData.append("fileType", '成交通知书');
				}
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
    }
  };
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
	display:flex;
	flex-direction: column;
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
.notic,h6,b{
    color:red;
}
/* 子弹窗 */
.searchWrapper,.createWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
	display:flex;
	flex-direction: column;
}
.passWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 200px;
	display:flex;
	flex-direction: column;
}
.searchBox,.createBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.main_info{
	flex: 1;
	overflow: hidden;
	overflow-y: scroll;
}
.passBox{
	width: 60%;
	height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
	margin-left: 150px;
}
.search_title,.pass_title,.create_title{
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
}
/* 弹窗 */
.icon{
	width: 100%;
	padding: 0 10px;
	display: flex;
	align-items: center;
}
.el-icon-warning,.el-icon-question,.el-icon-success{
	font-size: 100px;
	color: #0a5e9d;
}
.icon span{
	margin-left: 20px;
	font-size:18px;
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
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
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