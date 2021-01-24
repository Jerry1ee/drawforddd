import mxgraph from '../mxgraph/mxgraph';
const { mxConstants } = mxgraph;

const entityIcon = require('../../public/icon/example.png');
const valueObjectIcon = require('../../public/icon/example.png');
const domainServiceIcon = require('../../public/icon/example.png');
const domainEventIcon = require('../../public/icon/example.png');
const moduleIcon = require('../../public/icon/example.png');
const aggregateIcon = require('../../public/icon/example.png');
const repositoryIcon = require('../../public/icon/example.png');
const factoryIcon = require('../../public/icon/example.png');
// const antiCorrosionLayerIcon = require('../../public/icon/example.png');

//
// export const toolbarItems = [
//     {
//         icon: entityIcon,
//         title: 'Entity',
//         width: 50,
//         height: 50,
//         dropAble: false, // 是否可以作为drop的对象
//         constraints: [ // 连接点
//             {x: 0, y: 0.5},
//             {x: 1, y: 0.5},
//             {x: 0.5, y: 0},
//             {x: 0.5, y: 1}
//         ],
//         style: {
//             fillColor: 'none',
//             strokeColor: '#000000',
//             strokeWidth: '1',
//             shape: mxConstants.SHAPE_RECTANGLE,
//
//         }
//     },
// ]



