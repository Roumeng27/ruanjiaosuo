<template>
    <div class="newBox">
         <!-- 开标情况信息 -->
        <div class="pageWrapper">
            <div class="boxTitle">
                <el-radio-group v-model="radio" size="small" @change="changeRadio">
                    <el-radio label="未开标">未开标</el-radio>
                    <el-radio label="已开标">已开标</el-radio>
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
                <el-table :data="openData" stripe style="width: 100%">
                    <el-table-column type="index" label="序号" :index="typeIndex" width="70">
                    </el-table-column>
                    <el-table-column prop="totalProjectId" label="入场项目分包编号" width="180">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="subcontractName" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="bidOpenState" label="评标状态">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                            <i class="el-icon-edit" style="cursor:pointer;" @click="lookOver(scope.row)"></i>
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

        <!-- 开标情况 -->
        <div class="wrapper" v-show="writeFlag">
            <div class="wrapperBox">
                <div class="wrapper_title">
                    <p>查看开标信息</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeWrite"></i>
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
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{tenderPurchaserName}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标项目预算金额：</div>
                                        <div class="editContent">{{budgetAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}} </div>
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
                        <!--投标单位信息 -->
                        <el-collapse-item title="投标单位信息" name="2">
                            <el-table :data="tenderData" stripe style="width: 100%">
                                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                </el-table-column>
                                <el-table-column  prop="companyName"  label="单位名称">
                                </el-table-column>
                                <el-table-column prop="offer" label="投标报价(元/%)">
                                </el-table-column>
                                <el-table-column prop="quotationMethod" label="报价方式">
                                </el-table-column>
                                <el-table-column prop="projectLeader" label="项目负责人">
                                </el-table-column>
                                <el-table-column prop="constructionPeriod" label="交货期(日历天)">
                                </el-table-column>
                                <el-table-column fixed="right" label="进入" width="100">
                                    <template slot-scope="scope">
                                        <i class="el-icon-edit"  style="cursor: pointer;" @click="detailsInfo(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 进入评标室人员 -->
                        <el-collapse-item title="进入评标室人员" name="3">
                            <div class="box">
                                <button class="btn" @click="findPeople">查找人员</button>
                                <button class="btn" @click="addPeople">新增人员</button>
                                <button class="btn" @click="deletePeople">删除人员</button>
                            </div>
                            <div style="margin-top:10px;">
                                <el-table
                                        ref="multipleTable"
                                        :data="evaluationData"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleChange">
                                    <el-table-column
                                        type="selection"
                                        width="55">
                                    </el-table-column>
                                    <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                    </el-table-column>
                                    <el-table-column
                                        prop="staffName"
                                        label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                        prop="staffCompany"
                                        label="单位名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="staffPhone"
                                        label="联系电话">
                                    </el-table-column>
                                    <el-table-column
                                        prop="staffType"
                                        label="人员类型">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="查看" width="100">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookDetail(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column fixed="right" label="修改" width="100">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit"  style="cursor: pointer;" @click="modifyDetail(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 表格分包信息详情 -->
		<div class="winWrapper" v-show="lookFlag">
            <div class="winBox">
               	<div class="win_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook" style="cursor:pointer;"></i>
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
        <!-- 查找人员 -->
        <div class="findWrapper" v-show="findFlag">
            <div class="findBox">
                <div class="find_title">
                    <p>查找人员</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeFind"></i>
                </div>
                <div class="find_write">
                    <div class="input_item">
                        <p>姓名:</p>
                        <el-input v-model="expertName" placeholder="请输入姓名" clearable></el-input>
                    </div>
                    <div class="input_item">
                        <p>身份证号码:</p>
                        <el-input v-model="idNumber" placeholder="请输入身份证号码" clearable></el-input>
                    </div>
                    <div style="width:100px;">
                        <button class="owner_btn">查询</button>
                    </div>
                </div>
                <div class="find_main">
                    <div class="find_table">
                        <el-table
                            ref="multipleTable"
                            :data="peopleData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handlePeopleChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                label="序号">
                                <template slot-scope="scope">{{ scope.$index+1 }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="expertName"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
                                prop="idNumber"
                                label="身份证号码">
                            </el-table-column>
                            <el-table-column
                                prop="company"
                                label="单位名称">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagination" v-if="this.pages>1">
                        <el-pagination
                            @size-change="handleSizeChangeItem"
                            @current-change="handleCurrentChangeItem"
                            :current-page.sync="currentPageItem"
                            :page-size="pageSizeItem"
                            layout="total, prev, pager, next, jumper"
                            :total="totalItem">
                        </el-pagination>
                    </div>   
                </div>
                <div class="find_btn">
                    <div class="sure_btn" @click="choiseSure">确定选择</div>
                </div>
            </div>
        </div>
        <!-- 新增人员 -->
        <div class="addWrapper" v-show="addFlag">
            <div class="addBox">
                <div class="add_title">
                    <p>新增人员</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeAdd"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="savePerson">保存</button>
                </div>
                <el-collapse v-model="activeName" accordion>
                    <!-- 人员信息 -->
                    <el-collapse-item title="人员信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">姓名：</div>
                                    <div class="editContent">
                                        <el-input v-model="staffName" clearable></el-input>
                                     </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">身份证号码：</div>
                                    <div class="editContent">
                                        <el-input v-model="idCardNumber" clearable @blur="blurIdNumber"></el-input>
                                     </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">人员类型：</div>
                                    <div class="editContent">
                                        <el-select v-model="staffType">
                                            <el-option label="甲方人员" value="甲方人员"></el-option>
                                            <el-option label="代理人员" value="代理人员"></el-option>
                                            <el-option label="工作人员" value="工作人员"></el-option>
                                            <el-option label="其他人员" value="其他人员"></el-option>
                                        </el-select>
                                     </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">职务：</div>
                                    <div class="editContent">
                                        <el-input v-model="staffDuty" clearable></el-input>
                                     </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">单位名称：</div>
                                    <div class="editContent">
                                         <el-input v-model="staffCompany" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">联系电话：</div>
                                    <div class="editContent">
                                         <el-input v-model="staffPhone" clearable @blur="blurPhone"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 查看新增人员 -->
        <div class="addWrapper" v-show="lookFlag">
            <div class="addBox">
                <div class="add_title">
                    <p>查看人员</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeAdd"></i>
                </div>
                <el-collapse v-model="activeName" accordion>
                    <!-- 人员信息 -->
                    <el-collapse-item title="人员信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">姓名：</div>
                                    <div class="editContent">{{staffName}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">身份证号码：</div>
                                    <div class="editContent">{{idCardNumber}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">人员类型：</div>
                                    <div class="editContent">{{staffType}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">职务：</div>
                                    <div class="editContent">{{staffDuty}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">单位名称：</div>
                                    <div class="editContent">{{staffCompany}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">联系电话：</div>
                                    <div class="editContent">{{staffPhone}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 修改人员 -->
        <div class="addWrapper" v-show="modifyFlag">
            <div class="addBox">
                <div class="add_title">
                    <p>修改人员</p>
                    <i class="el-icon-close" style="cursor:pointer;" @click="closeAdd"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="saveModifyPerson">保存</button>
                </div>
                <el-collapse v-model="activeName" accordion>
                    <!-- 人员信息 -->
                    <el-collapse-item title="人员信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">姓名：</div>
                                    <div class="editContent">
                                        <el-input v-model="staffName" clearable></el-input>
                                     </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">身份证号码：</div>
                                    <div class="editContent">
                                        <el-input v-model="idCardNumber" clearable @blur="blurIdNumber"></el-input>
                                     </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">人员类型：</div>
                                    <div class="editContent">
                                        <el-select v-model="staffType">
                                            <el-option label="甲方人员" value="甲方人员"></el-option>
                                            <el-option label="代理人员" value="代理人员"></el-option>
                                            <el-option label="工作人员" value="工作人员"></el-option>
                                            <el-option label="其他人员" value="其他人员"></el-option>
                                        </el-select>
                                     </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">职务：</div>
                                    <div class="editContent">
                                        <el-input v-model="staffDuty" clearable></el-input>
                                     </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">单位名称：</div>
                                    <div class="editContent">
                                         <el-input v-model="staffCompany" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">联系电话：</div>
                                    <div class="editContent">
                                         <el-input v-model="staffPhone" clearable @blur="blurPhone"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 录入详细情况 -->
        <div class="detailsWrapper" v-show="detailsFlag">
            <div class="detailsBox">
                <div class="details_title">
                    <p>录入详细情况</p>
                     <i class="el-icon-close" style="cursor:pointer;" @click="closeDetails"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="submitDetail">保存</button>
                </div>
               <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 单位信息 -->
                        <el-collapse-item title="单位信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">单位名称：</div>
                                        <div class="editContent"> 
                                            <el-input v-model="companyName" disabled="disabled"></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName"></div>
                                        <div class="editContent"></div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">
                                            <el-input v-model="projectLeader" disabled="disabled"></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">法定授权人</div>
                                        <div class="editContent">
                                            <el-input v-model="statutoryAuthorizer" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 标书信息 -->
                        <el-collapse-item title="标书信息" name="2">
                            <div class="edit_list">
                               <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">报价(元)费率(%)：</div>
                                        <div class="editContent">
                                            <el-input v-model="offer" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">工期：</div>
                                        <div class="editContent">
                                            <el-input v-model="constructionPeriod" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">缴纳保证金金额(元)：</div>
                                        <div class="editContent">
                                            <el-input v-model="payDepositAmount" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">质量要求：</div>
                                        <div class="editContent">
                                            <el-input v-model="qualityRequirement" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">标书密封情况：</div>
                                        <div class="editContent">
                                            <el-select v-model="sealingTenders" >
                                                <el-option label="完整" value="完整"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">投标文件电子格式：</div>
                                        <div class="editContent">
                                            <el-select v-model="electronicFormat">
                                                <el-option label="无" value="无"></el-option>
                                                <el-option label="光盘" value="光盘"></el-option>
                                                <el-option label="移动存储" value="移动存储"></el-option>
                                                <el-option label="其他介质" value="其他介质"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">报价方式：</div>
                                        <div class="editContent">
                                            <el-select v-model="quotationMethod">
                                                <el-option label="总价报价" value="总价报价"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">
                                            <el-input v-model="notesTender" type="textarea" :rows="3" ></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/css/style.css'
    import baseUrl from '../../api/api'
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    import {formatDate,changeTime,isPoneAvailable,getIdcard,getName, checkNumber,checkPhone} from '../../api/base.js'
    import dayjs from "dayjs"
    export default {
        data(){
            return {
                activeName:['1','2','3','4','5','6'],
                tableData:[],
                multipleSelection:[],//多选框
                writeFlag:false,// 总包输入 列表
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
                // 招标信息 下边的分包信息(总包不显示 分包显示)
                breakBagFlag:false,
                tableData3:[],
                tenderData:[],//投标单位信息数据列表
                evaluationData:[],//评标室人员信息查询列表
                subpackageData:[],
                // 中标信息详情
                lookFlag:false,
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                totalProjectId:'',
                // 查找人员
                findFlag:false,
                name:'',
                idcard:'',
                type:'',
                // 分页器
                currentPage:1,// 当前页
                pageSize: 10, // 每页条数
                pageTotal: 0, //总页数
                total: 0, //总条数
                // 新增人员
                addFlag:false,
                // 删除人员
                deleteFlag:false,
                // 录入详细情况
                detailsFlag:false,
                // 让input框只读
                readonly: true,
                companyName:'',//单位名称
                projectLeader:'',//项目负责人
                statutoryAuthorizer:'',//法定授权人
                offer:'',//报价费率
                constructionPeriod:'',//工期
                qualityRequirement:'',//质量要求
                sealingTenders:'',//标书密封情况
                electronicFormat:'',//投标文件电子格式
                quotationMethod:'',//报价方式
                notesTender:'',//投标书备注
                payDepositAmount:'',//保证金金额
                bidInforId :'',//投标信息的主键id值
                staffName : '',//评标室人员姓名
                idCardNumber:'',//身份证号码
                staffType:'',//人员类型
                staffDuty:'',//职务
                staffCompany:'',//单位名称--评标室人员公司
                staffPhone:'',//联系电话
                staffId:[],//删除评标室人员主键id
                lookFlag:false,//查看评标室人员
                modifyFlag:false,//修改评标室人员
                carId:'',//修改评标室人员主键
                // 分页器
                currentPage:1,// 当前页
                pageSize: 10, // 每页条数
                pageTotal: 0, //总页数
                total: 0, //总条数
                totalPages:0,// 开标情况列表条数
                openData:[],// 评标列表
                radio:'未开标',// 单选框
                 name:'',// 分包名称 搜索
                number:'',// 入场项目分包编号 搜素
                expertName:'',//
                idNumber:'',
                peopleData:[],// 查找人员列表
                multipleSelectionPeople:[],// 多选框选中数据
                // 查找人员分页器
                totalItem:0,// 查找人员总数据
                currentPageItem:0,// 当前页
                pageSizeItem:10,// 每页条数
                pages:0,// 页数
            }
        },
        created(){
            if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                // 分包
                this.entrySubcontractNumber = this.totalProjectId;
                this.breakBagFlag = true;
                // this.getItemInfo();// 根据项目入场分包编号查询
            }else{
                // 总包
                this.projectCode = this.totalProjectId;
                this.breakBagFlag = false;
            }
            
            this.getSearchList();//招标信息查询信息列表
            this.getRoomPersonList();//评标室人员查询信息列表
            this.getInitList();// 开标信息列表
        },
		methods:{
             // 分页器
            handleSizeChange(val) {
                // 每页条数
            },
            handleCurrentChange(val) {
                // 当前页数
                this.currentPage = val;
                this.getInitList(); // 开标信息列表
            },
             // 查找人员分页器
            handleSizeChangeItem(val){

            },
            handleCurrentChangeItem(val) {
                // 当前页数
                this.currentPageItem = val;
                this.getPeopleData(); // 查找人员列表
            },
            //编号问题
            typeIndex(index) {
                return index + (this.currentPage - 1) * 10 + 1;
            },
             // 单选框
            changeRadio(){
                this.currentPage = 1;
                this.getInitList();//开标信息列表
                
            },
            searchList(){
                this.currentPage = 1;
                this.getInitList();//开标信息列表
                
            },
             // 编辑
            lookOver(row){
                this.writeFlag = true;
                this.totalProjectId = row.totalProjectId;
                this.entrySubcontractNumber = row.entrySubcontractNumber;
                this.getbiddingInfo(row.projectInformaPrimaryKeyId);// 招标项目信息
                this.getSearchList();// 投标单位信息查询列表
                this.getRoomPersonList(); // 进入评标室人员
            },
            closeWrite(){
                this.writeFlag = false;
            },
            //投标单位信息查询列表
            getSearchList(){
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
                        this.tenderData = res.data.data;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //保存投标详细修改状态
            submitDetail(){
                if(this.offer != '' && this.offer != null && !checkNumber(this.offer)){
                    this.$layer.msg('请输入正确的报价!');
                    return false;
                }else if(this.payDepositAmount !='' && this.payDepositAmount != null && !checkNumber(this.payDepositAmount)){
                    this.$layer.msg('请输入正确的缴纳金额!');
                    return false;
                }else{
                    this.$axios({
                        method:'POST',
                        url:baseUrl + '/bidInforController/update',
                        data:{
                            bidInforId :this.bidInforId,
                            statutoryAuthorizer:this.statutoryAuthorizer,
                            offer:this.offer,
                            payDepositAmount:this.payDepositAmount,
                            constructionPeriod:this.constructionPeriod,
                            qualityRequirement:this.qualityRequirement,
                            sealingTenders:this.sealingTenders,
                            electronicFormat:this.electronicFormat,
                            quotationMethod:this.quotationMethod,
                            notesTender:this.notesTender
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.getSearchList();
                            this.detailsFlag = false;
                        }else{
                            this.$layer.msg(res.data.msg);;
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            //评标室人员查询列表
            getRoomPersonList(){
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
                    url: baseUrl+"/evaluateStaffController/selectAll",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.evaluationData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //评标室新增人员
            savePerson(){
                if (this.idCardNumber !='' && !getIdcard(this.idCardNumber)){
                    this.$layer.msg('请输入正确的身份证!');
                    return false;
                }else if(this.staffPhone !='' &&!isPoneAvailable(this.staffPhone) && !checkPhone(this.staffPhone)){
                    this.$layer.msg('请输入正确的联系方式!');
                    return false;
                }else{
                    let object={}
                    if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                        // 入场项目分包编号
                        object={
                            entrySubcontractNumber:this.totalProjectId,
                            staffName:this.staffName,
                            idCardNumber:this.idCardNumber,
                            staffCompany:this.staffCompany,
                            staffPhone: this.staffPhone,
                            staffType :this.staffType,
                            staffDuty: this.staffDuty 
                        }
                    }else{
                        // 入场项目编号
                        object ={
                            projectCode:this.totalProjectId,
                            staffName:this.staffName,
                            idCardNumber:this.idCardNumber,
                            staffCompany:this.staffCompany,
                            staffPhone: this.staffPhone,
                            staffType :this.staffType,
                            staffDuty: this.staffDuty 
                        }
                    }
                    this.$axios({
                        method:'POST',
                        url:baseUrl + '/evaluateStaffController/saveEvaluateStaff',
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.getRoomPersonList();
                            this.addFlag = false;
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            //校验手机号联系方式
            blurPhone(){
                if(!isPoneAvailable(this.staffPhone) && !checkPhone(this.staffPhone)){
                    this.$layer.msg('请输入正确的联系方式');
                }
            },
            //校验身份证号
            blurIdNumber(){
                if(!getIdcard(this.idCardNumber)){
                    this.$layer.msg('请输入正确的身份证号码');
                }
            },
            
            //查看评标室人员
            lookDetail(row){
                this.lookFlag = true;
                this.staffName = row.staffName;
                this.idCardNumber = row.idCardNumber;
                this.staffType = row.staffType;
                this.staffDuty = row.staffDuty;
                this.staffCompany = row.staffCompany;
                this.staffPhone = row.staffPhone;
            },
            //修改评标室人员
            modifyDetail(row){
                this.modifyFlag = true;
                this.staffName = row.staffName;
                this.idCardNumber = row.idCardNumber;
                this.staffType = row.staffType;
                this.staffDuty = row.staffDuty;
                this.staffCompany = row.staffCompany;
                this.staffPhone = row.staffPhone;
                this.carId = row.staffId;
            },
            //修改中的保存按钮
            saveModifyPerson(){
                if (this.idCardNumber !='' && !getIdcard(this.idCardNumber)){
                    this.$layer.msg('请输入正确的身份证!');
                    return false;
                }else if(this.staffPhone !='' &&!isPoneAvailable(this.staffPhone) && !checkPhone(this.staffPhone)){
                    this.$layer.msg('请输入正确的联系方式!');
                    return false;
                }else{
                    this.$axios({
                        method:'POST',
                        url:baseUrl + '/evaluateStaffController/updateEvaluateStaff',
                        data:{
                            staffId:this.carId,
                            staffName:this.staffName,
                            idCardNumber:this.idCardNumber,
                            staffCompany:this.staffCompany,
                            staffPhone: this.staffPhone,
                            staffType :this.staffType,
                            staffDuty: this.staffDuty 
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.modifyFlag = false;
                            this.getRoomPersonList();
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            // 分页器
            handleSizeChange(val) {
                // 每页条数
            },
            handleCurrentChange(val) {
                // 当前页数
                this.currentPage = val;
                this.getInitList();// 开标情况列表
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
            // 录入详细情况 ---> 进入
            detailsInfo(row){
                this.detailsFlag = true;
                this.companyName = row.companyName;// 单位名称
                this.projectLeader = row.projectLeader;// 项目负责人
                this.statutoryAuthorizer = row.statutoryAuthorizer;// 法定授权人
                this.quotationMethod = row.quotationMethod ;
                this.offer = row.offer ;// 报价(元)费率(%)
                this.constructionPeriod = row.constructionPeriod ;//工期
                this.payDepositAmount = row.payDepositAmount ;//缴纳保证金金额
                this.qualityRequirement= row.qualityRequirement ;//质量要求
                this.sealingTenders = row.sealingTenders;//标书密封情况
                this.electronicFormat  = row.electronicFormat;//投标文件电子格式
                this.quotationMethod = row.quotationMethod ;//报价方式
                this.notesTender= row.notesTender;// 备注
                this.bidInforId = row.bidInforId ;
            },
            // 录入详细情况 ---> 关闭
            closeDetails(){
                this.detailsFlag = false;
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
                    }else{
                        this.$layer.msg(res.data.msg);;
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
                        this.$layer.msg(res.data.msg);;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 查找人员
            findPeople(){
                this.findFlag = true;
                this.getPeopleData();
            },
            // 查找人员多选框
            handlePeopleChange(val){
                this.multipleSelectionPeople = val;
            },
            // 人员列表
            getPeopleData(){
                let object = {};
                if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.totalProjectId,
                        expertName:this.expertName,
                        idNumber:this.idNumber
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.totalProjectId,
                        expertName:this.expertName,
                        idNumber:this.idNumber
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/ownerExpertsController/selectStaff',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        let arrList = res.data.data.list;
                        // 做一个过滤条件
                        if(this.evaluationData.length>0){
                            for(let i=0; i<arrList.length;i++){
                                for(let j=0;j<this.evaluationData.length;j++){
                                    if(arrList[i].idNumber == this.evaluationData[j].idCardNumber){
                                        arrList.splice(i,1);
                                        this.peopleData = arrList;
                                    }
                                }
                            }
                        }else{
                             this.peopleData = arrList;
                        }
                        this.totalItem = res.data.data.total;// 总数
                        this.pages = res.data.data.pages;// 页数
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 查找人员 ---> 关闭
            closeFind(){
                this.findFlag = false;
            },
            // 查找人员 ---> 确定选择
            choiseSure(){
                if(this.evaluationData.length>0){
                    for(let i=0;i<this.evaluationData.length;i++){
                        for (let j = 0; j < this.multipleSelectionPeople.length; j++) {
                            if(this.evaluationData[i].idCardNumber == this.multipleSelectionPeople[j].idNumber){
                                this.$layer.msg('该评标室人员已添加!');
                                return false;
                            }
                        }
                    }
                    let object = {};
                    if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                        // 入场项目分包编号
                        object={
                            entrySubcontractNumber:this.totalProjectId,
                            listStaff:this.multipleSelectionPeople
                        }
                    }else{
                        // 入场项目编号
                        object ={
                            projectCode:this.totalProjectId,
                            listStaff:this.multipleSelectionPeople
                        }
                    }
                
                    this.$axios({
                        method:'POST',
                        url:baseUrl+'/evaluateStaffController/saveStaffFromExperts',
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.findFlag = false; 
                            this.getRoomPersonList(); // 进入评标室人员
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    })
                }else{
                    let object = {};
                    if(this.totalProjectId.indexOf("-") != -1 && this.totalProjectId!=null){
                        // 入场项目分包编号
                        object={
                            entrySubcontractNumber:this.totalProjectId,
                            listStaff:this.multipleSelectionPeople
                        }
                    }else{
                        // 入场项目编号
                        object ={
                            projectCode:this.totalProjectId,
                            listStaff:this.multipleSelectionPeople
                        }
                    }
                
                    this.$axios({
                        method:'POST',
                        url:baseUrl+'/evaluateStaffController/saveStaffFromExperts',
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.findFlag = false; 
                            this.getRoomPersonList(); // 进入评标室人员
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    })
                }
               

            },
            // 新增人员
            addPeople(){
                this.addFlag = true;
                this.staffName ='';
                this.idCardNumber = '';
                this.staffType ='';
                this.staffDuty = '';
                this.staffCompany ='';
                this.staffPhone = '';
                this.carId ='';
            },
            // 新增人员 ---> 关闭
            closeAdd(){
                 this.addFlag = false;
                 this.lookFlag = false;
                 this.modifyFlag = false;
            },
            //评标室删除框
            handleChange(val){
                let deleteArr = [];
                for(let i in val){
                    deleteArr.push(val[i].staffId);
                }
                this.staffId  = deleteArr;
            },
            // 删除人员
            deletePeople(){
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/evaluateStaffController/delete',
                    data:{
                        staffId : this.staffId
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getRoomPersonList();
                        for(var i=0;i<this.evaluationData.length;i++){
                            for(var j=0;j<this.staffId.length;j++){
                                if(this.evaluationData[i].staffId == this.staffId[j]){
                                    this.evaluationData.splice(i,1);
                                }
                            }
                        }
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
             // 开标信息列表
            getInitList(){
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selfTenderListForOpenTender",
                    data:{
                        pageNo:this.currentPage,
                        pageSize:this.pageSize,
                        bidOpenState:this.radio,
                        totalProjectId:this.number,
                        nameOfTenderProject:this.name
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.openData = res.data.data.data;
                        this.openData.forEach(item=>{
                            this.totalPages = item.totalPages;
                        })
                        this.total = res.data.data.data[0].total;
                    }else{
                        this.$layer.msg(res.data.msg);;
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
.wrapper,.nextWrapper{
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
/* 检索页面 */
.findWrapper,.addWrapper,.winWrapper,.detailsWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top:0;
    background: rgba(0, 0, 0, .2);
    z-index: 999;
    padding:30px 50px;
    display: flex;
    flex-direction: column;
	
}
.addBox,.winBox,.detailsBox,.wrapperBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.win_title,.find_title,.add_title,.details_title,.wrapper_title{
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
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px 0 2px;
}
.main_info{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
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
/* 查找人员 头部 */
.findBox{
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
	overflow: hidden;
	overflow-y: scroll;
}
.find_write{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}
.input_item{
    width: 450px;
    display: flex;
    align-items: center;
}
.input_item>.el-input{
    width: 200px !important;
}
.input_item p{
    width:130px;
    text-align:right;
    padding: 0 5px;
}
.input_button{
    height: 38px;
    padding:0 30px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
/* 查找人员 主体内容 */
.find_main{
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.find_table{
    width: 100%;
    height: 500px;
}
.pagination{
    padding: 0 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
/* 查找人员 页脚 */
.find_btn {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sure_btn{
    height: 40px;
    line-height: 40px;
    padding:0 10px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
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
/* 弹性盒flex-end */
.boxTitle{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px 0 0;
    background: #e2e2e2;
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