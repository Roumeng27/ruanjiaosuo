<template>
    <!-- 采购变更公告 -->
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
                                            prop="entrySubcontractNumber"
                                            label="入场项目(分包)编号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="subcontractName"
                                            label="分包名称">
                                        </el-table-column>
                                        <el-table-column
                                            prop="subcontractingControlAmount"
                                            label="分包控制金额(万元)">
                                        </el-table-column>
                                        <!-- <el-table-column   label="创建时间">
                                            <template slot-scope="scope">
                                                <span>{{projectSubcontractCreationTime}}</span>
                                            </template>
                                        </el-table-column> -->
                                        <el-table-column
                                            label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
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
                        </el-collapse-item>
                        <!-- 公告信息 -->
                        <el-collapse-item title="公告信息" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">公告名称：</div>
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
                                            <div class="editName">报名开始时间：</div>
                                            <div class="editContent">
                                                <span>{{enrollStartTime}}</span>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">报名结束时间：</div>
                                            <div class="editContent">
                                                <span>{{enrollEndTime}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editTit">采购文件发售时间：</div>
                                            <div class="editContent">
                                                <span>{{saleReceiveStartDate}}日到{{saleReceiveEndDate}} 上午{{morningbegin}}-{{morningend}} 到下午{{afterbegin}}-{{afterend}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购文件发售地点：</div>
                                            <div class="editContent">
                                                <span>{{tenderDocumentsSaleSite}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购文件工本费：</div>
                                            <div class="editContent">
                                                <span>{{tenderDocumentsCost}}元</span>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName"></div>
                                            <div class="editContent"></div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">工本费接收账户：</div>
                                            <div class="editContent">
                                                <span>{{costAcceptAccount}}</span>
                                            </div>
                                            <!-- <el-button plain>设置账户</el-button> -->
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
                                        <div class="editCenter">
                                            <div class="editName">递交响应文件截止时间：</div>
                                            <div class="editContent">{{assessmentTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">递交响应文件地点：</div>
                                            <div class="editContent">
                                                <span>{{submissionDocumentsPlace}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">响应文件开启时间：</div>
                                            <div class="editContent">{{assessmentTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">响应文件开启地点：</div>
                                            <div class="editContent">
                                                <span>{{bidOpeningPlace}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 开标时长 -->
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标时长：</div>
                                            <div class="editContent">{{estimatedReviewDuration}}</div>
                                        </div>
                                    </div>
                                    <!--开标室  -->
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标室：</div>
                                            <div class="editContent">
                                                <span>{{openingRoom}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 是否预约评标室 -->
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">是否预约评标室：</div>
                                            <div class="editContent">
                                                <span>{{appointmentEvaluationRoom}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 配套服务 -->
                                    <div class="editItem" v-show="peitao">
                                        <div class="editCenter">
                                            <div class="editName">配套服务：</div>
                                            <div class="editContent">
                                                <span>{{serviceData}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 评标地点 -->
                                    <div class="editItem" v-show="Pbaddress">
                                        <div class="editCenter">
                                            <div class="editName">评标地点：</div>
                                            <div class="editContent">
                                                <span>{{bidEvaluationSite}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标时间：</div>
                                            <div class="editContent">
                                                <span>{{bidEvaluationTime}}</span>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评标时长：</div>
                                            <div class="editContent">
                                                <span>{{lengthOfTenderEvaluation}}小时</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标室：</div>
                                            <div class="editContent">
                                                <span>{{bidEvaluationRoom}}</span>
                                            </div>
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
                                    <div>变更公告</div>
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
                                        <div class="editName">招标(采购)人全称</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人地址</div>
                                        <div class="editContent">{{tendereeAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人联系方式</div>
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
                                            <div class="editName">招标(采购)代理机构全称</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构地址</div>
                                            <div class="editContent">{{agentAddress}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构联系方式</div>
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
                                            <div class="editName">报名开始时间：</div>
                                            <div class="editContent">
                                                <span>{{enrollStartTime}}</span>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">报名结束时间：</div>
                                            <div class="editContent">
                                                <span>{{enrollEndTime}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购文件发售时间：</div>
                                            <div class="editContent">
                                                <span>{{saleReceiveStartDate}}日到{{saleReceiveEndDate}} 上午{{morningbegin}}-{{morningend}} 到下午{{afterbegin}}-{{afterend}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购文件发售地点：</div>
                                            <div class="editContent">
                                                <span>{{tenderDocumentsSaleSite}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购文件工本费：</div>
                                            <div class="editContent">
                                                <span>{{tenderDocumentsCost}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">投标人需提交资料：</div>
                                            <div class="editContent">
                                                <span>{{bidderData}}</span>
                                            </div>
                                        </div>
                                    </div> -->
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
                                            <div class="editName">递交响应文件截止时间：</div>
                                            <div class="editContent">{{assessmentTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">递交响应文件地点：</div>
                                            <div class="editContent">
                                                <span>{{submissionDocumentsPlace}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">响应文件开启时间：</div>
                                            <div class="editContent">{{assessmentTime}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">响应文件开启地点：</div>
                                            <div class="editContent">
                                                <span>{{bidOpeningPlace}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 开标时长 -->
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标时长：</div>
                                            <div class="editContent">{{estimatedReviewDuration}}</div>
                                        </div>
                                    </div>
                                    <!--开标室  -->
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标室：</div>
                                            <div class="editContent">
                                                <span>{{openingRoom}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 是否预约评标室 -->
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">是否预约评标室：</div>
                                            <div class="editContent">
                                                <span>{{appointmentEvaluationRoom}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 配套服务 -->
                                    <div class="editItem" v-show="peitao">
                                        <div class="editCenter">
                                            <div class="editName">配套服务：</div>
                                            <div class="editContent">
                                                <span>{{serviceData}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 评标地点 -->
                                    <div class="editItem" v-show="Pbaddress">
                                        <div class="editCenter">
                                            <div class="editName">评标地点：</div>
                                            <div class="editContent">
                                                <span>{{bidEvaluationSite}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标时间：</div>
                                            <div class="editContent">
                                                <span>{{bidEvaluationTime}}</span>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评标时长：</div>
                                            <div class="editContent">
                                                <span>{{lengthOfTenderEvaluation}}小时</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标室：</div>
                                            <div class="editContent">
                                                <span>{{bidEvaluationRoom}}</span>
                                            </div>
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
                            <el-table :data="manageData" stripe style="width: 100%">
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
        <div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item title="采购项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{nameOfPurchaser}} </div>
                                    </div>
                                    <div class="editCenter" v-if="biddingOrganization == '委托招标'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)项目编号：</div>
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
                                        <div class="editName">招标(采购)范围：</div>
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
                bidEvaluationRoom:'',//评标室
                lengthOfTenderEvaluation:'',//评标时长
                bidEvaluationTime:'',
                bidEvaluationSite:'',//评标地点
                Pbaddress:false,
                peitao:false,
                serviceData:'',
                appointmentEvaluationRoom:'',//是否预约评标室
                openingRoom:"",//开标室
                estimatedReviewDuration:'',//开标时长
                costAcceptAccount:'',//工本费接收账户
                biddingOrganization:'',
                agentAddress :'',
                agentPhone :'',
                biddingPurchasingAgencyName:'',
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6'],
                isTenderShow:false,
                OpenTenderShow:false,
                // 文件查询
                fileData:[],
                enclosureData:[
                    {
                        appendixName: "变更文件",
                        attachlist: []
                    }
                ],
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
                nameOfPurchaser:'',
                tendereeAddress:'',//地址
                tendereePhone:'',//联系方式
                budgetAmount:'',// 招标项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',// 招标采购方式
                biddingOrganization:'',// 招标组织方式
                typesOfBiddingProjects:'',// 招标项目类型
                // 变更事项所需字段
                changesDate:'',//变更日期
                changeReason:'',//变更理由
                changesAs:'',//变更事项
                isChangeBidMatters:'',//是否变更投标事宜
                isTenderShow:false,//当投标事宜为是的时候出现
                enrollStartTime:'',//报名开始时间
                enrollEndTime:'',//报名结束时间
                collectTime:[],//招标文件发售时间
                saleReceiveStartDate :'',//招标文件发售开始时间   
                saleReceiveEndDate:'',//招标文件发售结束时间 
                morningbegin:'8:00',// 上午开始时间
                morningend:'12:00',// 上午结束时间
                afterbegin:'14:00',// 下午开始时间
                afterend:'17:30',// 下午结束时间

                saleStartTime:[],// 上午发售时间
                saleEndTime:[],// 下午发售时间
                tenderDocumentsSaleSite:'',//招标文件发售地点
                tenderDocumentsCost:'',//招标文件工本费
                bidderData:'',//投标人须提交资料
                isChangeBidOpenMatters:'',//是否变更开标事宜
                OpenTenderShow:false,//当开标事宜为是的时候出现
                assessmentTime:'',//递交截止时间
                submissionDocumentsPlace:'',//递交投标文件地点
                bidOpeningPlace:'',//开标地点
                bidEvaluationStandard:'',//评标办法和标准
                projectLeader:'',//项目负责人
                projectLeaderPhone:"",//联系方式
                remark:'',//备注
                nextFlag:false,
                noticeName:'',//变更公告名字
                saveTime:'',//时间
                sourceOfFunds:'',//资金来源
                stateOwnedFunds:'',//国有资金
                stateOwnedFundsPercentage:"",//国有资金百分比
                ownFunds:'',//自有资金
                ownFundsPercentage:'',//自有资金百分比
                foreignGovernmentsAndOrganizationalFunds:'',//外国政府资金
                foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国资金百分比
                overseasPrivateInvestment:'',//境外人投资
                overseasPrivateInvestmentPercentage:'',//境外人投资百分比
                creationTime:"",//首次公告日期
                changesDate:'',//首次变更日期
                creatorCompanyName:'',//名称
                manageData:[],//办理记录
                tenderNoticeId:'',
                // 分包信息
                subpackageData:[],
                lookFlag:false,// 
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'是',// 是否电子招投标
                sourceNoticeId:"",
                initList:[],
                areaList:[],
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
            // this.getpageInfo();// 通过关联ID查询入场项目编号
            this.getbiddingInfo();// 招标项目信息
            this.getOneList();// 变更文件
            if(this.entrySubcontractNumber != null){
                this.getItemInfo();// 分包信息
            }
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
                let object={}
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
                    method:'POST',
                    url:baseUrl+'/tenderNoticeController/selectChange',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.length>0){
                            res.data.data.forEach(item=>{
                                // 7.29
                                this.agentAddress  = item.agentAddress ;
                                this.agentPhone  = item.agentPhone ;
                                //
                                this.bidEvaluationRoom = item.bidEvaluationRoom;//新增7.10
                                this.lengthOfTenderEvaluation = item.lengthOfTenderEvaluation;
                                if(item.bidEvaluationTime == null || item.bidEvaluationTime == 0 || item.bidEvaluationTime == ""){
                                    this.bidEvaluationTime = ""
                                }else{
                                    this.bidEvaluationTime = dayjs(item.bidEvaluationTime).format('YYYY-MM-DD');
                                }
                                this.bidEvaluationSite = item.bidEvaluationSite;
                                this.serviceData = item.supportingServices;
                                this.appointmentEvaluationRoom = item.appointmentEvaluationRoom; 
                                this.openingRoom = item.openingRoom;
                                this.estimatedReviewDuration = item.estimatedReviewDuration;
                                this.costAcceptAccount = item.costAcceptAccount;
                                this.tendereeAddress = item.tendereeAddress;
                                this.tendereePhone = item.tendereePhone;
                                this.noticeName = item.noticeName;
                                this.sourceNoticeId = item.sourceNoticeId;
                                 if(this.appointmentEvaluationRoom == '是'){
                                    this.peitao = true;
                                    this.Pbaddress = false;
                                }else if(this.appointmentEvaluationRoom == '否'){
                                    this.Pbaddress = true;
                                    this.peitao = false;
                                }
                                if(item.changesDate == null || item.changesDate == 0 || item.changesDate == ""){
                                    this.changesDate = ""
                                }else{
                                    this.changesDate = dayjs(item.changesDate).format('YYYY-MM-DD HH:mm:ss');
                                };
                                this.changeReason = item.changeReason;
                                this.changesAs = item.changesAs;
                                this.isChangeBidMatters = item.isChangeBidMatters;
                                this.isChangeBidOpenMatters = item.isChangeBidOpenMatters;
                                if(item.enrollStartTime == null && item.enrollStartTime == 0 && item.enrollStartTime == ""){
                                    this.enrollStartTime = ""
                                }else{
                                    this.enrollStartTime = dayjs(item.enrollStartTime).format('YYYY-MM-DD HH:mm:ss');
                                };
                                if(item.enrollEndTime == null && item.enrollEndTime == 0 && item.enrollEndTime == ""){
                                    this.enrollEndTime = ""
                                }else{
                                    this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD HH:mm:ss');
                                };
                                if(item.saleReceiveStartDate == null && item.saleReceiveStartDate == 0 && item.saleReceiveStartDate == ""){
                                    this.saleReceiveStartDate = ""
                                }else{
                                    this.saleReceiveStartDate = dayjs(item.saleReceiveStartDate).format('YYYY-MM-DD');
                                };
                                if(item.saleReceiveEndDate == null && item.saleReceiveEndDate == 0 && item.saleReceiveEndDate == ""){
                                    this.saleReceiveEndDate = ""
                                }else{
                                    this.saleReceiveEndDate = dayjs(item.saleReceiveEndDate).format('YYYY-MM-DD');
                                };
                                this.tenderDocumentsSaleSite =item.tenderDocumentsSaleSite;
                                this.tenderDocumentsCost =item.tenderDocumentsCost;
                                this.bidderData =item.bidderData;
                                if(item.times == 0){
                                    if(item.openingTime == null  || item.openingTime == 0 || item.openingTime == ""){
                                        this.assessmentTime = ""
                                    }else{
                                        this.assessmentTime = dayjs(item.openingTime).format('YYYY-MM-DD');
                                    }
                                }else{
                                    if(item.assessmentTime == null  || item.assessmentTime == 0 || item.assessmentTime == ""){
                                        this.assessmentTime = ""
                                    }else{
                                        this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD');
                                    }
                                }
                                this.submissionDocumentsPlace =item.submissionDocumentsPlace;
                                this.bidOpeningPlace =item.bidOpeningPlace;
                                this.bidEvaluationStandard =item.bidEvaluationStandard;
                                this.projectLeader =item.projectLeader;
                                this.projectLeaderPhone =item.projectLeaderPhone;
                                this.remark =item.remark;
                                if(item.saveTime == null &&item.saveTime == 0 &&item.saveTime == ""){
                                    this.saveTime = ""
                                }else{
                                    this.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                                };
                                this.creatorCompanyName =item.creatorCompanyName;
                                // 招标文件发售时间 上午
                                this.morningbegin = item.saleStartTime.split(',')[0];
                                this.morningend = item.saleStartTime.split(',')[1];
                                // 招标文件发售时间 下午
                                this.afterbegin = item.saleEndTime.split(',')[0];
                                this.afterend = item.saleEndTime.split(',')[1];
                            })
                            if(this.isChangeBidMatters == "是"){
                                this.isTenderShow = true;
                            }else{
                                this.isTenderShow = false;
                            };
                            if(this.isChangeBidOpenMatters == "是"){
                                this.OpenTenderShow = true;
                            }else{
                                this.OpenTenderShow = false;
                            }
                        }
                    }
                })
            },
            //招标公告的查询接口
            getNoticeList(){
                let object={}
                if(this.entrySubcontractNumber != null ){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.entrySubcontractNumber,
                        noticeType:"采购公告",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectNumber,
                        noticeType:"采购公告",
                    }
                }
                return this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.initList = res.data.data;
                        this.areaList = res.data.data[0].items;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 分包信息
            async getItemInfo(){
                await this.getNoticeList();
                let arr = [];
                if(this.entrySubcontractNumber != null){
                    if(this.initList.length == 0){
                        arr.push(this.entrySubcontractNumber)
                    }else{
                        this.areaList.forEach(item=>{
                            arr.push(item.entrySubcontractNumber);
                        })
                    }
                }
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
                        this.$layer.msg(res.data.msg);
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
                this.scopeOfTender = row.scopeOfTender;// 招标范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额  
                this.nameOfTenderProject  = row.projectInformationVo.nameOfTenderProject;// 招标(采购)项目名称
                this.nameOfPurchaser = row.projectInformationVo.nameOfPurchaser;// 招标(采购)人
                this.biddingProjectNumber = row.projectInformationVo.biddingProjectNumber;// 招标项目编号
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            },
            closeLook(){
                this.lookFlag = false;
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
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }
                })
            },
            //变更文件
            getOneList(){
                var obj={};
                if(this.entrySubcontractNumber!=null){
                    obj={
                        relevanceCorrelationId:this.referenceId,
                        fileType:'变更文件'
                    }
                }else{
                    obj={
                        relevanceCorrelationId:this.referenceId,
                        fileType:'变更文件'
                    }
                }
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
                        })
                        this.enclosureData[0].attachlist = arr
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
                await this.getpageInfo();
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
.fail_box{
    width:100%;
    margin:0 auto;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px dashed #333;
}
</style>