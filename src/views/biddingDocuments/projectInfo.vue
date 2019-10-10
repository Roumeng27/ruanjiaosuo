<template>
    <!-- 项目信息  -->
    <div class="newBox">
        <div class="wrapper">
            <table class="tableClass">
                <tr>
                    <th colspan="4">项目信息</th>
                </tr>
                <tr>
                    <td class="tableTitle">入场项目(分包)编号</td>
                    <td >R190301W07G0037</td>
                    <td class="tableTitle">招标项目编号</td>
                    <td>RJS2019301</td>
                </tr>
                <tr>
                    <td class="tableTitle">招标项目名称</td>
                    <td colspan="3" style="text-align:start;">公开招标不公开分包演示</td>
                </tr>
                <tr>
                    <td class="tableTitle">招标(采购)人</td>
                    <td>测试用户一</td>
                    <td class="tableTitle">招标(采购)代理机构</td>
                    <td>软交所招标采购交易中心测试单位(测试)</td>
                </tr>
                <tr>
                    <td class="tableTitle">开标时间</td>
                    <td>2019年3月4日 13:20</td>
                    <td class="tableTitle">开标地点</td>
                    <td>第二开标室</td>
                </tr>
            </table>
            <div class="sureBtn">
                <button class="btn" @click="sureInfo">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
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
    padding: 20px;
    display: flex;
    flex-direction: column;
}
.handleMain{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}
.tableClass{
    width: 100%;
}
.sureBtn{
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
table,td,th{
    border:2px solid #95d7f9;     
    border-collapse:collapse;
    line-height: 24px;
}
.tableTitle{
    background: #c9e7eb;
    text-align: center;
}
.sureBtn{
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn{
    height: 35px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
</style>