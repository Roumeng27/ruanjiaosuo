<template>
    <div class="pageWrap">
        <!-- 采购文件 -->
        <div  v-show="passJudgeShow"  style="height:100%;overflow-y:hidden;">
            <!-- 上一步弹框 -->
            <div v-show="show" class="backTop" style="height:100%;overflow-y:hidden;min-width:1200px;overflow-x:scroll;">
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="saveFile()">保存</button>
                    <button class="nav_co nav_next" @click="nextTo()">下一步</button>
                </div>
                <div class="new_main" style="height:99%;overflow-y:scroll;">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 第一步 -->
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
                                    <el-table :data="enclosureData" stripe style="width: 100%">
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractName"  label="分包名称">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
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
                        <!-- 第二步 -->
                        <el-collapse-item title="文件信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>采购文件发售时间：</div>
                                        <div class="editContent">
                                            <el-date-picker :picker-options="pickerOptions0" value-format="timestamp" v-model="saleDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @blur="blurDate()">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>投标有效期(天)：</div>
                                        <div class="editContent"><el-input v-model="bidPeriod"></el-input></div>
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
                        <!-- 第三步 -->
                        <el-collapse-item title="保证金信息" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>保证金：</div>
                                        <div class="editContent">
                                            <el-radio-group v-model="depositType" @change="changeType()">
                                                <el-radio label="金额">金额</el-radio>
                                                <el-radio label="费率">费率</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editContent">
                                            <div class="editName"></div>
                                            <el-input v-model="depositAmount"></el-input>
                                            <p class="yuan" style="padding:0 10px;"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>保证金接收账户：</div>
                                        <div class="editContent">
                                            <el-input v-model="depositReceive" type="textarea"></el-input>
                                            <!-- <el-button>设置账户</el-button> -->
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
                    </el-collapse>
                </div>
            </div>
            <!-- 采购文件下一步弹框 -->
            <div v-show="nextShow" style="height:100%;overflow-y:hidden;min-width:1200px;overflow-x:scroll;">
                <div class="new_nav">
                    <button class="nav_co nav_next" @click="backTo()">上一步</button>
                    <button class="nav_co nav_save" @click="submitFile()">提交</button>
                </div>
                <div style="height:99%;overflow-y:scroll;">
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
                                <el-table :data="enclosureData" stripe style="width: 100%">
                                    <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                    </el-table-column>
                                    <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                    </el-table-column>
                                    <el-table-column  prop="subcontractName"  label="分包名称">
                                    </el-table-column>
                                    <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
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
                    <el-collapse-item title="相关附件" name="2">
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
                            <el-table-column fixed="right" label="操作" width="100" v-if="this.zhuangtai != '办理通过' && this.zhuangtai != '待办理'">
                                <template slot-scope="scope">
                                    <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row.id)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 文件信息 -->
                    <el-collapse-item title="文件信息" name="3">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
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
                                    <div class="editContent">{{depositAmount}}<span class="yuan"></span> </div>
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
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="5">
                        <el-table :data="manageDate" stripe style="width: 100%">
                            <el-table-column prop="step" label="步骤"  width="180">
                            </el-table-column>
                            <el-table-column  prop="userName" label="办理人员" width="180">
                            </el-table-column>
                            <el-table-column prop="creationTime" label="时间">
                            </el-table-column>
                            <el-table-column prop="state" label="状态">
                            </el-table-column>
                            <el-table-column prop="remarks" label="备注">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
                </div>
            </div>
            <!-- 查看分包信息弹框 -->
            <div v-show="subcontractInforShow" class="fb_box">
                <div class="new_head">
                    <div style="padding-left:10px;">分包信息</div>
                    <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_main">
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
                                    <div class="editCenter" v-if="role_types == '招标(采购)代理'  || str_entrust_type != '委托角色'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
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
                        <!-- 分包信息 -->
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
            <!-- 上传文件弹框 -->
            <div class="mask1" v-show="fileShow"></div>
            <div class="file_box" v-show="fileShow">
                <!-- 头部 -->
                <div class="file_head">
                    <div class="file_title" style="padding-left:10px;">{{uploadTitle}}</div>
                    <div style="padding-right:10px;font-size:25px;cursor:pointer;" @click="closeFile()">×</div>
                </div>
                <!-- 上传删除 -->
                <div class="file_nav">
                    <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
                    <button style="margin-right:3px;">上传</button>
                    <button @click="deleteFile()">删除</button>
                </div>
                <!-- 表格 -->
                <div class="fileTableData">
                    <el-table :data="fileData" style="width: 100%"  @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" align='center'>
                        </el-table-column>
                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
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
                </div>
                <div style="color:#f00;padding:15px 0;position:fixed;bottom:5px;left:5px;">
                ★：附件上传大小限制为102400000 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!
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
                    <el-button type="primary" @click="sureSave()">确 定</el-button>
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
            <!-- 时间差 -->
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
        </div>
        <el-dialog
            title="系统提示"
            :visible.sync="frameShow"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>场地尚未预约成功，无法进行采购文件操作!</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose">确 定</el-button>
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
                <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    import baseUrl from '../../../api/api'
    import dayjs from "dayjs"
    import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkPhone,checkEmail,dubRemove,checkNumber} from '../../../api/base.js'
    export default {
        components:{
           
        },
        data(){
            return {
                str_entrust_type:window.sessionStorage.str_entrust_type,
                biddingPurchasingAgencyName:'',
                role_types:window.localStorage.role_types,
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
                time_difference_box:false,
                documentNumber:'',
                cancelShow:false,
                totalProjectId:'',
                scopeOfTender:'',
                enclosureData:[],
                attachmeId:'',
                num:'',
                uploadTitle:'',
                fileData:[],
                fileShow:false,
                frameShow:false,
                passJudgeShow:true,
                totalProjectId:'',
                entrySubcontractNumber:'',
                electronicBidEvaluation:'',//电子化开评标
                qualificationExaminationMethod:'',//资格审查方式
                subcontractingControlAmount:'',//分包控制金额
                subcontractContents:'',//分包内容
                subcontractName:'',//分包名称
                projectObj:JSON.parse(window.localStorage.projectObj),
                saveBox:false,//保存成功弹框
                submitBox:false,//提交成功弹框
                show:true,
                nextShow:false,
                subcontractInforShow:false,//查看分包信息弹框
                activeName:['1','2','3'],
                activeName1:['1','2','3','4','5'],
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
                depositType:'',
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
                zhuangtai:'',
                bidDocumentId:'',//主键id
                alertMsg:'',// 权限提示内容
                totalProId:'',
            }
        },
        methods:{
            blurDate(){
                let startTime = changeTime(this.saleDate[0]);
                let endtTime = changeTime(this.saleDate[1]);
                let dateStr = Math.floor(Math.abs(startTime - endtTime)/(24 * 3600 * 1000));
                if(dateStr < 5){
                    this.time_difference_box = true;
                }
            },
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
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //招标文件信息查询(公共)
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
                    url:baseUrl+'/BidDocumentController/selectList',
                    data:object
                }).then(res=>{
                    this.getFileList();
                    this.getPhotoList();
                     res.data.data.map((item,index)=>{
                        this.documentNumber = item.documentNumber;
                        this.zhuangtai = item.state;
                        this.bidDocumentId = item.bidDocumentId;
                        this.biddingDocumentsMethod = item.biddingDocumentsMethod;
                    })
                    if(res.data.data.length == 0 || this.zhuangtai == null){
                        if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                            $('.table_box').show();
                        }else{
                            $('.table_box').hide();
                        }
                        this.show = true;
                    }else if(this.zhuangtai == '编辑中' || this.zhuangtai == '办理未通过'){
                        this.nextShow = true;
                        this.show = false;
                        res.data.data.map((item,index)=>{
                            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                                this.projectNum = item.entrySubcontractNumber;
                            }else{
                                this.projectNum = item.projectCode;
                                $('.table_box').hide();
                            }
                            this.saleStartDate =  dayjs(item.saleStartDate).format('YYYY-MM-DD');
                            this.saleEndDate =  dayjs(item.saleEndDate).format('YYYY-MM-DD');
                            this.bidPeriod = item.bidPeriod;
                            if(item.answerTime == null){
                                this.answerTime = ""
                            }else{
                                this.answerTime = dayjs(item.answerTime).format('YYYY-MM-DD HH:mm:ss');
                            }
                            
                            this.bidOpeningMethod = item.bidOpeningMethod;
                            this.depositType = item.depositType;
                            this.depositAmount =item.depositAmount;
                            this.depositReceive = item.depositReceive;
                            this.depositMethod = item.depositMethod;
                        })
                        
                    }else if(this.zhuangtai == '办理通过' || this.zhuangtai == '待办理'){
                        $('.new_nav').hide();
                        this.nextShow = true;
                        this.show = false;
                        res.data.data.map((item,index)=>{
                            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                                this.projectNum = item.entrySubcontractNumber;
                            }else{
                                this.projectNum = item.projectCode;
                                $('.table_box').hide();
                            }
                            this.saleStartDate =  dayjs(item.saleStartDate).format('YYYY-MM-DD');
                            this.saleEndDate =  dayjs(item.saleEndDate).format('YYYY-MM-DD');
                            this.bidPeriod = item.bidPeriod;
                            if(item.answerTime == null){
                                this.answerTime = ""
                            }else{
                                this.answerTime = dayjs(item.answerTime).format('YYYY-MM-DD HH:mm:ss');
                            }
                            
                            this.bidOpeningMethod = item.bidOpeningMethod;
                            this.depositType = item.depositType;
                            this.depositAmount =item.depositAmount;
                            this.depositReceive = item.depositReceive;
                            this.depositMethod = item.depositMethod;
                        })
                    }
                    if(this.depositType == "金额"){
                        $('.yuan').html('元')
                    }else{
                        $('.yuan').html('%')
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //招标项目信息--》表格分包
            getsubList(){
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    //分包
                    this.EntrySubNum = this.projectObj.totalProjectId;
                }else{
                    $('.table_box').hide();
                }
                let lookArr = [];
                lookArr.push(this.EntrySubNum)
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:{
                        projectEntrySubcontractNumbers:lookArr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.enclosureData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //下一步
            nextTo(){
                this.getFileList();
                this.getPhotoList();
                if(this.saleDate.length == 0){
                    this.$layer.msg('请选择采购文件发售时间');
                    return false;
                }else if(!this.bidPeriod){
                    this.$layer.msg('请输入投标有效期');
                    return false;
                }else if(!this.biddingDocumentsMethod){
                    this.$layer.msg('请填入投标文件递交方式');
                    return false;
                }else if(!this.bidOpeningMethod){
                    this.$layer.msg('请选择开标方式');
                    return false;
                }else if(!this.depositType){
                    this.$layer.msg('请选择保证金类型');
                    return false;
                }else if(!this.depositAmount){
                    this.$layer.msg('请填写保证金数量');
                    return false;
                }else if(!this.depositReceive){
                    this.$layer.msg('请填写保证金接收账户');
                    return false;
                }
                this. getmanageInfo();
                let objectData = {};
                // 入场项目(分包)编号
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    // 分包
                    objectData={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:this.answerTime,
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(',')
                    }
                }else{
                    // 总包
                    objectData={
                        projectCode:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:this.answerTime,
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(',')
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/BidDocumentController/insert',
                    data:objectData
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nextShow = true;
                        this.show = false;
                        this.documentNumber = res.data.data.documentNumber;
                        if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                            this.projectNum = res.data.data.entrySubcontractNumber;
                        }else{
                            this.projectNum = res.data.data.projectCode;
                        }
                        if(res.data.data.saleStartDate == null){
                            this.saleStartDate = ""
                        }else{
                            this.saleStartDate =  dayjs(res.data.data.saleStartDate).format('YYYY-MM-DD');
                        };
                        if(res.data.data.saleEndDate == null){
                            this.saleEndDate = ""
                        }else{
                            this.saleEndDate =  dayjs(res.data.data.saleEndDate).format('YYYY-MM-DD');
                        };
                        
                        this.bidPeriod = res.data.data.bidPeriod;
                        if(res.data.data.answerTime == null){
                            this.answerTime == ""
                        }else{
                            this.answerTime = dayjs(res.data.data.answerTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.biddingDocumentsMethod = res.data.data.biddingDocumentsMethod;
                        this.bidOpeningMethod = res.data.data.bidOpeningMethod;
                        this.depositType = res.data.data.depositType;
                        this.depositAmount =res.data.data.depositAmount;
                        this.depositReceive = res.data.data.depositReceive;
                        this.depositMethod = res.data.data.depositMethod;
                        this.bidDocumentId = res.data.data.bidDocumentId;
                        if(this.depositType == "金额"){
                            $('.yuan').html('元')
                        }else{
                            $('.yuan').html('%')
                        }
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //保存
            saveFile(){
                if(this.saleDate.length == 0){
                    this.$layer.msg('请选择采购文件发售时间');
                    return false;
                }else if(!this.bidPeriod){
                    this.$layer.msg('请输入投标有效期');
                    return false;
                }else if(!this.biddingDocumentsMethod){
                    this.$layer.msg('请填入投标文件递交方式');
                    return false;
                }else if(!this.bidOpeningMethod){
                    this.$layer.msg('请选择开标方式');
                    return false;
                }else if(!this.depositType){
                    this.$layer.msg('请选择保证金类型');
                    return false;
                }else if(!this.depositAmount){
                    this.$layer.msg('请填写保证金数量');
                    return false;
                }else if(!this.depositReceive){
                    this.$layer.msg('请填写保证金接收账户');
                    return false;
                }
                let objectData = {};
                // 入场项目(分包)编号
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    // 分包
                    objectData={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:this.answerTime,
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(',')
                    }
                }else{
                    // 总包
                    objectData={
                        projectCode:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:this.answerTime,
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(',')
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/BidDocumentController/insert',
                    data:objectData
                }).then(res=>{
                    if(res.data.status == 200){
                        this.show = true;
                        this.saveBox = true;
                        if(this.depositType == "金额"){
                            $('.yuan').html('元')
                        }else{
                            $('.yuan').html('%')
                        }
                    }else{
                        this.$layer.msg(res.data.msg);
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
                this.time_difference_box = false;
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
                        this.$layer.msg(res.data.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //查看分包信息
            lookFile(row){
                this.subcontractInforShow = true;
                this.getbiddingInfo();
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称 
                this.subcontractContents = row.subcontractContents;// 分包内容
                this.scopeOfTender = row.scopeOfTender;// 招标范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额    
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            },
            closeSubShow(){
                this.subcontractInforShow = false;
            },
            //上一步
            backTo(){
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
                    url:baseUrl+'/BidDocumentController/selectList',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.saleDate = [];
                        this.nextShow = false;
                        this.show = true;
                        if(this.answerTime == null || this.answerTime == ''){
                            this.answerTime = ""
                        }else{
                            this.answerTime = new Date(this.answerTime).getTime();
                        }
                        
                        this.saleStartDate = new Date(this.saleStartDate).getTime();
                        this.saleEndDate = new Date(this.saleEndDate).getTime();
                        this.saleDate.push(this.saleStartDate,this.saleEndDate);
                        if(this.depositMethod == ""){
                            this.methodArr = [];
                        }else{
                            this.methodArr = this.depositMethod.split(',')
                        }
                        if(this.depositType == "金额"){
                            $('.yuan').html('元')
                        }else{
                            $('.yuan').html('%')
                        }
                        
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //提交
            submitFile(){
                if(this.appendixData[0].attachlist == ""){
                    this.$layer.msg('请选择招标(采购)文件附件');
                    return false;
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/BidDocumentController/updateById',
                    data:{
                        state:'待办理',
                        bidDocumentId:this.bidDocumentId,
                        operationFlow:'采购文件'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.submitBox = true;
                        $('.new_nav').hide();
                        this.nextShow = true;
                    }else{
                        this.$layer.msg(res.data.msg);
                        this.submitBox = false;
                    }
                }).catch(err=>{
                    console.log(err)
                })
                
            },
            submitSave(){
                this.submitBox = false;
                this.getmanageInfo();// 办理记录
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
                this.fileShow = true;
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
                        this.$layer.msg(res.data.data.msg)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //上传文件
            loadFile(event){
                if(this.num == 1){
                    if(this.appendixData[0].attachlist.length > 0){
                        this.$layer.msg('招标(采购)文件只能上传一个附件');
                    }else{
                        var file = event.target.files[0];
                        var fileSize = file.size; 
                        if(fileSize > 102400000) {
                            this.$layer.msg('图片大小不能超过102400000KB');
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
                            }else if(res.data.status == 501){
                                this.$layer.msg('文件不完整或文件破坏，请重新上传!');
                            }else{
                                this.$layer.msg(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }else{
                    var file = event.target.files[0];
                    var fileSize = file.size; 
                    if(fileSize > 102400000) {
                        this.$layer.msg('图片大小不能超过102400000KB');
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
                        }else if(res.data.status == 501){
                            this.$layer.msg('文件不完整或文件破坏，请重新上传!');
                        }else{
                            this.$layer.msg(res.data.msg);
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
            handleSelectionChange(val){
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
            closeFile(){
                this.fileShow = false;
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
                                if(item.value == '采购文件'){
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
                                if(item.value == '采购文件'){
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
                                        this.alertMsg = '尚未完成场地预约,无法进行采购文件!'
                                    }
                                }
                            }else{
                                //其他的都不能看
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未完成场地预约,无法进行采购文件!'
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
            //办理记录查询
            async getmanageInfo(){
                await this.getInitInfo();// 初始化查询
                let object = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                    object={
                        itemNumber:this.projectObj.totalProjectId,
                        relatedId:this.bidDocumentId
                    }
                }else{
                    object={
                        itemNumber:this.projectObj.totalProjectId,
                        relatedId:this.bidDocumentId
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
            //分开的附件上传列表
            getFileList(){
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
                         this.$layer.msg(res.data.data.msg)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //图纸上传文件
            getPhotoList(){
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
                         this.$layer.msg(res.data.data.msg)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
        },
        created(){
            this.getDecideList();
            this.getbiddingInfo();
            this.titleExaminationList();
            this.getInitInfo();// 初始化查询
            this.getsubList();
            this. getmanageInfo();
            this.getFileList();
            this.getPhotoList();
        }
    }
</script>

<style scoped>
.pageWrap{
    width: 100%;
    height: 100%;
}
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
.el-collapse{
    width: 90%;
    margin: 10px auto;
}
.contentBox{
    display: flex;
    flex-direction: column;
    padding: 0 30px;
}
.contentBox li{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
}
.contentBox li p{
    color: #333;
}
.contentBox li span{
    color:#6e622e;
}
.contentLast{
    display: flex;
    padding: 0 30px;
    line-height: 30px;
}
.last_box{
    flex: 1;
}
.last_content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.money{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.notic,h6,b{
    color:red;
}
.messageBox{
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
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
.last{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: right;
}
.mask {
  position: fixed;
  width: 100%;
  height: 90%;
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
  z-index: 2;
}
.backTop{
    z-index: 3;
}
.fb_box{
    border:7px solid #b2b2b2;
    /* border-bottom: none; */
    width: 85%;
    height: 90%;
    z-index: 5;
    position: absolute;
    top:7%;
    background:#f0f4f6;
    overflow: hidden;
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
.new_nav{
    background-color: #e2e2e2;
    height: 40px;
}
.nav_co {
  padding: 8px 20px;
  background-color: #0095d5;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.new_main {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  margin-top:20px;
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
.el-radio{
  height: 30px !important;
  line-height: 30px !important;
}
.el-radio:last-child{
  height: 30px !important;
  line-height: 30px !important;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.el-icon-warning{
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
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.el-icon-success{
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
.mask1{
    z-index: 4;
}
.file_box{
    z-index: 8;
}  
.file_box{
  width: 900px;
  height: 416px;
  z-index: 9;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.file_head{
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  background: #0058a9 ;
  color: #ffffff;
}
.file_nav{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin-bottom: 1px;
}
.file_nav>button{
  border: none;
  background: #0095D5;
  color: #ffffff;
  padding:8px 14px;
  font-size: 16px;
  cursor: pointer;
}
.pagination {
  width: 100%;
  margin: 30px 0;
  text-align: right;
  position: fixed;
  right: 0;
  bottom: 10px;
  margin-right: 30px;
  } 
  .choose_box{
  width: 95%;
  height:690px;
  z-index: 11;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  overflow-y: hidden;
  }
  .chooseMain{
    width: 90%;
    margin: 0 auto;
  }
  .upload:hover{
    text-decoration: underline;
    color:#f00;
    cursor: pointer;
  }
  .file_btn{
    position: absolute;
    right: 65px;
    top:35px;
    display: inline-block;
    width: 59px;
    height: 40px;
    border:none;
    outline: none;
    background-color: transparent;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
    background: #0095d5;
    cursor: pointer;
  }
  .pass_pro{
    margin-top:10px;
  }
  .temLi{
    cursor: pointer;
  }
  .temLi:hover{
    color: #f00;
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
.liItem{
    cursor: pointer;
}
.liItem:hover{
	color: #f00;
}
</style>