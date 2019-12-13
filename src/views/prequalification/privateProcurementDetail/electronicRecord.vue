<template>
    <div class="myDiv">
        <!-- 电子档案 -->
        <div  v-show="passJudgeShow"  style="height:100%;overflow-y:hidden;">
            <!-- 上一步弹框 -->
            <div v-show="writeFlag" class="backTop" style="height:100%;overflow-y:hidden;min-width:1200px;overflow-x:scroll;">
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="saveFile()">保存</button>
                    <button class="nav_co nav_next" @click="nextTo()">下一步</button>
                </div>
                <div class="new_main" style="height:99%;overflow-y:scroll;">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 项目注册 -->
                        <el-collapse-item title="项目注册" name="1">
                            <el-table :data="registrantionData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;" @click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购项目 -->
                        <el-collapse-item title="采购项目" name="2">
                            <el-table :data="biddingData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购公告 -->
                        <el-collapse-item title="采购公告" name="3">
                            <el-table :data="tenderNoticeData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购文件 -->
                        <el-collapse-item title="采购文件" name="4">
                            <el-table :data="documentsData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 成交结果公告 -->
                        <el-collapse-item title="成交结果公告" name="5">
                            <el-table :data="winningResultData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购控制价文件 -->
                        <el-collapse-item title="采购控制价文件" name="6">
                            <el-table :data="controlData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购人代表 -->
                        <el-collapse-item title="采购人代表" name="7">
                            <el-table :data="bidderJudgeData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 合同备案 -->
                        <el-collapse-item title="合同备案" name="8">
                            <el-table :data="recordlBidData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购异常 -->
                        <el-collapse-item title="采购异常" name="9">
                            <el-table :data="abnormalBidData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 需说明的事项 -->
                        <el-collapse-item title="需说明的事项" name="10">
                            <div>
                                <el-input v-model="itemsClarified" type="textarea"></el-input>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 下一步弹框 -->
            <div v-show="nextFlag" class="backTop" style="height:100%;overflow-y:hidden;min-width:1200px;overflow-x:scroll;">
                <div class="new_nav">
                    <button class="nav_co nav_next" @click="backTo()">上一步</button>
                    <button class="nav_co nav_save" @click="submitFile()">提交</button>
                </div>
                <div class="new_main" style="height:99%;overflow-y:scroll;">
                    <el-collapse v-model="activeName1" accordion>
                        <!-- 项目注册 -->
                        <el-collapse-item title="项目注册" name="1">
                            <el-table :data="registrantionData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' && eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;" @click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购项目 -->
                        <el-collapse-item title="采购项目" name="2">
                            <el-table :data="biddingData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' &&  eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购公告 -->
                        <el-collapse-item title="采购公告" name="3">
                            <el-table :data="tenderNoticeData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' &&  eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购文件 -->
                        <el-collapse-item title="采购文件" name="4">
                            <el-table :data="documentsData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' &&  eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 成交结果公告 -->
                        <el-collapse-item title="成交结果公告" name="5">
                            <el-table :data="winningResultData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' &&  eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购控制价文件 -->
                        <el-collapse-item title="采购控制价文件" name="6">
                            <el-table :data="controlData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' &&  eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;"@click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购人代表 -->
                        <el-collapse-item title="采购人代表" name="7">
                            <el-table :data="bidderJudgeData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' &&  eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;" @click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 合同备案 -->
                        <el-collapse-item title="合同备案" name="8">
                            <el-table :data="recordlBidData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist' style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;" @click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 采购异常 -->
                        <el-collapse-item title="采购异常" name="9">
                            <el-table :data="abnormalBidData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' &&  eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;" @click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 需说明的事项 -->
                        <el-collapse-item title="需说明的事项" name="10">
                            <div>
                                <span>{{itemsClarified}}</span>
                            </div>
                        </el-collapse-item>
                        <!-- 相关附件 -->
                        <el-collapse-item title="相关附件" name="11">
                            <el-table :data="relatedData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="电子件名称"  width="180">
                                </el-table-column>
                                <el-table-column label="电子件列表(点击查看)">
									<template slot-scope="scope">
										<li v-for='item in scope.row.attachlist'  style="cursor:pointer;" @click="downLoadupFile(item)" class="liItem">
										{{item.fileName}}
										</li>
									</template>
								</el-table-column>
                                <el-table-column prop="creationTime" label="管理"  v-if="eState != '待办理' &&  eState != '办理通过'">
                                    <template slot-scope="scope">
                                        <span style="color:blue;cursor:pointer;" @click="openFile(scope.row.id)">电子件管理</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="state" label="说明">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 办理记录 -->
						<el-collapse-item title="办理记录" name="12">
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
						</el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 上传文件 -->
            <div class="uploadWrapper" v-show="uploadFlag">
			<div class="uploadWrapperBox">
				<div class="uploadWrapper_title">
					<p>{{uploadTitle}}</p>
					<i class="el-icon-close" @click="closeUpload"></i>
				</div>
				<div class="upload_box">
					 <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
					 <button class="btn">上传</button>
					<button class="btn" @click="deleteFile">删除</button>
				</div>
				<div class="main_info" style="display:flex;flex-direction:column;">
					<el-table :data="fileData" style="width: 100%"  @selection-change="handleSelectionChange">
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
								<span class="upload" style="cursor:pointer;" @click="downloadFile(scope.row.attachmeId,scope.row.fileName)">点击下载</span>
							</template>
						</el-table-column>
					</el-table>
					<p class="star">★：附件上传大小限制为102400000 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
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
        <div v-show="frameShow">
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
        
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import dayjs from "dayjs"
  export default {
    data() {
        return {
            str_entrust_type:window.sessionStorage.str_entrust_type,
            role_types:window.localStorage.role_types,
            eState:'',
            alertMsg:'',
            cancelShow:false,
            item:'',
            fileName:'',
            biddingProcurementMode:'',//招标类型
            qualificationExaminationMethod:'',//后审、预审
            saveBox:false,
            submitBox:false,
            projectObj:JSON.parse(window.localStorage.projectObj),
            eRecordId:'',
            value:'',
            num:'',
            passJudgeShow:true,
            frameShow: false,
            writeFlag:true,//上一步弹框
            nextFlag:false,//下一步弹框
            uploadFlag:false,//上传文件弹框
            activeName:['1','2','3','4','5','6','7','8','9','10'],
            activeName1:['1','2','3','4','5','6','7','8','9','10','11'],
            //项目注册
            registrantionData:[ 
				{
					id:2,
					appendixName: "*委托代理协议",
                    attachlist: [],
                    state:'委托代理协议'
                },
                {
					id:3,
					appendixName: "*立项批复文件",
					attachlist: []
                },
                {
					id:4,
					appendixName: "项目负责人授权书",
					attachlist: []
                },
            ],
            //招标项目
            biddingData:[
                {
                    id:5,
					appendixName: "采购项目相关附件",
					attachlist: []
                },
            ],
            //招标公告
            tenderNoticeData:[
                {
					id:6,
					appendixName: "招标（采购）人确认函",
					attachlist: []
                },
                {
					id:7,
					appendixName: "采购公告",
                    attachlist: [],
                    state:'采购(资审)公告'
                },
            ],
            //招标文件
            documentsData:[
                {
					id:8,
					appendixName: "招标(采购)文件",
                    attachlist: [],
                    state:'招标(采购)文件'
                },
                {
					id:9,
					appendixName: "图纸文件",
					attachlist: []
                },
            ],
            //中标结果公告
            winningResultData:[
                {
					id:10,
					appendixName: "招标（采购）人确认函",
					attachlist: []
                },
                {
					id:11,
					appendixName: "成交结果公告",
                    attachlist: [],
                    state:'成交结果公告'
                },
            ],
            //相关附件
            relatedData:[
                {
					id:12,
					appendixName: "评标委员会做出的评、定标报告",
                    attachlist: [],
                    state:'评标委员会做出的评、定标报告'
				},
				{
					id:13,
					appendixName: "工程量清标报告",
                    attachlist: [],
                    state:'工程量清标报告'
                },
                {
					id:14,
					appendixName: "评标专家的评审意见及汇总表",
                    attachlist: [],
                    state:'评标专家的评审意见及汇总表'
                },
                {
					id:15,
					appendixName: "中标人的投标文件",
                    attachlist: [],
                    state:'中标人的投标文件'
                },
                {
					id:16,
					appendixName: "业主评价意见",
                    attachlist: [],
                    state:'业主评价意见'
                },
            ],
            //采购控制价文件
            controlData:[
                {
					id:17,
					appendixName: "控制价相关文件",
                    attachlist: [],
                    state:'控制价相关文件'
                }
            ],
            //采购人代表
            bidderJudgeData:[
                {
					id:18,
					appendixName: "采购人代表相关证明",
                    attachlist: [],
                    state:'采购人代表相关证明'
                }
            ],
            //招标异常
            abnormalBidData:[
                {
					id:19,
					appendixName: "重新组织招标或重新组织投标的相关资料",
                    attachlist: [],
                    state:'重新组织招标或重新组织投标的相关资料'
                }
            ],
            recordlBidData:[
                {
                    id:20,
					appendixName: "合同签署",
                    attachlist: [],
                    state:'合同签署'
                }
            ],
            manageDate:[],//办理记录
            projectInformaPrimaryKeyId:'',//上传keyid
            fileData:[],//上传文件列表
            uploadTitle:'',//打开上传弹框名字
            attachmeId:[],
            itemsClarified:'',//事项
        };
    },
    methods: {
        // 初始化查询判断
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
				url:baseUrl + '/electronicFileController/queryState',
				data:object
			}).then(res=>{
                if(res.data.status == 200){
                    this.eRecordId = res.data.data.eRecordId;
                    this.eState = res.data.data.state;
                    if(res.data.data == null || res.data.data.state == null){
                        this.writeFlag = true;
                        this.nextFlag = false;
                    }else if(res.data.data.state == '编辑中'|| res.data.data.state == '办理未通过'){
                        this.nextFlag = true;
                        this.writeFlag = false;
                    }else if(res.data.data.state == '待办理' || res.data.data.state == '办理通过'){
                        this.nextFlag = true;
                        this.writeFlag = false;
                        $('.new_nav').hide();
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getKeyIdList(){
            this.$axios({
				method:'POST',
				url:baseUrl + '/projectInformationController/selectByProjectEntrySubcontractNumber',
				data:{
					projectEntrySubcontractNumbers:[this.projectObj.totalProjectId]
				}
			}).then(res=>{
               if(res.data.status == 200){
                    this.projectInformaPrimaryKeyId = res.data.data[0].projectInformaPrimaryKeyId;
                    // 判断展示的电子档案界面
                    this.biddingProcurementMode = res.data.data[0].biddingProcurementMode;
                    this.qualificationExaminationMethod = res.data.data[0].qualificationExaminationMethod;
                   
                    //委托代理协议
                    var obj1 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj1={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'委托代理协议'
                        }
                    }else{
                        // 入场项目编号
                        obj1 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'委托代理协议'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj1
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '委托代理协议'){
									this.registrantionData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //立项批复文件
                    var obj2 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj2={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'立项批复文件'
                        }
                    }else{
                        // 入场项目编号
                        obj2 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'立项批复文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj2
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '立项批复文件'){
									this.registrantionData[1].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //项目授权书
                    var obj3 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj3={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'项目负责人授权书'
                        }
                    }else{
                        // 入场项目编号
                        obj3 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'项目负责人授权书'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj3
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '项目负责人授权书'){
									this.registrantionData[2].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标项目附件
                    var obj4 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj4={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'采购项目相关附件'
                        }
                    }else{
                        // 入场项目编号
                        obj4 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'采购项目相关附件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj4
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '采购项目相关附件'){
									this.biddingData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标确认函
                    var obj5 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj5={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'招标（采购）人确认函'
                        }
                    }else{
                        // 入场项目编号
                        obj5 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'招标（采购）人确认函'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj5
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '招标（采购）人确认函'){
									this.tenderNoticeData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //采购公告
                    var obj6 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj6={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'采购公告'
                        }
                    }else{
                        // 入场项目编号
                        obj6 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'采购公告'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj6
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '采购公告'){
									this.tenderNoticeData[1].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标(采购)文件
                    var obj7 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj7={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'招标(采购)文件'
                        }
                    }else{
                        // 入场项目编号
                        obj7 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'招标(采购)文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj7
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '招标(采购)文件'){
									this.documentsData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //图纸文件
                    var obj8 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj8={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'图纸文件'
                        }
                    }else{
                        // 入场项目编号
                        obj8 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'图纸文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj8
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '图纸文件'){
									this.documentsData[1].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标（采购）人确认函
                    var obj9 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj9={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'招标（采购）人确认函'
                        }
                    }else{
                        // 入场项目编号
                        obj9 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'招标（采购）人确认函'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj9
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '招标（采购）人确认函'){
									this.winningResultData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //成交结果公告
                    var obj10 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj10={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'成交结果公告'
                        }
                    }else{
                        // 入场项目编号
                        obj10 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'成交结果公告'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj10
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '成交结果公告'){
									this.winningResultData[1].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //评标委员会做出的评、定标报告
                    var obj11 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj11={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'评标委员会做出的评、定标报告'
                        }
                    }else{
                        // 入场项目编号
                        obj11 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'评标委员会做出的评、定标报告'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj11
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '评标委员会做出的评、定标报告'){
									this.relatedData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //工程量清报告
                    var obj12 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj12={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'工程量清标报告'
                        }
                    }else{
                        // 入场项目编号
                        obj12 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'工程量清标报告'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj12
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '工程量清标报告'){
									this.relatedData[1].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //评标专家的评审意见及汇总表
                    var obj13 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj13={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'评标专家的评审意见及汇总表'
                        }
                    }else{
                        // 入场项目编号
                        obj13 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'评标专家的评审意见及汇总表'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj13
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '评标专家的评审意见及汇总表'){
									this.relatedData[2].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //中标人的投标文件
                    var obj14 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj14={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'中标人的投标文件'
                        }
                    }else{
                        // 入场项目编号
                        obj14 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'中标人的投标文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj14
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '中标人的投标文件'){
									this.relatedData[3].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //业主评价意见
                    var obj15 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj15={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'业主评价意见'
                        }
                    }else{
                        // 入场项目编号
                        obj15 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'业主评价意见'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj15
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '业主评价意见'){
									this.relatedData[4].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标控制价文件
                    var obj16 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj16={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'招标控制价文件'
                        }
                    }else{
                        // 入场项目编号
                        obj16 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'招标控制价文件'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj16
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '招标控制价文件'){
									this.controlData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //采购人代表相关证明
                    var obj17 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj17={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'采购人代表相关证明'
                        }
                    }else{
                        // 入场项目编号
                        obj17 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'采购人代表相关证明'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj17
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '采购人代表相关证明'){
									this.bidderJudgeData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //招标异常
                    var obj18 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj18={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'重新组织招标或重新组织投标的相关资料'
                        }
                    }else{
                        // 入场项目编号
                        obj18 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'重新组织招标或重新组织投标的相关资料'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj18
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '重新组织招标或重新组织投标的相关资料'){
									this.abnormalBidData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
                    //合同签署
                    var obj19 = {};
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        // 入场项目分包编号
                        obj19={
                            relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
							fileType:'合同签署'
                        }
                    }else{
                        // 入场项目编号
                        obj19 ={
                            relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
							fileType:'合同签署'
                        }
                    }
                    this.$axios({
						method: 'POST',
						url: baseUrl + '/attachmeController/queryAttachme',
						data:obj19
					}).then(res=>{
						if(res.data.status == 200){
							this.fileData = res.data.data;
							var arr = [];
							this.fileData.map((item,index)=>{
								item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
								arr.push(item)
							});
							this.fileData.map((item,index)=>{
								if(item.fileType == '合同签署'){
									this.recordlBidData[0].attachlist = arr
								}
							})
						}else{
							this.$message.warning(res.data.msg);
						}
					}).catch(err=>{
						console.log(err);
                    })
               }else{
                   this.$message.warning(res.data.msg)
               }
            }).catch(err=>{
                console.log(err)
            })
        },
        //下一步
        nextTo(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    itemsClarified:this.itemsClarified,
                    eRecordId:this.eRecordId
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    itemsClarified:this.itemsClarified,
                    eRecordId:this.eRecordId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/electronicFileController/saveOrNextStep',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.writeFlag = false;
                    this.nextFlag = true;
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
                        url:baseUrl + '/electronicFileController/queryState',
                        data:object
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.eRecordId = res.data.data.eRecordId;
                        }else{
                            this.$message.warning(res.data.msg)
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        saveFile(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    itemsClarified:this.itemsClarified,
                    eRecordId:this.eRecordId
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    itemsClarified:this.itemsClarified,
                    eRecordId:this.eRecordId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/electronicFileController/saveOrNextStep',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.writeFlag = true;
                    this.saveBox = true;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        sureSave(){
            this.saveBox = false;
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
				url:baseUrl + '/electronicFileController/queryState',
				data:object
			}).then(res=>{
                if(res.data.status == 200){
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
                method:'POST',
                url:baseUrl + '/electronicFileController/submit',
                data:{
                    eRecordId:this.eRecordId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.eState = res.data.data.state;
                    this.nextFlag = true;
                    this.writeFlag = false;
                    this.submitBox = true;
                    $('.new_nav').hide();
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        submitSave(){
            this.submitBox = false;
            this.getmanageInfo();// 办理记录
        },
        //打开上传
        openFile(num){
            this.uploadFlag = true;
            this.num = num;
            if(this.num == 2){
                this.uploadTitle = '委托代理协议'
			}else if(this.num == 3){
                this.uploadTitle = '立项批复文件'
			}else if(this.num == 4){
                this.uploadTitle = '项目负责人授权书'
			}else if(this.num == 5){
                this.uploadTitle = '采购项目相关附件'
			}else if(this.num == 6){
                this.uploadTitle = '招标（采购）人确认函'
			}else if(this.num == 7){
                this.uploadTitle = '采购公告'
			}else if(this.num == 8){
                this.uploadTitle = '招标(采购)文件'
			}else if(this.num == 9){
                this.uploadTitle = '图纸文件'
			}else if(this.num == 10){
                this.uploadTitle = '招标（采购）人确认函'
			}else if(this.num == 11){
                this.uploadTitle = '成交结果公告'
			}else if(this.num == 12){
                this.uploadTitle = '评标委员会做出的评、定标报告'
			}else if(this.num == 13){
                this.uploadTitle = '工程量清标报告'
			}else if(this.num == 14){
                this.uploadTitle = '评标专家的评审意见及汇总表'
            }else if(this.num == 15){
                this.uploadTitle = '中标人投标文件'
			}else if(this.num == 16){
                this.uploadTitle = '业主评价意见'
			}else if(this.num == 17){
                this.uploadTitle = '招标控制价文件'
            }else if(this.num == 18){
                this.uploadTitle = '采购人代表相关证明'
            }else if(this.num == 19){
                this.uploadTitle = '重新组织招标或重新组织投标的相关资料'
            }else if(this.num == 20){
                this.uploadTitle = '合同签署'
            }
            this.uploadList();
        },
        //上传列表
		uploadList(){
            var obj = {}
            if(this.num == 2){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'委托代理协议'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'委托代理协议'
                    }
                }
			}else if(this.num == 3){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'立项批复文件'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'立项批复文件'
                    }
                }
			}else if(this.num == 4){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'项目负责人授权书'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'项目负责人授权书'
                    }
                }
			}else if(this.num == 5){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'采购项目相关附件'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'采购项目相关附件'
                    }
                }
			}else if(this.num == 6){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'招标（采购）人确认函'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'招标（采购）人确认函'
                    }
                }
			}else if(this.num == 7){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'采购公告'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'采购公告'
                    }
                }
			}else if(this.num == 8){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'招标(采购)文件'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'招标(采购)文件'
                    }
                }
			}else if(this.num == 9){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'图纸文件'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'图纸文件'
                    }
                }
			}else if(this.num == 10){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'招标（采购）人确认函'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'招标（采购）人确认函'
                    }
                }
			}else if(this.num == 11){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'成交结果公告'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'成交结果公告'
                    }
                }
			}else if(this.num == 12){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'评标委员会做出的评、定标报告'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'评标委员会做出的评、定标报告'
                    }
                }
			}else if(this.num == 13){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'工程量清标报告'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'工程量清标报告'
                    }
                }
			}else if(this.num == 14){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'评标专家的评审意见及汇总表'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'评标专家的评审意见及汇总表'
                    }
                }
			}else if(this.num == 15){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'中标人投标文件'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'中标人投标文件'
                    }
                }
            }else if(this.num == 16){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'业主评价意见'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'业主评价意见'
                    }
                }
			}else if(this.num == 17){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'招标控制价文件'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'招标控制价文件'
                    }
                }
			}else if(this.num == 18){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'采购人代表相关证明'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'采购人代表相关证明'
                    }
                }
            }else if(this.num == 19){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'重新组织招标或重新组织投标的相关资料'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'重新组织招标或重新组织投标的相关资料'
                    }
                }
			}else if(this.num == 20){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    obj={
                        relevanceCorrelationId:this.projectObj.subcontractItePrimaryKeyId,
                        fileType:'合同签署'
                    }
                }else{
                    // 入场项目编号
                    obj ={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:'合同签署'
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
                    if(this.num == 2){
						this.registrantionData[1].attachlist = arr
					}else if(this.num == 3){
						this.registrantionData[2].attachlist = arr
					}else if(this.num == 4){
						this.registrantionData[3].attachlist = arr
					}else if(this.num == 5){
						this.biddingData[0].attachlist = arr
					}else if(this.num == 6){
						this.tenderNoticeData[0].attachlist = arr
					}else if(this.num == 7){
						this.tenderNoticeData[1].attachlist = arr
					}else if(this.num == 8){
						this.documentsData[0].attachlist = arr
					}else if(this.num == 9){
						this.documentsData[1].attachlist = arr
					}else if(this.num == 10){
						this.winningResultData[0].attachlist = arr
					}else if(this.num == 11){
						this.winningResultData[1].attachlist = arr
					}else if(this.num == 12){
						this.relatedData[0].attachlist = arr
					}else if(this.num == 13){
						this.relatedData[1].attachlist = arr
					}else if(this.num == 14){
						this.relatedData[2].attachlist = arr
					}else if(this.num == 15){
						this.relatedData[3].attachlist = arr
					}else if(this.num == 16){
						this.relatedData[4].attachlist = arr
					}else if(this.num == 17){
						this.controlData[0].attachlist = arr
					}else if(this.num == 18){
						this.bidderJudgeData[0].attachlist = arr
					}else if(this.num == 19){
						this.abnormalBidData[0].attachlist = arr
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
            if(this.num == 8){
                if(this.documentsData[0].attachlist.length > 0){
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
                    if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                        if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                            if(this.num == 2){
                                formData.append("fileType", '委托代理协议');
                                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 3){
                                formData.append("fileType", '立项批复文件');
                                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 4){
                                formData.append("fileType", '项目负责人授权书');
                                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 5){
                                formData.append("fileType", '采购项目相关附件');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 6){
                                formData.append("fileType", '招标（采购）人确认函');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 7){
                                formData.append("fileType", '采购公告');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 8){
                                formData.append("fileType", '招标(采购)文件');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 9){
                                formData.append("fileType", '图纸文件');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 10){
                                formData.append("fileType", '招标（采购）人确认函');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 11){
                                formData.append("fileType", '成交结果公告');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 12){
                                formData.append("fileType", '评标委员会做出的评、定标报告');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 13){
                                formData.append("fileType", '工程量清标报告');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 14){
                                formData.append("fileType", '评标专家的评审意见及汇总表');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 15){
                                formData.append("fileType", '中标人投标文件');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 16){
                                formData.append("fileType", '业主评价意见');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 17){
                                formData.append("fileType", '招标控制价文件');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 18){
                                formData.append("fileType", '采购人代表相关证明');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 19){
                                formData.append("fileType", '重新组织招标或重新组织投标的相关资料');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            }else if(this.num == 20){
                                formData.append("fileType", '合同签署');
                                formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                                formData.append("file", this.files);
                            } 
                        }else{
                            formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                            formData.append("file", this.files);
                            
                            if(this.num == 2){
                                formData.append("fileType", '委托代理协议');
                            }else if(this.num == 3){
                                formData.append("fileType", '立项批复文件');
                            }else if(this.num == 4){
                                formData.append("fileType", '项目负责人授权书');
                            }else if(this.num == 5){
                                formData.append("fileType", '采购项目相关附件');
                            }else if(this.num == 6){
                                formData.append("fileType", '招标（采购）人确认函');
                            }else if(this.num == 7){
                                formData.append("fileType", '采购公告');
                            }else if(this.num == 8){
                                formData.append("fileType", '招标(采购)文件');
                            }else if(this.num == 9){
                                formData.append("fileType", '图纸文件');
                            }else if(this.num == 10){
                                formData.append("fileType", '招标（采购）人确认函');
                            }else if(this.num == 11){
                                formData.append("fileType", '成交结果公告');
                            }else if(this.num == 12){
                                formData.append("fileType", '评标委员会做出的评、定标报告');
                            }else if(this.num == 13){
                                formData.append("fileType", '工程量清标报告');
                            }else if(this.num == 14){
                                formData.append("fileType", '评标专家的评审意见及汇总表');
                            }else if(this.num == 15){
                                formData.append("fileType", '中标人投标文件');
                            }else if(this.num == 16){
                                formData.append("fileType", '业主评价意见');
                            }else if(this.num == 17){
                                formData.append("fileType", '招标控制价文件');
                            }else if(this.num == 18){
                                formData.append("fileType", '采购人代表相关证明');
                            }else if(this.num == 19){
                                formData.append("fileType", '重新组织招标或重新组织投标的相关资料');
                            }else if(this.num == 20){
                                formData.append("fileType", '合同签署');
                            } 
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
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                     if(this.num == 2){
                        formData.append("fileType", '委托代理协议');
                        formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 3){
                        formData.append("fileType", '立项批复文件');
                        formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 4){
                        formData.append("fileType", '项目负责人授权书');
                        formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 5){
                        formData.append("fileType", '招标项目相关附件');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 6){
                        formData.append("fileType", '招标（采购）人确认函');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 7){
                        formData.append("fileType", '招标公告');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 8){
                        formData.append("fileType", '招标(采购)文件');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 9){
                        formData.append("fileType", '图纸文件');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 10){
                        formData.append("fileType", '招标（采购）人确认函');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 11){
                        formData.append("fileType", '中标结果公告');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 12){
                        formData.append("fileType", '评标委员会做出的评、定标报告');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 13){
                        formData.append("fileType", '工程量清标报告');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 14){
                        formData.append("fileType", '评标专家的评审意见及汇总表');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 15){
                        formData.append("fileType", '中标人投标文件');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 16){
                        formData.append("fileType", '业主评价意见');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 17){
                        formData.append("fileType", '采购控制价文件');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 18){
                        formData.append("fileType", '采购人代表相关证明');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 19){
                        formData.append("fileType", '重新组织招标或重新组织投标的相关资料');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    }else if(this.num == 20){
                        formData.append("fileType", '合同签署');
                        formData.append("projectId", this.projectObj.subcontractItePrimaryKeyId);
                        formData.append("file", this.files);
                    } 
                }else{
                    formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                    formData.append("file", this.files);
                     if(this.num == 2){
                        formData.append("fileType", '委托代理协议');
                    }else if(this.num == 3){
                        formData.append("fileType", '立项批复文件');
                    }else if(this.num == 4){
                        formData.append("fileType", '项目负责人授权书');
                    }else if(this.num == 5){
                        formData.append("fileType", '招标项目相关附件');
                    }else if(this.num == 6){
                        formData.append("fileType", '招标（采购）人确认函');
                    }else if(this.num == 7){
                        formData.append("fileType", '招标公告');
                    }else if(this.num == 8){
                        formData.append("fileType", '招标(采购)文件');
                    }else if(this.num == 9){
                        formData.append("fileType", '图纸文件');
                    }else if(this.num == 10){
                        formData.append("fileType", '招标（采购）人确认函');
                    }else if(this.num == 11){
                        formData.append("fileType", '中标结果公告');
                    }else if(this.num == 12){
                        formData.append("fileType", '评标委员会做出的评、定标报告');
                    }else if(this.num == 13){
                        formData.append("fileType", '工程量清标报告');
                    }else if(this.num == 14){
                        formData.append("fileType", '评标专家的评审意见及汇总表');
                    }else if(this.num == 15){
                        formData.append("fileType", '中标人投标文件');
                    }else if(this.num == 16){
                        formData.append("fileType", '业主评价意见');
                    }else if(this.num == 17){
                        formData.append("fileType", '采购控制价文件');
                    }else if(this.num == 18){
                        formData.append("fileType", '采购人代表相关证明');
                    }else if(this.num == 19){
                        formData.append("fileType", '重新组织招标或重新组织投标的相关资料');
                    }else if(this.num == 20){
                        formData.append("fileType", '合同签署');
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
        //关闭上传文件弹框
        closeUpload(){
            this.uploadFlag = false;
            this.uploadList();
        },
         //办理记录查询
        async getmanageInfo(){
            await this.getInitInfo();// 初始化查询判断
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1&& this.projectObj.totalProjectId!=null){
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.eRecordId
                }
            }else{
                object={
                    itemNumber:this.projectObj.totalProjectId,
                    relatedId:this.eRecordId
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
                        var obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '电子档案'){
                                obj.dangan = item
                            }
                            if(item.value == '成交结果公告'){
                                obj.gonggao = item
                            }
                        })
                        if(obj.dangan.state != '办理通过'){
                            this.alertMsg = '项目经办人尚未执行此操作，不可查看!'
                            this.passJudgeShow = false;
                            this.frameShow = true;
                        }else{
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        }
                    }else{
                        var obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '电子档案'){
                                obj.dangan = item
                            }
                            if(item.value == '成交结果公告'){
                                obj.gonggao = item
                            }
                        })
                        
                        //招标勾且本业勾，可以看，
                        if(obj.zhaobiao.state == '办理通过' && obj.dangan.state == '办理通过'){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        //如果上一步打钩，进一步判断
                        }else if(obj.gonggao.state == '办理通过' ){
                            //如果招标打钩，则本业必须打勾
                            if(obj.zhaobiao.state == '办理通过'&& obj.dangan.state == '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                                //如果招标不打勾
                            }else if(obj.zhaobiao.state != '办理通过'){
                                this.passJudgeShow = true;
                                this.frameShow = false;
                            }else{
                                this.passJudgeShow = false;
                                this.frameShow = true;
                                if(obj.zhaobiao.state == '办理通过'){
                                    this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                                }else{
                                    this.alertMsg = '尚未发成交结果公告，无法备案电子档案!'
                                }
                            }
                        }else{
                            //其他的都不能看
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未发成交结果公告，无法备案电子档案!'
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
        handleClose() {
            this.frameShow = false;
            this.saveBox = false;
            this.submitBox = false;
            this.cancelShow = false;
        }
    },
    created(){
        this.getKeyIdList();
        this.uploadList();
        this.getInitInfo();// 初始化查询判断
        this.getmanageInfo();//办理记录查询
        this.getDecideList();
    }
  };
</script>

<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
    overflow: hidden;
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
.el-icon-warning,.el-icon-success{
    font-size: 100px;
    color: #0a5e9d;
}
.icon span{
    margin-left: 20px;
    font-size:18px;
}
.uploadWrapper{
	width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
	position: fixed;
	left: 0;
	top:0;
	bottom: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99;
}
.wrapperBox,.nextWrapperBox{
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.uploadWrapperBox{
	width: 70%;
    height:60%;
    background: #fff;
    display: flex;
    flex-direction: column;
	position: relative;
}
.pickBox{
	width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.pick_main{
	 width: 100%;
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
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
/* 标题 */
.wrapper_title,.nextWrapper_title,.uploadWrapper_title,.pick_title{
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
    cursor: pointer;
}
.file_btn{
    position: absolute;
    right: 95px;
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
.upload_box{
	width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
}
/* .main_info{
    position: relative;
} */
.star{
    color:#f00;
    /* position: fixed;
    bottom:20%;
    left: 15%; */
}
</style>