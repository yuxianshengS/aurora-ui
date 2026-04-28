/**
 * 国际化文案 — 各组件的可翻译字符串集中在此。
 * 任何组件被 ConfigProvider 包裹后会自动读这里的对应 key;
 * 不被包裹时走默认 zhCN(避免老用户升级时炸)。
 */
export interface Locale {
  Pagination: {
    prev: string;
    next: string;
    pageSize: string; // "{n} 条/页"
    jump: string;     // "跳至"
    page: string;     // "页"
    of: string;       // "共 {n} 条"
  };
  Tour: {
    skip: string;
    finish: string;
    prev: string;
    next: string;
  };
  Modal: {
    ok: string;
    cancel: string;
  };
  Result: {
    success: string;
    error: string;
    info: string;
    warning: string;
    '404': string;
    '403': string;
    '500': string;
  };
  Empty: {
    description: string;
  };
  Table: {
    sortAsc: string;
    sortDesc: string;
    selectAll: string;
  };
  Upload: {
    selectFile: string;
    uploading: string;
    uploadSuccess: string;
    uploadFail: string;
    remove: string;
  };
  Common: {
    close: string;
    clear: string;
    expand: string;
    collapse: string;
  };
}
