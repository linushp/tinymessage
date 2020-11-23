let toastSuccess = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8.657 18.435L3 12.778l1.414-1.414 4.95 4.95L20.678 5l1.414 1.414-12.02 12.021a1 1 0 01-1.415 0z" fill-rule="evenodd"/></svg>`;
let toastLoading = `<svg viewBox='0 0 100 100' fill="currentColor" xmlns='http://www.w3.org/2000/svg' ><path fill='none' d='M0 0h100v100H0z'/><rect width='7' height='20' x='46.5' y='40' fill='#E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/><rect width='7' height='20' x='46.5' y='40' fill='#989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#9B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/><rect width='7' height='20' x='46.5' y='40' fill='#E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/></svg>`;

let iconTypeMap = {
    toastSuccess: toastSuccess,
    toastLoading: toastLoading
};

function getToastElement() {
    require('./tiny-toast.less');
    let element = document.getElementById('tiny-message-toast');
    if (!element) {
        element = document.createElement('div');
        element.setAttribute('id', 'tiny-message-toast');
        document.body.appendChild(element);
    }
    return element;
}


function createToastHtml(type, msg) {
    var iconType = iconTypeMap[type] || "";
    return `
<div class="tiny-message-toast-content  tiny-message-toast-content-${type}">
    <div class="tiny-message-toast-icon">${iconType}</div>
    <div class="tiny-message-toast-msg">${msg}</div>
</div>`;
}

let timeHandler = null;

function showToast(type, msg, duration, animationClass) {
    duration = duration || 3000;
    var root = getToastElement();
    if (type === 'toast') {
        animationClass = animationClass || 'tiny-message-toast11-animation';
        root.className = animationClass + '  tiny-message-toast11-' + type;
        setTimeout(function () {
            root.className = 'tiny-message-toast11-' + type;
        }, 300);
    } else {
        root.className = 'tiny-message-toast11-' + type;
    }
    root.innerHTML = createToastHtml(type, msg);
    root.style.display = 'block';

    if (timeHandler) {
        clearTimeout(timeHandler);
        timeHandler = null;
    }

    timeHandler = setTimeout(function () {
        let root = getToastElement();
        root.style.display = 'none';
        timeHandler = null;
    }, duration);
}

module.exports = {
    showToast
};