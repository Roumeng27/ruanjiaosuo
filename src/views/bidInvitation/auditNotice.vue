<template>
  <div class="myDiv">
    <!-- 头部 -->
    <div class="head_box">
        <div class="head_l" @click="newManage()">新建资审公告</div>
        <div>
            <el-radio v-model="radio" label="1">全部</el-radio>
            <el-radio v-model="radio" label="2">编辑中</el-radio>
            <el-radio v-model="radio" label="3">代办理</el-radio>
            <el-radio v-model="radio" label="4">办理通过</el-radio>
            <el-radio v-model="radio" label="5">办理未通过</el-radio>
        </div>    
    </div>
    <div class="head_bottom">
      <span class="head_b_b">招标项目(分包)名称：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
      <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalProjectId" placeholder="请输入内容"></el-input></span>
      <span><button class="btn" @click="searchList()">搜索</button></span>
    </div>
    <!-- 主体 -->
    <div class="main_box">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" width="70" label="编号" :index="typeIndex">
          </el-table-column>
          <el-table-column prop="totalProjectId" label="入场(分包)编号" width="150">
          </el-table-column>
          <el-table-column prop="nameOfTenderProject" label="招标项目名称" width="120">
          </el-table-column>
          <el-table-column prop="biddingProjectNumber" label="分包名称">
          </el-table-column>
          <el-table-column prop="nameOfPurchaser" label="分包分类">
          </el-table-column>
          <el-table-column prop="state" label="状态">
          </el-table-column>
          <el-table-column prop="biddingProcurementMode" label="发布状态">
          </el-table-column>
          <el-table-column prop="biddingProcurementMode" label="公告截止时间">
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="look()">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <template>
        <Page :total="totalSize" :current="PageNum" :page-size='20' show-elevator @on-change="page" v-if="pageTotal>1"></Page>
      </template>
    </div>
    <!-- 新建资审公告弹框 -->
    <div class="mask" v-show="show"></div>
    <div  class="new_pro" v-show="show">
      <div class="new_head">
        <div style="padding-left:10px;">挑选分包</div>
        <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
      </div>
      <!-- 新增主体表格 -->
      <div class="new_table">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="selection" width="55" align='center'>
            </el-table-column>
            <el-table-column type="index" width="70" label="编号" :index="typeIndex">
            </el-table-column>
            <el-table-column prop="admissionNum" label="入场项目编号" width="120">
            </el-table-column>
            <el-table-column prop="name" label="招标项目名称">
            </el-table-column>
            <el-table-column prop="tendNum" label="分包名称">
            </el-table-column>
            <el-table-column prop="purchaser" label="分包分类">
            </el-table-column>
            <el-table-column prop="mode" label="招标方式">
            </el-table-column>
            <el-table-column prop="mode" label="分包控制金额(万元)">
            </el-table-column>
            <el-table-column prop="state" label="分包状态">
            </el-table-column>
        </el-table>
      </div>
      <div style="width:100%;text-align:center;position:fixed;left:0;bottom:10px;">
        <el-button type="primary" @click="sureChoose()">确定选择</el-button>
      </div>
    </div>
    <!-- 点击确定选——-新增资审公告弹框上一步 -->
    <div class="mask1" v-show="backShow"></div>
    <div  class="new_pro new_pro_top" v-show="backShow">
      <div class="new_head">
          <div style="padding-left:10px;">新增资审公告</div>
          <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
      </div>
      <div class="new_nav">
          <button class="nav_co nav_save">保存</button>
          <button class="nav_co nav_next" @click="nextTo()">下一步</button>
      </div>
      <div class="main top_box">
          <el-collapse v-model="activeName" accordion>
             <!-- 招标项目信息-->
              <el-collapse-item title="招标项目信息" name="1">
                  <div class="new_m_b">
                      <div class="new_m_b2">
                          <!--名称  -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">招标项目名称：</div>
                                  <div class="noteFlex">
                                      <span>{{nameOfTenderProject}}</span>
                                  </div>
                              </div>
                          </div>
                          <!-- 采购人及金额 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">招标(采购)人：</div>
                                  <div class="noteFlex">
                                      <span>{{nameOfPurchaser}}</span>
                                  </div>
                              <div style="display: inline-flex;margin-left:30px;width:50%;">
                                  <span style="width:130px;">招标项目金额(万元)：</span>
                                  <span>{{amountOfBiddingProject}}</span>
                              </div>
                              </div>
                          </div>
                          <!-- 招标及入场编号 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">招标项目编号：</div>
                                  <div class="noteFlex">
                                      <span>{{biddingProjectNumber}}</span>
                                  </div>
                              </div>
                          </div>
                          <!-- 地址 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">地址：</div>
                                  <div class="noteFlex">
                                      <el-input v-model="tendereeAddress"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!-- 联系方式 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">联系方式：</div>
                                  <div class="noteFlex">
                                      <el-input v-model="tendereePhone"></el-input>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </el-collapse-item>
              <!-- 分包信息 -->
              <el-collapse-item title="分包信息" name="2" >
                  <div>
                      <div style="padding-left:10px;font-weight:bold;">若需添加多分包，请点击<i class="el-icon-plus"  @click="addSubpack()" style="font-size:24px;cursor:pointer;"></i>按钮</div>
                      <div class="table_box">
                          <el-table :data="subpackgeData" stripe style="width: 100%">
                              <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                              </el-table-column>
                              <el-table-column prop="subcontractName" label="分包名称">
                              </el-table-column>
                              <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)" width="100">
                              </el-table-column>
                              <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号">
                              </el-table-column>
                              <el-table-column prop="operation" label="查看">
                                  <template slot-scope="scope">
                                      <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                  </template>
                              </el-table-column>
                              <el-table-column prop="operation" label="招标内容">
                                  <template slot-scope="scope">
                                      <i class="el-icon-edit" style="cursor:pointer;" @click="auditEditFile(scope.row)"></i>
                                  </template>
                              </el-table-column>
                              <el-table-column prop="operation" label="删除">
                                  <template slot-scope="scope">
                                      <i class="el-icon-close" style="cursor:pointer;"  @click="deleteTable(scope.row)"></i>
                                  </template>
                              </el-table-column>
                          </el-table>
                      </div>
                  </div>
              </el-collapse-item>
              <!-- 招标内容 -->
              <el-collapse-item title="招标内容" name="2">
                  <div class="new_m_b">
                      <div class="new_m_b2">
                          <!-- 内容 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">招标内容：</div>
                                  <div class="noteFlex">
                                      <el-input v-model="noticeName"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!-- 采购数量及用途 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">采购数量：</div>
                                  <div class="noteFlex">
                                  <el-input v-model="purchaseAmount"></el-input>
                                  </div>
                              <div style="display: inline-flex;margin-left:30px;width:50%;">
                                  <span style="width:130px;">采购用途：</span>
                                  <el-input v-model="purchasePurposes"></el-input>
                              </div>
                              </div>
                          </div>
                          <!--申请人资格条件  -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">申请人资格条件：</div>
                                  <div class="noteFlex">
                                      <el-input v-model="applicantQualifications"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!-- 简要技术要求 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">简要技术要求：</div>
                                  <div class="noteFlex">
                                      <el-input v-model="technologyQualifications"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!-- 设置报名要求 -->
                          <div class="editItem">
                              <div class="editTextarea">
                                  <div class="editName">设置报名要求：</div>
                                  <div class="editMain">
                                      <div class="mainItem"> 
                                          <div class="item">
                                              <p>企业资质要求</p>
                                              <el-button @click="newCertificate()">新增资质</el-button>
                                          </div>
                                          <div class="itemBox" v-if="this.certificateBox.length>0">
                                              <table width='100%' cellspacing="0" cellpadding="0" align="center" border="0" valign="center">
                                                  <tbody>
                                                      <tr style="height:30px;">
                                                          <td class="GridTitle Room">序号</td>
                                                          <td class="GridTitle Room">资质名称</td>
                                                          <td class="GridTitle Room">操作</td> 
                                                      </tr>
                                                      <tr style="height:32px;" v-for="(item,index) in certificateBox" :key="index">
                                                          <td class="GridContent">{{index+1}}</td>
                                                          <td class="GridContent">{{item.label}}</td>
                                                          <td class="GridContent" style="cursor:pointer;" @click="deleteInfoItem(item.qualificationId)">X</td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                      <div class="mainItem">
                                          <div class="item">
                                              <p>项目负责人资质要求</p>
                                              <el-button @click="newleader()">新增资质</el-button>
                                          </div>
                                          <div class="itemBox" v-if="this.leaderBox.length>0">
                                              <table width='100%' cellspacing="0" cellpadding="0" align="center" border="0" valign="center">
                                                  <tbody>
                                                      <tr style="height:30px;">
                                                          <td class="GridTitle Room">序号</td>
                                                          <td class="GridTitle Room">资质名称</td>
                                                          <td class="GridTitle Room">操作</td> 
                                                      </tr>
                                                      <tr style="height:32px;" v-for="(item,index) in leaderBox" :key="index">
                                                          <td class="GridContent">{{index+1}}</td>
                                                          <td class="GridContent">{{item.label}}</td>
                                                          <td class="GridContent" style="cursor:pointer;" @click="deleteInfoArea(item.qualificationId)">X</td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </el-collapse-item>
              <!-- 公告信息 -->
              <el-collapse-item title="公告信息" name="3">
                  <div class="new_m_b">
                      <div class="new_m_b2">
                          <!--名称  -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">公告名称：</div>
                                  <div class="noteFlex">
                                  <el-input v-model="noticeName"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!--时间  -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft"><span style="color:#f00;">*</span>报名时间：</div>
                                  <div class="noteFlex">
                                      <el-date-picker v-model="applicationTime" value-format="timestamp" type="datetimerange"  range-separator="至"  start-placeholder="报名开始日期"  end-placeholder="报名结束日期">
                                      </el-date-picker>
                                  </div>
                              </div>
                          </div>
                          <!-- 资格预审文件领取时间 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft" style="width:308px;"><span style="color:#f00;">*</span>资格预审文件领取时间：</div>
                                  <div class="noteTime">
                                      <div class="timeBox">
                                          <el-date-picker v-model="collectTime" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                          </el-date-picker>
                                      </div>
                                  </div>
                                  <div style="display: inline-flex;margin-left:5px;">
                                      <span style="width:55px;">上午</span>
                                      <div class="noteTime">
                                          <div class="timeBox" style="display:flex;">
                                              <el-time-select placeholder="开始" v-model="morningbegin" :picker-options="{ start: '08:00',  step: '00:30',  end: '12:30'}">
                                              </el-time-select>
                                              <span>-</span>
                                              <el-time-select placeholder="结束" v-model="morningend" :picker-options="{ start: '08:00',  step: '00:30',  end: '12:30'}">
                                              </el-time-select>
                                          </div>
                                      </div>
                                      <span style="width:55px;">下午</span>
                                      <div class="noteTime">
                                          <div class="timeBox"  style="display:flex;">
                                              <el-time-select
                                                  placeholder="开始"
                                                  v-model="afterbegin"
                                                  :picker-options="{
                                                      start: '12:30',
                                                      step: '00:30',
                                                      end: '17:30'
                                                  }">
                                              </el-time-select>
                                              <span>-</span>
                                              <el-time-select
                                                  placeholder="结束"
                                                  v-model="afterend"
                                                  :picker-options="{
                                                      start: '12:30',
                                                      step: '00:30',
                                                      end: '17:30'
                                                  }">
                                              </el-time-select>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <!--资格预审文件领取地点  -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">资格预审文件领取地点：</div>
                                  <div class="noteFlex">
                                  <el-input v-model="tenderDocumentsSaleSite"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!-- 招标文件工本费 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft"><span style="color:#f00;">*</span>文件工本费：</div>
                                  <div class="noteFlex">
                                  <el-input v-model="tenderDocumentsCost"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!-- 招标文件工本费接收账户 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">文件工本费接收账户：</div>
                                  <div class="noteFlex">
                                  <el-input v-model="costAcceptAccount" type="textarea"></el-input>
                                  </div>
                                  <div style="display: inline-flex;margin-left:30px;">
                                  <el-button>设置账户</el-button>
                                  </div>
                              </div>
                          </div>
                          <!-- 投标人需提交资料 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft"><span style="color:#f00;">*</span>投标人需提交资料：</div>
                                  <div class="noteFlex">
                                  <el-input v-model="bidderData"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!-- 递交截止时间 -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">递交申请文件截止时间：</div>
                                  <div class="noteFlex">
                                      <el-date-picker v-model="submitTime" value-format="timestamp" type="datetime" placeholder="选择日期时间">
                                      </el-date-picker>
                                  </div>
                              </div>
                          </div>
                          <!--递交投标文件地点  -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">递交投标文件地点：</div>
                                  <div class="noteFlex">
                                  <span>软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦(中发智造)五层）</span>
                                  </div>
                              </div>
                          </div>
                          <!--负责人和联系方式  -->
                          <div class="noteBox">
                              <div class="noteContent">
                                  <div class="noteLeft">项目负责人：</div>
                                  <div class="noteFlex">
                                      <el-input v-model="projectLeader"></el-input>
                                  </div>
                                  <div style="display: inline-flex;margin-left:30px;width:50%;">
                                      <span style="width:130px;">联系方式:</span>
                                      <el-input v-model="projectLeaderPhone" @blur="blurPhone()"></el-input>
                                  </div>
                              </div>
                          </div>
                          <!-- 备注 -->
                          <div class="noteBox" style="margin-bottom:10px;">
                              <div class="noteContent">
                                  <div class="noteLeft">备注：</div>
                                  <div class="noteFlex">
                                  <el-input v-model="remark"></el-input>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </el-collapse-item>
          </el-collapse>
      </div>
    </div>
    <!-- 下一步弹框 -->
    <div class="mask1" v-show="nextShow"></div>
    <div  class="new_pro new_pro_top" v-show="nextShow">
      <div class="new_head">
          <div style="padding-left:10px;">查看资审公告</div>
          <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
      </div>
      <div class="new_nav">
          <button class="nav_co nav_save">提交</button>
          <button class="nav_co nav_next" @click="backTo()">上一步</button>
      </div>
      <div class="main top_box">
          <el-collapse v-model="activeName1" accordion>
            <!-- 招标项目信息-->
            <el-collapse-item title="招标项目信息" name="1">
                <div class="new_m_b">
                    <div class="new_m_b2">
                        <!--名称  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">招标项目名称：</div>
                                <div class="noteFlex">
                                    <span>{{nameOfTenderProject}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 采购人及金额 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">招标(采购)人：</div>
                                <div class="noteFlex">
                                    <span>{{nameOfPurchaser}}</span>
                                </div>
                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                <span style="width:130px;">招标项目金额(万元)：</span>
                                <span>{{amountOfBiddingProject}}</span>
                            </div>
                            </div>
                        </div>
                        <!-- 招标及入场编号 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">招标项目编号：</div>
                                <div class="noteFlex">
                                    <span>{{biddingProjectNumber}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 地址 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">地址：</div>
                                <div class="noteFlex">
                                    <span>{{tendereeAddress}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 联系方式 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">联系方式：</div>
                                <div class="noteFlex">
                                    <span>{{tendereePhone}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <!-- 附件 -->
            <el-collapse-item title="附件" name="2">
                <div class="new_m_b">
                    <div class="new_m_b2">
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column prop="appendixName" label="附件名称" width="200">
                        </el-table-column>
                        <el-table-column label="附件列表(点击查看)">
                        <template slot-scope="scope">
                            <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="temLi">
                                {{item.fileName}}
                            </li>
                        </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <i class="el-icon-setting"  style="cursor: pointer;" @click="shezhi()"></i>
                        </template>
                        </el-table-column>
                    </el-table>
                    </div>
                </div>
            </el-collapse-item>
            <!-- 分包信息 -->
            <el-collapse-item title="分包信息" name="2">
                <div  class="table_box">
                    <el-table :data="subpackgeData" stripe style="width: 100%">
                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="subcontractName" label="分包名称">
                        </el-table-column>
                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)" width="100">
                        </el-table-column>
                        <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号">
                        </el-table-column>
                        <el-table-column prop="operation" label="查看">
                            <template slot-scope="scope">
                                <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operation" label="招标内容">
                            <template slot-scope="scope">
                                <i class="el-icon-search" style="cursor:pointer;" @click="lookEditFile(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
            <!-- 招标内容 -->
            <el-collapse-item title="招标内容" name="3">
                <div class="new_m_b">
                    <div class="new_m_b2">
                        <!-- 内容 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">招标内容：</div>
                                <div class="noteFlex">
                                    <span>{{noticeName}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 采购数量及用途 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">采购数量：</div>
                                <div class="noteFlex">
                                <span>{{purchaseAmount}}</span>
                                </div>
                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                <span style="width:130px;">采购用途：</span>
                                <span>{{purchasePurposes}}</span>
                            </div>
                            </div>
                        </div>
                        <!--申请人资格条件  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">申请人资格条件：</div>
                                <div class="noteFlex">
                                    <span>{{applicantQualifications}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 简要技术要求 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">简要技术要求：</div>
                                <div class="noteFlex">
                                    <span>{{technologyQualifications}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 企业资质要求 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">企业资质要求：</div>
                                <div class="noteFlex">
                                    <span>{{companyQualifications}}</span>
                                </div>
                            </div>
                        </div>
                        <!--项目负责人资质要求  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">项目负责人资质要求：</div>
                                <div class="noteFlex">
                                    <span>{{managerQualifications}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <!-- 公告信息 -->
            <el-collapse-item title="公告信息" name="4">
                <div class="new_m_b">
                    <div class="new_m_b2">
                        <!--名称  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">公告名称：</div>
                                <div class="noteFlex">
                                    <span>{{noticeName}}</span>
                                </div>
                            </div>
                        </div>
                        <!--时间  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">报名开始时间：</div>
                                <div class="noteFlex">
                                    <span>{{enrollStartTime}}</span>
                                </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">报名结束时间:</span>
                                    <span>{{enrollEndTime}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 资格预审文件领取时间 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">资格预审文件领取时间：</div>
                                <div class="noteFlex">
                                    <span>{{saleReceiveStartDate}}到{{saleReceiveEndDate}} 上午{{morningbegin}}到{{morningend}}，下午{{afterbegin}}到{{afterend}}</span>
                                </div>
                            </div>
                        </div>
                        <!--资格预审文件领取地点  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">资格预审文件领取地点：</div>
                                <div class="noteFlex">
                                    <span>{{tenderDocumentsSaleSite}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 招标文件工本费 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">文件工本费：</div>
                                <div class="noteFlex">
                                <span>{{tenderDocumentsCost}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 招标文件工本费 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">工本费接收账户ID：</div>
                                <div class="noteFlex">
                                <span>{{costAcceptAccount}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 投标人需提交资料 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">投标人需提交资料：</div>
                                <div class="noteFlex">
                                    <span>{{bidderData}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 递交截止时间 -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">递交申请文件截止时间：</div>
                                <div class="noteFlex">
                                    <span>{{submitTime}}</span>
                                </div>
                            </div>
                        </div>
                        <!--递交投标文件地点  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">递交投标文件地点：</div>
                                <div class="noteFlex">
                                <span>软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦(中发智造)五层）</span>
                                </div>
                            </div>
                        </div>
                        <!--负责人和联系方式  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">项目负责人：</div>
                                <div class="noteFlex">
                                    <span>{{projectLeader}}</span>
                                </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">联系方式:</span>
                                    <span>{{projectLeaderPhone}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 备注 -->
                        <div class="noteBox" style="margin-bottom:10px;">
                            <div class="noteContent">
                                <div class="noteLeft">备注：</div>
                                <div class="noteFlex">
                                    <span>{{remark}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <!-- 公告内容 -->
            <el-collapse-item title="公告内容" name="5">
                <div class="new_m_b">
                    <div class="new_m_b2" style="width:80%;">
                    <div class="fail_box">
                        <div>{{noticeName}}</div>
                        <div>资格预审公告</div>
                        <div style="font-size:14px;font-weight:normal;color:#333;">{{updateTime}}</div>
                    </div>
                    <!-- 公告名称 -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">招标项目名称：</div>
                        <div class="noteFlex">
                            <span>{{nameOfTenderProject}}</span>
                        </div>
                        </div>
                    </div>
                    <!-- 招标项目编号 -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">招标项目编号：</div>
                        <div class="noteFlex">
                        <span>{{biddingProjectNumber}}</span>
                        </div>
                        </div>
                    </div>
                    <!-- 招标项目预算金额 -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">招标项目预算金额：</div>
                        <div class="noteFlex">
                            <span>{{budgetAmount}}</span>
                        </div>
                        </div>
                    </div>
                    <!-- 资金来源 -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft" style="width:220px;">资金来源：</div>
                            <div class="noteFlex">
                                <span>{{sourceOfFunds}}</span>
                            </div>
                        </div>
                    </div>
                    <!--资金比例  -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft" style="width:220px;">资金比例：</div>
                            <div class="noteFlex">
                                <span class="guoyou"><span>国有资金：<span>{{stateOwnedFunds}}</span>万元,<span>{{stateOwnedFundsPercentage}}</span>%;</span></span>
                                <span class="ziyou"><span>自有资金：<span>{{ownFunds}}</span>万元,<span>{{ownFundsPercentage}}</span>%;</span></span>
                                <span class="waiguo"><span>外国政府及组织资金：<span>{{foreignGovernmentsAndOrganizationalFunds}}</span>万元,<span>{{foreignGovernmentsAndOrganizationalFundsPercentage}}</span>%;</span></span>
                                <span class="jingwai"><span>境外人投资：<span>{{overseasPrivateInvestment}}</span>万元,<span>{{overseasPrivateInvestmentPercentage}}</span>%;</span></span>
                            </div>
                        </div>
                    </div>
                    <!-- 招标采购人 -->
                    <div style="font-weight: bold;">招标(采购)人</div>
                    <!--招标(采购)人全称  -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">招标(采购)人全称：</div>
                        <div class="noteFlex">
                            <span>{{nameOfPurchaser}}</span>
                        </div>
                        </div>
                    </div>
                    <!--地址  -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">招标(采购)人地址：</div>
                        <div class="noteFlex">
                            <span>{{tendereeAddress}}</span>
                        </div>
                        </div>
                    </div>
                    <!--联系方式  -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">招标(采购)人联系方式：</div>
                        <div class="noteFlex">
                        <span>{{tendereePhone}}</span>
                        </div>
                        </div>
                    </div>
                    <!--招标内容  -->
                    <div style="font-weight: bold;">招标内容</div>
                    <!-- 表格 -->
                    <table border="1"  cellspacing="0" cellpadding="0" style="width:99%;">
                        <tr>
                            <td>招标项目名称</td>
                            <td colspan="3">{{nameOfTenderProject}}</td>
                        </tr>
                        <tr>
                            <td>入场项目分包编号</td>
                            <td>{{totalProjectId}}</td>
                            <td>分包控制金额</td>
                            <td>{{subcontractingControlAmount}}</td>
                        </tr>
                        <tr>
                            <td>用途</td>
                            <td>哈哈哈</td>
                            <td>数量</td>
                            <td>666</td>
                        </tr>
                        <tr>
                            <td colspan="4">申请人资格条件</td>
                        </tr>
                        <tr>
                            <td colspan="4" height="50px">{{applicantQualifications}}</td>
                        </tr>
                        <tr>
                            <td colspan="4">简要技术要求</td>
                        </tr>
                        <tr>
                            <td colspan="4" height="50px">{{technologyQualifications}}</td>
                        </tr>
                    </table>
                    <!-- 资格预审文件领取 -->
                    <div style="font-weight: bold;">资格预审文件领取</div>
                    <!-- 资格预审文件领取时间 -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">资格预审文件领取时间：</div>
                        <div class="noteFlex">
                            <span>{{saleReceiveStartDate}}</span>到<span>{{saleReceiveEndDate}}</span> 上午{{morningbegin}}到{{morningend}}，下午{{afterbegin}}到{{afterend}}
                        </div>
                        </div>
                    </div>
                    <!-- 资格预审文件发售地点 -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">资格预审文件发售地点：</div>
                        <div class="noteFlex">
                            <span>{{tenderDocumentsSaleSite}}</span>
                        </div>
                        </div>
                    </div>
                    <!--工本费  -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">文件工本费：</div>
                        <div class="noteFlex">
                            <span>{{tenderDocumentsCost}}</span>
                        </div>
                        </div>
                    </div>
                    <!--账户  -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">招文件工本费接收账户：</div>
                        <div class="noteFlex">
                            <span>{{costAcceptAccount}}</span>
                        </div>
                        </div>
                    </div>
                    <!--资料  -->
                    <div class="noteBox">
                        <div class="noteContent">
                        <div class="noteLeft">投标人需提交资料：</div>
                        <div class="noteFlex">
                            <span>{{bidderData}}</span>
                        </div>
                        </div>
                    </div>
                    <!--申请文件递交  -->
                    <div style="font-weight: bold;">申请文件递交</div>
                    <!-- 截止时间 -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft">递交申请文件截止时间：</div>
                            <div class="noteFlex">
                                <span>{{submitTime}}</span>
                            </div>
                        </div>
                    </div>
                    <!--递交投标文件地点  -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft">递交投标文件地点：</div>
                            <div class="noteFlex">
                            <span>软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦(中发智造)五层）</span>
                            </div>
                        </div>
                    </div>
                    <!--项目联系人  -->
                    <div class="noteBox">
                        <div class="noteContent" style="font-weight:bold;">
                        <div class="noteLeft">项目联系人：</div>
                        <div class="noteFlex">
                            <span>{{projectLeader}}</span>
                        </div>
                        </div>
                    </div>
                    <!--联系方式  -->
                    <div class="noteBox">
                        <div class="noteContent" style="font-weight:bold;">
                        <div class="noteLeft">联系方式：</div>
                        <div class="noteFlex">
                            <span>{{projectLeaderPhone}}</span>
                        </div>
                        </div>
                    </div>
                    <!-- 备注 -->
                    <div class="noteBox">
                        <div class="noteContent" style="font-weight:bold;">
                        <div class="noteLeft">备注：</div>
                        <div class="noteFlex">
                            <span>{{remark}}</span>
                        </div>
                        </div>
                    </div>
                    <!--名称和日期  -->
                    <div style="font-weight:bold;text-align:right;width:100%;">
                        <div>{{nameOfPurchaser}}</div>
                        <div>{{updateTime}}</div>
                    </div>
                    </div>
                </div>
            </el-collapse-item>
            <!-- 办理记录 -->
            <el-collapse-item title="办理记录" name="6">
                <div>
                    <el-table :data="handleRecordData" stripe style="width: 100%">
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
    <!-- 查看分包信息弹框 -->
    <div class="mask1" v-show="subcontractInforShow"></div>
    <div v-show="subcontractInforShow" class="fb_box">
        <div class="new_head">
            <div style="padding-left:10px;">查看分包信息</div>
            <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_main">
          <el-collapse v-model="activeName" accordion>
              <!-- 第一步 -->
              <el-collapse-item title="分包信息" name="2">
                  <div class="new_m_b">
                      <div class="new_m_b2">
                          <!--统一交易标志码  -->
                          <div class="noteBox">
                              <div class="noteContent">
                              <div class="noteLeft" style="color:#f00;">统一交易标志码：</div>
                              <div class="noteFlex">
                                  <span  style="color:#f00;"></span>
                              </div>
                              </div>
                          </div>
                          <!--入场项目分包编号  -->
                          <div class="noteBox">
                              <div class="noteContent">
                              <div class="noteLeft">入场项目分包编号：</div>
                              <div class="noteFlex">
                                  <span>{{entrySubcontractNumber}}</span>
                              </div>
                              </div>
                          </div>
                          <!-- 分包名称 -->
                          <div class="noteBox">
                              <div class="noteContent">
                              <div class="noteLeft">分包名称：</div>
                              <div class="noteFlex">
                                  <span>{{subcontractName}}</span>
                              </div>
                              </div>
                          </div>
                          <!-- 分包内容 -->
                          <div class="noteBox">
                              <div class="noteContent">
                              <div class="noteLeft">分包内容：</div>
                              <div class="noteFlex">
                                  <span>{{subcontractContents}}</span>
                              </div>
                              </div>
                          </div>
                          <!-- 招标范围 -->
                          <div class="noteBox">
                              <div class="noteContent">
                              <div class="noteLeft">招标范围：</div>
                              <div class="noteFlex">
                                  <span>{{scopeOfTender}}</span>
                              </div>
                              </div>
                          </div>
                          <!--分包控制金额及审查方式  -->
                          <div class="noteBox">
                              <div class="noteContent">
                              <div class="noteLeft">分包控制金额：</div>
                              <div class="noteFlex">
                                  <span>{{subcontractingControlAmount}}</span>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;width:50%;">
                                  <span style="width:100px;">资格审查方式：</span>
                                  <span>{{qualificationExaminationMethod}}</span>
                              </div>
                              </div>
                          </div>
                          <!--电子化开评标  -->
                          <div class="noteBox">
                              <div class="noteContent">
                              <div class="noteLeft">是否电子招投标：</div>
                              <div class="noteFlex">
                                  <span>{{electronicBidEvaluation}}</span>
                              </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </el-collapse-item>
          </el-collapse>
        </div>
    </div>
    <!-- 添加分包信息弹框 -->
    <div class="mask1" v-show="addInforShow"></div>
    <div v-show="addInforShow" class="fb_box">
        <div class="new_head">
            <div style="padding-left:10px;">分包信息</div>
            <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div style="margin-top:10px;">
            <el-table :data="bidSectionData" stripe style="width: 100%"   @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align='center'>
                </el-table-column>
                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                </el-table-column>
                <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                </el-table-column>
                <el-table-column  label="招标项目名称">
                    <template slot-scope="scope">
                        <span>{{pulicBids}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="subcontractName"  label="分包名称">
                </el-table-column>
                <el-table-column  prop="subcontractContents"  label="分包分类">
                </el-table-column>
                <el-table-column  label="招标方式">
                    <template slot-scope="scope">
                        <span>{{biddingMethod}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                </el-table-column>
                <el-table-column prop="subcontractingState" label="分包状态">
                </el-table-column>
            </el-table>
        </div>
        <div class="sureSelect">
            <button class="btn" style="width:125px;" @click="quedingSelec()">确定选择</button>
        </div>
    </div>
    <!-- 资审公告内容 -->
    <div class="mask1" v-show="auditNoticeShow"></div>
    <div v-show="auditNoticeShow" class="fb_box">
        <div class="new_head">
            <div style="padding-left:10px;">资审公告内容</div>
            <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_nav">
            <button class="nav_co nav_save" @click="saveNotice()">保存</button>
        </div>
        <div class="new_main">
            <el-collapse v-model="activeName" accordion>
                <!-- 招标项目信息-->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目名称：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 类型及金额 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目类型：</div>
                                    <div class="noteFlex">
                                        <span>{{typesOfBiddingProjects}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">招标项目金额(万元)：</span>
                                        <span>{{amountOfBiddingProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标及入场编号 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目编号：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProjectNumber}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">入场项目编号：</span>
                                        <span>{{totalProjectId}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购方式及组织方式 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标采购方式：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProcurementMode}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">招标组织方式：</span>
                                        <span>{{biddingOrganization}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 招标内容 -->
                <el-collapse-item title="招标内容" name="2">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!-- 内容 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标内容：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="nameOfTenderProject"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购数量及用途 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">采购数量：</div>
                                    <div class="noteFlex">
                                    <el-input v-model="purchaseAmount"></el-input>
                                    </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">采购用途：</span>
                                    <el-input v-model="purchasePurposes"></el-input>
                                </div>
                                </div>
                            </div>
                            <!--申请人资格条件  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">申请人资格条件：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="applicantQualifications"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 简要技术要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">简要技术要求：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="technologyQualifications"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!-- 设置报名要求 -->
                            <div class="noteBox" style="margin-top:5px;">
                                <div class="noteContent">
                                    <div class="noteLeft">设置报名要求：</div>
                                    <div style="padding-left:5px;width:40%;margin-right:4%;display:flex;justify-content:space-between;background:#e1e1e1;">
                                        <span>企业资质要求</span>
                                        <el-button>新增资质</el-button>
                                    </div>
                                    <div style="padding-left:5px;width:40%;display:flex;justify-content:space-between;background:#e1e1e1;gext-align:right;">
                                        <span>项目负责人资质要求</span>
                                        <el-button>新增资质</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
    <!-- 查看资审公告内容 -->
    <div class="mask1" v-show="lookNoticeShow"></div>
    <div v-show="lookNoticeShow" class="fb_box">
        <div class="new_head">
            <div style="padding-left:10px;">资审公告内容</div>
            <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_main">
            <el-collapse v-model="activeName" accordion>
                <!-- 招标项目信息-->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目名称：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 类型及金额 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目类型：</div>
                                    <div class="noteFlex">
                                        <span>{{typesOfBiddingProjects}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">招标项目金额(万元)：</span>
                                        <span>{{amountOfBiddingProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标及入场编号 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目编号：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProjectNumber}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">入场项目编号：</span>
                                        <span>{{totalProjectId}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购方式及组织方式 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标采购方式：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProcurementMode}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">招标组织方式：</span>
                                        <span>{{biddingOrganization}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 招标内容 -->
                <el-collapse-item title="招标内容" name="2">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!-- 内容 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标内容：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 采购数量及用途 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">采购数量：</div>
                                    <div class="noteFlex">
                                        <span>{{purchaseAmount}}</span>
                                    </div>
                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                    <span style="width:130px;">采购用途：</span>
                                    <span>{{purchasePurposes}}</span>
                                </div>
                                </div>
                            </div>
                            <!--申请人资格条件  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">申请人资格条件：</div>
                                    <div class="noteFlex">
                                        <span>{{applicantQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 简要技术要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">简要技术要求：</div>
                                    <div class="noteFlex">
                                        <span>{{technologyQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 设置报名要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">企业资质要求：</div>
                                    <div class="noteFlex">
                                        <span>{{companyQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 项目负责人资质要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">项目负责人资质要求：</div>
                                    <div class="noteFlex">
                                        <span>{{managerQualifications}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
    <!-- 企业资质要求 -->
    <div class="mask1" v-show="certificateFlag"></div>
    <div class="certificateWrapper" v-show="certificateFlag">
        <div class="certificateBox">
            <div class="certificate_title">
                <p>资质列表</p>
                <i class="el-icon-close" style="cursor:pointer;" @click="closeCertificate()"></i>
            </div>
            <div class="certificate_main">
                <el-tree
                    :data="certificateData"
                    show-checkbox
                    ref="DeviceGroupTree"
                    node-key="qualificationId"
                    :default-checked-keys="default_tree_arr"
                    check-strictly
                    @check="checkGroupNode()">
                </el-tree>
            </div>
        </div>
    </div>
    <!-- 项目负责人资质要求 -->
    <div class="mask1" v-show="leaderFlag"></div>
    <div class="certificateWrapper" v-show="leaderFlag">
        <div class="certificateBox">
            <div class="certificate_title">
                <p>项目负责人资质要求</p>
                <i class="el-icon-close"  style="cursor:pointer;"  @click="closeCertificate"></i>
            </div>
            <div class="certificate_main">
                <el-tree
                    :data="leaderData"
                    show-checkbox
                    ref="DeviceLeaderTree"
                    node-key="qualificationId"
                    :default-checked-keys="default_leader_arr"
                    check-strictly
                    @check="checkLeaderNode()">
                </el-tree>
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
  </div>
</template>

<script>
import baseUrl from '../../api/api'
import dayjs from "dayjs"
import {formatDate,formatTime,isEmpty,changeTime,isPoneAvailable,checkPhone,checkEmail,dubRemove} from '../../api/base.js'
export default {
  components:{},
  props:{},
  data(){
    return {
        submitBox:false,
        saveBox:false,
        default_leader_arr:[],
        leaderData:[],//项目负责人资质列表
        leaderFlag:false,//项目负责人资质
        default_tree_arr:[],
        certificateData:[],//企业资质列表
      certificateFlag:false,//企业资质弹框
      lookNoticeShow:false,//查看资审公告内容
      biddingOrganization:'',//招标组织方式
      typesOfBiddingProjects:'',//招标项目类型
      auditNoticeShow:false,//资审公告内容
      bidSectionData:[],//添加分包数据
      addInforShow:false,//添加分包信息弹框
      electronicBidEvaluation:'',//是否电子招投标
      qualificationExaminationMethod:'',//资格审查方式
      scopeOfTender:'',//分包范围
      subcontractContents:'',//分包内容
      subcontractName:'',//分包名称
      entrySubcontractNumber:'',//分包编号
      subcontractInforShow:false,//查看分包弹框
      stateOwnedFunds:'',//国有资金
      stateOwnedFundsPercentage:'',//国有资金百分比
      ownFunds:'',//自有资金
      ownFundsPercentage:'',//自有资金百分比
      foreignGovernmentsAndOrganizationalFunds:'',//外国政府资金
      foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国政府资金百分比
      overseasPrivateInvestment:'',//境外人投资
      overseasPrivateInvestmentPercentage:'',//境外人投资百分比
      subcontractingControlAmount:'',//分包控制金额
      handleRecordData:[],//办理记录
      sourceOfFunds:'',//资金来源
      budgetAmount:'',//招标项目预算金额
      updateTime:'',//时间
      companyQualifications:'',//企业资质要求
      managerQualifications:'',//项目负责人资质要求
      applicationTime:'',//报名时间
      enrollStartTime:'',//报名开始时间
      enrollEndTime:'',//报名结束时间
      collectTime:'',//资格预审文件领取时间
      saleReceiveStartDate:'',//资格预审领取开始时间
      saleReceiveEndDate:"",//结束时间
      morningbegin:'',//上午上
      morningend:'',//上午下
      afterbegin:'',//下午上
      afterend:'',//下午下
      tenderDocumentsSaleSite:'',//资审文件领取地点
      tenderDocumentsCost:'',//文件工本费
      costAcceptAccount:'',//账户
      bidderData:'',//投标人需提交资料
      submitTime:'',//递交截止时间
      projectLeader:'',//项目负责人
      projectLeaderPhone:'',//联系方式
      remark:'',//备注
      noticeName:'',//招标内容
      purchaseAmount:'',//采购数量
      purchasePurposes:'',//采购用途
      applicantQualifications:'',//申请人资格条件
      technologyQualifications:'',//简要技术要求
      certificateBox:[],//企业资质要求数据
      leaderBox:[],//项目负责人数据要求
      totalId:"",//搜索编号
      nameProject:"",//搜索分包名称
      totalProjectId:"",//入场项目编号
      nameOfTenderProject:"",//招标项目名称
      biddingProjectNumber:"",//招标项目编号
      nameOfPurchaser:"",//招标采购人
      biddingProcurementMode:"",//招标采购方式
      amountOfBiddingProject:'',//招标项目金额
      tendereeAddress:'',//地址
      tendereePhone:'',//联系方式
      state:"",//状态
      radio: "1", //头部单选框
      input: "", //头部输入框
      activeName:['1','2','3'],//上一步弹框,
      activeName1:['1','2','3','4','5','6'],
      PageNum:1,//当前页
      PageSize: 20, //每页条数
      pageTotal: 0, //总页数
      totalSize: 0, //总条数
      tableData:[
        {
            totalProjectId: '2016-05-02',
            nameOfTenderProject: '王小虎',
            biddingProjectNumber: '上海市普陀',
            nameOfPurchaser:'分类',
            state:'未通过',
            biddingProcurementMode:'未发布',
            biddingProcurementMode:'2019年3月1日'
          }
      ],//列表数据
      show:false,//新建资审公告弹框
      backShow:false,//上一步弹框
      nextShow:false,//下一步弹框
      enclosureData:[],//查看未通过数据列表
      enclosureData:[
            {
            id:1,
            appendixName: " 招标（采购）人确认函",
            attachlist: []
          },
          {
            id:2,
            appendixName: "资格预审公告",
            attachlist: []
          }
        ],//下一步附件数据
      options: [{
          value: '选项1',
          label: '未挑选'
        }, {
          value: '选项2',
          label: '已挑选'
        }],
      value1:'',
      subpackgeData:[],//分包信息数据
    }
  },
  watch:{},
  computed:{},
  methods:{
    //编号问题
    typeIndex(index) {
      return index + (this.PageNum - 1) * 20 + 1;
    },
    //分页
    page(val) {
      this.PageNum = val;
    },
    //新建资审公告弹框打开
    newManage(){
      this.show = true;
    },
    //确定选择按钮
    sureChoose(){
      this.backShow = true;
    },
    //下一步
    nextTo(){
      this.nextShow = true;
      this.backShow = false;
    },
    //上一步
    backTo(){
      this.backShow = true;
      this.nextShow = false;
    },
    handleSelectionChange(val){

    },
    close(){
      this.show = false;
      this.backShow = false;
      this.nextShow = false;
    },
    closeSubShow(){
      this.subcontractInforShow = false;
      this.addInforShow = false;
      this.auditNoticeShow = false;
      this.lookNoticeShow = false;
    },
    closeCertificate(){
        this.certificateFlag = false;
        this.leaderFlag = false;
    },
    handleClose(){
        this.saveBox = false;
        this.submitBox = false;
    },
    //校验手机号
    blurPhone(){
        if(!isPoneAvailable(this.projectLeaderPhone) && !checkPhone(this.projectLeaderPhone)){
            this.$layer.msg('请输入正确的联系方式！');
        }
    },
    
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
}
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 0 3px;
}
.head_l {
  padding: 2px 6px;
  background-color: #0095d5;
  color: #ffffff;
  cursor: pointer;
}
.head_bottom {
  width: 100%;
  text-align: center;
  margin: 1% 0;
  background: #f5f7fa;
}
.head_b_b > .el-input {
  width: 20% !important;
  height: 35px !important;
}
.btn {
  margin-left: 2%;
  padding: 8px 14px;
  background: #0095d5;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
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
.mask{
   z-index: 2;
}
.mask1{
  z-index: 4;
}
/* 新建项目 */
.new_pro {
  z-index: 3;
  background: #f0f4f6;
  width: 98%;
  height: 98%;
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate(-9%, -10%);
  overflow-y: hidden;
}
.new_pro_top{
  z-index: 5;
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
.nav_co {
  padding: 8px 20px;
  background-color: #0095d5;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
}
/* 查看 */
.new_main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
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
.fail_box{
  width:100%;
  margin:0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px dashed #333;
}
.top_box{
    width: 1100px;
    height:99%;
    margin: 0 auto;
    overflow: scroll;
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
    line-height: 40px;
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
.fb_box{
    width: 95%;
    height: 95%;
    z-index: 20;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background:#f0f4f6;
    overflow: hidden;
}
.sureSelect{
    position: fixed;
    bottom: 5%;
    left:50%;
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
    position: relative;
    overflow: hidden;
    overflow-y: scroll;
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
</style>