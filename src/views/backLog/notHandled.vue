<template>
    <div class="newBox">
        <div class="wrapper">
            <div class="main_info">
                <el-table :data="handleListData" stripe style="width: 100%">
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column  label="主题" width="500" :show-overflow-tooltip = 'true'>
                        <template slot-scope="scope">
                            <span class="corlor_un" @click="judgeDetail(scope.row)">{{scope.row.theme}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="submitter" label="提交人">
                    </el-table-column>
                    <el-table-column prop="sendingTime" label="发送时间">
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="totalSize">
                </el-pagination>
            </div>
        </div>
        <!-- 代办详情 -->
        <div class="backlogWrapper">
            <router-view></router-view>
        </div>
    </div>
    
</template>

<script>
import baseUrl from '../../api/api'
import dayjs from "dayjs"
import '../../assets/css/style.css'
import AdmissionPage from '../schedulePage/admissionPage.vue';// 项目入场登记
import SubpackagePage from '../schedulePage/subpackagePage.vue';// 项目分包
import NoticePage from '../schedulePage/noticePage.vue';// 招标公告、资审公告
import EstablishPage from '../schedulePage/establishPage.vue';// 组建资审委员会、组建评标委员会
import BiddingDocumentPage from '../schedulePage/biddingDocumentPage.vue';// 招标文件
import OwnerExpertsPage from '../schedulePage/ownerExpertsPage.vue';// 业主专家
import RecordPage from '../schedulePage/recordPage.vue';// 合同备案
import AbnormalPage from '../schedulePage/abnormalPage.vue';// 招标异常
import CandidatePage from '../schedulePage/candidatePage.vue';// 中标候选人公示
import ResultPage from '../schedulePage/resultPage.vue';// 中标结果公告
import PublicityPage from '../schedulePage/publicityPage.vue';// 中标通知书
import VenueBookingPage from '../schedulePage/venueBookingPage.vue';// 资审场地预约 场地预约
import InvitationToBidPage from '../schedulePage/invitationToBidPage.vue';// 投标邀请书
import EmailCasePage from '../schedulePage/emailCasePage.vue';// 电子档案
import ChangeFilePage from '../schedulePage/changeFilePage.vue';// 变更文件
export default {
    components:{
        AdmissionPage,
        SubpackagePage,
        NoticePage,
        EstablishPage,
        BiddingDocumentPage,
        OwnerExpertsPage,
        RecordPage,
        AbnormalPage,
        CandidatePage,
        ResultPage,
        PublicityPage,
        VenueBookingPage,
        InvitationToBidPage,
        EmailCasePage,
        ChangeFilePage
    },
    data(){
        return {
            handleListData:[],//代办事项列表
            sendingTime:'',//待办事项时间
            currentPage:1,//当前页
            pageSize: 10, //每页条数
            pageTotal: 0, //总页数
            totalSize: 0, //总条数
        }
    },
    created(){
        this.getHandleList();//查询代办事项
    },
    methods:{
        //查询代办理事项列表
        getHandleList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/toDoListController/select',
                data:{
                    pageNo: this.currentPage,
                    pageSize: this.pagesize,
                    state: "待办理"
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.handleListData = res.data.data.list;
                    this.handleListData.map((item,index)=>{
                        item.sendingTime = dayjs(item.sendingTime).format('YYYY-MM-DD HH:mm:ss');
                    })
                    this.totalSize = res.data.data.total;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //分页
        handleSizeChange(val){
            // 每页条数
        },
        handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getHandleList();
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        //评委抽取申请弹框
        judgeDetail(row){
            if (row.businessLinks == "项目入场登记"&& (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'AdmissionPage',
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "项目入场登记" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'buyEntryRegistrationss'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "项目分包" && (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'SubpackagePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "项目分包" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'buySubpackage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "组建资审委员会" || row.businessLinks == "组建评标委员会"){
                this.$router.push({ 
                    name:'EstablishPage',
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "招标公告" || row.businessLinks == "资审公告"){
                this.$router.push({ 
                    name:'NoticePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "采购公示" && row.procurementMode == "单一来源"){
                this.$router.push({ 
                    name:'buyAnnouncePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "招标文件"){
                this.$router.push({ 
                    name:'BiddingDocumentPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "业主专家"){
                this.$router.push({ 
                    name:'OwnerExpertsPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "合同备案" && (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'RecordPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "合同备案" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'ContractServePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "招标异常"){
                this.$router.push({ 
                    name:'AbnormalPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "中标候选人公示"){
                this.$router.push({ 
                    name:'CandidatePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization,//招标组织方式
                    procurementMode:row.procurementMode
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "中标结果公告"){
                this.$router.push({ 
                    name:'ResultPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "中标通知书"){
                this.$router.push({ 
                    name:'PublicityPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if (row.businessLinks == "资审申请结果"){

            }else if (row.businessLinks == "资格预审文件"){

            }else if(row.businessLinks == "资审场地预约" || row.businessLinks == "场地预约" && (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'VenueBookingPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    theme:row.theme,// 信息
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "场地预约" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'buySiteReservationPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    theme:row.theme,// 信息
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "电子档案"&& (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'EmailCasePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "电子档案" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'electronicPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "投标邀请书"){
                this.$router.push({ 
                    name:'InvitationToBidPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "变更文件" && (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'ChangeFilePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "变更文件" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'buyChangeDocument'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "变更公告" && (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'ChangeNoticePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "变更公告" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'buyModifyPublicPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "答疑通知" && (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'answerNoticePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "答疑通知" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'buyClearAdvicePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "答疑文件" && (row.procurementMode == "公开招标"  || row.procurementMode == "邀请招标")){
                this.$router.push({ 
                    name:'AnswerFilePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "答疑文件" && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商" || row.procurementMode == "单一来源" || row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'buyAnswerDoucument'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "采购文件"){
                this.$router.push({ 
                    name:'buyProcurementNotice'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "变更采购公示"){
                this.$router.push({ 
                    name:'buyChangePublic'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "采购信息" && (row.procurementMode == "询价")){
                this.$router.push({ 
                    name:'buyingLeadsPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "采购公告"){
                this.$router.push({ 
                    name:'buyNoticePage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "成交结果公告"  && (row.procurementMode == "竞争性谈判" || row.procurementMode == "竞争性磋商")){
                this.$router.push({ 
                    name:'buyResourceResult'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "成交结果公告"  && row.procurementMode == "单一来源"){
                this.$router.push({ 
                    name:'buyNotificationResult'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "成交结果公告"  && row.procurementMode == "询价"){
                this.$router.push({ 
                    name:'buyenquiryResult'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "成交通知书"){
                this.$router.push({ 
                    name:'buyProsourceNote'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "采购异常"){
                this.$router.push({ 
                    name:'buyUnusualPage'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "采购人代表"){
                this.$router.push({ 
                    name:'buyProsourceMaster'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "采购公示"){
                this.$router.push({ 
                    name:'buyProcurementPublic'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "组建谈判小组"){
                this.$router.push({ 
                    name:'buyNegotiatingGroup'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }else if(row.businessLinks == "邀请函"){
                this.$router.push({ 
                    name:'buyInvitationLetter'
                })
                let obj = {
                    referenceId:row.referenceId,// 关联ID
                    toDoListId:row.toDoListId,// 待办事项id
                    auditStatus:row.auditStatus,// 审核状态
                    businessLinks:row.businessLinks,// 待办名称
                    totalItemId:row.totalItemId,// 总包keyID
                    entrySubcontractNumber:row.entrySubcontractNumber,// 入场项目项目分包编号
                    totalProjectNumber:row.totalProjectNumber,// 总包编号
                    subItemId:row.subItemId,// 分包keyID
                    biddingOrganization:row.biddingOrganization//招标组织方式
                }
                window.localStorage.waitCase = JSON.stringify(obj)
            }
        },
  },
  
}
</script>
<style scoped>
.newBox{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
}
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.main_info{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.pagination {
  width: 100%;
  padding: 20px 60px ;
  display: flex;
  justify-content: flex-end;
}
.el-icon-close{
    font-size: 24px; 
}
.corlor_un:hover{
    color:#f00;
    cursor: pointer;
    text-decoration:underline;
}

.backlogWrapper{
     width: 100%;
    height: 100%;
}
</style>