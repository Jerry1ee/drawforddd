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
                active-text-color="#ffd04b"
                :router="true">
              <el-menu-item index="/home" class="el_menu_item">主页</el-menu-item>
              <el-submenu index="2" class="el_menu_item">
                <template slot="title">文件</template>
                <el-menu-item index="" @click="importXML">导入</el-menu-item>
                <input type="file" style="display: none" id="importFile" name="importFile" @change="fileImported"
                accept = ".xml">
                <el-submenu index="">
                  <template slot="title">导出</template>
                  <el-menu-item index="" @click="exportXML">XML格式</el-menu-item>
                  <el-menu-item index="" @click="exportImage">图像格式</el-menu-item>
                  <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="">导出</el-menu-item>
                <el-menu-item index="">选项3</el-menu-item>
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
          <el-button size="mini"  icon="el-icon-edit" @click="validation">验证</el-button>
          <el-button size="mini"  icon="el-icon-delete" @click="deleteCell">删除</el-button>
          <el-button size="mini"  icon="el-icon-top-left" @click="undo">撤销</el-button>
          <el-button size="mini"  icon="el-icon-group" @click="group">组合</el-button>
          <el-button size="mini"  icon="el-icon-ungroup" @click="ungroup">分解</el-button>
          <el-button size="mini"  icon="el-icon-zoom-out" @click="zoomOut"></el-button>
          <el-button size="mini"  icon="el-icon-zoom-in" @click="zoomIn"></el-button>
          <el-button size="mini" @click="exportImage">测试<i class="el-icon-upload el-icon--right"></i></el-button>
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
import {Entity} from "@/components/patterns/Entity";
import {ValueObject} from "@/components/patterns/ValueObject";
import {Module} from "@/components/patterns/Module";
import {Factory} from "@/components/patterns/Factory";
import {Repository} from "@/components/patterns/Repository";
import {AggregateRoot} from "@/components/patterns/AggregateRoot";
const {
  mxEvent, mxUtils, mxEditor,mxGraphHandler, mxCell,
  mxGeometry, mxEdgeStyle, mxConstants,
  mxCodec,

    // mxImage, mxEllipse, mxConnectionConstraint, mxPoint,


} = mxgraph;

//导入ocl验证
// import { OclEngine } from "@stekoe/ocl.js"
//导入类

