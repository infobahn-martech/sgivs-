import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import Select, { components } from 'react-select';
import { Tooltip } from 'react-tooltip';

function CustomSelect({
  showIndicator,
  options = [],
  className,
  classNamePrefix,
  value,
  onChange,
  placeholder = 'Select...',
  isLoading,
  maxheight,
  position = 'auto',
  name,
  ...rest
}) {
  console.log(' options', options);
  const { isMulti } = { ...rest };
  const [selectedValue, setSelectedValue] = useState(value);

  // Sync the initial value prop with the internal selected value
  useEffect(() => {
    if (value && isMulti) setSelectedValue(value);
    else if (!value) setSelectedValue(null);
    else if (!value.value)
      setSelectedValue(
        options.find((option) => option.value === value) || null
      );
  }, [value, isMulti]);

  const handleChange = (selectedOption) => {
    // If clear button clicked, selectedOption is null
    console.log(' selectedOption', selectedOption);
    if (!selectedOption) {
      setSelectedValue(isMulti ? [] : null);

      // Modify this part to work with react-hook-form
      if (onChange) {
        if (typeof onChange === 'function') {
          onChange({
            target: {
              name: name,
              value: null,
            },
          });
        }
      }
    } else {
      // Update selected value and notify parent
      setSelectedValue(selectedOption);

      // Modify this part to work with react-hook-form
      if (onChange) {
        if (typeof onChange === 'function') {
          onChange({
            target: {
              name: name,
              value: isMulti
                ? selectedOption.map((opt) => opt.value)
                : selectedOption.value,
            },
          });
        }
      }
    }
  };

  const fetchValue = () => {
    if (isMulti) {
      return options.filter((option) => selectedValue?.includes(option.value));
    }
    return (
      options.find((option) => option.value === selectedValue?.value) || null
    );
  };

  // Custom Option component with tooltip
  const CustomOption = (props) => {
    const { data } = props;
    const labelRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);

    // Check if the label is truncated (i.e., if text overflowed)
    useEffect(() => {
      if (labelRef.current) {
        // Compare the offsetWidth (visible width) with scrollWidth (full content width)
        setIsTruncated(
          labelRef.current.offsetWidth < labelRef.current.scrollWidth
        );
      }
    }, [data.label]);

    return (
      <components.Option {...props}>
        <div
          ref={labelRef}
          data-tooltip-id={`tooltip-${data.value}`}
          data-tooltip-content={isTruncated ? data.label : ''}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.label}
        </div>
        {isTruncated && <Tooltip id={`tooltip-${data.value}`} place="top" />}
      </components.Option>
    );
  };

  return (
    <Select
      menuPlacement={position}
      // menuPosition="fixed"
      
      maxMenuHeight={maxheight}
      isLoading={isLoading}
      classNamePrefix={classNamePrefix}
      value={fetchValue()}
      onChange={handleChange}
      className={`${className} ${
        isMulti ? 'multiple-select' : ''
      } react-select-custom p-1`}
      placeholder={placeholder}
      options={[
        { value: 'shown', label: 'shown' },
        { value: 'hidden', label: 'hidden' },
      ]}
      isClearable
      name={name}
      
      components={{
        ...(!showIndicator && {
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }),
        Option: CustomOption, // Use custom option with tooltip
      }}
      {...rest}
    />
  );
}

export default CustomSelect;
