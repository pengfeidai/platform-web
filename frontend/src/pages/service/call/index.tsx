import {Button, Card, Col, Input, Row, Select, Space} from 'antd';
import React, {FC, useEffect} from 'react';

import {GridContent, PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect, Dispatch} from 'umi';
import {RouteChildrenProps} from 'react-router';
import {CallState} from './model';

const {Option} = Select;
const {TextArea} = Input;


interface CallProps extends RouteChildrenProps {
  dispatch: Dispatch;
  callService: CallState;
  loading: boolean;
}

const Call: FC<CallProps> = ({dispatch, callService, loading}) => {
  const onLoad = () => {
    dispatch({
      type: 'callService/fetch',
      payload: {},
    });
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <PageHeaderWrapper>
      <GridContent>
        <Row gutter={24}>
          <Col lg={10} md={24}>
            <Card bordered={false} style={{marginBottom: 24}}>
              <Space style={{width: "100%"}} size="large" direction="vertical">
                <Select placeholder="Service" style={{width: "100%"}}>
                  {
                    (() => {
                      const {services} = callService
                      const opts: JSX.Element[] = []
                      services.forEach(s => {
                        opts.push(<Option value={s.name}>{s.name}</Option>)
                      })
                      return opts;
                    })()
                  }
                </Select>
                <Select placeholder="Address" style={{width: "100%"}}>
                </Select>
                <Select placeholder="Endpoint" style={{width: "100%"}}>
                </Select>
                <Button>Call</Button>
                <TextArea rows={13}></TextArea>
              </Space>
            </Card>
          </Col>
          <Col lg={14} md={24}>
            <Card>
              <TextArea rows={23} readOnly></TextArea>
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageHeaderWrapper>
  );
}

export default connect(
  ({
     loading,
     callService,
   }: {
    loading: { effects: { [key: string]: boolean } };
    callService: CallState;
  }) => ({
    callService,
    loading: loading.effects['call/fetch'],
  }),
)(Call);
