import React from 'react';
import { Dropdown } from 'carbon-components-react';
import items from './dropdown-items';

const DropdownDemo = ({ id, light }) => (
  <div style={{ width: 300 }}>
    <Dropdown
      id={id}
      light={light}
      items={items}
      itemToString={item => (item ? item.text : '')}
      label="Dropdown menu options"
      ariaLabel="Dropdown"
      titleText="This is not a dropdown title."
      helperText="This is not some helper text."
    />
  </div>
);

export default DropdownDemo;
