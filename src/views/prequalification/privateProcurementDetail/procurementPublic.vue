<template>
    <div class="newBox" style="overflow-y:hidden;height:100%;">
        <div  v-show="passJudgeShow" style="overflow-y:hidden;height:100%;">
            <!-- 采购公示 -->
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
                                <!-- 7.29 -->
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
                                                <el-input v-model="agentPhone" id="focus8" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 总包信息 -->
                        <el-collapse-item title="采购信息" name="2" v-show="diffFlag">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购内容：</div>
                                        <div class="editContent">{{tenderContents}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">
                                            <el-input v-model="purchaseAmount" id="focus9" @blur="purposeNum()" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">拟定供应商名称：</div>
                                        <div class="editContent">
                                            <el-input v-model="developingSuppliersName" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">拟定供应商地址：</div>
                                        <div class="editContent">
                                            <el-input v-model="developingSuppliersAddress"  type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">拟采购货物/服务说明：</div>
                                        <div class="editContent">
                                            <el-input v-model="purchasePurposes"  type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">采用单一来源采购方式的原因及相关说明：</div>
                                        <div class="editContent">
                                            <el-input v-model="technologyQualifications"  type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 分包信息-->
                        <el-collapse-item title="分包信息" name="2" v-show="!diffFlag">
                            <div class="item_title">若需添加多分包，请点击 <i class="el-icon-plus" style="cursor:pointer;" @click="searchSubpackage"></i> 按钮</div>
                            <div class="table_box">
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
                                        prop="subcontractName"
                                        label="分包名称">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="subcontractingControlAmount"
                                        label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip = 'true'
                                        prop="entrySubcontractNumber"
                                        label="入场项目(分包)编号">
                                    </el-table-column>
                                    <el-table-column
                                        label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="采购内容">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit"  style="cursor: pointer;" @click="winItem(scope.row,scope.$index)"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="删除">
                                        <template slot-scope="scope">
                                            <i class="el-icon-close"  style="cursor: pointer;"  @click="deleteItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 公示内容 -->
                        <el-collapse-item title="公示内容" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>公示名称：</div>
                                        <div class="editContent">
                                            <el-input v-model="noticeName" id="focus4" clearable></el-input>
                                        </div>
                                        <p>采购公示</p>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>公示期限：</div>
                                        <div class="editContent">
                                            <el-date-picker id="focus5"  :picker-options="pickerOptions0" clearable  v-model="collectTime" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
                                            <el-input v-model="competentDepartmePhone" id="focus6" clearable></el-input>
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
                                            <el-input v-model="projectLeaderPhone" id="focus7" clearable></el-input>
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
                        </el-collapse-item>
                        <!-- 论证意见 -->
                        <el-collapse-item title="论证意见" name="4"  v-show="diffFlag">
                            <div class="edit_list">
                                <div style="margin-bottom:15px;">
                                    <button class="btn" style="padding:7px 20px;border-radius:3px;" @click="addAdvice()">新增</button>
                                    <button class="btn" style="padding:7px 20px;border-radius:3px;" @click="deleteAdvice()">删除</button>
                                </div>
                                <div>
                                    <el-table
                                        ref="multipleTable"
                                        :data="adviceData"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleDeleteChange">
                                        <el-table-column type="selection" width="55" align='center'>
                                        </el-table-column>
                                        <el-table-column
                                            label="序号">
                                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="personName"
                                            label="姓名">
                                        </el-table-column>
                                        <el-table-column
                                            prop="workUnit"
                                            label="工作单位">
                                        </el-table-column>
                                        <el-table-column
                                            prop="position"
                                            label="职称">
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">专业人员论证意见：</div>
                                            <div class="editContent">
                                                <el-input type="textarea" v-model="professionalOpinions"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div class="nextWrapper" v-show="nextFlag" style="overflow-y:hidden;height:100%;">
                <div class="box"  v-show="headerBtn">
                    <button class="btn" @click="laststep">上一步</button>
                    <button class="btn" @click="submitInfo">提交</button>
                </div>
                <div style="overflow-y:scroll;height:100%;">
                    <el-collapse v-model="activeName1" accordion>
                        <!--采购项目信息 -->
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
                                        <div class="editName">采购项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
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
                                <!-- 7.29 -->
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
                        <el-collapse-item title="附件" name="2" v-show="order">
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
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 附件 -->
                        <el-collapse-item title="附件" name="2" v-show="accessory">
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
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 分包信息 -->
                        <el-collapse-item title="分包信息" name="3" v-show="!diffFlag">
                            <div class="table_box">
                                <el-table :data="subpackageData" stripe style="width: 100%">
                                    <el-table-column  prop="index"  label="序号">
                                        <template slot-scope="scope">
                                            <span>{{scope.$index+1}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="subcontractName" :show-overflow-tooltip ="true" label="分包名称">
                                    </el-table-column>
                                    <el-table-column prop="subcontractingControlAmount" :show-overflow-tooltip ="true" label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column prop="entrySubcontractNumber" :show-overflow-tooltip ="true" label="入场项目(分包)编号">
                                    </el-table-column>
                                    <el-table-column label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="采购内容">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="bidDetail(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 总包信息 -->
                        <el-collapse-item title="采购信息" name="3" v-show="diffFlag">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购内容：</div>
                                        <div class="editContent">{{tenderContents}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">
                                            <span>{{purchaseAmount}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">拟定供应商名称：</div>
                                        <div class="editContent">
                                            <span>{{developingSuppliersName}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">拟定供应商地址：</div>
                                        <div class="editContent">
                                            <span>{{developingSuppliersAddress}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">拟采购货物/服务说明：</div>
                                        <div class="editContent">
                                            <span>{{purchasePurposes}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">采用单一来源采购方式的原因及相关说明：</div>
                                        <div class="editContent">
                                            <span>{{technologyQualifications}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 论证意见 -->
                        <el-collapse-item title="论证意见" name="4"  v-show="diffFlag">
                            <div class="edit_list">
                                <el-table
                                    ref="multipleTable"
                                    :data="adviceData"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="personName"
                                        label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="workUnit"
                                        label="工作单位">
                                    </el-table-column>
                                    <el-table-column
                                        :show-overflow-tooltip ="true"
                                        prop="position"
                                        label="职称">
                                    </el-table-column>
                                </el-table>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">专业人员论证意见：</div>
                                        <div class="editContent">
                                            <el-input type="textarea" v-model="professionalOpinions"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公示内容 -->
                        <el-collapse-item title="公示内容" name="5">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示名称：</div>
                                        <div class="editContent">{{noticeName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示期限：</div>
                                        <div class="editContent">{{enrollStartTime}} 至{{enrollEndTime}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示说明：</div>
                                        <div class="editContent">{{announcementThat}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主管部门全称：</div>
                                        <div class="editContent">{{competentDepartmentName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主管部门地址：</div>
                                        <div class="editContent">{{competentDepartmentAddress}} </div>
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
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{projectLeaderPhone}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 采购公示 -->
                        <el-collapse-item title="采购公示" name="6">
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
                                <!-- <div class="editItem">
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
                                </div> -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">采购人</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人全称：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人地址：</div>
                                        <div class="editContent">{{tendereeAddress}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购人联系方式：</div>
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
                                            <td colspan="3">{{subcontractNames}}</td>
                                        </tr>
                                        <tr v-show="!diffFlag">
                                            <td>入场项目(分包)编号</td>
                                            <td>{{entrySubcontractNumbers}}</td>
                                            <td>分包控制金额</td>
                                            <td>{{subcontractingControlAmounts}}万元</td>
                                        </tr>
                                        <tr v-show="diffFlag">
                                            <td>采购项目名称</td>
                                            <td colspan="3">{{nameOfTenderProject}}</td>
                                        </tr>
                                        <tr v-show="diffFlag">
                                            <td>入场项目编号</td>
                                            <td>{{biddingProjectNumber}}</td>
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
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="7">
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
           
            <!-- 查看分包信息详情 -->
            <div class="lookWrapper" v-show="lookFlag">
                <div class="lookBox">
                    <div class="look_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeLook"></i>
                    </div>
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
                                        <div class="editName">采购范围：</div>
                                        <div class="editContent">{{scopeOfTender}}</div>
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
                                        <div class="editContent">{{electronicBidEvaluation}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 上一步采购内容详情 -->
            <div class="winWrapper" v-show="winFlag">
                <div class="winBox">
                    <div class="win_title">
                        <p>采购内容</p>
                        <i class="el-icon-close" @click="closeWin"></i>
                    </div>
                    <div class="box">
                        <button class="btn" @click="savePage">保存</button>
                    </div>
                    <div class="main_info" style="height: 100%;overflow-y: scroll;">
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
                                            <div class="editName">入场项目编号：</div>
                                            <div class="editContent">{{amountId}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购项目金额：</div>
                                            <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">采购项目类型：</div>
                                            <div class="editContent">{{typesOfBiddingProjects}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购方式：</div>
                                            <div class="editContent">{{biddingProcurementMode}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">采购组织方式：</div>
                                            <div class="editContent">{{biddingOrganization}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 采购信息-->
                            <el-collapse-item title="采购信息" name="2">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">分包名称：</div>
                                            <div class="editContent">{{subcontractName}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">分包控制金额：</div>
                                            <div class="editContent">{{subcontractingControlAmount}}万元</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目分包编号：</div>
                                            <div class="editContent">{{entrySubcontractNumber}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购数量：</div>
                                            <div class="editContent">
                                                <el-input v-model="purchaseAmount"  @blur="purposeNum()" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">拟定供应商名称：</div>
                                            <div class="editContent">
                                                <el-input v-model="developingSuppliersName" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">拟定供应商地址：</div>
                                            <div class="editContent">
                                                <el-input v-model="developingSuppliersAddress" type="textarea" :rows="3"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">拟采购货物/服务说明：</div>
                                            <div class="editContent">
                                                <el-input v-model="purchasePurposes" type="textarea" :rows="3"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">采用单一来源采购方式的原因及相关说明：</div>
                                            <div class="editContent">
                                                <el-input v-model="technologyQualifications" type="textarea" :rows="3"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 论证意见 -->
                            <el-collapse-item title="论证意见" name="3">
                                <div class="edit_list">
                                    <div style="margin-bottom:15px;">
                                        <button class="btn" style="padding:7px 20px;border-radius:3px;"  @click="addAdvice()">新增</button>
                                        <button class="btn" style="padding:7px 20px;border-radius:3px;" @click="deleteAdvice()">删除</button>
                                    </div>
                                    <div>
                                        <el-table
                                                ref="multipleTable"
                                                :data="adviceData"
                                                tooltip-effect="dark"
                                                style="width: 100%"
                                                @selection-change="handleDeleteChange">
                                            <el-table-column type="selection" width="55" align='center'>
						                    </el-table-column>
                                            <el-table-column
                                                label="序号">
                                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                            </el-table-column>
                                            <el-table-column
                                                :show-overflow-tooltip ="true"
                                                prop="personName"
                                                label="姓名">
                                            </el-table-column>
                                            <el-table-column
                                                :show-overflow-tooltip ="true"
                                                prop="workUnit"
                                                label="工作单位">
                                            </el-table-column>
                                            <el-table-column
                                                :show-overflow-tooltip ="true"
                                                prop="position"
                                                label="职称">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div>
                                        <div class="editItem">
                                            <div class="editCenter">
                                                <div class="editName">专业人员论证意见：</div>
                                                <div class="editContent">
                                                    <el-input type="textarea" v-model="professionalOpinions"></el-input>
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
            <!-- 下一步招标内容详情 -->
            <div class="winWrapper" v-show="detailFlag">
                <div class="winBox">
                    <div class="win_title">
                        <p>采购内容</p>
                        <i class="el-icon-close" @click="closebidDetail"></i>
                    </div>
                    <!-- <div class="box">
                        <button class="btn" @click="savePage">保存</button>
                    </div> -->
                    <div style="height:100%;overflow-y:scroll;">
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
                                            <div class="editName">入场项目编号：</div>
                                            <div class="editContent">{{amountId}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购项目金额：</div>
                                            <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">采购项目类型：</div>
                                            <div class="editContent">{{typesOfBiddingProjects}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购方式：</div>
                                            <div class="editContent">{{biddingProcurementMode}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">采购组织方式：</div>
                                            <div class="editContent">{{biddingOrganization}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 采购信息-->
                            <el-collapse-item title="采购信息" name="2">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">分包名称：</div>
                                            <div class="editContent">{{subcontractName}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">分包控制金额：</div>
                                            <div class="editContent">{{subcontractingControlAmount}}万元</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目分包编号：</div>
                                            <div class="editContent">{{entrySubcontractNumber}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购数量：</div>
                                            <div class="editContent">
                                                <span>{{purchaseAmount}}</span>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">拟定供应商名称：</div>
                                            <div class="editContent">
                                                <span>{{developingSuppliersName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">拟定供应商地址：</div>
                                            <div class="editContent">
                                                <span>{{developingSuppliersAddress}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">拟采购货物/服务说明：</div>
                                            <div class="editContent">
                                                <span>{{purchasePurposes}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">采用单一来源采购方式的原因及相关说明：</div>
                                            <div class="editContent">
                                                <span>{{technologyQualifications}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 论证意见 -->
                            <el-collapse-item title="论证意见" name="3">
                                <div class="edit_list">
                                    <div>
                                        <el-table
                                                ref="multipleTable"
                                                :data="adviceData"
                                                tooltip-effect="dark"
                                                style="width: 100%">
                                            <el-table-column
                                                label="序号">
                                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="personName"
                                                label="姓名">
                                            </el-table-column>
                                            <el-table-column
                                                prop="workUnit"
                                                label="工作单位">
                                            </el-table-column>
                                            <el-table-column
                                                prop="position"
                                                label="职称">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div>
                                        <div class="editItem">
                                            <div class="editCenter">
                                                <div class="editName">专业人员论证意见：</div>
                                                <div class="editContent">{{professionalOpinions}} </div>
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
                    <div class="main_info">
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
                        <p class="star">★：附件上传大小限制为102400 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
                    </div>
                </div>
            </div>
            <!-- +分包信息 -->
            <div class="searchWrapper" v-show="searchFlag">
                <div class="searchBox">
                    <div class="search_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeSearch"></i>
                    </div>
                    <div class="search_main" style="padding:10px 0;">
                        <el-table
                                ref="multipleTable"
                                :data="markData"
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
                                prop="entrySubcontractNumber"
                                :show-overflow-tooltip = 'true'
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip = 'true'
                                label="采购项目名称">
                                <template slot-scope="scope">{{ nameOfTenderProject }}</template>
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="subcontractName"
                                label="分包名称">
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="subcontractContents"
                                label="分包分类">
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip ="true"
                                label="采购方式">
                                <template slot-scope="scope">{{ biddingProcurementMode }}</template>
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="subcontractingControlAmount"
                                label="分包控制金额(万元)">
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip ="true"
                                prop="subcontractingState"
                                label="分包状态">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pick_btn">
                        <button class="btn" @click="sureChoice">确定选择</button>
                    </div>
                </div>
            </div>
            <!-- 新增专业人员弹框 -->
            <div class="certificateWrapper" v-show="certificateFlag">
                <div class="certificateBox">
                    <div class="certificate_title">
                        <p>新增专业人员</p>
                        <i class="el-icon-close" style="cursor:pointer;" @click="closeCertificate"></i>
                    </div>
                    <div>
                        <button class="btn" style="padding:7px 25px;border-radius:3px;" @click="addSavePerson()">保存</button>
                        <button class="btn"  style="padding:7px 25px;border-radius:3px;" @click="closeCertificate()">取消</button>
                    </div>
                     <div class="main_info">
                        <el-collapse v-model="activeName" accordion>
                            <!-- 专业人员信息 -->
                            <el-collapse-item title="专业人员信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span style="color:#f00;">*</span>姓名：</div>
                                            <el-input id="focus1" v-model="personName"></el-input>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span style="color:#f00;">*</span>工作单位：</div>
                                            <el-input id="focus2"  v-model="workUnit"></el-input>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName"><span style="color:#f00;">*</span>职称：</div>
                                            <el-input id="focus3"  v-model="position"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
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
                <el-button type="primary" @click="saveBoxSure()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 点击上一步弹窗 -->
        <el-dialog
            title="信息确认"
            :visible.sync="laststepBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-question"></i>
                <span>修改信息将导致电子件列表中的 [采购公示] 重新生成，您确认要继续吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="laststepBoxSure()">确 定</el-button>
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
                <span>提交采购公示成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureSubmitInfo">确 定</el-button>
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
    import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkPhone,checkEmail,dubRemove,checkNumber,checkWord} from '../../../api/base.js'
    export default {
        data(){
            return {
                str_entrust_type:window.sessionStorage.str_entrust_type,
                agentPhone :'',
                agentAddress :"",
                biddingPurchasingAgencyName:'',//招标代理机构
                role_types:window.localStorage.role_types,
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
                developingSuppliersNames:'',//拟定供应商名称
                subcontractNames:'',
                entrySubcontractNumbers:'',// 入场项目分包编号
                subcontractingControlAmounts :'',
                value:'',
                tab_index_arr:[],
                developingSuppliersName:'',//拟定供应商名称
                developingSuppliersAddress:'',//拟定供应商地址
                adviceData:[],//论证意见表格
                professionalOpinions:'',//论证意见
                announcementThat:'',//公示说明
                competentDepartmentName:'',//主管部门全称
                competentDepartmentAddress:'',//主管部门地址
                responsiblePerson:'',//主管部门负责人
                competentDepartmePhone:'',//主管部门联系方式
                personName:'',//姓名
                workUnit:'',//工作单位
                position:'',//职称
                passJudgeShow:true,
                frameShow:false,
                tenderNoticeId:'',//查询或者下一步返回的Id
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:['1','2','3','4','5','5'],
                activeName1:['1','2','3','4','5','6','7'],
                nextFlag:false,// 只是展示数据页面
                headerBtn:true,// 头部按钮
                writeFlag:true,
                order:true,// 场地预约
                accessory:false,// 附件
                certificateFlag:false,// 企业资质要求弹窗
                certificateData:[],// 企业资质数据
                certificateBox:[],// 企业资质列表
                companyInfo:[],// 遍历获取label
                 companyQualifications:'',// 企业资质要求
                leaderFlag:false,// 项目负责人资质要求
                leaderData:[],// 项目负责人资质数据
                leaderBox:[],// 项目负责人资质列表
                leaderInfo:[],//遍历获取label
                managerQualifications:'',// 项目负责人资质条件
                checkedId:null,
                input:'',
                // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                tenderPurchaserName:'',// 招标(采购)人
                tendereeAddress:'',// 招标人地址
                tendereePhone:'',// 招标人联系方式
                budgetAmount:'',// 招标项目预算金额
                tenderContents:'',// 招标内容
                sourceOfFunds:'',// 资金来源
                // 资金构成
                stateOwnedFunds:'',//国有资金  
                stateOwnedFundsPercentage:'',// 国有资金百分比
                ownFunds:'',//自有资金
                ownFundsPercentage:'',// 自有资金百分比
                foreignGovernmentsAndOrganizationalFunds:'',//外国政府及组织资金
                foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国政府及组织资金百分比
                overseasPrivateInvestment:'',//境外私人投资
                overseasPrivateInvestmentPercentage:'',//境外私人投资百分比
                moneytype:'',// 资金类型
                // 分包信息所需字段
                purchaseAmount:'',// 采购数量
                purchasePurposes:'',// 采购用途
                technologyQualifications:'',// 简要技术要求
                applicantQualifications:'',// 投标人资格条件
                // 公告信息所需字段
                noticeName:'',// 公告名称
                enrollStartTime:'',// 报名开始时间
                enrollEndTime:'',// 报名结束时间
                collectTime:[],// 招标文件发售时间
                saleReceiveStartDate:'',// 招标文件发售时间开始时间
                saleReceiveEndDate:'',// 招标文件发售时间结束时间
                morningbegin:'8:00',// 上午开始时间
                morningend:'12:00',// 上午结束时间
                afterbegin:'14:00',// 下午开始时间
                afterend:'17:30',// 下午结束时间

                saleStartTime:'',// 上午发售时间
                saleEndTime:'',// 下午发售时间
                tenderDocumentsSaleSite:'',// 招标文件发售地点
                tenderDocumentsCost:'',// 招标文件工本费
                costAcceptAccount:'',// 工本费接收账户
                bidderData:'',// 投标人需提交资料
                bidEvaluationStandard:'',// 评标办法和标准
                projectLeader:'',//	项目负责人
                projectLeaderPhone:'',// 项目负责人联系方式
                remark:'',// 备注
                entrySubcontractNumber:'',// 分包项目编号
                projectCode:'',// 总包项目编号
                // 修改所需字段
                tenderInforId:'',// 主键ID
                // 保存弹窗所需字段
                saveBox:false,// 保存弹窗
                // 下一步公告内容所需字段
                submitTime:'',// 递交投标文件截止时间
                submitPlace:'',// 递交投标文件地点
                bidOpeningDate:'',//开标时间
                bidOpeningSite:'',//开标地点
                // 上一步弹窗
                laststepBox:false,
                // 分包信息所需字段
                subpackageData:[],// 分包列表
                subcontractName:'',//分包名称
                subcontractingControlAmount:'',// 分包控制金额
                // 确定提交
                sureSubmitBox:false,
                // 办理记录
                manageDate:[],
                creationTime:'',// 时间
                initList:[],// 初始化返回的数据
                makeList:[],// 场地预约返回的数据
                assessmentTime:'',// 保存和下一步的时候 场地预约开标时间
                openingTime:'',// 开标时间
                itemsList:[],// 返回的items
                diffFlag:false,// 
                // 分包信息
                scopeOfTender:'',// 招标范围
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                subcontractContents:'',// 分包内容
                totalProjectId:'',
                // 查看分包信息所需字段
                lookFlag:false,
                // 招标内容所需字段
                winFlag:false, 
                unitPrice:'',
                number:'',
                // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                tenderPurchaserName:'',// 招标(采购)人
                budgetAmount:'',// 招标项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',// 招标采购方式
                biddingOrganization:'',// 招标组织方式
                typesOfBiddingProjects:'',// 招标项目类型
                amountId:'',
                // + 分包信息
                searchFlag:false,
                multipleSelection:[],//多选框
                name:'',
                markData:[],
                areaList:[],// 保存传的items
                detailFlag:false,// 下一步招标内容详情弹窗
                stateItem:'',// 后端的状态
                itemTemp:{},
                initList:[],//查询返回的data值
                flag:false,// async控制一直请求接口
                creatorCompanyName:'',// 用户名字
                saveTime:'',// 保存时间
                // 文件上传所需字段
                enclosureData:[{
                    id:1,
                    appendixName: "*招标（采购）人确认函",
                    attachlist: []
                },
                {
                    id:2,
                    appendixName: "采购公示",
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
                alertMsg:'',
                currentPage:1,
                table_index:'',
            }
        },
        created(){
            this.getOneList();// 招标（采购）人确认函附件
            this.getTwoList();// 采购公示附件
            this.getOpenTime();// 开标时间
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                this.diffFlag = false;
                this.getsubInfo();// 初始化分包查询
            }else{
                // 总包
                this.diffFlag = true;
            }
            this.uploadList();//上传列表
            this.getDecideList();
            this.getData();
        },
        mounted(){
            this.getbiddingInfo();// 招标项目信息
        },
        methods:{
            purposeNum(){
                if(!checkWord(this.purchaseAmount)){
                    this.$message.warning('采购数量请输入文字或数字类型！');
                }
            },
            //新增专业人员
            addAdvice(){
                this.certificateFlag = true;
                this.personName = "";
                this.workUnit = "";
                this.position = "";
                if(this.adviceData == null){
                    this.adviceData = [];
                }
                
            },
            //专业人员保存
            addSavePerson(){
                if(!this.personName){
                    $('#focus1').focus();
                    this.$message.warning('请输入姓名');
                    return false;
                }else if(!this.workUnit){
                    $('#focus2').focus();
                    this.$message.warning('请输入工作单位');
                    return false;
                }else if(!this.position){
                    $('#focus3').focus();
                    this.$message.warning('请输入职称');
                    return false;
                }
                let obj = {
                    personName:this.personName,
                    workUnit:this.workUnit,
                    position:this.position
                }
                this.adviceData.push(obj);
                this.adviceData.map((item,index)=>{
                    item.tab_index = index + 1
                })
                this.certificateFlag = false;
            },
            //删除专业人员
            handleDeleteChange(val){
                let deleteArr = [];
                for(let i in val){
                    deleteArr.push(val[i].tab_index);
                }
                this.tab_index_arr = deleteArr;
            },
            deleteAdvice(){
                for(var i=0;i<this.adviceData.length;i++){
                    for(var j=0;j<this.tab_index_arr.length;j++){
                        if(this.adviceData[i].tab_index == this.tab_index_arr[j]){
                            this.adviceData.splice(i,1);
                        }
                    }
                }
            },
            //校验手机号联系方式
			blurPhone(num){
                if(num == 1){
                    // 招标项目信息的联系方式
                    if(!isPoneAvailable(this.tendereePhone) && !checkPhone(this.tendereePhone)){
                        this.$message.warning('请输入正确的联系方式！');
                    }
                }else{
                     // 公告信息的联系方式
                    if(!isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){
                        this.$message.warning('请输入正确的联系方式！');
                    }
                }
            },
            // 查看
            searchSubpackage(){
                this.searchFlag = true;
                this.getsubInfo();// 分包信息弹窗列表数据
            },
            // 分包信息查看
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
            newly(num){
                this.uploadList();
                // 保存
                if(!this.noticeName) {
                    $('#focus4').focus();
                    this.$message.warning("请输入公示名称！");
                    return false;
                }else if(this.collectTime.length == 0){
                    $('#focus5').focus();
                    this.$message.warning("请选择公示日期");
                    return false;
                }else if(this.competentDepartmePhone != '' && this.competentDepartmePhone != null && !isPoneAvailable(this.competentDepartmePhone) && !checkPhone(this.competentDepartmePhone)){
                    $('#focus6').focus();
                    this.$message.warning('请输入正确的联系方式！');
                    return false; 
                }else if(this.projectLeaderPhone != '' && this.projectLeaderPhone != null && !isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){ 
                    $('#focus7').focus();
                    this.$message.warning('请输入正确的联系方式！');
                    return false;
                }else if(this.agentPhone != '' && this.agentPhone != null && !isPoneAvailable(this.agentPhone) && !checkPhone(this.agentPhone)){ 
                    $('#focus8').focus();
                    this.$message.warning('请输入正确的联系方式！');
                    return false;
                }else if(this.purchaseAmount != '' && this.purchaseAmount != null && !checkWord(this.purchaseAmount)){
                    $('#focus9').focus();
                    this.$message.warning('采购数量请输入文字或数字类型！');
                    return false;
                }else{
                    if(num == 1){
                        this.areaList = [];
                        this.subpackageData.map((item,index)=>{
                            if(item.obj_detail){
                                this.areaList.push(item.obj_detail);
                            }else{
                                var object = {
                                    entrySubcontractNumber:item.entrySubcontractNumber,
                                    companyQualifications : '[]',
                                    managerQualifications : '[]',
                                }
                                this.areaList.push(object);
                            }
                        })
                        this.savebidding(num);// 保存
                    }else{
                        //  报名起始时间
                        this.enrollStartTime = changeTime(this.enrollStartTime);
                        this.enrollEndTime = changeTime(this.enrollEndTime);
                        // 采购文件发售时间
                        this.saleReceiveStartDate=changeTime(this.saleReceiveStartDate);
                        this.saleReceiveEndDate=changeTime(this.saleReceiveEndDate);
                        // 上午发售时间
                        let morningArr = [];
                        morningArr.push(this.morningbegin,this.morningend)
                        this.saleStartTime = morningArr.toString()
                        // 下午发售时间
                        let afterArr = [];
                        afterArr.push(this.afterbegin,this.afterend)
                        this.saleEndTime = afterArr.toString()
                        this.writeFlag = !this.writeFlag;
                        this.nextFlag = true;
                        this.areaList = [];
                        this.subpackageData.map((item,index)=>{
                            if(item.obj_detail){
                                this.areaList.push(item.obj_detail);
                            }else{
                                var object = {
                                    entrySubcontractNumber:item.entrySubcontractNumber,
                                    companyQualifications : '[]',
                                    managerQualifications : '[]',
                                }
                                this.areaList.push(object);
                            }
                        })
                        // 
                        this.writeFlag = false;
                        this.nextFlag = true;
                        this.savebidding(num);// 保存
                        this.getmanageInfo();// 办理记录
                    }
                }
            },
            // 下一步招标内容详情
            bidDetail(row){
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额
                this.detailFlag = true;
                this.areaList.forEach(item=>{
                    if(item.entrySubcontractNumber == row.entrySubcontractNumber ){
                        this.purchaseAmount=item.purchaseAmount;// 采购数量
                        this.purchasePurposes=item.purchasePurposes;// 拟采购货物
                        this.technologyQualifications=item.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                        this.developingSuppliersName=item.developingSuppliersName;// 拟定供应商名称
                        this.developingSuppliersAddress=item.developingSuppliersAddress;//地址
                        this.professionalOpinions = item.professionalOpinions//论证意见
                        this.adviceData = item.itemCareermans
                    }
                    this.itemTemp = item;
                })
            },
            // 下一步招标内容详情 关闭
            closebidDetail(){
                this.detailFlag = false;
            },
            // 招标内容
            winItem(row,table_index){
                this.table_index = table_index;
                if(this.initList.length != 0){
                    this.areaList.forEach(item=>{
                        if(item.entrySubcontractNumber == row.entrySubcontractNumber ){
                            this.technologyQualifications = item.technologyQualifications;// 简要技术要求
                            this.purchaseAmount = item.purchaseAmount;// 采购数量
                            this.purchasePurposes = item.purchasePurposes;// 采购用途
                            // 
                            this.developingSuppliersName=item.developingSuppliersName;// 拟定供应商名称
                            this.developingSuppliersAddress=item.developingSuppliersAddress;//地址
                            this.professionalOpinions = item.professionalOpinions;//论证意见
                            this.adviceData = item.itemCareermans
                        }
                        this.itemTemp = item;
                    })
                }else{
                    if(row.obj_detail){
                        this.purchaseAmount = row.obj_detail.purchaseAmount;
                        this.purchasePurposes = row.obj_detail.purchasePurposes;
                        this.technologyQualifications = row.obj_detail.technologyQualifications;// 简要技术要求
                        this.developingSuppliersName=row.obj_detail.developingSuppliersName;// 拟定供应商名称
                        this.developingSuppliersAddress=row.obj_detail.developingSuppliersAddress;//地址
                        this.professionalOpinions = row.obj_detail.professionalOpinions;//论证意见
                        this.adviceData = row.obj_detail.itemCareermans
                    }else{
                        this.purchaseAmount = '';
                        this.purchasePurposes = '';
                        this.technologyQualifications = '';
                        this.developingSuppliersName='';// 拟定供应商名称
                        this.developingSuppliersAddress= "";//地址
                        this.professionalOpinions = "";//论证意见
                        this.adviceData = [];
                    }
                }
                
                this.subcontractName = row.subcontractName;
                this.subcontractingControlAmount = row.subcontractingControlAmount;
                this.entrySubcontractNumber = row.entrySubcontractNumber;
                this.winFlag = true;
                // if(this.initList.length != 0){
                //     this.areaList.forEach(item=>{
                //         if(item.entrySubcontractNumber == row.entrySubcontractNumber ){
                //             this.purchaseAmount=item.purchaseAmount;// 采购数量
                //             this.purchasePurposes=item.purchasePurposes;// 拟采购货物
                //             this.technologyQualifications=item.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                //             this.developingSuppliersName=item.developingSuppliersName;// 拟定供应商名称
                //             this.developingSuppliersAddress=item.developingSuppliersAddress;//地址
                //             this.professionalOpinions = item.professionalOpinions;//论证意见
                //             this.adviceData = item.itemCareermans
                //             console.log(item)
                //         }
                //         this.itemTemp = item;
                //     })
                // }else{
                //     let obj = {
                //         entrySubcontractNumber:this.subcontractName,
                //         purchaseAmount : this.purchaseAmount,// 采购数量
                //         purchasePurposes : this.purchasePurposes,// 拟采购货物
                //         technologyQualifications : this.technologyQualifications,// 采用单一来源采购方式的原因及相关说明
                //         developingSuppliersName : this.developingSuppliersName,// 拟定供应商名称
                //         developingSuppliersAddress : this.developingSuppliersAddress,//地址
                //         professionalOpinions : this.professionalOpinions,//论证意见
                //         itemCareermans : this.adviceData
                //     }
                //     this.areaList.push(obj);
                // }
                // this.subcontractName = row.subcontractName;
                // this.subcontractingControlAmount = row.subcontractingControlAmount;
                // this.entrySubcontractNumber = row.entrySubcontractNumber;
                // this.winFlag = true;
            },
            // 招标内容 保存
            savePage(){
                if(this.purchaseAmount != '' && this.purchaseAmount != null && !checkWord(this.purchaseAmount)){
                    this.$message.warning('请输入正确的采购数量格式，文字或数字类型均可!');
                    return false;
                }
                // if(this.initList.length != 0){
                //     this.itemTemp.purchaseAmount=this.purchaseAmount;// 采购数量
                //     this.itemTemp.purchasePurposes=this.purchasePurposes;// 拟采购货物
                //     this.itemTemp.technologyQualifications=this.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                //     this.itemTemp.developingSuppliersName=this.developingSuppliersName;// 拟定供应商名称
                //     this.itemTemp.developingSuppliersAddress=this.developingSuppliersAddress;//地址
                //     this.itemTemp.professionalOpinions = this.professionalOpinions//论证意见
                //     this.itemTemp.itemCareermans = this.adviceData
                // }
                this.areaList = [];
                var obj = {
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    purchaseAmount :  this.purchaseAmount,
                    purchasePurposes : this.purchasePurposes,
                    technologyQualifications : this.technologyQualifications,
                    developingSuppliersName:this.developingSuppliersName,// 拟定供应商名称
                    developingSuppliersAddress:this.developingSuppliersAddress,//地址
                    professionalOpinions : this.professionalOpinions,//论证意见
                    itemCareermans : this.adviceData
                };
                this.subpackageData[this.table_index].obj_detail = obj;
                this.subpackageData.map((item,index)=>{
                    if(item.obj_detail){
                        this.areaList.push(item.obj_detail);
                    }else{
                        var object = {
                            entrySubcontractNumber:item.entrySubcontractNumber
                        }
                        this.areaList.push(object);
                    }
                })
                this.winFlag = false;
            },
            // 关闭招标内容
            closeWin(){
                this.winFlag = false;
            },
            // 多选框
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 关闭搜索
            closeSearch(){
                this.searchFlag = false;
            },
            // 分包列表  确定选择
            sureChoice(){
                let arr =[...this.subpackageData,...this.multipleSelection];
                this.subpackageData = this.removeData(arr,'entrySubcontractNumber');
                this.multipleSelection.map((item,index)=>{
                    var obj = {};
                    obj.entrySubcontractNumber = item.entrySubcontractNumber;
                    this.areaList.push(obj)
                })
                this.searchFlag = false;
            },
            // 删除一样值的方法
            removeData(arr,id){
                let hash = {};
                let newArr = arr.reduce((item,next)=>{
                    hash[next[id]]?'':hash[next[id]] = true && item.push(next);
                    return item;
                },[]);
                return newArr;
            }, 
            // 删除
            deleteItem(row){
                if(row.entrySubcontractNumber == this.projectObj.totalProjectId){
                    this.$message.warning('不可删除当前项目分包编号')
                    return;
                }else{
                    for (let i = 0; i < this.subpackageData.length; i++) {
                        let item = this.subpackageData[i];
                        if(row.subcontractItePrimaryKeyId == item.subcontractItePrimaryKeyId){
                            this.subpackageData.splice(i,1);
                        }
                    }
                    for(var i=0; i<this.areaList.length;i++){
                        var item = this.areaList[i];
                        if(row.entrySubcontractNumber == item.entrySubcontractNumber){
                            this.areaList.splice(i,1);
                        }
                    }
                }
                
            },  
            // 新增企业资质要求
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
            // 关闭企业资质要求
            closeCertificate(){
                this.certificateFlag = false;
            },
            checkGroupNode(a, b) {
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

            // 新增项目负责人资质要求
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
            closeLeader(){
                this.leaderFlag = false;
            },
            checkLeaderNode(a, b) {
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
            // 上一步按钮/
            laststep(){
                this.writeFlag = true;// 有保存和下一步的按钮
                this.nextFlag = false;// 有上一步和提交的按钮
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"采购公示",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"采购公示",
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                         if(res.data.status == 200){
                            this.initList = res.data.data;
                            this.initList.forEach(item=>{
                                this.agentPhone = item.agentPhone;
                                this.agentAddress = item.agentAddress;
                                this.tendereeAddress = item.tendereeAddress;// 招标人地址
                                this.tendereePhone = item.tendereePhone;// 招标人联系方式
                                this.noticeName = item.noticeName;// 公告名称
                                if(item.enrollStartTime == "" || item.enrollStartTime == null || item.enrollStartTime == 0){
                                    this.enrollStartTime = ""
                                }else{
                                    this.enrollStartTime = item.enrollStartTime;// 报名开始时间
                                };
                                if(item.enrollEndTime == "" || item.enrollEndTime == null || item.enrollEndTime == 0){
                                    this.enrollEndTime = ""
                                }else{
                                    this.enrollEndTime =item.enrollEndTime;// 报名结束时间
                                };
                                let arr = [];
                                arr.push(this.enrollStartTime,this.enrollEndTime);
                                this.collectTime = arr;
                                this.tenderDocumentsSaleSite = item.tenderDocumentsSaleSite;// 招标文件发售地点
                                this.tenderDocumentsCost = item.tenderDocumentsCost;// 招标文件工本费
                                this.costAcceptAccount = item.costAcceptAccount;// 工本费接收账户
                                this.bidderData = item.bidderData;// 投标人需提交资料
                                if(item.submitTime == "" || item.submitTime == null){
                                    this.submitTime = ""
                                }else{
                                    this.submitTime = formatTime(item.submitTime);// 递交截止时间
                                }
                                
                                this.submitPlace = item.submitPlace;// 递交投标文件地点
                                this.bidEvaluationStandard = item.bidEvaluationStandard;// 评标办法和标准
                                this.projectLeader = item.projectLeader;// 项目负责人
                                this.projectLeaderPhone = item.projectLeaderPhone;// 联系方式
                                this.remark = item.remark;// 备注
                                if(item.openingTime == "" || item.openingTime == null){
                                    this.openingTime = ""
                                }else{
                                    this.openingTime = formatTime(item.openingTime);// 开标时间
                                }

                                // 在上一步让招标文件发售时间 回显
                                this.collectTime = [];
                                this.saleReceiveStartDate = new Date(item.saleReceiveStartDate).getTime();// 招标文件发售开始时间
                                this.saleReceiveEndDate = new Date(item.saleReceiveEndDate).getTime();// 招标文件发售结束时间
                                if(item.enrollStartTime =='' || item.enrollStartTime == null || item.enrollStartTime == 0){
                                    this.enrollStartTime = '';
                                }else{
                                    this.enrollStartTime = item.enrollStartTime
                                }
                                if(item.enrollEndTime =='' || item.enrollEndTime == null || item.enrollEndTime == 0){
                                    this.enrollEndTime = '';
                                }else{
                                    this.enrollEndTime = item.enrollEndTime
                                }
                                this.collectTime.push(this.enrollStartTime,this.enrollEndTime)
                                
                                this.areaList = item.items;
                                this.areaList.forEach(area=>{
                                    if(area.entrySubcontractNumber != null && this.entrySubcontractNumber == area.entrySubcontractNumber){
                                        this.purchaseAmount=area.purchaseAmount;// 采购数量
                                        this.purchasePurposes=area.purchasePurposes;// 拟采购货物
                                        this.technologyQualifications=area.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                                        this.developingSuppliersName=area.developingSuppliersName;// 拟定供应商名称
                                        this.developingSuppliersAddress=area.developingSuppliersAddress;//地址
                                        this.professionalOpinions = area.professionalOpinions//论证意见
                                        if(area.itemCareermans == null){
                                            this.adviceData = [];
                                        }else{
                                            this.adviceData = area.itemCareermans
                                        }
                                    }else if(area.projectCode != null && this.projectObj.totalProjectId== area.projectCode){
                                        this.purchaseAmount=area.purchaseAmount;// 采购数量
                                        this.purchasePurposes=area.purchasePurposes;// 拟采购货物
                                        this.technologyQualifications=area.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                                        this.developingSuppliersName=area.developingSuppliersName;// 拟定供应商名称
                                        this.developingSuppliersAddress=area.developingSuppliersAddress;//地址
                                        this.professionalOpinions = area.professionalOpinions//论证意见
                                        if(area.itemCareermans == null){
                                            this.adviceData = [];
                                        }else{
                                            this.adviceData = area.itemCareermans
                                        }
                                    }
                                })    
                                this.tenderNoticeId = item.tenderNoticeId;
                                // 上午发售时间
                                if(item.saleStartTime == null){
                                    this.saleStartTime = ""
                                }else{
                                     this.saleStartTime = item.saleStartTime.split(',');
                                    this.morningbegin = this.saleStartTime[0];
                                    this.morningend = this.saleStartTime[1];
                                }
                                if(item.saleEndTime == null){
                                    this.saleEndTime = ""
                                }else{
                                    // 下午发售时间
                                    this.saleEndTime = item.saleEndTime.split(',');
                                    this.afterbegin = this.saleEndTime[0];
                                    this.afterend = this.saleEndTime[1];
                                }
                                
                            })
                        
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }else{
                        this.$message.warning(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 上一步弹窗 确定
            laststepBoxSure(){
                this.laststepBox = false;
                this.writeFlag = true;
                this.nextFlag = false;
            },
            // 提交按钮
            submitInfo(){
                if(this.enclosureData[0].attachlist == ""){
					this.$message.warning('请选择上传招标（采购）人确认函');
					return false;
				}
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/submit",
                    data:{
                        state:'待办理',
                        tenderNoticeId:this.tenderNoticeId,//查询或者下一步返回的Id
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.sureSubmitBox = true;
                        this.getInitInfo();// 初始化查询
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 确认提交 ---> 确定
            sureSubmitInfo(){
                this.sureSubmitBox = false;
                this.getmanageInfo();// 办理记录查询
            },
            // 保存
            savebidding(num){
                let objectData = {};
                // 入场项目(分包)编号
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){  
                    // 分包
                    if(this.initList.length != 0){
                        objectData={
                            noticeType:'采购公示',
                            tendereeAddress:this.tendereeAddress,
                            noticeName:this.noticeName,
                            tendereePhone:this.tendereePhone,
                            enrollStartTime:this.collectTime[0],//公示日期
                            enrollEndTime:this.collectTime[1],
                            announcementThat:this.announcementThat,//公示说明
                            competentDepartmentName:this.competentDepartmentName,//主管部门全称
                            competentDepartmentAddress:this.competentDepartmentAddress,//地址
                            responsiblePerson:this.responsiblePerson,//负责人
                            competentDepartmePhone:this.competentDepartmePhone,//联系方式
                            projectLeader:this.projectLeader,
                            projectLeaderPhone:this.projectLeaderPhone,
                            remark:this.remark,
                            tenderInforId:this.tenderInforId,
                            timeReference:this.projectObj.totalProjectId,
                            agentPhone :this.agentPhone,
                            agentAddress :this.agentAddress,
                            items:this.areaList
                        }
                    }else{
                        objectData={
                            noticeType:'采购公示',
                            tendereeAddress:this.tendereeAddress,
                            noticeName:this.noticeName,
                            agentPhone :this.agentPhone,
                            agentAddress :this.agentAddress,
                            tendereePhone:this.tendereePhone,
                            enrollStartTime:this.collectTime[0],//公示日期
                            enrollEndTime:this.collectTime[1],
                            announcementThat:this.announcementThat,//公示说明
                            competentDepartmentName:this.competentDepartmentName,//主管部门全称
                            competentDepartmentAddress:this.competentDepartmentAddress,//地址
                            responsiblePerson:this.responsiblePerson,//负责人
                            competentDepartmePhone:this.competentDepartmePhone,//联系方式
                            projectLeader:this.projectLeader,projectLeaderPhone:this.projectLeaderPhone,remark:this.remark,tenderInforId:this.tenderInforId,timeReference:this.projectObj.totalProjectId,
                            items:[{
                                entrySubcontractNumber:this.entrySubcontractNumber,
                                purchaseAmount:this.purchaseAmount,// 采购数量
                                purchasePurposes:this.purchasePurposes,// 拟采购货物
                                technologyQualifications:this.technologyQualifications,// 采用单一来源采购方式的原因及相关说明
                                developingSuppliersName:this.developingSuppliersName,// 拟定供应商名称
                                developingSuppliersAddress:this.developingSuppliersAddress,//地址
                                professionalOpinions:this.professionalOpinions,//论证意见
                                itemCareermans:this.adviceData
                            }]
                        }
                    }
                }else{
                    // 总包
                    objectData={
                        noticeType:'采购公示',
                        agentPhone :this.agentPhone,
                        agentAddress :this.agentAddress,
                        tendereeAddress:this.tendereeAddress,
                        noticeName:this.noticeName,
                        tendereePhone:this.tendereePhone,
                        enrollStartTime:this.collectTime[0],//公示日期
                        enrollEndTime:this.collectTime[1],
                        announcementThat:this.announcementThat,//公示说明
                        competentDepartmentName:this.competentDepartmentName,//主管部门全称
                        competentDepartmentAddress:this.competentDepartmentAddress,//地址
                        responsiblePerson:this.responsiblePerson,//负责人
                        competentDepartmePhone:this.competentDepartmePhone,//联系方式
                        purchaseAmount:this.purchaseAmount,// 采购数量
                        purchasePurposes:this.purchasePurposes,// 拟采购货物
                        technologyQualifications:this.technologyQualifications,// 采用单一来源采购方式的原因及相关说明
                        developingSuppliersName:this.developingSuppliersName,// 拟定供应商名称
                        developingSuppliersAddress:this.developingSuppliersAddress,//地址
                        professionalOpinions:this.professionalOpinions,//论证意见
                        itemCareermans:this.adviceData,
                        projectLeader:this.projectLeader,projectLeaderPhone:this.projectLeaderPhone,remark:this.remark,tenderInforId:this.tenderInforId,timeReference:this.projectObj.totalProjectId,
                        items:[{
                            projectCode:this.projectObj.totalProjectId,
                            purchaseAmount:this.purchaseAmount,// 采购数量
                            purchasePurposes:this.purchasePurposes,// 拟采购货物
                            technologyQualifications:this.technologyQualifications,// 采用单一来源采购方式的原因及相关说明
                            developingSuppliersName:this.developingSuppliersName,// 拟定供应商名称
                            developingSuppliersAddress:this.developingSuppliersAddress,//地址
                            professionalOpinions:this.professionalOpinions,//论证意见
                            itemCareermans:this.adviceData
                        }]
                    }
                }
                this.$axios({
				    method: "POST",
                    url: baseUrl+'/tenderNoticeController/saveOrUpdate',
                    data:objectData
                }).then(res=>{
                    if(res.data.status == 200){
                        // 保存弹窗
                        if(num ==1){
                            this.saveBox = true;
                        }else{
                            this.saveBox = false;
                        }
                        // 7.29
                        this.agentAddress  = res.data.data.agentAddress;
                        this.agentPhone = res.data.data.agentPhone;
                        // 所需字段
                        this.tendereeAddress=res.data.data.tendereeAddress;
                        this.tendereePhone=res.data.data.tendereePhone;
                        this.purchaseAmount=res.data.data.purchaseAmount;
                        this.purchasePurposes=res.data.data.purchasePurposes;
                        this.technologyQualifications=res.data.data.technologyQualifications;
                        this.noticeName=res.data.data.noticeName;
                        this.announcementThat=res.data.data.announcementThat;//公示说明
                        this.competentDepartmentName=res.data.data.competentDepartmentName;//主管部门全称
                        this.competentDepartmentAddress=res.data.data.competentDepartmentAddress;//地址
                        this.responsiblePerson=res.data.data.responsiblePerson;//负责人
                        this.competentDepartmePhone=res.data.data.competentDepartmePhone;//联系方式
                        //  报名起始时间
                        if(res.data.data.enrollStartTime == "" ||res.data.data.enrollStartTime == null){
                            this.enrollStartTime = ""
                        }else{
                            this.enrollStartTime = dayjs(res.data.data.enrollStartTime).format('YYYY-MM-DD');
                        };
                        if(res.data.data.enrollEndTime == "" || res.data.data.enrollEndTime == null){
                            this.enrollEndTime = ""
                        }else{
                            this.enrollEndTime = dayjs(res.data.data.enrollEndTime).format('YYYY-MM-DD');
                        }
                        
                        this.projectLeader=res.data.data.projectLeader;
                        this.projectLeaderPhone=res.data.data.projectLeaderPhone;
                        this.remark=res.data.data.remark;
                        this.tenderInforId = res.data.data.tenderInforId;// 修改需要传的ID
                        this.tenderNoticeId = res.data.data.tenderNoticeId;
                        this.areaList = res.data.data.items;
                        this.areaList.forEach(area=>{
                            if(area.entrySubcontractNumber != null && this.projectObj.totalProjectId == area.entrySubcontractNumber){
                                this.purchaseAmount=area.purchaseAmount;// 采购数量
                                this.purchasePurposes=area.purchasePurposes;// 拟采购货物
                                this.technologyQualifications=area.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                                this.developingSuppliersName=area.developingSuppliersName;// 拟定供应商名称
                                this.developingSuppliersAddress=area.developingSuppliersAddress//地址
                                this.professionalOpinions = area.professionalOpinions//论证意见
                                this.adviceData = area.itemCareermans
                            }else if(area.projectCode !=null && this.projectObj.totalProjectId == area.projectCode){
                                this.purchaseAmount=area.purchaseAmount;// 采购数量
                                this.purchasePurposes=area.purchasePurposes;// 拟采购货物
                                this.technologyQualifications=area.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                                this.developingSuppliersName=area.developingSuppliersName;// 拟定供应商名称
                                this.developingSuppliersAddress=area.developingSuppliersAddress;//地址
                                this.professionalOpinions = area.professionalOpinions//论证意见
                                this.adviceData = area.itemCareermans
                            }
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 初始化分包查询
            getsubpackageInfo(){
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
                        this.subpackageData = res.data.data;// 项目分包列表
                        this.subpackageData.forEach((item,index) => {
                            this.tenderContents = item.projectInformationVo.tenderContents;// 招标内容
                            this.subcontractName = item.subcontractName;// 分包名称
                            this.entrySubcontractNumber = item.entrySubcontractNumber;// 入场项目分包编号
                            this.subcontractingControlAmount = item.subcontractingControlAmount;// 分包控制金额
                            if(item.entrySubcontractNumber == this.projectObj.totalProjectId){
                                this.subcontractNames = item.subcontractName;// 分包名称
                                this.entrySubcontractNumbers = item.entrySubcontractNumber;// 入场项目分包编号
                                this.subcontractingControlAmounts = item.subcontractingControlAmount;
                            }
                            
                        });
                        this.subpackageData.map((item,index) => {
                            this.initList[0].items.map((items,indexs) =>{
                                if(item.entrySubcontractNumber == items.entrySubcontractNumber){
                                    item.obj_detail = items;
                                }
                            })
                        })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })  
                                                           
            },
            // +分包信息
            getsubInfo(){
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/subcontract",
                    data:{
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        qualificationExaminationMethod:'资格后审',
                        noticeType:'采购公示'
                    }
                }).then(res=>{
                    if(res.data.status == 200){  
                        let arrList = res.data.data;
                        for(let i=0; i<arrList.length;i++){
                            for(let j=0;j<this.subpackageData.length;j++){
                                if(arrList[i].entrySubcontractNumber == this.subpackageData[j].entrySubcontractNumber){
                                    arrList.splice(i,1);
                                }
                            }
                        }
                        this.markData = arrList;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })   
            },
            // 保存弹窗X按钮
            handleClose(){
                this.saveBox = false;// 保存弹窗
                this.laststepBox = false;// 上一步弹窗
                this.frameShow = false;
                this.sureSubmitBox = false;// 提交弹窗
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
                                if(item.value == '采购异常'){
                                    obj.zhaobiao = item;
                                }
                                if(item.value == '采购公示'){
                                    obj.houxuanren = item
                                }
                                if(item.value == '场地预约'){
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
                            let obj = {};
                            res.data.data.map((item,index)=>{
                                if(item.value == '采购异常'){
                                    obj.zhaobiao = item;
                                }
                                if(item.value == '采购公示'){
                                    obj.houxuanren = item
                                }
                                if(item.value == '项目入场登记'){
                                    obj.ruchang = item
                                }
                            })
                            //招标勾且本业勾，可以看，
                            if(obj.zhaobiao.state == '办理通过' && obj.houxuanren.state == '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                            //如果上一步打钩，进一步判断
                            }else if(obj.ruchang.state == '办理通过' ){
                                //如果招标打钩，则本业必须打勾
                                if(obj.zhaobiao.state == '办理通过'&& obj.houxuanren.state == '办理通过'){
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
                                        this.alertMsg = '尚未完成场地预约,无法进行采购公示!'
                                    }
                                }
                            }else{
                                //其他的都不能看
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未完成场地预约,无法进行采购公示!'
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
            // 保存弹窗确定按钮
            saveBoxSure(){
                this.saveBox = false;
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
                        this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.tenderContents = res.data.data.tenderContents;// 招标内容
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
                        
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
                        this.biddingOrganization = res.data.data.biddingOrganization;// 招标组织方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
                        
                        this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
                        this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;//招标采购代理机构
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 办理记录
            getmanageInfo(){
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    object={
                        itemNumber:this.projectObj.totalProjectId,
                        relatedId:this.tenderNoticeId
                    }
                }else{
                    object={
                        itemNumber:this.projectObj.totalProjectId,
                        relatedId:this.tenderNoticeId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/historyController/selectHistoryList",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.manageDate = res.data.data;
                        this.manageDate.forEach(item => {
                            item.creationTime = formatDate(item.creationTime)
                        });
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 初始化 查询
            getInitInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"采购公示",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"采购公示",
                    }
                }
                return this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.initList = res.data.data;
                        this.tenderNoticeId = res.data.data[0].tenderNoticeId;
                        this.areaList = res.data.data[0].items;
                        if(this.initList.length<=0 || res.data.data == null){
                            this.writeFlag = true;// 有保存和下一步的按钮
                            this.getOpenTime();// 如果有保存和下一步 开标时间为这个接口返回
                        }else {
                            this.initList.forEach(item=>{
                                this.stateItem = item.state;
                                if(item.state == '编辑中' || item.state == '办理未通过'){
                                    this.writeFlag = false;// 有保存和下一步的按钮
                                    this.nextFlag = true;// 有上一步和提交的按钮
                                }else if(item.state == '待办理' || item.state == '办理通过') {
                                    this.writeFlag = false;// 有保存和下一步的按钮
                                    this.nextFlag = true;// 有上一步和提交的按钮
                                    this.headerBtn = false;
                                }
                                this.agentPhone = item.agentPhone;
                                this.agentAddress = item.agentAddress;
                                this.tendereeAddress = item.tendereeAddress;// 招标人地址
                                this.tendereePhone = item.tendereePhone;// 招标人联系方式
                                this.noticeName = item.noticeName;// 公告名称
                                this.enrollStartTime = item.enrollStartTime;//公示日期
                                this.enrollEndTime = item.enrollEndTime;
                                this.announcementThat = item.announcementThat;//公示说明
                                this.competentDepartmentName = item.competentDepartmentName;//主管部门全称
                                this.competentDepartmentAddress = item.competentDepartmentAddress;//地址
                                this.responsiblePerson = item.responsiblePerson;//负责人
                                this.competentDepartmePhone = item.competentDepartmePhone;//联系方式
                                if(item.enrollStartTime  == null){
                                    this.enrollStartTime = ""
                                }else{
                                    this.enrollStartTime = formatTime(item.enrollStartTime);// 报名开始时间
                                };
                                if(item.enrollEndTime == null){
                                    this.enrollEndTime = ""
                                }else{
                                    this.enrollEndTime = formatTime(item.enrollEndTime);// 报名结束时间
                                }
                                
                                this.projectLeader = item.projectLeader;// 项目负责人
                                this.projectLeaderPhone = item.projectLeaderPhone;// 联系方式
                                this.remark = item.remark;// 备注
                                this.collectTime.push(this.enrollStartTime,this.enrollEndTime);
                                this.areaList.forEach(area=>{
                                    if(this.projectObj.totalProjectId.indexOf("-") != -1){
                                        if(area.entrySubcontractNumber == this.projectObj.totalProjectId){
                                            this.purchaseAmount=area.purchaseAmount;// 采购数量
                                            this.purchasePurposes=area.purchasePurposes;// 拟采购货物
                                            this.technologyQualifications=area.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                                            this.developingSuppliersName=area.developingSuppliersName;// 拟定供应商名称
                                            this.developingSuppliersAddress=area.developingSuppliersAddress;//地址
                                            this.professionalOpinions = area.professionalOpinions;//论证意见
                                            if(area.itemCareermans == null){
                                                this.adviceData = []
                                            }else{
                                                this.adviceData = area.itemCareermans
                                            };
                                        }
                                    }else{
                                        this.purchaseAmount=area.purchaseAmount;// 采购数量
                                        this.purchasePurposes=area.purchasePurposes;// 拟采购货物
                                        this.technologyQualifications=area.technologyQualifications;// 采用单一来源采购方式的原因及相关说明
                                        this.developingSuppliersName=area.developingSuppliersName;// 拟定供应商名称
                                        this.developingSuppliersAddress=area.developingSuppliersAddress;//地址
                                        this.professionalOpinions = area.professionalOpinions;//论证意见
                                        if(area.itemCareermans == null){
                                            this.adviceData = []
                                        }else{
                                            this.adviceData = area.itemCareermans
                                        };
                                    }
                                    
                                    
                                })
                                
                                this.creatorCompanyName = item.creatorCompanyName;
                                if(item.saveTime == null){
                                    this.saveTime = ""
                                }else{
                                    this.saveTime = formatDate(item.saveTime);
                                }
                                    
                            })
                        }
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            async getData(){
                await this.getInitInfo();
                this.getmanageInfo();
                this.getsubpackageInfo();
            },
            // 开标时间
            getOpenTime(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约",
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/siteReservationController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.makeList = res.data.data;
                        this.makeList.forEach(item=>{
                            this.assessmentTime = formatTime(item.assessmentTime);
                        })
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                    
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 招标（采购）人确认函附件
            getOneList(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 分包
                    object={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'招标（采购）人确认函'
                    }
                }else{
                    //  总包
                    object ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'招标（采购）人确认函'
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
                        this.enclosureData[0].attachlist = arr;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            // 采购公示附件
            getTwoList(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'采购公示'
                    }
                }else{
                    // 入场项目编号
                    object ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'采购公示'
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
                        this.enclosureData[1].attachlist = arr;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            downLoadupFile(item){
                this.downloadFile(item.attachmeId,item.fileName);
            },
            //上传列表
            uploadList(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 分包
                    if(this.num == 1){
                        object={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                            fileType:'招标（采购）人确认函'
                        }
                    }else{
                        object={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                            fileType:'采购公示'
                        }
                    }
                }else{
                    //  总包
                     if(this.num == 1){
                        object={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                            fileType:'招标（采购）人确认函'
                        }
                    }else{
                        object={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                            fileType:'采购公示'
                        }
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
                        if(this.num == 1){
                            this.enclosureData[0].attachlist = arr;
                        }else{
                            this.enclosureData[1].attachlist = arr;
                        }
                    }else{
                        this.$message.warning(res.data.msg);
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
                    this.$message.warning('请选择要删除的文件!')
                    return false;
                }else{
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
                    this.$message.warning('图片大小不能超过102400KB');
                    return false;
                }
                this.$refs.file.value = null;
                this.files = file;
                let formData = new FormData();
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 分包
                    formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                    formData.append("file", this.files);
                    if(this.num == 1){
                        formData.append("fileType", '招标（采购）人确认函');
                    }else{
                        formData.append("fileType", '采购公示');
                    }
                }else{
                    // 总包
                    formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                    formData.append("file", this.files);
                    if(this.num == 1){
                        formData.append("fileType", '招标（采购）人确认函');
                    }else{
                        formData.append("fileType", '采购公示');
                    }
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
        height: 200px;
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