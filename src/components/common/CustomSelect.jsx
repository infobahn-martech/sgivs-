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
  noOptionsMessage = 'No options available',
  name,
  ...rest
}) {
  const { isMulti } = { ...rest };
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    if (value && isMulti) setSelectedValue(value);
    else if (!value) setSelectedValue(null);
    else if (typeof value === 'object' && value !== null && 'value' in value)
      setSelectedValue(value);
    else if (!value.value)
      setSelectedValue(
        options.find((option) => option.value === value) || null
      );
  }, [value, isMulti, options]);

  const handleChange = (selectedOption) => {
    if (!selectedOption) {
      setSelectedValue(isMulti ? [] : null);

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
      setSelectedValue(selectedOption);

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
      return options?.filter((option) => selectedValue?.includes(option.value));
    }
    return (
      options?.find((option) => option.value === selectedValue?.value) || null
    );
  };

  const CustomOption = (props) => {
    const { data } = props;
    const labelRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
      if (labelRef.current) {
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
      } react-select-container p-1`}
      placeholder={placeholder}
      noOptionsMessage={() => noOptionsMessage}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      // options={[
      //   { value: 'shown', label: 'shown' },
      //   { value: 'hidden', label: 'hidden' },
      // ]}
      options={options}
      isClearable
      name={name}
      components={{
        ...(!showIndicator && {
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }),
        Option: CustomOption,
      }}
      {...rest}
    />
  );
}

export default CustomSelect;
