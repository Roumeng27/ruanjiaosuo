<template>
    <div class="box" >
       <div></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                bankName:''
            }
        },
        created() {
            this.proving()
        },
        methods: {
            proving() {
                this.$message.warning('请选择您要删除的项目')
            },
        },
    }
</script>

<style  scoped>
</style>