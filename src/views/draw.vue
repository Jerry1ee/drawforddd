<template>
<!--  画画布局-->
  <el-container class="draw-container">
<!--    头部菜单-->
    <el-header id="header" style="background-color: #3C4043">
      <el-row>
        <div id="graphMenu" class="graphMenu" ref="graphMenu">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu"
                mode="horizontal"
                @select="handleSelect"
                background-color="#3C4043"
                text-color="#fff"
                active-text-color="#ffd04b">
              <el-menu-item index="1" class="el_menu_item">主页</el-menu-item>
              <el-submenu index="2" class="el_menu_item">
                <template slot="title">文件</template>
                <el-menu-item index="2-1">导入</el-menu-item>
                <el-menu-item index="2-2">导出</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项1</el-menu-item>
                  <el-menu-item index="2-4-2">选项2</el-menu-item>
                  <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="3" class="el_menu_item"
                            v-on:click="this.$message('这是一条消息提示')">帮助</el-menu-item>
              <el-menu-item index="4" class="el_menu_item"><a href="https://www.ele.me"
                                                                            target="_blank">其他</a></el-menu-item>
            </el-menu>
          </div>
      </el-row>

    </el-header>
    <el-container>
      <!-- 侧边栏菜单-->
      <el-aside id="sidebar" width="18%">
        <!--  侧边栏 ： 放 DDD特定的模版图-->
        <div>
          <el-collapse v-model="activeNames" @change="handleChange" class="el-collapse" >
            <el-collapse-item name="1" >
              <template slot="title" style="background-color: #8E8E8E;color: #3C4043">
                DDD 战术模式
              </template>
              <ul>
                <li v-for="item in toolbarItems" :key="item['title']" ref="toolItem">
                  <img :src="item['icon']" :alt="item['title']" class="img">
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
<!--      &lt;!&ndash;      分割线&ndash;&gt;-->
<!--      <el-divider direction="vertical"></el-divider>-->
      <!--  画布区域    -->
      <el-main id="main">
        <div id="graphButton" class="graphButton" ref="graphButton">
          <el-button size="mini"  icon="el-icon-edit">验证</el-button>
          <el-button size="mini"  icon="el-icon-delete" @click="deleteCell">删除</el-button>
          <el-button size="mini"  icon="el-icon-top-left" @click="undo">撤销</el-button>
          <el-button size="mini"  icon="el-icon-zoom-out" @click="zoomOut"></el-button>
          <el-button size="mini"  icon="el-icon-zoom-in" @click="zoomIn"></el-button>
          <el-button size="mini" @click="showProperties">测试<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <div id="graphContainer" class="graphContainer" ref="container"></div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>

//导入侧边栏组件
import {toolbarItems} from './toolbar'

//导入mxgraph依赖
import mxgraph from '../mxgraph/mxgraph';
const {mxEvent, mxUtils, mxEditor,mxGraphHandler, mxCell, mxGeometry, mxConnectionHandler, mxImage, mxEdgeStyle, mxConstants } = mxgraph;

const connectorIcon = require('../../public/icon/connector.gif');
//导入graph容器组件

