<template>
    <div class="newBox" style="overflow-y:hidden;height:100%;">
        <!-- 采购答疑通知 -->
        <div  v-show="passJudgeShow" style="overflow-y:hidden;height:100%;">
            <!-- 上一步 -->
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
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
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
                                <!-- 表格 -->
                                <div class="table_box"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                    <!-- <div class="item_title">若需添加多分包，请点击 <i class="el-icon-plus" style="cursor:pointer;" @click="searchSubpackage"></i> 按钮</div> -->
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
                                            label="删除">
                                            <template slot-scope="scope">
                                                <i class="el-icon-close"  style="cursor: pointer;"  @click="deleteItem(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
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
                                <el-table-column fixed="right" label="操作" width="100" v-if="this.stateItem !='办理通过' && this.stateItem !='待办理'">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 通知内容 -->
                        <el-collapse-item title="通知内容" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">答疑时间：</div>
                                        <div class="editContent">
                                            <el-date-picker :picker-options="pickerOptions0" value-format="timestamp"  v-model="answerTime" type="datetime" placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">答疑集合地点：</div>
                                        <div class="editContent">
                                            <el-input v-model="questionAnsweringPlace"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">联系人：</div>
                                        <div class="editContent">
                                            <el-input v-model="contacts"></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">
                                            <el-input v-model="contactInformation"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">其他：</div>
                                        <div class="editContent">
                                            <el-input v-model="other"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 下一步 -->
            <div class="wrapper" v-show="nextFlag" style="overflow-y:hidden;height:100%;">
                <div class="box box_nav">
                    <button class="btn" @click="backTo()">上一步</button>
                    <button class="btn" @click="submitFile()">提交</button>
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
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
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
                                <!-- 表格 -->
                                <div class="table_box"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
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
                                    </el-table>
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
                            </el-table>
                        </el-collapse-item>
                        <!-- 通知内容 -->
                        <el-collapse-item title="通知内容" name="3">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">答疑时间：</div>
                                        <div class="editContent">
                                            <span>{{answerTime}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">答疑集合地点：</div>
                                        <div class="editContent">
                                            <span>{{questionAnsweringPlace}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">联系人：</div>
                                        <div class="editContent">
                                            <span>{{contacts}}</span>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系方式：</div>
                                        <div class="editContent">
                                            <span>{{contactInformation}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">其他：</div>
                                        <div class="editContent">
                                            <span>{{other}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
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
                                :show-overflow-tooltip ="true"
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip ="true"
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
                                label="采购方式" :show-overflow-tooltip ="true">
                                <template slot-scope="scope">{{ biddingProcurementMode }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="subcontractingControlAmount"
                                :show-overflow-tooltip ="true"
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
            <!-- 查看分包信息 -->
            <div class="lookWrapper" v-show="lookFlag">
                <div class="lookBox">
                    <div class="look_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" style="cursor:pointer;" @click="closeLook"></i>
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
                                            <div class="editContent">{{tenderPurchaserName}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">采购项目预算金额：</div>
                                            <div class="editContent">{{budgetAmount}}万元</div>
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
                                    <div class="editItem" v-if="role_types == '招标(采购)代理'  || str_entrust_type != '委托角色'">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)代理机构：</div>
                                            <div class="editContent">{{biddingPurchasingAgencyName}} </div>
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
                                            <div class="editContent">{{subcontractingControlAmount}} 万元 </div>
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
            <!-- 上传文件 -->
            <div class="uploadWrapper" v-show="uploadFlag">
                <div class="uploadBox">
                    <div class="upload_title">
                        <p>答疑通知</p>
                        <i class="el-icon-close" @click="closeUpload"></i>
                    </div>
                    <div class="upload_btn">
                        <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
                        <button class="btn">上传</button>
                        <button class="btn" @click="deleteFile()">删除</button>
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
                    <span>提交成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureSubmitInfo()">确 定</el-button>
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
                <el-button type="primary" @click="handleClose()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkPhone,checkEmail,dubRemove,checkNumber} from '../../../api/base.js'
export default {
  components:{},
  props:{},
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
        amountId:'',
        multipleSelection:[],//+方框
        projectObj:JSON.parse(window.localStorage.projectObj),
        saveBox:false,//保存弹框
        sureSubmitBox:false,//提交弹框
        frameShow:false,
        alertMsg:'',
        stateItem:'',//状态
        activeName:['1','2','3'],
        passJudgeShow:true,
        writeFlag:true,
        nextFlag:false,
        uploadFlag:false,
        fileData:[],//上传数据
        nameOfTenderProject:'',//招标项目名称
        tenderPurchaserName:'',//采购人
        budgetAmount:'',//预算金额
        biddingProjectNumber:'',//招标项目编号
        totalProjectId:'',//入场项目编号
        subpackageData:[],//分包表格
        enclosureData:[{
            appendixName: "答疑通知",
            attachlist: []
        }],//f附件表格
        questionAnsweringPlace:'',//集合地点
        answerTime:'',//时间
        contacts:'',//联系人
        contactInformation:'',//联系人方式
        other:'',//其他
        searchFlag:false,//分包+号
        markData:[],//分包+数据
        biddingProcurementMode:'',//招标方式
        lookFlag:false,//查看分包信息
        entrySubcontractNumber:'',//入场项目分包编号
        subcontractName:'',//分包名称
        tenderPurchaserName:'',//分包内容
        subcontractContents:'',//招标范围
        subcontractingControlAmount:"",//分包控制金额
        qualificationExaminationMethod:'',//z资格审查方式
        electronicBidEvaluation:'',//是否电子开评标
        answerNoticeId:'',
        scopeOfTender:'',
    }
  },
  watch:{},
  computed:{},
  methods:{
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
                    
                    this.budgetAmount = res.data.data.budgetAmount;// 采购项目预算金额 
                    this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                    this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
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
        // 分包表格查询
        getsubpackageInfo(){
            let lookArr = [];
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                this.EntrySubNum = this.projectObj.totalProjectId;
                lookArr.push(this.EntrySubNum);
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
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })  
                                                        
        },
        //初始化查询
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
                url: baseUrl+"/answerNoticeController/selectListByCode",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.stateItem = res.data.data[0].state;
                    this.answerNoticeId = res.data.data[0].answerNoticeId;
                     if(res.data.data.length<=0 || this.stateItem == null){
                        this.writeFlag = true;// 有保存和下一步的按钮
                        this.nextFlag = false;
                        res.data.data.map((item,index)=>{
                            this.answerTime = item.answerTime
                        })
                    }else if(this.stateItem == '待办理' || this.stateItem == '办理通过'){
                        this.writeFlag = false;// 有保存和下一步的按钮
                        this.nextFlag = true;
                        $('.box_nav').hide();
                        res.data.data.map((item,index)=>{
                            if(item.answerTime == null){
                                this.answerTime = ""
                            }else{
                                this.answerTime = dayjs(item.answerTime).format('YYYY-MM-DD HH:mm:ss');
                            }
                            
                        })
                    }else if(this.stateItem == '编辑中' || this.stateItem == '办理未通过'){
                        this.writeFlag = false;// 有保存和下一步的按钮
                        this.nextFlag = true;
                        $('.box_nav').show();
                        res.data.data.map((item,index)=>{
                            if(item.answerTime == null){
                                this.answerTime = ""
                            }else{
                                this.answerTime = dayjs(item.answerTime).format('YYYY-MM-DD HH:mm:ss');
                            }
                        })
                    }
                    res.data.data.map((item,index)=>{
                        this.questionAnsweringPlace = item.questionAnsweringPlace;
                        this.contacts = item.contacts;
                        this.contactInformation = item.contactInformation;
                        this.other = item.other;
                    })
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //下一步
        newly(num){
            if(this.contactInformation != '' && this.contactInformation != null && !isPoneAvailable(this.contactInformation) && !checkPhone(this.contactInformation)){
                this.$message.warning('请输入正确的联系方式！');
                return false; 
            }
            if(num == 1){
                this.saveBiddingInfo(1);
                this.writeFlag = true;// 有保存和下一步的按钮
                this.nextFlag = false;
            }else{
                this.writeFlag = false;// 有保存和下一步的按钮
                this.nextFlag = true;
                this.saveBiddingInfo(2);
            }
        },
        saveBiddingInfo(num){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    answerTime:this.answerTime,
                    questionAnsweringPlace:this.questionAnsweringPlace,
                    contacts:this.contacts,
                    contactInformation:this.contactInformation,
                    other:this.other
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    answerTime:this.answerTime,
                    questionAnsweringPlace:this.questionAnsweringPlace,
                    contacts:this.contacts,
                    contactInformation:this.contactInformation,
                    other:this.other
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/answerNoticeController/saveOrUpdate",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                        if(res.data.data.answerTime == null){
                            this.answerTime = ""
                        }else{
                            this.answerTime = dayjs(res.data.data.answerTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                    }
                    this.answerNoticeId = res.data.data.answerNoticeId;
                    this.questionAnsweringPlace = res.data.data.questionAnsweringPlace;
                    this.contacts = res.data.data.contacts;
                    this.contactInformation = res.data.data.contactInformation;
                    this.other = res.data.data.other;
                    
                    
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(res=>{
                this.$message.warning(res.data.msg)
            })
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
                method: "POST",
                url: baseUrl+"/answerNoticeController/selectListByCode",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.answerTime = new Date(this.answerTime).getTime();
                    this.writeFlag = true;
                    this.nextFlag = false;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //提交
        submitFile(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/answerNoticeController/submit",
                data:{
                    answerNoticeId:this.answerNoticeId,
                    operationFlow:'答疑通知',
                    state:'待办理'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.sureSubmitBox = true;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        sureSubmitInfo(){
            this.nextFlag = true;
            this.writeFlag = false;
            this.sureSubmitBox = false;
            $('.box_nav').hide();
        },
        //查看分包表格
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
        //删除分包表格
        deleteItem(row){
            if(row.entrySubcontractNumber == this.projectObj.totalProjectId){
                this.$message.warning('不可删除当前项目分包编号')
                return false;
            }else{
                for (let i = 0; i < this.subpackageData.length; i++) {
                    let item = this.subpackageData[i];
                    if(row.subcontractItePrimaryKeyId == item.subcontractItePrimaryKeyId){
                        this.subpackageData.splice(i,1);
                    }
                }
            }
        },
        //点击+号添加分包
        searchSubpackage(){
            this.searchFlag = true;
            this.getsubInfo();// 分包信息弹窗列表数据
        },
        // +分包信息
        getsubInfo(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/tenderNoticeController/subcontract",
                data:{
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    qualificationExaminationMethod:'资格后审',
                    noticeType:'招标公告'
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
        //分包+方框
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        //确定选择按钮
        sureChoice(){
            let arr =[...this.subpackageData,...this.multipleSelection];
            this.subpackageData = this.removeData(arr,'entrySubcontractNumber');
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
        // 办理记录
        getmanageInfo(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.answerNoticeId
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.answerNoticeId
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
                        let anwTime = new Date(this.answerTime).getTime();
                        let newTime = new Date().getTime();
                        if(anwTime - newTime > 0){
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
                            if(item.value == '答疑通知'){
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
                                    this.alertMsg = '尚未完成采购文件,无法进行答疑通知!'
                                }
                            }
                        }else{
                            //其他的都不能看
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成采购文件,无法进行答疑通知!'
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
        async getData(){
            await this.getInitInfo();
            this.getmanageInfo();
            this.getDecideList();
        },
        //打开上传文件弹框
        goUploadPage(row){
            this.uploadFlag = true;
            this.uploadList();
        },
        //上传列表
        uploadList(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                object={
                    relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                    fileType:'答疑通知'
                }
            }else{
                object={
                    relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                    fileType:'答疑通知'
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
                formData.append("fileType", '答疑通知');
            }else{
                // 总包
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", '答疑通知');
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
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName)
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
        //关闭分包+
        closeSearch(){
            this.searchFlag = false;
        },
        closeLook(){
            this.lookFlag = false;
        },
        closeUpload(){
            this.uploadFlag = false;
        },
        handleClose(){
            this.saveBox = false;
            this.sureSubmitBox = false;
            this.frameShow = false;
        }
  },
  created(){
      this.getbiddingInfo();//项目信息
      this.getsubpackageInfo();//分包数据信息
      this.uploadList();//上传列表
      this.getData();
  },
  mounted(){}
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