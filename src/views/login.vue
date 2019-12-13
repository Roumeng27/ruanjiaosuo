<template>
  	<div class="myDiv">
		<div class="login_box">
			<div class="main_box">
				<div class="login_tp"></div>
				<!-- <img class="login_tp" src="../../static/imgs/tp_login.png" alt=""> -->
				<div class="main_text">
					<div style="width:100%;height:100%;">
						<div class="user_name_box">用户名登录</div>
						<div class="user_login_box">
							<div class="user_box" style="border-bottom:1px solid #E2E2E2;">
								<i class="el-icon-user-solid icon_box"></i>
								<el-input type="text" v-model="userName" placeholder="请输入用户名"></el-input>
							</div>
							<div class="user_box" style="border-bottom:1px solid #E2E2E2;">
								<i class="el-icon-key icon_box"></i>
								<el-input type="password" v-model="password"  placeholder="请输入密码"></el-input>
							</div>
							<div class="noteBox">
								<div class="noteContent">
									<div class="noteLeft">验证码：</div>
									<div class="noteFlex">
										<el-input v-model="verificationCode" @keyup.enter.native ="submit()"></el-input>
									</div>
									<div style="display: inline-flex;margin-left:10px;width:30%;">
										<img style="display: inline-flex;height:30px;width:90%;" :src='imgUrl' @click="getIdetifyData" />
									</div>
								</div>
							</div>
						</div>
						<div class="log_sub" @click="submit">
							<el-button type="primary">登录</el-button>
						</div>
						<div class="registration" style="cursor:pointer;" @click="toRegistration()">用户注册</div>
					</div>
				</div>
			</div>
		</div>
		<div class="foot_box">
			<div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">版权所有北京软件和信息服务所&emsp;京ICP证120704 京公网安备&emsp;11010802008614号</div>
			<div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Copyright©2011&emsp;Beijing&emsp;Software&emsp;and&emsp;Information&emsp;Services&emsp;Exchange&emsp;Co.,Ltd&emsp;All&emsp;Rights</div>
		</div>
		<!-- 弹框 -->
		<!-- <div id="nextWrapper" v-show="role_flag_Box">
			<div class="nextWrapperBox">
				<div class="type_head">
					请选择主体类型登录&ensp;<span style="color:#53AEE0;font-size:14px;cursor: pointer;" @click="tuichu()">[退回登录]</span>
				</div>
				<div style="width:100%;height:100%;">
					<div class="type_main_t">
						<div class="type_m_l" v-model="role_yz" @click="getRole(1)">招标(采购)人登录</div>
						<div  class="type_m_r" v-model="role_agent" @click="getRole(2)">招标(采购)代理登录</div>
					</div>
					<div class="type_main_t2">
						<div class="type_m_r" v-model="role_gly" @click="getRole(3)">管理员登录</div>  
						<div class="type_m_l" v-model="role_zj" @click="getRole(4)">投标(供应商)人登录</div> 
					</div>
				</div>
			</div>
		</div> -->
  	</div>
</template>

