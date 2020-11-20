export interface MessageObject {
    show: () => void;
    updateContent: () => void;
    destroy: () => void;
}

export interface ModalBoxConfig {
    icon?: string,
    content?: string,
    okText?: string,
    okClick?: (e?: any) => void,
    cancelText?: string,
    cancelClick?: (e?: any) => void,
}

export declare function setUseFrameProxy(isSend?: boolean, isListen?: boolean): void;

export declare function info(content: string, duration?: number): MessageObject;

export declare function success(content: string, duration?: number): MessageObject;

export declare function error(content: string, duration?: number): MessageObject;

export declare function warn(content: string, duration?: number): MessageObject;

export declare function warning(content: string, duration?: number): MessageObject;

export declare function loading(content: string, duration?: number): MessageObject;

export declare function destroy(): void;

export declare function toastSuccess(content: string, duration?: number): void;

export declare function toastLoading(content: string, duration?: number): void;

export declare function toast(content: string, duration?: number, animationClass?: string): void;

export declare function showModalBox(config: ModalBoxConfig): void;

export declare function hideModalBox(): void;

