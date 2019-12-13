<template>
    <div class="newBox">
       <div class="wrapper">
           <el-table :data="enclosureData" stripe style="width: 100%">
                <el-table-column prop="appendixName" label="附件名称" width="150">
                </el-table-column>
                <el-table-column label="附件列表(点击查看)">
                    <template slot-scope="scope">
                        <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="liItem">
                            {{item.fileName}}
                        </li>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" v-show="headerBtn">
                    <template slot-scope="scope">
                        <i class="el-icon-setting"  style="cursor: pointer;" @click="goUploadPage(scope.row,scope.row.id)"></i>
                    </template>
                </el-table-column>
            </el-table>
       </div>
       <!-- 文件上传 -->
       <div class="uploadWrapper" v-show="uploadFlag">
			<div class="uploadBox">
				<div class="upload_title">
					<p>{{uploadTitle}}</p>
					<i class="el-icon-close" @click="closeUpload"></i>
				</div>
				<div class="upload_btn">
					 <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
					 <button class="btn">上传</button>
					<button class="btn" @click="deleteFile">删除</button>
				</div>
				<div class="main_info" style="display:flex;flex-direction:column;">
					<el-table :data="fileData" style="width: 100%"  @selection-change="handleUploadChange">
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
								<span class="upload" @click="downloadFile(scope.row.attachmeId,scope.row.fileName)">点击下载</span>
							</template>
						</el-table-column>
					</el-table>
					<p class="star">★：附件上传大小限制为102400 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
				</div>
			</div>
		</div>

    </div>                      
</template>

<script>
    import baseUrl from '../api/api.js';
    import '../assets/css/style.css';
    export default {
        data(){
            return {
                projectObj:JSON.parse(window.localStorage.projectObj),
                // 文件上传所需字段
                enclosureData:[{
                    id:1,
                    appendixName: "*立项批复文件",
                    attachlist: []
                },
                // {
                //     id:2,
                //     appendixName: "项目负责人授权书",
                //     attachlist: []
                // }
                ],
                headerBtn:true,
                uploadFlag:false,//
                uploadTitle:'',
                state:'', 
                num:'',
                params_type:'',
                files:{},//文件
                fileName:'',//上传文件名称
                fileSize:'',//上传文件大小
                uploadingPeople:'',//上传人
                uploadTime:'',//上传时间
                fileData:[],//上传文件表格
                attachmeId:[],// 选中的ID
                num:'',
            }
        },
        created(){
            this.uploadList();//上传列表
        },
        methods:{
            uploadshow(flag,name,num){
                this.uploadFlag = flag;
                this.params_type = name;
                this.num = num;
                this.uploadList();
            },
            downLoadupFile(item){
                this.downloadFile(item.attachmeId,item.fileName);
            },
            //上传列表
            uploadList(){
                var obj={
                        relevanceCorrelationId:this.projectObj.projectInformaPrimaryKeyId,
                        fileType:this.params_type
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
                        if(this.num == 1){
                            this.enclosureData[0].attachlist = arr;
                        }else{
                            this.enclosureData[1].attachlist = arr;
                        }
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            handleUploadChange(val){
                let deleteArr = [];
                for(let i in val){
                    deleteArr.push(val[i].attachmeId);
                }
                this.attachmeId = deleteArr;
            },
            //删除文件列表
            deleteFile(){
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
            },
            //上传文件
            loadFile(event){
                var file = event.target.files[0];
                var fileSize = file.size; 
                if(fileSize > 102400) {
                    this.$message.warning('图片大小不能超过102400KB');
                    return false;
                }
                this.$refs.file.value = null;
                this.files = file;
                var formData = new FormData();
                formData.append("projectId", this.projectObj.projectInformaPrimaryKeyId);
                formData.append("file", this.files);
                formData.append("fileType", this.params_type);

                this.$axios({
                    method: 'POST',
                    url: baseUrl + '/attachmeController/multifileUpload',
                    data:formData
                }).then(res=>{
                    if(res.data.status == 200){
                        // debugger;
                        this.uploadList();
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
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
            //新建弹框下一步中的点击附件
            goUploadPage(row,num){
                this.uploadFlag = true;
                this.num = num;
                this.uploadTitle = row.appendixName;// 标题
                this.uploadList();
            },
            // 关闭弹窗
            closeUpload(){
                this.uploadFlag = false;
                this.uploadList();
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
}
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}


.uploadWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding:50px;
    display: flex;
    flex-direction: column;
}
.uploadBox{
    width: 65%;
    height: 70%;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-top: 10%;
}
.upload_title{
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
.upload_btn{
	width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
	position: relative;
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
.file_btn{
    position: absolute;
    right: 85px;
    top: 0;
    display: inline-block;
    border:none;
    outline: none;
    width: 7%;
    height:100%;
	background-color: transparent;
	filter: alpha(opacity=0);
	-moz-opacity: 0;
	-khtml-opacity: 0;
    opacity: 0;
    background: #0095d5;
    cursor: pointer;
}
.main_info{
    width: 100%;
    margin-top: 2px;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.el-table th>.cell{
	text-align: center !important;
}
.upload:hover{
    text-decoration: underline;
    color:#f00;
    cursor: pointer;
}
.liItem{
    cursor: pointer;
}
.liItem:hover{
	color: #f00;
}
.star{
    color: #f00;
}
</style>