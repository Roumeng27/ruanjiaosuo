<template>
	<div class="newBox">
		<!-- 主体页面 -->
		<div class="wrapper">
			<div class="boxTitle">
				<el-radio-group v-model="bidState" @change="changeRadio">
					<el-radio label="">全部</el-radio>
					<el-radio label="报名成功">报名成功</el-radio>
					<el-radio label="审核中">审核中</el-radio>
					<el-radio label="报名失败">报名失败</el-radio>
					<el-radio label="未报名">未报名</el-radio>
				</el-radio-group>
			</div>
			<!-- 搜索的输入框 -->
			<div class="editItem">
				<div class="editCenter">
					<div class="editName">采购项目(分包)名称：</div>
					<div class="editContent">
						<el-input v-model="entryName" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
					</div>
				</div>
				<div class="editCenter">
					<div class="editName">入场项目(分包)编号：</div>
					<div class="editContent">
						<el-input v-model="number" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
					</div>
				</div>
				<div class="editBtn">
					<button class="btn" @click="searchList">搜索</button>
				</div>
			</div>
			<div class="main_info">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" width="70" label="序号" :index="typeIndex">
					</el-table-column>
					<el-table-column prop="totalProjectId" label="入场项目编号" width="170">
					</el-table-column>
					<el-table-column prop="nameOfTenderProject" label="采购项目名称">
					</el-table-column>
					<el-table-column prop="subcontractName" label="分包名称">
					</el-table-column>
					<el-table-column prop="endTime" label="报名截止时间" >
					</el-table-column>
					<el-table-column prop="biddingProcurementMode" label="分包分类">
					</el-table-column>
					<el-table-column prop="bidState" label="状态" width="100">
					</el-table-column>
					<el-table-column prop="operation" label="操作" width="70"> 
					<template slot-scope="scope">
						<i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"  v-if="scope.row.bidState == '报名成功' ||scope.row.bidState == '审核中' ||scope.row.bidState == '报名失败'"></i>
						<i class="el-icon-plus" style="cursor:pointer;" @click="addFile(scope.row)"  v-if="scope.row.bidState == '未报名' && myTime < scope.row.endTime"></i>
						<i v-if="scope.row.bidState == '未报名' && myTime >= scope.row.endTime"></i>
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
		<!-- 查看投标信息弹框 -->
		<div class="perfectWrapper" v-show="show">
			<div class="perfectBox">
				<div class="perfectTitle">
					<p>完善投标信息</p>
                    <i class="el-icon-close" @click="close"></i>
				</div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!-- 分包信息 -->
						<el-collapse-item title="分包信息" name="1">
							<div class="edit_list">
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包名称：</div>
                                        <div class="editContent">{{subcontractName}} </div>
                                    </div>
                                     <div class="editCenter">
                                        <div class="editName">入场项目分包编号：</div>
                                        <div class="editContent">
											<span >{{totalProjectId}}</span>
										 </div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购方式：</div>
                                        <div class="editContent">{{biddingProcurementMode}} </div>
                                    </div>
                                     <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{nameOfPurchaser}}</div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{aprojectLeader}} </div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">报名截止时间：</div>
                                        <div class="editContent">{{enrollEndTime}} </div>
                                    </div>
									<div class="editCenter">
                                        <div class="editName">企业资质要求：</div>
                                        <div class="editContent">{{companyQualifications}} </div>
                                    </div>
                                </div>
								<div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">项目负责人资质要求：</div>
                                        <div class="editContent">{{managerQualifications}} </div>
                                    </div>
                                </div>
							</div>
						</el-collapse-item>
						<!-- 投标报名(供应商)人信息 -->
						<el-collapse-item title="投标报名(供应商)人信息" name="2">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">企业名称：</div>
										<div class="editContent">{{companyName}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">企业组织机构代码：</div>
										<div class="editContent">{{organizationCode}} </div>
									</div>
									<div class="editCenter">
										<div class="editName">企业资质编号：</div>
										<div class="editContent">{{companyQualificationCode}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">企业资质：</div>
										<div class="editContent">{{companyQualification}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">项目负责人：</div>
										<div class="editContent">{{projectLeader}} </div>
									</div>
									<div class="editCenter">
										<div class="editName">项目负责人专业：</div>
										<div class="editContent">{{projectLeaderMajor}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">企业负责人：</div>
										<div class="editContent">{{conpanyLeader}} </div>
									</div>
									<div class="editCenter">
										<div class="editName">投标联系人：</div>
										<div class="editContent">{{bidContacts}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">公司电话：</div>
										<div class="editContent">{{companyPhone}} </div>
									</div>
									<div class="editCenter">
										<div class="editName">联系手机：</div>
										<div class="editContent">{{telephone}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">传真：</div>
										<div class="editContent">{{fax}} </div>
									</div>
									<div class="editCenter">
										<div class="editName">Email：</div>
										<div class="editContent">{{email}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">是否联合体报名：</div>
										<div class="editContent">{{isComboApply}} </div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<!-- 报名其他材料 -->
						<el-collapse-item title="报名其他材料" name="3">
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
								<el-table-column fixed="right" label="操作" width="100" v-if="this.bidState != '报名成功' && this.bidState != '审核中'">
									<template slot-scope="scope">
										<i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
						<!-- 投标保证金缴纳记录 -->
						<el-collapse-item title="投标保证金缴纳记录" name="4">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">缴纳时间：</div>
										<div class="editContent">{{payTenderFeeTime}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">缴纳金额(元)：</div>
										<div class="editContent">{{payDepositAmount}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">备注：</div>
										<div class="editContent">{{payDepositRemark}} </div>
									</div>
								</div>
							</div>
							<el-table :data="paymentData" stripe style="width: 100%">
								<el-table-column prop="appendixName" label="附件名称" width="150">
								</el-table-column>
								<el-table-column label="附件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' @click="downloadFile1(item)" class="liItem">
											{{item.fileName}}
										</li>
									</template>
								</el-table-column>
								<el-table-column fixed="right" label="操作" width="100" v-if="this.bidState != '报名成功' && this.bidState != '审核中'">
									<template slot-scope="scope">
										<i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
		</div>
		<!-- 完善投标信息 -->
		<div class="addWrapper" v-show="addShow">
			<div class="addBox">
				<div class="addTitle">
					<p>完善投标信息</p>
					<i class="el-icon-close" @click="close"></i>
				</div>
				<div class="box">
                    <button class="btn" @click="submitInfor">提交</button>
                </div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!-- 分包信息 -->
						<el-collapse-item title="分包信息" name="1">
							<div class="edit_list">
								<div class="editItem">
										<div class="editCenter">
											<div class="editName">分包名称：</div>
											<div class="editContent">{{subcontractName}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">入场项目分包编号：</div>
											<div class="editContent">{{totalProjectId}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">采购方式：</div>
											<div class="editContent">{{biddingProcurementMode}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">招标(采购)人：</div>
											<div class="editContent">{{nameOfPurchaser}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">项目负责人：</div>
											<div class="editContent">{{aprojectLeader}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">报名截止时间：</div>
											<div class="editContent">{{enrollEndTime}}</div>
										</div>
										<div class="editCenter">
											<div class="editName">企业资质要求：</div>
											<div class="editContent">{{companyQualifications}}</div>
										</div>
									</div>
									<div class="editItem">
										<div class="editCenter">
											<div class="editName">项目负责人资质要求：</div>
											<div class="editContent">{{managerQualifications}}</div>
										</div>
									</div>
							</div>
						</el-collapse-item>
						<!-- 投标报名(供应商)人信息 -->
						<el-collapse-item title="投标报名(供应商)人信息" name="2">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">企业名称：</div>
										<div class="editContent">{{companyName}}</div>
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
										<div class="editName">企业资质：</div>
										<div class="editContent">{{companyQualification}}</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">项目负责人：</div>
										<div class="editChoise">
											<span>{{projectLeader}}</span>
											<el-button @click="chooseList">选择</el-button>
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
											<el-input v-model="telephone" @blur="checkPhone()" clearable ></el-input>
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
											<el-input v-model="email" @blur="checkEmail()" clearable></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">是否联合体报名：</div>
										<div class="editContent">
											<el-radio-group v-model="isComboApply" @change="changeApply">
												<el-radio label="是">是</el-radio>
												<el-radio label="否">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								<div class="editItem" v-show="isYesShow">
									<div class="editCenter">
										<div class="editName">联合体信息：</div>
										<div class="editContent">
											<el-input type="textarea" v-model="comboApplyInfor"></el-input>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<!-- 报名其他材料 -->
						<el-collapse-item title="报名其他材料" name="3">
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
								<el-table-column fixed="right" label="操作" width="100" v-if="this.bidState != '报名成功' && this.bidState != '审核中'">
									<template slot-scope="scope">
										<i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
		</div>
		<!-- 选择项目负责人弹框 -->
		<div class="choiseWrapper" v-show="chooseShow">
			<div class="choiseBox">
				<div class="choiseTitle">
					<p>人员列表</p>
					<i class="el-icon-close" @click="closeFile"></i>
				</div>
				<div class="edit_list">
					<div class="editItem">
						<div class="editCenter">
							<div class="editName">姓名：</div>
							<div class="editContent">
								<el-input v-model="name" placeholder="请输入内容" @keyup.enter.native="searchPeopleList"></el-input>
							</div>
						</div>
						<div class="editCenter"></div>
						<div class="editBtn">
							<button class="btn" @click="searchPeopleList">搜索</button>
						</div>
					</div>
					<div class="main_info">
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
					<p class="star">★：附件上传大小限制为102400 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
				</div>
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
				<el-button type="primary" @click="submitSave()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import baseUrl from '../../api/api'
import '../../assets/css/style.css'
import {isPoneAvailable,checkEmail,checkPhone} from '../../api/base.js'
import dayjs from "dayjs";
export default {
  data(){
    return {
		bidInforId:'',//keyID
		projectInformaPrimaryKeyId:'',
		// projectObj:JSON.parse(window.localStorage),
		entryName:'',//搜索的招标项目名称
		number:'',// 入场项目(分包)编号
		myTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),//当前的时间
		bidState:'',//头部搜索单选框按钮
		radio:'',//投标单选框按钮
		nameOfTenderProject:'',//招标项目名称
		totalProjectId:'',//入场项目分包编号
		tableData:[],//主体数据
     	// 分页器
		currentPage:1,// 当前页
		pageSize: 8, // 每页条数
		pageTotal: 0, //总页数
		total: 0, //总条数
		totalPages:0,// 开标情况列表条数
		submitBox:false,//提交弹框
		show:false,//查看投标信息弹框
		addShow:false,//添加投标信息弹框
		chooseShow:false,//项目负责人挑选弹框
		fileShow:false,//上传文件弹框
		isYesShow:false,//当点击是的按钮的时候显示
		activeName:['1','2','3','4','5'],
		endTime:'',//报名截止时间
		deadlineTime:'',//定义的截止时间
		
		state:'',//定义的状态
		fileData:[],//上传文件数据
		companyName:'',//企业名称
		organizationCode:'',//企业机构组织代码
		companyQualificationCode:'',//企业资质编号
		companyQualification:'',//企业资质
		projectLeader:'',//项目负责人
		aprojectLeader:'',//分包信息项目负责人
		projectLeaderMajor:'',//项目负责人专业
		conpanyLeader:'',//企业负责人
		bidContacts:'',//投标联系人
		companyPhone:'',//公司电话
		telephone:'',//联系手机
		fax:"",//传真
		email:'',//email
		isComboApply:'',//是否联合体报名
		subcontractName:'',//分包名称
		entrySubcontractNumber:'',//入场项目分包编号
		nameOfPurchaser:'',//招标采购人
		biddingProcurementMode:'',//招标方式
		enrollEndTime:'',//报名截止时间
		companyQualifications:'',//企业资质要求
		managerQualifications:'',//项目负责人资质要求
		payTenderFeeTime:'',//缴纳时间
		payDepositAmount:'',//缴纳金额
		payDepositRemark:'',//备注
		EntrySubNum:'',//传参分包
		items:[],//投标报名资质条件返回的items
		name:'',//姓名
		chooseData:[],//挑选人员数据
		userId:'',//企业信息返回的id
		comboApplyInfor:'',//联合体信息
		bidInfor:'',//点击添加返回的id,
		totalId:'',//点击添加返回的编号
		bidState:'',// 查看的状态
		// 文件上传所需字段
		//其他投标材料
		enclosureData:[
			{
				id:1,
				appendixName:'其他投标材料',
				attachlist:[]
			}
		],
		// 投标保证金缴纳凭证
		paymentData:[
			{
				id:2,
				appendixName:'投标保证金缴纳凭证',
				attachlist:[]
			}
		],
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
		keyProjectId:'',
    }
  },
	created(){
      	this.getList();
		this.getsubList();//招标项目信息--》表格分包
	},
  	methods:{
		// checkZuo(){
		// 	if(!checkPhone(this.companyPhone)){
		// 		// this.$layer.msg('请输入正确的公司电话，例如：0000-0000000');
		// 	}
		// },
		checkPhone(){
			if(!isPoneAvailable(this.telephone) && !checkPhone(this.telephone)){
				this.$layer.msg('请输入正确的联系方式!');
			}
		},
		checkEmail(){
			if(!checkEmail(this.email)){
				this.$layer.msg('请输入正确的邮箱格式!');
			}
		},
	    // 分页器
		handleSizeChange(val) {
			// 每页条数
		},
		handleCurrentChange(val) {
			// 当前页数
			this.currentPage = val;
			this.getList(); // 报名列表
		},
		//编号问题
		typeIndex(index) {
			return index + (this.currentPage - 1) * 8 + 1;
		},
		// 招标项目信息
		getbiddingInfo(){
			this.$axios({
				method: "GET",
				url: baseUrl+"/projectInformationController/selectById/"+this.projectInformaPrimaryKeyId,
			}).then(res=>{
				if(res.data.status == 200){
					this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
					this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
					this.totalProId = res.data.data.totalProjectId;//入场项目编号
					this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
					this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
					this.tenderContents = res.data.data.tenderContents;// 招标内容
					this.budgetAmount = res.data.data.budgetAmount;//招标项目预算金额
					this.contactInformation = res.data.data.contactInformation//联系方式
					this.contacts = res.data.data.contacts//联系人
					this.subcontractingControlAmount = res.data.data.subcontractingControlAmount//分包控制金额
					this.biddingOrganization = res.data.data.biddingOrganization,//招标组织方式
					this.biddingProcurementMode = res.data.data.biddingProcurementMode,//招标采购方式
					this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects,//招标项目类型
					this.sourceOfFunds =res.data.data.sourceOfFunds//资金来源
					
				}else{
					this.$layer.msg(res.data.msg);;
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//招标项目信息--》表格分包
		getsubList(){
			if(this.entrySubcontractNumber.indexOf("-") != -1){
				//分包
				this.EntrySubNum = this.entrySubcontractNumber;
				// this.EntrySubNum = "R190301ZG0002-04";
			}
			let lookArr = [];
			lookArr.push(this.EntrySubNum)
			this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
				data:{
					projectEntrySubcontractNumbers:lookArr
				}
			}).then(res=>{
				if(res.data.status == 200){
				res.data.data.map((item,index)=>{
					this.subcontractName = item.subcontractName;
					this.entrySubcontractNumber = item.entrySubcontractNumber;
				})
				
				}else{
					this.$layer.msg(res.data.msg);;
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//投标报名资质条件
		getTenderInfo(){
			let object={}
			if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
				// 入场项目分包编号
				object={
					entrySubcontractNumber:this.totalProjectId,
				}
			}else{
				// 入场项目编号
				object ={
					projectCode:this.totalProjectId
				}
			}
			this.$axios({
				method:'POST',
				url:baseUrl + '/tenderNoticeController/select',
				data:object
			}).then(res=>{
				if(res.data.status == 200){
					res.data.data.map((item,index)=>{
						this.items = item.items;
						this.aprojectLeader = item.projectLeader
						if(item.enrollEndTime == null){
							this.enrollEndTime = ""
						}else{
							this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD HH:mm:ss')
						}
					});
					let companyCation = [];
					let companyArr = [];
					let manageCation = [];
					let manageArr = [];
					this.items.map((itema,index)=>{
						// if(this.entrySubcontractNumber == itema.entrySubcontractNumber || this.totalProjectId == itema.projectCode){
							companyCation = JSON.parse(itema.companyQualifications);
							manageCation = JSON.parse(itema.managerQualifications);
							companyCation.map((item,index)=>{
								companyArr.push(item.label);
							})
							manageCation.map((item,index)=>{
								manageArr.push(item.label);
							})
							this.companyQualifications = companyArr.join(',');
							this.managerQualifications = manageArr.join(',');
						// }
					})
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//头部搜索
		changeRadio(){
			this.$axios({
				method:'POST',
				url:baseUrl + '/projectInformationController/selfTenderListForBidInfor',
				data:{
					pageSize:this.pagesize,
					pageNo:this.currentPage,
					bidState:this.bidState,
					procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
				}
			}).then(res=>{
				if(res.data.status == 200){
				this.tableData = res.data.data.data;
				this.tableData.map((item,index)=>{
					this.state = item.bidState;
					if(item.endTime == null){
						item.endTime = ""
					}else{
						item.endTime = dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss');
					}
				})
				}else{
				this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//搜索
		searchList(){
			this.$axios({
				method:'POST',
				url:baseUrl + '/projectInformationController/selfTenderListForBidInfor',
				data:{
					pageNo:this.currentPage,
					pageSize:this.pageSize,
					nameOfTenderProject:this.entryName,
					totalProjectId:this.number,
					procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
				}
			}).then(res=>{
				if(res.data.status == 200){
				this.tableData = res.data.data.data;
				this.totalSize = res.data.data.data[0].total;
				this.tableData.map((item,index)=>{
					this.state = item.bidState;
					if(item.endTime == null){
					item.endTime = ""
					}else{
					item.endTime = dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss');
					}
				})
				}else{
				this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//获取查询数据
		getList(){
			this.$axios({
				method:'POST',
				url:baseUrl + '/projectInformationController/selfTenderListForBidInfor',
				data:{
					pageNo:this.currentPage,
					pageSize:this.pageSize,
					procurementModes:["竞争性谈判","竞争性磋商","询价"]
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.tableData = res.data.data.data;
					this.tableData.map((item,index)=>{
						this.state = item.bidState;
						if(item.endTime == null){
							item.endTime = ""
						}else{
							item.endTime = dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss');
						}
					})
					this.total = res.data.data.data[0].total;
					this.totalPages = res.data.data.data[0].totalPages;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//获取企业信息
		getCompanyList(){
			return this.$axios({
				method:'POST',
				url:baseUrl + '/userController/selectByPersonnelId',
				data:{}
			}).then(res=>{
				if(res.data.status == 200){
					this.userId = res.data.data.userId;
					this.companyName = res.data.data.companyName;
					this.organizationCode = res.data.data.organizationCode;
					this.companyQualificationCode = res.data.data.companyQualificationCode;
					this.companyQualification = res.data.data.companyQualification;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//是否联合体报名点击为是的时候出现
		changeApply(){
			if(this.isComboApply == "是"){
				this.isYesShow = true;
			}else{
				this.isYesShow = false;
			}
		},
		//查看弹框
		async lookFile(row){
			this.subcontractItePrimaryKeyId = row.subcontractItePrimaryKeyId;
			this.projectInformaPrimaryKeyId = row.projectInformaPrimaryKeyId;
			this.totalProjectId = row.totalProjectId;
			this.entrySubcontractNumber = row.entrySubcontractNumber;
			this.subcontractName = row.subcontractName;
			this.show = true;
			this.bidState = row.bidState;// 当前查看的状态
			await this.getCompanyList();//获取企业信息
			this.keyProjectId = this.totalProjectId + '-' + this.userId;
			this.getTenderInfo();//投标报名资质条件
			this.getOneList();// 其他投标材料 附件
			this.getTwoList();// 投标保证金缴纳凭证附件
			this.getbiddingInfo();// 招标项目信息
			this.$axios({
				method: "POST",
				url: baseUrl+"/bidInforController/selectById",
				data:{
					bidInforId:row.bidInforId
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.companyName = res.data.data.companyName;// 企业名称
					this.projectLeader= res.data.data.projectLeader;// 项目负责人
					this.projectLeaderMajor= res.data.data.projectLeaderMajor;// 项目负责人专业
					this.conpanyLeader= res.data.data.conpanyLeader;// 企业负责人
					this.bidContacts= res.data.data.bidContacts;// 投标联系人
					this.companyPhone= res.data.data.companyPhone;// 公司电话
					this.telephone= res.data.data.telephone;// 联系人手机
					this.fax= res.data.data.fax;// 传真
					this.email= res.data.data.email;// Email
					this.isComboApply= res.data.data.isComboApply;// 是否联合体报名
					this.payDepositAmount = res.data.data.payDepositAmount;// 保证金缴纳金额
					if(res.data.data.payDepositTime == null){
						this.payDepositTime = ""
					}else{
						this.payDepositTime = dayjs(res.data.data.payDepositTime).format('YYYY-MM-DD HH:mm:ss');// 保证金缴纳时间
					};
					if(res.data.data.payTenderFeeTime == null){
						this.payTenderFeeTime = ""
					}else{
						this.payTenderFeeTime = dayjs(res.data.data.payTenderFeeTime).format('YYYY-MM-DD HH:mm:ss');// 缴纳时间
					}
					this.payDepositRemark = res.data.data.payDepositRemark;// 保证金缴纳备注信息
				}else{
					this.$layer.msg(res.data.msg);;
				}
			}).catch(err=>{
				console.log(err)
			})
			
		},
		//添加弹框
		async addFile(row){
			this.subcontractItePrimaryKeyId = row.subcontractItePrimaryKeyId;
			this.projectInformaPrimaryKeyId = row.projectInformaPrimaryKeyId;
			this.totalProjectId = row.totalProjectId;
			this.entrySubcontractNumber = row.entrySubcontractNumber;
			this.subcontractName = row.subcontractName;
			this.addShow = true;
			this.projectLeader = "";
			this.projectLeaderMajor = "";
			this.bidInforId = row.bidInforId;
			this.totalId = row.totalProjectId;
			await this.getCompanyList();//获取企业信息
			this.getTenderInfo();//投标报名资质条件
			this.getbiddingInfo();// 招标项目信息
			this.keyProjectId = this.totalProjectId + '-' + this.userId;
			this.getDeleteAdd();
		},
		//点击提交按钮
		submitInfor(){
			if(!this.companyName){
                this.$layer.msg("请输入企业名称！");
				return false;
            }else if(!this.bidContacts){
                this.$layer.msg("请输入投标联系人！");
				return false;
            }else if(this.companyPhone !='' && this.companyPhone !=null && !checkPhone(this.companyPhone)){
                this.$layer.msg("请输入正确的公司电话！例如:0000-0000000");
				return false;
            }else if (this.telephone!='' && this.telephone !=null && !isPoneAvailable(this.telephone) && !checkPhone(this.telephone)){
                this.$layer.msg("请输入正确的联系人手机！");
				return false;
            }else if(this.email !='' && this.email !=null && !checkEmail(this.email)){
                this.$layer.msg('请输入正确的Email！');
                return false;
            }else{
				let object={}
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
						bidInforId:this.bidInforId,   
						entrySubcontractNumber:this.totalProjectId,
						projectLeader:this.projectLeader,
						projectLeaderMajor:this.projectLeaderMajor,
						conpanyLeader:this.conpanyLeader,
						bidContacts:this.bidContacts,
						companyPhone:this.companyPhone,
						telephone:this.telephone,
						fax:this.fax,
						email:this.email,
						isComboApply:this.isComboApply,
						comboApplyInfor:this.comboApplyInfor,
						state:'审核中',
						isPerson:'1'
                    }
                }else{
                    // 入场项目编号
                    object ={
                        bidInforId:this.bidInforId,   
						projectCode:this.totalProjectId,
						projectLeader:this.projectLeader,
						projectLeaderMajor:this.projectLeaderMajor,
						conpanyLeader:this.conpanyLeader,
						bidContacts:this.bidContacts,
						companyPhone:this.companyPhone,
						telephone:this.telephone,
						fax:this.fax,
						email:this.email,
						isComboApply:this.isComboApply,
						comboApplyInfor:this.comboApplyInfor,
						state:'审核中',
						isPerson:'1'
                    }
				}
				this.$axios({
					method:'POST',
					url:baseUrl + '/bidInforController/save',
					data:object
				}).then(res=>{
					if(res.data.status == 200){
						this.submitBox = true;
						this.addShow = false;
						this.getList();
					}else{
						this.$layer.msg(res.data.msg);
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		submitSave(){
			this.submitBox = false;
		},
		//选择项目负责人按钮
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
					state:'办理通过'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.chooseData = res.data.data.list;
				}else{
					this.$layer.msg(res.data.msg);;
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//点击选择加号到外面的输入框
		addChooseFile(row){
			this.chooseShow = false;
			this.projectLeaderMajor = row.professionalCertificateNumber;// 专业及证书编号
			this.projectLeader = row.name;// 姓名
			this.chooseData = [];
		},
		//关闭弹框
		close(){
			this.show = false;
			this.addShow = false; 
		},
		closeFile(){
			this.fileShow = false;
			this.chooseShow = false;
		},
		handleClose(){
		this.submitBox = false;
		},
		// 其他投标材料 附件
		getOneList(){
			let object={}
			if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
				// 分包
				object={
					relevanceCorrelationId:this.keyProjectId,
					fileType:'其他投标材料'
				}
			}else{
				//  总包
				object ={
					relevanceCorrelationId:this.keyProjectId,
					fileType:'其他投标材料'
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
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		// 投标保证金缴纳凭证附件
		getTwoList(){
			let object={}
			if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
				// 分包
				object={
					relevanceCorrelationId:this.keyProjectId,
					fileType:'投标保证金缴纳凭证'
				}
			}else{
				//  总包
				object ={
					relevanceCorrelationId:this.keyProjectId,
					fileType:'投标保证金缴纳凭证'
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
					this.paymentData[0].attachlist = arr;
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
		downLoadupFile1(item){
			this.downloadFile1(item.attachmeId,item.fileName);
		},
		//一进入添加弹框，调删除接口
		getDeleteAdd(){
			this.$axios({
				method: 'POST',
				url: baseUrl + '/attachmeController/queryAndDeleteAttachme',
				data:{
					relevanceCorrelationId:this.keyProjectId,
					type:'其他投标材料'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.enclosureData[0].attachlist = ""
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		//上传列表
		uploadList(){
			let object={};
			if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
				if(this.num == 1){
					object={
						relevanceCorrelationId:this.keyProjectId,
						fileType:'其他投标材料'
					}
				}else{
					object={
						relevanceCorrelationId:this.keyProjectId,
						fileType:'投标保证金缴纳凭证'
					}
				}
			}else{
				if(this.num == 1){
					object={
						relevanceCorrelationId:this.keyProjectId,
						fileType:'其他投标材料'
					}
				}else{
					object={
						relevanceCorrelationId:this.keyProjectId,
						fileType:'投标保证金缴纳凭证'
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
						item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
						arr.push(item)
					})
					if(this.num == 1){
						this.enclosureData[0].attachlist = arr;
					}else{
						this.paymentData[0].attachlist = arr;
					}
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		// 删除文件列表多选框
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
				this.$layer.msg('图片大小不能超过102400KB');
				return false;
			}
			this.$refs.file.value = null;
			this.files = file;
			var formData = new FormData();
			if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
				// 分包
				if(this.num == 1){
					formData.append("projectId", this.keyProjectId);
					formData.append("file", this.files);
					formData.append("fileType", '其他投标材料');
				}else{
					formData.append("projectId", this.keyProjectId);
					formData.append("file", this.files);
					formData.append("fileType", '投标保证金缴纳凭证');
				}
				
			}else{
				if(this.num == 1){
					// 总包
					formData.append("projectId", this.keyProjectId);
					formData.append("file", this.files);
					formData.append("fileType", '其他投标材料');
				}else{
					formData.append("projectId", this.keyProjectId);
					formData.append("file", this.files);
					formData.append("fileType", '投标保证金缴纳凭证');
				}
				
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
		downloadFile1(attachmeId,fileName){
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
.perfectWrapper,.addWrapper{
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
.choiseWrapper{
	width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
    display: flex;
    flex-direction: column;
}
.perfectBox,.addBox,.choiseBox{
	width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.perfectTitle,.addTitle,.choiseTitle{
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
	display: flex;
	flex-direction: column;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.pagination{
	width: 100%;
	padding: 20px 60px ;
	display: flex;
	justify-content: flex-end;
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
/* 主体 */
.main_box{
  height: 400px;
  overflow-y: scroll;
}
.pagination {
  width: 100%;
  margin: 30px 0;
  text-align: right;
  position: fixed;
  right: 0;
  bottom: 10px;
  margin-right: 30px;
}
.el-radio{
  height: 30px !important;
  line-height: 30px !important;
}
.el-radio:last-child{
  height: 30px !important;
  line-height: 30px !important;
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
  .editChoise{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
	z-index: 999;
}
.uploadBox{
    width: 80%;
    height:70%;
    background: #fff;
    display: flex;
    flex-direction: column;
	position: relative;
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