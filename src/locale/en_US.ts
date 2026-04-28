import type { Locale } from './types';

const enUS: Locale = {
  Pagination: {
    prev: 'Previous',
    next: 'Next',
    pageSize: '/ page',
    jump: 'Go to',
    page: '',
    of: 'Total',
  },
  Tour: {
    skip: 'Skip',
    finish: 'Finish',
    prev: 'Previous',
    next: 'Next',
  },
  Modal: {
    ok: 'OK',
    cancel: 'Cancel',
  },
  Result: {
    success: 'Success',
    error: 'Failed',
    info: 'Info',
    warning: 'Warning',
    '404': 'Page Not Found',
    '403': 'Access Denied',
    '500': 'Server Error',
  },
  Empty: {
    description: 'No data',
  },
  Table: {
    sortAsc: 'Sort ascending',
    sortDesc: 'Sort descending',
    selectAll: 'Select all',
  },
  Upload: {
    selectFile: 'Select file',
    uploading: 'Uploading',
    uploadSuccess: 'Upload success',
    uploadFail: 'Upload failed',
    remove: 'Remove',
  },
  Common: {
    close: 'Close',
    clear: 'Clear',
    expand: 'Expand',
    collapse: 'Collapse',
  },
};

export default enUS;
