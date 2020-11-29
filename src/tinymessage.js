let {showToast,hideToast} = require('./tiny-toast');
let {showModalBox,hideModalBox} = require('./modal-box');
require('./tinymessage.less');

let checkCircle = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>`;
let infoCircle = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg>`;
let closeCircle = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>`;
let exclamationCircle = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg>`;
let loadingCircle = `<svg viewBox="0 0 1024 1024" focusable="false" class="anticon-spin" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>`;

let iconTypeMap = {
    info: infoCircle,
    success: checkCircle,
    error: closeCircle,
    warning: exclamationCircle,
    loading: loadingCircle
};

function createElement(type, text) {
    let iconType = iconTypeMap[type];
    let html = `
<div class="tiny-message-notice">
    <div class="tiny-message-notice-content">
        <div class="tiny-message-custom-content tiny-message-${type}">
            <i class="tiny-message-icon">${iconType}</i>
            <span class="tiny-message-text">${text}</span>
        </div>
   </div>
</div>`;
    return html;
}


function removeElement(element) {
    if (element) {
        if (element.remove) {
            element.remove();
        } else if (element.removeNode) {
            element.removeNode(true);
        }
    }
}

class Message {
    constructor(indexId, type, content, duration, order, managerElement) {
        this.id = "tiny-message-" + indexId;
        this.type = type;
        this.order = order;
        this.html = createElement(type, content);
        this.element = null;
        this.managerElement = managerElement;
        this.timeout = null;
    }

    updateContent(content) {
        const div = this.element;
        const textSpan = div.getElementsByClassName('tiny-message-text')[0];
        textSpan.innerHTML = content
    }

    show() {
        let div = document.createElement('div');
        div.innerHTML = this.html;
        div.className = "tiny-message-box";
        div.id = this.id;
        div.style.top = (80 * this.order) + "px";
        div.style.opacity = "0";
        this.managerElement.appendChild(div);
        this.element = div;

        setTimeout(function () {
            div.style.opacity = "1";
            div.style.transform = 'translate(0,0)';
        }, 1);
    }

    destroy() {

        if (!this.element) {
            return Promise.resolve();
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.element.style.opacity = "0";
        this.element.style.height = "0";
        return new Promise((resolve) => {
            setTimeout(() => {
                removeElement(this.element);
                this.element = null;
                resolve();
            }, 100);
        });
    }


}


class MessageManager {

    constructor() {
        this.managerId = Date.now() + Math.ceil(Math.random() * 577362557025);
        this.indexId = Date.now() + Math.ceil(Math.random() * 577362557025);
        this.messageList = [];
        this.useFrameProxy = {isSend: false, isListen: false};
        this.initWindowListener();
    }

    getManagerElement() {
        let element = document.getElementById('tiny-message-manager');
        if (!element) {
            element = document.createElement('div');
            element.setAttribute('id', 'tiny-message-manager');
            document.body.appendChild(element);
        }
        return element;
    }

    removeManagerElement() {
        let element = document.getElementById('tiny-message-manager');
        if (element) {
            removeElement(element);
        }
    }

    isIframe() {
        return window !== window.parent;
    }

    initWindowListener() {
        if (typeof window === 'undefined') {
            return;
        }

        window.addEventListener('message', (e) => {
            if (this.useFrameProxy.isListen) {
                let {from, type, content, duration, managerId} = e.data || {};
                if (from === 'TinyMessageBox') {
                    //不处理自己发出去的事件
                    if (this.managerId === managerId) {
                        return;
                    }
                    this.showMessage(type, content, duration);
                }
            }
        });
    }

    showMessage(type = 'info', content = 'hello', duration = 3000) {

        if (typeof window === 'undefined') {
            return Promise.resolve();
        }


        if (this.useFrameProxy.isSend && this.isIframe()) {
            window.parent.postMessage({
                managerId: this.managerId,
                from: 'TinyMessageBox',
                type,
                content,
                duration,
            }, "*");
            return Promise.resolve();
        }



        let managerElement = this.getManagerElement();

        let order = this.messageList.length;
        let message = new Message(this.indexId++, type, content, duration, order, managerElement);
        message.show();

        this.messageList.push(message);

        message.timeout = setTimeout(async () => {await this.hideMessage(message);}, duration);

        return message;
    }


    async hideMessage(message) {
        await message.destroy();
        this.messageList = this.messageList.filter(function (x) {
            return message !== x;
        });
        if (this.messageList.length === 0) {
            this.removeManagerElement();
        }
    }


    destroy() {
        let messageList = this.messageList || [];
        for (let i = 0; i < messageList.length; i++) {
            const message = messageList[i];
            if (message.timeout) {
                clearTimeout(message.timeout);
                message.timeout = null;
            }
            message.destroy();
        }
        this.messageList = [];
        this.removeManagerElement();
    }

}


const messageManager = new MessageManager();

module.exports = {
    setUseFrameProxy(isSend, isListen) {
        return messageManager.useFrameProxy = {isSend, isListen};
    },
    info(content, duration) {
        return messageManager.showMessage('info', content, duration);
    },
    success(content, duration) {
        return messageManager.showMessage('success', content, duration);
    },
    error(content, duration) {
        return messageManager.showMessage('error', content, duration);
    },
    warn(content, duration) {
        return messageManager.showMessage('warning', content, duration);
    },
    warning(content, duration) {
        return messageManager.showMessage('warning', content, duration);
    },
    loading(content, duration) {
        return messageManager.showMessage('loading', content, duration);
    },
    destroy() {
        hideToast();
        messageManager.destroy();
    },
    toastSuccess(content, duration) {
        return showToast('toastSuccess', content, duration, null);
    },
    toastLoading(content, duration) {
        return showToast('toastLoading', content, duration, null);
    },
    toast(content, duration, animationClass) {
        return showToast('toast', content, duration, animationClass);
    },
    showModalBox(config) {
        return showModalBox(config);
    },
    hideModalBox(config) {
        return hideModalBox(config);
    }

};