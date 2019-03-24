import React from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Diseases.css';
import { PRE_PAGE } from '../../defaultSettings';
import DiseaseModal from './DiseaseModal';
import PaginationComponent from '@/components/Pagination'
import DiseaseSearch from './DiseaseSearch';
function Diseases({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'diseases/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/diseases',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'diseases/patch',
      payload: { id, values },
    });
  }

  function queryHandler(values) {
    dispatch({
      type: 'diseases/fetch',
      payload: { values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'diseases/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'diseasename',
      dataIndex: 'diseasename',
  },
  {
      title: 'diseasenamech',
      dataIndex: 'diseasenamech',
  },
  {
      title: 'otherdiseasename',
      dataIndex: 'otherdiseasename',
  },
  // {
  //     title: 'diseasedescriptionenglish',
  //     dataIndex: 'diseasedescriptionenglish',
  // },
  // {
  //     title: 'diseasedescriptionchinese',
  //     dataIndex: 'diseasedescriptionchinese',
  // },
  {
      title: 'modeofinheritance',
      dataIndex: 'modeofinheritance',
  },
  {
      title: 'omimcode',
      dataIndex: 'omimcode',
  },
  {
      title: 'status',
      dataIndex: 'status',
  },
  {
    title: 'Operation',
    key: 'operation',
    render: (text, record) => (
      <span className={styles.operation}>
        <DiseaseModal record={record} onOk={editHandler.bind(null, record.uuid)}>
          <a>Edit</a>
        </DiseaseModal>
        <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.uuid)}>
          <a href="">Delete</a>
        </Popconfirm>
      </span>
    ),
  },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <DiseaseSearch page={current} record={{}} onOk={createHandler} onSubmit={queryHandler}/>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <PaginationComponent
          total={total}
          current={current}
          pageSize={PRE_PAGE}
          pageChangeHandler={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.diseases;
  return {
    loading: state.loading.models.diseases,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Diseases);
