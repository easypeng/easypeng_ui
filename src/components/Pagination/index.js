import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { PRE_PAGE } from '../../defaultSettings';
import styles from './index.less';

export default class PaginationComponent extends PureComponent {
  render() {
    const { total, current, pageChangeHandler } = this.props;
    return (<div><Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={PRE_PAGE}
        onChange={pageChangeHandler}
      />
    </div>);
  }
}
