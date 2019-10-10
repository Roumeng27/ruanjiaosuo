<template>
    <!-- 采购公示 -->
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
                                        <div class="editContent">{{nameOfTenderProject}}</div>
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
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">地址：</div>
                                        <div class="editContent">{{tendereeAddress}}</div>
                                    </div>
                                </div> 
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{tendereePhone}}</div>
                                    </div>
                                </div>
                                <!-- 7.29 -->
                                <div v-if="biddingOrganization == '委托招标'">
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
                                    <div class="editItem" >
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
                        <!-- 分包信息 -->
                        <el-collapse-item title="分包信息" name="3" v-show="!diffFlag">
                            <div class="edit_list">
                                <el-table :data="subpackageData" stripe style="width: 100%">
                                    <el-table-column  prop="index"  label="序号">
                                        <template slot-scope="scope">
                                            <span>{{scope.$index+1}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="subcontractName"  label="分包名称">
                                    </el-table-column>
                                    <el-table-column prop="subcontractingControlAmount" label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号">
                                    </el-table-column>
                                    <el-table-column label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="采购内容">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="bidDetail(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 总包信息 -->
                        <el-collapse-item title="采购信息" name="3" v-show="diffFlag">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购内容：</div>
                                        <div class="editContent">{{tenderContents}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">
                                            <span>{{purchaseAmount}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">拟定供应商名称：</div>
                                        <div class="editContent">
                                            <span>{{developingSuppliersName}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">拟定供应商地址：</div>
                                        <div class="editContent">
                                            <span>{{developingSuppliersAddress}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">拟采购货物/服务说明：</div>
                                        <div class="editContent">
                                            <span>{{purchasePurposes}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">采用单一来源采购方式的原因及相关说明：</div>
                                        <div class="editContent">
                                            <span>{{technologyQualifications}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 论证意见 -->
                        <el-collapse-item title="论证意见" name="4"  v-show="diffFlag">
                            <div class="edit_list">
                                <el-table
                                    ref="multipleTable"
                                    :data="adviceData"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="personName"
                                        label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                        prop="workUnit"
                                        label="工作单位">
                                    </el-table-column>
                                    <el-table-column
                                        prop="position"
                                        label="职称">
                                    </el-table-column>
                                </el-table>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专业人员论证意见：</div>
                                        <div class="editContent">
                                            <el-input type="textarea" v-model="professionalOpinions"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公示内容 -->
                        <el-collapse-item title="公示内容" name="5">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示名称：</div>
                                        <div class="editContent">{{noticeName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示期限：</div>
                                        <div class="editContent">{{enrollStartTime}} 至{{enrollEndTime}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示说明：</div>
                                        <div class="editContent">{{announcementThat}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主管部门全称：</div>
                                        <div class="editContent">{{competentDepartmentName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主管部门地址：</div>
                                        <div class="editContent">{{competentDepartmentAddress}} </div>
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
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{projectLeaderPhone}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 采购公示 -->
                        <el-collapse-item title="采购公示" name="6">
                            <div class="edit_list">
                                <div class="infobox_title">
                                    <span>{{nameOfTenderProject}}</span>
                                    <h1>单一来源采购公示</h1>
                                    <p >{{saveTime}}</p>
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
                                <!-- <div class="editItem">
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
                                </div> -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">采购人</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人全称：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人地址：</div>
                                        <div class="editContent">{{tendereeAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人联系方式：</div>
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
                                            <div class="editName">招标(采购)人全称</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人地址</div>
                                            <div class="editContent">{{agentAddress}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人联系方式</div>
                                            <div class="editContent">{{agentPhone}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">主管部门</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主管部门全称：</div>
                                        <div class="editContent">{{competentDepartmentName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主管部门地址：</div>
                                        <div class="editContent">{{competentDepartmentAddress}}</div>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主管部门联系人：</div>
                                        <div class="editContent">{{responsiblePerson}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主管部门联系方式：</div>
                                        <div class="editContent">{{competentDepartmePhone}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">采购内容</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="infobox_item">
                                    <table border="1"  cellspacing="0" cellpadding="0" style="width:99%;">
                                        <tr v-show="!diffFlag">
                                            <td>分包名称</td>
                                            <td colspan="3">{{subcontractName}}</td>
                                        </tr>
                                        <tr v-show="!diffFlag">
                                            <td>入场项目(分包)编号</td>
                                            <td>{{entrySubcontractNumber}}</td>
                                            <td>分包控制金额</td>
                                            <td>{{subcontractingControlAmount}}万元</td>
                                        </tr>
                                        <tr v-show="diffFlag">
                                            <td>采购项目名称</td>
                                            <td colspan="3">{{nameOfTenderProject}}</td>
                                        </tr>
                                        <tr v-show="diffFlag">
                                            <td>入场项目编号</td>
                                            <td>{{biddingProjectNumber}}</td>
                                            <td>项目预算金额</td>
                                            <td>{{budgetAmount}}万元</td>
                                        </tr>
                                        <tr>
                                            <td>拟定供应商名称</td>
                                            <td  colspan="3">{{developingSuppliersName}}</td>
                                        </tr>
                                        <tr>
                                            <td>拟定供应商地址</td>
                                            <td  colspan="3">{{developingSuppliersAddress}}</td>
                                        </tr>
                                        <tr>
                                            <td>拟采购货物/服务说明</td>
                                            <td  colspan="3">{{purchasePurposes}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">采用单一来源采购方式的原因及相关说明：</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">{{technologyQualifications}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">专业人员论证意见：</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">{{professionalOpinions}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">论证人员名单：</td>
                                        </tr>
                                        <tr>
                                            <td>姓名</td>
                                            <td  colspan="2">工作单位</td>
                                            <td>职称</td>
                                        </tr>
                                        <tr  v-for="(item,index) in adviceData" :key="index">
                                            <td>{{item.personName}}</td>
                                            <td  colspan="2">{{item.workUnit}}</td>
                                            <td>{{item.position}}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示期限：</div>
                                        <div class="editContent">
                                            <span>{{enrollStartTime}}到{{enrollEndTime}}</span>
                                        </div>
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
                                        <div class="editName" style="font-weight:bold;">项目联系人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">联系方式：</div>
                                        <div class="editContent">{{projectLeaderPhone}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">备注：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                                <div class="infobox_footer">
                                    <div>{{creatorCompanyName}}</div>
                                    <div>{{saveTime}}</div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="7">
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
        <!-- 查看分包信息详情 -->
        <div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
                <el-collapse v-model="activeName" accordion>
                    <!--分包信息 -->
                    <el-collapse-item title="分包信息" name="1">
                        <div class="edit_list">
                            <!-- <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="color:red;">统一交易标志码：</div>
                                    <div class="editContent"> </div>
                                </div>
                            </div> -->
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">入场项目分包编号：</div>
                                    <div class="editContent">{{entrySubcontractNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包名称：</div>
                                    <div class="editContent">{{subcontractName}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包内容：</div>
                                    <div class="editContent">{{tenderPurchaserName}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购范围：</div>
                                    <div class="editContent">{{subcontractContents}}</div>
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
                                    <div class="editContent">{{electronicBidEvaluation}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 采购内容详情 -->
        <div class="lookWrapper" v-show="detailFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>招标内容</p>
                    <i class="el-icon-close" @click="closebidDetail"></i>
                </div>
                <!-- <div class="box">
                    <button class="btn" @click="savePage">保存</button>
                </div> -->
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
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectNumber}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目类型：</div>
                                        <div class="editContent">{{typesOfBiddingProjects}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购方式：</div>
                                        <div class="editContent">{{biddingProcurementMode}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购组织方式：</div>
                                        <div class="editContent">{{biddingOrganization}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 采购信息-->
                        <el-collapse-item title="采购信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包名称：</div>
                                        <div class="editContent">{{subcontractName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包控制金额：</div>
                                        <div class="editContent">{{subcontractingControlAmount}}万元</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目分包编号：</div>
                                        <div class="editContent">{{entrySubcontractNumber}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">
                                            <span>{{purchaseAmount}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">拟定供应商名称：</div>
                                        <div class="editContent">
                                            <span>{{developingSuppliersName}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">拟定供应商地址：</div>
                                        <div class="editContent">
                                            <span>{{developingSuppliersAddress}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">拟采购货物/服务说明：</div>
                                        <div class="editContent">
                                            <span>{{purchasePurposes}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">采用单一来源采购方式的原因及相关说明：</div>
                                        <div class="editContent">
                                            <span>{{technologyQualifications}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 论证意见 -->
                        <el-collapse-item title="论证意见" name="3">
                            <div class="edit_list">
                                <el-table
                                        ref="multipleTable"
                                        :data="adviceData"
                                        tooltip-effect="dark"
                                        style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="personName"
                                        label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                        prop="workUnit"
                                        label="工作单位">
                                    </el-table-column>
                                    <el-table-column
                                        prop="position"
                                        label="职称">
                                    </el-table-column>
                                </el-table>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专业人员论证意见：</div>
                                        <div class="editContent">{{professionalOpinions}} </div>
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
                agentPhone:'',
                agentAddress:'',
                biddingPurchasingAgencyName:'',
                biddingOrganization:'',
                waitCase:JSON.parse(window.localStorage.waitCase),
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6','7'],
                // 文件查询
                fileData:[],
                // 文件上传所需字段
                enclosureData:[{
                    id:1,
                    appendixName: "招标（采购）人确认函",
                    attachlist: []
                },
                {
                    id:2,
                    appendixName: "招标公告",
                    attachlist: []
                }],
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
                tenderContents:'',// 招标内容
                purchaseAmount:'',// 采购数量
                // 分包信息所需字段
                subpackageData:[],// 分包列表
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                diffFlag:false,// 控制分包还是总包
                // 采购公示所需字段
                noticeName:'',// 公告名称
                collectTime:[],// 公示期限
                announcementThat:'',// 公示说明
                competentDepartmentName:'',//主管部门全称
                competentDepartmentAddress:'',//主管部门地址
                responsiblePerson:'',//主管部门负责人
                competentDepartmePhone:'',//主管部门联系方式
                projectLeader:'',// 项目负责人
                projectLeaderPhone:'',// 联系方式
                remark:'',// 备注
                enrollStartTime:'',// 报名开始时间
                enrollEndTime:'',// 报名结束时间
                developingSuppliersName:'',//拟定供应商名称
                developingSuppliersAddress:'',//拟定供应商地址
                adviceData:[],//论证意见表格
                professionalOpinions:'',//论证意见
                announcementThat:'',//公示说明
                technologyQualifications:'',// 采用单一来源采购方式的原因及相关说明
                personName:'',//姓名
                workUnit:'',//工作单位
                position:'',//职称
                tendereeAddress:'',// 采购人地址
                 tendereePhone:'',// 采购人联系方式
                purchasePurposes:'',// 拟采购货物/服务说明
                creatorCompanyName:'',// 创建人
                saveTime:'',// 保存时间
                lookFlag:false,// 查看分包详情
                detailFlag:false,// 查看采购内容详情
                areaList:[],// 后端返回的items

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
            this.biddingOrganization = this.waitCase.biddingOrganization;//招标组织方式
            this.getpageInfo();// 通过关联ID查询入场项目编号
            this.getbiddingInfo();// 招标项目信息
            this.getmanageInfo();// 办理记录
            if(this.entrySubcontractNumber !=null){
                this.getsubpackageInfo();//分包信息查询
            }   
            this.getOneList();// 招标（采购）人确认函附件
            this.getTwoList();// 招标公告附件
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
                    tenderNoticeId:this.referenceId,
                    state:'办理通过'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/tenderNoticeController/submit',
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
                    tenderNoticeId:this.referenceId,
                    state:'办理未通过'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/tenderNoticeController/submit',
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
            // 通过关联ID查询入场项目编号
            getpageInfo(){
                let object={}
                if(this.entrySubcontractNumber!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.entrySubcontractNumber,
                        noticeType:"采购公示",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectNumber,
                        noticeType:"采购公示",
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.length>0){
                            
                            res.data.data.forEach(item=>{
                                this.agentPhone = res.data.data.agentPhone;
                                this.agentAddress = res.data.data.agentAddress;
                                this.tendereeAddress = item.tendereeAddress;// 招标人地址
                                this.tendereePhone = item.tendereePhone;// 招标人联系方式
                                this.noticeName = item.noticeName;// 公告名称
                                this.enrollStartTime = item.enrollStartTime;//公示日期
                                this.enrollEndTime = item.enrollEndTime;
                                this.announcementThat = item.announcementThat;//公示说明
                                this.competentDepartmentName = item.competentDepartmentName;//主管部门全称
                                this.competentDepartmentAddress = item.competentDepartmentAddress;//地址
                                this.responsiblePerson = item.responsiblePerson;//负责人
                                this.competentDepartmePhone = item.competentDepartmePhone;//联系方式
                                if(item.enrollStartTime  == null){
                                    this.enrollStartTime = ""
                                }else{
                                    this.enrollStartTime = dayjs(item.enrollStartTime).format('YYYY-MM-DD');// 报名开始时间
                                };
                                if(item.enrollEndTime == null){
                                    this.enrollEndTime = ""
                                }else{
                                    this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD');;// 报名结束时间
                                }
                                this.projectLeader = item.projectLeader;// 项目负责人
                                this.projectLeaderPhone = item.projectLeaderPhone;// 联系方式
                                this.remark = item.remark;// 备注
                                
                                this.collectTime.push(this.enrollStartTime,this.enrollEndTime);
                                this.areaList =item.items;
                                this.areaList.forEach(area=>{
                                    this.purchaseAmount=area.purchaseAmount;// 采购数量
                                    this.purchasePurposes=area.purchasePurposes;// 拟采购货物
                                    this.technologyQualifications=area.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                                    this.developingSuppliersName=area.developingSuppliersName;// 拟定供应商名称
                                    this.developingSuppliersAddress=area.developingSuppliersAddress;//地址
                                    this.professionalOpinions = area.professionalOpinions//论证意见
                                    this.adviceData = area.itemCareermanVos
                                })
                                this.creatorCompanyName = item.creatorCompanyName;
                                if(item.saveTime == null){
                                    this.saveTime = ""
                                }else{
                                    this.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                                }
                            })
                        }
                    }else{
                        this.$layer.msg(res.data.msg);
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
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                })
            },
            // 查看分包信息
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
            //关闭查看详情
            closeLook(){
                this.lookFlag = false;
            },
            // 查看采购内容
            bidDetail(row){
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额
                this.detailFlag = true;
                this.areaList.forEach(item=>{
                    if(item.entrySubcontractNumber == row.entrySubcontractNumber ){
                        this.purchaseAmount=item.purchaseAmount;// 采购数量
                        this.purchasePurposes=item.purchasePurposes;// 拟采购货物
                        this.technologyQualifications=item.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                        this.developingSuppliersName=item.developingSuppliersName;// 拟定供应商名称
                        this.developingSuppliersAddress=item.developingSuppliersAddress;//地址
                        this.professionalOpinions = item.professionalOpinions//论证意见
                        this.adviceData = item.itemCareermanVos
                    }
                })
            },
            // 下一步招标内容详情 关闭
            closebidDetail(){
                this.detailFlag = false;
            },
            // 招标（采购）人确认函附件
            getOneList(){
                let object={}
                if(this.entrySubcontractNumber!=null){
                    // 分包
                    object={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'招标（采购）人确认函'
                    }
                }else{
                    //  总包
                    object ={
                        relevanceCorrelationId:this.totalItemId,
                        fileType:'招标（采购）人确认函'
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
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            // 招标公告附件
            getTwoList(){
                let object={}
                if(this.entrySubcontractNumber!=null){
                    // 入场项目分包编号
                    object={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'招标公告'
                    }
                }else{
                    // 入场项目编号
                    object ={
                        relevanceCorrelationId:this.totalItemId,
                        fileType:'招标公告'
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
                        this.enclosureData[1].attachlist = arr;
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
            // 分包信息查询
            getsubpackageInfo(){
                let object = {};
                if(this.entrySubcontractNumber !=null){
                    object= {
                        projectEntrySubcontractNumbers:[this.entrySubcontractNumber]
                    }
                }else{
                    object= {
                        projectEntrySubcontractNumbers:[this.projectCode]
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.subpackageData = res.data.data;// 项目分包列表
                        this.subpackageData.forEach((item,index) => {
                            this.tenderContents = item.projectInformationVo.tenderContents;// 招标内容
                            this.subcontractName = item.subcontractName;// 分包名称
                            this.entrySubcontractNumber = item.entrySubcontractNumber;// 入场项目分包编号
                            this.subcontractingControlAmount = item.subcontractingControlAmount;// 分包控制金额
                        });
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
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
/* 表格 */
.infobox{
    width: 100%;
    padding: 0 40px;
}
.infobox_title{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px dotted #7F7F7F;
}
.infobox_title span{
    font-size: 20px;
}
.infobox_title h1{
    font-size: 22px;
    font-weight: normal;
}
.infobox_title p{
    font-size: 12px;
}
.infobox_item{
    padding: 10px 0 10px 0;
}
.infobox_item>table>tr{
    text-align: center;
}
.infobox_footer{
    width: 100%;
    text-align: end;
}
</style>