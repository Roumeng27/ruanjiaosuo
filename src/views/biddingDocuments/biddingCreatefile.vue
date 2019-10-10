<template>
    <div class="myDiv">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="文件检查" name="first">
                <div>
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                        </el-table-column>
                        <el-table-column  prop="entrySubcontractNumber"  label="检查项">
                        </el-table-column>
                        <el-table-column  prop="subcontractName"  label="状态">
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="电子签章" name="second">
                <div>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                        </el-table-column>
                        <el-table-column  prop="entrySubcontractNumber"  label="文件类型">
                        </el-table-column>
                        <el-table-column  prop="subcontractName"  label="已转换pdf">
                        </el-table-column>
                        <el-table-column  prop="subcontractName"  label="持续">
                        </el-table-column>
                        <el-table-column  prop="subcontractName"  label="导出">
                        </el-table-column>
                        <el-table-column  prop="subcontractName"  label="已签章">
                        </el-table-column>
                        <el-table-column prop="operation" label="电子签章">
                            <template slot-scope="scope">
                                <i class="el-icon-s-check" style="font-size:16px;cursor:pointer;"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="生成招标文件" name="third">
                <div class="infor_box">
                    <div style="font-size:20px;font-weight:bold;">工程信息</div>
                    <li>
                        <span>项目名称：</span>
                        <span>{{value}}</span>
                    </li>
                    <li>
                        <span>项目编号：</span>
                        <span>{{value}}</span>
                    </li>
                    <li>
                        <span>模板名称：</span>
                        <span>{{value}}</span>
                    </li>
                    <li>
                        <span>入场项目分包编号：</span>
                        <span>{{value}}</span>
                    </li>
                    <li>
                        <span>组织(采购)代理机构：</span>
                        <span>{{value}}</span>
                    </li>
                    <li>
                        <span>采购单位信息：</span>
                        <span>{{value}}</span>
                    </li>
                    <li>
                        <span>最后一次生成时间：</span>
                        <span>{{value}}</span>
                    </li>
                    <li>
                        <span>最后一次生成路径：</span>
                        <span>{{value}}</span>
                    </li>
                    <div style="width:100%;text-align:center;">
                        <el-checkbox v-model="value">生成标书后进行格式校验</el-checkbox>
                    </div>
                    <div style="width:100%;text-align:center;margin-top:20px;">
                        <el-button>生成</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="打印招标文件" name="fourth">打印招标文件</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        value:'',
        activeName: 'first',
        enclosureData:[],//文件检查列表
        currentPage:1,
        tableData:[],//电子签章
    }
  },
  watch:{},
  computed:{},
  methods:{
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        handleClick(tab, event) {
            console.log(tab, event);
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
    background: rgb(251, 251, 251);
}
.infor_box{
    padding:0 2%;
}
.infor_box>li{
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    line-height: 26px;
    
}
</style>