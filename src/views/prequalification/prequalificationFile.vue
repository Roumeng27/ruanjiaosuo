<template>
    <!-- 资格预审文件 -->
    <div class="newBox">
        <!-- 主页面 -->
        <div class="wrapper">
            <div class="box">
                <div style="display:flex;height:100%;">
                    <button class="btn" @click="newManage">新增资审文件</button>
                    <button class="btn" @click="newManage">制作资审文件</button>
                </div>
                <el-radio-group v-model="radio" size="small" @change="changeRadio">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="编辑中">编辑中</el-radio>
                    <el-radio label="待办理">待办理</el-radio>
                    <el-radio label="办理通过">办理通过</el-radio>
                    <el-radio label="办理未通过">办理未通过</el-radio>
                </el-radio-group> 
            </div>
             <!-- 搜索的输入框 -->
            <div class="editItem">
                <div class="editCenter">
                    <div class="editName">招标项目(分包)名称：</div>
                    <div class="editContent">
                        <el-input v-model="name" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                    </div>
                </div>
                <div class="editCenter">
                    <div class="editName">入场项目(分包)编号：</div>
                    <div class="editContent">
                        <el-input v-model="name" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                     </div>
                </div>
                <div class="editBtn">
                    <button class="btn" @click="searchList">搜素</button>
                </div>
            </div>
            <!-- 项目分包列表页面 -->
            <div class="main_info">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" label="序号" :index="typeIndex" width="70">
                    </el-table-column>
                    <el-table-column prop="entrySubcontractNumber" label="入场项目编号" width="180">
                    </el-table-column>
                    <el-table-column prop="entrySubcontractNumber" label="入场项目分包编号" width="180">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="资审评审开始时间">
                    </el-table-column>
                    <el-table-column prop="subcontractingState" label="状态">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                            <i class="el-icon-search" @click="lookOver(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页器 -->
            <div class="pagination" v-if="this.currentPage>1">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>

        <!--挑选分包 -->
        <div class="addWrapper" v-show="addFlag">
            <div class="addBox">
                <div class="add_title">
                    <p>挑选分包</p>
                    <i class="el-icon-close" @click="closeAdd"></i>
                </div>
                <div class="main_info">
                    <div class="table_list">
                        <el-table 
                             ref="multipleTable"
                            :data="pickData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column  label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column prop="totalProjectId" label="入场项目编号" width="150">
                            </el-table-column>
                            <el-table-column prop="nameOfTenderProject" label="招标项目名称">
                            </el-table-column>
                            <el-table-column prop="biddingProjectNumber" label="分包名称">
                            </el-table-column>
                            <el-table-column prop="nameOfPurchaser" label="分包分类">
                            </el-table-column>
                            <el-table-column prop="biddingProcurementMode" label="招标方式">
                            </el-table-column>
                            <el-table-column prop="biddingProcurementMode" label="分包控制金额(万元)">
                            </el-table-column>
                            <el-table-column prop="state" label="状态">
                            </el-table-column>
                            <el-table-column prop="operation" label="选择">
                                <template slot-scope="scope">
                                    <i class="el-icon-plus" style="cursor: pointer;" @click="getDetail(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="sureBtn">
                        <button class="btn" @click="sureChoise">确定选择</button>
                    </div>
                </div>
            </div>
        </div>

        <!--保存和下一步 -->
        <div class="newaddWrapper" v-show="newFlag">
            <div class="newaddBox">
                <div class="newadd_title">
                    <p>资审场地预约</p>
                    <i class="el-icon-close" @click="closeNewadd"></i>
                </div>
                <div class="boxTitle">
                    <button class="btn" @click="saveInfo(1)">保存</button>
                    <button class="btn" @click="saveInfo(2)">下一步</button>
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
                                        <div class="editContent">{{biddingProjectNumber}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{totalProjectId}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元 </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标项目类型：</div>
                                        <div class="editContent">{{typesOfBiddingProjects}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标采购方式：</div>
                                        <div class="editContent">{{biddingProcurementMode}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标组织方式：</div>
                                        <div class="editContent">{{biddingOrganization}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 预约资审场地 -->
                        <el-collapse-item title="预约资审场地" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">
                                            <el-input v-model="subcontractContents" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>资审评审时间：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                v-model="subcontractContents"
                                                type="datetime"
                                                placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">预计评审时长：</div>
                                        <div class="editContent">
                                            <el-select v-model="subcontractContents">
                                                <el-option label="1" value="1"></el-option>
                                                <el-option label="2" value="2"></el-option>
                                                <el-option label="3" value="3"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>资审评审时间：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                v-model="subcontractContents"
                                                type="datetime"
                                                placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">是否预约评标室：</div>
                                        <div class="editContent">
                                            <el-radio-group v-model="subcontractContents" @change="getRadio">
                                                <el-radio label="是">是</el-radio>
                                                <el-radio label="否">否</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem" v-show="checkFlag">
                                    <div class="editTextarea">
                                        <div class="editName">配套服务：</div>
                                        <div class="editContent">
                                            <el-checkbox-group v-model="checkList">
                                                <el-checkbox label="电脑">电脑</el-checkbox>
                                                <el-checkbox label="签字笔">签字笔</el-checkbox>
                                                <el-checkbox label="计算器">计算器</el-checkbox>
                                                <el-checkbox label="胶带">胶带</el-checkbox>
                                                <el-checkbox label="铅笔和橡皮">铅笔和橡皮</el-checkbox>
                                                <el-checkbox label="裁纸刀和剪刀">裁纸刀和剪刀</el-checkbox>
                                                <el-checkbox label="记号笔">记号笔</el-checkbox>
                                                <el-checkbox label="投影仪">投影仪</el-checkbox>
                                                <el-checkbox label="打印机">打印机</el-checkbox>
                                                <el-checkbox label="订书器">订书器</el-checkbox>
                                                <el-checkbox label="打包绳">打包绳</el-checkbox>
                                                <el-checkbox label="桌签和水牌">桌签和水牌</el-checkbox>
                                                <el-checkbox label="信号屏蔽器">信号屏蔽器</el-checkbox>
                                                <el-checkbox label="水杯">水杯</el-checkbox>
                                                <el-checkbox label="A4纸">A4纸</el-checkbox>
                                                <el-checkbox label="其他">其他</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem" v-show="addressFlag">
                                    <div class="editTextarea">
                                        <div class="editName">评审地点：</div>
                                        <div class="editContent">
                                            <el-input v-model="subcontractContents" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 上一步和提交 -->
        <div class="nextWrapper" v-show="nextFlag">
            <div class="nextWrapperBox">
                <div class="nextWrapper_title">
                    <p>查看资审场地预约</p>
                    <i class="el-icon-close" @click="closeNext"></i>
                </div>
                <div class="editTitle" v-show="headerBtn">
                    <button class="btn" @click="backTo">上一步</button>
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
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标项目金额(万元)：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 资审场地预约 -->
                        <el-collapse-item title="资审场地预约" name="2">
                            <div class="edit_list">
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目名称：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">资审评审开始时间：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">资审评审结束时间：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">是否预约评标室：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">配套服务：</div>
                                        <div class="editContent">{{}} </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="3">
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
        <!-- 查看详情 -->
		<div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
				<div class="look_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
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
                                    <div class="editContent">{{nameOfPurchaser}} </div>
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
                                    <div class="editContent">{{nameOfPurchaser}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标范围：</div>
                                    <div class="editContent">{{subcontractContents}} </div>
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

         <!-- 警告信息弹窗 -->
        <el-dialog
            title="警告信息"
            :visible.sync="warnBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>{{warnTitle}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="warnSure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 成功提示弹窗 -->
         <el-dialog
            title="执行成功"
            :visible.sync="successBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>{{successTitle}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successSure(successTitle)">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import baseUrl from '../../api/api'
import '../../assets/css/style.css'
import {formatDate,isEmpty} from '../../api/base.js'
export default {
	components:{},
	props:{},
	data(){
		return {
            entrySubcontractNumber:"",//入场项目分包编号
            activeName:['1','2','3','4','5'],
            addFlag:false,// 新增项目 挑选项目
            newFlag:false,// 新增资审文件
            // 查看相关分包信息详情所需字段
            lookFlag:false,// 弹窗
            //  下一步所需字段
            nextFlag:false,//弹窗
            headerBtn:true,// 控制按钮是否展示
            // 挑选项目
            pickData:[],// 列表
             // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            nameOfPurchaser:'',// 招标(采购)人
            budgetAmount:'',// 招标项目预算金额
            biddingProcurementMode:'',// 招标方式
            scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'是',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            amountId:'',// 总包
            subcontractingState:"",//项目分包状态 
            projectSubcontractCreationTime:'',//创建时间
            totalProjectId:'',//入场项目编号
            amountOfBiddingProject:'',//招标项目金额
            typesOfBiddingProjects:'',//招标项目类型,
            biddingOrganization:'',//招标组织方式
            // 警告弹窗
            warnBox:false,
            warnTitle:'',//  警告提示内容
            // 成功弹窗
            successBox:false,
            successTitle:'',// 成功提示弹窗
            subcontractItePrimaryKeyId:'',// 
            // 分页器
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
            total: 0, //总条数
            name:'',// 输入框招标项目(分包)名称
            radio: "", // 头部单选框
            input: "", //头部输入框
            tableData: [],//列表数据
            newNumber:'',// 新增项目 编号
            options: [],// 下拉框
            multipleSelection: [],
            projectInformaPrimaryKeyId:'',// 详情ID
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            readonly:true,// input 只可读不可编辑
            checkList:[],
            checkFlag:false,
            addressFlag:false,
           
		}
	},
	created(){
        this.getInitList(); // 项目分包列表
	},
	methods:{
        // 分页器
		handleSizeChange(val) {
			// 每页条数
		},
		handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getInitList(); // 项目分包列表
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        // 是否预约评标室
        getRadio(){
            if(this.subcontractContents == '是'){
                this.checkFlag = true;
                this.addressFlag = false;
            }else{
                this.checkFlag = false;
                this.addressFlag = true;
            }
        },
		// 分包列表 --> 搜索
		searchList(){
			
        },
		// 项目分包列表
		getInitList(){
			
        },
        // 单选框查询项目分包列表 
		changeRadio(){
			
		},
        // 查看资审场地预约列表
        lookOver(row){
            this.nextFlag = true;// 查看资审场地预约详情
            this.headerBtn = true;// 按钮隐藏
        },
        //新增资审文件
		newManage(){
			this.addFlag = true;// 新增资审文件 挑选项目
            this.getPickList();// 挑选项目列表
        },
        // 关闭弹窗
        handleClose(){
            this.warnBox = false;// 警告提示弹窗
            this.successBox = false;// 执行成功弹窗
        },
        // 警告提示确定
        warnSure(){
            this.warnBox = false;
        },
        // 执行成功确定
        successSure(successTitle){
            if(successTitle == '提交项目分包成功！'){
                this.nextFlag = false;// 下一步
                this.newFlag = false;// 上一步
                this.addFlag = false;// 挑选项目
                this.successBox = false;
            }else{
                this.successBox = false;
            }
        },
        // 新增资审文件保存 传分包信息数组
        saveInfo(num){
            if(num == 1){
                // 保存
                this.saveVenuebooking(num);// 新建项目分包保存
            }else{
                this.saveVenuebooking(num);// 新建项目分包保存
                this.nextFlag = true; // 下一步
                this.newFlag = false;// 上一步
                this.getbiddingInfo(this.projectInformaPrimaryKeyId);// 招标项目信息
            }
        },
        // 资审场地预约保存
        saveVenuebooking(num){
            
        },
        // 关闭下一步
        closeNext(){
            this.nextFlag = false;// 下一步
            this.addFlag = false;// 新增项目 挑选项目
        },
        // 查看资审场地预约  提交
        submitInfo(){
            this.successBox = true;
            this.successTitle = '提交资审场地预约成功！';
        },
        // 关闭查看相关分包信息
        closeLook(){
            this.lookFlag = false;
        },
        // 关闭新增项目
        closeAdd(){
            this.addFlag = false;// 新增项目 挑选项目
            this.getInitList(); // 项目分包列表
        },
        sureChoise(){
            this.addFlag =false;// 挑选分包
            this.newFlag = true;// 资审场地预约 保存和下一步
        },
        // 挑选项目操作
		getDetail(row){
            this.newFlag = true;// 新增分包信息弹窗 
            this.projectInformaPrimaryKeyId = row.projectInformaPrimaryKeyId;// 详情ID
            this.getbiddingInfo(this.projectInformaPrimaryKeyId);// 招标项目信息
        },
        // 关闭新增分包信息
        closeNewadd(){
            this.addFlag = false;// 新增项目 挑选项目
            this.newFlag = false;// 新增分包信息弹窗 
        },
        // 上一步
        backTo(){
            this.nextFlag = false; // 下一步
            this.newFlag = true;// 上一步
        },
        // 关闭新增分包信息
        closeInfo(){
              
        },
        // 多选框选择
		handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 下拉框
        getSelectList(){
            this.$axios({
				method: "POST",
				url: baseUrl+'/interfaceTableController/selectByname',
				data:{
                    dropDownBox:'资格审查方式'
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.options = res.data.data.data;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 招标项目信息
        getbiddingInfo(projectInformaPrimaryKeyId){
            this.$axios({
				method: "GET",
				url: baseUrl+"/projectInformationController/selectById/"+projectInformaPrimaryKeyId,
			}).then(res=>{
				if(res.data.status == 200){
                    this.totalProjectId = res.data.data.totalProjectId;// 入场项目编号
                    this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                    this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
                    this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
                    this.biddingOrganization = res.data.data.biddingOrganization;//  招标组织方式
                    this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人 
                    this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 办理记录
        getmanageInfo(entrySubcontractNumber){
            this.$axios({
                method: "POST",
                url: baseUrl+"/subcontractItemController/selectHistory",
                data:{
                    entrySubcontractNumber:entrySubcontractNumber
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.manageDate = res.data.data;
                    this.manageDate.forEach(item => {
                        this.creationTime = formatDate(item.creationTime)
                    });
                }else{
                    this.$layer.msg(res.data.msg,'办理记录');
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 挑选项目列表
        getPickList(){
            
        },
	}
}
</script>
<style scoped>
.newBox {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
}
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.addWrapper{
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
.newaddWrapper,.nextWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
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
.addBox,.newaddBox,.lookBox,.nextWrapperBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.add_title,.newadd_title,.look_title,.nextWrapper_title{
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
    flex: 1;
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
    width: 100px;
    height: 40px;
}
.main{
    width: 100%;
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
}
.boxTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px 0 0;
    background: #e2e2e2;
}
.editTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px 0 0;
}
.el-collapse{
    width: 80%;
    margin: 10px auto;
}
.el-collapse-item__content{
    padding-bottom: 0 !important;
}
.box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
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
.star{
    color:#f00;
}
.sureBtn {
    position: absolute;
    left: 0;
    top: 90%;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 120px;
    height: 40px;
}

.pagination {
  width: 100%;
  padding: 20px 60px ;
  display: flex;
  justify-content: flex-end;
}
.show{
    color: #6e622e;
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
    margin-left: 20px;
    font-size:18px;
}
    
/* 头部 */
.title{
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
.el-pagination__editor.el-input {
    width: 50px!important;
}
.editBtn{
    height: 35px;
}
</style>