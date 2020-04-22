import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Service, Node } from './data.d';
import { queryServices } from './service';
import { Table } from 'antd';

const TableList: React.FC<{}> = () => {
  const expandedRowRender = (row: Service) => {
    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
    ];

    return <Table<Node> columns={columns} dataSource={row.nodes} pagination={false} />;
  };

  const columns: ProColumns<Service>[] = [
    {
      title: '服务',
      dataIndex: 'name',
    },
  ];

  return (
    <ProTable<Service>
      rowKey="key"
      bordered
      expandedRowRender={expandedRowRender}
      toolBarRender={false}
      pagination={false}
      request={(params: any) => queryServices(params)}
      columns={columns}
    />
  );
};

export default TableList;
