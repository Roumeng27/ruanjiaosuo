<template>
  <div class="myDiv">
       <!-- 头部 -->
        <div class="head_box">
            <div class="head_l">新增项目</div>
            <el-radio-group v-model="radio">
                <el-radio label="全部">全部</el-radio>
                <el-radio label="未发出">未发出</el-radio>
                <el-radio label="已发出">已发出</el-radio>
            </el-radio-group>
        </div>
        <div class="head_bottom">
            <span class="head_b_b">招标项目(分包)名称：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
            <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalProjectId" placeholder="请输入内容"></el-input></span>
            <span><button class="btn" @click="searchList()">搜索</button></span>
        </div>
         <div class="main_info">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                </el-table-column>
                <el-table-column prop="totalProjectId" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="180">
                </el-table-column>
                <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="招标项目名称" width="180">
                </el-table-column>
                <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="分包名称">
                </el-table-column>
                <el-table-column prop="state" label="状态">
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                    <template slot-scope="scope">
                        <i class="el-icon-search"  @click="lookItem(scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <template>
                    <Page :total="totalSize" :current="PageNum" :page-size='20' show-elevator @on-change="page" v-if="pageTotal>1"></Page>
                </template>
            </div>
        </div>
        <!-- 上一步弹框 -->
        <div class="mask1" v-show="show"></div>
        <div v-show="show" class="fb_box">
            <div class="new_head">
                <div style="padding-left:10px;">新增项目</div>
                <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_nav">
                <button class="nav_co nav_save">保存</button>
                <button class="nav_co nav_next" @click="nextTo()">下一步</button>
            </div>
            <div class="main top_box">
                <el-collapse v-model="activeName" accordion>
                    <!--招标项目信息 -->
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
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}}万元</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="show_list">
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
                                    prop="entrySubcontractNumber"
                                    label="入场项目(分包)编号">
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
                                    label="查看">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                     <!-- 评标专家 -->
                    <el-collapse-item title="评标专家" name="2">
                        <div class="owner_title">
                            <button  class="nav_co nav_save" @click="addPeople()">新增专家</button>
                            <button class="nav_co nav_next"  @click="deletePeople()">删除专家</button>
                        </div>
                        <div style="margin-top:5px;">
                            <el-table :data="ownerList" stripe style="width: 100%"   @selection-change="handelOwnerInfo">
                                <el-table-column type="selection" width="55" align='center'>
                                </el-table-column>
                                <el-table-column label="序号" width="50">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column  prop="expertName" :show-overflow-tooltip ="true"  label="姓名" >
                                </el-table-column>
                                <el-table-column  prop="company"  :show-overflow-tooltip ="true" label="工作单位">
                                </el-table-column>
                                <el-table-column  prop="certified"  :show-overflow-tooltip ="true" label="职称/执业资格">
                                </el-table-column>
                                <el-table-column  prop="specialty" :show-overflow-tooltip ="true" label="从事专业">
                                </el-table-column>
                                <el-table-column  prop="committeeJob" :show-overflow-tooltip ="true" label="评标委员会担任工作" width="150">
                                </el-table-column>
                                <el-table-column  prop="expertType" :show-overflow-tooltip ="true" label="专家类型" >
                                </el-table-column>
                                <el-table-column prop="operation" label="查看" width="60">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search" style="cursor:pointer;" @click="viewInfo(scope.row)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="operation" label="修改"  width="60">
                                    <template slot-scope="scope">
                                        <i class="el-icon-edit" style="cursor:pointer;"  @click="editOwner(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 回避信息-->
                    <el-collapse-item title="回避信息" name="3" >
                        <div class="owner_title">
                            <button  class="nav_co nav_save" @click="addWork()">添加回避单位</button>
                            <button class="nav_co nav_next" @click="deleteWork()">删除回避单位</button>
                        </div>
                        <div style="margin-top:5px;">
                            <el-table
                                ref="multipleTable"
                                :data="avoidData"
                                tooltip-effect="dark"
                                style="width: 100%"
                                @selection-change="handleAvoidInfo">
                                <el-table-column
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column
                                    label="序号"
                                    width="70"
                                >
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="avoidCompanyName"
                                    label="回避单位名称">
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="avoidCompanyInstitutionCode"
                                    label="回避单位机构代码">
                                </el-table-column>
                                <el-table-column
                                    :show-overflow-tooltip ="true"
                                    prop="avoidReason"
                                    label="回避原因">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 下一步弹框 -->
        <div class="mask1" v-show="nextShow"></div>
        <div v-show="nextShow" class="fb_box">
            <div class="new_head">
                <div style="padding-left:10px;">新增项目</div>
                <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_nav">
                <button class="nav_co nav_save">提交</button>
                <button class="nav_co nav_next" @click="backTo()">上一步</button>
            </div>
            <div class="main top_box">
                <el-collapse v-model="activeName1" accordion>
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
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}}万元</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <el-table
                                ref="multipleTable"
                                :data="subpackageData"
                                style="width: 100%">
                            <el-table-column
                                label="序号"
                                width="70"
                            >
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column  
                                :show-overflow-tooltip ="true"
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号">
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
                                label="查看">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 相关附件 -->
                    <el-collapse-item title="相关附件" name="2">
                        <el-table :data="appendixData" stripe style="width: 100%">
                            <el-table-column  prop="index"  label="附件名称">
                            </el-table-column>
                            <el-table-column  prop="number"  label="附件列表(点击查看)">
                            </el-table-column>
                            <el-table-column  prop="number"  label="管理">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 评标专家 -->
                    <el-collapse-item title="评标专家" name="3">
                        <div style="margin-top:5px;">
                            <el-table :data="ownerList" stripe style="width: 100%" >
                                <el-table-column type="selection" width="55" align='center'>
                                </el-table-column>
                                <el-table-column label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column  prop="expertName" :show-overflow-tooltip ="true"  label="姓名" >
                                </el-table-column>
                                <el-table-column  prop="company" :show-overflow-tooltip ="true"  label="工作单位">
                                </el-table-column>
                                <el-table-column  prop="certified"  :show-overflow-tooltip ="true" label="职称/执业资格">
                                </el-table-column>
                                <el-table-column  prop="specialty" :show-overflow-tooltip ="true"  label="从事专业">
                                </el-table-column>
                                <el-table-column  prop="committeeJob" :show-overflow-tooltip ="true"  label="评标委员会担任工作" width="150">
                                </el-table-column>
                                <el-table-column  prop="expertType" :show-overflow-tooltip ="true"  label="专家类型" >
                                </el-table-column>
                                <el-table-column prop="operation" label="查看" width="70">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search" style="cursor:pointer;" @click="viewInfo(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 回避信息 -->
                    <el-collapse-item title="回避信息" name="4">
                        <el-table
                            ref="multipleTable"
                            :data="avoidData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleAvoidInfo">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                                label="序号"
                                width="70"
                            >
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column
                            :show-overflow-tooltip ="true"
                                prop="avoidCompanyName"
                                label="回避单位名称">
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="avoidCompanyInstitutionCode"
                                label="回避单位机构代码">
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="avoidReason"
                                label="回避原因">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="5">
                        <el-table :data="manageDate" stripe style="width: 100%">
                            <el-table-column  prop="step"  label="步骤">
                            </el-table-column>
                            <el-table-column  prop="userName" :show-overflow-tooltip ="true"  label="办理人员">
                            </el-table-column>
                            <el-table-column  prop="creationTime" :show-overflow-tooltip ="true"  label="时间">
                            </el-table-column>
                            <el-table-column  prop="state" :show-overflow-tooltip ="true"  label="状态">
                            </el-table-column>
                            <el-table-column  prop="remarks"  label="备注">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 查看分包弹框 -->
        <div class="mask1" v-show="lookFlag"></div>
        <div class="fb_box" v-show="lookFlag">
            <div class="pick_title">
                <p>分包信息</p>
                <i class="el-icon-close" @click="closeLook()"></i>
            </div>
            <div class="main top_box">
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
                                    <div class="editName">招标范围：</div>
                                    <div class="editContent">{{scopeOfTender}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包控制金额：</div>
                                    <div class="editContent">{{subcontractingControlAmount}}<b style="color:#000;">万元</b></div>
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
        <!-- 新增回避单位 -->
        <div class="mask1" v-show="addWorkFlag"></div>
        <div class="fb_box"  v-show="addWorkFlag">
            <div class="add_title">
                <p>新增回避单位</p>
                <i class="el-icon-close" @click="closeAddWork()"></i>
            </div>
            <div class="box">
                <button class="btn" @click="saveAddwork()">修改保存</button>
            </div>
            <div  class="main top_box">
                <el-collapse v-model="activeName" accordion>
                    <!-- 回避单位信息-->
                    <el-collapse-item title="回避单位信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName"><p class="star">*</p>回避单位名称：</div>
                                    <div class="editContent">
                                        <el-input v-model="avoidCompanyName" clearable></el-input>
                                    </div>
                                    <el-button plain @click="choisePage()">选择</el-button>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">回避单位机构代码：</div>
                                    <div class="editContent">
                                        <el-input v-model="avoidCompanyInstitutionCode" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">回避原因：</div>
                                    <div class="editContent">
                                        <el-select v-model="avoidReason">
                                            <el-option v-for="item in avoidReasonList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="editCenter">
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 选择回避单位 -->
        <div class="mask1" v-show="choiseFlag"></div>
        <div class="fb_box"  v-show="choiseFlag">
            <div class="add_title">
                <p>选择回避单位</p>
                <i class="el-icon-close" @click="closeChoise()"></i>
            </div>
            <div class="pick_input" >
                <div class="noteItem">
                    <div class="noteLeft">单位名称：</div>
                    <div class="write_input" >
                        <el-input v-model="unitName" clearable></el-input>
                    </div>
                </div>
                <div class="noteItem">
                    <div class="noteLeft" style="width:230px;">机构代码/统一社会信用代码：</div>
                    <div class="write_input" >
                        <el-input v-model="socialCreditCode" clearable></el-input>
                    </div>
                </div>
                <div style="width:150px;">
                    <button class="owner_btn" @click="searchAvoidData()">搜索</button>
                </div>
            </div>
            <div class="choise_main">
                <el-table
                    ref="multipleTable"
                    :data="choiseData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column align="center" width="55" label="" >
                        <template slot-scope="scope">
                            <el-radio :label="scope.row.ausId" v-model="templateRadio" @change.native="getTemplateRow(scope.row)">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="序号">
                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip ="true"
                        prop="unitName"
                        label="单位名称">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip ="true"
                        prop="organizationCode"
                        label="机构代码">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip ="true"
                        prop="socialCreditCode"
                        label="社会信用编码">
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <div class="pagination">
                    <template>
                        <Page :total="totalSize" :current="PageNum" :page-size='20' show-elevator @on-change="page" v-if="pageTotal>1"></Page>
                    </template>
                </div>
                <div class="sure_btn">
                    <button class="btn_choise" @click="choiseSure()">确定选择</button>
                </div>
            </div>
        </div>
        <!-- 新增及修改评标专家 -->
        <div class="mask1" v-show="addPeopleFlag"></div>
        <div class="fb_box" v-show="addPeopleFlag">
            <div>
                <div class="add_title" >
                    <p>{{ownerTitle}}</p>
                    <i class="el-icon-close" @click="closeAddPeople()"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="newSave()">保存</button>
                </div>
                <div  class="main top_box">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 评标专家信息-->
                        <el-collapse-item title="评标专家信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>专家姓名：</div>
                                        <div class="editContent">
                                            <el-input v-model="expertName" clearable @blur="blurName()"></el-input>
                                        </div>
                                        <el-button plain @click="pickInfo()">挑选</el-button>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">性别：</div>
                                        <div class="editContent">
                                            <el-select v-model="sex">
                                                <el-option label="男" value="男"></el-option>
                                                <el-option label="女" value="女"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">年龄：</div>
                                        <div class="editContent">
                                            <el-input v-model="age" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">学历：</div>
                                        <div class="editContent">
                                            <el-select v-model="education">
                                                <el-option v-for="item in educationList" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>身份证号：</div>
                                        <div class="editContent">
                                            <el-input v-model="idNumber" clearable @blur="blurIdNumber()"></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">职务：</div>
                                        <div class="editContent">
                                            <el-input v-model="position" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人专家来源：</div>
                                        <div class="editContent">
                                            <el-select v-model="expertSource">
                                                <el-option v-for="item in expertSourceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">工作单位：</div>
                                        <div class="editContent">
                                            <el-input v-model="company" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>专家手机：</div>
                                        <div class="editContent">
                                            <el-input v-model="phone" clearable @blur="blurPhone()"></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">职称/执业资格：</div>
                                        <div class="editContent">
                                            <el-select v-model="certified" >
                                                <el-option v-for="item in certifiedList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专家类型：</div>
                                        <div class="editContent">
                                            <el-select v-model="expertType">
                                                <el-option v-for="item in expertTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">谈判小组担任工作：</div>
                                        <div class="editContent">
                                            <el-select v-model="committeeJob">
                                                <el-option v-for="item in committeeJobList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">从事专业：</div>
                                        <div class="editContent">
                                            <el-input v-model="specialty"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div> 
        <!-- 查看评标专家 -->
        <div class="mask1" v-show="viewFlag"></div>
        <div class="fb_box" v-show="viewFlag">
            <div>
                <div class="pick_title">
                    <p>查看评标专家</p>
                    <i class="el-icon-close" @click="closeView()"></i>
                </div>
                <div class="main top_box">
                    <el-collapse v-model="activeName" accordion>
                        <!--评标专家信息 -->
                        <el-collapse-item title="评标专家信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专家姓名：</div>
                                        <div class="editContent">{{expertName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">性别：</div>
                                        <div class="editContent">{{sex}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">年龄：</div>
                                        <div class="editContent">{{age}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">学历：</div>
                                        <div class="editContent">{{education}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">身份证号：</div>
                                        <div class="editContent">{{idNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">职务：</div>
                                        <div class="editContent">{{position}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">评标专家来源：</div>
                                        <div class="editContent">{{expertSource}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">工作单位：</div>
                                        <div class="editContent">{{company}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专家手机：</div>
                                        <div class="editContent">{{phone}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">职称/执业资格：</div>
                                        <div class="editContent">{{certified}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专家类型：</div>
                                        <div class="editContent">{{expertType}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">评标委员会担任工作：</div>
                                        <div class="editContent">{{committeeJob}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">从事专业：</div>
                                        <div class="editContent">{{specialty}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>  
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        specialty:'',//从事专业
        committeeJobList:[],//谈判担任工作列表
        committeeJob:'',//谈判担任工作
        expertTypeList:[],//专家类型列表
        expertType:'',//专家类型
        certifiedList:[],//职业资格列表
        certified:'',//职业资格
        phone:'',//专家手机
        company:'',//工作单位
        expertSourceList:[],//采购人专家列表
        expertSource:'',//采购人专家来源
        position:'',//职务
        idNumber:'',//身份证号
        educationList:'',//学历列表
        education:'',//学历
        age:"",//年龄
        sex:'',//性别
        ownerTitle:'',//新增专家标题
        expertName:'',//专家姓名
        choiseData:[],//选择回避单位列表
        socialCreditCode:'',//统一社会信用代码
        unitName:"",//单位名称
        avoidReasonList:[],//原因列表
        avoidReason:'',//回避原因
        avoidCompanyInstitutionCode:'',//回避单位机构代码
        avoidCompanyName:'',//回避单位名称
        radio:'',
        nameOfTenderProject:'',//招标项目名称
        totalProjectId:'',//入场项目分包编号
        tableData:[],//数据列表
        currentPage:1,//当前页
        PageSize: 20, //每页条数
        pageTotal: 0, //总页数
        totalSize: 0, //总条数
        show:false,//上一步弹框
        activeName:['1','2','3'],
        biddingProjectNumber:'',//招标项目编号
        budgetAmount:'',//招标项目预算金额
        nameOfPurchaser:"",//招标采购人
        amountId:'',//入场项目编号
        subpackageData:[],//分包数据
        ownerList:[],//评标专家数据上一步
        avoidData:[],//上一步回避信息
        nextShow:false,//下一步弹框
        activeName1:['1','2','3','4','5'],
        appendixData:[],//相关附件
        manageDate:[],//办理记录
        lookFlag:false,//分包弹框
        entrySubcontractNumber:"",//入场项目分包编号
        subcontractName:"",//分包名称
        subcontractContents:'',//分包内容
        scopeOfTender:'',//招标范围
        subcontractingControlAmount:'',//分包控制金额
        qualificationExaminationMethod:'',//资格审查方式
        electronicBidEvaluation:'',//是否电子开评标
        addWorkFlag:false,//新增回避信息
        choiseFlag:false,//选择回避单位
        addPeopleFlag:false,//新增评标专家
        viewFlag:false,//查看评标专家
    }
  },
  watch:{},
  computed:{},
  methods:{
       //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        //分页
        page(val) {
            this.currentPage = val;
        },
        //下一步
        nextTo(){
            this.show = false;
            this.nextShow = true;
        },
        //上一步
        backTo(){
            this.show = true;
            this.nextShow = false;
        },
        //评标专家
        handelOwnerInfo(){

        },
        //回避信息
        handleAvoidInfo(){

        }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
}
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 0 3px;
}
.head_l {
  padding: 2px 6px;
  background-color: #0095d5;
  color: #ffffff;
  cursor: pointer;
}
.head_bottom {
  width: 100%;
  text-align: center;
  margin: 1% 0;
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
/* 新建项目 */
.new_pro {
  z-index: 3;
  background: #f0f4f6;
  width: 98%;
  height: 98%;
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate(-9%, -10%);
  overflow-y: hidden;
}
.new_pro_top{
  z-index: 5;
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
.top_box{
    width: 85%;
    height:99%;
    margin: 0 auto;
    overflow: scroll;
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
.fb_box{
    width: 95%;
    height: 95%;
    z-index: 20;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background:#f0f4f6;
    overflow: hidden;
}
.sureSelect{
    position: fixed;
    bottom: 5%;
    left:50%;
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
.choose{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding:  0 20px;
}
.pickBox,.searchBox,.lookBox,.winBox,.addBox{
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin:0 auto;
}
.main_info{
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.choiseBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column; 
}
.choise_main{
    width: 100%;
    flex:1;
    overflow: hidden;
    overflow-y: scroll;
}
.choise_footer{
    width: 100%;
    height: 100px;
    padding:10px 20px;
    background-color: #eaeaea;
}
.pick_title,.search_title,.add_title{
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
.el-icon-close{
    font-size: 24px; 
}
.search_input,.search_input{
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
    height: 100%;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.owner_title{
    width: 100%;
    display: flex;
}
.owner_btn{
    height: 35px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.pick_input{
    width: 100%;
    padding: 0 30px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sure_btn{
    position: absolute;
    left: 0;
    top: 74%;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 200px;
    height: 40px;
}
.btn_choise{
    height: 35px;
    padding:0 30px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.pagination{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 列表展示 */
.edit_list{
    padding: 15px 20px;
}
.editItem{
    width: 100%;
    display: flex;
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
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
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
/* 输入框 */
.noteBox{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 4px 0;
}
.noteItem{
    display: flex;
    align-items: center;
}
.noteItem p{
    padding:  0 5px;
}
.noteLeft{
    width: 130px;
    display: flex;
    justify-content: flex-end;
}
.star{
    color: red;
    padding-right: 5px;
}
.write_input{
    width: 60%;
}
.write_textarea{
    width: 890px !important;;
}
.write_input>.el-select{
    width: 250px;
}
.write_item{
    width: 810px !important;;
}
.write_info {
    width: 550px;
}
.show_list{
    padding: 3px 20px;
}
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
.infobox_main{
    width: 100%;
    display: flex;
    flex-direction: column
}
.infobox_item{
    padding: 10px 0 10px 0;
}
.note_box{
    display: flex;
    line-height: 26px;
}
.note_box p{
    width: 200px;
}
.infobox_footer{
    width: 100%;
    text-align: end;
}
</style>