<template>
  <div class="myDiv">
    <!-- 上一步弹框 -->
    <div v-show="show" style="height:100%;">
        <div class="new_nav">
            <button class="nav_co nav_save" @click="saveFile()">保存</button>
            <button class="nav_co nav_next" @click="nextTo()">下一步</button>
        </div>
        <div class="main top_box">
            <el-collapse v-model="activeName" accordion>
                <!-- 招标项目信息-->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目名称：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购人及金额 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标(采购)人：</div>
                                    <div class="noteFlex">
                                        <span>{{tenderPurchaserName}}</span>
                                    </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">招标项目金额(万元)：</span>
                                    <span>{{amountOfBiddingProject}}</span>
                                </div>
                                </div>
                            </div>
                            <!-- 招标及入场编号 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目编号：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProjectNumber}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 地址 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">地址：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="tendereeAddress"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 联系方式 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">联系方式：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="tendereePhone"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 分包信息 -->
                <el-collapse-item title="分包信息" name="2"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                    <div>
                        <div style="padding-left:10px;font-weight:bold;">若需添加多分包，请点击<i class="el-icon-plus"  @click="addSubpack()" style="font-size:24px;cursor:pointer;"></i>按钮</div>
                        <div class="table_box">
                            <el-table :data="subpackgeData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column prop="subcontractName" :show-overflow-tooltip ="true" label="分包名称">
                                </el-table-column>
                                <el-table-column  prop="subcontractingControlAmount" :show-overflow-tooltip ="true" label="分包控制金额(万元)" width="100">
                                </el-table-column>
                                <el-table-column prop="entrySubcontractNumber" :show-overflow-tooltip ="true" label="入场项目(分包)编号">
                                </el-table-column>
                                <el-table-column prop="operation" label="查看">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="operation"  :show-overflow-tooltip ="true" label="招标内容">
                                    <template slot-scope="scope">
                                        <i class="el-icon-edit" style="cursor:pointer;" @click="auditEditFile(scope.row)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="operation" label="删除">
                                    <template slot-scope="scope">
                                        <i class="el-icon-close" style="cursor:pointer;"  @click="deleteTable(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 招标内容 -->
                <el-collapse-item title="招标内容" name="2"  v-if="projectObj.totalProjectId.indexOf('-') == -1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!-- 内容 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标内容：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="noticeName"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购数量及用途 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">采购数量：</div>
                                    <div class="noteFlex">
                                    <el-input v-model="purchaseAmount"></el-input>
                                    </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">采购用途：</span>
                                    <el-input v-model="purchasePurposes"></el-input>
                                </div>
                                </div>
                            </div>
                            <!--申请人资格条件  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">申请人资格条件：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="applicantQualifications"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 简要技术要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">简要技术要求：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="technologyQualifications"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 设置报名要求 -->
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">设置报名要求：</div>
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
                                                <el-button @click="newleader">新增资质</el-button>
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
                            <!-- <div class="noteBox" style="margin-top:5px;">
                                <div class="noteContent">
                                    <div class="noteLeft">设置报名要求：</div>
                                    <div style="padding-left:5px;width:40%;margin-right:4%;display:flex;justify-content:space-between;background:#e1e1e1;">
                                        <span>企业资质要求</span>
                                        <el-button @click="">新增资质</el-button>
                                    </div>
                                    <div style="padding-left:5px;width:40%;display:flex;justify-content:space-between;background:#e1e1e1;gext-align:right;">
                                        <span>项目负责人资质要求</span>
                                        <el-button>新增资质</el-button>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 公告信息 -->
                <el-collapse-item title="公告信息" name="3">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">公告名称：</div>
                                    <div class="noteFlex">
                                    <el-input v-model="noticeName"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!--时间  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>报名时间：</div>
                                    <div class="noteFlex">
                                        <el-date-picker id="focus0"  v-model="applicationTime" value-format="timestamp" type="datetimerange"  range-separator="至"  start-placeholder="报名开始日期"  end-placeholder="报名结束日期">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <!-- 资格预审文件领取时间 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft" style="width:308px;"><span style="color:#f00;">*</span>资格预审文件领取时间：</div>
                                    <div class="noteTime">
                                        <div class="timeBox">
                                            <el-date-picker id="focus1" v-model="collectTime" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div style="display: inline-flex;margin-left:5px;">
                                        <span style="width:55px;">上午</span>
                                        <div class="noteTime">
                                            <div class="timeBox" style="display:flex;">
                                                <el-time-select placeholder="开始" v-model="morningbegin" :picker-options="{ start: '08:00',  step: '00:30',  end: '12:30'}">
                                                </el-time-select>
                                                <span>-</span>
                                                <el-time-select placeholder="结束" v-model="morningend" :picker-options="{ start: '08:00',  step: '00:30',  end: '12:30'}">
                                                </el-time-select>
                                            </div>
                                        </div>
                                        <span style="width:55px;">下午</span>
                                        <div class="noteTime">
                                            <div class="timeBox"  style="display:flex;">
                                                <el-time-select
                                                    placeholder="开始"
                                                    v-model="afterbegin"
                                                    :picker-options="{
                                                        start: '12:30',
                                                        step: '00:30',
                                                        end: '17:30'
                                                    }">
                                                </el-time-select>
                                                <span>-</span>
                                                <el-time-select
                                                    placeholder="结束"
                                                    v-model="afterend"
                                                    :picker-options="{
                                                        start: '12:30',
                                                        step: '00:30',
                                                        end: '17:30'
                                                    }">
                                                </el-time-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--资格预审文件领取地点  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">资格预审文件领取地点：</div>
                                    <div class="noteFlex">
                                    <el-input v-model="tenderDocumentsSaleSite"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标文件工本费 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>文件工本费：</div>
                                    <div class="noteFlex">
                                    <el-input id="focus2"  v-model="tenderDocumentsCost"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标文件工本费接收账户 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">文件工本费接收账户：</div>
                                    <div class="noteFlex">
                                    <el-input v-model="costAcceptAccount" type="textarea"></el-input>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;">
                                    <!-- <el-button>设置账户</el-button> -->
                                    </div>
                                </div>
                            </div>
                            <!-- 投标人需提交资料 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>投标人需提交资料：</div>
                                    <div class="noteFlex">
                                    <el-input id="focus3"  v-model="bidderData"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 递交截止时间 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">递交申请文件截止时间：</div>
                                    <div class="noteFlex">
                                        <el-date-picker v-model="submitTime" value-format="timestamp" type="datetime" placeholder="选择日期时间">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <!--递交投标文件地点  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">递交投标文件地点：</div>
                                    <div class="noteFlex">
                                    <span>软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦(中发智造)五层）</span>
                                    </div>
                                </div>
                            </div>
                            <!--负责人和联系方式  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">项目负责人：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="projectLeader"></el-input>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">联系方式:</span>
                                        <el-input v-model="projectLeaderPhone" id="focus4" @blur="blurPhone()"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 备注 -->
                            <div class="noteBox" style="margin-bottom:10px;">
                                <div class="noteContent">
                                    <div class="noteLeft">备注：</div>
                                    <div class="noteFlex">
                                    <el-input v-model="remark"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
    <!-- 下一步弹框 -->
    <div v-show="nextShow" style="height:100%;">
        <div class="new_nav">
            <button class="nav_co nav_save" @click="submitFile()">提交</button>
            <button class="nav_co nav_next" @click="backTo()">上一步</button>
        </div>
        <div class="main top_box">
            <el-collapse v-model="activeName" accordion>
                <!-- 招标项目信息-->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目名称：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购人及金额 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标(采购)人：</div>
                                    <div class="noteFlex">
                                        <span>{{tenderPurchaserName}}</span>
                                    </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">招标项目金额(万元)：</span>
                                    <span>{{amountOfBiddingProject}}</span>
                                </div>
                                </div>
                            </div>
                            <!-- 招标及入场编号 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目编号：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProjectNumber}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 地址 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">地址：</div>
                                    <div class="noteFlex">
                                        <span>{{tendereeAddress}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 联系方式 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">联系方式：</div>
                                    <div class="noteFlex">
                                        <span>{{tendereePhone}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 附件 -->
                <el-collapse-item title="附件" name="2">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                        <el-table :data="enclosureData" stripe style="width: 100%">
                            <el-table-column prop="appendixName" label="附件名称" width="200">
                            </el-table-column>
                            <el-table-column label="附件列表(点击查看)">
                            <template slot-scope="scope">
                                <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="temLi">
                                    {{item.fileName}}
                                </li>
                            </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100"  v-if="this.zhuangtai != '办理通过'">
                            <template slot-scope="scope">
                                <i class="el-icon-setting"  style="cursor: pointer;" @click="shezhi()"></i>
                            </template>
                            </el-table-column>
                        </el-table>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 分包信息 -->
                <el-collapse-item title="分包信息" name="2"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                    <div  class="table_box">
                        <el-table :data="subpackgeData" stripe style="width: 100%">
                            <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                            </el-table-column>
                            <el-table-column prop="subcontractName" :show-overflow-tooltip ="true" label="分包名称">
                            </el-table-column>
                            <el-table-column  prop="subcontractingControlAmount" :show-overflow-tooltip ="true" label="分包控制金额(万元)" width="100">
                            </el-table-column>
                            <el-table-column prop="entrySubcontractNumber" :show-overflow-tooltip ="true" label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column prop="operation" label="查看">
                                <template slot-scope="scope">
                                    <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="operation" label="招标内容" :show-overflow-tooltip ="true">
                                <template slot-scope="scope">
                                    <i class="el-icon-search" style="cursor:pointer;" @click="lookEditFile(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-item>
                <!-- 招标内容 -->
                <el-collapse-item title="招标内容" name="3"  v-if="projectObj.totalProjectId.indexOf('-') == -1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!-- 内容 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标内容：</div>
                                    <div class="noteFlex">
                                        <span>{{noticeName}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购数量及用途 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">采购数量：</div>
                                    <div class="noteFlex">
                                    <span>{{purchaseAmount}}</span>
                                    </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">采购用途：</span>
                                    <span>{{purchasePurposes}}</span>
                                </div>
                                </div>
                            </div>
                            <!--申请人资格条件  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">申请人资格条件：</div>
                                    <div class="noteFlex">
                                        <span>{{applicantQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 简要技术要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">简要技术要求：</div>
                                    <div class="noteFlex">
                                        <span>{{technologyQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 企业资质要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">企业资质要求：</div>
                                    <div class="noteFlex">
                                        <span>{{companyQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!--项目负责人资质要求  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">项目负责人资质要求：</div>
                                    <div class="noteFlex">
                                        <span>{{managerQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 公告信息 -->
                <el-collapse-item title="公告信息" name="4">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">公告名称：</div>
                                    <div class="noteFlex">
                                        <span>{{noticeName}}</span>
                                    </div>
                                </div>
                            </div>
                            <!--时间  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">报名开始时间：</div>
                                    <div class="noteFlex">
                                        <span>{{enrollStartTime}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">报名结束时间:</span>
                                        <span>{{enrollEndTime}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 资格预审文件领取时间 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">资格预审文件领取时间：</div>
                                    <div class="noteFlex">
                                        <span>{{saleReceiveStartDate}}到{{saleReceiveEndDate}} 上午{{morningbegin}}到{{morningend}}，下午{{afterbegin}}到{{afterend}}</span>
                                    </div>
                                </div>
                            </div>
                            <!--资格预审文件领取地点  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">资格预审文件领取地点：</div>
                                    <div class="noteFlex">
                                        <span>{{tenderDocumentsSaleSite}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标文件工本费 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">文件工本费：</div>
                                    <div class="noteFlex">
                                    <span>{{tenderDocumentsCost}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标文件工本费 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">工本费接收账户ID：</div>
                                    <div class="noteFlex">
                                    <span>{{costAcceptAccount}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 投标人需提交资料 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">投标人需提交资料：</div>
                                    <div class="noteFlex">
                                        <span>{{bidderData}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 递交截止时间 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">递交申请文件截止时间：</div>
                                    <div class="noteFlex">
                                        <span>{{submitTime}}</span>
                                    </div>
                                </div>
                            </div>
                            <!--递交投标文件地点  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">递交投标文件地点：</div>
                                    <div class="noteFlex">
                                    <span>软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦(中发智造)五层）</span>
                                    </div>
                                </div>
                            </div>
                            <!--负责人和联系方式  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">项目负责人：</div>
                                    <div class="noteFlex">
                                        <span>{{projectLeader}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">联系方式:</span>
                                        <span>{{projectLeaderPhone}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 备注 -->
                            <div class="noteBox" style="margin-bottom:10px;">
                                <div class="noteContent">
                                    <div class="noteLeft">备注：</div>
                                    <div class="noteFlex">
                                        <span>{{remark}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 公告内容 -->
                <el-collapse-item title="公告内容" name="5">
                    <div class="new_m_b">
                        <div class="new_m_b2" style="width:80%;">
                        <div class="fail_box">
                            <div>{{noticeName}}</div>
                            <div>资格预审公告</div>
                            <div style="font-size:14px;font-weight:normal;color:#333;">{{updateTime}}</div>
                        </div>
                        <!-- 公告名称 -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">招标项目名称：</div>
                            <div class="noteFlex">
                                <span>{{nameOfTenderProject}}</span>
                            </div>
                            </div>
                        </div>
                        <!-- 招标项目编号 -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">招标项目编号：</div>
                            <div class="noteFlex">
                            <span>{{biddingProjectNumber}}</span>
                            </div>
                            </div>
                        </div>
                        <!-- 招标项目预算金额 -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">招标项目预算金额：</div>
                            <div class="noteFlex">
                                <span>{{budgetAmount}}</span>
                            </div>
                            </div>
                        </div>
                        <!-- 资金来源 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft" style="width:220px;">资金来源：</div>
                                <div class="noteFlex">
                                    <span>{{sourceOfFunds}}</span>
                                </div>
                            </div>
                        </div>
                        <!--资金比例  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft" style="width:220px;">资金比例：</div>
                                <div class="noteFlex">
                                    <span class="guoyou"><span>国有资金：<span>{{stateOwnedFunds}}</span>万元,<span>{{stateOwnedFundsPercentage}}</span>%;</span></span>
                                    <span class="ziyou"><span>自有资金：<span>{{ownFunds}}</span>万元,<span>{{ownFundsPercentage}}</span>%;</span></span>
                                    <span class="waiguo"><span>外国政府及组织资金：<span>{{foreignGovernmentsAndOrganizationalFunds}}</span>万元,<span>{{foreignGovernmentsAndOrganizationalFundsPercentage}}</span>%;</span></span>
                                    <span class="jingwai"><span>境外人投资：<span>{{overseasPrivateInvestment}}</span>万元,<span>{{overseasPrivateInvestmentPercentage}}</span>%;</span></span>
                                </div>
                            </div>
                        </div>
                        <!-- 招标采购人 -->
                        <div style="font-weight: bold;">招标(采购)人</div>
                        <!--招标(采购)人全称  -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">招标(采购)人全称：</div>
                            <div class="noteFlex">
                                <span>{{tenderPurchaserName}}</span>
                            </div>
                            </div>
                        </div>
                        <!--地址  -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">招标(采购)人地址：</div>
                            <div class="noteFlex">
                                <span>{{tendereeAddress}}</span>
                            </div>
                            </div>
                        </div>
                        <!--联系方式  -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">招标(采购)人联系方式：</div>
                            <div class="noteFlex">
                            <span>{{tendereePhone}}</span>
                            </div>
                            </div>
                        </div>
                        <!--招标内容  -->
                        <div style="font-weight: bold;">招标内容</div>
                        <!-- 表格 -->
                        <table border="1"  cellspacing="0" cellpadding="0" style="width:99%;">
                            <tr>
                                <td>招标项目名称</td>
                                <td colspan="3">{{nameOfTenderProject}}</td>
                            </tr>
                            <tr>
                                <td>入场项目分包编号</td>
                                <td>{{totalProjectId}}</td>
                                <td>分包控制金额</td>
                                <td>{{subcontractingControlAmount}}</td>
                            </tr>
                            <tr>
                                <td>用途</td>
                                <td>哈哈哈</td>
                                <td>数量</td>
                                <td>666</td>
                            </tr>
                            <tr>
                                <td colspan="4">申请人资格条件</td>
                            </tr>
                            <tr>
                                <td colspan="4" height="50px">{{applicantQualifications}}</td>
                            </tr>
                            <tr>
                                <td colspan="4">简要技术要求</td>
                            </tr>
                            <tr>
                                <td colspan="4" height="50px">{{technologyQualifications}}</td>
                            </tr>
                        </table>
                        <!-- 资格预审文件领取 -->
                        <div style="font-weight: bold;">资格预审文件领取</div>
                        <!-- 资格预审文件领取时间 -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">资格预审文件领取时间：</div>
                            <div class="noteFlex">
                                <span>{{saleReceiveStartDate}}</span>到<span>{{saleReceiveEndDate}}</span> 上午{{morningbegin}}到{{morningend}}，下午{{afterbegin}}到{{afterend}}
                            </div>
                            </div>
                        </div>
                        <!-- 资格预审文件发售地点 -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">资格预审文件发售地点：</div>
                            <div class="noteFlex">
                                <span>{{tenderDocumentsSaleSite}}</span>
                            </div>
                            </div>
                        </div>
                        <!--工本费  -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">文件工本费：</div>
                            <div class="noteFlex">
                                <span>{{tenderDocumentsCost}}</span>
                            </div>
                            </div>
                        </div>
                        <!--账户  -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">招文件工本费接收账户：</div>
                            <div class="noteFlex">
                                <span>{{costAcceptAccount}}</span>
                            </div>
                            </div>
                        </div>
                        <!--资料  -->
                        <div class="noteBox">
                            <div class="noteContent">
                            <div class="noteLeft">投标人需提交资料：</div>
                            <div class="noteFlex">
                                <span>{{bidderData}}</span>
                            </div>
                            </div>
                        </div>
                        <!--申请文件递交  -->
                        <div style="font-weight: bold;">申请文件递交</div>
                        <!-- 截止时间 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">递交申请文件截止时间：</div>
                                <div class="noteFlex">
                                    <span>{{submitTime}}</span>
                                </div>
                            </div>
                        </div>
                        <!--递交投标文件地点  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">递交投标文件地点：</div>
                                <div class="noteFlex">
                                <span>软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦(中发智造)五层）</span>
                                </div>
                            </div>
                        </div>
                        <!--项目联系人  -->
                        <div class="noteBox">
                            <div class="noteContent" style="font-weight:bold;">
                            <div class="noteLeft">项目联系人：</div>
                            <div class="noteFlex">
                                <span>{{projectLeader}}</span>
                            </div>
                            </div>
                        </div>
                        <!--联系方式  -->
                        <div class="noteBox">
                            <div class="noteContent" style="font-weight:bold;">
                            <div class="noteLeft">联系方式：</div>
                            <div class="noteFlex">
                                <span>{{projectLeaderPhone}}</span>
                            </div>
                            </div>
                        </div>
                        <!-- 备注 -->
                        <div class="noteBox">
                            <div class="noteContent" style="font-weight:bold;">
                            <div class="noteLeft">备注：</div>
                            <div class="noteFlex">
                                <span>{{remark}}</span>
                            </div>
                            </div>
                        </div>
                        <!--名称和日期  -->
                        <div style="font-weight:bold;text-align:right;width:100%;">
                            <div>{{tenderPurchaserName}}</div>
                            <div>{{updateTime}}</div>
                        </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 办理记录 -->
                <el-collapse-item title="办理记录" name="6">
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
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
    <!-- 上传文件弹框 -->
    <div class="mask1" v-show="file"></div>
    <div class="file_box" v-show="file">
        <!-- 头部 -->
        <div class="file_head">
        <div class="file_title" style="padding-left:10px;">招标(采购人)确认函</div>
        <div style="padding-right:10px;font-size:25px;cursor:pointer;" @click="closeFile()">×</div>
        </div>
        <!-- 上传删除 -->
        <div class="file_nav">
        <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
        <button style="margin-right:3px;">上传</button>
        <button @click="deleteFile()">删除</button>
        </div>
        <!-- 表格 -->
        <div class="fileTableData">
        <el-table :data="fileData" style="width: 100%"  @selection-change="handleFileChange">
            <el-table-column type="selection" width="55" align='center'>
            </el-table-column>
            <el-table-column type="index" width="70" label="序号" :index="typeIndex">
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
        </div>
        <div style="color:#f00;padding:15px 0;position:fixed;bottom:5px;left:5px;">
        ★：附件上传大小限制为102400000 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!
        </div>
    </div>
    <!-- 查看分包信息弹框 -->
    <div v-show="subcontractInforShow" class="fb_box">
        <div class="new_head">
            <div style="padding-left:10px;">分包信息</div>
            <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_main">
            <el-collapse v-model="activeName" accordion>
                <!-- 第一步 -->
                <el-collapse-item title="分包信息" name="2">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--统一交易标志码  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                <div class="noteLeft" style="color:#f00;">统一交易标志码：</div>
                                <div class="noteFlex">
                                    <span  style="color:#f00;"></span>
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
                            <!-- 招标范围 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                <div class="noteLeft">招标范围：</div>
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
                                    <span>{{subcontractingControlAmount}}</span>
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
                                <div class="noteLeft">是否电子招投标：</div>
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
    <!-- 添加分包信息弹框 -->
    <div v-show="addInforShow" class="fb_box">
        <div class="new_head">
            <div style="padding-left:10px;">分包信息</div>
            <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <!-- <div class="head_bottom">
            <span class="head_b_b">招标项目(分包)名称：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
            <span class="head_b_b">入场项目(分包)编号：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
            <span><button class="btn">搜索</button></span>
        </div> -->
        <!-- <div style="width:90%;margin-left:18%;margin-bottom:1%;">挑选状态：
            <el-select v-model="nameOfTenderProject" clearable placeholder="请选择">
            <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
        </div>  -->
        <div style="margin-top:10px;">
            <el-table :data="bidSectionData" stripe style="width: 100%"   @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align='center'>
                </el-table-column>
                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                </el-table-column>
                <el-table-column  prop="entrySubcontractNumber" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="200">
                </el-table-column>
                <el-table-column  label="招标项目名称">
                    <template slot-scope="scope">
                        <span>{{pulicBids}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="subcontractName"  label="分包名称" :show-overflow-tooltip ="true">
                </el-table-column>
                <el-table-column  prop="subcontractContents"  label="分包分类" :show-overflow-tooltip ="true">
                </el-table-column>
                <el-table-column  label="招标方式" :show-overflow-tooltip ="true">
                    <template slot-scope="scope">
                        <span>{{biddingMethod}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="subcontractingControlAmount" :show-overflow-tooltip ="true"  label="分包控制金额(万元)">
                </el-table-column>
                <el-table-column prop="subcontractingState" :show-overflow-tooltip ="true" label="分包状态">
                </el-table-column>
            </el-table>
        </div>
        <div class="sureSelect">
            <button class="btn" style="width:125px;" @click="quedingSelec()">确定选择</button>
        </div>
    </div>
    <!-- 资审公告内容 -->
    <div v-show="auditNoticeShow" class="fb_box">
        <div class="new_head">
            <div style="padding-left:10px;">资审公告内容</div>
            <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_nav">
            <button class="nav_co nav_save" @click="saveNotice()">保存</button>
        </div>
        <div class="new_main">
            <el-collapse v-model="activeName" accordion>
                <!-- 招标项目信息-->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目名称：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 类型及金额 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目类型：</div>
                                    <div class="noteFlex">
                                        <span>{{typesOfBiddingProjects}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">招标项目金额(万元)：</span>
                                        <span>{{amountOfBiddingProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标及入场编号 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目编号：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProjectNumber}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">入场项目编号：</span>
                                        <span>{{totalProjectId}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购方式及组织方式 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标采购方式：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProcurementMode}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">招标组织方式：</span>
                                        <span>{{biddingOrganization}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 招标内容 -->
                <el-collapse-item title="招标内容" name="2">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!-- 内容 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标内容：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="nameOfTenderProject"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购数量及用途 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">采购数量：</div>
                                    <div class="noteFlex">
                                    <el-input v-model="purchaseAmount"></el-input>
                                    </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">采购用途：</span>
                                    <el-input v-model="purchasePurposes"></el-input>
                                </div>
                                </div>
                            </div>
                            <!--申请人资格条件  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">申请人资格条件：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="applicantQualifications"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 简要技术要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">简要技术要求：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="technologyQualifications"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 设置报名要求 -->
                            <div class="noteBox" style="margin-top:5px;">
                                <div class="noteContent">
                                    <div class="noteLeft">设置报名要求：</div>
                                    <div style="padding-left:5px;width:40%;margin-right:4%;display:flex;justify-content:space-between;background:#e1e1e1;">
                                        <span>企业资质要求</span>
                                        <el-button>新增资质</el-button>
                                    </div>
                                    <div style="padding-left:5px;width:40%;display:flex;justify-content:space-between;background:#e1e1e1;gext-align:right;">
                                        <span>项目负责人资质要求</span>
                                        <el-button>新增资质</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
    <!-- 查看资审公告内容 -->
    <div v-show="lookNoticeShow" class="fb_box">
        <div class="new_head">
            <div style="padding-left:10px;">资审公告内容</div>
            <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_main">
            <el-collapse v-model="activeName" accordion>
                <!-- 招标项目信息-->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目名称：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 类型及金额 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目类型：</div>
                                    <div class="noteFlex">
                                        <span>{{typesOfBiddingProjects}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">招标项目金额(万元)：</span>
                                        <span>{{amountOfBiddingProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标及入场编号 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目编号：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProjectNumber}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">入场项目编号：</span>
                                        <span>{{totalProjectId}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购方式及组织方式 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标采购方式：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProcurementMode}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">招标组织方式：</span>
                                        <span>{{biddingOrganization}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 招标内容 -->
                <el-collapse-item title="招标内容" name="2">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!-- 内容 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标内容：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购数量及用途 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">采购数量：</div>
                                    <div class="noteFlex">
                                        <span>{{purchaseAmount}}</span>
                                    </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">采购用途：</span>
                                    <span>{{purchasePurposes}}</span>
                                </div>
                                </div>
                            </div>
                            <!--申请人资格条件  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">申请人资格条件：</div>
                                    <div class="noteFlex">
                                        <span>{{applicantQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 简要技术要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">简要技术要求：</div>
                                    <div class="noteFlex">
                                        <span>{{technologyQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 设置报名要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">企业资质要求：</div>
                                    <div class="noteFlex">
                                        <span>{{companyQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 项目负责人资质要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">项目负责人资质要求：</div>
                                    <div class="noteFlex">
                                        <span>{{managerQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    :default-checked-keys="default_tree_arr"
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
                    :default-checked-keys="default_leader_arr"
                    check-strictly
                    @check="checkLeaderNode">
                </el-tree>
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
            <el-button type="primary" @click="sureSave()">确 定</el-button>
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
            <el-button type="primary" @click="submitSave()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import dayjs from "dayjs"
import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkEmail,dubRemove,checkPhone} from '../../../api/base.js'
export default {
  components:{},
  props:{},
  data(){
    return {
        zhuangtai:'',
        companyInfo:[],
        leaderInfo:[],
        default_tree_arr:[],
        default_leader_arr:[],
        leaderBox:[],
        certificateBox:[],
        leaderData:[],
        certificateData:[],
        certificateFlag:false,
        leaderFlag:false,
        projectObj:JSON.parse(window.localStorage.projectObj),
        saveBox:false,//保存弹框
        submitBox:false,//提交弹框
        lookNoticeShow:false,//查看资审公告内容
        auditNoticeShow:false,//资审公告内容
        addInforShow:false,//添加分包信息
        bidSectionData:[],//添加分包数据
        pulicBids:'',//招标项目名称
        biddingMethod:'',//招标方式
        subcontractInforShow:false,//查看分包信息弹框
        show:true,//上一步弹框
        nextShow:false,//下一步弹框
        activeName:['1','2','3'],//上一步弹框
        value:'',
        nameOfTenderProject:'',//招标项目名称
        tenderPurchaserName:'',//招标采购人
        amountOfBiddingProject:'',//招标项目金额
        biddingProjectNumber:'',//招标项目编号
        budgetAmount:'',//招标项目预算金额
        biddingOrganization:'',//招标组织方式
        biddingProcurementMode:'',//招标采购方式
        typesOfBiddingProjects:'',//招标项目类型
        sourceOfFunds:'',//资金来源
        stateOwnedFunds:'',//国有资金
        stateOwnedFundsPercentage:'',//国有资金百分比
        ownFunds:'',//自有资金
        ownFundsPercentage:'',//自有资金
        foreignGovernmentsAndOrganizationalFunds:'',//外国政府资金
        foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国资金百分比
        overseasPrivateInvestment:'',//境外人投资
        overseasPrivateInvestmentPercentage:'',//境外人投资百分比
        totalProjectId:'',//入场项目编号
        subcontractingControlAmount:'',//分包控制金额
        enclosureData:[
            {
            id:1,
            appendixName: " 招标（采购）人确认函",
            attachlist: []
          },
          {
            id:2,
            appendixName: "资格预审公告",
            attachlist: []
          }
        ],//下一步附件数据
        subpackgeData:[],//分包信息数据
        manageDate:[],//办理记录数据
        fileData:[],//上传文件数据列表
        file:false,
        currentPage:1,
        tendereeAddress:'',//招标人地址
        tendereePhone:'',//招标人联系方式
        purchaseAmount:'',//采购数量
        purchasePurposes:'',//采购用途
        applicantQualifications:'',//申请人资格条件
        technologyQualifications:'',//简要技术要求
        noticeName:'',//公告名称
        applicationTime:[],//报名时间
        enrollStartTime:'',//报名开始时间
        enrollEndTime:"",//报名结束时间
        collectTime:[],//资格预审领取时间
        saleReceiveStartDate:'',//资格预审领取开始时间
        saleReceiveEndDate:'',//结束时间
        morningbegin:'8:00',// 上午开始时间
        morningend:'12:00',// 上午结束时间
        afterbegin:'14:00',// 下午开始时间
        afterend:'17:30',// 下午结束时间
        saleStartTime:'',//上午时间
        saleEndTime:'',//下午时间
        tenderDocumentsSaleSite:'',//领取地点
        tenderDocumentsCost:'',//招标文件工本费
        costAcceptAccount:'',//接收账户
        bidderData:'',//投标人需提交资料
        submitTime:'',//截止时间
        projectLeader:'',//项目负责人
        projectLeaderPhone:'',//联系方式
        remark:'',//备注
        companyQualifications:'',//企业资质要求
        managerQualifications:'',//项目负责人资质条件
        userId:'',//下一步返回的ID
        entrySubcontractNumber:'',//查看入场项目分包编号
        subcontractName:'',//分包名称
        subcontractContents:'',//分包内容
        scopeOfTender:'',//招标范围
        subcontractingControlAmount:'',//分包控制金额
        qualificationExaminationMethod:'',//资格审查方式
        electronicBidEvaluation:'',//是否电子招投标
        EntrySubNum:'',//分包表格id
        subpackNum:'',
        selectedArr:[],//勾选中的表格数组
        subArr:[],//下一步传参数组
        zhuangtai:'',//判断状态
        itemArr:[],//查询返回的Items
        resData:[],//查询返回的data
        entryId:'',//资审公告对应的Id
        item_temp:'',//资审公告的item
        updateTime:'',//下一步返回的时间
    }
  },
  watch:{},
  computed:{},
  methods:{
        //查询--判断状态
        getInitInfo(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    noticeType:"资审公告"
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    noticeType:"资审公告"
                }
            }
            return this.$axios({
                method:'POST',
                url:baseUrl + '/tenderNoticeController/select',
                data:object
            }).then(res=>{
                this.zhuangtai = res.data.data[0].state;
                this.userId = res.data.data[0].tenderNoticeId;
                if(res.data.status == 200){
                    this.resData = res.data.data;
                    this.itemArr = res.data.data[0].items;
                    res.data.data.map((item,index)=>{
                        this.zhuangtai = item.state
                    })
                    if(res.data.data.length == 0 || this.zhuangtai == null){
                        this.show = true;
                        this.nextShow = false;
                    }else if(this.zhuangtai == "编辑中" || this.zhuangtai == "办理未通过"){
                        this.show = false;
                        this.nextShow = true;
                        this.tendereeAddress = res.data.data[0].tendereeAddress;
                        this.tendereePhone = res.data.data[0].tendereePhone;
                        this.purchaseAmount = res.data.data[0].items[0].purchaseAmount;
                        this.purchasePurposes = res.data.data[0].items[0].purchasePurposes;
                        this.applicantQualifications = res.data.data[0].items[0].applicantQualifications;
                        this.technologyQualifications = res.data.data[0].items[0].technologyQualifications;
                        this.companyQualifications = res.data.data[0].items[0].companyQualifications;
                        this.managerQualifications = res.data.data[0].items[0].managerQualifications;
                        this.nameOfTenderProject = res.data.data[0].nameOfTenderProject;
                        this.noticeName = res.data.data[0].noticeName;
                        if(res.data.data[0].enrollStartTime == null){
                            this.enrollStartTime = ""
                        }else{
                            this.enrollStartTime = dayjs(res.data.data[0].enrollStartTime).format('YYYY-MM-DD HH:mm:ss');
                        };
                        if(res.data.data[0].enrollEndTime == null){
                            this.enrollEndTime = ""
                        }else{
                            this.enrollEndTime = dayjs(res.data.data[0].enrollEndTime).format('YYYY-MM-DD HH:mm:ss')
                        };
                        if(res.data.data[0].saleReceiveStartDate == null){
                            this.saleReceiveStartDate = ""
                        }else{
                            this.saleReceiveStartDate = dayjs(res.data.data[0].saleReceiveStartDate).format('YYYY-MM-DD')
                        };
                        if(res.data.data[0].saleReceiveEndDate == null){
                            this.saleReceiveEndDate = ""
                        }else{
                            this.saleReceiveEndDate = dayjs(res.data.data[0].saleReceiveEndDate).format('YYYY-MM-DD')
                        };
                        //上午下午时间
                        this.saleStartTime=res.data.data[0].saleStartTime.split(',');
                        this.morningbegin = this.saleStartTime[0];
                        this.morningend = this.saleStartTime[1];
                        this.saleEndTime=res.data.data[0].saleEndTime.split(',');
                        this.afterbegin = this.saleEndTime[0];
                        this.afterend = this.saleEndTime[1];
                        //
                        this.tenderDocumentsSaleSite = res.data.data[0].tenderDocumentsSaleSite;
                        this.tenderDocumentsCost = res.data.data[0].tenderDocumentsCost;
                        this.costAcceptAccount = res.data.data[0].costAcceptAccount;
                        this.bidderData = res.data.data[0].bidderData;
                        if(res.data.data[0].submitTime == null){
                            this.submitTime = ""
                        }else{
                            this.submitTime = dayjs(res.data.data[0].submitTime).format('YYYY-MM-DD HH:mm:ss')
                        };
                        this.projectLeader = res.data.data[0].projectLeader;
                        this.projectLeaderPhone = res.data.data[0].projectLeaderPhone;
                        this.remark = res.data.data[0].remark;
                        //19-4-29修改
                        res.data.data[0].items.forEach(area=>{
                            if(area.entrySubcontractNumber != null && this.entrySubcontractNumber == area.entrySubcontractNumber){
                                this.purchaseAmount=area.purchaseAmount;//  采购数量
                                this.purchasePurposes=area.purchasePurposes;// 采购用途
                                this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                                this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                                this.certificateBox = JSON.parse(area.companyQualifications);// 企业资质要求
                                if(this.certificateBox.length>0){
                                    this.certificateBox.forEach(item=>{
                                        this.companyInfo.push(item.label);
                                    })
                                    this.companyQualifications = this.companyInfo.toString();
                                }
                                this.leaderBox = JSON.parse(area.managerQualifications);// 项目负责人资质要求
                                if(this.leaderBox.length>0){
                                    this.leaderBox.forEach(item=>{
                                        this.leaderInfo.push(item.label);
                                    })
                                        this.managerQualifications = this.leaderInfo.toString();
                                }
                                
                            }else if(area.projectCode != null && this.projectObj.totalProjectId == area.projectCode){
                                this.purchaseAmount=area.purchaseAmount;//  采购数量
                                this.purchasePurposes=area.purchasePurposes;// 采购用途
                                this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                                this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                                this.certificateBox = JSON.parse(area.companyQualifications);// 企业资质要求
                                if(this.certificateBox.length>0){
                                    this.certificateBox.forEach(item=>{
                                        this.companyInfo.push(item.label);
                                    })
                                    this.companyQualifications = this.companyInfo.toString();
                                }
                                this.leaderBox = JSON.parse(area.managerQualifications);// 项目负责人资质要求
                                if(this.leaderBox.length>0){
                                    this.leaderBox.forEach(item=>{
                                        this.leaderInfo.push(item.label);
                                    })
                                    this.managerQualifications = this.leaderInfo.toString();
                                }
                            }
                        })
                    }else if(this.zhuangtai == "办理通过" || this.zhuangtai == "待办理"){
                        this.show = false;
                        this.nextShow = true;
                        $('.new_nav').hide();
                        this.tendereeAddress = res.data.data[0].tendereeAddress;
                        this.tendereePhone = res.data.data[0].tendereePhone;
                        this.purchaseAmount = res.data.data[0].items[0].purchaseAmount;
                        this.purchasePurposes = res.data.data[0].items[0].purchasePurposes;
                        this.applicantQualifications = res.data.data[0].items[0].applicantQualifications;
                        this.technologyQualifications = res.data.data[0].items[0].technologyQualifications;
                        this.companyQualifications = res.data.data[0].items[0].companyQualifications;
                        this.managerQualifications = res.data.data[0].items[0].managerQualifications;
                        this.nameOfTenderProject = res.data.data[0].nameOfTenderProject;
                        this.noticeName = res.data.data[0].noticeName;
                        if(res.data.data[0].enrollStartTime == null){
                            this.enrollStartTime = ""
                        }else{
                            this.enrollStartTime = dayjs(res.data.data[0].enrollStartTime).format('YYYY-MM-DD HH:mm:ss');
                        };
                        if(res.data.data[0].enrollEndTime == null){
                            this.enrollEndTime = ""
                        }else{
                            this.enrollEndTime = dayjs(res.data.data[0].enrollEndTime).format('YYYY-MM-DD HH:mm:ss')
                        };
                        if(res.data.data[0].saleReceiveStartDate == null){
                            this.saleReceiveStartDate = ""
                        }else{
                            this.saleReceiveStartDate = dayjs(res.data.data[0].saleReceiveStartDate).format('YYYY-MM-DD')
                        };
                        if(res.data.data[0].saleReceiveEndDate == null){
                            this.saleReceiveEndDate = ""
                        }else{
                            this.saleReceiveEndDate = dayjs(res.data.data[0].saleReceiveEndDate).format('YYYY-MM-DD')
                        };
                        //上午下午时间
                        this.saleStartTime=res.data.data[0].saleStartTime.split(',');
                        this.morningbegin = this.saleStartTime[0];
                        this.morningend = this.saleStartTime[1];
                        this.saleEndTime=res.data.data[0].saleEndTime.split(',');
                        this.afterbegin = this.saleEndTime[0];
                        this.afterend = this.saleEndTime[1];
                        //
                        this.tenderDocumentsSaleSite = res.data.data[0].tenderDocumentsSaleSite;
                        this.tenderDocumentsCost = res.data.data[0].tenderDocumentsCost;
                        this.costAcceptAccount = res.data.data[0].costAcceptAccount;
                        this.bidderData = res.data.data[0].bidderData;
                        if(res.data.data[0].submitTime == null){
                            this.submitTime = ""
                        }else{
                            this.submitTime = dayjs(res.data.data[0].submitTime).format('YYYY-MM-DD HH:mm:ss')
                        };
                        this.projectLeader = res.data.data[0].projectLeader;
                        this.projectLeaderPhone = res.data.data[0].projectLeaderPhone;
                        this.remark = res.data.data[0].remark;
                        //19-4-29修改
                        res.data.data[0].items.forEach(area=>{
                            if(area.entrySubcontractNumber != null && this.entrySubcontractNumber == area.entrySubcontractNumber){
                                this.purchaseAmount=area.purchaseAmount;//  采购数量
                                this.purchasePurposes=area.purchasePurposes;// 采购用途
                                this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                                this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                                this.certificateBox = JSON.parse(area.companyQualifications);// 企业资质要求
                                if(this.certificateBox.length>0){
                                    this.certificateBox.forEach(item=>{
                                        this.companyInfo.push(item.label);
                                    })
                                    this.companyQualifications = this.companyInfo.toString();
                                }
                                this.leaderBox = JSON.parse(area.managerQualifications);// 项目负责人资质要求
                                if(this.leaderBox.length>0){
                                    this.leaderBox.forEach(item=>{
                                        this.leaderInfo.push(item.label);
                                    })
                                        this.managerQualifications = this.leaderInfo.toString();
                                }
                                
                            }else if(area.projectCode != null && this.projectObj.totalProjectId == area.projectCode){
                                this.purchaseAmount=area.purchaseAmount;//  采购数量
                                this.purchasePurposes=area.purchasePurposes;// 采购用途
                                this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                                this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                                this.certificateBox = JSON.parse(area.companyQualifications);// 企业资质要求
                                if(this.certificateBox.length>0){
                                    this.certificateBox.forEach(item=>{
                                        this.companyInfo.push(item.label);
                                    })
                                    this.companyQualifications = this.companyInfo.toString();
                                }
                                this.leaderBox = JSON.parse(area.managerQualifications);// 项目负责人资质要求
                                if(this.leaderBox.length>0){
                                    this.leaderBox.forEach(item=>{
                                        this.leaderInfo.push(item.label);
                                    })
                                    this.managerQualifications = this.leaderInfo.toString();
                                }
                            }
                        })
                    }
                }else{
                    this.$message.warning(res.data.msg)
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
                    this.totalProId = res.data.data.totalProjectId;//入场项目编号
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
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //招标项目信息--》表格分包
        async getsubList(){
            let lookArr = [];
            var arr = await this.getInitInfo();
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                if(this.resData.length == 0){
                    this.EntrySubNum = this.projectObj.totalProjectId;
                    lookArr.push(this.EntrySubNum);
                }else{
                    this.itemArr.map((item,index)=>{
                        this.EntrySubNum = item.entrySubcontractNumber;
                        lookArr.push(this.EntrySubNum);
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
                    this.subpackgeData = res.data.data;
                    console.log(this.subpackgeData)
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
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
            this.addInforShow = false;
            this.auditNoticeShow = false;
            this.lookNoticeShow = false;
        },
        //查询分包信息列表
        searchSubpack(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderNoticeController/subcontract',
                data:{
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    qualificationExaminationMethod:'资格预审',
                    noticeType:'资审公告'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.bidSectionData = res.data.data;
                    this.bidSectionData.map((item,index)=>{
                        this.pulicBids = item.projectInformationVo.nameOfTenderProject;
                        this.biddingMethod = item.projectInformationVo.biddingProcurementMode
                    })
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //添加分包
        addSubpack(){
            let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/subcontract',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        res.data.data.map((item,index)=>{
                            this.pulicBids = item.projectInformationVo.nameOfTenderProject;
                            this.biddingMethod = item.projectInformationVo.biddingProcurementMode
                        });
                        var arrData = res.data.data;
                        for(var i=arrData.length-1; i>=0;i--){
                            for(var j=this.subpackgeData.length-1;j>=0;j--){
                                if(arrData[i].entrySubcontractNumber == this.subpackgeData[j].entrySubcontractNumber){
                                    arrData.splice(i,1);
                                }
                            }
                        }
                        this.bidSectionData = arrData;
                        this.addInforShow = true;
                    }else{
                        this.$message.warning(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err);
                    this.$message.warning('没有可选择的分包了')
                })
        },
        //删除表格分包
        deleteTable(row){
            if(row.entrySubcontractNumber == this.projectObj.totalProjectId){
                    this.$message.warning('不可删除当前项目分包编号')
                    return;
            }else{
                for(var i=0; i<this.subpackgeData.length;i++){
                    var item = this.subpackgeData[i];
                    if(row.subcontractItePrimaryKeyId == item.subcontractItePrimaryKeyId){
                        this.subpackgeData.splice(i,1);
                    }
                }
                for(var i=0; i<this.itemArr.length;i++){
                    var item = this.itemArr[i];
                    if(row.entrySubcontractNumber == item.entrySubcontractNumber){
                        this.itemArr.splice(i,1);
                    }
                }
            }
            
        },
        //添加分包---表格选择
        handleSelectionChange(val){
            this.selectedArr = val;
        },
        //添加分包---表格选择---确定选择
        quedingSelec(){
            var arr = [...this.subpackgeData,...this.selectedArr];
            this.subpackgeData = this.removeData(arr,'entrySubcontractNumber')
            this.addInforShow = false;
            this.selectedArr.map((item,index)=>{
                var obj = {};
                obj.entrySubcontractNumber = item.entrySubcontractNumber;
                this.itemArr.push(obj)
            })
        },
        removeData(arr,id){
            let hash = {};
            var newarr = arr.reduce((item,next) =>{
                hash[next[id]] ? "" : hash[next[id]] = true && item.push(next);
                return item
            }, []);
            return newarr;
        },
        // 资审公告内容
        auditEditFile(row){
            this.auditNoticeShow = true;
            this.entryId = row.entrySubcontractNumber;
            if(this.resData.length != 0){
                this.itemArr.map((item,index)=>{
                    if(item.entrySubcontractNumber == row.entrySubcontractNumber){
                        this.purchaseAmount = item.purchaseAmount;
                        this.nameOfTenderProject = item.nameOfTenderProject;
                        this.purchasePurposes = item.purchasePurposes;
                        this.applicantQualifications = item.applicantQualifications;
                        this.technologyQualifications = item.technologyQualifications;
                        this.companyQualifications = item.companyQualifications;
                        this.managerQualifications = item.managerQualifications;
                        this.item_temp = item;
                    }
                })
            }else{
                let obj = {
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    purchaseAmount : this.purchaseAmount,
                    nameOfTenderProject : this.nameOfTenderProject,
                    purchasePurposes : this.purchasePurposes,
                    applicantQualifications : this.applicantQualifications,
                    technologyQualifications : this.technologyQualifications,
                    companyQualifications : this.companyQualifications,
                    managerQualifications : this.managerQualifications
                }
                this.itemArr.push(obj);
            }
            
        },
        //查看资审公告内容
        lookEditFile(row){
            this.lookNoticeShow = true;
            this.itemArr.map((item,index)=>{
                if(item.entrySubcontractNumber == row.entrySubcontractNumber){
                    this.purchaseAmount = item.purchaseAmount;
                    this.nameOfTenderProject = item.nameOfTenderProject;
                    this.purchasePurposes = item.purchasePurposes;
                    this.applicantQualifications = item.applicantQualifications;
                    this.technologyQualifications = item.technologyQualifications;
                    this.certificateBox = JSON.parse(item.companyQualifications);// 企业资质要求
                    if(this.certificateBox.length>0){
                        this.certificateBox.forEach(item=>{
                            this.companyInfo.push(item.label);
                        })
                        this.companyQualifications = this.companyInfo.toString();
                    }
                    this.leaderBox = JSON.parse(item.managerQualifications);// 项目负责人资质要求
                    if(this.leaderBox.length>0){
                        this.leaderBox.forEach(item=>{
                            this.leaderInfo.push(item.label);
                        })
                        this.managerQualifications = this.leaderInfo.toString();
                    }
                }
            })
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        //新增企业资质
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
                        this.$message.warning(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
        },
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
        // 删除企业资质要求Item
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
                        this.$message.warning(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
        },
        closeCertificate(){
            this.certificateFlag = false;
            this.leaderFlag = false;
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
        deleteInfoArea(id){
            for (let i=0; i<this.leaderBox.length; i++) {  
                 if (this.leaderBox[i].qualificationId == id) {  
                    this.leaderBox.splice(i, 1);    
                }  
            } 
        },
        //点击资审公告保存
        saveNotice(){
            this.item_temp.purchaseAmount = this.purchaseAmount
            this.item_temp.purchasePurposes =this.purchasePurposes,
            this.item_temp.technologyQualifications=this.technologyQualifications,
            this.item_temp.applicantQualifications=this.applicantQualifications,
            this.item_temp.entrySubcontractNumber=this.entryId
           
            this.auditNoticeShow =false;
        },
        //下一步弹框
        nextTo(){
            if(!this.applicationTime){
                $('#focus0').focus();
                this.$message.warning('请选择报名时间');
                return false;
            }else if(!this.collectTime || !this.morningbegin || !this.morningend || !this.afterbegin || !this.afterend){
                $('#focus1').focus();
                this.$message.warning('请选择资格预审文件领取时间');
                return false;
            }else if(!this.tenderDocumentsCost){
                $('#focus2').focus();
                this.$message.warning('请填写文件工本费');
                return false;
            }else if(!this.bidderData){
                $('#focus3').focus();
                this.$message.warning('请填写投标人需提交的资料');
                return false;
            }
            if(!isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){
                $('#focus4').focus();
                this.$message.warning('请输入正确的联系方式！');
                return false;
            }
            // 企业资质要求的label
            if(this.certificateBox.length>0){
                this.certificateBox.forEach(item =>{
                    this.companyInfo.push(item.label)
                })
            }
            // 项目负责人资质要求的label
            if(this.leaderBox.length>0){
                this.leaderBox.forEach(item =>{
                    this.leaderInfo.push(item.label)
                })
            }
            if(this.itemArr.length == 0){
                let obj = {
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    purchaseAmount : this.purchaseAmount,
                    nameOfTenderProject : this.nameOfTenderProject,
                    purchasePurposes : this.purchasePurposes,
                    applicantQualifications : this.applicantQualifications,
                    technologyQualifications : this.technologyQualifications,
                    companyQualifications : this.companyQualifications,
                    managerQualifications : this.managerQualifications
                }
                this.itemArr.push(obj);
            }
            // 上午发售时间
            let morningArr = [];
            morningArr.push(this.morningbegin,this.morningend)
            this.saleStartTime = morningArr.toString();
            // 下午发售时间
            let afterArr = [];
            afterArr.push(this.afterbegin,this.afterend)
            this.saleEndTime = afterArr.toString();
            let objData={};
            let arr = [];
            let items = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                objData={
                    noticeType:'资审公告',
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    tendereeAddress:this.tendereeAddress,
                    tendereePhone:this.tendereePhone,
                    nameOfTenderProject:this.nameOfTenderProject,
                    purchaseAmount:this.purchaseAmount,
                    purchasePurposes:this.purchasePurposes,
                    applicantQualifications:this.applicantQualifications,
                    technologyQualifications:this.technologyQualifications,
                    noticeName:this.noticeName,
                    enrollStartTime:this.applicationTime[0],
                    enrollEndTime:this.applicationTime[1],
                    saleReceiveStartDate:this.collectTime[0],
                    saleReceiveEndDate:this.collectTime[1],
                    saleStartTime:this.saleStartTime,
                    saleEndTime:this.saleEndTime,
                    tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,
                    tenderDocumentsCost:this.tenderDocumentsCost,
                    costAcceptAccount:this.costAcceptAccount,
                    bidderData:this.bidderData,
                    submitTime:this.submitTime,
                    projectLeader:this.projectLeader,
                    projectLeaderPhone:this.projectLeaderPhone,
                    remark:this.remark,
                    items:this.itemArr,
                    timeReference:this.projectObj.totalProjectId
                }
            }else{
                items = {
                    projectCode:this.projectObj.totalProjectId,
                    purchaseAmount:this.purchaseAmount,// 采购数量
                    purchasePurposes:this.purchasePurposes,// 采购用途
                    companyQualifications:JSON.stringify(this.certificateBox),// 企业资质要求
                    managerQualifications:JSON.stringify(this.leaderBox),// 项目负责人资质要求
                    technologyQualifications:this.technologyQualifications,// 简要技术要求
                    applicantQualifications:this.applicantQualifications,// 投资人资格条件
                }
                arr.push(items)
                objData={
                    noticeType:'资审公告',
                    projectCode:this.projectObj.totalProjectId,
                    tendereeAddress:this.tendereeAddress,
                    tendereePhone:this.tendereePhone,
                    noticeName:this.noticeName,
                    enrollStartTime:this.applicationTime[0],
                    enrollEndTime:this.applicationTime[1],
                    saleReceiveStartDate:this.collectTime[0],
                    saleReceiveEndDate:this.collectTime[1],
                    saleStartTime:this.saleStartTime,
                    saleEndTime:this.saleEndTime,
                    tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,
                    tenderDocumentsCost:this.tenderDocumentsCost,
                    costAcceptAccount:this.costAcceptAccount,
                    bidderData:this.bidderData,
                    submitTime:this.submitTime,
                    projectLeader:this.projectLeader,
                    projectLeaderPhone:this.projectLeaderPhone,
                    remark:this.remark,
                    items:arr,
                    timeReference:this.projectObj.totalProjectId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderNoticeController/saveOrUpdate',
                data:objData
            }).then(res=>{
                if(res.data.status == 200){
                    this.uploadList();
                    this.nextShow = true;
                    this.show = false;
                    this.tendereeAddress = res.data.data.tendereeAddress;
                    this.tendereePhone = res.data.data.tendereePhone;
                    // res.data.data.items.map((item,index)=>{
                    //     this.purchaseAmount = item.purchaseAmount;
                    //     this.nameOfTenderProject = item.nameOfTenderProject;
                    //     this.purchasePurposes = item.purchasePurposes;
                    //     this.applicantQualifications = item.applicantQualifications;
                    //     this.technologyQualifications = item.technologyQualifications;
                    //     this.companyQualifications = item.companyQualifications;
                    //     this.managerQualifications = item.managerQualifications;
                    // })
                    res.data.data.items.forEach(area=>{
                        if(area.entrySubcontractNumber != null && this.projectObj.entrySubcontractNumber == area.entrySubcontractNumber){
                            this.purchaseAmount=area.purchaseAmount;//  采购数量
                            this.purchasePurposes=area.purchasePurposes;// 采购用途
                            this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                            this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                            this.companyQualifications = area.companyQualifications;// 企业资质要求
                            this.managerQualifications = area.managerQualifications;// 项目负责人资质要求
                        }else if(area.projectCode !=null && this.projectObj.totalProjectId == area.projectCode){
                            this.purchaseAmount=area.purchaseAmount;//  采购数量
                            this.purchasePurposes=area.purchasePurposes;// 采购用途
                            this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                            this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                            this.certificateBox = JSON.parse(area.companyQualifications);// 企业资质要求
                            if(this.certificateBox.length>0){
                                this.certificateBox = dubRemove(this.certificateBox);
                                let arr = [];
                                this.certificateBox.forEach(item=>{
                                    arr.push(item.label);
                                })
                                this.companyInfo = arr;
                                this.companyQualifications = this.companyInfo.toString();
                            }
                            this.leaderBox = JSON.parse(area.managerQualifications);// 项目负责人资质要求
                            if(this.leaderBox.length>0){
                                this.leaderBox = dubRemove(this.leaderBox);
                                let newArr = [];
                                this.leaderBox.forEach(item=>{
                                    newArr.push(item.label);
                                })
                                this.leaderInfo = newArr;
                                this.managerQualifications = this.leaderInfo.toString();
                            }
                        }else{

                        }
                    })
                    // this.purchaseAmount = res.data.data.purchaseAmount;
                    // this.nameOfTenderProject = res.data.data.nameOfTenderProject;
                    // this.purchasePurposes = res.data.data.purchasePurposes;
                    // this.applicantQualifications = res.data.data.applicantQualifications;
                    // this.technologyQualifications = res.data.data.technologyQualifications;
                    this.noticeName = res.data.data.noticeName;
                    if(res.data.data.enrollStartTime == null){
                        this.enrollStartTime = ""
                    }else{
                        this.enrollStartTime = dayjs(res.data.data.enrollStartTime).format('YYYY-MM-DD HH:mm:ss');
                    };
                    if(res.data.data.enrollEndTime == null){
                        this.enrollEndTime = ""
                    }else{
                        this.enrollEndTime = dayjs(res.data.data.enrollEndTime).format('YYYY-MM-DD HH:mm:ss')
                    };
                    if(res.data.data.saleReceiveStartDate == null){
                        this.saleReceiveStartDate = ""
                    }else{
                        this.saleReceiveStartDate = dayjs(res.data.data.saleReceiveStartDate).format('YYYY-MM-DD')
                    };
                    if(res.data.data.saleReceiveEndDate == null){
                        this.saleReceiveEndDate = ""
                    }else{
                        this.saleReceiveEndDate = dayjs(res.data.data.saleReceiveEndDate).format('YYYY-MM-DD')
                    };
                    // 上午和下午起始时间
                    this.saleStartTime=res.data.data.saleStartTime.split(',');
                    this.morningbegin = this.saleStartTime[0];
                    this.morningend = this.saleStartTime[1];
                    this.saleEndTime=res.data.data.saleEndTime.split(',');
                    this.afterbegin = this.saleEndTime[0];
                    this.afterend = this.saleEndTime[1];
                    this.tenderDocumentsSaleSite = res.data.data.tenderDocumentsSaleSite;
                    this.tenderDocumentsCost = res.data.data.tenderDocumentsCost;
                    this.costAcceptAccount = res.data.data.costAcceptAccount;
                    this.bidderData = res.data.data.bidderData;
                    if(res.data.data.submitTime == null){
                        this.submitTime = ""
                    }else{
                        this.submitTime = dayjs(res.data.data.submitTime).format('YYYY-MM-DD HH:mm:ss')
                    };
                    this.projectLeader = res.data.data.projectLeader;
                    this.projectLeaderPhone = res.data.data.projectLeaderPhone;
                    this.remark = res.data.data.remark;
                    this.userId = res.data.data.tenderNoticeId;
                    this.updateTime = res.data.data.updateTime;
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //保存
        saveFile(){
             if(!this.applicationTime){
                $('#focus0').focus();
                this.$message.warning('请选择报名时间');
                return false;
            }else if(!this.collectTime || !this.morningbegin || !this.morningend || !this.afterbegin || !this.afterend){
                $('#focus1').focus();
                this.$message.warning('请选择资格预审文件领取时间');
                return false;
            }else if(!this.tenderDocumentsCost){
                $('#focus2').focus();
                this.$message.warning('请填写文件工本费');
                return false;
            }else if(!this.bidderData){
                $('#focus3').focus();
                this.$message.warning('请填写投标人需提交的资料');
                return false;
            }
            if(!isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){
                $('#focus4').focus();
                this.$message.warning('请输入正确的联系方式！');
                return false;
            }
            
            // 企业资质要求的label
            if(this.certificateBox.length>0){
                this.certificateBox.forEach(item =>{
                    this.companyInfo.push(item.label)
                })
            }
            // 项目负责人资质要求的label
            if(this.leaderBox.length>0){
                this.leaderBox.forEach(item =>{
                    this.leaderInfo.push(item.label)
                })
            }
            // 上午发售时间
            let morningArr = [];
            morningArr.push(this.morningbegin,this.morningend)
            this.saleStartTime = morningArr.toString();
            // 下午发售时间
            let afterArr = [];
            afterArr.push(this.afterbegin,this.afterend)
            this.saleEndTime = afterArr.toString();
            let objData={};
            let arr = [];
            let items = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                objData={
                    noticeType:'资审公告',
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    tendereeAddress:this.tendereeAddress,
                    tendereePhone:this.tendereePhone,
                    purchaseAmount:this.purchaseAmount,
                    nameOfTenderProject:this.nameOfTenderProject,
                    purchasePurposes:this.purchasePurposes,
                    applicantQualifications:this.applicantQualifications,
                    technologyQualifications:this.technologyQualifications,
                    noticeName:this.noticeName,
                    enrollStartTime:this.applicationTime[0],
                    enrollEndTime:this.applicationTime[1],
                    saleReceiveStartDate:this.collectTime[0],
                    saleReceiveEndDate:this.collectTime[1],
                    saleStartTime:this.saleStartTime,
                    saleEndTime:this.saleEndTime,
                    tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,
                    tenderDocumentsCost:this.tenderDocumentsCost,
                    costAcceptAccount:this.costAcceptAccount,
                    bidderData:this.bidderData,
                    submitTime:this.submitTime,
                    projectLeader:this.projectLeader,
                    projectLeaderPhone:this.projectLeaderPhone,
                    remark:this.remark,
                    items:this.subArr,
                    timeReference:this.projectObj.totalProjectId,
                    companyQualifications:JSON.stringify(this.certificateBox),// 企业资质要求
                    managerQualifications:JSON.stringify(this.leaderBox),// 项目负责人资质要求
                }
            }else{
                items = {
                    projectCode:this.projectObj.totalProjectId,
                    purchaseAmount:this.purchaseAmount,// 采购数量
                    purchasePurposes:this.purchasePurposes,// 采购用途
                    companyQualifications:JSON.stringify(this.certificateBox),// 企业资质要求
                    managerQualifications:JSON.stringify(this.leaderBox),// 项目负责人资质要求
                    technologyQualifications:this.technologyQualifications,// 简要技术要求
                    applicantQualifications:this.applicantQualifications,// 投资人资格条件
                }
                arr.push(items)
                objData={
                    noticeType:'资审公告',
                    projectCode:this.projectObj.totalProjectId,
                    tendereeAddress:this.tendereeAddress,
                    tendereePhone:this.tendereePhone,
                    purchaseAmount:this.purchaseAmount,
                    nameOfTenderProject:this.nameOfTenderProject,
                    purchasePurposes:this.purchasePurposes,
                    applicantQualifications:this.applicantQualifications,
                    technologyQualifications:this.technologyQualifications,
                    noticeName:this.noticeName,
                    enrollStartTime:this.applicationTime[0],
                    enrollEndTime:this.applicationTime[1],
                    saleReceiveStartDate:this.collectTime[0],
                    saleReceiveEndDate:this.collectTime[1],
                    saleStartTime:this.saleStartTime,
                    saleEndTime:this.saleEndTime,
                    tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,
                    tenderDocumentsCost:this.tenderDocumentsCost,
                    costAcceptAccount:this.costAcceptAccount,
                    bidderData:this.bidderData,
                    submitTime:this.submitTime,
                    projectLeader:this.projectLeader,
                    projectLeaderPhone:this.projectLeaderPhone,
                    remark:this.remark,
                    items:arr,
                    timeReference:this.projectObj.totalProjectId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderNoticeController/saveOrUpdate',
                data:objData
            }).then(res=>{
                if(res.data.status == 200){
                    this.nextShow = false;
                    this.show = true;
                    this.saveBox = true;
                }else{
                    this.$message.warning(res.data)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        sureSave(){
            this.saveBox = false;
        },
        //关闭保存、提交弹框
        handleClose(){
            this.saveBox = false;
            this.submitBox = false;
        },
        //上一步
        backTo(){
            this.nextShow = false;
            this.show = true;
            this.applicationTime = [];
            this.collectTime = [];
            this.submitTime = new Date(this.submitTime).getTime();//递交申请文件截止时间
            this.enrollStartTime = new Date(this.enrollStartTime).getTime();
            this.enrollEndTime = new Date(this.enrollEndTime).getTime();
            this.applicationTime.push(this.enrollStartTime,this.enrollEndTime);//报名时间
            this.saleReceiveStartDate = new Date(this.saleReceiveStartDate).getTime();
            this.saleReceiveEndDate = new Date(this.saleReceiveEndDate).getTime();
            this.collectTime.push(this.saleReceiveStartDate,this.saleReceiveEndDate);//资审文件领取时间
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    noticeType:"资审公告"
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    noticeType:"资审公告"
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderNoticeController/select',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.nextShow = false;
                    this.show = true;
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //提交
        submitFile(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderNoticeController/submit',
                data:{
                    tenderNoticeId:this.userId,
                    state:'待办理'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.show = false;
                    this.nextShow = true;
                    this.submitBox = true;
                    $('.new_nav').hide();
                }else{
                    this.$message.warning(res.data.msg);
                    this.submitBox = false;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        submitSave(){
            this.submitBox = false;
            this.getmanageInfo();// 办理记录
        },
        //打开上传文件弹框
        shezhi(){
            this.file = true;
        },
        closeFile(){
            this.file = false;
        },
        //上传文件
        loadFile(event){
            var file = event.target.files[0];
            var fileSize = file.size; 
            if(fileSize > 102400000) {
                this.$message.warning('图片大小不能超过102400000KB');
                return false;
            }
            this.$refs.file.value = null;
            this.files = file;
            var formData = new FormData();
            formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
            formData.append("file", this.files);
            if(this.num == 1){
                formData.append("fileType", '立项批复文件');
            }else{
                formData.append("fileType", '项目负责人授权书');
            }
            
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/multifileUpload',
                data:formData
            }).then(res=>{
                if(res.data.status == 200){
                    this.uploadList();
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //上传列表
        uploadList(){
            var obj = {}
            if(this.num == 1){
                obj={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:' 招标（采购）人确认函'
                }
            }else{
                obj={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:' 资格预审公告'
                }
            }
            this.$axios({//this.projectNums
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
                if(this.num == 1){
                    this.subpackgeData[0].attachlist = arr
                }else{
                    this.subpackgeData[1].attachlist = arr
                }
            }else{
                this.$message.warning(res.data.msg)
            }
            }).catch(err=>{
            console.log(err);
            })
        },
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName)
        },
        //删除
        handleFileChange(){
                let deleteArr = [];
                for(let i in val){
                    deleteArr.push(val[i].attachmeId);
                }
                this.attachmeId = deleteArr;
        },
        //删除文件列表
        deleteFile(){
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
                this.$message.warning(res.data.msg)
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
        blurPhone(){
            if(!isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){
                this.$message.warning('请输入正确的联系方式！');
            }
        },
        //办理记录列表
        async getmanageInfo(){
            await this.getInitInfo();// 初始化查询
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.userId
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.userId
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
       
  },
  created(){
      this.getbiddingInfo();//招标项目信息
      this.getInitInfo();//查询--判断
      this.getsubList();//分包表格
      this.getmanageInfo();
  },
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
.el-collapse{
    width: 96%;
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
.notic,h6,b{
    color:red;
}
.messageBox{
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
}
h1{
    font-weight: normal;
}
.title_box{
    width: 100%;
    height: 100px;
    border-bottom: 2px  dashed red;
}
.main_box{
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
}
.main_box li{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.main_box li span{
   padding-left: 150px;
}
.last{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: right;
}
.top_box{
    width: 1100px;
    height:99%;
    margin: 0 auto;
    overflow: scroll;
}
.mask1 {
  position: fixed;
  width: 100%;
  height: 90%;
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
  z-index: 7;
}

.backTop{
    z-index: 3;
}
.fb_box{
    border:7px solid #b2b2b2;
    /* border-bottom: none; */
    width: 85%;
    height: 90%;
    z-index: 20;
    position: absolute;
    top:7%;
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
.new_main {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  margin-top:20px;
}
.new_m_one {
    width: 100%;
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
.el-icon-warning{
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
.mask1{
  z-index: 8;
}
.file_box{
  width: 900px;
  height: 416px;
  z-index: 9;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.file_head{
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  background: #0058a9 ;
  color: #ffffff;
}
.file_nav{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin-bottom: 1px;
}
.file_nav>button{
  border: none;
  background: #0095D5;
  color: #ffffff;
  padding:8px 14px;
  font-size: 16px;
  cursor: pointer;
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
  /* 新建挑选项目弹框 */
  .mask2{
    z-index: 10;
  }
  .choose_box{
  width: 95%;
  height:690px;
  z-index: 11;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  overflow-y: hidden;
  }
  .chooseMain{
    width: 90%;
    margin: 0 auto;
  }
  .upload:hover{
    text-decoration: underline;
    color:#f00;
    cursor: pointer;
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
  .pass_pro{
    margin-top:10px;
  }
  .temLi{
    cursor: pointer;
  }
  .temLi:hover{
    color: #f00;
  }
.fb_box{
    border:7px solid #b2b2b2;
    /* border-bottom: none; */
    width: 85%;
    height: 90%;
    z-index: 5;
    position: absolute;
    top:7%;
    background:#f0f4f6;
    overflow: hidden;
}
.sureSelect{
    position: fixed;
    bottom: 5%;
    left:50%;
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
.table_box{
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
    line-height: 40px;
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
</style>