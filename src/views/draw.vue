<template>
<!--  画画布局-->
  <el-container class="draw-container">
<!--    头部菜单-->
    <el-header id="header" style="background-color: #3C4043">Header</el-header>
    <el-container>
      <!-- 侧边栏菜单-->
      <el-aside id="sidebar" width="300px">
        <!--  侧边栏 ： 放 DDD特定的模版图-->
        <div>
          <el-collapse v-model="activeNames" @change="handleChange" class="el-collapse" >
            <el-collapse-item name="1" >
              <template slot="title" style="background-color: #8E8E8E;color: #3C4043">
                DDD模版
              </template>
<!--              <el-row type="flex">-->
<!--                <el-col>-->
<!--                  <div ref="toolItem" class="toolItem">-->
<!--                    <el-row>-->
<!--                      <img :src="toolbarItems[0]['icon']">-->
<!--                    </el-row>-->
<!--                    <span>{{toolbarItems[0].title}}</span>-->
<!--                  </div>-->
<!--                </el-col>-->
<!--                <el-col><div>值对象</div></el-col>-->
<!--              </el-row>-->
<!--              <el-row type="flex">-->
<!--                <el-col><div>领域服务</div></el-col>-->
<!--                <el-col><div>领域事件</div></el-col>-->
<!--              </el-row>-->
<!--              <el-col><div>聚合</div></el-col>-->
<!--              <el-col><div>聚合根</div></el-col>-->
<!--              <el-row type="flex">-->
<!--                <el-col><div>资源库</div></el-col>-->
<!--                <el-col><div>工厂</div></el-col>-->
<!--              </el-row>-->
              <ul>
                <li v-for="item in toolbarItems" :key="item['title']" ref="toolItem">
                  <img :src="item['icon']" :alt="item['title']">
                  <span>{{item['title']}}</span>

                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="额外参数" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="其他功能" name="3">

            </el-collapse-item>

          </el-collapse>
        </div>

      </el-aside>
      <!--      分割线-->
      <el-divider direction="vertical"></el-divider>
      <!--  画布区域    -->
      <el-main id="main">
        <div class="graphContainer" ref="container"></div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>

//导入侧边栏组件
import {toolbarItems} from './toolbar'

//导入mxgraph依赖
import mxgraph from '../mxgraph/mxgraph';
const {mxGraph, mxEvent, mxUtils } = mxgraph;

//导入graph容器组件

export default {

  name : "draw",
  data() {
    return {
      activeNames: ['1'],

      graph: null,

    };
  },

  computed: {
    toolbarItems: () => toolbarItems
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },

    //定义一个创建graph的方法
    createGraph() {
      this.graph = new mxGraph(this.$refs.container)
    },

    //初始化
    initGraph() {
      if (this.R.isNil(this.graph)) {
        return
      }
      this.graph.setConnectable(true) // 允许连线
      this.graph.setCellsEditable(false) // 不可修改
      this.graph.convertValueToString = (cell) => { // 根据cell生成显示的标签
        return this.R.prop('title', cell)
      }
      this.graph.addListener(mxEvent.DOUBLE_CLICK, (graph, evt) => { // 监听双击事件
        const cell = this.R.pathOr([], ['properties', 'cell'], evt)

        console.info(cell + '被双击了') // 在控制台输出双击的cell
      })
    },

    //添加cell
    // 工具箱对象， x坐标，y坐标
    addCell(toolItem, x, y) {
      const {width, height} = toolItem
      const styleObj = toolItem['style']
      const style = Object.keys(styleObj).map((attr) => `${attr}=${styleObj[attr]}`).join(';')
      const parent = this.graph.getDefaultParent()

      this.graph.getModel().beginUpdate()
      try {
        let vertex = this.graph.insertVertex(parent, null, null, x, y, width, height, style)

        vertex.title = toolItem['title']
      } finally {
        this.graph.getModel().endUpdate()
      }
    },

    //核心方法，让工具箱项目可以被拖拽，放手时进行绘图
    initToolbar() {
      const domArray = this.$refs.toolItem
      console.log(domArray)

      if (!(domArray instanceof Array) || domArray.length <= 0) {
        return
      }
      domArray.forEach((dom, domIndex) => {
        const toolItem = this.toolbarItems[domIndex]
        const {width, height} = toolItem
        console.log(width)

        const dropHandler = (graph, evt, cell, x, y) => {
          this.addCell(toolItem, x, y)
        }
        const createDragPreview = () => {
          const elt = document.createElement('div')

          elt.style.border = '2px dotted black'
          elt.style.width = `${width}px`
          elt.style.height = `${height}px`
          return elt
        }

        mxUtils.makeDraggable(dom, this.graph, dropHandler, createDragPreview(), 0, 0, false, true)
      })
    },
  },

  mounted() {
    this.createGraph()
    this.initGraph()
    this.initToolbar()
    this.$refs.container.style.background = 'url("../mxgraph/images/grid.gif")'
  }
}

</script>


<style scoped>


.draw-container{
  height: 100%;
}
.graphContainer {
  position: relative;
  flex: 7;
  height: 100%;
  width: 100%;
}

.toolItem {

}





</style>