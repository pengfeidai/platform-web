import {Card, Col, Input, Row} from 'antd';
import React, {Component} from 'react';

import {GridContent} from '@ant-design/pro-layout';
import {connect, Dispatch} from 'umi';
import {RouteChildrenProps} from 'react-router';
import {ModalState} from './model';
import {CurrentUser} from "@/pages/account/center/data";


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
      <GridContent>
        <Row gutter={24}>
          <Col lg={10} md={24}>
            <Card bordered={false} style={{marginBottom: 24}}/>
          </Col>
          <Col lg={14} md={24}>
            <Card/>
          </Col>
        </Row>
      </GridContent>
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
