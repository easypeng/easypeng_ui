// 展示组件：展示通过 props 传递到组件内部数据；传入的数据来源于容器组件向展示组件的props
import React from 'react';
import { connect } from 'dva';
import DiseasesController from '@/components/Diseases/DiseaseList';

function Diseases({ }) {
  return (
      <div>
        <DiseasesController />
      </div>
  );
}

export default connect()(Diseases);
