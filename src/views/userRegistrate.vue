<template>
  <div class="myDiv">
        <div class="head_top_box">
            <div class="head_box">软交所招标采购交易平台会员注册</div>
            <div style="width:100%;height:2px;box-shadow: 10px 2px 5px #888888;"></div>
        </div>
        <div class="main_box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号" :rules="{required: true}">
                    <el-input v-model="form.blrName"></el-input>
                </el-form-item>
               <el-form-item label="密码" :rules="{required: true}">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" :rules="{required: true}">
                    <el-input v-model="form.unionCode"></el-input>
                </el-form-item>
                <el-form-item label="法定代表人姓名" :rules="{required: true}">
                    <el-input v-model="form.legalPerson"></el-input>
                </el-form-item>
                <el-form-item label="单位名称" :rules="{required: true}">
                    <el-input v-model="form.cn"></el-input>
                </el-form-item>
                <el-form-item label="企业注册资本(万元)" :rules="{required: true}">
                    <el-input v-model="form.regMoney"></el-input>
                </el-form-item>
                <el-form-item label="企业办公地址" :rules="{required: true}">
                    <el-input v-model="form.officeAddress"></el-input>
                </el-form-item>
                 <el-form-item label="企业联系人" :rules="{required: true}">
                    <el-input v-model="form.linkPerson"></el-input>
                </el-form-item>
                <el-form-item label="联系人手机" :rules="{required: true}">
                    <el-input v-model="form.mobilePhone"></el-input>
                </el-form-item>
                <el-form-item label="法定代表身份证号">
                    <el-input v-model="form.legalPersonId"></el-input>
                </el-form-item>
                <el-form-item label="组织机构代码">
                    <el-input v-model="form.orgCode"></el-input>
                </el-form-item>
                <el-form-item label="企业邮编">
                    <el-input v-model="form.zipCode"></el-input>
                </el-form-item>
                <el-form-item label="企业办公邮编">
                    <el-input v-model="form.officeAddCode"></el-input>
                </el-form-item>
                 <el-form-item label="国税税务登记证号">
                    <el-input v-model="form.satNo"></el-input>
                </el-form-item>
                 <el-form-item label="税务登记号">
                    <el-input v-model="form.taxCode"></el-input>
                </el-form-item>
                <el-form-item label="注册号">
                    <el-input v-model="form.regNo"></el-input>
                </el-form-item>
                <el-form-item label="基本户开户行">
                    <el-input v-model="form.bankDeposit"></el-input>
                </el-form-item>
                <el-form-item label="基本户账户号">
                    <el-input v-model="form.accountNumber"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="footer_box">
            <el-button type="primary" @click="submit_info()">立即注册</el-button>
            <el-button @click="cancle()">取消</el-button>
        </div>
        <!-- <el-dialog
            title="请选择角色"
            :visible.sync="successBox"
            width="60%"
            :before-close="handleClose">
            <div class="dialog_box">
                <div class="role_box" v-model="role_gly"  @click="getRole(1)">管理员</div>
                <div class="role_box" v-model="role_yz" @click="getRole(2)">业主</div>
                <div class="role_box" v-model="role_zj"  @click="getRole(3)">中介机构</div>
            </div>
        </el-dialog> -->
        <el-dialog
            title="执行成功"
            :visible.sync="successBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>注册成功</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successSure">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import baseUrl from '../api/api'
