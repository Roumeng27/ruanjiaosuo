<template>
    <div class="newBox">
        <div  v-show="passJudgeShow" style="height:100%;overflow-y:scroll;">
            <!-- 组建评标委员会 -->
            <div class="wrapper" v-show="writeFlag">
                <div class="box" v-show="headerBtn">
                    <button class="btn" @click="newly(1)">保存</button>
                    <button class="btn" @click="newly(2)">下一步</button>
                </div>
                <div class="main_info">
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
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{amountId}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="show_list" v-show="breakBagFlag">
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
                            <div class="owner_title" v-show="headerBtn">
                                <button class="owner_btn" @click="addPeople">新增专家</button>
                                <button class="owner_btn" @click="deletePeople">删除专家</button>
                            </div>
                            <div style="margin-top:5px;">
                                <el-table :data="ownerList" stripe style="width: 100%"   @selection-change="handelOwnerInfo">
                                    <el-table-column type="selection" width="55" align='center'>
                                    </el-table-column>
                                    <el-table-column label="序号" width="50">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column  prop="expertName" :show-overflow-tooltip ="true" label="姓名" >
                                    </el-table-column>
                                    <el-table-column  prop="company" :show-overflow-tooltip ="true" label="工作单位">
                                    </el-table-column>
                                    <el-table-column  prop="certified" :show-overflow-tooltip ="true" label="职称/执业资格">
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
                                    <el-table-column prop="operation" label="修改"  width="60" v-if="stateItem !='办理通过'">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit" style="cursor:pointer;"  @click="editOwner(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 回避信息-->
                        <el-collapse-item title="回避信息" name="3" >
                            <div class="owner_title" v-show="headerBtn">
                                <button class="owner_btn" @click="addWork">添加回避单位</button>
                                <button class="owner_btn" @click="deleteWork">删除回避单位</button>
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
            <div class="nextWrapper" v-show="showFlag">
                <div class="box" v-show="headerBtn">
                    <button class="btn" @click="goBack">上一步</button>
                    <button class="btn" @click="submitInfo">提交</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
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
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-show="breakBagFlag">
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
                            <el-table :data="enclosureData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column label="附件列表(点击查看)">
                                    <template slot-scope="scope">
                                        <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="liItem">
                                            {{item.fileName}}
                                        </li>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem !='待办理' &&this.stateItem !='办理通过'">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                    </template>
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
                                    <el-table-column  prop="expertName" :show-overflow-tooltip ="true" label="姓名" >
                                    </el-table-column>
                                    <el-table-column  prop="company" :show-overflow-tooltip ="true" label="工作单位">
                                    </el-table-column>
                                    <el-table-column  prop="certified" :show-overflow-tooltip ="true" label="职称/执业资格">
                                    </el-table-column>
                                    <el-table-column  prop="specialty" :show-overflow-tooltip ="true" label="从事专业">
                                    </el-table-column>
                                    <el-table-column  prop="committeeJob" :show-overflow-tooltip ="true" label="评标委员会担任工作" width="150">
                                    </el-table-column>
                                    <el-table-column  prop="expertType" :show-overflow-tooltip ="true" label="专家类型" >
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
                                    prop="avoidCompanyName"
                                    label="回避单位名称">
                                </el-table-column>
                                <el-table-column
                                    prop="avoidCompanyInstitutionCode"
                                    label="回避单位机构代码">
                                </el-table-column>
                                <el-table-column
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
            <!-- 挑选 -->
            <div class="pickWrapper" v-show="pickFlag">
                <div class="pickBox">
                    <div class="pick_title">
                        <p>挑选专家</p>
                        <i class="el-icon-close" @click="closePick"></i>
                    </div>
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">身份证号：</div>
                                <div class="editContent">
                                    <el-input v-model="idNumber" clearable></el-input>
                                </div>
                            </div>
                            <div class="editBtn">
                                <button class="owner_btn" @click="searckPickData">搜索</button>
                            </div>
                        </div>
                    </div>
                    <div class="main_info">
                        <el-table
                            ref="multipleTable"
                            :data="pickData"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column align="center" width="55" label="" >
                                <template slot-scope="scope">
                                    <el-radio :label="scope.row.expertsId" v-model="templateRadio" @change.native="getTemplatePick(scope.row)">&nbsp;</el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1  }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="expertName"
                                label="专家名称">
                            </el-table-column>
                            <el-table-column
                                prop="idNumber"
                                label="身份证号">
                            </el-table-column>
                            <el-table-column
                                label="选择">
                                <template slot-scope="scope">
                                    <i class="el-icon-plus" @click="copyPick(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="sure_btn">
                        <button class="btn_choise" @click="pickSure">确定选择</button>
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
                    <el-collapse v-model="activeName" accordion>
                        <!--分包信息 -->
                        <el-collapse-item title="分包信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter" style="color:red;">
                                        <div class="editName">标段包编号(赋码)：</div>
                                        <div class="editContent"> </div>
                                    </div>
                                </div>
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
            <!-- 查看评标专家 -->
            <div class="lookWrapper" v-show="viewFlag">
                <div class="lookBox">
                    <div class="pick_title">
                        <p>查看评标专家</p>
                        <i class="el-icon-close" @click="closeView"></i>
                    </div>
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
            <!-- 新增及修改评标专家 -->
            <div class="addWrapper" v-show="addPeopleFlag">
                <div class="addBox">
                    <div class="add_title" >
                        <p>{{ownerTitle}}</p>
                        <i class="el-icon-close" @click="closeAddPeople"></i>
                    </div>
                    <div class="box">
                        <button class="btn" @click="newSave">保存</button>
                    </div>
                   <div class="main_info">
                        <el-collapse v-model="activeName" accordion>
                            <!-- 评标专家信息-->
                            <el-collapse-item title="评标专家信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>专家姓名：</div>
                                            <div class="editContent">
                                                <el-input v-model="expertName" id="focus1" clearable></el-input>
                                            </div>
                                            <el-button plain @click="pickInfo">挑选</el-button>
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
                                                <el-input v-model="age" id="focus9" clearable></el-input>
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
                                                <el-input v-model="idNumber" id="focus2"  clearable @blur="blurIdNumber"></el-input>
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
                                            <div class="editName">评标专家来源：</div>
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
                                                <el-input v-model="phone" id="focus3"  clearable @blur="blurPhone"></el-input>
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
            <!-- 新增回避单位 -->
            <div class="addPage"  v-show="addWorkFlag">
                <div class="addBox">
                    <div class="add_title">
                        <p>新增回避单位</p>
                        <i class="el-icon-close" @click="closeAddWork"></i>
                    </div>
                    <div class="box">
                        <button class="btn" @click="saveAddwork">修改保存</button>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="activeName" accordion>
                            <!-- 回避单位信息-->
                            <el-collapse-item title="回避单位信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>回避单位名称：</div>
                                            <div class="editContent">
                                                <el-input v-model="avoidCompanyName"  id="focus4"  clearable></el-input>
                                            </div>
                                            <el-button plain @click="choisePage">选择</el-button>
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
                                        <div class="editCenter">
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    
                </div>
            </div>
            <!-- 选择回避单位 -->
            <div class="pickWrapper"  v-show="choiseFlag">
                <div class="pickBox">
                    <div class="add_title">
                        <p>选择回避单位</p>
                        <i class="el-icon-close" @click="closeChoise"></i>
                    </div>
                    <!-- 搜索的输入框 -->
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">单位名称：</div>
                            <div class="editContent">
                                <el-input v-model="unitName" clearable></el-input>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">机构代码/统一社会信用代码：</div>
                            <div class="editContent">
                                <el-input v-model="socialCreditCode" clearable ></el-input>
                            </div>
                        </div>
                        <div class="editBtn" style="width:130px;">
                            <button class="btn_choise" @click="searchAvoidData">搜索</button>
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
                            <!-- <el-table-column
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column> -->
                            <el-table-column type="index" width="70" label="编号" :index="typeIndex">
					        </el-table-column>
                            <el-table-column
                                prop="unitName"
                                label="单位名称">
                            </el-table-column>
                            <el-table-column
                                prop="organizationCode"
                                label="机构代码">
                            </el-table-column>
                            <el-table-column
                                prop="socialCreditCode"
                                label="社会信用编码">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="choise_footer">
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
                        <div class="sure_btn">
                            <button class="btn_choise" @click="choiseSure">确定选择</button>
                        </div>
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
                    <el-button type="primary" @click="saveBoxSure">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 确认提交弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="sureSubmitBox"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>组建评标委员会提交成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureBtn">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 删除回避信息提示 -->
            <el-dialog
                title="系统提示"
                :visible.sync="deleteBox"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>请选择需要删除的回避单位！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteSure">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div v-show="frameShow" >
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
                    <el-button type="primary" @click="handleClose">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import {formatDate,digitUppercase,isPoneAvailable,getIdcard,getName, checkNumber,checkPhone} from '../../../api/base.js'
