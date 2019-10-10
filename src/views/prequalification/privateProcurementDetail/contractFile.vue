<template>
    <div class="myDiv">
        <!-- 合同备案 -->
        <div  v-show="passJudgeShow" style="height:100%;">
            <!-- 上一步弹框 -->
            <div v-show="writeFlag" style="height:100%;">
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="saveFile()">保存</button>
                    <button class="nav_co nav_next" @click="nextTo()">下一步</button>
                </div>
                <div class="new_main">
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
										<div class="editName">招标(采购)人：</div>
										<div class="editContent">{{tenderPurchaserName}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">采购项目金额(万元)：</div>
										<div class="editContent">{{amountOfBiddingProject}}</div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">采购项目编号：</div>
										<div class="editContent">{{biddingProjectNumber}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">入场项目编号：</div>
										<div class="editContent">{{totalProId}}</div>
									</div>
								</div>
                                <!-- 表格 -->
                                <div class="table_box"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                    <el-table :data="subpakegeData" stripe style="width: 100%">
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractName"  label="分包名称">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="font-size:16px;cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 中标人信息 -->
                        <el-collapse-item title="中标人信息" name="2">
                            <el-table :data="winningBidData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column label="中标单位名称" width="150">
                                    <template slot-scope="scope">
                                        <span>{{nameOfSuccessfulSupplier}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="projectLeader" label="项目负责人" >
                                </el-table-column>
                                <el-table-column label="中标金额(万元)" >
                                     <template slot-scope="scope">
                                        <span>{{winningAmountLowercase}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="winningBidPeriod" label="工期(日历天)" >
                                </el-table-column>
                                <el-table-column prop="qualityGradeOfWinningBid" label="质量等级" >
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 合同信息 -->
                        <el-collapse-item title="合同信息" name="3">
                            <div class="edit_list">
                                <!-- <div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>是否公示：</div>
										<div class="editContent">
                                            <el-radio-group v-model="isPublicity">
                                                <el-radio label="是">是</el-radio>
                                                <el-radio label="否">否</el-radio>
                                            </el-radio-group>
                                        </div>
									</div>
								</div> -->
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>合同编号：</div>
										<div class="editContent">
                                            <el-input v-model="contractCode" clearable></el-input>
                                        </div>
									</div>
                                    <div class="editCenter">
										<div class="editName"><p class="star">*</p>合同名称：</div>
										<div class="editContent">
                                            <el-input v-model="contractName" clearable></el-input>
                                        </div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>合同金额(元)：</div>
										<div class="editContent">
                                            <el-input v-model="contractAmount" clearable></el-input>
                                        </div>
									</div>
                                    <div class="editCenter">
										<div class="editName"><p class="star">*</p>合同期限(日历天)：</div>
										<div class="editContent">
                                            <el-input v-model="contractDeadline" clearable></el-input>
                                        </div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>合同签署时间：</div>
										<div class="editContent">
                                            <el-date-picker v-model="contractSignTime"  type="date" :picker-options="pickerOptions0" placeholder="选择日期">
                                            </el-date-picker>
                                        </div>
									</div>
                                    <div class="editCenter">
										<div class="editName"><p class="star">*</p>洽谈地点：</div>
										<div class="editContent">
                                            <el-input v-model="discussLocation" clearable></el-input>
                                        </div>
									</div>
								</div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">质量要求：</div>
                                        <div class="editContent">
                                            <el-input v-model="qualityRequirements" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">合同主要内容：</div>
                                        <div class="editContent">
                                            <el-input v-model="contractContent" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">
                                            <el-input v-model="remark" type="textarea" :rows="3" ></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 下一步弹框 -->
            <div class="main_box" v-show="nextFlag">
                <div class="new_nav new_nav_box">
                    <button class="nav_co nav_next" @click="backTo()">上一步</button>
                    <button class="nav_co nav_sub" @click="submit()">提交</button>
                </div>
                <div class="new_main">
                    <!-- 采购项目信息 -->
                    <el-collapse v-model="activeName1" accordion>
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
										<div class="editName">招标(采购)人：</div>
										<div class="editContent">{{tenderPurchaserName}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">招标项目金额(万元)：</div>
										<div class="editContent">{{amountOfBiddingProject}}</div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">采购项目编号：</div>
										<div class="editContent">{{biddingProjectNumber}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">入场项目编号：</div>
										<div class="editContent">{{totalProId}}</div>
									</div>
								</div>
                                <!-- 表格 -->
                                <div class="table_box"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                    <el-table :data="subpakegeData" stripe style="width: 100%">
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractName"  label="分包名称">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="font-size:16px;cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="2">
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
                                <el-table-column fixed="right" label="操作" width="100"  v-if="this.zhuangtai != '办理通过'">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 中标人信息 -->
                        <el-collapse-item title="中标人信息" name="3">
                            <el-table :data="winningBidData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column label="中标单位名称" width="150">
                                    <template slot-scope="scope">
                                        <span>{{nameOfSuccessfulSupplier}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="projectLeader" label="项目负责人" >
                                </el-table-column>
                                <el-table-column label="中标金额(万元)" >
                                     <template slot-scope="scope">
                                        <span>{{winningAmountLowercase}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="winningBidPeriod" label="工期(日历天)" >
                                </el-table-column>
                                <el-table-column prop="qualityGradeOfWinningBid" label="质量等级" >
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 合同信息 -->
                        <el-collapse-item title="合同信息" name="4">
                            <div class="edit_list">
                                <!-- <div class="editItem">
									<div class="editCenter">
										<div class="editName">是否公示：</div>
										<div class="editContent">{{isPublicity}} </div>
									</div>
								</div> -->
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">合同编号：</div>
										<div class="editContent">{{contractCode}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">合同名称：</div>
										<div class="editContent">{{contractName}}</div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">合同金额(元)：</div>
										<div class="editContent">{{contractAmount}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">合同期限(日历天)：</div>
										<div class="editContent">{{contractDeadline}}</div>
									</div>
								</div>
                                <div class="editItem">
									<div class="editCenter">
										<div class="editName">合同签署时间：</div>
										<div class="editContent">{{contractSignTime}}</div>
									</div>
                                    <div class="editCenter">
										<div class="editName">洽谈地点：</div>
										<div class="editContent">{{discussLocation}}</div>
									</div>
								</div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">质量要求：</div>
                                        <div class="editContent">{{qualityRequirements}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">合同主要内容：</div>
                                        <div class="editContent">{{contractContent}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公司内容 -->
                        <el-collapse-item title="公示内容" name="5">
                            <div class="new_m_b">
                                <div class="new_m_b2" style="width:80%;">
                                    <div class="fail_box">
                                        <div>{{nameOfTenderProject}}</div>
                                        <div>合同公示</div>
                                        <div style="font-size:14px;font-weight:normal;color:#333;">{{createTime}}</div>
                                    </div>
                                    <!-- 招标（采购）项目名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）项目名称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标（采购）项目编号： -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）项目编号：</div>
                                            <div class="noteFlex">
                                                <span>{{biddingProjectNumber}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标（采购）项目预算金额 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）项目预算金额(万元)：</div>
                                            <div class="noteFlex">
                                                <span>{{budgetAmount}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标采购人 -->
                                    <div style="font-weight:bold;">招标(采购)人</div>
                                    <!--招标（采购）人全称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）人全称：</div>
                                            <div class="noteFlex">
                                                <span>{{tenderPurchaserName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标（采购）人地址  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）人地址：</div>
                                            <div class="noteFlex">
                                                <span>{{address}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标（采购）人联系方式  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）人联系方式：</div>
                                            <div class="noteFlex">
                                                <span>{{contactInformation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                        <!-- 招标（采购）代理机构 -->
                                        <div style="font-weight:bold;">招标（采购）代理机构</div>
                                        <!--招标（采购）代理机构全称  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft" style="width:220px;">招标（采购）代理机构全称：</div>
                                                <div class="noteFlex">
                                                    <span>{{biddingPurchasingAgencyName}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!--招标（采购）代理机构地址  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft" style="width:220px;">招标（采购）代理机构地址：</div>
                                                <div class="noteFlex">
                                                    <span>{{agentAddress}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!--招标（采购）代理机构联系方式  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft" style="width:220px;">招标（采购）代理机构联系方式：</div>
                                                <div class="noteFlex">
                                                    <span>{{agentPhone}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 中标人（成交供应商） -->
                                    <div style="font-weight:bold;">中标人（成交供应商）</div>
                                    <!--中标人（成交供应商）全称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">中标人（成交供应商）全称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfSuccessfulSupplier}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--中标人（成交供应商）地址  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">中标人（成交供应商）地址：</div>
                                            <div class="noteFlex">
                                                <span>{{addressOfSuccessfulSupplier}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--中标人（成交供应商）联系方式  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">中标人（成交供应商）联系方式：</div>
                                            <div class="noteFlex">
                                                <span>{{phoneOfSuccessfulSupplier}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同内容 -->
                                    <div style="font-weight:bold;">合同内容</div>
                                    <!--合同编号  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同编号：</div>
                                            <div class="noteFlex">
                                                <span>{{contractCode}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--合同名称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同名称：</div>
                                            <div class="noteFlex">
                                                <span>{{contractName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--合同金额  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同金额(元)：</div>
                                            <div class="noteFlex">
                                                <span>{{contractAmount}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--合同期限  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同期限(天)：</div>
                                            <div class="noteFlex">
                                                <span>{{contractDeadline}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同签署时间 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同签署时间：</div>
                                            <div class="noteFlex">
                                                <span>{{contractSignTime}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 洽谈地点 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">洽谈地点：</div>
                                            <div class="noteFlex">
                                                <span>{{discussLocation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 质量要求 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">质量要求：</div>
                                            <div class="noteFlex">
                                                <span>{{qualityRequirements}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同主要内容 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同主要内容：</div>
                                            <div class="noteFlex">
                                                <span>{{contractContent}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 备注说明 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">备注说明：</div>
                                            <div class="noteFlex">
                                                <span>{{remark}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 项目联系人 -->
                                    <div class="noteBox" style="margin-top:20px;">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:150px;font-weight:bold;">项目联系人：</div>
                                            <div class="noteFlex">
                                                <span style="font-weight:bold;">{{contacts}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 联系方式 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:150px;font-weight:bold;">联系方式：</div>
                                            <div class="noteFlex">
                                                <span style="font-weight:bold;">{{contactInformation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--备注  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:150px;font-weight:bold;">备注：</div>
                                            <div class="noteFlex">
                                                <span>{{remark}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--名称和日期  -->
                                    <div style="font-weight:bold;text-align:right;width:100%;">
                                        <div>{{creatorCompanyName}}</div>
                                        <div>{{createTime}}</div>
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
            
            <!-- 点击提交 -->
            <el-dialog title="系统提示" :visible.sync="dialogShow" width="40%" :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>提交成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitFile">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 点击保存 -->
            <el-dialog title="系统提示" :visible.sync="saveShow" width="40%" :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>保存成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="saveSure()">确 定</el-button>
                </span>
            </el-dialog> 
            <!-- 合同备案 -->
            <el-dialog
                title="系统提示"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>尚未完成采购文件备案，无法进行合同备案！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 查看分包信息弹框 -->
            <div v-show="subcontractInforShow" class="fb_box">
                <div class="new_head">
                    <div style="padding-left:10px;">分包信息</div>
                    <div @click="closeSubShow" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_main">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 第一步 -->
                        <el-collapse-item title="采购项目信息" name="1">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!--名称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">采购项目名称：</div>
                                        <div class="noteFlex">
                                            <span>{{nameOfTenderProject}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 采购人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标(采购)人：</div>
                                            <div class="noteFlex">
                                                <span>{{tenderPurchaserName}}</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;" v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                                <div class="noteLeft">招标(采购)代理机构：</div>
                                                <div class="noteFlex">{{biddingPurchasingAgencyName}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 采购及入场编号 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">采购项目编号：</div>
                                        <div class="noteFlex">
                                            <span>{{biddingProjectNumber}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:100px;">入场项目编号：</span>
                                            <span>{{totalProId}}</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第二步 -->
                        <el-collapse-item title="分包信息" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 标段包编号(赋码) -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft" style="color:#f00;">标段包编号(赋码)：</div>
                                        <div class="noteFlex">
                                            <span  style="color:#f00;">{{sectionPacketAssignment}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!--统一交易标志码  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft" style="color:#f00;">统一交易标志码：</div>
                                        <div class="noteFlex">
                                            <span  style="color:#f00;">{{unifiedTradingCode}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!--入场项目分包编号  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">入场项目分包编号：</div>
                                        <div class="noteFlex">
                                            <span>{{entrySubcontractNumber}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 分包名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">分包名称：</div>
                                        <div class="noteFlex">
                                            <span>{{subcontractName}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 分包内容 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">分包内容：</div>
                                        <div class="noteFlex">
                                            <span>{{subcontractContents}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 采购范围 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">采购范围：</div>
                                        <div class="noteFlex">
                                            <span>{{scopeOfTender}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!--分包控制金额及审查方式  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">分包控制金额：</div>
                                        <div class="noteFlex">
                                            <span>{{subcontractingControlAmount}}万元</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:100px;">资格审查方式：</span>
                                            <span>{{qualificationExaminationMethod}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!--电子化开评标  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">电子化开评标：</div>
                                        <div class="noteFlex">
                                            <span>{{electronicBidEvaluation}}</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 上传文件 -->
        <div class="uploadWrapper" v-show="uploadFlag">
			<div class="uploadBox">
				<div class="upload_title">
					<p>{{uploadTitle}}</p>
					<i class="el-icon-close" @click="closeUpload"></i>
				</div>
				<div class="upload_btn">
					 <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
					 <button class="btn">上传</button>
					<button class="btn" @click="deleteFile">删除</button>
				</div>
				<div class="main_info" style="display:flex;flex-direction:column;">
					<el-table :data="fileData" style="width: 100%"  @selection-change="handleUploadChange">
						<el-table-column type="selection" width="55" align='center'>
						</el-table-column>
						<el-table-column width="70" label="序号">
							<template slot-scope="scope">{{ scope.$index+1 }}</template>
						</el-table-column>
						<el-table-column prop="fileName" label="文件名称"  width="180">
						</el-table-column>
						<el-table-column  prop="fileSize" label="文件大小">
						</el-table-column>
						<el-table-column  prop="uploadingPeople" label="上传人">
						</el-table-column>
						<el-table-column  prop="formatTime" label="上传时间"  width="170">
						</el-table-column>
						<el-table-column prop="operation" label="下载">
							<template slot-scope="scope">
								<span class="upload" @click="downloadFile(scope.row.attachmeId,scope.row.fileName)">点击下载</span>
							</template>
						</el-table-column>
					</el-table>
					<p class="star">★：附件上传大小限制为102400000 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
				</div>
			</div>
		</div>
        <div v-show="frameShow">
            <el-dialog
                title="系统提示"
                :visible.sync="frameShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>{{alertMsg}}</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleClose()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import baseUrl from '../../../api/api'
import dayjs from "dayjs"
import {checkNumber} from '../../../api/base'
  export default {
    
    data() {
      return {
            str_entrust_type:window.sessionStorage.str_entrust_type,
            agentAddress : '',
            agentPhone :'',
            role_types:window.localStorage.role_types,
            biddingPurchasingAgencyName:'',
            pickerOptions0: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
          creatorCompanyName:'',
          scopeOfTender:'',//招标范围
          subcontractingControlAmount:'',//分包控制金额
          qualificationExaminationMethod:'',//资格审查方式
          electronicBidEvaluation:'',//电子化开评标
          subcontractContents:'',//分包内容
          subcontractName:'',//分包名称
          entrySubcontractNumber:'',//入场项目编号
          unifiedTradingCode:'',//统一交易标志码
          sectionPacketAssignment:'',//标段码编号
          tenderPurchaserName:'',//招标采购人
          subcontractInforShow:false,
          alertMsg:'',
          cancelShow:false,
          subpakegeData:[],
        winningBidData:[],//中标信息数据
        winningBidDataItems:[],// items
        nameOfSuccessfulSupplier:'',// 中标单位名称
        winningAmountLowercase:'',// 中标金额
        projectLeader:'', // 项目负责人
        frameShow:false,
        passJudgeShow:true,
        projectObj:JSON.parse(window.localStorage.projectObj),
        saveShow:false,
        dialogVisible: false,
        dialogShow:false,
        activeName:['1','2','3','4','5'],
        activeName1:['1','2','3','4','5','6'],
        writeFlag:true,//上一步弹框
        nextFlag:false,//下一步弹框
        appendixData:[
            {
                appendixName:'合同签署',
                list:''
            }
        ],//相关附件弹框
        currentPage:1,//当前页
        manageDate:[],//办理记录数据
        nameOfTenderProject:'',//招标项目名称
        tenderPurchaserName:'',//招标采购人
        amountOfBiddingProject:'',//招标项目金额
        biddingProjectNumber:'',//招标项目编号
        totalProId:'',//入场项目编号
        budgetAmount:'',//预算金额
        address:'',//招标人地址
        contacts:'',//联系人
        contactInformation:"",//联系方式
        isPublicity:'',//是否公示
        contractCode:'',//合同编号
        contractName:'',//合同名称
        contractAmount:'',//合同金额
        contractDeadline:'',//合同期限
        contractSignTime:'',//合同签署时间
        discussLocation:'',//洽谈地点
        qualityRequirements:'',//质量要求
        contractContent:'',//合同主要内容
        remark:'',//备注说明
        contractId:'',//合同备案id
        createTime:'',//点击下一步返回的时间
        // 文件上传所需字段
        enclosureData:[{
            appendixName: "*合同签署",
            attachlist: []
        }
        ],
        uploadFlag:false,//
        uploadTitle:'',
        state:'', 
        num:'',
        files:{},//文件
        fileName:'',//上传文件名称
        fileSize:'',//上传文件大小
        uploadingPeople:'',//上传人
        uploadTime:'',//上传时间
        fileData:[],//上传文件表格
        attachmeId:[],// 选中的ID
        zhuangtai:'',
        addressOfSuccessfulSupplier:"",// 成交供应商地址
        nameOfSuccessfulSupplier:'',// 供应商名称
        phoneOfSuccessfulSupplier:'',// 联系方式
        
      };
    },
    created(){
        this.getDecideList();
        this.getbiddingInfo();// 招标项目信息
        // this.getInitInfo();// 初始化查询
        this.getmanageInfo();//办理记录查询
        this.getWiningInforList();//中标信息
        this.uploadList();//上传列表
        this.getsubList();
    },
    methods: {
        // 招标项目信息
        getbiddingInfo(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                    this.totalProId = res.data.data.totalProjectId;//入场项目编号
                    this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
                    this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                    this.tenderContents = res.data.data.tenderContents;// 招标内容
                    this.budgetAmount = res.data.data.budgetAmount;//预算金额
                    this.contactInformation = res.data.data.contactInformation//联系方式
                    this.contacts = res.data.data.contacts//联系人
                    this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //招标项目信息--》表格分包
        getsubList(){
            let lookArr = [];
            lookArr.push(this.projectObj.totalProjectId);
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:lookArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.subpakegeData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //中标信息
        getWiningInforList(){
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
                method:'POST',
                url:baseUrl + '/winnResultController/select',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.winningBidData = res.data.data;
                    let proNum = '';
                    res.data.data.map((item,index)=>{
                        this.projectLeader = item.projectLeader;// 项目负责人
                        this.winningBidDataItems = item.items;
                        this.address = item.address;// 招标（采购）人地址
                        this.agentAddress = item.agentAddress;
                        this.agentPhone = item.agentPhone;
                    })

                    this.winningBidDataItems.forEach((item)=>{
                        this.nameOfSuccessfulSupplier = item.nameOfSuccessfulSupplier;// 中标单位名称
                        this.winningAmountLowercase = item.winningAmountLowercase;// 中标金额
                        if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                            proNum = item.entrySubcontractNumber
                        }else{
                            proNum = item.projectCode
                        }
                        if(proNum == this.projectObj.totalProjectId){
                            this.addressOfSuccessfulSupplier = item.addressOfSuccessfulSupplier;
                            this.nameOfSuccessfulSupplier = item.nameOfSuccessfulSupplier;
                            this.phoneOfSuccessfulSupplier = item.phoneOfSuccessfulSupplier;
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
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
            return this.$axios({
                method:'POST',
                url:baseUrl+'/contractController/queryContract',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data.createTime == null){
                        this.createTime = ""
                    }else{
                        this.createTime = dayjs(res.data.data.createTime).format('YYYY-MM-DD');
                    }
                    
                    this.creatorCompanyName = res.data.data.creatorCompanyName;
                    this.contractCode = res.data.data.contractCode;
                    this.contractId = res.data.data.contractId;
                    this.zhuangtai = res.data.data.state;
                    if(res.data.data == null){
                        this.writeFlag = true;// 保存和下一步
                        this.nextFlag = false;// 上一步和提交
                    }else if(res.data.data.state == '编辑中' || res.data.data.state == '办理未通过'){
                        this.writeFlag = false;// 保存和下一步
                        this.nextFlag = true;// 上一步和提交
                        
                    }else if(res.data.data.state == '办理通过' || res.data.data.state == '待办理'){
                        this.writeFlag = false;// 保存和下一步
                        this.nextFlag = true;// 上一步和提交
                        $('.new_nav').hide();
                    }
                    this.isPublicity = res.data.data.isPublicity;// 是否公示
                    this.contractCode = res.data.data.contractCode;// 合同编号
                    this.contractName = res.data.data.contractName;// 合同名称
                    this.contractAmount = res.data.data.contractAmount;// 合同金额(元)
                    this.contractDeadline = res.data.data.contractDeadline;//合同期限(日历天)
                    this.discussLocation = res.data.data.discussLocation;// 洽谈地点
                    this.qualityRequirements = res.data.data.qualityRequirements;// 质量要求
                    this.contractContent = res.data.data.contractContent;// 合同主要内容
                    this.remark = res.data.data.remark;// 备注说明
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');// 合同签署时间
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //调用查询接口
        gettreatList(){
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
                method:'POST',
                url:baseUrl+'/contractController/queryContract',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.contractId = res.data.data.contractId;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //下一步
        nextTo(){
            if(!this.contractCode){
                this.$layer.msg('请填写合同编号');
                return false;
            }else if(!this.contractName){
                this.$layer.msg('请填写合同名称');
                return false;
            }else if(!this.contractAmount){
                this.$layer.msg('请填写合同金额');
                return false;
            }else if(!this.contractDeadline){
                this.$layer.msg('请填写合同期限');
                return false;
            }else if(!this.contractSignTime){
                this.$layer.msg('请填写合同签署时间');
                return false;
            }else if(!this.discussLocation){
                this.$layer.msg('请填写洽谈地点');
                return false;
            }
            if(!checkNumber(this.contractAmount)){
                this.$layer.msg('合同金额请输入数字类型')
            }else if(!checkNumber(this.contractDeadline)){
                this.$layer.msg('合同期限请输入数字类型')
            }
            
            let objectData = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                objectData={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    contractCode:this.contractCode,
                    contractName:this.contractName,
                    contractAmount:this.contractAmount,
                    contractDeadline:this.contractDeadline,
                    contractSignTime:new Date(this.contractSignTime).getTime(),
                    discussLocation:this.discussLocation,
                    contractContent:this.contractContent,// 合同主要内容
                    qualityRequirements:this.qualityRequirements,
                    remark:this.remark,
                    contractId:this.contractId,
                }
            }else{
                // 总包
                objectData={
                    projectCode:this.projectObj.totalProjectId,
                    contractCode:this.contractCode,
                    contractName:this.contractName,
                    contractAmount:this.contractAmount,
                    contractDeadline:this.contractDeadline,
                    contractSignTime:new Date(this.contractSignTime).getTime(),
                    contractContent:this.contractContent,// 合同主要内容
                    discussLocation:this.discussLocation,
                    qualityRequirements:this.qualityRequirements,
                    remark:this.remark,
                    contractId:this.contractId,
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/contractController/saveOrNextStep",
                data:objectData
            }).then(res=>{
                if(res.data.status == 200){
                    this.writeFlag = false;
                    this.nextFlag = true;
                    this.getmanageInfo();// 办理记录查询
                    this.gettreatList();
                    this.isPublicity = res.data.data.isPublicity;
                    this.contractCode = res.data.data.contractCode;
                    this.contractName = res.data.data.contractName;
                    this.contractAmount = res.data.data.contractAmount;
                    this.contractDeadline = res.data.data.contractDeadline;
                    this.discussLocation = res.data.data.discussLocation;
                    this.contractContent = res.data.data.contractContent;
                    this.qualityRequirements = res.data.data.qualityRequirements;
                    if(res.data.data.contractSignTime == null){
                        this.contractSignTime = ""
                    }else{
                         this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');
                    };
                    this.creatorName = res.data.data.creatorName;
                    this.contractId = res.data.data.contractId;
                    if(res.data.data.createTime == null){
                        this.createTime = ""
                    }else{
                         this.createTime = dayjs(res.data.data.createTime).format('YYYY-MM-DD');
                    };
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //保存
        saveFile(){
            if(!this.contractCode){
                this.$layer.msg('请填写合同编号');
                return false;
            }else if(!this.contractName){
                this.$layer.msg('请填写合同名称');
                return false;
            }else if(this.contractAmount =='' || this.contractAmount ==null || !checkNumber(this.contractAmount)){
                this.$layer.msg('请填写正确的合同金额');
                return false;
            }else if(this.contractDeadline ==''|| this.contractDeadline ==null || !checkNumber(this.contractDeadline)){
                this.$layer.msg('请填写正确的合同期限');
                return false;
            }else if(!this.contractSignTime){
                this.$layer.msg('请填写合同签署时间');
                return false;
            }else if(!this.discussLocation){
                this.$layer.msg('请填写洽谈地点');
                return false;
            }
            let objectData = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                objectData={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    contractCode:this.contractCode,
                    contractName:this.contractName,
                    contractAmount:this.contractAmount,
                    contractDeadline:this.contractDeadline,
                    contractSignTime:new Date(this.contractSignTime).getTime(),
                    discussLocation:this.discussLocation,
                    contractContent:this.contractContent,// 合同主要内容
                    qualityRequirements:this.qualityRequirements,
                    remark:this.remark,
                    contractId:this.contractId,
                }
            }else{
                // 总包
                objectData={
                    projectCode:this.projectObj.totalProjectId,
                    contractCode:this.contractCode,
                    contractName:this.contractName,
                    contractAmount:this.contractAmount,
                    contractDeadline:this.contractDeadline,
                    contractSignTime:new Date(this.contractSignTime).getTime(),
                    contractContent:this.contractContent,// 合同主要内容
                    discussLocation:this.discussLocation,
                    qualityRequirements:this.qualityRequirements,
                    remark:this.remark,
                    contractId:this.contractId,
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/contractController/saveOrNextStep",
                data:objectData
            }).then(res=>{
                if(res.data.status == 200){
                    this.writeFlag = true;
                    this.nextFlag = false;
                    this.saveShow = true;
                    this.isPublicity = res.data.data.isPublicity;
                    this.contractCode = res.data.data.contractCode;
                    this.contractName = res.data.data.contractName;
                    this.contractAmount = res.data.data.contractAmount;
                    this.contractDeadline = res.data.data.contractDeadline;
                    this.discussLocation = res.data.data.discussLocation;
                    this.contractContent = res.data.data.contractContent;
                    this.qualityRequirements = res.data.data.qualityRequirements;
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');
                    this.gettreatList();
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        saveSure(){
            this.saveShow = false;
        },
        //提交
        submit(){
            if(this.enclosureData[0].attachlist == ""){
				this.$layer.msg('请选择合同签署附件');
				return false;
			}
            this.$axios({
                method: "POST",
                url: baseUrl+"/contractController/submit",
                data:{
                    contractId:this.contractId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.dialogShow = true;
                    if(res.data.data.state == "待办理"){
                        this.nextFlag = true;
                        $('.new_nav_box').hide();
                    }else{
                        this.nextFlag = true;
                    }
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        submitFile(){
            this.dialogShow = false;
            this.getmanageInfo();//办理记录查询
        },
        //编号问题
        typeIndex(index) {
             return index + (this.currentPage - 1) * 10 + 1;
        },
        //上一步
        backTo(){
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
                method:'POST',
                url:baseUrl+'/contractController/queryContract',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.writeFlag = true;
                    this.nextFlag = false;
                    this.isPublicity = res.data.data.isPublicity;// 是否公示
                    this.contractCode = res.data.data.contractCode;// 合同编号
                    this.contractName = res.data.data.contractName;// 合同名称
                    this.contractAmount = res.data.data.contractAmount;// 合同金额(元)
                    this.contractDeadline = res.data.data.contractDeadline;//合同期限(日历天)
                    this.discussLocation = res.data.data.discussLocation;// 洽谈地点
                    this.qualityRequirements = res.data.data.qualityRequirements;// 质量要求
                    this.contractContent = res.data.data.contractContent;// 合同主要内容
                    this.remark = res.data.data.remark;// 备注说明
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');// 合同签署时间
                    this.contractId = res.data.data.contractId;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        handleClose(done) {
            this.frameShow = false;
            this.dialogShow = false;
            this.saveShow = false;
            this.dialogVisible = false;
            this.cancelShow = false;
        },
        //点击查看表格分包
        lookFile(row){
            this.subcontractInforShow = true;
            this.getbiddingInfo();
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            this.subcontractName = row.subcontractName;// 分包名称 
            this.subcontractContents = row.subcontractContents;// 分包内容
            this.scopeOfTender = row.scopeOfTender;// 招标范围
            this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额    
            this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
            this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标

        },
        closeSubShow(){
            this.subcontractInforShow = false;
        },
        getDecideList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/interfaceTableController/selfTendering',
                data:{
                    dropDownBox:'自行招标',
                    projectEntrySubcontractNumbers:this.projectObj.totalProjectId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    if(window.sessionStorage.str_entrust_type != '委托角色' && this.role_types != '招标(采购)代理'){
                        var obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '项目分包'){
                                obj.fenbao = item
                            }
                            if(item.value == '合同备案'){
                                obj.beian = item
                            }
                            if(item.value == '成交结果公告'){
                                obj.gonggao = item
                            }
                        })
                        if(obj.beian.state != '办理通过'){
                            this.alertMsg = '项目经办人尚未执行此操作，不可查看!'
                            this.passJudgeShow = false;
                            this.frameShow = true;
                        }else{
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        }
                    }else{
                        var obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '项目分包'){
                                obj.fenbao = item
                            }
                            if(item.value == '合同备案'){
                                obj.beian = item
                            }
                            if(item.value == '成交结果公告'){
                                obj.gonggao = item
                            }
                        })
                        
                        //招标勾且本业勾，可以看，
                        if(obj.zhaobiao.state == '办理通过' && obj.beian.state == '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        //如果上一步打钩，进一步判断
                        }else if(obj.gonggao.state == '办理通过' ){
                            //如果招标打钩，则本业必须打勾
                            if(obj.zhaobiao.state == '办理通过'&& obj.beian.state == '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                                //如果招标不打勾
                            }else if(obj.zhaobiao.state != '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                            }else{
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未完成成交结果公告,无法进行合同备案!'
                                }
                            }
                        }else{
                            //其他的都不能看
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成成交结果公告,无法进行合同备案!'
                            }
                        }
                    }
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 办理记录查询
        async getmanageInfo(){
            await this.getInitInfo() // 初始化查询
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.contractId
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.contractId
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
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName);
        },
        //上传列表
        uploadList(){
            var obj = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                obj={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'合同签署'
                }
            }else{
                // 入场项目编号
                obj={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'合同签署'
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
                    this.enclosureData[0].attachlist = arr;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        handleUploadChange(val){
            let deleteArr = [];
            for(let i in val){
                deleteArr.push(val[i].attachmeId);
            }
            this.attachmeId = deleteArr;
        },
        //删除文件列表
        deleteFile(){
            if(this.attachmeId.length<=0){
                this.$layer.msg('请选择要删除的文件!')
                return false;
            }else {
                this.$axios({
                    method: 'POST',
                    url: baseUrl + '/attachmeController/deleteAttachem',
                    data:{
                        attachmeId:this.attachmeId
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.uploadList();
                        for(var i=0;i<this.fileData.length;i++){
                            for(var j=0;j<this.attachmeId.length;j++){
                                if(this.fileData[i].attachmeId == this.attachmeId[j]){
                                    this.fileData.splice(i,1);
                                }
                            }
                        }
                }else{
                    this.$layer.msg(res.data.msg);
                }
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        //上传文件
        loadFile(event){
            var file = event.target.files[0];
            var fileSize = file.size; 
            if(fileSize > 102400000) {
                this.$layer.msg('图片大小不能超过102400000KB');
                return false;
            }
            this.$refs.file.value = null;
            this.files = file;
            var formData = new FormData();
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '合同签署');
            }else{
                // 入场项目编号
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                 formData.append("fileType", '合同签署');
            }
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/multifileUpload',
                data:formData
            }).then(res=>{
                if(res.data.status == 200){
                    this.uploadList();
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
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
        //新建弹框下一步中的点击附件
        goUploadPage(row,num){
            this.uploadFlag = true;
            this.num = num;
            this.uploadTitle = row.appendixName;// 标题
            this.uploadList();
        },
        // 关闭弹窗
        closeUpload(){
            this.uploadFlag = false;
            this.uploadList();
        },
    },
  };
</script>

<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.new_nav{
    background-color: #e2e2e2;
    height: 40px;
}
.nav_co {
  padding: 8px 20px;
  background-color: #0095d5;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.main_box{
    height: 100%;
    overflow: hidden;
}
.new_main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  overflow-x: scroll;
  margin-top:20px;
}
.new_m_one {
    width: 100%;
}
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #333;
  opacity: 0.3;
  overflow: hidden;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  background-color: rgb(0, 0, 0);
  filter: alpha(opacity=60);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 4;
}
.fb_box{
    border:7px solid #b2b2b2;
    /* border-bottom: none; */
    width: 85%;
    height: 92%;
    z-index: 5;
    position: absolute;
    top:5%;
    background:#f0f4f6;
    overflow: hidden;
}
.new_head {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #0058a9;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
.new_nav{
    background-color: #e2e2e2;
    height: 40px;
}
.new_m_t {
  width: 98%;
  height: 40px;
  line-height: 40px;
  background: #d1d1d1;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
   padding:0 10px;
}
.new_m_b{
    width: 100%;
    height: auto;
    padding-bottom: 10px;
    background: #ffffff;
}
.new_m_b2{
  width: 90%;
  margin:0 auto;
}
.noteBox {
  height: 40px;
  line-height: 40px;
  color: #333;
}
.noteBox .noteContent {
		display: flex;
		width: 100%;
}
	
.noteContent .noteLeft {
  display: inline-block;
}

.noteContent .noteFlex {
  flex: 1;
  flex-direction: column;
  display: inline-block;
}
.new_m_two{
  margin:10px 0;
}
.el-radio{
  height: 30px !important;
  line-height: 30px !important;
}
.el-radio:last-child{
  height: 30px !important;
  line-height: 30px !important;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.el-icon-warning,.el-icon-success{
    font-size: 100px;
    color: #0a5e9d;
}
.icon span{
    margin-left: 20px;
    font-size:18px;
}
.fail_box{
  width:100%;
  margin:0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px dashed #333;
}
.uploadWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding:50px;
    display: flex;
    flex-direction: column;
}
.uploadBox{
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.upload_title{
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
.upload_btn{
	width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
	position: relative;
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
.file_btn{
    position: absolute;
    right: 85px;
    top: 0;
    display: inline-block;
    border:none;
    outline: none;
    width: 7%;
    height:100%;
	background-color: transparent;
	filter: alpha(opacity=0);
	-moz-opacity: 0;
	-khtml-opacity: 0;
    opacity: 0;
    background: #0095d5;
    cursor: pointer;
}
.main_info{
    width: 100%;
    margin-top: 2px;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
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
.star{
    color: #f00;
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
.editContent>p{
    width: 30%;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
</style>