import dayjs from "dayjs";
import {isPoneAvailable,formatDate,checkNumber,getIdcard,checkPhone,checkEmail} from '../api/base.js'
export default {
  components:{},
  props:{},
  data(){
    return {
        form: {
            blrName: '',//姓名
            password: '',//密码
            linkPerson: '',//企业联系人
            mobilePhone: '',//联系人手机
            legalPersonId:'',//法定代表身份证号
            legalPerson:'',//法定代表人姓名
            cn:'',//单位名称
            orgCode:'',//组织机构代码
            zipCode:'',//企业邮编
            officeAddCode:'',//企业办公邮编
            regMoney:'',//企业注册资本
            officeAddress:'',//企业办公地址
            satNo:"",//国税税务登记证号
            taxCode:'',//税务登记号
            regNo:'',//注册号
            unionCode:"",//统一社会信用代码
            bankDeposit:"",//基本户开户行
            accountNumber:"",//基本户账户号

        },
        keyData:'',
        successBox:false,
        role_gly:'管理员',
        role_yz:'业主',
        role_zj:'中介机构'
    }
  },
  watch:{},
  computed:{},
  methods:{
        getCheckList(){
            let uuid = this.uuid();
            this.$axios({
                method:'POST',
                url:baseUrl + '/personnelController/dockingLogin',
                data:{
                    uid:uuid,
                    blrName: this.form.blrName,//姓名
                    password: this.form.password,//密码
                    linkPerson: this.form.linkPerson,//企业联系人
                    mobilePhone: this.form.mobilePhone,//联系人手机
                    legalPersonId:this.form.legalPersonId,//法定代表身份证号
                    legalPerson:this.form.legalPerson,//法定代表人姓名
                    cn:this.form.cn,//单位名称
                    orgCode:this.form.orgCode,//组织机构代码
                    zipCode:this.form.zipCode,//企业邮编
                    officeAddCode:this.form.officeAddCode,//企业办公邮编
                    regMoney:this.form.regMoney,//企业注册资本
                    officeAddress:this.form.officeAddress,//企业办公地址
                    satNo:this.form.satNo,//国税税务登记证号
                    taxCode:this.form.taxCode,//税务登记号
                    regNo:this.form.regNo,//注册号
                    unionCode:this.form.unionCode,//统一社会信用代码
                    bankDeposit:this.form.bankDeposit,//基本户开户行
                    accountNumber:this.form.accountNumber,//基本户账户号
                }

            }).then(res=>{
                if(res.data.status == 200){
                    this.keyData = res.data.data;
                    window.localStorage.setItem('login',this.keyData); 
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        submit_info(){
            if(!this.form.blrName){
                this.$message.warning('请输入账号');
                return false;
            }else if(!this.form.password){
                this.$message.warning('请输入密码');
                return false;
            }else if(!this.form.unionCode){
                this.$message.warning('请输入统一社会信用代码');
                return false;
            }else if(!this.form.legalPerson){
                this.$message.warning('请输入法定人代表姓名');
                return false;
            }else if(!this.form.cn){
                this.$message.warning('请输入单位名称');
                return false;
            }else if(!this.form.regMoney){
                this.$message.warning('请输入企业注册资本');
                return false;
            }else if(!this.form.officeAddress){
                this.$message.warning('请输入企业办公地址');
                return false;
            }else if(!this.form.linkPerson){
                this.$message.warning('请输入企业联系人');
                return false;
            }else if(!this.form.mobilePhone){
                this.$message.warning('请输入联系人手机');
                return false;
            }else if(this.form.mobilePhone != "" && !isPoneAvailable(this.form.mobilePhone)){
                this.$message.warning('请输入正确的联系人手机');
                return false;
            }else if(this.form.legalPersonId != "" && !getIdcard(this.form.legalPersonId)){
                this.$message.warning('请输入正确的法定代表身份证号');
                return false;
            }else if(this.form.regMoney != "" && !checkNumber(this.form.regMoney)){
                this.$message.warning('请输入企业注册资本的数字类型');
                return false;
            }else{
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/userController/checkOut',
                    data:{
                        userName:this.form.blrName,//姓名
                        companyName:this.form.cn,//单位名称
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.successBox = true;
                        this.getCheckList();
                        // this.$axios({
                        //     method: "POST",
                        //     url: baseUrl+"/personnelController/boundRole",
                        //     data:obj
                        // }).then(res=>{
                        //     if(res.data.status == 200){
                        //         this.successBox = false;
                        //         this.$router.push({
                        //             name:'login'
                        //         })
                        //     }
                        // }).catch(err=>{
                        //     console.log(err)
                        // })
                    }else if(res.data.status == 500){
                        this.$message.warning(res.data.msg)
                    }else if(res.data.status == 101){
                        this.$message.warning(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        successSure(){
            this.successBox = false;
            this.$router.push({
                name:'login'
            })
        },
        cancle(){
            this.$router.push({
                name:'login'
            })
        },
        uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for(var i = 0; i < 32; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23];

            var uuid = s.join("");
            return uuid;
        },
        handleClose(){
            this.successBox = false;
        },
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.head_top_box{
    display: flex;
    flex-direction:column;
    flex:1;
}
.head_box{
    height: 50px;
    font-weight: bold;
    font-size: 25px;
    color: #4FA3E1;
    vertical-align: middle;
    line-height: 50px;
    text-align: center;
}
.main_box{
    width: 40%;
    margin:20px auto;
    height: 80%;
    overflow-y: scroll;
}
.footer_box{
    text-align: center;
}
.dialog_box{
    width: 100%;
    display: flex;
    flex:1;
    justify-content: space-around;
}
.role_box{
    padding:40px;
    background-color: #2d78f4;
    color:#fff;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success,.el-icon-question{
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
</style>