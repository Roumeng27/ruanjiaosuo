<template>
    <!-- 采购答疑文件 -->
    <div class="newBox">
        <div v-show="passJudgeShow" style="height:100%;overflow-y:scroll;">
            <div class="wrapper">
                <div class="box"></div>
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
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{amountId}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 答疑文件 -->
                        <el-collapse-item title="答疑文件" name="2">
                            <div class="edit_list">
                                <div class="boxBtn" id="question_work">
                                    <button class="btn" @click="addAnswerFile">新增</button>
                                    <button class="btn" @click="deleteAnswerFile">删除</button>
                                </div>
                                <div class="tableBox">
                                    <el-table
                                        ref="multipleTable"
                                        :data="answerData"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleAnswerInfo">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                            label="序号"
                                            width="70">
                                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="projcetNumber"
                                            label="入场项目(分包)编号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="nameOfTenderProject"
                                            label="采购项目名称">
                                        </el-table-column>
                                        <el-table-column
                                            prop="answerQuestionsTime"
                                            label="次数">
                                        </el-table-column>
                                        <el-table-column
                                            prop="state"
                                            label="状态">
                                        </el-table-column>
                                        <el-table-column
                                            label="操作">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="cursor:pointer;" @click="viewInfo(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 新增答疑文件 -->
            <div class="addWarpper" v-show="addFlag">
                <div class="addBox">
                    <div class="addTitle">
                        <p>{{addAnswerTitle}}(第{{answerQuestionsTime}}次答疑)</p>
                        <i class="el-icon-close" style="cursor:pointer;" @click="closeAddanswerFile"></i>
                    </div>
                    <div class="pageWrapper" v-show="writeFlag">
                        <div class="box">
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
                                            <div class="editCenter">
                                                <div class="editName">入场项目编号：</div>
                                                <div class="editContent">{{amountId}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tableBox" v-if="projectObj.totalProjectId.indexOf('-') > -1">
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
                                <!-- 答疑信息 -->
                                <el-collapse-item title="答疑信息" name="2">
                                    <div class="edit_list">
                                        <div class="editItem">
                                            <div class="editCenter">
                                                <div class="editName">当前开标时间：</div>
                                                <div class="editContent">{{assessmentTime}}</div>
                                            </div>
                                            <div class="editCenter">
                                                <div class="editName">开标地点：</div>
                                                <div class="editContent">{{openingRoom}}</div>
                                            </div>
                                        </div>
                                        <div class="editItem">
                                            <div class="editTextarea">
                                                <div class="editName"><p class="star">*</p>答疑类型：</div>
                                                <div class="editContent">
                                                    <el-radio-group v-model="answerQuestionsType" size="small">
                                                        <el-radio label="答疑文件">答疑文件</el-radio>
                                                        <el-radio label="补遗文件">补遗文件</el-radio>
                                                        <el-radio label="澄清文件">澄清文件</el-radio>
                                                        <el-radio label="其他"></el-radio>
                                                    </el-radio-group> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="editItem">
                                            <div class="editTextarea">
                                                <div class="editName"><p class="star">*</p>答疑内容：</div>
                                                <div class="editContent">
                                                    <el-input
                                                        type="textarea"
                                                        :rows="5"
                                                        v-model="answerQuestionsContent">
                                                    </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-collapse-item>
                                <!-- 澄清与修改历史 -->
                                <el-collapse-item title="澄清与修改历史" name="3">
                                    <div class="edit_list" v-show="editFlag">
                                        暂无澄清与修改历史!
                                    </div>
                                    <div class="edit_list" v-show="showEditInfo">
                                         <el-table
                                                ref="multipleTable"
                                                :data="editHistoryData"
                                                tooltip-effect="dark"
                                                style="width: 100%">
                                            <el-table-column
                                                label="序号">
                                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="projcetNumber"
                                                label="分包编号">
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
                                                prop="answerQuestionsTime"
                                                label="澄清次数">
                                            </el-table-column>
                                            <el-table-column
                                                label="查看">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-search"  style="cursor: pointer;" @click="searchItem(scope.row)"></i>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                    <div class="pageWrapper" v-show="nextFlag">
                        <div class="box" v-show="nextHeadBtn">
                            <button class="btn" @click="goBack">上一步</button>
                            <button class="btn" @click="submitInfo">提交</button>
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
                                            <div class="editCenter">
                                                <div class="editName">入场项目编号：</div>
                                                <div class="editContent">{{amountId}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tableBox" v-if="projectObj.totalProjectId.indexOf('-') > -1">
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
                                <!-- 答疑信息 -->
                                <el-collapse-item title="答疑信息" name="2">
                                    <div class="edit_list">
                                        <div class="editItem">
                                            <div class="editCenter">
                                                <div class="editName">当前开标时间：</div>
                                                <div class="editContent">{{assessmentTime}}</div>
                                            </div>
                                            <div class="editCenter">
                                                <div class="editName">开标地点：</div>
                                                <div class="editContent">{{openingRoom}}</div>
                                            </div>
                                        </div>
                                        <div class="editItem">
                                            <div class="editTextarea">
                                                <div class="editName">答疑类型：</div>
                                                <div class="editContent">{{answerQuestionsType}}</div>
                                            </div>
                                        </div>
                                        <div class="editItem">
                                            <div class="editTextarea">
                                                <div class="editName">答疑内容：</div>
                                                <div class="editContent">{{answerQuestionsContent}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </el-collapse-item>
                                <!-- 相关附件 -->
                                <el-collapse-item title="相关附件" name="3">
                                    <div class="edit_list">
                                        <el-table :data="enclosureData" stripe style="width: 100%">
                                            <el-table-column prop="appendixName" label="附件名称">
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
                                    </div>
                                </el-collapse-item>
                                <!-- 澄清与修改历史 -->
                                <el-collapse-item title="澄清与修改历史" name="4">
                                    <div class="edit_list" v-show="editFlag">
                                        暂无澄清与修改历史!
                                    </div>
                                    <div class="edit_list" v-show="showEditInfo">
                                         <el-table
                                                ref="multipleTable"
                                                :data="editHistoryData"
                                                tooltip-effect="dark"
                                                style="width: 100%">
                                            <el-table-column
                                                label="序号">
                                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="projcetNumber"
                                                label="分包编号">
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
                                                prop="answerQuestionsTime"
                                                label="澄清次数">
                                            </el-table-column>
                                            <el-table-column
                                                label="查看" v-if="this.stateItem !='待办理' &&this.stateItem !='办理通过'">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-search"  style="cursor: pointer;" @click="searchItem(scope.row)"></i>
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
            <!-- 查看详情 -->
            <div class="lookWrapper" v-show="lookFlag">
                <div class="lookBox">
                    <div class="lookTitle">
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
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter"  v-if="role_types == '招标(采购)代理'  || str_entrust_type != '委托角色'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}} </div>
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
                                        <div class="editName">电子化开评标：</div>
                                        <div class="editContent">{{electronicBidEvaluation}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 保存弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="successFlag"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>{{successTitle}}</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="successSure">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 警告弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="warnFlag"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>有尚未审核通过的答疑，不可新增！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleClose">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 提交弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="submitFlag"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>提交成功!</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitSure">确 定</el-button>
                </span>
            </el-dialog>
             <!-- 删除提示 -->
            <el-dialog
                title="系统提示"
                :visible.sync="deleteFlag"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>请选择需要删除的答疑文件！</span>
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
    import {formatDate,changeTime} from '../../../api/base.js'
    import dayjs from "dayjs";
    export default {
        data(){
            return {
                str_entrust_type:window.sessionStorage.str_entrust_type,
                role_types:window.localStorage.role_types,
                biddingPurchasingAgencyName:'',
                projectObj:JSON.parse(window.localStorage.projectObj),
                answerFileId:'',
                activeName:['1','2','3','4','5','6'],
                // 采购项目信息所需字段
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
                // 分包信息
                subpackageData:[],
                lookFlag:false,
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 电子化开评标
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                // 答疑列表所需字段
                answerData:[],
                multipleAnswerData:[],// 多选框选中的数据
                // 新增答疑文件
                addFlag:false,// 新增答疑文件弹窗
                addAnswerTitle:'',// 标题
                answerQuestionsType:'答疑文件',// 答疑类型
                answerQuestionsContent:'',// 答疑内容
                answerFileId:'',// 答疑文件ID
                answerQuestionsTime:'1',// 次数
                writeFlag:true,// 可输入的弹窗
                nextFlag:false,// 可提交的弹窗
                nextHeadBtn:true,// 下一步提交的按钮
                // 附件
                enclosureData:[{
                    id:1,
                    appendixName: "招标（采购）人确认函",
                    attachlist: []
                },
                {
                    id:2,
                    appendixName: "答疑/补遗文件",
                    attachlist: []
                }],
                uploadFlag:false,// 文件上传弹窗
                uploadTitle:'',// 文件上传标题
                stateItem:'',// 后端返回状态
                files:{},//文件
                fileName:'',//上传文件名称
                fileSize:'',//上传文件大小
                uploadingPeople:'',//上传人
                uploadTime:'',//上传时间
                fileData:[],//上传文件表格
                attachmeId:[],// 选中的ID
                 // 办理记录
                 manageDate:[],
                 // 澄清与修改历史
                 editHistoryData:[],
                // 弹窗
                successFlag:false,// 成功弹窗
                successTitle:'',// 成功标题
                frameShow:false,// 权限弹窗
                alertMsg:'',// 权限弹窗提示
                warnFlag:false,// 警告提示
                passJudgeShow:true,
                deleteFlag:false,// 删除弹窗
                submitFlag:false,// 提交弹窗
                editFlag:true,// 暂无澄清与修改历史!
                showEditInfo:false,// 澄清与修改历史列表
                // 开标信息
                openingRoom:'',// 开标地点
                assessmentTime:'',// 当前开标时间
            }
        },
        created() {
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                this.getItemInfo();// 根据项目入场分包编号查询分包信息列表
            }
            this.getInitInfo();// 初始化查询
            this.getAnswerList();// 答疑文件列表
            this.getbiddingInfo();// 招标项目信息
            this.getDecideList();// 权限提示
        },
        methods: {
            // 答疑文件列表查询
            getAnswerList(){
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    object = {
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        answerFileId:''
                    }
                }else{
                    object = {
                        projectCode:this.projectObj.totalProjectId,
                        answerFileId:''
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/answerFileController/selectList",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.answerData = res.data.data;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 根据场地预约的接口获取数据
            getOpeningData(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/select',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        res.data.data.forEach(item=>{
                            // 当前开标时间
                            if(item.assessmentTime == null){
                                this.assessmentTime = ''
                            }else{
                                this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD HH:mm:ss')
                            }
                            this.openingRoom = item.openingRoom;// 开标地点
                        })
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 多选框选中的数据
            handleAnswerInfo(val){
                this.multipleAnswerData = val;
            },
            // 新增答疑文件
            addAnswerFile(){
                let flag = true;
                this.answerData.forEach(item=>{
                    if(item.state != '办理通过'){
                        this.warnFlag = true;// 警告提示
                        flag = false;
                    }
                })
                if(flag){
                    this.addFlag = true;
                    this.addAnswerTitle = '新增答疑澄清文件';
                    this.writeFlag = true;
                    this.nextFlag = false;
                    this.answerQuestionsTime = '1';// 次数
                    this.answerQuestionsType='答疑文件';// 答疑类型
                    this.answerQuestionsContent='';// 答疑内容
                    this.addAnswerFile = '';
                    this.getOpeningData();// 根据场地预约的接口获取数据
                    this.enclosureData[0].attachlist = [];
                    this.enclosureData[1].attachlist = [];
                    this.answerQuestionsTime = this.answerData.length+1;// 新增次数
                }
            },
            closeAddanswerFile(){
                this.addFlag =false;
            },
            newly(num){
                if(!this.answerQuestionsType){
                    this.$layer.msg('请选择答疑类型!');
                    return false;
                }else if(!this.answerQuestionsContent){
                    this.$layer.msg('请输入答疑内容!');
                    return false;
                }else{
                    if(num == 1){
                        // 保存
                        this.saveInfo(num);// 保存的公共方法
                    }else{
                        // 下一步
                        this.writeFlag = false;
                        this.nextFlag = true;
                        this.addAnswerTitle = '查看答疑澄清文件';
                        this.saveInfo(num);// 保存的公共方法
                    }
                }
            },
            // 保存的公共方法
            saveInfo(num){
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    object = {
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        answerQuestionsType:this.answerQuestionsType,// 答疑类型
                        answerQuestionsContent:this.answerQuestionsContent,// 答疑内容
                        answerFileId:this.answerFileId
                    }
                }else{
                    object = {
                        projectCode:this.projectObj.totalProjectId,
                        answerQuestionsType:this.answerQuestionsType,// 答疑类型
                        answerQuestionsContent:this.answerQuestionsContent,// 答疑内容
                        answerFileId:this.answerFileId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/answerFileController/saveOrUpdate",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(num == 1){
                            this.successTitle = '保存成功!';
                            this.successFlag = true;
                        }else{

                        }
                        this.answerQuestionsType = res.data.data.answerQuestionsType;// 答疑类型
                        this.answerQuestionsContent = res.data.data.answerQuestionsContent;// 答疑内容
                        this.answerFileId = res.data.data.answerFileId;// 答疑文件ID
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 上一步
            goBack(){
                this.writeFlag = true;
                this.nextFlag = false;
                this.addAnswerTitle = '修改答疑澄清文件';
            },
            // 提交
            submitInfo(){
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/answerFileController/submit",
                    data:{
                        answerFileId:this.answerFileId,
                        operationFlow:'答疑文件',
                        state:'待办理'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.submitFlag = true;
                        this.addFlag = false;
                        this.getAnswerList();// 答疑文件查询列表
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            submitSure(){
                this.submitFlag = false;
                this.getmanageInfo();// 办理记录查询
            },
            // 删除答疑文件
            deleteAnswerFile(){
                let arr =[];
                this.multipleAnswerData.forEach(item=>{
                    arr.push(item.answerFileId)
                })
                if(arr.length <= 0){
                    this.deleteFlag = true;
                }else{
                    this.$axios({
                    method: "POST",
                    url: baseUrl+"/answerFileController/deletedByIds",
                    data:arr
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.successTitle = '删除成功！';
                            this.successFlag = true;
                            this.getAnswerList();
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    })
                }
            },
            // 操作答疑文件
            viewInfo(row){
                // this.answerFileId = row.answerFileId;// 答疑文件ID
                this.answerQuestionsTime = row.answerQuestionsTime;// 次数
                this.getOpeningData();// 根据场地预约的接口获取数据
                this.stateItem = row.state;
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/answerFileController/selectById/"+row.answerFileId,
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.state == '编辑中' || res.data.data.state == '办理未通过'){
                            this.addAnswerTitle = '查看答疑澄清文件'
                            this.addFlag = true;
                            this.writeFlag = false;
                            this.nextFlag = true;
                            this.nextHeadBtn = true;
                        }else if(res.data.data.state == '办理通过'){
                            this.addAnswerTitle = '查看答疑澄清文件'
                            this.addFlag = true;
                            this.writeFlag = false;
                            this.nextFlag = true;
                            this.nextHeadBtn = false;
                        }else if(res.data.data.state == '待办理'){
                            this.addAnswerTitle = '查看答疑澄清文件'
                            this.addFlag = true;
                            this.writeFlag = false;
                            this.nextFlag = true;
                            this.nextHeadBtn = false;
                        }else{
                            this.addAnswerTitle = '查看答疑澄清文件'
                            this.addFlag = true;
                            this.writeFlag = true;
                            this.nextFlag = false;
                        }
                        this.answerQuestionsType = res.data.data.answerQuestionsType;// 答疑类型
                        this.answerQuestionsContent = res.data.data.answerQuestionsContent;// 答疑内容
                        this.answerFileId = res.data.data.answerFileId;// 答疑文件ID
                        this.geteditHistory(row.answerFileId);// 澄清与修改历史
                        this.getmanageInfo();// 办理记录查询
                        this.getOneList();// 招标（采购）人确认函
                        this.getTwoList();// 答疑/补遗文件
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 澄清与修改历史
            geteditHistory(answerFileId){
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    object = {
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        answerFileId:answerFileId
                    }
                }else{
                    object = {
                        projectCode:this.projectObj.totalProjectId,
                        answerFileId:answerFileId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/answerFileController/selectList",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.editHistoryData = res.data.data;
                        if(this.editHistoryData.length>0){
                            this.showEditInfo = true;
                            this.editFlag =false;
                        }else{
                            this.showEditInfo = false;
                            this.editFlag =true;
                        }
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            searchItem(row){
                this.addFlag = true;
                this.writeFlag = false;
                this.nextFlag = true;
                this.nextHeadBtn = false;
            },
            successSure(){
                this.successFlag = false; 
            },
            handleClose(){
               this.successFlag = false; // 成功的弹窗
               this.frameShow =false;// 权限弹窗
               this.deleteFlag = false;// 删除弹窗
               this.submitFlag = false;// 提交弹窗
               this.warnFlag = false;// 警告提示
            },
            // 根据项目入场分包编号查询分包信息列表
            getItemInfo(){
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
                    }else{
                        this.$layer.msg(res.data.msg);
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
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 电子化开评标
                this.lookFlag = true;
            },
            //关闭查看详情
            closeLook(){
                this.lookFlag = false;
            },
            
            // 初始化查询
            getInitInfo(){

            },
            // 办理记录
            async getmanageInfo(){
                await this.getInitInfo();// 初始化查询
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    object={
                        itemNumber:this.projectObj.totalProjectId,
                        relatedId:this.answerFileId
                    }
                }else{
                    object={
                        itemNumber:this.projectObj.totalProjectId,
                        relatedId:this.answerFileId
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
                                if(item.value == '答疑文件'){
                                    obj.gonggao = item
                                }
                                if(item.value == '采购文件'){
                                    obj.wenjian = item
                                }
                            })
                            if(obj.gonggao.state != '办理通过'){
                                $('#question_work').hide()
                            }else{
                                $('#question_work').show()
                            }
                        }else{
                            var obj = {};
                            res.data.data.map((item,index)=>{
                                if(item.value == '采购异常'){
                                    obj.zhaobiao = item;
                                }
                                if(item.value == '答疑文件'){
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
                                        this.alertMsg = '尚未完成采购文件，无法制作答疑文件！'
                                    }
                                }
                            }else{
                                //其他的都不能看
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未完成采购文件，无法制作答疑文件！'
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
            //上传列表
            uploadList(){
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 分包
                    if(this.num == 1){
                        object={
                            relevanceCorrelationId:this.answerFileId,
                            fileType:'招标（采购）人确认函'
                        }
                    }else{
                        object={
                            relevanceCorrelationId:this.answerFileId,
                            fileType:'答疑/补遗文件'
                        }
                    }
                    
                }else{
                    // 总包
                    if(this.num == 1){
                        object={
                            relevanceCorrelationId:this.answerFileId,
                            fileType:'招标（采购）人确认函'
                        }
                    }else{
                        object={
                            relevanceCorrelationId:this.answerFileId,
                            fileType:'答疑/补遗文件'
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
                    formData.append("projectId", this.answerFileId);
                    formData.append("file", this.files);
                    if(this.num == 1){
                        formData.append("fileType", '招标（采购）人确认函');
                    }else{
                        formData.append("fileType", '答疑/补遗文件');
                    }
                }else{
                    // 总包
                    formData.append("projectId", this.answerFileId);
                    formData.append("file", this.files);
                    if(this.num == 1){
                        formData.append("fileType", '招标（采购）人确认函');
                    }else{
                        formData.append("fileType", '答疑/补遗文件');
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
            downLoadupFile(item){
                this.downloadFile(item.attachmeId,item.fileName);
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
            // 招标（采购）人确认函
            getOneList(){
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 分包
                    object={
                        relevanceCorrelationId:this.answerFileId,
                        fileType:'招标（采购）人确认函'
                    }
                }else{
                    // 总包
                    object={
                        relevanceCorrelationId:this.answerFileId,
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
            // 答疑/补遗文件
            getTwoList(){
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 分包
                    object={
                        relevanceCorrelationId:this.answerFileId,
                        fileType:'答疑/补遗文件'
                    }
                }else{
                    // 总包
                    object={
                        relevanceCorrelationId:this.answerFileId,
                        fileType:'答疑/补遗文件'
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
        },
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
.addWarpper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:10px;
    display: flex;
    flex-direction: column;
}
.pageWrapper{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
}
.lookWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:30px;
    display: flex;
    flex-direction: column;
}
.addBox,.lookBox{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.addTitle,.lookTitle{
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
    margin-top: 2px;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
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
/* 列表按钮 */
.boxBtn{
    display: flex;
    height:40px;
}
.tableBox{
    margin-top: 5px;
}
</style>