import React, { Component } from 'react'
import { Table, Pagination } from '@alicloud/console-components'
import './demo13.less'

const dataSource = (j) => {
  const result = []
  for (let i = 0; i < 5; i++) {
    result.push({
      title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
      id: 100306660940 + i + j,
      time: 2000 + j
    })
  }
  return result
},
render = (value, index, record) => {
  return <a>Remove({record.id})</a>;
}

export default class Demo13 extends React.Component {

  state = {
    dataSource: dataSource(1)
  }
  onChange = (currentPage) => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        dataSource: dataSource(currentPage),
        loading: false
      });
    }, 200)
  }
  render() {
    return (
      <div>
        <Table dataSource={this.state.dataSource} loading={this.state.loading}>
          <Table.Column title="Id1" dataIndex="id" width={140} />
          <Table.Column title="Time" dataIndex="time" width={500} />
          <Table.Column cell={render} width={200} />
        </Table>
        <Pagination onChange={this.onChange} className="page-demo" />
      </div>
    )
  }
}
