<template>
    <div class="newBox">
        <!-- 招标文件领取 -->
        <div class="wrapper">
            <div class="boxTitle">
                <el-radio-group v-model="bidDraw" @change="changeRadio">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="未领取">未领取</el-radio>
                    <el-radio label="已领取">已领取</el-radio>
                </el-radio-group>
            </div>
            <!-- 搜索的输入框 -->
            <div class="editItem">
                <div class="editCenter">
                    <div class="editName">入场项目(分包)编号：</div>
                    <div class="editContent">
                        <el-input v-model="numberItem" clearable placeholder="请输入内容" @keyup.enter.native="searchList()"></el-input>
                    </div>
                </div>
                <div class="editCenter">
                    <div class="editName">招标项目名称：</div>
                    <div class="editContent">
                        <el-input v-model="nameItem" clearable placeholder="请输入内容" @keyup.enter.native="searchList()"></el-input>
                    </div>
                </div>
                <div class="editBtn">
                    <button class="btn" @click="searchList()">搜索</button>
                </div>
            </div>
            <div class="main_info">
                <el-table :data="resultData" stripe style="width: 100%">
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="totalProjectId" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="170">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="subcontractName" :show-overflow-tooltip ="true" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="tenderDocumentsCost" :show-overflow-tooltip ="true" label="金额">
                    </el-table-column>
                    <el-table-column prop="operation" label="领取" width="70"> 
                    <template slot-scope="scope">
                        <i class="el-icon-s-order" style="cursor:pointer;" @click="goDetail(scope.row)"></i>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页器 -->
            <div class="pagination">
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
        <!-- 招标文件下载弹框 -->
		<div class="perfectWrapper" v-show="show">
            <div class="perfectBox">
                <div class="perfectTitle">
					<p>招标文件下载</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="close()"></i>
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
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{nameOfPurchaser}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{amountId}}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="totalProjectId.indexOf('-') != -1">   
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
                                        label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!--支付信息 -->
                        <el-collapse-item title="支付信息" name="2">
                            <div @click="downloadFile()" class="picture">下载招标文件</div>
                        </el-collapse-item>
					</el-collapse>
                </div>
            </div>
		</div>
        <!-- 查看分包弹框 -->
        <div class="winWrapper" v-show="lookFlag">
            <div class="winBox">
               	<div class="winTitle">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook" style="cursor:pointer;"></i>
                </div>
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
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
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
                                    <div class="editName">分包控制金额(万元)：</div>
                                    <div class="editContent">{{subcontractingControlAmount}}</div>
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
</template>

