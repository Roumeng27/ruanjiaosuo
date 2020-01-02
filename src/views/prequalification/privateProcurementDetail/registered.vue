<template>
    <div class="newBox">
        <!-- 采购主体注册 -->
        <div  v-show="passJudgeShow" style="height:100%;overflow:hidden;">
            <div class="wrapper" v-show="writeFlag">
                <div class="box"  v-show="noraml_box_flag">
                    <button class="btn" @click="newManage">新建单位</button>
                    <button class="btn" @click="deletePro">删除单位</button>
                </div>
                <div class="edit_list" style="display:flex;">
                    <div class="editCenter">
                        <div class="editName">单位名称：</div>
                        <div class="editContent">
                            <el-input v-model="unitName" @keyup.enter.native="searchList"  placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">组织机构代码：</div>
                        <div class="editContent">
                            <el-input v-model="orgCode"  @keyup.enter.native="searchList"  placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">单位类型：</div>
                        <div class="editContent">
                            <el-select v-model="roleTypeData" clearable placeholder="请选择"  @keyup.enter.native="searchList">
                                <el-option v-for="item in UnitTypeData" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div style="height:40px;">
                        <button class="btn" @click="searchList">搜索</button>
                    </div>
                </div>
                <div class="main_info" v-show="noraml_box_flag">
                    <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column  type="selection" width="55">
                        </el-table-column>
                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="organizationCode" label="组织机构代码" :show-overflow-tooltip ="true" width="180">
                        </el-table-column>
                        <el-table-column prop="companyName" label="单位名称" :show-overflow-tooltip ="true" width="180">
                        </el-table-column>
                        <el-table-column prop="registeredArea" :show-overflow-tooltip ="true" label="注册所在地">
                        </el-table-column>
                        <el-table-column prop="companyType" :show-overflow-tooltip ="true" label="单位类型">
                        </el-table-column>
                        <el-table-column fixed="right" label="修改" width="100" >
                            <template slot-scope="scope">
                                <i class="el-icon-edit"  style="cursor: pointer;" @click="modifyOpen(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="main_info" v-show="word_box_flag">
                    <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column  type="selection" width="55">
                        </el-table-column>
                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="organizationCode" label="组织机构代码" :show-overflow-tooltip ="true" width="180">
                        </el-table-column>
                        <el-table-column prop="companyName" label="单位名称" :show-overflow-tooltip ="true" width="180">
                        </el-table-column>
                        <el-table-column prop="registeredArea" :show-overflow-tooltip ="true" label="注册所在地">
                        </el-table-column>
                        <el-table-column prop="companyType" :show-overflow-tooltip ="true" label="单位类型">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 新增单位信息 -->
            <div class="addWrapper" v-show="show">
                <div class="addBox">
                    <div class="addTitle">
                        <p>新增单位信息</p>
                        <i class="el-icon-close" @click="close"></i>
                    </div>
                    <div class="box">
                        <button class="btn"  @click="saveData">保存</button>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="activeName" accordion>
                            <!-- 单位基本信息-->
                            <el-collapse-item title="单位基本信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>单位名称：</div>
                                            <div class="editContent"> 
                                                <el-input v-model="companyName" id="focus1" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>组织机构代码：</div>
                                            <div class="editContent">
                                                <el-input v-model="organizationCode" id="focus2"  clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>单位注册地区：</div>
                                            <div class="editContent">
                                                <el-cascader :options="addressData" id="focus3"  v-model="localName" @change="handleChange"  :props="props">
                                                </el-cascader>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>单位类型：</div>
                                            <div class="editContent">
                                                <el-checkbox-group v-model="roleTypeB"  id="focus4" >
                                                    <el-checkbox label="招标(采购)代理"></el-checkbox>
                                                    <el-checkbox label="投标(供应商)人"></el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>申请锁：</div>
                                            <div class="editContent">
                                                <span style="width:30%;">主锁1个，副锁</span>
                                                <el-input  id="focus5" v-model="applicationLock" clearable></el-input>
                                                <p>个</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系人：</div>
                                            <div class="editContent">
                                                <el-input v-model="contacts" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">联系电话：</div>
                                            <div class="editContent">
                                                <el-input v-model="contactsPhone" id="focus6" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                        
                    </div>
                </div>
            </div>
            <!-- 修改单位信息 -->
            <div class="addWrapper" v-show="modifyShow">
                <div class="addBox">
                    <div class="addTitle">
                        <p>修改单位信息</p>
                        <i class="el-icon-close" @click="closeModify"></i>
                    </div>
                    <div class="box">
                        <button class="btn"  @click="editSave">保存</button>
                    </div>
                    <div class="main_info">
                        <el-collapse v-model="activeName" accordion>
                            <!-- 单位基本信息-->
                            <el-collapse-item title="单位基本信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>单位名称：</div>
                                            <div class="editContent"> 
                                                <el-input v-model="companyName" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>组织机构代码：</div>
                                            <div class="editContent">
                                                <el-input v-model="organizationCode" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>单位注册地区：</div>
                                            <div class="editContent">
                                                <el-cascader :options="addressData" v-model="localName" @change="handleChange"  :props="props">
                                                </el-cascader>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem" v-if="showFlag">
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>单位类型：</div>
                                            <div class="editContent">
                                                <el-checkbox-group v-model="roleTypeB">
                                                    <el-checkbox :checked="this.comRoleType == '招标(采购)代理' || this.comRoleType == '招标(采购)代理,投标(供应商)人'" label="招标(采购)代理"></el-checkbox>
                                                    <el-checkbox :checked="this.comRoleType == '投标(供应商)人' || this.comRoleType == '招标(采购)代理,投标(供应商)人'" label="投标(供应商)人"></el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName"><span class="star">*</span>申请锁：</div>
                                            <div class="editContent">
                                                <span style="width:30%;">主锁1个，副锁</span>
                                                <el-input v-model="applicationLock" clearable></el-input>
                                                <p>个</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">联系人：</div>
                                            <div class="editContent">
                                                <el-input v-model="contacts" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">联系电话：</div>
                                            <div class="editContent">
                                                <el-input v-model="contactsPhone" clearable></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                        
                    </div>
                </div>
            </div>
            <!-- 删除弹框点击确定方可删除 -->
            <el-dialog
                title="系统提示"
                :visible.sync="flag"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-question"></i>
                    <span>您确定删除选中的主体注册吗?</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteManage">确 定</el-button>
                    <el-button type="primary" @click="flag = false">取消</el-button>
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
import baseUrl from '../../../api/api'
import '../../../assets/css/style.css'
import {isPoneAvailable,checkNumber,checkPhone} from '../../../api/base.js'
export default {
    props: {},
    data(){
        return {
            noraml_box_flag:true,
            word_box_flag:false,
            str_entrust_type:window.sessionStorage.str_entrust_type,
            role_types:window.localStorage.role_types,
            biddingPurchasingAgencyName:'',
            projectObj:JSON.parse(window.localStorage.projectObj),
            props: {
				label:'label',
				value:'label',
				children: 'children'
			},
            frameShow:false,
            passJudgeShow:true,
            writeFlag:true,
            showFlag:true,//单位类型
            companyName:'',//单位名称
            organizationCode:'',//组织机构代码
            registeredArea:[],//注册所在地
            roleType:'',//单位类型
            UnitTypeData:[],//单位类型数组
            roleTypeData:'',//查询中的v-model单位类型
            orgCode:'',//查询中的v-model单位组织机构
            unitName:'',//查询中的v-model单位名称
            currentPage:'1',//第一页
            tableData: [],
            show:false, //新增
            modifyShow:false, //修改
            flag:false,//删除弹框
            activeName:'1',
            addressData:[],//单位注册地区
            localName:[],//项目所在地v-model
            contacts:'',//联系人
            applicationLock:'',//单位锁
            contactsPhone:'',//联系电话
            roleTypeB:[],//数组单位类型新增
            userId:'',//keyId
            typeDatas:[],//新增单位类型data值
            companyType:'',
            checkedList:[],
            checkedArr:[],
            comRoleType:'',//修改中的chekced
            alertMsg:'',// 权限提示
        }
    },
    created () {
        this.getDataList();
        this.UnitTypeList();
        this.getDecideList();
    },
    methods: {
        
        //获取列表数据
        getDataList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/userController/selectList",
                data:{
                    companyName:'',
                    organizationCode:'',
                    companyType:'',
                    type:'主体注册'
                }
            }).then(res=>{
                if(res.data.data.status == 200){
                    this.tableData = res.data.data.data;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        // 修改
        handleItemChange(){
            this.registeredArea = this.$refs['cascaderArr'].currentLabels;
        },
        // 新增
        handleChange(value){
            console.log(value)
            // this.registeredArea = this.$refs['addArr'].currentLabels;
        },
        //获取单位类型接口
        UnitTypeList(){
            this.$axios({
                method:'POST',
                url:baseUrl+'/interfaceTableController/selectByname',
                data:{
                    dropDownBox:'单位类型'
                }
            }).then(res=>{
                if(res.data.data.status == 200){
                    this.organizaData = res.data.data.data;
                    this.biddingOrganization = res.data.data.data[1].value;
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //搜索
        searchList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/userController/selectList",
                data:{
                    companyName:this.unitName,
                    organizationCode:this.orgCode,
                    companyType:this.roleTypeData
                }
            }).then(res=>{
                if(res.data.data.status == 200){
                    this.tableData = res.data.data.data
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //新增项目
        newManage(){
            this.show = true;
            this.addressList();//项目所在地
            this.companyName = "";
            this.organizationCode = "";
            this.registeredArea = [];
            this.roleTypeB = [];
            this.applicationLock = "";
            this.contacts = "";
            this.contactsPhone = "";
            this.localName = [];
        },
        close(){
             this.show = false;
        },
        //项目所在地
        addressList(){
            this.$axios({
                method:'GET',
                url:baseUrl + '/adderssController/selectAdderssList'
            }).then(res=>{
                if(res.data.status == 200){
                    this.addressData = res.data.data
                }else{
                    this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //新增中的保存数据
        saveData(){
            if(!this.companyName){
                $('#focus1').focus();
                this.$message.warning('请输入单位名称');
                return false;
            }else if(!this.organizationCode){
                $('#focus2').focus();
                this.$message.warning('请输入组织机构代码');
                return false;
            }else if(!this.localName){
                $('#focus3').focus();
                this.$message.warning('请选择单位注册地区');
                return false;
            }else if(!this.roleTypeB){
                $('#focus4').focus();
                this.$message.warning('请选择单位类型');
                return false;
            }else if(this.contactsPhone != "" && !isPoneAvailable(this.contactsPhone) && !checkPhone(this.contactsPhone)){
                $('#focus6').focus();
                this.$message.warning('请输入正确的联系方式');
                return false;
            }else if(this.applicationLock != "" && this.applicationLock != null && !checkNumber(this.applicationLock)){
                $('#focus5').focus();
                this.$message.warning('副锁请输入数字类型');
                return false;
            }else{
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/userController/addUser',
                    data:{
                        companyName:this.companyName,
                        organizationCode:this.organizationCode,
                        registeredArea:this.localName.toString(),
                        contacts:this.contacts,
                        contactsPhone:this.contactsPhone,
                        applicationLock:this.applicationLock,
                        companyType:this.roleTypeB.join(','),
                        type:'主体注册'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.show = false;
                        this.getDataList();
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        //校验手机号联系方式
        blurPhone(){
            if(!isPoneAvailable(this.contactsPhone) && !checkPhone(this.contactsPhone)){
                this.$message.warning('请输入正确的联系方式');
            }
        },
       
        handleSelectionChange(val){
            let deleteArr = [];
            for(let i in val){
                deleteArr.push(val[i].userId);
            }
            this.userId = deleteArr;
        },
        handleClose(done) {
           this.frameShow = false;
        },
        //点击删除出现确定弹框
        deletePro(){
            if(this.userId.length <= 0){
                this.$message.warning('请选择您要删除的项目')
            }else{
                this.flag = true;
            }
        },
        //删除项目
        deleteManage(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/userController/deleteById',
                data:{
                    listId:this.userId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.flag = false;
                    for (let i=0; i<this.tableData.length; i++) {  
                        for (let j=0; j<this.userId.length; j++) {
                            if (this.tableData[i].userId == this.userId[j]) {  
                                this.tableData.splice(i, 1);    
                            }  
                        } 
                    }  
                    this.getDataList();
                }else{
                   this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //修改信息弹框
        modifyOpen(row){
            this.addressList();// 项目所在地
            this.modifyShow = true;
            this.showFlag = true;
            this.companyName=row.companyName,
            this.organizationCode = row.organizationCode,
            this.localName = row.registeredArea.split(','),
            this.contacts = row.contacts,
            this.contactsPhone = row.contactsPhone,
            this.roleTypeB = row.companyType.split(','),
            this.comRoleType = this.roleTypeB,
            this.userId = row.userId;
        },
        // 修改保存
        editSave(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/userController/updateUser',
                data:{
                    userId:this.userId,
                    companyName:this.companyName,
                    organizationCode:this.organizationCode,
                    registeredArea:this.localName.toString(),
                    contacts:this.contacts,
                    contactsPhone:this.contactsPhone,
                    companyType:this.roleTypeB.join(',')
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.modifyShow = false;
                    this.showFlag = false;
                    this.getDataList();
                }else{
                   this.$message.warning(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        closeModify(){
            this.modifyShow = !this.modifyShow;
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
                        this.word_box_flag = true;
                        this.noraml_box_flag = false;
                    }else{
                        this.word_box_flag = false;
                        this.noraml_box_flag = true;
                        let obj = {};
                        res.data.data.map((item,index)=>{
                            if(item.value == '采购异常'){
                                obj.zhaobiao = item;
                            }
                            if(item.value == '主体注册'){
                                obj.houxuanren = item
                            }
                            if(item.value == '项目入场登记'){
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
                                    this.alertMsg = '尚未完成项目入场登记,无法进行主体注册!'
                                }
                            }
                        }else{
                            //其他的都不能看
                            this.passJudgeShow = false;
                            this.frameShow = true;
                            if(obj.zhaobiao.state == '办理通过'){
                                this.alertMsg = '作废标段尚未执行此操作，不可查看!'
                            }else{
                                this.alertMsg = '尚未完成项目入场登记,无法进行主体注册!'
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
    }
}
</script>

<style scoped>
.newBox {
     width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    overflow: hidden;
}
.wrapper{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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
    padding:20px 20px;
    display: flex;
    flex-direction: column;
}
.addBox,.lookBox,.winBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.addTitle,.search_title{
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
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.main_info{
    width: 100%;
    height: 100%;
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
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: flex-start;
  background: #ffffff;
  padding: 0 3px;
}
.head_l {
  padding: 2px 6px;
  background-color: #0095d5;
  color: #ffffff;
  cursor: pointer;
  margin-right: 3px;
}
.head_bottom {
  width: 100%;
  text-align: center;
  margin: 2% 0;
  background: #f5f7fa;
}
.head_b_b > .el-input {
  width: 20% !important;
  height: 35px !important;
}

.wrap_tit{
    width: 100%;
    padding: 10px 10px;
}
.warp_main{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
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
.mask,.mask1{
   z-index: 2;
}
/* 新建项目 */
.new_pro {
  z-index: 3;
  background: #f0f4f6;
  width: 100%;
  height: 98%;
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate(-10%, -10%);
  overflow-y: hidden;
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
  margin-left: 10px;
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
.inputk{
    height: 25px;
    width: 80px;
    border: 1px solid #ccc;
    border-radius: 3px;
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
.modify_title{
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
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
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
    width: 50%;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
.star{
    color: #f00;
}
</style>