<template>
    <!-- 变更采购公示 -->
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
                        <!-- 采购项目信息 -->
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
                                <div class="table_box"  v-if="this.entrySubcontractNumber != null">
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
                                                <i class="el-icon-search"  style="cursor: pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">地址：</div>
                                        <div class="editContent">
                                            <span>{{tendereeAddress}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">
                                            <span>{{tendereePhone}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div  v-if="biddingOrganization == '委托招标'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">地址：</div>
                                            <div class="editContent">
                                                <span>{{agentAddress}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">联系方式：</div>
                                            <div class="editContent">
                                                <span>{{agentPhone}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 附件 -->
                        <el-collapse-item title="附件" name="2">
                            <div class="edit_list">
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
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 公告信息 -->
                        <el-collapse-item title="公告信息" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">公示名称：</div>
                                        <div class="editContent">
                                            <span>{{noticeName}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">变更日期：</div>
                                        <div class="editContent">
                                            <span>{{changesDate}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">变更理由：</div>
                                        <div class="editContent">
                                            <span>{{changeReason}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">变更事项：</div>
                                        <div class="editContent">
                                            <span>{{changesAs}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 是否变更投标事宜 -->
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">是否变更投标事宜：</div>
                                        <div class="editContent">   
                                            <span>{{isChangeBidMatters}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 当投标事宜为是的时候 -->
                                <div  v-show="isTenderShow">
                                     <div class="editItem">
                                        <div class="editCenter">
                                        <div class="editName">公示期限：</div>
                                            <div class="editContent">{{enrollStartTime}} 至 {{enrollEndTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">公示说明：</div>
                                            <div class="editContent">{{announcementThat}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">主管部门全称：</div>
                                            <div class="editContent">{{competentDepartmentName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">主管部门地址：</div>
                                            <div class="editContent">{{competentDepartmentAddress}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">主管部门负责人：</div>
                                            <div class="editContent">{{responsiblePerson}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">主管部门联系方式：</div>
                                            <div class="editContent">{{competentDepartmePhone}}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 是否为开标事宜 -->
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">是否变更开标事宜：</div>
                                        <div class="editContent">
                                            <span>{{isChangeBidOpenMatters}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 当开标事宜为是的时候出现 -->
                                <div v-show="OpenTenderShow">
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">递交投标文件地点：</div>
                                            <div class="editContent">
                                                <span>{{submissionDocumentsPlace}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标时间：</div>
                                            <div class="editContent">{{assessmentTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">开标地点：</div>
                                            <div class="editContent">
                                                <span>{{bidOpeningPlace}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标室：</div>
                                            <div class="editContent">{{openingRoom}}</div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">是否预约评标室：</div>
                                            <div class="editContent">{{appointmentEvaluationRoom}}</div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem" v-show="isService">
                                        <div class="editTextarea">
                                            <div class="editName">配套服务：</div>
                                            <div class="editContent">{{supportingServices}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem" v-show="isPlace">
                                        <div class="editCenter">
                                            <div class="editName">评标地点：</div>
                                            <div class="editContent">{{bidEvaluationSite}}</div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">评标办法和标准：</div>
                                            <div class="editContent">
                                                <span>{{bidEvaluationStandard}}</span>
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
                                                <span>{{projectLeaderPhone}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">备注：</div>
                                            <div class="editContent">
                                                <span>{{remark}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公告内容 -->
                        <el-collapse-item title="公告内容" name="4">
                            <div class="edit_list">
                                <div class="fail_box">
                                    <div>{{noticeName}}</div>
                                    <div>变更采购公示</div>
                                    <div style="font-size:14px;font-weight:normal;color:#333;">{{saveTime}}</div>
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
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">资金来源：</div>
                                        <div class="editContent">{{sourceOfFunds}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">资金构成：</div>
                                        <div class="editContent">
                                            <span v-if="stateOwnedFunds != null">国有资金{{stateOwnedFunds}}万元{{stateOwnedFundsPercentage}}%</span>
                                            <span v-if="ownFunds != null">自有资金{{ownFunds}}万元{{ownFundsPercentage}}%</span>
                                            <span v-if="foreignGovernmentsAndOrganizationalFunds != null">外国政府及组织资金{{foreignGovernmentsAndOrganizationalFunds}}万元{{foreignGovernmentsAndOrganizationalFundsPercentage}}%</span>
                                            <span v-if="overseasPrivateInvestment != null">境外私人投资{{overseasPrivateInvestment}}万元{{overseasPrivateInvestmentPercentage}}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)人</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人全称：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人地址：</div>
                                        <div class="editContent">{{tendereeAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人联系方式：</div>
                                        <div class="editContent">{{tendereePhone}}</div>
                                    </div>
                                </div>
                                <div v-if="biddingOrganization == '委托招标'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                            <div class="editContent"></div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"  style="width:160px;">招标(采购)代理机构全称：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"  style="width:160px;">招标(采购)代理机构地址：</div>
                                            <div class="editContent">{{agentAddress}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:180px;">招标(采购)代理机构联系方式：</div>
                                            <div class="editContent">{{agentPhone}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">本次变更内容</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">变更日期：</div>
                                        <div class="editContent">{{changesDate}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" >变更理由：</div>
                                        <div class="editContent">{{changeReason}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">变更事项：</div>
                                        <div class="editContent">{{changesAs}}</div>
                                    </div>
                                </div>
                                <div v-show="isTenderShow">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="font-weight:bold;">采购文件领取变更事宜</div>
                                            <div class="editContent"></div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                        <div class="editName">公示期限：</div>
                                            <div class="editContent">{{enrollStartTime}} 至 {{enrollEndTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">公示说明：</div>
                                            <div class="editContent">{{announcementThat}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">主管部门全称：</div>
                                            <div class="editContent">{{competentDepartmentName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">主管部门地址：</div>
                                            <div class="editContent">{{competentDepartmentAddress}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">主管部门负责人：</div>
                                            <div class="editContent">{{responsiblePerson}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">主管部门联系方式：</div>
                                            <div class="editContent">{{competentDepartmePhone}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="OpenTenderShow">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="font-weight:bold;">投标文件递交变更事宜</div>
                                            <div class="editContent"></div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">递交投标文件截止时间：</div>
                                            <div class="editContent">{{assessmentTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">递交投标文件地点：</div>
                                            <div class="editContent">
                                                <span>{{submissionDocumentsPlace}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标时间：</div>
                                            <div class="editContent">{{assessmentTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标地点：</div>
                                            <div class="editContent">
                                                <span>{{bidOpeningPlace}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标室：</div>
                                            <div class="editContent">{{openingRoom}}</div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">是否预约评标室：</div>
                                            <div class="editContent">{{appointmentEvaluationRoom}}</div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem" v-show="isService">
                                        <div class="editTextarea">
                                            <div class="editName">配套服务：</div>
                                            <div class="editContent">{{supportingServices}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem" v-show="isPlace">
                                        <div class="editCenter">
                                            <div class="editName">评标地点：</div>
                                            <div class="editContent">{{bidEvaluationSite}}</div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标方法和标准：</div>
                                            <div class="editContent">
                                                <span>{{bidEvaluationStandard}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">项目联系人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">备注：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                                <div style="font-weight:bold;text-align:right;width:100%;">
                                    <div>{{creatorCompanyName}}</div>
                                    <div>{{saveTime}}</div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="5">
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
        <!-- 查看分包详情 -->
        <div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                    <div class="editCenter" v-if="biddingOrganization == '委托招标'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectNumber}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
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
                biddingOrganization:'',
                agentAddress :'',
                agentPhone :'',
                biddingPurchasingAgencyName:'',
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6'],
                // 文件查询
                fileData:[],
                enclosureData:[{
                    appendixName:"变更附件",
                    attachlist: []
                }],//附件数据
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
                biddingOrganization:'',// 招标组织方式
                typesOfBiddingProjects:'',// 招标项目类型
                sourceOfFunds:'',//资金来源
                stateOwnedFunds:'',//国有资金
                stateOwnedFundsPercentage:"",//国有资金百分比
                ownFunds:'',//自有资金
                ownFundsPercentage:'',//自有资金百分比
                foreignGovernmentsAndOrganizationalFunds:'',//外国政府资金
                foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国资金百分比
                overseasPrivateInvestment:'',//境外人投资
                overseasPrivateInvestmentPercentage:'',//境外人投资百分比
                // 公示内容所需字段
                noticeName:'',// 公示名称
                collectTime:[],// 公示期限
                announcementThat:'',// 公示说明
                competentDepartmentName:'',// 主管部门全称
                competentDepartmentAddress:'',// 主管部门地址
                responsiblePerson:'',// 主管部门负责人
                competentDepartmePhone:'',// 主管部门联系方式
                // 场地预约所需字段
                assessmentTime:'',// 开标时间
                estimatedReviewDuration:'',// 开标时长
                openingRoom:'',// 开标室
                appointmentEvaluationRoom:'',// 是否预约评标室
                isService:false,// 控制配套服务展示隐藏
                supportingServices:[],// 配套服务
                isPlace:false,// 控制评标地点展示隐藏
                bidEvaluationSite:'',// 评标地点
                bidEvaluationTime:'',// 评标时间
                lengthOfTenderEvaluation:'',// 评标时长
                bidEvaluationRoom:'',//  评标室
                // 主管部门所需字段  
                enrollStartTime:'',// 公示开始时间
                enrollEndTime:'',// 公示结束时间
                saleStartTime:[],// 上午发售时间
                saleEndTime:[],// 下午发售时间
                submissionDocumentsPlace:'',//递交投标文件地点
                bidOpeningPlace:'',//开标地点
                bidEvaluationStandard:'',//评标办法和标准
                projectLeader:'',//项目负责人
                projectLeaderPhone:"",//联系方式
                remark:'',//备注
                saveTime:'',// 保存时间
                creatorCompanyName:'',// 创建用户
                // 变更所需字段
                changesDate:'',// 变更日期
                changeReason:'',// 变更理由
                changesAs:'',// 变更事项
                isChangeBidMatters:'',// 是否变更投标事宜
                isTenderShow:false,// 当投标事宜为是的时候出现
                isChangeBidOpenMatters:'',// 是否变更开标事宜
                OpenTenderShow:false,// 当开标事宜为是的时候出现
                tendereePhone:'',// 联系方式
                tendereeAddress:'',// 地址
                // 分包所需字段
                subpackageData:[],
                lookFlag:false,
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                scopeOfTender:'',// 采购范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'是',// 是否电子招投标
                tenderNoticeId:'',// 公示ID
                
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
            this.getmanageInfo();// 办理记录
            if(this.entrySubcontractNumber != null){
                this.getItemInfo();// 分包信息
            }
            this.uploadList();// 附件列表查询
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
                let object = {}
                if(this.entrySubcontractNumber != null){
                    object = {
                        state: "办理通过",
                        tenderNoticeId: this.referenceId,
                        entrySubcontractNumber:this.entrySubcontractNumber
                    }
                }else{
                    object = {
                        state: "办理通过",
                        tenderNoticeId: this.referenceId,
                        projectCode:this.totalProjectNumber
                    }
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/tenderNoticeController/submitChange',
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
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
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
                    state: "办理未通过",
                    tenderNoticeId: this.referenceId
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/tenderNoticeController/submitChange',
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
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                })
            },
            // 不同意的关闭按钮
            disAgreeSure(){
                this.disAgreeFlag = false;
            },
            // 通过关联ID查询入场项目编号
            getpageInfo(){
                let object = {};
                if(this.entrySubcontractNumber!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.entrySubcontractNumber
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectNumber
                    }
                }
                return this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/selectChange",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        res.data.data.forEach(item=>{
                            this.tenderNoticeId = item.tenderNoticeId;// 公告id
                            this.sourceNoticeId = item.sourceNoticeId;
                            this.agentAddress = item.agentAddress;
                            this.agentPhone = item.agentPhone;
                            this.tendereeAddress = item.tendereeAddress;// 地址
                            this.tendereePhone = item.tendereePhone;// 联系方式
                            this.noticeName = item.noticeName;// 公示名称
                            this.changeReason = item.changeReason;// 变更理由
                            this.changesAs = item.changesAs;// 变更事项
                            this.isChangeBidMatters = item.isChangeBidMatters;// 是否变更投标事宜
                            this.isChangeBidOpenMatters = item.isChangeBidOpenMatters;// 是否变更开标事宜
                            if(this.isChangeBidMatters == "是"){
                                this.isTenderShow = true;
                            }else{
                                this.isTenderShow = false;
                            };
                            this.announcementThat = item.announcementThat;// 公示说明
                            this.competentDepartmentName = item.competentDepartmentName;// 主管部门全称
                            this.competentDepartmentAddress = item.competentDepartmentAddress;// 主管部门地址
                            this.responsiblePerson = item.responsiblePerson;// 主管部门负责人
                            this.competentDepartmePhone = item.competentDepartmePhone;// 主管部门联系方式
                            if(this.isChangeBidOpenMatters == "是"){
                                this.OpenTenderShow = true;
                            }else{
                                this.OpenTenderShow = false;
                            }
                            this.submissionDocumentsPlace = item.submissionDocumentsPlace;// 递交投标文件地点
                            this.bidOpeningPlace = item.bidOpeningPlace;// 开标地点
                            this.estimatedReviewDuration = item.estimatedReviewDuration;// 开标时长
                            this.openingRoom = item.openingRoom;// 开标室
                            this.appointmentEvaluationRoom= item.appointmentEvaluationRoom;// 是否预约评标室
                            if(item.appointmentEvaluationRoom == '是'){
                                this.isService = true;// 控制配套服务展示隐藏
                                this.supportingServices = item.supportingServices;// 配套服务
                            }else if(item.appointmentEvaluationRoom == '否'){
                                this.isPlace = true;
                                this.bidEvaluationSite = item.bidEvaluationSite;// 评标地点
                            }
                            this.bidEvaluationTime = item.bidEvaluationTime;// 评标时间
                            this.lengthOfTenderEvaluation = item.lengthOfTenderEvaluation;// 评标时长
                            this.bidEvaluationRoom = item.bidEvaluationRoom;//  评标室
                            this.bidEvaluationStandard = item.bidEvaluationStandard;//评标办法和标准
                            this.projectLeader = item.projectLeader;//项目负责人
                            this.projectLeaderPhone = item.projectLeaderPhone;//联系方式
                            this.remark = item.remark;// 备注
                            this.creatorCompanyName = item.creatorCompanyName;// 创建人
                            this.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');// 保存时间
                            // 变更日期
                            if(item.changesDate == null || item.changesDate == 0 || item.changesDate == ""){
                                this.changesDate = ""
                            }else{
                                this.changesDate = dayjs(item.changesDate).format('YYYY-MM-DD');
                            };
                            // 开标时间
                            if(item.assessmentTime == 0 || item.assessmentTime == '' || item.assessmentTime == null){
                                this.assessmentTime = ''
                            }else{
                                this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD');
                            }
                            // 公示期限
                            if(item.enrollStartTime == 0 || item.enrollStartTime == '' || item.enrollStartTime == null){
                                this.enrollStartTime = ''
                            }else{
                                this.enrollStartTime = dayjs(item.enrollStartTime).format('YYYY-MM-DD');
                            }
                            if(item.enrollEndTime == 0 || item.enrollEndTime == '' || item.enrollEndTime == null){
                                this.enrollEndTime = ''
                            }else{
                                this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD');
                            }
                            
                        })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
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
                        // 资金构成
                        this.stateOwnedFunds = res.data.data.stateOwnedFunds;//国有资金
                        this.stateOwnedFundsPercentage =  res.data.data.stateOwnedFundsPercentage;// 国有资金百分比
                        this.ownFunds = res.data.data.ownFunds;// 自有资金
                        this.ownFundsPercentage =  res.data.data.ownFundsPercentage;// 自有资金百分比
                        // 外国政府及组织资金
                        this.foreignGovernmentsAndOrganizationalFunds = res.data.data.foreignGovernmentsAndOrganizationalFunds;
                        // 外国政府及组织资金百分比
                        this.foreignGovernmentsAndOrganizationalFundsPercentage =  res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage;
                        this.overseasPrivateInvestment = res.data.data.overseasPrivateInvestment;// 境外私人投资
                        // 境外私人投资百分比
                        this.overseasPrivateInvestmentPercentage =  res.data.data.overseasPrivateInvestmentPercentage;
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;//招标采购代理机构
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            // 分包信息
            getItemInfo(){
                let arr = [];
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
            // 查看分包信息
            lookFile(row){
                this.lookFlag = true;
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称 
                this.subcontractContents = row.subcontractContents;// 分包内容
                this.scopeOfTender = row.scopeOfTender;// 采购范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额  
                this.nameOfTenderProject  = row.projectInformationVo.nameOfTenderProject;// 招标(采购)项目名称
                this.biddingProjectNumber = row.projectInformationVo.biddingProjectNumber;// 招标项目编号
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            },
            closeLook(){
                this.lookFlag = false;
            },
            // 附件列表查询
            async uploadList(){
                await this.getpageInfo();
                let object={}
                if(this.entrySubcontractNumber!=null){
                    // 入场项目分包编号
                    object={
                        relevanceCorrelationId:this.tenderNoticeId,
                        fileType:'变更附件'
                    }
                }else{
                    // 入场项目编号
                    object ={
                        relevanceCorrelationId:this.tenderNoticeId,
                        fileType:'变更附件'
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
            async getmanageInfo(){
                await this.getpageInfo();// 通过关联ID查询入场项目编号
                let object = {};
                if(this.entrySubcontractNumber!=null){
                    object={
                        projectId:this.sourceNoticeId,
                    }
                }else{
                    object={
                        projectId:this.sourceNoticeId,
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/historyController/selectTenderNoticeHistoryList',
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
.fail_box{
    width:100%;
    margin:0 auto;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px dashed #333;
}
</style>