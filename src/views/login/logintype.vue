<template>
  <div class="myDiv">
      <div class="div_box">
          <div class="type_head">
            请选择主体类型登录&ensp;<span style="color:#53AEE0;font-size:14px;cursor: pointer;" @click="tuichu()">[退回登录]</span>
          </div>
            <div style="width:100%;height:100%;">
                <div class="type_main_t">
                    <div class="type_m_l" v-model="role_yz" @click="getRole(1)">招标(采购)人登录</div>
                    <div  class="type_m_r" v-model="role_agent" @click="getRole(2)">招标(采购)代理登录</div>
                </div>
                <div class="type_main_t2">
                    <!-- <div class="type_m_r" v-model="role_gly" @click="getRole(3)">管理员登录</div>   -->
                    <div class="type_m_r" v-model="role_zj" @click="getRole(4)">投标(供应商)人登录</div> 
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import baseUrl from '../../api/api'
import {isPoneAvailable,formatDate,checkNumber,checkPhone} from '../../api/base.js'
import '../../assets/css/style.css'
import dayjs from "dayjs";
export default {
  components:{},
  props:{},
  data(){
    return {
        userName:window.localStorage.userName,// 账号
        password:window.localStorage.password,// 密码
        checked:'',// 记住密码单选框
        verificationCode:window.localStorage.verificationCode,// 验证码
        authCode:'',// 后台获取的验证码
        keyData:'',// 后端返回的key值
        imgUrl:"",
        role_gly:'管理员',
        role_yz:'招标(采购)人',
        role_zj:'投标(供应商)人',
        role_agent:'招标(采购)代理'
    }
  },
  watch:{},
  computed:{},
  methods:{
        //退出登录
        tuichu(){
            this.$router.push({
                path:"/login"
            })
        },
        getRole(num){
            let obj = {};
            if(num == 1){
                obj = {
                    roleType:this.role_yz
                }
            }else if(num == 2){
                obj = {
                    roleType:this.role_agent
                }
            }else if(num == 3){
                obj = {
                    roleType:this.role_gly
                }
            }else if(num == 4){
                obj = {
                    roleType:this.role_zj
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/personnelController/boundRole",
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.$router.push({
                        name: 'home', 
                        // params: {
                        // 	key: this.keyData
                        // }
                    })   
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            }) 
		},
  },
  created(){
      
  },
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.div_box{
    width: 80%;
    height: 90%;
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
	justify-content: flex-start;
}
.type_m_b{
    width: 49%;
    background: #0066b7;
     cursor: pointer;
}
</style>