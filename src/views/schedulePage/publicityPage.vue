<template>
    <div class="newBox">
        <!--  中标通知书 -->
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
										<div class="editContent">{{nameOfTenderProject}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">招标(采购)人：</div>
										<div class="editContent">{{tenderPurchaserName}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">招标项目预算金额：</div>
										<div class="editContent">{{budgetAmount}}万元</div>
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
							</div>
                            <div v-if="entrySubcontractNumber != null">   
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
                        <!-- 相关附件 -->
						<el-collapse-item title="相关附件" name="2">
							<div class="edit_list">
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
                                </el-table>
                            </div>
						</el-collapse-item>
                        <!-- 中标单位信息 -->
						<el-collapse-item title="中标单位信息" name="3">
							<div class="edit_list">
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
                                        label="中标单位名称">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="projectLeader"
                                        label="项目负责人">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="winningAmount"
                                        label="中标价格">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="winningBidPeriod"
                                        label="中标工期(天)">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="qualityGradeOfWinningBid"
                                        label="中标质量等级">
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
                        <!-- 中标通知书 -->
						<el-collapse-item title="中标通知书" name="4">
							<div class="edit_list">
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
                                        :show-overflow-tooltip ="true"
                                        prop="reason"
                                        label="通过原因">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="state"
                                        label="通知书状态">
                                    </el-table-column>
                                </el-table>
                            </div>
						</el-collapse-item>
						<!-- 招标结果通知书 -->
						<el-collapse-item title="招标结果通知书" name="5">
							<div class="edit_list">
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
                                        :show-overflow-tooltip ="true"
                                        label="原因">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit-outline"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="通知书状态">
                                        <template slot-scope="scope">
                                            <span v-if="winBidState == '办理通过'">已发送</span>
                                            <span v-else>未发送</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
						</el-collapse-item>
						<!-- 办理记录 -->
						<el-collapse-item title="办理记录" name="6">
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
        <!-- 查看中标单位 -->
        <div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看中标单位</p>
                    <i class="el-icon-close" @click="closeLookoverItem"></i>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 中标单位信息 -->
                        <el-collapse-item title="中标单位信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">中标单位名称：</div>
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
                                        <div class="editName">中标价格：</div>
                                        <div class="editContent">{{winningAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">中标工期(日历天)：</div>
                                        <div class="editContent">{{winningBidPeriod}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">中标质量等级：</div>
                                        <div class="editContent">{{qualityGradeOfWinningBid}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">中标说明：</div>
                                        <div class="editContent">{{winningBidDescription}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 分包信息 -->
        <div class="lookWrapper" v-show="lookInfoFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLookInfo"></i>
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
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter"  v-if="biddingOrganization == '委托招标'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectNumber}}</div>
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
                                        <div class="editName">招标范围：</div>
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
        <el-dialog title="请输入意见" :visible.sync="agreeFlag" width="50%" :before-close="agreeSure">
            <div class="box">
                <button class="btn" @click="agreeSubmit">确认提交</button>
                <button class="btn" @click="agreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="remarks" :rows="6" ></el-input>
            </div>
        </el-dialog>
        <el-dialog title="请输入意见" :visible.sync="disAgreeFlag" width="50%" :before-close="disAgreeSure">
            <div class="box">
                <button class="btn" @click="disAgreeBack">确认退回</button>
                <button class="btn" @click="disAgreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="remarks" :rows="6" ></el-input>
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
                lookInfoFlag:false,
                electronicBidEvaluation:'',
                qualificationExaminationMethod:'',
                subcontractingControlAmount:'',
                subcontractName:'',
                subcontractContents:'',
                scopeOfTender:'',
                breakBagFlag:false,
                subpackageData:[],
                biddingOrganization:'',
                biddingPurchasingAgencyName:'',
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6'],
                // 文件查询
                fileData:[],
                // 文件上传所需字段
                enclosureData:[{
                    id:1,
                    appendixName: "招标（采购）人确认附件",
                    attachlist: []
                },
                {
                    id:2,
                    appendixName: "中标通知书",
                    attachlist: []
                }],
                // 弹窗所需字段
                agreeFlag:false,// 同意
                disAgreeFlag:false,// 不同意
                remarks:'',// 备注
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
                unitsInfo:[],// 中标单位信息
                winAdvice:[],// 中标通知书
                resultAdvice:[],// 招标结果通知书
                lookFlag:false,// 查看中标单位
                // 中标单位所需字段
                nameOfWinningBidder:'',// 中标单位名称
                projectLeader:'',// 项目负责人
                bidEvaluationCommitteeList:'',// 评委会成员名单
                winningAmount:'',// 中标价格
                winningBidPeriod:'',// 中标工期(日历天)
                qualityGradeOfWinningBid:'',// 中标质量等级
                winningBidDescription:'',// 中标说明
                winBidState:'',// 状态
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
            this.getOneList();// 招标（采购）人确认函附件
            this.getTwoList();// 招标公告附件
            this.getmanageInfo();// 办理记录
            if(this.entrySubcontractNumber != null){
                this.getItemInfo();
            }
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
                    winnNoticeId:this.referenceId,
                    state:'办理通过',
                    operationFlow:'中标通知书'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/winnNoticeController/submit',
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
                                this.$message.warning(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$message.warning(res.data.msg);
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
                    winnNoticeId:this.referenceId,
                    state:'办理未通过',
                    operationFlow:'中标通知书'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/winnNoticeController/submit',
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
                                this.$message.warning(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
                
            },
            // 不同意的关闭按钮
            disAgreeSure(){
                this.disAgreeFlag = false;
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
            // 通过关联ID查询入场项目编号
            getpageInfo(){
                let object ={};
                if(this.entrySubcontractNumber != null){
                    object = {
                        entrySubcontractNumber:this.entrySubcontractNumber
                    }
                }else{
                    object = {
                        projectCode:this.totalProjectNumber
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl+"/winnNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.unitsInfo = res.data.data;
                        if(res.data.data[0].items.length>0){
                            let arr =  [];
                            let newArr = [];
                            res.data.data[0].items.forEach(item=>{
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
                })
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
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            // 招标（采购）人确认函附件
            getOneList(){
                let object={}
                if(this.entrySubcontractNumber!=null){
                    // 分包
                    object={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'招标（采购）人确认附件'
                    }
                }else{
                    //  总包
                    object ={
                        relevanceCorrelationId:this.totalItemId,
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
            // 中标通知书
            getTwoList(){
                let object={}
                if(this.entrySubcontractNumber!=null){
                    // 入场项目分包编号
                    object={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'中标通知书'
                    }
                }else{
                    // 入场项目编号
                    object ={
                        relevanceCorrelationId:this.totalItemId,
                        fileType:'中标通知书'
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
                        this.$message.warning(res.data.msg)
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
</style>