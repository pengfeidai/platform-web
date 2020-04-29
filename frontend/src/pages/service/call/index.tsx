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
  callState: CallState;
  loading: boolean;
}

const Call: FC<CallProps> = ({dispatch, callState, loading}) => {
  const options: any = []
  const onLoad = () => {
    dispatch({
      type: 'callService/fetch',
      payload: {},
    });
  };
  const rendererService = () => {
    const {services} = callState
    services.forEach(s => {
      options.push(<Option value={s.name}>{s.name}</Option>)
    })
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
                    options
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
     callState,
   }: {
    loading: { effects: { [key: string]: boolean } };
    callState: CallState;
  }) => ({
    callState,
    loading: loading.effects['call/fetch'],
  }),
)(Call);
