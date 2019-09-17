import React from 'react';
import { MultiSelect } from 'carbon-components-react';
import items from './dropdown-items';

const MultiSelectDemo = ({ id, light }) => (
  <div style={{ width: 300 }}>
    <MultiSelect
      id={id}
      light={light}
      items={items}
      itemToString={item => (item ? item.text : '')}
      label="MultiSelect Label"
    />
  </div>
);

export default MultiSelectDemo;
