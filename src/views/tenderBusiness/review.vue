<template>
    <div class="newBox">
        <!-- 评标情况信息 -->
        <div class="pageWrapper">
            <div class="boxTitle">
                <el-radio-group v-model="radio" size="small" @change="changeRadio">
                    <el-radio label="未评标">未评标</el-radio>
                    <el-radio label="已评标">已评标</el-radio>
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
                        <el-input v-model="number" clearable placeholder="请输入内容" @keyup.enter.native="searchList"></el-input>
                     </div>
                </div>
                <div class="editBtn">
                    <button class="btn" @click="searchList">搜索</button>
                </div>
            </div>
            <!-- 项目分包列表页面 -->
            <div class="main_info">
                <el-table :data="reviewData" stripe style="width: 100%">
                    <el-table-column type="index" label="序号" :index="typeIndex" width="70">
                    </el-table-column>
                    <el-table-column prop="totalProjectId" label="入场项目分包编号" width="180">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="subcontractName" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="bidEvaluationState" label="评标状态">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                            <i class="el-icon-edit" @click="lookOver(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页器 -->
            <div class="pagination" v-if="this.totalPages>1">
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
        <!-- 评标情况 -->
        <div class="wrapper" v-show="writeFlag">
            <div class="wrapperBox">
                <div class="wrapper_title">
                    <p>查看评审情况</p>
                    <i class="el-icon-close" @click="closeWrite"></i>
                </div>
                <div class="main_info">
                    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
                        <el-tab-pane label="评标消息" name="first">
                            <div class="page">
                                <div class="box">
                                    <button class="btn" @click="saveInfo">保存</button>
                                </div>
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
                                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                                </div>
                                                <div class="editCenter">
                                                    <div class="editName">招标项目预算金额：</div>
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
                                    <!--评标消息 -->
                                    <el-collapse-item title="评标消息" name="2">
                                        <div class="edit_list">
                                            <div class="noteBox">
                                                <div class="noteItem">
                                                    <div class="noteLeft"> 评标开始时间：</div>
                                                    <div class="write_input">
                                                        <el-date-picker
                                                            v-model="startTime"
                                                            type="datetime"
                                                            placeholder="开始日期"
                                                            :picker-options="pickerOptions0"
                                                        >
                                                        </el-date-picker>
                                                    </div>
                                                </div>
                                                <div class="noteItem">
                                                    <div class="noteLeft">评标结束时间：</div>
                                                    <div class="write_input">
                                                        <el-date-picker
                                                            v-model="endTime"
                                                            type="datetime"
                                                            placeholder="结束时间"
                                                            :picker-options="pickerOptions1"
                                                        >
                                                        </el-date-picker>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="noteBox">
                                                <div class="noteItem">
                                                    <div class="noteLeft">评标地点：</div>
                                                    <div class="write_input" >
                                                        <el-input v-model="address"></el-input>
                                                    </div>
                                                </div>
                                                <div class="noteItem">
                                                    <div class="noteLeft">评标方式：</div>
                                                    <div class="write_input" >
                                                        <el-input v-model="method" clearable></el-input>
                                                    </div>
                                                </div>
                                            </div>
                                             <div class="editItem">
                                                <div class="editTextarea">
                                                    <div class="editName">评标情况：</div>
                                                    <div class="editContent">
                                                        <el-input v-model="situation" type="textarea" :rows="3"></el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                        </div>
                        </el-tab-pane>
                        <el-tab-pane label="评标结果" name="second">
                            <div class="page">
                                <div class="box">
                                    <button class="btn" @click="endingInfo">评标结束</button>
                                </div>
                                <el-collapse v-model="activeName" accordion>
                                    <!--评标结果 -->
                                    <el-collapse-item title="评标结果" name="1"> 
                                        <el-table
                                                ref="multipleTable"
                                                :data="totalData"
                                                tooltip-effect="dark"
                                                style="width: 100%">
                                            <el-table-column
                                                label="序号">
                                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="companyName"
                                                label="单位名称">
                                            </el-table-column>
                                            <el-table-column
                                                prop="offer"
                                                label="投标报价(元/%)">
                                            </el-table-column>
                                            <el-table-column
                                                prop="quotationMethod"
                                                label="报价方式">
                                            </el-table-column>
                                            <el-table-column
                                                prop="economic"
                                                label="经济标">
                                            </el-table-column>
                                            <el-table-column
                                                prop="technology"
                                                label="技术标">
                                            </el-table-column>
                                            <el-table-column
                                                prop="business"
                                                label="商务标">
                                            </el-table-column>
                                            <el-table-column
                                                prop="otherPoints"
                                                label="其他分">
                                            </el-table-column>
                                            <el-table-column
                                                prop="totalScore"
                                                label="汇总分">
                                            </el-table-column>
                                            <el-table-column
                                                prop="ranking"
                                                label="排名">
                                            </el-table-column>
                                            <el-table-column
                                                label="操作">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-edit"  style="cursor: pointer;" @click="editInfo(scope.row)"></i>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="edit_list">
                                            <div class="noteBox">
                                                <div class="noteItem">
                                                    <div class="noteLeft">推荐排名第一单位：</div>
                                                    <div class="write_item">
                                                        <el-select v-model="recommendFirst" @change="selectItem">
                                                            <el-option v-for="item in validData" :key="item.bidInforId" :label="item.companyName" :value="item.bidInforId" ></el-option>
                                                        </el-select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="noteBox">
                                                <div class="noteItem">
                                                    <div class="noteLeft">推荐排名第二单位：</div>
                                                    <div class="write_item">
                                                        <el-select v-model="recommendSecond" @change="selectItem">
                                                            <el-option v-for="item in validData" :key="item.bidInforId" :label="item.companyName" :value="item.bidInforId" ></el-option>
                                                        </el-select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="noteBox">
                                                <div class="noteItem">
                                                    <div class="noteLeft">推荐排名第三单位：</div>
                                                    <div class="write_item">
                                                        <el-select v-model="recommendThird"  @change="selectItem">
                                                            <el-option v-for="item in validData" :key="item.bidInforId" :label="item.companyName" :value="item.bidInforId"></el-option>
                                                        </el-select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-collapse-item>
                                    <!--无效标信息 -->
                                    <el-collapse-item title="无效标信息" name="2">
                                        <el-table
                                                ref="multipleTable"
                                                :data="invalidData"
                                                tooltip-effect="dark"
                                                style="width: 100%">
                                            <el-table-column
                                                label="序号">
                                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="companyName"
                                                label="单位名称">
                                            </el-table-column>
                                            <el-table-column
                                                prop="noEffectReason"
                                                label="原因">
                                            </el-table-column>
                                            <el-table-column
                                                label="进入">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-edit" @click="enterInto(scope.row)"></i>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            
        </div>
        <!-- 分包信息详情 -->
		<div class="winWrapper" v-show="lookFlag">
            <div class="winBox">
               	<div class="win_title">
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
                                        <div class="editContent">{{tenderPurchaserName}}</div>
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
                                        <div class="editName">招标范围：</div>
                                        <div class="editContent">{{scopeOfTender}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包控制金额：</div>
                                        <div class="editContent">{{subcontractingControlAmount}}<b style="color:#000;">万元</b></div>
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
        <!-- 修改评标情况 -->
        <div class="editWrapper" v-show="editFlag">
             <div class="editBox">
               	<div class="edit_title">
                    <p>修改评标情况</p>
                    <i class="el-icon-close" @click="closeEdit"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="editSave">修改保存</button>
                </div>
				<el-collapse v-model="activeName" accordion>
					<!-- 单位信息 -->
					<el-collapse-item title="单位信息" name="1">
						<div class="noteBox">
                            <div class="noteItem">
                                <div class="noteLeft">单位名称：</div>
                                <div class="write_textarea">
                                    <el-input v-model="companyName" readonly></el-input>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
					 <!-- 评标信息-->
					<el-collapse-item title="评标信息" name="2">
						<div class="noteBox">
                            <div class="noteItem">
                                <div class="noteLeft_item">经济标：</div>
                                <div class="edit_item">
                                    <el-input v-model="economic" clearable></el-input>
                                </div>
                            </div>
                            <div class="noteItem">
                                <div class="noteLeft_item">技术标：</div>
                                <div class="edit_item">
                                    <el-input v-model="technology" clearable></el-input>
                                </div>
                            </div>
                            <div class="noteItem">
                                <div class="noteLeft_item">商务标：</div>
                                <div class="edit_item">
                                    <el-input v-model="business" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="noteBox">
                            <div class="noteItem">
                                <div class="noteLeft_item">其他分：</div>
                                <div class="edit_item">
                                    <el-input v-model="otherPoints" clearable></el-input>
                                </div>
                            </div>
                            <div class="noteItem">
                                <div class="noteLeft_item">汇总分：</div>
                                <div class="edit_item">
                                    <el-input v-model="totalScore" clearable></el-input>
                                </div>
                            </div>
                            <div class="noteItem">
                                <div class="noteLeft_item">排名：</div>
                                <div class="edit_item">
                                    <el-input v-model="ranking" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="noteBox" style="display:flex;justify-content:flex-start;">
                            <div class="noteItem_item">
                                <div class="noteLeft_item">是否判定无效：</div>
                                <div class="edit_item">
                                    <el-checkbox v-model="isEffective">是</el-checkbox>
                                </div>
                            </div>
                            <div class="noteItem_item">
                                <div class="noteLeft_item">是否放弃中标：</div>
                                <div class="edit_item">
                                   <el-checkbox v-model="abandoningWinningBid">放弃中标</el-checkbox>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 无效标 -->
        <div class="invalidWrapper" v-show="invalidFlag">
            <div class="invalidBox">
               	<div class="invalid_title">
                    <p>无效标</p>
                    <i class="el-icon-close" @click="closeInvalid"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="invalidSure">确定</button>
                    <button class="btn" @click="invalidCancel">取消</button>
                </div>
                <div class="main_info">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">单位名称：</div>
                                <div class="editContent">{{companyName}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">投标价格(元/%)：</div>
                                <div class="editContent">{{offer}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">无效标节点：</div>
                                <div class="editContent">
                                    <el-input v-model="noEffectNode" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">无效标原因：</div>
                                <div class="editContent">
                                    <el-input v-model="noEffectReason" type="textarea" :rows="3"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评标结束 -->
        <el-dialog
            title="信息确认"
            :visible.sync="endingBox"
            width="30%"
            :before-close="endingSure">
            <div class="icon">
                <i class="el-icon-question"></i>
                <span>您确认评标结束吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="endingSure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 评标结束 -->
        <el-dialog
            title="执行成功"
            :visible.sync="saveBox"
            width="30%"
            :before-close="saveSure">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>保存成功!</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import '../../assets/css/style.css'
    import baseUrl from '../../api/api'
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    import {formatDate,changeTime,checkNumber} from '../../api/base.js'
    export default {
        data(){
            return {
                // 开始
                pickerOptions0: {
                    disabledDate: (time) => {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                // 结束
                pickerOptions1: {
                    disabledDate: (time) => {
                        return time.getTime() < new Date(this.startTime).getTime()- (24*60*60*1000)/24;//减去一天的时间代表可以选择同一天;
                    }
                },
                // projectObj:JSON.parse(window.localStorage),
                totalProjectId:'',
                activeName:['1','2','3','4','5','6'],
                activeName2: 'first',
                writeFlag:false,// 总包输入 列表
                breakBagFlag:false,// 招标项目信息 下分包展示
                subpackageData:[],
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
                // 让input框只读
                readonly: true,
                time:'',
                name:'',// 分包名称 搜索
                number:'',// 入场项目分包编号 搜素
                region:'',// 下拉框
                // 中标信息详情
                lookFlag:false,
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                totalProjectId:'',
                // 评标结束
                endingBox:false,
                // 评标信息 
                saveBox:false,// 保存
                //评标消息所需字段
                startTime:'',// 评标开始时间
                endTime:'',// 评标结束时间
                address:'',// 评标地点
                method:'',// 评标方式
                situation:'',// 评标情况
                isEnd:'',// 是否评标结束
                recommendFirst:'',// 推荐排名第一
                recommendSecond:'',// 推荐排名第二
                recommendThird:'',// 推荐排名第三
                // 评标结果
                totalData:[],
                validData:[],// 有效标
                invalidData:[],// 无效标
                // 修改评标情况所需字段
                editFlag:false,// 弹窗
                companyName:'',//单位名称
                economic:'',// 经济标
                technology:'',// 技术标
                business:'',// 商务标
                otherPoints:'',// 其他分
                totalScore:'',// 汇总分
                ranking:'',// 排名
                isEffective:false,// 是否判定无效
                abandoningWinningBid:false,// 是否放弃中标
                invalidFlag:false,// 无效标弹窗
                noEffectReason:'',// 无效原因
                offer:'',// 报价
                noEffectNode:'',// 无效标节点
                // 分页器
                currentPage:1,// 当前页
                pageSize: 10, // 每页条数
                pageTotal: 0, //总页数
                total: 0, //总条数
                totalPages:0,// 后端返回的页数
                reviewData:[],// 评标列表
                radio:'未评标',// 单选框
                projectInformaPrimaryKeyId:'',
                changeData:[],// 后端返回推荐单位数组
            }
        },
        created(){
            this.getInitList(); // 评标信息列表
        },
		methods:{
             // 分页器
            handleSizeChange(val) {
                // 每页条数
            },
            handleCurrentChange(val) {
                // 当前页数
                this.currentPage = val;
                this.getInitList(); // 评标信息列表
            },
            //编号问题
            typeIndex(index) {
                return index + (this.currentPage - 1) * 10 + 1;
            },
            // 单选框
            changeRadio(){
                this.currentPage = 1;
                this.getInitList();//评标信息列表
            },
            searchList(){
                this.currentPage = 1;
                this.getInitList();//评标信息列表
            },
            // tab 切换
            handleClick(tab, event) {
                if(tab.name == 'second'){
                    this.getDataInfo();// 评标结果 有效标总
                    this.getvalidInfo();// 评标结果 有效标
                    this.getselectInfo();// 下拉框数据展示
                    this.getinvalidInfo();// 评标结果 无效标
                }else{
                    this.getselectInfo();// 下拉框数据
                }
            },
            // 查看分包详情
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
            // 编辑
            lookOver(row){
                this.writeFlag = true;
                this.getbiddingInfo(row.projectInformaPrimaryKeyId);// 招标项目信息
                this.totalProjectId = row.totalProjectId;
                this.getselectInfo();// 下拉框数据
                this.getDataInfo();// 评标结果 有效标总
                this.getvalidInfo();// 评标结果 有效标
                this.getinvalidInfo();// 评标结果 无效标
                this.activeName2 = 'first';// 默认展示评标消息
            },
            closeWrite(){
                 this.writeFlag = false;
                 this.getInitList(); // 评标信息列表
            },
            // 多选框过滤 不能出现重复
            selectItem(val){
                // let arr = [];
                // arr.push(this.recommendFirst,this.recommendSecond,this.recommendThird)
                // this.changeData = arr;
                // console.log(this.changeData,'---555')
                // console.log(this.validData)
                // if(this.validData.length>0){
                //     for(let i=0;i<this.validData.length;i++){
                //         for(let j=0;j<this.changeData.length;j++){
                //             if(this.validData[i].companyName == this.changeData[j]){
                //                 this.validData.splice(i,1)
                //             }
                //         }
                //     }
                // }
            },
            // 评标结束
            endingInfo(){
                this.totalData.forEach(item=>{
                    if(item.companyName == this.recommendFirst ){
                        this.recommendFirst = item.bidInforId;
                    }else if(item.companyName == this.recommendSecond ){
                        this.recommendSecond = item.bidInforId;
                    }else if(item.companyName == this.recommendThird ){
                        this.recommendThird =  item.bidInforId;
                    }
                })
                let object={}
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.totalProjectId,
                        recommendFirst:this.recommendFirst,
                        recommendSecond:this.recommendSecond,
                        recommendThird:this.recommendThird
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId,
                        recommendFirst:this.recommendFirst,
                        recommendSecond:this.recommendSecond,
                        recommendThird:this.recommendThird
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/save",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.saveBox = true;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            cancel(){
                this.endingBox = false;
                this.isEnd = false;
            },
            // 评标结束 ---> 弹窗关闭
            endingSure(){
                this.endingBox = false;
                this.isEnd = true;
            },
            // 评标信息 ---> 保存
            saveInfo(){
                let object={}
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.totalProjectId,
                        startTime:changeTime(this.startTime),
                        endTime:changeTime(this.endTime),
                        address:this.address,
                        method:this.method,
                        situation:this.situation,
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId,
                        startTime:changeTime(this.startTime),
                        endTime:changeTime(this.endTime),
                        address:this.address,
                        method:this.method,
                        situation:this.situation,
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/save",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.saveBox = true;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 修改评标情况 
            editInfo(row){
                this.bidInforId = row.bidInforId;// 投标信息ID
                this.companyName = row.companyName;// 单位名称
                this.economic= row.economic;// 经济标
                this.technology= row.technology;// 技术标
                this.business= row.business;// 商务标
                this.otherPoints= row.otherPoints;// 其他分
                this.totalScore= row.totalScore;// 汇总分
                this.ranking= row.ranking;// 排名
                // 是否判定无效
                if(row.isEffective == '1' || row.isEffective == null){
                    this.isEffective =false;
                }else{
                    this.isEffective =true;
                }
                // 是否放弃中标
                if(row.abandoningWinningBid == '1' || row.abandoningWinningBid == null){
                    this.abandoningWinningBid =false;
                }else{
                    this.abandoningWinningBid =true;
                }
                this.editFlag = true;
            },
            closeEdit(){
                this.editFlag = false;
            },
            // 评标信息 ---> 保存弹窗关闭
            saveSure(){
                this.saveBox = false;
            },
            // 评标情况 无效标 进入
            enterInto(row){
                this.bidInforId = row.bidInforId;// 投标信息ID
                this.noEffectReason = row.noEffectReason;
                this.companyName = row.companyName;
                this.offer = row.offer;
                this.noEffectNode = row.noEffectNode;// 无效标节点
                this.invalidFlag = true;
            },
            // 关闭无效标
            closeInvalid(){
                this.invalidFlag = false;
            },
            // 招标项目信息
            getbiddingInfo(projectInformaPrimaryKeyId){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+projectInformaPrimaryKeyId,
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

                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 根据项目入场分包编号查询
            getItemInfo(){
                let arr =[];
                arr.push(this.entrySubcontractNumber)
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:{
                        projectEntrySubcontractNumbers:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.subpackageData = res.data.data;
                        this.subpackageData.forEach(item=>{
                            return item.entrySubcontractNumber,item.qualificationExaminationMethod
                        })
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 评标结果 有效标 总
            getDataInfo(){
                let object={}
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.totalProjectId
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/selectListForBid",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.totalData = res.data.data;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 评标结果 有效标
            getvalidInfo(){
                let object={}
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.totalProjectId,
                        isEffective:1
                    }
                }else{
                    // 入场项目编号 
                    object ={
                        projectCode:this.totalProjectId,
                        isEffective:1
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/selectListForBid",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.validData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 评标结果 无效标
            getinvalidInfo(){
                let object={}
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.totalProjectId,
                        isEffective:0
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId,
                        isEffective:0
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/selectListForBid",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.invalidData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 修改评标保存
            editSave(){
                if(this.economic != '' && this.economic != null && !checkNumber(this.economic)){
                     this.$layer.msg('请输入数字');
                     return false;
                }else if(this.technology != '' && this.technology != null && !checkNumber(this.technology)){
                    this.$layer.msg('请输入数字');
                    return false;
                }else if(this.business != ''&& this.business != null && !checkNumber(this.business)){
                     this.$layer.msg('请输入数字');
                     return false;
                }else if(this.otherPoints != '' && this.otherPoints != null && !checkNumber(this.otherPoints)){
                     this.$layer.msg('请输入数字');
                     return false;
                }else if(this.totalScore != '' && this.totalScore != null && !checkNumber(this.totalScore)){
                     this.$layer.msg('请输入数字');
                     return false;
                }else if(this.ranking != '' && this.ranking != null && !checkNumber(this.ranking)){
                    this.$layer.msg('请输入数字');
                    return false;   
                }else {
                    // 是否判定无效
                    if(this.isEffective == true){
                        this.isEffective='0';
                    }else{
                        this.isEffective='1';
                    }
                    // 是否放弃中标
                    if(this.abandoningWinningBid == true){
                        this.abandoningWinningBid='0';
                    }else{
                        this.abandoningWinningBid='1';
                    }

                    let object={}
                    if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                        // 入场项目分包编号
                        object={
                            entrySubcontractNumber:this.totalProjectId,
                            bidInforId:this.bidInforId,
                            companyName:this.companyName,
                            economic:this.economic,
                            technology:this.technology,
                            business:this.business,
                            otherPoints:this.otherPoints,
                            totalScore:this.totalScore,
                            ranking:this.ranking,
                            isEffective:this.isEffective,
                            abandoningWinningBid:this.abandoningWinningBid,
                        }
                    }else{
                        // 入场项目编号
                        object ={
                            projectCode:this.totalProjectId,
                            bidInforId:this.bidInforId,
                            companyName:this.companyName,
                            economic:this.economic,
                            technology:this.technology,
                            business:this.business,
                            otherPoints:this.otherPoints,
                            totalScore:this.totalScore,
                            ranking:this.ranking,
                            isEffective:this.isEffective,
                            abandoningWinningBid:this.abandoningWinningBid,
                        }
                    }
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/bidInforController/update",
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.editFlag = false;
                            this.saveBox = true;
                            this.getDataInfo();// 总
                            this.getvalidInfo();// 有效标列表
                            this.getinvalidInfo();// 无效标列表
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            // 下拉框数据
            getselectInfo(){
                let object={}
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.totalProjectId
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/selectByProjectCode",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data != null){
                            this.address = res.data.data.address;// 评标地点
                            if(res.data.data.startTime !='' && res.data.data.startTime != null){
                                this.startTime = formatDate(res.data.data.startTime);// 评标开始时间
                            }

                            if(res.data.data.endTime!='' && res.data.data.startTime != null){
                               this.endTime = formatDate(res.data.data.endTime);//评标结束时间
                            }
                            this.situation = res.data.data.situation;// 评标情况
                            this.method = res.data.data.method;// 评标方式
                            this.totalData.forEach(item=>{
                                if(item.bidInforId == res.data.data.recommendFirst){
                                    this.recommendFirst = item.companyName;
                                }else if(item.bidInforId == res.data.data.recommendSecond ){
                                    this.recommendSecond = item.companyName;
                                }else if(item.bidInforId == res.data.data.recommendThird ){
                                    this.recommendThird =  item.companyName;
                                }
                            })
                            
                        }else{
                            this.address = '';// 评标地点
                            this.startTime ='';
                            this.endTime = '';
                            this.situation = '';// 评标情况
                            this.method = '';// 评标方式
                            this.recommendFirst = '';
                            this.recommendSecond =  '';
                            this.recommendThird =  '';
                        }
                       
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 无效标确定按钮
            invalidSure(){
                let object={}
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.totalProjectId,
                        bidInforId:this.bidInforId,
                        noEffectReason:this.noEffectReason,
                        noEffectNode:this.noEffectNode
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId,
                        bidInforId:this.bidInforId,
                        noEffectReason:this.noEffectReason,
                        noEffectNode:this.noEffectNode
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/update",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.invalidFlag = false;
                        this.getinvalidInfo();// 无效标列表
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 无效标取消按钮
            invalidCancel(){
                this.invalidFlag = false;
            },
            // 评标信息列表
            getInitList(){
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selfTenderListForBidEvaluation",
                    data:{
                        pageNo:this.currentPage,
                        pageSize:this.pageSize,
                        bidEvaluationState:this.radio,
                        totalProjectId:this.number,
                        nameOfTenderProject:this.name
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.reviewData = res.data.data.data;
                        if(this.reviewData.length>0){
                            this.reviewData.forEach(item=>{
                                this.totalPages = item.totalPages;
                            })
                        }
                        this.total = res.data.data.data[0].total;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
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


.pageWrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.pagination {
  width: 100%;
  padding: 20px 60px ;
  display: flex;
  justify-content: flex-end;
}
.boxTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px 0 0;
    background: #e2e2e2;
}
.wrapper{
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
.wrapperBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}

.winWrapper,.editWrapper{
     width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
    display: flex;
    flex-direction: column;
}
.invalidWrapper{
     width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:12% 15%;
    display: flex;
    flex-direction: column;
}
.page{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
}
.winBox,.editBox,.invalidBox{
    width:100%;
    height: 100%;
    background: #fff;
}

.win_title,.edit_title,.invalid_title,.wrapper_title{
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
.el-icon-close{
    font-size: 24px; 
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
}
.notic,h6,b{
    color:red;
}
/* 输入框 */
.noteBox{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 4px 0;
}
.noteItem{
    display: flex;
    align-items: center;
}
.noteItem p{
    padding:  0 5px;
}
.noteLeft{
    width: 130px;
    padding-right: 5px;
    color: #333;
    height: 100%;
    text-align: right;
}
.write_input{
    width: 250px;
}
.write_textarea{
    width: 860px !important;
}
.textarea{
    width: 600px !important;
}
.write_item>.el-select{
    width: 810px !important;
}
.edit_list{
    padding: 0 50px;
}
.noteItem_item{
    width: 400px;
    display: flex;
}
.noteLeft_item{
    width: 100px;
    padding-right: 5px;
    color: #333;
    height: 100%;
    text-align: right;
}
.edit_item{
    width: 150px;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
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
.item_title{
	line-height: 30px;
	font-weight: bold;
	padding: 0 10px;
}
.el-icon-plus{
	font-size: 26px;
}
.main_info{
    width: 100%;
    height: 100%;
    margin: 0 auto;
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
    text-align:right;
}
.editContent{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
}
/* 输入搜索框 */
.pick_input{
    width: 100%;
    padding: 0 30px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.noteItem{
    display: flex;
    align-items: center;
}
.noteItem p{
    padding:  0 5px;
}
.noteLeft{
    width: 130px;
    display: flex;
    justify-content: flex-end;
}
.write_input{
    width: 200px;
}
.write_input>.el-select{
    width: 250px;
}
.owner_btn{
    height: 35px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
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
    text-align:right;
}
.editContent{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
}

.editContent>.el-select{
    width: 100% !important;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.editBtn{
    height: 35px;
}
</style>