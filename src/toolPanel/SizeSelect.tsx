import React from 'react';
import MenuItem from '../common/MenuItem';
import Select from '../common/Select';

function SizeSelect() {
    return (
        <Select value='m'>
            <MenuItem value='s'>S</MenuItem>
            <MenuItem value='m'>M</MenuItem>
            <MenuItem value='l'>L</MenuItem>
        </Select>
    );
}

export default SizeSelect;
