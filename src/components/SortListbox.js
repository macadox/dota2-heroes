import React, { useState, useEffect, useRef } from "react";
import Option from "../components/Option";

import { keys } from "../utils";
import { FaCaretDown } from "react-icons/fa";

const SortListbox = ({
  defaultText,
  defaultSort,
  options = [],
  callback,
  reverse,
  toggleReverse,
}) => {
  const [value, setValue] = useState(defaultSort);
  const [activeDescendant, setActiveDescendant] = useState(
    `elem_list_${options[0].value}`
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [listboxOpen, setListboxOpen] = useState(false);
  const [label, setLabel] = useState("");
  const listboxRef = useRef(null);

  const handleClick = (value, target) => {
    const index = options.findIndex((o) => o.value === value);
    setValue(value);
    setActiveIndex(index)
    setActiveDescendant(target.id);
    setListboxOpen(false);
    toggleReverse(target);
  };

  const handleClickOutside = (e) => {
    if (listboxRef.current && !listboxRef.current.contains(e.target)) {
      setListboxOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!listboxOpen) return;
    let newIndex = activeIndex;
    switch (e.keyCode) {
      case keys.left:
      case keys.up: {
        e.preventDefault();
        if (newIndex === 0) {
          newIndex = options.length - 1;
        } else {
          newIndex--;
        }
        break;
      }
      case keys.right:
      case keys.down: {
        e.preventDefault();
        if (newIndex === options.length - 1) {
          newIndex = 0;
        } else {
          newIndex++;
        }
        break;
      }
      case keys.enter: {
        e.preventDefault();
        const option = options[newIndex];
        setValue(option.value);
        setListboxOpen(false);
        break;
      }
      case keys.end: {
        newIndex = options.length - 1;
        break;
      }
      case keys.home: {
        newIndex = 0;
        break;
      }
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const option = options.find((option) => option.value === value);

    if (option) {
      setLabel(option.label);
    }
  }, [value]);

  useEffect(() => {
    setActiveDescendant(`elem_list_${options[activeIndex].value}`);
  }, [activeIndex]);

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
    <div
      className='listbox listbox--single'
      ref={listboxRef}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => setListboxOpen(!listboxOpen)}
        className='listbox__button'
      >
        {label || defaultText} {reverse ? "(desc)" : "(asc)"}
        <FaCaretDown className='listbox__caret' />
      </button>
      {listboxOpen && (
        <ul
          className='listbox__list'
          role='listbox'
          tabIndex={-1}
          aria-activedescendant={activeDescendant}
        >
          {options.map((option) => {
            const optionId = `elem_list_${option.value}`;
            return (
              <Option
                key={option.value}
                id={optionId}
                // get rid off selected
                selected={value === option.value}
                onClick={handleClick}
                option={option}
                role='option'
                aria-selected={optionId === activeDescendant ? true : false}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortListbox;