export default {
    data(){
        return {
            str_entrust_type:window.sessionStorage.str_entrust_type,
            role_types:window.localStorage.role_types,
            biddingPurchasingAgencyName:'',
            alertMsg:'',
            cancelShow:false,
            frameShow:false,
            passJudgeShow:true,
			projectObj:JSON.parse(window.localStorage.projectObj),
            activeName:['1','2','3','4','5','6'],
            tableData:[],
            breakBagFlag:false,
            multipleSelection:[],//多选框
            idcard:'',
			writeFlag:true,// 总包输入 列表
			//挑选所需字段
			pickFlag:false,// 弹窗
            // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            tenderPurchaserName:'',// 招标(采购)人
			budgetAmount:'',// 招标项目预算金额
			amountOfBiddingProject:'',//招标项目金额
			biddingProcurementMode:'',// 招标采购方式
			biddingOrganization:'',// 招标组织方式
			typesOfBiddingProjects:'',// 招标项目类型
            // 保存所需字段
            address:'',// 招标人地址
            remarks:'',//֖备注
            name:'',//中标供应商地址
            number:'',
            entrySubcontractNumber:'',// 入场项目编号 分包
            projectCode:'',//入场项目编号 总包
			saveBox:false,//保存弹窗
            // 下一步页面
            showFlag:false,
            remark:'',// 备注
            // 确定提交
            sureSubmitBox:false,
            headerBtn:true,
			infoList:[],
			// 公告内容
			amountId:'',// 总包
			name:'',// 分包项目名称
			subpackageData:[],// 确定选择的列表
			// 查看详情
			lookFlag:false,
			// 分包信息详情
			winFlag:false,
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            totalProjectId:'',
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            // 新增专家
            addPeopleFlag:false,
            // 删除专家
            deletePeopleFlag:false,
            // 回避信息
            avoidData:[],// 列表
            multipleAvoidData:[],// 复选框选中
            deleteId:[],// 被删除的ID
            // 新增回避单位
            addWorkFlag:false,
            avoidCompanyName:'',// 回避单位名称
            avoidReason:'招标人',// 回避原因
            avoidCompanyInstitutionCode:'',// 回避单位机构代码
            // 新增回避单位 ->回避单位
            choiseData:[],// 回避单位列表
            templateRadio:'',// 单选框按钮
            rowItem:{},// 单选框选中的item数据
            unitName:'',// 单位名称
            socialCreditCode:'',// 社会信用编码
            // 删除回避单位
            deleteWorkFlag:false,
            deleteBox:false,
            // 选择回避单位
            choiseFlag:false,
            // 分页器
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
            total: 0, //总条数
            candidateMenuItem:[],
            // 查看评标专家所需字段
            viewFlag:false,// 弹窗
            expertName:'',// 专家姓名
            sex:'',// 性别
            age:'',// 年龄
            education:'',// 学历
            idNumber:'',// 身份证号码
            position:'',// 职务
            expertSource:'',// 评标专家来源
            company:'',// 工作单位
            phone:'',// 专家手机
            certified:'',// 职称/执业资格
            expertType:'',// 专家类型
            committeeJob:'',// 评标委员会担任工作
            specialty:'',// 从事专业
            expertsId:'',// 评标专家ID
            // 评标专家
            ownerList:[],// 列表
            multipleOwnerData:[],// 复选框选中
            ownerTitle:'',// 标题
            // 下拉框
            expertSourceList:[{
                label:'外聘',
                value:'外聘'
            }],// 评标专家来源
            expertTypeList:[],//专家类型
            certifiedList:[],// 职称/执业资格
            committeeJobList:[],// 评标委员会担任工作
            educationList:[],// 学历
            avoidReasonList:[],// 回避原因
            stateItem:'',// 后端返回的状态
            // 挑选
            pickData:[],
            pickItem:{},
            expertsMainId:'',// 
            flag:false,// async控制一直请求接口
            // 文件上传所需字段
            enclosureData:[{
                appendixName: "*招标人评委相关证明",
                attachlist: []
            }],
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
        }
    },
    created(){
        if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
            this.entrySubcontractNumber = this.projectObj.totalProjectId;
            this.breakBagFlag = true;
        }else{
            this.projectCode = this.projectObj.totalProjectId;
            this.breakBagFlag = false;
        }
        this.getItemInfo();// 根据项目入场分包编号查询
		this.getbiddingInfo();// 招标项目信息列表
        // this.getAvoidinfo();// 回避信息列表
         this.uploadList();//上传列表
         this.getOneList();// 招标人评委相关证明附件
        // 下拉框
        // this.getexpertSource();// 评标专家来源
        this.geteducation();// 学历
        this.getexpertType();// 专家类型
        this.getcertified();// 职称/执业资格
        this.getcommitteeJob();//评标委员会担任工作
        this.getavoidReason();// 回避原因
        this.getDecideList();
        this.getData();
    },
    methods:{
        // 分页器
        handleSizeChange(val) {
            // 每页条数
        },
        handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getChoiseList()
        },
        //编号问题
		typeIndex(index) {
			return index + (this.currentPage - 1) * 10 + 1;
		},
        // 校验
        blurIdNumber(){
            if(!getIdcard(this.idNumber)){
                this.$message.warning('请输入正确的身份证号码');
                return false;
            }
        },
        blurPhone(){
            if(!isPoneAvailable(this.phone) && !checkPhone(this.phone)){
                this.$message.warning('请输入正确的手机号码');
                return false;
            }
        },
		// 挑选
        pickInfo(){
            this.pickFlag = true;
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/chooseExperts',
                data:{
                    moduleType:'组建评标委员会'
                }
            }).then(res=>{
                if(res.data.status == 200){
                   this.pickData = res.data.data;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //关闭挑选
        closePick(){
            this.pickFlag = false;
		},
        // 新增回避单位
        addWork(){
            this.addWorkFlag = true;
            this.avoidCompanyName = '';// 回避单位名称
            this.avoidCompanyInstitutionCode ='';// 回避单位机构代码
        },
        // 新增回避单位 ---> 选择
        choisePage(){
            this.choiseFlag = true;
            this.getChoiseList();
        },
        // 新增回避单位 ---> 选择--->关闭
        closeChoise(){
            this.choiseFlag = false;
        },
        closeAddWork(){
            this.addWorkFlag = false;
        },
        // 新增回避单位 ---> 选择---> 列表 ---> 单选框
        getTemplateRow(row){      
           this.rowItem = row;
        },
        // 保存和下一步公用方法
        newly(num){
            if(num == 1){
                // 保存
                this.savecandidateInfo(num)
            }else{
                // 下一步
				if(this.avoidData.length<=0){
                    this.$message.warning('回避单位信息不能为空!');
                    return false;
                }else{
                    this.writeFlag = false;// 输入框的页面
                    this.headerBtn=true;
                    this.showFlag = true;// 下一步页面
                    this.savecandidateInfo(num);
                    // this.getmanageInfo();// 办理记录
                    this.uploadList();
                }
            }
        },
        // 上一步
        goBack(){
            this.writeFlag = true;// 输入框的页面
            this.showFlag = false;// 下一步页面
        },
        // 提交
        submitInfo(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/submit',
                data:{
                    expertsMainId:this.expertsMainId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.sureSubmitBox = true;
                    this.getInitInfo();// 初始化查询
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 确认提交 ---> 确定
        sureBtn(){
            this.sureSubmitBox = false;// 确定提交弹窗
            this.getmanageInfo();// 办理记录
        },
        handleClose(){
            this.saveBox = false;// 保存弹窗 确定
            this.deleteBox = false;// 删除回避信息提示
            this.frameShow =false;
            this.sureSubmitBox = false;// 确定提交弹窗
            this.cancelShow = false;
        },
        // 保存弹窗 确定
        saveBoxSure(){
            this.saveBox = false;
        },
        // 保存
        savecandidateInfo(num){
            let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 分包
                    object ={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:'组建评标委员会',
                    }
                }else{
                    // 总包
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        type:'组建评标委员会',
                    }
                }
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/saveOrNextStep',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                    }
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
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
                        let obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '招标异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '组建评标委员会'){
                                obj.houxuanren = item
                            }
                            if(item.value == '招标公告'){
                                obj.ruchang = item
                            }
                        })
                        if(obj.houxuanren.state != '办理通过'){
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
                            if(item.value == '招标异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '组建评标委员会'){
                                obj.zujian = item
                            }
                            if(item.value == '招标公告'){
                                obj.notice = item
                            }
                        })
                        //招标勾且本业勾，可以看，
                        if(obj.zhaobiao.state == '办理通过' && obj.zujian.state == '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        //如果上一步打钩，进一步判断
                        }else if(obj.notice.state == '办理通过' ){
                            //如果招标打钩，则本业必须打勾
                            if(obj.zhaobiao.state == '办理通过'&& obj.zujian.state == '办理通过'){
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
                                    this.alertMsg = '尚未完成招标公告,无法进行组建评标委员会!'
                                }
                            }
                        }else{
                            //其他的都不能看
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成招标公告,无法进行组建评标委员会!'
                            }
                        }
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
					this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
					this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
					this.biddingOrganization = res.data.data.biddingOrganization;// 招标组织方式
					this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
					this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
					this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
					this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号

                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 根据项目入场分包编号查询
        getItemInfo(){
            let arr =[];
            arr.push(this.entrySubcontractNumber)
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:arr
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
		// 分包列表 搜索
		searchData(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectListByTotalProjectId",
				data:{
					entrySubcontractNumber:this.number,
					subcontractName:this.name,
					totalProjectId:this.amountId,
					subcontractingState:'办理通过'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.candidateMenu = res.data.data.list;
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
		closeWin(){
			this.winFlag = false;
        },
        // 新增评标专家 ---> 挑选---> 列表 ---> 单选框
        getTemplatePick(row){
            this.pickItem = row;
        },
        // 挑选 ---> 确定选择
        pickSure(){
            this.pickFlag =false;
            this.expertName=this.pickItem.expertName;// 专家姓名
            this.sex=this.pickItem.sex;// 性别
            this.age=this.pickItem.age;// 年龄
            this.education=this.pickItem.education;// 学历
            this.idNumber=this.pickItem.idNumber;// 身份证号码
            this.position=this.pickItem.position;// 职务
            this.expertSource=this.pickItem.expertSource;// 评标专家来源
            this.company=this.pickItem.company;// 工作单位
            this.phone=this.pickItem.phone;// 专家手机
            this.certified=this.pickItem.certified;// 职称/执业资格
            this.expertType=this.pickItem.expertType;// 专家类型
            this.committeeJob=this.pickItem.committeeJob;// 评标委员会担任工作
            this.specialty=this.pickItem.specialty;// 从事专业
        },
        // 新增评标专家 ---> 挑选---> 列表 ---> +
        copyPick(row){
            this.pickFlag =false;
            this.expertName=row.expertName;// 专家姓名
            this.sex=row.sex;// 性别
            this.age=row.age;// 年龄
            this.education=row.education;// 学历
            this.idNumber=row.idNumber;// 身份证号码
            this.position=row.position;// 职务
            this.expertSource=row.expertSource;// 评标专家来源
            this.company=row.company;// 工作单位
            this.phone=row.phone;// 专家手机
            this.certified=row.certified;// 职称/执业资格
            this.expertType=row.expertType;// 专家类型
            this.committeeJob=row.committeeJob;// 评标委员会担任工作
            this.specialty=row.specialty;// 从事专业
        },
        // 新增评标专家 ---> 挑选---> 列表 ---> 搜索
        searckPickData(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/selectExpertsList',
                data:{
                    idNumber:this.idNumber 
                }
            }).then(res=>{
                if(res.data.status == 200){
                   this.pickData = res.data.data;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 办理记录
        getmanageInfo(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.expertsMainId
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.expertsMainId
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
        // 新增回避信息 ---> 修改保存
        saveAddwork(){
            if(!this.avoidCompanyName){
                $('#focus4').focus();
                this.$message.warning('请输入回避单位名称');
                return false;
            }else{
                // 判断去重 如果外边数组有了 就不添加
                let flag = true;
                this.avoidData.forEach(item=>{
                    if(item.avoidCompanyName == this.avoidCompanyName){
                        this.$message.warning("该回避单位已添加！");
                        flag = false;
                    }
                })
                if(flag){
                    let object = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 分包
                        object ={
                            entrySubcontractNumber:this.entrySubcontractNumber,
                            avoidCompanyName:this.avoidCompanyName,
                            avoidReason:this.avoidReason,
                            avoidCompanyInstitutionCode:this.avoidCompanyInstitutionCode,
                            expertsMainId:this.expertsMainId
                        }
                    }else{
                        // 总包
                        object ={
                            projectCode:this.projectCode,
                            avoidCompanyName:this.avoidCompanyName,
                            avoidReason:this.avoidReason,
                            avoidCompanyInstitutionCode:this.avoidCompanyInstitutionCode,
                            expertsMainId:this.expertsMainId
                        }
                    }
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/AvoidInforController/insert",
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.addWorkFlag = false;
                            let obj={}
                            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                                // 入场项目分包编号
                                obj={
                                    entrySubcontractNumber:this.projectObj.totalProjectId,
                                    type:'组建评标委员会'
                                }
                            }else{
                                // 入场项目编号
                                obj ={
                                    projectCode:this.projectObj.totalProjectId,
                                    type:'组建评标委员会'
                                }
                            }
                            this.$axios({
                                method: "POST",
                                url: baseUrl+"/ownerExpertsController/selectCommitteeState",
                                data:obj
                            }).then(res=>{
                                if(res.data.status == 200){
                                    this.expertsMainId = res.data.data.expertsMainId;
                                    this.$axios({
                                        method: "POST",
                                        url: baseUrl+"/AvoidInforController/selectList",
                                        data:{
                                            expertsMainId:this.expertsMainId,
                                        }
                                    }).then(res=>{
                                        if(res.data.status == 200){
                                            this.avoidData = res.data.data.data;
                                        }else{
                                            console.log(res.data.msg);
                                        }
                                    }).catch(err=>{
                                        console.log(err)
                                    })
                                }else{
                                    this.$message.warning(res.data.msg);
                                }
                            }).catch(err=>{
                                console.log(err)
                            })
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            }
        },
        // 回避信息 ---> 多选框
        handleAvoidInfo(val){
            this.multipleAvoidData = val;
        },
        // 删除回避单位 -->提示弹窗
        deleteSure(){
            this.deleteBox = false;
        },
        // 删除回避单位
        deleteWork(){
            let arr =[];
            this.multipleAvoidData.forEach(item=>{
                arr.push(item.id)
            })
            if(arr.length <= 0){
                this.deleteBox = true;
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/AvoidInforController/deleteById",
                    data:{
                        id:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        let object={}
                        if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                            // 入场项目分包编号
                            object={
                                entrySubcontractNumber:this.projectObj.totalProjectId,
                                type:'组建评标委员会'
                            }
                        }else{
                            // 入场项目编号
                            object ={
                                projectCode:this.projectObj.totalProjectId,
                                type:'组建评标委员会'
                            }
                        }
                        this.$axios({
                            method: "POST",
                            url: baseUrl+"/ownerExpertsController/selectCommitteeState",
                            data:object
                        }).then(res=>{
                            if(res.data.status == 200){
                                this.expertsMainId = res.data.data.expertsMainId;
                                this.$axios({
                                    method: "POST",
                                    url: baseUrl+"/AvoidInforController/selectList",
                                    data:{
                                        expertsMainId:this.expertsMainId,
                                    }
                                }).then(res=>{
                                    if(res.data.status == 200){
                                        this.avoidData = res.data.data.data;
                                    }else{
                                        console.log(res.data.msg);
                                    }
                                }).catch(err=>{
                                    console.log(err)
                                })
                            }else{
                                this.$message.warning(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        // 新增回避信息 ---> 回避单位列表
        getChoiseList(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/AusController/selectList",
				data:{
					pageNo:this.currentPage,
					pageSize:this.pageSize
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.choiseData = res.data.data.list;// 新增回避信息 ---> 回避单位列表
                    this.total = res.data.data.total;// 总条数
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 回避单位列表 ---> 搜索
        searchAvoidData(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/AusController/selectList",
				data:{
                    pageNo:this.currentPage,
					pageSize:this.pageSize,
                    unitName:this.unitName,
                    socialCreditCode:this.socialCreditCode
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.choiseData = res.data.data.list;// 新增回避信息 ---> 回避单位列表
                   this.total = res.data.data.total;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 回避单位列表 ---> 确定选择
        choiseSure(){
            this.choiseFlag = false;
            // 回避单位信息
            this.avoidCompanyName = this.rowItem.unitName;//回避单位名称
            this.avoidReason = this.avoidReason;// 回避原因
            this.avoidCompanyInstitutionCode = this.rowItem.organizationCode;// 回避单位机构代码
        },
        // 评标专家查看
        viewInfo(row){
            this.viewFlag =true;
            this.expertName=row.expertName;// 专家姓名
            this.sex=row.sex;// 性别
            this.age=row.age;// 年龄
            this.education=row.education;// 学历
            this.idNumber=row.idNumber;// 身份证号码
            this.position=row.position;// 职务
            this.expertSource=row.expertSource;// 评标专家来源
            this.company=row.company;// 工作单位
            this.phone=row.phone;// 专家手机
            this.certified=row.certified;// 职称/执业资格
            this.expertType=row.expertType;// 专家类型
            this.committeeJob=row.committeeJob;// 评标委员会担任工作
            this.specialty=row.specialty;// 从事专业
        },
        // 评标专家修改
        editOwner(row){
            this.addPeopleFlag = true;
            this.ownerTitle = '修改评标专家'
            this.expertsId = row.expertsId;// 评标专家ID
            this.expertName=row.expertName;// 专家姓名
            this.sex=row.sex;// 性别
            this.age=row.age;// 年龄
            this.education=row.education;// 学历
            this.idNumber=row.idNumber;// 身份证号码
            this.position=row.position;// 职务
            this.expertSource=row.expertSource;// 评标专家来源
            this.company=row.company;// 工作单位
            this.phone=row.phone;// 专家手机
            this.certified=row.certified;// 职称/执业资格
            this.expertType=row.expertType;// 专家类型
            this.committeeJob=row.committeeJob;// 评标委员会担任工作
            this.specialty=row.specialty;// 从事专业
        },

        // 评标专家查看关闭
        closeView(){
            this.viewFlag =false;
        },
        // 校验
        blurIdNumber(){
            if(!getIdcard(this.idNumber)){
                this.$message.warning('请输入正确的身份证号码');
            }
        },
        blurPhone(){
            if(!isPoneAvailable(this.phone) && !checkPhone(this.phone)){
                this.$message.warning('请输入正确的手机号码');
            }
        },
        // 新增评标专家保存
        newSave(){
            if(this.ownerTitle == '新增评标专家'){
                if(!this.expertName && !getName(this.expertName)){
                    $('#focus1').focus();
                    this.$message.warning('请输入专家姓名');
                    return false;
                }else if(!this.idNumber){
                    $('#focus2').focus();
                    this.$message.warning('请输入身份证号码!');
                    return false;
                }else if(!getIdcard(this.idNumber)){
                    $('#focus2').focus();
                    this.$message.warning('请输入正确的身份证号码!');
                    return false;
                }else if(!this.phone){
                    $('#focus3').focus();
                    this.$message.warning('请输入专家手机!');
                    return false;
                }else if(!isPoneAvailable(this.phone) && !checkPhone(this.phone)){
                    $('#focus3').focus();
                    this.$message.warning('请输入正确的专家手机!');
                    return false;
                }else if(this.age !=null && this.age !='' && !checkNumber(this.age)){
                    $('#focus9').focus();
                    this.$message.warning('请输入正确的年龄');
                    return false;
                }else{
                    if(this.ownerTitle == '新增评标专家'){
                        let object ={};
                        if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                            // 分包
                            object ={
                                entrySubcontractNumber:this.entrySubcontractNumber,
                                expertsMainId:this.expertsMainId,
                                expertName:this.expertName,// 专家姓名
                                sex:this.sex,// 性别
                                age:this.age,// 年龄
                                education:this.education,// 学历
                                idNumber:this.idNumber,// 身份证号码
                                position:this.position,// 职务
                                expertSource:this.expertSource,// 评标专家来源
                                company:this.company,// 工作单位
                                phone:this.phone,// 专家手机
                                certified:this.certified,// 职称/执业资格
                                expertType:this.expertType,// 专家类型
                                committeeJob:this.committeeJob,// 评标委员会担任工作
                                specialty:this.specialty,// 从事专业
                                type:'组建评标委员会',
                                deleteControl:'1',
                                moduleType:'组建评标委员会'
                            }
                        }else{
                            // 总包
                            object ={
                                projectCode:this.projectCode,
                                expertsMainId:this.expertsMainId,
                                expertName:this.expertName,// 专家姓名
                                sex:this.sex,// 性别
                                age:this.age,// 年龄
                                education:this.education,// 学历
                                idNumber:this.idNumber,// 身份证号码
                                position:this.position,// 职务
                                expertSource:this.expertSource,// 评标专家来源
                                company:this.company,// 工作单位
                                phone:this.phone,// 专家手机
                                certified:this.certified,// 职称/执业资格
                                expertType:this.expertType,// 专家类型
                                committeeJob:this.committeeJob,// 评标委员会担任工作
                                specialty:this.specialty,// 从事专业
                                type:'组建评标委员会',
                                deleteControl:'1',
                                moduleType:'组建评标委员会'
                            }
                        }
                        this.$axios({
                            method: "POST",
                            url: baseUrl+"/ownerExpertsController/saveExperts",
                            data:object
                        }).then(res=>{
                            if(res.data.status == 200){
                                this.addPeopleFlag = false;
                                let obj={}
                                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                                    // 入场项目分包编号
                                    obj={
                                        entrySubcontractNumber:this.projectObj.totalProjectId,
                                        type:'组建评标委员会'
                                    }
                                }else{
                                    // 入场项目编号
                                    obj ={
                                        projectCode:this.projectObj.totalProjectId,
                                        type:'组建评标委员会'
                                    }
                                }
                                this.$axios({
                                    method: "POST",
                                    url: baseUrl+"/ownerExpertsController/selectCommitteeState",
                                    data:obj
                                }).then(res=>{
                                    if(res.data.status == 200){
                                        this.expertsMainId = res.data.data.expertsMainId;
                                        this.$axios({
                                            method: "POST",
                                            url: baseUrl+"/ownerExpertsController/selectExpertsList",
                                            data:{
                                                expertsMainId:this.expertsMainId,
                                                deleteControl:'1'
                                            }
                                        }).then(res=>{
                                            if(res.data.status == 200){
                                                this.ownerList = res.data.data;
                                            }else{
                                                console.log(res.data.msg);
                                            }
                                        }).catch(err=>{
                                            console.log(err)
                                        })
                                    }else{
                                        this.$message.warning(res.data.msg);
                                    }
                                }).catch(err=>{
                                    console.log(err)
                                })
                            }else{
                                this.$message.warning(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                }
            }else if(this.ownerTitle == '修改评标专家'){
                if(!this.expertName && !getName(this.expertName)){
                    $('#focus1').focus();
                    this.$message.warning('请输入专家姓名');
                    return false;
                }else if(!this.idNumber){
                    $('#focus2').focus();
                    this.$message.warning('请输入身份证号码!');
                    return false;
                }else if(!getIdcard(this.idNumber)){
                    $('#focus2').focus();
                    this.$message.warning('请输入正确的身份证号码!');
                    return false;
                }else if(!this.phone){
                    $('#focus3').focus();
                    this.$message.warning('请输入专家手机!');
                    return false;
                }else if(!isPoneAvailable(this.phone) && !checkPhone(this.phone)){
                    $('#focus3').focus();
                    this.$message.warning('请输入正确的专家手机!');
                    return false;
                }else if(this.age !=null && this.age !='' && !checkNumber(this.age)){
                    $('#focus9').focus();
                    this.$message.warning('请输入正确的年龄');
                    return false;
                }else{
                    // 修改评标专家
                    let object = {
                        expertsId:this.expertsId,
                        expertName:this.expertName,// 专家姓名
                        sex:this.sex,// 性别
                        age:this.age,// 年龄
                        education:this.education,// 学历
                        idNumber:this.idNumber,// 身份证号码
                        position:this.position,// 职务
                        expertSource:this.expertSource,// 评标专家来源
                        company:this.company,// 工作单位
                        phone:this.phone,// 专家手机
                        certified:this.certified,// 职称/执业资格
                        expertType:this.expertType,// 专家类型
                        committeeJob:this.committeeJob,// 评标委员会担任工作
                        specialty:this.specialty,// 从事专业
                        type:'组建评标委员会',
                        deleteControl:'1'
                    }
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/ownerExpertsController/update",
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.addPeopleFlag = false;
                            let object={}
                            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                                // 入场项目分包编号
                                object={
                                    entrySubcontractNumber:this.projectObj.totalProjectId,
                                    type:'组建评标委员会'
                                }
                            }else{
                                // 入场项目编号
                                object ={
                                    projectCode:this.projectObj.totalProjectId,
                                    type:'组建评标委员会'
                                }
                            }
                            return this.$axios({
                                method: "POST",
                                url: baseUrl+"/ownerExpertsController/selectCommitteeState",
                                data:object
                            }).then(res=>{
                                if(res.data.status == 200){
                                    this.expertsMainId = res.data.data.expertsMainId;
                                    this.$axios({
                                        method: "POST",
                                        url: baseUrl+"/ownerExpertsController/selectExpertsList",
                                        data:{
                                            expertsMainId:this.expertsMainId,
                                            deleteControl:'1'
                                        }
                                    }).then(res=>{
                                        if(res.data.status == 200){
                                            this.ownerList = res.data.data;
                                        }else{
                                            console.log(res.data.msg);
                                        }
                                    }).catch(err=>{
                                        console.log(err)
                                    })
                                }else{
                                    this.$message.warning(res.data.msg);
                                }
                            }).catch(err=>{
                                console.log(err)
                            })
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            }
        },
        // 新增评标专家
        addPeople(){
            this.addPeopleFlag = true;
            this.ownerTitle = '新增评标专家'
            this.expertName='';// 专家姓名
            this.sex='';// 性别
            this.age='';// 年龄
            this.education='';// 学历
            this.idNumber='';// 身份证号码
            this.position='';// 职务
            this.expertSource='';// 评标专家来源
            this.company='';// 工作单位
            this.phone='';// 专家手机
            this.certified='';// 职称/执业资格
            this.expertType='';// 专家类型
            this.committeeJob='';// 评标委员会担任工作
            this.specialty='';// 从事专业
            
        },
        // 新增评标专家  ---> 关闭
        closeAddPeople(){
            this.addPeopleFlag = false;
        },
        // 评标专家 ---> 多选框
        handelOwnerInfo(val) {
            this.multipleOwnerData = val;
        },
        // 删除评标专家
        deletePeople(){
            let arr =[];
            this.multipleOwnerData.forEach(item=>{
                arr.push(item.expertsId)
            })
            if(arr.length <= 0){
                this.deleteBox = true;
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/ownerExpertsController/deleteExperts",
                    data:{
                        listExpertsId:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        let object={}
                            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                                // 入场项目分包编号
                                object={
                                    entrySubcontractNumber:this.projectObj.totalProjectId,
                                    type:'组建评标委员会'
                                }
                            }else{
                                // 入场项目编号
                                object ={
                                    projectCode:this.projectObj.totalProjectId,
                                    type:'组建评标委员会'
                                }
                            }
                            return this.$axios({
                                method: "POST",
                                url: baseUrl+"/ownerExpertsController/selectCommitteeState",
                                data:object
                            }).then(res=>{
                                if(res.data.status == 200){
                                    this.expertsMainId = res.data.data.expertsMainId;
                                    this.$axios({
                                        method: "POST",
                                        url: baseUrl+"/ownerExpertsController/selectExpertsList",
                                        data:{
                                            expertsMainId:this.expertsMainId,
                                            deleteControl:'1'
                                        }
                                    }).then(res=>{
                                        if(res.data.status == 200){
                                        this.ownerList = res.data.data;
                                        }else{
                                            console.log(res.data.msg);
                                        }
                                    }).catch(err=>{
                                        console.log(err)
                                    })
                                }else{
                                    this.$message.warning(res.data.msg);
                                }
                            }).catch(err=>{
                                console.log(err)
                            })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        // 初始化查询
        getInitInfo(flag){
             let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    type:'组建评标委员会'
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    type:'组建评标委员会'
                }
            }
            return this.$axios({
				method: "POST",
				url: baseUrl+"/ownerExpertsController/selectCommitteeState",
				data:object
			}).then(res=>{
				if(res.data.status == 200){
                    if(res.data.data == null || res.data.data.state == null){
                        this.writeFlag = true;
                        this.showFlag = false;
                    }else if (res.data.data.state == '编辑中' || res.data.data.state == '办理未通过'){
                        this.writeFlag =false;
                        this.showFlag = true;
                    }else{
                        this.showFlag =true;
                        this.headerBtn =false;
                        this.writeFlag = false;
                    }
                    this.stateItem = res.data.data.state;// 全局定义后端返回的状态
                    this.expertsMainId = res.data.data.expertsMainId;
				}else{
					console.log(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 评标专家查询
        getownerInfo(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/ownerExpertsController/selectExpertsList",
				data:{
                    expertsMainId:this.expertsMainId,
                    deleteControl:'1'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.ownerList = res.data.data;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
            })
            this.$axios({
                method: "POST",
                url: baseUrl+"/AvoidInforController/selectList",
                data:{
                    expertsMainId:this.expertsMainId,
                }
            }).then(res=>{
                if(res.data.status == 200){
                this.avoidData = res.data.data.data;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        async getData(){
            await this.getInitInfo();
            this.getownerInfo();
            this.getmanageInfo();
        },
        // 回避信息 ---> 信息查询
        // async getAvoidinfo(){
        //     this.$axios({
        //         method: "POST",
        //         url: baseUrl+"/AvoidInforController/selectList",
        //         data:{
        //             expertsMainId:this.expertsMainId,
        //         }
        //     }).then(res=>{
        //         if(res.data.status == 200){
        //         this.avoidData = res.data.data.data;
        //         }else{
        //             this.$message.warning(res.data.msg);
        //         }
        //     }).catch(err=>{
        //         console.log(err)
        //     })
        // },
        // 下拉框所有的接口
        // 评标专家来源
        // getexpertSource(){
        //     this.$axios({
		// 		method: "POST",
		// 		url: baseUrl+"/interfaceTableController/selectByname",
		// 		data:{
        //             dropDownBox:'评标专家来源'
		// 		}
		// 	}).then(res=>{
		// 		if(res.data.status == 200){
        //            this.expertSourceList = res.data.data.data;
		// 		}else{
		// 			this.$message.warning(res.data.msg);
		// 		}
		// 	}).catch(err=>{
		// 		console.log(err)
		// 	})
        // },
        // 学历
        geteducation(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'学历'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.educationList = res.data.data.data;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 专家类型
        getexpertType(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'专家类型'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.expertTypeList = res.data.data.data;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 职称/执业资格
        getcertified(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'职称/执业资格'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.certifiedList = res.data.data.data;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        //评标委员会担任工作
        getcommitteeJob(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'评标委员会担任工作'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.committeeJobList = res.data.data.data;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        //回避原因
        getavoidReason(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'回避原因'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.avoidReasonList = res.data.data.data;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName);
        },
        // 招标人评委相关证明附件
        getOneList(){
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                var obj={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'招标人评委相关证明'
                }
            }else{
                var obj={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'招标人评委相关证明'
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
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            }) 
        },
        //上传列表
        uploadList(){
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                var obj={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'招标人评委相关证明'
                }
            }else{
                var obj={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'招标人评委相关证明'
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
                    this.$message.warning(res.data.msg);
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
                this.$message.warning('请选择要删除的文件!')
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
                    this.$message.warning(res.data.msg);
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
                this.$message.warning('图片大小不能超过102400000KB');
                return false;
            }
            this.$refs.file.value = null;
            this.files = file;
            var formData = new FormData();
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '招标人评委相关证明');
            }else{
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '招标人评委相关证明');
            }
            
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/multifileUpload',
                data:formData
            }).then(res=>{
                if(res.data.status == 200){
                    this.uploadList();
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
    }
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
/* 挑选页面 */
.searchWrapper,.lookWrapper,.winWrapper,.addWrapper,.addPage{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
	
}
.pickWrapper,.choisePage{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding:80px 200px;
    display: flex;
    flex-direction: column;
}
.pickBox,.searchBox,.lookBox,.winBox,.addBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
.el-collapse{
    width: 80%;
    margin: 10px auto;
}
.notic,h6,b{
    color:red;
}
/* 清空信息 */
.clear{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
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
.infobox_footer{
    width: 100%;
    text-align: end;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success,.el-icon-question,.el-icon-warning{
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
/* 评标专家 */
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
    top: 94%;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 200px;
    height: 40px;
}
.btn_choise{
    width:100%;
    height: 35px;
    padding:0 40px;
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
.editBtn{
	height: 35px;
}
</style>