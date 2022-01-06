import React, { } from 'react';
import { Table } from 'antd';
export default function BasicTable(props) {
  const { selectedRowKeys, selectionType } = props
  
   // 点击行操作
  const onRowClick = (record, index) => {
    let i = selectedRowKeys.indexOf(index);
    let selectedIds = [];
    if (selectionType === null || selectionType === false) {
      return
    }
    if (selectionType === "checkbox") {
      if (i === -1) {
        selectedRowKeys.push(index);
        selectedIds.push(record.id)
      } else {
        selectedRowKeys.splice(i, 1);
        selectedIds.splice(i, 1)
      }
      props.onRef(selectedRowKeys, record, selectedIds)
    } else {
      props.onRef([index], record, record.id);
    }
  };

  //选择框
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    const selectedIds = [];
    if (selectionType === "checkbox") {
      selectedRows.map(item => {
        selectedIds.push(item.id);
        return [];
      });
      // setSelectedRowKeys(selectedRowKeys)
    }
    props.onRef(selectedRowKeys, selectedRows[0], selectedIds);
    return "";

  }
  //全选
  const onSelectAll = (selected, selectedRows) => {
    const selectedIds = [];
    const selectKey = [];
    if (selected) {
      selectedRows.forEach((item, i) => {
        selectedIds.push(item.id);
        selectKey.push(i);
        selectedRows.push(item);
      });
      props.onRef(selectKey, selectedRows[0] || {}, selectedIds);
    } else {
      props.onRef([], {}, []);
    }
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys:selectedRowKeys,
    onChange: onSelectChange,
    onSelect: () => {console.log('select...');},
    onSelectAll: onSelectAll
  }
  let rowLelection = Boolean;
  if (selectionType === false || selectionType === null) {
    rowLelection = false;
  } else if (selectionType === "checkbox") {
    rowSelection.type = "checkbox";
  } else {
    rowSelection.type = "radio";
  }

  return (
    <div>
      <Table
        rowKey={(_,index) => index}
        columns={props.columns}
        dataSource={props.dataSource}
        rowSelection={rowLelection ? rowSelection : null}
        onRow={(record,index) => ({
          onClick: () => {
            onRowClick(record,index)
          }
        })}
      />
    </div>
  )
}
