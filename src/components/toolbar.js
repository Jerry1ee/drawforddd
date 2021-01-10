import mxgraph from '../mxgraph/mxgraph';
const {mxConstants } = mxgraph;

const entityIcon = '../assets/logo.png';

export const toolbarItems = [
    {
        icon: entityIcon,
        title: '实体',
        width: 50,
        height: 50,
        style: {
            fillColor: 'transparent',
            strokeColor: '#000000',
            strokeWidth: '1',
            shape: mxConstants.SHAPE_LABEL,
            align: mxConstants.ALIGN_CENTER,
            verticalAlign: mxConstants.ALIGN_BOTTOM,
            imageAlign: mxConstants.ALIGN_CENTER,
            imageVerticalAlign: mxConstants.ALIGN_TOP,
            image: entityIcon
        }
    }
]