<script>
import baseUrl from '../api/api'
export default {
	components: {},
	props: {},
	data() {
		return {
			user:{},
			userName:'',// 账号
			password:'',// 密码
			checked:'',// 记住密码单选框
			verificationCode:'',// 验证码
			authCode:'',// 后台获取的验证码
			keyData:'',// 后端返回的key值
			imgUrl:"",
			role_gly:'管理员',
			role_yz:'招标(采购)人',
			role_zj:'投标(供应商)人',
			role_agent:'招标(采购)代理',
			str_model:'',
		}
  	},
	created() {
		this.getIdetifyData();
	},
	methods: {
		changeCode(){
			this.getIdetifyData();
		},
		// 登录
		submit(){
			if(!this.userName){
				this.$message.warning('请输入账号');
				return false;
			}else if(!this.password){
				this.$message.warning('请输入密码');
				return false;
			}else if(!this.verificationCode){
				this.$message.warning('请输入验证码');
				return false;
			}
			this.$axios({
				method: "POST",
				url:baseUrl + '/personnelController/login',
				data:{
					userName:this.userName,
					password:this.password,
					verificationCode:this.verificationCode
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.keyData = res.data.data;
					window.localStorage.setItem('login',this.keyData); 
					this.$axios({
						method:'GET',
						url:baseUrl + '/personnelController/personInfo'
					}).then(res=>{
						if(res.data.status == 200){
							if(res.data.data.roleVo == null){
								this.$router.push({
									name: 'logintype', 
								})
							}else{
								if(res.data.data.roleVo.roleType == '管理员'){
									this.$router.push({
										name: 'home'
									})  
								}else{
									this.$router.push({
										name: 'logintype', 
									})
								}
							}
						}else{
							this.$message.warning(res.data.msg)
						}
					}).catch(err=>{
						console.log(err)
					})
				}else{
					this.$message.warning(res.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
			window.localStorage.userName = this.userName;
            window.localStorage.password = this.password;
			window.localStorage.verificationCode = this.verificationCode;
			window.sessionStorage.setItem('str_model','角色名称');
		},
		//获取验证码
		getIdetifyData(){
			this.$axios({
				method:'GET',
				url:baseUrl + '/personnelController/generatingVerificationCode',
				responseType:"blob"
			}).then(res=>{
				var blob = res.data;
				var reader = new FileReader();
				reader.readAsDataURL(blob); 
				var _that = this;
				reader.onload = function(e) {
					_that.imgUrl = e.target.result;
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		toRegistration(){
			this.$router.push({
				name:'UserRegistrate'
			})
		},
		//退出登录
		tuichu(){
			this.$router.push({
				path:"/login"
			})
		},
		//弹框
		open(msg) {
			this.$alert(msg, '提示', {
				confirmButtonText: '确定'
			});
		},
		handleClose(){
			// this.role_flag_Box = false;
		}
	}
};
</script>
<style scoped>

.main_box{
	width: 80%;
	margin: 0 auto;
	display: flex;
	justify-content: center;
}

.user_login_box{
	border:1px solid #E2E2E2;
	width: 80%;
	margin:3% auto;
}
.user_box{
	display: flex;
	line-height:46px;
}
.registration{
	color: #ff9933;
	text-align: right;
	margin-right: 4%;
}
.foot_box{
	width: 80%;
	margin:0 auto;
	border-top:1px solid #7f7f7f;
	color: #9e9e9e;
	position: absolute;
	left: 10%;
	bottom: 15%;
}
@media screen and (max-width: 2000px) {
	.myDiv {
		position: relative;
		left: 0;
		top:0;
		width:100%;
		height: 100%;
		background: url('../../static/imgs/tp_login.png') no-repeat 30% 10%;
		background-size: 50% 70%;
	}
	.main_text{
		border:1px solid #E2E2E2;
		width: 30%;
		position: absolute;
		right:20%;
		top:18%;
	}
	.user_name_box{
		 line-height:40px;
		 text-align:center;
		 border-bottom:1px solid #E2E2E2;
		 font-size:18px;
	}
	.icon_box{
		color:#409EFF;
		line-height:40px;
		font-size:28px;
		border-right:1px solid #E2E2E2;
	}
}
@media screen and (max-width: 1200px) {
	.myDiv {
		position: relative;
		left: 0;
		top:0;
		width:100%;
		height: 100%;
		background: url('../../static/imgs/tp_login.png') no-repeat 30% 10%;
		background-size: 60% 55%;
	}
	.main_text{
		border:1px solid #E2E2E2;
		width: 30%;
		position: absolute;
		right:21%;
		top:18%;
	}
	.user_name_box{
		 line-height:40px;
		 text-align:center;
		 border-bottom:1px solid #E2E2E2;
		 font-size:16px;
	}
	.icon_box{
		color:#409EFF;
		line-height:30px;
		font-size:20px;
		border-right:1px solid #E2E2E2;
	}
}
@media screen and (max-width: 900px) {
	.myDiv {
		position: relative;
		left: 0;
		top:0;
		width:100%;
		height: 100%;
		background: url('../../static/imgs/tp_login.png') no-repeat 30% 10%;
		background-size: 60% 60%;
	}
	.main_text{
		border:1px solid #E2E2E2;
		width: 30%;
		position: absolute;
		right:12%;
		top:20%;
	}
	.user_name_box{
		 line-height:30px;
		 text-align:center;
		 border-bottom:1px solid #E2E2E2;
		 font-size:14px;
	}
	.icon_box{
		color:#409EFF;
		line-height:30px;
		font-size:18px;
		border-right:1px solid #E2E2E2;
	}
}
@media screen and (max-width: 600px) {
	.myDiv {
		position: relative;
		left: 0;
		top:0;
		width:100%;
		height: 100%;
		background: url('../../static/imgs/tp_login.png') no-repeat 30% 10%;
		background-size: 50% 45%;
	}
	.main_text{
		border:1px solid #E2E2E2;
		width: 30%;
		position: absolute;
		right:12%;
		top:7%;
	}
	.user_name_box{
		 line-height:30px;
		 text-align:center;
		 border-bottom:1px solid #E2E2E2;
		 font-size:14px;
	}
	.icon_box{
		color:#409EFF;
		line-height:20px;
		font-size:14px;
		border-right:1px solid #E2E2E2;
	}
}
h1{
  text-align: center;
  margin-top:5%;
}
.log_acc,.log_psd,.log_re,.noteBox{
  width:80%;
  margin: 5% auto;
  font-size: 14px;
}

.log_sub{
  width:80%;
  margin: 5% auto;
}

.el-col-lg-offset-9{
  width: 37% !important;
}
/* 验证码 */
.noteBox {
	width: 100%;
  height: 40px;
  line-height: 40px;
  color: #333;
}
.noteBox .noteContent {
	display: flex;
	width: 90%;
	margin: 0 auto;
}
	
.noteContent .noteLeft {
  display: inline-block;
}

.noteContent .noteFlex {
  flex: 1;
  flex-direction: column;
  display: inline-block;
}
.yzm{
  display: inline-block;
  width: 100px;
  background-color: #C0C0C0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.div_box{
    width: 80%;
    margin: 0 auto;
}
/* 头部 */
.type_head{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #53aee0;
    font-size: 18px;
    margin-bottom: 3%;
}
/*主体 */
.type_main_t{
	height: 40%;
    color: #fff;
    font-size: 32px;
    font-family: "微软雅黑";
    text-align: center;
	display: flex;
	flex:1;
	justify-content: space-around;
}
.type_m_l,.type_m_r{
    width: 49%;
    cursor: pointer;
}
.type_m_l{
    background: #fcb100;
	height: 100%;
	line-height: 5;
}
.type_m_r{
    background: #38a3db;
	height: 100%;
	line-height: 5;
}
.type_main_t2{
	height: 40%;
    color: #fff;
    font-size: 32px;
    font-family: "微软雅黑";
    text-align: center;
    margin-top:2%;
	display: flex;
	flex:1;
	justify-content: space-around;
}
.type_m_b{
    width: 49%;
    background: #0066b7;
     cursor: pointer;
}
#nextWrapper{
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
.nextWrapperBox{
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
	padding:0 40px;
}
</style>