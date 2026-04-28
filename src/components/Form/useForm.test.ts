import { describe, it, expect, vi } from 'vitest';
import { FormStore } from './useForm';

describe('FormStore — get/set', () => {
  it('setFieldValue 后 getFieldValue 能取回', () => {
    const s = new FormStore();
    s.setFieldValue('name', 'aurora');
    expect(s.getFieldValue('name')).toBe('aurora');
  });

  it('setInitialValues 设置初始值, 后续 setFieldValue 不被覆盖', () => {
    const s = new FormStore();
    s.setInitialValues({ a: 1, b: 2 });
    s.setFieldValue('a', 10);
    expect(s.getFieldValue('a')).toBe(10);
    expect(s.getFieldValue('b')).toBe(2);
  });

  it('onValuesChange 在变化时触发, 携带 changed + all', () => {
    const s = new FormStore();
    const fn = vi.fn();
    s.setCallbacks({ onValuesChange: fn });
    s.setFieldValue('x', 1);
    expect(fn).toHaveBeenCalledWith({ x: 1 }, { x: 1 });
    s.setFieldValue('x', 1); // 同值不触发
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('FormStore — validation', () => {
  it('required: 空值返回错误', async () => {
    const s = new FormStore();
    s.registerField({ name: 'email', rules: [{ required: true, message: '必填' }], onStoreChange: () => {} });
    const errs = await s.validateField('email');
    expect(errs).toEqual(['必填']);
  });

  it('type=email: 格式不符返回错误', async () => {
    const s = new FormStore();
    s.registerField({ name: 'email', rules: [{ type: 'email' }], onStoreChange: () => {} });
    s.setFieldValue('email', 'not-an-email');
    const errs = await s.validateField('email');
    expect(errs.length).toBe(1);
  });

  it('min/max for string length', async () => {
    const s = new FormStore();
    s.registerField({
      name: 'name',
      rules: [{ min: 3, message: '至少 3' }, { max: 10, message: '最多 10' }],
      onStoreChange: () => {},
    });
    s.setFieldValue('name', 'ab');
    expect(await s.validateField('name')).toEqual(['至少 3']);
    s.setFieldValue('name', 'abcdefghijk');
    expect(await s.validateField('name')).toEqual(['最多 10']);
    s.setFieldValue('name', 'abcdef');
    expect(await s.validateField('name')).toEqual([]);
  });

  it('whitespace=true 配 required: 全空格当空', async () => {
    const s = new FormStore();
    s.registerField({
      name: 'x',
      rules: [{ required: true, whitespace: true, message: '不可全空格' }],
      onStoreChange: () => {},
    });
    s.setFieldValue('x', '   ');
    expect(await s.validateField('x')).toEqual(['不可全空格']);
  });

  it('validator 返回 string 当错误信息', async () => {
    const s = new FormStore();
    s.registerField({
      name: 'pwd',
      rules: [{ validator: (v) => (v === '123456' ? undefined : '密码必须是 123456') }],
      onStoreChange: () => {},
    });
    s.setFieldValue('pwd', 'wrong');
    expect(await s.validateField('pwd')).toEqual(['密码必须是 123456']);
  });

  it('validateFields: 全部通过 resolves 返回所有值', async () => {
    const s = new FormStore();
    s.registerField({ name: 'a', rules: [{ required: true }], onStoreChange: () => {} });
    s.registerField({ name: 'b', rules: [{ type: 'number' }], onStoreChange: () => {} });
    s.setFieldValue('a', 'x');
    s.setFieldValue('b', 42);
    const v = await s.validateFields();
    expect(v).toEqual({ a: 'x', b: 42 });
  });

  it('validateFields: 失败 reject 携带 errorFields', async () => {
    const s = new FormStore();
    s.registerField({ name: 'a', rules: [{ required: true, message: '需要 a' }], onStoreChange: () => {} });
    await expect(s.validateFields()).rejects.toMatchObject({
      errorFields: [{ name: 'a', errors: ['需要 a'] }],
    });
  });
});
