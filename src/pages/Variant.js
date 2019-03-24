import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Button, Tooltip } from 'antd';
 
@connect(({ variant, loading }) => ({
    variant
}))
class list extends PureComponent {
    constructor(props) {
        super(props);
        this.pageInfo = {
            showQuickJumper: true,
            showTotal(totalSize){
                return <div>符合条件共 <a style={{fontWeight: 'bold'}}>{totalSize}</a> 条</div>;
            }
        };
    }
    render(){
        const {
            variant: { tableData, current, pageSize, totalSize },
        } = this.props;
        return(<Table columns={this.columns}  scroll={{ x: '100%', y: '100%' }} 
                        bordered
                        dataSource={tableData}
                        pagination={{ ...this.pageInfo, current: current, pageSize, total: totalSize }}
                        onChange={this.handleTableChange}
                        onRow={this.onRowSelect}
                        />
            );
    }
    componentDidMount() {
        this.getTableData();
    }
    getTableData(){
        const { dispatch } = this.props;
        //dispatch action models命名空间为list的下的getTableData
        dispatch({
            type: 'variant/getAllvariant',
        });
    }
 
    handleTableChange({record, index, event}) {
        let fileListData = record.name;
        console.log(fileListData);    
        event.stopPropagation(); //尝试阻止默认事件，失败
    }
    onRowSelect = (record,index,event) =>{
        return {
            // onClick:(e)=>{
            //     console.log(record)
            //     console.log(e.currentTarget)
            //     e.currentTarget.getElementsByClassName("ant-radio-wrapper")[0].click()
            // },
            onDoubleClick:(event) => {
                console.log(record.uuid)
            }
        }
    }
    get columns(){

        return [
            {
                title: 'sampleId',
                dataIndex: 'sampleId',
            },
            {
                title: 'position',
                dataIndex: 'position',
            },
            {
                title: 'modeofinheritance',
                dataIndex: 'modeofinheritance',
            },
            {
                title: 'mutationlocation',
                dataIndex: 'mutationlocation',
            },
            {
                title: 'vaf',
                dataIndex: 'vaf',
            },
            {
                title: 'rs',
                dataIndex: 'rs',
            },
            {
                title: 'sourceofvariation',
                dataIndex: 'sourceofvariation',
            },
            {
                title: 'zygotictype',
                dataIndex: 'zygotictype',
            },
            {
                title: 'geneDesc',
                dataIndex: 'geneDesc',
            },
            {
                title: 'diseaseDesc',
                dataIndex: 'diseaseDesc',
            },
            {
                title: 'mutationtype',
                dataIndex: 'mutationtype',
            },
            {
                title: 'polyphen',
                dataIndex: 'polyphen',
            },
            {
                title: 'status',
                dataIndex: 'status',
            },
        ]
    }
}   
export default list;