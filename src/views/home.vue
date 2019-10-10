<template>
  <div class="myDiv">
    <el-row  style="height: 100%;">
        <el-col  style="height: 100%;">
            <el-container style="height: 100%;">
                <!-- 头部 -->
                <el-header style="height:114px;line-height:60px;background-color:#e8f1fb;">
                    <div>
                         <div class="home_head">
                            <h2 class="home_le">中介服务招标采购交易系统</h2>
                            <div class="home_ri">
                                <div class="home_ri_one">
                                    <img src="../assets/imgs/home.png" alt="">
                                    <div style="margin-top:-40px;">首页</div>
                                </div>
                                <div class="home_ri_one">
                                    <img src="../assets/imgs/service.png" style="padding-left:13px;" alt="">
                                    <div style="margin-top:-40px;">服务平台</div>
                                </div>
                                <div class="home_ri_one">
                                    <img src="../assets/imgs/help.png" alt="">
                                    <div style="margin-top:-40px;">帮助</div>
                                </div>
                                <div class="home_ri_one" @click="dropOut()">
                                    <img src="../assets/imgs/out.png" alt="">
                                    <div style="margin-top:-40px;">退出</div>
                                </div>
                                <div class="head_b">{{jobType}} &emsp;<span style="font-weight:bolder;">{{userNames}}</span>,欢迎您！</div>
                            </div>
                        </div>
                        <div class="home_h_b">
                            <span style="display:inline-block;margin-left:5%;">
                                <i style="color:#fff;cursor:pointer;font-size:20px;margin-left:5px;" class="el-icon-bell"></i>
                                <i  style="color:#fff;cursor:pointer;font-size:20px;margin-left:5px;" class="el-icon-s-tools" ></i>
                                <i style="color:#fff;cursor:pointer;font-size:20px;margin-left:5px;" class="el-icon-goods"></i>
                                <i  style="color:#fff;cursor:pointer;font-size:20px;margin-left:5px;" class="el-icon-menu" id="to_role" @click="toLoginType()"></i>
                            </span>
                            <span style="color:#fff;margin-left:30px;">{{myTime}}</span>
                         </div>
                    </div>
                   
                </el-header>
                <el-container>
                    <!-- 左边导航 -->
                    <el-aside width="220px">
                        <div class="home_aside">
                            <el-menu :unique-opened='true' :router='true' :default-active="activeUrl" background-color="#FBFBFB" text-color="#333333" active-text-color="#4D7CFE" class="el-menu-vertical-demo">
                               <template v-for="(item,index) in listArr">
                                    <el-submenu :index="item.url" v-if="item.childMenus" >
                                        <template slot="title">
                                            <i :class="item.icon"></i>
                                            <span slot="title" style="cursor:pointer;">{{item.name}}</span>
                                        </template>
                                        <div  v-for="(itemb,indexb) in item.childMenus">
                                            <el-submenu :index="itemb.url" v-if="itemb.childMenus">
                                                <template slot="title">
                                                    <i :class="itemb.icon"></i>
                                                    <span slot="title" style="cursor:pointer;">{{itemb.name}}</span>
                                                </template>
                                                <el-menu-item v-for="(childc,index) in itemb.childMenus" :index="childc.url" :key="index">
                                                    {{childc.name}}
                                                </el-menu-item>
                                            </el-submenu>
                                            <el-menu-item v-else :index="itemb.url">
                                                <i :class="itemb.icon"></i>
                                                <span style="cursor:pointer;">{{itemb.name}}</span>
                                            </el-menu-item>
                                        </div>
                                    </el-submenu>
                                    <el-menu-item v-else :index="item.url">
                                        <i :class="item.icon"></i>
                                        <span style="cursor:pointer;">{{item.name}}</span>
                                    </el-menu-item>
                                </template>
                            </el-menu>
                          <!-- <el-menu :router='true' class="el-menu-vertical-demo" background-color="#FBFBFB" text-color="#333333" active-text-color="#4D7CFE">
          
                            <template v-for="(item,index) in routerList">
                              <el-submenu :index="item.path" v-if="item.children">
                                <template slot="title">
                                  <i :class="item.icon"></i>
                                  <span slot="title">{{item.name}}</span>
                                </template>
                                <el-menu-item v-for="(child,index) in item.children" :index="child.path" :key="index">
                                  {{child.name}}
                                </el-menu-item>
                              </el-submenu>
                              <el-menu-item v-else :index="item.path">
                                <i :class="item.icon"></i>
                                <span>{{item.name}}</span>
                              </el-menu-item>
                            </template>
                          </el-menu> -->
                        </div>
                    </el-aside>
                    <!-- 主体 -->
                    <el-main>
                        <router-view ></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-col>
    </el-row>
    
  </div>
