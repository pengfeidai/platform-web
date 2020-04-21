import React, { ReactNode } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageData } from './data.d';
import { queryServices } from './service';
import { Tag } from 'antd';

const renderRow = (value: ReactNode, row: any, idx: number, name: string) => {
  return (valueI: ReactNode, rowI: any, idxI: number) => {
    const obj: ReactNode = {
      children: rowI.nodes[idxI][name],
      rowSpan: 2,
      props: {
        rowSpan: 2,
      },
    };

    return obj;
  };
};

const TableList: React.FC<{}> = () => {
  const columns: ProColumns<PageData>[] = [
    {
      title: '服务',
      dataIndex: 'name',
    },
    {
      title: 'id',
      dataIndex: 'id',
      render: renderRow,
    },
    {
      title: 'address',
      dataIndex: 'address',
      render: (value: ReactNode, row: any, idx: number) => {
        const obj: ReactNode = {
          children: row.nodes[idx].address,
          props: {
            rowSpan: row.nodes.length,
          },
        };

        return obj;
      },
    },
    {
      title: 'metadata',
      dataIndex: 'metadata',
      render: (value: ReactNode, row: any, idx: number) => {
        const obj: ReactNode = {
          children: row.nodes[idx].metadata,
          props: {
            rowSpan: row.nodes.length,
          },
        };

        return obj;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (value: ReactNode, row: any) => {
        const obj: ReactNode = {
          children: <Tag>delete</Tag>,
          props: {
            rowSpan: row.nodes.length,
          },
        };

        return obj;
      },
    },
  ];

  return (
    <ProTable<PageData>
      rowKey="key"
      bordered
      pagination={false}
      request={(params: any) => queryServices(params)}
      columns={columns}
    />
  );
};

export default TableList;
