<template>
  <div class="graphContainer" ref="container"></div>
</template>

<script>
import mxgraph from '../mxgraph/mxgraph';
const {mxGraph, mxEvent, mxUtils } = mxgraph;
export default {

  name: "graphContainer",

  data() {
    return {
      graph: null
    }
  },
  methods: {
    //定义一个创建graph的方法
    createGraph() {
      this.graph = new mxGraph(this.$refs.container)
    },

    //初始化
    initGraph() {
      // if (this.R.isNil(this.graph)) {
      //   return
      // }
      this.graph.setConnectable(true) // 允许连线
      this.graph.setCellsEditable(false) // 不可修改
      this.graph.convertValueToString = (cell) => { // 根据cell生成显示的标签
        return this.R.prop('title', cell)
      }
      this.graph.addListener(mxEvent.DOUBLE_CLICK, (graph, evt) => { // 监听双击事件
        const cell = this.R.pathOr([], ['properties', 'cell'], evt)

        console.info(cell) // 在控制台输出双击的cell
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

      if (!(domArray instanceof Array) || domArray.length <= 0) {
        return
      }
      domArray.forEach((dom, domIndex) => {
        const toolItem = this.toolbarItems[domIndex]
        const {width, height} = toolItem

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
    this.$refs.container.style.background = 'url("./mxgraph/images/grid.gif")'
  }
}
</script>



<style scoped>

</style>