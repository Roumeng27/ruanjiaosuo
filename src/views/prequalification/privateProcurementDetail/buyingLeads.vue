<template>
    <!-- 采购信息 -->
    <div class="newBox" style="overflow-y:hidden;height:100%;">
        <div  v-show="passJudgeShow" style="overflow-y:hidden;height:100%;">
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
                                    <div class="editCenter">
                                        <div class="editName">入场项目(分包)编号：</div>
                                        <div class="editContent">{{amountId}}</div>
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
                                            <el-input v-model="purchaseAmount" @blur="purposeNum()" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购用途：</div>
                                        <div class="editContent">
                                            <el-input v-model="purchasePurposes" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">技术/服务要求：</div>
                                        <div class="editContent">
                                            <el-input v-model="technologyQualifications"  type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">供应商资格条件：</div>
                                        <div class="editContent">
                                            <el-input v-model="applicantQualifications"  type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
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
                                                                <td class="GridContent">{{item.label || item}}</td>
                                                                <td class="GridContent" @click="deleteInfoItem(item.qualificationId)">X</td>
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
                                                                <td class="GridContent">{{item.label || item}}</td>
                                                                <td class="GridContent" @click="deleteInfoArea(item.qualificationId)">X</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 分包信息-->
                        <el-collapse-item title="分包信息" name="2" v-show="!diffFlag">
                            <div class="item_title">若需添加多分包，请点击 <i class="el-icon-plus" @click="searchSubpackage"></i> 按钮</div>
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
                                        :show-overflow-tooltip ="true"
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
                        <!-- 公告信息 -->
                        <el-collapse-item title="公告信息" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>报名开始时间：</div>
                                        <div class="editContent">
                                            <el-date-picker 
                                                v-model="enrollStartTime" 
                                                type="datetime" 
                                                placeholder="选择日期时间" 
                                                align="right" 
                                                :picker-options="pickerOptions0" 
                                            >
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>报名结束时间：</div>
                                        <div class="editContent">
                                            <el-date-picker 
                                                v-model="enrollEndTime" 
                                                type="datetime" 
                                                placeholder="选择日期时间" 
                                                align="right"
                                                :picker-options="pickerOptions1"  
                                            >
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editTit"><p class="star">*</p>采购文件发售时间：</div>
                                        <div class="editContent">
                                            <el-date-picker :picker-options="pickerOptions0" clearable  v-model="collectTime" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @blur="blurDate()">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editTit">上午：</div>
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
                                        <div class="editTit">下午：</div>
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
                                    <div class="editCenter">
                                        <div class="editName">采购文件发售地点：</div>
                                        <div class="editContent">
                                        <el-input v-model="tenderDocumentsSaleSite" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>采购文件工本费：</div>
                                        <div class="editContent">
                                            <p>人民币</p>
                                            <el-input v-model="tenderDocumentsCost" clearable ></el-input>
                                            <p>元</p>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"></div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">工本费接收账户：</div>
                                        <div class="editContent">
                                            <el-input v-model="costAcceptAccount" type="textarea" clearable></el-input>
                                        </div>
                                        <!-- <el-button plain>设置账户</el-button> -->
                                    </div>
                                </div>
                                <!-- <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>投标人需提交资料：</div>
                                        <div class="editContent">
                                            <el-input v-model="bidderData"  type="textarea"  clearable :rows="3"  ></el-input>
                                        </div>
                                    </div>
                                </div> -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">递交响应文件截止时间：</div>
                                        <div class="editContent">{{assessmentTime}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">递交响应文件地点：</div>
                                        <div class="editContent">
                                            <el-input v-model="submissionDocumentsPlace" clearable></el-input>
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
                                    <div class="editTextarea">
                                        <div class="editName">响应文件开启地点：</div>
                                        <div class="editContent">
                                            <el-input v-model="bidOpeningPlace" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">评标办法和标准：</div>
                                        <div class="editContent">
                                            <el-input v-model="bidEvaluationStandard" clearable></el-input>
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
                                            <el-input v-model="projectLeaderPhone" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">
                                            <el-input v-model="remark" type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </el-collapse-item>
                        <!-- 公告内容 -->
                        <el-collapse-item title="公告内容" name="4">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>公告标题：</div>
                                        <div class="editContent">
                                            <el-input v-model="noticeName" clearable ></el-input>
                                            <p>采购内容</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="edit_list" style="padding:10px 0;">
                                    <div class="editTextarea">
                                        <quill-editor v-model="inquiryNoticeContent"
                                            ref="myQuillEditor"
                                            class="editer"
                                            :options="editorOption">
                                        </quill-editor>
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
                                    <div class="editCenter">
                                        <div class="editName">入场项目(分包)编号：</div>
                                        <div class="editContent">{{amountId}}</div>
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
                                <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem !='办理通过'">
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
                                    <el-table-column  prop="subcontractName"  label="分包名称">
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
                        <!-- 采购内容 -->
                        <el-collapse-item title="采购内容" name="3" v-show="diffFlag">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购内容：</div>
                                        <div class="editContent">{{tenderContents}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">{{purchaseAmount}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购用途：</div>
                                        <div class="editContent">{{purchasePurposes}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">技术/服务要求：</div>
                                        <div class="editContent">{{technologyQualifications}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">供应商资格条件：</div>
                                        <div class="editContent">{{applicantQualifications}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业资质要求：</div>
                                        <div class="editContent">{{companyQualifications}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人资质要求：</div>
                                        <div class="editContent">{{managerQualifications}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公告信息 -->
                        <el-collapse-item title="公告信息" name="4">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">报名开始时间：</div>
                                        <div class="editContent">{{enrollStartTime}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">报名结束时间：</div>
                                        <div class="editContent">{{enrollEndTime}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购文件领取时间：</div>
                                        <div class="editContent">{{saleReceiveStartDate}} 到{{saleReceiveEndDate}} 上午:{{morningbegin}}--{{morningend}} 下午:{{afterbegin}}--{{afterend}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购文件发售地点：</div>
                                        <div class="editContent">{{tenderDocumentsSaleSite}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购文件工本费：</div>
                                        <div class="editContent">人民币{{tenderDocumentsCost}}元 </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">工本费接收账户：</div>
                                        <div class="editContent">{{costAcceptAccount}} </div>
                                    </div>
                                </div>
                                <!-- <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">投标人需提交资料：</div>
                                        <div class="editContent">{{bidderData}} </div>
                                    </div>
                                </div> -->
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">递交响应文件截止时间：</div>
                                        <div class="editContent">{{assessmentTime}} </div>
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
                                        <div class="editContent">{{assessmentTime}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">响应文件开启地点：</div>
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
                        <el-collapse-item title="公告内容" name="5">
                            <div class="edit_list">
                               <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公告标题：</div>
                                        <div class="editContent">{{noticeName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"></div>
                                        <div class="editContent" v-html="inquiryNoticeContents">{{inquiryNoticeContents}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="6">
                            <el-table :data="manageDate" stripe style="width: 100%">
                                <el-table-column  prop="step"  label="步骤">
                                </el-table-column>
                                <el-table-column  prop="userName" :show-overflow-tooltip ="true"  label="办理人员">
                                </el-table-column>
                                <el-table-column  prop="creationTime" :show-overflow-tooltip ="true"  label="时间">
                                </el-table-column>
                                <el-table-column  prop="state" :show-overflow-tooltip ="true" label="状态">
                                </el-table-column>
                                <el-table-column  prop="remarks" :show-overflow-tooltip ="true" label="备注">
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
                                            <div class="editName">招标(采购)人：</div>
                                            <div class="editContent">{{tenderPurchaserName}} </div>
                                        </div>
                                        <div class="editCenter" v-if="role_types == '招标(采购)代理'  || str_entrust_type != '委托角色'">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}} </div>
                                        </div>
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
                                            <div class="editName">招标(采购)范围：</div>
                                            <div class="editContent">{{scopeOfTender}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">分包控制金额：</div>
                                            <div class="editContent">{{subcontractingControlAmount}} <span>万元</span> </div>
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
                                            <div class="editName">招标(采购)方式：</div>
                                            <div class="editContent">{{biddingProcurementMode}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">招标组织方式：</div>
                                            <div class="editContent">{{biddingOrganization}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 采购内容-->
                            <el-collapse-item title="采购内容" name="2">
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
                                            <div class="editName">采购用途：</div>
                                            <div class="editContent">
                                                <el-input v-model="purchasePurposes" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">技术/服务要求：</div>
                                            <div class="editContent">
                                                <el-input v-model="technologyQualifications" type="textarea" :rows="3"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">供应商资格条件：</div>
                                            <div class="editContent">
                                                <el-input v-model="applicantQualifications" type="textarea" :rows="3"></el-input>
                                            </div>
                                        </div>
                                    </div>
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
                                                                    <td class="GridContent">{{item.label || item}}</td>
                                                                    <td class="GridContent" @click="deleteInfoItem(item.qualificationId)">X</td>
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
                                                                    <td class="GridContent">{{item.label || item}}</td>
                                                                    <td class="GridContent" @click="deleteInfoArea(item.qualificationId)">X</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
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
                    <div class="box  win_tax">
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
                                            <div class="editName">招标(采购)方式：</div>
                                            <div class="editContent">{{biddingProcurementMode}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)组织方式：</div>
                                            <div class="editContent">{{biddingOrganization}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 采购内容-->
                            <el-collapse-item title="采购内容" name="2">
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
                                            <div class="editContent">{{purchaseAmount}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">采购用途：</div>
                                            <div class="editContent">{{purchasePurposes}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">技术/服务要求：</div>
                                            <div class="editContent">{{technologyQualifications}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">供应商资格条件：</div>
                                            <div class="editContent">{{applicantQualifications}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">企业资质要求：</div>
                                            <div class="editContent">{{companyQualifications}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editTextarea">
                                            <div class="editName">项目负责人资质要求：</div>
                                            <div class="editContent">{{managerQualifications}} </div>
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
                            <el-table-column prop="fileName" :show-overflow-tooltip ="true" label="文件名称"  width="180">
                            </el-table-column>
                            <el-table-column  prop="fileSize" :show-overflow-tooltip ="true" label="文件大小">
                            </el-table-column>
                            <el-table-column  prop="uploadingPeople" :show-overflow-tooltip ="true" label="上传人">
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
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                label="采购项目名称">
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
                                label="招标(采购)方式">
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
            <!-- 企业资质要求 -->
            <div class="certificateWrapper" v-show="certificateFlag">
                <div class="certificateBox">
                    <div class="certificate_title">
                        <p>资质列表</p>
                        <i class="el-icon-close" @click="closeCertificate"></i>
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
                        <i class="el-icon-close" @click="closeLeader"></i>
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
                <span>修改信息将导致电子件列表中的 [采购信息] 重新生成，您确认要继续吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="laststepBoxSure()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 时间差20天弹框 -->
        <el-dialog
            title="信息确认"
            :visible.sync="times_box"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>采购文件发售时间距开标时间不足20日,请确认！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="信息确认"
            :visible.sync="time_difference_box"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>采购文件发售时间距采购文件发售截止时间不足5日,请确认！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="信息确认"
            :visible.sync="time_bit_box"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>采购文件发售时间距采购文件发售截止时间不足5日,并且采购文件发售时间距开标时间不足20日,请确认！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose()">确 定</el-button>
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
                <span>提交采购信息成功！</span>
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
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkPhone,checkEmail,dubRemove,checkNumber,checkWord} from '../../../api/base.js'
    export default {
        components: {
            //使用编辑器
            quillEditor
        },
        data(){
            return {
                amountId:'',
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
                subcontractNames:'',
                entrySubcontractNumbers:'',
                subcontractingControlAmounts:'',
                nameOfTenderProjects:'',
                biddingProjectNumbers:'',
                budgetAmounts:'',
                times_box:false,//时间弹框
                time_difference_box:false,//时间差弹框
                time_bit_box:false,
                submissionDocumentsPlace:"",//递交投标文件地点
                bidOpeningPlace:'',//开标地点
                passJudgeShow:true,
                frameShow:false,
                tenderNoticeId:'',//查询或者下一步返回的Id
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:['1','2','3','4','5'],
                activeName1:['1','2','3','4','5','6'],
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
                // 采购项目信息所需字段
                nameOfTenderProject:'',// 采购项目名称
                biddingProjectNumber:'',// 采购项目编号
                tenderPurchaserName:'',// 招标(采购)人
                tendereeAddress:'',// 采购人地址
                tendereePhone:'',// 采购人联系方式
                budgetAmount:'',// 采购项目预算金额
                tenderContents:'',// 采购内容
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
                collectTime:[],// 采购文件发售时间
                saleReceiveStartDate:'',// 采购文件发售时间开始时间
                saleReceiveEndDate:'',// 采购文件发售时间结束时间
                morningbegin:'8:00',// 上午开始时间
                morningend:'12:00',// 上午结束时间
                afterbegin:'14:00',// 下午开始时间
                afterend:'17:30',// 下午结束时间

                saleStartTime:'',// 上午发售时间
                saleEndTime:'',// 下午发售时间
                tenderDocumentsSaleSite:'',// 采购文件发售地点
                tenderDocumentsCost:'',// 采购文件工本费
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
                submitPlace:'',// 递交响应文件地点
                bidOpeningDate:'',//响应文件开启时间
                bidOpeningSite:'',//响应文件开启地点
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
                assessmentTime:'',// 保存和下一步的时候 场地预约响应文件开启时间
                openingTime:'',// 响应文件开启时间
                itemsList:[],// 返回的items
                diffFlag:false,// 
                // 分包信息
                scopeOfTender:'',// 采购范围
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                subcontractContents:'',// 分包内容
                totalProjectId:'',
                // 查看分包信息所需字段
                lookFlag:false,
                // 采购内容所需字段
                winFlag:false, 
                unitPrice:'',
                number:'',
                // 采购项目信息所需字段
                nameOfTenderProject:'',// 采购项目名称
                biddingProjectNumber:'',// 采购项目编号
                tenderPurchaserName:'',// 招标(采购)人
                budgetAmount:'',// 采购项目预算金额
                amountOfBiddingProject:'',//采购项目金额
                biddingProcurementMode:'',// 采购采购方式
                biddingOrganization:'',// 采购组织方式
                typesOfBiddingProjects:'',// 采购项目类型
                amountId:'',
                // + 分包信息
                searchFlag:false,
                multipleSelection:[],//多选框
                name:'',
                markData:[],
                areaList:[],// 保存传的items
                detailFlag:false,// 下一步采购内容详情弹窗
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
                    appendixName: "采购信息",
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
                table_index:'',//记录点击表格第几行
                inquiryNoticeContents:'',
                inquiryNoticeContent:'',//公告内容
                editorOption: {},
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        created(){
            this.getOneList();// 招标（采购）人确认函附件
            this.getTwoList();// 招标公告附件
            this.getmanageInfo();// 办理记录
            this.getOpenTime();// 响应文件开启时间
            this.getsubpackageInfo();// 分包信息
            this.getDecideList();
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 分包
                this.diffFlag = false;
                this.getsubInfo();// 初始化分包查询
            }else{
                // 总包
                this.diffFlag = true;
            }
            this.uploadList();//上传列表
        },
        mounted(){
            this.getbiddingInfo();// 采购项目信息
        },
        methods:{
            blurDate(){
                let startTime = changeTime(this.collectTime[0]);
                let endtTime = changeTime(this.collectTime[1]);
                let assTime = new Date(this.assessmentTime).getTime();
                let dateStr = Math.floor(Math.abs(startTime - endtTime)/(24 * 3600 * 1000));
                let dateSpan = startTime - assTime;
                dateSpan = Math.abs(dateSpan);
                let str = Math.floor(dateSpan / (24 * 3600 * 1000));
                if(str < 20 && dateStr < 5 ){
                    this.time_bit_box = true;
                }else if(str < 20 && dateStr >= 5){
                    this.times_box = true;
                }else if(str >= 20 && dateStr < 5){
                    this.time_difference_box = true;
                }
            },
            purposeNum(){
                if(!checkWord(this.purchaseAmount)){
                    this.$message.warning('采购数量请输入文字或数字类型！');
                }
            },
            //校验手机号联系方式
			blurPhone(num){
                if(num == 1){
                    // 采购项目信息的联系方式
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
                this.scopeOfTender = row.scopeOfTender;// 采购范围
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
                if(!this.enrollStartTime){
                    this.$message.warning("请输入报名开始时间！");
                    return false;
                }else if(!this.enrollEndTime){
                    this.$message.warning("请输入报名结束时间！");
                    return false;
                }else if(this.collectTime.length == 0){
                    this.$message.warning("请输入招采购文件发售时间！");
                    return false;
                }else if(!this.morningbegin && !this.morningend && !this.afterbegin && !this.afterend){
                    this.$message.warning("请输入招采购文件发售时间！");
                    return false;
                }else if(this.tenderDocumentsCost =='' || this.tenderDocumentsCost == null || !checkNumber(this.tenderDocumentsCost)){
                    this.$message.warning("请输入招采购文件工本费！");
                    return false;
                }else if(this.tendereePhone != '' && this.tendereePhone != null && !isPoneAvailable(this.tendereePhone) && !checkPhone(this.tendereePhone)){
                    this.$message.warning('请输入正确的联系方式！');
                    return false; 
                }else if(this.projectLeaderPhone != '' && this.projectLeaderPhone != null && !isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){ 
                    this.$message.warning('请输入正确的联系方式！');
                    return false;
                }else if(this.purchaseAmount != '' && this.purchaseAmount != null && !checkWord(this.purchaseAmount)){
                    this.$message.warning('采购数量请输入文字或数字类型！');
                    return false;
                }else if(!this.noticeName){
                    this.$message.warning("请输入公告标题！");
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
                        this.savebidding(num);// 保存
                        this.getmanageInfo();// 办理记录
                    }
                }
            },
            // 下一步采购内容详情
            bidDetail(row){
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额
                this.detailFlag = true;
                $('.win_tax').hide();
                this.companyQualifications = '';
                this.managerQualifications = "";
                this.areaList.forEach(item=>{
                    if(item.entrySubcontractNumber == row.entrySubcontractNumber ){
                        console.log(item.entrySubcontractNumber)
                        console.log(item.technologyQualifications)
                        this.technologyQualifications = item.technologyQualifications;// 简要技术要求
                        this.purchaseAmount = item.purchaseAmount;// 采购数量
                        this.purchasePurposes = item.purchasePurposes;// 采购用途
                        this.applicantQualifications = item.applicantQualifications;// 投资人资格条件
                        this.certificateBox = JSON.parse(item.companyQualifications);// 企业资质要求
                        if(this.certificateBox.length > 0){
                            this.certificateBox = dubRemove(this.certificateBox);
                            let arr = [];
                            this.certificateBox.forEach(item=>{
                                arr.push(item.label);
                            })
                            this.companyInfo = arr;
                            this.companyQualifications = this.companyInfo.toString();
                        }
                        this.leaderBox = JSON.parse(item.managerQualifications);// 项目负责人资质要求
                        if(this.leaderBox.length > 0){
                            this.leaderBox = dubRemove(this.leaderBox);
                            let newArr = [];
                            this.leaderBox.forEach(item=>{
                                newArr.push(item.label);
                            })
                            this.leaderInfo = newArr;
                            this.managerQualifications = this.leaderInfo.toString();
                        }
                    }
                    this.itemTemp = item;
                })
            },
            // 下一步采购内容详情 关闭
            closebidDetail(){
                this.detailFlag = false;
            },
            // 采购内容
            winItem(row,tab_index){
                this.table_index = tab_index;
                if(this.initList.length != 0){
                    this.areaList.forEach(item=>{
                        if(item.entrySubcontractNumber == row.entrySubcontractNumber ){
                            this.technologyQualifications = item.technologyQualifications;// 简要技术要求
                            this.purchaseAmount = item.purchaseAmount;// 采购数量
                            this.purchasePurposes = item.purchasePurposes;// 采购用途
                            this.applicantQualifications = item.applicantQualifications;// 投资人资格条件
                            this.companyQualifications= item.companyQualifications;// 企业资质要求
                            this.managerQualifications= item.managerQualifications;// 项目负责人资质条件
                            this.certificateBox = JSON.parse(item.companyQualifications);
                            this.leaderBox = JSON.parse(item.managerQualifications);
                        }
                        this.itemTemp = item;
                    })
                }else{
                    // let obj = {
                    //     entrySubcontractNumber:this.entrySubcontractNumber,
                    //     purchaseAmount:this.purchaseAmount,// 采购数量
                    //     purchasePurposes:this.purchasePurposes,// 采购用途
                    //     companyQualifications:this.companyQualifications,// 企业资质要求
                    //     managerQualifications:this.managerQualifications,// 项目负责人资质条件
                    //     technologyQualifications:this.technologyQualifications,// 简要技术要求
                    //     applicantQualifications:this.applicantQualifications,// 投资人资格条件
                    // }
                    // this.areaList.push(obj);
                    if(row.obj_detail){
                        this.purchaseAmount = row.obj_detail.purchaseAmount;
                        this.purchasePurposes = row.obj_detail.purchasePurposes;
                        this.companyQualifications = JSON.parse(row.obj_detail.companyQualifications);
                        this.managerQualifications = JSON.parse(row.obj_detail.managerQualifications);
                        this.technologyQualifications = row.obj_detail.technologyQualifications;
                        this.applicantQualifications = row.obj_detail.applicantQualifications;
                        this.certificateBox = JSON.parse(row.obj_detail.companyQualifications);
                        this.leaderBox = JSON.parse(row.obj_detail.managerQualifications);
                    }else{
                        this.purchaseAmount = '';
                        this.purchasePurposes = '';
                        this.companyQualifications = '';
                        this.managerQualifications ='';
                        this.technologyQualifications = '';
                        this.applicantQualifications = '';
                        this.certificateBox = [];
                        this.leaderBox = [];
                    }
                }
                
                this.subcontractName = row.subcontractName;
                this.subcontractingControlAmount = row.subcontractingControlAmount;
                this.entrySubcontractNumber = row.entrySubcontractNumber;
                this.winFlag = true;
            },
            // 采购内容 保存
            savePage(){
                if(this.purchaseAmount != '' && this.purchaseAmount != null && !checkWord(this.purchaseAmount)){
                    this.$message.warning('请输入正确的采购数量格式，文字或数字均可!');
                    return false;
                }
                // if(this.initList.length != 0){
                //     this.itemTemp.purchaseAmount=this.purchaseAmount;
                //     this.itemTemp.purchasePurposes=this.purchasePurposes;
                //     this.itemTemp.technologyQualifications=this.technologyQualifications;
                //     this.itemTemp.applicantQualifications=this.applicantQualifications;
                //     this.itemTemp.companyQualifications=JSON.stringify(this.certificateBox);
                //     this.itemTemp.managerQualifications=JSON.stringify(this.leaderBox);
                // }
                this.areaList = [];
                var obj = {
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    purchaseAmount :  this.purchaseAmount,
                    purchasePurposes : this.purchasePurposes,
                    technologyQualifications : this.technologyQualifications,
                    applicantQualifications : this.applicantQualifications,
                    companyQualifications : JSON.stringify(this.certificateBox),
                    managerQualifications : JSON.stringify(this.leaderBox),
                };
                this.subpackageData[this.table_index].obj_detail = obj;
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
                this.winFlag = false;
            },
            // 关闭采购内容
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
                    obj.companyQualifications = '[]';
                    obj.managerQualifications = '[]';
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
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"采购信息",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"采购信息",
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nextFlag = false;
                        // this.laststepBox = true;
                        this.writeFlag = true;
                        this.getLastTemp();// 上一步查询
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
                        tenderNoticeId:this.tenderNoticeId,// 工本费接收账户id 
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
                this.getmanageInfo();// 办理记录
            },
            // 保存
            savebidding(num){
                // 去除所有的标签
                let reg=/<\/?.+?\/?>/g;
                // 上午发售时间
                let morningArr = [];
                morningArr.push(this.morningbegin,this.morningend);
                this.saleStartTime = morningArr.toString();
                // 下午发售时间
                let afterArr = [];
                afterArr.push(this.afterbegin,this.afterend);
                this.saleEndTime = afterArr.toString();
                let objArr = {}
                let objectData = {};
                // 入场项目(分包)编号
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){ 
                    // 分包
                    if(this.initList.length != 0){
                        objectData={
                            noticeType:'采购信息',
                            tendereeAddress:this.tendereeAddress,tendereePhone:this.tendereePhone,purchaseAmount:this.purchaseAmount,purchasePurposes:this.purchasePurposes,technologyQualifications:this.technologyQualifications,applicantQualifications:this.applicantQualifications,noticeName:this.noticeName,
                            submissionDocumentsPlace:this.submissionDocumentsPlace,bidOpeningPlace:this.bidOpeningPlace,
                            enrollStartTime:changeTime(this.enrollStartTime),enrollEndTime:changeTime(this.enrollEndTime),saleReceiveStartDate:this.collectTime[0],saleReceiveEndDate:this.collectTime[1],saleStartTime:this.saleStartTime,saleEndTime:this.saleEndTime,tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,tenderDocumentsCost:this.tenderDocumentsCost,costAcceptAccount:this.costAcceptAccount,bidderData:this.bidderData,bidEvaluationStandard:this.bidEvaluationStandard,projectLeader:this.projectLeader,projectLeaderPhone:this.projectLeaderPhone,remark:this.remark,tenderInforId:this.tenderInforId,timeReference:this.projectObj.totalProjectId,
                            // inquiryNoticeContent:this.inquiryNoticeContent.replace(reg,''), //公告内容
                            inquiryNoticeContent:this.inquiryNoticeContent,
                            items:this.areaList
                        }
                    }else{
                        objectData={
                            noticeType:'采购信息',
                            tendereeAddress:this.tendereeAddress,tendereePhone:this.tendereePhone,purchaseAmount:this.purchaseAmount,purchasePurposes:this.purchasePurposes,technologyQualifications:this.technologyQualifications,applicantQualifications:this.applicantQualifications,noticeName:this.noticeName,
                            submissionDocumentsPlace:this.submissionDocumentsPlace,bidOpeningPlace:this.bidOpeningPlace,
                            enrollStartTime:changeTime(this.enrollStartTime),enrollEndTime:changeTime(this.enrollEndTime),saleReceiveStartDate:this.collectTime[0],saleReceiveEndDate:this.collectTime[1],saleStartTime:this.saleStartTime,saleEndTime:this.saleEndTime,tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,tenderDocumentsCost:this.tenderDocumentsCost,costAcceptAccount:this.costAcceptAccount,bidderData:this.bidderData,bidEvaluationStandard:this.bidEvaluationStandard,projectLeader:this.projectLeader,projectLeaderPhone:this.projectLeaderPhone,remark:this.remark,tenderInforId:this.tenderInforId,timeReference:this.projectObj.totalProjectId,
                            // inquiryNoticeContent:this.inquiryNoticeContent.replace(reg,''), //公告
                            inquiryNoticeContent:this.inquiryNoticeContent,
                            items:this.areaList
                        }
                    }
                }else{
                    // 总包
                    objectData={
                        noticeType:'采购信息',
                        tendereeAddress:this.tendereeAddress,tendereePhone:this.tendereePhone,purchaseAmount:this.purchaseAmount,purchasePurposes:this.purchasePurposes,technologyQualifications:this.technologyQualifications,applicantQualifications:this.applicantQualifications,noticeName:this.noticeName,
                        submissionDocumentsPlace:this.submissionDocumentsPlace,bidOpeningPlace:this.bidOpeningPlace,
                        enrollStartTime:changeTime(this.enrollStartTime),enrollEndTime:changeTime(this.enrollEndTime),saleReceiveStartDate:this.collectTime[0],saleReceiveEndDate:this.collectTime[1],saleStartTime:this.saleStartTime,saleEndTime:this.saleEndTime,tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,tenderDocumentsCost:this.tenderDocumentsCost,costAcceptAccount:this.costAcceptAccount,bidderData:this.bidderData,bidEvaluationStandard:this.bidEvaluationStandard,projectLeader:this.projectLeader,projectLeaderPhone:this.projectLeaderPhone,remark:this.remark,
                        tenderInforId:this.tenderInforId,timeReference:this.projectObj.totalProjectId,
                        // inquiryNoticeContent:this.inquiryNoticeContent.replace(reg,''),
                        inquiryNoticeContent:this.inquiryNoticeContent, //公告内容
                        items:[{
                            projectCode:this.projectObj.totalProjectId,
                            purchaseAmount:this.purchaseAmount,
                            purchasePurposes:this.purchasePurposes,
                            companyQualifications:JSON.stringify(this.certificateBox),// 企业资质要求
                            managerQualifications:JSON.stringify(this.leaderBox),// 项目负责人资质要求
                            technologyQualifications:this.technologyQualifications,
                            applicantQualifications:this.applicantQualifications,
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
                        // 所需字段
                        this.tendereeAddress=res.data.data.tendereeAddress;
                        this.tendereePhone=res.data.data.tendereePhone;
                        this.purchaseAmount=res.data.data.purchaseAmount;
                        this.purchasePurposes=res.data.data.purchasePurposes;
                        this.technologyQualifications=res.data.data.technologyQualifications;
                        this.applicantQualifications=res.data.data.applicantQualifications;
                        this.noticeName=res.data.data.noticeName;
                        this.submissionDocumentsPlace = res.data.data.submissionDocumentsPlace;
                        this.bidOpeningPlace = res.data.data.bidOpeningPlace;
                        this.inquiryNoticeContents= res.data.data.inquiryNoticeContent;// 公告内容
                        //  报名起始时间
                        if(res.data.data.enrollStartTime == "" ||res.data.data.enrollStartTime == null){
                            this.enrollStartTime = ""
                        }else{
                            this.enrollStartTime=formatTime(res.data.data.enrollStartTime);
                        };
                        if(res.data.data.enrollEndTime == "" || res.data.data.enrollEndTime == null){
                            this.enrollEndTime = ""
                        }else{
                            this.enrollEndTime=formatTime(res.data.data.enrollEndTime);
                        }
                        
                        // 采购文件发售时间
                        if(res.data.data.saleReceiveStartDate == "" || res.data.data.saleReceiveStartDate == null){
                            this.saleReceiveStartDate = ""
                        }else{
                            this.saleReceiveStartDate = formatDate(res.data.data.saleReceiveStartDate);// 采购文件发售开始时间
                        };
                        if(res.data.data.saleReceiveEndDate == "" || res.data.data.saleReceiveEndDate == null){
                            this.saleReceiveEndDate = ""
                        }else{
                            this.saleReceiveEndDate = formatDate(res.data.data.saleReceiveEndDate);// 采购文件发售结束时间
                        }
                        
                        // 上午和下午起始时间
                        this.saleStartTime=res.data.data.saleStartTime.split(',');
                        this.morningbegin = this.saleStartTime[0];
                        this.morningend = this.saleStartTime[1];
                        this.saleEndTime=res.data.data.saleEndTime.split(',');
                        this.afterbegin = this.saleEndTime[0];
                        this.afterend = this.saleEndTime[1];

                        this.tenderDocumentsSaleSite=res.data.data.tenderDocumentsSaleSite;
                        this.tenderDocumentsCost=res.data.data.tenderDocumentsCost;
                        this.costAcceptAccount=res.data.data.costAcceptAccount;
                        this.bidderData=res.data.data.bidderData;
                        this.bidEvaluationStandard=res.data.data.bidEvaluationStandard;
                        this.projectLeader=res.data.data.projectLeader;
                        this.projectLeaderPhone=res.data.data.projectLeaderPhone;
                        this.remark=res.data.data.remark;
                        this.tenderInforId = res.data.data.tenderInforId;// 修改需要传的ID
                        this.tenderNoticeId = res.data.data.tenderNoticeId;
                        this.areaList = res.data.data.items;
                        this.areaList.forEach(area=>{
                            if(area.entrySubcontractNumber != null && this.projectObj.totalProjectId == area.entrySubcontractNumber){
                                this.purchaseAmount=area.purchaseAmount;//  采购数量
                                this.purchasePurposes=area.purchasePurposes;// 采购用途
                                this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                                this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                                this.companyQualifications = area.companyQualifications;// 企业资质要求
                                this.managerQualifications = area.managerQualifications;// 项目负责人资质要求
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
                    }else{
                        this.$message.warning(res.data.msg);
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
                            if(item.entrySubcontractNumber == this.projectObj.totalProjectId){
                                this.tenderContents = item.projectInformationVo.tenderContents;// 采购内容
                                this.subcontractName = item.subcontractName;// 分包名称
                                this.entrySubcontractNumber = item.entrySubcontractNumber;// 入场项目分包编号
                                this.subcontractingControlAmount = item.subcontractingControlAmount;// 分包控制金额
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
                        noticeType:'采购信息'
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
                this.times_box = false;
                this.time_difference_box = false;
                this.time_bit_box = false;
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
                                if(item.value == '采购信息'){
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
                                if(item.value == '采购信息'){
                                    obj.houxuanren = item
                                }
                                if(item.value == '场地预约'){
                                    obj.ruchang = item
                                }
                            })
                            //采购勾且本业勾，可以看，
                            if(obj.zhaobiao.state == '办理通过' && obj.houxuanren.state == '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                            //如果上一步打钩，进一步判断
                            }else if(obj.ruchang.state == '办理通过' ){
                                //如果采购打钩，则本业必须打勾
                                if(obj.zhaobiao.state == '办理通过'&& obj.houxuanren.state == '办理通过'){
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
                                        this.alertMsg = '尚未完成场地预约,无法进行采购信息!'
                                    }
                                }
                            }else{
                                //其他的都不能看
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未完成场地预约,无法进行采购信息!'
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
            // 采购项目信息
            getbiddingInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 采购项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 采购项目编号
                        this.budgetAmount = res.data.data.budgetAmount;// 采购项目预算金额 
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.tenderContents = res.data.data.tenderContents;// 采购内容
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
                        
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 采购项目金额
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 采购采购方式
                        this.biddingOrganization = res.data.data.biddingOrganization;// 采购组织方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 采购项目类型
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                        
                        this.budgetAmount = res.data.data.budgetAmount;// 采购项目预算金额 
                        this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                        // this.nameOfTenderProjects = res.data.data.nameOfTenderProject;// 采购项目名称
                        // this.biddingProjectNumbers = res.data.data.biddingProjectNumber;// 采购项目编号
                        // this.budgetAmounts = res.data.data.budgetAmount;
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 办理记录
            async getmanageInfo(){
                await this.getInitInfo();
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
            // 初始化 查询
            getInitInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"采购信息",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"采购信息",
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
                            this.getOpenTime();// 如果有保存和下一步 响应文件开启时间为这个接口返回
                        }else {
                            this.initList.forEach(item=>{
                                this.stateItem = item.state;
                                this.inquiryNoticeContents= item.inquiryNoticeContent;// 公告内容
                                if(item.state == '编辑中' || item.state == '办理未通过'){
                                    this.writeFlag = false;// 有保存和下一步的按钮
                                    this.nextFlag = true;// 有上一步和提交的按钮
                                }else if(item.state == '待办理' || item.state == '办理通过') {
                                    this.writeFlag = false;// 有保存和下一步的按钮
                                    this.nextFlag = true;// 有上一步和提交的按钮
                                    this.headerBtn = false;
                                }
                                this.submissionDocumentsPlace = item.submissionDocumentsPlace;
                                this.bidOpeningPlace = item.bidOpeningPlace;
                                this.tendereeAddress = item.tendereeAddress;// 采购人地址
                                this.tendereePhone = item.tendereePhone;// 采购人联系方式
                                this.noticeName = item.noticeName;// 公告名称
                                if(item.enrollStartTime == null){
                                    this.enrollStartTime = ""
                                }else{
                                    this.enrollStartTime = formatTime(item.enrollStartTime);// 报名开始时间
                                };
                                if(item.enrollEndTime == null){
                                    this.enrollEndTime = ""
                                }else{
                                    this.enrollEndTime = formatTime(item.enrollEndTime);// 报名结束时间
                                }
                                
                                this.tenderDocumentsSaleSite = item.tenderDocumentsSaleSite;// 采购文件发售地点
                                this.tenderDocumentsCost = item.tenderDocumentsCost;// 采购文件工本费
                                this.costAcceptAccount = item.costAcceptAccount;// 工本费接收账户
                                this.bidderData = item.bidderData;// 投标人需提交资料
                                if(item.submitTime == null){
                                    this.submitTime = ""
                                }else{
                                    this.submitTime = formatTime(item.submitTime);// 递交响应文件截止时间
                                }
                                
                                this.submitPlace = item.submitPlace;// 递交响应文件地点
                                this.bidEvaluationStandard = item.bidEvaluationStandard;// 评标办法和标准
                                this.projectLeader = item.projectLeader;// 项目负责人
                                this.projectLeaderPhone = item.projectLeaderPhone;// 联系方式
                                this.remark = item.remark;// 备注
                                if(item.openingTime == null){
                                    this.openingTime = ""
                                }else{
                                    this.openingTime = formatTime(item.openingTime);// 响应文件开启时间
                                };
                                if(item.saleReceiveStartDate == null){
                                    this.saleReceiveStartDate = ""
                                }else{
                                    this.saleReceiveStartDate = formatDate(item.saleReceiveStartDate);// 采购文件发售开始时间
                                };
                                if( item.saleReceiveEndDate == null){
                                    this.saleReceiveEndDate = ""
                                }else{
                                    this.saleReceiveEndDate = formatDate(item.saleReceiveEndDate);// 采购文件发售结束时间
                                };
                                
                                this.collectTime.push(this.saleReceiveStartDate,this.saleReceiveEndDate);
                                // 上午发售时间
                                this.saleStartTime = item.saleStartTime.split(',');
                                this.morningbegin = this.saleStartTime[0];
                                this.morningend = this.saleStartTime[1];
                                // 下午发售时间
                                this.saleEndTime = item.saleEndTime.split(',');
                                this.afterbegin = this.saleEndTime[0];
                                this.afterend = this.saleEndTime[1];
                                this.areaList.forEach(area=>{
                                    if(area.entrySubcontractNumber != null && this.projectObj.totalProjectId == area.entrySubcontractNumber){
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
            // 上一步查询
            getLastTemp(){
                 let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"采购信息",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"采购信息",
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.initList = res.data.data;
                        this.tenderNoticeId = res.data.data[0].tenderNoticeId;
                        this.areaList = res.data.data[0].items;
                        this.initList.forEach(item=>{
                            this.writeFlag = true;// 有保存和下一步的按钮
                            this.nextFlag = false;// 有上一步和提交的按钮
                            this.tendereeAddress = item.tendereeAddress;// 采购人地址
                            this.tendereePhone = item.tendereePhone;// 采购人联系方式
                            this.noticeName = item.noticeName;// 公告名称
                            this.inquiryNoticeContent = item.inquiryNoticeContent;// 公告内容
                            if(item.enrollStartTime == "" || item.enrollStartTime == null){
                                this.enrollStartTime = ""
                            }else{
                                this.enrollStartTime = formatTime(item.enrollStartTime);// 报名开始时间
                            };
                            if(item.enrollEndTime == "" || item.enrollEndTime){
                                this.enrollEndTime = ""
                            }else{
                                this.enrollEndTime = formatTime(item.enrollEndTime);// 报名结束时间
                            };
                            this.tenderDocumentsSaleSite = item.tenderDocumentsSaleSite;// 采购文件发售地点
                            this.tenderDocumentsCost = item.tenderDocumentsCost;// 采购文件工本费
                            this.costAcceptAccount = item.costAcceptAccount;// 工本费接收账户
                            this.bidderData = item.bidderData;// 投标人需提交资料
                            if(item.submitTime == "" || item.submitTime == null){
                                this.submitTime = ""
                            }else{
                                this.submitTime = formatTime(item.submitTime);// 递交响应文件截止时间
                            }
                            
                            this.submitPlace = item.submitPlace;// 递交响应文件地点
                            this.bidEvaluationStandard = item.bidEvaluationStandard;// 评标办法和标准
                            this.projectLeader = item.projectLeader;// 项目负责人
                            this.projectLeaderPhone = item.projectLeaderPhone;// 联系方式
                            this.remark = item.remark;// 备注
                            if(item.openingTime == "" || item.openingTime == null){
                                this.openingTime = ""
                            }else{
                                this.openingTime = formatTime(item.openingTime);// 响应文件开启时间
                            }

                            // 在上一步让采购文件发售时间 回显
                            this.saleReceiveStartDate = new Date(item.saleReceiveStartDate).getTime();// 采购文件发售开始时间
                            this.saleReceiveEndDate = new Date(item.saleReceiveEndDate).getTime();// 采购文件发售结束时间
                            this.enrollStartTime = new Date(item.enrollStartTime).getTime();
                            this.enrollEndTime = new Date(item.enrollEndTime).getTime();
                            let arr = [];
                            arr.push(this.saleReceiveStartDate,this.saleReceiveEndDate);
                            this.collectTime = arr;
                            // 上午发售时间
                            this.saleStartTime = item.saleStartTime.split(',');
                            this.morningbegin = this.saleStartTime[0];
                            this.morningend = this.saleStartTime[1];
                            // 下午发售时间
                            this.saleEndTime = item.saleEndTime.split(',');
                            this.afterbegin = this.saleEndTime[0];
                            this.afterend = this.saleEndTime[1];
                            this.areaList.forEach(area=>{
                                if(area.entrySubcontractNumber != null && this.entrySubcontractNumber == area.entrySubcontractNumber){
                                    this.purchaseAmount=area.purchaseAmount;//  采购数量
                                    this.purchasePurposes=area.purchasePurposes;// 采购用途
                                    this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                                    this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                                    if(area.companyQualifications!= null){
                                        this.certificateBox=JSON.parse(area.companyQualifications)// 企业资质要求
                                    }
                                    if(area.managerQualifications!=null){
                                        this.leaderBox=JSON.parse(area.managerQualifications);// 项目负责人资质要求
                                    }
                                    
                                }else if(area.projectCode != null && this.projectObj.totalProjectId== area.projectCode){
                                    this.purchaseAmount=area.purchaseAmount;//  采购数量
                                    this.purchasePurposes=area.purchasePurposes;// 采购用途
                                    this.technologyQualifications=area.technologyQualifications;// 简要技术要求
                                    this.applicantQualifications=area.applicantQualifications;// 投标人资格条件
                                    if(area.companyQualifications!= null){
                                         this.certificateBox=JSON.parse(area.companyQualifications)// 企业资质要求
                                    }
                                    if(area.managerQualifications!=null){
                                        this.leaderBox=JSON.parse(area.managerQualifications);// 项目负责人资质要求
                                    }
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
            // 响应文件开启时间
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
                            this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD HH:mm:ss');
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
            // 招标公告附件
            getTwoList(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'采购信息'
                    }
                }else{
                    // 入场项目编号
                    object ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'采购信息'
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
                            fileType:'采购信息'
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
                            fileType:'采购信息'
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
                        formData.append("fileType", '采购信息');
                    }
                }else{
                    // 总包
                    formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                    formData.append("file", this.files);
                    if(this.num == 1){
                        formData.append("fileType", '招标（采购）人确认函');
                    }else{
                        formData.append("fileType", '采购信息');
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