import {Button, Card, Col, Input, Row, Select, Space} from 'antd';
import React, {FC, useEffect} from 'react';

import {GridContent, PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect, Dispatch} from 'umi';
import {RouteChildrenProps} from 'react-router';
import {ModalState, CallState} from './model';

const {TextArea} = Input;


interface CallProps extends RouteChildrenProps {
  dispatch: Dispatch;
  callState: CallState;
  loading: boolean;
}


const Call: FC<CallProps> = ({dispatch, service, currentNode, loading}) => {
  const onLoad = () => {
    dispatch({
      type: 'call/fetch',
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
                    service
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
    currentUser: callState,
    currentUserLoading: loading.effects['call/fetch'],
  }),
)(Call);