export default {

  name : "draw",
  data() {
    return {
      activeNames: ['1'],
      editor: null,
      graph: null,
      container: null,

      //menu
      activeIndex: '1',
      activeIndex2: '1'

    };
  },

  computed: {
    toolbarItems: () => toolbarItems
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    //删除cell
    deleteCell(cell){
      this.editor.execute('delete', cell);
    },

    //撤销操作
    undo(cell){
      this.editor.execute('undo', cell)
    },

    //放大画布
    zoomIn(cell){
      this.editor.execute('zoomIn', cell);
    },

    //缩小画布
    zoomOut(cell){
      this.editor.execute('zoomOut', cell);
    },

    //
    showProperties(cell){
      this.editor.execute('edit', cell);
    },




    //生成画布，编辑器
    createGraph() {
      //生成editor编辑器
      this.container = document.getElementById('graphContainer');
      let editor = new mxEditor();
      editor.setGraphContainer(this.container);
      this.graph = editor.graph;
      this.editor = editor;

    },

    //初始化，画布设置一些属性
    initGraph() {
      if (this.R.isNil(this.graph)) {
        return
      }

      let config = mxUtils.load('keyhandler-commons.xml').getDocumentElement();
      this.editor.configure(config);

      // Defines an icon for creating new connections in the connection handler.
      // This will automatically disable the highlighting of the source vertex.
      mxConnectionHandler.prototype.connectImage = new mxImage(connectorIcon, 16, 16);

      // this.graph.setAllowDanglingEdges(false);

      //设置连线样式
      let style = this.graph.getStylesheet().getDefaultEdgeStyle();
      style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
      style['edgeStyle'] = 'orthogonalEdgeStyle'
      style['curved'] = '1'


      mxGraphHandler.prototype.guidesEnabled = true;  //开始拖拽指引功能


      this.graph.setTooltips(true);     //鼠标悬停提示
      this.graph.setDropEnabled(true);    //允许将子元素放入父元素中
      this.graph.setSplitEnabled(false);  //不允许分割元素
      this.graph.setAllowDanglingEdges(false);  //？？？
      this.graph.setPanning(true);  //允许右键拖动背景画布
      this.graph.setHtmlLabels(true); //允许html文本
      this.graph.setConnectable(true) // 允许连线
      // this.graph.convertValueToString = (cell) => { // 根据cell生成显示的标签
      //   return this.R.prop('title', cell)
      // }

      this.graph.addListener(mxEvent.DOUBLE_CLICK, (graph, evt) => { // 监听双击事件
        const cell = this.R.pathOr([], ['properties', 'cell'], evt)
        // this.editor.execute('delete',cell)

        console.info(cell + '被双击了') // 在控制台输出双击的cell
        console.log(cell.getValue())
      })

      //设置右键菜单
      // this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt){
      //
      // }


      //设置子元素并入父元素
      let graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
      mxGraphHandler.prototype.getInitialCellForEvent = function()
      {
        let cell = graphHandlerGetInitialCellForEvent.apply(this, arguments);

        if (this.graph.isPart(cell))
        {
          cell = this.graph.getModel().getParent(cell)
        }
        return cell;
      };

      // Disables the built-in context menu

      mxEvent.disableContextMenu(this.container);


      this.graph.foldingEnabled = false;
      this.graph.recursiveResize = true;

      this.graph.isPart = function(cell)
      {
        return this.getCurrentCellStyle(cell)['constituent'] == '1';
      };
    },

    //添加cell
    // 父元素位置 工具箱对象， x坐标，y坐标
    //根据 toolItems中的不同对象的不同参数，创建不同的cell，进行添加
    addCell(dropCell, toolItem, x, y) {

      const realX = x;
      const realY = y;
      const {width, height} = toolItem;
      const value = toolItem['value'];
      const styleObj = toolItem['style']
      const cellStyle = Object.keys(styleObj).map((attr) => `${attr}=${styleObj[attr]}`).join(';')
      const children = toolItem['children']
      const parent = this.graph.getDefaultParent()



      this.graph.getModel().beginUpdate()
      try {

        //添加顶级cell
        console.log(value)
        let cell = new mxCell(value, new mxGeometry(realX, realY, width, height), cellStyle)

        cell.vertex = true

        //添加子cell
        for(let i=0; i<children.length;i++){

          this.graph.insertVertex(
              cell, null, children[i]['value'],
              children[i]['offsetX'], children[i]['offsetY'],children[i]['width'], children[i]['height'],
              children[i]['style']+';constituent=1;'
          );
        }

        // vertex.title = toolItem['title']
        this.graph.addCell(cell, parent)

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
          this.addCell(graph, toolItem, x, y)
        }
        const createDragPreview = () => {
          const elt = document.createElement('div')

          elt.style.border = '2px dotted black'
          elt.style.width = `${width}px`
          elt.style.height = `${height}px`
          return elt
        }

        // 获取绘制cell位置的信息，如果释放位置有cell，获取该cell是否允许子元素加入
        const getDropTarget = (graph, x, y) => {
          const cell = graph.getCellAt(x, y)

          return this.R.propOr(null, 'dropAble', cell) ? cell : null
        }

        mxUtils.makeDraggable(dom, this.graph, dropHandler, createDragPreview(), 0, 0, false, true, true, getDropTarget)
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
.el_menu_item{
  width:8%;
  text-align:center;
}


.draw-container{
  height: 100%;
  width: 100%;
}
.graphContainer {
  position: relative;
  flex: 7;
  height: 100%;
  width: 100%;
}



.graphMenu{
  position: relative;
  left: 300px;
}

.graphButton{
  position: relative;
  top: -10px;

}

.toolItem {

}

.img{
  height: 20px;
  width: 20px;
}

.el-aside{
  background-color: #b0b0b0;
}

.el-collapse-item{
  background-color: #3C4043;
}

.el-footer{
  background-color: #8E8E8E;
}



</style>