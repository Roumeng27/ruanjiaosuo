<template>
  <div class="my_dialog">
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
    </el-table>
    <!-- 我觉得你真的不需要用你这个，因为你还得写代码一会儿，有点浪费时间了就 -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
        dialogTableVisible:false,
        // 你不写代码  怎么写组建？我的意思是上传的那些接口？就是这些接口，你写道一个公共组建不就行了？
        //是啊，刚才那个就是公共的，你已经写好公共组件了？对啊，我一直说那个是公共的，那你调用不就行了不会嘛
    };
  },
  watch: {},
  computed: {},
  methods: {
      showDialog(){
        this.dialogTableVisible = true;
      }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.my_dialog {
}
</style>