</template>

<script>
import baseUrl from '../api/api'
import dayjs from "dayjs";
export default {
  components: {},
  props: {},
  data() {
    return {
      jobType:'',
      myTime: "", //当前动态时间
      listArr: [], //导航栏列表数组
      activeUrl:'',//刷新页面依然等于当前path值
      keyData:'',
      infoForm:'',
      role:'',
      keyD:'',
      userNames:'',
      userName:window.localStorage.userName,// 账号
      password:window.localStorage.password,// 密码
      checked:'',// 记住密码单选框
      verificationCode:window.localStorage.verificationCode,// 验证码
      str_model:'',
    };
  },
  watch: {
    $route: "myroute"
  },
  created() {
    var keyStr = this.$route.query.key;
    this.role = this.$route.query.role;
		if(keyStr){
      window.localStorage.login = keyStr;
    }
    this.activeUrl = this.$route.path;
    setInterval(() => {
        this.myTime = dayjs().format("YYYY年MM月DD日 HH时mm分ss秒");
    }, 1000);

    // if(keyStr){
    //     // this.keyData = window.localStorage.getItem(this.getQueryString('keyStr'));
    //     window.localStorage.login = keyStr;
    // }else{
    //    window.localStorage.getItem('login');
    // };
    
    this.getList();
    this.getUserList();
    if(this.role != undefined){
      this.getRoleType();
    }
  },
  methods: {
    //左边导航栏
    getList() {
      this.$axios({
        method: "POST",
        url: baseUrl+"/menuController/selectMenuList"
      }).then(res => {
        if(res.status == 200){
          this.listArr = res.data.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getRoleType(){
      this.$axios({
        method:'POST',
        url:baseUrl + '/personnelController/boundRole',
        data:{
          roleType:this.role
        }
      }).then(res=>{
        if(res.data.status == 200){
        }else{
          this.$router.push({
            name:'RoleInfo'
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getUserList(){
      this.$axios({
        method:'GET',
        url:baseUrl + '/personnelController/personInfo'
      }).then(res=>{
        if(res.data.status == 200){
          this.userNames = res.data.data.userName;
          this.jobType = res.data.data.roleVo.roleType;
          window.localStorage.biddingPurchasingAgency = res.data.data.personnelId;
          window.localStorage.biddingPurchasingAgencyName = res.data.data.companyName;
          window.localStorage.role_types = res.data.data.roleVo.roleType;
          window.localStorage.biddingPurchasingAgencyUserId = res.data.data.userId;
        }else{
          this.$layer.msg(res.data.msg);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    toLoginType(){
      if(this.jobType == '管理员'){
        $('#to_role').css('disabled','disabled');
      }else{
        this.$router.push({
          name:'logintype'
        });
      }
      
      window.sessionStorage.removeItem('str_model');
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if(r != null) return decodeURIComponent(r[2]);
      return null;
    },
    //退出登录
    dropOut() {
      this.$axios({
        method:'POST',
        url:baseUrl + '/personnelController/logOut'
      }).then(res=>{
        if(res.data.status == 200){
          window.localStorage.removeItem('login');
          this.$router.push({
            path: "/login"
          });
        }else{
          this.$layer.msg(res.data.msg);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    myroute() {
      	this.activeUrl = this.$route.path;
    },
  },
  
};
</script>
<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
}
.el-header {
  padding: 0 !important;
}
.home_head {
  height: 80px;
  position: relative;
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.home_le {
  color: #f00;
  font-size: 28px;
  margin-left: 1%;
}
.home_ri {
  margin: 0.5%;
}
.home_ri_one {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
.head_b {
  position: absolute;
  left: 23%;
  bottom: -12px;
}
.home_h_b {
  width: 100%;
  height: 34px;
  line-height: 34px;
  background-color: #368bed;
  /* #0371c5 */
}

/* 左边导航 */
.home_aside {
  position: absolute;
  top: 114px;
  left: 0;
  bottom: 0;
  width: 220px;
  background: #777;
}
.home_aside > ul {
  height: 100%;
  background: #ccc;
  overflow-y: scroll;
}
/* Z主体 */
.el-main {
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  overflow-y: hidden;
}

</style>