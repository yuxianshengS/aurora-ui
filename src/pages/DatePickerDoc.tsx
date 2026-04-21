import React, { useState } from 'react';
import { DatePicker } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const DatePickerDoc: React.FC = () => {
  const [d, setD] = useState<Date | null>(null);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <>
      <h1>DatePicker 日期选择器</h1>
      <p>
        统一的时间选择器组件:一个 `picker` 属性切换年/月/日/时/分/秒/周/季六种模式,
        配合 `showTime` 显示时间列,`range` 切换为区间选择。
      </p>

      <h2>代码演示</h2>

      <DemoBlock
        title="基础用法"
        description="默认 picker='date',选中后会自动关闭弹层。"
        code={`<DatePicker onChange={(v, t) => console.log(v, t)} />`}
      >
        <DatePicker onChange={(v, t) => console.log(v, t)} />
      </DemoBlock>

      <DemoBlock
        title="年 / 月 / 季 / 周"
        description="通过 picker 切换粒度。"
        code={`<DatePicker picker="year" />
<DatePicker picker="month" />
<DatePicker picker="quarter" />
<DatePicker picker="week" />`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <DatePicker picker="year" />
          <DatePicker picker="month" />
          <DatePicker picker="quarter" />
          <DatePicker picker="week" />
        </div>
      </DemoBlock>

      <DemoBlock
        title="时分秒"
        description="picker='time' 显示 3 列时间选择;或在 picker='date' 上加 showTime。"
        code={`<DatePicker picker="time" />
<DatePicker showTime />`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <DatePicker picker="time" />
          <DatePicker showTime />
        </div>
      </DemoBlock>

      <DemoBlock
        title="区间选择"
        description="加上 range 切换为区间模式,panel 会展开为左右两栏。"
        code={`<DatePicker range />
<DatePicker range picker="month" />
<DatePicker range picker="week" />
<DatePicker range picker="time" />`}
      >
        <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
          <DatePicker range />
          <DatePicker range picker="month" />
          <DatePicker range picker="week" />
          <DatePicker range picker="time" />
        </div>
      </DemoBlock>

      <DemoBlock
        title="区间 + 时间"
        description="range + showTime 可选一段带时间的区间。"
        code={`<DatePicker range showTime />`}
      >
        <DatePicker range showTime />
      </DemoBlock>

      <DemoBlock
        title="尺寸"
        description="三种尺寸:small / medium / large。"
        code={`<DatePicker size="small" />
<DatePicker size="medium" />
<DatePicker size="large" />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <DatePicker size="small" />
          <DatePicker size="medium" />
          <DatePicker size="large" />
        </div>
      </DemoBlock>

      <DemoBlock
        title="禁用与受控"
        description="value + onChange 构成受控用法,disabled 禁用。"
        code={`const [d, setD] = useState<Date | null>(null);
<DatePicker value={d} onChange={setD} />
<DatePicker disabled />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <DatePicker value={d} onChange={(v) => setD(v)} />
          <DatePicker disabled />
          <span style={{ color: '#6b7280', fontSize: 13 }}>
            当前值:{d ? d.toLocaleDateString() : '(空)'}
          </span>
        </div>
      </DemoBlock>

      <DemoBlock
        title="自定义格式"
        description="format 使用 YYYY MM DD HH mm ss Q w token,[...] 内为字面量。"
        code={`<DatePicker format="YYYY/MM/DD" />
<DatePicker picker="month" format="YYYY年MM月" />
<DatePicker picker="week" format="YYYY-[第]w[周]" />`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <DatePicker format="YYYY/MM/DD" />
          <DatePicker picker="month" format="YYYY年MM月" />
          <DatePicker picker="week" format="YYYY-[第]w[周]" />
        </div>
      </DemoBlock>

      <DemoBlock
        title="受控区间"
        description="range 模式的受控用法。"
        code={`const [range, setRange] = useState<[Date|null, Date|null]>([null, null]);
<DatePicker range value={range} onChange={setRange} />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <DatePicker range value={range} onChange={(v) => setRange(v)} />
          <span style={{ color: '#6b7280', fontSize: 13 }}>
            {range[0] ? range[0].toLocaleDateString() : '开始'} ~{' '}
            {range[1] ? range[1].toLocaleDateString() : '结束'}
          </span>
        </div>
      </DemoBlock>

      <h2>API</h2>
      <ApiTable
        rows={[
          {
            prop: 'picker',
            desc: '选择粒度',
            type: `'date' | 'year' | 'month' | 'quarter' | 'week' | 'time'`,
            default: `'date'`,
          },
          {
            prop: 'showTime',
            desc: `picker='date' 时显示时分秒选择`,
            type: 'boolean',
            default: 'false',
          },
          {
            prop: 'range',
            desc: '是否为区间选择',
            type: 'boolean',
            default: 'false',
          },
          {
            prop: 'value',
            desc: '受控值(单选为 Date,区间为 [Date, Date])',
            type: 'Date | [Date, Date] | null',
            default: '-',
          },
          {
            prop: 'defaultValue',
            desc: '非受控默认值',
            type: 'Date | [Date, Date]',
            default: '-',
          },
          {
            prop: 'onChange',
            desc: '值变更回调',
            type: '(value, text) => void',
            default: '-',
          },
          {
            prop: 'format',
            desc: '显示格式,支持 YYYY/MM/DD/HH/mm/ss/Q/w/ww 与 [字面量]',
            type: 'string',
            default: '根据 picker 推断',
          },
          {
            prop: 'placeholder',
            desc: '占位文本(区间为 [start, end] 数组)',
            type: 'string | [string, string]',
            default: '-',
          },
          {
            prop: 'size',
            desc: '尺寸',
            type: `'small' | 'medium' | 'large'`,
            default: `'medium'`,
          },
          {
            prop: 'allowClear',
            desc: '是否显示清除按钮',
            type: 'boolean',
            default: 'true',
          },
          {
            prop: 'disabled',
            desc: '是否禁用',
            type: 'boolean',
            default: 'false',
          },
        ]}
      />
    </>
  );
};

export default DatePickerDoc;
