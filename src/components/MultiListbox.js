import React, { useState, useEffect, useRef } from "react";
import Option from "../components/Option";

import { FaCaretDown } from "react-icons/fa";

const MultiListbox = ({ defaultText, options = [], callback }) => {
  const [values, setValues] = useState([]);
  const [open, setOpen] = useState(false);
  const listboxRef = useRef(null);

  const handleClick = (value) => {
    let newValues = [...values];
    if (values.includes(value)) {
      const index = values.indexOf(value);
      newValues.splice(index, 1);
    } else {
      newValues.push(value);
    }
    setValues(newValues);
  };

  const handleClickOutside = (e) => {
    if (listboxRef.current && !listboxRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (callback) {
      callback(values);
    }
  }, [values]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  return (
    <div className='listbox listbox--multi' ref={listboxRef}>
      <button onClick={() => setOpen(!open)} className='listbox__button'>
        {defaultText} <FaCaretDown className='listbox__caret' />
      </button>
      {open && (
        <ul className='listbox__list'>
          {options.map((option) => {
            return (
              <Option
                key={option.value}
                onClick={handleClick}
                option={option}
                selected={values.includes(option.value)}
                isMultiselect={true}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiListbox;