// const connectorIcon = require('../../public/icon/connector.gif');
const {DomainService} = require("@/components/patterns/DomainService");
const {DomainEvent} = require("@/components/patterns/DomainEvent");
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
      activeIndex2: '1',


      mxCodec: null,

      models: null,

      //the map sourceToTarget
      sourceToTarget: null,

      //the map targetToSource
      targetToSource: null,

      // //xmlDocument 描述图形的xml形式
      // xmlDocument: null,
      // valueToXmlNode: [],

      //addCell时的Map，方便后面判断是否为顶级元素使用
      topCells: new Map(),


      oclEngine: null,

      notifyPromise: Promise.resolve()
    };
  },

  computed: {
    toolbarItems: () => toolbarItems
  },

  methods: {

    //获取mxCells 是哪种patterns
    typeOfCell(mxCell){
      let mxCellType = mxCell.getAttribute('value');
      if(mxCellType != null){
        let result = mxCellType.replace("&lt;&lt;","").replace("&gt;&gt;","");
        return result;
      }

    },

    isParentCell(mxCell){
      return this.topCells.get(mxCell.getAttribute('id')) != null ;
    },
    //验证
    //使用 ocl 加 规则
    validation() {
      //获取当前图形的xml格式表达
      let encoder = new mxCodec();
      let node = encoder.encode(this.graph.getModel());
      let XML = mxUtils.getPrettyXml(node);
      let domParser = new DOMParser();
      let xmlDoc = domParser.parseFromString(XML,'text/xml');


      this.models = new Map();
      this.sourceToTarget = new Map();
      this.targetToSource = new Map();

      //获取当前xml文档中所有的mxCells标签内容
      let mxCells = xmlDoc.getElementsByTagName('mxCell');




      if(mxCells.length>2){
        //添加了元素才开始验证

        //将当前所有边存入哈希表
        for(let i = 0; i< mxCells.length;i++){
          if(mxCells[i].getAttribute('edge')==1){
            let source = mxCells[i].getAttribute('source');
            let target = mxCells[i].getAttribute('target');
            this.sourceToTarget.set(source, target);
            this.targetToSource.set(target, source);
          }
        }

        let success = true;

        for(let i = 2; i < mxCells.length; i++) {

          /**
           * Entity
           * 如果当前cell的 type为 Entity 且 parent 为 1，那么该cell为实体
           * 该cell 的id+1 为 该实体的 className
           * 该cell 的id+2 为 该实体的 identity
           * 强制规则：identity不能为空，必填项
           */
          let typeOfCell = this.typeOfCell(mxCells[i]);
          if(typeOfCell=='Entity' &&
              this.isParentCell(mxCells[i])){
            let identity = mxCells[i+2].getAttribute('value');
            let id = mxCells[i].getAttribute('id');
            let identityTemp = identity.replace(/\s*/g,"");
            if(identityTemp == '+Identity:type'||identity == '') {
              success = false;
              this.sendErrorMessage('实体的唯一标识(Identity)不能为空或默认值')

            }else {
              let name = mxCells[i+1].getAttribute('value');
              let entity = new Entity(typeOfCell, id, name, identityTemp);
              this.models.set(id, entity);
            }
          }

          /**
           * Value Object
           */
          if(typeOfCell == 'Value Object' &&
              this.isParentCell(mxCells[i])){
              let id = mxCells[i].getAttribute('id');
              let name = mxCells[i+1].getAttribute('value');
              let valueObject = new ValueObject(typeOfCell, id, name);
              this.models.set(id, valueObject);
          }

          /**
           * Domain Service
           * 如果当前cell的 type 为 DomainService 且 parent 为 1，那么该cell为领域服务
           * 该cell 的id+1 为 该领域服务的 serviceName
           * 该cell 的id+2 为 该领域服务的 入参
           * 该cell 的id+3 为 该领域服务的 出参
           * 强制规则：入参 出参应该具有连线
           * 建议规则：入参 出参应该命名
           */

          if(typeOfCell.replace(/\s*/g,"") == 'DomainService' &&
              this.isParentCell(mxCells[i])){

              let id = mxCells[i].getAttribute('id');
              let name = mxCells[i+1].getAttribute('value');
              let inId = mxCells[i+2].getAttribute('id');
              let outId = mxCells[i+3].getAttribute('id');
              let domainService = new DomainService(typeOfCell, id, name);


              //获取 入参对应的对象Id 和 出参对应的对象Id
              let inObjectId = this.targetToSource.get(inId);
              let outObjectId = this.sourceToTarget.get(outId);
              if(inObjectId != null && outObjectId != null) {
                domainService.in.push(inObjectId);
                domainService.out.push(outObjectId);
                this.models.set(id, domainService);
              }else if(inObjectId == null) {
                success = false;
                this.sendErrorMessage("领域服务没有连接输入对象！");

              }else {
                success = false;
                this.sendErrorMessage("领域服务没有连接输出对象！")

              }

          }

          /**
           * Domain Event
           */

          if(typeOfCell.replace(/\s*/g,"") == 'DomainEvent' &&
              this.isParentCell(mxCells[i])){
            let id = mxCells[i].getAttribute('id');
            let name = mxCells[i+1].getAttribute('value');
            let domainEvent = new DomainEvent(typeOfCell, name);

            let inObjectId = this.targetToSource.get(id);
            if(inObjectId == null) {
              success = false;
              this.sendErrorMessage("领域事件没有发送方！")
            }else {
              domainEvent.in.push(inObjectId);
              this.models.set(id, domainEvent);
            }

          }


          let parentId=mxCells[i].getAttribute("parent");

          //当组件的parentId为1时证明该节点为组件的头节点
          if(parentId=="1"){
            let type=mxCells[i].getAttribute('value');
            /**
             * Module
             */
            //当节点为Module时
            if(type==="&lt;&lt;Module&gt;&gt;") {
              let moduleName=mxCells[i+1].getAttribute('value')
              if(moduleName=="ModuleName"||moduleName==""){
                success=false;
                this.sendErrorMessage("模块的名称不能为空或默认值！")
              }

                var curModule=new Module(i,moduleName,
                    mxCells[i+2].getAttribute('value'));

                //注意：目前并不知道是否真的将curModule放入了map中
                this.models.set(i+"",curModule)

            }

            /**
             * Factory
             */
            if(type=='&lt;&lt;factory&gt;&gt;'){
              let factoryName=mxCells[i+1].getAttribute('value')
              let instanceName=mxCells[i+2].getAttribute('value')
              if(factoryName=='FactoryName'||factoryName==''){
                success=false;
                this.sendErrorMessage("请给工厂命名！")
              }
              if(instanceName=='+objectName:name(String)'||instanceName==''){
                success=false;
                this.sendErrorMessage("请输入工厂所创建的实体（或聚合）名称！如果没有，请考虑工厂的必要性！")
              }

                var curFactory = new Factory(i, factoryName,instanceName);
                this.models.set(i+"", curFactory);

            }

            /**
             * Repository
             */
            if(type=='&lt;&lt;Repository&gt;&gt;'){
              let reName=mxCells[i+1].getAttribute('value')
              let instanceName=mxCells[i+2].getAttribute('value')
              if(reName=='RepositoryName'||reName==''){
                success=false;
                this.sendErrorMessage("请给资源库命名")
              }
              if(instanceName=='+aggregate : name（String）'||instanceName==''){
                success=false;
                this.sendErrorMessage("请输入资源库的实体（或聚合）名称！如果没有，请考虑资源库的必要性！")
              }

                var curRe = new Repository(i, reName,instanceName,mxCells[i+3].getAttribute('value'));
                this.models.set(i+"", curRe);

            }

            /**
             * Aggregate
             */
            if(type=='&lt;&lt;Aggregate Root&gt;&gt;'){
              let arrName=mxCells[i+1].getAttribute('value')
              if(arrName=='AggregateRootName'){
                success=false;
                this.sendErrorMessage("请给聚合根命名！")
              }

              var curAggregateRoot = new AggregateRoot(i, mxCells[i + 1].getAttribute('value'));
              this.models.set(i+"", curAggregateRoot)

            }

            /**
             * edge
             * 处理边的属性,并将边之间的关系进行存储
             */
            if(type==null||type==''){
              let source=mxCells[i].getAttribute('source')
              let target=mxCells[i].getAttribute('target')
              //this.sendErrorMessage(source)
              while(mxCells[source].getAttribute('parent')!='1')
                source=source-1;
              //this.sendErrorMessage(source)
              //this.sendErrorMessage(target)
              while(mxCells[target].getAttribute('parent')!='1')
                target=target-1;
              //this.sendErrorMessage(target)
              let sourceNode=this.models.get(source+"")
              sourceNode.in.push(target+"")
              let targetNode=this.models.get(target+"")
              targetNode.in.push(source+"")
            }
          }

          /**
           * ACL
           */

        }
        /**
         * 处理edge
         在对每个节点的属性进行验证之后，需要对节点以及节点之间所连接的边进行验证
         */
        for (var [key] of this.models) {
          let node=this.models.get(key)
          let type=node["type"];
          if(type=="Module"){
            let edge=node.in
            if(edge.length!=0){
              success=false;
              this.sendErrorMessage("请不要给Module组件添加连线！" +
                  "Module中组件请直接输入在组件中")
            }
          }
          if(type=="Factory"){
            let edge=node.in
            if(edge.length==0||edge.length>1){
              success=false
              this.sendErrorMessage("请给Factory连接一个它创建的实体（或聚合根）")
            }
            if(edge.length==1){
              let neighborType=this.models.get(edge[0]).type
              if(neighborType=="Entity") {
                console.log("Factory连接的为实体")
              }else if(neighborType=='AggregateRootName'){
                console.log("Factory连接的是聚合根")
              }else{
                success=false;
                this.sendErrorMessage("请给Factory连接正确的实体（聚合根）对象")
              }
            }
          }
          if(type=="Repository"){
            let edge=node.in
            if(edge.length==0||edge.length>1){
              success=false
              this.sendErrorMessage("请给Repository连接一个它所存储的实体（或聚合根）")
            }
            if(edge.length==1){
              let neighborType=this.models.get(edge[0]).type
              if(neighborType=="Entity") {
                console.log("Repository连接的为实体")
              }else if(neighborType=='AggregateRootName'){
                console.log("Repository连接的是聚合根")
              }else{
                success=false;
                this.sendErrorMessage("请给Repository连接正确的实体（聚合根）对象")
              }
            }
          }
          if(type=="AggregateRootName"){
            let edge=node.in
            if(edge.length==0||edge.length>1){
              success=false
              this.sendErrorMessage("请给聚合根连接一个他所包含的实体！")
            }
            if(edge.length==1){
              let neighborType=this.models.get(edge[0]).type
              if(neighborType=="Entity") {
                console.log("聚合根连接的为实体")
              }else{
                success=false;
                this.sendErrorMessage("请给聚合根连接正确的实体对象！")
              }
            }
          }
          //this.sendErrorMessage(type)
        }
        if(success){
          this.sendSuccessMessage("验证全部通过！")
        }
        console.log('当前存在的所有对象模型：')
        console.log(this.models)

        console.log('targetToSource:  ')
        console.log(this.targetToSource);
        console.log('sourceToTarget:  ')
        console.log(this.sourceToTarget);

        let graphModels = Object.create(null);
        for( let[k,v] of this.models) {
          graphModels[k] = v;
        }
        let graphModelsJson = JSON.parse(JSON.stringify(graphModels));
        console.log('json:')
        console.log(graphModelsJson);

        //注释了前后端交互的代码，便于测试前端功能
/*        const result = this.$http.post(
            '/validation',
            graphModelsJson
        ).then(function (response){
          console.log(response);
        });
        console.log(result);*/
      }

    },

    //错误提示
    sendErrorMessage(ErrorMessage) {
      this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(() => {
        this.$notify.error({
          title: '错误',
          message: ErrorMessage
        });
      })
    },

    //成功提示
    sendSuccessMessage(SuccessMessage) {
      this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(() => {
        this.$notify.success({
          title: '成功',
          message: SuccessMessage
        });
      })
    },

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

    //组合操作
    group(cell){
      this.editor.execute('group', cell);
    },

    //分解操作
    ungroup(cell){
      this.editor.execute('ungroup', cell);
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
    exportImage(cell){
      this.editor.execute('exportImage', cell);
    },


    //导入 xml
    importXML(){
      document.getElementById("importFile").click();
    },

    //导入xml后进行绘图
    fileImported(){
      let selectedFile = document.getElementById('importFile').files[0];
      let name = selectedFile.name;   //读取选中文件的文件名
      let size = selectedFile.size;   //读取选中文件的大小
      console.log("文件名:"+name+"大小:"+size);

      let that = this;

      let reader = new FileReader();//这是核心,读取操作就是由它完成.
      reader.readAsText(selectedFile);    //读取文件的内容,也可以读取文件的URL
      reader.onload = function () {
        //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
        that.drawByXML(this.result);
      }

    },

    //drawByXML
    drawByXML(xml){
      let doc = mxUtils.parseXml(xml);
      let codec = new mxCodec(doc);
      codec.decode(doc.documentElement, this.graph.getModel());
      let elt = doc.documentElement.firstChild;
      let cells = [];
      while (elt != null)
      {
        let cell = codec.decode(elt)
        if(cell != undefined){
          if(cell.id != undefined && cell.parent != undefined && (cell.id == cell.parent)){
            console.log("cell is : "+ cell);
            elt = elt.nextSibling;
            console.log("elt is :" + elt);
            continue;
          }
          cells.push(cell);
        }
        elt = elt.nextSibling;
      }
      this.graph.addCells(cells);


    },


    //导出 xml
    exportXML(){
      let encoder = new mxCodec();
      let node = encoder.encode(this.graph.getModel());
      let XML = mxUtils.getPrettyXml(node);

      let elementA = document.createElement('a');

      let blob = new Blob([XML], {type: 'text/xml'});
      let url = URL.createObjectURL(blob);

      elementA.href = url;
      elementA.download = 'DDDModel.xml';
      elementA.style.display = 'none';

      document.body.append(elementA);
      elementA.click();
      document.body.removeChild(elementA);


      window.open(url);
      URL.revokeObjectURL(url); //Releases the resources

    },

    //生成画布，编辑器
    createGraph() {
      //生成editor编辑器
      this.container = document.getElementById('graphContainer');
      let editor = new mxEditor();
      editor.setGraphContainer(this.container);
      this.graph = editor.graph;
      this.editor = editor;
      this.mxCodec = mxCodec;

    },

    //初始化，画布设置一些属性
    initGraph() {
      if (this.R.isNil(this.graph)) {
        return
      }

      let config = mxUtils.load('keyhandler-commons.xml').getDocumentElement();
      this.editor.configure(config);



      //初始化连线
      this.graph.setConnectableEdges(false)
      this.graph.setDisconnectOnMove(false)
      //设置连线样式
      let style = this.graph.getStylesheet().getDefaultEdgeStyle();
      style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
      style['edgeStyle'] = 'orthogonalEdgeStyle'
      style['curved'] = '1'


      mxGraphHandler.prototype.guidesEnabled = true;  //开始拖拽指引功能
      //
      // let listener = function()
      // {
      //   this.graph.validateGraph();
      // };

      this.editor.validation = true;

      // this.graph.getModel().addListener(mxEvent.CHANGE, listener);



      this.graph.setTooltips(true);     //鼠标悬停提示
      this.graph.setSplitEnabled(false);  //不允许分割元素
      this.graph.setAllowDanglingEdges(false);  //？？？
      this.graph.setPanning(true);  //允许右键拖动背景画布
      this.graph.setHtmlLabels(true); //允许html文本
      this.graph.setConnectable(true) // 允许连线
      mxEvent.disableContextMenu(this.container);

      // // Changes some default colors
      mxConstants.HANDLE_FILLCOLOR = '#99ccff';
      mxConstants.HANDLE_STROKECOLOR = '#0088cf';
      mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';
      mxConstants.STYLE_FILLCOLOR = '#ffffff';
      // mxConstants.STYLE_STROKECOLOR = '#ffffff';
      // mxConstants.STYLE_STROKE_OPACITY = 100;
      // this.graph.convertValueToString = (cell) => { // 根据cell生成显示的标签
      //   return this.R.prop('title', cell)
      // }

      this.graph.addListener(mxEvent.DOUBLE_CLICK, (graph, evt) => { // 监听双击事件
        const cell = this.R.pathOr([], ['properties', 'cell'], evt)
        // this.editor.execute('delete',cell)

        console.info(cell + '被双击了') // 在控制台输出双击的cell
        console.log(cell.getValue())
      })

      //为领域事件添加右键菜单
      this.graph.popupMenuHandler.autoExpand = true;

      this.graph.popupMenuHandler.factoryMethod = function (menu, cell) {
          if(cell!=null){
            menu.addItem('菜单项',null,function (){
              mxUtils.alert("!");
            });
          }
      }



      //在 editing stopped 时 触发
      // this.graph.addListener(mxEvent.CELLS_ADDED, (graph, evt) => {
      //   const cell = this.R.pathOr([], ['properties', 'cell'], evt)
      //   console.log(cell.toString())
      // });


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
      // const drop = !this.R.isNil(dropCell)
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
        //将顶级元素添加到topCells中
        this.topCells.set(cell.getId(),value);
        console.log(this.topCells);

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

.mxRubberband {
  border-color: #0000DD;
}
</style>