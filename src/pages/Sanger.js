import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Button, Tooltip } from 'antd';
 
@connect(({ sanger, loading }) => ({
    sanger
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
            sanger: { tableData, current, pageSize, totalSize },
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
            type: 'sanger/getAllSanger',
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
                title: 'sampleid',
                dataIndex: 'sampleid',
            },
            {
            title: 'chromesome',
            render: (text, record) => (
                <span>{record.chr}:{record.start}>{record.end}</span> 
            ),
            },
            {
                title: 'ref',
                dataIndex: 'ref',
            },
            {
                title: 'end1',
                dataIndex: 'end1',
            },
            {
                title: 'genotype',
                dataIndex: 'genotype',
            },
            {
                title: 'gene',
                dataIndex: 'gene',
            },
            {
                title: 'region',
                dataIndex: 'region',
            },
            {
                title: 'mutationtype',
                dataIndex: 'mutationtype',
            },
            {
                title: 'aachange',
                dataIndex: 'aachange',
                render: (text, record, index) => {
                    let aachange ='';
                    if(record.aachange && record.aachange.length>15){
                        aachange = record.aachange.substring(0,15)+'...'
                        return (<Tooltip title={text} placement="bottom" >
                        <div>{aachange}</div> 
                        </Tooltip>)
                    } else{
                        return record.aachange
                    }
                }
            },
            {
                title: 'confirmed',
                dataIndex: 'confirmed',
            },
        ]
    }
}   
export default list;