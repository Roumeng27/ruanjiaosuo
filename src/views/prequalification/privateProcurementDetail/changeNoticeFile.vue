<template>
    <!-- 变更公告 -->
    <div class="newBox" style="overflow-y:hidden;height:100%;">
        <div  v-show="passJudgeShow" style="overflow-y:hidden;height:100%;">
            <!-- 上一步弹框 -->
            <div class="wrapper" v-show="writeFlag" style="overflow-y:hidden;height:100%;">
                <div class="box">
                    <button class="btn" @click="newly(1)">保存</button>
                    <button class="btn" @click="newly(2)">下一步</button>
                </div>
                <div style="overflow-y:scroll;height:100%;">
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
                                <div class="table_box" v-if="this.projectObj.totalProjectId.indexOf('-') != -1">
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
                                            <el-input v-model="tendereeAddress" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">
                                            <el-input v-model="tendereePhone" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div  v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
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
                                                <el-input v-model="agentAddress" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">联系方式：</div>
                                            <div class="editContent">
                                                <el-input v-model="agentPhone" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公告信息 -->
                        <el-collapse-item title="公告信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><span style="color:#f00;">*</span>公告名称：</div>
                                        <div class="editContent">
                                            <el-input v-model="noticeName" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><span style="color:#f00;">*</span>变更日期：</div>
                                        <div class="editContent">
                                            <el-date-picker 
                                                v-model="changesDate" 
                                                type="date" 
                                                placeholder="选择日期" 
                                                value-format = "timestamp"
                                                align="right" 
                                                :picker-options="pickerOptions0" 
                                            >
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><span style="color:#f00;">*</span>变更理由：</div>
                                        <div class="editContent">
                                            <el-input v-model="changeReason" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><span style="color:#f00;">*</span>变更事项：</div>
                                        <div class="editContent">
                                            <el-input v-model="changesAs" type="textarea" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 是否变更投标事宜 -->
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><span style="color:#f00;">*</span>是否变更投标事宜：</div>
                                        <div class="editContent">
                                            <el-radio-group v-model="isChangeBidMatters" @change="changeFile()">
                                                <el-radio label="是">是</el-radio>
                                                <el-radio label="否">否</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                                <!-- 当投标事宜为是的时候 -->
                                <div  v-show="isTenderShow">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span style="color:#f00;">*</span>报名开始时间：</div>
                                            <div class="editContent">
                                                <el-date-picker 
                                                    v-model="enrollStartTime" 
                                                    type="datetime" 
                                                    placeholder="选择日期时间" 
                                                    align="right" 
                                                    :picker-options="pickerOptions0" 
                                                >
                                                </el-date-picker>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName"><span style="color:#f00;">*</span>报名结束时间：</div>
                                            <div class="editContent">
                                                <el-date-picker 
                                                    v-model="enrollEndTime" 
                                                    type="datetime"
                                                    placeholder="选择日期时间" 
                                                    align="right"
                                                    :picker-options="pickerOptions1"  
                                                >
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editTit"><span style="color:#f00;">*</span>采购文件发售时间：</div>
                                            <div class="editContent">
                                                <el-date-picker :picker-options="pickerOptions0" clearable  v-model="collectTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editTit">上午：</div>
                                            <div class="editContent">
                                                <el-time-select
                                                    placeholder="开始时间"
                                                    v-model="morningbegin"
                                                    :picker-options="{
                                                        start: '08:00',
                                                        step: '00:30',
                                                        end: '17:30'
                                                    }">
                                                </el-time-select>
                                                <span>-</span>
                                                <el-time-select
                                                    placeholder="结束时间"
                                                    v-model="morningend"
                                                    :picker-options="{
                                                        start: '08:00',
                                                        step: '00:30',
                                                        end: '17:30'
                                                    }">
                                                </el-time-select>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editTit">下午：</div>
                                            <div class="editContent">
                                                <el-time-select
                                                    placeholder="开始时间"
                                                    v-model="afterbegin"
                                                    :picker-options="{
                                                        start: '08:00',
                                                        step: '00:30',
                                                        end: '17:30'
                                                    }">
                                                </el-time-select>
                                                <span>-</span>
                                                <el-time-select
                                                    placeholder="结束时间"
                                                    v-model="afterend"
                                                    :picker-options="{
                                                        start: '08:00',
                                                        step: '00:30',
                                                        end: '17:30'
                                                    }">
                                                </el-time-select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购文件发售地点：</div>
                                            <div class="editContent">
                                            <el-input v-model="tenderDocumentsSaleSite" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span style="color:#f00;">*</span>采购文件工本费：</div>
                                            <div class="editContent">
                                                <p>人民币</p>
                                                <el-input v-model="tenderDocumentsCost" clearable ></el-input>
                                                <p>元</p>
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
                                                <el-input v-model="costAcceptAccount" type="textarea" clearable></el-input>
                                            </div>
                                            <!-- <el-button plain>设置账户</el-button> -->
                                        </div>
                                    </div>
                                </div>
                                <!-- 是否为开标事宜 -->
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><span style="color:#f00;">*</span>是否变更开标事宜：</div>
                                        <div class="editContent">
                                            <el-radio-group v-model="isChangeBidOpenMatters" @change="changeTender()">
                                                <el-radio label="是">是</el-radio>
                                                <el-radio label="否">否</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                                <!-- 当开标事宜为是的时候出现 -->
                                <div v-show="OpenTenderShow">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">递交响应文件截止时间：</div>
                                            <div class="editContent">
                                                <el-date-picker 
                                                    v-model="assessmentTime" 
                                                    type="date" 
                                                    placeholder="选择日期"
                                                    align="right" 
                                                    :picker-options="pickerOptions0" 
                                                    disabled="disabled"
                                                >
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">递交响应文件地点：</div>
                                            <div class="editContent">
                                                <el-input v-model="submissionDocumentsPlace" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">响应文件开启时间：</div>
                                            <div class="editContent">
                                                <el-date-picker 
                                                    v-model="assessmentTime" 
                                                    type="date" 
                                                    placeholder="选择日期"
                                                    align="right" 
                                                    :picker-options="pickerOptions0" 
                                                >
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">响应文件开启地点：</div>
                                            <div class="editContent">
                                                <el-input v-model="bidOpeningPlace" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标时长：</div>
                                            <div class="editContent">
                                                <el-select v-model="estimatedReviewDuration" placeholder="请选择">
                                                    <el-option :value="0.5" :label="0.5">0.5</el-option>
                                                    <el-option :value="1" :label="1">1</el-option>
                                                    <el-option :value="1.5" :label="1.5">1.5</el-option>
                                                    <el-option :value="2" :label="2">2</el-option>
                                                    <el-option :value="2.5" :label="2.5">2.5</el-option>
                                                    <el-option :value="3" :label="3">3</el-option>
                                                    <el-option :value="3.5" :label="3.5">3.5</el-option>
                                                    <el-option :value="4" :label="4">4</el-option>
                                                    <el-option :value="4.5" :label="4.5">4.5</el-option>
                                                    <el-option :value="5" :label="5">5</el-option>
                                                    <el-option :value="5.5" :label="5.5">5.5</el-option>
                                                    <el-option :value="6" :label="6">6</el-option>
                                                </el-select>
                                                <p>小时</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span style="color:#f00;">*</span>开标室(请选择)：</div>
                                            <div class="editContent">
                                                <el-select v-model="openingRoom" placeholder="请选择">
                                                    <el-option v-for="item in optionRoom" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">是否预约评标室：</div>
                                            <div class="editContent">
                                                <el-radio-group v-model="appointmentEvaluationRoom" @change="changeRoom()">
                                                    <el-radio label="是">是</el-radio>
                                                    <el-radio label="否">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem" v-show="peitao">
                                        <div class="editTextarea">
                                            <div class="editName">配套服务：</div>
                                            <div class="editContent">
                                                <el-checkbox-group v-model="supportingServices">
                                                    <el-checkbox v-for="workOff in offices" :label="workOff" :key="workOff">{{workOff}}</el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem" v-show="Pbaddress">
                                        <div class="editCenter">
                                            <div class="editName">评标地点：</div>
                                            <div class="editContent">
                                                <el-input v-model="bidEvaluationSite"></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标时间：</div>
                                            <div class="editContent">
                                                <el-date-picker value-format="timestamp" :picker-options="pickerOptions0" v-model="bidEvaluationTime" type="datetime"  placeholder="选择日期时间">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评标时长：</div>
                                            <div class="editContent">
                                                <el-select v-model="lengthOfTenderEvaluation" placeholder="请选择">
                                                    <el-option :value="0.5" :label="0.5">0.5</el-option>
                                                    <el-option :value="1" :label="1">1</el-option>
                                                    <el-option :value="2" :label="2">2</el-option>
                                                    <el-option :value="3" :label="3">3</el-option>
                                                    <el-option :value="4" :label="4">4</el-option>
                                                    <el-option :value="5" :label="5">5</el-option>
                                                    <el-option :value="6" :label="6">6</el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>评标室(请选择)：</div>
                                            <div class="editContent">
                                                <el-select v-model="bidEvaluationRoom" placeholder="请选择">
                                                    <el-option v-for="item in bidRoom" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">评标办法和标准：</div>
                                            <div class="editContent">
                                                <el-input v-model="bidEvaluationStandard" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">项目负责人：</div>
                                            <div class="editContent">
                                                <el-input v-model="projectLeader" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">联系方式：</div>
                                            <div class="editContent">
                                                <el-input v-model="projectLeaderPhone" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">备注：</div>
                                            <div class="editContent">
                                                <el-input v-model="remark" type="textarea" :rows="3" ></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="3">
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
            <!-- 下一步弹框 -->
            <div class="nextWrapper" v-show="nextFlag" style="overflow-y:hidden;height:100%;">
                <div class="box box_nav">
                    <button class="btn" @click="backTo()">上一步</button>
                    <button class="btn" @click="submitFile()">提交</button>
                </div>
                <!-- <div class="box box_write">
                    <button class="btn" @click="writeTo()">编辑</button>
                </div> -->
                <div style="overflow-y:scroll;height:100%;">
                    <el-collapse v-model="activeName1" accordion>
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
                                <div class="table_box"  v-if="this.projectObj.totalProjectId.indexOf('-') != -1">
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
                                <div  v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
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
                                <el-table-column fixed="right" label="操作" width="100" v-if="this.zhuangtai !='办理通过' && this.zhuangtai !='待办理'">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage()"></i>
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
                                <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
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
            <!-- 查看分包信息详情 -->
            <div class="lookWrapper" v-show="lookFlag">
                <div class="lookBox">
                    <div class="look_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeLook()"></i>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="activeName" accordion>
                            <!--分包信息 -->
                            <el-collapse-item title="分包信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="color:red;">统一交易标志码：</div>
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
                                            <div class="editContent">{{subcontractName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">分包内容：</div>
                                            <div class="editContent">{{subcontractContents}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)范围：</div>
                                            <div class="editContent">{{scopeOfTender}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">分包控制金额：</div>
                                            <div class="editContent">{{subcontractingControlAmount}} <b style="color:#000;">万元</b> </div>
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
            </div>
            <!-- 上传文件 -->
            <div class="uploadWrapper" v-show="uploadFlag">
                <div class="uploadBox">
                    <div class="upload_title">
                        <p>变更附件</p>
                        <i class="el-icon-close" style="cursor:pointer;" @click="closeFile()"></i>
                    </div>
                    <div class="upload_btn">
                        <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
                        <button class="btn">上传</button>
                        <button class="btn" @click="deleteFile()">删除</button>
                    </div>
                    <div class="main_info">
                        <el-table :data="fileData" style="width: 100%"  @selection-change="handleUploadChange()">
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
                        <p class="star">★：附件上传大小限制为102400 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 保存弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="saveBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>保存成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 提交弹框 -->
        <el-dialog
            title="执行成功"
            :visible.sync="submitBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>提交成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submiteBoxSure()">确 定</el-button>
            </span>
        </el-dialog>
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
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import dayjs from 'dayjs'
import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkPhone,checkEmail,dubRemove,checkNumber} from '../../../api/base.js'
export default {
  components:{},
  props:{},
  data(){
    return {
        str_entrust_type:window.sessionStorage.str_entrust_type,
        agentAddress :'',
        agentPhone :'',
        role_types:window.localStorage.role_types,
        biddingPurchasingAgencyName:'',
        projectObj:JSON.parse(window.localStorage.projectObj),
        peitao:false,
        Pbaddress:false,
        bidEvaluationTime:'',//评标时间
        lengthOfTenderEvaluation:'',//评标时长
        bidEvaluationRoom:'',//评标室
        bidRoom:[{
                value:'第一开标室',
                label:'第一开标室'
            },
            {
                value:'第二开标室',
                label:'第二开标室'
            },
            {
                value:'第三开标室',
                label:'第三开标室'
            },
            {
                value:'第四开标室',
                label:'第四开标室'
            },
            {
                value:'第一评标室',
                label:'第一评标室'
            },
            {
                value:'第二评标室',
                label:'第二评标室'
            },
            {
                value:'第三评标室',
                label:'第三评标室'
            },
            {
                value:'第四评标室',
                label:'第四评标室'
        }],// 评标室列表
        serviceData:'',
        supportingServices:[],//配套服务
        offices:['电脑', '签字笔', '计算器', '胶带','铅笔和橡皮', '裁纸刀和剪刀', '记号笔', '投影仪','打印机', '订书器', '打包绳', '桌签和水牌','信号屏蔽器', '水杯', 'A4纸', '其他'],
        bidEvaluationSite:'',//评标地点
        bidEvaluationStandard:'',//评标办法和标准
        estimatedReviewDuration:'',//开标时长
        openingRoom:'',//开标室
        optionRoom:[//开标室地点
            {
                value: '第一开标室',
                label: '第一开标室'
            },
            {
                value: '第二开标室',
                label: '第二开标室'
            },
            {
                value: '第三开标室',
                label: '第三开标室'
            },
            {
                value: '第四开标室',
                label: '第四开标室'
            }
        ],
        appointmentEvaluationRoom:'',//是否预约评标室
        scopeOfTender:"",
        saveBox:false,//保存弹框
        submitBox:false,//提交弹框
        uploadFlag:false,//上传文件弹框
        projectSubcontractCreationTime:'',//时间
        fileData:[],//上传数据
        entrySubcontractNumber:'',//入场项目分包编号
        subcontractName:'',//分包名称
        tenderPurchaserName:'',//招标(采购)人
        subcontractContents:'',//分包内容
        scopeOfTender:'',// 招标范围
        subcontractingControlAmount:'',//分包控制金额
        qualificationExaminationMethod:'',//资格审查方式
        electronicBidEvaluation:'',//是否电子招投标
        lookFlag:false,//分包弹框
        enclosureData:[{
            appendixName:"变更附件",
            attachlist: []
        }],//附件数据
        stateItem:"",//状态
        passJudgeShow:true,
        frameShow:false,
        writeFlag:true,
        activeName:['1','2','3'],
        activeName1:['1','2','3','4','5'],
        nameOfTenderProject:'',//招标项目名称
        biddingProjectNumber:'',//招标项目编号
        budgetAmount:'',//招标项目预算金额
        subpackageData:[],//分包数据
        tenderPurchaserName:'',//招标采购人
        tendereeAddress:'',//地址
        tendereePhone:'',//联系方式
        noticeName:'',//公告名称
        changesDate:'',//变更日期
        pickerOptions0: {
            disabledDate: (time) => {
                return time.getTime() < Date.now() - 8.64e7;
            }
        },
        // 结束
        pickerOptions1: {
            disabledDate: (time) => {
                return time.getTime() < new Date(this.enrollStartTime).getTime()- (24*60*60*1000)/24;//减去一天的时间代表可以选择同一天;
            }
        },
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
        alertMsg:"",
        zhuangtai:"",
        sourceNoticeId:'',
        initList:[],
        areaList:[],
        costAcceptAccount:'',
    }
  },
  watch:{},
  computed:{},
  methods:{
        changeRoom(){
            if(this.appointmentEvaluationRoom == '是'){
                this.peitao = true;
                this.Pbaddress = false;
            }else if(this.appointmentEvaluationRoom == '否'){
                this.Pbaddress = true;
                this.peitao = false;
            }
        },
        getbiddingInfo(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 采购项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 采购项目编号
                        this.budgetAmount = res.data.data.budgetAmount;// 采购项目预算金额 
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.tenderContents = res.data.data.tenderContents;// 采购内容
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
                        
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 采购项目金额
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 采购采购方式
                        this.biddingOrganization = res.data.data.biddingOrganization;// 采购组织方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 采购项目类型
                        
                        this.budgetAmount = res.data.data.budgetAmount;// 采购项目预算金额 
                        this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //分包表格
        async getsubList(){
            await this.getNoticeList();
            let lookArr = [];
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                if(this.initList.length == 0){
                    this.EntrySubNum = this.projectObj.totalProjectId;
                    lookArr.push(this.EntrySubNum);
                }else{
                    this.areaList.forEach(item=>{
                        lookArr.push(item.entrySubcontractNumber);
                    })
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:lookArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.subpackageData = res.data.data
                    this.subpackageData.forEach((item,index) => {
                        if(item.entrySubcontractNumber == this.projectObj.totalProjectId){
                            this.tenderContents = item.projectInformationVo.tenderContents;// 采购内容
                            this.subcontractName = item.subcontractName;// 分包名称
                            this.entrySubcontractNumber = item.entrySubcontractNumber;// 入场项目分包编号
                            this.subcontractingControlAmount = item.subcontractingControlAmount;// 分包控制金额
                            this.subcontractNames = item.subcontractName;// 分包名称
                            this.entrySubcontractNumbers = item.entrySubcontractNumber;// 入场项目分包编号
                            this.subcontractingControlAmounts = item.subcontractingControlAmount;
                        }
                    });
                    
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //初始化查询
        getInitInfo(){
            let object = {};
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
                method: "POST",
                url: baseUrl+"/tenderNoticeController/selectChange",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.zhuangtai = res.data.data[0].state;
                    this.tenderNoticeId = res.data.data[0].tenderNoticeId;
                    this.sourceNoticeId = res.data.data[0].sourceNoticeId;
                    // 7.29
                    this.agentAddress = res.data.data[0].agentAddress;
                    this.agentPhone = res.data.data[0].agentPhone;
                    // 
                    if(this.zhuangtai == null || this.zhuangtai == '办理通过'){
                        this.writeFlag = true;
                        this.nextFlag = false;
                        res.data.data.forEach(item=>{
                            if(window.sessionStorage.str_entrust_type != '委托角色' && this.role_types == '招标(采购)人'){
                                if(item.changesDate == null || item.changesDate == 0 || item.changesDate == ""){
                                    this.changesDate = ""
                                }else{
                                    this.changesDate = dayjs(item.changesDate).format('YYYY-MM-DD');
                                };
                                if(item.enrollStartTime == null || item.enrollStartTime == 0 || item.enrollStartTime == ""){
                                    this.enrollStartTime = ""
                                }else{
                                    this.enrollStartTime = dayjs(item.enrollStartTime).format('YYYY-MM-DD HH:mm:ss');
                                };
                                if(item.enrollEndTime == null || item.enrollEndTime == 0 || item.enrollEndTime == ""){
                                    this.enrollEndTime = ""
                                }else{
                                    this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD HH:mm:ss');
                                };
                                if(item.saleReceiveStartDate == null || item.saleReceiveStartDate == 0 || item.saleReceiveStartDate == ""){
                                    this.saleReceiveStartDate = ""
                                }else{
                                    this.saleReceiveStartDate = dayjs(item.saleReceiveStartDate).format('YYYY-MM-DD');
                                };
                                if(item.saleReceiveEndDate == null || item.saleReceiveEndDate == 0 || item.saleReceiveEndDate == ""){
                                    this.saleReceiveEndDate = ""
                                }else{
                                    this.saleReceiveEndDate = dayjs(item.saleReceiveEndDate).format('YYYY-MM-DD');
                                };
                                if(item.bidEvaluationTime == null || item.bidEvaluationTime == 0 || item.bidEvaluationTime == ""){
                                    this.bidEvaluationTime = ""
                                }else{
                                    this.bidEvaluationTime = dayjs(item.bidEvaluationTime).format('YYYY-MM-DD');
                                }
                            }else{
                                if(item.changesDate == null || item.changesDate == 0 || item.changesDate == ""){
                                    this.changesDate = ""
                                }else{
                                    this.changesDate = item.changesDate;
                                };
                                if(item.enrollStartTime == null || item.enrollStartTime == 0 || item.enrollStartTime == ""){
                                    this.enrollStartTime = ""
                                }else{
                                    this.enrollStartTime = item.enrollStartTime;
                                };
                                if(item.enrollEndTime == null || item.enrollEndTime == 0 || item.enrollEndTime == ""){
                                    this.enrollEndTime = ""
                                }else{
                                    this.enrollEndTime = item.enrollEndTime;
                                };
                                if(item.saleReceiveStartDate == null || item.saleReceiveStartDate == 0 || item.saleReceiveStartDate == ""){
                                    this.saleReceiveStartDate = ""
                                }else{
                                    this.saleReceiveStartDate = item.saleReceiveStartDate;
                                };
                                if(item.saleReceiveEndDate == null || item.saleReceiveEndDate == 0 || item.saleReceiveEndDate == ""){
                                    this.saleReceiveEndDate = ""
                                }else{
                                    this.saleReceiveEndDate = item.saleReceiveEndDate;
                                };
                                if(item.saleReceiveEndDate == null || item.saleReceiveEndDate == 0 || item.saleReceiveEndDate == ""){
                                    this.saleReceiveEndDate = ""
                                }else{
                                    this.saleReceiveEndDate = item.saleReceiveEndDate;
                                };
                                if(item.bidEvaluationTime == null || item.bidEvaluationTime == 0 || item.bidEvaluationTime == ""){
                                    this.bidEvaluationTime = ""
                                }else{
                                    this.bidEvaluationTime = item.bidEvaluationTime;
                                }
                            }
                        })
                        this.collectTime.push(this.saleReceiveStartDate,this.saleReceiveEndDate)
                    }else if(this.zhuangtai == '编辑中' || this.zhuangtai == '办理未通过'){
                        this.writeFlag = false;
                        this.nextFlag = true;
                        $('.box_nav').show();
                        res.data.data.forEach(item=>{
                            if(item.changesDate == null || item.changesDate == 0 || item.changesDate == ""){
                                this.changesDate = ""
                            }else{
                                this.changesDate = dayjs(item.changesDate).format('YYYY-MM-DD');
                            };
                            if(item.enrollStartTime == null || item.enrollStartTime == 0 || item.enrollStartTime == ""){
                                this.enrollStartTime = ""
                            }else{
                                this.enrollStartTime = dayjs(item.enrollStartTime).format('YYYY-MM-DD HH:mm:ss');
                            };
                            if(item.enrollEndTime == null || item.enrollEndTime == 0 || item.enrollEndTime == ""){
                                this.enrollEndTime = ""
                            }else{
                                this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD HH:mm:ss');
                            };
                            if(item.saleReceiveStartDate == null || item.saleReceiveStartDate == 0 || item.saleReceiveStartDate == ""){
                                this.saleReceiveStartDate = ""
                            }else{
                                this.saleReceiveStartDate = dayjs(item.saleReceiveStartDate).format('YYYY-MM-DD');
                            };
                            if(item.saleReceiveEndDate == null || item.saleReceiveEndDate == 0 || item.saleReceiveEndDate == ""){
                                this.saleReceiveEndDate = ""
                            }else{
                                this.saleReceiveEndDate = dayjs(item.saleReceiveEndDate).format('YYYY-MM-DD');
                            };
                            if(item.bidEvaluationTime == null || item.bidEvaluationTime == 0 || item.bidEvaluationTime == ""){
                                this.bidEvaluationTime = ""
                            }else{
                                this.bidEvaluationTime = dayjs(item.bidEvaluationTime).format('YYYY-MM-DD');
                            }
                        })
                    }else if(this.zhuangtai == '待办理'){
                        this.writeFlag = false;
                        this.nextFlag = true;
                        $('.box_nav').hide();
                        res.data.data.forEach(item=>{
                            if(item.changesDate == null || item.changesDate == 0 || item.changesDate == ""){
                                this.changesDate = ""
                            }else{
                                this.changesDate = dayjs(item.changesDate).format('YYYY-MM-DD');
                            };
                            if(item.enrollStartTime == null || item.enrollStartTime == 0 || item.enrollStartTime == ""){
                                this.enrollStartTime = ""
                            }else{
                                this.enrollStartTime = dayjs(item.enrollStartTime).format('YYYY-MM-DD HH:mm:ss');
                            };
                            if(item.enrollEndTime == null || item.enrollEndTime == 0 || item.enrollEndTime == ""){
                                this.enrollEndTime = ""
                            }else{
                                this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD HH:mm:ss');
                            };
                            if(item.saleReceiveStartDate == null || item.saleReceiveStartDate == 0 || item.saleReceiveStartDate == ""){
                                this.saleReceiveStartDate = ""
                            }else{
                                this.saleReceiveStartDate = dayjs(item.saleReceiveStartDate).format('YYYY-MM-DD');
                            };
                            if(item.saleReceiveEndDate == null || item.saleReceiveEndDate == 0 || item.saleReceiveEndDate == ""){
                                this.saleReceiveEndDate = ""
                            }else{
                                this.saleReceiveEndDate = dayjs(item.saleReceiveEndDate).format('YYYY-MM-DD');
                            };
                            if(item.bidEvaluationTime == null || item.bidEvaluationTime == 0 || item.bidEvaluationTime == ""){
                                this.bidEvaluationTime = ""
                            }else{
                                this.bidEvaluationTime = dayjs(item.bidEvaluationTime).format('YYYY-MM-DD');
                            }
                        })
                    };
                    res.data.data.forEach(item=>{
                        this.costAcceptAccount = item.costAcceptAccount;
                        this.estimatedReviewDuration = item.estimatedReviewDuration;
                        this.openingRoom = item.openingRoom;
                        this.appointmentEvaluationRoom = item.appointmentEvaluationRoom;
                        this.serviceData = item.supportingServices;
                        this.bidEvaluationSite = item.bidEvaluationSite;
                        this.lengthOfTenderEvaluation = item.lengthOfTenderEvaluation;
                        this.bidEvaluationRoom = item.bidEvaluationRoom;//新增7.10
                        this.tendereeAddress = item.tendereeAddress;
                        this.tendereePhone = item.tendereePhone;
                        this.noticeName = item.noticeName;
                        this.changeReason = item.changeReason;
                        this.changesAs = item.changesAs;
                        this.isChangeBidMatters = item.isChangeBidMatters;
                        this.isChangeBidOpenMatters = item.isChangeBidOpenMatters;
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
                        if(item.saveTime == null ||item.saveTime == 0 ||item.saveTime == ""){
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
                    if(this.appointmentEvaluationRoom == '是'){
                        this.peitao = true;
                        this.Pbaddress = false;
                    }else if(this.appointmentEvaluationRoom == '否'){
                        this.Pbaddress = true;
                        this.peitao = false;
                    }
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //招标公告的查询接口
        getNoticeList(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 || this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    noticeType:"招标公告",
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    noticeType:"招标公告",
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
        //编辑按钮
        writeTo(){
            this.nextFlag = false;
            this.writeFlag = true;
            this.getlastTemp();// 上一步查询
        },
        //点击下一步、保存
        newly(num){
            if(!this.noticeName){
                this.$layer.msg('请填写公告名称');
                return false;
            }else if(!this.changesDate){
                this.$layer.msg('请选择变更日期');
                return false;
            }else if(!this.changeReason){
                this.$layer.msg('请填写变更理由');
                return false;
            }else if(!this.changesAs){
                this.$layer.msg('请输入变更事项');
                return false;
            }else if(!this.isChangeBidMatters){
                this.$layer.msg('请选择是否变更投标事宜');
                return false;
            }else if(!this.isChangeBidOpenMatters){
                this.$layer.msg('请选择是否变更开标事宜');
                return false;
            }else if(this.isChangeBidMatters == "是"){
                if(!this.enrollStartTime){
                    this.$layer.msg('请选择报名开始时间');
                    return false;
                }else if(!this.enrollEndTime){
                    this.$layer.msg('请选择报名结束时间');
                    return false;
                }else if(!this.enrollEndTime){
                    this.$layer.msg('请选择报名结束时间');
                    return false;
                }else if(this.collectTime.length == 0){
                    this.$layer.msg("请输入采购文件发售时间！");
                    return false;
                }else if(!this.morningbegin && !this.morningend && !this.afterbegin && !this.afterend){
                    this.$layer.msg("请输入采购文件发售时间！");
                    return false;
                }else if(this.tenderDocumentsCost =='' || this.tenderDocumentsCost == null || !checkNumber(this.tenderDocumentsCost)){
                    this.$layer.msg("请输入采购文件工本费！");
                    return false;
                }
            }else if(this.tendereePhone != '' && this.tendereePhone != null && !isPoneAvailable(this.tendereePhone) && !checkPhone(this.tendereePhone)){
                this.$layer.msg('请正确填写联系方式');
                return false;
            }else if(this.projectLeaderPhone != '' && this.projectLeaderPhone != null && !isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){ 
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }
            if(num == 1){
                this.saveBiddingInfo(1);
                this.nextFlag = false;
                this.writeFlag = true;
            }else{
                this.saveBiddingInfo(2);
                this.nextFlag = true;
                this.writeFlag = false;
                $('.box_nav').show();
            }
        },
        saveBiddingInfo(num){
            // 上午发售时间
            let morningArr = [];
            morningArr.push(this.morningbegin,this.morningend)
            this.saleStartTime = morningArr.toString();
            // 下午发售时间
            let afterArr = [];
            afterArr.push(this.afterbegin,this.afterend)
            this.saleEndTime = afterArr.toString();
            if(this.collectTime != null){
                this.saleReceiveStartDate  = this.collectTime[0];//招标文件发售开始时间   
                this.saleReceiveEndDate = this.collectTime[1];//招标文件发售结束时间  
            }else{
                this.saleReceiveStartDate = "";
                this.saleReceiveEndDate = ""
            }
            if(this.enrollStartTime == null){
                this.enrollStartTime = "";
            }
            if(this.enrollEndTime == null){
                this.enrollEndTime = "";
            }
            if(this.times == 0){
                this.assessmentTime = new Date(this.openingTime).getTime()
            }else{
                this.assessmentTime = new Date(this.assessmentTime).getTime()
            }
            let objData={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                //分包
                objData ={
                    entrySubcontractNumber: this.projectObj.totalProjectId,
                    tendereePhone:this.tendereePhone,
                    tendereeAddress:this.tendereeAddress,
                    noticeName:this.noticeName,
                    changesDate:this.changesDate,
                    changeReason:this.changeReason,
                    changesAs:this.changesAs,
                    isChangeBidMatters:this.isChangeBidMatters,
                    isChangeBidOpenMatters:this.isChangeBidOpenMatters,
                    enrollStartTime:changeTime(this.enrollStartTime),//报名开始时间
                    enrollEndTime:changeTime(this.enrollEndTime),//报名结束时间
                    saleReceiveStartDate :changeTime(this.saleReceiveStartDate),//招标文件发售开始时间   
                    saleReceiveEndDate:changeTime(this.saleReceiveEndDate),//招标文件发售结束时间  
                    saleStartTime:this.saleStartTime,//上午发售时间
                    saleEndTime:this.saleEndTime,//下午发售时间    
                    tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,//招标文件发售地点
                    tenderDocumentsCost:this.tenderDocumentsCost,//招标文件工本费
                    costAcceptAccount:this.costAcceptAccount,//工本费接收账户
                    bidderData:this.bidderData,//投标人所需提交资料
                    bidEvaluationStandard:this.bidEvaluationStandard,//评标办法和标准
                    projectLeader:this.projectLeader,//项目负责人
                    projectLeaderPhone:this.projectLeaderPhone,//联系方式
                    remark:this.remark,//备注
                    submissionDocumentsPlace:this.submissionDocumentsPlace,//递交投标文件地点
                    bidOpeningPlace:this.bidOpeningPlace,//开标地点
                    noticeType:'变更公告',
                    assessmentTime:this.assessmentTime,
                    tenderNoticeId:this.tenderNoticeId,
                    assessmentTime:changeTime(this.assessmentTime),
                    // 7.10
                    estimatedReviewDuration : this.estimatedReviewDuration,
                    openingRoom : this.openingRoom,
                    appointmentEvaluationRoom : this.appointmentEvaluationRoom,
                    supportingServices : this.supportingServices.join(','),
                    bidEvaluationSite : this.bidEvaluationSite,
                    lengthOfTenderEvaluation : this.lengthOfTenderEvaluation,
                    bidEvaluationRoom : this.bidEvaluationRoom,
                    bidEvaluationTime:this.bidEvaluationTime,
                    // 7.29
                    agentAddress :this.agentAddress,
                    agentPhone :this.agentPhone,
                }
            }else{
                objData ={
                    projectCode: this.projectObj.totalProjectId,
                    tendereePhone:this.tendereePhone,
                    tendereeAddress:this.tendereeAddress,
                    noticeName:this.noticeName,
                    changesDate:this.changesDate,
                    changeReason:this.changeReason,
                    changesAs:this.changesAs,
                    isChangeBidMatters:this.isChangeBidMatters,
                    isChangeBidOpenMatters:this.isChangeBidOpenMatters,
                    enrollStartTime:changeTime(this.enrollStartTime),//报名开始时间
                    enrollEndTime:changeTime(this.enrollEndTime),//报名结束时间
                    saleReceiveStartDate :changeTime(this.saleReceiveStartDate),//招标文件发售开始时间   
                    saleReceiveEndDate:changeTime(this.saleReceiveEndDate),//招标文件发售结束时间  
                    saleStartTime:this.saleStartTime,//上午发售时间
                    saleEndTime:this.saleEndTime,//下午发售时间    
                    tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,//招标文件发售地点
                    tenderDocumentsCost:this.tenderDocumentsCost,//招标文件工本费
                    costAcceptAccount:this.costAcceptAccount,//工本费接收账户
                    bidderData:this.bidderData,//投标人所需提交资料
                    bidEvaluationStandard:this.bidEvaluationStandard,//评标办法和标准
                    projectLeader:this.projectLeader,//项目负责人
                    projectLeaderPhone:this.projectLeaderPhone,//联系方式
                    remark:this.remark,//备注
                    submissionDocumentsPlace:this.submissionDocumentsPlace,//递交投标文件地点
                    bidOpeningPlace:this.bidOpeningPlace,//开标地点
                    noticeType:'变更公告',
                    assessmentTime:this.assessmentTime,
                    tenderNoticeId:this.tenderNoticeId,
                    assessmentTime:changeTime(this.assessmentTime),
                    // 7.10
                    estimatedReviewDuration : this.estimatedReviewDuration,
                    openingRoom : this.openingRoom,
                    appointmentEvaluationRoom : this.appointmentEvaluationRoom,
                    supportingServices : this.supportingServices.join(','),
                    bidEvaluationSite : this.bidEvaluationSite,
                    lengthOfTenderEvaluation : this.lengthOfTenderEvaluation,
                    bidEvaluationRoom : this.bidEvaluationRoom,
                    bidEvaluationTime:this.bidEvaluationTime,
                    //7.29
                    agentAddress :this.agentAddress,
                    agentPhone :this.agentPhone,
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/tenderNoticeController/saveOrUpdateChange",
                data:objData
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                        if(res.data.data.changesDate == null && res.data.data.changesDate == 0 && res.data.data.changesDate == ""){
                            this.changesDate = ""
                        }else{
                            this.changesDate = dayjs(res.data.data.changesDate).format('YYYY-MM-DD HH:mm:ss');
                        };
                        if(res.data.data.enrollStartTime == null && res.data.data.enrollStartTime == 0 && res.data.data.enrollStartTime == ""){
                            this.enrollStartTime = ""
                        }else{
                            this.enrollStartTime = dayjs(res.data.data.enrollStartTime).format('YYYY-MM-DD HH:mm:ss');
                        };
                        if(res.data.data.enrollEndTime == null && res.data.data.enrollEndTime == 0 && res.data.data.enrollEndTime == ""){
                            this.enrollEndTime = ""
                        }else{
                            this.enrollEndTime = dayjs(res.data.data.enrollEndTime).format('YYYY-MM-DD HH:mm:ss');
                        };
                        if(res.data.data.saleReceiveStartDate == null || res.data.data.saleReceiveStartDate == 0 || res.data.data.saleReceiveStartDate == ""){
                            this.saleReceiveStartDate = ""
                        }else{
                            this.saleReceiveStartDate = dayjs(res.data.data.saleReceiveStartDate).format('YYYY-MM-DD');
                        };
                        if(res.data.data.saleReceiveEndDate == null || res.data.data.saleReceiveEndDate == 0 || res.data.data.saleReceiveEndDate == ""){
                            this.saleReceiveEndDate = ""
                        }else{
                            this.saleReceiveEndDate = dayjs(res.data.data.saleReceiveEndDate).format('YYYY-MM-DD');
                        };
                        if(res.data.data.times == 0){
                            if(res.data.data.openingTime == null){
                                this.assessmentTime = ""
                            }else{
                                this.assessmentTime = dayjs(res.data.data.openingTime).format('YYYY-MM-DD HH:mm:ss');
                            }
                        }else{
                            if( res.data.data.assessmentTime == null){
                                this.assessmentTime = ""
                            }else{
                                this.assessmentTime = dayjs(res.data.data.assessmentTime).format('YYYY-MM-DD HH:mm:ss');
                            }
                        }
                        if(res.data.data.saveTime == null || res.data.data.saveTime == 0 || res.data.data.saveTime == ""){
                            this.saveTime = ""
                        }else{
                            this.saveTime = dayjs(res.data.data.saveTime).format('YYYY-MM-DD');
                        };
                        if(res.data.data.bidEvaluationTime == null || res.data.data.bidEvaluationTime == 0 || res.data.data.bidEvaluationTime == ""){
                            this.bidEvaluationTime = ""
                        }else{
                            this.bidEvaluationTime = dayjs(res.data.data.bidEvaluationTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                    }
                    // 7.29
                    this.agentAddress  = res.data.data.agentAddress;
                    this.agentPhone  = res.data.data.agentPhone;
                    // 
                    this.estimatedReviewDuration = res.data.data.estimatedReviewDuration;
                    this.openingRoom = res.data.data.openingRoom;
                    this.appointmentEvaluationRoom = res.data.data.appointmentEvaluationRoom;
                    this.serviceData = res.data.data.supportingServices;
                    this.bidEvaluationSite = res.data.data.bidEvaluationSite;
                    this.lengthOfTenderEvaluation = res.data.data.lengthOfTenderEvaluation;
                    this.bidEvaluationRoom = res.data.data.bidEvaluationRoom;//新增7.10
                    this.tenderNoticeId = res.data.data.tenderNoticeId;
                    this.sourceNoticeId = res.data.data.sourceNoticeId;
                    this.tendereeAddress = res.data.data.tendereeAddress;
                    this.tendereePhone = res.data.data.tendereePhone;
                    this.noticeName = res.data.data.noticeName;
                    this.zhuangtai = res.data.data.state;
                    this.costAcceptAccount = res.data.data.costAcceptAccount;
                    this.changeReason = res.data.data.changeReason;
                    this.changesAs = res.data.data.changesAs;
                    this.isChangeBidMatters = res.data.data.isChangeBidMatters;
                    this.isChangeBidOpenMatters = res.data.data.isChangeBidOpenMatters;
                    
                    this.saleStartTime=res.data.data.saleStartTime.split(',');
                    this.morningbegin = this.saleStartTime[0];
                    this.morningend = this.saleStartTime[1];
                    this.saleEndTime=res.data.data.saleEndTime.split(',');
                    this.afterbegin = this.saleEndTime[0];
                    this.afterend = this.saleEndTime[1];
                    this.tenderDocumentsSaleSite = res.data.data.tenderDocumentsSaleSite;
                    this.tenderDocumentsCost = res.data.data.tenderDocumentsCost;
                    this.bidderData = res.data.data.bidderData;
                    
                    this.submissionDocumentsPlace = res.data.data.submissionDocumentsPlace;
                    this.bidOpeningPlace = res.data.data.bidOpeningPlace;
                    this.bidEvaluationStandard = res.data.data.bidEvaluationStandard;
                    this.projectLeader = res.data.data.projectLeader;
                    this.projectLeaderPhone = res.data.data.projectLeaderPhone;
                    this.remark = res.data.data.remark;
                    
                    this.creatorName = res.data.data.creatorName;
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
                     this.uploadList();
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //上一步
        backTo(){
            this.getlastTemp();
            this.nextFlag = false;
            this.writeFlag = true;
        },
        // 上一步查询
        getlastTemp(){
            let object = {};
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
                url: baseUrl+"/tenderNoticeController/selectChange",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.agentAddress = res.data.data[0].agentAddress;
                    this.agentPhone = res.data.data[0].agentPhone;
                    if(res.data.data[0].isChangeBidMatters == "是"){
                        this.isTenderShow = true;
                    }else{
                        this.isTenderShow = false;
                    };
                    if(res.data.data[0].isChangeBidOpenMatters == "是"){
                        this.OpenTenderShow = true;
                    }else{
                        this.OpenTenderShow = false;
                    }
                    if(res.data.data[0].appointmentEvaluationRoom == '是'){
                        this.peitao = true;
                        this.Pbaddress = false;
                    }else if(res.data.data[0].appointmentEvaluationRoom == '否'){
                        this.Pbaddress = true;
                        this.peitao = false;
                    }
                    this.collectTime = [];
                    if(res.data.data[0].changesDate == null || res.data.data[0].changesDate == 0 || res.data.data[0].changesDate == ""){
                        this.changesDate = ""
                    }else{
                        this.changesDate = new Date(res.data.data[0].changesDate).getTime();
                    };
                    if(res.data.data[0].enrollStartTime == null || res.data.data[0].enrollStartTime == "" || res.data.data[0].enrollStartTime == 0){
                        this.enrollStartTime = ""
                    }else{
                        this.enrollStartTime = new Date(res.data.data[0].enrollStartTime).getTime();
                    };
                    if(res.data.data[0].enrollEndTime == null || res.data.data[0].enrollEndTime == "" || res.data.data[0].enrollEndTime == 0){
                        this.enrollEndTime = ""
                    }else{
                        this.enrollEndTime = new Date(res.data.data[0].enrollEndTime).getTime();
                    };
                    if(res.data.data[0].saleReceiveStartDate == null || res.data.data[0].saleReceiveStartDate == "" || res.data.data[0].saleReceiveStartDate == 0){
                        this.saleReceiveStartDate = ""
                    }else{
                        this.saleReceiveStartDate = new Date(res.data.data[0].saleReceiveStartDate).getTime();
                    };
                    if(res.data.data[0].saleReceiveEndDate == null || res.data.data[0].saleReceiveEndDate == "" || res.data.data[0].saleReceiveEndDate == 0){
                        this.saleReceiveEndDate = ""
                    }else{
                        this.saleReceiveEndDate = new Date(res.data.data[0].saleReceiveEndDate).getTime();
                    };
                    this.collectTime.push(this.saleReceiveStartDate,this.saleReceiveEndDate);
                    //上午发售时间
                    if(res.data.data[0].saleStartTime != "" || res.data.data[0].saleStartTime != null){
                        this.saleStartTime = res.data.data[0].saleStartTime.split(',');
                        this.morningbegin = this.saleStartTime[0];
                        this.morningend = this.saleStartTime[1];
                    }
                    if(res.data.data[0].saleEndTime != "" || res.data.data[0].saleEndTime != null){
                        // 下午发售时间
                        this.saleEndTime = res.data.data[0].saleEndTime.split(',');
                        this.afterbegin = this.saleEndTime[0];
                        this.afterend = this.saleEndTime[1];
                    }
                    if(res.data.data[0].times == 0){
                        if(res.data.data[0].openingTime == null || res.data.data[0].openingTime == 0 || res.data.data[0].openingTime == ""){
                            this.assessmentTime = ""
                        }
                        // this.assessmentTime = new Date(res.data.data[0].openingTime).getTime();
                    }else{
                        if(res.data.data[0].assessmentTime == null || res.data.data[0].assessmentTime == 0 || res.data.data[0].assessmentTime == ""){
                            this.assessmentTime = ""
                        }
                        // this.assessmentTime = new Date(res.data.data[0].assessmentTime).getTime();
                    }
                    if(res.data.data[0].saveTime == null || res.data.data[0].saveTime == "" || res.data.data[0].saveTime == 0){
                        this.saveTime = ""
                    }else{
                        this.saveTime = new Date(res.data.data[0].saveTime).getTime();
                    };
                    if(res.data.data[0].bidEvaluationTime == null || res.data.data[0].bidEvaluationTime == "" || res.data.data[0].bidEvaluationTime == 0){
                        this.bidEvaluationTime = ""
                    }else{
                        this.bidEvaluationTime = new Date(res.data.data[0].bidEvaluationTime).getTime();
                    };
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //提交
        submitFile(){
            let obj = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                obj = {
                    tenderNoticeId : this.tenderNoticeId,
                    state:'待办理',
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }else{
                obj = {
                    tenderNoticeId : this.tenderNoticeId,
                    state:'待办理',
                    projectCode:this.projectObj.totalProjectId
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/tenderNoticeController/submitChange",
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.uploadList();
                    this.submitBox = true;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        submiteBoxSure(){
            this.getmanageInfo();
            this.nextFlag = true;
            this.writeFlag = false;
            this.submitBox = false;
            $('.box_nav').hide();
        },
        //查看分包
        lookoverItem(row){
            this.subcontractInforShow = true;
            this.getbiddingInfo();
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            this.subcontractName = row.subcontractName;// 分包名称 
            this.subcontractContents = row.subcontractContents;// 分包内容
            this.scopeOfTender = row.scopeOfTender;// 招标范围
            this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额    
            this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
            this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            this.lookFlag = true;
        },
        //当投标事宜变为是的时候出现
        changeFile(){
            if(this.isChangeBidMatters == "是"){
                this.isTenderShow = true;
            }else{
                this.isTenderShow = false;
            }
        },
        //当开标事宜为是的时候出现
        changeTender(){
            if(this.isChangeBidOpenMatters == "是"){
                this.OpenTenderShow = true;
            }else{
                this.OpenTenderShow = false;
            }
        },
        //新建弹框下一步中的点击附件
        goUploadPage(){
            this.uploadFlag = true;
            this.uploadList();
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
                        let obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '变更公告'){
                                $('.box_nav').hide();
                                this.nextFlag = true;
                                this.writeFlag = false;
                            }
                        })
                        
                    }else{
                        let obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '变更公告'){
                                obj.houxuanren = item
                            }
                            if(item.value == '采购公告'){
                                obj.ruchang = item
                            }
                        })
                        //采购勾且本业勾，可以看，
                        if(obj.zhaobiao.state == '办理通过' && obj.houxuanren.state == '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        //如果上一步打钩，进一步判断
                        }else if(obj.ruchang.state == '办理通过' ){
                            //如果采购打钩，则本业必须打勾
                            if(obj.zhaobiao.state == '办理通过'&& obj.houxuanren.state == '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                                //如果采购不打勾
                            }else if(obj.zhaobiao.state != '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                            }else{
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未完成采购公告,无法进行变更公告!'
                                }
                            }
                        }else{
                            //其他的都不能看
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成采购公告,无法进行变更公告!'
                            }
                        } 
                    }
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //上传列表
        uploadList(){
            let object = {};
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
                url: baseUrl+"/tenderNoticeController/selectChange",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.zhuangtai = res.data.data[0].state;
                    this.tenderNoticeId = res.data.data[0].tenderNoticeId;
                    var obj={};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                        obj={
                            relevanceCorrelationId:this.tenderNoticeId,
                            fileType:'变更文件'
                        }
                    }else{
                        obj={
                            relevanceCorrelationId:this.tenderNoticeId,
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
                }
            }).catch(err=>{
                console.log(err)
            })
            
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
            formData.append("file", this.files);
            formData.append("fileType", '变更文件');
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                formData.append("projectId", this.tenderNoticeId);
            }else{
                formData.append("projectId", this.tenderNoticeId);
            }
        
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/multifileUpload',
                data:formData
            }).then(res=>{
                if(res.data.status == 200){
                    this.uploadList();
                    $('.file_btn').val = "";
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
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName)
        },
        //删除上传文件
        handleSelectionChange(val){
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
        closeFile(){
            this.uploadFlag = false;
        },
        //办理记录查询
        async getmanageInfo(){
            await this.getInitInfo();// 初始化查询
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
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
                    this.manageData = res.data.data
                    this.manageData.map((item,index)=>{
                        item.creationTime = dayjs(item.creationTime).format('YYYY-MM-DD')
                    })
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        closeLook(){
            this.lookFlag = false;
        },
        handleClose(){
            this.saveBox = false;
            this.submitBox = false;
            this.frameShow = false;
        }
  },
  created(){
      this.getbiddingInfo();
      this.getsubList();
      this.getmanageInfo();
      this.uploadList();
      this.getDecideList();
  },
  mounted(){}
}
</script>
<style scoped>
.newBox{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
}
.wrapper,.nextWrapper{
    width: 100%;
    height: 100%;
}
/* 弹窗页面样式 */
.lookWrapper,.winWrapper,.searchWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
}
.certificateWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.certificateBox{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.certificate_main{
    flex:1;
    overflow: hidden;
    overflow-y: scroll;
}
.lookBox,.winBox,.searchBox{
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
}
.look_title,.win_title,.search_title,.certificate_title{
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

/* 按钮样式 */
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
    width: 90%;
    margin: 10px auto;
}
.notic,h6,b{
    color:red;
}
.fail_box{
    width:100%;
    margin:0 auto;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px dashed #333;
}
/* 弹窗 */
    .icon{
        width: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
    }
    .el-icon-success,.el-icon-warning{
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
    /* 列表展示 */
    .edit_list{
        padding: 15px 20px;
    }
    .editItem{
        width: 100%;
        display: flex;
        align-items:center;
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
    .star{
        color: #f00;
    }
    .editContent{
        flex: 1;
        display: flex;
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
    .editMain{
        flex:1;
         padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    .mainItem{
        flex:1;
        margin:0 0 0 5px;
        display: flex;
        flex-direction: column;
    }
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #E1E1E1;
        padding: 0 5px;
    }
    .itemBox{
        width: 100%;
        height:auto;
    }
    .itemBox>table{
        border-collapse: collapse;
        word-break: break-all;
    }
    .itemBox>tr{
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    .GridTitle.Room{
        width: 11%;
    }
    .GridTitle{
        background-color: #009EE0;
        border: 1px solid;
        border-color: White;
        color: #FFF;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        font-family: 微软雅黑;
    }
    .GridContent{
        text-align: center;
        background-color: #E5F5FC;
        border: 2px solid;
        border-color: White;
    }
    .editTit{
        display: flex;
    }
    /* +分包信息 */
    .search_input{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px 50px;
    }
    .write{
        display: flex;
        align-items: center;
    }
    .write p{
        width: 220px;
    }
    .pick_btn {
        position: absolute;
        left: 0;
        top: 500px;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 120px;
        height: 40px;
    }
    .table_box{
        overflow-y: scroll;
    }
    /* 表格 */
    .infobox_item{
        padding: 10px 0 10px 0;
    }
    .infobox_item>table>tr{
        text-align: center;
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
</style>