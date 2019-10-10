<template>
    <div class="myDiv">
        <!-- 招标履约情况 -->
        <div v-show="passJudgeShow">
            <!-- 头部 -->
            <div class="head_box" v-show="hide_box_flag">
                <div class="head_l" id="word_box" @click="newManage()">新增履约</div>
                <div class="head_l" id="word_box" @click="deletePro()">删除履约</div>
            </div>
            <!-- <div class="head_bottom">
            <span class="head_b_b">招标项目(分包)名称：<el-input v-model="inviteName" @keyup.enter.native="searchList()"  placeholder="请输入内容"></el-input></span>
            <span class="head_b_b">入场项目(分包)编号：<el-input v-model="inviteNumber" @keyup.enter.native="searchList()" placeholder="请输入内容"></el-input></span>
            <span class="head_b_b">分包名称：<el-input v-model="subName" @keyup.enter.native="searchList()" placeholder="请输入内容"></el-input></span>
            <span><button class="btn" @click="searchList()">搜索</button></span>
            </div> -->
            <!-- 主体表格 -->
            <div class="warp_main">
                <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleDeleteChange">
                    <el-table-column  type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="projectCode" label="入场项目(分包)编号" width="180"  v-if="this.projectObj.totalProjectId.indexOf('-') == -1">
                    </el-table-column>
                    <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号" width="180" v-else>
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="招标项目名称" width="180">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="分包名称" v-if="this.projectObj.totalProjectId.indexOf('-') == -1">
                    </el-table-column>
                    <el-table-column prop="subcontractName" label="分包名称" v-else>
                    </el-table-column>
                    <el-table-column prop="tenderPurchaserName" label="招标(采购)人">
                    </el-table-column>
                    <el-table-column prop="nameOfSuccessfulSupplier" label="中标人">
                    </el-table-column>
                    <el-table-column prop="performanceSubmitDate" label="履约信息递交时间">
                    </el-table-column>
                    <el-table-column fixed="right" label="修改" width="100" v-if="role_types == '招标(采购)代理'  || str_entrust_type == '委托角色'">
                        <template slot-scope="scope">
                            <i class="el-icon-edit"  style="cursor: pointer;" @click="modifyOpen(scope.row)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="查看" width="100">
                        <template slot-scope="scope">
                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookRecord(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 新增履约 -->
            <div class="mask"  v-show="show"></div>
            <div class="new_pro" v-show="show">
                <div class="new_head">
                    <div style="padding-left:10px;">挑选合同</div>
                    <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <!-- 新增主体表格 -->
                <div class="new_table">
                    <el-table :data="performanceData" stripe style="width: 100%">
                        <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="projectCode" label="入场项目(分包)编号" width="180"  v-if="this.projectObj.totalProjectId.indexOf('-') == -1">
                        </el-table-column>
                        <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号" width="180" v-else>
                        </el-table-column>
                        <el-table-column prop="nameOfTenderProject" label="招标项目名称">
                        </el-table-column>
                        <el-table-column prop="nameOfTenderProject" label="入场项目(分包)名称" v-if="this.projectObj.totalProjectId.indexOf('-') == -1">
                        </el-table-column>
                        <el-table-column prop="subcontractName" label="入场项目(分包)名称" v-else>
                        </el-table-column>
                        <el-table-column prop="nameOfSuccessfulSupplier" label="中标单位">
                        </el-table-column>
                        <el-table-column prop="operation" label="选择">
                            <template slot-scope="scope">
                                <i class="el-icon-plus" style="cursor: pointer;" @click="getDetail(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 新增查看履约记录 -->
            <div class="new_pro new_pro_box" v-show="lookShow">
                <div class="new_head_box">
                    <div class="new_head">
                        <div style="padding-left:10px;">新增履约记录</div>
                        <div @click="closelookShow" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                    </div>
                    <div class="new_nav">
                        <button class="nav_co nav_save" @click="modifySaveFile">修改保存</button>
                    </div>
                </div>
                <div class="new_main">
                    <el-collapse v-model="activeName" accordion>
                        <!--招标项目信息 -->
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
                                    <!-- 招标项目编号 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">招标项目编号：</div>
                                        <div class="noteFlex">
                                            <span>{{totalProjectId}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 分包编号 -->
                                    <div class="noteBox"  v-if="this.projectObj.totalProjectId.indexOf('-') == -1">
                                        <div class="noteContent">
                                            <div class="noteLeft">分包编号：</div>
                                            <div class="noteFlex">
                                                <span>{{totalProjectId}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="noteBox"  v-else>
                                        <div class="noteContent">
                                            <div class="noteLeft">分包编号：</div>
                                            <div class="noteFlex">
                                                <span>{{entrySubcontractNumber}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 分包名称 -->
                                    <div class="noteBox"  v-if="this.subcontractName == null">
                                        <div class="noteContent">
                                            <div class="noteLeft">分包名称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="noteBox" v-else>
                                        <div class="noteContent">
                                            <div class="noteLeft">分包名称：</div>
                                            <div class="noteFlex">
                                                <span>{{subcontractName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标人：</div>
                                            <div class="noteFlex">
                                                <span>{{tenderPurchaserName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 中标人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">中标人：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfSuccessfulSupplier}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 合同信息 -->
                        <el-collapse-item title="合同信息" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="contractData" stripe style="width: 100%" >
                                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column label="合同签署时间" width="180">
                                            <template slot-scope="scope">
                                                <span>{{contractSignTime}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="contractDeadline" label="合同期限(日历天)" width="180">
                                        </el-table-column>
                                        <el-table-column prop="contractAmount" label="合同金额(元)">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="查看" width="100">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search"  style="cursor: pointer;" @click="lookOpen(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 履约信息 -->
                        <el-collapse-item title="履约信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 实际履约期限及递交时间 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">实际履约期限(天)：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="realityPerformanceDeadline"></el-input>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:180px;">履约信息递交时间：</span>
                                                <el-date-picker :picker-options="pickerOptions0" v-model="performanceSubmitDate" value-format="timestamp" type="datetime" placeholder="选择日期时间">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                    <!--履约变更内容  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">履约变更内容：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="performanceChangeContent" value-format="timestamp" type="textarea"></el-input>
                                            </div>
                                        </div>
                                        <div style="display: inline-flex;">
                                            <div style="color:#f00;">(此处由招标人/招标代理记录中标人对招标人就合同的履约情况)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="4">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="appendixData" stripe style="width: 100%" >
                                        <el-table-column prop="appendixName" label="电子件名称" width="150">
                                        </el-table-column>
                                        <el-table-column prop="attachlist" label="电子件列表(点击查看)" width="240">
                                            <template slot-scope="scope">
                                                <li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
                                                {{item.fileName}}
                                                </li>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="管理"  width="120">
                                            <template slot-scope="scope">
                                                <span style="color:blue;cursor:pointer;" @click="fileElectron()">电子件管理</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="operation" label="说明">
                                            <template slot-scope="scope">
                                                <span>履约文件</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 修改履约记录 -->
            <div class="new_pro new_pro_box" v-show="editShow">
                <div class="new_head_box">
                    <div class="new_head">
                        <div style="padding-left:10px;">修改履约记录</div>
                        <div @click="closelookShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                    </div>
                    <div class="new_nav">
                        <button class="nav_co nav_save" @click="editSaveFile()">修改保存</button>
                    </div>
                </div>
                <div class="new_main">
                    <el-collapse v-model="activeName" accordion>
                        <!--招标项目信息 -->
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
                                    <!-- 招标项目编号 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">招标项目编号：</div>
                                        <div class="noteFlex">
                                            <span>{{totalProjectId}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 分包编号 -->
                                    <div class="noteBox"  v-if="this.projectObj.totalProjectId.indexOf('-') == -1">
                                        <div class="noteContent">
                                            <div class="noteLeft">分包编号：</div>
                                            <div class="noteFlex">
                                                <span>{{totalProjectId}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="noteBox"  v-else>
                                        <div class="noteContent">
                                            <div class="noteLeft">分包编号：</div>
                                            <div class="noteFlex">
                                                <span>{{entrySubcontractNumber}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 分包名称 -->
                                    <div class="noteBox"  v-if="this.subcontractName == null">
                                        <div class="noteContent">
                                            <div class="noteLeft">分包名称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="noteBox" v-else>
                                        <div class="noteContent">
                                            <div class="noteLeft">分包名称：</div>
                                            <div class="noteFlex">
                                                <span>{{subcontractName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标人：</div>
                                            <div class="noteFlex">
                                                <span>{{tenderPurchaserName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 中标人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">中标人：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfSuccessfulSupplier}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 合同信息 -->
                        <el-collapse-item title="合同信息" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="contractData" stripe style="width: 100%" >
                                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column label="合同签署时间" width="180">
                                            <template slot-scope="scope">
                                                <span>{{contractSignTime}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="contractDeadline" label="合同期限(日历天)" width="180">
                                        </el-table-column>
                                        <el-table-column prop="contractAmount" label="合同金额(元)">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="查看" width="100">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search"  style="cursor: pointer;" @click="lookOpen(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 履约信息 -->
                        <el-collapse-item title="履约信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 实际履约期限及递交时间 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">实际履约期限(天)：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="realityPerformanceDeadline"></el-input>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:180px;">履约信息递交时间：</span>
                                                <el-date-picker :picker-options="pickerOptions0"  v-model="performanceSubmitDate" value-format="timestamp" type="datetime" placeholder="选择日期时间">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                    <!--履约变更内容  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">履约变更内容：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="performanceChangeContent" value-format="timestamp" type="textarea"></el-input>
                                            </div>
                                        </div>
                                        <div style="display: inline-flex;">
                                            <div style="color:#f00;">(此处由招标人/招标代理记录中标人对招标人就合同的履约情况)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="4">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="appendixData" stripe style="width: 100%" >
                                        <el-table-column prop="appendixName" label="电子件名称" width="150">
                                        </el-table-column>
                                        <el-table-column prop="attachlist" label="电子件列表(点击查看)" width="240">
                                            <template slot-scope="scope">
                                                <li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
                                                {{item.fileName}}
                                                </li>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="管理"  width="120">
                                            <template slot-scope="scope">
                                                <span style="color:blue;cursor:pointer;" @click="fileElectron(scope.row.id)">电子件管理</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="operation" label="说明">
                                            <template slot-scope="scope">
                                                <span>履约文件</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 只是查看履约记录 -->
            <div class="new_pro new_pro_box" v-show="edit_info_flag">
                <div class="new_head_box">
                    <div class="new_head">
                        <div style="padding-left:10px;">查看履约记录</div>
                        <div @click="closelookShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                    </div>
                </div>
                <div class="new_main">
                    <el-collapse v-model="activeName" accordion>
                        <!--招标项目信息 -->
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
                                    <!-- 招标项目编号 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">招标项目编号：</div>
                                        <div class="noteFlex">
                                            <span>{{totalProjectId}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 分包编号 -->
                                    <div class="noteBox"  v-if="this.projectObj.totalProjectId.indexOf('-') == -1">
                                        <div class="noteContent">
                                            <div class="noteLeft">分包编号：</div>
                                            <div class="noteFlex">
                                                <span>{{totalProjectId}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="noteBox"  v-else>
                                        <div class="noteContent">
                                            <div class="noteLeft">分包编号：</div>
                                            <div class="noteFlex">
                                                <span>{{entrySubcontractNumber}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 分包名称 -->
                                    <div class="noteBox"  v-if="this.subcontractName == null">
                                        <div class="noteContent">
                                            <div class="noteLeft">分包名称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="noteBox" v-else>
                                        <div class="noteContent">
                                            <div class="noteLeft">分包名称：</div>
                                            <div class="noteFlex">
                                                <span>{{subcontractName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标人：</div>
                                            <div class="noteFlex">
                                                <span>{{tenderPurchaserName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 中标人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">中标人：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfSuccessfulSupplier}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 合同信息 -->
                        <el-collapse-item title="合同信息" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="contractData" stripe style="width: 100%" >
                                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column label="合同签署时间" width="180">
                                            <template slot-scope="scope">
                                                <span>{{contractSignTime}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="contractDeadline" label="合同期限(日历天)" width="180">
                                        </el-table-column>
                                        <el-table-column prop="contractAmount" label="合同金额(元)">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="查看" width="100">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search"  style="cursor: pointer;" @click="lookOpen(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 履约信息 -->
                        <el-collapse-item title="履约信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 实际履约期限及递交时间 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">实际履约期限(天)：</div>
                                            <div class="noteFlex">
                                                <span>{{realityPerformanceDeadline}}</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:180px;">履约信息递交时间：</span>
                                                <span>{{performanceSubmitDate}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--履约变更内容  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">履约变更内容：</div>
                                            <div class="noteFlex">
                                                <span>{{performanceChangeContent}}</span>
                                            </div>
                                        </div>
                                        <div style="display: inline-flex;">
                                            <div style="color:#f00;">(此处由招标人/招标代理记录中标人对招标人就合同的履约情况)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="4">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="appendixData" stripe style="width: 100%" >
                                        <el-table-column prop="appendixName" label="电子件名称" width="150">
                                        </el-table-column>
                                        <el-table-column prop="attachlist" label="电子件列表(点击查看)" width="240">
                                            <template slot-scope="scope">
                                                <li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
                                                {{item.fileName}}
                                                </li>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="operation" label="说明">
                                            <template slot-scope="scope">
                                                <span>履约文件</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 查看合同信息弹框 -->
            <div class="new_pro new_pro_box" v-show="informateShow">
                <div class="new_head_box">
                    <div class="new_head">
                        <div style="padding-left:10px;">查看合同</div>
                        <div @click="closeinforShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                    </div>
                </div>
                <div class="new_main">
                    <el-collapse v-model="activeName1" accordion>
                        <!--招标项目信息 -->
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
                                    <!-- 招标人及金额 -->
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
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:100px;">入场项目编号：</span>
                                            <span>{{totalProId}}</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="附件" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="relevantData" stripe style="width: 100%" >
                                        <el-table-column prop="appendixName" label="电子件名称">
                                        </el-table-column>
                                        <el-table-column prop="attachlist" label="电子件列表(点击查看)">
                                            <template slot-scope="scope">
                                                <li v-for='(item,index) in scope.row.attachlist' :key="index"  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
                                                {{item.fileName}}
                                                </li>
                                            </template>
                                        </el-table-column>
                                        <!-- <el-table-column fixed="right" label="操作">
                                            <template slot-scope="scope">
                                                <i class="el-icon-setting"  style="cursor: pointer;" @click="shezhi(scope.row.id)"></i>
                                            </template>
                                        </el-table-column> -->
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 中标人信息 -->
                        <el-collapse-item title="中标人信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="winnerData" stripe style="width: 100%">
                                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column prop="nameOfWinningBidder" label="中标单位名称" width="180">
                                        </el-table-column>
                                        <el-table-column prop="projectLeader" label="项目负责人">
                                        </el-table-column>
                                        <el-table-column prop="winningAmount" label="中标金额(万元)">
                                        </el-table-column>
                                        <el-table-column prop="winningBidPeriod" label="中标日期(日历天)">
                                        </el-table-column>
                                        <el-table-column prop="qualityGradeOfWinningBid" label="质量等级">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 合同信息 -->
                        <el-collapse-item title="合同信息" name="4">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!--是否公示  -->
                                    <!-- <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">是否公示：</div>
                                        <div class="noteFlex">
                                            <span>{{isPublicity}}</span>
                                        </div>
                                        </div>
                                    </div> -->
                                    <!-- 合同编号及名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">合同编号：</div>
                                        <div class="noteFlex">
                                            <span>{{contractCode}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">合同名称：</span>
                                            <span>{{contractName}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!--合同金额及期限  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">合同金额(元)：</div>
                                        <div class="noteFlex">
                                            <span>{{contractAmount}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">合同期限(日历天)：</span>
                                            <span>{{contractDeadline}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!--签署时间及洽谈地点  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">合同签署时间：</div>
                                        <div class="noteFlex">
                                            <span>{{contractSignTime}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">合同洽谈地点：</span>
                                            <span>{{discussLocation}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 质量要求 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">质量要求：</div>
                                        <div class="noteFlex">
                                            <span>{{qualityRequirements}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!--合同主要内容  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">合同主要内容：</div>
                                        <div class="noteFlex">
                                            <span>{{contractContent}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 备注 -->
                                    <div class="noteBox">
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
                                        <div>{{nameOfTenderProject}}</div>
                                        <div>合同公示</div>
                                        <div style="font-size:14px;font-weight:normal;color:#333;">{{updateTime}}</div>
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
                                            <div class="noteLeft" style="width:220px;">招标（采购）项目预算金额：</div>
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
                                            <div class="noteLeft" style="width:220px;">合同期限(日历天)：</div>
                                            <div class="noteFlex">
                                                <span>{{contractDeadline}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--合同签署时间  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同签署时间：</div>
                                            <div class="noteFlex">
                                                <span>{{contractSignTime}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--洽谈地点  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">洽谈地点：</div>
                                            <div class="noteFlex">
                                                <span>{{discussLocation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--质量要求  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">质量要求：</div>
                                            <div class="noteFlex">
                                                <span>{{qualityRequirements}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--合同主要内容  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同主要内容：</div>
                                            <div class="noteFlex">
                                                <span>{{contractContent}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--备注说明  -->
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
                                    <div style="font-weight:bold;text-align:right;width:100%;margin-bottom:10px;">
                                        <div>{{creatorCompanyName}}</div>
                                        <div>{{updateTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--办理记录  -->
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
            <!-- 上传电子文件展示 -->
            <div class="mask1" v-show="ElectronShow"></div>
            <div class="file_box" v-show="ElectronShow">
                <!-- 头部 -->
                <div class="file_head">
                    <div class="file_title" style="padding-left:10px;">履约文件</div>
                    <div style="padding-right:10px;font-size:25px;cursor:pointer;" @click="closeFile">×</div>
                </div>
                <!-- 上传删除 -->
                <div class="file_nav">
                    <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
                    <button style="margin-right:3px;">上传</button>
                    <button @click="deleteFile()">删除</button>
                </div>
                <!-- 表格 -->
                <div class="fileTableData">
                    <el-table :data="fileData" style="width: 100%"  @selection-change="handleSelectionChange">
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
            <!-- 履约情况 -->
            <el-dialog
                title="系统提示"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>尚未完成合同，无法记录履约情况！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 是否删除 -->
            <el-dialog
                title="信息提示"
                :visible.sync="isdeleteBoxShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-question"></i>
                    <span>您确定删除选中的记录吗?</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="isdeleteSave">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 保存 -->
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
                    <el-button type="primary" @click="saveBoxSure">确 定</el-button>
                </span>
            </el-dialog>
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
          creatorCompanyName:'',
          edit_info_flag:false,
          hide_box_flag:true,
          str_entrust_type:window.sessionStorage.str_entrust_type,
          biddingPurchasingAgencyName:'',
          agentAddress : '',
          agentPhone :'',
          role_types:window.localStorage.role_types,
          //中标人地址
          //联系方式
          contractCode:'',
          pickerOptions0: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
          alertMsg:'',
          cancelShow:false,
          tenderPurchaserName:'',//新招标人
          disableFlag:false,// 
          totalProjectId:'',
          num:'',
          frameShow:false,
          passJudgeShow:true,
          contractDeadline:'',
          modifyId:'',
          editShow:false,
          saveBox:false,
          contacts:'',
          contactInformation:'',
          address:'',
          budgetAmount:'',
          updateTime:'',
          remark:'',
          contractContent:'',
          qualityRequirements:'',
          discussLocation:'',
          contractSignTime:'',
          contractAmount:'',
          contractName:'',
          isPublicity:'',
        contractSignTime:'',
        itemNum:[],
        entrySubcontractNumber:'',
        nameOfSuccessfulSupplier:'',
        subName:'',
        inviteNumber:'',
        inviteName:'',
        projectObj:JSON.parse(window.localStorage.projectObj),
        value:'',
        id:[],//履约情况id
        activeName:['1','2','3','4'],
        activeName1:['1','2','3','4','5','6'],
        isdeleteBoxShow:false,//是否删除
        dialogVisible: false,//履约情况
        show:false,//新增履约
        lookShow:false,//新增查看履约记录
        ElectronShow:false,//上传电子文件展示
        informateShow:false,//查看合同信息弹框
        tableData:[],//列表数据
        performanceData:[],//新增履约数据
        contractData:[],//合同信息数据
        appendixData:[
             {
                 id:1,
                appendixName: "履约文件",
                attachlist: []
            },
        ],//相关附件数据
        relevantData:[
            {
                id:2,
                appendixName: "合同签署",
                attachlist: []
            },
        ],//合同信息--》相关附件
        manageDate:[],//合同信息--》办理记录
        winnerData:[],//合同信息点击查看--》中标人信息
        fileData:[],//上传电子文件列表数据
        currentPage:1,//当前页
        nameOfTenderProject:'',//招标项目名称
        biddingProjectNumber:'',//招标项目编号
        totalProjectId:'',//分包编号
        subcontractName:'',//分包名称
        tenderPurchaserName:'',//招标采购人
        amountOfBiddingProject:'',//招标金额
        totalProId:'',//入场项目编号
        realityPerformanceDeadline:'',//实际履约期限
        performanceSubmitDate:'',//履约递交时间
        performanceChangeContent:'',//履约变更内容
        keyIDs:'',//上传列表的keyid
        phoneOfSuccessfulSupplier:'',//中标商联系方式
        addressOfSuccessfulSupplier:'',//地址
        entryNum:'',
      }
    },
    created(){
        this.getDataList();//获取列表详情
        this.getbiddingInfo();// 招标项目信息
        this.getmanageInfo();//办理记录列表
        this.getDecideList();
       
    },
    computed: {
        menu_list_arr ( ){ 
            return this.$store.state.menu_list 
        }
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
                    this.budgetAmount = res.data.data.budgetAmount;//招标项目预算金额
                    this.contactInformation = res.data.data.contactInformation//联系方式
                    this.contacts = res.data.data.contacts//联系人
                    this.totalProjectId = res.data.data.totalProjectId;//总包编号
                    this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取列表详情
        getDataList(){
            let obj={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                obj={
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }else{
                obj={
                    projectCode:this.projectObj.totalProjectId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderPerformanceController/queryTenderPerformance',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data;
                    this.tableData.map((item,index)=>{
                        if(item.performanceSubmitDate == "" || item.performanceSubmitDate == null){
                            item.performanceSubmitDate = ""
                        }else{
                            item.performanceSubmitDate = dayjs(item.performanceSubmitDate).format('YYYY-MM-DD HH:mm:ss');
                        }
                        
                    })
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //新增履约挑选合同查询
        getAddContractList(){
            let obj={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                obj={
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }else{
                obj={
                    projectCode:this.projectObj.totalProjectId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderPerformanceController/queryProjectInformation',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.performanceData = [];
                    this.performanceData.push(res.data.data);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //合同签署时间
        getContractTime(){
            let obj={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                obj={
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }else{
                obj={
                    projectCode:this.projectObj.totalProjectId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/contractController/queryContract',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.creatorCompanyName = res.data.data.creatorCompanyName;
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');
                    this.contractData = [];
                    this.contractData.push(res.data.data);
                    this.isPublicity = res.data.data.isPublicity;
                    this.entrySubcontractNumber = res.data.data.entrySubcontractNumber;
                    this.contractName = res.data.data.contractName;
                    this.contractAmount = res.data.data.contractAmount;
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');
                    this.discussLocation = res.data.data.discussLocation;
                    this.qualityRequirements = res.data.data.qualityRequirements;
                    this.contractContent = res.data.data.contractContent;
                    this.remark = res.data.data.remark;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //中标信息查看
        getWiningBidList(){
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
                method:"POST",
                url: baseUrl+"/winnNoticeController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.winnerData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //中标信息单位全称、地址及联系方式
        getInforBidList(){
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
                method:"POST",
                url: baseUrl+"/winnResultController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.address = res.data.data[0].address;
                    this.agentAddress = res.data.data[0].agentAddress;
                    this.agentPhone = res.data.data[0].agentPhone;
                    res.data.data[0].items.map((itema,index)=>{
                        if(this.entryNum = itema.entrySubcontractNumber){
                            this.addressOfSuccessfulSupplier = itema.addressOfSuccessfulSupplier;
                            this.phoneOfSuccessfulSupplier = itema.phoneOfSuccessfulSupplier;
                            this.nameOfSuccessfulSupplier = itema.nameOfSuccessfulSupplier;
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //新增履约
        newManage(){
            this.show = true;
            this.realityPerformanceDeadline = '';
            this.performanceSubmitDate = '';
            this.performanceChangeContent = '';
            this.getAddContractList();
        },
        close(){
            this.show = false;
        },
        handleDeleteChange(val){
            let deleteArr = [];
            for(let i in val){
                deleteArr.push(val[i].id);
            }
            this.itemNum = deleteArr
        },
        //删除履约情况
        deletePro(){
            this.isdeleteBoxShow = true;
        },
        isdeleteSave(){
            this.isdeleteBoxShow = false;
            this.$axios({
                method: "POST",
                url: baseUrl+"/tenderPerformanceController/delete",
                data:{
                    listId:this.itemNum
                }
            }).then(res=>{
                if(res.data.status == 200){
                    for(var i=0;i<this.tableData.length;i++){
                        for(var j=0;j<this.itemNum.length;j++){
                            if(this.tableData[i].id == this.itemNum[j].id){
                                this.tableData.splice(i,1);
                            }
                        }
                    }
                    this.getDataList();//获取列表详情
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //修改履约记录
        modifyOpen(row){
            this.editShow = true;
            this.realityPerformanceDeadline = row.realityPerformanceDeadline;
            this.performanceSubmitDate = new Date(row.performanceSubmitDate).getTime();
            this.performanceChangeContent = row.performanceChangeContent;
            this.modifyId = row.id;
            this.nameOfSuccessfulSupplier = row.nameOfSuccessfulSupplier;
            this.subcontractName = row.subcontractName;
            this.appendixData[0].attachlist = [];
            this.relevantData[0].attachlist = [];
            this.uploadList();
            this.getContractTime();//合同签署时间
            this.getbiddingInfo();// 招标项目信息
        },
        lookRecord(row){
            this.edit_info_flag = true;
            this.realityPerformanceDeadline = row.realityPerformanceDeadline;
            this.performanceSubmitDate = dayjs(row.performanceSubmitDate).format('YYYY-MM-DD HH:mm:ss');
            this.performanceChangeContent = row.performanceChangeContent;
            this.modifyId = row.id;
            this.nameOfSuccessfulSupplier = row.nameOfSuccessfulSupplier;
            this.subcontractName = row.subcontractName;
            this.appendixData[0].attachlist = [];
            this.relevantData[0].attachlist = [];
            this.uploadList();
            this.getContractTime();//合同签署时间
            this.getbiddingInfo();// 招标项目信息
        },
        //修改==保存
        editSaveFile(){
            let obj={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                obj={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    id:this.modifyId,
                    realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                    performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                    performanceChangeContent:this.performanceChangeContent,//履约变更内容
                }
            }else{
                obj={
                    projectCode:this.projectObj.totalProjectId,
                    id:this.modifyId,
                    realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                    performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                    performanceChangeContent:this.performanceChangeContent,//履约变更内容
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderPerformanceController/updateTenderPerformance',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.editShow = false;
                    this.saveBox = true;
                    this.getDataList();//获取列表详情
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //新增履约记录
        getDetail(row){
            this.lookShow = true;
            this.nameOfSuccessfulSupplier = row.nameOfSuccessfulSupplier;
            this.nameOfTenderProject = row.nameOfTenderProject;
            this.entrySubcontractNumber = row.entrySubcontractNumber;
            this.subcontractName = row.subcontractName;
            // this.tenderPurchaserName = row.tenderPurchaserName;
            this.biddingProjectNumber = row.biddingProjectNumber;
            this.appendixData[0].attachlist = [];
            this.relevantData[0].attachlist = [];
            this.getContractTime();
        },
        closelookShow(){
            this.lookShow = false;
            this.editShow = false;
            this.show = false;
            this.edit_info_flag = false;
        },
        //新增履约记录--》点击修改保存
        modifySaveFile(){
            if(this.realityPerformanceDeadline != "" && this.realityPerformanceDeadline != null && !checkNumber(this.realityPerformanceDeadline)){
                this.$layer.msg('请输入数字类型');
                return false;
            }
            if(this.keyIDs == ""){
                let obj={};
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    obj={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                        performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                        performanceChangeContent:this.performanceChangeContent,//履约变更内容
                    }
                }else{
                    obj={
                        projectCode:this.projectObj.totalProjectId,
                        realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                        performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                        performanceChangeContent:this.performanceChangeContent,//履约变更内容
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/tenderPerformanceController/saveTenderPerformance',
                    data:obj
                }).then(res=>{
                    if(res.data.status == 200){
                        this.lookShow = false;
                        this.show = false;
                        this.saveBox = true;
                        this.getDataList();//获取列表详情
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                let obj={};
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    obj={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        id:this.keyIDs,
                        realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                        sperformanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                        performanceChangeContent:this.performanceChangeContent,//履约变更内容
                    }
                }else{
                    obj={
                        projectCode:this.projectObj.totalProjectId,
                        id:this.keyIDs,
                        realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                        performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                        performanceChangeContent:this.performanceChangeContent,//履约变更内容
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/tenderPerformanceController/updateTenderPerformance',
                    data:obj
                }).then(res=>{
                    if(res.data.status == 200){
                        this.lookShow = false;
                        this.show = false;
                        this.saveBox = true;
                        this.getDataList();//获取列表详情
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            
        },
        saveBoxSure(){
            this.saveBox = false;
            this.editShow = false;
            this.lookShow = false;
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        //查看合同信息弹框
        lookOpen(row){
            this.informateShow = true;
            this.entryNum = row.entrySubcontractNumber;
            this.contractDeadline = row.contractDeadline;//期限
            this.isPublicity = row.isPublicity;
            this.contractCode = row.contractCode;//合同编号
            this.contractName = row.contractName;//合同名称
            this.contractAmount = row.contractAmount;//合同金额
            if(row.contractSignTime == null){
                this.contractSignTime = ""
            }else{
                this.contractSignTime = dayjs(row.contractSignTime).format('YYYY-MM-DD')
            };
            this.discussLocation = row.discussLocation;//地点
            this.qualityRequirements = row.qualityRequirements;//质量要求
            this.contractContent = row.contractContent;//内容
            this.remark = row.contractContent;
            this.getWiningBidList();
            this.getContractTime();
            this.getInforBidList();
            this.updateTime = dayjs(row.updateTime).format('YYYY-MM-DD');
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
                    this.relevantData[0].attachlist = arr
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
        },
        closeinforShow(){
            this.informateShow = false;
        },
        //选中列表选框
        handleSelectionChange(val){
            let deleteArr = [];
            for(let i in val){
                deleteArr.push(val[i].id);
            }
            this.id = deleteArr;
        },
        //电子文件展示
        fileElectron(num){
            this.num = num;
            this.ElectronShow = true;
            this.uploadList();
        },
        //调用该保存接口Id
        getKeyId(){
            let obj={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                obj={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                    performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                    performanceChangeContent:this.performanceChangeContent,//履约变更内容
                }
            }else{
                obj={
                    projectCode:this.projectObj.totalProjectId,
                    realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                    performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                    performanceChangeContent:this.performanceChangeContent,//履约变更内容
                }
            }
            return this.$axios({
                method:'POST',
                url:baseUrl + '/tenderPerformanceController/saveTenderPerformance',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.keyIDs = res.data.data.id;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //上传列表
		uploadList(){
            var obj={};
            if(this.modifyId != '' && this.modifyId != null){
                obj={
                    relevanceCorrelationId:this.modifyId,
                    fileType:'履约文件'
                }
            }else{
                obj={
                    relevanceCorrelationId:this.keyIDs,
                    fileType:'履约文件'
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
                    this.appendixData[0].attachlist = arr
                    this.relevantData[0].attachlist = arr
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
        },
        //上传文件
		async loadFile(event){
            await this.getKeyId();
			var file = event.target.files[0];
			var fileSize = file.size; 
			if(fileSize > 102400000) {
				this.$layer.msg('图片大小不能超过102400000KB');
				return false;
            }
            this.$refs.file.value = null;
			this.files = file;
            var formData = new FormData();
            if(this.modifyId != '' && this.modifyId != null){
                formData.append("projectId",this.modifyId);
                formData.append("file", this.files);
                formData.append("fileType", '履约文件');
            }else{
                formData.append("projectId",this.keyIDs);
                formData.append("file", this.files);
                formData.append("fileType", '履约文件');
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
            this.ElectronShow = false;
        },
        handleClose(done) {
            this.dialogVisible = false;
            this.saveBox = false;
            this.frameShow = false;
            this.isdeleteBoxShow = false;
            this.cancelShow = false;
        },
        // 页面权限验证
        getDecideList(){
            if(window.sessionStorage.str_entrust_type != '委托角色' && this.role_types != '招标(采购)代理'){
                this.hide_box_flag = false;
            }else{
                this.hide_box_flag = true;
                var obj = {};
                this.menu_list_arr.map((item,index)=>{
                    if(item.value == '招标异常'){
                        obj.zhaobiao = item;
                    }
                    if(item.value == '履约情况'){
                        obj.lvyue = item
                    }
                    if(item.value == '合同备案'){
                        obj.beian = item
                    }
                })
                //招标勾且本业勾，可以看，
                if(obj.zhaobiao.state == '办理通过' && obj.lvyue.state == '办理通过'){
                    this.passJudgeShow = true;
                    this.frameShow = false;
                //如果上一步打钩，进一步判断
                }else if(obj.beian.state == '办理通过' ){
                    //如果招标打钩，则本业必须打勾
                    if(obj.zhaobiao.state == '办理通过'&& obj.lvyue.state == '办理通过'){
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
                            this.alertMsg = '尚未完成合同备案,无法进行履约情况!'
                        }
                    }
                }else{
                    //其他的都不能看
                    this.passJudgeShow = false;
                    this.frameShow = true;
                    if(obj.zhaobiao.state == '办理通过'){
                        this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                    }else{
                        this.alertMsg = '尚未完成合同备案,无法进行履约情况!'
                    }
                }
            }
            
            // this.$axios({
            //     method:'POST',
            //     url:baseUrl + '/interfaceTableController/selfTendering',
            //     data:{
            //         dropDownBox:'自行采购',
            //         projectEntrySubcontractNumbers:this.projectObj.totalProjectId
            //     }
            // }).then(res=>{
            //     if(res.data.status == 200){
            //         var obj = {};
            //         res.data.data.map((item,index)=>{
            //             if(item.value == '招标异常'){
            //                 obj.zhaobiao = item;
            //             }
            //             if(item.value == '履约情况'){
            //                 obj.lvyue = item
            //             }
            //             if(item.value == '合同备案'){
            //                 obj.beian = item
            //             }
            //         })
            //         //招标勾且本业勾，可以看，
            //         if(obj.zhaobiao.state == '办理通过' && obj.lvyue.state == '办理通过'){
            //             this.passJudgeShow = true;
            //             this.frameShow = false;
            //         //如果上一步打钩，进一步判断
            //         }else if(obj.beian.state == '办理通过' ){
            //             //如果招标打钩，则本业必须打勾
            //             if(obj.zhaobiao.state == '办理通过'&& obj.lvyue.state == '办理通过'){
            //                 this.passJudgeShow = true;
            //                 this.frameShow = false;
            //                 //如果招标不打勾
            //             }else if(obj.zhaobiao.state != '办理通过'){
            //                 this.passJudgeShow = true;
            //                 this.frameShow = false;
            //             }else{
            //                 this.passJudgeShow = false;
            //                 this.frameShow = true;
            //                 if(obj.zhaobiao.state == '办理通过'){
            //                     this.alertMsg = '作废标段尚未执行此操作，不可查看!'
            //                 }else{
            //                     this.alertMsg = '尚未完成合同备案,无法进行履约情况!'
            //                 }
            //             }
            //         }else{
            //             //其他的都不能看
            //             this.passJudgeShow = false;
            //             this.frameShow = true;
            //             if(obj.zhaobiao.state == '办理通过'){
            //                 this.alertMsg = '作废标段尚未执行此操作，不可查看!'
            //             }else{
            //                 this.alertMsg = '尚未完成合同备案,无法进行履约情况!'
            //             }
            //         }
            //     }else{
            //         this.$layer.msg(res.data.msg)
            //     }
            // }).catch(err=>{
            //     console.log(err)
            // })
        },
        //校验数字
        checkNum(){
            if(!checkNumber(this.realityPerformanceDeadline)){
                this.$layer.msg('请输入数字类型')
            }
        },
        //办理记录列表
        getmanageInfo(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.keyIDs
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.keyIDs
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
        }
    }
  };
</script>

<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  padding-bottom: 5%;
}
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: flex-start;
  background: #ffffff;
  padding: 0 3px;
  margin-bottom: 10px;
}
.head_l {
  padding: 2px 6px;
  background-color: #0095d5;
  color: #ffffff;
  cursor: pointer;
  margin-right: 3px;
}
.head_bottom {
  width: 100%;
  text-align: center;
  margin: 2% 0;
  background: #f5f7fa;
}
.head_b_b > .el-input {
  width: 20% !important;
  height: 35px !important;
}
.btn {
  margin-left: 2%;
  padding: 8px 14px;
  background: #0095d5;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
.wrap_tit{
    width: 100%;
    padding: 10px 10px;
}
.warp_main{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
}
.mask,.mask1{
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
}
.mask{
   z-index: 2;
}
.mask1{
    z-index: 4;
}
.file_box{
    z-index: 8;
}
.new_pro_box{
    z-index: 5;
}
/* 新建项目 */
.new_pro {
  z-index: 3;
  background: #f0f4f6;
  width: 100%;
  height: 98%;
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate(-10%, -10%);
  overflow-y: hidden;
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
/* 查看 */
.new_main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
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
.fail_box{
  width:100%;
  margin:0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px dashed #333;
}
.inputk{
    height: 25px;
    width: 80px;
    border: 1px solid #ccc;
    border-radius: 3px;
}
  /* 弹窗 */
  .icon{
      width: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
  }
  .el-icon-warning,.el-icon-question,.el-icon-success{
      font-size: 100px;
      color: #0a5e9d;
  }
  .icon span{
      margin-left: 20px;
      font-size:18px;
  }
  /* 上传电子展示 */
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
</style>