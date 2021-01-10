<template>
<!--  画画布局-->
  <el-container class="draw-container">
<!--    头部菜单-->
    <el-header id="header">Header</el-header>
    <el-container>
      <!-- 侧边栏菜单-->
      <el-aside id="sidebar" width="300px">
        <side-bar style="border-color: #3C4043">

        </side-bar>
      </el-aside>
      <!--      分割线-->
      <el-divider direction="vertical"></el-divider>
      <el-main id="main">
<!--        <graph-container>-->

<!--        </graph-container>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

//导入侧边栏组件
import SideBar from "@/components/sidebar";

//导入graph容器组件
// import GraphContainer from "@/components/graphContainer"
// //导入mxgraph依赖
// import mxgraph from '../mxgraph/mxgraph';
// const {mxGraph, mxClient, mxCodec, mxUtils } = mxgraph;
//
// export default {
//   name : 'draw',
//   data() {
//     return{
//
//     }
//   },
//   mounted() {
//     if (!mxClient.isBrowserSupported()) {
//       // 判断是否支持mxgraph
//       mxUtils.error('Browser is not supported!', 200, false);
//     } else {
//       // 在容器中创建图表
//       let container = document.getElementById('main');
//       let MxGraph = mxGraph;
//       let MxCodec = mxCodec;
//       var graph = new MxGraph(container);
//       // 生成 Hello world!
//       var parent = graph.getDefaultParent();
//       graph.getModel().beginUpdate();
//       try {
//         var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 200, 80, 30);
//         var v2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30);
//         var v3 = graph.insertVertex(parent, null, 'everyBody!', 300, 350, 60, 60);
//         graph.insertEdge(parent, null, '', v1, v2);
//         graph.insertEdge(parent, null, '', v2, v3);
//         graph.insertEdge(parent, null, '', v1, v3);
//       } finally {
//         // Updates the display
//         graph.getModel().endUpdate();
//       }
//       // 打包XML文件
//       let encoder = new MxCodec();
//       let xx = encoder.encode(graph.getModel());
//       // 保存到getXml参数中
//       this.getXml = mxUtils.getXml(xx);
//     }
//   },
export default {
  components: {SideBar}
}

</script>


<style scoped>
.el-header{
  background-color: #3C4043;
}
.el-aside{
  background-color: white;
  border-right: #3C4043;
}
.draw-container{
  height: 100%;

}

</style>