import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from '@alicloud/console-components'
import { DialogProps } from '@alifd/next/types/dialog'
import { MessageProps } from '@alifd/next/types/message'
import ConfirmDialog, { IConfirmDialogProps } from './ConfirmDialog'

/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * @public
 */
export interface IShowConfirmDialogConfig {
  /**
   * 对话框的信息类型，会影响弹窗上的图标
   */
  type?: 'success' | 'warning' | 'error' | 'notice' | 'help' | 'loading'
  /**
   * 对话框的标题
   */
  title: React.ReactNode
  /**
   * 对话框的信息内容
   */
  content?: React.ReactNode
  /**
   * 用户点击确认的回调
   */
  onConfirm?: () => void
  /**
   * 用户点击取消的回调
   */
  onCancel?: () => void
  /**
   * 透传给基础组件`<Dialog>`组件的props，控制弹窗的展示。其中的`onConfirm`、`onCancel`、`visible`无作用，由本组件来控制
   */
  dialogProps?: DialogProps
  /**
   * 透传给基础组件`<Message>`组件的props，控制信息的内容。其中的`type`、`title`、`content`无作用，由本组件来控制
   */
  messageProps?: MessageProps
}

/**
 * 命令式地展示对话框，调用起来比较方便。
 * 比如在button的onClick回调里面调用
 * @public
 */
const show = ({
  type = 'help',
  title,
  content,
  onCancel,
  onConfirm,
  dialogProps,
  messageProps,
}: IShowConfirmDialogConfig) => {
  const container = document.createElement('div')
  const unmount = () => {
    ReactDOM.unmountComponentAtNode(container)
    container.parentNode && container.parentNode.removeChild(container)
  }
  document.body.appendChild(container)
  const newContext = (ConfigProvider as any).getContext()

  const hide = () => {
    // hide的过程：
    // 用户点击确认，actualOnConfirm被调用，hide被调用
    // hide将visible设置为false，re-render
    // dialog 隐藏的动画播完以后，会调用afterClose，即unmount
    // unmount将DOM节点卸载
    const newProps: IConfirmDialogProps = {
      ...confirmDialogProps,
      dialogProps: {
        ...confirmDialogProps.dialogProps,
        visible: false,
      },
    }

    ReactDOM.render(
      <Comp context={newContext} confirmDialogProps={newProps} />,
      container
    )
  }
  const actualOnConfirm = () => {
    onConfirm && onConfirm()
    hide()
  }
  const actualOnCancel = () => {
    onCancel && onCancel()
    hide()
  }

  const confirmDialogProps: IConfirmDialogProps = {
    dialogProps: {
      closeable: false,
      ...dialogProps,
      visible: true,
      onOk: actualOnConfirm,
      onCancel: actualOnCancel,
      afterClose: unmount,
    },
    messageProps: {
      ...messageProps,
      type,
      title,
    },
    children: content,
  }

  ReactDOM.render(
    <Comp context={newContext} confirmDialogProps={confirmDialogProps} />,
    container
  )

  return {
    hide,
  }
}

export default show

const Comp: React.FC<{
  context: any
  confirmDialogProps: IConfirmDialogProps
}> = ({ context, confirmDialogProps }) => {
  return (
    <ConfigProvider {...context}>
      <ConfirmDialog {...confirmDialogProps} />
    </ConfigProvider>
  )
}
