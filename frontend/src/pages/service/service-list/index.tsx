import React, { FC, useEffect } from 'react';
import { Col, Input, Layout, Row, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { Service } from './data.d';
import { StateServices } from '@/pages/service/service-list/model';

const { Search } = Input;
const { Header, Content } = Layout;

interface ServicesProps {
  dispatch: Dispatch<any>;
  searchServices: StateServices;
  loading: boolean;
}

const Services: FC<ServicesProps> = ({ dispatch, searchServices: { list }, loading }) => {
  useEffect(() => {
    dispatch({
      type: 'searchServices/fetch',
      payload: {
        name: '',
      },
    });
  }, []);

  const onSearch = (value: string) => {
    dispatch({
      type: 'searchServices/fetch',
      payload: {
        name: value,
      },
    });
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
          <Row>
            <Col sm={8} xs={24}>
              <Search
                placeholder="input search text"
                onSearch={(value) => onSearch(value)}
                style={{ width: 200 }}
              />
            </Col>
          </Row>
        </Header>
        <Content>
          <Table<Service>
            rowKey={(row: any) => {
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
