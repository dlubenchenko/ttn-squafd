export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export type ErrorMessageMap = { [key: string]: string };

export interface showMessageHandlerType {
    success: (content: string, duration?: number) => void;
    error: (content: string, duration?: number) => void;
    info: (content: string, duration?: number) => void;
    warning: (content: string, duration?: number) => void;
    loading: (content: string, duration?: number) => void;
}