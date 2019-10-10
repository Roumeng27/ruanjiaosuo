var router = [
    {
        path: '/',
        redirect: {
            name: 'homeIndex'
        }
    },
    {
        path: '/homeIndex',
        name: 'homeIndex',
        component: resolve => require(['@/views/homeIndex'], resolve)
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/login'], resolve)
    },
    {
        path: '/userRegistrate',
        name: 'UserRegistrate',
        component: resolve => require(['@/views/userRegistrate'], resolve)
    },
    {
        path: '/ceshi',
        name: 'ceshi',
        component: resolve => require(['@/views/ceshi'], resolve)
    },
    {
        path: '/roleInfo',
        name: 'RoleInfo',
        component: resolve => require(['@/views/roleInfo'], resolve)
    },
    {
        path: '/logintype',
        name: 'logintype',
        component: resolve => require(['@/views/login/logintype'], resolve)
    },
    {
        path: '/projectType',
        name: 'projectType',
        component: resolve => require(['@/views/login/projectType'], resolve)
    },
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/views/home'], resolve),
        children: [
            // {
            //     path: '/',
            //     name: 'Shouye',
            //     component: resolve => require(['@/views/shouye/index.vue'], resolve),
            //     redirect: '/home/shouye'
            // },
            // {
            //     path: '/home/shouye',
            //     name: 'Shouye',
            //     component: resolve => require(['@/views/shouye/index.vue'], resolve)
            // },
            // 项目入场登记
            {
                path: '/home/admission',
                name: 'Admission',
                component: resolve => require(['@/views/tendering/admission.vue'], resolve)
            },
            // 新增项目入场登记
            {
                path: '/home/newlyAdmission',
                name: 'newlyAdmission',
                component: resolve => require(['@/views/tendering/newlyAdmission.vue'], resolve)
            },
            {
                path: '/home/subpackage',
                name: 'Subpackage',
                component: resolve => require(['@/views/tendering/subpackage.vue'], resolve)
            },
            // 自行招标
            {
                path: '/home/selfTender',
                name: 'SelfTender',
                component: resolve => require(['@/views/tendering/selfTender.vue'], resolve),
                meta: {
                    keepAlive: true, //此组件需要被缓存
                }
            },
            // 委托招标
            {
                path: '/home/entrustTender',
                name: 'EntrustTender',
                component: resolve => require(['@/views/tendering/entrustTender.vue'], resolve)
            },
            {
                path: '/home/invitaBid', //招标公告
                name: 'InvitaBid',
                component: resolve => require(['@/views/bidInvitation/invitaBid.vue'], resolve)
            },
            {
                path: '/home/changeNotice', // 变更公告
                name: 'ChangeNotice',
                component: resolve => require(['@/views/bidInvitation/changeNotice.vue'], resolve)
            },
            {
                path: '/home/bidRequest', //投标邀请
                name: 'BidRequest',
                component: resolve => require(['@/views/bidInvitation/bidRequest.vue'], resolve)
            },
            {
                path: '/home/application', //投标报名
                name: 'Application',
                component: resolve => require(['@/views/bidInvitation/application.vue'], resolve)
            },
            {
                path: '/home/auditNotice', //资审公告
                name: 'AuditNotice',
                component: resolve => require(['@/views/bidInvitation/auditNotice.vue'], resolve)
            },
            {
                path: '/home/basicInformation', //诚信库管理--基本信息
                name: 'BasicInformation',
                component: resolve => require(['@/views/credibleManagement/basicInformation.vue'], resolve)
            },
            {
                path: '/home/basicPerson', //诚信库管理--从业人员
                name: 'BasicPerson',
                component: resolve => require(['@/views/credibleManagement/basicPerson.vue'], resolve)
            },
            {
                path: '/home/chargin', //资费管理--资费
                name: 'Chargin',
                component: resolve => require(['@/views/tariffManage/chargin.vue'], resolve)
            },
            {
                path: '/home/signUp', //投标业务--投标报名
                name: 'signUp',
                component: resolve => require(['@/views/tenderBusiness/signUp.vue'], resolve)
            },
            {
                path: '/home/winingNotice', //投标业务--中标通知书
                name: 'WiningNotice',
                component: resolve => require(['@/views/tenderBusiness/winingNotice.vue'], resolve)
            },
            {
                path: '/home/finallyNotice', //投标业务--招标结果通知书
                name: 'FinallyNotice',
                component: resolve => require(['@/views/tenderBusiness/finallyNotice.vue'], resolve)
            },
            {
                path: '/home/opening', //投标业务--开标录入
                name: 'opening',
                component: resolve => require(['@/views/tenderBusiness/opening.vue'], resolve)
            },
            {
                path: '/home/review', //投标业务--评标录入
                name: 'review',
                component: resolve => require(['@/views/tenderBusiness/review.vue'], resolve)
            },
            {
                path: '/home/endingNote', //投标业务--资审结果通知书
                name: 'endingNote',
                component: resolve => require(['@/views/tenderBusiness/endingNote.vue'], resolve)
            },
            {
                path: '/home/confirmateInvita', //投标业务--邀请书确认
                name: 'ConfirmateInvita',
                component: resolve => require(['@/views/tenderBusiness/confirmateInvita.vue'], resolve)
            },
            {
                path: '/home/uploadFile', //投标业务--上传投标文件
                name: 'UploadFile',
                component: resolve => require(['@/views/tenderBusiness/uploadFile.vue'], resolve)
            },
            {
                path: '/home/receiveFile', //投标业务--招标文件领取
                name: 'ReceiveFile',
                component: resolve => require(['@/views/tenderBusiness/receiveFile.vue'], resolve)
            },
            {
                path: '/home/questionsFile', //投标业务--答疑提问
                name: 'questionsFile',
                component: resolve => require(['@/views/tenderBusiness/questionsFile.vue'], resolve)
            },
            {
                path: '/home/questionConfirmate', //投标业务--答疑澄清文件确认
                name: 'questionConfirmate',
                component: resolve => require(['@/views/tenderBusiness/questionConfirmate.vue'], resolve)
            },
            // 投标文件模块
            // 项目管理
            {
                path: '/home/projectManagement',
                name: 'projectManagement',
                component: resolve => require(['@/views/biddingDocuments/projectManagement.vue'], resolve)
            },
            // 项目信息
            {
                path: '/home/projectInfo',
                name: 'projectInfo',
                component: resolve => require(['@/views/biddingDocuments/projectInfo.vue'], resolve)
            },
            // 招标正文导入
            {
                path: '/home/biddingfileImport',
                name: 'biddingfileImport',
                component: resolve => require(['@/views/biddingDocuments/biddingfileImport.vue'], resolve)
            },
            // 评标办法设置
            {
                path: '/home/biddingsetMethods',
                name: 'biddingsetMethods',
                component: resolve => require(['@/views/biddingDocuments/biddingsetMethods.vue'], resolve)
            },
            // 开标一览表
            {
                path: '/home/bidddingOpening',
                name: 'bidddingOpening',
                component: resolve => require(['@/views/biddingDocuments/bidddingOpening.vue'], resolve)
            },
            // 投标文件组成设置 
            {
                path: '/home/biddingSetting',
                name: 'biddingSetting',
                component: resolve => require(['@/views/biddingDocuments/biddingSetting.vue'], resolve)
            },
            // 招标文件的其他材料
            {
                path: '/home/biddingOthers',
                name: 'biddingOthers',
                component: resolve => require(['@/views/biddingDocuments/biddingOthers.vue'], resolve)
            },
            // 生成招标文件
            {
                path: '/home/biddingCreatefile',
                name: 'biddingCreatefile',
                component: resolve => require(['@/views/biddingDocuments/biddingCreatefile.vue'], resolve)
            },
            // 采购模块
            // 项目入场登记
            {
                path: '/home/entryRegistrationss',
                name: 'EntryRegistrationss',
                component: resolve => require(['@/views/prequalification/entryRegistrationss.vue'], resolve)
            },
            // 项目分包
            {
                path: '/home/projectSubcontract',
                name: 'projectSubcontract',
                component: resolve => require(['@/views/prequalification/projectSubcontract.vue'], resolve)
            },
            // 自行招标
            {
                path: '/home/privateProcurement',
                name: 'privateProcurement',
                component: resolve => require(['@/views/prequalification/privateProcurement.vue'], resolve)
            },
            // 委托招标
            {
                path: '/home/procureEntrustment',
                name: 'procureEntrustment',
                component: resolve => require(['@/views/prequalification/procureEntrustment.vue'], resolve)
            },
            // 采购邀请模块
            // 采购公告->竞争性谈判
            {
                path: '/home/competitiveNegotiation',
                name: 'competitiveNegotiation',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/competitiveNegotiation.vue'], resolve)
            },
            // 资格预审模块
            // 资格预审场地预约
            {
                path: '/home/venuebooking',
                name: 'venuebooking',
                component: resolve => require(['@/views/prequalification/venuebooking.vue'], resolve)
            },
            // 资格预审文件
            {
                path: '/home/prequalificationFile',
                name: 'prequalificationFile',
                component: resolve => require(['@/views/prequalification/prequalificationFile.vue'], resolve)
            },
            // 询疑答复
            {
                path: '/home/suspectedReply',
                name: 'suspectedReply',
                component: resolve => require(['@/views/prequalification/suspectedReply.vue'], resolve)
            },
            // 资审补疑和答疑
            {
                path: '/home/reviewQuestion',
                name: 'reviewQuestion',
                component: resolve => require(['@/views/prequalification/reviewQuestion.vue'], resolve)
            },
            //组建资审委员会
            {
                path: '/home/establishCommit',
                name: 'EstablishCommit',
                component: resolve => require(['@/views/prequalification/establishCommit.vue'], resolve)
            },
            //资审结果通知书
            {
                path: '/home/endingAdvice',
                name: 'EndingAdvice',
                component: resolve => require(['@/views/prequalification/endingAdvice.vue'], resolve)
            },
            //资审申请评审结果
            {
                path: '/home/evaluationResult',
                name: 'EvaluationResult',
                component: resolve => require(['@/views/prequalification/evaluationResult.vue'], resolve)
            },
            //公共上传文件组件
            {
                path: '/home/attachmentUploading',
                name: 'attachmentUploading',
                component: resolve => require(['@/components/attachmentUploading.vue'], resolve)
            },
            // 采购业务
            // 投标报名
            {
                path: '/home/purchaseSignup',
                name: 'purchaseSignup',
                component: resolve => require(['@/views/purchaseBusiness/purchaseSignup.vue'], resolve)
            },
            // 成交通知书
            {
                path: '/home/winningBook',
                name: 'winningBook',
                component: resolve => require(['@/views/purchaseBusiness/winningBook.vue'], resolve)
            },
            // 成交结果通知书
            {
                path: '/home/invitationBook',
                name: 'invitationBook',
                component: resolve => require(['@/views/purchaseBusiness/invitationBook.vue'], resolve)
            },
            // 邀请书确认
            {
                path: '/home/invitationConfirmation',
                name: 'invitationConfirmation',
                component: resolve => require(['@/views/purchaseBusiness/invitationConfirmation.vue'], resolve)
            },
            // 上传投标文件
            {
                path: '/home/uploadFiles',
                name: 'uploadFiles',
                component: resolve => require(['@/views/purchaseBusiness/uploadFiles.vue'], resolve)
            },
            // 招标文件领取
            {
                path: '/home/receiveFiles',
                name: 'receiveFiles',
                component: resolve => require(['@/views/purchaseBusiness/receiveFiles.vue'], resolve)
            },
            // 采购--答疑提问
            {
                path: '/home/askQuestionFiles',
                name: 'askQuestionFiles',
                component: resolve => require(['@/views/purchaseBusiness/askQuestionFiles.vue'], resolve)
            },
            // 待办事项
            {
                path:'/home/notHandled', 
                name:'NotHandled', 
                component:resolve => require(['@/views/backLog/notHandled.vue'], resolve), 
                children:[
                    // 招标业务
                    // 项目入场登记
                    {
                        path:'/notHandled/admissionPage',
                        name:"AdmissionPage", 
                        component:resolve => require(['@/views/schedulePage/admissionPage.vue'], resolve), 
                    },
                     // 项目分包
                    {
                        path:'/notHandled/subpackagePage',
                        name:"SubpackagePage", 
                        component:resolve => require(['@/views/schedulePage/subpackagePage.vue'], resolve), 
                    },
                    // 招标公告、资审公告
                    {
                        path:'/notHandled/noticePage',
                        name:"NoticePage", 
                        component:resolve => require(['@/views/schedulePage/noticePage.vue'], resolve), 
                    },
                    // 组建资审委员会、组建评标委员会
                    {
                        path:'/notHandled/establishPage',
                        name:"EstablishPage", 
                        component:resolve => require(['@/views/schedulePage/establishPage.vue'], resolve), 
                    },
                     // 招标文件
                     {
                        path:'/notHandled/biddingDocumentPage',
                        name:"BiddingDocumentPage", 
                        component:resolve => require(['@/views/schedulePage/biddingDocumentPage.vue'], resolve), 
                    },
                    // 业主专家
                    {
                        path:'/notHandled/ownerExpertsPage',
                        name:"OwnerExpertsPage", 
                        component:resolve => require(['@/views/schedulePage/ownerExpertsPage.vue'], resolve), 
                    },
                    // 合同备案
                    {
                        path:'/notHandled/recordPage',
                        name:"RecordPage", 
                        component:resolve => require(['@/views/schedulePage/recordPage.vue'], resolve), 
                    },
                    // 招标异常
                    {
                        path:'/notHandled/abnormalPage',
                        name:"AbnormalPage", 
                        component:resolve => require(['@/views/schedulePage/abnormalPage.vue'], resolve), 
                    },
                    // 中标候选人公示
                    {
                        path:'/notHandled/candidatePage',
                        name:"CandidatePage", 
                        component:resolve => require(['@/views/schedulePage/candidatePage.vue'], resolve), 
                    },
                    // 中标结果公告
                    {
                        path:'/notHandled/resultPage',
                        name:"ResultPage", 
                        component:resolve => require(['@/views/schedulePage/resultPage.vue'], resolve), 
                    },
                    // 中标通知书
                    {
                        path:'/notHandled/publicityPage',
                        name:"PublicityPage", 
                        component:resolve => require(['@/views/schedulePage/publicityPage.vue'], resolve), 
                    },
                    // 资审场地预约 场地预约
                    {
                        path:'/notHandled/venueBookingPage',
                        name:"VenueBookingPage", 
                        component:resolve => require(['@/views/schedulePage/venueBookingPage.vue'], resolve), 
                    },
                    // 投标邀请书
                    {
                        path:'/notHandled/invitationToBidPage',
                        name:"InvitationToBidPage", 
                        component:resolve => require(['@/views/schedulePage/invitationToBidPage.vue'], resolve), 
                    },
                    // 电子档案
                    {
                        path:'/notHandled/emailCasePage',
                        name:"EmailCasePage", 
                        component:resolve => require(['@/views/schedulePage/emailCasePage.vue'], resolve), 
                    },
                    // 变更文件
                    {
                        path:'/notHandled/changeFilePage',
                        name:"ChangeFilePage", 
                        component:resolve => require(['@/views/schedulePage/changeFilePage.vue'], resolve), 
                    },
                    // 变更公告
                    {
                        path:'/notHandled/changeNoticePage',
                        name:"ChangeNoticePage", 
                        component:resolve => require(['@/views/schedulePage/changeNoticePage.vue'], resolve), 
                    },
                    // 答疑通知
                    {
                        path:'/notHandled/answerNoticePage',
                        name:"answerNoticePage", 
                        component:resolve => require(['@/views/schedulePage/answerNoticePage.vue'], resolve), 
                    },
                    // 答疑文件
                    {
                        path:'/notHandled/answerFilePage',
                        name:"AnswerFilePage", 
                        component:resolve => require(['@/views/schedulePage/answerFilePage.vue'], resolve), 
                    },
                    // 采购业务
                    // (采购)项目入场登记
                    {
                        path:'/notHandled/buyEntryRegistrationss',
                        name:"buyEntryRegistrationss", 
                        component:resolve => require(['@/views/schedulePage/buyEntryRegistrationss.vue'], resolve), 
                    },
                    // 采购异常
                    {
                        path:'/notHandled/buyUnusualPage',
                        name:"buyUnusualPage", 
                        component:resolve => require(['@/views/schedulePage/buyUnusualPage.vue'], resolve), 
                    },
                    // 采购文件
                    {
                        path:'/notHandled/buyProcurementNotice',
                        name:"buyProcurementNotice", 
                        component:resolve => require(['@/views/schedulePage/buyProcurementNotice.vue'], resolve), 
                    },
                    // (单一来源)成交结果公告
                    {
                        path:'/notHandled/buyNotificationResult',
                        name:"buyNotificationResult", 
                        component:resolve => require(['@/views/schedulePage/buyNotificationResult.vue'], resolve), 
                    },
                    // (竞谈竞磋)成交结果公告
                    {
                        path:'/notHandled/buyResourceResult',
                        name:"buyResourceResult", 
                        component:resolve => require(['@/views/schedulePage/buyResourceResult.vue'], resolve), 
                    },
                    // (询价)成交结果公告
                    {
                        path:'/notHandled/buyenquiryResult',
                        name:"buyenquiryResult", 
                        component:resolve => require(['@/views/schedulePage/buyenquiryResult.vue'], resolve), 
                    },
                    // 成交通知书
                    {
                        path:'/notHandled/buyProsourceNote',
                        name:"buyProsourceNote", 
                        component:resolve => require(['@/views/schedulePage/buyProsourceNote.vue'], resolve), 
                    },
                    // 组建谈判小组
                    {
                        path:'/notHandled/buyNegotiatingGroup',
                        name:"buyNegotiatingGroup", 
                        component:resolve => require(['@/views/schedulePage/buyNegotiatingGroup.vue'], resolve), 
                    },
                     // 采购人代表
                     {
                        path:'/notHandled/buyProsourceMaster',
                        name:"buyProsourceMaster", 
                        component:resolve => require(['@/views/schedulePage/buyProsourceMaster.vue'], resolve), 
                    },
                     // 采购公示
                     {
                        path:'/notHandled/buyProcurementPublic',
                        name:"buyProcurementPublic", 
                        component:resolve => require(['@/views/schedulePage/buyProcurementPublic.vue'], resolve), 
                    },
                    // 邀请函
                    {
                        path:'/notHandled/buyInvitationLetter',
                        name:"buyInvitationLetter", 
                        component:resolve => require(['@/views/schedulePage/buyInvitationLetter.vue'], resolve), 
                    },
                    // (采购)项目分包
                    {
                        path:'/notHandled/buySubpackage',
                        name:"buySubpackage", 
                        component:resolve => require(['@/views/schedulePage/buySubpackage.vue'], resolve), 
                    },
                    // (采购)变更文件
                    {
                        path:'/notHandled/buyChangeDocument',
                        name:"buyChangeDocument", 
                        component:resolve => require(['@/views/schedulePage/buyChangeDocument.vue'], resolve), 
                    },
                    // (采购)变更公告
                    {
                        path:'/notHandled/buyModifyPublicPage',
                        name:"buyModifyPublicPage", 
                        component:resolve => require(['@/views/schedulePage/buyModifyPublicPage.vue'], resolve), 
                    },
                    // (采购)答疑通知
                    {
                        path:'/notHandled/buyClearAdvicePage',
                        name:"buyClearAdvicePage", 
                        component:resolve => require(['@/views/schedulePage/buyClearAdvicePage.vue'], resolve), 
                    },
                    // 采购信息
                    {
                        path:'/notHandled/buyingLeadsPage',
                        name:"buyingLeadsPage", 
                        component:resolve => require(['@/views/schedulePage/buyingLeadsPage.vue'], resolve), 
                    },
                    // 采购公告
                    {
                        path:'/notHandled/buyNoticePage',
                        name:"buyNoticePage", 
                        component:resolve => require(['@/views/schedulePage/buyNoticePage.vue'], resolve), 
                    },
                    // (采购)合同备案
                    {
                        path:'/notHandled/contractServePage',
                        name:"ContractServePage", 
                        component:resolve => require(['@/views/schedulePage/contractServePage.vue'], resolve), 
                    },
                    // (采购)答疑文件
                    {
                        path:'/notHandled/buyAnswerDoucument',
                        name:"buyAnswerDoucument", 
                        component:resolve => require(['@/views/schedulePage/buyAnswerDoucument.vue'], resolve), 
                    },
                    // (采购)采购公示
                    {
                        path:'/notHandled/buyAnnouncePage',
                        name:"buyAnnouncePage", 
                        component:resolve => require(['@/views/schedulePage/buyAnnouncePage.vue'], resolve), 
                    },
                    // (采购)场地预约
                    {
                        path:'/notHandled/buySiteReservationPage',
                        name:"buySiteReservationPage", 
                        component:resolve => require(['@/views/schedulePage/buySiteReservationPage.vue'], resolve), 
                    },
                    // 变更采购公示
                    {
                        path:'/notHandled/buyChangePublic',
                        name:"buyChangePublic", 
                        component:resolve => require(['@/views/schedulePage/buyChangePublic.vue'], resolve), 
                    },
                    // 采购电子档案
                    {
                        path:'/notHandled/electronicPage',
                        name:"electronicPage", 
                        component:resolve => require(['@/views/schedulePage/electronicPage.vue'], resolve), 
                    },
                ],
            },
        ]
    },
    // 招标模块
    {
        path: '/selfTenderDetail',
        name: 'selfTenderDetail',
        component: resolve => require(['@/views/tendering/selfTenderDetail'], resolve),
        children: [
            // 项目入场登记
            {
                path: '/selfTenderDetail/entryRegistration',
                name: 'entryRegistration',
                component: resolve => require(['@/views/tendering/Detail/entryRegistration.vue'], resolve)
            },
            // 项目分包
            {
                path: '/selfTenderDetail/projectSubpackage',
                name: 'projectSubpackage',
                component: resolve => require(['@/views/tendering/Detail/projectSubpackage.vue'], resolve)
            },
            // 场地预约
            {
                path: '/selfTenderDetail/venueBooking',
                name: 'venueBooking',
                component: resolve => require(['@/views/tendering/Detail/venueBooking.vue'], resolve)
            },
            // 招标公告
            {
                path: '/selfTenderDetail/biddingAnnouncement',
                name: 'biddingAnnouncement',
                component: resolve => require(['@/views/tendering/Detail/biddingAnnouncement.vue'], resolve)
            },
            // 招标文件
            {
                path: '/selfTenderDetail/biddingDocument',
                name: 'biddingDocument',
                component: resolve => require(['@/views/tendering/Detail/biddingDocument.vue'], resolve)
            },
            // 主体注册
            {
                path: '/selfTenderDetail/registered',
                name: 'registered',
                component: resolve => require(['@/views/tendering/Detail/registered.vue'], resolve)
            },
            // 答疑通知
            {
                path: '/selfTenderDetail/AnswerInform',
                name: 'AnswerInform',
                component: resolve => require(['@/views/tendering/Detail/AnswerInform.vue'], resolve)
            },
            // 询疑答复
            {
                path: '/selfTenderDetail/suspectedReply',
                name: 'suspectedReply',
                component: resolve => require(['@/views/tendering/Detail/suspectedReply.vue'], resolve)
            },
            //  答疑文件
            {
                path: '/selfTenderDetail/AnswerFile',
                name: 'AnswerFile',
                component: resolve => require(['@/views/tendering/Detail/AnswerFile.vue'], resolve)
            },
            // 变更公告
            {
                path: '/selfTenderDetail/changeInfo',
                name: 'changeInfo',
                component: resolve => require(['@/views/tendering/Detail/changeInfo.vue'], resolve)
            },
            // 控制价文件
            {
                path: '/selfTenderDetail/controlFile',
                name: 'controlFile',
                component: resolve => require(['@/views/tendering/Detail/controlFile.vue'], resolve)
            },
            //  业主专家
            {
                path: '/selfTenderDetail/ownerExperts',
                name: 'ownerExperts',
                component: resolve => require(['@/views/tendering/Detail/ownerExperts.vue'], resolve)
            },
            // 组建评标委员会
            {
                path: '/selfTenderDetail/establish',
                name: 'establish',
                component: resolve => require(['@/views/tendering/Detail/establish.vue'], resolve)
            },
            // 开标情况
            {
                path: '/selfTenderDetail/openingEntry',
                name: 'openingEntry',
                component: resolve => require(['@/views/tendering/Detail/openingEntry.vue'], resolve)
            },
            //  评标情况
            {
                path: '/selfTenderDetail/evaluationEntry',
                name: 'evaluationEntry',
                component: resolve => require(['@/views/tendering/Detail/evaluationEntry.vue'], resolve)
            },
            // 中标候选人公示
            {
                path: '/selfTenderDetail/candidate',
                name: 'candidate',
                component: resolve => require(['@/views/tendering/Detail/candidate.vue'], resolve)
            },
            // 中标结果公告
            {
                path: '/selfTenderDetail/result',
                name: 'result',
                component: resolve => require(['@/views/tendering/Detail/result.vue'], resolve)
            },
            //  中标通知书
            {
                path: '/selfTenderDetail/publicity',
                name: 'publicity',
                component: resolve => require(['@/views/tendering/Detail/publicity.vue'], resolve)
            },
            // 合同备案
            {
                path: '/selfTenderDetail/record',
                name: 'record',
                component: resolve => require(['@/views/tendering/Detail/record.vue'], resolve)
            },
            // 招标异常
            {
                path: '/selfTenderDetail/abnormal',
                name: 'abnormal',
                component: resolve => require(['@/views/tendering/Detail/abnormal.vue'], resolve)
            },
            // 电子档案
            {
                path: '/selfTenderDetail/emailCase',
                name: 'emailCase',
                component: resolve => require(['@/views/tendering/Detail/emailCase.vue'], resolve)
            },
            // 履约情况
            {
                path: '/selfTenderDetail/performance',
                name: 'performance',
                component: resolve => require(['@/views/tendering/Detail/performance.vue'], resolve)
            },
            // 资格预审文件
            {
                path: '/selfTenderDetail/prequalification',
                name: 'Prequalification',
                component: resolve => require(['../views/tendering/Detail/prequalification.vue'], resolve)
            },
            // 资审场地预约
            {
                path: '/selfTenderDetail/auditSplace',
                name: 'AuditSplace',
                component: resolve => require(['../views/tendering/Detail/auditSplace.vue'], resolve)
            },
            // 资审申请结果
            {
                path: '/selfTenderDetail/applicationResult',
                name: 'applicationResult',
                component: resolve => require(['../views/tendering/Detail/applicationResult.vue'], resolve)
            },
            // 组建资审委员会
            {
                path: '/selfTenderDetail/buildCommittee',
                name: 'buildCommittee',
                component: resolve => require(['../views/tendering/Detail/buildCommittee.vue'], resolve)
            },
            //资审公告
            {
                path: '/selfTenderDetail/reviewNotice',
                name: 'reviewNotice',
                component: resolve => require(['../views/tendering/Detail/reviewNotice.vue'], resolve)
            },
            //投标报名
            {
                path: '/selfTenderDetail/bidsignup',
                name: 'bidsignup',
                component: resolve => require(['../views/tendering/Detail/bidsignup.vue'], resolve)
            },
            //资审结果通知书
            {
                path: '/selfTenderDetail/resultAdvice',
                name: 'ResultAdvice',
                component: resolve => require(['../views/tendering/Detail/resultAdvice.vue'], resolve)
            },
            //投标邀请书
            {
                path: '/selfTenderDetail/invitationToBid',
                name: 'invitationToBid',
                component: resolve => require(['../views/tendering/Detail/invitationToBid.vue'], resolve)
            },
            // 变更文件
            {
                path: '/selfTenderDetail/changeFile',
                name: 'changeFile',
                component: resolve => require(['../views/tendering/Detail/changeFile.vue'], resolve)
            }
        ]
    },
    // 采购模块
    {
        path: '/privateProcurementDetail',
        name: 'privateProcurementDetail',
        component: resolve => require(['@/views/prequalification/privateProcurementDetail'], resolve),
        children: [
            //项目入场登记
            {
                path: '/privateProcurementDetail/childEntryregistration',
                name: 'childEntryregistration',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/childEntryregistration.vue'], resolve)
            },
             //项目分包
            {
                path: '/privateProcurementDetail/childProjectsubcontract',
                name: 'childProjectsubcontract',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/childProjectsubcontract.vue'], resolve)
            },
            //采购公告
            {
                path: '/privateProcurementDetail/procurementNotice',
                name: 'ProcurementNotice',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/procurementNotice.vue'], resolve)
            },
            //投标报名
            {
                path: '/privateProcurementDetail/signUp',
                name: 'signUp',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/signUp.vue'], resolve)
            },
            // 采购信息
            {
                path: '/privateProcurementDetail/buyingLeads',
                name: 'BuyingLeads',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/buyingLeads.vue'], resolve)
            },
            // 询价邀请
            {
                path: '/privateProcurementDetail/inquiryInvitate',
                name: 'InquiryInvitate',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/inquiryInvitate.vue'], resolve)
            },
            // 采购公示
            {
                path: '/privateProcurementDetail/procurementPublic',
                name: 'procurementPublic',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/procurementPublic.vue'], resolve)
            },
            // 场地预约
            {
                path: '/privateProcurementDetail/purchasingSite',
                name: 'purchasingSite',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/purchasingSite.vue'], resolve)
            },
            //采购文件
            {
                path: '/privateProcurementDetail/prosourceDocuments',
                name: 'ProsourceDocuments',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/prosourceDocuments.vue'], resolve)
            },
            // 主体注册
            {
                path: '/privateProcurementDetail/registered',
                name: 'registered',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/registered.vue'], resolve)
            },
            // 控制价文件
            {
                path: '/privateProcurementDetail/controlpriceFile',
                name: 'controlpriceFile',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/controlpriceFile.vue'], resolve)
            },
            // 变更公告
            {
                path: '/privateProcurementDetail/changeNoticeFile',
                name: 'ChangeNoticeFile',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/changeNoticeFile.vue'], resolve)
            },
            //采购人代表
            {
                path: '/privateProcurementDetail/prosourceMaster',
                name: 'ProsourceMaster',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/prosourceMaster.vue'], resolve)
            },
            //组建谈判小组
            {
                path: '/privateProcurementDetail/negotiatingGroup',
                name: 'NegotiatingGroup',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/negotiatingGroup.vue'], resolve)
            },
            // 开标情况
            {
                path: '/privateProcurementDetail/openingCondition',
                name: 'openingCondition',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/openingCondition.vue'], resolve)
            },
            // 评审情况
            {
                path: '/privateProcurementDetail/reviewCondition',
                name: 'reviewCondition',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/reviewCondition.vue'], resolve)
            },
            // (竞谈竞搓)成交结果公告
            {
                path: '/privateProcurementDetail/contestResult',
                name: 'contestResult',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/contestResult.vue'], resolve)
            },
            // (单一来源)成交结果公告
            {
                path: '/privateProcurementDetail/notificationResult',
                name: 'NotificationResult',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/notificationResult.vue'], resolve)
            },
            // (询价)成交结果公告
            {
                path: '/privateProcurementDetail/enquiryResult',
                name: 'enquiryResult',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/enquiryResult.vue'], resolve)
            },
            // 成交通知书
            {
                path: '/privateProcurementDetail/prosourceNote',
                name: 'ProsourceNote',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/prosourceNote.vue'], resolve)
            },
            // 合同备案
            {
                path: '/privateProcurementDetail/contractFile',
                name: 'contractFile',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/contractFile.vue'], resolve)
            },
            // 采购异常
            {
                path: '/privateProcurementDetail/unusual',
                name: 'Unusual',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/unusual.vue'], resolve)
            },
            // 电子档案
            {
                path: '/privateProcurementDetail/electronicRecord',
                name: 'electronicRecord',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/electronicRecord.vue'], resolve)
            },
            // 履约情况
            {
                path: '/privateProcurementDetail/performance',
                name: 'performance',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/performance.vue'], resolve)
            },
            // 答疑通知
            {
                path: '/privateProcurementDetail/question',
                name: 'Question',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/question.vue'], resolve)
            },
            // 询疑答复
            {
                path: '/privateProcurementDetail/formalReply',
                name: 'FormalReply',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/formalReply.vue'], resolve)
            },
            // 答疑文件
            {
                path: '/privateProcurementDetail/answerDoucument',
                name: 'AnswerDoucument',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/answerDoucument.vue'], resolve)
            },
            // 邀请函
            {
                
                path: '/privateProcurementDetail/invitationLetter',
                name: 'invitationLetter',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/invitationLetter.vue'], resolve)
            },
            // 变更文件
            {
                
                path: '/privateProcurementDetail/changeDocument',
                name: 'changeDocument',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/changeDocument.vue'], resolve)
            },
            // 变更采购公示
            {
                
                path: '/privateProcurementDetail/changePublic',
                name: 'changePublic',
                component: resolve => require(['@/views/prequalification/privateProcurementDetail/changePublic.vue'], resolve)
            }
            
        ],
    }

]
export default router