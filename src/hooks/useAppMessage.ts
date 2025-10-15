import { message } from "antd"
import type { MessageType, showMessageHandlerType } from "../types";
import type React from "react";

export function useAppMessage(): { contextHolder: React.ReactElement, showMessageHandler: showMessageHandlerType } {
    const [messageApi, contextHolder] = message.useMessage()

    const showMessage = (type: MessageType, content: string, duration?: number) => {
        messageApi[type](content, duration);
    }

    const showMessageHandler: showMessageHandlerType = {
        success: (content: string, duration?: number) => showMessage('success', content, duration),
        error: (content: string, duration?: number) => showMessage('error', content, duration),
        info: (content: string, duration?: number) => showMessage('info', content, duration),
        warning: (content: string, duration?: number) => showMessage('warning', content, duration),
        loading: (content: string, duration?: number) => messageApi.loading(content, duration),
    }

    return { contextHolder, showMessageHandler }

}