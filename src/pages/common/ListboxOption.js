import React from "react";
import { FaCheck } from "react-icons/fa";

const Option = ({ option, onClick, selected, ...props }) => {
  const { label, value } = option;

  return (
    <li
      className={`listbox__option`}
      onClick={(e) => onClick(value, e.target)}
      {...props}
    >
      {label}
      {selected && <FaCheck className='listbox__check' />}
    </li>
  );
};

export default Option;
