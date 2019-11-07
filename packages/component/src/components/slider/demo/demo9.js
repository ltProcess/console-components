import React from 'react'
import { Slider } from '@alicloud/console-components'
//import './demo9.less'

const Demo9 = () => (
  <div>
    <Slider slidesToShow={4} arrowPosition="outer">
      <div style={{width: '25%'}}><h4 className="h4">1</h4></div>
      <div style={{width: '25%'}}><h4 className="h4">2</h4></div>
      <div style={{width: '25%'}}><h4 className="h4">3</h4></div>
      <div style={{width: '25%'}}><h4 className="h4">4</h4></div>
      <div style={{width: '25%'}}><h4 className="h4">5</h4></div>
    </Slider>
    <br />
    <Slider>
      <div><h3 className="h3">1</h3></div>
      <div><h3 className="h3">2</h3></div>
      <div><h3 className="h3">3</h3></div>
      <div><h3 className="h3">4</h3></div>
    </Slider>
  </div>
)

export default Demo9