<template>
    <div class="newBox">
      <!-- 投标邀请书 -->
        <div v-show="passJudgeShow" style="height:100%;overflow-y:scroll;">
            <div class="wrapper" v-show="writeFlag">
                <div class="box">
                    <button class="btn" @click="newly(1)">保存</button>
                    <button class="btn" @click="newly(2)">下一步</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 招标项目信息-->
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
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
                                <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}} </div>
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
                        <!-- 邀请函信息-->
                        <el-collapse-item title="邀请函信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">资质要求：</div>
                                        <div class="editMain">
                                            <div class="mainItem"> 
                                                <div class="item">
                                                    <p>企业资质要求</p>
                                                    <el-button @click="newCertificate">新增资质</el-button>
                                                </div>
                                                <div class="itemBox" v-if="this.certificateBox.length>0">
                                                    <table width='100%' cellspacing="0" cellpadding="0" align="center" border="0" valign="center">
                                                        <tbody>
                                                            <tr style="height:30px;">
                                                                <td class="GridTitle Room">序号</td>
                                                                <td class="GridTitle Room">资质名称</td>
                                                                <td class="GridTitle Room">操作</td> 
                                                            </tr>
                                                            <tr style="height:32px;" v-for="(item,index) in certificateBox" :key="index">
                                                                <td class="GridContent">{{index+1}}</td>
                                                                <td class="GridContent">{{item.label}}</td>
                                                                <td class="GridContent" style="cursor:pointer;" @click="deleteInfoItem(item.qualificationId)">X</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="mainItem">
                                                <div class="item">
                                                    <p>项目负责人资质要求</p>
                                                    <el-button @click="newleader()">新增资质</el-button>
                                                </div>
                                                <div class="itemBox" v-if="this.leaderBox.length>0">
                                                    <table width='100%' cellspacing="0" cellpadding="0" align="center" border="0" valign="center">
                                                        <tbody>
                                                            <tr style="height:30px;">
                                                                <td class="GridTitle Room">序号</td>
                                                                <td class="GridTitle Room">资质名称</td>
                                                                <td class="GridTitle Room">操作</td> 
                                                            </tr>
                                                            <tr style="height:32px;" v-for="(item,index) in leaderBox" :key="index">
                                                                <td class="GridContent">{{index+1}}</td>
                                                                <td class="GridContent">{{item.label}}</td>
                                                                <td class="GridContent" style="cursor:pointer;" @click="deleteInfoArea(item.qualificationId)">X</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="noteContent">
                                        <div class="noteLeft" style="vertical-align:top;">其他资格要求：</div>
                                        <div class="noteFlex otherPre">
                                            <el-input type="textarea" class="other_box" v-model="otherQualifications">
                                            </el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editTit" ><p class="star">*</p>招标文件发售时间：</div>
                                        <div class="editContent">
                                            <el-date-picker v-model="collect_time" :picker-options="pickerOptions0" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <span class="editTit" style="width:40px;">上午：</span>
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
                                        <div class="editTit" style="width:40px;">下午：</div>
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
                                    <div class="editTextarea">
                                        <div class="editName">招标文件发售地点：</div>
                                        <div class="editContent">
                                            <el-input v-model="venueBiddingDocuments" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>招标文件工本费(元)：</div>
                                        <div class="editContent">
                                            <el-input v-model="costBiddingDocuments" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName" style="width:200px !important;">招标文件工本费接收账户：</div>
                                        <div class="editContent">
                                            <el-input type="textarea" v-model="costBiddingDocumentsAccount" clearable></el-input>
                                        </div>
                                        <!-- <el-button plain>设置账户</el-button> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>投标人需提交资料：</div>
                                        <div class="editContent">
                                            <el-input v-model="biddersRequiredSubmitInformation" clearable></el-input>
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
                                            <el-input v-model="contactMode" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">
                                            <el-input v-model="remarks" type="textarea" :rows="3" ></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
             <!-- 下一步弹框 -->
            <div class="nextWrapper" v-show="nextFlag">
                <div class="box">
                    <button class="btn" @click="getlastTemp()">上一步</button>
                    <button class="btn" @click="submitFile()">提交</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName1" accordion>
                        <!-- 招标项目信息-->
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}}</div>
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
                                <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}} </div>
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
                        <!-- 邀请函信息 -->
                        <el-collapse-item title="邀请函信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业资质要求：</div>
                                        <div class="editContent">{{enterpriseQualification}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人资质要求：</div>
                                        <div class="editContent">{{qualificationProjectLeader}}</div>
                                    </div>
                                </div>
                                <div  class="editItem" style="height:auto !important;">
                                    <div class="editTextarea">
                                        <div class="editName">其他资格要求：</div>
                                        <div class="editContent">
                                            <span style="color:#6e622e;">
                                                {{otherQualifications}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">招标文件发售时间：</div>
                                        <div class="editContent">{{saleTenderDocumentsStartTime}}到{{saleTenderDocumentsEndTime}} 上午{{morningbegin}}到{{morningend}}，下午{{afterbegin}}到{{afterend}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标文件发售地点：</div>
                                        <div class="editContent">{{venueBiddingDocuments}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标文件工本费(元)：</div>
                                        <div class="editContent">{{costBiddingDocuments}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:156px;">招标文件工本费接收账户：</div>
                                        <div class="editContent">{{costBiddingDocumentsAccount}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">投标人需提交资料：</div>
                                        <div class="editContent">{{biddersRequiredSubmitInformation}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式:</div>
                                        <div class="editContent">{{contactMode}}</div>
                                    </div>
                                </div>
                                <!-- 备注 -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">{{remarks}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 邀请单位信息 -->
                        <el-collapse-item title="邀请单位信息" name="3" v-show="inviteFlag">
                            <div class="inviteTitle">
                                <div class="inviteBtn" id="invite_box">
                                    <button class="btn"  id="invite_box" @click="addUnit">新增邀请单位</button>
                                    <button class="btn"  id="invite_box" @click="sendInvite">发出邀请函</button>
                                </div>
                                <div style="padding-right:10px;">
                                    <el-radio-group v-model="invitationStatus" size="small" @change="changeRadio">
                                        <el-radio label="">全部</el-radio>
                                        <el-radio label="未发出">未发出</el-radio>
                                        <el-radio label="已发出">已发出</el-radio>
                                    </el-radio-group> 
                                </div>
                            </div>
                            <div style="margin-top:15px;"  v-show="edify_flag">
                                <el-table :data="unitInformateData" stripe style="width: 100%"  @selection-change="handleFileChange">
                                    <el-table-column type="selection" width="55" align='center'>
                                    </el-table-column>
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column prop="companyName" label="单位名称" :show-overflow-tooltip = 'true'>
                                    </el-table-column>
                                    <el-table-column  prop="projectLeader" label="项目负责人">
                                    </el-table-column>
                                    <el-table-column prop="invitationTime" label="发出时间">
                                    </el-table-column>
                                    <el-table-column prop="isPayTenderFee" label="支付标书费">
                                    </el-table-column>
                                    <el-table-column prop="isPayDeposit" label="缴纳保证金">
                                    </el-table-column>
                                    <el-table-column prop="invitationStatus" label="邀请函状态">
                                    </el-table-column>
                                    <el-table-column prop="state" label="回执件状态">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.state == '报名成功'&& scope.row.invitationStatus == '已发出'">参加</span>
                                            <span v-if="scope.row.state == '报名失败'&& scope.row.invitationStatus == '已发出'">不参加</span>
                                            <span v-if="scope.row.state == null && scope.row.invitationStatus == '已发出'">未确认</span>
                                            <span v-if="scope.row.invitationStatus == '未发出'"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="operation" label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit" style="cursor:pointer;" @click="modifyFile(scope.row)" v-if="scope.row.invitationStatus != '已发出'"></i>
                                            <i class="el-icon-search" style="cursor:pointer;" @click="lookSendFile(scope.row)" v-else></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="operation" label="修改" v-show="edify_flag">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit" style="cursor:pointer;" @click="modifyFile(scope.row)" v-if="scope.row.state == '报名成功'&& scope.row.invitationStatus == '已发出'"></i>
                                            <i v-else></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- v-else -->
                            <div style="margin-top:15px;" v-show="!edify_flag">
                                <el-table :data="unitInformateData" stripe style="width: 100%"  @selection-change="handleFileChange">
                                    <el-table-column type="selection" width="55" align='center'>
                                    </el-table-column>
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column prop="companyName" label="单位名称" :show-overflow-tooltip = 'true'>
                                    </el-table-column>
                                    <el-table-column  prop="projectLeader" label="项目负责人">
                                    </el-table-column>
                                    <el-table-column prop="invitationTime" label="发出时间">
                                    </el-table-column>
                                    <el-table-column prop="isPayTenderFee" label="支付标书费">
                                    </el-table-column>
                                    <el-table-column prop="isPayDeposit" label="缴纳保证金">
                                    </el-table-column>
                                    <el-table-column prop="invitationStatus" label="邀请函状态">
                                    </el-table-column>
                                    <el-table-column prop="state" label="回执件状态">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.state == '报名成功'&& scope.row.invitationStatus == '已发出'">参加</span>
                                            <span v-if="scope.row.state == '报名失败'&& scope.row.invitationStatus == '已发出'">不参加</span>
                                            <span v-if="scope.row.state == null && scope.row.invitationStatus == '已发出'">未确认</span>
                                            <span v-if="scope.row.invitationStatus == '未发出'"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="operation" label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit" style="cursor:pointer;" @click="modifyFile(scope.row)" v-if="scope.row.invitationStatus != '已发出'"></i>
                                            <i class="el-icon-search" style="cursor:pointer;" @click="lookSendFile(scope.row)" v-else></i>
                                        </template>
                                    </el-table-column>
                                    <!-- <el-table-column prop="operation" label="修改">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit" style="cursor:pointer;" @click="modifyFile(scope.row)" v-if="scope.row.state == '报名成功'&& scope.row.invitationStatus == '已发出'"></i>
                                            <i v-else></i>
                                        </template>
                                    </el-table-column> -->
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="4">
                            <div>
                                <el-table :data="manageDate" stripe style="width: 100%">
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
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
             <!-- 企业资质要求 -->
            <div class="certificateWrapper" v-show="certificateFlag">
                <div class="certificateBox">
                    <div class="certificate_title">
                        <p>资质列表</p>
                        <i class="el-icon-close" style="cursor:pointer;" @click="closeCertificate"></i>
                    </div>
                    <div class="certificate_main">
                        <el-tree
                            :data="certificateData"
                            show-checkbox
                            ref="DeviceGroupTree"
                            node-key="qualificationId"
                            check-strictly
                            @check="checkGroupNode">
                        </el-tree>
                    </div>
                </div>
            </div>
            <!-- 项目负责人资质要求 -->
            <div class="certificateWrapper" v-show="leaderFlag">
                <div class="certificateBox">
                    <div class="certificate_title">
                        <p>项目负责人资质要求</p>
                        <i class="el-icon-close"  style="cursor:pointer;"  @click="closeCertificate"></i>
                    </div>
                    <div class="certificate_main">
                        <el-tree
                            :data="leaderData"
                            show-checkbox
                            ref="DeviceLeaderTree"
                            node-key="qualificationId"
                            check-strictly
                            @check="checkLeaderNode">
                        </el-tree>
                    </div>
                </div>
            </div>
             <!-- 新增邀请单位 -->
            <div class="newWrapper" v-show="addInforUnitShow">
                <div class="newaddBox">
                    <div class="newTitle">
                        <p>邀请单位录入</p>
                        <i class="el-icon-close" @click="closeAddInforShow"></i>
                    </div>
                    <div class="boxBtn">
                        <button class="btn add_file" @click="addNewCompany">新增</button>
                        <button class="btn edit_file" @click="modifyCompany">修改邀请名单</button>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="activeName2" accordion>
                            <!-- 招标项目信息 -->
                            <el-collapse-item title="招标项目信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目名称：</div>
                                            <div class="editContent">{{nameOfTenderProject}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人：</div>
                                            <div class="editContent">{{tenderPurchaserName}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">招标项目金额：</div>
                                            <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目编号：</div>
                                            <div class="editContent">{{totalProjectId}}</div>
                                        </div>
                                    </div>
                                    <!-- 表格 -->
                                    <div class="table_box" >
                                        <el-table :data="enclosureData" stripe style="width: 100%"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                            <el-table-column
                                                label="序号">
                                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
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
                            <!-- 投标邀请 -->
                            <el-collapse-item title="投标邀请" name="2">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">企业资质要求：</div>
                                            <div class="editContent">{{enterpriseQualification}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">项目负责人资质要求：</div>
                                            <div class="editContent">{{qualificationProjectLeader}}</div>
                                        </div>
                                    </div>
                                    <div  class="editItem" style="height:auto !important;">
                                        <div class="editTextarea">
                                            <div class="editName">其他资格要求：</div>
                                            <div class="editContent">
                                                <span style="color:#6e622e;height:200px;">
                                                    {{otherQualifications}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>企业名称：</div>
                                            <div class="editContent" style="width:190px;color:#6e622e;">{{companyName == ''?'请选择投标企业':companyName}}</div>
                                            <el-button plain @click="chooseUnit">选择</el-button>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">企业资质：</div>
                                            <div class="editContent">{{professionalLevel}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">企业组织机构代码：</div>
                                            <div class="editContent">{{organizationCode}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">企业资质编号：</div>
                                            <div class="editContent">{{certificateNum}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系人：</div>
                                            <div class="editContent">
                                                <el-input v-model="bidContacts" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">手机号码：</div>
                                            <div class="editContent">
                                                <el-input v-model="telephone" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">座机号码：</div>
                                            <div class="editContent">
                                                <el-input v-model="companyPhone" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>投标回执截止时间：</div>
                                            <div class="editContent">
                                                <el-date-picker
                                                v-model="deadlineBidReceipt"
                                                type="datetime"
                                                placeholder="选择日期时间"
                                                :picker-options="pickerOptions0"
                                                value-format = 'timestamp'>
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 标书费缴纳记录 -->
                            <el-collapse-item title="标书费缴纳记录" name="3">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">是否已缴纳标书费：</div>
                                            <div class="editContent">
                                                <el-radio-group v-model="isPayTenderFee" @change="getisPayTenderFee">
                                                    <el-radio label="是">是</el-radio>
                                                    <el-radio label="否">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">标书费金额（元）：</div>
                                            <div class="editContent">{{costBiddingDocuments}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">缴纳时间：</div>
                                            <div class="editContent">
                                                <el-date-picker
                                                    v-model="payTenderFeeTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    value-format="timestamp"
                                                    :picker-options="pickerOptions0">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 保证金缴纳记录 -->
                            <el-collapse-item title="保证金缴纳记录" name="4">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">缴纳时间：</div>
                                            <div class="editContent">
                                                <el-date-picker
                                                    v-model="payDepositTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    value-format="timestamp"
                                                    :picker-options="pickerOptions0">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">缴纳金额（元）：</div>
                                            <div class="editContent">
                                                <el-input v-model="payDepositAmount" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">备注：</div>
                                            <div class="editContent">
                                                <el-input v-model="payDepositRemark" clearable type="textarea" :rows="5"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                   <el-table :data="appendixData" stripe style="width: 100%">
                                        <el-table-column prop="appendixName" label="附件名称">
                                        </el-table-column>
                                        <el-table-column label="附件列表(点击查看)">
                                            <template slot-scope="scope">
                                                <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="liItem">
                                                    {{item.fileName}}
                                                </li>
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="100" v-if="this.state != '办理通过' && this.state != '待办理'">
                                            <template slot-scope="scope">
                                                <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage()"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
           
            <!-- 查看邀请单位录入 -->
            <div class="lookWrapper" v-show="lookUnitShow">
                <div class="lookBox">
                    <div class="lookTitle">
                        <p>邀请单位录入</p>
                        <i class="el-icon-close" @click="closeAddInforShow"></i>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="activeName2" accordion>
                            <!-- 招标项目信息 -->
                            <el-collapse-item title="招标项目信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目名称：</div>
                                            <div class="editContent">{{nameOfTenderProject}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人：</div>
                                            <div class="editContent">{{tenderPurchaserName}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">招标项目金额：</div>
                                            <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目编号：</div>
                                            <div class="editContent">{{totalProjectId}}</div>
                                        </div>
                                    </div>
                                    <!-- 表格 -->
                                    <div class="table_box" >
                                        <el-table :data="enclosureData" stripe style="width: 100%"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
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
                            <!-- 投标邀请 -->
                            <el-collapse-item title="投标邀请" name="2">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">企业资质要求：</div>
                                            <div class="editContent">{{enterpriseQualification}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">项目负责人资质要求：</div>
                                            <div class="editContent">{{qualificationProjectLeader}}</div>
                                        </div>
                                    </div>
                                    <div  class="editItem" style="height:auto !important;">
                                        <div class="editTextarea">
                                            <div class="editName">其他资格要求：</div>
                                            <div class="editContent">
                                                <span style="color:#6e622e;height:200px;">
                                                    {{otherQualifications}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">企业名称：</div>
                                            <div class="editContent">{{companyName}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">企业资质：</div>
                                            <div class="editContent">{{professionalLevel}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">企业组织机构代码：</div>
                                            <div class="editContent">{{organizationCode}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">企业资质编号：</div>
                                            <div class="editContent">{{certificateNum}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系人：</div>
                                            <div class="editContent">{{bidContacts}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">手机号码：</div>
                                            <div class="editContent">{{telephone}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">座机号码：</div>
                                            <div class="editContent">{{companyPhone}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">投标回执截止时间：</div>
                                            <div class="editContent">{{deadlineBidReceipt}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 投标保证金缴纳记录 -->
                            <el-collapse-item title="投标保证金缴纳记录" name="3">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">缴纳时间：</div>
                                            <div class="editContent">{{payDepositTime}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">缴纳金额(元)：</div>
                                            <div class="editContent">{{payDepositAmount}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">备注：</div>
                                            <div class="editContent">{{payDepositRemark}}</div>
                                        </div>
                                    </div>
                                </div>
                                <el-table :data="appendixData" stripe style="width: 100%">
                                    <el-table-column prop="appendixName" label="附件名称">
                                    </el-table-column>
                                    <el-table-column label="附件列表(点击查看)">
                                        <template slot-scope="scope">
                                            <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="liItem">
                                                {{item.fileName}}
                                            </li>
                                        </template>
                                    </el-table-column>
                                    <!-- <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem !='报名成功'">
                                        <template slot-scope="scope">
                                            <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                        </template>
                                    </el-table-column> -->
                                </el-table>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
            <!-- 查看分包信息弹框 -->
            <div class="lookWrapper" v-show="subcontractInforShow">
                <div class="lookBox">
                    <div class="lookTitle">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeSubShow"></i>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="activeName0" accordion>
                            <!-- 招标项目信息 -->
                            <el-collapse-item title="招标项目信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目名称：</div>
                                            <div class="editContent">{{nameOfTenderProject}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人：</div>
                                            <div class="editContent">{{tenderPurchaserName}} </div>
                                        </div>
                                        <div class="editCenter" v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                            <div class="editName" >招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}} </div>
                                        </div>
                                        <div class="editCenter" v-if="this.projectObj.totalProjectId.indexOf('-') != -1">
                                            <div class="editName" >入场项目编号：</div>
                                            <div class="editContent">{{totalProjectId}} </div>
                                        </div>
                                        <div class="editCenter" v-else>
                                            <div class="editName" >入场项目(分包)编号：</div>
                                            <div class="editContent">{{entrySubcontractNumber}} </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 分包信息 -->
                            <el-collapse-item title="分包信息" name="2">
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
                                            <div class="editName">招标范围：</div>
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
            <!-- 选择企业 -->
            <div class="lookWrapper" v-show="chooseShow">
                <div class="lookBox">
                    <div class="lookTitle">
                        <p>单位列表</p>
                        <i class="el-icon-close" @click="closeFile"></i>
                    </div>
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">单位名称：</div>
                            <div class="editContent">
                                <el-input v-model="officalName" @keyup.enter.native="searchPeopleList" clearable></el-input>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">组织机构代码：</div>
                            <div class="editContent">
                                <el-input v-model="organizationCode" @keyup.enter.native="searchPeopleList" clearable></el-input>
                            </div>
                        </div>
                        <button class="btn" @click="searchPeopleList" style="height:40px;width:100px;">搜索</button>
                    </div>
                    <div class="main_info">
                        <div>
                            <el-table :data="chooseData" style="width: 100%" >
                                <el-table-column
                                    label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column prop="companyName" label="单位名称">
                                </el-table-column>
                                <el-table-column  prop="isStartUsing" label="单位状态">
                                </el-table-column>
                                <el-table-column prop="operation" label="选择">
                                    <template slot-scope="scope">
                                        <i class="el-icon-plus" style="cursor:pointer;" @click="addChooseFile(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 上传文件 -->
            <div class="uploadWrapper" v-show="uploadFlag">
                <div class="uploadBox">
                    <div class="upload_title">
                        <p>投标保证金缴纳凭证附件</p>
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
            <!-- 确认保存弹窗 -->
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
                    <el-button type="primary" @click="saveSure">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 确认提交弹窗 -->
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
                    <el-button type="primary" @click="submitSave">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 发出邀请函弹框 -->
            <el-dialog
                title="信息确认"
                :visible.sync="inviteBox"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-question"></i>
                    <span>您确定发出选中的邀请函吗？</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="inviteSave">确 定</el-button>
                </span>
            </el-dialog>
        </div>
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
import baseUrl from '../../../api/api.js'
import dayjs from "dayjs"
import {formatDate,formatTime,isEmpty,changeTime,checkNumber,isPoneAvailable,checkPhone,checkEmail,dubRemove} from '../../../api/base.js'
export default {
  components:{},
  props:{},
  data(){
    return {
        edify_flag:true,
        frameShow:false,
        alertMsg:'',
        str_entrust_type:window.sessionStorage.str_entrust_type,
        role_types:window.localStorage.role_types,
        biddingPurchasingAgencyName:'',
        agentAddress :'',
        agentPhone :'',
        attachmeId:'',
        uploadFlag:false,
        uploadTitle:'',
        fileData:[],
        state:'',
        stateItem:'',
        isPayTenderFee:'',//是否缴纳
        costBiddingDocuments:'',//标书费金额
        payTenderFeeTime:'',//标书缴纳金额
        payDepositTime:'',//缴费时间
        payDepositAmount:"",//缴费金额
        payDepositRemark:"",//缴费备注
        officalName:'',
        pickerOptions0: {
            disabledDate: (time) => {
                return time.getTime() < Date.now() - 8.64e7;
            }
        },
        lookUnitShow:false,
        invitaStr:'',
        myTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
        invitationTime:'',//发出时间
        electronicBidEvaluation:'',//电子化开评标
        qualificationExaminationMethod:'',//资格审查方式
        subcontractingControlAmount:'',//分包控制金额
        scopeOfTender:'',//分包范围
        subcontractContents:"",//分包内容
        subcontractName:'',//分包名称
        entrySubcontractNumber:'',
        totalProjectId:'',
        activeName0:['1','2'],
        subcontractInforShow:false,
        inviteBox:false,//邀请函弹框
        bidInforId:[],//发出邀请函主键id
        professionalLevel:'',//企业资质
        certificateNum:'',//企业资质编号
        organizationCode:'',//企业组织机构代码
        value:"",
        otherQualifications:'合格的投标人必须同时满足下述资格要求:\n(1)符合中华人民共和国政府招标法第二十二条之规定,即:\n1)具有独立承担民事责任的能力;\n2)具有良好的商业信誉和健全的财务会计制度;\n3)具有履行合同所必需的设备和专业技术能力;\n4)有依法缴纳税收和社会保障资金的良好记录;\n5)参加政府采购活动前三年内,在经营活动中没有重大违法记录;\n6)法律,行政法规规定的其他条件;\n(2)投标人须具有____________(可根据具体情况增加);\n(3)单位负责人为同一人或者存在控股,管理关系的不同单位,不得同时参加投标;\n(4)其采购项目提供整体设计,规范编制或者项目管理,监理,检测等服务的供应商,不得再参加该采购项目的其他采购活动;\n(5)其他____________(采购人或采购代理机构可根据项目情况自行添加);',
        projectObj:JSON.parse(window.localStorage.projectObj),
        value:'',
        totalProId:'',//编号
        inviteFlag:false,//邀请单位弹框
        writeFlag:true,
        passJudgeShow:true,
        nextFlag:false,
        certificateFlag:false,//企业资质要求
        leaderFlag:false,//项目负责人资质要求
        saveBox:false,
        submitBox:false,
        addInforUnitShow:false,//新增邀请单位
        chooseShow:false,//选择
        currentPage:1,
        certificateData:[],//企业列表
        leaderData:[],//项目负责人列表
        activeName:['1','2'],
        activeName1:['1','2','3','4'],
        activeName2:['1','2','3','4'],
        nameOfTenderProject:'',//招标项目名称
        tenderPurchaserName:'',//招标采购人
        biddingProjectNumber:'',//招标项目编号
        amountOfBiddingProject:'',//招标项目金额
        tendereeAddress:'',//地址
        tendereePhone:'',//联系方式
        certificateBox:[],//企业资质表
        companyInfo:[],
        leaderBox:[],//项目负责人资质表
        leaderInfo:[],
        collect_time:[],//招标文件发售时间
        saleTenderDocumentsStartTime:'',//招标文件开始时间
        saleTenderDocumentsEndTime:'',//招标文件结束时间
        saleTimeMorning:'',//大上午
        saleTimeAfternoon:'',//大下午
        morningbegin:'8:00',//上午
        morningend:'12:00',//上午
        afterbegin:'14:00',//下午
        afterend:'17:30',//下午结束
        venueBiddingDocuments:'',//发售地点
        costBiddingDocuments:'',//文件工本费
        costBiddingDocumentsAccount:'',//账户
        biddersRequiredSubmitInformation:'',//投标人提交资料
        submitTime:'',//递交投标文件截止时间
        projectLeader:'',//项目负责人
        contactMode:'',//联系方式
        remarks:"",//备注
        manageDate:[],//办理记录
        unitInformateData:[],//邀请单位信息
        enclosureData:[],//分包表格
        chooseData:[],//选择
        enterpriseQualification:'',//企业资质要求
        qualificationProjectLeader:'',//项目负责人资质要求
        deadlineBidReceipt:'',//投标回执截止时间
        invitationBidId:'',//投标书邀请id
        invitationStatus:'',
        bidContacts:'',//邀请单位联系人
        telephone:'',//手机号码
        companyPhone:'',//座机号码
        companyName:'',//公司单位
        budgetAmount:'',
        appendixData:[
            {
                appendixName: "投标保证金缴纳凭证附件",
                attachlist: []
            }
        ]
    }
  },
  created(){
      this.getbiddingInfo();// 招标项目信息
      this.getmanageInfo();//办理记录列表
      this.getInviteList();//邀请单位信息列表
      this.getSubList();//查询分包表格信息
      this.getDecideList();
  },
  methods:{
        checkMoney(){
            if(!checkNumber(this.costBiddingDocuments)){
                this.$layer.msg('工本费请输入数字类型');
            }
        },
        getisPayTenderFee(){
            console.log(this.isPayTenderFee)
        },
        //查询分包表格信息
        getSubList(){
            let lookArr = [];
            lookArr.push(this.projectObj.totalProjectId)
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:lookArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.enclosureData = res.data.data
                }else{
                    this.$layer.msg(res.data.msg);;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 招标项目信息
        getbiddingInfo(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
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
                    this.sourceOfFunds =res.data.data.sourceOfFunds//资金来源
                    this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                }else{
                    this.$layer.msg(res.data.msg);;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查询初始化判断
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
                url:baseUrl + '/bidInvitationController/selectByCode',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data == null || res.data.data.state == null){
                        this.writeFlag = true;
                        this.nextFlag = false;
                    }else if(res.data.data.state == '编辑中' || res.data.data.state == '办理未通过'){
                        this.writeFlag = false;
                        this.nextFlag = true;
                        $('.box').show();
                    }else if(res.data.data.state == '待办理'){
                        this.writeFlag = false;
                        this.nextFlag = true;
                        $('.box').hide();
                    }else if (res.data.data.state == '办理通过'){
                        this.writeFlag = false;
                        this.nextFlag = true;
                        $('.box').hide();
                        this.inviteFlag = true;
                    }
                    this.agentAddress = res.data.data.agentAddress;
                    this.agentPhone = res.data.data.agentPhone;
                    this.invitationBidId = res.data.data.invitationBidId;
                    this.tendereeAddress = res.data.data.address;
                    this.tendereePhone = res.data.data.contactInformation;
                    this.costBiddingDocuments = res.data.data.costBiddingDocuments;
                    this.otherQualifications = res.data.data.otherQualifications;//其他资格要求
                    if(res.data.data.deadlineBidReceipt == null){
                        this.deadlineBidReceipt = ''
                    }else{
                        this.deadlineBidReceipt = dayjs(res.data.data.deadlineBidReceipt).format('YYYY-MM-DD HH:mm:ss');//投标回执截止时间
                    }
                    
                    this.saleTenderDocumentsStartTime = dayjs(res.data.data.saleTenderDocumentsStartTime).format('YYYY-MM-DD');//招标文件发售开始时间
                    this.saleTenderDocumentsEndTime = dayjs(res.data.data.saleTenderDocumentsEndTime).format('YYYY-MM-DD');//招标文件发售结束时间
                    
                    //上午下午时间
                    this.saleTimeMorning=res.data.data.saleTimeMorning.split(',');
                    this.morningbegin = this.saleTimeMorning[0];
                    this.morningend = this.saleTimeMorning[1];
                    this.saleTimeAfternoon=res.data.data.saleTimeAfternoon.split(',');
                    this.afterbegin = this.saleTimeAfternoon[0];
                    this.afterend = this.saleTimeAfternoon[1];
                    this.venueBiddingDocuments = res.data.data.venueBiddingDocuments;//发售地点
                    this.costBiddingDocuments = res.data.data.costBiddingDocuments;//工本费
                    this.costBiddingDocumentsAccount = res.data.data.costBiddingDocumentsAccount;//工本费接收账户
                    this.biddersRequiredSubmitInformation = res.data.data.biddersRequiredSubmitInformation;//投标人需提交资料
                    this.projectLeader = res.data.data.projectLeader;//项目负责人
                    this.contactMode = res.data.data.contactMode;//联系方式
                    this.remarks = res.data.data.remarks;//备注
                    this.certificateBox = JSON.parse(res.data.data.enterpriseQualification);// 企业资质要求
                    if(this.certificateBox.length>0){
                        this.certificateBox = dubRemove(this.certificateBox);
                        let arr = [];
                        this.certificateBox.forEach(item=>{
                            arr.push(item.label);
                        })
                        this.companyInfo = arr;
                        this.enterpriseQualification = this.companyInfo.toString();
                    }
                    this.leaderBox = JSON.parse(res.data.data.qualificationProjectLeader);// 项目负责人资质要求
                    if(this.leaderBox.length>0){
                        this.leaderBox = dubRemove(this.leaderBox);
                        let newArr = [];
                        this.leaderBox.forEach(item=>{
                            newArr.push(item.label);
                        })
                        this.leaderInfo = newArr;
                        this.qualificationProjectLeader = this.leaderInfo.toString();
                    }
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //邀请单位信息列表
        getInviteList(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    invitationUnit:'邀请单位',
                    invitationStatus:''
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    invitationUnit:'邀请单位',
                    invitationStatus:''
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/bidInforController/selectList',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.unitInformateData = res.data.data;
                    this.unitInformateData.map((item,index)=>{
                        if(item.invitationTime == ""||item.invitationTime == null){
                            item.invitationTime = ""
                        }else{
                            item.invitationTime = dayjs(item.invitationTime).format('YYYY-MM-DD HH:mm:ss');
                        }   
                        if(item.payDepositAmount =='' || item.payDepositAmount == 0 || item.payDepositAmount ==null){
                            item.isPayDeposit = '未缴纳'
                        }else{
                            item.isPayDeposit = '已缴纳'
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        // 新增企业资质
        newCertificate(){
            this.certificateFlag = true;
            this.$axios({
                method: "POST",
                url: baseUrl+"/qualificationMenuController/queryMenuList",
                data:{
                    menuType:"企业资质要求"
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.certificateData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //企业树状点击
        checkGroupNode(a,b){
            let flag = true;
            this.certificateBox.forEach(item=>{
                if(item.qualificationId == a.qualificationId){
                    flag =false;
                }
            })
            if(flag){
                this.certificateBox.push(a);
            }
            if(this.certificateBox.length>0){
                this.certificateFlag = false;
            }
            if (b.checkedKeys.length > 0) {
                this.$refs.DeviceGroupTree.setCheckedKeys([a.qualificationId]);
            }
        },
        //删除企业资质
        deleteInfoItem(id){
            for (let i=0; i<this.certificateBox.length; i++) {  
                 if (this.certificateBox[i].qualificationId == id) {  
                    this.certificateBox.splice(i, 1);    
                }  
            } 
        },
        //新增项目负责人资质
        newleader(){
            this.leaderFlag = true;
            this.$axios({
                method: "POST",
                url: baseUrl+"/qualificationMenuController/queryMenuList",
                data:{
                    menuType:"项目负责人资质要求"
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.leaderData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //项目负责人树状点击
        checkLeaderNode(a,b){
            let flag = true;
            this.leaderBox.forEach(item=>{
                if(item.qualificationId == a.qualificationId){
                    flag =false;
                }
            })
            if(flag){
                this.leaderBox.push(a);
            }
            if(this.leaderBox.length>0){
                this.leaderFlag = false;
            }
            if (b.checkedKeys.length > 0) {
                this.$refs.DeviceLeaderTree.setCheckedKeys([a.qualificationId]);
            }
        },
        //删除项目负责人资质
        deleteInfoArea(id){
            for (let i=0; i<this.leaderBox.length; i++) {  
                 if (this.leaderBox[i].qualificationId == id) {  
                    this.leaderBox.splice(i, 1);    
                }  
            } 
        },
        closeCertificate(){
            this.certificateFlag = false;
            this.leaderFlag = false;
        },
        newly(num){
            if(this.collect_time.length == 0){
                this.$layer.msg('请选择招标文件发售时间');
                return false;
            }else if(!this.morningbegin || !this.morningend || !this.afterbegin || !this.afterend){
                this.$layer.msg('请选择招标文件发售时间');
                return false;
            }else if(!this.costBiddingDocuments){
                this.$layer.msg('请填写招标文件工本费!');
                return false;
            }else if(this.costBiddingDocuments != "" && !checkNumber(this.costBiddingDocuments)){
                this.$layer.msg('请填写正确的招标文件工本费!');
                return false;
            }else if(!this.biddersRequiredSubmitInformation){
                this.$layer.msg('请填写投标人需提交资料');
                return false;
            }else if(this.tendereePhone != "" && this.tendereePhone != null && !isPoneAvailable(this.tendereePhone) && !checkPhone(this.tendereePhone)){
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }else if(this.contactMode != ""  && this.contactMode != null && !isPoneAvailable(this.contactMode) && !checkPhone(this.contactMode)){
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }else if(this.agentPhone != ""  && this.agentPhone != null && !isPoneAvailable(this.agentPhone) && !checkPhone(this.agentPhone)){
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }else{
                if(num == 1){
                    this.saveInfo(num);// 保存
                }else{
                    this.nextFlag = true;// 有上一步和提交的按钮
                    this.writeFlag = false;// 有保存和下一步的按钮
                    this.saveInfo(num);// 保存
                }
            }
        },
        // 保存弹窗---->确定
        saveSure(){
            this.saveBox = false;
        },
        // 保存的方法
        saveInfo(num){
            let cerArr = [];
            let leaderArr = [];
            this.certificateBox.map((item,index)=>{
                cerArr.push(item.label);
            })
            this.enterpriseQualification = cerArr.join(',');
            this.leaderBox.map((item,index)=>{
                leaderArr.push(item.label);
            })
            this.qualificationProjectLeader = leaderArr.join(',');
            // 上午发售时间
            let morningArr = [];
            morningArr.push(this.morningbegin,this.morningend)
            this.saleTimeMorning = morningArr.toString();
            // 下午发售时间
            let afterArr = [];
            afterArr.push(this.afterbegin,this.afterend)
            this.saleTimeAfternoon = afterArr.toString();
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    agentAddress:this.agentAddress,
                    agentPhone:this.agentPhone,
                    address:this.tendereeAddress,
                    contactInformation:this.tendereePhone,
                    enterpriseQualification:JSON.stringify(this.certificateBox),//企业资质要求
                    qualificationProjectLeader:JSON.stringify(this.leaderBox),//项目负责人资质要求
                    otherQualifications:this.otherQualifications,//其他资格要求
                    saleTenderDocumentsStartTime:this.collect_time[0],//招标文件发售开始时间
                    saleTenderDocumentsEndTime:this.collect_time[1],//招标文件发售结束时间
                    saleTimeMorning:this.saleTimeMorning,//上午
                    saleTimeAfternoon:this.saleTimeAfternoon,//下午
                    venueBiddingDocuments:this.venueBiddingDocuments,//发售地点
                    costBiddingDocuments:this.costBiddingDocuments,//工本费
                    costBiddingDocumentsAccount:this.costBiddingDocumentsAccount,//工本费接收账户
                    biddersRequiredSubmitInformation:this.biddersRequiredSubmitInformation,//投标人需提交资料
                    projectLeader:this.projectLeader,//项目负责人
                    contactMode:this.contactMode,//联系方式
                    remarks:this.remarks,//备注
                    operationFlow:'投标邀请书',
                    invitationBidId:this.invitationBidId
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    agentAddress:this.agentAddress,
                    agentPhone:this.agentPhone,
                    address:this.tendereeAddress,
                    contactInformation:this.tendereePhone,
                    enterpriseQualification:JSON.stringify(this.certificateBox),//企业资质要求
                    qualificationProjectLeader:JSON.stringify(this.leaderBox),//项目负责人资质要求
                    otherQualifications:this.otherQualifications,//其他资格要求
                    saleTenderDocumentsStartTime:this.collect_time[0],//招标文件发售开始时间
                    saleTenderDocumentsEndTime:this.collect_time[1],//招标文件发售结束时间
                    saleTimeMorning:this.saleTimeMorning,//上午
                    saleTimeAfternoon:this.saleTimeAfternoon,//下午
                    venueBiddingDocuments:this.venueBiddingDocuments,//发售地点
                    costBiddingDocuments:this.costBiddingDocuments,//工本费
                    costBiddingDocumentsAccount:this.costBiddingDocumentsAccount,//工本费接收账户
                    biddersRequiredSubmitInformation:this.biddersRequiredSubmitInformation,//投标人需提交资料
                    projectLeader:this.projectLeader,//项目负责人
                    contactMode:this.contactMode,//联系方式
                    remarks:this.remarks,//备注
                    operationFlow:'投标邀请书',
                    invitationBidId:this.invitationBidId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/bidInvitationController/saveOrNext',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.agentAddress = res.data.data.agentAddress;
                    this.agentPhone = res.data.data.agentPhone;
                    this.address = res.data.data.address;
                    this.biddersRequiredSubmitInformation  = res.data.data.biddersRequiredSubmitInformation; // 投标人需提交资料
                    this.contactInformation  = res.data.data.contactInformation;// 招标项目信息联系方式
                    this.contactMode = res.data.data.contactMode;// 邀请函信息联系方式
                    this.costBiddingDocuments = res.data.data.costBiddingDocuments;// 招标文件工本费(
                    this.costBiddingDocumentsAccount = res.data.data.costBiddingDocumentsAccount;// 招标文件工本费接收账户
                    this.certificateBox = JSON.parse(res.data.data.enterpriseQualification);// 企业资质要求
                    if(this.certificateBox.length>0){
                        this.certificateBox = dubRemove(this.certificateBox);
                        let arr = [];
                        this.certificateBox.forEach(item=>{
                            arr.push(item.label);
                        })
                        this.companyInfo = arr;
                        this.enterpriseQualification = this.companyInfo.toString();
                    }
                    this.leaderBox = JSON.parse(res.data.data.qualificationProjectLeader);// 项目负责人资质要求
                    if(this.leaderBox.length>0){
                        this.leaderBox = dubRemove(this.leaderBox);
                        let newArr = [];
                        this.leaderBox.forEach(item=>{
                            newArr.push(item.label);
                        })
                        this.leaderInfo = newArr;
                        this.qualificationProjectLeader = this.leaderInfo.toString();
                    }
                    this.invitationBidId = res.data.data.invitationBidId;// 主键ID
                    this.otherQualifications = res.data.data.otherQualifications;// 其他资格要求
                    this.projectLeader=res.data.data.projectLeader;//项目负责人
                    this.remarks=res.data.data.remarks;//备注
                    // 招标文件发售时间 上午
                    this.saleTimeMorning=res.data.data.saleTimeMorning.split(',');
                    this.morningbegin = this.saleTimeMorning[0];
                    this.morningend = this.saleTimeMorning[1];
                    // 招标文件发售时间 下午
                    this.saleTimeAfternoon=res.data.data.saleTimeAfternoon.split(',');
                    this.afterbegin = this.saleTimeAfternoon[0];
                    this.afterend = this.saleTimeAfternoon[1];
                    this.venueBiddingDocuments= res.data.data.venueBiddingDocuments;// 招标文件发售地点
                    if(num== 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                    }
                    // 招标文件开始时间
                    if(res.data.data.saleTenderDocumentsStartTime == null){
                        this.saleTenderDocumentsStartTime = ""
                    }else{
                        this.saleTenderDocumentsStartTime =dayjs(res.data.data.saleTenderDocumentsStartTime).format('YYYY-MM-DD');
                    };
                    // 招标文件结束时间
                    if(res.data.data.saleTenderDocumentsEndTime == null){
                        this.saleTenderDocumentsEndTime = ""
                    }else{
                        this.saleTenderDocumentsEndTime =dayjs(res.data.data.saleTenderDocumentsEndTime).format('YYYY-MM-DD');
                    }
                    // 投标邀请时间
                    if(res.data.data.deadlineBidReceipt == null){
                        this.deadlineBidReceipt = ""
                    }else{
                        this.deadlineBidReceipt = dayjs(res.data.data.deadlineBidReceipt).format('YYYY-MM-DD HH:mm:ss');
                    };
                     
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //上一步
        getlastTemp(){
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
                url:baseUrl + '/bidInvitationController/selectByCode',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.nextFlag = false;
                    this.writeFlag = true;
                    this.agentAddress = res.data.data.agentAddress;
                    this.agentPhone = res.data.data.agentPhone;
                    this.address = res.data.data.address;
                    this.biddersRequiredSubmitInformation  = res.data.data.biddersRequiredSubmitInformation; // 投标人需提交资料
                    this.contactInformation  = res.data.data.contactInformation;// 招标项目信息联系方式
                    this.contactMode = res.data.data.contactMode;// 邀请函信息联系方式
                    this.costBiddingDocuments = res.data.data.costBiddingDocuments;// 招标文件工本费(
                    this.costBiddingDocumentsAccount = res.data.data.costBiddingDocumentsAccount;// 招标文件工本费接收账户
                    this.invitationBidId = res.data.data.invitationBidId;// 主键ID
                    this.otherQualifications = res.data.data.otherQualifications;// 其他资格要求
                    this.projectLeader=res.data.data.projectLeader;//项目负责人
                    this.technologyQualifications=res.data.data.technologyQualifications;// 简要规格描述或项目基本情况
                    this.applicantQualifications=res.data.data.applicantQualifications;// 供应商资格条件
                    if(res.data.data.enterpriseQualification!= null){
                        this.certificateBox=JSON.parse(res.data.data.enterpriseQualification)// 企业资质要求
                    }
                    if(res.data.data.qualificationProjectLeader!=null){
                        this.leaderBox=JSON.parse(res.data.data.qualificationProjectLeader);// 项目负责人资质要求
                    }
                    this.remarks=res.data.data.remarks;//备注
                    // 招标文件发售时间
                    let arr = [];
                    this.saleTenderDocumentsStartTime = new Date(res.data.data.saleTenderDocumentsStartTime).getTime();
                    this.saleTenderDocumentsEndTime = new Date(res.data.data.saleTenderDocumentsEndTime).getTime();
                    arr.push(this.saleTenderDocumentsStartTime,this.saleTenderDocumentsEndTime);
                    this.collect_time = arr;
                    // 招标文件发售时间 上午
                    this.saleTimeMorning=res.data.data.saleTimeMorning.split(',');
                    this.morningbegin = this.saleTimeMorning[0];
                    this.morningend = this.saleTimeMorning[1];
                    // 招标文件发售时间 下午
                    this.saleTimeAfternoon=res.data.data.saleTimeAfternoon.split(',');
                    this.afterbegin = this.saleTimeAfternoon[0];
                    this.afterend = this.saleTimeAfternoon[1];
                    this.venueBiddingDocuments= res.data.data.venueBiddingDocuments;// 招标文件发售地点
                    // 招标文件开始时间
                    this.saleTenderDocumentsStartTime =new Date(res.data.data.saleTenderDocumentsStartTime).getTime();
                    // 招标文件结束时间
                    this.saleTenderDocumentsEndTime =new Date(res.data.data.saleTenderDocumentsEndTime).getTime();
                    // 投标邀请时间
                    if(res.data.data.deadlineBidReceipt == null){
                        this.deadlineBidReceipt = ""
                    }else{
                        this.deadlineBidReceipt = dayjs(res.data.data.deadlineBidReceipt).format('YYYY-MM-DD HH:mm:ss');
                    }; 
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //提交
        submitFile(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/bidInvitationController/submit',
                data:{
                    invitationBidId:this.invitationBidId,
                    operationFlow:'投标邀请书',
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.submitBox = true;
                    this.getInitInfo();// 初始化查询
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        submitSave(){
            this.submitBox = false;
            this.getmanageInfo();// 办理记录查询
        },
        //邀请单位信息单选框查询
        changeRadio(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    invitationUnit:'邀请单位',
                    invitationStatus:this.invitationStatus
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    invitationUnit:'邀请单位',
                    invitationStatus:this.invitationStatus
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/bidInforController/selectList',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.unitInformateData = res.data.data;
                    this.unitInformateData.map((item,index)=>{
                        if(item.invitationTime == ""||item.invitationTime == null){
                            item.invitationTime = ""
                        }else{
                            item.invitationTime = dayjs(item.invitationTime).format('YYYY-MM-DD HH:mm:ss');
                        }   
                        if(item.payDepositAmount =='' || item.payDepositAmount == 0 || item.payDepositAmount ==null){
                            item.isPayDeposit = '未缴纳'
                        }else{
                            item.isPayDeposit = '已缴纳'
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 单位列表 搜索
        searchPeopleList(){ 
            if(this.officalName == '' && this.organizationCode == ''){
                return ;       
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/userController/selectList",
                    data:{
                        companyName:this.officalName,
                        organizationCode:this.organizationCode,
                        type:'同步企业'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.chooseData = res.data.data.data;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        //企业+号
        addChooseFile(row){
            this.companyName = row.companyName;
            this.organizationCode = row.organizationCode;
            this.bidCompany = row.userId;
            this.chooseShow = false;
        },
        //企业资质要求、项目负责人资质要求
        getRequestList(){
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
                url:baseUrl + '/bidInvitationController/selectByCode',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.otherQualifications = res.data.data.otherQualifications;//其他资格要求
                    this.certificateBox = JSON.parse(res.data.data.enterpriseQualification);// 企业资质要求
                    if(this.certificateBox.length>0){
                        this.certificateBox = dubRemove(this.certificateBox);
                        let arr = [];
                        this.certificateBox.forEach(item=>{
                            arr.push(item.label);
                        })
                        this.companyInfo = arr;
                        this.enterpriseQualification = this.companyInfo.toString();
                    }
                    this.leaderBox = JSON.parse(res.data.data.qualificationProjectLeader);// 项目负责人资质要求
                    if(this.leaderBox.length>0){
                        this.leaderBox = dubRemove(this.leaderBox);
                        let newArr = [];
                        this.leaderBox.forEach(item=>{
                            newArr.push(item.label);
                        })
                        this.leaderInfo = newArr;
                        this.qualificationProjectLeader = this.leaderInfo.toString();
                    }
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //新增邀请单位
        addUnit(){
            this.addInforUnitShow = true;
            $('.add_file').show();
            $('.edit_file').hide();
            this.enterpriseQualification = "";
            this.qualificationProjectLeader = "";
            this.otherQualifications = "";
            this.companyName = "";
            this.professionalLevel = "";
            this.certificateNum = "";
            this.organizationCode = "";
            this.bidContacts = "";
            this.telephone = "";
            this.companyPhone = "";
            this.deadlineBidReceipt = "";
            this.getSubList();
            this.getRequestList(); //企业资质要求、项目负责人资质要求
        },
        //新增按钮
        addNewCompany(){
            this.getRequestList();//企业资质要求、项目负责人资质要求
            if(this.companyName == ""){
                this.$layer.msg('请输入企业名称！');
                return false;
            }else if(!this.deadlineBidReceipt){
                this.$layer.msg('请输入投标回执截至时间！');
                return false;
            }else if(this.telephone != "" && this.telephone != null && !isPoneAvailable(this.telephone) && !checkPhone(this.telephone)){
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }else if(this.companyPhone != "" && this.companyPhone != null && !checkPhone(this.companyPhone)){
                this.$layer.msg('请输入正确的座机号码！例如：0000-0000000');
                return false;
            }else{
                if(this.unitInformateData.length == 0){
                    let object={}
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        object={
                            entrySubcontractNumber:this.projectObj.totalProjectId,
                            invitationUnit:'邀请单位',
                            bidCompany:this.bidCompany,
                            bidContacts:this.bidContacts,
                            telephone:this.telephone,
                            companyPhone:this.companyPhone,
                            deadlineBidReceipt:this.deadlineBidReceipt,
                            payTenderFeeTime:this.payTenderFeeTime,
                            isPayTenderFee:this.isPayTenderFee,
                            payDepositTime:this.payDepositTime,
                            payDepositAmount:this.payDepositAmount,
                            payDepositRemark:this.payDepositRemark,
                        }
                    }else{
                        // 入场项目编号
                        object ={
                            projectCode:this.projectObj.totalProjectId,
                            invitationUnit:'邀请单位',
                            bidCompany:this.bidCompany,
                            bidContacts:this.bidContacts,
                            telephone:this.telephone,
                            companyPhone:this.companyPhone,
                            deadlineBidReceipt:this.deadlineBidReceipt,
                            payTenderFeeTime:this.payTenderFeeTime,
                            isPayTenderFee:this.isPayTenderFee,
                            payDepositTime:this.payDepositTime,
                            payDepositAmount:this.payDepositAmount,
                            payDepositRemark:this.payDepositRemark,
                        }
                    }
                    this.$axios({
                        method:'POST',
                        url:baseUrl + '/bidInforController/save',
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.addInforUnitShow = false;
                            this.getInviteList();//邀请单位信息列表
                        }else{
                            this.$layer.msg(res.data.msg)
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    let flag = true;
                    this.unitInformateData.forEach(item=>{
                        if(this.bidCompany == item.bidCompany){
                            this.$layer.msg('不能添加相同id的单位名称');
                            flag = false;
                        }
                    }) 
                    if(flag){
                        let object={}
                        if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                            // 入场项目分包编号
                            object={
                                entrySubcontractNumber:this.projectObj.totalProjectId,
                                invitationUnit:'邀请单位',
                                bidCompany:this.bidCompany,
                                bidContacts:this.bidContacts,
                                telephone:this.telephone,
                                companyPhone:this.companyPhone,
                                deadlineBidReceipt:this.deadlineBidReceipt,
                                payTenderFeeTime:this.payTenderFeeTime,
                                isPayTenderFee:this.isPayTenderFee,
                                payDepositTime:this.payDepositTime,
                                payDepositAmount:this.payDepositAmount,
                                payDepositRemark:this.payDepositRemark,
                            }
                        }else{
                            // 入场项目编号
                            object ={
                                projectCode:this.projectObj.totalProjectId,
                                invitationUnit:'邀请单位',
                                bidCompany:this.bidCompany,
                                bidContacts:this.bidContacts,
                                telephone:this.telephone,
                                companyPhone:this.companyPhone,
                                deadlineBidReceipt:this.deadlineBidReceipt,
                                payTenderFeeTime:this.payTenderFeeTime,
                                isPayTenderFee:this.isPayTenderFee,
                                payDepositTime:this.payDepositTime,
                                payDepositAmount:this.payDepositAmount,
                                payDepositRemark:this.payDepositRemark,
                            }
                        }
                        this.$axios({
                            method:'POST',
                            url:baseUrl + '/bidInforController/save',
                            data:object
                        }).then(res=>{
                            if(res.data.status == 200){
                                this.addInforUnitShow = false;
                                this.getInviteList();//邀请单位信息列表
                            }else{
                                this.$layer.msg(res.data.msg)
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                }
            }
            
        },
        //关闭新增
        closeAddInforShow(){
            this.addInforUnitShow = false;
            this.lookUnitShow = false;
        },
        closeSubShow(){
            this.subcontractInforShow = false;
        },
        //修改弹框
        modifyFile(row){
            this.addInforUnitShow = true;
            $('.add_file').hide();
            $('.edit_file').show();
            this.companyName = row.companyName;
            this.professionalLevel = row.professionalLevel;
            this.certificateNum = row.certificateNum;
            this.organizationCode = row.organizationCode;
            this.bidContacts = row.bidContacts;
            this.telephone = row.telephone;
            this.companyPhone = row.companyPhone;
            this.bidInforId = row.bidInforId;
            this.isPayTenderFee = row.isPayTenderFee;
            if(row.payTenderFeeTime == null || row.payTenderFeeTime == 0){
                this.payTenderFeeTime = ""
            }else{
                this.payTenderFeeTime = row.payTenderFeeTime;
            }
            if(row.payDepositTime == null || row.payDepositTime == 0){
                this.payDepositTime = ""
            }else{
                this.payDepositTime = row.payDepositTime;
            }
            this.payDepositAmount = row.payDepositAmount;
            this.payDepositRemark = row.payDepositRemark
            // 投标回执截止时间
            if(row.deadlineBidReceipt == 0 || row.deadlineBidReceipt == null){
                this.deadlineBidReceipt = '';
            }else{
                this.deadlineBidReceipt = row.deadlineBidReceipt;
            }
            this.getRequestList();
        },
        //已发出状态
        lookSendFile(row){
            this.lookUnitShow = true;
            this.stateItem = row.state;
            this.companyName = row.companyName;
            this.professionalLevel = row.professionalLevel;
            this.certificateNum = row.certificateNum;
            this.organizationCode = row.organizationCode;
            this.bidContacts = row.bidContacts;
            this.telephone = row.telephone;
            this.companyPhone = row.companyPhone;
            this.bidInforId = row.bidInforId;
            this.isPayTenderFee = row.isPayTenderFee;
            if(row.payTenderFeeTime == null || row.payTenderFeeTime == 0){
                this.payTenderFeeTime = ""
            }else{
                this.payTenderFeeTime = dayjs(row.payTenderFeeTime).format('YYYY-MM-DD HH:mm:ss');
            }
            if(row.payDepositTime == null || row.payDepositTime == 0){
                this.payDepositTime = ""
            }else{
                this.payDepositTime = dayjs(row.payDepositTime).format('YYYY-MM-DD HH:mm:ss');
            }
            this.payDepositAmount = row.payDepositAmount;
            this.payDepositRemark = row.payDepositRemark;
            if(row.deadlineBidReceipt == null || row.deadlineBidReceipt == 0){
                this.deadlineBidReceipt = ""
            }else{
                this.deadlineBidReceipt = dayjs(row.deadlineBidReceipt).format('YYYY-MM-DD HH:mm:ss')
            }
            this.getRequestList();
        },
        //修改邀请单位名单
        modifyCompany(){
            this.getRequestList();
            if(this.companyName == ""){
                this.$layer.msg('请输入企业名称！');
                return false;
            }else if(!this.deadlineBidReceipt){
                this.$layer.msg('请输入投标回执截至时间！');
                return false;
            }else if(this.telephone != "" && this.telephone != null && !isPoneAvailable(this.telephone) && !checkPhone(this.telephone)){
                this.$layer.msg('请输入正确的联系方式！');
                return false;
            }else if(this.companyPhone != "" && this.companyPhone != null && !checkPhone(this.companyPhone)){
                this.$layer.msg('请输入正确的座机号码！例如：0000-0000000');
                return false;
            }else{
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        invitationUnit:'邀请单位',
                        bidCompany:this.bidCompany,
                        bidContacts:this.bidContacts,
                        telephone:this.telephone,
                        companyPhone:this.companyPhone,
                        bidInforId:this.bidInforId,
                        deadlineBidReceipt:this.deadlineBidReceipt,
                        payTenderFeeTime:this.payTenderFeeTime,
                        isPayTenderFee:this.isPayTenderFee,
                        payDepositTime:this.payDepositTime,
                        payDepositAmount:this.payDepositAmount,
                        payDepositRemark:this.payDepositRemark,
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        invitationUnit:'邀请单位',
                        bidCompany:this.bidCompany,
                        bidContacts:this.bidContacts,
                        telephone:this.telephone,
                        companyPhone:this.companyPhone,
                        bidInforId:this.bidInforId,
                        deadlineBidReceipt:this.deadlineBidReceipt,
                        payTenderFeeTime:this.payTenderFeeTime,
                        isPayTenderFee:this.isPayTenderFee,
                        payDepositTime:this.payDepositTime,
                        payDepositAmount:this.payDepositAmount,
                        payDepositRemark:this.payDepositRemark,
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/bidInforController/update',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.addInforUnitShow = false;
                        this.getInviteList();//邀请单位信息列表
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            
        },
        handleFileChange(val){
            let arr = [];
			for(let i in val){
                arr.push(val[i].bidInforId);
                this.invitaStr = val[i].invitationStatus;
            }
			this.bidInforId = arr;
        },
        //发出邀请函
        sendInvite(){
            if(this.bidInforId.length == 0){
                this.$layer.msg('未选择可发出的数据');
                return false;
            }else {
                if(this.invitaStr == '已发出'){
                    this.$layer.msg('不能再次发出邀请函');
                    return false;
                }else{
                    this.inviteBox = true;
                }
            }
            
        },
        inviteSave(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    listId:this.bidInforId,
                    invitationTime:new Date(this.myTime).getTime()
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    listId:this.bidInforId,
                    invitationTime:new Date(this.myTime).getTime()
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/bidInforController/sendInvitations',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.inviteBox = false;
                    this.getInviteList();//邀请单位信息列表
                }else{
                    this.$layer.msg(res.data.msg);
                    this.inviteBox = false;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 选择企业
        chooseUnit(){
            this.chooseShow = true;
            this.chooseData = [];
            this.officalName = "";
            this.organizationCode = "";
        },
        closeFile(){
            this.chooseShow = false;
            this.officalName = "";
            this.organizationCode = "";
        },
        //查看分包弹框
        lookFile(row){
            this.subcontractInforShow = true;
            this.entrySubcontractNumber = row.entrySubcontractNumber;
            this.subcontractName = row.subcontractName;
            this.subcontractContents = row.subcontractContents;
            this.scopeOfTender = row.scopeOfTender;
            this.subcontractingControlAmount = row.subcontractingControlAmount;
            this.qualificationExaminationMethod = row.qualificationExaminationMethod;
            this.electronicBidEvaluation = row.electronicBidEvaluation;
        },
        //办理记录列表
        async getmanageInfo(){
            await this.getInitInfo()
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.invitationBidId
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.invitationBidId
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
                        res.data.data.map((item,index)=>{
                            if(item.value == "投标邀请书"){
                                if(item.state != "办理通过"){
                                    this.frameShow = true;
                                    this.passJudgeShow = false;
                                    this.alertMsg = "项目经办人尚未执行此操作，不可查看!"
                                    $('#invite_box').hide();
                                }else{
                                    this.frameShow = false;
                                    this.passJudgeShow = true;
                                    $('#invite_box').hide();
                                    this.edify_flag = false;
                                }
                            }
                        })
                    }else{
                        res.data.data.map((item,index)=>{
                            if(item.value == "投标邀请书"){
                                if(item.state == "办理通过"){
                                    this.inviteFlag = true;
                                }
                            }
                            // if(item.value == "场地预约"){
                            //     if(item.state == "办理通过"){
                            //         this.passJudgeShow = true;
                            //         this.frameShow = false;
                            //     }else{
                            //         this.frameShow = true;
                            //         this.passJudgeShow = false;
                            //     }
                            // }
                        })
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
            let object={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                object={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'投标保证金缴纳凭证附件'
                }
                
            }else{
                object={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'投标保证金缴纳凭证附件'
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
                    this.appendixData[0].attachlist = arr;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 删除文件列表多选框
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
                // 分包
                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '投标保证金缴纳凭证附件');
            }else{
                // 总包
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '投标保证金缴纳凭证附件');
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
        goUploadPage(){
            this.uploadFlag = true;
            this.uploadList();
        },
        closeUpload(){
            this.uploadFlag = false;
        },
        handleClose(){
            this.saveBox = false;
            this.submitBox = false;
            this.inviteBox = false;
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
    display: flex;
    flex-direction: column;
}
.lookWrapper{
    width: 87%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 100;
    padding:50px 20px;
    display: flex;
    flex-direction: column;
}
.newWrapper{
    width: 87%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:20px 20px;
    display: flex;
    flex-direction: column;
}
.lookBox,.newaddBox{
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin:0 auto;
}
.lookTitle,.newTitle{
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
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px 0 2px;
}
.boxBtn{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px 0 2px;
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
.el-collapse{
    width: 95%;
    margin: 10px auto;
}
.main_info {
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.notic,h6,b{
    color:red;
}

h1{
    font-weight: normal;
}
.noteContent .noteLeft {
  display: inline-block;
}

.noteContent .noteFlex {
  flex: 1;
  flex-direction: column;
  display: inline-block;
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
.el-icon-warning,.el-icon-question{
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
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
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
.el-date-editor--timerange.el-input__inner,.el-date-editor--daterange.el-input__inner{
    width: 225px !important;
}
.el-date-editor .el-range-separator{
    width: 10% !important;
}
.pagination {
  width: 100%;
  margin: 30px 0;
  text-align: right;
  position: fixed;
  right: 0;
  bottom: 10px;
  margin-right: 30px;
  }

  .file_btn{
    position: absolute;
    right: 65px;
    top:35px;
    display: inline-block;
    width: 59px;
    height: 40px;
    border:none;
    outline: none;
    background-color: transparent;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
    background: #0095d5;
    cursor: pointer;
  }


.table_box{
    margin-top: 10px;
    height: 200px;
    overflow-y: scroll;
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
    position: relative;
    overflow: hidden;
    overflow-y: scroll;
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
.other_box{
    width: 850px;
    height: auto;
    border: 1px solid #ccc;
    padding: 10px;
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
    width: 50%;
    display: flex;
    padding: 5px 0;
    align-items: center;
}
.editName{
     width: 145px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.editContent{
    width:210px !important;
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
    display: flex;
}
.editContent>.el-select{
    width:100% !important;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.star{
    color: #f00;
}
.inviteTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.inviteBtn{
    display: flex;
    height: 100%;
}
.uploadWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
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
</style>