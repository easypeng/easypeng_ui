import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'veritas',
          title: 'Veritas 首页',
          href: 'https://pro.ant.design',
          blankTarget: true,
        }
        // {
        //   key: 'just',
        //   title: <Icon type="github" />,
        //   href: 'https://github.com/ant-design/ant-design-pro',
        //   blankTarget: true,
        // }
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 奕真医学检验所技术部出品
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
