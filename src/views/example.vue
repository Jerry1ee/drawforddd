<template>
  <div id = graphContainer>
  </div>
</template>

<script>
import mxgraph from '../mxgraph/mxgraph';
const { mxClient, mxCodec, mxUtils, mxSwimlane, mxConstants, mxEditor, mxCell, mxGeometry, mxEvent, mxGraphHandler} = mxgraph;
export default {
  name: "home",
  data() {
    return {
    }
  },
  mounted() {
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error('Browser is not supported!', 200, false);
    } else {
      // 在容器中创建图表
      let container = document.getElementById('graphContainer');
      // let MxGraph = mxGraph;
      let MxCodec = mxCodec;
      // let graph = new MxGraph(container);

      //生成editor编辑器
      let editor = new mxEditor();
      editor.setGraphContainer(container);
      let graph = editor.graph

      var config = mxUtils.load(
          'keyhandler-minimal.xml').
      getDocumentElement();
      editor.configure(config);

      graph.setHtmlLabels(true);

      // 生成 Hello world!
      let parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
      try {
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 200, 80, 30);
        var v2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30);
        var v3 = graph.insertVertex(parent, null, 'everyBody!', 300, 350, 60, 60);
        graph.insertEdge(parent, null, '', v1, v2);
        graph.insertEdge(parent, null, '', v2, v3);
        graph.insertEdge(parent, null, '', v1, v3);


        var graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
        mxGraphHandler.prototype.getInitialCellForEvent = function()
        {
          var cell = graphHandlerGetInitialCellForEvent.apply(this, arguments);

          if (this.graph.isPart(cell))
          {
            cell = this.graph.getModel().getParent(cell)
          }

          return cell;
        };

        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);


        graph.foldingEnabled = false;
        graph.recursiveResize = true;

        graph.isPart = function(cell)
        {
          return this.getCurrentCellStyle(cell)['constituent'] == '1';
        };
        // Specifies shadow opacity, color and offset
        mxConstants.SHADOW_OPACITY = 0.5;
        mxConstants.SHADOWCOLOR = '#C0C0C0';
        mxConstants.SHADOW_OFFSET_X = 5;
        mxConstants.SHADOW_OFFSET_Y = 6;

        // Table icon dimensions and position
        mxSwimlane.prototype.imageSize = 20;
        mxSwimlane.prototype.imageDx = 16;
        mxSwimlane.prototype.imageDy = 4;

        let cell1 = new mxCell('&lt;&lt;Entity&gt;&gt;<br><b>ClassName</b>', new mxGeometry(0, 0, 140, 183),
            'fontStyle=0;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=55;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;html=1;editable=0');
        cell1.vertex = true;

        graph.insertVertex(cell1, null, '+ Identity: type',0, 40, 140, 20, 'text;constituent=1;' )

        graph.addCell(cell1, parent)






      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
      // 打包XML文件
      let encoder = new MxCodec();
      let xx = encoder.encode(graph.getModel());
      // 保存到getXml参数中
      this.getXml = mxUtils.getXml(xx);

    }
  }
}
</script>

<style scoped>

</style>