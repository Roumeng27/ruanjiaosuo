<template>
    <!-- 业主专家 -->
    <div class="newBox">
        <div class="backlogWrapper">
            <div class="backlogBox">
                 <div class="pageTitle">
                    <p>查看{{businessLinks}}</p>
                    <i class="el-icon-close" @click="closePage"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="agreeInfo">同意</button>
                    <button class="btn" @click="disAgree">不同意</button>
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
                                    <div class="editCenter">
                                        <div class="editName">招标项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectNumber}} </div>
                                    </div>
                                </div>
                                <!-- 表格 -->
                                <div  v-if="this.entrySubcontractNumber !=null">
                                    <el-table :data="subpackageInfo" stripe style="width: 100%">
                                        <el-table-column
                                            label="序号">
                                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                        </el-table-column>
                                        <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractName"  label="分包名称">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="cursor:pointer;" @click="lookItem(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="相关附件" name="2">
                            <div class="edit_list">
                                <el-table :data="enclosureData" stripe style="width: 100%">
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
                            </div>
                        </el-collapse-item>
                        <!-- 业主专家 -->
                        <el-collapse-item title="业主专家" name="3">
                            <div class="edit_list">
                                <el-table :data="ownerData" stripe style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column  prop="expertName"  label="姓名" >
                                    </el-table-column>
                                    <el-table-column  prop="company"  label="工作单位">
                                    </el-table-column>
                                    <el-table-column  prop="certified"  label="职称/执业资格">
                                    </el-table-column>
                                    <el-table-column  prop="specialty"  label="从事专业">
                                    </el-table-column>
                                    <el-table-column  prop="committeeJob"  label="评标委员会担任工作" width="150">
                                    </el-table-column>
                                    <el-table-column  prop="expertType"  label="专家类型" >
                                    </el-table-column>
                                    <el-table-column prop="operation" label="查看" width="70">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search" style="cursor:pointer;" @click="ownerFile(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 备注说明 -->
                        <el-collapse-item title="备注说明" name="4">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注说明：</div>
                                        <div class="editContent">{{remark}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="5">
                            <div class="edit_list">
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
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
                <div class="lookTitle">
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
                                    <div class="editCenter" v-if="biddingOrganization == '委托招标'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectNumber}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--分包信息 -->
                        <el-collapse-item title="分包信息" name="2">
                            <div class="edit_list">
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
        <div class="lookWrapper" v-show="lookOwnerShow">
            <div class="lookBox">
                <div class="lookTitle">
                    <p>查看业主专家</p>
                    <i class="el-icon-close" @click="closeOwner"></i>
                </div>
                <div class="main_info">
                     <el-collapse v-model="activeName" accordion>
                        <!-- 业主专家信息 -->
                        <el-collapse-item title="业主专家信息" name="1">
                            <div class="edit_list">
                                    <!--专家姓名及性别  -->
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">专家姓名：</div>
                                            <div class="editContent">{{expertName}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">性别：</div>
                                            <div class="editContent">{{sex}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">年龄：</div>
                                            <div class="editContent" >{{age}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">学历：</div>
                                            <div class="editContent">{{education}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">身份证号：</div>
                                            <div class="editContent">{{idNumber}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">职务：</div>
                                            <div class="editContent">{{position}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">业主专家来源：</div>
                                            <div class="editContent">{{expertSource}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">工作单位：</div>
                                            <div class="editContent">{{company}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">专家手机：</div>
                                            <div class="editContent">{{phone}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">职称/执业资格：</div>
                                            <div class="editContent">{{phone}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">专家类型：</div>
                                            <div class="editContent">{{expertType}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评标委员会担任工作：</div>
                                            <div class="editContent">{{committeeJob}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">从事专业：</div>
                                            <div class="editContent">{{specialty}}</div>
                                        </div>
                                    </div>
                                </div>
                        </el-collapse-item>
                     </el-collapse>
                </div>
            </div>
        </div>
        <el-dialog title="请输入意见" :visible.sync="agreeFlag" width="50%" :before-close="agreeSure">
            <div class="box">
                <button class="btn" @click="agreeSubmit">确认提交</button>
                <button class="btn" @click="agreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="remarks" :rows="6" ></el-input>
            </div>
        </el-dialog>
        <el-dialog title="请输入意见" :visible.sync="disAgreeFlag" width="50%" :before-close="disAgreeSure">
            <div class="box">
                <button class="btn" @click="disAgreeBack">确认退回</button>
                <button class="btn" @click="disAgreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="remarks" :rows="6" ></el-input>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import baseUrl from '../../api/api'
    import dayjs from "dayjs"
    import '../../assets/css/style.css'
    export default {
        data(){
            return {
                biddingOrganization:'',
                biddingPurchasingAgencyName:'',
                waitCase:JSON.parse(window.localStorage.waitCase),
                activeName:['1','2','3','4','5','6'],
                // 文件查询
                fileData:[],
                enclosureData:[
                    {
                        id:1,
                        appendixName: "招标人评委相关证明",
                        attachlist: []
                    }
                ],
                // 弹窗所需字段
                agreeFlag:false,// 同意
                disAgreeFlag:false,// 不同意
                remarks:'',// 备注
                // 办理记录所需字段
                manageDate:[],
                creationTime:'',// 时间
                // 路由接收参数
                referenceId:'',// 关联ID
                toDoListId:'',// 待办事项id
                auditStatus:'',// 审核状态
                businessLinks:'',// 待办名称
                totalItemId:'',// 总包keyID
                entrySubcontractNumber:'',// 入场项目项目分包编号
                totalProjectNumber:'',// 总包编号
                subItemId:'',// 分包keyID
                 // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                tenderPurchaserName:'',// 招标(采购)人
                budgetAmount:'',// 招标项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                typesOfBiddingProjects:'',// 招标项目类型
                // 分包信息
                subpackageInfo:[],
                lookFlag:false,// 查看分包详情弹窗
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'是',// 是否电子招投标
                // 招标文件所需字段
                documentNumber:'',// 文件编号
                saleStartDate:'',// 招标文件发售开始时间
                saleEndDate:'',// 招标文件发售结束时间
                answerTime:'',//答疑澄清时间
                biddingDocumentsMethod:'',// 投标文件递交方式
                bidOpeningMethod:'',//开标方式
                depositAmount:'',//保证金金额
                depositReceive:'',//保证金接收账户
                depositMethod:'',// 保证金允许递交方式
                bidPeriod:'',// 投标有效期天数
                // 业主专家所需字段
                ownerData:[],
                expertName:'',//专家姓名
                sex:'',//性别
                age:'',//年龄
                education:'',//学历
                idNumber:'',//身份证号
                position:'',//职务
                expertSource:'',//业主专家来源
                company:'',//工作单位
                phone:'',//手机号
                certified:'',//执业资格
                expertType:'',//专家类型
                committeeJob:'',//担任工作
                specialty:'',//从事专业
                lookOwnerShow:false,// 查看业主专家详情
                remark:'',// 备注
            }
        },
        created(){
            this.referenceId = this.waitCase.referenceId;// 关联ID
            this.toDoListId = this.waitCase.toDoListId;// 待办事项id
            this.auditStatus = this.waitCase.auditStatus;// 审核状态
            this.businessLinks = this.waitCase.businessLinks;// 待办名称
            this.totalItemId = this.waitCase.totalItemId;// 总包的keyid
            this.entrySubcontractNumber= this.waitCase.entrySubcontractNumber;// 分包编号
            this.totalProjectNumber= this.waitCase.totalProjectNumber;// 总包编号
            this.subItemId= this.waitCase.subItemId;// 分包的keyid
            this.biddingOrganization = this.waitCase.biddingOrganization;
            this.getpageInfo();// 通过关联ID查询入场项目编号
            this.getbiddingInfo();// 招标项目信息
            this.getmanageInfo();// 办理记录
            this.uploadList();// 招标人评委相关证明附件
            if(this.entrySubcontractNumber !=null){
                this.getsubData();// 分包信息
            }
        },
        methods: {
            // 返回到待办页面
            closePage(){
                this.$router.push({ name:'NotHandled'})
                this.$parent.getHandleList();
            },
            // 同意
            agreeInfo(){
                this.agreeFlag = true;
                
            },
            // 确认提交
            agreeSubmit(){
                let object = {
                    expertsMainId:this.referenceId,
                    answer:'同意',
                    type:'业主专家'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/ownerExpertsController/approval',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$axios({
                            method: "POST",
                            url: baseUrl+"/toDoListController/update",
                            data:{
                                toDoListId: this.toDoListId,
                                auditStatus: "办理通过",
                                state: "已办理",
                                remarks: this.remarks
                            }
                        }).then(res=>{
                            if(res.data.status == 200){
                                this.$router.push({ name:'NotHandled'})
                                this.$parent.getHandleList();
                            }else{
                                this.$layer.msg(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                })
                
            },
            // 同意的确定按钮
            agreeSure(){
                this.agreeFlag = false;
            },
            // 不同意
            disAgree(){
                this.disAgreeFlag = true;
                
            },
            // 确定退回
            disAgreeBack(){
                let object = {
                    expertsMainId:this.referenceId,
                    answer:'不同意',
                    type:'业主专家'
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/ownerExpertsController/approval',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$axios({
                            method: "POST",
                            url: baseUrl+"/toDoListController/update",
                            data:{
                                toDoListId: this.toDoListId,
                                auditStatus: "办理未通过",
                                state: "已办理",
                                remarks: this.remarks
                            }
                        }).then(res=>{
                            if(res.data.status == 200){
                            this.$router.push({ name:'NotHandled'})
                                this.$parent.getHandleList();
                            }else{
                                this.$layer.msg(res.data.msg);
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                })
                
            },
            // 不同意的关闭按钮
            disAgreeSure(){
                this.disAgreeFlag = false;
            },
            // 通过关联ID查询入场项目编号
            getpageInfo(){
                this.$axios({
                    method:'GET',
                    url:baseUrl+"/ownerExpertsController/selectExpertsInfor/"+this.referenceId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.remark = res.data.data.remark;// 备注
                        this.ownerData = res.data.data.listExperts;// 业主专家数据
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                })
            },
            // 招标项目信息
            getbiddingInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+this.totalItemId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                })
            },
            // 分包信息
            getsubData(){
                let object = {};
                if(this.entrySubcontractNumber != null){
                    object = {
                        projectEntrySubcontractNumbers:[this.entrySubcontractNumber]
                    }
                }else{
                    object = {
                        projectEntrySubcontractNumbers:[this.totalProjectNumber]
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.subpackageInfo = res.data.data;// 项目分包列表
                        if(this.subpackageInfo.length>0){
                            this.subpackageInfo.forEach(item=>{
                                item.saveTime = dayjs(item.saveTime).format('YYYY-MM-DD');
                            })
                        }
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 查看分包
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
            closeLook(){
                this.lookFlag =false;
            },
            // 查看专家信息
            ownerFile(row){
                this.lookOwnerShow = true;
                this.expertName = row.expertName;
                this.sex = row.sex;
                this.age = row.age;
                this.education = row.education;
                this.idNumber = row.idNumber;
                this.position = row.position;
                this.expertSource = row.expertSource;
                this.company = row.company;
                this.phone = row.phone;
                this.certified = row.certified;
                this.expertType = row.expertType;
                this.committeeJob = row.committeeJob;
                this.specialty = row.specialty;
            },
            closeOwner(){
                this.lookOwnerShow = false;
            },
            // 招标人评委相关证明附件
            uploadList(){
                let object={}
                if(this.entrySubcontractNumber!=null){
                    // 分包
                    object={
                        relevanceCorrelationId:this.subItemId,
                        fileType:'招标人评委相关证明'
                    }
                }else{
                    //  总包
                    object ={
                        relevanceCorrelationId:this.totalItemId,
                        fileType:'招标人评委相关证明'
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
            downLoadupFile(item){
                this.downloadFile(item.attachmeId,item.fileName);
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
            // 办理记录
            getmanageInfo(){
                let object = {};
                if(this.entrySubcontractNumber!=null){
                    object={
                        itemNumber:this.entrySubcontractNumber,
                        relatedId:this.referenceId
                    }
                }else{
                    object={
                        itemNumber:this.totalProjectNumber,
                        relatedId:this.referenceId
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
        },
    }
</script>

<style scoped>
.newBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.backlogWrapper{
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
.backlogBox,.lookBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.pageTitle,.lookTitle{
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
.box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
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
.main_info{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.el-collapse{
    width: 80%;
    margin: 10px auto;
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
.contentBox{
	flex: 1;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	flex-wrap: wrap;
}
.contentArea{
	width: 100%;
	display: flex;
	margin-bottom: 10px;
}
.contentItem{
	flex:1;
	display: flex;
	align-items: center;
}
.contentItem>span{
	display: flex;
	width: 32%;
	justify-content: flex-end;
}
.contentItem>p{
	width: 10%;
	padding: 0 5px;
}
.notic{
    color: #f00;
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