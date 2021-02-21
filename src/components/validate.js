//导入mxgraph依赖
import mxgraph from '../mxgraph/mxgraph';
import {Factory} from "@/components/patterns/Factory";
import {AggregateRoot} from "@/components/patterns/AggregateRoot";
import {Module} from "@/components/patterns/Module";
import {Repository} from "@/components/patterns/Repository";
// import {Entity} from "@/components/patterns/Entity.js";

const {
    mxUtils,
    mxCodec
} = mxgraph;

let m=new Map();
//验证方法
export function validate() {

    /**
     * Entity
     */

    /**
     * Value Object
     */

    /**
     * Domain Service
     */

    /**
     * Domain Event
     */

    /**
     * Aggregate
     */

    /**
     * Repository
     */

    /**
     * Factory
     */

    /**
     * ACL
     */

    let mxCells = getMxCell();


    //读取XML文件中的节点信息并且初步验证节点属性值
    for(let i=2;i<mxCells.length;i++){
        let parentId=mxCells[i].getAttribute('parent');

        //当parent的值为'1'时，该节点为一个组件的头节点或者为一条边
        if(parentId=='1'){
            let value=mxCells[i].getAttribute('value');

            if(value=='&lt;&lt;factory&gt;&gt;'){
                var curFactory=new Factory(i,mxCells[i+1].getAttribute('value'),
                    mxCells[i+2].getAttribute('value'));
                m.set(i,curFactory);
                c(curFactory.attributeValidation());
            }

            if(value=='&lt;&lt;Aggregate Root&gt;&gt;'){
                var curAggregateRoot=new AggregateRoot(i,mxCells[i+1].getAttribute('value'));
                c(curAggregateRoot.attributeValidation());
                m.set(i,curAggregateRoot);
            }

            if(value=='&lt;&lt;Module&gt;&gt;'){
                var curModule=new Module(i,mxCells[i+1].getAttribute('value'),
                    mxCells[i+2].getAttribute('value'));
                c(curModule.attributeValidation());
                m.set(i,curModule);
            }

            if(value=='&lt;&lt;Repository&gt;&gt;'){
                var curRepository=new Repository(i,mxCells[i+1].getAttribute('value'),
                    mxCells[i+2].getAttribute('value'),mxCells[i+3].getAttribute('value'));
                c(curRepository.attributeValidation());
                m.set(i,curRepository);
            }

            //当value为''时证明该mxcell包含边属性
            else{
                var sourceId=mxCells[i].getAttribute('source');
                while(!m.has(sourceId))
                    sourceId--;
                var targetId=mxCells[i].getAttribute('target');
                while(!m.has(targetId))
                    targetId--;
                let sourceCell=m.get(sourceId);
                sourceCell.outCell.push(targetId);
                let targetCell=m.get(targetId);
                targetCell.inCell.push(sourceId);
            }
        }
    }

    //验证节点的边的信息
    m.forEach(function(value,key){
        console.log(value+" "+key);
        getEdgeValidationMessage(value);
    });
}

export function getEdgeValidationMessage(value){
    let edgeValidationArray=new Array();
    let type=value.type;
    let inCell=value.inEdge;
    let outCell=value.outEdge;
    if(type=='Module'){
        if(inCell.length!=0||outCell.length!=0)
            edgeValidationArray.push("请不要给模块"+value.moduleName+"添加连线！")
    }
    if(type=='Factory'){
        let edgeNumber=0;
        for(let i=0;i<inCell.length;i++){
            if(m.get(inCell[i]).type=='Entity'||m.get(inCell[i].type=='AggregateRoot'))
                edgeNumber++;
        }
        for(let i=0;i<outCell.length;i++){
            if(m.get(inCell[i]).type=='Entity'||m.get(inCell[i].type=='AggregateRoot'))
                edgeNumber++;
        }
        if(edgeNumber==0||edgeNumber>1)
            edgeValidationArray.push("请给工厂"+value.factoryName+"连接一个实体或聚合根")
    }
    if(type=='Repository'){
        let edgeNumber=0;
        for(let i=0;i<inCell.length;i++){
            if(m.get(inCell[i]).type=='Entity'||m.get(inCell[i].type=='AggregateRoot'))
                edgeNumber++;
        }
        for(let i=0;i<outCell.length;i++){
            if(m.get(inCell[i]).type=='Entity'||m.get(inCell[i].type=='AggregateRoot'))
                edgeNumber++;
        }
        if(edgeNumber==0||edgeNumber>1)
            edgeValidationArray.push("请给资源库"+value.repositoryName+"连接一个实体或聚合根")
    }
    if(type=='AggregateRootName'){
        let edgeNumber=0;
        for(let i=0;i<inCell.length;i++){
            if(m.get(inCell[i]).type=='Entity')
                edgeNumber++;
        }
        for(let i=0;i<outCell.length;i++){
            if(m.get(inCell[i]).type=='Entity')
                edgeNumber++;
        }
        if(edgeNumber==0||edgeNumber>1)
            edgeValidationArray.push("请给聚合根"+value.aggregateRootName+"连接且仅连接一个实体")
    }
    c(edgeValidationArray)
}


//获取当前xml文档中所有的mxCells标签内容
export function getMxCell(){

    //首先从XML文件中读取实例对象
    //获取当前图形的xml格式表达
    let encoder = new mxCodec();
    let node = encoder.encode(this.graph.getModel());
    let XML = mxUtils.getPrettyXml(node);
    let domParser = new DOMParser();
    let xmlDoc = domParser.parseFromString(XML,'text/xml');

    return xmlDoc.getElementsByTagName('mxCell');

}

//展示错误信息,可以进行修改
export function c(attributeValidationArray){
    for(let i=0;i<attributeValidationArray.length;i++){
        console.log(attributeValidationArray[i]);
    }
}