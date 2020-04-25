import React, { FC, useEffect } from 'react';
import { Input, Button, Layout, Table, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { Service } from './data.d';
import { StateServices } from '@/pages/service/service-list/model';

const { Header, Content } = Layout;

interface ServicesProps {
  dispatch: Dispatch;
  searchServices: StateServices;
  loading: boolean;
}

const Services: FC<ServicesProps> = ({ dispatch, searchServices: { list, filters }, loading }) => {
  const onSearch = () => {
    dispatch({
      type: 'searchServices/fetch',
      payload: {
        serviceStr: filters.service,
        nodeStr: filters.node,
      },
    });
  };

  useEffect(() => {
    onSearch();
  }, []);

  const onServiceChange = (e: any) => {
    // eslint-disable-next-line no-param-reassign
    filters.service = e.target.value;
  };

  const onNodeChange = (e: any) => {
    // eslint-disable-next-line no-param-reassign
    filters.node = e.target.value;
  };

  const expandedRowRender = (row: any) => {
    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      {
        title: 'address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'metadata',
        dataIndex: 'metadata',
        key: 'metadata',
      },
    ];

    return <Table columns={columns} dataSource={row.nodes} pagination={false} />;
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
  ];

  return (
    <div>
      <PageHeaderWrapper>
        <Header style={{ marginBottom: 23 }}>
          <Space size="small">
            <Input style={{ width: 200 }} onChange={onServiceChange} placeholder="命名空间" />
            <Input style={{ width: 200 }} onChange={onNodeChange} placeholder="节点" />
            <Button icon={<SearchOutlined />} onClick={onSearch}>
              Search
            </Button>
          </Space>
        </Header>
        <Content>
          <Table<Service>
            rowKey={(row: Service) => {
              return row.name;
            }}
            loading={list.length === 0 ? loading : false}
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={list}
            pagination={false}
          />
        </Content>
      </PageHeaderWrapper>
    </div>
  );
};

export default connect(
  ({
    searchServices,
    loading,
  }: {
    searchServices: StateServices;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    searchServices,
    loading: loading.models.listAndsearchAndarticles,
  }),
)(Services);
