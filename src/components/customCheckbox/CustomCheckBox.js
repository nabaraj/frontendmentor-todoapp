import React from 'react';
import './style.scss';

export default function CustomCheckBox({ name, labelText, checked, checkEvent }) {
  console.log(checked);
  return (
    <div className="input-group-text d-flex justify-content-center align-items-start customCheckbox p-0 pr-1">
      <input type="checkbox" onChange={checkEvent} checked={checked} id={name} aria-label="Checkbox for following text input" />
      <label className="checkBg m-0" htmlFor={name} title="Mark as completed">
        <span className="customeCeckBoxBg"></span>
      </label>
      {labelText && <label className="pl-3 mb-0 customCeckBoxLebel" htmlFor={name}>{labelText}</label>}
    </div>
  )
}