export const toolbarItems = [
    /**
     * 实体
     * 拥有唯一标识，必填项
     * 属性可选，可私有可公有
     * 操作可选，可私有可公有
     */

    {
        icon: entityIcon,
        title: 'Entity',
        value: '&lt;&lt;Entity&gt;&gt;',
        width: 150,
        height: 100,
        dropAble: false, // 是否可以作为drop的对象

        //实体里还有其他子cell，这些cell都应该为vertex
        //格式： value: 要填的值， x:cell位置横坐标 y:cell位置纵坐标 width:cell宽，height:cell高, style:样式
        children:[
            {
                value:'ClassName',
                offsetX : 0,
                offsetY : 15,
                width: 150,
                height: 15,
                style:'',
            },
            {
                value:'+ Identity: type',
                offsetX : 0,
                offsetY : 30,
                width: 150,
                height: 20,
                style:'fillColor=none;strokeColor=#000000;strokeWidth=1',

            },
            {
                value:'attribute1 : type',
                offsetX : 0,
                offsetY : 50,
                width: 150,
                height: 20,
                style:'fillColor=none;strokeColor=#000000;fontColor=black;strokeWidth=1',
            },
            {
                value: 'operation1 :type',
                offsetX : 0,
                offsetY : 70,
                width: 150,
                height: 30,
                style:'',

            }
        ],
        style: {

            fillColor: ' none',
            strokeColor: '#000000',
            strokeWidth: '1',
            shape: mxConstants.SHAPE_RECTANGLE,
            fontColor:'black',
            fontStyle: '0',
            align: 'center',
            verticalAlign:'top',
            childLayout:'stackLayout',
            horizontal:'1',
            startSize:'55',
            horizontalStack:'0',
            resizeParent:'1',
            resizeParentMax:'0',
            resizeLast:'0',
            collapsible:'0',
            html:'1',
            marginBottom:'0',
            editable:'0',
            autosize:'1'

        },

    },
    /**
     * 值对象
     * 属性可选，必须私有，只允许通过构造函数来赋予值对象初值，以此来保证值对象的不可变性
     * 操作，建议重写 hashcode / equals 等函数，保证可替换性，可比较性
     */
    {
        icon: valueObjectIcon,
        title: 'Value Object',
        value: '&lt;&lt;Value Object&gt;&gt;',
        width: 150,
        height: 100,
        dropAble: false, // 是否可以作为drop的对象

        //实体里还有其他子cell，这些cell都应该为vertex
        //格式： value: 要填的值， x:cell位置横坐标 y:cell位置纵坐标 width:cell宽，height:cell高, style:样式
        children:[
            {
                value:'ClassName',
                offsetX : 0,
                offsetY : 15,
                width: 150,
                height: 15,
                style:'',
            },
            {
                value:'- attribute1 : type',
                offsetX : 0,
                offsetY : 30,
                width: 150,
                height: 20,
                style:'fillColor=none;strokeColor=#000000;fontColor=black;strokeWidth=1',
            },
            {
                value: '+ operation1 :type',
                offsetX : 0,
                offsetY : 50,
                width: 150,
                height: 30,
                style:'',

            }
        ],
        style: {

            fillColor: ' none',
            strokeColor: '#000000',
            strokeWidth: '1',
            shape: mxConstants.SHAPE_RECTANGLE,
            fontColor:'black',
            fontStyle: '0',
            align: 'center',
            verticalAlign:'top',
            childLayout:'stackLayout',
            horizontal:'1',
            startSize:'55',
            horizontalStack:'0',
            resizeParent:'1',
            resizeParentMax:'0',
            resizeLast:'0',
            collapsible:'0',
            html:'1',
            marginBottom:'0',
            editable:'0',
            autosize:'1'
        },

    },

    /**
     * 领域服务
     * 规定输入，可选，一般是一些实体/聚合/值对象，我们希望将连线连到特定的位置以代表输入
     * 规定输出，可选，一般是一些值对象，我们希望将连线连到特定的位置以代表输出
     * 可以是接口，也可以是具体实现类，可以将 <<interface>> 手动去除
     */
    {
        icon: domainServiceIcon,
        title: 'Domain Service',
        value: '&lt;&lt;Domain Service&gt;&gt;',
        width: 260,
        height: 30,
        dropAble: true, // 是否可以作为drop的对象

        //实体里还有其他子cell，这些cell都应该为vertex
        //格式： value: 要填的值， x:cell位置横坐标 y:cell位置纵坐标 width:cell宽，height:cell高, style:样式
        children:[
            {
                value:'ServiceName',
                offsetX : 0,
                offsetY : 15,
                width: 260,
                height: 15,
                style:'',
            },
            {
                value:' input : type',
                offsetX : 0,
                offsetY : 30,
                width: 130,
                height: 30,
                style:'fillColor=none;strokeColor=#000000;fontColor=black;strokeWidth=1',
            },
            {
                value:' input : type',
                offsetX : 130,
                offsetY : 30,
                width: 130,
                height: 30,
                style:'fillColor=none;strokeColor=#000000;fontColor=black;strokeWidth=1',
            },

        ],
        style: {

            fillColor: ' none',
            strokeColor: '#000000',
            strokeWidth: '1',
            shape: mxConstants.SHAPE_RECTANGLE,
            fontColor:'black',
            fontStyle: '0',
            align: 'center',
            verticalAlign:'top',
            childLayout:'stackLayout',
            horizontal:'1',
            startSize:'55',
            horizontalStack:'0',
            resizeParent:'1',
            resizeParentMax:'0',
            resizeLast:'0',
            collapsible:'0',
            html:'1',
            marginBottom:'0',
            editable:'1',
        },

    },

    /**
     * 领域事件
     * 更多的是一个建模层面的帮助理解作用
     * 拥有唯一标识， 必填项，方便在不同上下文中标识
     * 表明事件发送方，必填项
     * 事件发送时间，起到提醒作用即可
     *
     */
    {
        icon: domainEventIcon,
        title: 'Domain Event',
        value: '&lt;&lt;Domain Event&gt;&gt;',
        width: 260,
        height: 70,
        dropAble: true, // 是否可以作为drop的对象

        //实体里还有其他子cell，这些cell都应该为vertex
        //格式： value: 要填的值， x:cell位置横坐标 y:cell位置纵坐标 width:cell宽，height:cell高, style:样式
        children:[
            {
                value:'EventName',
                offsetX : 0,
                offsetY : 15,
                width: 260,
                height: 15,
                style:'',
            },
        ],
        style: {

            fillColor: ' none',
            strokeColor: '#000000',
            strokeWidth: '1',
            shape: mxConstants.SHAPE_RECTANGLE,
            fontColor:'black',
            fontStyle: '0',
            align: 'center',
            verticalAlign:'top',
            childLayout:'stackLayout',
            horizontal:'1',
            startSize:'55',
            horizontalStack:'0',
            resizeParent:'1',
            resizeParentMax:'0',
            resizeLast:'0',
            collapsible:'0',
            html:'1',
            marginBottom:'0',
            editable:'0',
        },

    },

    /**
     * 模块
     * 模块是一个命名的容器，用于存放内聚的，可以将不同的内聚类放在不同的模块下进行接藕
     * DDD中其实不太关注
     * java中模块命名首先顶级域名开头，通常是com；然后在点后紧跟公司/组织名；接下来一层是限界上下文；
     *      再往下是domain层；再往下是模型中的类和接口等。这种命名规范兼容六边形架构和分层架构，但是这种命名规范并不强求
     * 模块设计时不能机械地组织模块、设计松耦合的模块、杜绝循环依赖，在父子模块之间放松原则以及不要讲模块设计成静态概念（难以测量）
     * 模块应该包含该模块下所有的实体、聚合、领域服务等等属性，选填
     * 模块不应该要求与每一个组件进行连线（否则可能会造成DDD模型过于混乱），可能只是创建出来并且包含模块中的一些实体
     *      、聚合等模型便于开发人员理解，因此模块设计大小可能会大一些
     */
    {
        icon: moduleIcon,
        title: 'Module',
        value: '&lt;&lt;Module&gt;&gt;'+'</br>moduleName',
        width: 260,
        height: 120,
        dropAble: false,

        //实体里还有其他子cell，这些cell都应该为vertex
        //格式： value: 要填的值， x:cell位置横坐标 y:cell位置纵坐标 width:cell宽，height:cell高, style:样式
        children:[
            {
                value:'elementInModule: name(String)',
                offsetX : 0,
                offsetY : 35,
                width: 260,
                height: 85,
                style:'fillColor=none;strokeColor=#000000;fontColor=black;strokeWidth=1',
            }

        ],
        style: {
            fillColor: ' none',
            strokeColor: '#000000',
            strokeWidth: '1',
            shape: mxConstants.SHAPE_RECTANGLE,
            fontColor:'black',
            fontStyle: '0',
            align: 'center',
            verticalAlign:'top',
            childLayout:'stackLayout',
            horizontal:'1',
            startSize:'55',
            horizontalStack:'0',
            resizeParent:'1',
            resizeParentMax:'0',
            resizeLast:'0',
            collapsible:'0',
            html:'1',
            marginBottom:'0',
            editable:'0',
            autosize:'1'
        },
    },

    /**
     * 聚合
     * 需要将实体和值对象聚类到一致性边界内时，可以使用聚合作为容器
     * 聚合需要跟实体作为聚合的唯一标识，必填
     * 聚合内部所有对象应该保持一致性，应该含有实体以及值对象，与实际的实体与值对象进行连线
     * 是否需要一些保证一致性的方法？选填
     * 怎样表示聚合和聚合内部实例
     */
    {
        icon: aggregateIcon,
        title: 'Aggregate Root',
        value: '&lt;&lt;Aggregate Root&gt;&gt;'+'</br>aggregateRootName',
        width: 180,
        height: 90,
        dropAble: false,

        //实体里还有其他子cell，这些cell都应该为vertex
        //格式： value: 要填的值， x:cell位置横坐标 y:cell位置纵坐标 width:cell宽，height:cell高, style:样式
        children:[
            {
                value:'+identity : ID（String）',
                offsetX : 0,
                offsetY : 30,
                width: 180,
                height: 30,
                style:'fillColor=none;strokeColor=#000000;fontColor=black;strokeWidth=1',
            },
            {
                value:'operation : type',
                offsetX : 0,
                offsetY : 60,
                width: 180,
                height: 30,
                style:'fillColor=none;strokeColor=#000000;fontColor=black;strokeWidth=1',
            },

        ],
        style: {
            fillColor: ' none',
            strokeColor: '#000000',
            strokeWidth: '1',
            shape: mxConstants.SHAPE_RECTANGLE,
            fontColor:'black',
            fontStyle: '0',
            align: 'center',
            verticalAlign:'top',
            childLayout:'stackLayout',
            horizontal:'1',
            startSize:'55',
            horizontalStack:'0',
            resizeParent:'1',
            resizeParentMax:'0',
            resizeLast:'0',
            collapsible:'0',
            html:'1',
            marginBottom:'0',
            editable:'0',
            autosize:'1'
        },
    },

    /**
     * 资源库
     * 通常将聚合实例(有时候也可以是实体实例）放在资源库中，之后再通过该资源库获取相同的聚合实例
     * 资源库对应的聚合或者实体实例，必填
     * 资源库可能存在的额外行为（如校验方法、计数方法等等行为），选填
     * 可以与所存储的聚合类进行连线，从而使用户获得清晰的了解
     *
     */
    {
        icon: repositoryIcon,
        title: 'Repository',
        value: '&lt;&lt;Repository&gt;&gt;'+'</br>repositoryName',
        width: 200,
        height: 110,
        dropAble: false,

        //实体里还有其他子cell，这些cell都应该为vertex
        //格式： value: 要填的值， x:cell位置横坐标 y:cell位置纵坐标 width:cell宽，height:cell高, style:样式
        children:[
            {
                value:'+aggregate : name（String）',
                offsetX : 20,
                offsetY : 42,
                width: 160,
                height: 30,
                style:'fillColor=none;strokeColor=rgba(255,255,255,0.2);fontColor=black;strokeWidth=1;',
            },
            {
                value:'addActions : function',
                offsetX : 20,
                offsetY : 72,
                width: 160,
                height: 30,
                style:'fillColor=none;strokeColor=rgba(255,255,255,0.2);fontColor=black;strokeWidth=1',
            }

        ],
        style: {
            fillColor: ' none',
            strokeColor: '#000000',
            strokeWidth: '0',
            shape: mxConstants.SHAPE_CYLINDER,
            fontColor:'black',
            fontStyle: '0',
            align: 'center',
            verticalAlign:'top',
            childLayout:'stackLayout',
            horizontal:'1',
            startSize:'55',
            horizontalStack:'0',
            resizeParent:'1',
            resizeParentMax:'0',
            resizeLast:'0',
            collapsible:'0',
            html:'1',
            marginBottom:'0',
            editable:'0',
            autosize:'1'
        },
    },

    /**
     * 工厂
     * 工厂是一种具有创建复杂对象和聚合职责的单独对象
     * 工厂偏向于代码实现阶段，对于DDD建模过程起到的作用可能不大
     * 工厂创建的实体或聚合对象，必填，不然工厂没有存在的意义（一个工厂是否可以创建多个对象？）
     * 另：工厂应该与工厂所创建的对象有连线，用来表明工厂与实体、聚合的创建关系
     */
    {
        icon: factoryIcon,
        title: 'Factory',
        value: '&lt;&lt;factory&gt;&gt;'+'</br>factoryName',
        width: 220,
        height: 78,
        dropAble: false,

        //实体里还有其他子cell，这些cell都应该为vertex
        //格式： value: 要填的值， x:cell位置横坐标 y:cell位置纵坐标 width:cell宽，height:cell高, style:样式
        children:[
            {
                value:'+objectName:name(String)',
                offsetX : 0,
                offsetY : 30,
                width: 220,
                height: 50,
                style:'fillColor=none;strokeColor=#000000;fontColor=black;strokeWidth=1',
            }

        ],
        style: {
            fillColor: ' none',
            strokeColor: '#000000',
            strokeWidth: '1',
            shape: mxConstants.SHAPE_RECTANGLE,
            fontColor:'black',
            fontStyle: '0',
            align: 'center',
            verticalAlign:'top',
            childLayout:'stackLayout',
            horizontal:'1',
            startSize:'55',
            horizontalStack:'0',
            resizeParent:'1',
            resizeParentMax:'0',
            resizeLast:'0',
            collapsible:'0',
            html:'1',
            marginBottom:'0',
            editable:'0',
            autosize:'1'
        },
    },
]