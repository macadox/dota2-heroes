import React, { useState, useEffect, useRef } from "react";
import Option from "../components/Option";

import { FaCaretDown } from "react-icons/fa";

const SortListbox = ({
  defaultText,
  options = [],
  callback,
  reverse,
  toggleReverse,
}) => {
  const [value, setValue] = useState("localized_name");
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const listboxRef = useRef(null);

  const handleClick = (value, target) => {
    setValue(value);
    setOpen(false);

    toggleReverse(target);
  };

  const handleClickOutside = (e) => {
    if (listboxRef.current && !listboxRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const option = options.find((option) => option.value === value);

    if (option) {
      setLabel(option.label);
    }
  }, [value]);

  useEffect(() => {
    if (callback) {
      callback(value);
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className='listbox listbox--single' ref={listboxRef}>
      <button onClick={() => setOpen(!open)} className='listbox__button'>
        {label || defaultText} {reverse ? "(desc)" : "(asc)"}
        <FaCaretDown className='listbox__caret' />
      </button>
      {open && (
        <ul className='listbox__list'>
          {options.map((option) => {
            return (
              <Option
                key={option.value}
                selected={value === option.value}
                onClick={handleClick}
                option={option}
                isMultiselect={false}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortListbox;
