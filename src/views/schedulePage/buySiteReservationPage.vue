<template>
    <!-- 场地预约 -->
    <div class="newBox">
        <div class="backlogWrapper">
            <div class="backlogBox">
                 <div class="pageTitle">
                    <p>查看{{businessLinks}}</p>
                    <i class="el-icon-close" @click="closePage"></i>
                </div>
                <div class="box" v-show="initBtn">
                    <button class="btn" @click="agreeInfo">同意</button>
                    <button class="btn" @click="disAgree">不同意</button>
                </div>
                <div class="box" v-show="sureBtn">
                    <button class="btn" @click="sureBidRoom">确定评标室</button>
                </div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 采购项目信息 -->
                        <el-collapse-item title="采购项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购项目名称：</div>
                                        <div class="editContent" >{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectNumber}}</div>
                                    </div>
                                </div>
                                <div class="editItem" v-if="this.entrySubcontractNumber != null">
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
                                                <i class="el-icon-search" style="font-size:16px;cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 场地预约 -->
                        <el-collapse-item title="场地预约" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)项目名称：</div>
                                        <div class="editContent">
                                            <el-input v-model="nameOfTenderProject" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>开标时间：</div>
                                        <div class="editContent">
                                            <el-date-picker :picker-options="pickerOptions0" value-format="timestamp" v-model="assessmentTime" type="datetime"  placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">开标时长：</div>
                                        <div class="editContent">
                                            <el-select v-model="estimatedReviewDuration" placeholder="请选择">
                                                <el-option :value="0.5" :label="0.5">0.5</el-option>
                                                <el-option :value="1" :label="1">1</el-option>
                                                <el-option :value="1.5" :label="1.5">1.5</el-option>
                                                <el-option :value="2" :label="2">2</el-option>
                                                <el-option :value="2.5" :label="2.5">2.5</el-option>
                                                <el-option :value="3" :label="3">3</el-option>
                                                <el-option :value="3.5" :label="3.5">3.5</el-option>
                                                <el-option :value="4" :label="4">4</el-option>
                                                <el-option :value="4.5" :label="4.5">4.5</el-option>
                                                <el-option :value="5" :label="5">5</el-option>
                                                <el-option :value="5.5" :label="5.5">5.5</el-option>
                                                <el-option :value="6" :label="6">6</el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>开标室(请选择)：</div>
                                        <div class="editContent">
                                            <el-select v-model="openingRoom" placeholder="请选择">
                                                <el-option v-for="item in optionRoom" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="editCenter"></div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"></div>
                                        <div class="editContent">
                                            注：实际开评标场地以交易中心现场大屏幕显示为准
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">是否预约评标室：</div>
                                        <div class="editContent">{{appointmentEvaluationRoom}}</div>
                                    </div>
                                </div>
                                <div class="editItem"  v-show="isFlag">
                                    <div class="editCenter">
                                        <div class="editName">配套服务：</div>
                                        <div class="editContent">{{supportingServices}}</div>
                                    </div>
                                </div>
                                <!-- 评标地点 -->
                                <div class="editItem" v-show="placeFlag">
                                    <div class="editCenter">
                                        <div class="editName">评标地点：</div>
                                        <div class="editContent">
                                            <span>{{bidEvaluationSite}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="sureBtn">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>评标时间：</div>
                                            <div class="editContent">
                                                <el-date-picker value-format="timestamp" :picker-options="pickerOptions0" v-model="bidEvaluationTime" type="datetime"  placeholder="选择日期时间">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评标时长：</div>
                                            <div class="editContent">
                                                <el-select v-model="lengthOfTenderEvaluation" placeholder="请选择">
                                                    <el-option :value="0.5" :label="0.5">0.5</el-option>
                                                    <el-option :value="1" :label="1">1</el-option>
                                                    <el-option :value="2" :label="2">2</el-option>
                                                    <el-option :value="3" :label="3">3</el-option>
                                                    <el-option :value="4" :label="4">4</el-option>
                                                    <el-option :value="5" :label="5">5</el-option>
                                                    <el-option :value="6" :label="6">6</el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><p class="star">*</p>评标室(请选择)：</div>
                                            <div class="editContent">
                                                <el-select v-model="bidEvaluationRoom" placeholder="请选择">
                                                    <el-option v-for="item in bidRoom" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                        <div class="editCenter"></div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="办理记录" name="3">
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
                        <el-collapse-item title="采购项目信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)项目名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}} </div>
                                    </div>
                                    <div class="editCenter" v-if="biddingOrganization == '委托招标'">
                                        <div class="editName">招标(采购)代理机构：</div>
                                        <div class="editContent">{{biddingPurchasingAgencyName}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectNumber}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="分包信息" name="2">
                            <div class="edit_list">
                                <!-- <div class="editItem">
                                    <div class="editCenter" style="color:red;">
                                        <div class="editName">标段包编号(赋码)：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter" style="color:red;">
                                        <div class="editName">统一交易标志码：</div>
                                        <div class="editContent">{{}} </div>
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
        <el-dialog title="请输入意见" :visible.sync="agreeFlag" width="50%" :before-close="agreeSure">
            <div class="box">
                <button class="btn" @click="agreeSubmit">确认提交</button>
                <button class="btn" @click="agreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="infoRemark" :rows="6" ></el-input>
            </div>
        </el-dialog>
        <el-dialog title="请输入意见" :visible.sync="successFlag" width="50%" :before-close="successSure">
            <div class="box">
                <button class="btn" @click="successSubmit">确认</button>
                <button class="btn" @click="successSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="infoRemark" :rows="6" ></el-input>
            </div>
        </el-dialog>
        <el-dialog title="请输入意见" :visible.sync="disAgreeFlag" width="50%" :before-close="disAgreeSure">
            <div class="box">
                <button class="btn" @click="disAgreeBack">确认退回</button>
                <button class="btn" @click="disAgreeSure">取消</button>
            </div>
            <div class="icon" style="height:150px !important;margin-top:5px;">
                <el-input type="textarea" v-model="infoRemark" :rows="6" ></el-input>
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
                pickerOptions0: {
                    disabledDate: (time) => {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                bidEvaluationSite:'',//评标地点
                activeName:['1','2','3','4','5','6'],
                // 文件查询
                fileData:[],
                // 弹窗所需字段
                agreeFlag:false,// 同意
                disAgreeFlag:false,// 不同意
                successFlag:false,// 确定评标室
                infoRemark:'',// 备注
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
                theme:'',// 信息
                titleTheme:'',// 
                 // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                tenderPurchaserName:'',// 招标(采购)人
                budgetAmount:'',// 招标项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',// 招标采购方式
                // 分包信息
                lookFlag:false,// 查看分包详情弹窗
                subpackageInfo:[],
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'是',// 是否电子招投标
                // 场地预约所需字段
                lengthOfTenderEvaluation:'',// 评标时长
                bidEvaluationTime:'',//评标时间
                bidEvaluationRoom:'',//评标室
                itemsList:[],//后端返回的分包列表
                bidRoom:[{
                    value:'第一开标室',
                    label:'第一开标室'
                },
                {
                    value:'第二开标室',
                    label:'第二开标室'
                },
                {
                    value:'第三开标室',
                    label:'第三开标室'
                },
                {
                    value:'第四开标室',
                    label:'第四开标室'
                },
                {
                    value:'第一评标室',
                    label:'第一评标室'
                },
                {
                    value:'第二评标室',
                    label:'第二评标室'
                },
                {
                    value:'第三评标室',
                    label:'第三评标室'
                },
                {
                    value:'第四评标室',
                    label:'第四评标室'
                }],// 评标室列表
                appointmentEvaluationRoom:'',//是否预约评标室
                supportingServices:'',//配套服务
                 assessmentTime:'',//开标时间
                estimatedReviewDuration:'',//开标时长
                optionRoom:[{
                    value:'第一开标室',
                    label:'第一开标室'
                },
                {
                    value:'第二开标室',
                    label:'第二开标室'
                },
                {
                    value:'第三开标室',
                    label:'第三开标室'
                },
                {
                    value:'第四开标室',
                    label:'第四开标室'
                }],//开标室数据
                openingRoom:'',//开标室选择
                initBtn:true,// 控制同意和不同意展示隐藏
                sureBtn:false,// 确定评标室展示隐藏
                isFlag:false,// 配置服务展示隐藏
                placeFlag:false,// 评标地点展示隐藏
            }
        },
        created(){
            this.biddingOrganization = this.waitCase.biddingOrganization;//招标组织方式
            this.referenceId = this.waitCase.referenceId;// 关联ID
            this.toDoListId = this.waitCase.toDoListId;// 待办事项id
            this.auditStatus = this.waitCase.auditStatus;// 审核状态
            this.businessLinks = this.waitCase.businessLinks;// 待办名称
            this.totalItemId = this.waitCase.totalItemId;// 总包的keyid
            this.entrySubcontractNumber= this.waitCase.entrySubcontractNumber;// 分包编号
            this.totalProjectNumber= this.waitCase.totalProjectNumber;// 总包编号
            this.subItemId= this.waitCase.subItemId;// 分包的keyid
            this.theme = this.waitCase.theme;// 信息
            this.assessmentTime = '';// 开标时间
            this.estimatedReviewDuration = '';// 开标时长
            this.openingRoom = '';// 开标室
            let str = '';
            str = this.theme.replace(/\【|】/g,'');
            this.titleTheme = str.split('：')[0];
            this.getpageInfo();// 通过关联ID查询入场项目编号
            if(this.titleTheme == '交易中心评审室办理资审场地预约' ||this.titleTheme == '交易中心评标室办理场地预约' ){
                this.sureBtn = true;
                this.initBtn = false;
            }else{
                this.sureBtn = false;
                this.initBtn = true;
            }
            this.getmanageInfo();// 办理记录
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
                let object = {};
                if(this.businessLinks == "资审场地预约"){
                    if(this.titleTheme == "交易中心办理资审场地预约"){
                        object = {
                            siteReservationId: this.referenceId,
                            state: "场地预约待办理",
                        }
                    }else{
                        object = {
                            siteReservationId: this.referenceId,
                            state: "办理通过",
                            bidEvaluationRoom: this.bidEvaluationRoom 
                        }
                    }   
                }else if(this.businessLinks == "场地预约"){
                    if(this.titleTheme == "交易中心办理场地预约"){
                        object = {
                            siteReservationId: this.referenceId,
                            state: "场地预约待办理",
                        }
                    }else{
                        object = {
                            siteReservationId: this.referenceId,
                            state: "办理通过",
                            bidEvaluationRoom: this.bidEvaluationRoom
                        }
                    }
                }
                if(this.assessmentTime == ''){
                    this.$layer.msg('请选择开标时间');
                    return false;
                }else if(this.openingRoom == ''){
                    this.$layer.msg('请选择开标室');
                    return false;
                }else{
                    this.$axios({
                        method:"POST",
                        url:baseUrl + '/siteReservationController/submit',
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
                                    remarks: this.infoRemark
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
                }
                
            },
            // 同意的确定按钮
            agreeSure(){
                this.agreeFlag = false;
            },
            sureBidRoom(){
                this.successFlag = true;
            },
            // 确定评标室
            successSubmit(){
                let object = {};
                if(!this.assessmentTime){
                    this.$layer.msg('请选择开标时间');
                    return false;
                }else if(!this.openingRoom){
                    this.$layer.msg('请选择开标室');
                    return false;
                }else if(!this.bidEvaluationTime){
                    this.$layer.msg('请选择评标时间');
                    return false;
                }else if(!this.bidEvaluationRoom){
                    this.$layer.msg('请选择评标室');
                    return false;
                }else{
                    if(this.titleTheme == "交易中心评审室办理资审场地预约"){
                        object = {
                            siteReservationId: this.referenceId,
                            state: "办理通过",
                            bidEvaluationRoom: this.bidEvaluationRoom
                        }
                    }else if(this.titleTheme == "交易中心评标室办理场地预约"){
                        object = {
                            siteReservationId: this.referenceId,
                            state: "办理通过",
                            bidEvaluationRoom: this.bidEvaluationRoom,
                            bidEvaluationTime:this.bidEvaluationTime,
                            lengthOfTenderEvaluation:this.lengthOfTenderEvaluation
                        }
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/submit',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$axios({
                            method:'POST',
                            url:baseUrl + '/toDoListController/update',
                            data:{
                                toDoListId: this.toDoListId,
                                auditStatus: "办理通过",
                                remarks: this.infoRemark,
                                state: "已办理"
                            }
                        }).then(res=>{
                            if(res.data.status == 200){
                                this.successFlag = false;
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
                }).catch(err=>{
                    console.log(err)
                })
            },
            successSure(){
                this.successFlag = false;
            },
            // 不同意
            disAgree(){
                this.disAgreeFlag = true;
                
            },
            // 确定退回
            disAgreeBack(){
                let object = {};
                if(this.businessLinks == "资审场地预约"){
                    object = {
                        siteReservationId: this.referenceId,
                        state: "办理未通过",
                    }
                }else if(this.businessLinks == "场地预约"){
                    object = {
                        siteReservationId: this.referenceId,
                        state: "办理未通过",
                    }
                }
                this.$axios({
                    method:"POST",
                    url:baseUrl + '/siteReservationController/submit',
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
                                remarks: this.infoRemark
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
                    url:baseUrl+"/siteReservationController/select/"+this.referenceId
                }).then(res=>{
                    if(res.data.status == 200){
                        this.assessmentTime = res.data.data.assessmentTime;// 开标时间
                        this.estimatedReviewDuration = res.data.data.estimatedReviewDuration;// 开标时长
                        this.openingRoom = res.data.data.openingRoom;//开标室
                        this.appointmentEvaluationRoom = res.data.data.appointmentEvaluationRoom;// 是否预约评标室
                        if(this.appointmentEvaluationRoom == '是'){
                            this.placeFlag = false;
                            this.isFlag = true;
                        }else{
                            this.placeFlag = true;
                            this.isFlag = false;
                        }
                        this.supportingServices = res.data.data.supportingServices;// 配套服务
                        this.bidEvaluationSite = res.data.data.bidEvaluationSite;// 评标地点
                        this.bidEvaluationTime = res.data.data.bidEvaluationTime;// 评标时间
                        this.lengthOfTenderEvaluation = res.data.data.lengthOfTenderEvaluation;// 评标时长
                        this.bidEvaluationRoom = res.data.data.bidEvaluationRoom;// 评标室
                        this.itemsList = res.data.data.items;// 分包信息
                        let lookArr = [];
                        res.data.data.items.map((item,index)=>{
                            if(item.entrySubcontractNumber != null){
                                lookArr.push(item.entrySubcontractNumber);
                            }else{
                                lookArr.push(item.projectCode);
                            }
                        })
                        this.getbiddingInfo();// 招标项目信息
                        this.getsubData(lookArr);// 分包列表
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
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                        this.tenderPurchaserName = res.data.data.tenderPurchaserName;// 招标(采购)人
                        this.biddingPurchasingAgencyName = res.data.data.biddingPurchasingAgencyName;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                })
            },
            // 分包信息
            getsubData(lookArr){
                let object = {};
                if(this.entrySubcontractNumber != null){
                    object = {
                        projectEntrySubcontractNumbers:lookArr
                    }
                }else{
                    object = {
                        projectEntrySubcontractNumbers:lookArr
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
            // 查看分包信息
            lookFile(row){
                this.lookFlag = true;
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称 
                this.subcontractContents = row.subcontractContents;// 分包内容
                this.scopeOfTender = row.scopeOfTender;// 招标范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额  
                this.nameOfTenderProject  = row.projectInformationVo.nameOfTenderProject;// 招标(采购)项目名称
                this.biddingProjectNumber = row.projectInformationVo.biddingProjectNumber;// 招标项目编号
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
            },
            closeLook(){
                this.lookFlag = false;
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
.star{
    color: #f00;
}
</style>