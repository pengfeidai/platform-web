import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import { FormInstance } from 'antd/lib/form';

const FormItem = Form.Item
const {TextArea } = Input


class Forms extends React.Component{


  constructor(props){
    super(props)
    this.state = {
      options:props.options
    }
    this.ref = React.createRef();

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.options!=this.state.options){

      this.setState({
        options:this.state.options
      })
    }

  }

  getFieldsValue=()=>{
    return this.ref.current.getFieldsValue()
  }

  setFieldsValue=(name,value)=>{
    this.ref.current.setFieldsValue(name, value);
  }


  render(){
    const {options, formOpt } = this.props
    function creatFormItem(item,index){
      let {formType,name,label,...otherProps} = item
      switch (formType) {
        case 'input' :
          return (
            <FormItem
              key={index}
              label={label}
              name={name}
            >
             <Input {...otherProps}/>
            </FormItem>
          )
          break;
        case 'textarea' :
          return (
            <FormItem
              key={index}
              label={label}
              name={name}
            >
              <TextArea  {...otherProps}/>
            </FormItem>
          )
          break;
        case 'select':
          return (
            <FormItem
              key={index}
              label={label}
              name={name}
            >
              <Select {...otherProps}>
              </Select>
            </FormItem>
          )
        break;
        case 'button':
          return (
            <FormItem
              key={index}
            >
              <Button {...otherProps}>{label}</Button>
            </FormItem>
          )
      }
    }

    return (
      <Form {...formOpt}  ref={this.ref}>
        {
          options.length >0 && options.map((item,index)=> item.hasOwnProperty('hidden') && item.hidden() ? null : creatFormItem(item,index))
        }
      </Form>
    )
  }
}


export default Forms
