<template>
    <div class="newBox">
        <div v-show="passJudgeShow" style="height:100%;overflow:hidden;">
            <div class="wrapper" v-show="writeFlag">
                <!-- 中标候选人公示 -->
                <div class="box"  v-show="headerBtn">
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
                                </div>
                                <div v-if="this.stateItem =='办理通过' || this.stateItem =='待办理'">
                                    <div class="editItem" >
                                        <div class="editCenter">
                                            <div class="editName">地址：</div>
                                            <div class="editContent">{{address}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系方式：</div>
                                            <div class="editContent">{{contactInformation}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div  v-else>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">地址：</div>
                                            <div class="editContent">
                                                <el-input v-model="address" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系方式：</div>
                                            <div class="editContent">
                                                <el-input v-model="contactInformation" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                    <div class="editItem" >
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem" >
                                        <div class="editCenter">
                                            <div class="editName">地址：</div>
                                            <div class="editContent">
                                                <el-input v-model="agentAddress" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系方式：</div>
                                            <div class="editContent">
                                                <el-input v-model="agentPhone" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 分包信息 -->
                        <el-collapse-item title="分包信息" name="2" v-show="diffFlag">
                            <el-table
                                    ref="multipleTable"
                                    :data="subpackageData"
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
                                        label="分包编号">
                                    </el-table-column>
                                    <el-table-column
                                        prop="subcontractName"
                                        label="分包名称">
                                    </el-table-column>
                                    <el-table-column
                                        label="招标方式">
                                        <template slot-scope="scope">{{biddingProcurementMode}}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="subcontractingControlAmount"
                                        label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column
                                        label="查看分包">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="操作"
                                        v-if="this.stateItem !='办理通过' && this.stateItem !='待办理'">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit"  style="cursor: pointer;" @click="editItemInfo(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                        </el-collapse-item>
                        <!-- 中标候选人列表及专家名单 -->
                        <el-collapse-item title="中标候选人列表及专家名单" name="2" v-show="!diffFlag">
                            <div class="edit_list" v-if="this.stateItem =='办理通过' || this.stateItem =='待办理'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">推荐排名第一单位：</div>
                                        <div class="editContent">{{recommendedOneUnit}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">{{winningAmountOne}}{{amountUnitOne}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">推荐排名第二单位：</div>
                                        <div class="editContent">{{recommendedSecondUnit}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">{{winningAmountTwo}}{{amountUnitTwo}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">推荐排名第三单位：</div>
                                        <div class="editContent">{{recommendedSecondThree}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">{{winningAmountThree}}{{amountUnitThree}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">评标委员会成员名单：</div>
                                        <div class="editContent">{{bidEvaluationCommitteeList}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="edit_list" v-else>
                                <div class="clear">
                                    <el-button plain @click="clearInfo">清空信息</el-button>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>推荐排名第一单位：</div>
                                        <div class="editContent">
                                            <el-input v-model="recommendedOneUnit" readonly></el-input>
                                        </div>
                                        <el-button plain @click="pickInfo(1)">检索</el-button>
                                    </div>
                                </div>
                            
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">
                                            <el-input v-model="winningAmountOne" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">
                                            <el-select v-model="amountUnitOne">
                                                <el-option label="元" value="元"></el-option>
                                                <el-option label="万元" value="万元"></el-option>
                                                <el-option label="%(费率)" value="%(费率)"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">推荐排名第二单位：</div>
                                        <div class="editContent">
                                            <el-input v-model="recommendedSecondUnit" clearable></el-input>
                                        </div>
                                            <el-button plain @click="pickInfo(2)">检索</el-button>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">
                                            <el-input v-model="winningAmountTwo" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">
                                                <el-select v-model="amountUnitTwo">
                                                <el-option label="元" value="元"></el-option>
                                                <el-option label="万元" value="万元"></el-option>
                                                <el-option label="%(费率)" value="%(费率)"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">推荐排名第三单位：</div>
                                        <div class="editContent">
                                            <el-input v-model="recommendedSecondThree" clearable></el-input>
                                        </div>
                                            <el-button plain @click="pickInfo(3)">检索</el-button>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">
                                            <el-input v-model="winningAmountThree" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">
                                                <el-select v-model="amountUnitThree">
                                                <el-option label="元" value="元"></el-option>
                                                <el-option label="万元" value="万元"></el-option>
                                                <el-option label="%(费率)" value="%(费率)"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">评标委员会成员名单：</div>
                                        <div class="editContent">
                                            <el-input v-model="bidEvaluationCommitteeList"  type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 其他信息 -->
                        <el-collapse-item title="其他信息" name="3">
                            <div class="edit_list" v-if="this.stateItem =='办理通过' || this.stateItem =='待办理'">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示名称：</div>
                                        <div class="editContent">{{publicityName}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">中标候选人公示</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"> 公示开始时间：</div>
                                        <div class="editContent">{{publicityStartTime}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">公示结束时间：</div>
                                        <div class="editContent">{{publicityEndTime}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">{{remarks}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="edit_list" v-else>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>公示名称：</div>
                                        <div class="editContent">
                                            <el-input v-model="publicityName" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">中标候选人公示</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p> 公示开始时间：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                placeholder="开始日期"
                                                v-model="publicityStartTime"
                                                :picker-options="pickerOptions0"
                                            >
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>公示结束时间：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                placeholder="结束时间"
                                                v-model="publicityEndTime"
                                                :picker-options="pickerOptions1"
                                            >
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">
                                            <el-input v-model="remarks" clearable type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
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
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">地址：</div>
                                        <div class="editContent">{{address}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{contactInformation}}</div>
                                    </div>
                                </div>
                                <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                    <div class="editItem" >
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem" >
                                        <div class="editCenter">
                                            <div class="editName">地址：</div>
                                            <div class="editContent">
                                                <span>{{agentAddress}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系方式：</div>
                                            <div class="editContent">
                                                <span>{{agentPhone}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 中标候选人列表及专家名单 -->
                        <el-collapse-item title="中标候选人列表及专家名单" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">推荐排名第一单位：</div>
                                        <div class="editContent">{{recommendedOneUnit}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">{{winningAmountOne}}{{amountUnitOne}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">推荐排名第二单位：</div>
                                        <div class="editContent">{{recommendedSecondUnit}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">{{winningAmountTwo}}{{amountUnitTwo}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">推荐排名第三单位：</div>
                                        <div class="editContent">{{recommendedSecondThree}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">拟中标金额：</div>
                                        <div class="editContent">{{winningAmountThree}}{{amountUnitThree}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">评标委员会成员名单：</div>
                                        <div class="editContent">{{bidEvaluationCommitteeList}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 其他信息 -->
                        <el-collapse-item title="其他信息" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示名称：</div>
                                        <div class="editContent">{{publicityName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公示开始时间：</div>
                                        <div class="editContent">{{publicityStartTime}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">公示结束时间：</div>
                                        <div class="editContent">{{publicityEndTime}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">{{remarks}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 中标候选人公示信息 -->
                        <el-collapse-item title="中标候选人公示信息" name="4">
                            <div class="edit_list">
                                <div class="infobox_title">
                                    <span>{{nameOfTenderProject}}</span>
                                    <h1>中标候选人公示</h1>
                                    <p>{{saveTime}}</p>
                                </div>
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
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}} 万元</div>
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
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人地址：</div>
                                        <div class="editContent">{{address}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人联系方式：</div>
                                        <div class="editContent">{{contactInformation}} </div>
                                    </div>
                                </div>
                                <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="font-weight:bold;">招标(采购)代理机构</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:152px;">招标(采购)代理机构全称：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:152px;">招标(采购)代理机构地址：</div>
                                            <div class="editContent">{{agentAddress}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:178px;">招标(采购)代理机构联系方式：</div>
                                            <div class="editContent">{{agentPhone}} </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">中标候选人公示</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">第一中标候选人：</div>
                                        <div class="editContent">{{recommendedOneUnit}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">第二中标候选人：</div>
                                        <div class="editContent">{{recommendedSecondUnit}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">第三中标候选人：</div>
                                        <div class="editContent">{{recommendedSecondThree}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="font-weight:bold;">中标候选人公示期</div>
                                        <div class="editContent">{{publicityStartTime}} 至 {{publicityEndTime}}</div>
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
                                        <div class="editName" style="font-weight:bold;">备注说明：</div>
                                        <div class="editContent">{{remark}}</div>
                                    </div>
                                </div>
                                <div class="infobox_footer">
                                    <h3>{{creatorCompanyName}}</h3>
                                    <h3>{{saveTime}}</h3>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="5">
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
                                <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem !='办理通过' && this.stateItem !='待办理'">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="6">
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
                        <p class="star">★：附件上传大小限制为102400 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
                    </div>
                </div>
            </div>
            <div class="pickWrapper" v-show="pickFlag">
                <div class="pickBox">
                    <div class="pick_title">
                        <p>选择中标单位</p>
                        <i class="el-icon-close" @click="closePick"></i>
                    </div>
                    <div class="pick_main">
                        <el-table
                                ref="multipleTable"
                                :data="pickData"
                                tooltip-effect="dark"
                                style="width: 100%">
                            <el-table-column align="center" width="55" label="" >
                                <template slot-scope="scope">
                                    <el-radio :label="scope.row.bidCompany" v-model="templateRadio" @change.native="getTemplatePick(scope.row)">&nbsp;</el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1  }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="ranking"
                                label="排名">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                label="单位名称">
                            </el-table-column>
                            <el-table-column
                                label="选择">
                                <template slot-scope="scope">
                                    <i class="el-icon-plus" @click="copyPick(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pick_btn" style="width:130px;">
                        <button class="btn" @click="pickSure">确定选择</button>
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
                                        <div class="editCenter">
                                            <div class="editName">招标项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人：</div>
                                            <div class="editContent">{{tenderPurchaserName}} </div>
                                        </div>
                                        <div class="editCenter" v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
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
            </div>
            <!-- 操作详情 -->
            <div class="lookWrapper" v-show="editFlag">
                <div class="lookBox">
                    <div class="pick_title">
                        <p>新增分包中标候选人</p>
                        <i class="el-icon-close" @click="closeEdit"></i>
                    </div>
                    <div class="box">
                        <button class="btn" @click="savePage">保存</button>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="activeName" accordion>
                            <!-- 中标候选人列表及专家名单 -->
                            <el-collapse-item title="中标候选人列表及专家名单" name="1">
                                <div class="edit_list">
                                    <div class="clear">
                                        <el-button plain  @click="clearInfo">清空信息</el-button>
                                    </div>
                                <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>推荐排名第一单位：</div>
                                            <div class="editContent">
                                                <el-input v-model="recommendedOneUnit" readonly></el-input>
                                            </div>
                                            <el-button plain @click="pickInfo(1)">检索</el-button>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">拟中标金额：</div>
                                            <div class="editContent">
                                                <el-input v-model="winningAmountOne" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">
                                                <el-select v-model="amountUnitOne">
                                                    <el-option label="元" value="元"></el-option>
                                                    <el-option label="万元" value="万元"></el-option>
                                                    <el-option label="%(费率)" value="%(费率)"></el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">推荐排名第二单位：</div>
                                            <div class="editContent">
                                                <el-input v-model="recommendedSecondUnit" clearable></el-input>
                                            </div>
                                            <el-button plain @click="pickInfo(2)">检索</el-button>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">拟中标金额：</div>
                                            <div class="editContent">
                                                <el-input v-model="winningAmountTwo" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">
                                                <el-select v-model="amountUnitTwo">
                                                    <el-option label="元" value="元"></el-option>
                                                    <el-option label="万元" value="万元"></el-option>
                                                    <el-option label="%(费率)" value="%(费率)"></el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">推荐排名第三单位：</div>
                                            <div class="editContent">
                                                <el-input v-model="recommendedSecondThree" clearable></el-input>
                                            </div>
                                            <el-button plain @click="pickInfo(3)">检索</el-button>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">拟中标金额：</div>
                                            <div class="editContent">
                                                <el-input v-model="winningAmountThree" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">
                                                <el-select v-model="amountUnitThree">
                                                    <el-option label="元" value="元"></el-option>
                                                    <el-option label="万元" value="万元"></el-option>
                                                    <el-option label="%(费率)" value="%(费率)"></el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">评标委员会成员名单：</div>
                                            <div class="editContent">
                                                <el-input v-model="bidEvaluationCommitteeList"  type="textarea" :rows="3"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
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
                    <span>修改信息将导致电子件列表中的 [中标候选人公示] 重新生成，您确认要继续吗？</span>
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
                    <span>提交中标候选人公示成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureBtn">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 分包信息内容必填才允许点击下一步 -->
            <el-dialog
                title="执行成功"
                :visible.sync="subInforShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>未填写分包信息的中标候选人单位！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleClose">确 定</el-button>
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
                <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import {formatDate,changeTime,isPoneAvailable,checkNumber,checkPhone} from '../../../api/base.js'
import dayjs from "dayjs";
export default {
    data(){
        return {
            procurementMode_type:window.localStorage.procurementMode_type,
            str_entrust_type:window.sessionStorage.str_entrust_type,
            role_types:window.localStorage.role_types,
            biddingPurchasingAgencyName:'',
            agentAddress:'',
            agentPhone :'',
            // 开始
            pickerOptions0: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            // 结束
            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() < new Date(this.publicityStartTime).getTime()- (24*60*60*1000)/24;//减去一天的时间代表可以选择同一天;
                }
            },
            subInforShow:false,//未填写分包信息不予许点下一步、保存
            alertMsg:'',
            passJudgeShow:true,
            frameShow:false,
            projectObj:JSON.parse(window.localStorage.projectObj),
            activeName:['1','2','3','4','5','6'],
            tableData:[],
            diffFlag:false,
            multipleSelection:[],//多选框
            idcard:'',
            writeFlag:true,// 总包输入 列表
            //检索所需字段
            pickFlag:false,// 弹窗
            templateRadio:'',// 单选按钮
            pickData:[],// 检索列表
            pickItem:{},// 点击的item
            pickNum:0,
            readonly: true,// input只可读不可编辑
            // 保存所需字段
            recommendedOneUnit:'',// 推荐排名第一单位
            winningAmountOne:'',// 拟中标金额1
            amountUnitOne:'',//֖金额单位1
            recommendedSecondUnit:'',//֖推荐排名第二单位
            winningAmountTwo:'',// 拟中标金额2
            amountUnitTwo:'',//֖金额单位2
            recommendedSecondThree:'',//֖推荐排名第三单位
            winningAmountThree:'',//  拟中标金额3
            amountUnitThree:'',//֖金额单位3
            bidEvaluationCommitteeList:'',//评标委员会成员名单
            publicityName:'',//公示名称
            publicityStartTime:'',// 公示开始时间
            publicityEndTime:'',// 公示结束时间
            remarks:'',//备注说明
            address:'',//地址
            contactInformation:'',//联系方式
            entrySubcontractNumber:'',// 入场项目编号 分包
            projectCode:'',//入场项目编号 总包
            saveBox:false,//保存弹窗
            winnCandidaId:'',// 中标候选人
            // 下一步页面
            showFlag:false,
            projectLeader:'',// 项目联系人
            projectLeaderPhone:'',//联系方式
            remark:'',// 备注
            // 上一步所需字段
            laststepBox:false,
            // 确定提交
            sureSubmitBox:false,
            headerBtn:true,
            infoList:[],
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            // 分包信息
            subpackageData:[],
            lookFlag:false,
             // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            tenderPurchaserName:'',// 招标(采购)人
            budgetAmount:'',// 招标项目预算金额
            biddingProcurementMode:'',// 招标方式
            scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            amountId:'',// 总包
            // 操作
            editFlag:false,
            creatorCompanyName:'',// 创建人名字
            saveTime:'',// 保存时间
            peopleArr:[],
            areaList:[],
            // 文件上传所需字段
            enclosureData:[{
                id:1,
                appendixName: "中标候选人公示",
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
            stateItem:'',// 后端返回当前的状态
        }
    },
    created(){
        if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
            // 分包
            this.diffFlag = true;
            this.entrySubcontractNumber = this.totalProjectId;
        }else{
            // 总包
            this.diffFlag = false;
            this.projectCode = this.totalProjectId;
        }
        this.getInitInfo();// 初始化查询
        this.getbiddingInfo();// 招标项目信息
        this.getmanageInfo();// 办理记录
        this.getsubpackageInfo();// 初始化分包信息
        this.uploadList();//上传列表
        this.getDecideList();
        this.getinformation();
    },
    methods:{
        // 复选框的列表
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //校验手机号联系方式
        blurPhone(){
            // 联系方式
            if(!isPoneAvailable(this.contactInformation) && !checkPhone(this.contactInformation)){
                this.$layer.msg('请输入正确的联系方式');
            }
        },
        // 保存和下一步公用方法
        newly(num){
            this.uploadList();
            if(this.winningAmountOne != '' && this.winningAmountOne != null){
                if(!checkNumber(this.winningAmountOne)){
                    this.$layer.msg('请输入数字1!');
                    return false;
                }
            }else if(this.winningAmountTwo != '' && this.winningAmountTwo != null){
                if(!checkNumber(this.winningAmountTwo)){
                    this.$layer.msg('请输入数字2!');
                    return false;
                }
            }else if(this.winningAmountThree != '' && this.winningAmountThree != null){
                if(!checkNumber(this.winningAmountThree)){
                    this.$layer.msg('请输入数字3!');
                    return false;
                }
            }
            if(!this.diffFlag ){
                 // 总包
                if(!this.recommendedOneUnit){
                    this.$layer.msg('请输入推荐排名第一单位');
                    return false; 
                }else if(!this.publicityName){
                    this.$layer.msg('请输入公示名称');
                    return false;
                }else if(!this.publicityStartTime){
                    this.$layer.msg('请输入公示开始时间');
                    return false;
                }else if(!this.publicityEndTime){
                    this.$layer.msg('请输入公示结束时间');
                    return false;
                }else if (this.contactInformation != '' && !isPoneAvailable(this.contactInformation) && !checkPhone(this.contactInformation)){
                    this.$layer.msg('请输入正确的联系方式');
                    return false;
                }else if (this.agentPhone != '' && !isPoneAvailable(this.agentPhone) && !checkPhone(this.agentPhone)){
                    this.$layer.msg('请输入正确的联系方式');
                    return false;
                }else if(!this.recommendedOneUnit){
                    this.subInforShow = true;
                    return false;
                }else{
                    if(num == 1){
                        // 保存
                         this.savecandidateInfo(num);
                    }else{
                        // 下一步
                        this.writeFlag = false;// 输入框的页面
                        this.showFlag = true;// 下一步页面
                        this.savecandidateInfo(num);
                        this.getinformation();// 公告信息
                        this.getmanageInfo();// 办理记录
                    }
                }
                
                
            }else{
               // 分包
                if(!this.publicityName){
                    this.$layer.msg('请输入公示名称');
                    return false;
                }else if(!this.publicityStartTime){
                    this.$layer.msg('请输入公示开始时间');
                    return false;
                }else if(!this.publicityEndTime){
                    this.$layer.msg('请输入公示结束时间');
                    return false;
                }else if (this.contactInformation != ''&& !isPoneAvailable(this.contactInformation) && !checkPhone(this.contactInformation)){
                    this.$layer.msg('请输入正确的联系方式');
                    return false;
                }else if (this.agentPhone != '' && !isPoneAvailable(this.agentPhone) && !checkPhone(this.agentPhone)){
                    this.$layer.msg('请输入正确的联系方式');
                    return false;
                }else if(!this.recommendedOneUnit){
                    this.subInforShow = true;
                    return false;
                }else{
                    if(num == 1){
                        // 保存
                        this.savecandidateInfo(num);
                    }else{
                        // 下一步
                        this.writeFlag = false;// 输入框的页面
                        this.showFlag = true;// 下一步页面
                        this.savecandidateInfo(num);
                        this.getinformation();// 公告信息
                        this.getmanageInfo();// 办理记录
                    }
                }
            }
        },
        // 上一步
        goBack(){
            // this.laststepBox = true;// 上一步弹窗 确定
            this.writeFlag = true;// 输入框的页面
            this.showFlag = false;// 下一步页面
            this.getBackTemp();// 上一步的查询
        },
        // 提交
        submitInfo(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/winnCandidaController/submit",
                data:{
                    state:'待办理',
                    winnCandidaId:this.winnCandidaId,// 工本费接收账户id 
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.sureSubmitBox = true;
                    this.getInitInfo();// 初始化查询
                }else{
                     this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
            
        },
        // 确认提交 ---> 确定
        sureBtn(){
            this.sureSubmitBox = false;// 确定提交弹窗
            this.getmanageInfo();//办理记录
        },
        handleClose(){
            this.saveBox = false;// 保存弹窗 确定
            this.laststepBox = false;// 上一步弹窗 确定
            this.sureSubmitBox = false;// 确定提交弹窗
            this.frameShow = false;
            this.subInforShow = false;
        },
        // 保存弹窗 确定
        saveBoxSure(){
            this.saveBox = false;
        },
        // 上一步弹窗 确定
        laststepBoxSure(){
            this.laststepBox = false;
        },
        // 保存
        savecandidateInfo(num){
            let object = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                object = {
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    recommendedOneUnit:this.recommendedOneUnit,
                    winningAmountOne:this.winningAmountOne,
                    amountUnitOne:this.amountUnitOne,
                    recommendedSecondUnit:this.recommendedSecondUnit,
                    winningAmountTwo:this.winningAmountTwo,
                    amountUnitTwo:this.amountUnitTwo,
                    recommendedSecondThree:this.recommendedSecondThree,
                    winningAmountThree:this.winningAmountThree,
                    amountUnitThree:this.amountUnitThree,
                    bidEvaluationCommitteeList:this.bidEvaluationCommitteeList,
                    publicityName:this.publicityName,
                    publicityStartTime:changeTime(this.publicityStartTime),
                    publicityEndTime:changeTime(this.publicityEndTime),
                    remarks:this.remarks,
                    address:this.address,
                    contactInformation:this.contactInformation,
                    agentAddress:this.agentAddress,
                    agentPhone :this.agentPhone,
                }
            }else{
                // 总包
                object = {
                    projectCode:this.projectObj.totalProjectId,
                    recommendedOneUnit:this.recommendedOneUnit,
                    winningAmountOne:this.winningAmountOne,
                    amountUnitOne:this.amountUnitOne,
                    recommendedSecondUnit:this.recommendedSecondUnit,
                    winningAmountTwo:this.winningAmountTwo,
                    amountUnitTwo:this.amountUnitTwo,
                    recommendedSecondThree:this.recommendedSecondThree,
                    winningAmountThree:this.winningAmountThree,
                    amountUnitThree:this.amountUnitThree,
                    bidEvaluationCommitteeList:this.bidEvaluationCommitteeList,
                    publicityName:this.publicityName,
                    publicityStartTime:changeTime(this.publicityStartTime),
                    publicityEndTime:changeTime(this.publicityEndTime),
                    remarks:this.remarks,
                    address:this.address,
                    contactInformation:this.contactInformation,
                    agentAddress:this.agentAddress,
                    agentPhone :this.agentPhone,
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/winnCandidaController/saveOrUpdate',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                        
                    }
                    this.publicityStartTime=formatDate(res.data.data.publicityStartTime);
                    this.publicityEndTime=formatDate(res.data.data.publicityEndTime);
                    this.winnCandidaId = res.data.data.winnCandidaId;
                    this.agentAddress = res.data.data.agentAddress;
                    this.agentPhone = res.data.data.agentPhone;
                }else{
                     this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
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
                    this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                }else{
                     this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 公告信息
        getinformation(){
            let object={};
            let strUrl = "";
            if(this.procurementMode_type == '邀请招标'){
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
                };
                strUrl = '/bidInvitationController/selectByCode'
            }else{
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"招标公告"
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"招标公告"
                    }
                }
                strUrl = '/tenderNoticeController/select'
            }
            
            this.$axios({
                method: "POST",
                url: baseUrl+ strUrl,
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(this.procurementMode_type == '邀请招标'){
                        this.projectLeader = res.data.data.projectLeader;//项目负责人
                        this.projectLeaderPhone = res.data.data.contactMode;//联系方式
                        this.remark = res.data.data.remarks;//备注
                    }else{
                        this.projectLeader=res.data.data[0].projectLeader;// 项目负责人
                        this.projectLeaderPhone=res.data.data[0].projectLeaderPhone;// 联系方式
                        this.remark=res.data.data[0].remark;// 备注
                    }
                    
                }else{
                     this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 初始化查询
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
                url:baseUrl + '/winnCandidaController/select',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.infoList = res.data.data;
                    this.stateItem = res.data.data[0].state;
                    this.agentAddress = res.data.data[0].agentAddress;
                    this.agentPhone = res.data.data[0].agentPhone;
                    if(res.data.data == null ||  this.infoList.length <=0){
                        this.writeFlag = true;
                        this.showFlag = false;
                    }else {
                        this.infoList.forEach(item => {
                            if(item.state == '编辑中' || item.state == '办理未通过'){
                                this.writeFlag = false;
                                this.showFlag = true;
                                
                            }else{
                                this.writeFlag = false;
                                this.headerBtn = false;// 有上一步和提交的按钮
                                this.showFlag = true;
                            }
                            this.recommendedOneUnit=item.recommendedOneUnit;
                            this.winningAmountOne=item.winningAmountOne;
                            this.amountUnitOne=item.amountUnitOne;
                            this.recommendedSecondUnit=item.recommendedSecondUnit;
                            this.winningAmountTwo=item.winningAmountTwo;
                            this.amountUnitTwo=item.amountUnitTwo;
                            this.recommendedSecondThree=item.recommendedSecondThree;
                            this.winningAmountThree=item.winningAmountThree;
                            this.amountUnitThree=item.amountUnitThree;
                            this.bidEvaluationCommitteeList=item.bidEvaluationCommitteeList;
                            this.publicityName=item.publicityName;
                            this.publicityStartTime=formatDate(item.publicityStartTime);
                            this.publicityEndTime=formatDate(item.publicityEndTime);
                            this.remarks=item.remarks;
                            this.address=item.address;
                            this.contactInformation=item.contactInformation;
                            this.saveTime = dayjs(item.saveTime).format('YYYY年MM月DD日');// 保存时间
                            this.creatorCompanyName = item.creatorCompanyName;// 创建人名字
                            this.winnCandidaId = item.winnCandidaId;// 主键ID
                        });
                    }
                    
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 上一步的查询
        getBackTemp(){
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
                url:baseUrl + '/winnCandidaController/select',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.agentAddress = res.data.data[0].agentAddress;
                    this.agentPhone = res.data.data[0].agentPhone;
                    this.infoList = res.data.data;
                    this.infoList.forEach(item => {
                        this.recommendedOneUnit=item.recommendedOneUnit;
                        this.winningAmountOne=item.winningAmountOne;
                        this.amountUnitOne=item.amountUnitOne;
                        this.recommendedSecondUnit=item.recommendedSecondUnit;
                        this.winningAmountTwo=item.winningAmountTwo;
                        this.amountUnitTwo=item.amountUnitTwo;
                        this.recommendedSecondThree=item.recommendedSecondThree;
                        this.winningAmountThree=item.winningAmountThree;
                        this.amountUnitThree=item.amountUnitThree;
                        this.bidEvaluationCommitteeList=item.bidEvaluationCommitteeList;
                        this.publicityName=item.publicityName;
                        this.publicityStartTime=formatDate(item.publicityStartTime);
                        this.publicityEndTime=formatDate(item.publicityEndTime);
                        this.remarks=item.remarks;
                        this.address=item.address;
                        this.contactInformation=item.contactInformation;
                    });
                    
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
         // 办理记录
        async getmanageInfo(){
            await this.getInitInfo();// 初始化查询
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.winnCandidaId
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.winnCandidaId
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
        // 初始化分包信息
        getsubpackageInfo(){
            let arr =[];
            arr.push(this.projectObj.totalProjectId)
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:arr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.subpackageData = res.data.data;
                    this.subpackageData.forEach(item=>{
                        this.biddingProcurementMode = item.projectInformationVo.biddingProcurementMode;
                    })
                }else{
                     this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 查看分包信息
        lookoverItem(row){
            this.lookFlag = true;
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
			this.subcontractName = row.subcontractName;// 分包名称 
			this.subcontractContents = row.subcontractContents;// 分包内容
			this.scopeOfTender = row.scopeOfTender;// 招标范围
			this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
			this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
			this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
        },
        // 关闭查看分包信息
        closeLook(){
            this.lookFlag = false;
        },
        // 操作详情
        editItemInfo(row){
            this.editFlag = true;
            
        },
        // 关闭操作信息
        closeEdit(){
            this.recommendedOneUnit='';//推荐排名第一单位
            this.winningAmountOne='';//拟中标金额
            this.amountUnitOne='';//元
            this.recommendedSecondUnit='';//推荐排名第二单位
            this.winningAmountTwo='';//拟中标金额
            this.amountUnitTwo='';//元
            this.recommendedSecondThree='';;//推荐排名第三单位
            this.winningAmountThree='';//拟中标金额
            this.amountUnitThree='';//元
            this.bidEvaluationCommitteeList='';//评标委员会成员名单
            this.editFlag = false;
        },
        savePage(){
            if(this.winningAmountOne != '' &&this.winningAmountOne != null && !checkNumber(this.winningAmountOne)){
                this.$layer.msg('请输入数字!');
                return false;
            }else if(this.winningAmountTwo != '' &&this.winningAmountTwo != null&& !checkNumber(this.winningAmountTwo)){
                this.$layer.msg('请输入数字!');
                return false;
            }else if(this.winningAmountThree != '' &&this.winningAmountThree != null&&!checkNumber(this.winningAmountThree)){
                this.$layer.msg('请输入数字!');
                return false;
            }else{
                this.editFlag = false;
            }
        },
        // 清空信息
        clearInfo(){
            this.recommendedOneUnit='';//推荐排名第一单位
            this.winningAmountOne='';//拟中标金额
            this.amountUnitOne='';//元
            this.recommendedSecondUnit='';//推荐排名第二单位
            this.winningAmountTwo='';//拟中标金额
            this.amountUnitTwo='';//元
            this.recommendedSecondThree='';;//推荐排名第三单位
            this.winningAmountThree='';//拟中标金额
            this.amountUnitThree='';//元
            this.bidEvaluationCommitteeList='';//评标委员会成员名单
        },
        // 检索
        pickInfo(num){
            this.pickNum = num;
            this.pickFlag = true;
            this.getPickInfo(num);// 检索列表
            // recommendedOneUnit recommendedSecondUnit recommendedSecondThree
            this.peopleArr = [];
            this.pickData = [];
            this.peopleArr.push(this.recommendedOneUnit,this.recommendedSecondUnit,this.recommendedSecondThree)
        },
        //关闭检索
        closePick(){
            this.pickFlag = false;
        },
        // 检索列表
        getPickInfo(num){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    isEffective:"1",       
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    isEffective:"1",  
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/winnCandidaController/select/company",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    let arrList = res.data.data;
                    // 去重 点击检索出现人员列表 如果输入框里有值 列表就不展示当前的那个值
                    let flag = true;
                    for(var i = 0; i<arrList.length;i++){
                        for(var j=0;j<this.peopleArr.length;j++){
                            if(this.peopleArr[j] == arrList[i].companyName){
                                flag = false;
                                arrList.splice(i,1);
                                this.pickData = arrList;
                            }
                        }
                    }
                    if(flag){
                        this.pickData = arrList;
                    }
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 中标信息 ---> 挑选---> 列表 ---> 单选框
        getTemplatePick(row){
            this.pickItem = row;
        },
        // 检索列表+
        copyPick(row){
            if(this.pickNum == 1){
                this.recommendedOneUnit = row.companyName;
            }else if(this.pickNum == 2){
                this.recommendedSecondUnit = row.companyName;
            }else{
                this.recommendedSecondThree = row.companyName;
            }
            this.pickFlag = false;
        },
        // 挑选 ---> 确定选择
        pickSure(){
            this.pickFlag =false;
            if(this.pickNum == 1){
                this.recommendedOneUnit = this.pickItem.companyName;
            }else if(this.pickNum == 2){
                this.recommendedSecondUnit = this.pickItem.companyName;
            }else{
                this.recommendedSecondThree = this.pickItem.companyName;
            }
        },
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName);
        },
        //上传列表
        uploadList(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 分包
                object={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'中标候选人公示'
                }
            }else{
                // 总包
                object={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'中标候选人公示'
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
                    this.$layer.msg(res.data.msg);
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
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 分包
                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '中标候选人公示');
            }else{
                // 总包
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '中标候选人公示');
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
                            if(item.value == '中标候选人公示'){
                                obj.houxuanren = item
                            }
                            if(item.value == '项目入场登记'){
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
                            if(item.value == '招标异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '中标候选人公示'){
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
                                    this.alertMsg = '尚未完成项目入场登记,无法进行招中标候选人公示!'
                                }
                            }
                        }else{
                            //其他的都不能看
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成项目入场登记,无法进行招中标候选人公示!'
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
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.main_info {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.lookWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:50px 20px;
}
/* 检索页面 */
.pickWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 100px;
}
.pickBox,.lookBox{
    width: 87%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.pick_title,.look_title{
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
.pick_input{
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
    width: 100px;
}
.pick_btn {
    position: absolute;
    left: 0;
    top: 500px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 40px;
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
.el-icon-success,.el-icon-question{
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
.editContent>p{
    width: 25%;
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
    right: 284px;
    top: 92px;
    display: inline-block;
    border:none;
    outline: none;
    width: 22%;
    height:4%;
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
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.el-icon-warning,.el-icon-success{
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
</style>