<script>
import '../../assets/css/style.css';
import baseUrl from '../../api/api';
import {formatDate,changeTime,isPoneAvailable,getIdcard,getName,checkPhone} from '../../api/base.js';
import dayjs from "dayjs";
export default {
  components:{},
  props:{},
  data(){
    return {
        attachmeId:'',
        bidDraw:'',//单选按钮
        numberItem:'',//搜索入场项目分包编号
        nameItem:'',//采购项目名称
        resultData:[],//表格数据
        currentPage:1,// 当前页
        pageSize: 10, // 每页条数
        pageTotal: 0, //总页数
        total: 0, //总条数
        pageNum:'',
        show:false,
        activeName:['1','2'],
        nameOfTenderProject:'',//采购项目名称
        nameOfPurchaser:'',//招标采购人
        biddingProjectNumber:'',//采购项目编号
        amountId:'',//入场项目编号
        breakBagFlag:false,
        lookFlag:false,
        subpackageData:[],//分包数据
        totalProjectId:'',//总包编号
        entrySubcontractNumber:'',//分包编号
        subcontractName:'',//分包名称
        subcontractContents:'',//分包内容
        scopeOfTender:'',//采购范围
        subcontractingControlAmount:'',//分包控制金额
        qualificationExaminationMethod:'',//资格审查方式
        electronicBidEvaluation:'',//是否电子招投标
        fileName:'',//文件名字
    }
  },
  watch:{},
  computed:{},
  methods:{
        // 分页器
        handleSizeChange(val) {
            // 每页条数
        },
        handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getList();
        },
        //编号问题
		typeIndex(index) {
			return index + (this.currentPage - 1) * 10 + 1;
        },
        //头部搜索
        changeRadio(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/projectInformationController/selectBiddDocumentList',
                data:{
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    receivingStatus:this.bidDraw,
                    procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.resultData = res.data.data.list;
                    this.total = res.data.data.total;// 总数
                    this.pageNum = res.data.data.pageNum;// 页数
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //数据列表
        getList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/projectInformationController/selectBiddDocumentList',
                data:{
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.resultData = res.data.data.list;
                    this.total = res.data.data.total;// 总数
                    this.pageNum = res.data.data.pageNum;// 页数
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        searchList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/projectInformationController/selectBiddDocumentList',
                data:{
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    totalProjectId:this.numberItem,
                    nameOfTenderProject:this.nameItem,
                    procurementModes:["竞争性谈判","竞争性磋商","询价","单一来源"]
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.resultData = res.data.data.list;
                    this.total = res.data.data.total;// 总数
                    this.pageNum = res.data.data.pageNum;// 页数
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //打开采购文件下载弹框
        goDetail(row){
            this.show = true;
            this.totalProjectId = row.totalProjectId;
            this.attachmeId = row.attachmeId;
            this.fileName = row.fileName;
            this.getbiddingInfo(row.projectInformaPrimaryKeyId);// 采购项目信息
            this.getItemInfo();
        },
        close(){
            this.show = false;
        },
        closeLook(){
            this.lookFlag = false;
        },
        // 根据项目入场分包编号查询
        getItemInfo(){
            let arr =[];
            arr.push(this.totalProjectId)
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
        // 招标项目信息
        getbiddingInfo(projectInformaPrimaryKeyId){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+ projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                    this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                    this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
                    this.biddingOrganization = res.data.data.biddingOrganization;// 招标组织方式
                    this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
                    this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
                    this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
                    this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号

                }else{
                    this.$message.warning(res.data.msg);;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        lookoverItem(row){
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            this.subcontractName = row.subcontractName;// 分包名称 
            this.subcontractContents = row.subcontractContents;// 分包内容
            this.scopeOfTender = row.scopeOfTender;// 招标范围
            this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
            this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
            this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            this.lookFlag = true;
        },
        //下载文件
        downloadFile(){
            this.$axios({
				method: 'POST',
				url: baseUrl + '/attachmeController/downloadAttachem',
				data:{
					attachmeId:this.attachmeId,
					fileName:this.fileName
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
                this.getReceiveStatus();
            }).catch(err=>{
                console.log(err)
            })
        }, 
        //附件文件领取状态
        getReceiveStatus(){
            this.$axios({
				method: 'POST',
                url:baseUrl + '/attachmeController/updateAttachem',
				data:{
					attachmeId:this.attachmeId,
					receivingStatus:'已领取'
				},
			}).then(res=>{
                if(res.data.status == 200){
                    console.log(res.data.data)
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
  },
  created(){
      this.getList();
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
.main_info{
	width: 100%;
	display: flex;
	flex-direction: column;
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
.main_info{
	width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.pagination{
    width: 100%;
    text-align: right;
    position: fixed;
    right: 0;
    bottom: 0;
    margin-right:50px;
    margin-bottom: 10px;
    background: #fff;
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
.perfectWrapper{
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
.perfectBox,.winBox{
	width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.perfectTitle,.winTitle{
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
.winWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top:0;
    background: rgba(0, 0, 0, .2);
    z-index: 999;
    padding:30px 50px;
    display: flex;
    flex-direction: column;
}
.picture{
    width:245px;
    height:129px;
    background:#0095d5;
    color:#fff;
    font-size:30px;
    margin:20px auto;
    text-align:center;
    line-height:129px;
    cursor:pointer;
}
</style>