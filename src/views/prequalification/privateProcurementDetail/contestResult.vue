<template>
    <div class="newBox">
        <div v-show="passJudgeShow" style="height:100%;overflow-y:scroll;">
            <!-- 竞谈竞磋 成交结果公告 -->
            <div class="wrapper" v-show="writeFlag">
                <div class="box" v-show="headerBtn">
                    <button class="btn" @click="newly(1)">保存</button>
                    <button class="btn" @click="newly(2)">下一步</button>
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
                                        <div class="editContent">
                                            <el-input v-model="address" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">
                                            <el-input v-model="tendereeContactInformation" clearable ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
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
                                                <el-input v-model="agentPhone" clearable ></el-input>
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
                                        <div class="editName">公告名称：</div>
                                        <div class="editContent">
                                            <el-input v-model="announcementName" placeholder="请输入内容" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">成交结果公告</div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购信息日期：</div>
                                        <div class="editContent"> {{updateTime}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交日期：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                placeholder="起始日期"
                                                type="date"
                                                v-model="calibrationDate"
                                                :picker-options="pickerOptions3">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">谈判小组/询价小组/采购人员名单：</div>
                                        <div class="editContent">
                                            <el-input v-model="personnels" clearable></el-input>
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
                                            <el-input v-model="leaderContactInformation" clearable  ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">
                                            <el-input v-model="remarks" type="textarea" :rows="3" ></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 成交信息 总包-->
                        <el-collapse-item title="成交信息" name="3" v-show="!diffFlag">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">{{purchaseAmount}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">拟采购货物/服务说明：</div>
                                        <div class="editContent">{{purchasePurposes}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:180px !important;">简要规格描述或项目基本情况：</div>
                                        <div class="editContent">{{technologyQualifications}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">主要成交标的：</div>
                                        <div class="editContent">
                                            <el-input v-model="mainWinningBid" type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">单价：</div>
                                        <div class="editContent">
                                            <el-input v-model="unitPrice" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">数量：</div>
                                        <div class="editContent">
                                            <el-input v-model="number" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">规格型号：</div>
                                        <div class="editContent">
                                            <el-input v-model="specificationType" type="textarea" :rows="1"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">合同履行期：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                v-model="contractPerformancePeriod"
                                                type="date"
                                                placeholder="开始日期"
                                                :picker-options="pickerOptions0">
                                            </el-date-picker>
                                        </div>
                                        <div style="padding:0 10px;">至</div>
                                            <div class="editContent">
                                            <el-date-picker
                                                v-model="contractPerformanceEnd"
                                                type="date"
                                                placeholder="结束时间"
                                                :picker-options="pickerOptions1">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>成交供应商名称：</div>
                                        <div class="editContent">
                                            <el-input v-model="nameOfSuccessfulSupplier" readonly></el-input>
                                        </div>
                                        <el-button plain @click="pickInfo">检索</el-button>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">成交供应商地址：</div>
                                        <div class="editContent">
                                            <el-input v-model="addressOfSuccessfulSupplier" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>成交金额(小写)：</div>
                                        <div class="editContent">
                                            <p style="color:#6e622e;">人民币</p>
                                            <el-input v-model="winningAmountLowercase" clearable @blur ='inputblur'></el-input>
                                            <p style="color:#6e622e;">元</p>
                                        </div>
                                    </div>
                                    <div class="editCenter" >
                                        <div class="editName"  style="color:#6e622e;padding:0 5px;" >大写</div>
                                        <div class="editContent" style="color:#f00;">
                                            {{winningAmountCapitalization}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 成交信息 分包-->
                        <el-collapse-item title="成交信息" name="3" v-show="diffFlag">
                            <div class="item_title">若需添加多分包，请点击 <i class="el-icon-plus" @click="searchSubpackage"></i> 按钮</div>
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
                                    prop="subcontractName"
                                    label="分包名称">
                                </el-table-column>
                                <el-table-column
                                    prop="subcontractingControlAmount"
                                    label="分包控制金额(万元)">
                                </el-table-column>
                                <el-table-column
                                    prop="entrySubcontractNumber"
                                    label="入场项目(分包)编号"
                                    :show-overflow-tooltip = 'true'
                                >
                                </el-table-column>
                                <el-table-column
                                    label="查看">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="成交信息">
                                    <template slot-scope="scope">
                                        <i class="el-icon-edit"  style="cursor: pointer;" @click="winItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="删除">
                                    <template slot-scope="scope">
                                        <i class="el-icon-close"  style="cursor: pointer;" @click="deleteItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                
            </div>
            <div class="nextWrapper" v-show="showFlag">
                <div class="box" v-show="headerBtn">
                    <button class="btn" @click="goBack">上一步</button>
                    <button class="btn" @click="submit">提交</button>
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
                                        <div class="editContent">{{address}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{tendereeContactInformation}}</div>
                                    </div>
                                </div>
                                <div v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
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
                        <!-- 附件 -->
                        <el-collapse-item title="附件" name="2">
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
                                <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem !='待办理' &&this.stateItem !='办理通过'">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 公告信息 -->
                        <el-collapse-item title="公告信息" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公告名称：</div>
                                        <div class="editContent">{{announcementName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购信息日期：</div>
                                        <div class="editContent">{{updateTime}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交日期：</div>
                                        <div class="editContent">{{calibrationDate}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">谈判小组/询价小组/采购人员名单：</div>
                                        <div class="editContent">{{personnels}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">{{leaderContactInformation}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">{{remarks}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 成交信息 总包-->
                        <el-collapse-item title="成交信息" name="4" v-show="!diffFlag">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">{{purchaseAmount}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">拟采购货物/服务说明：</div>
                                        <div class="editContent">{{purchasePurposes}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="width:180px !important;">简要规格描述或项目基本情况：</div>
                                        <div class="editContent">{{technologyQualifications}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">主要成交标的：</div>
                                        <div class="editContent">{{mainWinningBid}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">单价：</div>
                                        <div class="editContent">{{unitPrice}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">数量：</div>
                                        <div class="editContent">{{number}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">规格型号：</div>
                                        <div class="editContent">{{specificationType}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">合同履行期：</div>
                                        <div class="editContent">{{contractPerformancePeriod}}至{{contractPerformanceEnd}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交供应商名称：</div>
                                        <div class="editContent">{{nameOfSuccessfulSupplier}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交供应商地址：</div>
                                        <div class="editContent">{{addressOfSuccessfulSupplier}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">成交金额（小写）：</div>
                                        <div class="editContent">{{winningAmountLowercase}}元</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 成交信息 分包 -->
                        <el-collapse-item title="成交信息" name="4" v-show="diffFlag">
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
                                    prop="subcontractName"
                                    label="分包名称">
                                </el-table-column>
                                <el-table-column
                                    prop="subcontractingControlAmount"
                                    label="分包控制金额(万元)">
                                </el-table-column>
                                <el-table-column
                                    prop="entrySubcontractNumber"
                                    label="入场项目(分包)编号"
                                    :show-overflow-tooltip = 'true'
                                >
                                </el-table-column>
                                <el-table-column
                                    label="查看">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="成交信息">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="winlookItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 公告内容 -->
                        <el-collapse-item title="公告内容" name="5">
                            <div class="edit_list">
                                <div class="infobox_title">
                                    <span>{{nameOfTenderProject}}</span>
                                    <h1>成交结果公告</h1>
                                    <p>{{saveTime}}</p>
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
                                        <div class="editName">招标(采购)人联系方式：</div>
                                        <div class="editContent">{{tendereeContactInformation}}</div>
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
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:200px;">招标(采购)代理机构地址：</div>
                                            <div class="editContent">
                                                <span>{{agentAddress}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName" style="width:200px;">招标(采购)代理机构联系方式：</div>
                                            <div class="editContent">
                                                <span>{{agentPhone}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="infobox_item">
                                    <h3>成交内容</h3>
                                    <!-- 表格 -->
                                    <table border="1" cellspacing="0" cellpadding="0" style="width:100%;">
                                         <!-- 总包 -->
                                        <tr v-show="!diffFlag">
                                            <td>采购项目名称</td>
                                            <td colspan="3">{{nameOfTenderProject}}</td>
                                        </tr>
                                        <!-- 分包 -->
                                        <tr v-show="diffFlag">
                                            <td>采购项目名称</td>
                                            <td colspan="3">{{subcontractName}}</td>
                                        </tr>
                                        <!-- 分包 -->
                                        <tr v-show="diffFlag">
                                            <td style="width:150px;">入场项目分包编号</td>
                                            <td style="width:150px;">{{entrySubcontractNumber}}</td>
                                            <td style="width:150px;">项目预算金额</td>
                                            <td style="width:150px;">{{budgetAmount}}万元</td>
                                        </tr>
                                        <!-- 总包 -->
                                        <tr v-show="!diffFlag">
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
                                            <td colspan="4">谈判小组/询价小组/采购人员名单</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" height="50px">{{personnels}}</td>
                                        </tr>
                                        <tr>
                                            <td>主要成交标的</td>
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
                                            <td>成交供应商名称</td>
                                            <td colspan="3">{{nameOfSuccessfulSupplier}}</td>
                                        </tr>
                                        <tr>
                                            <td>成交供应商地址</td>
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
                                        <div class="editName" style="font-weight:bold;">备注说明：</div>
                                        <div class="editContent">{{remarks}}</div>
                                    </div>
                                </div>
                                <div class="infobox_footer">
                                    <h3>{{creatorCompanyName}}</h3>
                                    <h3>{{saveTime}}</h3>
                                </div>
                            </div>
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
            <!-- 查看分包信息 -->
            <div class="searchWrapper" v-show="searchFlag">
                <div class="searchBox">
                    <div class="search_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeSearch"></i>
                    </div>
                    <div class="search_main">
                        <el-table
                                ref="multipleTable"
                                :data="candidateMenu"
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
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                label="招标项目名称">
                                <template slot-scope="scope">{{ nameOfTenderProject }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="subcontractName"
                                label="分包名称">
                            </el-table-column>
                            <el-table-column
                                prop="subcontractContents"
                                label="分包分类">
                            </el-table-column>
                            <el-table-column
                                label="招标方式">
                                <template slot-scope="scope">{{ biddingProcurementMode }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="subcontractingControlAmount"
                                label="分包控制金额(万元)">
                            </el-table-column>
                            <el-table-column
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
            
            <!-- 查看详情 -->
            <div class="lookWrapper" v-show="lookFlag">
                <div class="lookBox">
                    <div class="pick_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeLook"></i>
                    </div>
                    <div class="main_info">
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
            <!-- 成交信息详情 -->
            <div class="winWrapper" v-show="winFlag">
                <div class="winBox">
                    <div class="pick_title">
                        <p>成交信息</p>
                        <i class="el-icon-close" @click="closeWin"></i>
                    </div>
                    <div class="box">
                        <button class="btn" @click="savePage">保存</button>
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
                                            <div class="editName">采购采购方式：</div>
                                            <div class="editContent">{{biddingProcurementMode}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">采购组织方式：</div>
                                            <div class="editContent">{{biddingOrganization}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 成交信息-->
                            <el-collapse-item title="成交信息" name="2">
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
                                            <div class="editContent">{{subcontractingControlAmount}}万元 </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目分包编号：</div>
                                            <div class="editContent">{{entrySubcontractNumber}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购数量：</div>
                                            <div class="editContent">{{purchaseAmount}} </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">拟采购货物/服务说明：</div>
                                            <div class="editContent">{{purchasePurposes}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">简要规格描述或项目基本情况：</div>
                                            <div class="editContent">{{technologyQualifications}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">主要成交标的：</div>
                                            <div class="editContent">
                                                <el-input v-model="mainWinningBid" type="textarea" :rows="3"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">单价：</div>
                                            <div class="editContent">
                                                <el-input v-model="unitPrice" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">数量：</div>
                                            <div class="editContent">
                                                <el-input v-model="number" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">规格型号：</div>
                                            <div class="editContent">
                                                <el-input v-model="specificationType" type="textarea" :rows="1"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">合同履行期：</div>
                                            <div class="editContent">
                                                <el-date-picker
                                                    placeholder="开始日期"
                                                    v-model="contractPerformancePeriod"
                                                    :picker-options="pickerOptions0"
                                                >
                                                </el-date-picker>
                                            </div>
                                            <div style="padding:0 10px;">至</div>
                                            <div class="editContent">
                                                <el-date-picker
                                                    placeholder="结束时间"
                                                    v-model="contractPerformanceEnd"
                                                    :picker-options="pickerOptions1"
                                                >
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName"><p class="star">*</p>成交供应商名称：</div>
                                            <div class="editContent">
                                            <el-input v-model="nameOfSuccessfulSupplier" readonly></el-input>
                                            </div>
                                            <el-button plain @click="pickInfo">检索</el-button>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">成交供应商地址：</div>
                                            <div class="editContent">
                                                <el-input v-model="addressOfSuccessfulSupplier"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>成交金额(小写)：</div>
                                            <div class="editContent">
                                                <p style="color:#6e622e;">人民币</p>
                                                <el-input v-model="winningAmountLowercase" clearable @blur ='inputblur'></el-input>
                                                <p style="color:#6e622e;">元</p>
                                            </div>
                                        </div>
                                        <div class="editCenter" >
                                            <div class="editName" style="color:#6e622e;padding:0 5px;">大写</div>
                                            <div class="editContent" style="color:#f00;">{{winningAmountCapitalization}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
            <!-- 查看成交信息详情 分包 -->
            <div class="winWrapper" v-show="searchwinFlag">
                <div class="winBox">
                    <div class="pick_title">
                        <p>成交信息</p>
                        <i class="el-icon-close" @click="closeWinsearch"></i>
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
                                            <div class="editName">采购采购方式：</div>
                                            <div class="editContent">{{biddingProcurementMode}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">采购组织方式：</div>
                                            <div class="editContent">{{biddingOrganization}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 成交信息-->
                            <el-collapse-item title="成交信息" name="2">
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
                                            <div class="editContent">{{subcontractingControlAmount}}万元 </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目分包编号：</div>
                                            <div class="editContent">{{entrySubcontractNumber}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">采购数量：</div>
                                            <div class="editContent">{{purchaseAmount}} </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">拟采购货物/服务说明：</div>
                                            <div class="editContent">{{purchasePurposes}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">简要规格描述或项目基本情况：</div>
                                            <div class="editContent">{{technologyQualifications}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">主要成交标的：</div>
                                            <div class="editContent">{{mainWinningBid}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">单价：</div>
                                            <div class="editContent">{{unitPrice}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">数量：</div>
                                            <div class="editContent">{{number}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">规格型号：</div>
                                            <div class="editContent">{{specificationType}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName"> 合同履行期：</div>
                                            <div class="editContent">{{contractPerformancePeriod}}至{{contractPerformanceEnd}}</div>
                                        </div>
                                    </div>
                                <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">成交供应商名称：</div>
                                            <div class="editContent">{{nameOfSuccessfulSupplier}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">成交供应商地址：</div>
                                            <div class="editContent">{{addressOfSuccessfulSupplier}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">成交金额(小写)：</div>
                                            <div class="editContent">
                                                <p style="color:#6e622e;">人民币{{winningAmountLowercase}}元</p>
                                            </div>
                                        </div>
                                        <div class="editCenter" >
                                            <div class="editName" style="color:#6e622e;padding:0 5px;">大写</div>
                                            <div class="editContent" style="color:#f00;">{{winningAmountCapitalization}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
            <!-- 检索 -->
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
                            <el-table-column align="center" width="55" label="选" >
                                <template slot-scope="scope">
                                    <el-radio :label="scope.row.companyId" v-model="templateRadio" @change.native="getTemplatePick(scope.row)">&nbsp;</el-radio>
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
                    <div class="pick_btn">
                        <button class="btn" @click="pickSure" >确定选择</button>
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
            <!-- 保存弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="deleteBox"
                width="40%"
                :before-close="deleteBoxSure">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>删除成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteBoxSure()">确 定</el-button>
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
                    <span>修改信息将导致电子件列表中的 [采购公告] 重新生成，您确认要继续吗？</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="laststepBoxSure()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 提交弹窗 -->
            <el-dialog
                title="请输入意见"
                :visible.sync="submitBox"
                width="50%">
                <div class="dialog_header">
                    <div class="left">
                        <el-button type="primary" @click="sureSubmit">确认提交</el-button>
                        <el-button type="primary" @click="handleClose">取消</el-button>
                        <el-checkbox v-model="remind">手机短信提醒</el-checkbox>
                    </div>
                    <p>当前步骤: <span>成交结果公告 </span></p>
                </div>
            </el-dialog>
            <!-- 确认提交弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="sureSubmitBox"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>提交成交结果公告成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sure()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="警告信息"
                :visible.sync="warnFlag"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>存在未添加成交信息的分包,请添加成交信息后提交!</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="warnSure">确 定</el-button>
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
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import {formatDate,bigUppercase,changeTime,checkNumber, formatTime,isPoneAvailable,digitUppercase,checkPhone} from '../../../api/base.js'
export default {
    data(){
        return {
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
                    return time.getTime() < new Date(this.contractPerformancePeriod).getTime()- (24*60*60*1000)/24;//减去一天的时间代表可以选择同一天;
                }
            },
            pickerOptions3: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            personnels:'',//组建谈判小组
            alertMsg:'',
            cancelShow:false,
            stateItem:'',// 后端返回的状态
            frameShow:false,
            passJudgeShow:true,
            projectObj:JSON.parse(window.localStorage.projectObj),
            // totalList:JSON.parse(window.localStorage.totalList),
            activeName:['1','2','3','4','5','6'],
            tableData:[],
            diffFlag:false,
            multipleSelection:[],//多选框
            idcard:'',
			writeFlag:true,// 总包输入 列表
			//检索所需字段
            pickFlag:false,// 弹窗
            readonly: true,// input只可读不可编辑
            pickData:[],
            pickItem:{},// 点击的item
            templateRadio:'',// 检索列表单选框按钮
			// 查看分包信息所需字段
			searchFlag:false,//弹窗
            // 采购项目信息所需字段
            nameOfTenderProject:'',// 采购项目名称
            biddingProjectNumber:'',// 采购项目编号
            tenderPurchaserName:'',// 采购(采购)人
			budgetAmount:'',// 采购项目预算金额
			amountOfBiddingProject:'',//采购项目金额
			biddingProcurementMode:'',// 采购采购方式
			biddingOrganization:'',// 采购组织方式
			typesOfBiddingProjects:'',// 采购项目类型
            // 保存所需字段
            address:'',// 采购人地址
            tendereeContactInformation:'',// 采购人联系方式
            announcementName:'',//֖ 公告名称
            calibrationDate:'',//֖成交日期
            projectLeader:'',// 项目负责人
            leaderContactInformation:'',//֖项目负责人联系方式
            remarks:'',//֖备注
            mainWinningBid:'',// 主要成交标的
            unitPrice:'',//֖单价
            number:'',//数量
            specificationType:'',//规格型号
            contractPerformancePeriod:'',// 合同履行期开始
            contractPerformanceEnd:'',// 合同履行期结束
            idOfSuccessfulSupplier:'',//成交供应商ID
            nameOfSuccessfulSupplier:'',//成交供应商
            addressOfSuccessfulSupplier:'',//成交供应商地址
            winningAmountLowercase:'',//成交金额 小写
            winningAmountCapitalization:'',//成交金额 大写
            entrySubcontractNumber:'',// 入场项目编号 分包
            projectCode:'',//入场项目编号 总包
			saveBox:false,//保存弹窗
			winnResultId:'',// 成交结果记录ID
			//成交候选人
			technologyQualifications:'',// 谈判小组/询价小组/采购人员名单
			purchaseAmount:'',// 采购数量
			purchasePurposes:'',//拟采购货物/服务说明
            // 下一步页面
            showFlag:false,
            projectLeader:'',// 项目联系人
            projectLeaderPhone:'',//联系方式
            remark:'',// 备注
            // 上一步所需字段
            laststepBox:false,
            // 提交弹窗
            submitBox:false,
            remind:'',//手机短信提醒
            // 确定提交
            sureSubmitBox:false,
            warnFlag:false,// 警告弹窗
            headerBtn:true,
            infoList:[],
            deleteBox:false,// 删除弹窗
			// 公告内容
			publicityStartTime:'',// 中标候选人公示期开始
			publicityEndTime:'',// 中标候选人公示期结束
			CandidateList:[],//中标候选人数据
			amountId:'',// 总包
			candidateMenu:[],// 分包列表
			nameOfTenderProject:'',// 招标项目名称
			biddingProcurementMode:'',// 招标方式
			name:'',// 分包项目名称
			number:'',// 入场项目分包编号 (分包列表)
            subpackageData:[],// 确定选择的列表
            updateTime:'',// 采购信息日期
			// 查看详情
			lookFlag:false,
			// 成交信息详情
			winFlag:false,
			scopeOfTender:'',// 采购范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            totalProjectId:'',
            searchwinFlag:false,// 查看成交信息 分包 弹窗
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            candidateMenuItem:[],
            areaList:[],
            flag:false,// async控制一直请求接口
            itemTemp:{},
            number1:'',
            itemsList:[],// 成交结果公告 返回的items
            creatorCompanyName:'',// 创建人名字
            saveTime:'',// 保存时间
            idOfSuccessfulSupplier:'',//检索下一步、保存
            // 文件上传所需字段
            enclosureData:[{
                id:1,
                appendixName: "招标（采购）人确认函",
                attachlist: []
            },
            {
                id:2,
                appendixName: "成交结果公告",
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
            active_obj:{},//点击笔记录的对象
            save_obj:{},//点击保存记录的对象
            winnResultItemId:'',// 成交信息ID
            tempList:[],// 保存分包的成交信息的数组
        }
    },
    created(){
        if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
            // 分包
            this.diffFlag = true;
            this.entrySubcontractNumber = this.projectObj.totalProjectId;
        }else{
            // 总包
            this.diffFlag = false;
            this.projectCode = this.projectObj.totalProjectId;
        }
        // this.getInitInfo();// 初始化查询
		this.getbiddingInfo();// 招标项目信息
        // this.getCandidateInfo();// 获取中标候选人记录数据
        this.getmanageInfo();// 办理记录
        this.getsubpackageInfo();// 分包信息查询
        this.getinformation();// 成交结果公告信息
        this.getDecideList();
        this.uploadList();//上传列表
        this.getTwoList();// 成交结果公告附件
        this.getOneList();//招标（采购）人确认函附件
    },
    methods:{
        // 复选框的列表
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
		// 检索
        pickInfo(){
            this.pickFlag = true;
            this.getPickInfo();// 检索列表数据
        },
        //关闭检索
        closePick(){
            this.pickFlag = false;
		},
		// 查看
		searchSubpackage(){
			this.searchFlag =true;
			this.getsubInfo(); // +分包信息
		},
		// 关闭搜索
		closeSearch(){
			this.searchFlag = false;
        },
		// 大写
		inputblur(){
            if(!checkNumber(this.winningAmountLowercase) || this.winningAmountLowercase =='' || this.winningAmountLowercase ==null){
                // this.$layer.msg('请输入成交金额');
                return false
            }else{
                this.winningAmountCapitalization = digitUppercase(this.winningAmountLowercase);
            }
        },
        checkPhone(num){
            if(num == 1){
                if(!isPoneAvailable(this.tendereeContactInformation) && !checkPhone(this.tendereeContactInformation)){
                    this.$layer.msg('请输入正确的联系方式!');
                    return false;
                }
            }else{
                if(!isPoneAvailable(this.leaderContactInformation) && !checkPhone(this.leaderContactInformation)){
                    this.$layer.msg('请输入正确的联系方式!');
                    return false;
                }
            }
        },
        // 保存和下一步公用方法
        newly(num){
            if(!this.diffFlag){
                // 总包
                if(this.unitPrice != "" && this.unitPrice != null && !checkNumber(this.unitPrice)){
                    this.$layer.msg('单价请输入数字类型');
                    return false;
                }else if(this.number != "" && this.number != null && !checkNumber(this.number)){
                    this.$layer.msg('数量请输入数字类型');
                    return false;
                }else if(this.tendereeContactInformation != "" && this.tendereeContactInformation != null && !isPoneAvailable(this.tendereeContactInformation) && !checkPhone(this.tendereeContactInformation)){
                    this.$layer.msg('联系方式请输入正确!');
                    return false;
                }else if(this.leaderContactInformation != "" && this.leaderContactInformation != null && !isPoneAvailable(this.leaderContactInformation) && !checkPhone(this.leaderContactInformation)){
                    this.$layer.msg('联系方式请输入正确!');
                    return false;
                }else if(!this.nameOfSuccessfulSupplier){
                    this.$layer.msg('请输入成交供应商名称!');
                    return false;
                }else if(!this.winningAmountLowercase){
                    this.$layer.msg('请输入正确的成交金额!');
                    return false;
                }else if(this.winningAmountLowercase != "" && this.winningAmountLowercase != null && !checkNumber(this.winningAmountLowercase)){
                    this.$layer.msg('请输入正确的成交金额!');
                    return false;
                }else {
                    if(num == 1){
                        // 保存
                        this.savecandidateMsg(num);
                    }else{
                        // 下一步
                        this.writeFlag = false;// 输入框的页面
                        this.showFlag = true;// 下一步页面
                        this.savecandidateMsg(num);
                        this.getinformation();// 成交结果公告信息
                        this.getCandidateInfo();// 获取中标候选人记录数据
                        // this.getmanageInfo();// 办理记录
                    }
                }
            }else {
                // 分包
                if(this.tendereeContactInformation != "" && this.tendereeContactInformation != null && !isPoneAvailable(this.tendereeContactInformation) && !checkPhone(this.tendereeContactInformation)){
                    this.$layer.msg('成交信息联系方式请输入正确!');
                    return false;
                }else if(this.leaderContactInformation != "" && this.leaderContactInformation != null && !isPoneAvailable(this.leaderContactInformation) && !checkPhone(this.leaderContactInformation)){
                    this.$layer.msg('成交信息联系方式请输入正确!');
                    return false;
                }else{
                    let flag = true;
                    let arr = [];
                    let resultObj = {};
                    let resultFlag = true;
                    for(let i=0;i<this.tempList.length;i++){
                        resultFlag = true;
                        for(let j=0;j<this.areaList.length;j++){
                            if(this.areaList[j].entrySubcontractNumber == this.tempList[i].entrySubcontractNumber){
                                resultObj = this.tempList[i];
                                resultFlag = false;
                            }
                        }
                        if(resultFlag){
                            arr.push(resultObj);
                        }
                    }
                   let arrList = [];
                   if(arr.length != 0){
                       arrList  = [...arr,...this.areaList];
                   }else{
                       arrList  = this.areaList;
                   }
                    arrList.forEach(item=>{
                        if(!item.nameOfSuccessfulSupplier){
                            this.warnFlag = true;
                            flag = false;
                            return false;
                        }else if(!item.winningAmountLowercase){
                            this.warnFlag = true;
                            flag = false;
                            return false;
                        }
                    })
                    if(flag){
                        if(arrList.length != 0){
                            if(num == 1){
                                // 保存
                                this.savecandidateInfo(num);
                            }else{
                                this.savecandidateInfo(num);
                                this.getinformation();// 成交结果公告信息
                                this.getCandidateInfo();// 获取中标候选人记录数据
                                // this.getmanageInfo();// 办理记录
                                this.writeFlag = false;// 输入框的页面
                                this.showFlag = true;// 下一步页面
                            }
                        }else{
                            this.warnFlag = true;
                        }
                    } 
                }
            }
        },
        // 上一步
        goBack(){
            // this.laststepBox = true;// 上一步弹窗 确定
            this.writeFlag = true;// 输入框的页面
            this.showFlag = false;// 下一步页面
            this.getLastTemp();// 上一步查询
        },
        // 提交
        submit(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/winnResultController/submit",
                data:{
                    state:'待办理',
                    winnResultId:this.winnResultId,// 工本费接收账户id 
                    operationFlow:'成交结果公告',
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.sureSubmitBox = true;
                    this.getInitInfo(); // 初始化查詢
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 确认提交
        sureSubmit(){
            this.sureSubmitBox = false;// 确定提交弹窗
            this.submitBox = false;
        },
        // 确认提交 ---> 确定
        sure(){
            this.sureSubmitBox = false;// 确定提交弹窗
            this.submitBox = false;// 
            this.headerBtn = false;
            this.showFlag = true;
            this.submitBox = false;
            this.getmanageInfo();// 办理记录查询
        },
        handleClose(){
            this.saveBox = false;// 保存弹窗 确定
            this.laststepBox = false;// 上一步弹窗 确定
            this.submitBox = false;// 提交弹窗
            this.frameShow = false;
            this.cancelShow = false;
            this.warnFlag = false;//警告弹窗
            this.deleteBox = false;// 删除弹窗
        },
        // 警告弹窗确定
        warnSure(){
            this.warnFlag = false;//警告弹窗
        },
        // 保存弹窗 确定
        saveBoxSure(){
            this.saveBox = false;
        },
        // 上一步弹窗 确定
        laststepBoxSure(){
            this.laststepBox = false;
        },
        
        // 成交信息
		winItem(row){
			this.subcontractName = row.subcontractName;// 分包名称
			this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            let flag = true;
            let areaItem = {};
            this.areaList.forEach(area=>{
                if(row.entrySubcontractNumber == area.entrySubcontractNumber){
                    flag = false;
                    areaItem = area;
                    this.winnResultItemId= area.winnResultItemId;// 成交信息ID
                }
            })
            if(flag){
                this.winnResultItemId= areaItem.winnResultItemId;// 成交信息ID
            }

            this.winFlag = true;
			this.getbiddingInfo();// 招标项目信息
            this.getinformation();// 招标公告
            // 从本地里边获取 与当前所点击的分包编号对应 获取ID
            // this.totalList.forEach(area=>{
            //     if(row.entrySubcontractNumber == area.entrySubcontractNumber){
            //         this.winnResultItemId= area.winnResultItemId;// 成交信息ID
            //     }
            // })
            if(this.winnResultItemId == undefined || this.winnResultItemId == ''){
                this.mainWinningBid='';// 主要成交标的
                this.unitPrice='';// 单价
                this.number='';// 数量
                this.specificationType='';// 规格型号
                this.contractPerformancePeriod='';// 合同履行期开始
                this.contractPerformanceEnd='';// 合同履行期结束
                this.nameOfSuccessfulSupplier='';// 成交供应商名称
                this.addressOfSuccessfulSupplier='';//成交供应商地址
                this.winningAmountLowercase='';// 成交金额小写
                this.winningAmountCapitalization='';// 成交金额大写
                this.idOfSuccessfulSupplier = '';
            }else{
                this.searchwinArea();// 查看成交信息详情
            }
        },
        // 查看成交信息详情
        searchwinArea(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/winnResultController/selectItem/"+this.winnResultItemId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.mainWinningBid=res.data.data.mainWinningBid;// 主要成交标的
                    this.unitPrice=res.data.data.unitPrice;// 单价
                    this.number=res.data.data.number;// 数量
                    this.specificationType=res.data.data.specificationType;// 规格型号
                    if(res.data.data.contractPerformancePeriod !=null){
                        this.contractPerformancePeriod=dayjs(res.data.data.contractPerformancePeriod).format('YYYY-MM-DD');// 合同履行期开始
                    }
                    if(res.data.data.contractPerformanceEnd !=null){
                        this.contractPerformanceEnd=dayjs(res.data.data.contractPerformanceEnd).format('YYYY-MM-DD');// 合同履行期结束
                    }
                    this.nameOfSuccessfulSupplier=res.data.data.nameOfSuccessfulSupplier;// 成交供应商名称
                    this.addressOfSuccessfulSupplier=res.data.data.addressOfSuccessfulSupplier;//成交供应商地址
                    this.winningAmountLowercase=res.data.data.winningAmountLowercase;// 成交金额小写
                    this.winningAmountCapitalization=res.data.data.winningAmountCapitalization;// 成交金额大写
                    this.idOfSuccessfulSupplier = res.data.data.idOfSuccessfulSupplier;//成交供应商ID;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 成交信息详情 保存
        savePage(){
            if(this.unitPrice != "" && this.unitPrice != null && !checkNumber(this.unitPrice)){
                this.$layer.msg('单价请输入数字类型');
                return false;
            }else if(this.number != "" && this.number != null && !checkNumber(this.number)){
                this.$layer.msg('数量请输入数字类型');
                return false;
            }else if(!this.nameOfSuccessfulSupplier){
                this.$layer.msg('请输入成交供应商名称!');
                return false;
            }else if(!this.winningAmountLowercase){
                this.$layer.msg('请输入成交金额!');
                return false;
            }else if(!checkNumber(this.winningAmountLowercase)){
                 this.$layer.msg('请输入正确的成交金额!');
                return false;
            }else{
                if(this.winnResultId == ''){
                    let obj = {}
                    if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                        // 分包
                        obj = {
                            mainWinningBid:this.mainWinningBid,
                            unitPrice:this.unitPrice,
                            number:this.number,
                            specificationType:this.specificationType,
                            contractPerformancePeriod:changeTime(this.contractPerformancePeriod),
                            contractPerformanceEnd:changeTime(this.contractPerformanceEnd),
                            nameOfSuccessfulSupplier:this.nameOfSuccessfulSupplier,
                            addressOfSuccessfulSupplier:this.addressOfSuccessfulSupplier,
                            winningAmountLowercase:this.winningAmountLowercase,
                            winningAmountCapitalization:this.winningAmountCapitalization,
                            address:this.address,
                            tendereeContactInformation:this.tendereeContactInformation,
                            announcementName:this.announcementName,
                            calibrationDate:changeTime(this.calibrationDate),
                            projectLeader:this.projectLeader,
                            leaderContactInformation:this.leaderContactInformation,
                            remarks:this.remarks,
                            operationFlow:'成交结果公告',
                            items:[
                                {
                                    entrySubcontractNumber:this.entrySubcontractNumber
                                }
                            ]
                        }
                    }
                    this.$axios({
                        method:'POST',
                        url:baseUrl + '/winnResultController/saveOrUpdateMain',
                        data:obj
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.winnResultId = res.data.data.winnResultId;
                            if(res.data.data.calibrationDate !=null){
                                this.calibrationDate = dayjs(res.data.data.calibrationDate).format('YYYY-MM-DD');
                            }
                            this.areaList = res.data.data.items;
                            let object = {
                                entrySubcontractNumber:this.entrySubcontractNumber,
                                mainWinningBid:this.mainWinningBid,
                                unitPrice:this.unitPrice,
                                number:this.number,
                                specificationType:this.specificationType,
                                contractPerformancePeriod:changeTime(this.contractPerformancePeriod),
                                contractPerformanceEnd:changeTime(this.contractPerformanceEnd),
                                nameOfSuccessfulSupplier:this.nameOfSuccessfulSupplier,
                                addressOfSuccessfulSupplier:this.addressOfSuccessfulSupplier,
                                winningAmountLowercase:this.winningAmountLowercase,
                                winningAmountCapitalization:this.winningAmountCapitalization,
                                idOfSuccessfulSupplier : this.idOfSuccessfulSupplier,
                                winnResultId:this.winnResultId,
                                winnResultItemId:this.winnResultItemId,
                            }
                            this.$axios({
                                method: "POST",
                                url: baseUrl+"/winnResultController/saveOrUpdateItem",
                                data:object
                            }).then(res=>{
                                if(res.data.status == 200){
                                    this.saveBox = true;
                                    // this.getLastTemp();// 查询
                                    let object = {};
                                    if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                                        // 分包
                                        object ={
                                            entrySubcontractNumber:this.projectObj.totalProjectId
                                        }
                                    }else{
                                        // 总包
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
                                            this.winnResultId = res.data.data[0].winnResultId;// 主键ID
                                            this.areaList = res.data.data[0].items;// 后端返回的items
                                            this.infoList = res.data.data;
                                            this.infoList.forEach(item => {
                                                this.creatorCompanyName = item.creatorCompanyName;// 创建人名字
                                                this.areaList.forEach(area=>{
                                                    if(this.projectObj.totalProjectId == area.projectCode){
                                                        this.mainWinningBid=area.mainWinningBid;// 主要中标标的
                                                        this.unitPrice=area.unitPrice;// 单价
                                                        this.number=area.number;// 数量
                                                        this.specificationType=area.specificationType;// 规格型号
                                                        if(area.contractPerformancePeriod !=null){
                                                            this.contractPerformancePeriod=formatDate(area.contractPerformancePeriod);// 合同履行期开始
                                                        }
                                                        if(area.contractPerformanceEnd !=null){
                                                            this.contractPerformanceEnd=formatDate(area.contractPerformanceEnd);// 合同履行期结束
                                                        }
                                                        this.nameOfSuccessfulSupplier=area.nameOfSuccessfulSupplier;// 中标供应商名称
                                                        this.addressOfSuccessfulSupplier=area.addressOfSuccessfulSupplier;//中标供应商地址
                                                        this.winningAmountLowercase=area.winningAmountLowercase;// 中标金额小写
                                                        this.winningAmountCapitalization=area.winningAmountCapitalization;// 中标金额大写
                                                        this.idOfSuccessfulSupplier = area.idOfSuccessfulSupplier
                                                    }
                                                })
                                            });
                                        }else{
                                            this.$layer.msg(res.data.msg);
                                        }
                                    }).catch(err=>{
                                        console.log(err);
                                    })
                                }else{
                                    this.$layer.msg(res.data.msg);
                                }
                            }).catch(err=>{
                                console.log(err)
                            })
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                    
                }else{
                    let object = {
                        entrySubcontractNumber:this.entrySubcontractNumber,
                        mainWinningBid:this.mainWinningBid,
                        unitPrice:this.unitPrice,
                        number:this.number,
                        specificationType:this.specificationType,
                        contractPerformancePeriod:changeTime(this.contractPerformancePeriod),
                        contractPerformanceEnd:changeTime(this.contractPerformanceEnd),
                        nameOfSuccessfulSupplier:this.nameOfSuccessfulSupplier,
                        addressOfSuccessfulSupplier:this.addressOfSuccessfulSupplier,
                        winningAmountLowercase:this.winningAmountLowercase,
                        winningAmountCapitalization:this.winningAmountCapitalization,
                        idOfSuccessfulSupplier : this.idOfSuccessfulSupplier,
                        winnResultId:this.winnResultId,
                        winnResultItemId:this.winnResultItemId,
                    }
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/winnResultController/saveOrUpdateItem",
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.saveBox = true;
                            // this.getLastTemp();// 
                            let object = {};
                            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                                // 分包
                                object ={
                                    entrySubcontractNumber:this.projectObj.totalProjectId
                                }
                            }else{
                                // 总包
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
                                    this.winnResultId = res.data.data[0].winnResultId;// 主键ID
                                    this.areaList = res.data.data[0].items;// 后端返回的items
                                    this.infoList = res.data.data;
                                    this.infoList.forEach(item => {
                                        this.creatorCompanyName = item.creatorCompanyName;// 创建人名字
                                        this.areaList.forEach(area=>{
                                            if(this.projectObj.totalProjectId == area.projectCode){
                                                this.mainWinningBid=area.mainWinningBid;// 主要中标标的
                                                this.unitPrice=area.unitPrice;// 单价
                                                this.number=area.number;// 数量
                                                this.specificationType=area.specificationType;// 规格型号
                                                if(area.contractPerformancePeriod !=null){
                                                    this.contractPerformancePeriod=formatDate(area.contractPerformancePeriod);// 合同履行期开始
                                                }
                                                if(area.contractPerformanceEnd !=null){
                                                    this.contractPerformanceEnd=formatDate(area.contractPerformanceEnd);// 合同履行期结束
                                                }
                                                this.nameOfSuccessfulSupplier=area.nameOfSuccessfulSupplier;// 中标供应商名称
                                                this.addressOfSuccessfulSupplier=area.addressOfSuccessfulSupplier;//中标供应商地址
                                                this.winningAmountLowercase=area.winningAmountLowercase;// 中标金额小写
                                                this.winningAmountCapitalization=area.winningAmountCapitalization;// 中标金额大写
                                                this.idOfSuccessfulSupplier = area.idOfSuccessfulSupplier
                                            }
                                        })
                                    });
                                }else{
                                    this.$layer.msg(res.data.msg);
                                }
                            }).catch(err=>{
                                console.log(err);
                            })
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                this.winFlag = false; 
            }
        },
        // 外层保存 ==> 总包
        savecandidateMsg(num){
            // 总包
            let object = {
                agentAddress:this.agentAddress,
                agentPhone :this.agentPhone,
                address:this.address,
                tendereeContactInformation:this.tendereeContactInformation,
                announcementName:this.announcementName,
                calibrationDate:changeTime(this.calibrationDate),
                projectLeader:this.projectLeader,
                leaderContactInformation:this.leaderContactInformation,
                personnels:this.personnels,
                remarks:this.remarks,
                operationFlow:'成交结果公告',
                items:[{
                    projectCode:this.projectCode,
                    mainWinningBid:this.mainWinningBid,
                    unitPrice:this.unitPrice,
                    number:this.number,
                    specificationType:this.specificationType,
                    contractPerformancePeriod:this.contractPerformancePeriod,
                    contractPerformanceEnd:this.contractPerformanceEnd,
                    nameOfSuccessfulSupplier:this.nameOfSuccessfulSupplier,
                    addressOfSuccessfulSupplier:this.addressOfSuccessfulSupplier,
                    winningAmountLowercase:this.winningAmountLowercase,
                    winningAmountCapitalization:this.winningAmountCapitalization,
                    idOfSuccessfulSupplier:this.idOfSuccessfulSupplier
                }]
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/winnResultController/saveOrUpdate',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                    }
                    this.winnResultId = res.data.data.winnResultId;
                    if(res.data.data.calibrationDate == 0 || res.data.data.calibrationDate == null){
                        this.calibrationDate = ''
                    }else{
                        this.calibrationDate = dayjs(res.data.data.calibrationDate).format('YYYY-MM-DD');
                    }
                    this.agentAddress = res.data.data.agentAddress;
                    this.agentPhone  = res.data.data.agentPhone;
                    this.address= res.data.data.address;
                    this.announcementName= res.data.data.announcementName;// 公告名称
                    this.leaderContactInformation=res.data.data.leaderContactInformation;
                    this.projectLeader=res.data.data.projectLeader;// 项目负责人
                    this.remarks=res.data.data.remarks; // 备注
                    this.tendereeContactInformation=res.data.data.tendereeContactInformation;
                    this.personnels = res.data.data.personnels;
                    res.data.data.items.forEach(item=>{
                        if(this.projectObj.totalProjectId == item.projectCode){
                            this.mainWinningBid=area.mainWinningBid;// 主要成交标的
                            this.unitPrice=area.unitPrice;// 单价
                            this.number=area.number;// 数量
                            this.specificationType=area.specificationType;// 规格型号
                            if(area.contractPerformancePeriod !=null){
                                this.contractPerformancePeriod=formatDate(area.contractPerformancePeriod);// 合同履行期开始
                            }
                            if(area.contractPerformanceEnd !=null){
                                this.contractPerformanceEnd=formatDate(area.contractPerformanceEnd);// 合同履行期结束
                            }
                            this.nameOfSuccessfulSupplier=area.nameOfSuccessfulSupplier;// 成交供应商名称
                            this.addressOfSuccessfulSupplier=area.addressOfSuccessfulSupplier;//成交供应商地址
                            this.winningAmountLowercase=area.winningAmountLowercase;// 成交金额小写
                            this.winningAmountCapitalization=area.winningAmountCapitalization;// 成交金额大写
                            this.idOfSuccessfulSupplier = area.idOfSuccessfulSupplier;
                            this.winnResultItemId= area.winnResultItemId;// 成交信息ID
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 外层保存 ==> 分包
        savecandidateInfo(num){
            let object = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                object = {
                    agentAddress:this.agentAddress,
                    agentPhone:this.agentPhone,
                    address:this.address,
                    tendereeContactInformation:this.tendereeContactInformation,
                    announcementName:this.announcementName,
                    calibrationDate:changeTime(this.calibrationDate),
                    projectLeader:this.projectLeader,
                    leaderContactInformation:this.leaderContactInformation,
                    personnels:this.personnels,
                    remarks:this.remarks,
                    operationFlow:'成交结果公告',
                    items:[
                        {
                            entrySubcontractNumber:this.projectObj.totalProjectId
                        }
                    ]
                }
            }
            this.$axios({                       
                method:'POST',
                url:baseUrl + '/winnResultController/saveOrUpdateMain',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                    }
                    this.agentAddress = res.data.data.agentAddress;
                    this.agentPhone  = res.data.data.agentPhone;
                    this.personnels = res.data.data.personnels;
                    this.winnResultId = res.data.data.winnResultId;
                    if(res.data.data.calibrationDate == 0 || res.data.data.calibrationDate == null){
                        this.calibrationDate = ''
                    }else{
                        this.calibrationDate = dayjs(res.data.data.calibrationDate).format('YYYY-MM-DD');
                    }
                    this.infoList = res.data.data;
                    this.areaList = res.data.data.items;
                    this.areaList.forEach(area=>{
                        if(area.entrySubcontractNumber == this.projectObj.totalProjectId){
                            this.mainWinningBid=area.mainWinningBid;// 主要成交标的
                            this.unitPrice=area.unitPrice;// 单价
                            this.number=area.number;// 数量
                            this.specificationType=area.specificationType;// 规格型号
                            if(area.contractPerformancePeriod !=null){
                                this.contractPerformancePeriod=dayjs(area.contractPerformancePeriod).format('YYYY-MM-DD');// 合同履行期开始
                            }
                            if(area.contractPerformanceEnd !=null){
                                this.contractPerformanceEnd=dayjs(area.contractPerformanceEnd).format('YYYY-MM-DD');// 合同履行期结束
                            }
                            this.nameOfSuccessfulSupplier=area.nameOfSuccessfulSupplier;// 成交供应商名称
                            this.addressOfSuccessfulSupplier=area.addressOfSuccessfulSupplier;//成交供应商地址
                            this.winningAmountLowercase=area.winningAmountLowercase;// 成交金额小写
                            this.winningAmountCapitalization=area.winningAmountCapitalization;// 成交金额大写
                            this.idOfSuccessfulSupplier = area.idOfSuccessfulSupplier;
                            this.winnResultItemId= area.winnResultItemId;// 成交信息ID
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        
        // 成交结果公告信息
        getinformation(){
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
                method: "POST",
                url: baseUrl+"/tenderNoticeController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data.length>0){
                        this.itemsList = res.data.data[0].items;
                        if(res.data.data[0].updateTime !=null){
                            this.updateTime = formatDate(res.data.data[0].updateTime);// 采购信息日期
                        }else{
                            this.updateTime = "" 
                        }
                        if(this.itemsList.length >0){
                            this.itemsList.forEach(item=>{
                                if(item.entrySubcontractNumber == this.entrySubcontractNumber){
                                    // this.personnels = item.personnels;
                                    this.technologyQualifications=item.technologyQualifications;// 谈判小组/询价小组/采购人员名单
                                    this.purchaseAmount=item.purchaseAmount;// 采购数量
                                    this.purchasePurposes=item.purchasePurposes;// 拟采购货物/服务说明
                                }else {
                                    // this.personnels = item.personnels;
                                    this.technologyQualifications=item.technologyQualifications;// 谈判小组/询价小组/采购人员名单
                                    this.purchaseAmount=item.purchaseAmount;// 采购数量
                                    this.purchasePurposes=item.purchasePurposes;// 拟采购货物/服务说明
                                }
                            })
                        }
                    }
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
       
		// 获取中标候选人记录数据
		getCandidateInfo(){
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
                method: "POST",
                url: baseUrl+"/winnCandidaController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.CandidateList = res.data.data;
                    if(this.CandidateList.length>0){
                        this.CandidateList.forEach(item => {
                            this.publicityStartTime = formatDate(item.publicityStartTime);// 公示开始日期
                            this.publicityEndTime = formatDate(item.publicityEndTime);// 公示结束日期
                        });
                    }
                }else{
                    this.$layer.msg(res.data.msg);
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
					entrySubcontractNumber:this.number1,
					subcontractName:this.name,
					totalProjectId:this.amountId,
					subcontractingState:'办理通过'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.candidateMenu = res.data.data.list;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 分包列表  确定选择
		sureChoice(){
            let arr = [...this.subpackageData,...this.multipleSelection];
            this.subpackageData = this.removeData(arr,'entrySubcontractNumber');
            this.multipleSelection.map((item,index)=>{
                var obj = {};
                obj.entrySubcontractNumber = item.entrySubcontractNumber;
                // this.areaList.push(obj);
                this.tempList.push(obj)
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
        // 删除分包信息
        deleteItem(row){
            if(row.entrySubcontractNumber == this.projectObj.totalProjectId){
                this.$layer.msg('不可删除当前项目分包编号')
                return;
            }else{
                let arr = [];
                this.areaList.forEach(item=>{
                    if(item.entrySubcontractNumber == row.entrySubcontractNumber){
                        this.winnResultItemId = item.winnResultItemId
                    }
                })
                arr.push(this.winnResultItemId)
                if(arr[0] != undefined){
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/winnResultController/deleteById",
                        data:{
                            listId:arr
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.deleteBox = true;// 删除弹窗
                            this.subcontractItePrimaryKeyId  = row.subcontractItePrimaryKeyId;
                            for(var i=0; i<this.tempList.length;i++){
                                var item = this.tempList[i];
                                if(row.entrySubcontractNumber == item.entrySubcontractNumber){
                                    this.tempList.splice(i,1);
                                }
                            }
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    for (let i = 0; i < this.subpackageData.length; i++) {
                        let item = this.subpackageData[i];
                        if(row.subcontractItePrimaryKeyId == item.subcontractItePrimaryKeyId){
                            this.subpackageData.splice(i,1);
                        }
                    }
                    for(var i=0; i<this.tempList.length;i++){
                        var item = this.tempList[i];
                        if(row.entrySubcontractNumber == item.entrySubcontractNumber){
                            this.tempList.splice(i,1);
                            
                        }
                    }
                }
                
            }
        },
        // 删除弹窗确定按钮
        deleteBoxSure(){
            this.deleteBox = false;
            for (let i = 0; i < this.subpackageData.length; i++) {
                let item = this.subpackageData[i];
                if(this.subcontractItePrimaryKeyId == item.subcontractItePrimaryKeyId){
                    this.subpackageData.splice(i,1);
                }
            }
        },
		// 查看
		lookoverItem(row){
			this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
			this.subcontractName = row.subcontractName;// 分包名称 
			this.subcontractContents = row.subcontractContents;// 分包内容
			this.scopeOfTender = row.scopeOfTender;// 采购范围
			this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
			this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
			this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
			this.lookFlag = true;
        },
        // 查看成交信息---> 分包
        winlookItem(row){
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额
            this.subcontractName = row.subcontractName;// 分包名称
            let flag = true;
            let areaItem = {};
            this.areaList.forEach(area=>{
                if(row.entrySubcontractNumber == area.entrySubcontractNumber){
                    flag = false;
                    areaItem = area;
                    this.winnResultItemId= area.winnResultItemId;// 成交信息ID
                }
            })
            if(flag){
                this.winnResultItemId= areaItem.winnResultItemId;// 成交信息ID
            }
            this.searchwinArea();// 查看成交信息详情
            this.getbiddingInfo();// 招标项目信息
            this.getinformation();// 招标公告
            this.searchwinFlag = true;
        },
        closeWinsearch(){
            this.searchwinFlag = false;
        },
		//关闭查看详情
		closeLook(){
			this.lookFlag = false;
		},
		closeWin(){
			this.winFlag = false;
		},
        // 办理记录
        async getmanageInfo(){
            await this.getInitInfo();
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.winnResultId
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.winnResultId
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/historyController/selectHistoryList",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.manageDate = res.data.data;
                    if(this.manageDate.length>0){
                        this.manageDate.forEach(item => {
                            item.creationTime = formatDate(item.creationTime)
                        });
                    }
                }else{
                    this.$layer.msg(res.data.msg);
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
                    var obj = {};
                    res.data.data.map((item,index)=>{
                        if(item.value == '采购异常'){
                            obj.zhaobiao = item;
                        }
                        if(item.value == '成交结果公告'){
                            obj.gonggao = item
                        }
                        if(item.value == '采购文件'){
                            obj.wenjian = item
                        }
                    })
                    
                    //采购勾且本业勾，可以看
                    if(obj.zhaobiao.state == '办理通过' && obj.gonggao.state == '办理通过'){
                        this.passJudgeShow = true;
                        this.frameShow = false;
                    //如果上一步打钩，进一步判断
                    }else if(obj.wenjian.state == '办理通过' ){
                        //如果采购打钩，则本业必须打勾
                        if(obj.zhaobiao.state == '办理通过'&& obj.gonggao.state == '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                            //如果采购不打勾
                        }else if(obj.zhaobiao.state != '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        }else{
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成采购文件，无法进行成交结果公告操作!'
                            }
                        }
                    }else{
                        //其他的都不能看
                        this.passJudgeShow = false;
                        this.frameShow = true;
                        if(obj.zhaobiao.state == '办理通过'){
                            this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                        }else{
                            this.alertMsg = '尚未完成采购文件，无法进行成交结果公告操作!'
                        }
                    }
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 采购项目信息
        getbiddingInfo(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 采购项目名称
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 采购项目编号
					this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 采购项目金额
					this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 采购采购方式
					this.biddingOrganization = res.data.data.biddingOrganization;// 采购组织方式
					this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 采购项目类型
					this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
					this.budgetAmount = res.data.data.budgetAmount;// 采购项目预算金额 
                    this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                    this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // +分包信息
		getsubInfo(){
			this.$axios({
                method: "POST",
                url: baseUrl+"/winnResultController/subcontract",
                data:{
					entrySubcontractNumber:this.entrySubcontractNumber
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
                    this.candidateMenu = arrList;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
         // 初始化分包查询
        async getsubpackageInfo(){
            await this.getInitInfo();
            let lookArr = [];
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                if(this.infoList.length == 0){
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
                    this.subpackageData = res.data.data;
                    this.subpackageData.forEach(item=>{
                        if(this.projectObj.totalProjectId == item.entrySubcontractNumber){
                            this.subcontractName = item.subcontractName;
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
         // 获取成交结果公示记录数据
        getInitInfo(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                object ={
                    entrySubcontractNumber:this.entrySubcontractNumber
                }
            }else{
                // 总包
                object ={
                    projectCode:this.projectCode
                }
            }
            return  this.$axios({
                method:'POST',
                url:baseUrl + '/winnResultController/select',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.infoList = res.data.data;
                    if (res.data.data == null ||  res.data.data.length<=0){
                        this.writeFlag = true; // 有保存和下一步的按钮
                    }else{
                        this.infoList.forEach(item => {
                            if(item.state == '编辑中' || item.state == '办理未通过'){
                                this.writeFlag = false;// 有保存和下一步的按钮
                                this.showFlag = true;// 有上一步和提交的页面
                            }else{
                                this.writeFlag = false;
                                this.headerBtn = false;// 有上一步和提交的按钮
                                this.showFlag = true;
                            }
                            this.agentAddress = item.agentAddress;
                            this.agentPhone  = item.agentPhone;
                            this.personnels = item.personnels;
                            this.winnResultId = item.winnResultId;// 主键ID
                            this.areaList = item.items;// 后端返回的items
                            this.stateItem = item.state;
                            this.address= item.address;
                            this.tendereeContactInformation= item.tendereeContactInformation;
                            this.announcementName= item.announcementName;
                            if(item.calibrationDate !=null){
                                this.calibrationDate = formatDate(item.calibrationDate);
                            }else{
                                this.calibrationDate = ""
                            }
                            this.projectLeader= item.projectLeader;
                            this.leaderContactInformation= item.leaderContactInformation;
                            this.remarks= item.remarks;
                            
                            if(item.saveTime !=null ){
                                this.saveTime = formatDate(item.saveTime);// 保存时间
                            }else{
                                this.saveTime = ""
                            }
                            this.creatorCompanyName = item.creatorCompanyName;// 创建人名字
                            this.areaList.forEach(area=>{
                                // 总包
                                if(this.projectObj.totalProjectId == area.projectCode){
                                    this.mainWinningBid=area.mainWinningBid;// 主要成交标的
                                    this.unitPrice=area.unitPrice;// 单价
                                    this.number=area.number;// 数量
                                    this.specificationType=area.specificationType;// 规格型号
                                    if(area.contractPerformancePeriod !=null){
                                        this.contractPerformancePeriod=formatDate(area.contractPerformancePeriod);// 合同履行期开始
                                    }
                                    if(area.contractPerformanceEnd !=null){
                                        this.contractPerformanceEnd=formatDate(area.contractPerformanceEnd);// 合同履行期结束
                                    }
                                    this.nameOfSuccessfulSupplier=area.nameOfSuccessfulSupplier;// 成交供应商名称
                                    this.addressOfSuccessfulSupplier=area.addressOfSuccessfulSupplier;//成交供应商地址
                                    this.winningAmountLowercase=area.winningAmountLowercase;// 成交金额小写
                                    this.winningAmountCapitalization=area.winningAmountCapitalization;// 成交金额大写
                                    this.idOfSuccessfulSupplier = area.idOfSuccessfulSupplier;
                                    this.winnResultItemId= area.winnResultItemId;// 成交信息ID
                                }else if(area.entrySubcontractNumber == this.projectObj.totalProjectId){
                                    // 分包
                                    this.mainWinningBid=area.mainWinningBid;// 主要成交标的
                                    this.unitPrice=area.unitPrice;// 单价
                                    this.number=area.number;// 数量
                                    this.specificationType=area.specificationType;// 规格型号
                                    if(area.contractPerformancePeriod !=null){
                                        this.contractPerformancePeriod=dayjs(area.contractPerformancePeriod).format('YYYY-MM-DD');// 合同履行期开始
                                    }
                                    if(area.contractPerformanceEnd !=null){
                                        this.contractPerformanceEnd=dayjs(area.contractPerformanceEnd).format('YYYY-MM-DD');// 合同履行期结束
                                    }
                                    this.nameOfSuccessfulSupplier=area.nameOfSuccessfulSupplier;// 成交供应商名称
                                    this.addressOfSuccessfulSupplier=area.addressOfSuccessfulSupplier;//成交供应商地址
                                    this.winningAmountLowercase=area.winningAmountLowercase;// 成交金额小写
                                    this.winningAmountCapitalization=area.winningAmountCapitalization;// 成交金额大写
                                    this.idOfSuccessfulSupplier = area.idOfSuccessfulSupplier;
                                    this.winnResultItemId= area.winnResultItemId;// 成交信息ID
                                }
                            })
                        });
                    }
                   
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 上一步查询
        getLastTemp(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                object ={
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }else{
                // 总包
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
                    this.winnResultId = res.data.data[0].winnResultId;// 主键ID
                    this.areaList = res.data.data[0].items;// 后端返回的items
                    this.infoList = res.data.data;
                    this.infoList.forEach(item => {
                        this.agentAddress = item.agentAddress;
                        this.agentPhone  = item.agentPhone;
                        this.address= item.address;
                        this.tendereeContactInformation= item.tendereeContactInformation;
                        this.announcementName= item.announcementName;
                        if(item.calibrationDate !=null){
                            this.calibrationDate= formatDate(item.calibrationDate);
                        }else{
                            this.calibrationDate = ""
                        }
                        this.projectLeader= item.projectLeader;
                        this.leaderContactInformation= item.leaderContactInformation;
                        this.remarks= item.remarks;
                        if(item.updateTime !=null){
                            this.updateTime = formatDate(item.updateTime);// 采购信息日期
                        }else{
                            this.updateTime = ""
                        }
                        
                        if(item.saveTime !=null){
                            this.saveTime = formatDate(item.saveTime);// 保存时间
                        }else{
                            this.saveTime = ""
                        }
                        
                        this.creatorCompanyName = item.creatorCompanyName;// 创建人名字
                        this.areaList.forEach(area=>{
                            if(this.projectObj.totalProjectId == area.projectCode){
                                this.mainWinningBid=area.mainWinningBid;// 主要成交标的
                                this.unitPrice=area.unitPrice;// 单价
                                this.number=area.number;// 数量
                                this.specificationType=area.specificationType;// 规格型号
                                if(area.contractPerformancePeriod !=null){
                                    this.contractPerformancePeriod=formatDate(area.contractPerformancePeriod);// 合同履行期开始
                                }
                                if(area.contractPerformanceEnd !=null){
                                    this.contractPerformanceEnd=formatDate(area.contractPerformanceEnd);// 合同履行期结束
                                }
                                this.nameOfSuccessfulSupplier=area.nameOfSuccessfulSupplier;// 成交供应商名称
                                this.addressOfSuccessfulSupplier=area.addressOfSuccessfulSupplier;//成交供应商地址
                                this.winningAmountLowercase=area.winningAmountLowercase;// 成交金额小写
                                this.winningAmountCapitalization=area.winningAmountCapitalization;// 成交金额大写
                                this.idOfSuccessfulSupplier = area.idOfSuccessfulSupplier
                            }
                        })
                    });
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 检索列表数据
        getPickInfo(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                object ={
                    entrySubcontractNumber:this.entrySubcontractNumber
                }
            }else{
                // 总包
                object ={ 
                    projectCode:this.projectCode
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/winnCandidaController/select/company",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.pickData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 检索列表+
        copyPick(row){
            this.idOfSuccessfulSupplier = row.companyId;
            this.nameOfSuccessfulSupplier = row.companyName;
            this.pickFlag = false;
        },
        // 成交信息 ---> 挑选---> 列表 ---> 单选框
        getTemplatePick(row){
            this.pickItem = row;
        },
        // 挑选 ---> 确定选择
        pickSure(){
            this.pickFlag =false;
            this.nameOfSuccessfulSupplier = this.pickItem.companyName;
        },
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName);
        },
        // 招标（采购）人确认函
        getOneList(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 分包
                object={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'招标（采购）人确认函'
                }
            }else{
                // 总包
                object={
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
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 成交结果公告
        getTwoList(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 分包
                object={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'成交结果公告'
                }
            }else{
                // 总包
                object={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'成交结果公告'
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
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //上传列表
        uploadList(){
            let object = {};
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
                        fileType:'成交结果公告'
                    }
                }
                
            }else{
                // 总包
                if(this.num == 1){
                    object={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'招标（采购）人确认函'
                    }
                }else{
                    object={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'成交结果公告'
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
                this.$layer.msg('图片大小不能超过102400KB');
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
                if(this.num == 1){
                    formData.append("fileType", '招标（采购）人确认函');
                }else{
                    formData.append("fileType", '成交结果公告');
                }
            }else{
                // 总包
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                if(this.num == 1){
                    formData.append("fileType", '招标（采购）人确认函');
                }else{
                    formData.append("fileType", '成交结果公告');
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
    }
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
.wrapper,.nextWrapper{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
}
/* 检索页面 */
.searchWrapper,.lookWrapper,.winWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:50px 20px;
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
.main_info{
    width: 100%;
    height: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.pickWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 100px;
     display: flex;
    flex-direction: column;
}
.pickBox{
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.pick_main{
    width: 100%;
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
}
.pick_btn {
    position: absolute;
    left: 0;
    top: 400px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 130px;
    height: 40px;
}
.searchBox,.lookBox,.winBox{
    width: 87%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.pick_title,.search_title{
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
.btn{
    padding: 10px;
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
    width: 50%;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
/* 确定选择搜索 */
.pick_input{
    width: 100%;
    padding: 0 30px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>