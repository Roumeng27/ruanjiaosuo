<template>
    <div class="newBox">
        <!-- (询价)成交结果公告 -->
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
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">地址：</div>
                                        <div class="editContent">{{address}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{tendereeContactInformation}}</div>
                                    </div>
                                </div>
                                <div  v-if="biddingOrganization == '委托招标'">
                                    <div class="editItem" >
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem" >
                                        <div class="editCenter">
                                            <div class="editName">地址：</div>
                                            <div class="editContent">
                                                <span>{{agentAddress}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
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
                                    <div class="editCenter">
                                        <div class="editName">公告名称：</div>
                                        <div class="editContent">{{announcementName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购信息日期：</div>
                                        <div class="editContent">{{updateTime}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交日期：</div>
                                        <div class="editContent">{{calibrationDate}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">谈判小组/询价小组/采购人员名单：</div>
                                        <div class="editContent">{{personnels}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{leaderContactInformation}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">{{remarks}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 成交信息 总包-->
                        <el-collapse-item title="成交信息" name="4" v-show="!diffFlag">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">{{purchaseAmount}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购用途：</div>
                                        <div class="editContent">{{purchasePurposes}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">技术/服务要求：</div>
                                        <div class="editContent">{{technologyQualifications}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主要成交标的：</div>
                                        <div class="editContent">{{mainWinningBid}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">单价：</div>
                                        <div class="editContent">{{unitPrice}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">数量：</div>
                                        <div class="editContent">{{number}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">规格型号：</div>
                                        <div class="editContent">{{specificationType}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">合同履行期：</div>
                                        <div class="editContent">{{contractPerformancePeriod}}至{{contractPerformanceEnd}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交单位名称：</div>
                                        <div class="editContent">{{nameOfSuccessfulSupplier}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交单位地址：</div>
                                        <div class="editContent">{{addressOfSuccessfulSupplier}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交金额（小写）：</div>
                                        <div class="editContent">{{winningAmountLowercase}}元</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 成交信息 分包 -->
                        <el-collapse-item title="成交信息" name="4" v-show="diffFlag">
                            <div class="edit_list">
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
                                        prop="subcontractName"
                                        label="分包名称">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="subcontractingControlAmount"
                                        label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column
                                        prop="entrySubcontractNumber"
                                        label="入场项目(分包)编号"
                                        :show-overflow-tooltip = 'true'
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="成交信息">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="winlookItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 公告内容 -->
                        <el-collapse-item title="公告内容" name="5">
                            <div class="edit_list">
                                <div class="infobox_title">
                                    <span>{{nameOfTenderProject}}</span>
                                    <h1>成交结果公告</h1>
                                    <p>{{saveTime}}</p>
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
                                        <div class="editName" style="font-weight:bold;">招标(采购)人</div>
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
                                        <div class="editContent">{{address}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人联系方式：</div>
                                        <div class="editContent">{{tendereeContactInformation}}</div>
                                    </div>
                                </div>
                                <div v-if="biddingOrganization == '委托招标'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:152px;">招标(采购)代理机构全称：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:152px;">招标(采购)代理机构地址：</div>
                                            <div class="editContent">{{agentAddress}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:178px;">招标(采购)代理机构联系方式：</div>
                                            <div class="editContent">{{agentPhone}} </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="infobox_item">
                                    <h3>成交内容</h3>
                                    <!-- 表格 -->
                                    <table border="1" cellspacing="0" cellpadding="0" style="width:100%;">
                                        <tr>
                                            <td>招标项目名称</td>
                                            <td colspan="3">{{nameOfTenderProject}}</td>
                                        </tr>
                                        <!-- 分包 -->
                                        <tr v-show="diffFlag">
                                            <td style="width:150px;">入场项目分包编号</td>
                                            <td style="width:150px;">{{entrySubcontractNumber}}</td>
                                            <td style="width:150px;">项目预算金额</td>
                                            <td style="width:150px;">{{budgetAmount}}万元</td>
                                        </tr>
                                        <!-- 总包 -->
                                        <tr v-show="!diffFlag">
                                            <td style="width:150px;">入场项目编号</td>
                                            <td style="width:150px;">{{totalProjectNumber}}</td>
                                            <td style="width:150px;">项目预算金额</td>
                                            <td style="width:150px;">{{budgetAmount}}万元</td>
                                        </tr>
                                        <tr>
                                            <td>用途</td>
                                            <td>{{purchasePurposes}}</td>
                                            <td>数量</td>
                                            <td>{{purchaseAmount}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">谈判小组/询价小组/采购人员名单</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" height="50px">{{personnels}}</td>
                                        </tr>
                                        <tr>
                                            <td>主要成交标的</td>
                                            <td>{{mainWinningBid}}</td>
                                            <td>单价</td>
                                            <td>{{unitPrice}}元</td>
                                        </tr>
                                        <tr>
                                            <td>数量</td>
                                            <td>{{number}}</td>
                                            <td>规格型号</td>
                                            <td>{{specificationType}}</td>
                                        </tr>
                                        <tr>
                                            <td>合同履行期</td>
                                            <td colspan="3">{{contractPerformancePeriod}}至{{contractPerformanceEnd}}</td>
                                        </tr>
                                        <tr>
                                            <td>成交单位名称</td>
                                            <td colspan="3">{{nameOfSuccessfulSupplier}}</td>
                                        </tr>
                                        <tr>
                                            <td>成交单位地址</td>
                                            <td colspan="3">{{addressOfSuccessfulSupplier}}</td>
                                        </tr>
                                        <tr>
                                            <td>成交金额</td>
                                            <td colspan="3">{{winningAmountLowercase}}元</td>
                                        </tr>
                                    </table>
                                </div>
                                <!-- <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">成交候选人公示期：</div>
                                        <div class="editContent">{{publicityStartTime}}至{{publicityEndTime}}</div>
                                    </div>
                                </div> -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">项目联系人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">联系方式：</div>
                                        <div class="editContent">{{leaderContactInformation}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">备注说明：</div>
                                        <div class="editContent">{{remarks}}</div>
                                    </div>
                                </div>
                                <div class="infobox_footer">
                                    <h3>{{creatorCompanyName}}</h3>
                                    <h3>{{saveTime}}</h3>
                                </div>
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
        <!-- 查看详情 -->
        <div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
                <div class="pick_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!--分包信息 -->
                        <el-collapse-item title="分包信息" name="1">
                            <div class="edit_list">
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
        <!-- 查看成交信息详情 分包 -->
        <div class="lookWrapper" v-show="searchwinFlag">
            <div class="winBox">
                <div class="pick_title">
                    <p>成交信息</p>
                    <i class="el-icon-close" @click="closeWinsearch"></i>
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
                                        <div class="editName">采购采购方式：</div>
                                        <div class="editContent">{{biddingProcurementMode}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购组织方式：</div>
                                        <div class="editContent">{{biddingOrganization}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 成交信息-->
                        <el-collapse-item title="成交信息" name="2">
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
                                        <div class="editContent">{{subcontractingControlAmount}}万元 </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目分包编号：</div>
                                        <div class="editContent">{{entrySubcontractNumber}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">{{purchaseAmount}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">拟采购货物/服务说明：</div>
                                        <div class="editContent">{{purchasePurposes}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">技术/服务要求：</div>
                                        <div class="editContent">{{technologyQualifications}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">主要成交标的：</div>
                                        <div class="editContent">{{mainWinningBid}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">单价：</div>
                                        <div class="editContent">{{unitPrice}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">数量：</div>
                                        <div class="editContent">{{number}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">规格型号：</div>
                                        <div class="editContent">{{specificationType}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"> 合同履行期：</div>
                                        <div class="editContent">{{contractPerformancePeriod}}至{{contractPerformanceEnd}}</div>
                                    </div>
                                </div>
                            <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">成交供应商名称：</div>
                                        <div class="editContent">{{nameOfSuccessfulSupplier}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">成交供应商地址：</div>
                                        <div class="editContent">{{addressOfSuccessfulSupplier}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交金额(小写)：</div>
                                        <div class="editContent">
                                            <p style="color:#6e622e;">人民币{{winningAmountLowercase}}元</p>
                                        </div>
                                    </div>
                                    <div class="editCenter" >
                                        <div class="editName" style="color:#6e622e;padding:0 5px;">大写</div>
                                        <div class="editContent" style="color:#f00;">{{winningAmountCapitalization}}</div>
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
                biddingPurchasingAgencyName:'',
                agentAddress :'',
                agentPhone : '',
                subcontractName:'',//分包名称
                subcontractContents:'',//分包内容
                scopeOfTender:'',//采购范围
                subcontractingControlAmount:'',//分包金额
                qualificationExaminationMethod:'',
                electronicBidEvaluation:'',//是否电子化开评标
                amountId:'',//编号
                searchwinFlag:false,
                lookFlag:false,
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6'],
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
                    appendixName: "成交结果公告",
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
                diffFlag:false,// 控制总包还是分包
                // 成交结果公告所需字段
                address:'',// 招标人地址
                tendereeContactInformation:'',// 招标人联系方式
                announcementName:'',//֖ 公告名称
                updateTime:'',// 采购信息日期
                calibrationDate:'',//֖成交日期
                projectLeader:'',// 项目负责人
                leaderContactInformation:'',//֖项目负责人联系方式
                remarks:'',//֖备注
                mainWinningBid:'',// 主要成交标的
                unitPrice:'',//֖单价
                number:'',//数量
                specificationType:'',//规格型号
                contractPerformancePeriod:'',// 合同履行期开始
                contractPerformanceEnd:'',// 合同履行期结束
                nameOfSuccessfulSupplier:'',//成交供应商
                addressOfSuccessfulSupplier:'',//成交供应商地址
                winningAmountLowercase:'',//成交金额 小写
                winningAmountCapitalization:'',//成交金额 大写
                creatorCompanyName:'',// 创建人名字
                saveTime:'',// 保存时间
                //成交候选人
                technologyQualifications:'',// 技术/服务要求
                personnels:'',
                purchaseAmount:'',// 采购数量
                purchasePurposes:'',//采购用途
                // 分包信息
                subpackageData:[],
                lookArr:[],// 后端返回的分包编号
                // 公告内容
                publicityStartTime:'',// 成交候选人公示期开始
                publicityEndTime:'',// 成交候选人公示期结束
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
            this.getCandidateInfo(); // 获取成交候选人记录数据
            
            this.getOneList();//招标（采购）人确认函附件
            this.getTwoList();// 成交结果公告附件
            this.getinformation();// 成交结果公告信息
            this.getmanageInfo();// 办理记录
            if(this.entrySubcontractNumber !=null){
                // 分包
                this.diffFlag = true;
                this.getsubpackageInfo();// 分包信息查询
            }else{
                // 总包
                this.diffFlag = false;
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
                    winnResultId:this.referenceId,
                    state:'办理通过',
                    operationFlow:'成交结果公告'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/winnResultController/submit',
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
                     winnResultId:this.referenceId,
                    state:'办理未通过',
                    operationFlow:'成交结果公告'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/winnResultController/submit',
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
            // 通过关联ID查询入场项目编号
            getpageInfo(){
                this.$axios({
                    method:'GET',
                    url:baseUrl+"/winnResultController/select/"+this.referenceId
                }).then(res=>{
                    if(res.data.status == 200){
                        this.agentAddress = res.data.data.agentAddress;
                        this.agentPhone = res.data.data.agentPhone;
                        this.personnels = res.data.data.personnels;
                        this.address= res.data.data.address;
                        this.announcementName= res.data.data.announcementName;// 公告名称
                        this.leaderContactInformation=res.data.data.leaderContactInformation;
                        this.projectLeader=res.data.data.projectLeader;// 项目负责人
                        this.remarks=res.data.data.remarks; // 备注
                        this.tendereeContactInformation=res.data.data.tendereeContactInformation;// 联系方式
                        // 采购信息日期
                        if(res.data.data.updateTime !=null){
                            this.updateTime = dayjs(res.data.data.updateTime).format('YYYY-MM-DD');
                        }
                        // 成交日期
                        if(res.data.data.calibrationDate !=null){
                            this.calibrationDate = dayjs(res.data.data.calibrationDate).format('YYYY-MM-DD');
                        }
                        this.creatorCompanyName = res.data.data.creatorCompanyName;// 创建人名字
                        this.saveTime = dayjs(res.data.data.saveTime).format('YYYY-MM-DD');// 创建时间
                        let arr = [];
                        res.data.data.items.forEach(area=>{
                            // if(this.totalProjectNumber == area.projectCode){
                                this.mainWinningBid=area.mainWinningBid;// 主要成交标的
                                this.unitPrice=area.unitPrice;// 单价
                                this.number=area.number;// 数量
                                this.specificationType=area.specificationType;// 规格型号
                                if(area.contractPerformancePeriod !=null){
                                    this.contractPerformancePeriod=dayjs(area.contractPerformancePeriod).format('YYYY-MM-DD');// 合同履行期开始
                                }
                                if(area.contractPerformanceEnd !=null){
                                    this.contractPerformanceEnd=dayjs(area.contractPerformanceEnd).format('YYYY-MM-DD');// 合同履行期结束
                                }
                                this.nameOfSuccessfulSupplier=area.nameOfSuccessfulSupplier;// 成交供应商名称
                                this.addressOfSuccessfulSupplier=area.addressOfSuccessfulSupplier;//成交供应商地址
                                this.winningAmountLowercase=area.winningAmountLowercase;// 成交金额小写
                                this.winningAmountCapitalization=area.winningAmountCapitalization;// 成交金额大写
                            // }else if (area.entrySubcontractNumber != null){
                            //     arr.push(area.entrySubcontractNumber)
                            // }
                            
                        })  
                        this.lookArr = arr;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            // 获取成交候选人记录数据
            getCandidateInfo(){
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
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/winnCandidaController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.length>0){
                            res.data.data.forEach(item => {
                                this.publicityStartTime = dayjs(item.publicityStartTime).format('YYYY-MM-DD');// 公示开始日期
                                this.publicityEndTime = dayjs(item.publicityEndTime).format('YYYY-MM-DD');// 公示结束日期
                            });
                        }
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 分包信息查询
            getsubpackageInfo(){
                let entryNum = [];
                entryNum.push(this.entrySubcontractNumber)
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:{
                        projectEntrySubcontractNumbers:entryNum
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
            // 查看
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
            // 查看成交信息---> 分包
            winlookItem(row){
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额
                this.subcontractName = row.subcontractName;// 分包名称
                // let flag = true;
                // let areaItem = {};
                // this.areaList.forEach(area=>{
                //     if(row.entrySubcontractNumber == area.entrySubcontractNumber){
                //         flag = false;
                //         areaItem = area;
                //         this.winnResultItemId= area.winnResultItemId;// 成交信息ID
                //     }
                // })
                // if(flag){
                //     this.winnResultItemId= areaItem.winnResultItemId;// 成交信息ID
                // }
                // this.searchwinArea();// 查看成交信息详情
                this.searchwinFlag = true;
            },
            // 查看成交信息详情
            searchwinArea(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/winnResultController/selectItem/"+this.referenceId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.mainWinningBid=res.data.data.mainWinningBid;// 主要成交标的
                        this.unitPrice=res.data.data.unitPrice;// 单价
                        this.number=res.data.data.number;// 数量
                        this.specificationType=res.data.data.specificationType;// 规格型号
                        if(res.data.data.contractPerformancePeriod !=null){
                            this.contractPerformancePeriod=dayjs(res.data.data.contractPerformancePeriod).format('YYYY-MM-DD');// 合同履行期开始
                        }
                        if(res.data.data.contractPerformanceEnd !=null){
                            this.contractPerformanceEnd=dayjs(res.data.data.contractPerformanceEnd).format('YYYY-MM-DD');// 合同履行期结束
                        }
                        this.nameOfSuccessfulSupplier=res.data.data.nameOfSuccessfulSupplier;// 成交供应商名称
                        this.addressOfSuccessfulSupplier=res.data.data.addressOfSuccessfulSupplier;//成交供应商地址
                        this.winningAmountLowercase=res.data.data.winningAmountLowercase;// 成交金额小写
                        this.winningAmountCapitalization=res.data.data.winningAmountCapitalization;// 成交金额大写
                        this.idOfSuccessfulSupplier = res.data.data.idOfSuccessfulSupplier;//成交供应商ID;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 成交结果公告信息
            getinformation(){
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
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.length>0){
                            if(res.data.data[0].items.length >0){
                                res.data.data[0].items.forEach(item=>{
                                    this.technologyQualifications=item.technologyQualifications;// 技术/服务要求
                                    this.purchaseAmount=item.purchaseAmount;// 采购数量
                                    this.purchasePurposes=item.purchasePurposes;// 采购用途
                                })
                            }
                        }
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
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
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            // 招标（采购）人确认函附件
            getOneList(){
                let object = {};
                if(this.entrySubcontractNumber!=null){
                    // 分包
                    object={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'招标（采购）人确认函'
                    }
                }else{
                    // 总包
                    object={
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
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //  成交结果公告附件
            getTwoList(){
                let object = {};
                if(this.entrySubcontractNumber!=null){
                    // 分包
                    object={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'成交结果公告'
                    }
                }else{
                    // 总包
                    object={
                        relevanceCorrelationId:this.totalItemId,
                        fileType:'成交结果公告'
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
            closeLook(){
                this.lookFlag = false;
            },
            closeWinsearch(){
                this.searchwinFlag = false;
            }
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
    line-height: 50px;
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
.searchBox,.lookBox,.winBox{
    width: 97%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.pick_title,.search_title{
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