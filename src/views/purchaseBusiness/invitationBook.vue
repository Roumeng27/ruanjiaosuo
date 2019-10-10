<template>
   <div class="newBox">
	   <!-- 成交结果通知书 -->
      	<div class="wrapper">
			<!-- 搜索的输入框 -->
			<div class="editItem">
				<div class="editCenter">
					<div class="editName">分包编号：</div>
					<div class="editContent">
						<el-input v-model="numberItem" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
					</div>
				</div>
				<div class="editCenter">
					<div class="editName">分包名称：</div>
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
					<el-table-column prop="projectNumber" label="分包编号" width="170">
					</el-table-column>
					<el-table-column prop="projectName" label="分包名称">
					</el-table-column>
					<el-table-column prop="noticeCode" label="通知书编号">
					</el-table-column>
					<el-table-column prop="operation" label="操作" width="70"> 
					<template slot-scope="scope">
						<i class="el-icon-search" style="cursor:pointer;" @click="goDetail(scope.row)"></i>
					</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页器 -->
			<div class="pagination" v-if="this.pageNum>1">
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
		<!-- 详情页面 -->
		<div class="detailWrapper" v-show="detailFlag">
			<div class="detailBox">
				<div class="detailTitle">
					<p>查看招标结果通知书</p>
					<i class="el-icon-close" style="cursor:pointer;" @click="closeDetail"></i>
				</div>
				<div class="main_info">
					<div  style="font-size:18px;text-align:right;margin-right:30px;margin-top:45px;">{{entrySubcontractNumber}}</div>
					<div class="mainBox">
						<h2>招标结果通知书</h2>
						<div class="wordBox">
							<p>{{acceptName}}:</p>
							<div class="content">贵公司于{{openDate}}提交的<span>{{projectName}}</span>(<span>{{subprojectName}}</span>)投标文件，经评委会评定，贵公司未能在上述项目中标。中标人为：</div>
						</div>
						<table border="1" cellspacing="0" cellpadding="0" style="width:90%;">
							<tr>
								<td>项目(分包)名称</td>
								<td>中标单位</td>
							</tr>
							<tr>
								<td>{{subprojectName}}</td>
								<td>{{winnerCompany}}</td>
							</tr>
						</table>
						<div class="editFirst">
							<p>特此通知。</p>
						</div>
						<div class="editLast">
							<p>{{sendName}}</p>
							<p>{{sendDate}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
   </div>
  
</template>
   
<script>
import '../../assets/css/style.css';
import baseUrl from '../../api/api';
import {formatDate,changeTime,isPoneAvailable,getIdcard,getName} from '../../api/base.js';
import dayjs from "dayjs";
export default {
	data(){
		return {
			entrySubcontractNumber:'',
			nameItem:'',// 分包名称
			numberItem:'',// 分包编号
			
			// 分页器
			currentPage:1,// 当前页
			pageSize: 10, // 每页条数
			total: 0, //总条数
			pageNum:0,// 后端返回页数
			// 公共
			activeName:['1','2','3','4','5'],
			// 弹窗
			detailFlag:false,
			resultData:[],// 投标结果通知书
			noticeCode:'',// 通知书编号
			winnerCompany:'',//中标公司
			sendName:'',//发送人
			sendDate:'', //发送时间
			subprojectName:'',//分包名称
			acceptName:'', //接受人
			projectName:'',//总包名称
			openDate:'',//开标时间
		}
	},
	created(){
		this.getResultList();// 招标结果通知书列表数据
	},
  	methods:{
	  	// 分页器
		handleSizeChange(val) {
			// 每页条数
		},
		handleCurrentChange(val) {
			// 当前页数
			this.currentPage = val;
			this.getResultList(); // 招标结果通知书列表数据
		},
		//编号问题
		typeIndex(index) {
			return index + (this.currentPage - 1) * 10 + 1;
		},
		// 搜索
		searchList(){
            if(this.numberItem == ''&& this.nameItem == ''){
                return false;
            }else{
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/winnNoticeController/myNotice',
                    data:{
                        pageNo:this.currentPage,
                        pageSize:this.pageSize,
                        type:"招标公告通知书",
                        projectNumber:this.numberItem,
						projectName:this.nameItem,
						procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.resultData = res.data.data.list;// 投标结果通知书
                        this.total = res.data.data.total;// 总数
                        this.pageNum = res.data.data.pageNum;// 页数
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
		},
		// 招标结果通知书列表数据
		getResultList(){
			this.$axios({
				method:'POST',
				url:baseUrl + '/winnNoticeController/myNotice',
				data:{
					pageNo:this.currentPage,
					pageSize:this.pageSize,
					type:"招标公告通知书",
					procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.resultData = res.data.data.list;
					this.total = res.data.data.total;// 总数
					this.pageNum = res.data.data.pageNum;// 页数
					this.resultData.forEach(item => {
						item.noticeCode = item.items[0].noticeCode;// 通知书编号
					});
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		goDetail(row){
			this.entrySubcontractNumber = row.entrySubcontractNumber;// 分包编号
			this.projectCode = this.projectCode;// 总包
			this.getWinDetail();// 招标结果通知书详情
			this.detailFlag = true;
		},
		closeDetail(){
			this.detailFlag = false;
		},
		// 招标结果通知书详情
		getWinDetail(){
			let object = {};
			if(this.entrySubcontractNumber.indexOf("-") != -1 && this.entrySubcontractNumber!=null){
				// 入场项目分包编号
				object={
					entrySubcontractNumber:this.entrySubcontractNumber
				}
			}else{
				// 入场项目编号
				object ={
					projectCode:this.projectCode
				}
			}
			this.$axios({
				method:'POST',
				url:baseUrl + '/winnNoticeController/selectByCode',
				data:object
			}).then(res=>{
				if(res.data.status == 200){
					this.winnerCompany = res.data.data.winnerCompany;//中标公司
					this.sendName = res.data.data.sendName;//发送人
					this.sendDate = dayjs(res.data.data.sendDate).format('YYYY年MM月DD日');//发送时间
					this.subprojectName = res.data.data.subprojectName;//分包名称
					this.acceptName = res.data.data.acceptName;//接受人
					this.projectName = res.data.data.projectName;//总包名称
					this.openDate =dayjs(res.data.data.openDate).format('YYYY年MM月DD日');//开标时间
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
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
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.mainBox{
	width: 55%;
	flex: 1;
	/* display: flex;
	flex-direction: column;
	align-items: center; */
	padding: 50px;
	margin: 0 auto;
	font-size: 18px;
}
.mainBox>h2{
	display: flex;
	align-items: center;
	justify-content: center;
}
.mainBox>table{
	text-align: center;
	margin: 0 auto;
	line-height: 30px;
}
.wordBox{
	line-height: 40px;
}
.editFirst{
	width: 100%;
	display: flex;
	justify-content: flex-start;
	text-indent: 35px;
	line-height: 40px;
	margin-top: 35px;
}
.editLast{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	line-height: 40px;
	margin-top:40px;
}
.content{
	text-indent: 35px;
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
.main_info{
	width: 100%;
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


.detailWrapper{
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
.passWrapper{
	width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 200px;
    display: flex;
    flex-direction: column;
}
.detailBox,.passBox{
	width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.detailTitle,.passTitle{
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
</style>