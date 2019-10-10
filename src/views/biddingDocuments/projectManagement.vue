<template>
    <!-- 项目管理 -->
	<div class="newBox">
		<div class="wrapper">
			<!-- 搜索的输入框 -->
            <div class="pick_input" >
                <div class="noteItem">
                    <div class="noteLeft" style="width:150px;">招标项目(分包)名称：</div>
                    <div class="write_input" >
                        <el-input v-model="nameOfTenderProject" placeholder="请输入内容" clearable @keyup.enter.native="searchList"></el-input>
                    </div>
                </div>
                <div class="noteItem">
                    <div class="noteLeft" style="width:200px;">入场项目(分包)编号：</div>
                    <div class="write_input" >
                        <el-input v-model="totalProjectId" placeholder="请输入内容" clearable @keyup.enter.native="searchList"></el-input>
                    </div>
                </div>
                <button class="owner_btn" @click="searchList">搜索</button>
            </div>
			<div class="main_info">
				<el-table
					:data="biddingData"
					style="width: 100%">
					<el-table-column type="index" label="序号" :index="typeIndex" width="70">
                    </el-table-column>
					<el-table-column
						prop="totalProjectId"
						label="入场项目(分包)编号"
						width="180">
					</el-table-column>
					<el-table-column
						prop="nameOfTenderProject"
						label="招标项目名称"
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						prop="biddingProjectNumber"
						label="招标项目编号"
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						prop="subcontractName"
						label="分包名称"
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
                            <a href="javaScript:;" @click="handleInfo(scope.row)">进入项目</a>
						</template>
					</el-table-column>
                    <el-table-column fixed="right" label="查看" width="100">
						<template slot-scope="scope">
							<i class="el-icon-search"  style="cursor: pointer;" @click="lookOver(scope.row)"></i>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页器 -->
           	<div class="pagination" v-if="this.currentPage>1">
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
        <!-- 进入项目 -->
        <div class="handleWrapper" v-show="handleFlag">
            <div class="handleBox">
                <div class="handleMain">
                    <table class="tableClass">
                        <tr>
                            <th colspan="4">项目信息</th>
                        </tr>
                        <tr>
                            <td class="tableTitle">入场项目(分包)编号</td>
                            <td >R190301W07G0037</td>
                            <td class="tableTitle">招标项目编号</td>
                            <td>RJS2019301</td>
                        </tr>
                        <tr>
                            <td class="tableTitle">招标项目名称</td>
                            <td colspan="3" style="text-align:start;">公开招标不公开分包演示</td>
                        </tr>
                        <tr>
                            <td class="tableTitle">招标(采购)人</td>
                            <td>测试用户一</td>
                            <td class="tableTitle">招标(采购)代理机构</td>
                            <td>软交所招标采购交易中心测试单位(测试)</td>
                        </tr>
                        <tr>
                            <td class="tableTitle">开标时间</td>
                            <td>2019年3月4日 13:20</td>
                            <td class="tableTitle">开标地点</td>
                            <td>第二开标室</td>
                        </tr>
                    </table>
                    <div class="sureBtn">
                        <button class="btn" @click="sureInfo">确定</button>
                    </div>
                </div>
            </div>
        </div>
		<!-- 查看列表详情 -->
		<div class="detailWrapper" v-show="showLookover">
			<div class="detailBox">
				<div class="detail_title">
					<p>分包信息</p>
					<i class="el-icon-close"  @click="closeLook"></i>
				</div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!-- 招标项目信息 -->
						<el-collapse-item title="招标项目信息" name="1">
							<div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                     <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{nameOfPurchaser}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectId}} </div>
                                    </div>
                                </div>
                            </div>
						</el-collapse-item>
						<!-- 分包信息 -->
						<el-collapse-item title="分包信息" name="2">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName" style="color:#f00;">标段包编号(赋码)：</div>
										<div class="editContent"></div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName" style="color:#f00;">统一交易标志码：</div>
										<div class="editContent"></div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">入场项目分包编号：</div>
										<div class="editContent">{{entrySubcontractNumber}}</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">分包内容：</div>
										<div class="editContent">{{nameOfPurchaser}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">招标范围：</div>
										<div class="editContent">{{subcontractContents}} </div>
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
        <el-dialog
            title="系统提示"
            :visible.sync="successFlag"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>成功进入分包:公开招标不公开分包演示!</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successSure">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>

<script>
import '../../assets/css/style.css'
import baseUrl from '../../api/api'
export default {
	components:{},
	props:{},
	data(){
		return {
			activeName: ['1','2','3'],// 弹框折叠效果
			currentPage:1,// 当前页
			pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
            total: 0, //总条数
            biddingData: [],// 自行招标列表数据
            showLookover:false,// 查看列表详情
            handleFlag:false,// 进入项目弹窗
            successFlag:false,// 进入项目弹窗确定按钮
			// 招标项目信息所需字段
			nameOfTenderProject:'',// 招标项目名称
			biddingProjectNumber:'',// 招标项目编号
			nameOfPurchaser:'',// 招标(采购)人
			totalProjectId:'',// 入场项目编号
			// 分包信息所需字段
			entrySubcontractNumber:'',// 入场项目分包编号
			subcontractName:'',// 分包名称
			subcontractContents:'',//分包内容
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:0,// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式
			electronicBidEvaluation:'',// 电子化开评标
		}
	},
	created(){
		this.getList();// 自行招标列表
	},
	methods:{
		//编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
		// 分页器
		handleSizeChange(val) {
			// 每页条数
		},
		handleCurrentChange(val) {
            // 当前页数
			this.currentPage = val;
			this.getList();// 自行招标列表
        },
        handleClose(){
            this.successFlag = false;
        },
		// 查看列表详情
		lookOver(row){
			this.showLookover = true;
			if(row.subcontractItePrimaryKeyId == null){
				this.getbiddingInfo(row.projectInformaPrimaryKeyId) // 招标项目信息 
			}else {
				this.getbiddingInfo(row.projectInformaPrimaryKeyId) // 招标项目信息 
				this.getInfo(row.subcontractItePrimaryKeyId) // 分包信息
			}
		},
		closeLook(){
			this.showLookover= false;
		},
		// 搜索
		searchList(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selfTenderList",
				data:{
					nameOfTenderProject:this.nameOfTenderProject,
					totalProjectId:this.totalProjectId,
					pageNo:this.currentPage,
					pageSize:this.pageSize
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.biddingData = res.data.data.data;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 操作 跳转详情页面
		handleInfo(row){
			this.handleFlag = true;
        },
        // 进入项目的确定
        sureInfo(){
            this.successFlag = true;
        },
        // 系统提示确定按钮
        successSure(){
            this.successFlag = false;
            // 跳转到项目信息
            this.$router.push({
				name:'projectInfo'
			}); 
        },
		// 自行招标列表
		getList(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selfTenderList",
				data:{
					pageNo:this.currentPage,
					pageSize:this.pageSize
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.biddingData = res.data.data.list;// 自行招标列表
					this.total = res.data.data.total;// 总条数
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 招标项目信息
        getbiddingInfo(projectInformaPrimaryKeyId){
            this.$axios({
				method: "GET",
				url: baseUrl+"/projectInformationController/selectById/"+projectInformaPrimaryKeyId,
			}).then(res=>{
				if(res.data.status == 200){
                    this.totalProjectId = res.data.data.totalProjectId;// 入场项目编号
                    this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                    this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
                    this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
                    this.biddingOrganization = res.data.data.biddingOrganization;//  招标组织方式
					this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
					this.nameOfTenderProject =  res.data.data.nameOfTenderProject;// 招标项目名称
					this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
					
					this.entrySubcontractNumber = res.data.data.totalProjectId;// 入场项目编号
					this.electronicBidEvaluation = res.data.data.electronicBidEvaluation;// 电子化开评标
					this.subcontractName = res.data.data.nameOfTenderProject;// 名称
					this.qualificationExaminationMethod =  res.data.data.qualificationExaminationMethod;// 资格审查方式
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 分包信息
        getInfo(subcontractItePrimaryKeyId){
           this.$axios({
				method: "GET",
				url: baseUrl+"/subcontractItemController/selectById"+"?id"+"="+subcontractItePrimaryKeyId,
			}).then(res=>{
				if(res.data.status == 200){
                   this.entrySubcontractNumber =  res.data.data.entrySubcontractNumber;
                   this.subcontractName =  res.data.data.subcontractName;
                   this.subcontractContents =  res.data.data.subcontractContents;
                   this.scopeOfTender =  res.data.data.scopeOfTender;
                   this.subcontractingControlAmount =  res.data.data.subcontractingControlAmount;
                   this.qualificationExaminationMethod =  res.data.data.qualificationExaminationMethod;
                   this.electronicBidEvaluation = res.data.data.electronicBidEvaluation;
                }
			}).catch(err=>{
				console.log(err)
			})
        },
	}
}
</script>
<style scoped>
	.newBox {
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
	.detailWrapper{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 999;
		padding: 10px;
		display: flex;
		flex-direction: column;
	}
    .handleWrapper{
        width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: #fff;
		z-index: 999;
		padding: 10px;
		display: flex;
		flex-direction: column;
    }
	.detailBox,.handleBox{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;

	}
    .handleMain{
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .tableClass{
        width: 100%;
    }
    .sureBtn{
        width: 100%;
        padding: 20px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    table,td,th{
        border:2px solid #95d7f9;     
        border-collapse:collapse;
        line-height: 24px;
    }
    .tableTitle{
        background: #c9e7eb;
        text-align: center;
    }
	.detail_title{
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
		flex: 1;
		overflow: hidden;
		overflow-y: scroll;
	}
	.el-collapse{
		width: 80%;
		margin: 10px auto;
	}
	.el-collapse-item__content{
		padding-bottom: 0 !important;
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
		width: 250px;
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
	.btn{
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
		align-items: center;
		justify-content: flex-end;
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
	.editContent>p{
		width: 25%;
	}
	/* 文本框的样式 */
	.editTextarea{
		width: 100%;
		padding: 5px 0;
		display: flex;
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
</style>