import mxgraph from '../mxgraph/mxgraph';
const { mxConstants } = mxgraph;

const entityIcon = require('../../public/icon/example.png');


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
]