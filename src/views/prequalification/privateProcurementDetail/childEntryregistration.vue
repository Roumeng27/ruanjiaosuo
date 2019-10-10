<template>
    <div class="pageWrap">
        <div v-show="passJudgeShow">
            <!-- 采购项目入场登记 -->
            <div class="box"></div>
            <el-collapse v-model="activeName" accordion>
                <!--立项基本信息 -->
                <el-collapse-item title="立项基本信息" name="1">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">批复项目名称：</div>
                                <div class="editContent">{{approvalProjectName}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">批复文号：</div>
                                <div class="editContent">{{approvalNumber}} </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">批复核准部门：</div>
                                <div class="editContent">{{approvalAndApprovalDepartment}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">监督部门：</div>
                                <div class="editContent">{{supervisionDepartment}} </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">审核部门：</div>
                                <div class="editContent">{{auditDepartment}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目所在地：</div>
                                <div class="editContent">{{projectLocation}} </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">是否为政府和社会资本合作PPP类项目：</div>
                                <div class="editContent"  style="padding-top:22px;">{{projectType}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">是否涉密：</div>
                                <div class="editContent">{{isItConfidential}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">资金来源：</div>
                                <div class="editContent">{{sourceOfFunds}} </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">项目资金总额：</div>
                                <div class="editContent">{{totalProjectFunds}}万元 </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">资金比例：</div>
                                <div class="editContent">
                                    <span class="guoyou"><span>国有资金：<span>{{stateOwnedFunds}}</span>万元,<span>{{stateOwnedFundsPercentage}}</span>%;</span></span>
                                    <span class="ziyou"><span>自有资金：<span>{{ownFunds}}</span>万元,<span>{{ownFundsPercentage}}</span>%;</span></span>
                                    <span class="waiguo"><span>外国政府及组织资金：<span>{{foreignGovernmentsAndOrganizationalFunds}}</span>万元,<span>{{foreignGovernmentsAndOrganizationalFundsPercentage}}</span>%;</span></span>
                                    <span class="jingwai"><span>境外人投资：<span>{{overseasPrivateInvestment}}</span>万元,<span>{{overseasPrivateInvestmentPercentage}}</span>%;</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 附件 -->
                <el-collapse-item title="附件" name="2" v-if="role_types == '招标(采购)人' && str_entrust_type == '委托角色'">
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column prop="appendixName" label="附件名称" width="150">
                        </el-table-column>
                        <el-table-column label="附件列表(点击查看)">
                            <template slot-scope="scope">
                                <li v-for='(item,index) in scope.row.attachlist' :key="index" @click="downLoadupFile(item)" class="liItem">
                                {{item.fileName}}
                                </li>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem != '办理通过' && this.stateItem != '待办理'">
                            <template slot-scope="scope">
                                <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row.id)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <el-collapse-item title="附件" name="2" v-else>
                    <el-table :data="AnnexData" stripe style="width: 100%">
                        <el-table-column prop="appendixName" label="附件名称" width="150">
                        </el-table-column>
                        <el-table-column label="附件列表(点击查看)">
                            <template slot-scope="scope">
                                <li v-for='(item,index) in scope.row.attachlist' :key="index" @click="downLoadupFile(item)" class="liItem">
                                {{item.fileName}}
                                </li>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem != '办理通过' && this.stateItem != '待办理'">
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
                                <div class="editContent">{{investmentProjectsUnifiedCode}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目法人：</div>
                                <div class="editContent">{{projectLegalPerson}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">项目法人代码：</div>
                                <div class="editContent">{{projectLegalPersonCode}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目行业分类：</div>
                                <div class="editContent">{{projectIndustryClassification}}</div>
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
                                <div class="editContent">{{contacts}}</div>
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
                            <div class="editCenter">
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
                                <div class="editContent">{{budgetRecipientUnit}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">预算受文单位代码：</div>
                                <div class="editContent">{{budgetRecipientUnitCode}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">预算金额：</div>
                                <div class="editContent">{{budgetAmount}}万元</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">采购人名称：</div>
                                <div class="editContent">{{tenderPurchaserName}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">采购人代码：</div>
                                <div class="editContent">{{purchaserCode}}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!--采购项目信息 -->
                <el-collapse-item title="采购项目信息" name="5">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目编号(赋码)：</div>
                                <div class="editContent">{{itemNumberAssignment}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">入场项目编号：</div>
                                <div class="editContent">{{totalProjectId}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">采购项目名称：</div>
                                <div class="editContent">{{nameOfTenderProject}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">采购项目编号：</div>
                                <div class="editContent">{{biddingProjectNumber}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">采购项目金额(万元)：</div>
                                <div class="editContent">{{amountOfBiddingProject}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标采购方式：</div>
                                <div class="editContent">{{biddingProcurementMode}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">招标(采购)组织方式：</div>
                                <div class="editContent">{{biddingOrganization}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">专业类别：</div>
                                <div class="editContent">{{professionalCategory}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">采购项目类型：</div>
                                <div class="editContent">{{typesOfBiddingProjects}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">是否公布预算：</div>
                                <div class="editContent">{{whetherAnnounceBudget}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">是否分包：</div>
                                <div class="editContent">{{isSubcontracting}}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 委托代理协议 -->
                <el-collapse-item title="委托代理协议" name="6" v-if="role_types == '招标(采购)代理'  || str_entrust_type != '委托角色'">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">委托代理协议名称：</div>
                                <div class="editContent">
                                    <span>{{agencyAgreementName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">招标(采购)人：</div>
                                <div class="editContent">
                                    <span>{{tenderPurchaserName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目负责人：</div>
                                <div class="editContent">
                                    <span>{{projectLeader}}</span>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">联系方式：</div>
                                <div class="editContent">
                                    <span>{{contactWay}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标(采购)代理机构：</div>
                                <div class="editContent">
                                    <span>{{biddingPurchasingAgencyName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目负责人：</div>
                                <div class="editContent">
                                    <span>{{projectManager}}</span>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">联系方式：</div>
                                <div class="editContent">
                                    <span>{{relationWay}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">委托代理服务期限：</div>
                                <div class="editContent">
                                    <span>{{servicePeriodOfAgencyStart}} -- {{servicePeriodOfAgencyEnd}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">委托代理金额(万元)：</div>
                                <div class="editContent">
                                    <span>{{authorizedAmount}}</span>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName" style="width:220px;">委托代理服务收费金额(万元)：</div>
                                <div class="editContent">
                                    <span>{{agencyAuthorizedAmount}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">委托代理协议权限：</div>
                                <div class="editContent">
                                    <span>{{stragencyAgreementAuthority}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">其他：</div>
                                <div class="editContent">
                                    <span>{{rest}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 办理记录 -->
                <el-collapse-item title="办理记录" name="6">
                    <el-table :data="manageDate" style="width: 100%">
                        <el-table-column prop="step" label="步骤"  width="180">
                        </el-table-column>
                        <el-table-column  prop="userName" label="办理人员" width="180">
                        </el-table-column>
                        <el-table-column prop="creationTime" label="时间">
                        </el-table-column>
                        <el-table-column prop="state" label="状态">
                        </el-table-column>
                        <el-table-column prop="remarks" label="备注">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    import baseUrl from '../../../api/api'
    import dayjs from "dayjs";
    export default {
        data(){
            return {
                str_entrust_type:window.sessionStorage.str_entrust_type,
                role_types:window.localStorage.role_types,
                agencyAgreementName:"",//委托代理协议名称
                tenderPurchaser:'',//招标采购人id
                tenderPurchaserName:'',//招标采购人名称
                projectLeader:'',//项目负责人
                contactWay:'',//联系方式
                biddingPurchasingAgency:window.localStorage.biddingPurchasingAgency,//招标采购代理机构id
                biddingPurchasingAgencyName:window.localStorage.biddingPurchasingAgencyName,//招标代理机构名称
                biddingPurchasingAgencyUserId:window.localStorage.biddingPurchasingAgencyUserId,//招标代理企业id
                projectManager:'',//项目负责人
                relationWay:'',//联系方式
                servicePeriodOfAgencyStart:'',//委托代理服务期限(开始)
                servicePeriodOfAgencyEnd:"",//委托代理服务期限(开始)
                serviceTime:[],//委托代理期限
                authorizedAmount:"",//委托代理金额
                agencyAuthorizedAmount:"",//委托代理服务收费金额
                agencyAgreementAuthority:[],//委托代理协议权限
                stragencyAgreementAuthority:'',
                jurisdictionData:[],//权限数据
                rest:"",//其他
                // 
                cancelShow:false,
                frameShow:false,
                passJudgeShow:true,//判断
                dialogVisible:false,//判断是否进行入场登记操作
                projectObj:JSON.parse(window.localStorage.projectObj),
                biddingType:window.localStorage.biddingType,
                activeName:['1','2','3','4','5','6','7'],
                currentPage:1,//当前页
                pagesize: 8, //每页条数
                pageTotal: 0, //总页数
                totalSize: 0, //总条数
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
                AnnexData:[
				{
					id:1,
					appendixName: "*立项批复文件",
					attachlist: []
				},
				{
					id:2,
					appendixName: "项目负责人授权书",
					attachlist: []
				},
				{
					id:3,
					appendixName: "*委托代理协议",
					attachlist: []
				},
			],
                approvalProjectName:'',//批复项目名称
                approvalNumber:'',//批复文号
                approvalAndApprovalDepartment:'',//批复核准部门
                supervisionDepartment:"",//监督部门
                auditDepartment:'',//审核部门
                projectLocation:'',//项目所在地
                approvalJurisdiction:'',//审批权限
                isItConfidential:'',//是否涉密
                engineeringProperties:'',//工程性质
                projectType:'',//是否为政府和社会资本类项目
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
                projectApprovalDocumentsName:'',//项目审批文件名称
                investmentProjectsUnifiedCode:'',//北京投资项目统一代码
                projectLegalPerson:'',//项目法人
                projectLegalPersonCode:'',//项目法人代码
                projectIndustryClassification:'',//项目行业分类
                projectScale:'',//项目规模
                projectEstablishmentTime:"",//项目建立时间
                contacts:'',//联系人
                contactInformation:'',//联系方式
                entryName:'',//项目名称
                budgetProjectApprovalRecordNumber:'',//预算项目批准备案文号
                budgetRecipientUnit:'',//预算受文单位
                budgetRecipientUnitCode:'',//预算受文单位代码
                budgetAmount:'',//预算金额
                tenderPurchaserName:'',//采购人名称
                purchaserCode:'',//采购人代码
                itemNumberAssignment:'',//项目编号赋码
                totalProjectId:'',//入场项目编号
                nameOfTenderProject:'',//招标项目名称
                biddingProjectNumber:'',//招标项目编号
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',//招标采购方式
                biddingOrganization:'',//招标组织方式
                professionalCategory:'',//专业类别
                typesOfBiddingProjects:'',//招标项目类型
                whetherAnnounceBudget:'',//是否公布预算
                isSubcontracting:'',//是否分包
                manageDate:[],//办理记录列表
                stateItem:'',// 后端返回的状态
            }
        },
        methods:{
            // 招标项目信息
            getbiddingInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.stateItem = res.data.data.state;
                        this.approvalProjectName = res.data.data.approvalProjectName,//批复项目名称
                        this.approvalNumber = res.data.data.approvalNumber,//批复项目编号
                        this.approvalAndApprovalDepartment = res.data.data.approvalAndApprovalDepartment,//批复核准部门
                        this.supervisionDepartment = res.data.data.supervisionDepartment,//监督部门
                        this.auditDepartment = res.data.data.auditDepartment;//审核部门
                        this.projectLocation = res.data.data.projectLocation;//项目所在地
                        this.approvalJurisdiction = res.data.data.approvalJurisdiction;//审批权限
                        this.isItConfidential = res.data.data.isItConfidential;//是否涉密
                        this.engineeringProperties = res.data.data.engineeringProperties;//工程性质
                        this.projectType = res.data.data.projectType;//项目类型
                        this.totalProjectFunds = res.data.data.totalProjectFunds;//项目资金总额
                        this.projectApprovalDocumentsName = res.data.data.projectApprovalDocumentsName;//项目审批文件名称
                        this.investmentProjectsUnifiedCode = res.data.data.investmentProjectsUnifiedCode;//北京投资项目统一代码
                        this.projectLegalPerson = res.data.data.projectLegalPerson;//项目法人
                        this.projectLegalPersonCode = res.data.data.projectLegalPersonCode;//项目法人代码
                        this.projectIndustryClassification = res.data.data.projectIndustryClassification;//项目行业分类
                        this.projectScale = res.data.data.projectScale;//项目规模
                        if(res.data.data.projectEstablishmentTime == null){
                            this.projectEstablishmentTime = ''
                        }else{
                            this.projectEstablishmentTime = dayjs(res.data.data.projectEstablishmentTime).format('YYYY-MM-DD')//项目建立时间
                        }
                        this.entryName = res.data.data.entryName;//项目名称
                        this.budgetProjectApprovalRecordNumber = res.data.data.budgetProjectApprovalRecordNumber;//预受项目批准备案文号
                        this.budgetRecipientUnit = res.data.data.budgetRecipientUnit;//预算受文单位
                        this.budgetRecipientUnitCode = res.data.data.budgetRecipientUnitCode;//预算受文单位代码
                        this.purchaserCode = res.data.data.purchaserCode;//采购人代码
                        this.professionalCategory = res.data.data.professionalCategory;//专业类别
                        this.whetherAnnounceBudget = res.data.data.whetherAnnounceBudget;//是否公布预算
                        this.isSubcontracting = res.data.data.isSubcontracting;//是否公布预算
                        this.itemNumberAssignment = res.data.data.itemNumberAssignment;//项目编号赋码
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                        this.totalProjectId = res.data.data.totalProjectId;//入场项目编号
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.tenderContents = res.data.data.tenderContents;// 招标内容
                        this.budgetAmount = res.data.data.budgetAmount;//招标项目预算金额
                        this.contactInformation = res.data.data.contactInformation//联系方式
                        this.contacts = res.data.data.contacts//联系人
                        this.subcontractingControlAmount = res.data.data.subcontractingControlAmount//分包控制金额
                        this.biddingOrganization = res.data.data.biddingOrganization,//招标组织方式
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode,//招标采购方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects,//招标项目类型
                        //7.24
                        this.agencyAgreementName = res.data.data.agencyAgreementName;//委托代理名称
                        this.tenderPurchaser = res.data.data.tenderPurchaser;
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;//招标代理人
                        this.projectLeader = res.data.data.projectLeader;//项目负责人
                        this.contactWay = res.data.data.contactWay;//联系方式
                        this.biddingPurchasingAgency = res.data.data.biddingPurchasingAgency;
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;//招标代理机构
                        this.biddingPurchasingAgencyUserId = res.data.data.biddingPurchasingAgencyUserId;
                        this.projectManager = res.data.data.projectManager;//项目负责人
                        this.relationWay = res.data.data.relationWay;//联系方式
                        this.authorizedAmount = res.data.data.authorizedAmount;//金额
                        this.agencyAuthorizedAmount = res.data.data.agencyAuthorizedAmount;//委托代理金额
                        
                        this.stragencyAgreementAuthority = res.data.data.agencyAgreementAuthority;//权限
                        this.rest = res.data.data.rest;//其他
                        if(res.data.data.servicePeriodOfAgencyStart == null){
                            this.servicePeriodOfAgencyStart = ""
                        }else{
                            this.servicePeriodOfAgencyStart = dayjs(res.data.data.servicePeriodOfAgencyStart).format('YYYY-MM-DD')
                        }
                        if(res.data.data.servicePeriodOfAgencyEnd == null){
                            this.servicePeriodOfAgencyEnd = ""
                        }else{
                            this.servicePeriodOfAgencyEnd = dayjs(res.data.data.servicePeriodOfAgencyEnd).format('YYYY-MM-DD')
                        }
                        this.sourceOfFunds =res.data.data.sourceOfFunds//资金来源
                        if(res.data.data.stateOwnedFunds != null){//国有资金
                            this.stateOwnedFunds = res.data.data.stateOwnedFunds;
                            this.stateOwnedFundsPercentage = res.data.data.stateOwnedFundsPercentage;
                        }else{
                            $('.guoyou').hide();
                        };
                        if(res.data.data.ownFunds != null){//自有资金
                            this.ownFunds = res.data.data.ownFunds;
                            this.ownFundsPercentage = res.data.data.ownFundsPercentage;
                        }else{
                            $('.ziyou').hide();
                        };
                        if(res.data.data.foreignGovernmentsAndOrganizationalFunds != null){//外国政府及组织
                            this.foreignGovernmentsAndOrganizationalFunds = res.data.data.foreignGovernmentsAndOrganizationalFunds;
                            this.foreignGovernmentsAndOrganizationalFundsPercentage = res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage;
                        }else{
                            $('.waiguo').hide();
                        };
                        if(res.data.data.overseasPrivateInvestment != null){//境外投资
                            this.overseasPrivateInvestment = res.data.data.overseasPrivateInvestment;
                            this.overseasPrivateInvestmentPercentage= res.data.data.overseasPrivateInvestmentPercentage;
                        }else{
                            $('.jingwai').hide();
                        }
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            
            handleClose(){
                this.dialogVisible = false;
                this.frameShow = false;
                this.cancelShow = false;
            },
            //附件
            getFileList(){
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/projectInformationController/selectByProjectEntrySubcontractNumber',
                    data:{
                        projectEntrySubcontractNumbers:[this.projectObj.totalProjectId]
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.projectInformaPrimaryKeyId = res.data.data[0].projectInformaPrimaryKeyId;
                        var object={
                                relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                                fileType:'立项批复文件'
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
                                });
                                this.fileData.map((item,index)=>{
                                    this.enclosureData[0].attachlist = arr;
                                    this.AnnexData[0].attachlist = arr;
                                })
                            }else{
                                this.$layer.msg(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                        var obj = {
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                            fileType:'项目负责人授权书'
                        };
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
                                });
                                this.fileData.map((item,index)=>{
                                    this.enclosureData[1].attachlist = arr
                                    this.AnnexData[1].attachlist = arr;
                                })
                            }else{
                                this.$layer.msg(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                        var object={
                                relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                                fileType:'委托代理协议'
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
                                });
                                this.fileData.map((item,index)=>{
                                    this.AnnexData[2].attachlist = arr;
                                })
                            }else{
                                this.$layer.msg(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //办理记录查询
            getmanageInfo(){
                let object={
                        projectId:this.projectObj.projectInformaPrimaryKeyId,
                        relatedId:this.projectObj.projectInformaPrimaryKeyId
                    }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/historyController/selectRegistrationList',
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
        },
        created(){
            this.getbiddingInfo();
            this.getmanageInfo();
            this.getFileList();
        }
    }
</script>

<style scoped>
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
.el-collapse{
    width: 90%;
    margin: 10px auto;
}
.contentBox{
    display: flex;
    flex-direction: column;
    padding: 0 30px;
}
.contentBox li{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
}
.contentBox li p{
    color: #333;
}
.contentBox li span{
    color:#6e622e;
}
.contentLast{
    display: flex;
    padding: 0 30px;
    line-height: 30px;
}
.last_box{
    flex: 1;
}
.last_content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.money{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h6,b{
    color:red;
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
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
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