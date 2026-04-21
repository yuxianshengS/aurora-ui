import React from 'react';

export interface ApiRow {
  prop: string;
  desc: string;
  type: string;
  default: string;
}

const ApiTable: React.FC<{ rows: ApiRow[] }> = ({ rows }) => (
  <table>
    <thead>
      <tr>
        <th style={{ width: '18%' }}>属性</th>
        <th style={{ width: '32%' }}>说明</th>
        <th style={{ width: '30%' }}>类型</th>
        <th style={{ width: '20%' }}>默认值</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((r) => (
        <tr key={r.prop}>
          <td>
            <code>{r.prop}</code>
          </td>
          <td>{r.desc}</td>
          <td>
            <code>{r.type}</code>
          </td>
          <td>
            <code>{r.default}</code>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ApiTable;
