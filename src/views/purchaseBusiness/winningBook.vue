<template>
   <div class="newBox">
       <!-- 成交通知书 -->
		<div class="wrapper">
			<!-- 搜索的输入框 -->
			<div class="editItem">
				<div class="editCenter">
					<div class="editName">中标项目(分包)名称：</div>
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
				<el-table :data="winData" stripe style="width: 100%">
					<el-table-column type="index" width="70" label="序号" :index="typeIndex">
					</el-table-column>
					<el-table-column prop="projectNumber" :show-overflow-tooltip ="true" label="分包编号">
					</el-table-column>
					<el-table-column prop="projectName" :show-overflow-tooltip ="true" label="分包名称">
					</el-table-column>
					<el-table-column prop="noticeCode" :show-overflow-tooltip ="true" label="通知书编号">
					</el-table-column>
					<el-table-column prop="operation" label="操作" width="70"> 
					<template slot-scope="scope">
						<i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
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
        <!-- 详情 -->
        <div class="detailWrapper" v-show="detailFlag">
            <div class="detailBox">
                <div class="detailTitle">
                    <p>中标项目信息</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeDetail"></i>
                </div>
                <div  style="font-size:18px;text-align:right;margin-right:30px;margin-top:45px;">{{entrySubcontractNumber}}</div>
                <div class="box">
                    <h1 style="text-align:center;margin-top:50px;">中标通知书</h1>
                    <div style="font-size:18px;line-height:35px;">{{sendName}}：</div>
                    <div style="font-size:18px;line-height:35px;">
                        <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;根据<span>{{projectName}}</span>(<span>{{subprojectName}}</span>)招标文件(招标项目编号：<span>{{biddingProjectNumber}}</span>)和你单位于<span>{{openDate}}</span>提交的投标文件
                        经评标委员会评审，现确定你单位为上述项目的中标人，中标价格为{{bigAmount}}（小写:<span>{{winnerPrice}}</span>万元）。
                        </div>
                        <div>
                             请接到本通知30日内，持通知与<span>{{sendName}}</span>签订合同。
                        </div>
                    </div>
                    <div style="font-size:18px;line-height:45px;display:flex;justify-content:space-between;margin-top:50px;">
                        <div>
                            <div>经办人：</div>
                             <div>电话：</div>
                        </div>
                        <div>
                            <div>中标联系人：<span>{{bidContacts}}</span></div>
                            <div>电话：<span>{{telephone}}</span></div>
                        </div>
                    </div>
                    <div  style="font-size:18px;line-height:45px;text-align:right;margin-right:15px;margin-top:50px;">
                        <div>{{acceptName}}</div>
                        <div>{{sendDate}}</div>
                    </div>
                   </div>
                </div>
            </div>
        </div>
</template>
   
<script>
import baseUrl from '../../api/api';
import {bigUppercase} from '../../api/base.js';
export default {
 
  data(){
    return {
        bigAmount:'',// 中标价格
        nameItem:'',// 中标项目(分包)名称 搜索
        numberItem:'',// 入场项目(分包)编号 搜索
        winData:[],
        budgetAmount:'',
        amountId:'',
        winAdvice:[],
        
        // 分页器
		currentPage:1,// 当前页
		pageSize: 10, // 每页条数
		pageTotal: 0, //总页数
		total: 0, //总条数
        totalPages:0,// 开标情况列表条数
        pageNum:0,// 页数
        tableData:[],
        detailFlag:false,
        noticeCode:'',// 通知书编号
        winnerCompany:'',//中标公司
        sendName:'',//发送人
        sendDate:'',//发送时间
        subprojectName:'',//分包名称
        acceptName:'',//接受人
        projectName:'',//总包名称
        openDate:'',//开标时间
        entrySubcontractNumber:'',
        projectCode:'',
        winnerPrice:'',
        bidContacts:'',
        telephone:'',
        biddingProjectNumber:'',// 招标项目编号
    }
  },
  created(){
      this.getwinList();// 中标通知书列表
  },
  methods:{
       // 分页器
		handleSizeChange(val) {
			// 每页条数
		},
		handleCurrentChange(val) {
			// 当前页数
            this.currentPage = val;
            this.getwinList();// 中标通知书列表
		},
		//编号问题
		typeIndex(index) {
			return index + (this.currentPage - 1) * 10 + 1;
        },
        // 中标通知书列表
        getwinList(){
            this.$axios({
				method:'POST',
				url:baseUrl + '/winnNoticeController/myNotice',
				data:{
					pageNo:this.currentPage,
					pageSize:this.pageSize,
                    type:"中标通知书",
                    procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.winData = res.data.data.list;
					this.total = res.data.data.total;// 总数
					this.pageNum = res.data.data.pageNum;// 页数
					this.winData.forEach(item => {
						item.noticeCode = item.items[0].noticeCode;// 通知书编号
					});
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        //  搜索
        searchList(){
            this.$axios({
				method:'POST',
				url:baseUrl + '/winnNoticeController/myNotice',
				data:{
					pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    type:'中标通知书',
                    projectNumber:this.numberItem,
                    projectName:this.nameItem,
                    procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
                }
			}).then(res=>{
                if(res.data.status=200){
                    this.winData = res.data.data.list;
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        lookFile(row){
            this.detailFlag = true;
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            this.projectCode = row.projectCode;// 总包
            this.getWinDetail();
        },
        //中标项目信息展示
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
                    this.winnerPrice = res.data.data.winnerPrice;
                    this.bidContacts=res.data.data.bidContacts;
                    this.telephone=res.data.data.telephone;
                    this.bigAmount = bigUppercase(res.data.data.winnerPrice);
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        closeDetail(){
            this.detailFlag = false
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
.detailBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.detailTitle{
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
    width: 50%;
    margin: 30px auto;
}
.fontTypeFace{
    font-size: 18px;
    text-align: center;
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
.main_info{
    
	overflow: hidden;
	/* overflow-y: scroll; */
}

.box h3{
   position: absolute;
   top: 150px;
   left: 300px;
   font-weight: 100;
}
.box p{
    position: absolute;
    top: 200px;
    left: 350px;
    font-size: 15px;     
}
.people{
    position: absolute;
    top: 300px;
    left: 400px;
    
}
.people h4{
    display: inline;
    font-weight: 100;
    
}
.people:first-child{
    position: fixed;
    font-weight: 100;
}
.people :last-child{
    margin-left: 100px;
    font-weight: 100;
}     
.phone{
    position: absolute;
    top: 400px;
    left: 400px;
    
}
.phone h4{
    display: inline;
    font-weight: 100;
}
.phone :first-child{
    position: fixed;
    font-weight: 100;

}
.phone :last-child{
    margin-left: 150px;
    font-weight: 100;
}
h5{
    position: absolute;
    top: 500px;
    left:600px;
    font-size: 15px;
    font-weight: 100;
}
h6{
      position: absolute;
    top: 550px;
    left:600px;
    font-size: 15px;
   font-weight: 100;
}

</style>