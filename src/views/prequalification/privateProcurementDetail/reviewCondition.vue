<template>
    <div class="newBox">
        <!-- 评审情况 -->
        <div class="wrapper" v-show="writeFlag">
            <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="评审消息" name="first">
                    <div class="page">
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
                                                <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-collapse-item>
                            <!--评审消息 -->
                            <el-collapse-item title="评审消息" name="2">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评审开始时间：</div>
                                            <div class="editContent">{{startTime}} </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评审结束时间：</div>
                                            <div class="editContent">{{endTime}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评审地点：</div>
                                            <div class="editContent">{{address}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评审方式：</div>
                                            <div class="editContent">{{method}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评审情况：</div>
                                            <div class="editContent">{{situation}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                   </div>
                </el-tab-pane>
                <el-tab-pane label="评审结果" name="second">
                    <div class="page">
                        <el-collapse v-model="activeName" accordion>
                            <!--评审结果 -->
                            <el-collapse-item title="评审结果" name="1"> 
                                <el-table
                                        ref="multipleTable"
                                        :data="totalData"
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
                                        prop="offer"
                                        label="投标报价(元/%)">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="quotationMethod"
                                        label="报价方式">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="economic"
                                        label="经济标">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="technology"
                                        label="技术标">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="business"
                                        label="商务标">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="otherPoints"
                                        label="其他分">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="totalScore"
                                        label="汇总分">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="ranking"
                                        label="排名">
                                    </el-table-column>
                                    <el-table-column
                                        label="操作">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="editInfo(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">推荐排名第一单位：</div>
                                            <div class="editContent">{{recommendFirst}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">推荐排名第二单位：</div>
                                            <div class="editContent">{{recommendSecond}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">推荐排名第三单位：</div>
                                            <div class="editContent">{{recommendThird}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!--无效标信息 -->
                            <el-collapse-item title="无效标信息" name="2">
                                <el-table
                                        ref="multipleTable"
                                        :data="invalidData"
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
                                        prop="noEffectReason"
                                        label="原因">
                                    </el-table-column>
                                    <el-table-column
                                        label="进入">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search" @click="enterInto(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 分包信息详情 -->
		<div class="winWrapper" v-show="lookFlag">
            <div class="winBox">
               	<div class="win_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
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
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{tenderPurchaserName}}</div>
                                </div>
                                <div class="editCenter" v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                    <div class="editName">招标(采购)代理机构：</div>
                                    <div class="editContent">{{biddingPurchasingAgencyName}} </div>
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
                                    <div class="editContent">{{subcontractingControlAmount}}<span style="color:#000;">万元</span></div>
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
        <!-- 修改评审情况 -->
        <div class="editWrapper" v-show="editFlag">
             <div class="editBox">
               	<div class="edit_title">
                    <p>修改评审情况</p>
                    <i class="el-icon-close" @click="closeEdit"></i>
                </div>
                <!-- <div class="box">
                    <button class="btn" @click="editSave">修改保存</button>
                </div> -->
				<el-collapse v-model="activeName" accordion>
					<!-- 单位信息 -->
					<el-collapse-item title="单位信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">单位名称：</div>
                                    <div class="editContent">{{companyName}} </div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
					 <!-- 评审信息-->
					<el-collapse-item title="评审信息" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">经济标：</div>
                                    <div class="editContent">{{economic}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">技术标：</div>
                                    <div class="editContent">{{technology}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">商务标：</div>
                                    <div class="editContent">{{business}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">其他分：</div>
                                    <div class="editContent">{{otherPoints}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">汇总分：</div>
                                    <div class="editContent">{{totalScore}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">排名：</div>
                                    <div class="editContent">{{ranking}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">是否判定无效：</div>
                                    <div class="editContent">{{isEffective}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">是否放弃中标：</div>
                                    <div class="editContent">{{abandoningWinningBid}} </div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 无效标 -->
        <div class="invalidWrapper" v-show="invalidFlag">
            <div class="invalidBox">
               	<div class="invalid_title">
                    <p>无效标</p>
                    <i class="el-icon-close" @click="closeInvalid"></i>
                </div>
                <div class="main_info">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">单位名称：</div>
                                <div class="editContent">{{companyName}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">投标价格：</div>
                                <div class="editContent">{{offer}}元 </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">无效标节点：</div>
                                <div class="editContent">{{noEffectNode}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">无效标原因：</div>
                                <div class="editContent">{{noEffectReason}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评审结束 -->
        <el-dialog
            title="信息确认"
            :visible.sync="endingBox"
            width="30%"
            :before-close="endingSure">
            <div class="icon">
                <i class="el-icon-question"></i>
                <span>您确认评审结束吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="endingSure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 评审结束 -->
        <el-dialog
            title="执行成功"
            :visible.sync="saveBox"
            width="30%"
            :before-close="saveSure">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>保存成功!</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    import baseUrl from '../../../api/api'
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    import {formatDate,changeTime} from '../../../api/base.js'
    import dayjs from 'dayjs'
    export default {
        data(){
            return {
                str_entrust_type:window.sessionStorage.str_entrust_type,
                role_types:window.localStorage.role_types,
                biddingPurchasingAgencyName:'',
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:['1','2','3','4','5','6'],
                activeName2: 'first',
                writeFlag:true,// 总包输入 列表
                breakBagFlag:false,// 采购项目信息 下分包展示
                subpackageData:[],
                // 采购项目信息所需字段
                nameOfTenderProject:'',// 采购项目名称
                biddingProjectNumber:'',// 采购项目编号
                tenderPurchaserName:'',// 采购(采购)人
                budgetAmount:'',// 采购项目预算金额
                amountOfBiddingProject:'',//采购项目金额
                biddingProcurementMode:'',// 采购采购方式
                biddingOrganization:'',// 采购组织方式
                typesOfBiddingProjects:'',// 采购项目类型
                amountId:'',// 总包
                entrySubcontractNumber:'',// 入场项目编号 分包
                projectCode:'',//入场项目编号 总包
                // 让input框只读
                readonly: true,
                time:'',
                name:'',
                region:'',// 下拉框
                // 中标信息详情
                lookFlag:false,
                scopeOfTender:'',// 采购范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                totalProjectId:'',
                // 评审结束
                endingBox:false,
                // 评审信息 
                saveBox:false,// 保存
                //评审消息所需字段
                startTime:'',// 评审开始时间
                endTime:'',// 评审结束时间
                address:'',// 评审地点
                method:'',// 评审方式
                situation:'',// 评审情况
                isEnd:'',// 是否评审结束
                recommendFirst:'',// 推荐排名第一
                recommendSecond:'',// 推荐排名第二
                recommendThird:'',// 推荐排名第三
                // 评审结果
                totalData:[],
                validData:[],// 有效标
                invalidData:[],// 无效标
                // 修改评审情况所需字段
                editFlag:false,// 弹窗
                companyName:'',//单位名称
                economic:'',// 经济标
                technology:'',// 技术标
                business:'',// 商务标
                otherPoints:'',// 其他分
                totalScore:'',// 汇总分
                ranking:'',// 排名
                isEffective:false,// 是否判定无效
                abandoningWinningBid:false,// 是否放弃中标
                invalidFlag:false,// 无效标弹窗
                noEffectReason:'',// 无效原因
                offer:'',// 报价
                noEffectNode:'',// 无效标节点
                
            }
        },
        created(){
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                // 分包
                this.entrySubcontractNumber = this.projectObj.totalProjectId;
                this.breakBagFlag = true;
                this.getItemInfo();// 根据项目入场分包编号查询
            }else{
                // 总包
                this.projectCode = this.projectObj.totalProjectId;
                this.breakBagFlag = false;
            }
            this.getbiddingInfo();// 采购项目信息
            this.getInitInfo();// 初始化查询
            this.getvalidInfo();// 评审结果 有效标
                        
        },
		methods:{
            // tab 切换
            handleClick(tab, event) {
                if(tab.name == 'second'){
                    this.getDataInfo();// 评审结果 有效标 总
                    this.getvalidInfo();// 评审结果 有效标
                    this.getselectInfo();// 下拉框数据展示
                    this.getinvalidInfo();// 评审结果 无效标
                }else{
                    this.getselectInfo();// 下拉框数据
                }
            },
            // 查看分包详情
            lookoverItem(row){
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称 
                this.subcontractContents = row.subcontractContents;// 分包内容
                this.scopeOfTender = row.scopeOfTender;// 采购范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
                this.lookFlag = true;
            },
            // 关闭查看详情
            closeLook(){
                this.lookFlag = false
            },
            // 评审结果 有效标 总
            getDataInfo(){
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
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/selectListForBid",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.totalData = res.data.data;
                        this.getselectInfo();
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            cancel(){
                this.endingBox = false;
                this.isEnd = false;
            },
            // 评审结束 ---> 弹窗关闭
            endingSure(){
                this.endingBox = false;
                this.isEnd = true;
            },
            // 修改评审情况 
            editInfo(row){
                this.bidInforId = row.bidInforId;// 投标信息ID
                this.companyName = row.companyName;// 单位名称
                this.economic= row.economic;// 经济标
                this.technology= row.technology;// 技术标
                this.business= row.business;// 商务标
                this.otherPoints= row.otherPoints;// 其他分
                this.totalScore= row.totalScore;// 汇总分
                this.ranking= row.ranking;// 排名
                // 是否判定无效
                if(row.isEffective == '1'){
                    this.isEffective ='否';
                }else{
                    this.isEffective ='是';
                }
                // 是否放弃中标
                if(row.abandoningWinningBid == '1'){
                    this.abandoningWinningBid ='否';
                }else{
                    this.abandoningWinningBid ='是';
                }
                this.editFlag = true;
            },
            closeEdit(){
                this.editFlag = false;
            },
            // 评审信息 ---> 保存弹窗关闭
            saveSure(){
                this.saveBox = false;
            },
            // 评审情况 无效标 进入
            enterInto(row){
                this.bidInforId = row.bidInforId;// 投标信息ID
                this.noEffectReason = row.noEffectReason;
                this.companyName = row.companyName;
                this.offer = row.offer;
                this.noEffectNode = row.noEffectNode;// 无效标节点
                this.invalidFlag = true;
            },
            // 关闭无效标
            closeInvalid(){
                this.invalidFlag = false;
            },
            // 采购项目信息
            getbiddingInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 采购项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 采购项目编号
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 采购项目金额
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 采购采购方式
                        this.biddingOrganization = res.data.data.biddingOrganization;// 采购组织方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 采购项目类型
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 采购(采购)人
                        this.budgetAmount = res.data.data.budgetAmount;// 采购项目预算金额 
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
                        if(this.subpackageData.length>0){
                            this.subpackageData.forEach(item=>{
                                return item.entrySubcontractNumber,item.qualificationExaminationMethod
                            })
                        }
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 评审结果 无效标
            getinvalidInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        isEffective:0
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        isEffective:0
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/selectListForBid",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.invalidData = res.data.data
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 修改评审保存
            editSave(){
                if(this.isEffective == true){
                    this.isEffective='1'
                }else{
                    this.isEffective='0'
                }
                if(this.abandoningWinningBid == true){
                    this.abandoningWinningBid='1'
                }else{
                    this.abandoningWinningBid='0'
                }
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        bidInforId:this.bidInforId,
                        companyName:this.companyName,
                        economic:this.economic,
                        technology:this.technology,
                        business:this.business,
                        otherPoints:this.otherPoints,
                        totalScore:this.totalScore,
                        ranking:this.ranking,
                        isEffective:this.isEffective,
                        abandoningWinningBid:this.abandoningWinningBid,
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        bidInforId:this.bidInforId,
                        companyName:this.companyName,
                        economic:this.economic,
                        technology:this.technology,
                        business:this.business,
                        otherPoints:this.otherPoints,
                        totalScore:this.totalScore,
                        ranking:this.ranking,
                        isEffective:this.isEffective,
                        abandoningWinningBid:this.abandoningWinningBid,
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/update",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.editFlag = false;
                        this.getvalidInfo();// 有效标列表
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 评审结果 有效标
            getvalidInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        isEffective:1
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        isEffective:1
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/selectListForBid",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.validData = res.data.data;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 下拉框数据
            getselectInfo(){
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
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/selectByProjectCode",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.totalData.forEach(item=>{
                            if(item.bidInforId == res.data.data.recommendFirst){
                                this.recommendFirst = item.companyName;
                            }else if(item.bidInforId == res.data.data.recommendSecond ){
                                this.recommendSecond = item.companyName;
                            }else if(item.bidInforId == res.data.data.recommendThird){
                                this.recommendThird =  item.companyName;
                            }else{
                                
                            }
                        })
                        this.address = res.data.data.address;// 评审地点
                        if(res.data.data.startTime == 0 || res.data.data.startTime == null){
                            this.startTime = ""
                        }else{
                            this.startTime = dayjs(res.data.data.startTime).format('YYYY-MM-DD HH:mm:ss');// 评标开始时间
                        };
                        if(res.data.data.endTime == 0 || res.data.data.endTime == null){
                            this.endTime = ""
                        }else{
                            this.endTime = dayjs(res.data.data.endTime).format('YYYY-MM-DD HH:mm:ss');// 评标开始时间
                        };
                        this.situation = res.data.data.situation;// 评审情况
                        this.method = res.data.data.method;// 评审方式
                        
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            
            // 无效标确定按钮
            invalidSure(){
                this.invalidFlag = false;
            },
            // 无效标取消按钮
            invalidCancel(){
                this.invalidFlag = false;
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
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/selectByProjectCode",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.address = res.data.data.address;// 评审地点
                        if(res.data.data.startTime == 0 || res.data.data.startTime == null){
                            this.startTime = ""
                        }else{
                            this.startTime = dayjs(res.data.data.startTime).format('YYYY-MM-DD HH:mm:ss');// 评标开始时间
                        };
                        if(res.data.data.endTime == 0 || res.data.data.endTime == null){
                            this.endTime = ""
                        }else{
                            this.endTime = dayjs(res.data.data.endTime).format('YYYY-MM-DD HH:mm:ss');// 评标开始时间
                        };
                        this.method= res.data.data.method;// 评审方式
                        this.situation= res.data.data.situation;// 评审情况
                    }else{
                        this.$message.warning(res.data.msg);
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
    background: #fff;
    position: relative;
}
.wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.winWrapper,.editWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
}
.invalidWrapper{
     width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:200px;
}
.winBox,.editBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.invalidBox{
    width:  87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
}
.win_title,.edit_title,.invalid_title{
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
    height: 40px;
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
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success{
    font-size: 100px;
    color: #0a5e9d;
}
.el-icon-question{
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
.main_info{
    width: 80%;
    height: 100%;
    margin: 0 auto;
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
</style>