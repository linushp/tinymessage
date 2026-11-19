# tiny-message-box

A lightweight global message / toast / modal library with an Ant Design–inspired look.

Zero runtime dependencies. Works with plain JavaScript, and does not require React or Vue.

## Features

- Small and self-contained — no third-party UI libraries
- Framework-agnostic (React / Vue / vanilla JS)
- Message types: `info`, `success`, `error`, `warning`, `loading`
- Toast helpers for centered feedback
- Simple modal dialog with OK / Cancel actions
- Optional iframe proxy so messages from a child frame can show in the parent page
- TypeScript type definitions included

## Install

```bash
npm i tiny-message-box
```

Or with yarn:

```bash
yarn add tiny-message-box
```

## Quick start

```javascript
import * as TinyMessage from 'tiny-message-box';

TinyMessage.success('Saved successfully', 3000);
TinyMessage.error('Something went wrong', 3000);
TinyMessage.info('Heads up', 3000);
TinyMessage.warning('Please check your input', 3000);
TinyMessage.loading('Loading...', 3000);

TinyMessage.destroy(); // close all active messages and toasts
```

CommonJS:

```javascript
const TinyMessage = require('tiny-message-box');

TinyMessage.success('Saved successfully');
```

Browser (UMD global `TinyMessage` after bundling):

```html
<script src="path/to/tinymessage.js"></script>
<script>
  TinyMessage.info('Hello');
</script>
```

## Messages

Each message API takes:

| Argument   | Type     | Default | Description                                      |
|------------|----------|---------|--------------------------------------------------|
| `content`  | `string` | —       | Text shown in the message                        |
| `duration` | `number` | `3000`  | Auto-dismiss delay in milliseconds               |

Return value: a `MessageObject` with:

| Method                     | Description                          |
|----------------------------|--------------------------------------|
| `show()`                   | Show the message (already called)    |
| `updateContent(content)`   | Update the message text in place     |
| `destroy()`                | Dismiss this message immediately     |

### Examples

```javascript
// Basic usage
TinyMessage.success('Success');
TinyMessage.error('Error', 5000);
TinyMessage.warn('Warning');      // alias of warning
TinyMessage.warning('Warning');
TinyMessage.loading('Please wait...', 0); // still uses duration; pass a large value if needed

// Update content while visible
const msg = TinyMessage.loading('Uploading...');
setTimeout(() => {
  msg.updateContent('Almost done...');
}, 1000);

// Dismiss one message early
const notice = TinyMessage.info('You can close me');
notice.destroy();

// Dismiss everything
TinyMessage.destroy();
```

## Toast

Centered toast-style feedback (separate from the top message stack):

```javascript
TinyMessage.toastSuccess('Done', 2000);
TinyMessage.toastLoading('Working...', 3000);
TinyMessage.toast('Custom toast', 3000);
// optional animation class name as the third argument:
TinyMessage.toast('Hello', 3000, 'tiny-message-toast11-animation');
```

`TinyMessage.destroy()` also hides any active toast.

## Modal

```javascript
TinyMessage.showModalBox({
  icon: 'info', // 'info' | 'error' | custom HTML string
  content: 'Are you sure you want to continue?',
  okText: 'OK',
  cancelText: 'Cancel',
  okClick() {
    // handle confirm
    TinyMessage.hideModalBox();
  },
  cancelClick() {
    TinyMessage.hideModalBox();
  },
});

// Close programmatically
TinyMessage.hideModalBox();
```

### Modal options (`ModalBoxConfig`)

| Option         | Type              | Default     | Description                                      |
|----------------|-------------------|-------------|--------------------------------------------------|
| `icon`         | `string`          | `''`        | `'info'`, `'error'`, or custom HTML              |
| `content`      | `string`          | `''`        | Modal body content (HTML allowed)                |
| `okText`       | `string`          | `'确定'`    | OK button label; falsy hides the button          |
| `okClick`      | `(e?) => void`    | hide modal  | OK button click handler                          |
| `cancelText`   | `string`          | —           | Cancel button label; omit/falsy hides the button |
| `cancelClick`  | `(e?) => void`    | hide modal  | Cancel button click handler                      |

## iframe proxy

When your app runs inside an iframe, you can forward messages to the parent page:

```javascript
// In the parent page (listen for child messages)
TinyMessage.setUseFrameProxy(false, true);

// In the iframe (send messages to parent instead of rendering locally)
TinyMessage.setUseFrameProxy(true, false);
```

| Argument   | Meaning                                              |
|------------|------------------------------------------------------|
| `isSend`   | If `true` and running in an iframe, post to parent   |
| `isListen` | If `true`, render messages received via `postMessage`|

## API summary

| Method | Description |
|--------|-------------|
| `info(content, duration?)` | Info message |
| `success(content, duration?)` | Success message |
| `error(content, duration?)` | Error message |
| `warn(content, duration?)` | Warning message |
| `warning(content, duration?)` | Warning message |
| `loading(content, duration?)` | Loading message |
| `destroy()` | Destroy all messages and hide toast |
| `toastSuccess(content, duration?)` | Success toast |
| `toastLoading(content, duration?)` | Loading toast |
| `toast(content, duration?, animationClass?)` | Generic toast |
| `showModalBox(config)` | Show a modal dialog |
| `hideModalBox()` | Hide the modal dialog |
| `setUseFrameProxy(isSend?, isListen?)` | Configure iframe proxy |

## Development

```bash
# install dependencies
yarn

# local demo (webpack-dev-server)
yarn start

# production build → dist/
yarn build
```

## License

[MIT](./LICENSE)
