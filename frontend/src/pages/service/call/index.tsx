import {Card, Col, Input, Row, Space} from 'antd';
import React, {FC, useState, useMemo, useRef } from 'react';

import {GridContent, PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect, Dispatch} from 'umi';
import {RouteChildrenProps} from 'react-router';
import {CallState} from './model';
import Forms from '../../../components/Forms';


const {TextArea} = Input;


interface CallProps extends RouteChildrenProps {
  dispatch: Dispatch;
  callService: CallState;
  loading: boolean;
}



const Call: FC<CallProps> = ({ dispatch ,callService }) => {
  const [addOpt,setAddOpt]: Array<any> = useState([])
  const [endpointOpt,setEndpointOpt]: Array<any> = useState([])
  const { services }: any = callService
  let formRef:object = useRef(null)
  const serviceOptions: Array<any> = useMemo(()=>{
    let list: Array<object> = []
    if(services && services.length){
      list = services.map((item:object)=>({value:item.name,label:item.name}))
    }
    return list
  },[services])

  //console.log(serviceOptions)




  const formOption: any = ()=>[
    {
      formType:'select',
      name:'Service',
      options:serviceOptions,
      placeholder:'Service',
      onChange:(val:any)=>{
        if(val){
          let selectItem: object = services.find((v:object)=>v.name===val)
          let addOpt: Array<any> = selectItem.nodes.map((v:object)=>({value:v.address,label:v.address}))
          let endpointOpt: Array<any> = selectItem.endpoints.map((v:object)=>({value:v.name,label:v.name,request:v.request}))
          setAddOpt(addOpt)
          setEndpointOpt(endpointOpt)
        }

      }
    },
    {
      formType:'select',
      name:'Address',
      options:addOpt,
      placeholder:'Address'
    },
    {
      formType:'select',
      name:'Endpoint',
      options:endpointOpt,
      placeholder:'Endpoint',
      onChange:(val:any)=>{
        if(val){
          let request:any = endpointOpt.find((v:object)=>v.value===val).request
          formRef.current.setFieldsValue({request:'111'})
        }

      }
    },
    {
      formType:'textarea',
      name:'request',
    },
    {
      formType:'button',
      label:'call',
      onClick:()=>{
        console.log(formRef.current.getFieldsValue())
      }
    }
  ]



  return (
    <PageHeaderWrapper>
      <GridContent>
        <Row gutter={24}>
          <Col lg={10} md={24}>
            <Card bordered={false} style={{marginBottom: 24}}>



              <Space style={{width: "100%"}} size="large" direction="vertical">
                <Forms ref={formRef}  options={formOption()} />
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
