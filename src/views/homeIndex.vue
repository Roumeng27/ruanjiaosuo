<template>
    <div class="newBox">
        <div class="wrapper">
            <div class="header">
                <div class="logoImg">
                    <img src="../assets/imgs/logo.gif" alt="">
                </div>
                <div class="logoIcon">
                    <div class="outBox" @click="signUp" style="cursor:pointer;">
                        <i class="el-icon-user"></i>
                        <span>登录</span>
                    </div>
                </div>
            </div>
            <div class="mainBox">
                <el-tabs v-model="currentName" @tab-click="handleClick">
                    <el-tab-pane label="招标公告" name="1">
                        <div class="main_info">
                            <div class="pageBox" >
                                <el-table
                                    :data="publicData"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    prop="biddingProjectNumber"
                                    :show-overflow-tooltip ="true"
                                    label="项目编号"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="typesOfBiddingProjects"
                                    label="服务分类"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    label="项目名称">
                                        <template slot-scope="scope">
                                            <span class="code" v-if="scope.row.biddingProjectNumber && scope.row.biddingProjectNumber.indexOf('-') == -1" @click="publicDetail(scope.row)">{{scope.row.nameOfTenderProject}}</span>
                                            <span class="code" v-else  @click="publicDetail(scope.row)">{{scope.row.subcontractName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="noticeSendTime"
                                    label="发布日期">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- 分页器 -->
                            <div class="pagination" >
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="变更文件公告" name="2">
                        <div class="main_info">
                            <div class="pageBox" >
                                <el-table
                                    :data="fileNoticeData"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    prop="projcetNumber"
                                    label="项目编号"
                                    width="180"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                    prop="bidProjectsType"
                                    label="服务分类"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    label="项目名称"
                                    prop="projcetName">
                                        <template slot-scope="scope">
                                            <span class="code" @click="caseDetail(scope.row)">{{scope.row.projcetName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="releaseTime"
                                    label="发布日期">
                                    </el-table-column>
                                </el-table>
                            </div> -->
                            <!-- 分页器 -->
                            <!-- <div class="pagination" >
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane> -->
                    <el-tab-pane label="中标公告" name="2">
                        <div class="pageBox">
                            <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="projcetNumber"
                                label="项目编号"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="bidProjectsType"
                                label="服务分类"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                label="项目名称"
                                prop="projcetName">
                                    <template slot-scope="scope">
                                        <span class="code" @click="selectionDetail(scope.row)">{{scope.row.projcetName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="releaseTime"
                                label="发布日期">
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- 分页器 -->
                        <div class="pagination" >
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="场地预约公告" name="4">
                        <div class="main_info">
                            <div class="pageBox" >
                                <el-table
                                    :data="orderData"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    prop="projcetNumber"
                                    label="项目编号"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="bidProjectsType"
                                    label="服务分类"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    label="项目名称"
                                    prop="projcetName">
                                        <template slot-scope="scope">
                                            <span class="code" @click="orderDetail(scope.row)">{{scope.row.projcetName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="releaseTime"
                                    label="发布日期">
                                    </el-table-column>
                                </el-table>
                            </div> -->
                            <!-- 分页器 -->
                            <!-- <div class="pagination" >
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane> -->
                    <el-tab-pane label="更正公告" name="3">
                        <div class="pageBox">
                            <el-table
                                :data="changeNoticeData"
                                border
                                style="width: 100%">
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="biddingProjectNumber"
                                label="项目编号"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="typesOfBiddingProjects"
                                label="服务分类"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                label="项目名称"
                                prop="projcetName">
                                    <template slot-scope="scope">
                                        <span class="code" v-if="scope.row.biddingProjectNumber && scope.row.biddingProjectNumber.indexOf('-') == -1" @click="noticeDetail(scope.row)">{{scope.row.nameOfTenderProject}}</span>
                                        <span class="code" v-else @click="noticeDetail(scope.row)">{{scope.row.subcontractName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="noticeUpdateTime"
                                label="发布日期">
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- 分页器 -->
                        <div class="pagination" >
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="废标公告" name="4">
                        <div class="pageBox">
                            <el-table
                                :data="abnormalData"
                                border
                                style="width: 100%">
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="projcetNumber"
                                label="项目编号"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="bidProjectsType"
                                label="服务分类"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                label="项目名称"
                                prop="projcetName">
                                <template slot-scope="scope">
                                    <span class="code" @click="abnormalDetail(scope.row)">{{scope.row.projcetName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="releaseTime"
                                label="发布日期">
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- 分页器 -->
                        <div class="pagination" >
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="答疑通知" name="5">
                        <div class="main_info">
                            <div class="pageBox" >
                                <el-table
                                    :data="changeAnswerData"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="projcetNumber"
                                    label="项目编号"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="bidProjectsType"
                                    label="服务分类"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    label="项目名称"
                                    prop="projcetName">
                                        <template slot-scope="scope">
                                            <span class="code" @click="changeAnswerDetail(scope.row)">{{scope.row.projcetName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="releaseTime"
                                    label="发布日期">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- 分页器 -->
                            <div class="pagination" >
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="合同公告" name="6">
                        <div class="main_info">
                            <div class="pageBox" >
                                <el-table
                                    :data="contractAnnounceData"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="projcetNumber"
                                    label="项目编号"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="bidProjectsType"
                                    label="服务分类"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    label="项目名称"
                                    prop="projcetName">
                                        <template slot-scope="scope">
                                            <span class="code" @click="changeContractAnnounceDetail(scope.row)">{{scope.row.projcetName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="releaseTime"
                                    label="发布日期">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- 分页器 -->
                            <div class="pagination" >
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="footer">
                <div class="footerContent">
                    <div class="footerImg">
                        <div style="width:110px;height:55px;">
                            <img src="../assets/imgs/footer1.png" alt="">
                        </div>
                        <div style="width:80px;height:80px;">
                            <img src="../assets/imgs/footer2.png" alt="">
                        </div>
                    </div>
                    <div>
                        <div class="footer_file">
                            <div class="footer_word">服务指南</div>
                            <div class="footer_word">站点地图</div>
                            <div class="footer_word">法律声明</div>
                        </div>
                        <div class="footer_file" style="color:#757484;">
                            主办：北京市政务服务管理局&emsp;&emsp; 技术支持热线：010-89150001
                        </div>
                        <div  class="footer_file" style="color:#5f89a7;">
                            政府网站标识码：1100000088&emsp;&emsp; 京公网安备110105000722&emsp;&emsp; 京ICP备05060933
                        </div>
                    </div>
                    <!-- <div class="footerInfo">
                        <div class="infoFirst">
                            <p>服务指南</p>
                            <p>站点地图</p>
                            <p>法律声明</p>
                        </div>
                        <div class="infoSecond">
                            <span>主办：北京市政务服务管理局</span>
                            <span>技术支持热线：010-89150001</span>
                        </div>
                        <div class="infoThree">
                            <span>政府网站标识码：1100000088</span>
                            <span>京公网安备110105000722</span>
                            <span>京ICP备05060933</span>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 招标文件详情 -->
        <div class="lookWrapper" v-show="fileFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_box">
                    <el-collapse v-model="activeName1" accordion>
                    <!--招标项目信息 -->
                    <el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent" >{{nameOfTenderProject}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{tenderPurchaserName}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目金额：</div>
                                    <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{enterNum}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 文件信息 -->
                    <el-collapse-item title="文件信息" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">文件编号：</div>
                                    <div class="editContent">{{documentNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标文件发售时间：</div>
                                    <div class="editContent">
                                        {{saleStartDate}}到{{saleEndDate}}
                                    </div>
                                </div>
                                <div class="editCenter" style="width:30%;">
                                    <div class="editName">投标有效期：</div>
                                    <div class="editContent">{{bidPeriod}}天</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">答疑澄清时间：</div>
                                    <div class="editContent">{{answerTime}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">投标文件递交方式：</div>
                                    <div class="editContent">{{biddingDocumentsMethod}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">开标方式：</div>
                                    <div class="editContent">{{bidOpeningMethod}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 保证金信息 -->
                    <el-collapse-item title="保证金信息" name="3">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">保证金金额：</div>
                                    <div class="editContent">{{depositAmount}}元 </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">保证金接收账户：</div>
                                    <div class="editContent">{{depositReceive}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">保证金允许递交方式：</div>
                                    <div class="editContent">{{depositMethod}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 变更事项 -->
                    <el-collapse-item title="变更事项" name="4">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">变更日期：</div>
                                    <div class="editContent">{{changeDate}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">变更理由：</div>
                                    <div class="editContent">{{changeReasons}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">变更事项：</div>
                                    <div class="editContent">{{changeMatters}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                </div>
            </div>
        </div>
        <!-- 采购变更文件详情 -->
        <div class="lookWrapper" v-show="purchasefileFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_box">
                    <el-collapse v-model="activeName1" accordion>
                    <!--采购项目信息 -->
                    <el-collapse-item title="采购项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购项目名称：</div>
                                    <div class="editContent" >{{nameOfTenderProject}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{tenderPurchaserName}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">采购项目金额：</div>
                                    <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{enterNum}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 文件信息 -->
                    <el-collapse-item title="文件信息" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">文件编号：</div>
                                    <div class="editContent">{{documentNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购文件发售时间：</div>
                                    <div class="editContent">
                                        {{saleStartDate}}到{{saleEndDate}}
                                    </div>
                                </div>
                                <div class="editCenter" style="width:30%;">
                                    <div class="editName">投标有效期：</div>
                                    <div class="editContent">{{bidPeriod}}天</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">答疑澄清时间：</div>
                                    <div class="editContent">{{answerTime}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">投标文件递交方式：</div>
                                    <div class="editContent">{{biddingDocumentsMethod}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">开标方式：</div>
                                    <div class="editContent">{{bidOpeningMethod}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 保证金信息 -->
                    <el-collapse-item title="保证金信息" name="3">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">保证金金额：</div>
                                    <div class="editContent">{{depositAmount}}元 </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">保证金接收账户：</div>
                                    <div class="editContent">{{depositReceive}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">保证金允许递交方式：</div>
                                    <div class="editContent">{{depositMethod}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 变更事项 -->
                    <el-collapse-item title="变更事项" name="4">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">变更日期：</div>
                                    <div class="editContent">{{changeDate}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">变更理由：</div>
                                    <div class="editContent">{{changeReasons}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">变更事项：</div>
                                    <div class="editContent">{{changeMatters}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                </div>
            </div>
        </div>
        <!-- 招标公告详情 -->
        <div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close"  style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <div class="contentBox">
                        <div class="edit_list">
                            <div class="fail_box">
                                <div>{{noticeName}}</div>
                                <div>招标公告</div>
                                <div style="font-size:14px;font-weight:normal;color:#333;">{{saveTime}}</div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}}</div>
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
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">招标(采购)人</div>
                                    <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
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
                                    <div class="editName" style="width:200px;">招标(采购)人联系方式：</div>
                                    <div class="editContent">{{tendereePhone}}</div>
                                </div>
                            </div>
                            <div v-show="biddingOrganization == '委托招标'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构全称：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构地址：</div>
                                        <div class="editContent">{{agentAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
                                        <div class="editContent">{{agentPhone}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">招标内容</div>
                                    <div class="editContent"></div>
                                </div>
                            </div>
                            <div class="infobox_item">
                                <table border="1"  cellspacing="0" cellpadding="0" style="width:99%;">
                                    <tr>
                                        <td>招标项目名称</td>
                                        <td colspan="3">{{nameOfTenderProject}}</td>
                                    </tr>
                                    <tr>
                                        <td>入场项目编号</td>
                                        <td>{{projectCode}}</td>
                                        <td>项目预算金额</td>
                                        <td>{{amountOfBiddingProject}}万元</td>
                                    </tr>
                                    <tr>
                                        <td>用途</td>
                                        <td>{{purchasePurposes}}</td>
                                        <td>数量</td>
                                        <td>{{purchaseAmount}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">投标人资格条件</td>
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
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">招标文件领取</div>
                                    <div class="editContent"></div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标文件发售时间：</div>
                                    <div class="editContent">
                                        <span>{{saleReceiveStartDate}}日到{{saleReceiveEndDate}},上午{{morningbegin}}-{{morningend}},下午{{afterbegin}}-{{afterend}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标文件发售地点：</div>
                                    <div class="editContent">{{tenderDocumentsSaleSite}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标文件工本费：</div>
                                    <div class="editContent">人民币{{tenderDocumentsCost}}元</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" >工本费接收账户：</div>
                                    <div class="editContent">{{costAcceptAccount}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">投标人需提交资料：</div>
                                    <div class="editContent">{{bidderData}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">投标文件递交</div>
                                    <div class="editContent"></div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="width:220px;">递交投标文件截止时间：</div>
                                    <div class="editContent">{{assessmentTime}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">递交投标文件地点：</div>
                                    <div class="editContent">{{submissionDocumentsPlace}}</div>
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
                                    <div class="editContent">{{bidOpeningPlace}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">评标办法和标准：</div>
                                    <div class="editContent">{{bidEvaluationStandard}}</div>
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
                            <div style="font-weight:bold;text-align:right;width:100%;">
                                <div>{{creatorCompanyName}}</div>
                                <div>{{saveTime}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 采购公告/采购信息详情 -->
        <div class="lookWrapper" v-show="purchaselookFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close"  style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <div class="contentBox">
                        <div class="edit_list">
                            <div class="fail_box">
                                <div>{{noticeName}}</div>
                                <div v-if="biddingProcurementMode == '竞争性谈判' || biddingProcurementMode == '竞争性磋商'">采购公告</div>
                                <div v-else>采购信息</div>
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
                                    <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">招标(采购)人</div>
                                    <div class="editContent">{{tenderPurchaserName}}</div>
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
                                    <div class="editName" style="width:200px;">招标(采购)人联系方式：</div>
                                    <div class="editContent">{{tendereePhone}}</div>
                                </div>
                            </div>
                            <div v-show="biddingOrganization == '委托招标'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构全称：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构地址：</div>
                                        <div class="editContent">{{agentAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
                                        <div class="editContent">{{agentPhone}}</div>
                                    </div>
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
                                    <tr>
                                        <td>采购项目名称</td>
                                        <td colspan="3">{{nameOfTenderProject}}</td>
                                    </tr>
                                    <tr>
                                        <td>入场项目编号</td>
                                        <td>{{projectCode}}</td>
                                        <td>项目预算金额</td>
                                        <td>{{amountOfBiddingProject}}万元</td>
                                    </tr>
                                    <tr>
                                        <td>用途</td>
                                        <td>{{purchasePurposes}}</td>
                                        <td>数量</td>
                                        <td>{{purchaseAmount}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">供应商资格条件</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" height="50px">{{applicantQualifications}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">技术/服务要求</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" height="50px">{{technologyQualifications}}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">采购文件领取</div>
                                    <div class="editContent"></div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购文件发售时间：</div>
                                    <div class="editContent">
                                        <span>{{saleReceiveStartDate}}日到{{saleReceiveEndDate}},上午{{morningbegin}}-{{morningend}},下午{{afterbegin}}-{{afterend}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购文件发售地点：</div>
                                    <div class="editContent">{{tenderDocumentsSaleSite}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购文件工本费：</div>
                                    <div class="editContent">人民币{{tenderDocumentsCost}}元</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" >工本费接收账户：</div>
                                    <div class="editContent">{{costAcceptAccount}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">投标人需提交资料：</div>
                                    <div class="editContent">{{bidderData}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">投标文件递交</div>
                                    <div class="editContent"></div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="width:200px;">递交投标文件截止时间：</div>
                                    <div class="editContent">{{assessmentTime}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">递交响应文件地点：</div>
                                    <div class="editContent">{{submissionDocumentsPlace}}</div>
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
                                    <div class="editName">采购文件发售地点：</div>
                                    <div class="editContent">{{bidOpeningPlace}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">评标办法和标准：</div>
                                    <div class="editContent">{{bidEvaluationStandard}}</div>
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
                            <div style="font-weight:bold;text-align:right;width:100%;">
                                <div>{{creatorCompanyName}}</div>
                                <div>{{saveTime}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 单一来源采购公示详情 -->
        <div class="lookWrapper" v-show="announcelookFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close"  style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <div class="contentBox">
                        <div class="edit_list">
                            <div class="fail_box">
                                <div>{{nameOfTenderProject}}</div>
                                <div>单一来源采购公示</div>
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
                            <div v-show="biddingOrganization == '委托招标'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构全称：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构地址：</div>
                                        <div class="editContent">{{agentAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
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
                                        <td>{{projectCode}}</td>
                                        <td>分包控制金额</td>
                                        <td>{{subcontractingControlAmount}}万元</td>
                                    </tr>
                                    <tr v-show="diffFlag">
                                        <td>招标项目名称</td>
                                        <td colspan="3">{{nameOfTenderProject}}</td>
                                    </tr>
                                    <tr v-show="diffFlag">
                                        <td>入场项目编号</td>
                                        <td>{{projectCode}}</td>
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
                            <div style="font-weight:bold;text-align:right;width:100%;">
                                <div>{{creatorCompanyName}}</div>
                                <div>{{saveTime}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 更正公告详情 -->
        <div class="lookWrapper" v-show="noticeFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <div class="contentBox">
                        <div class="edit_list">
                                <div class="fail_box">
                                    <div>{{noticeName}}</div>
                                    <div>更正公告</div>
                                    <div style="font-size:14px;font-weight:normal;color:#333;">{{saveTime}}</div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}}</div>
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
                                        <div class="editName">招标项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
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
                                <div v-show="biddingOrganization == '委托招标'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                            <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构全称：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构地址：</div>
                                            <div class="editContent">{{agentAddress}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
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
                                <!-- 是否变更投标事宜 -->
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">是否变更投标事宜：</div>
                                        <div class="editContent">   
                                            <span>{{isChangeBidMatters}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 是否變更開標事宜 -->
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">是否变更开标事宜：</div>
                                        <div class="editContent">
                                            <span>{{isChangeBidOpenMatters}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="isTenderShow">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="font-weight:bold;">招标文件领取变更事宜</div>
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
                                            <div class="editName">招标文件发售时间：</div>
                                            <div class="editContent">
                                                <span>{{saleReceiveStartDate}}日到{{saleReceiveEndDate}} 上午{{morningbegin}}-{{morningend}} 到下午{{afterbegin}}-{{afterend}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标文件发售地点：</div>
                                            <div class="editContent">
                                                <span>{{tenderDocumentsSaleSite}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标文件工本费：</div>
                                            <div class="editContent">
                                                <span>{{tenderDocumentsCost}}元</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">投标人需提交资料：</div>
                                            <div class="editContent">
                                                <span>{{bidderData}}</span>
                                            </div>
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
                                    <!-- 开标时长 -->
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">开标时长(小时)：</div>
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
                    </div>
                </div>
            </div>
        </div>
        <!-- 变更采购公告详情 -->
        <div class="lookWrapper" v-show="changenoticeFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <div class="contentBox">
                        <div class="edit_list">
                            <div class="fail_box">
                                <div>{{noticeName}}</div>
                                <div v-if="biddingProcurementMode == '竞争性谈判' || biddingProcurementMode == '竞争性磋商'">变更采购公告</div>
                                <div v-else>变更采购信息</div>
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
                            <div v-show="biddingOrganization == '委托招标'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构全称：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构地址：</div>
                                        <div class="editContent">{{agentAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
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
                            <!-- 是否变更投标事宜 -->
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">是否变更投标事宜：</div>
                                    <div class="editContent">   
                                        <span>{{isChangeBidMatters}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 是否變更開標事宜 -->
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">是否变更开标事宜：</div>
                                    <div class="editContent">
                                        <span>{{isChangeBidOpenMatters}}</span>
                                    </div>
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
                                            <span>{{tenderDocumentsCost}}元</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">投标人需提交资料：</div>
                                        <div class="editContent">
                                            <span>{{bidderData}}</span>
                                        </div>
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
                                        <div class="editName">开标时长(小时)：</div>
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
                    </div>
                </div>
            </div>
        </div>
        <!-- 变更采购公示详情 -->
        <div class="lookWrapper" v-show="changeAnnounceFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <div class="contentBox">
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
                            <div v-show="biddingOrganization == '委托招标'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构全称：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构地址：</div>
                                        <div class="editContent">{{agentAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
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
                            <!-- 是否变更投标事宜 -->
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">是否变更投标事宜：</div>
                                    <div class="editContent">   
                                        <span>{{isChangeBidMatters}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 是否變更開標事宜 -->
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">是否变更开标事宜：</div>
                                    <div class="editContent">
                                        <span>{{isChangeBidOpenMatters}}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-show="isTenderShow">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">采购信息变更事宜</div>
                                        <div class="editContent"></div>
                                    </div>
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
                                        <div class="editContent">
                                            <span>{{announcementThat}}</span>
                                        </div>
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
                                        <div class="editName">开标时长(小时)：</div>
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
                    </div>
                </div>
            </div>
        </div>
        <!-- 中标公告详情 -->
        <div class="lookWrapper" v-show="selectionFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close"  style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <div class="contentBox">
                        <div class="edit_list">
                            <div class="fail_box">
                                <div>{{nameOfTenderProject}}</div>
                                <div>中标结果公告</div>
                                <div style="font-size:14px;font-weight:normal;color:#333;">{{saveTime}}</div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}}</div>
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
                                    <div class="editName">招标项目预算金额：</div>
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
                                    <div class="editName" style="width:200px;">招标(采购)人联系方式：</div>
                                    <div class="editContent">{{tendereeContactInformation}}</div>
                                </div>
                            </div>
                            <div v-show="biddingOrganization == '委托招标'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构全称：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构地址：</div>
                                        <div class="editContent">{{agentAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
                                        <div class="editContent">{{agentPhone}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="infobox_item">
                                <h3>中标内容</h3>
                                <!-- 表格 -->
                                <table border="1" cellspacing="0" cellpadding="0" style="width:100%;">
                                        <!-- 总包 -->
                                    <tr v-if="projectCode.indexOf('-') == -1">
                                        <td>招标项目名称</td>
                                        <td colspan="3">{{nameOfTenderProject}}</td>
                                    </tr>
                                    <!-- 分包 -->
                                    <tr v-else>
                                        <td>招标项目名称</td>
                                        <td colspan="3">{{nameOfTenderProject}}</td>
                                    </tr>
                                    <!-- 分包 -->
                                    <tr v-if="projectCode.indexOf('-') != -1">
                                        <td style="width:150px;">入场项目分包编号</td>
                                        <td style="width:150px;">{{projectCode}}</td>
                                        <td style="width:150px;">项目预算金额</td>
                                        <td style="width:150px;">{{budgetAmount}}万元</td>
                                    </tr>
                                    <!-- 总包 -->
                                    <tr v-else>
                                        <td style="width:150px;">入场项目编号</td>
                                        <td style="width:150px;">{{projectCode}}</td>
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
                                        <td colspan="4">简要技术要求</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" height="50px">{{technologyQualifications}}</td>
                                    </tr>
                                    <tr>
                                        <td>主要中标标的</td>
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
                                        <td>中标单位名称</td>
                                        <td colspan="3">{{nameOfSuccessfulSupplier}}</td>
                                    </tr>
                                    <tr>
                                        <td>中标单位地址</td>
                                        <td colspan="3">{{addressOfSuccessfulSupplier}}</td>
                                    </tr>
                                    <tr>
                                        <td>中标金额</td>
                                        <td colspan="3">{{winningAmountLowercase}}元</td>
                                    </tr>
                                </table>
                            </div>
                            <!-- <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">中标候选人公示期：</div>
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
                                    <div class="editName" style="font-weight:bold;">备注：</div>
                                    <div class="editContent">{{remark}}</div>
                                </div>
                            </div>
                            <div class="infobox_footer">
                                <h3>{{creatorCompanyName}}</h3>
                                <h3>{{saveTime}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 采购中标公告详情 -->
        <div class="lookWrapper" v-show="purchaSelectionFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close"  style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info">
                    <div class="contentBox">
                        <div class="edit_list">
                            <div class="fail_box">
                                <div>{{nameOfTenderProject}}</div>
                                <div>成交结果公告</div>
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
                                    <div class="editName" style="width:200px;">招标(采购)人联系方式：</div>
                                    <div class="editContent">{{tendereeContactInformation}}</div>
                                </div>
                            </div>
                            <div v-show="biddingOrganization == '委托招标'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        <!-- <div class="editContent">{{tenderPurchaserName}}</div> -->
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构全称：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构地址：</div>
                                        <div class="editContent">{{agentAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
                                        <div class="editContent">{{agentPhone}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="infobox_item">
                                <h3>成交内容</h3>
                                <!-- 表格 -->
                                <table border="1" cellspacing="0" cellpadding="0" style="width:100%;">
                                        <!-- 总包 -->
                                    <tr v-if="projectCode.indexOf('-') == -1">
                                        <td>采购项目名称</td>
                                        <td colspan="3">{{nameOfTenderProject}}</td>
                                    </tr>
                                    <!-- 分包 -->
                                    <tr v-else>
                                        <td>采购项目名称</td>
                                        <td colspan="3">{{nameOfTenderProject}}</td>
                                    </tr>
                                    <!-- 分包 -->
                                    <tr v-if="projectCode.indexOf('-') != -1">
                                        <td style="width:150px;">入场项目分包编号</td>
                                        <td style="width:150px;">{{projectCode}}</td>
                                        <td style="width:150px;">项目预算金额</td>
                                        <td style="width:150px;">{{budgetAmount}}万元</td>
                                    </tr>
                                    <!-- 总包 -->
                                    <tr v-else>
                                        <td style="width:150px;">入场项目编号</td>
                                        <td style="width:150px;">{{projectCode}}</td>
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
                                        <td colspan="4">简要技术要求</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" height="50px">{{technologyQualifications}}</td>
                                    </tr>
                                    <tr>
                                        <td>主要中标标的</td>
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
                                    <div class="editName" style="font-weight:bold;">中标候选人公示期：</div>
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
                                    <div class="editName" style="font-weight:bold;">备注：</div>
                                    <div class="editContent">{{remark}}</div>
                                </div>
                            </div>
                            <div class="infobox_footer">
                                <h3>{{creatorCompanyName}}</h3>
                                <h3>{{saveTime}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 场地预约公告详情 orderFlag-->
        <div class="lookWrapper" v-show="orderFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_box">
                    <el-collapse v-model="activeName1" accordion>
                    <!--招标项目信息 -->
                    <el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent" >{{nameOfTenderProject}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{tenderPurchaserName}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目金额：</div>
                                    <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{enterNum}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 场地预约 -->
                    <el-collapse-item title="场地预约" name="2">
                        <div class="edit_list">
                            <!--名称  -->
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 开标时间及时长 -->
                            <div class="editItem">
                                <div class="editCenter">
                                <div class="editName">开标时间：</div>
                                <div class="editContent">
                                    <span>{{assessmentTime}}</span>
                                </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">开标时长：</span>
                                    <span>{{estimatedReviewDuration}}小时</span>
                                </div>
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
                            <div>注：实际开评标场地以交易中心现场大屏幕显示为准</div>
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
                            <div class="editCenter" v-show="isService">
                                <div class="editName">配套服务：</div>
                                <div class="editContent">
                                    <span>{{supportingServices}}</span>
                                </div>
                            </div>
                            <!-- 评标地点 -->
                            <div class="editCenter" v-show="isPlace">
                                <div class="editName">评标地点：</div>
                                <div class="editContent">
                                    <span>{{bidEvaluationSite}}</span>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                </div>
            </div>
        </div>
        <!-- 采购场地预约公告详情-->
        <div class="lookWrapper" v-show="purchaseorderFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_box">
                    <el-collapse v-model="activeName1" accordion>
                    <!--采购项目信息 -->
                    <el-collapse-item title="采购项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购项目名称：</div>
                                    <div class="editContent" >{{nameOfTenderProject}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{tenderPurchaserName}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">采购项目金额：</div>
                                    <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{enterNum}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 场地预约 -->
                    <el-collapse-item title="场地预约" name="2">
                        <div class="edit_list">
                            <!--名称  -->
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购项目名称：</div>
                                    <div class="editContent">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 开标时间及时长 -->
                            <div class="editItem">
                                <div class="editCenter">
                                <div class="editName">开标时间：</div>
                                <div class="editContent">
                                    <span>{{assessmentTime}}</span>
                                </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">开标时长：</span>
                                    <span>{{estimatedReviewDuration}}小时</span>
                                </div>
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
                            <div>注：实际开评标场地以交易中心现场大屏幕显示为准</div>
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
                            <div class="editCenter"  v-show="isService">
                                <div class="editName">配套服务：</div>
                                <div class="editContent">
                                    <span>{{supportingServices}}</span>
                                </div>
                            </div>
                            <!-- 评标地点 -->
                            <div class="editCenter" v-show="isPlace">
                                <div class="editName">评标地点：</div>
                                <div class="editContent">
                                    <span>{{bidEvaluationSite}}</span>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                </div>
            </div>
        </div>
        <!--采购取消公告详情 -->
        <div class="lookWrapper" v-show="abnormalFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_box">
                    <el-collapse v-model="activeName1" accordion>
                    <!--招标项目信息 -->
                    <el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent" >{{nameOfTenderProject}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{tenderPurchaserName}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目金额：</div>
                                    <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{enterNum}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 异常处理 -->
                    <el-collapse-item title="异常处理" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">异常情况描述：</div>
                                    <div class="editContent">{{exceptionDescription}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">审批或核准结果：</div>
                                    <div class="editContent">{{approvedResult}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">审批或核准时间：</div>
                                    <div class="editContent">{{approvedTime}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">异常类型：</div>
                                    <div class="editContent">{{exceptionTypes}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">是否发布公告：</div>
                                    <div class="editContent">{{isNotice}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">网站显示公告标题：</div>
                                    <div class="editContent">{{noticeTitle}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">公告开始时间：</div>
                                    <div class="editContent">{{noticeStartTime}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">公告结束时间：</div>
                                    <div class="editContent">{{noticeEndTime}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                </div>
            </div>
        </div>
        <!-- 采购取消公告详情 -->
        <div class="lookWrapper" v-show="purchaseAbnormalFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_box">
                    <el-collapse v-model="activeName1" accordion>
                    <!--采购项目信息 -->
                    <el-collapse-item title="采购项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购项目名称：</div>
                                    <div class="editContent" >{{nameOfTenderProject}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{tenderPurchaserName}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">采购项目金额：</div>
                                    <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{enterNum}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 异常处理 -->
                    <el-collapse-item title="异常处理" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">异常情况描述：</div>
                                    <div class="editContent">{{exceptionDescription}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">审批或核准结果：</div>
                                    <div class="editContent">{{approvedResult}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">审批或核准时间：</div>
                                    <div class="editContent">{{approvedTime}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">异常类型：</div>
                                    <div class="editContent">{{exceptionTypes}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">是否发布公告：</div>
                                    <div class="editContent">{{isNotice}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">网站显示公告标题：</div>
                                    <div class="editContent">{{noticeTitle}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">公告开始时间：</div>
                                    <div class="editContent">{{noticeStartTime}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">公告结束时间：</div>
                                    <div class="editContent">{{noticeEndTime}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                </div>
            </div>
        </div>
        <!-- 答疑通知详情 -->
        <div class="lookWrapper" v-show="changeAnswerFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_box">
                    <el-collapse v-model="activeName1" accordion>
                        <!--招标项目信息 -->
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent" >{{nameOfTenderProject}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{enterNum}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 通知内容 -->
                        <el-collapse-item title="通知内容" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">答疑时间：</div>
                                        <div class="editContent">
                                            <span>{{answerTime}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">答疑集合地点：</div>
                                        <div class="editContent">
                                            <span>{{questionAnsweringPlace}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">联系人：</div>
                                        <div class="editContent">
                                            <span>{{contacts}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">
                                            <span>{{contactInformation}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">其他：</div>
                                        <div class="editContent">
                                            <span>{{other}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 采购答疑通知详情 -->
        <div class="lookWrapper" v-show="purchaseAnswerFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_box">
                    <el-collapse v-model="activeName1" accordion>
                        <!--采购项目信息 -->
                        <el-collapse-item title="采购项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目名称：</div>
                                        <div class="editContent" >{{nameOfTenderProject}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{enterNum}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 通知内容 -->
                        <el-collapse-item title="通知内容" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">答疑时间：</div>
                                        <div class="editContent">
                                            <span>{{answerTime}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">答疑集合地点：</div>
                                        <div class="editContent">
                                            <span>{{questionAnsweringPlace}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">联系人：</div>
                                        <div class="editContent">
                                            <span>{{contacts}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">
                                            <span>{{contactInformation}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">其他：</div>
                                        <div class="editContent">
                                            <span>{{other}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 合同公告详情 -->
        <div class="lookWrapper" v-show="contractAnnounceFlag">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
                </div>
                <div class="main_info" style="width:90% !important;margin:0 auto;">
                    <el-collapse v-model="activeName5" accordion>
                        <!-- 公示内容 -->
                        <el-collapse-item title="公示内容" name="1">
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
                                    <div v-if="biddingOrganization == '委托招标'">
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
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="2">
                            <el-table :data="enclosureData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column label="附件列表(点击查看)">
                                    <template slot-scope="scope">
                                        <li v-for='(item,index) in scope.row.attachlist' :key="index" @click="downLoadupFile(item)" class="liItem" style="cursor:pointer;">
                                            {{item.fileName}}
                                        </li>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                     </el-collapse>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/css/style.css'
    import baseUrl from '../api/api'
    import dayjs from "dayjs"
    export default {
        data(){
            return {
                agentPhone :'',
                agentAddress :"",
                biddingPurchasingAgencyName:'',//招标代理机构
                biddingOrganization:'',
                // 合同公告
                activeName5:['1','2'],
                enclosureData:[{
                    appendixName: "合同签署",
                    attachlist: []
                    }
                ],
                createTime:'',
                contractSignTime:"",
                winningBidDataItems:'',
                contractAnnounceData:[],//合同公告
                address:'',//地址
                nameOfSuccessfulSupplier:'',//中标人全称
                addressOfSuccessfulSupplier:'',//地址
                phoneOfSuccessfulSupplier:'',//联系方式
                contractCode:'',//合同编号
                contractName:'',//合同名称
                contractAmount:"",//合同金额
                contractDeadline:'',//合同期限
                discussLocation:"",//洽谈地点
                qualityRequirements:'',//质量要求
                contractContent:'',//合同内容
                remark:'',//备注
                contacts:'',//l联系人
                //
                contractAnnounceFlag:false,//合同公告详情
                purchaseAnswerFlag:false,//采购答疑通知详情
                purchaseorderFlag:false,//采购场地预约详情
                purchaSelectionFlag:false,//采购中标公告详情
                purchasefileFlag:false,//采购变更文件详情
                purchaseAbnormalFlag:false,//采购废标公告详情
                changenoticeFlag:false,//变更采购公告详情
                changeAnnounceFlag:false,//变更采购公示详情
                announcelookFlag:false,//采购公示详情
                purchaselookFlag:false,//采购公告详情
                // 采购公示
                diffFlag:false,
                costAcceptAccount:"",//工本费接收账户
                subcontractingControlAmount:'',
                competentDepartmentName:'',//主管部门全称
                competentDepartmentAddress:'',//主管部门地址
                responsiblePerson:'',//主管部门联系人
                competentDepartmePhone:'',//主管部门联系方式
                developingSuppliersName:'',//拟定供应商名称
                developingSuppliersAddress:'',//拟定供应商地址
                purchasePurposes:'',//拟采货物
                professionalOpinions:"",//专业人员论证意见
                adviceData:[],
                enrollStartTime:'',//公示期限
                enrollEndTime:'',//结束
                announcementThat:'',//公示说明
                //答疑通知
                answerNoticeId:'',
                answerTime:'',//答疑时间
                questionAnsweringPlace:'',//集合地点
                contacts:'',//联系人
                contactInformation:'',//联系方式
                other:'',//其他
                changeAnswerFlag:false,
                changeAnswerData:[],//答疑通知
                //场地预约
                estimatedReviewDuration:'',//开标时长
                openingRoom:'',//开标室
                appointmentEvaluationRoom:'',//是否预约评标室
                supportingServices:"",//配套服务
                bidEvaluationSite:'',//评标地点
                siteReservationId:'',//id
                //异常
                exceptionDescription:'',//异常情况描述
                approvedResult:'',//审核结果
                approvedTime:'',//审核时间
                exceptionTypes:'',//审核类型
                isNotice:'',//是否发布公告
                noticeTitle:'',//网站显示标题
                noticeStartTime:'',//公告开始时间
                noticeEndTime:'',//公告结束时间
                //中标结果公告
                publicityStartTime:'',//中标候选人公示期
                publicityEndTime:"",//结束
                tendereeContactInformation:'',//采购人联系方式
                mainWinningBid:'',//主要中标标的
                unitPrice:'',//单价
                number:'',//数量
                specificationType:'',//规格型号
                contractPerformancePeriod:'',//合同履行期
                contractPerformanceEnd:'',//结束
                nameOfSuccessfulSupplier:"",//中标单位名称
                addressOfSuccessfulSupplier:'',//中标单位地址
                winningAmountLowercase:'',//中标金额
                subcontractName:'',
                leaderContactInformation:'',//联系方式
                //招标公告
                biddingProcurementMode:'',//类型
                projectCode:'',//编号
                purchasePurposes:"",//采购用途
                purchaseAmount:'',//采购数量
                applicantQualifications:'',//投标人资格条件
                technologyQualifications:'',//简要技术要求
                tenderDocumentsSaleSite:'',//招标文件发售地点
                tenderDocumentsCost:"",//文件工本费
                bidderData:"",//投标人需提交资料
                bidOpeningPlace:'',//地点
                saleReceiveStartDate:'',//招标文件开始时间
                saleReceiveEndDate:"",//招标文件发售时间
                assessmentTime:'',//开标时间
                submissionDocumentsPlace:"",//递交文件地点
                bidEvaluationStandard:'',//评标办法和标准
                projectLeaderPhone:"",//联系方式
                morningbegin:"",//上午
                morningend:'',//上午
                afterbegin:'',//下午
                afterend:'',//下午
                // 更正公告
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
                OpenTenderShow:false,
                isTenderShow:false,
                isChangeBidMatters:'',//是否變更投標事宜
                isChangeBidOpenMatters:"",//是否變更開標事宜
                noticeName:'',//公告名称
                saveTime:'',//时间
                nameOfTenderProject:'',
                biddingProjectNumber:'',
                budgetAmount:'',
                sourceOfFunds:'',
                tenderPurchaserName:'',//招标采购人全称
                tendereeAddress:'',//地址
                tendereePhone:'',//联系方式
                changesDate:'',//变更日期
                changeReason:'',//变更理由
                changesAs:'',//变更事项
                projectLeader:'',//项目联系人
                remark:'',//备注
                creatorName:'',//姓名
                creatorCompanyName:'',
                subCode:'',
                enterNum:'',
                currentName:'1',
                activeName1: ["1",'2','3','4'],
                tableData: [],//中标公告
                fileNoticeData:[],//文件公告
                publicData:[],//招标公告
                changeNoticeData:[],//更正公告
                abnormalData:[],//废标公告
                orderData:[],//场地预约公告
                address:'',
                currentPage:1,// 当前页
                pageSize: 8, // 每页条数
                pageTotal: 0, //总页数
                total: 0, //总条数
                pages:'',
                tabIndex:0,// 所点击的下标
                fileFlag:false,//招标文件详情
                lookFlag:false,// 招标公告详情弹窗
                noticeFlag:false,//更正公告详情
                selectionFlag:false,//中标公告详情
                abnormalFlag:false,//废标公告详情弹框
                orderFlag:false,//场地预约详情弹框
                projcetName:'',//项目名称
                bidDocumentChangeId:'',//changeID
                projectCode:'',//入场项目编号
                nameOfTenderProject:'',//招标项目名称
                nameOfTenderProjecta:'',
                biddingProjectNumber:"",//招标项目编号
                amountOfBiddingProject:"",//招标项目金额
                tenderPurchaserName:"",//招标采购人
                depositAmount:"",//保证金数量
                answerTime:"",//答疑澄清时间
                documentNumber:"",// 文件编号
                saleEndDate:"",//招标文件发售结束时间
                bidDocumentId:"",//招标文件id
                saleStartDate:"",//招标文件发售开始时间
                updateTime:"",//更新时间
                depositReceive:"",//保证金接收账户
                changeMatters:"",//变更事项
                changeReasons:"",//变更理由
                bidOpeningMethod:"",//开标方式
                projectCode:"",//入场项目编号
                changeDate:"",//变更日期
                biddingDocumentsMethod:"",//投标文件递交方式
                entrySubcontractNumber:"",//入场项目分包编号
                bidPeriod:"",//投标有效期
                state:"",//状态
                bidDocumentChangeId:"",//变更文件id
                depositType:"",//保证金类型
                depositMethod : "",//保证金递交方式  
                isPlace:false,// 评标地点是否展示隐藏
                isService:false,// 配套服务是否展示隐藏
                primaryKeyId:'',//keyid
            }
        },
        created(){
            this.getList();
        },
        methods: {
            handleClick(tab) {
                this.tabIndex = tab.index;
                // if(this.tabIndex == 1){
                //     this.$axios({
                //         method: "POST",
                //         url: baseUrl+"/bidDocumentChangeController/selectList",
                //         data:{
                //             pageSize:this.pageSize,
                //             pageNo:this.currentPage,
                //         }
                //     }).then(res=>{
                //         if(res.data.status == 200){
                //             this.fileNoticeData = res.data.data.list;
                //             res.data.data.list.map((item,index)=>{
                //                 if(item.releaseTime == null){
                //                     item.releaseTime = ""
                //                 }else{
                //                     item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                //                 }
                //             })
                //             this.total = res.data.data.total;// 总条数
                //             this.pages = res.data.data.pages;
                //         }else{
                //             this.$message.warning(res.data.msg);
                //         }
                //     }).catch(err=>{
                //         console.log(err)
                //     })
                // }else 
                if(this.tabIndex == 0){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/tenderNoticeController/selectHome",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.publicData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.noticeSendTime == null){
                                    item.noticeSendTime = ""
                                }else{
                                    item.noticeSendTime = dayjs(item.noticeSendTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else if(this.tabIndex == 1){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/winnResultController/selectList",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.tableData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.releaseTime == null){
                                    item.releaseTime = ""
                                }else{
                                    item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                // else if(this.tabIndex == 3){
                //     this.$axios({
                //         method: "POST",
                //         url: baseUrl+"/siteReservationController/selectList",
                //         data:{
                //             pageSize:this.pageSize,
                //             pageNo:this.currentPage,
                //         }
                //     }).then(res=>{
                //         if(res.data.status == 200){
                //             this.orderData = res.data.data.list;
                //             res.data.data.list.map((item,index)=>{
                //                 if(item.releaseTime == null){
                //                     item.releaseTime = ""
                //                 }else{
                //                     item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                //                 }
                //             })
                //             this.total = res.data.data.total;// 总条数
                //             this.pages = res.data.data.pages;
                //         }else{
                //             this.$message.warning(res.data.msg);
                //         }
                //     }).catch(err=>{
                //         console.log(err)
                //     })
                // }
                else if(this.tabIndex == 2){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/tenderNoticeController/selectChangeHome",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.changeNoticeData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.noticeUpdateTime == null){
                                    item.noticeUpdateTime = ""
                                }else{
                                    item.noticeUpdateTime = dayjs(item.noticeUpdateTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else if(this.tabIndex == 3){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/tenderExceptionController/selectExceptionList",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.abnormalData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.releaseTime == null){
                                    item.releaseTime = ""
                                }else{
                                    item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                                
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else if(this.tabIndex == 4){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/answerNoticeController/selectList",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.changeAnswerData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.releaseTime == null){
                                    item.releaseTime = ""
                                }else{
                                    item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                                
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else if(this.tabIndex == 5){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/contractController/selectList",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                            procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"]
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.contractAnnounceData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.releaseTime == null){
                                    item.releaseTime = ""
                                }else{
                                    item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                                
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            //编号问题
            typeIndex(index) {
                return index + (this.currentPage - 1) * 8 + 1;
            },
            // 分页器
            handleSizeChange(val) {
                // 每页条数
            },
            handleCurrentChange(val) {
                // 当前页数
                this.currentPage = val;
                this.getList();// 列表数据
            },
            getList(){
                // if(this.tabIndex == 1){
                //     this.$axios({
                //         method: "POST",
                //         url: baseUrl+"/bidDocumentChangeController/selectList",
                //         data:{
                //             pageSize:this.pageSize,
                //             pageNo:this.currentPage,
                //         }
                //     }).then(res=>{
                //         if(res.data.status == 200){
                //             this.fileNoticeData = res.data.data.list;
                //             res.data.data.list.map((item,index)=>{
                //                 if(item.releaseTime == null){
                //                     item.releaseTime = ""
                //                 }else{
                //                     item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                //                 }
                //             })
                //             this.total = res.data.data.total;// 总条数
                //             this.pages = res.data.data.pages;
                //         }else{
                //             this.$message.warning(res.data.msg);
                //         }
                //     }).catch(err=>{
                //         console.log(err)
                //     })
                // }else 
                if(this.tabIndex == 0){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/tenderNoticeController/selectHome",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.publicData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.noticeSendTime == null){
                                    item.noticeSendTime = ""
                                }else{
                                    item.noticeSendTime = dayjs(item.noticeSendTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else if(this.tabIndex == 1){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/winnResultController/selectList",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.tableData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.releaseTime == null){
                                    item.releaseTime = ""
                                }else{
                                    item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                // else if(this.tabIndex == 3){
                //     this.$axios({
                //         method: "POST",
                //         url: baseUrl+"/siteReservationController/selectList",
                //         data:{
                //             pageSize:this.pageSize,
                //             pageNo:this.currentPage,
                //         }
                //     }).then(res=>{
                //         if(res.data.status == 200){
                //             this.orderData = res.data.data.list;
                //             res.data.data.list.map((item,index)=>{
                //                 if(item.releaseTime == null){
                //                     item.releaseTime = ""
                //                 }else{
                //                     item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                //                 }
                //             })
                //             this.total = res.data.data.total;// 总条数
                //             this.pages = res.data.data.pages;
                //         }else{
                //             this.$message.warning(res.data.msg);
                //         }
                //     }).catch(err=>{
                //         console.log(err)
                //     })
                // }
                else if(this.tabIndex == 2){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/tenderNoticeController/selectChangeHome",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.changeNoticeData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.noticeUpdateTime == null){
                                    item.noticeUpdateTime = ""
                                }else{
                                    item.noticeUpdateTime = dayjs(item.noticeUpdateTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else if(this.tabIndex == 3){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/tenderExceptionController/selectExceptionList",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.abnormalData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.releaseTime == null){
                                    item.releaseTime = ""
                                }else{
                                    item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                                
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else if(this.tabIndex == 4){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/answerNoticeController/selectList",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.changeAnswerData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.releaseTime == null){
                                    item.releaseTime = ""
                                }else{
                                    item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                                
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else if(this.tabIndex == 5){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/contractController/selectList",
                        data:{
                            pageSize:this.pageSize,
                            pageNo:this.currentPage,
                            procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"]
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.contractAnnounceData = res.data.data.list;
                            res.data.data.list.map((item,index)=>{
                                if(item.releaseTime == null){
                                    item.releaseTime = ""
                                }else{
                                    item.releaseTime = dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                                
                            })
                            this.total = res.data.data.total;// 总条数
                            this.pages = res.data.data.pages;
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            // 登录
            signUp(){
                this.$router.push({
                    name:'login'
                }); 
            },
            //招标文件详情
            caseDetail(row){
                this.bidDocumentChangeId = row.bidDocumentChangeId;
                this.projectCode = row.projcetNumber;
                this.biddingProcurementMode = row.biddingProcurementMode;
                this.biddingOrganization = row.biddingOrganization;
                if(this.biddingProcurementMode == "公开招标" || this.biddingProcurementMode == "邀请招标"){
                    this.fileFlag = true;
                }else{
                    this.purchasefileFlag = true;
                }
                if(this.projectCode.indexOf("-") != -1 && this.projectCode != null){
                    this.getsubList();
                }else{
                    this.getProjectList();
                }
                this.getDetailList();
            },
            //更正公告
            noticeDetail(row){
                this.projectCode = row.biddingProjectNumber;
                this.tenderNoticeId = row.tenderNoticeId;
                this.biddingProcurementMode = row.biddingProcurementMode;
                if(this.biddingProcurementMode == "单一来源"){
                    this.changeAnnounceFlag = true;
                }else if(this.biddingProcurementMode == "竞争性谈判" || this.biddingProcurementMode == "竞争性磋商" || this.biddingProcurementMode == "询价"){
                    this.changenoticeFlag = true;
                }else{
                    this.noticeFlag = true;
                }
                if(this.projectCode.indexOf('-') != -1){
                    this.getsubList();
                }else{
                    this.getProjectList();
                }
                this.getInitInfo();
            },
            //招标公告
            publicDetail(row){
                this.projectCode = row.biddingProjectNumber;
                this.biddingProcurementMode = row.biddingProcurementMode;
                this.biddingOrganization = row.biddingOrganization;
                if(this.biddingProcurementMode == "单一来源"){
                    this.announcelookFlag = true;
                }else if(this.biddingProcurementMode == "竞争性谈判" || this.biddingProcurementMode == "竞争性磋商" || this.biddingProcurementMode == "询价"){
                    this.purchaselookFlag = true;
                }else{
                    this.lookFlag = true;
                }
                this.getPublicInfo();
                if(this.projectCode.indexOf('-') != -1){
                    this.getsubList();
                    this.diffFlag = false;
                }else{
                    this.getProjectList();
                    this.diffFlag = true;
                }
                this.nameOfTenderProject = row.nameOfTenderProject;
                this.subcontractName = row.subcontractName;
            },
            //中标公告
            selectionDetail(row){
                this.projectCode = row.projcetNumber;
                this.biddingProcurementMode = row.biddingProcurementMode;
                this.biddingOrganization = row.biddingOrganization;
                if(this.biddingProcurementMode == "公开招标" || this.biddingProcurementMode == "邀请招标"){
                    this.selectionFlag = true;
                }else{
                    this.purchaSelectionFlag = true;
                }
                if(this.projectCode.indexOf('-') != -1){
                    this.getsubList();
                }else{
                    this.getProjectList();
                }
                this.getselectionList();
            },
            //场地预约公告
            orderDetail(row){//
                this.siteReservationId = row.siteReservationId;
                this.projectCode = row.projcetNumber;
                this.biddingProcurementMode = row.biddingProcurementMode;
                this.biddingOrganization = row.biddingOrganization;
                if(this.biddingProcurementMode == "公开招标" || this.biddingProcurementMode == "邀请招标"){
                    this.orderFlag = true;
                }else{
                    this.purchaseorderFlag = true;
                }
                if(this.projectCode.indexOf('-') != -1){
                    this.getsubList();
                }else{
                    this.getProjectList();
                }
                this.getContentList();
                this.getOrderList();
                
            },
            //废标公告
            abnormalDetail(row){
                this.projectCode = row.projcetNumber;
                this.biddingProcurementMode = row.biddingProcurementMode;
                this.biddingOrganization = row.biddingOrganization;
                this.biddingOrganization = row.biddingOrganization;
                if(this.biddingProcurementMode == "公开招标" || this.biddingProcurementMode == "邀请招标"){
                    this.abnormalFlag = true;
                }else{
                    this.purchaseAbnormalFlag = true;
                }
                if(this.projectCode.indexOf('-') != -1){
                    this.getsubList();
                }else{
                    this.getProjectList();
                }
                this.getAbnormalList();
            },
            //答疑通知
            changeAnswerDetail(row){
                this.projectCode = row.projcetNumber;
                this.answerNoticeId = row.answerNoticeId;
                this.biddingOrganization = row.biddingOrganization;
                if(this.biddingProcurementMode == "公开招标" || this.biddingProcurementMode == "邀请招标"){
                    this.changeAnswerFlag = true;
                }else{
                    this.purchaseAnswerFlag = true;
                }
                if(this.projectCode.indexOf('-') != -1){
                    this.getsubList();
                }else{
                    this.getProjectList();
                }
                this.getAnswerList();
                
            },
            //合同公告
            changeContractAnnounceDetail(row){
                this.projectCode = row.projcetNumber;
                this.biddingProcurementMode = row.biddingProcurementMode;
                this.biddingOrganization = row.biddingOrganization;
                this.primaryKeyId = row.primaryKeyId;
                if(this.projectCode.indexOf('-') != -1){
                    this.getsubList();
                }else{
                    this.getProjectList();
                }
                this.getWiningInforList();
                this.getContractList();
                this.uploadList();
                this.contractAnnounceFlag = true;
            },
            //招标项目信息--》表格分包
            getsubList(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectByProjcetNumber/"+this.projectCode
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nameOfTenderProject = res.data.data.projectInformationVo.nameOfTenderProject;// 招标项目名称
                        this.nameOfTenderProjecta = res.data.data.nameOfTenderProject;// 招标项目名称
                        this.biddingProjectNumber = res.data.data.projectInformationVo.biddingProjectNumber;// 招标项目编号
                        this.enterNum = res.data.data.entrySubcontractNumber;//入场项目编号
                        this.amountOfBiddingProject = res.data.data.projectInformationVo.amountOfBiddingProject;// 招标项目金额 
                        this.tenderPurchaserName = res.data.data.projectInformationVo.tenderPurchaserName;// 招标(采购)人
                        this.tenderContents = res.data.data.projectInformationVo.tenderContents;// 招标内容
                        this.budgetAmount = res.data.data.projectInformationVo.budgetAmount;
                        this.contactInformation = res.data.data.projectInformationVo.contactInformation//联系方式
                        this.contacts = res.data.data.projectInformationVo.contacts//联系方式
                        this.biddingPurchasingAgencyName = res.data.data.projectInformationVo.biddingPurchasingAgencyName;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            getProjectList(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectByProjcetNumber/"+this.projectCode
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                        this.enterNum = res.data.data.totalProjectId;//入场项目编号
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.tenderContents = res.data.data.tenderContents;// 招标内容
                        this.budgetAmount = res.data.data.budgetAmount;
                        this.contactInformation = res.data.data.contactInformation//联系方式
                        this.contacts = res.data.data.contacts//联系方式
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                        if(res.data.data.saveTime == null){
                            this.saveTime = ""
                        }else{
                            this.saveTime = dayjs(res.data.data.saveTime).format('YYYY-MM-DD HH:mm:ss');//时间
                        } 
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //招标文件详情
            getDetailList(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/bidDocumentChangeController/selectById/"+this.bidDocumentChangeId
                }).then(res=>{
                    if(res.data.status == 200){
                        this.depositAmount= res.data.data.depositAmount;//保证金数量
                        if(res.data.data.answerTime == null){
                            this.answerTime = ""
                        }else{
                            this.answerTime= dayjs(res.data.data.answerTime).format('YYYY-MM-DD HH:mm:ss');//答疑澄清时间
                        };
                        
                        this.documentNumber= res.data.data.documentNumber;// 文件编号
                        if(res.data.data.saleEndDate == null){
                            this.saleEndDate = ""
                        }else{
                            this.saleEndDate= dayjs(res.data.data.saleEndDate).format('YYYY-MM-DD HH:mm:ss');//招标文件发售结束时间
                        };
                        if(res.data.data.saleStartDate == null){
                            this.saleStartDate = ""
                        }else{
                            this.saleStartDate= dayjs(res.data.data.saleStartDate).format('YYYY-MM-DD HH:mm:ss');//招标文件发售开始时间
                        };
                        if(res.data.data.updateTime == null){
                            this.updateTime = ""
                        }else{
                            this.updateTime= dayjs(res.data.data.updateTime).format('YYYY-MM-DD HH:mm:ss');//更新时间
                        };
                        
                        this.depositReceive= res.data.data.depositReceive;//保证金接收账户
                        this.changeMatters= res.data.data.changeMatters;//变更事项
                        this.changeReasons= res.data.data.changeReasons;//变更理由
                        this.bidOpeningMethod= res.data.data.bidOpeningMethod;//开标方式
                        if(res.data.data.changeDate == null){
                            this.changeDate = ""
                        }else{
                            this.changeDate= dayjs(res.data.data.changeDate).format('YYYY-MM-DD HH:mm:ss');//变更日期
                        };
                        
                        this.biddingDocumentsMethod= res.data.data.biddingDocumentsMethod;//投标文件递交方式
                        this.bidPeriod= res.data.data.bidPeriod;//投标有效期
                        this.state= res.data.data.state;//状态
                        this.depositType= res.data.data.depositType;//保证金类型
                        this.depositMethod =  res.data.data.depositMethod;//保证金递交方式
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 更正公告详情
            getInitInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/tenderNoticeController/select/" + this.tenderNoticeId
                }).then(res=>{
                    if(res.data.status == 200){
                        this.agentAddress = res.data.data.agentAddress;
                        this.agentPhone = res.data.data.agentPhone;
                        this.announcementThat = res.data.data.announcementThat;//公示说明
                        this.competentDepartmentName = res.data.data.competentDepartmentName;//主管部门全称
                        this.competentDepartmentAddress = res.data.data.competentDepartmentAddress;//地址
                        this.responsiblePerson = res.data.data.responsiblePerson;//负责人
                        this.competentDepartmePhone = res.data.data.competentDepartmePhone;//联系方式
                        if(res.data.data.bidEvaluationTime == null || res.data.data.bidEvaluationTime == 0 || res.data.data.bidEvaluationTime == ""){
                            this.bidEvaluationTime = ""
                        }else{
                            this.bidEvaluationTime = dayjs(res.data.data.bidEvaluationTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.estimatedReviewDuration = res.data.data.estimatedReviewDuration;
                        this.openingRoom = res.data.data.openingRoom;
                        this.appointmentEvaluationRoom = res.data.data.appointmentEvaluationRoom;
                        
                        this.serviceData = res.data.data.supportingServices;
                        this.bidEvaluationSite = res.data.data.bidEvaluationSite;
                        this.lengthOfTenderEvaluation = res.data.data.lengthOfTenderEvaluation;
                        this.bidEvaluationRoom = res.data.data.bidEvaluationRoom;//新增7.10
                        if(res.data.data.changesDate == null && res.data.data.changesDate == 0 && res.data.data.changesDate == ""){
                            this.changesDate = ""
                        }else{
                            this.changesDate = dayjs(res.data.data.changesDate).format('YYYY-MM-DD');
                        };
                        this.tendereeAddress = res.data.data.tendereeAddress;
                        this.tendereePhone = res.data.data.tendereePhone;
                        this.noticeName = res.data.data.noticeName;
                        this.changeReason = res.data.data.changeReason;
                        this.changesAs = res.data.data.changesAs;
                        this.isChangeBidMatters = res.data.data.isChangeBidMatters;
                        this.isChangeBidOpenMatters = res.data.data.isChangeBidOpenMatters;
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
                        if(res.data.data.saleReceiveStartDate == null && res.data.data.saleReceiveStartDate == 0 && res.data.data.saleReceiveStartDate == ""){
                            this.saleReceiveStartDate = ""
                        }else{
                            this.saleReceiveStartDate = dayjs(res.data.data.saleReceiveStartDate).format('YYYY-MM-DD');
                        };
                        if(res.data.data.saleReceiveEndDate == null && res.data.data.saleReceiveEndDate == 0 && res.data.data.saleReceiveEndDate == ""){
                            this.saleReceiveEndDate = ""
                        }else{
                            this.saleReceiveEndDate = dayjs(res.data.data.saleReceiveEndDate).format('YYYY-MM-DD');
                        };
                        this.tenderDocumentsSaleSite =res.data.data.tenderDocumentsSaleSite;
                        this.tenderDocumentsCost =res.data.data.tenderDocumentsCost;
                        this.bidderData =res.data.data.bidderData;
                        
                        if(res.data.data.assessmentTime == null  || res.data.data.assessmentTime == 0 || res.data.data.assessmentTime == ""){
                            this.assessmentTime = ""
                        }else{
                            this.assessmentTime = dayjs(res.data.data.assessmentTime).format('YYYY-MM-DD');
                        }
                        this.submissionDocumentsPlace =res.data.data.submissionDocumentsPlace;
                        this.bidOpeningPlace =res.data.data.bidOpeningPlace;
                        this.bidEvaluationStandard =res.data.data.bidEvaluationStandard;
                        this.projectLeader =res.data.data.projectLeader;
                        this.projectLeaderPhone =res.data.data.projectLeaderPhone;
                        this.remark =res.data.data.remark;
                        if(res.data.data.saveTime == null &&res.data.data.saveTime == 0 &&res.data.data.saveTime == ""){
                            this.saveTime = ""
                        }else{
                            this.saveTime = dayjs(res.data.data.saveTime).format('YYYY-MM-DD');
                        };
                        this.creatorCompanyName =res.data.data.creatorCompanyName;
                        // 招标文件发售时间 上午
                        this.morningbegin = res.data.data.saleStartTime.split(',')[0];
                        this.morningend = res.data.data.saleStartTime.split(',')[1];
                        // 招标文件发售时间 下午
                        this.afterbegin = res.data.data.saleEndTime.split(',')[0];
                        this.afterend = res.data.data.saleEndTime.split(',')[1];
                        
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
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //招标公告
            getPublicInfo(){
                let object={};
                let strType = "";
                if(this.biddingProcurementMode == '单一来源'){
                    strType = "采购公示"
                }else if(this.biddingProcurementMode == '竞争性谈判' || this.biddingProcurementMode == '竞争性磋商'){
                    strType = "采购公告"
                }else if(this.biddingProcurementMode == '询价'){
                    strType = "采购信息"
                }else{
                    strType = "招标公告"
                }
                if(this.projectCode.indexOf("-") != -1 && this.projectCode != null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectCode,
                        noticeType:strType,
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectCode,
                        noticeType:strType,
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        res.data.data.forEach(item=>{
                            this.creatorCompanyName = item.creatorCompanyName;
                            this.agentAddress = item.agentAddress;
                            this.agentPhone = item.agentPhone;
                            this.announcementThat = item.announcementThat;//公示说明
                            this.competentDepartmentName = item.competentDepartmentName;//主管部门全称
                            this.competentDepartmentAddress = item.competentDepartmentAddress;//地址
                            this.responsiblePerson = item.responsiblePerson;//负责人
                            this.competentDepartmePhone = item.competentDepartmePhone;//联系方式
                            if(item.enrollStartTime  == null){
                                this.enrollStartTime = ""
                            }else{
                                this.enrollStartTime = dayjs(item.enrollStartTime).format('YYYY-MM-DD HH:mm:ss');// 报名开始时间
                            };
                            if(item.enrollEndTime == null){
                                this.enrollEndTime = ""
                            }else{
                                this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD HH:mm:ss');// 报名结束时间
                            }
                                    
                            this.creatorCompanyName = item.creatorCompanyName;
                            this.submissionDocumentsPlace = item.submissionDocumentsPlace;
                            this.bidOpeningPlace = item.bidOpeningPlace;
                            this.tendereeAddress = item.tendereeAddress;// 采购人地址
                            this.tendereePhone = item.tendereePhone;// 采购人联系方式
                            this.noticeName = item.noticeName;// 公告名称
                            if(item.enrollStartTime == null){
                                this.enrollStartTime = ""
                            }else{
                                this.enrollStartTime = dayjs(item.enrollStartTime).format('YYYY-MM-DD HH:mm:ss');// 报名开始时间
                            };
                            if(item.enrollEndTime == null){
                                this.enrollEndTime = ""
                            }else{
                                this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD HH:mm:ss');// 报名结束时间
                            }
                            
                            this.tenderDocumentsSaleSite = item.tenderDocumentsSaleSite;// 采购文件发售地点
                            this.tenderDocumentsCost = item.tenderDocumentsCost;// 采购文件工本费
                            this.costAcceptAccount = item.costAcceptAccount;// 工本费接收账户
                            this.bidderData = item.bidderData;// 投标人需提交资料
                            if(item.submitTime == null){
                                this.submitTime = ""
                            }else{
                                this.submitTime = dayjs(item.submitTime).format('YYYY-MM-DD HH:mm:ss');// 递交响应文件截止时间
                            }
                            
                            this.submitPlace = item.submitPlace;// 递交响应文件地点
                            this.bidEvaluationStandard = item.bidEvaluationStandard;// 评标办法和标准
                            this.projectLeader = item.projectLeader;// 项目负责人
                            this.projectLeaderPhone = item.projectLeaderPhone;// 联系方式
                            this.remark = item.remark;// 备注
                            if(item.openingTime == null){
                                if(item.assessmentTime == null){
                                    this.assessmentTime = ""
                                }else{
                                    this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD HH:mm:ss');// 响应文件开启时间
                                };
                            }else{
                                this.assessmentTime = dayjs(item.openingTime).format('YYYY-MM-DD HH:mm:ss');// 响应文件开启时间
                            };
                            // 上午发售时间
                            // this.saleStartTime = item.saleStartTime.split(',');
                            this.morningbegin = item.saleStartTime.split(',')[0];
                            this.morningend = item.saleStartTime.split(',')[1];
                            // 下午发售时间
                            // this.saleEndTime = item.saleEndTime.split(',');
                            this.afterbegin = item.saleEndTime.split(',')[0];
                            this.afterend = item.saleEndTime.split(',')[1];
                            if(item.saleReceiveStartDate == null){
                                this.saleReceiveStartDate = ""
                            }else{
                                this.saleReceiveStartDate = dayjs(item.saleReceiveStartDate).format('YYYY-MM-DD');// 采购文件发售开始时间
                            };
                            if( item.saleReceiveEndDate == null){
                                this.saleReceiveEndDate = ""
                            }else{
                                this.saleReceiveEndDate = dayjs(item.saleReceiveEndDate).format('YYYY-MM-DD');// 采购文件发售结束时间
                            };
                            item.items.forEach(area=>{
                                this.purchaseAmount=area.purchaseAmount;// 采购数量
                                this.purchasePurposes=area.purchasePurposes;// 拟采购货物
                                this.technologyQualifications=area.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                                this.developingSuppliersName=area.developingSuppliersName;// 拟定供应商名称
                                this.developingSuppliersAddress=area.developingSuppliersAddress;//地址
                                this.professionalOpinions = area.professionalOpinions//论证意见
                                this.adviceData = area.itemCareermanVos//7.11add
                                this.purchaseAmount=area.purchaseAmount;//  采购数量
                                this.purchasePurposes=area.purchasePurposes;// 采购用途
                                this.technologyQualifications=area.technologyQualifications;// 简要规格描述或项目基本情况
                                this.applicantQualifications=area.applicantQualifications;// 供应商资格条件
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
                                
                            })
                            this.creatorCompanyName = item.creatorCompanyName;
                            if(item.saveTime == null){
                                this.saveTime = ""
                            }else{
                                this.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD HH:mm:ss');
                            }
                            
                        })
                       
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //中标公告
            getselectionList(){
                let object={}
                if(this.projectCode.indexOf("-") != -1 && this.projectCode != null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectCode
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectCode
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/winnResultController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        res.data.data.map((item,index)=>{
                            this.agentAddress = item.agentAddress;
                            this.agentPhone = item.agentPhone;
                            this.address = item.address;
                            this.creatorCompanyName = item.creatorCompanyName;
                            this.leaderContactInformation = item.leaderContactInformation;
                            this.projectLeader = item.projectLeader;
                            this.remark = item.remarks;
                            if(item.saveTime == null){
                                this.saveTime = ""
                            }else{
                                this.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD HH:mm:ss')
                            }
                            this.tendereeContactInformation = item.tendereeContactInformation;
                            item.items.forEach(area=>{
                                this.mainWinningBid = area.mainWinningBid;
                                this.unitPrice = area.unitPrice;
                                this.number = area.number;
                                this.specificationType = area.specificationType;
                                if(area.contractPerformancePeriod == null){
                                    this.contractPerformancePeriod = ""
                                }else{
                                    this.contractPerformancePeriod = dayjs(area.contractPerformancePeriod).format('YYYY-MM-DD HH:mm:ss')
                                }
                                if(area.contractPerformanceEnd == null){
                                    this.contractPerformanceEnd = ""
                                }else{
                                    this.contractPerformanceEnd = dayjs(area.contractPerformanceEnd).format('YYYY-MM-DD HH:mm:ss')
                                }
                                this.nameOfSuccessfulSupplier = area.nameOfSuccessfulSupplier;
                                this.addressOfSuccessfulSupplier = area.addressOfSuccessfulSupplier;
                                this.winningAmountLowercase = area.winningAmountLowercase;
                                if(area.publicityStartTime == null){
                                    this.publicityStartTime = ""
                                }else{
                                    this.publicityStartTime = dayjs(area.publicityStartTime).format('YYYY-MM-DD HH:mm:ss')
                                }
                                if(area.publicityEndTime == null){
                                    this.publicityEndTime = ""
                                }else{
                                    this.publicityEndTime = dayjs(area.publicityEndTime).format('YYYY-MM-DD HH:mm:ss')
                                }

                            })
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //中标内容
            getContentList(){
                let object={}
                if(this.projectCode.indexOf("-") != -1 && this.projectCode != null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectCode
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectCode
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/selectChange",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        res.data.data.map((item,index)=>{
                            item.items.forEach(area=>{
                                this.purchaseAmount = area.purchaseAmount;
                                this.purchasePurposes = area.purchasePurposes;
                                this.technologyQualifications = area.technologyQualifications;
                            })
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //场地预约公告
            getOrderList(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/siteReservationController/selectById/"+this.siteReservationId
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.assessmentTime == null){
                            this.assessmentTime = ""
                        }else{
                            this.assessmentTime = dayjs(res.data.data.assessmentTime).format('YYYY-MM-DD')
                        }
                        this.estimatedReviewDuration = res.data.data.estimatedReviewDuration;
                        this.openingRoom = res.data.data.openingRoom;
                        this.appointmentEvaluationRoom = res.data.data.appointmentEvaluationRoom;
                        this.supportingServices = res.data.data.supportingServices;
                        this.bidEvaluationSite = res.data.data.bidEvaluationSite;
                        if(this.appointmentEvaluationRoom == '是'){
                            this.isService = true;// // 配套服务是否展示隐藏
                            this.isPlace = false;// 评标地点是否展示隐藏
                        }else if(this.appointmentEvaluationRoom == '否'){
                            this.isService = false;// // 配套服务是否展示隐藏
                            this.isPlace = true;// 评标地点是否展示隐藏
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //废标公告
            getAbnormalList(){
                let object={}
                if(this.projectCode.indexOf("-") != -1 && this.projectCode != null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectCode
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectCode
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderExceptionController/queryTenderException",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.exceptionDescription = res.data.data.exceptionDescription;
                        this.approvedResult = res.data.data.approvedResult;
                        if(res.data.data.approvedTime == null){
                            this.approvedTime = ""
                        }else{
                            this.approvedTime = dayjs(res.data.data.approvedTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.exceptionTypes = res.data.data.exceptionTypes;
                        this.isNotice = res.data.data.isNotice;
                        this.noticeTitle = res.data.data.noticeTitle;
                        if(res.data.data.noticeStartTime == null){
                            this.noticeStartTime = ""
                        }else{
                            this.noticeStartTime = dayjs(res.data.data.noticeStartTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        if(res.data.data.noticeEndTime == null){
                            this.noticeEndTime = ""
                        }else{
                            this.noticeEndTime = dayjs(res.data.data.noticeEndTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //答疑通知
            getAnswerList(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/answerNoticeController/selectById/" +this.answerNoticeId
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.answerTime == null){
                            this.answerTime = ""
                        }else{
                            this.answerTime = dayjs(res.data.data.answerTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.questionAnsweringPlace = res.data.data.questionAnsweringPlace;
                        this.contacts = res.data.data.contacts;
                        this.contactInformation = res.data.data.contactInformation;
                        this.other = res.data.data.other;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //合同公告
            getWiningInforList(){
                let object={}
                if(this.projectCode.indexOf("-") != -1 && this.projectCode != null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectCode
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectCode
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/winnResultController/select',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        let proNum = '';
                        res.data.data.map((item,index)=>{
                            this.projectLeader = item.projectLeader;// 项目负责人
                            this.winningBidDataItems = item.items;
                            this.address = item.address;// 招标（采购）人地址
                        })

                        this.winningBidDataItems.forEach((item)=>{
                            this.nameOfSuccessfulSupplier = item.nameOfSuccessfulSupplier;// 中标单位名称
                            this.winningAmountLowercase = item.winningAmountLowercase;// 中标金额
                            if(this.projectCode.indexOf("-") != -1 && this.projectCode!=null){
                                proNum = item.entrySubcontractNumber
                            }else{
                                proNum = item.projectCode
                            }
                            if(proNum == this.projectCode){
                                this.addressOfSuccessfulSupplier = item.addressOfSuccessfulSupplier;
                                this.nameOfSuccessfulSupplier = item.nameOfSuccessfulSupplier;
                                this.phoneOfSuccessfulSupplier = item.phoneOfSuccessfulSupplier;
                            }
                        })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            getContractList(){
                let object={}
                if(this.projectCode.indexOf("-") != -1 && this.projectCode != null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectCode
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectCode
                    }
                }
                this.$axios({
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
                        this.agentAddress = res.data.data.agentAddress;
                        this.agentPhone = res.data.data.agentPhone;
                        this.creatorCompanyName = res.data.data.creatorCompanyName;
                        this.contractCode = res.data.data.contractCode;
                        this.contractId = res.data.data.contractId;
                        this.zhuangtai = res.data.data.state;
                        
                        this.isPublicity = res.data.data.isPublicity;// 是否公示
                        this.contractCode = res.data.data.contractCode;// 合同编号
                        this.contractName = res.data.data.contractName;// 合同名称
                        this.contractAmount = res.data.data.contractAmount;// 合同金额(元)
                        this.contractDeadline = res.data.data.contractDeadline;//合同期限(日历天)
                        this.discussLocation = res.data.data.discussLocation;// 洽谈地点
                        this.qualityRequirements = res.data.data.qualityRequirements;// 质量要求
                        this.contractContent = res.data.data.contractContent;// 合同主要内容
                        this.remark = res.data.data.remark;// 备注说明
                        if(res.data.data.contractSignTime == null){
                            this.contractSignTime = ""
                        }else{
                            this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');// 合同签署时间
                        }
                        
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //上传列表
            uploadList(){
                var obj = {}
                if(this.projectCode.indexOf("-") != -1 && this.projectCode != null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.primaryKeyId,
                        fileType:'合同签署'
                    }
                }else{
                    // 入场项目编号
                    obj={
                        relevanceCorrelationId:this.primaryKeyId,
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
                            if(item.uploadTime == null){
                                item.formatTime = ""
                            }else{
                                item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
                            }
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
                this.downloadFile(item.attachmeId,item.fileName);
            }, 
            closeLook(){
                this.fileFlag =false;
                this.noticeFlag = false;
                this.lookFlag = false;
                this.selectionFlag = false;
                this.orderFlag = false;
                this.abnormalFlag = false;
                this.changeAnswerFlag = false;
                this.announcelookFlag = false;
                this.purchaselookFlag = false;
                this.changenoticeFlag =false;//变更采购公告详情
                this.changeAnnounceFlag = false;//变更采购公示详情
                this.purchaseAbnormalFlag = false;
                this.purchasefileFlag = false;
                this.purchaSelectionFlag = false;
                this.purchaseorderFlag = false;
                this.purchaseAnswerFlag = false;
                this.contractAnnounceFlag = false;
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
    overflow: hidden;
}
.wrapper{
    width: 100%;
    height: 100%;
    padding:0 100px;
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
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.lookBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.lookTitle{
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
.header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 118px;
    padding: 10px ;
}
.logoImg{
    width: 350px;
    height: 90px;
}
.logoImg>img{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
}
.logoIcon{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
.outBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #409EFF;
}
.main_info{
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.main_box{
    width:80%;
    height:100%;
    margin:0 auto;
    display:flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.pageBox{
    width:100%;
    height: 100%;
    overflow-x:auto;
    overflow-y: scroll;
}
.outBox>i{
    font-size: 40px;
}
.pagination {
    width: 100%;
    padding: 20px 60px ;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.mainBox{
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
    overflow-y: scroll;
}
.footer{
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    border-top: 8px solid #e61b21;
}
.footerContent{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footerImg{
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    margin-left: 40px;
}
.footerInfo{
    flex: 1;
    display: flex;
    flex-direction: column;
}
.infoFirst{
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 12px;
}
.infoFirst>p{
    padding:  0 8px;
    color: #282828;
    border-right: 2px solid #f00;
    font-weight: bold;
}
.infoFirst>p:hover{
    cursor: pointer;
    color: #e61b21;
}
.infoSecond{
    height: 30px;
    display: flex;
    align-items: center;
}
.infoSecond>span{
    color: #757484;
    font-size: 12px;
    padding-right: 30px;
}
.infoThree{
    height: 30px;
    display: flex;
    align-items: center;
}
.infoThree>span{
    color:#5f89a7;
    font-size: 12px;
    padding-right: 30px;
}
.code:hover{
    color: #ad282a;
    cursor: pointer;
}
.contentBox{
    width: 80%;
    margin: 10px auto;
}
.fail_box{
    width:100%;
    margin:0 auto;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px dashed #333;
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
    width: 165px;
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
.el-table__body-wrapper{
    height: 100% !important;
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
.footer_file{
    display: flex;
    flex:1;
    margin-bottom: 5px;
}
.footer_word{
    color: #333;
    font-weight:bold;
    padding-left: 10px;
    padding-right: 10px;
    border-right: 1px solid #282828;
}
.footer_word:last-child{
    border:none;
    padding-right: none;
}
.footer_word:first-child{
    padding-left: none;
}
</style>