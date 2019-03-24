import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Button, Tooltip } from 'antd';
 
@connect(({ omimChpo, loading }) => ({
    omimChpo
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
            omimChpo: { tableData, current, pageSize, totalSize },
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
            type: 'omimChpo/getAllomimChpo',
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
                title: 'omimcode',
                dataIndex: 'omimcode',
            },
            {
                title: 'englishname',
                dataIndex: 'englishname',
            },
            {
                title: 'chinesename',
                dataIndex: 'chinesename',
            },
            {
                title: 'omimsource',
                dataIndex: 'omimsource',
            },
            {
                title: 'chposource',
                dataIndex: 'chposource',
            },
            {
                title: 'omimcode',
                dataIndex: 'omimcode',
            },
            {
                title: 'status',
                dataIndex: 'status',
            },
        ]
    }
}   
export default list;