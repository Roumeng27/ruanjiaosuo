<template>
    <!-- 项目分包 -->
    <div class="newBox">
        <!-- 主页面 -->
        <div class="wrapper">
            <div class="box">
                <button class="btn" @click="newManage">新增项目分包</button>
                <el-radio-group v-model="radio" size="small" @change="changeRadio">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="编辑中">编辑中</el-radio>
                    <el-radio label="待办理">待办理</el-radio>
                    <el-radio label="办理通过">办理通过</el-radio>
                    <el-radio label="办理未通过">办理未通过</el-radio>
                </el-radio-group> 
            </div>
             <!-- 搜索的输入框 -->
            <div class="editItem">
                <div class="editCenter">
                    <div class="editName">采购项目(分包)名称：</div>
                    <div class="editContent">
                        <el-input v-model="name" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                    </div>
                </div>
                <div class="editCenter">
                    <div class="editName">入场项目(分包)编号：</div>
                    <div class="editContent">
                        <el-input v-model="number" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                     </div>
                </div>
                <div class="editBtn">
                    <button class="btn" @click="searchList">搜索</button>
                </div>
            </div>
            <!-- 项目分包列表页面 -->
            <div class="main_info">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" label="序号" :index="typeIndex" width="70">
                    </el-table-column>
                    <el-table-column prop="entrySubcontractNumber" :show-overflow-tooltip ="true" label="入场项目分包编号" width="180">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="采购项目名称">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="采购项目编号">
                    </el-table-column>
                    <el-table-column prop="subcontractName" :show-overflow-tooltip ="true" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="subcontractingState" label="状态">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <i class="el-icon-search" style="cursor:pointer;" @click="lookOver(scope.row,2)" v-if="scope.row.subcontractingState == '办理通过'"></i>
                            <i class="el-icon-edit" style="cursor:pointer;" @click="lookOver(scope.row,1)" v-else></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页器 -->
            <div class="pagination" v-if="this.pages>1">
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

        <!--挑选项目 -->
        <div class="addWrapper" v-show="addFlag">
            <div class="addBox">
                <div class="add_title">
                    <p>挑选项目</p>
                    <i class="el-icon-close" @click="closeAdd"></i>
                </div>
                <div class="main_info">
                    <div class="table_list">
                        <el-table :data="pickData" stripe style="width: 100%">
                            <el-table-column  label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column prop="totalProjectId" :show-overflow-tooltip ="true" label="入场项目编号" width="150">
                            </el-table-column>
                            <el-table-column prop="nameOfTenderProject" :show-overflow-tooltip ="true" label="采购项目名称">
                            </el-table-column>
                            <el-table-column prop="biddingProjectNumber" :show-overflow-tooltip ="true" label="采购项目编号">
                            </el-table-column>
                            <el-table-column prop="tenderPurchaserName" :show-overflow-tooltip ="true" label="招标(采购)人">
                            </el-table-column>
                            <el-table-column prop="biddingProcurementMode" :show-overflow-tooltip ="true" label="招标采购方式">
                            </el-table-column>
                            <el-table-column prop="state" label="状态">
                            </el-table-column>
                            <el-table-column prop="operation" label="操作">
                                <template slot-scope="scope">
                                    <i class="el-icon-plus" style="cursor: pointer;" @click="getDetail(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>

        <!-- 保存和下一步 -->
        <div class="newaddWrapper" v-show="writeFlag">
            <div class="newaddBox">
                <div class="newadd_title">
                    <p>{{caseTitle}}</p>
                    <i class="el-icon-close" @click="closeNewadd"></i>
                </div>
                <div class="boxTitle">
                    <button class="btn" @click="saveInfo(1)">保存</button>
                    <button class="btn" @click="saveInfo(2)">下一步</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!--采购项目信息 -->
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
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectId}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目类型：</div>
                                        <div class="editContent">{{typesOfBiddingProjects}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标采购方式：</div>
                                        <div class="editContent">{{biddingProcurementMode}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)组织方式：</div>
                                        <div class="editContent">{{biddingOrganization}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 分包信息 -->
                        <el-collapse-item title="分包信息" name="2">
                            <div class="edit_list">
                                <div class="editTitle">
                                    <button class="btn"  @click="editInfo(1)">新增</button>
                                    <button class="btn"  @click="deletesubpackageInfo">删除</button>
                                </div>
                                <div style="margin-top:10px;">
                                    <el-table
                                        ref="multipleTable"
                                        :data="subpackageInfo"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleSelectionChange">
                                        <el-table-column
                                            type="selection"
                                            width="55">
                                        </el-table-column>
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
                                            :show-overflow-tooltip ="true"
                                            prop="saveTime"
                                            label="创建时间">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="修改" width="100">
                                            <template slot-scope="scope">
                                                <i class="el-icon-edit"  style="cursor: pointer;" @click="editInfo(2,scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 相关分包信息 -->
                        <el-collapse-item title="相关分包信息" name="3">
                            <div class="edit_list">
                                <el-table
                                        ref="multipleTable"
                                        :data="aboutData"
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
                                            prop="projectSubcontractCreationTime"
                                            label="创建时间">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="查看" width="100">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search"  style="cursor: pointer;" @click="lookItem(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>

        <!-- 新增分包信息 -->
        <div class="infoWrapper" v-show="infoFlag">
            <div class="infoBox">
                <div class="info_title">
                    <p>{{newTitle}}</p>
                    <i class="el-icon-close" @click="closeInfo"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="saveSubpackageInfo">保存</button>
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
                                     <div class="editCenter">
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectId}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 分包信息 -->
                        <el-collapse-item title="分包信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>分包名称：</div>
                                        <div class="editContent">
                                            <el-input id="focus1" v-model="subcontractName" clearable></el-input>
                                        </div>
                                        <!-- <el-button plain @click="quicklyFill">快填</el-button> -->
                                         <div style="width:50px;"></div>
                                    </div>
                                </div>
                                <!-- <div class="editTime">
                                    <div class="editCenter">
                                        <div class="editName"></div>
                                        <div class="editContent" style="display:flex;justify-content:flex-start;">
                                            <el-button plain>挑选分包</el-button>
                                             <b style="color:#f00;">说明：若当前分包是由于采购异常产生的，请点击挑选分包；否则，请勿点击，直接填写即可</b>
                                        </div>
                                    </div>
                                </div> -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>分包内容：</div>
                                        <div class="editContent">
                                            <el-input id="focus2"  v-model="subcontractContents" type="textarea" :rows="1" readonly></el-input>
                                        </div>
                                        <el-button plain @click="pickInfo" >挑选</el-button>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购范围：</div>
                                        <div class="editContent">
                                            <el-input v-model="scopeOfTender" clearable></el-input>
                                        </div>
                                       <div style="width:50px;"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>分包控制金额：</div>
                                        <div class="editContent">
                                            <el-input id="focus3"  v-model="subcontractingControlAmount" clearable></el-input>
                                            <p>万元</p>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>资格审查方式：</div>
                                        <div class="editContent">
                                            <el-select id="focus4"   v-model="qualificationExaminationMethod" clearable placeholder="请选择" @change="currentSel">
                                                <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>电子化开评标：</div>
                                        <div class="editContent">
                                            <el-radio-group v-model="electronicBidEvaluation">
                                                <el-radio  label="是">是</el-radio>
                                                <el-radio  label="否">否</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>

        <!-- 查看详情 -->
		<div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
				<div class="look_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
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
                                    <div class="editCenter">
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{amountId}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--分包信息 -->
                        <el-collapse-item title="分包信息" name="2">
                            <div class="edit_list">
                                <!-- <div class="editItem">
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
                                </div> -->
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
        <!-- 下一步 -->
        <div class="nextWrapper" v-show="nextFlag">
            <div class="nextWrapperBox">
                <div class="nextWrapper_title">
                    <p>查看项目分包</p>
                    <i class="el-icon-close" @click="closeNext"></i>
                </div>
                <div class="editTitle" v-show="headerBtn">
                    <button class="btn" @click="backTo">上一步</button>
                    <button class="btn" @click="submitInfo">提交</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 采购项目信息 -->
                        <el-collapse-item title="采购项目信息" name="1">
                            <div class="edit_list">
                                <!-- <div class="editItem">
                                    <div class="editCenter" style="color:#f00;">
                                        <div class="editName">项目编号(赋码)：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter" style="color:#f00;">
                                        <div class="editName">采购项目编号(赋码)：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div> -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{amountId}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目类型：</div>
                                        <div class="editContent">{{typesOfBiddingProjects}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标采购方式：</div>
                                        <div class="editContent">{{biddingProcurementMode}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购组织方式：</div>
                                        <div class="editContent">{{biddingOrganization}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 附件 -->
                        <el-collapse-item title="附件" name="2">
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
                                <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem !='待办理' && this.stateItem != '办理通过'">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                    </template>
                                </el-table-column>
                            </el-table> 
                        </el-collapse-item>
                        <!-- 分包信息 -->
                        <el-collapse-item title="分包信息" name="3">
                            <div class="edit_list">
                                <el-table
                                    ref="multipleTable"
                                    :data="subpackageInfo"
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
                                        :show-overflow-tooltip ="true"
                                        prop="saveTime"
                                        label="创建时间">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="查看" width="100">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                         <!-- 相关分包信息 -->
                        <el-collapse-item title=" 相关分包信息" name="4">
                            <div class="edit_list">
                                <el-table
                                    ref="multipleTable"
                                    :data="aboutData"
                                    style="width: 100%"
                                    >
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
                                        :show-overflow-tooltip ="true"
                                        prop="projectSubcontractCreationTime"
                                        label="创建时间">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="查看" width="100">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="5">
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

        <!-- 快填分包信息 -->
        <!-- <div class="quickWrapper" v-show="quickFlag">
            <div class="quickBox">
                <div class="quick_title">
                    <p>分包列表</p>
                    <i class="el-icon-close" @click="closeQuick"></i>
                </div>
                 <div class="pick_input">
                    <div class="noteItem">
                        <div class="noteLeft" style="width:150px;">分包名称：</div>
                        <div class="write_input" >
                            <el-input v-model="newName" placeholder="请输入内容" clearable></el-input>
                        </div>
                    </div>
                    <div class="noteItem">
                        <div class="noteLeft" style="width:200px;">入场项目(分包)编号：</div>
                        <div class="write_input" >
                            <el-input v-model="newNumber" placeholder="请输入内容" clearable></el-input>
                        </div>
                    </div>
                    <button class="owner_btn">搜索</button>
                </div>
                <div class="pick_main">
                     <el-table
                            ref="multipleTable"
                            :data="quickData"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column align="center" width="55" label="选" >
                            <template slot-scope="scope">
                                <el-radio :label="scope.row.bidCompany" v-model="templateRadio" @change.native="getTemplateQuick(scope.row)">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1  }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="ranking"
                            label="分包名称">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="入场项目(分包)编号">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="招标方式">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="分包控制金额(万元)">
                        </el-table-column>
                        <el-table-column
                            label="复制">
                            <template slot-scope="scope">
                                <i class="el-icon-plus" @click="copyQuick(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pick_btn">
                    <button class="btn" @click="quickSure">确定选择</button>
                </div>
            </div>
        </div> -->

        <!-- 挑选 -->
        <div class="pickWrapper" v-show="pickFlag">
            <div class="pickBox">
                <div class="pick_title">
                    <p>分包内容</p>
                    <i class="el-icon-close" @click="closePick"></i>
                </div>
                <div class="pick_input">
                    <div class="noteItem">
                        <div class="noteLeft" style="width:140px;">请输入查找关键字：</div>
                        <div class="write_input" >
                            <el-input v-model="newName" clearable  @keyup.enter.native="getPickInfo"></el-input>
                        </div>
                    </div>
                    <el-button plain @click="getPickInfo">检索</el-button>
                </div>
                <div class="main">
                    <el-tree
                        :data="groupTreeData"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="DeviceGroupTree"
                        highlight-current
                        :props="defaultProps"
                        @check="checkGroupNode"
                    >
                    </el-tree>
                </div>
                <div class="pick_btn">
                    <button class="btn" @click="pickSure">确定选择</button>
                </div>
            </div>
        </div>
        <!-- 文件上传 -->
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

         <!-- 警告信息弹窗 -->
        <el-dialog
            title="警告信息"
            :visible.sync="warnBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>{{warnTitle}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="warnSure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 成功提示弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="successBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>{{successTitle}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successSure(successTitle)">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import baseUrl from '../../api/api'
import '../../assets/css/style.css'
import {formatDate,isEmpty,checkNumber} from '../../api/base.js'
export default {
	components:{},
	props:{},
	data(){
		return {
            biddingPurchasingAgencyName:'',
            role_types:window.localStorage.role_types,
            stateItem:'',
            entrySubcontractNumber:"",//入场项目分包编号
            activeName:['1','2','3','4','5'],
            addFlag:false,// 新增项目 挑选项目
            writeFlag:false,// 新增项目分包
            // 新增分包信息所需字段
            infoFlag:false,//弹窗
            newTitle:'',// title名称
            caseTitle:'',// title名称
            // 查看相关分包信息详情所需字段
            lookFlag:false,// 弹窗
            //  下一步所需字段
            nextFlag:false,//弹窗
            headerBtn:true,// 控制按钮是否展示
            // 快填所需字段
            quickFlag:false,// 快填分包信息
            quickData:[],// 列表
            quickTemp:{},// 单选框对应的row
            templateRadio:'',//单选框列表
            // 挑选项目
            pickData:[],// 列表
            // 分包信息所需字段
            subpackageData:[],// 列表
             // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            tenderPurchaserName:'',// 招标(采购)人
            budgetAmount:'',// 招标项目预算金额
            biddingProcurementMode:'',// 招标方式
            entryName:'',//  招标项目名称
			subcontractContents:'',// 分包内容
            subcontractName:'',// 分包名称 
            scopeOfTender:'',// 招标范围
            subcontractingControlAmount:'',// 分包控制金额
            qualificationExaminationMethod:'',// 资格审查方式	
            electronicBidEvaluation:'是',// 是否电子招投标
            amountId:'',// 总包
            subcontractingState:"",//项目分包状态 
            projectSubcontractCreationTime:'',//创建时间
            totalProjectId:'',//入场项目编号
            amountOfBiddingProject:'',//招标项目金额
            typesOfBiddingProjects:'',//招标项目类型,
            biddingOrganization:'',//招标组织方式
            entrySubcontractNumberArr:[],// 存储分包信息所有的入场项目分包编号
            entrySubcontractNumberArrList:[],// 上传传入的项目编号数组
            // 警告弹窗
            warnBox:false,
            warnTitle:'',//  警告提示内容
            // 成功弹窗
            successBox:false,
            successTitle:'',// 成功提示弹窗
            subcontractItePrimaryKeyId:'',// 
            // 分页器
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
            total: 0, //总条数
            pages:0,// 后端返回的页数
            name:'',// 输入框招标项目(分包)名称
            number:'',
            radio: "", // 头部单选框
            input: "", //头部输入框
            tableData: [],//列表数据
            newName:'',//新增项目 名称
            newNumber:'',// 新增项目 编号
            options: [],// 下拉框
            multipleSelection: [],
            projectInformaPrimaryKeyId:'',// 详情ID
            subpackageInfo:[],// 修改项目分包 分包信息
            keyId:'',
            aboutData:[],// 相关分包信息数组
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            sum:0,// 分包控制金额总和
            totalProjectFunds:'',// 项目资金总额
            // 挑选所需字段
            pickFlag:false,// 弹窗
            // 四级菜单
            groupTreeData:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            readonly:true,// input 只可读不可编辑
            newString:'',// 四级多选框选中的
            // 文件上传所需字段
            enclosureData:[
                {
                    id:1,
                    appendixName: "采购项目相关附件",
                    attachlist: []
                }
            ],
            headerBtn:true,
            uploadFlag:false,//
            uploadTitle:'',
            state:'', 
            num:'',
            params_type:'',
            files:{},//文件
            fileName:'',//上传文件名称
            fileSize:'',//上传文件大小
            uploadingPeople:'',//上传人
            uploadTime:'',//上传时间
            fileData:[],//上传文件表格
            attachmeId:[],// 选中的ID
            num:'',
            saveTime:''
		}
	},
	created(){
        this.getInitList(); // 项目分包列表
	},
	methods:{
        // 分页器
		handleSizeChange(val) {
			// 每页条数
		},
		handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getInitList(); // 项目分包列表
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
		// 分包列表 --> 搜索
		searchList(){
            let obj = {};
			if(this.role_types == "招标(采购)人"){
                obj = {
                    entrySubcontractNumber:this.number,
                    subcontractName:this.name,
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'自行招标'
                }
            }else{
                obj = {
                    entrySubcontractNumber:this.number,
                    subcontractName:this.name,
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'委托招标'
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/subcontractItemController/selectList",
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data.list;
                    this.tableData.forEach(item=>{
                        item.biddingProjectNumber = item.projectInformationVo.biddingProjectNumber;//招标项目编号
                        item.nameOfTenderProject = item.projectInformationVo.nameOfTenderProject;// 招标项目名称
                    })
                    this.total = res.data.data.total;// 总条数
                    this.pages = res.data.data.pages;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
		// 项目分包列表
		getInitList(){
            let obj = {};
			if(this.role_types == "招标(采购)人"){
                obj = {
                    entrySubcontractNumber:this.number,
                    subcontractName:this.name,
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'自行招标'
                }
            }else{
                obj = {
                    entrySubcontractNumber:this.number,
                    subcontractName:this.name,
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'委托招标'
                }
            }
			this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectList",
				data:obj
			}).then(res=>{
				if(res.data.status == 200){
                    this.tableData = res.data.data.list;// 项目分包列表
                    this.tableData.forEach(item=>{
                        item.biddingProjectNumber = item.projectInformationVo.biddingProjectNumber;//招标项目编号
                        item.nameOfTenderProject = item.projectInformationVo.nameOfTenderProject;// 招标项目名称
                    })
                    this.total = res.data.data.total;// 总条数
                    this.pages = res.data.data.pages;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err);
			})
        },
        // 单选框查询项目分包列表 
		changeRadio(){
            let obj = {};
			if(this.role_types == "招标(采购)人"){
                obj = {
                    entrySubcontractNumber:this.number,
                    subcontractName:this.name,
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'自行招标'
                }
            }else{
                obj = {
                    entrySubcontractNumber:this.number,
                    subcontractName:this.name,
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'委托招标'
                }
            }
			this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectList",
				data:obj
			}).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data.list;
                    this.tableData.forEach(item=>{
                        item.biddingProjectNumber = item.projectInformationVo.biddingProjectNumber;//招标项目编号
                        item.nameOfTenderProject = item.projectInformationVo.nameOfTenderProject;// 招标项目名称
                    })
                    this.total = res.data.data.total;// 总条数
                    this.pages = res.data.data.pages;
                }else{
                    this.$message.warning(res.data.msg);
                }
			}).catch(err=>{
				console.log(err);
			})
		},
        // 查看项目分包列表
        lookOver(row,num){
            if(num == 1){
                // 编辑中
                // this.nextFlag = true;
                this.caseTitle = '修改项目分包';
                this.subcontractItePrimaryKeyId = row.subcontractItePrimaryKeyId;
                this.projectInformaPrimaryKeyId = row.projectInformaPrimaryKeyId;// 详情ID
            }else{
                // 查看
                // this.nextFlag = true;// 查看项目分包详情
                // this.headerBtn = false;// 按钮隐藏
            }
            if(row.subcontractingState == '' || row.subcontractingState == null){
				this.nextFlag = false;// 上一步和提交
				this.writeFlag = true;
			}else if(row.subcontractingState == '编辑中' || row.subcontractingState == '办理未通过'){
				this.nextFlag = true;// 上一步和提交
                this.writeFlag = false;
                this.headerBtn = true;
			}else{
				this.nextFlag = true;// 上一步和提交
				this.headerBtn = false;
                this.writeFlag = false;
                this.stateItem = row.subcontractingState;
            }
            this.entrySubcontractNumber  = row.entrySubcontractNumber;// 入场项目分包编号
            this.subcontractItePrimaryKeyId = row.subcontractItePrimaryKeyId;
            this.projectInformaPrimaryKeyId = row.projectInformationVo.projectInformaPrimaryKeyId
            this.getbiddingInfo(row.projectInformationVo.projectInformaPrimaryKeyId);// 招标项目信息
            this.getAboutList(row.projectInformationVo.totalProjectId);// 相关分包信息
            this.getmanageInfo(row.entrySubcontractNumber);// 办理记录
            this.getlookOverInfo(row.entrySubcontractNumber);// 首页项目分包列表  ----> 查看
            this.uploadList();
        },
        // 查看相关分包信息
        lookItem(row){
            this.lookFlag = true;
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
			this.subcontractName = row.subcontractName;// 分包名称 
			this.subcontractContents = row.subcontractContents;// 分包内容
			this.scopeOfTender = row.scopeOfTender;// 招标范围
			this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
			this.qualificationExaminationMethod = row.qualificationExaminationMethod;// 资格审查方式 
            this.electronicBidEvaluation = row.electronicBidEvaluation;// 是否电子招投标
        },
        // 首页项目分包列表  ----> 查看
        getlookOverInfo(entrySubcontractNumber){
            let lookArr = [];
            lookArr.push(entrySubcontractNumber)
            this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
				data:{
					projectEntrySubcontractNumbers:lookArr
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.subpackageInfo = res.data.data;// 项目分包列表
                    this.subpackageInfo.forEach(item=>{
                        item.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                    })
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        //新增项目
		newManage(){
            this.addFlag = true;// 新增项目 挑选项目
            this.caseTitle = '新建项目分包';
            this.getPickList();// 挑选项目列表
        },
        // 新增项目分包信息保存
        saveSubpackageInfo(){
            // this.sum  分包总额
            // this.totalProjectFunds 项目资金总额
            // parseInt(this.subcontractingControlAmount) 输入的项目分包控制金额
            // 判断字段是否为空
            if(!this.subcontractName) {
                $('#focus1').focus();
                this.$message.warning("请输入分包名称!");
                return false;
            }else if(!this.subcontractContents){
                $('#focus2').focus();
                this.$message.warning("请输入分包内容!");
                return false;
            }else if(this.subcontractingControlAmount =='' || this.subcontractingControlAmount ==null || !checkNumber(this.subcontractingControlAmount)){
                $('#focus3').focus();
                this.$message.warning("请输入正确的分包控制金额!");
                return false;
            }else if(!this.qualificationExaminationMethod){
                $('#focus4').focus();
                this.$message.warning("请输入资格审查方式!");
                return false;
            }else if(!this.electronicBidEvaluation){
                this.$message.warning("请输入电子化开评标!");
                return false;
            }else{
                //  if(Number(parseInt(this.subcontractingControlAmount))+Number(this.sum) > this.totalProjectFunds){
                //     this.warnBox = true;
                //     this.warnTitle = '分包金额之和不能超过项目投资总额，无法分包！';
                //  }else{
                    let object = {}
                    if(this.newTitle == '新增分包信息'){
                        object={
                            subcontractName:this.subcontractName,
                            subcontractContents:this.subcontractContents,
                            scopeOfTender:this.scopeOfTender,
                            subcontractingControlAmount:this.subcontractingControlAmount,
                            qualificationExaminationMethod:this.qualificationExaminationMethod,
                            electronicBidEvaluation:this.electronicBidEvaluation,
                            totalProjectId:this.totalProjectId,
                            subcontractItePrimaryKeyId:''
                        }
                    }else{
                        object={
                            subcontractName:this.subcontractName,
                            subcontractContents:this.subcontractContents,
                            scopeOfTender:this.scopeOfTender,
                            subcontractingControlAmount:this.subcontractingControlAmount,
                            qualificationExaminationMethod:this.qualificationExaminationMethod,
                            electronicBidEvaluation:this.electronicBidEvaluation,
                            totalProjectId:this.totalProjectId,
                            subcontractItePrimaryKeyId:this.keyId
                        }
                    }
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/subcontractItemController/save",
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.infoFlag =false;// 新建分包消息弹窗隐藏
                            let object = res.data.data;
                            this.keyId =  res.data.data.subcontractItePrimaryKeyId;
                            if(this.newTitle == '新增分包信息'){
                                this.subpackageInfo.push(object);
                                this.successBox = true;
                                this.successTitle = '新增分包信息成功!'
                            }else{
                                this.subpackageInfo.map((item,index)=>{
                                    if(item.subcontractItePrimaryKeyId == this.keyId){
                                        this.subpackageInfo.splice(index,1,object); 
                                    }
                                })
                                this.successBox = true;
                                this.successTitle = '修改分包信息成功!'
                            }
                            this.subpackageInfo.forEach((item,index)=>{
                                // 过滤时间格式
                                item.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                            })
                        }else if(res.data.status == 1002){
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                    // this.subcontractName ='';
                    // this.subcontractContents ='';
                    // this.scopeOfTender = '';
                    // this.subcontractingControlAmount = '';
                    // this.qualificationExaminationMethod='';
                    // this.electronicBidEvaluation  = '是';
                // }
            }
           
        },
        // 关闭弹窗
        handleClose(){
            this.warnBox = false;// 警告提示弹窗
            this.successBox = false;// 执行成功弹窗
        },
        // 警告提示确定
        warnSure(){
            this.warnBox = false;
        },
        // 执行成功确定
        successSure(successTitle){
            if(successTitle == '提交项目分包成功！'){
                this.nextFlag = false;// 下一步
                this.writeFlag = false;// 上一步
                this.addFlag = false;// 挑选项目
                this.successBox = false;
            }else{
                this.successBox = false;
            }
        },
        // 新增项目分包保存 传分包信息数组
        saveInfo(num){
            if(num == 1){
                // 保存
                this.saveNewsubpackageInfo(num);// 新建项目分包保存
            }else{
                // 下一步
                if(this.subpackageInfo.length <= 0){
                    this.warnTitle='您并未添加分包，请先添加分包信息!';
                    this.warnBox = true;
                    return false;
                }else{
                    this.saveNewsubpackageInfo(num);// 新建项目分包保存
                    this.nextFlag = true; // 下一步
                    this.writeFlag = false;// 上一步
                    this.getbiddingInfo(this.projectInformaPrimaryKeyId);// 招标项目信息
                    this.uploadList();
                }
            }
        },
        // 新建项目分包保存
        saveNewsubpackageInfo(num){
            // this.subpackageInfo.forEach(item=>{
            //     item.saveTime = new Date(item.saveTime).getTime();
            // })
            this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/nextStep",
				data:{
                   subcontractItemQueryList:this.subpackageInfo
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.subpackageInfo = res.data.data;
                    // 
                    this.subcontractItePrimaryKeyId = this.subpackageInfo[0].subcontractItePrimaryKeyId;
                    if(num == 1){
                        // 保存
                        this.successBox = true;// 执行成功弹窗
                        this.successTitle = '保存成功';
                        this.subpackageInfo.forEach(item=>{
                            item.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                        })
                    }else{
                        // 下一步
                        this.subpackageInfo.forEach(item=>{
                            item.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                        })
                    }
                    
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
            })
            setTimeout(()=>{
                this.getInitList(); // 项目分包列表
            },100)
        },
        // 关闭下一步
        closeNext(){
            this.nextFlag = false;// 下一步
            this.addFlag = false;// 新增项目 挑选项目
        },
        
        // 单个分包信息修改操作
        getEditItem(id){
             this.$axios({
				method: "GET",
				url: baseUrl+"/subcontractItemController/selectById?id"+"="+id
			}).then(res=>{
				if(res.data.status == 200){
                    this.subcontractName = res.data.data.subcontractName;
                    this.subcontractContents = res.data.data.subcontractContents;
                    this.scopeOfTender = res.data.data.scopeOfTender;
                    this.subcontractingControlAmount = res.data.data.subcontractingControlAmount;
                    this.qualificationExaminationMethod = res.data.data.qualificationExaminationMethod;
                    this.electronicBidEvaluation = res.data.data.electronicBidEvaluation;
                    this.keyId = res.data.data.subcontractItePrimaryKeyId;
                    this.updateTime = dayjs(res.data.data.updateTime).format('YYYY-MM-DD')
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
            })
        },
        // 查看项目分包  提交
        submitInfo(){
            let arr = [];
            this.subpackageInfo.forEach(item=>{
                let subcontractItemQuery={
                    entrySubcontractNumber:item.entrySubcontractNumber
                }
                arr.push(subcontractItemQuery) 
            })
            this.entrySubcontractNumberArr = arr;   
            this.$axios({
				method: "POST",
				url: baseUrl+'/subcontractItemController/projectSubcontractingSubmit',
				data:{
                    subcontractItemQueryList:this.entrySubcontractNumberArr,
                    subcontractingState:'待办理',
                    totalProjectId:this.totalProjectId
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.successBox = true;
                    this.successTitle = '提交项目分包成功！';
                    
                    this.getInitList(); // 项目分包列表
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 关闭查看相关分包信息
        closeLook(){
            this.lookFlag = false;
        },
        // 关闭新增项目
        closeAdd(){
            this.addFlag = false;// 新增项目 挑选项目
            this.getInitList(); // 项目分包列表
        },
        // 挑选项目操作
		getDetail(row){
            this.writeFlag = true;// 新增分包信息弹窗 
            this.projectInformaPrimaryKeyId = row.projectInformaPrimaryKeyId;// 详情ID
            this.subcontractItePrimaryKeyId = row.subcontractItePrimaryKeyId;
            this.subpackageInfo = [];
            this.getbiddingInfo(row.projectInformaPrimaryKeyId);// 招标项目信息
            this.getAboutList(row.totalProjectId); // 相关分包信息
        },
        // 关闭新增分包信息
        closeNewadd(){
            this.addFlag = false;// 新增项目 挑选项目
            this.writeFlag = false;// 新增分包信息弹窗 
        },
         // 新增分包信息
        editInfo(num,row){
            if(num == 1){
                // 新增
                this.infoFlag = true;
                this.newTitle = '新增分包信息';
                this.getbiddingInfo(this.projectInformaPrimaryKeyId)// 招标项目信息
                this.getSelectList();// 下拉框
                this.subcontractContents ='';// 分包内容
                this.subcontractName ='';// 分包名称 
                this.scopeOfTender ='';// 招标范围
                this.subcontractingControlAmount ='';// 分包控制金额
                this.qualificationExaminationMethod ='';// 资格审查方式	
                this.electronicBidEvaluation = '是';// 是否电子招投标
                
            }else{
                //修改
                this.infoFlag = true;
                this.newTitle = '修改分包信息';
                this.getEditItem(row.subcontractItePrimaryKeyId);// 单个分包信息修改操作
                this.getSelectList();// 下拉框
            }
        },
        // 上一步
        backTo(){
            this.nextFlag = false; // 下一步
            this.writeFlag = true;// 上一步
            this.getEditItem(this.subcontractItePrimaryKeyId);// 单个分包信息修改操作
            this.subpackageInfo.forEach((item,index)=>{
                    // 过滤时间格式
                    item.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                })
        },
        // 关闭新增分包信息
        closeInfo(){
            this.infoFlag= false;
            this.subcontractName='';
            this.subcontractContents='';
            this.scopeOfTender='';
            this.subcontractingControlAmount='';
            this.qualificationExaminationMethod='';
            this.electronicBidEvaluation='';
        },
		// 新增分包信息 ---> 快填
		// quicklyFill(){
        //     this.quickFlag = true;
        //     this.getInitList();// 分包列表
        // },
        // + 快填
        // copyQuick(row){
        //     this.quickFlag = false;
        //     this.subcontractName = row.subcontractName;
        //     this.subcontractContents = row.subcontractContents;
        //     this.scopeOfTender = row.scopeOfTender;
        //     this.controlMoney = row.subcontractingControlAmount;
        //     this.qualificationExaminationMethod = row.qualificationExaminationMethod;
        //     this.electronicBidEvaluation = row.electronicBidEvaluation;
        // },
        // getTemplateQuick(row){  
        //     this.quickTemp = row;
        // },
        // 快填确定选择
        // quickSure(){
        //     this.quickFlag = false;
        //     this.subcontractName = this.quickTemp.subcontractName;
        //     this.subcontractContents = this.quickTemp.subcontractContents;
        //     this.scopeOfTender = this.quickTemp.scopeOfTender;
        //     this.controlMoney = this.quickTemp.subcontractingControlAmount;
        //     this.qualificationExaminationMethod = this.quickTemp.qualificationExaminationMethod;
        //     this.electronicBidEvaluation = this.quickTemp.electronicBidEvaluation;
        // },
        // 新增分包信息 ---> 快填关闭
        // closeQuick(){
        //     this.quickFlag = false;
        // },
        // 新增分包信息 ---> 挑选
        pickInfo(){
            this.pickFlag = true;
            this.getlevelList();// 四级菜单
        },
        // 四级菜单
        getlevelList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/qualificationMenuController/queryMenuList",
                data:{
                        menuType:"企业资质要求"
                    }
            }).then(res=>{
                if(res.data.status == 200){
                    this.groupTreeData = res.data.data;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        getPickInfo(){
			this.$axios({
                method: "POST",
                url: baseUrl+"/qualificationMenuController/queryMenuList",
                data:{
					menuType:"企业资质要求",
					label:this.newName
				}
            }).then(res=>{
                if(res.data.status == 200){
                    this.groupTreeData = res.data.data;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
		},
        // 四级选中的内容
        checkGroupNode: function (a, b) {
            let arr = b.checkedNodes;
            let newArr = [];
            arr.forEach(item => {
                newArr.push(item.label)
            });
            this.newString = newArr.toString();
            if (b.checkedKeys.length > 0) {
                this.$refs.DeviceGroupTree.setCheckedKeys([a.id]);
            }
        },
        // 四级菜单 确定选择
        pickSure(){
            this.pickFlag = false;
            this.subcontractContents = this.newString;
        },
        closePick(){
            this.pickFlag = false;
        },
		currentSel(selVal){
            this.qualificationExaminationMethod = selVal;
        },
        // 多选框选择
		handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 删除分包信息
        deletesubpackageInfo(){
            let arr =[];
            this.multipleSelection.forEach(item=>{
                arr.push(item.subcontractItePrimaryKeyId)
            })
            if(this.multipleSelection.length<= 0){
                this.warnBox = true;
                this.warnTitle = '请选择需要删除的分包！';
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/subcontractItemController/deleteById",
                    data:{
                        ids:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        for (let i=0; i<this.subpackageInfo.length; i++) {  
                             for (let j=0; j<arr.length; j++) {
                                if (this.subpackageInfo[i].subcontractItePrimaryKeyId == arr[j]) {  
                                    this.subpackageInfo.splice(i, 1);    
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
        uploadshow(flag,name,num){
            this.uploadFlag = flag;
            this.params_type = name;
            this.num = num;
            this.uploadList();
        },
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName);
        },
        //上传列表
        uploadList(){
            var obj={
                    relevanceCorrelationId:this.subcontractItePrimaryKeyId,
                    fileType:'采购项目相关附件'
                }
            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/queryAttachme',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.fileData = res.data.data;
                    let arr = [];
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
            let arr = [];
            this.subpackageInfo.forEach(item=>{
                arr.push(item.subcontractItePrimaryKeyId)
            })
            this.entrySubcontractNumberArrList = arr;
            var file = event.target.files[0];
            var fileSize = file.size; 
            if(fileSize > 102400000) {
                this.$message.warning('图片大小不能超过102400000KB');
                return false;
            }
            this.$refs.file.value = null;
            this.files = file;
            var formData = new FormData();
            formData.append("projectIds", this.entrySubcontractNumberArrList);
            formData.append("file", this.files);
            formData.append("fileType",'采购项目相关附件');

            this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/multifilesUpload',
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
        // 下拉框
        getSelectList(){
            this.$axios({
				method: "POST",
				url: baseUrl+'/interfaceTableController/selectByname',
				data:{
                    dropDownBox:'资格审查方式'
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.options = res.data.data.data;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 招标项目信息
        getbiddingInfo(projectInformaPrimaryKeyId){
            this.$axios({
				method: "GET",
				url: baseUrl+"/projectInformationController/selectById/"+projectInformaPrimaryKeyId,
			}).then(res=>{
				if(res.data.status == 200){
                    this.totalProjectId = res.data.data.totalProjectId;// 入场项目编号
                    this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                    this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
                    this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
                    this.biddingOrganization = res.data.data.biddingOrganization;//  招标组织方式
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;//  招标项目编号
                    this.entryName= res.data.data.entryName;//  招标项目名称
                    this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人 
                    this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                    this.totalProjectFunds = res.data.data.totalProjectFunds;// 项目资金总额
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                    this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 办理记录
        getmanageInfo(entrySubcontractNumber){
            let object={
                    itemNumber:entrySubcontractNumber,
                    relatedId:this.subcontractItePrimaryKeyId
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
        // 挑选项目列表
        getPickList(){
            let obj = {};
			if(this.role_types == "招标(采购)人"){
                obj = {
                    state:'办理通过',
                    isSubcontracting:'是',
					pageNo:this.currentPage,
					pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'自行招标'
                }
            }else{
                obj = {
                    state:'办理通过',
                    isSubcontracting:'是',
					pageNo:this.currentPage,
					pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'委托招标'
                }
            }
            this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selectList",
				data:obj
			}).then(res=>{
				if(res.data.status == 200){
                    this.pickData = res.data.data.list;// 项目分包列表
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 分包信息
        getsubpackageList(totalProjectId){
            let obj = {};
			if(this.role_types == "招标(采购)人"){
                obj = {
                    totalProjectId:totalProjectId,// 入场项目（分包）编号
                    subcontractingState:'编辑中',
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'自行招标'
                }
            }else{
                obj = {
                    totalProjectId:totalProjectId,// 入场项目（分包）编号
                    subcontractingState:'编辑中',
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    procurementModes:["竞争性谈判", "竞争性磋商", "询价", "单一来源"],
                    biddingOrganization:'委托招标'
                }
            }
            this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectList",
				data:obj
			}).then(res=>{
                
				if(res.data.status == 200){
                    this.subpackageData = res.data.data.list;// 项目分包列表
                    this.subpackageData.forEach((item,index) => {
                        //  过滤时间格式
                        item.projectSubcontractCreationTime = formatDate(item.projectSubcontractCreationTime)
                    });
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 相关分包信息
        getAboutList(totalProjectId){
            this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectListByTotalProjectId",
				data:{
                    totalProjectId:totalProjectId,// 入场项目（分包）编号
                    pageNo:1,
					pageSize:100
				}
			}).then(res=>{
				if(res.data.status == 200){
                    let sum = 0;
                    this.aboutData = res.data.data.list;// 项目分包列表
                    this.aboutData.forEach((item,index) => {
                        //  过滤时间格式
                        item.projectSubcontractCreationTime = formatDate(item.projectSubcontractCreationTime)
                        sum += item.subcontractingControlAmount;
                    });
                    this.sum = sum;// 分包控制金额总和
				}else{
					this.$message.warning(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
	}
}
</script>
<style scoped>
.newBox {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
}
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.addWrapper{
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
.newaddWrapper,.nextWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
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
.infoWrapper{
     width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
}
.quickWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 100px 150px;
    display: flex;
    flex-direction: column;
}
.pickWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 80px 300px;
    display: flex;
    flex-direction: column;
}
.addBox,.newaddBox,.infoBox,.lookBox,.nextWrapperBox,.quickBox,.pickBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.add_title,.newadd_title,.info_title,.look_title,.nextWrapper_title,.quick_title,.pick_title{
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
.main_info{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.main{
    width: 100%;
    height: 310px;
    overflow: hidden;
    overflow-y: scroll;
}
.boxTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px 0 0;
    background: #e2e2e2;
}
.editTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px 0 0;
}
.el-collapse{
    width: 80%;
    margin: 10px auto;
}
.el-collapse-item__content{
    padding-bottom: 0 !important;
}
.box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
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
.star{
    color:#f00;
}
.pick_btn {
    position: absolute;
    left: 0;
    top: 415px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 120px;
    height: 40px;
}
/* 输入搜索框 */
.pick_input{
    width: 100%;
    padding: 0 30px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.write_input{
    width: 200px;
}
.write_input>.el-select{
    width: 250px;
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


.pagination {
  width: 100%;
  padding: 20px 60px ;
  display: flex;
  justify-content: flex-end;
}
.show{
    color: #6e622e;
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
    margin-left: 20px;
    font-size:18px;
}
    
/* 头部 */
.title{
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
.el-pagination__editor.el-input {
    width: 50px!important;
}
.editBtn{
	height: 35px;
}
.uploadWrapper{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
	position: fixed;
	left: 0;
	top:0;
	bottom: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
}
.uploadBox{
    width: 80%;
    height:70%;
    background: #fff;
    display: flex;
    flex-direction: column;
	position: relative;
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
</style>