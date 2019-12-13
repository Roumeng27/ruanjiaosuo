<template>
    <!-- 采购变更文件 -->
    <div class="newBox">
        <div v-show="passJudgeShow"  style="height:100%;overflow-y:hidden;">
            <div class="wrapper" v-show="writeFlag">
                <div class="box" v-show="writeHeadBtn">
                    <button class="btn" @click="newly(1)">保存</button>
                    <button class="btn" @click="newly(2)">下一步</button>
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
                                        <div class="editContent">{{totalProjectId}} </div>
                                    </div>
                                </div>
                                <!-- 表格 -->
                                <div class="table_box"  v-show="breakBagFlag">
                                    <el-table :data="subpackageData" stripe style="width: 100%">
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="entrySubcontractNumber"  :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="200">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractName" :show-overflow-tooltip ="true"  label="分包名称">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount" :show-overflow-tooltip ="true" label="分包控制金额(万元)">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 文件信息 -->
                        <el-collapse-item title="文件信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>采购文件发售时间：</div>
                                        <div class="editContent">
                                            <el-date-picker :picker-options="pickerOptions0" value-format="timestamp" v-model="saleDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>投标有效期(天)：</div>
                                        <div class="editContent"><el-input v-model="bidPeriod" clearable></el-input></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">答疑澄清时间：</div>
                                        <div class="editContent">
                                            <el-date-picker :picker-options="pickerOptions1" value-format="timestamp"  v-model="answerTime" type="datetime" placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>投标文件递交方式：</div>
                                        <div class="editContent">
                                            <el-input type="textarea" v-model="biddingDocumentsMethod" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>开标方式：</div>
                                        <div class="editContent">
                                            <el-select v-model="bidOpeningMethod" clearable>
                                                <el-option v-for="item in openMethodData" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 保证金信息 -->
                        <el-collapse-item title="保证金信息" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>保证金：</div>
                                        <div class="editContent">
                                            <el-radio-group v-model="depositType" @change="changeType">
                                                <el-radio label="金额">金额</el-radio>
                                                <el-radio label="费率">费率</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editContent">
                                            <div class="editName"></div>
                                            <el-input v-model="depositAmount" clearable></el-input>
                                            <p style="padding:0 10px;">元</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>保证金接收账户：</div>
                                        <div class="editContent">
                                            <el-input v-model="depositReceive" type="textarea" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">保证金递交方式：</div>
                                        <div class="editContent">
                                            <el-checkbox-group v-model="methodArr">
                                                <el-checkbox label="银行本票"></el-checkbox>
                                                <el-checkbox label="银行汇票"></el-checkbox>
                                                <el-checkbox label="转账支票"></el-checkbox>
                                                <el-checkbox label="电汇"></el-checkbox>
                                                <el-checkbox label="保函"></el-checkbox>
                                                <el-checkbox label="在线支付"></el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 变更事项 -->
                        <el-collapse-item title="变更事项" name="4">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>变更事项：</div>
                                        <div class="editContent">
                                            <el-input v-model="changeMatters" clearable></el-input>
                                         </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>变更日期：</div>
                                        <div class="editContent">
                                            <el-date-picker :picker-options="pickerOptions1" value-format="timestamp"  v-model="changeDate" type="datetime" placeholder="选择日期时间">
                                            </el-date-picker>
                                         </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>变更理由：</div>
                                        <div class="editContent">
                                            <el-input v-model="changeReasons" type="textarea" :rows="3" ></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div class="nextWrapper" v-show="nextFlag">
                <div class="box box_nav" v-show="nextHeadBtn">
                    <button class="btn" @click="goBack">上一步</button>
                    <button class="btn" @click="submitFile">提交</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName1" accordion>
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
                                        <div class="editContent">{{totalProjectId}} </div>
                                    </div>
                                </div>
                                <!-- 表格 -->
                                <div class="table_box"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                    <el-table :data="subpackageData" stripe style="width: 100%">
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="entrySubcontractNumber" :show-overflow-tooltip ="true" label="入场项目(分包)编号" width="200">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractName" :show-overflow-tooltip ="true" label="分包名称">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount" :show-overflow-tooltip ="true" label="分包控制金额(万元)">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 附件 -->
                        <el-collapse-item title="相关附件" name="2" v-if="role_types == '招标(采购)代理'  || str_entrust_type == '委托角色'">
                            <el-table :data="appendixData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column label="附件列表(点击查看)">
                                    <template slot-scope="scope">
                                        <li v-for='(item,index) in scope.row.attachlist' :key='index' @click="downLoadupFile(item)" class="liItem">
                                        {{item.fileName}}
                                        </li>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="100" v-if="stateItem != '待办理'">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row.id)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 附件 -->
                        <el-collapse-item title="相关附件" name="2" v-else>
                            <el-table :data="appendixData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column label="附件列表(点击查看)">
                                    <template slot-scope="scope">
                                        <li v-for='(item,index) in scope.row.attachlist' :key='index' @click="downLoadupFile(item)" class="liItem">
                                        {{item.fileName}}
                                        </li>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 文件信息 -->
                        <el-collapse-item title="文件信息" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editTextarea">
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
                                    <div class="editCenter">
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
                        <el-collapse-item title="保证金信息" name="4">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">保证金{{depositType}}：</div>
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
                        <el-collapse-item title="变更事项" name="5">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">变更事项：</div>
                                        <div class="editContent">{{changeMatters}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">变更日期：</div>
                                        <div class="editContent">{{changeDate}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">变更理由：</div>
                                        <div class="editContent">{{changeReasons}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="6">
                            <el-table :data="manageDate" stripe style="width: 100%">
                                <el-table-column prop="step" label="步骤"  width="180">
                                </el-table-column>
                                <el-table-column  prop="userName" :show-overflow-tooltip ="true" label="办理人员" width="180">
                                </el-table-column>
                                <el-table-column prop="creationTime" :show-overflow-tooltip ="true" label="时间">
                                </el-table-column>
                                <el-table-column prop="state" :show-overflow-tooltip ="true" label="状态">
                                </el-table-column>
                                <el-table-column prop="remarks" label="备注">
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
            <!-- 查看详情 -->
            <div class="lookWrapper" v-show="lookFlag">
                <div class="lookBox">
                    <div class="lookTitle">
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
                                            <div class="editName">采购项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}} </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目编号：</div>
                                            <div class="editContent">{{totalProjectId}} </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!--分包信息 -->
                            <el-collapse-item title="分包信息" name="2">
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
            <!-- 确认保存弹窗 -->
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
                    <el-button type="primary" @click="sureSave">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 确认提交弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="submitBox"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>提交成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitSave()">确 定</el-button>
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
    import dayjs from "dayjs"
    import {checkNumber,changeTime } from '../../../api/base.js'
    export default {
        data(){
            return {
                str_entrust_type:window.sessionStorage.str_entrust_type,
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
                documentNumber:'',
                cancelShow:false,
                totalProjectId:'',
                scopeOfTender:'',
                // 分包信息
                subpackageData:[],
                breakBagFlag:false,// 控制总包分包的弹窗
                attachmeId:'',
                num:'',
                uploadTitle:'',
                fileData:[],
                uploadFlag:false,
                frameShow:false,
                passJudgeShow:true,
                totalProjectId:'',
                entrySubcontractNumber:'',
                electronicBidEvaluation:'',//电子化开评标
                qualificationExaminationMethod:'',//资格审查方式
                subcontractingControlAmount:'',//分包控制金额
                subcontractContents:'',//分包范围
                subcontractContents:'',//分包内容
                subcontractName:'',//分包名称
                projectObj:JSON.parse(window.localStorage.projectObj),
                saveBox:false,//保存成功弹框
                submitBox:false,//提交成功弹框
                show:true,
                writeFlag:true,// 有保存和下一步页面
                nextFlag:false,// 有上一步和提交页面
                writeHeadBtn:true,// 有保存和下一步按钮
                nextHeadBtn:true,// 有上一步和提交按钮
                lookFlag:false,//查看分包信息弹框
                activeName:['1','2','3','4'],
                activeName1:['1','2','3','4','5','6'],
                appendixData:[
                    {
                        id:1,
                        appendixName: "招标(采购)文件",
                        attachlist: []
                    },
                    {
                        id:2,
                        appendixName: "图纸文件",
                        attachlist: []
                    }
                ],
                currentPage:1,//当前页
                nameOfTenderProject:'',//招标名称
                tenderPurchaserName:'',//招标采购人
                amountOfBiddingProject:'',//招标项目金额
                biddingProjectNumber:'',//招标项目编号
                totalProjectId:'',//入场项目编号
                value6:'',
                openMethodData:[],//开标方式数据
                checkList:'',//多选框
                saleDate:[],
                saleStartDate:'',//招标发售开始时间
                saleEndDate:'',
                bidPeriod:'',//投标有效期
                answerTime:'',//答疑澄清时间
                biddingDocumentsMethod:'',
                bidOpeningMethod:'',//开标方式
                depositType:'',// 保证金类型
                depositAmount:'',//保证金数量
                depositReceive:'',//保证金接收账户
                methodArr:[],
                depositMethod:'',//保证金递交方式
                depositMethodArr:[],//字符串保证金递交方式
                projectNum:'',//文件项目编号
                tenderInforId:'',//点击下一步返回的id
                projectEntrySubcontractNumbers:[],//分包信息表格的数组格式
                EntrySubNum:'',
                manageDate:[],
                stateItem:'',// 后端返回状态
                bidDocumentId:'',//主键id
                alertMsg:'',// 权限提示内容
                totalProId:'',
                bidDocumentChangeId:'',// 变更文件id
                // 变更事项所需字段
                changeDate:'',// 变更日期
                changeReasons:'',// 变更理由
                changeMatters:'',// 变更事项
            }
        },
        created(){
            this.getDecideList();
            this.getbiddingInfo();// 招标项目信息
            this.titleExaminationList();
            this.getInitInfo();// 初始化查询
            this.getmanageInfo();// 办理记录查询
            this.getOneList();// 招标(采购)文件附件
            this.getTwoList();// 图纸文件附件
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                //分包
                this.breakBagFlag = true;
                this.EntrySubNum = this.projectObj.totalProjectId;
                this.getItemInfo();// 根据项目入场分包编号查询
            }else{
                $('.table_box').hide();
                this.breakBagFlag = false;
            }
        },
        methods:{
            // 招标项目信息
            getbiddingInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                        this.totalProjectId = res.data.data.totalProjectId;//入场项目编号
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.tenderContents = res.data.data.tenderContents;// 招标内容
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }else{
                        this.$message.warning(res.data.msg);
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
                    url:baseUrl+'/bidDocumentChangeController/selectListByCode',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data == null ||  res.data.data.length<=0){
                            this.writeFlag = true;
                            this.nextFlag = false;
                        }else{
                            if(res.data.data.length>0){
                                res.data.data.forEach(item=>{
                                    this.stateItem = item.state;// 后端返回状态
                                    if(item.state == '待办理'){
                                        this.writeFlag = false;// 有保存和下一步的按钮
                                        this.nextFlag = true;// 有上一步和提交的页面
                                        this.nextHeadBtn = false;
                                    }else if(item.state == '编辑中' || item.state == '办理未通过'){
                                        this.writeFlag = false;
                                        this.nextHeadBtn = true;// 有上一步和提交的按钮
                                        this.nextFlag = true;
                                    }else{
                                        this.writeFlag = true;
                                        this.nextHeadBtn = false;// 有上一步和提交的按钮
                                    }
                                    if(this.writeFlag == true){
                                        if(window.sessionStorage.str_entrust_type != '委托角色' && this.role_types == '招标(采购)人'){
                                            if(item.answerTime == null){
                                                this.answerTime = ''
                                            }else{
                                                this.answerTime = dayjs(item.answerTime).format('YYYY-MM-DD HH:mm:ss');// 答疑澄清时间
                                            }
                                            if(item.saleStartDate == null){
                                                this.saleStartDate = ''
                                            }else{
                                                this.saleStartDate = dayjs(item.saleStartDate).format('YYYY-MM-DD');//招标文件发售开始时间
                                            }
                                            if(item.saleEndDate == null){
                                                this.saleEndDate = ''
                                            }else{
                                                this.saleEndDate =dayjs(item.saleEndDate).format('YYYY-MM-DD');//招标文件发售结束时间
                                            }
                                            if(item.changeDate == null){
                                                this.changeDate = ''
                                            }else{
                                                this.changeDate= dayjs(item.changeDate).format('YYYY-MM-DD HH:mm:ss');// 变更日期
                                            }
                                        }else{
                                            if(item.answerTime == null){
                                                this.answerTime = ''
                                            }else{
                                                this.answerTime = item.answerTime;// 答疑澄清时间
                                            }
                                            if(item.saleStartDate == null){
                                                this.saleStartDate = ''
                                            }else{
                                                this.saleStartDate = item.saleStartDate;// 招标文件发售开始时间
                                            }
                                            if(item.saleEndDate == null){
                                                this.saleEndDate = ''
                                            }else{
                                                this.saleEndDate = item.saleEndDate;// 招标文件发售结束时间
                                            }
                                            let arr = [];
                                            arr.push(this.saleStartDate,this.saleEndDate)
                                            this.saleDate = arr;
                                            if(item.changeDate == null){
                                                this.changeDate = ''
                                            }else{
                                                this.changeDate = item.changeDate;// 变更日期
                                            }
                                            // 保证金允许递交方式
                                            if(item.depositMethod == ""){
                                                this.methodArr = [];
                                            }else{
                                                this.methodArr = item.depositMethod.split(',')
                                            }
                                        }
                                        
                                    }else if(this.nextFlag == true){
                                        if(item.answerTime == null){
                                            this.answerTime = ''
                                        }else{
                                            this.answerTime = dayjs(item.answerTime).format('YYYY-MM-DD HH:mm:ss');// 答疑澄清时间
                                        }
                                        if(item.saleStartDate == null){
                                            this.saleStartDate = ''
                                        }else{
                                             this.saleStartDate = dayjs(item.saleStartDate).format('YYYY-MM-DD');//招标文件发售开始时间
                                        }
                                        if(item.saleEndDate == null){
                                            this.saleEndDate = ''
                                        }else{
                                             this.saleEndDate =dayjs(item.saleEndDate).format('YYYY-MM-DD');//招标文件发售结束时间
                                        }
                                        if(item.changeDate == null){
                                            this.changeDate = ''
                                        }else{
                                            this.changeDate= dayjs(item.changeDate).format('YYYY-MM-DD HH:mm:ss');// 变更日期
                                        }
                                        this.depositMethod = item.depositMethod;// 保证金允许递交方式
                                    }
                                    this.bidOpeningMethod = item.bidOpeningMethod;// bidOpeningMethod
                                    this.bidPeriod = item.bidPeriod;// 投标有效期
                                    this.biddingDocumentsMethod = item.biddingDocumentsMethod;// 投标文件递交方式
                                    this.depositAmount= item.depositAmount; //保证金数量
                                    this.depositReceive= item.depositReceive;// 保证金接收账户
                                    this.depositType= item.depositType;//保证金类型
                                    this.documentNumber= item.documentNumber;//documentNumber
                                    this.changeReasons= item.changeReasons;// 变更理由
                                    this.changeMatters= item.changeMatters;// 变更事项
                                    this.bidDocumentId = item.bidDocumentId;
                                    this.bidDocumentChangeId = item.bidDocumentChangeId;
                                })
                            }
                        }
                        
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 分包信息
            getItemInfo(){
                let arr = [];
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
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            newly(num){
                if(this.saleDate.length == 0){
                    this.$message.warning('请选择采购文件发售时间');
                    return false;
                }else if(this.bidPeriod !='' && this.bidPeriod !=null && !checkNumber(this.bidPeriod)){
                    this.$message.warning('请输入正确的投标有效期');
                    return false;
                }else if(!this.biddingDocumentsMethod){
                    this.$message.warning('请填入投标文件递交方式');
                    return false;
                }else if(!this.bidOpeningMethod){
                    this.$message.warning('请选择开标方式');
                    return false;
                }else if(!this.depositType){
                    this.$message.warning('请选择保证金类型');
                    return false;
                }else if(!this.depositAmount ){
                    if(!checkNumber(this.depositAmount)){
                        this.$message.warning('请填写正确的保证金金额');
                        return false;
                    }
                }else if(!this.depositReceive){
                    this.$message.warning('请填写保证金接收账户');
                    return false;
                }else if(!this.changeMatters){
                    this.$message.warning('请填写变更事项');
                    return false;
                }else if(!this.changeReasons){
                    this.$message.warning('请填写变更理由');
                    return false;
                }else if(!this.changeDate){
                    this.$message.warning('请填写变更日期');
                    return false;
                }else{	
                    if(num == 1){
                        // 保存
                        this.saveInfo(num);// 保存的公共方法
                    }else{
                        // 下一步
                        this.saveInfo(num);// 保存的公共方法
                        this.writeFlag = false;// 输入框的页面
                        this.nextFlag = true;// 下一步页面
                        this.nextHeadBtn = true;// 有上一步和提交的按钮
                        this.getOneList();// 招标(采购)文件附件
                        this.getTwoList();// 图纸文件附件
                    }
                }
            },
            // 保存的公共方法
            saveInfo(num){
                let object = {};
                // 入场项目(分包)编号
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    // 分包
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:changeTime(this.answerTime),
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(','),
                        changeMatters:this.changeMatters,	
                        changeReasons:this.changeReasons,		
                        changeDate:changeTime(this.changeDate)
                    }
                }else{
                    // 总包
                    object={
                        projectCode:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:changeTime(this.answerTime),
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(','),
                        changeMatters:this.changeMatters,	
                        changeReasons:this.changeReasons,		
                        changeDate:changeTime(this.changeDate)
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/bidDocumentChangeController/saveOrUpdate',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(num == 1){
                            this.saveBox = true;
                        }else{
                            this.writeFlag = false;// 有保存和下一步按钮
                            this.nextFlag = true;// 有上一步和提交按钮
                        }

                        this.bidOpeningMethod = res.data.data.bidOpeningMethod;// bidOpeningMethod
                        this.bidPeriod = res.data.data.bidPeriod;// 投标有效期
                        this.biddingDocumentsMethod = res.data.data.biddingDocumentsMethod;// 投标文件递交方式
                        this.depositAmount= res.data.data.depositAmount; //保证金数量
                        if(res.data.data.depositMethod == ""){
                            this.depositMethod = '';
                        }else{
                            this.depositMethod = res.data.data.depositMethod
                        }
                        this.depositReceive= res.data.data.depositReceive;// 保证金接收账户
                        this.depositType= res.data.data.depositType;//保证金类型
                        this.documentNumber= res.data.data.documentNumber;//文件编号
                        this.changeReasons= res.data.data.changeReasons;// 变更理由
                        this.changeMatters= res.data.data.changeMatters;// 变更事项
                        //招标文件发售结束时间
                        if(res.data.data.saleStartDate == null){
                            this.saleStartDate = ""
                        }else{
                            this.saleStartDate =  dayjs(res.data.data.saleStartDate).format('YYYY-MM-DD');
                        };
                        //招标文件发售开始时间
                        if(res.data.data.saleEndDate == null){
                            this.saleEndDate = ""
                        }else{
                            this.saleEndDate =  dayjs(res.data.data.saleEndDate).format('YYYY-MM-DD');
                        };
                        
                        // 答疑澄清时间
                        if(res.data.data.answerTime == null){
                            this.answerTime == ""
                        }else{
                            this.answerTime = dayjs(res.data.data.answerTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        // 变更日期
                        if(res.data.data.changeDate == null){
                            this.changeDate == ""
                        }else{
                            this.changeDate = dayjs(res.data.data.changeDate).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.bidDocumentId = res.data.data.bidDocumentId;// 主键ID
                        this.bidDocumentChangeId = res.data.data.bidDocumentChangeId;// 变更文件id
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            sureSave(){
                this.saveBox = false;
            },
            handleClose(){
                this.saveBox = false;
                this.submitBox = false;
                this.frameShow = false;
                this.cancelShow = false;
            },
            //编号问题
            typeIndex(index) {
                return index + (this.currentPage - 1) * 10 + 1;
            },
            //下拉框--》开标方式
            titleExaminationList(){
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/interfaceTableController/selectByname',
                    data:{
                        dropDownBox:'开标方式'
                    }
                }).then(res=>{
                    if(res.data.data.status == 200){
                        this.openMethodData = res.data.data.data;
                    }else{
                        this.$message.warning(res.data.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //查看分包信息
            lookFile(row){
                this.lookFlag = true;
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称 
                this.subcontractContents = row.subcontractContents;// 分包内容
                this.scopeOfTender = row.scopeOfTender;// 招标范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额    
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            },
            closeLook(){
                this.lookFlag = false;
            },
            //上一步
            goBack(){
                this.writeFlag = true;// 输入框的页面
                this.nextFlag = false;// 下一步页面
                this.getLastTemp();// 上一步查询
            },
            // 上一步查询
            getLastTemp(){
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
                    url:baseUrl+'/bidDocumentChangeController/selectListByCode',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.length>0){
                            res.data.data.forEach(item=>{
                                this.answerTime = item.answerTime;// 答疑澄清时间
                                this.bidOpeningMethod = item.bidOpeningMethod;// bidOpeningMethod
                                this.bidPeriod = item.bidPeriod;// 投标有效期
                                this.biddingDocumentsMethod = item.biddingDocumentsMethod;// 投标文件递交方式
                                this.depositAmount= item.depositAmount; //保证金数量
                                if(item.depositMethod == ""){
                                    this.methodArr = [];
                                }else{
                                    this.methodArr = item.depositMethod.split(',')
                                }
                                this.depositReceive= item.depositReceive;// 保证金接收账户
                                this.depositType= item.depositType;//保证金类型
                                this.documentNumber= item.documentNumber;//documentNumber
                                this.saleStartDate = item.saleStartDate;//招标文件发售结束时间
                                //招标文件发售开始时间
                                let arr = [];
                                this.saleEndDate = item.saleEndDate;
                                arr.push(this.saleStartDate,this.saleEndDate);
                                this.saleDate = arr;
                                this.changeDate= item.changeDate;// 变更日期
                                this.changeReasons= item.changeReasons;// 变更理由
                                this.changeMatters= item.changeMatters;// 变更事项
                            })
                        }
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //提交
            submitFile(){
                if(this.appendixData[0].attachlist == ""){
                    this.$message.warning('请选择招标(采购)文件附件');
                    return false;
                }else {
                    this.$axios({
                        method:'POST',
                        url:baseUrl+'/bidDocumentChangeController/submit',
                        data:{
                            state:'待办理',
                            bidDocumentChangeId:this.bidDocumentChangeId,
                            operationFlow:'变更文件'
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.submitBox = true;
                            this.getInitInfo();// 初始化查询
                        }else{
                            this.$message.warning(res.data.msg);
                            this.submitBox = false;
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            submitSave(){
                this.submitBox = false;
                this.getmanageInfo();//办理记录
            },
            // 编辑
            editInfo(){
                this.writeFlag = true;
                this.nextFlag = false;
                this.getLastTemp();// 上一步查询
            },
            //保证金方式的不同，后面单位不同
            changeType(){
                if(this.depositType == "金额"){
                    $('.yuan').html('元')
                }else{
                    $('.yuan').html('%')
                }
            },
            //点击下一步附件按钮
            goUploadPage(num){
                this.num = num;
                this.uploadFlag = true;
                if(num == 1){
                    this.uploadTitle = "招标(采购)文件"
                }else{
                    this.uploadTitle = "图纸文件"
                }
                this.uploadList();
            },
            //上传列表
            uploadList(){
                var obj={};
                if(this.num == 1){
                    if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                        obj={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                            fileType:'招标(采购)文件'
                        }
                    }else{
                        obj={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                            fileType:'招标(采购)文件'
                        }
                    }
                    
                }else if(this.num == 2){
                    if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                        obj={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                            fileType:'图纸文件'
                        }
                    }else{
                        obj={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                            fileType:'图纸文件'
                        }
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
                        if(this.num == 1){
                            this.appendixData[0].attachlist = arr
                        }else{
                            this.appendixData[1].attachlist = arr
                        }
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //上传文件
            loadFile(event){
                if(this.num == 1){
                    if(this.appendixData[0].attachlist.length > 0){
                        this.$message.warning('招标(采购)文件只能上传一个附件');
                    }else{
                        var file = event.target.files[0];
                        var fileSize = file.size; 
                        if(fileSize > 102400000) {
                            this.$message.warning('图片大小不能超过102400000KB');
                            return false;
                        }
                        this.$refs.file.value = null;
                        this.files = file;
                        var formData = new FormData();
                        if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                            formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                            formData.append("file", this.files);
                            if(this.num == 1){
                                formData.append("fileType", '招标(采购)文件');
                            }else if(this.num == 2){
                                formData.append("fileType", '图纸文件');
                            }
                        }else{
                            formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                            formData.append("file", this.files);
                            if(this.num == 1){
                                formData.append("fileType", '招标(采购)文件');
                            }else if(this.num == 2){
                                formData.append("fileType", '图纸文件');
                            }
                        }
                    
                        this.$axios({
                            method: 'POST',
                            url: baseUrl + '/attachmeController/multifileUpload',
                            data:formData
                        }).then(res=>{
                            if(res.data.status == 200){
                                this.uploadList();
                                $('.file_btn').val = "";
                            }else{
                                this.$message.warning(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }else{
                    var file = event.target.files[0];
                    var fileSize = file.size; 
                    if(fileSize > 102400000) {
                        this.$message.warning('图片大小不能超过102400000KB');
                        return false;
                    }
                    this.$refs.file.value = null;
                    this.files = file;
                    var formData = new FormData();
                    if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                        if(this.num == 1){
                            formData.append("fileType", '招标(采购)文件');
                        }else if(this.num == 2){
                            formData.append("fileType", '图纸文件');
                        }
                    }else{
                        formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                        formData.append("file", this.files);
                        if(this.num == 1){
                            formData.append("fileType", '招标(采购)文件');
                        }else if(this.num == 2){
                            formData.append("fileType", '图纸文件');
                        }
                    }
                
                    this.$axios({
                        method: 'POST',
                        url: baseUrl + '/attachmeController/multifileUpload',
                        data:formData
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.uploadList();
                            $('.file_btn').val = "";
                        }else{
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }
                
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
                this.downloadFile(item.attachmeId,item.fileName)
            },
            //删除上传文件
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
            closeUpload(){
                this.uploadFlag = false;
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
                                if(item.value == '变更文件'){
                                    $('.box_nav').hide();
                                    this.nextFlag = true;
                                    this.writeFlag = false;
                                }
                            })
                        }else{
                            let obj = {};
                            res.data.data.map((item,index)=>{
                                if(item.value == '采购异常'){
                                    obj.zhaobiao = item;
                                }
                                if(item.value == '变更文件'){
                                    obj.houxuanren = item
                                }
                                if(item.value == '采购文件'){
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
                                        this.alertMsg = '尚未完成采购文件,无法进行变更文件!'
                                    }
                                }
                            }else{
                                //其他的都不能看
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未完成采购文件,无法进行变更文件!'
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
            // 办理记录查询
            async getmanageInfo(){
                await this.getInitInfo();// 初始化查询
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    object={
                        itemNumber:this.projectObj.totalProjectId,
                        relatedId:this.bidDocumentChangeId
                    }
                }else{
                    object={
                        itemNumber:this.projectObj.totalProjectId,
                        relatedId:this.bidDocumentChangeId
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
            //招标(采购)文件附件
            getOneList(){
                var obj={};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'招标(采购)文件'
                    }
                }else{
                    obj={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'招标(采购)文件'
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
                        this.appendixData[0].attachlist = arr
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //图纸上传附件
            getTwoList(){
                var obj={};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'图纸文件'
                    }
                }else{
                    obj={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'图纸文件'
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
                        this.appendixData[1].attachlist = arr
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
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
    overflow-y: scroll;
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
.uploadWrapper,.lookWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 9;
    padding:50px;
    display: flex;
    flex-direction: column;
}
.uploadBox,.lookBox{
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.upload_title,.lookTitle{
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
.notic,h6,b{
    color:red;
}
h1{
    font-weight: normal;
}
.title_box{
    width: 100%;
    height: 100px;
    border-bottom: 2px  dashed red;
}
.main_box{
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
}
.main_box li{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.main_box li span{
   padding-left: 150px;
}
.main_info {
    width: 100%;
    margin-top: 2px;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
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
  .upload:hover{
    text-decoration: underline;
    color:#f00;
    cursor: pointer;
  }
  .file_btn{
    position: absolute;
    right: 80px;
    top: 0;
    display: inline-block;
    width: 86px;
    height: 40px;
    border: none;
    outline: none;
    background-color: transparent;
    opacity: 0;
    background: #0095d5;
    cursor: pointer;
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
}
.editName{
    width: 145px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.editContent{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
    display: flex;
    align-items: center;
}
.editContent>.el-select{
    width: 100% !important;
}
.editContent>.el-date-editor{
    width: 100% !important;
}
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.star{
    color: #f00;
}
</style>