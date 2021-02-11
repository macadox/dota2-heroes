import React, { useState, useEffect, useRef } from "react";
import Option from "../components/Option";

import { keys } from "../utils";
import { FaCaretDown } from "react-icons/fa";

const FilterListbox = ({
  defaultText,
  options = [],
  callback,
  defaultFilter,
}) => {
  const [values, setValues] = useState(defaultFilter);
  const [activeDescendant, setActiveDescendant] = useState(
    `elem_list_${options[0].value}`
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [listboxOpen, setListboxOpen] = useState(false);
  const listboxRef = useRef(null);

  const updateValues = (value) => {
    let newValues = [...values];
    if (values.includes(value)) {
      const index = values.indexOf(value);
      newValues.splice(index, 1);
    } else {
      newValues.push(value);
    }
    setValues(newValues);
  };

  const handleClick = (value, target) => {
    const index = options.findIndex((o) => o.value === value);
    updateValues(value);
    setActiveIndex(index);
    setActiveDescendant(target.id);
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
        updateValues(option.value);
        break;
      }
      case keys.end: {
        e.preventDefault();
        newIndex = options.length - 1;
        break;
      }
      case keys.home: {
        e.preventDefault();
        newIndex = 0;
        break;
      }
      default: {
        break;
      }
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (callback) {
      callback(
        values,
        options.map((o) => o.value)
      );
    }
  }, [values]);

  useEffect(() => {
    setActiveDescendant(`elem_list_${options[activeIndex].value}`);
  }, [activeIndex]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className='listbox listbox--multi'
      ref={listboxRef}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => setListboxOpen(!listboxOpen)}
        className='listbox__button'
      >
        {options
          .filter((o) => values.includes(o.value))
          .map((o) => o.label)
          .join(", ") || defaultText}{" "}
        <FaCaretDown className='listbox__caret' />
      </button>
      {listboxOpen && (
        <ul
          className='listbox__list'
          role='listbox'
          aria-labelledby={"todo"}
          tabIndex={-1}
          aria-activedescendant={activeDescendant}
        >
          {options.map((option) => {
            const optionId = `elem_list_${option.value}`;
            return (
              <Option
                id={optionId}
                key={option.value}
                onClick={handleClick}
                option={option}
                // Get rid off selected?
                selected={values.includes(option.value)}
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

export default FilterListbox;
