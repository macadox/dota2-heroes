import React from "react";
import {FaCheck} from 'react-icons/fa'

const Option = ({ option, onClick, selected, isMultiselect }) => {
  const { label, value } = option;
  return (
    <li
      className={`listbox__option ${
        selected ? "listbox__option--selected" : ""
      }`}
      onClick={() => onClick(value)}
    >
      {label}
      {(isMultiselect && selected) && <FaCheck className="listbox__check"/>}
      
    </li>
  );
};

export default Option;
