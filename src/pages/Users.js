import React, { PureComponent } from 'react';
import { connect } from 'dva';

import UsersComponent from '@/components/Users/Users';
function Users(){
  return (
    <div>
      <UsersComponent />
    </div>
  );
}


export default connect()(Users);
