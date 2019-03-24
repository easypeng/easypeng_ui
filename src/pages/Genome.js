import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table,Popconfirm, Card, Button, Tooltip } from 'antd';
 
@connect(({ genome, loading }) => ({
    genome
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
            genome: { tableData, current, pageSize, totalSize },
        } = this.props;
        return(<Table columns={this.columns}  scroll={{ x: '100%', y: '100%' }} 
                        bordered
                        dataSource={tableData}
                        pagination={{ ...this.pageInfo, current: current, pageSize, total: totalSize }}
                        onChange={this.handleTableChange.bind(this)}
                        onRow={this.onRowSelect}
                        />
            );
    }
    onDelete(uuid){
        const {
            dispatch, genome: { tableData, current, pageSize, totalSize },
        } = this.props;
        // const pageInfo = this.state.pageInfo;
        dispatch({
            type: 'genome/delete_by_uuid',
            payload:uuid,
        }).then(() =>{
            this.getTableData()
        });
    }
    componentDidMount() {
        this.getTableData();
    }
    getTableData(){
        const {
            dispatch, genome: { tableData, current, pageSize, totalSize },
        } = this.props;
        // const pageInfo = this.state.pageInfo; 
        //dispatch action models命名空间为list的下的getTableData
        dispatch({
            type: 'genome/getAllgenome',
            payload: {
                page: current,
                size: pageSize
            }
        });
        //dispatch action models命名空间为list的下的getTableData
    }
 
    handleTableChange(page_info) {
        const { dispatch } = this.props;
        dispatch({
            type: 'genome/getAllgenome',
            payload: {
                page: page_info.current,
                size: page_info.pageSize
             }
        })
        this.pageInfo =  {current:page_info.current ,pageSize: page_info.pageSize};
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
                title: 'genename',
                dataIndex: 'genename',
            },
            // {
            //     title: 'genealias',
            //     dataIndex: 'genealias',
            // },
            {
                title: 'database',
                dataIndex: 'database',
            },
            {
                title: 'genedescriptionenglish',
                dataIndex: 'genedescriptionenglish',
            },
            {
                title: 'genedescriptionchinese',
                dataIndex: 'genedescriptionchinese',
            },
            {
                title: 'hugoNomenclature',
                dataIndex: 'hugoNomenclature',
            },
            // {
            //     title: 'status',
            //     dataIndex: 'status',
            // },
            { title: '操作', 
            render: (text,record)=>(
                <Popconfirm title="Delete?" onConfirm={() => this.onDelete(record.uuid)}>
                    <Button>Delete</Button>
                </Popconfirm>)
            },
        ]
    }
}   
export default list;