import type { Locale } from './types';

const zhCN: Locale = {
  Pagination: {
    prev: '上一页',
    next: '下一页',
    pageSize: '条/页',
    jump: '跳至',
    page: '页',
    of: '共',
  },
  Tour: {
    skip: '跳过',
    finish: '完成',
    prev: '上一步',
    next: '下一步',
  },
  Modal: {
    ok: '确定',
    cancel: '取消',
  },
  Result: {
    success: '操作成功',
    error: '操作失败',
    info: '提示',
    warning: '警告',
    '404': '页面不存在',
    '403': '无权访问',
    '500': '服务器异常',
  },
  Empty: {
    description: '暂无数据',
  },
  Table: {
    sortAsc: '升序',
    sortDesc: '降序',
    selectAll: '全选',
  },
  Upload: {
    selectFile: '选择文件',
    uploading: '上传中',
    uploadSuccess: '上传成功',
    uploadFail: '上传失败',
    remove: '移除',
  },
  Common: {
    close: '关闭',
    clear: '清除',
    expand: '展开',
    collapse: '收起',
  },
};

export default zhCN;
