import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns} from '@ant-design/pro-table';
import {TableListItem} from './data.d';
import {queryServices} from './service';


const TableList: React.FC<{}> = () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '命名空间',
      dataIndex: 'name',
    },
    {
      title: '服务名',
      dataIndex: 'desc',
    },
    {
      title: '元数据',
      dataIndex: 'callNo',
      sorter: true,
      renderText: (val: string) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {text: '关闭', status: 'Default'},
        1: {text: '运行中', status: 'Processing'},
        2: {text: '已上线', status: 'Success'},
        3: {text: '异常', status: 'Error'},
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a href="">
            配置
          </a>
          <a href="">下线</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        rowKey="key"
        request={(params) => queryServices(params)}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
