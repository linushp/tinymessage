(function (global, factory) {
    if (typeof module !== 'undefined') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        global.TinyMessage = factory()
    }
}(this, (function () {
    'use strict';

    let checkCircle = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`;
    let infoCircle = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>`;
    let closeCircle = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`;
    let exclamationCircle = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>`;
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
<div class="ant-message-notice">
    <div class="ant-message-notice-content">
        <div class="ant-message-custom-content ant-message-success">
            <i class="anticon anticon-check-circle">${iconType}</i>
            <span>${text}</span>
        </div>
   </div>
</div>`;
        return html;
    }


    function Message(idIndex, type, content, duration, messageManager) {
        this.idIndex = idIndex;
        this.duration = duration;
        this.messageManager = messageManager;
        this.element = null;
        this.show = function () {
            let html = createElement(type, content);
            let element = document.createElement('div');
            element.innerHTML = html;
            document.body.appendChild(element);
            this.element = element;
            this.timeout = setTimeout(function () {

            },duration);
        }
    }


    function MessageManager() {
        this.messageBoxs = [];
        this.idIndex = 0;
        this.showMessage = function (type, content, duration) {
            if (typeof window === 'undefined' || typeof document === 'undefined') {
                return;
            }
            this.idIndex++;
            content = content || 'hello';
            duration = duration || 1000;
            let message = new Message(this.idIndex, type, content, duration, this);
            this.messageBoxs.push(message);
            message.show();
        }
    }


    let messageManager = new MessageManager();

    return {
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
            return messageManager.destroy();
        }
    };


})));
