require('./modal-box.less');

var ICON_ERROR = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="64 64 896 896" class="" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`;
let ICON_INFO = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg>`;

var MODAL_BOX_ID = "tiny-message-modal-box";

function getDOMElement() {
    var dom = document.getElementById(MODAL_BOX_ID);
    if (!dom) {
        dom = document.createElement("div");
        dom.id = MODAL_BOX_ID;
        dom.setAttribute("id", MODAL_BOX_ID);
        dom.innerHTML = '' +
            '<div class="tiny-message-modal-body">' +
            '    <div class="tiny-message-modal-body1">' +
            '        <div class="tiny-message-modal-icon" ></div>' +
            '        <div class="tiny-message-modal-content"></div>' +
            '    </div>' +
            '    <div class="tiny-message-modal-buttons">' +
            '        <button class="tiny-message-modal-btn-ok"></button>' +
            '        <button class="tiny-message-modal-btn-cancel"></button>' +
            '    </div>' +
            '</div>';
        document.body.appendChild(dom);
    }
    return dom;
}


function showButton(dom, buttonText, className, innerHTML, onclick) {
    var btn1Dom = dom.getElementsByClassName(className)[0];
    if (buttonText) {
        btn1Dom.style.display = 'inline-block';
        btn1Dom.innerHTML = innerHTML;
        btn1Dom.onclick = onclick;
    } else {
        btn1Dom.style.display = 'none';
    }
}

function showModalBox(config) {
    var icon = config.icon || ''; //html
    var content = config.content || '';
    var okText = config.okText || '确定';
    var okClick = config.okClick || hideModalBox;
    var cancelText = config.cancelText;// '取消';
    var cancelClick = config.cancelClick || hideModalBox;
    var dom = getDOMElement();

    var iconDom = dom.getElementsByClassName('tiny-message-modal-icon')[0];
    if (icon === 'info'){
        iconDom.innerHTML = `<span style="color: #1890ff">${ICON_INFO}</span>`;
    } else if (icon === 'error') {
        iconDom.innerHTML = ICON_ERROR;
    } else {
        iconDom.innerHTML = icon;
    }


    var contentDom = dom.getElementsByClassName('tiny-message-modal-content')[0];
    contentDom.innerHTML = content;

    showButton(dom, okText, 'tiny-message-modal-btn-ok', okText, okClick);
    showButton(dom, cancelText, 'tiny-message-modal-btn-cancel', cancelText, cancelClick);

    dom.style.display = 'block';
}


function hideModalBox() {
    var dom = getDOMElement();
    dom.style.display = 'none';
}


module.exports = {
    showModalBox,
    hideModalBox
};