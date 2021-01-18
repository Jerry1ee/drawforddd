import mxgraph from '../mxgraph/mxgraph';
const { mxConstants } = mxgraph;

const entityIcon = require('../../public/icon/example.png');
const valueObjectIcon = require('../../public/icon/example.png');
const domainServiceIcon = require('../../public/icon/example.png');
const domainEventIcon = require('../../public/icon/example.png');
// const moduleIcon = require('../../public/icon/example.png');
// const aggregateIcon = require('../../public/icon/example.png');
// const repositoryIcon = require('../../public/icon/example.png');
// const factoryIcon = require('../../public/icon/example.png');
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
]