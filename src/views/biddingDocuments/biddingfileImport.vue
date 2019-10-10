<template>
    <!-- 招标正文导入  -->
    <div class="newBox">
        <div class="wrapper">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>导入Word模板</el-breadcrumb-item>
                <el-breadcrumb-item>导出Word模板</el-breadcrumb-item>
                <el-breadcrumb-item class="star">点击[导出Word模板]将模板导出到本机,编辑后,点击[新增文件]选择编辑好的word即可.</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
        methods:{

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
.star{
    color: #f00 !important;
}
</style>