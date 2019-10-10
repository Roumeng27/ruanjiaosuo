<template>
    <!-- 电子档案 -->
    <div class="newBox">
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
                        <!-- 项目注册 -->
                        <el-collapse-item title="项目注册" name="1">
                            <el-table :data="registrantionData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购项目 -->
                        <el-collapse-item title="采购项目" name="2">
                            <el-table :data="biddingData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购公告 -->
                        <el-collapse-item title="采购公告" name="3">
                            <el-table :data="tenderNoticeData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购文件 -->
                        <el-collapse-item title="采购文件" name="4">
                            <el-table :data="documentsData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 成交结果公告 -->
                        <el-collapse-item title="成交结果公告" name="5">
                            <el-table :data="winningResultData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购控制价文件 -->
                        <el-collapse-item title="采购控制价文件" name="6">
                            <el-table :data="controlData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购人代表 -->
                        <el-collapse-item title="采购人代表" name="7">
                            <el-table :data="bidderJudgeData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 合同备案 -->
                        <el-collapse-item title="合同备案" name="8">
                            <el-table :data="recordlBidData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购异常 -->
                        <el-collapse-item title="采购异常" name="9">
                            <el-table :data="abnormalBidData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 需说明的事项 -->
                        <el-collapse-item title="需说明的事项" name="10">
                            <div>
                                <span>{{itemsClarified}}</span>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="11">
                            <el-table :data="relatedData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 办理记录 -->
						<el-collapse-item title="办理记录" name="12">
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
        <el-dialog title="请输入意见" :visible.sync="agreeFlag" width="50%" :before-close="agreeSure">
            <div class="box">
                <button class="btn" @click="agreeSubmit">确认提交</button>
                <button class="btn" @click="agreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="infoRemark" :rows="6" ></el-input>
            </div>
        </el-dialog>
        <el-dialog title="请输入意见" :visible.sync="disAgreeFlag" width="50%" :before-close="disAgreeSure">
            <div class="box">
                <button class="btn" @click="disAgreeBack">确认退回</button>
                <button class="btn" @click="disAgreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="infoRemark" :rows="6" ></el-input>
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
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6','7','8','9','10','11','12'],
                // 文件查询
                fileData:[],
                // 弹窗所需字段
                agreeFlag:false,// 同意
                disAgreeFlag:false,// 不同意
                infoRemark:'',// 备注
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
                qualificationExaminationMethod :'',
                biddingOrganization:'',// 招标组织方式
                typesOfBiddingProjects:'',// 招标项目类型
                 //项目注册
                registrantionData:[ 
                    {
                        id:2,
                        appendixName: "*委托代理协议",
                        attachlist: [],
                        state:'委托代理协议'
                    },
                    {
                        id:3,
                        appendixName: "*立项批复文件",
                        attachlist: []
                    },
                    {
                        id:4,
                        appendixName: "项目负责人授权书",
                        attachlist: []
                    },
                ],
                //招标项目
                biddingData:[
                    {
                        id:5,
                        appendixName: "采购项目相关附件",
                        attachlist: []
                    },
                ],
                //招标公告
                tenderNoticeData:[
                    {
                        id:6,
                        appendixName: "招标（采购）人确认函",
                        attachlist: []
                    },
                    {
                        id:7,
                        appendixName: "采购公告",
                        attachlist: [],
                        state:'采购(资审)公告'
                    },
                ],
                //招标文件
                documentsData:[
                    {
                        id:8,
                        appendixName: "招标(采购)文件",
                        attachlist: [],
                        state:'招标(采购)文件'
                    },
                    {
                        id:9,
                        appendixName: "图纸文件",
                        attachlist: []
                    },
                ],
                //中标结果公告
                winningResultData:[
                    {
                        id:10,
                        appendixName: "招标（采购）人确认函",
                        attachlist: []
                    },
                    {
                        id:11,
                        appendixName: "成交结果公告",
                        attachlist: [],
                        state:'成交结果公告'
                    },
                ],
                //相关附件
                relatedData:[
                    {
                        id:12,
                        appendixName: "评标委员会做出的评、定标报告",
                        attachlist: [],
                        state:'评标委员会做出的评、定标报告'
                    },
                    {
                        id:13,
                        appendixName: "工程量清标报告",
                        attachlist: [],
                        state:'工程量清标报告'
                    },
                    {
                        id:14,
                        appendixName: "评标专家的评审意见及汇总表",
                        attachlist: [],
                        state:'评标专家的评审意见及汇总表'
                    },
                    {
                        id:15,
                        appendixName: "中标人的投标文件",
                        attachlist: [],
                        state:'中标人的投标文件'
                    },
                    {
                        id:16,
                        appendixName: "业主评价意见",
                        attachlist: [],
                        state:'业主评价意见'
                    },
                ],
                //采购控制价文件
                controlData:[
                    {
                        id:17,
                        appendixName: "控制价相关文件",
                        attachlist: [],
                        state:'控制价相关文件'
                    }
                ],
                //采购人代表
                bidderJudgeData:[
                    {
                        id:18,
                        appendixName: "采购人代表相关证明",
                        attachlist: [],
                        state:'采购人代表相关证明'
                    }
                ],
                //招标异常
                abnormalBidData:[
                    {
                        id:19,
                        appendixName: "重新组织招标或重新组织投标的相关资料",
                        attachlist: [],
                        state:'重新组织招标或重新组织投标的相关资料'
                    }
                ],
                recordlBidData:[
                    {
                        id:20,
                        appendixName: "合同签署",
                        attachlist: [],
                        state:'合同签署'
                    }
                ],
                itemsClarified:'',// 需说明事项
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
            this.getpageInfo();// 初始化
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
                    eRecordId:this.referenceId,
                    answer:'同意'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/electronicFileController/approval',
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
                                remarks: this.infoRemark
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
                    eRecordId:this.referenceId,
                    answer:'不同意'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/electronicFileController/approval',
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
                                remarks: this.infoRemark
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
            // 初始化
            getpageInfo(){
                let manager = {};
                if(this.entrySubcontractNumber !=null){
                    manager = {
                        projectEntrySubcontractNumbers:[this.entrySubcontractNumber]
                    }
                }else{
                    manager = {
                        projectEntrySubcontractNumbers:[this.totalProjectNumber]
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/projectInformationController/selectByProjectEntrySubcontractNumber',
                    data:manager
                }).then(res=>{
                if(res.data.status == 200){
                    // 判断展示的电子档案界面
                    this.biddingProcurementMode = res.data.data[0].biddingProcurementMode;
                    this.qualificationExaminationMethod = res.data.data[0].qualificationExaminationMethod;
                    //委托代理协议
                    var obj1 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj1={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'委托代理协议'
                        }
                    }else{
                        // 入场项目编号
                        obj1 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'委托代理协议'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj1
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '委托代理协议'){
									this.registrantionData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //立项批复文件
                    var obj2 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj2={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'立项批复文件'
                        }
                    }else{
                        // 入场项目编号
                        obj2 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'立项批复文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj2
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '立项批复文件'){
									this.registrantionData[1].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //项目授权书
                    var obj3 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj3={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'项目负责人授权书'
                        }
                    }else{
                        // 入场项目编号
                        obj3 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'项目负责人授权书'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj3
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '项目负责人授权书'){
									this.registrantionData[2].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标项目附件
                    var obj4 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj4={
                            relevanceCorrelationId:this.subItemId,
							fileType:'采购项目相关附件'
                        }
                    }else{
                        // 入场项目编号
                        obj4 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'采购项目相关附件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj4
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '采购项目相关附件'){
									this.biddingData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标确认函
                    var obj5 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj5={
                            relevanceCorrelationId:this.subItemId,
							fileType:'招标（采购）人确认函'
                        }
                    }else{
                        // 入场项目编号
                        obj5 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'招标（采购）人确认函'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj5
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '招标（采购）人确认函'){
									this.tenderNoticeData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //采购公告
                    var obj6 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj6={
                            relevanceCorrelationId:this.subItemId,
							fileType:'采购公告'
                        }
                    }else{
                        // 入场项目编号
                        obj6 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'采购公告'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj6
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '采购公告'){
									this.tenderNoticeData[1].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标(采购)文件
                    var obj7 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj7={
                            relevanceCorrelationId:this.subItemId,
							fileType:'招标(采购)文件'
                        }
                    }else{
                        // 入场项目编号
                        obj7 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'招标(采购)文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj7
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '招标(采购)文件'){
									this.documentsData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //图纸文件
                    var obj8 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj8={
                            relevanceCorrelationId:this.subItemId,
							fileType:'图纸文件'
                        }
                    }else{
                        // 入场项目编号
                        obj8 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'图纸文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj8
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '图纸文件'){
									this.documentsData[1].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标（采购）人确认函
                    var obj9 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj9={
                            relevanceCorrelationId:this.subItemId,
							fileType:'招标（采购）人确认函'
                        }
                    }else{
                        // 入场项目编号
                        obj9 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'招标（采购）人确认函'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj9
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '招标（采购）人确认函'){
									this.winningResultData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //成交结果公告
                    var obj10 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj10={
                            relevanceCorrelationId:this.subItemId,
							fileType:'成交结果公告'
                        }
                    }else{
                        // 入场项目编号
                        obj10 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'成交结果公告'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj10
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '成交结果公告'){
									this.winningResultData[1].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //评标委员会做出的评、定标报告
                    var obj11 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj11={
                            relevanceCorrelationId:this.subItemId,
							fileType:'评标委员会做出的评、定标报告'
                        }
                    }else{
                        // 入场项目编号
                        obj11 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'评标委员会做出的评、定标报告'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj11
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '评标委员会做出的评、定标报告'){
									this.relatedData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //工程量清报告
                    var obj12 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj12={
                            relevanceCorrelationId:this.subItemId,
							fileType:'工程量清标报告'
                        }
                    }else{
                        // 入场项目编号
                        obj12 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'工程量清标报告'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj12
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '工程量清标报告'){
									this.relatedData[1].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //评标专家的评审意见及汇总表
                    var obj13 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj13={
                            relevanceCorrelationId:this.subItemId,
							fileType:'评标专家的评审意见及汇总表'
                        }
                    }else{
                        // 入场项目编号
                        obj13 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'评标专家的评审意见及汇总表'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj13
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '评标专家的评审意见及汇总表'){
									this.relatedData[2].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //中标人的投标文件
                    var obj14 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj14={
                            relevanceCorrelationId:this.subItemId,
							fileType:'中标人的投标文件'
                        }
                    }else{
                        // 入场项目编号
                        obj14 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'中标人的投标文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj14
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '中标人的投标文件'){
									this.relatedData[3].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //业主评价意见
                    var obj15 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj15={
                            relevanceCorrelationId:this.subItemId,
							fileType:'业主评价意见'
                        }
                    }else{
                        // 入场项目编号
                        obj15 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'业主评价意见'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj15
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '业主评价意见'){
									this.relatedData[4].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标控制价文件
                    var obj16 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj16={
                            relevanceCorrelationId:this.subItemId,
							fileType:'招标控制价文件'
                        }
                    }else{
                        // 入场项目编号
                        obj16 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'招标控制价文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj16
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '招标控制价文件'){
									this.controlData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //采购人代表相关证明
                    var obj17 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj17={
                            relevanceCorrelationId:this.subItemId,
							fileType:'采购人代表相关证明'
                        }
                    }else{
                        // 入场项目编号
                        obj17 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'采购人代表相关证明'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj17
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '采购人代表相关证明'){
									this.bidderJudgeData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标异常
                    var obj18 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj18={
                            relevanceCorrelationId:this.subItemId,
							fileType:'重新组织招标或重新组织投标的相关资料'
                        }
                    }else{
                        // 入场项目编号
                        obj18 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'重新组织招标或重新组织投标的相关资料'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj18
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '重新组织招标或重新组织投标的相关资料'){
									this.abnormalBidData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //合同签署
                    var obj19 = {};
                    if(this.entrySubcontractNumber !=null){
                        // 入场项目分包编号
                        obj19={
                            relevanceCorrelationId:this.subItemId,
							fileType:'合同签署'
                        }
                    }else{
                        // 入场项目编号
                        obj19 ={
                            relevanceCorrelationId:this.totalItemId,
							fileType:'合同签署'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj19
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '合同签署'){
									this.recordlBidData[0].attachlist = arr
								}
							})
						}else{
							this.$layer.msg(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })    
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
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
                        this.$layer.msg(res.data.msg)
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