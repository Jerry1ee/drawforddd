<template>
<!--  侧边栏 ： 放 DDD特定的模版图-->
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" class="el-collapse" >
      <el-collapse-item name="1" >
        <template slot="title" style="background-color: #8E8E8E;color: #3C4043">
         DDD模版
        </template>
        <el-row type="flex">
          <el-col>
            <div ref="toolItem">
              <el-row>
                <img :src="toolbarItems[0]['icon']">
              </el-row>
              <span>{{toolbarItems[0].title}}</span>
            </div>
          </el-col>
          <el-col><div>值对象</div></el-col>
        </el-row>
        <el-row type="flex">
          <el-col><div>领域服务</div></el-col>
          <el-col><div>领域事件</div></el-col>
        </el-row>
          <el-col><div>聚合</div></el-col>
          <el-col><div>聚合根</div></el-col>
        <el-row type="flex">
          <el-col><div>资源库</div></el-col>
          <el-col><div>工厂</div></el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="额外参数" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="其他功能" name="3">

      </el-collapse-item>

    </el-collapse>
  </div>

</template>

<script>

import {toolbarItems} from './toolbar'
export default {
  data() {
    return {
      activeNames: ['1']
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
  computed: {
    toolbarItems: () => toolbarItems
  }
}
</script>

<style scoped>

.el-collapse {
  border-right: none;
}


</style>