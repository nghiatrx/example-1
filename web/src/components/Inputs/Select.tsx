import React from 'react';
import { Select as AntSelect } from 'antd';
const { Option } = AntSelect;

const Select = (props: SelectProps) => (
  <AntSelect value={props.input.value} onChange={(value: string) => props.input.onChange(value)}>
    {
      Array.isArray(props.options) && props.options.map(item => (
        <Option key={item.id} value={item.id}>{item.text}</Option>
      ))
    }
  </AntSelect>
)

export interface SelectProps {
  input: any;
  options: [{
    id: string;
    text: string;
  }]
}

export default Select;