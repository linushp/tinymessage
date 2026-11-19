import * as TinyMessage from './src/tinymessage.js';

document.getElementById('btn-success').onclick = () => {
  TinyMessage.success('Saved successfully', 3000);
};

document.getElementById('btn-error').onclick = () => {
  TinyMessage.error('Something went wrong', 3000);
};

document.getElementById('btn-info').onclick = () => {
  TinyMessage.info('Heads up', 3000);
};

document.getElementById('btn-warning').onclick = () => {
  TinyMessage.warning('Please check your input', 3000);
};

document.getElementById('btn-loading').onclick = () => {
  TinyMessage.loading('Loading...', 3000);
};

document.getElementById('btn-toast').onclick = () => {
  TinyMessage.toastSuccess('Done', 2000);
};

document.getElementById('btn-modal').onclick = () => {
  TinyMessage.showModalBox({
    icon: 'info',
    content: 'Are you sure you want to continue?',
    okText: 'OK',
    cancelText: 'Cancel',
  });
};

document.getElementById('btn-destroy').onclick = () => {
  TinyMessage.destroy();
};
