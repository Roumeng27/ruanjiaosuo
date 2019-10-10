<template>
    <div class="myDiv">
        <div>
            <el-table :data="enclosureData" stripe style="width: 100%">
                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                </el-table-column>
                <el-table-column  prop="entrySubcontractNumber"  label="文件名称">
                </el-table-column>
                <el-table-column  prop="subcontractName"  label="配置投标所需扫描件">
                </el-table-column>
                <el-table-column  prop="subcontractName"  label="是否必选">
                </el-table-column>
                <el-table-column  prop="subcontractName"  label="是否选择">
                </el-table-column>
                <el-table-column  prop="subcontractName"  label="查看/上传">
                    <template slot-scope="scope">
                        <i class="el-icon-setting" style="font-size:16px;cursor:pointer;"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top:2%;">
            <div class="new_nav" style="margin-bottom:10px;">
                <button class="nav_co nav_save">新增</button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                </el-table-column>
                <el-table-column  prop="entrySubcontractNumber"  label="材料名称">
                </el-table-column>
                <el-table-column  prop="subcontractName"  label="查看文件">
                    <template slot-scope="scope">
                        <i class="el-icon-setting" style="font-size:16px;cursor:pointer;"></i>
                    </template>
                </el-table-column>
                <el-table-column  prop="subcontractName"  label="删除文件">
                    <template slot-scope="scope">
                        <i class="el-icon-delete" style="font-size:16px;cursor:pointer;"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 投标书格式 -->
        <div class="mask1"  v-show="tenderShow"></div>
        <div class="choose_box" v-show="tenderShow">
            <div class="new_head">
                <div style="padding-left:10px;">投标书</div>
                <div @click="closeFile()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="tender_box" style="width:80%;text-align:left;margin:0 auto;">
                <div style="width:100%;text-align:center;font-size:26px;font-weight:bold;">投标书（格式）</div>
                <div>&emsp;致：</div>
                <div>&emsp;根据贵方为(项目名称)项目招标采购货物及服务的投标邀请(招标编号),签字代表(姓名、职务)经正式授权并代表投标人 （投标人名称、地址）提交下述文件正本一份及副本份：</div>
                <div>&emsp;1. 开标一览表；</div>
                <div>&emsp;2. 其它遵守国家有关法律、法规和规章，按招标文件中投标人须知和技术规格要求提供的有关文件；</div>
                <div>&emsp;3. 以形式出具的投标保证金，金额为人民币元。</div>
                <div>据此，我方在此郑重承诺：</div>
                <div>&emsp;（1）我方提交的投标文件资料是完整的、真实的和准确的。我方同意按照贵方的要求，提供有关的数据和资料。为此，我们授权任何相关的个人和公司向贵方提供要求的和必要的真实情况和资料以证实我们所填报的各项内容。如果在该项目招标过程中或者在获得中标后，采购人或有管辖权的行政监管机构发现并查实我方在该项目的投标中所报的资料存在虚假或不真实的信息或者伪造数据、资料或证书等情况，我方将无条件地自动放弃该项目的投标资格和中标资格；如果我方已经收到中标通知书，我方将无条件的承认，我方收到的该项目的中标通知书为无效文件，对采购人不具有任何法律约束力，由此造成的任何损失均由我方承担；本段承诺是我方真实意思的表示且具有相对独立性，不管是否有其他相反的说明，本段承诺均为我方投标文件的有效组成内容，对我方在与该项目有关的任何行为中始终具有优先的法律约束力。</div>
                <div>&emsp;（2）我方已详细审查全部招标文件，包括第号（招标编号、补充通知）（如果有的话），及有关附件中所有的须知、事项、格式、条款和规范要求等，我们完全理解并同意放弃对这方面有不明及误解的权力。若我方的投标文件没有按招标文件的要求提交全部资料，或投标文件没有对招标文件做出实质性响应，其风险由我方自行承担。</div>
                <div>&emsp;（3）我方具备《中华人民共和国政府采购法》第二十二条规定的所有条件。我方保证没有处于被责令停业，投标资料被取消，财产被接管、冻结，破产状态；保证在最近三年内的经营活动中没有重大违法记录、骗取中标和严重违约及重大质量、安全问题。我方不是为此招标项目的前期准备工作提供设计、咨询服务的任何法人及其任何附属机构（单位）。与招标采购单位聘请的为此项目提供咨询服务的公司及任何附属机构均无关联，我方不是招标采购单位的附属机构。</div>
                <div>&emsp;（4）如果我方获得中标，我方将按招标文件规定的工期、交货地点、售后服务等要求履行招标文件要求的所有合同责任和义务。</div>
                <div>&emsp;（5）招标文件中规定的所有应提交和交付的货物及服务等，我方的投标费率为：%。</div>
                <div>&emsp;（6）本投标有效期为自开标日起个日历日。</div>
                <div>&emsp;（7）在规定的开标时间后，我方保证遵守招标文件中有关保证金的规定。</div>
                <div>&emsp;（8）我方完全理解贵方不一定接受最低价及选择性报价的投标或收到的任何投标。与本投标有关的一切正式往来信函请寄：</div>
                <div>与本投标有关的一切正式往来信函请寄：</div>
                <div style="display:flex;justify-content: space-between;">
                    <span>地址:{{value}}</span>
                    <span style="width:50%;">传真:{{value}}</span>
                </div>
                <div style="display:flex;justify-content: space-between;">
                    <span>电话:{{value}}</span>
                    <span style="width:50%;">电子函件:{{value}}</span>
                </div>
                <div style="margin-top:30px;">&emsp;投标人授权代表签字： </div>
                <div>&emsp;投标人名称（全称）：</div>
                <div>&emsp;投标人开户银行（全称）： </div>
                <div>&emsp;投标人银行帐号：</div>
                <div>&emsp;投标人银行行号：</div>
                <div>&emsp;投标人公章：</div>
            </div>
        </div>
        <!-- 开标一览表 -->
        <div class="mask2"  v-show="bidOpendingShow"></div>
        <div class="choose_box" v-show="bidOpendingShow">
            <div class="new_head">
                <div style="padding-left:10px;">开标一览表</div>
                <div @click="closeFile()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div style="width:100%;text-align:center;">
                <div style="width:100%;text-align:center;font-size:28px;font-weight:bold;">开标一览表</div>
                <div class="open_box">
                    <div class="flex_box">
                        <span>入场项目分包编号：</span>
                        <span>{{value}}</span>
                    </div>
                    <div class="flex_box">
                        <span>项目名称：</span>
                        <span>{{value}}</span>
                    </div>
                    <table border="1"  cellspacing="0" cellpadding="0"  width = 400; height = 200;>
                        <tr>
                            <td>标题</td>
                            <td>内容</td>
                        </tr>
                        <tr>
                            <td>投标人</td>
                            <td>{{value}}</td>
                        </tr>
                        <tr>
                            <td>费率</td>
                            <td>{{value}}%</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!-- 投标人基本信息表 -->
        <div class="mask3"  v-show="basicInforShow"></div>
        <div class="choose_box" v-show="basicInforShow">
            <div class="new_head">
                <div style="padding-left:10px;">投标人基本信息表</div>
                <div @click="closeFile()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div  class="basicInfor_box">
                <div style="text-align:center;margin:0 auto;">
                    <div style="font-size:28px;font-weight:bold;">投标人基本信息表</div>
                    <div style="width:80%;text-align:center;">
                        <span style="display: inline-block;width:50%;">招标项目名称：{{value}}</span>
                        <span style="display: inline-block;">招标编号：{{value}}</span>
                    </div>
                    <table  border="1"  cellspacing="0" cellpadding="0" style="width:60%;text-align:center;margin:0 auto;">
                        <tr>
                            <td colspan="6">投标人信息</td>
                        </tr>
                        <tr>
                            <td>投标人全称</td>
                            <td colspan="2"></td>
                            <td>经营场所面积</td>
                            <td colspan="2"></td>
                        </tr>
                        <tr>
                            <td>地址</td>
                            <td colspan="2"></td>
                            <td>法人代表</td>
                            <td colspan="2"></td>
                        </tr>
                        <tr>
                            <td>成立时间</td>
                            <td colspan="2"></td>
                            <td>注册资金</td>
                            <td colspan="2"></td>
                        </tr>
                        <tr>
                            <td>经营范围</td>
                            <td colspan="5"></td>
                        </tr>
                        <tr>
                            <td>近三年的奖励情况</td>
                            <td colspan="5"></td>
                        </tr>
                        <tr>
                            <td>近三年在招标采购及行业集中采购活动中是否有违法、违纪记录</td>
                            <td colspan="5"></td>
                        </tr>
                        <tr>
                            <td>近三年是否有受到行业协会处罚或存在争议事项说明</td>
                            <td colspan="5"></td>
                        </tr>
                        <tr>
                            <td>近三年所承担的项目是否出现过重大事故</td>
                            <td colspan="5"></td>
                        </tr>
                        <tr>
                            <td colspan="6">供应商财务简况表</td>
                        </tr>
                        <tr>
                            <td>序号</td>
                            <td>年份</td>
                            <td>总资产(万元)</td>
                            <td>净资产(万元)</td>
                            <td>年营业额(万元)</td>
                            <td>年净利润(万元)</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div  style="width:80%;text-align:center;">
                        注：投标人所述奖励情况须提供相应证明文件(加盖单位公章)的复印件<br>
                        投标人(盖章)：<br>
                        授权代表签字：<br>
                        日期：
                    </div>
                    <table  border="1"  cellspacing="0" cellpadding="0" style="width:60%;text-align:center;margin:0 auto;">
                        <tr>
                            <td>序号</td>
                            <td colspan="4"></td>
                            <td>查看</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!-- 投标人业绩情况表 -->
        <div class="mask3"  v-show="performanceShow"></div>
        <div class="choose_box" v-show="performanceShow">
            <div class="new_head">
                <div style="padding-left:10px;">投标人项目业绩情况表</div>
                <div @click="closeFile()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div  class="basicInfor_box">
                <div style="font-size:28px;font-weight:bold;text-align:center;">投标人项目业绩情况表</div>
                <div>投标人名称：</div>
                <div>招标编号：</div>
                <table  border="1"  cellspacing="0" cellpadding="0" style="width:90%;text-align:center;margin:0 auto;">
                    <tr>
                        <td>序号</td>
                        <td style="width:200px;">起讫时间</td>
                        <td style="width:200px;">项目概况</td>
                        <td style="width:200px;">项目金额(元)</td>
                        <td style="width:200px;">项目实施地点</td>
                        <td style="width:200px;">项目负责人</td>
                        <td style="width:200px;">业主单位</td>
                        <td style="width:200px;">业主联系人及电话</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <div>投标单位(盖章)：</div>
                <div>授权代表(签字)：</div>
                <div>日期：</div>
                <div style="font-weight:bold;">附：</div>
                <div>项目扫描件：</div>
                <table  border="1"  cellspacing="0" cellpadding="0" style="width:90%;text-align:center;margin:0 auto;">
                    <tr>
                        <td>序号</td>
                        <td colspan="6">证书名称</td>
                        <td>查看</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 项目组人员一览表 -->
        <div class="mask3"  v-show="personShow"></div>
        <div class="choose_box" v-show="personShow">
            <div class="new_head">
                <div style="padding-left:10px;">项目组人员一览表</div>
                <div @click="closeFile()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div  class="basicInfor_box">
                <div style="font-size:28px;font-weight:bold;text-align:center;">项目组人员一览表</div>
                <div>投标人名称：</div>
                <div>招标编号：</div>
                <table  border="1"  cellspacing="0" cellpadding="0" style="width:90%;text-align:center;margin:0 auto;">
                    <tr>
                        <td style="width:200px;">姓名</td>
                        <td style="width:200px;">出生年月</td>
                        <td style="width:200px;">专业</td>
                        <td style="width:200px;">职称</td>
                        <td style="width:200px;">从业经历</td>
                        <td style="width:200px;">本项目岗位职责</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <div>投标单位(盖章)：</div>
                <div>授权代表(签字)：</div>
                <div>日期：</div>
                <div style="font-weight:bold;">附：</div>
                <div>项目扫描件：</div>
                <table  border="1"  cellspacing="0" cellpadding="0" style="width:90%;text-align:center;margin:0 auto;">
                    <tr>
                        <td>序号</td>
                        <td colspan="4">证书名称</td>
                        <td>查看</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        value:'',
        enclosureData:[
            {
                subcontractName:1
            }
        ],//第一个数据列表
        tableData:[],//第二个数据列表
        currentPage:1,
        tenderShow:false,//投标书格式
        bidOpendingShow:false,//开标一览表
        basicInforShow:false,//投标人基本信息表
        performanceShow:false,//项目业绩情况表
        personShow:false,//项目组人员一览表
    }
  },
  watch:{},
  computed:{},
  methods:{
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        closeFile(){
            this.tenderShow = false;
            this.bidOpendingShow = false;
            this.basicInforShow = false;
            this.performanceShow = false;
            this.personShow = false;
        }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
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
.mask1 {
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
  z-index: 4;
}
.choose_box{
  width: 100%;
  height:100%;
  z-index: 5;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  overflow-y: hidden;
  padding-bottom:50px; 
  }
  .tender_box{
      height: 99%;
      overflow-y: scroll;
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
.chooseMain{
    width: 90%;
    margin: 0 auto;
}
.open_box{
    width: 500px;
    margin:0 auto;
}
.flex_box{
    display: flex;
    justify-content: space-between;
}
table,tr,td{
    border: 1px solid #333;
}
td{
    width: 100px;
    height: 40px;
}
.basicInfor_box{
    width: 80%;
    height: 100%;
    margin: 0 auto;
    overflow-y: scroll;
}
</style>