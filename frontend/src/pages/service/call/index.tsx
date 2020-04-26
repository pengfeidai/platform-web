import {Card, Col, Space, Input, Row, Button, Select} from 'antd';
import React, {Component} from 'react';

import {GridContent, PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect, Dispatch} from 'umi';
import {RouteChildrenProps} from 'react-router';
import {ModalState} from './model';
import {CurrentUser} from "@/pages/account/center/data";

const {TextArea} = Input;


interface CallProps extends RouteChildrenProps {
  dispatch: Dispatch;
  currentService: Partial<CurrentUser>;
}

interface CallState {
}


class Call extends Component<CallProps, CallState> {
  state: CallState = {};

  public input: Input | null | undefined = undefined;

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
    dispatch({
      type: 'accountAndcenter/fetch',
    });
  }

  render() {
    return (
      <PageHeaderWrapper>
        <GridContent>
          <Row gutter={24}>
            <Col lg={10} md={24}>
              <Card bordered={false} style={{marginBottom: 24}}>
                <Space style={{width: "100%"}} size="large" direction="vertical">
                  <Select placeholder="Service" style={{width: "100%"}}>
                  </Select>
                  <Select placeholder="Address" style={{width: "100%"}}>
                  </Select>
                  <Select placeholder="Address" style={{width: "100%"}}>
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
}


export default connect(
  ({
     loading,
     callService,
   }: {
    loading: { effects: { [key: string]: boolean } };
    callService: ModalState;
  }) => ({
    currentUser: callService.currentUser,
    currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
  }),
)(Call);
