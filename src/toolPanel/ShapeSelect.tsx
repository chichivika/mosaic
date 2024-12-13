import React from 'react';
import MenuItem from '../common/MenuItem';
import Select from '../common/Select';
import Pin from '../common/Pin';

function ShapeSelect() {
    return (
        <Select value='round'>
            <MenuItem value='round'>
                <Pin shape='round' />
            </MenuItem>
            <MenuItem value='square'>
                <Pin shape='square' />
            </MenuItem>
        </Select>
    );
}

export default ShapeSelect;
