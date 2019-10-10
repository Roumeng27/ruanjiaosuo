<template>
    <!-- 变更采购公示 -->
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
                                <div v-if="role_types == '招标(采购)代理'  || str_entrust_type != '委托角色'">
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
                                    <div class="editItem" >
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
                                        <div class="editName"><span style="color:#f00;">*</span>公示名称：</div>
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
                                            <el-radio-group v-model="isChangeBidMatters" @change="changeFile">
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
                                        <div class="editName"><p class="star">*</p>公示期限：</div>
                                            <div class="editContent">
                                                <el-date-picker :picker-options="pickerOptions0" clearable  v-model="collectTime" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">公示说明：</div>
                                            <div class="editContent">
                                            <el-input type="textarea" v-model="announcementThat" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">主管部门全称：</div>
                                            <div class="editContent">
                                                <el-input v-model="competentDepartmentName" clearable ></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">主管部门地址：</div>
                                            <div class="editContent">
                                                <el-input v-model="competentDepartmentAddress" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">主管部门负责人：</div>
                                            <div class="editContent">
                                                <el-input v-model="responsiblePerson" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">主管部门联系方式：</div>
                                            <div class="editContent">
                                                <el-input v-model="competentDepartmePhone" clearable></el-input>
                                            </div>
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
                                    <!-- <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">递交截止时间：</div>
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
                                        <div class="editCenter"></div>
                                    </div> -->
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">递交投标文件地点：</div>
                                            <div class="editContent">
                                                <el-input v-model="submissionDocumentsPlace" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标时间：</div>
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
                                        <div class="editTextarea">
                                            <div class="editName">开标地点：</div>
                                            <div class="editContent">
                                                <el-input v-model="bidOpeningPlace" clearable></el-input>
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
                                        <div class="editTextarea">
                                            <div class="editName"></div>
                                            <div class="editContent">注：实际开评标场地以交易中心现场大屏幕显示为准</div>
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
                                    
                                    <div class="editItem" v-show="isService">
                                        <div class="editTextarea">
                                            <div class="editName">配套服务：</div>
                                            <div class="editContent">
                                                <el-checkbox-group v-model="supportingServices">
                                                    <el-checkbox v-for="workOff in offices" :label="workOff" :key="workOff">{{workOff}}</el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem" v-show="isPlace">
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
                                            <div class="editName"><p class="star">*</p>评标时间：</div>
                                            <div class="editContent">
                                                <el-date-picker value-format="timestamp" :picker-options="pickerOptions1" v-model="bidEvaluationTime" type="datetime"  placeholder="选择日期时间">
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
                                                <el-input v-model="remark" type="textarea" :rows="3"></el-input>
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
                <div class="box" v-show="headerBtn">
                    <button class="btn" @click="backTo()">上一步</button>
                    <button class="btn" @click="submitFile()">提交</button>
                </div>
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
                                <div v-if="role_types == '招标(采购)代理'  || str_entrust_type != '委托角色'">
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
                                    <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem !='办理通过' && this.stateItem !='待办理'">
                                        <template slot-scope="scope">
                                            <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage()"></i>
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
                                <div v-if="role_types == '招标(采购)代理'  || str_entrust_type != '委托角色'">
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
                            </div>
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
                        <el-table :data="fileData" style="width: 100%"  @selection-change="handleSelectionChange">
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
        agentPhone :'',
        agentAddress :"",
        biddingPurchasingAgencyName:'',//招标代理机构
        role_types:window.localStorage.role_types,
        projectObj:JSON.parse(window.localStorage.projectObj),
        saveBox:false,//保存弹框
        submitBox:false,//提交弹框
        uploadFlag:false,//上传文件弹框
        projectSubcontractCreationTime:'',//时间
        fileData:[],//上传数据
        entrySubcontractNumber:'',//入场项目分包编号
        subcontractName:'',// 分包名称
        tenderPurchaserName:'',// 招标(采购)人
        subcontractContents:'',// 分包内容
        scopeOfTender:'',// 招标范围
        subcontractingControlAmount:'',//分包控制金额
        qualificationExaminationMethod:'',//资格审查方式
        electronicBidEvaluation:'',//是否电子招投标
        lookFlag:false,//分包弹框
        enclosureData:[{
            appendixName:"变更附件",
            attachlist: []
        }],//附件数据
        attachmeId:'',
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
        noticeName:'',//公示名称
        changesDate:'',//变更日期
        pickerOptions0: {
            disabledDate: (time) => {
                return time.getTime() < Date.now() - 8.64e7;
            }
        },
        // 结束
        pickerOptions1: {
            disabledDate: (time) => {
                return time.getTime() < new Date(this.bidEvaluationTime).getTime()- (24*60*60*1000)/24;//减去一天的时间代表可以选择同一天;
            }
        },
        changeReason:'',//变更理由
        changesAs:'',//变更事项
        isChangeBidMatters:'',//是否变更投标事宜
        isTenderShow:false,//当投标事宜为是的时候出现
        collectTime:[],//招标文件发售时间
       
        enrollStartTime:'',// 公示开始时间
        enrollEndTime:'',// 公示结束时间
        saleStartTime:[],// 上午发售时间
        saleEndTime:[],// 下午发售时间
        isChangeBidOpenMatters:'',//是否变更开标事宜
        OpenTenderShow:false,//当开标事宜为是的时候出现
        submissionDocumentsPlace:'',//递交投标文件地点
        bidOpeningPlace:'',//开标地点
        bidEvaluationStandard:'',//评标办法和标准
        projectLeader:'',//项目负责人
        projectLeaderPhone:"",//联系方式
        remark:'',//备注
        nextFlag:false,
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
        stateItem:"",
        sourceNoticeId:'',
        initList:[],
        areaList:[],
        headerBtn:false,
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
        optionRoom:[
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
        ],// 开标室地点
        appointmentEvaluationRoom:'',// 是否预约评标室
        isService:false,// 控制配套服务展示隐藏
        supportingServices:[],// 配套服务
        offices:['电脑', '签字笔', '计算器', '胶带','铅笔和橡皮', '裁纸刀和剪刀', '记号笔', '投影仪','打印机', '订书器', '打包绳', '桌签和水牌','信号屏蔽器', '水杯', 'A4纸', '其他'],// 配套服务数组
        isPlace:false,// 控制评标地点展示隐藏
        bidEvaluationSite:'',// 评标地点
        bidEvaluationTime:'',// 评标时间
        lengthOfTenderEvaluation:'',// 评标时长
        bidEvaluationRoom:'',//  评标室
        bidRoom:[
            {
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
            }
        ],// 评标室列表
    }
  },
  created(){
      this.getbiddingInfo();// 招标项目信息
      this.getsubList();//分包表格
      this.getDecideList();// 页面权限
  },
  methods:{
      // 招标项目信息
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
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;//招标采购代理机构
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
        // 选择是否预约评标室
        changeRoom(){
            // 是否预约评标室
            if(this.appointmentEvaluationRoom == '是'){
                this.isService = true;// 控制配套服务展示隐藏
                this.isPlace = false;// 控制评标地点展示隐藏
            }else if(this.appointmentEvaluationRoom == '否'){
                this.isPlace = true;// 控制评标地点展示隐藏
                this.isService = false;// 控制配套服务展示隐藏
            }
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
                    if (res.data.data == null ||  res.data.data.length<=0){
                        this.writeFlag = true; // 有保存和下一步的按钮
                        this.nextFlag = false;
                    }else{
                        res.data.data.forEach(item=>{
                            if(item.state == '编辑中' || item.state == '办理未通过'){
                                this.writeFlag = false;// 有保存和下一步的按钮
                                this.nextFlag = true;// 有上一步和提交的页面
                                this.headerBtn = true;
                            }else if(item.state == '待办理'){
                                this.writeFlag = false;
                                this.headerBtn = false;// 有上一步和提交的按钮
                                this.nextFlag = true;
                            }else{
                                this.writeFlag = true;
                                this.headerBtn = false;// 有上一步和提交的按钮
                                this.nextFlag = false;
                            }
                            this.agentPhone = item.agentPhone;
                            this.agentAddress = item.agentAddress;
                            this.stateItem = item.state;// 后端返回的状态
                            this.tenderNoticeId = item.tenderNoticeId;// 公告id
                            this.sourceNoticeId = item.sourceNoticeId;
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
                            if(this.writeFlag == true){
                                if(window.sessionStorage.str_entrust_type != '委托角色' && this.role_types == '招标(采购)人'){
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
                                }else{
                                    // 变更日期
                                    if(item.changesDate == null || item.changesDate == 0 || item.changesDate == ""){
                                        this.changesDate = ""
                                    }else{
                                        this.changesDate = item.changesDate;
                                    };
                                    // 开标时间
                                    if(item.assessmentTime == 0 || item.assessmentTime == '' || item.assessmentTime == null){
                                        this.assessmentTime = ''
                                    }else{
                                        this.assessmentTime = item.assessmentTime;
                                    }
                                    // 公示开始时间
                                    if(item.enrollStartTime == 0 || item.enrollStartTime == '' || item.enrollStartTime == null){
                                        this.enrollStartTime = ''
                                    }else{
                                        this.enrollStartTime = item.enrollStartTime;
                                    }
                                    // 公示结束时间
                                    if(item.enrollEndTime == 0 || item.enrollEndTime == '' || item.enrollEndTime == null){
                                        this.enrollEndTime = ''
                                    }else{
                                        this.enrollEndTime = item.enrollEndTime;
                                    }
                                    // 公示期限
                                    let timeArr = [];
                                    timeArr.push(this.enrollStartTime,this.enrollEndTime)
                                    this.collectTime = timeArr;
                                    if(this.isService == true){
                                        this.supportingServices = item.supportingServices.split(',');// 配套服务
                                    }
                                }
                            }else if(this.nextFlag = true){
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
                               
                                
                                if(this.isService == true){
                                    this.supportingServices = item.supportingServices;// 配套服务
                                }
                            }
                        })
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
                    noticeType:"变更采购公示",
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    noticeType:"变更采购公示",
                }
            }
            return this.$axios({
                method: "POST",
                url: baseUrl+"/tenderNoticeController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.initList = res.data.data;
                    if(this.initList.length>0){
                        this.areaList = res.data.data[0].items;
                    }
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
                this.$layer.msg('请填写公示名称');
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
            }else if(this.tendereePhone != '' && this.tendereePhone != null && !isPoneAvailable(this.tendereePhone) && !checkPhone(this.tendereePhone)){
                this.$layer.msg('请正确填写联系方式');
                return false;
            }else if(this.projectLeaderPhone != '' && this.projectLeaderPhone != null && !isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){ 
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }else if(this.agentPhone != '' && this.agentPhone != null && !isPoneAvailable(this.agentPhone) && !checkPhone(this.agentPhone)){ 
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }
            // 是否变更投标事宜
            if(this.isChangeBidMatters == "是"){
                if(this.collectTime.length == 0){
                    this.$layer.msg("请选择公示日期");
                    return false;
                }else if(this.competentDepartmePhone != '' && this.competentDepartmePhone != null && !isPoneAvailable(this.competentDepartmePhone) && !checkPhone(this.competentDepartmePhone)){
                    this.$layer.msg('请输入正确的主管部门联系方式！');
                    return false;
                }
            }
            // 否变更开标事宜
            if(this.isChangeBidOpenMatters == "是"){
                if(!this.openingRoom){
                    this.$layer.msg('请选择开标室!');
                    return false;
                }else if(!this.bidEvaluationTime){
                    this.$layer.msg('请选择评标时间!');
                    return false;
                }else if(!this.bidEvaluationRoom){
                    this.$layer.msg('请选择评标室!');
                    return false;
                }
            }
            
            if(num == 1){
                this.saveBiddingInfo(num);
                this.nextFlag = false;
                this.writeFlag = true;
            }else{
                this.saveBiddingInfo(num);
                this.nextFlag = true;
                this.writeFlag = false;
                this.headerBtn = true;
            }
        },
        saveBiddingInfo(num){
            
            if(this.times == 0){
                this.assessmentTime = new Date(this.openingTime).getTime()
            }else{
                this.assessmentTime = new Date(this.assessmentTime).getTime()
            }
            let objData={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                //分包
                objData ={
                    tenderNoticeId:this.tenderNoticeId,// 主键ID
                    noticeType:'变更采购公示',
                    noticeName:this.noticeName,// 公示名称
                    changesDate:this.changesDate,// 变更日期
                    changeReason:this.changeReason,// 变更理由
                    changesAs:this.changesAs,// 变更事项
                    agentPhone:this.agentPhone,
                    agentAddress:this.agentAddress,
                    tendereeAddress:this.tendereeAddress,
                    tendereePhone:this.tendereePhone,
                    isChangeBidMatters:this.isChangeBidMatters,// 是否变更投标事宜
                    // 公示所需字段
                    enrollStartTime:this.collectTime[0],//公示日期
                    enrollEndTime:this.collectTime[1],
                    announcementThat:this.announcementThat,// 公示说明
                    competentDepartmentName:this.competentDepartmentName,// 主管部门全称
                    competentDepartmentAddress:this.competentDepartmentAddress,// 主管部门地址
                    responsiblePerson:this.responsiblePerson,// 主管部门负责人
                    competentDepartmePhone:this.competentDepartmePhone,// 主管部门联系方式
                    isChangeBidOpenMatters:this.isChangeBidOpenMatters,// 是否变更开标事宜
                    submissionDocumentsPlace:this.submissionDocumentsPlace,// 递交投标文件地点
                    assessmentTime :this.assessmentTime,// 开标时间
                    estimatedReviewDuration :this.estimatedReviewDuration,// 开标时长
                    bidOpeningPlace :this.bidOpeningPlace,// 开标地点
                    openingRoom :this.openingRoom,// 开标室
                    appointmentEvaluationRoom  :this.appointmentEvaluationRoom,// 是否预约评标室
                    supportingServices :this.supportingServices.join(','),// 配套服务
                    bidEvaluationSite :this.bidEvaluationSite,// 评标地点
                    bidEvaluationTime :this.bidEvaluationTime,// 评标时间
                    lengthOfTenderEvaluation :this.lengthOfTenderEvaluation,// 评标时长
                    bidEvaluationRoom :this.bidEvaluationRoom,// 评标室
                    bidEvaluationStandard :this.bidEvaluationStandard,// 评标办法和标准
                    projectLeader :this.projectLeader,// 项目负责人
                    projectLeaderPhone :this.projectLeaderPhone,// 联系方式
                    remark :this.remark,// 备注
                    entrySubcontractNumber: this.projectObj.totalProjectId,
                }
            }else{
                objData ={
                    tenderNoticeId:this.tenderNoticeId,// 主键ID
                    noticeType:'变更采购公示',
                    noticeName:this.noticeName,// 公示名称
                    changesDate:this.changesDate,// 变更日期
                    changeReason:this.changeReason,// 变更理由
                    changesAs:this.changesAs,// 变更事项
                    agentPhone:this.agentPhone,
                    agentAddress:this.agentAddress,
                    tendereeAddress:this.tendereeAddress,
                    tendereePhone:this.tendereePhone,
                    isChangeBidMatters:this.isChangeBidMatters,// 是否变更投标事宜
                    // 公示所需字段
                    enrollStartTime:this.collectTime[0],//公示日期
                    enrollEndTime:this.collectTime[1],
                    announcementThat:this.announcementThat,// 公示说明
                    competentDepartmentName:this.competentDepartmentName,// 主管部门全称
                    competentDepartmentAddress:this.competentDepartmentAddress,// 主管部门地址
                    responsiblePerson:this.responsiblePerson,// 主管部门负责人
                    competentDepartmePhone:this.competentDepartmePhone,// 主管部门联系方式
                    isChangeBidOpenMatters:this.isChangeBidOpenMatters,// 是否变更开标事宜
                    submissionDocumentsPlace:this.submissionDocumentsPlace,// 递交投标文件地点
                    assessmentTime :this.assessmentTime,// 开标时间
                    estimatedReviewDuration :this.estimatedReviewDuration,// 开标时长
                    bidOpeningPlace :this.bidOpeningPlace,// 开标地点
                    openingRoom :this.openingRoom,// 开标室
                    appointmentEvaluationRoom  :this.appointmentEvaluationRoom,// 是否预约评标室
                    supportingServices :this.supportingServices.join(','),// 配套服务
                    bidEvaluationSite :this.bidEvaluationSite,// 评标地点
                    bidEvaluationTime :this.bidEvaluationTime,// 评标时间
                    lengthOfTenderEvaluation :this.lengthOfTenderEvaluation,// 评标时长
                    bidEvaluationRoom :this.bidEvaluationRoom,// 评标室
                    bidEvaluationStandard :this.bidEvaluationStandard,// 评标办法和标准
                    projectLeader :this.projectLeader,// 项目负责人
                    projectLeaderPhone :this.projectLeaderPhone,// 联系方式
                    remark :this.remark,// 备注
                    entrySubcontractNumber: this.projectObj.totalProjectId,
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
                        this.agentPhone = res.data.data.agentPhone;
                        this.agentAddress = res.data.data.agentAddress;
                        this.tenderNoticeId = res.data.data.tenderNoticeId;// 公告id
                        this.sourceNoticeId = res.data.data.sourceNoticeId;
                        this.tendereeAddress = res.data.data.tendereeAddress;// 地址
                        this.tendereePhone = res.data.data.tendereePhone;// 联系方式
                        this.noticeName = res.data.data.noticeName;// 公示名称
                        this.changeReason = res.data.data.changeReason;// 变更理由
                        this.changesAs = res.data.data.changesAs;// 变更事项
                        this.isChangeBidMatters = res.data.data.isChangeBidMatters;// 是否变更投标事宜
                        this.isChangeBidOpenMatters = res.data.data.isChangeBidOpenMatters;// 是否变更开标事宜
                        if(this.isChangeBidMatters == "是"){
                            this.isTenderShow = true;
                        }else{
                            this.isTenderShow = false;
                        };
                        this.announcementThat = res.data.data.announcementThat;// 公示说明
                        this.competentDepartmentName = res.data.data.competentDepartmentName;// 主管部门全称
                        this.competentDepartmentAddress = res.data.data.competentDepartmentAddress;// 主管部门地址
                        this.responsiblePerson = res.data.data.responsiblePerson;// 主管部门负责人
                        this.competentDepartmePhone = res.data.data.competentDepartmePhone;// 主管部门联系方式
                        if(this.isChangeBidOpenMatters == "是"){
                            this.OpenTenderShow = true;
                        }else{
                            this.OpenTenderShow = false;
                        }
                        this.submissionDocumentsPlace = res.data.data.submissionDocumentsPlace;// 递交投标文件地点
                        this.bidOpeningPlace = res.data.data.bidOpeningPlace;// 开标地点
                        this.estimatedReviewDuration = res.data.data.estimatedReviewDuration;// 开标时长
                        this.openingRoom = res.data.data.openingRoom;// 开标室
                        this.appointmentEvaluationRoom= res.data.data.appointmentEvaluationRoom;// 是否预约评标室
                        if(res.data.data.appointmentEvaluationRoom == '是'){
                            this.isService = true;// 控制配套服务展示隐藏
                        }else if(res.data.data.appointmentEvaluationRoom == '否'){
                            this.isPlace = true;
                            this.bidEvaluationSite = res.data.data.bidEvaluationSite;// 评标地点
                        }
                        this.bidEvaluationTime = res.data.data.bidEvaluationTime;// 评标时间
                        this.lengthOfTenderEvaluation = res.data.data.lengthOfTenderEvaluation;// 评标时长
                        this.bidEvaluationRoom = res.data.data.bidEvaluationRoom;//  评标室
                        this.bidEvaluationStandard = res.data.data.bidEvaluationStandard;//评标办法和标准
                        this.projectLeader = res.data.data.projectLeader;//项目负责人
                        this.projectLeaderPhone = res.data.data.projectLeaderPhone;//联系方式
                        this.remark = res.data.data.remark;// 备注
                        this.creatorName = res.data.data.creatorName;// 创建人
                        this.saveTime = dayjs(res.data.data.saveTime).format('YYYY-MM-DD');// 保存时间
                        // 变更日期
                        if(res.data.data.changesDate == null || res.data.data.changesDate == 0 || res.data.data.changesDate == ""){
                            this.changesDate = ""
                        }else{
                            this.changesDate = dayjs(res.data.data.changesDate).format('YYYY-MM-DD');
                        };
                        // 开标时间
                        if(res.data.data.assessmentTime == 0 || res.data.data.assessmentTime == '' || res.data.data.assessmentTime == null){
                            this.assessmentTime = ''
                        }else{
                            this.assessmentTime = dayjs(res.data.data.assessmentTime).format('YYYY-MM-DD');
                        }
                        // 公示期限
                        if(res.data.data.enrollStartTime == 0 || res.data.data.enrollStartTime == '' || res.data.data.enrollStartTime == null){
                            this.enrollStartTime = ''
                        }else{
                            this.enrollStartTime = dayjs(res.data.data.enrollStartTime).format('YYYY-MM-DD');
                        }
                        if(res.data.data.enrollEndTime == 0 || res.data.data.enrollEndTime == '' || res.data.data.enrollEndTime == null){
                            this.enrollEndTime = ''
                        }else{
                            this.enrollEndTime = dayjs(res.data.data.enrollEndTime).format('YYYY-MM-DD');
                        }
                       
                        if(this.isService == true){
                            this.supportingServices = res.data.data.supportingServices;// 配套服务
                        }
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
                    res.data.data.forEach(item=>{
                        this.agentPhone = item.agentPhone;
                        this.agentAddress = item.agentAddress;
                        this.tendereeAddress = item.tendereeAddress;// 地址
                        this.tendereePhone = item.tendereePhone;// 联系方式
                        this.noticeName = item.noticeName;// 公示名称
                        // 变更日期
                        if(res.data.data[0].changesDate == null || res.data.data[0].changesDate == 0 || res.data.data[0].changesDate == ""){
                            this.changesDate = ""
                        }else{
                            this.changesDate = new Date(res.data.data[0].changesDate).getTime();
                        };
                        this.changeReason = item.changeReason;// 变更理由
                        this.changesAs = item.changesAs;// 变更事项
                        this.isChangeBidMatters = item.isChangeBidMatters;// 是否变更投标事宜
                        this.isChangeBidOpenMatters = item.isChangeBidOpenMatters;// 是否变更开标事宜
                        if(item.isChangeBidMatters == "是"){
                            this.isTenderShow = true;
                        }else{
                            this.isTenderShow = false;
                        };
                        this.announcementThat = item.announcementThat;// 公示说明
                        this.competentDepartmentName = item.competentDepartmentName;// 主管部门全称
                        this.competentDepartmentAddress = item.competentDepartmentAddress;// 主管部门地址
                        this.responsiblePerson = item.responsiblePerson;// 主管部门负责人
                        this.competentDepartmePhone = item.competentDepartmePhone;// 主管部门联系方式
                        if(item.isChangeBidOpenMatters == "是"){
                            this.OpenTenderShow = true;
                        }else{
                            this.OpenTenderShow = false;
                        }
                        this.submissionDocumentsPlace = item.submissionDocumentsPlace;// 递交投标文件地点
                        // 开标时间
                        if(item.assessmentTime == 0 || item.assessmentTime == '' || item.assessmentTime == null){
                            this.assessmentTime = ''
                        }else{
                            this.assessmentTime = item.assessmentTime;
                        }
                        // 公示开始时间
                        if(item.enrollStartTime == 0 || item.enrollStartTime == '' || item.enrollStartTime == null){
                            this.enrollStartTime = ''
                        }else{
                            this.enrollStartTime = item.enrollStartTime;
                        }
                        // 公示结束时间
                        if(item.enrollEndTime == 0 || item.enrollEndTime == '' || item.enrollEndTime == null){
                            this.enrollEndTime = ''
                        }else{
                            this.enrollEndTime = item.enrollEndTime;
                        }
                        // 公示期限
                        let timeArr = [];
                        timeArr.push(this.enrollStartTime,this.enrollEndTime)
                        this.collectTime = timeArr;

                        this.estimatedReviewDuration = item.estimatedReviewDuration;// 开标时长
                        this.openingRoom = item.openingRoom;// 开标室
                        this.appointmentEvaluationRoom= item.appointmentEvaluationRoom;// 是否预约评标室
                        if(item.appointmentEvaluationRoom == '是'){
                            this.isService = true;// 控制配套服务展示隐藏
                            this.supportingServices = item.supportingServices.split(',');// 配套服务
                        }else if(item.appointmentEvaluationRoom == '否'){
                            this.isPlace = true;
                            this.bidEvaluationSite = item.bidEvaluationSite;// 评标地点
                        }
                        this.bidEvaluationTime = item.bidEvaluationTime;// 评标时间
                        this.lengthOfTenderEvaluation = item.lengthOfTenderEvaluation;// 评标时长
                        this.bidEvaluationRoom = item.bidEvaluationRoom;//  评标室
                    })
                   
                }else{
                    this.$layer.msg(res.data.msg);
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
                    this.submitBox = true;
                    this.getInitInfo();// 初始化查询
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        submiteBoxSure(){
            this.getmanageInfo();// 办理记录
            this.nextFlag = true;
            this.writeFlag = false;
            this.submitBox = false;
            this.headerBtn = false;
        },
        //查看分包
        lookoverItem(row){
            this.subcontractInforShow = true;
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
        // 页面权限
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
                    let obj = {};
                    res.data.data.map((item,index)=>{
                        if(item.value == '采购异常'){
                            obj.zhaobiao = item;
                        }
                        if(item.value == '变更采购公示'){
                            obj.houxuanren = item
                        }
                        if(item.value == '采购公示'){
                            obj.ruchang = item
                        }
                    })
                    //采购勾且本业勾，可以看，
                    if(obj.zhaobiao.state == '办理通过' && obj.houxuanren.state == '办理通过'){
                        this.passJudgeShow = true;
                        this.frameShow = false;
                        this.getData();
                    //如果上一步打钩，进一步判断
                    }else if(obj.ruchang.state == '办理通过' ){
                        //如果采购打钩，则本业必须打勾
                        if(obj.zhaobiao.state == '办理通过'&& obj.houxuanren.state == '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                            this.getData();
                            //如果采购不打勾
                        }else if(obj.zhaobiao.state != '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                            this.getData();
                        }else{
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成采购公示,无法进行变更采购公示!'
                            }
                        }
                    }else{
                        //其他的都不能看
                        this.passJudgeShow = false;
                        this.frameShow = true;
                        if(obj.zhaobiao.state == '办理通过'){
                            this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                        }else{
                            this.alertMsg = '尚未完成采购公示,无法进行变更采购公示!'
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
            var obj={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                obj={
                    relevanceCorrelationId:this.tenderNoticeId,
                    fileType:'变更附件'
                }
            }else{
                obj={
                    relevanceCorrelationId:this.tenderNoticeId,
                    fileType:'变更附件'
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
        async getData(){
           await this.getInitInfo();
           this.uploadList();
           this.getmanageInfo();
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
            formData.append("fileType", '变更附件');
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
        getmanageInfo(){
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