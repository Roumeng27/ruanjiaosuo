<template>
    <div class="newBox">
        <div v-show="passJudgeShow">
            <!-- 采购异常 -->
            <div class="wrapper" v-show="writeFlag">
                <div class="box">
                    <button class="btn" @click="newly(1)">保存</button>
                    <button class="btn" @click="newly(2)">下一步</button>
                </div>
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
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-show="breakBagFlag">   
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
                                    prop="entrySubcontractNumber"
                                    label="入场项目(分包)编号">
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
                                    label="查看">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 异常处理 -->
                    <el-collapse-item title="异常处理" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">异常情况描述：</div>
                                    <div class="editContent">
                                        <el-input v-model="exceptionDescription" type="textarea"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">审批或核准结果：</div>
                                    <div class="editContent">
                                        <el-input v-model="approvedResult" type="textarea"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">审批或核准时间：</div>
                                    <div class="editContent">
                                        <el-date-picker
                                            v-model="approvedTime"
                                            type="date"
                                            placeholder="开始日期"
                                            :picker-options="pickerOptions0">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">异常类型：</div>
                                    <div class="editContent">
                                        <el-radio-group v-model="exceptionTypes" @change="getRadio">
                                            <el-radio label="终止招标">终止招标</el-radio>
                                            <!-- <el-radio label="重新招标">重新招标</el-radio>
                                            <el-radio label="变更采购方式">变更采购方式</el-radio> -->
                                        </el-radio-group>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem" v-show="typeBtn">
                                <div class="editCenter">
                                    <div class="editName">原采购方式：</div>
                                    <div class="editContent">
                                        {{oldBiddingType}}
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">现采购方式：</div>
                                    <div class="editContent">
                                        <el-select v-model="newBiddingType" clearable>
                                            <el-option v-for="item in newBiddingTypeList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">是否发布公告：</div>
                                    <div class="editContent">
                                        <el-checkbox v-model="isNotice" @change="getisNoticeInfo">是</el-checkbox>
                                    </div>
                                </div>
                            </div>
                            <div v-show="showEditFlag">
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>网站显示公告标题：</div>
                                        <div class="editContent">
                                            <el-input v-model="noticeTitle"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公告开始时间：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                v-model="noticeStartTime"
                                                :picker-options="pickerOptions1">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">公告结束时间：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                v-model="noticeEndTime"
                                                :picker-options="pickerOptions2">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 公告内容 -->
                    <el-collapse-item title="公告内容" name="3" v-show="showEditFlag">
                        <div class="editor-container" style="padding:10px 0;">
                            <quill-editor v-model="noticeContent"
                                ref="myQuillEditor"
                                class="editer"
                                :options="editorOption">
                            </quill-editor>
                        </div>
                    </el-collapse-item>
                    <!-- 已发布公告情况-->
                    <el-collapse-item title="已发布公告情况" name="3">
                        <el-table
                                ref="multipleTable"
                                :data="conditionData"
                                tooltip-effect="dark"
                                style="width: 100%">
                            <el-table-column
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="projectCode"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                prop="projectName"
                                label="分包名称">
                            </el-table-column>
                            <el-table-column
                                prop="publishState"
                                label="发布状态">
                            </el-table-column>
                            <el-table-column
                                prop="startTime"
                                label="公告开始时间">
                            </el-table-column>
                            <el-table-column
                                prop="endTime"
                                label="公告截止时间">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 历史记录 -->
                    <el-collapse-item title="历史记录" name="4">
                    <el-table
                            ref="multipleTable"
                            :data="historyData"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="entrySubcontractNumber"
                            label="入场项目(分包)编号">
                        </el-table-column>
                        <el-table-column
                            prop="nameOfTenderProject"
                            label="采购项目名称">
                        </el-table-column>
                        <el-table-column
                            prop="subcontractName"
                            label="分包名称">
                        </el-table-column>
                        <el-table-column
                            prop="exceptionTypes"
                            label="处理结果">
                        </el-table-column>
                    </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="nextWrapper" v-show="nextFlag">
                <div class="box" v-show="headerBtn">
                    <button class="btn" @click="goBack">上一步</button>
                    <button class="btn" @click="submitInfo">提交</button>
                </div>
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
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-show="breakBagFlag">   
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
                                    prop="entrySubcontractNumber"
                                    label="入场项目(分包)编号">
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
                                    label="查看">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
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
                            <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem != '办理通过' && this.stateItem != '待办理'">
                                <template slot-scope="scope">
                                    <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 异常处理 -->
                    <el-collapse-item title="异常处理" name="3">
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
                                    <div class="editContent">{{isNotice == true ?'是':'否'}}</div>
                                </div>
                            </div>
                            <div v-show="showEditFlag">
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
                        </div>
                    </el-collapse-item>
                    
                    <el-collapse-item title="公告内容" name="3" v-show="showEditFlag">
                        <div class="edit_list" v-html="noticeContents">{{noticeContents}}</div>
                    </el-collapse-item>
                    <!-- 已发布公告情况-->
                    <el-collapse-item title="已发布公告情况" name="3">
                        <el-table
                                ref="multipleTable"
                                :data="conditionData"
                                tooltip-effect="dark"
                                style="width: 100%">
                            <el-table-column
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="projectCode"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                prop="projectName"
                                label="分包名称">
                            </el-table-column>
                            <el-table-column
                                prop="publishState"
                                label="发布状态">
                            </el-table-column>
                            <el-table-column
                                prop="startTime"
                                label="公告开始时间">
                            </el-table-column>
                            <el-table-column
                                prop="endTime"
                                label="公告截止时间">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 历史记录 -->
                    <el-collapse-item title="历史记录" name="5">
                        <el-table
                                ref="multipleTable"
                                :data="historyData"
                                tooltip-effect="dark"
                                style="width: 100%">
                            <el-table-column
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号" v-if="entrySubcontractNumber != null">
                            </el-table-column>
                            <el-table-column
                                prop="projectCode"
                                label="入场项目(分包)编号" v-else>
                            </el-table-column>
                            <el-table-column
                                prop="nameOfTenderProject"
                                label="采购项目名称">
                            </el-table-column>
                            <el-table-column
                                prop="subcontractName"
                                label="分包名称">
                            </el-table-column>
                            <el-table-column
                                prop="exceptionTypes"
                                label="处理结果">
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
            <!-- 分包信息详情 -->
            <div class="winWrapper" v-show="lookFlag">
                <div class="winBox">
                    <div class="pick_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeLook"></i>
                    </div>
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
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter" v-if="role_types == '招标(采购)代理' || str_entrust_type != '委托角色'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{amountId}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 分包信息-->
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
                                        <div class="editName">采购范围：</div>
                                        <div class="editContent">{{scopeOfTender}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包控制金额：</div>
                                        <div class="editContent">{{subcontractingControlAmount}}<span>万元</span></div>
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
                <span>修改信息将导致电子件列表中的 [采购公告] 重新生成，您确认要继续吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="laststepBoxSure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 提交弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="sureSubmitBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>采购异常提交成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureBtn">确 定</el-button>
            </span>
        </el-dialog>
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
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import {formatDate,changeTime} from '../../../api/base.js'
export default {
    components: {
        //使用编辑器
        quillEditor
    },
    data(){
        return {
            frameShow:false,
            alertMsg:'',
            passJudgeShow:true,
            str_entrust_type:window.sessionStorage.str_entrust_type,
            agentAddress : '',
            agentPhone :'',
            role_types:window.localStorage.role_types,
            biddingPurchasingAgencyName:'',
            pickerOptions0: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            // 结束
            pickerOptions2: {
                disabledDate: (time) => {
                    return time.getTime() < new Date(this.noticeStartTime).getTime()- (24*60*60*1000)/24;//减去一天的时间代表可以选择同一天;
                }
            },
            stateItem:'',
			projectObj:JSON.parse(window.localStorage.projectObj),
            activeName:['1','2','3','4','5','6'],
            tableData:[],
            multipleSelection:[],//多选框
			writeFlag:true,// 总包输入 列表
            // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            tenderPurchaserName:'',// 招标(采购)人
			budgetAmount:'',// 招标项目预算金额
			amountOfBiddingProject:'',//招标项目金额
			biddingProcurementMode:'',// 招标采购方式
			biddingOrganization:'',// 招标组织方式
            typesOfBiddingProjects:'',// 招标项目类型
            amountId:'',// 总包
            entrySubcontractNumber:'',// 入场项目编号 分包
            projectCode:'',//入场项目编号 总包
			saveBox:false,//保存弹窗
            // 下一步页面
            nextFlag:false,
            projectLeaderPhone:'',//联系方式
            remark:'',// 备注
            // 上一步所需字段
            laststepBox:false,
            // 确定提交
            sureSubmitBox:false,
            headerBtn:true,
			candidateMenu:[],// 分包列表
			name:'',// 分包项目名称
			number:'',// 入场项目分包编号 (分包列表)
			subpackageData:[],// 确定选择的列表
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            // 输入所需字段
            exceptionDescription:'',//异常情况描述 
            approvedResult:'',// 审核或核准结果 
            approvedTime:'',//审核或批准时间 
            exceptionTypes:'终止招标',// 异常类型
            isNotice:false,// 是否发布公告 
            noticeContent:'',// 公告内容
            noticeTitle:'',// 网站显示公告标 题 
            noticeStartTime:'',// 公告开始时间 
            noticeEndTime:'',// 公告结束时间 
            oldBiddingType:'',// 原招标方式
            newBiddingType:'',// 现招标方式
            newBiddingTypeList:[],// 现招标方式数组
            id:'',// 招标异常id
            // 富文本编辑所需字段
            showEditFlag:false,
            editorOption: {},
            // 招标信息 下边的分包信息(总包不显示 分包显示)
            breakBagFlag:false,
            // 中标信息详情
			lookFlag:false,
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            totalProjectId:'',
            conditionData:[],// 已发布公告情况
            historyData:[],// 历史记录
            typeBtn:false,// 变更采购方式需要展示的内容
            // 文件上传所需字段
            enclosureData:[{
                appendixName: "*重新组织招标或重新组织评标的相关材料",
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
            noticeContents:'',// 公告内容
        }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    created(){
        if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
            // 分包
            this.entrySubcontractNumber = this.projectObj.totalProjectId;
            this.breakBagFlag = true;
            // this.getItemInfo();// 根据项目入场分包编号查询
        }else{
            // 总包
            this.projectCode = this.projectObj.totalProjectId;
            this.breakBagFlag = false;
        }
        this.getInitInfo();// 初始化查询
        this.getItemInfo(this.projectObj.totalProjectId);// 根据项目入场分包编号查询
		this.getbiddingInfo();// 招标项目信息
        this.getmanageInfo();// 办理记录
        this.getnewBiddingType();// 现招标方式
        this.getconditionInfo();// 已发布公告情况
        this.gethistoryInfo();// 历史记录
        this.uploadList();//上传列表
        this.getDecideList();
    },
    methods:{
        // 复选框的列表
        handleSelectionChange(val) {
			this.multipleSelection = val;
        },
        // 判断富文本编辑器是否展示
        getisNoticeInfo(){
            if(this.isNotice == true){
                this.showEditFlag = true;
            }else{
                this.showEditFlag = false;
            }
        },
        getRadio(){
            if(this.exceptionTypes =='变更采购方式'){
                this.typeBtn = true;
            }else{
                this.typeBtn = false;
            }
        },
        // 保存和下一步公用方法
        newly(num){
            this.uploadList();
            if(this.isNotice){
                if(!this.noticeTitle){
                    this.$layer.msg('请输入网站显示公告标题');
                }else {
                    if(num == 1 || num == 3){
                        // 保存
                        this.savecandidateInfo(num)
                    }else{
                        // 下一步
                        this.writeFlag = false;// 输入框的页面
                        this.nextFlag = true;// 下一步页面
                        this.approvedTime = changeTime(this.approvedTime);//审核或批准时间 
                        this.noticeStartTime = changeTime(this.noticeStartTime);//公告开始时间
                        this.noticeEndTime = changeTime(this.noticeEndTime);//公告结束时间
                        this.savecandidateInfo(num)
                        this.getmanageInfo();// 办理记录
                        this.uploadList();
                        if(this.isNotice == true){
                            this.showEditFlag = true;
                        }else{
                            this.showEditFlag = false;
                        }
                    }
                }
            }else{
                if(num == 1 || num == 3){
                    // 保存
                    this.savecandidateInfo(num);// 保存
                }else{
                    // 下一步
                    this.writeFlag = false;// 输入框的页面
                    this.nextFlag = true;// 下一步页面
                    this.approvedTime = changeTime(this.approvedTime);//审核或批准时间 
                    this.noticeStartTime = changeTime(this.noticeStartTime);//公告开始时间
                    this.noticeEndTime = changeTime(this.noticeEndTime);//公告结束时间
                    this.savecandidateInfo(num);// 保存
                    this.getmanageInfo();// 办理记录
                    this.uploadList();
                    if(this.isNotice == true){
                    this.showEditFlag = true;
                    }else{
                        this.showEditFlag = false;
                    }
                }
            }
            
        },
        // 上一步
        goBack(){
            this.laststepBox = true;// 上一步弹窗 确定
            this.writeFlag = true;// 输入框的页面
            this.nextFlag = false;// 下一步页面
            this.getLastTempInfo();// 上一步查询
        },
        // 提交
        submitInfo(){
           this.$axios({
                method: "POST",
                url: baseUrl+"/tenderExceptionController/submit",
                data:{
                    operationFlow:'采购异常',
                    id:this.id,// 工本费接收账户id 
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.sureSubmitBox = true;
                    this.headerBtn = false;
                    this.nextFlag = true;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 确认提交 ---> 确定
        sureBtn(){
            this.sureSubmitBox = false; // 提交弹窗
            this.nextFlag = true;
            this.getmanageInfo();// 办理记录
        },
        handleClose(){
            this.saveBox = false;// 保存弹窗 确定
            this.laststepBox = false;// 上一步弹窗 确定
            this.sureSubmitBox = false; // 提交弹窗
            this.frameShow = false;
        },
        // 保存弹窗 确定
        saveBoxSure(){
            this.saveBox = false;
        },
        // 上一步弹窗 确定
        laststepBoxSure(){
            this.laststepBox = false;
            this.getLastTempInfo();// 上一步的查询
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
         // 关闭查看详情
        closeLook(){
            this.lookFlag = false
        },
        // 保存
        savecandidateInfo(num){
            let checked = ''
            if(this.isNotice == true){
               checked = '是'
            }else{
                checked = '否'
            }
            // 去除所有的标签
            let reg=/<\/?.+?\/?>/g;
            let object = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                object = {
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    exceptionDescription:this.exceptionDescription,
                    approvedResult:this.approvedResult,
                    approvedTime:changeTime(this.approvedTime),
                    exceptionTypes:this.exceptionTypes,
                    isNotice:checked,
                    // noticeContent:this.noticeContent.replace(reg,''),
                    noticeContent:this.noticeContent,  //公告内容
                    noticeTitle:this.noticeTitle,
                    noticeStartTime:changeTime(this.noticeStartTime),
                    noticeEndTime:changeTime(this.noticeEndTime),
                    id:this.id
                }
            }else{
                // 总包
                object = {
                    projectCode:this.projectCode,
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    exceptionDescription:this.exceptionDescription,
                    approvedResult:this.approvedResult,
                    approvedTime:changeTime(this.approvedTime),
                    exceptionTypes:this.exceptionTypes,
                    isNotice:checked,
                    // noticeContent:this.noticeContent.replace(reg,''),
                    noticeContent:this.noticeContent,  //公告内容
                    noticeTitle:this.noticeTitle,
                    noticeStartTime:changeTime(this.noticeStartTime),
                    noticeEndTime:changeTime(this.noticeEndTime),
                    id:this.id
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderExceptionController/saveOrNextStep',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        // 保存
                        this.saveBox = true;
                        this.isNotice= res.data.data.isNotice;
                    }else{
                        // 下一步
                        this.saveBox = false;
                    }
                    this.exceptionDescription= res.data.data.exceptionDescription;
                    this.approvedResult= res.data.data.approvedResult;
                    if(res.data.data.approvedTime == 0 || res.data.data.approvedTime == null){
                        this.approvedTime=  ''
                    }else{
                         this.approvedTime= formatDate(res.data.data.approvedTime);
                    }
                    this.exceptionTypes= res.data.data.exceptionTypes;

                    this.isNotice= res.data.data.isNotice;
                    if(this.isNotice == '是'){
                        this.isNotice = true;
                        this.showEditFlag = true;
                    }else{
                        this.isNotice = false;
                        this.showEditFlag = false;
                    }
                    this.noticeContents= res.data.data.noticeContent;// 公告内容
                    this.noticeTitle= res.data.data.noticeTitle;
                    if(res.data.data.noticeStartTime ==null ||res.data.data.noticeStartTime ==0){
                        this.noticeStartTime='';
                    }else{
                        this.noticeStartTime= formatDate(res.data.data.noticeStartTime)
                    }
                    if(res.data.data.noticeEndTime ==null ||res.data.data.noticeEndTime ==0){
                        this.noticeEndTime= '';
                    }else{
                        this.noticeEndTime= formatDate(res.data.data.noticeEndTime);
                    }
                    this.id= res.data.data.id;// 招标异常 ID
                    
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
		// 根据入场项目编号查询分包列表
		getTotalInfo(){
			this.$axios({
                method: "POST",
                url: baseUrl+"/subcontractItemController/selectListByTotalProjectId",
                data:{
					totalProjectId:this.amountId,
					subcontractingState:'办理通过'
				}
            }).then(res=>{
                if(res.data.status == 200){
					this.candidateMenu = res.data.data.list;
					for(let i=0;i<this.candidateMenu.length;i++){
						this.nameOfTenderProject = this.candidateMenu[i].projectInformationVo.nameOfTenderProject;
						this.biddingProcurementMode = this.candidateMenu[i].projectInformationVo.biddingProcurementMode;
					}
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 已发布公告情况
		getconditionInfo(){
            let url = ''
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                url =  baseUrl+"/tenderExceptionController/publishedNotice/"+this.entrySubcontractNumber
            }else{
                // 总包
                url =  baseUrl+"/tenderExceptionController/publishedNotice/"+this.projectCode
            }
			this.$axios({
                method: "GET",
                url:url
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data != null){
                        this.conditionData.push(res.data.data);
                    }
                    if(this.conditionData.length>0){
                        this.conditionData.forEach(item=>{
                            if(item.startTime!=null){
                                item.startTime = formatDate(item.startTime);
                            }
                            if(item.endTime!=null){
                                item.endTime = formatDate(item.endTime);
                            }
                        })
                    }
                    
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 历史记录
		gethistoryInfo(){
            let object = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                // 分包
                object = {
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    state:'办理通过'
                }
            }else{
                // 总包
                object = {
                    projectCode:this.projectCode,
                    state:'办理通过'
                }
            }
			this.$axios({
                method: "POST",
                url: baseUrl+"/tenderExceptionController/selectHistory",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
					this.historyData = res.data.data;
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
					entrySubcontractNumber:this.number,
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
        // 办理记录
        async getmanageInfo(){
            await this.getInitInfo();// 初始化查询
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.id
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.id
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
        // 根据项目入场分包编号查询
        getItemInfo(entrySubcontractNumber){
            let arr =[];
            arr.push(entrySubcontractNumber)
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:arr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.subpackageData = res.data.data;
                    let str = '';
                    // 获取原招标方式
                    if( this.subpackageData.length>0){
                        this.subpackageData.forEach(item=>{
                            if(this.projectObj.totalProjectId == item.totalProjectId){
                                str = item.biddingProcurementMode;
                            }
                        })
                    }
                    this.oldBiddingType = str;
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
                method: "POST",
                url: baseUrl+"/tenderExceptionController/queryTenderException",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data.state == null){
                        this.writeFlag = false;// 有保存和下一步的按钮
                        this.nextFlag = true;// 有上一步和提交的页面
                    }else if(res.data.data.state == '编辑中' || res.data.data.state == '办理未通过'){
                        this.writeFlag = false;// 有保存和下一步的按钮
                        this.nextFlag = true;// 有上一步和提交的页面
                    }else{
                        this.writeFlag = false;// 有保存和下一步的按钮
                        this.nextFlag = true;// 有上一步和提交的页面
                        this.headerBtn = false;// 有上一步和提交的按钮
                    }
                    this.exceptionDescription= res.data.data.exceptionDescription;
                    this.approvedResult= res.data.data.approvedResult;
                    if(res.data.data.approvedTime ==null || res.data.data.approvedTime ==0){
                        this.approvedTime= '';
                    }else{
                        this.approvedTime= formatDate(res.data.data.approvedTime);
                    }
                    this.exceptionTypes= res.data.data.exceptionTypes;
                    this.isNotice= res.data.data.isNotice;
                    this.noticeContents= res.data.data.noticeContent;
                    this.noticeTitle= res.data.data.noticeTitle;
                    if(res.data.data.noticeStartTime ==null ||res.data.data.noticeStartTime ==0){
                        this.noticeStartTime='';
                    }else{
                        this.noticeStartTime= formatDate(res.data.data.noticeStartTime)
                    }
                    if(res.data.data.noticeEndTime ==null ||res.data.data.noticeEndTime ==0){
                        this.noticeEndTime= '';
                    }else{
                        this.noticeEndTime= formatDate(res.data.data.noticeEndTime);
                    }
                    
                     this.stateItem = res.data.data.state;
                    
                    if(this.isNotice == '是'){
                        this.isNotice = true;
                        this.showEditFlag = true;
                    }else{
                        this.isNotice = false;
                        this.showEditFlag = false;
                    }
                    if(res.data.data.exceptionTypes == '变更采购方式'){
                        this.typeBtn = true;
                    }else{
                        this.typeBtn =false;
                    }
                    this.id = res.data.data.id;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 上一步的查询
        getLastTempInfo(){
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
                url: baseUrl+"/tenderExceptionController/queryTenderException",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.exceptionDescription= res.data.data.exceptionDescription;
                    this.approvedResult= res.data.data.approvedResult;
                    if(res.data.data.approvedTime ==null || res.data.data.approvedTime == 0){
                        this.approvedTime= '';
                    }else{
                        this.approvedTime= formatDate(res.data.data.approvedTime);
                    }
                    
                    this.exceptionTypes= res.data.data.exceptionTypes;
                    this.isNotice= res.data.data.isNotice;
                    this.noticeContent= res.data.data.noticeContent;
                    this.noticeTitle= res.data.data.noticeTitle;
                    if(res.data.data.noticeStartTime ==null ||res.data.data.noticeStartTime ==0){
                        this.noticeStartTime='';
                    }else{
                        this.noticeStartTime= formatDate(res.data.data.noticeStartTime)
                    }
                    if(res.data.data.noticeEndTime ==null ||res.data.data.noticeEndTime ==0){
                        this.noticeEndTime= '';
                    }else{
                        this.noticeEndTime= formatDate(res.data.data.noticeEndTime);
                    }
                    if(this.isNotice == '是'){
                        this.isNotice = true;
                        this.showEditFlag = true;
                    }else{
                        this.isNotice = false;
                        this.showEditFlag = false;
                    }
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
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
                object={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'重新组织招标或重新组织评标的相关材料'
                }
            }else{
                //  总包
                object={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'重新组织招标或重新组织评标的相关材料'
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
                    if(this.fileData.length>0){
                        this.fileData.map((item,index)=>{
                            if(item.uploadTime !=null ){
                                item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
                            }
                            arr.push(item)
                        })
                    }
                    
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
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 分包
                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '重新组织招标或重新组织评标的相关材料');
            }else{
                // 总包
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '重新组织招标或重新组织评标的相关材料');
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
        //判断角色
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
                        var obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            
                        })
                        if(obj.zhaobiao.state != '办理通过'){
                            this.alertMsg = '项目经办人尚未执行此操作，不可查看!'
                            this.passJudgeShow = false;
                            this.frameShow = true;
                        }else{
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        }
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 下拉框
        // 现采购方式
        getnewBiddingType(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'现采购方式'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.newBiddingTypeList = res.data.data.data;
				}else{
					this.$layer.msg(res.data.msg);
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
    overflow: hidden;
}
/* 检索页面 */
.pickWrapper,.searchWrapper,.lookWrapper,.winWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
	
}
.pickBox,.searchBox,.lookBox,.winBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.pick_title{
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
    height: 100%;
    overflow-y: scroll;
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
}
.edit_list{
    padding: 0 50px;
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
}
.editCenter{
    width: 50%;
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
    padding: 0 10px;
    color: #6e622e;
}
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
/* 上传文件 */
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