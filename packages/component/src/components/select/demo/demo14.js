import React, { Component }from 'react'
import { Select, Icon } from '@alicloud/console-components'
import './demo14.less'

const dataSource = [
  {value: '#FF0000', label: 'red', title: 'red'},
  {value: '#00AA00', label: 'green', title: 'green'},
  {value: '#B482DB', label: 'purple', title: 'purple'},
  {value: '#F17334', label: 'orange', title: 'orange'},
  {value: '#66CCFF', label: 'blue', title: 'blue'}
]

const itemRender = item => {
  return (
    <span>
      <Icon type="account" size="xs" style={{color: item.value}} />
      <Icon type="account" size="xs" style={{color: item.value}} />
      <Icon type="account" size="xs" style={{color: item.value}} />
      <Icon type="account" size="xs" style={{color: item.value}} />
      <Icon type="account" size="xs" style={{color: item.value}} />
    </span>
  )
}

const valueRender = item => {
  return <span>
           <Icon type="account" size="xs" style={{color: item.value}} /> 
           {item.label}
         </span>
}

const dataSource2 = [
  'Lorem ipsum dolor sit amet',
  'consectetur adipisicing elit',
  'sed do eiusmod tempor incididunt',
  'ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam',
  'quis nostrud exercitation',
  'ullamco laboris nisi ut',
  'aliquip ex ea commodo consequat',
  'Duis aute irure dolor in',
  'reprehenderit in voluptate',
  'velit esse cillum dolore eu',
  'Fugiat nulla pariatur excepteur sint',
  'occaecat cupidatat non proident',
  'sunt in culpa qui officia',
  'deserunt mollit anim id est laborum',
]

// hightlight keywords
const itemRender2 = (item, searchKey) => {
  let label = item.label
  if (searchKey && searchKey.length) {
    const key = searchKey.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    const reg = new RegExp(`(${key})`, 'ig')
    label = label.replace(reg, x => `<span class="next-select-highlight">${x}</span>`)
  }

  return <span dangerouslySetInnerHTML={{__html: label}} />
}
const Demo14 = () => (
  <div className="select-demo14-container">
    <Select dataSource={dataSource} itemRender={itemRender} valueRender={valueRender} placeholder="pick your color" />
    <Select showSearch dataSource={dataSource2} itemRender={itemRender2} placeholder="hightlight keywords" style={{minWidth: 200}} />
  </div>
)
export default Demo14