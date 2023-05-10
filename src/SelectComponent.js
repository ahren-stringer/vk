import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { FieldsContext, FieldsRightContext, SetFieldsContext } from './Context';

function SelectComponent(props) {
    const fields = useContext(FieldsContext);
    const setFields = useContext(SetFieldsContext);
    const fieldsRight = useContext(FieldsRightContext);
  
    let fff = function (event) {
      setFields({ ...fields, [props.type]: event.target.value })
    }
  
    return (
      <div className='select_container'>
        {/* <label for="i">{props.label}</label> */}
  
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
  
              label="Age"
              onChange={(event) => { fff(event) }}
            >
              {props.optionList.map((item,i) => <MenuItem value={item} key={i}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
  
        {/* <select id="i" onChange={(event) => { fff(event) }}>
          <option value="" disabled selected>
            {props.label}
          </option>
          {props.optionList.map((item) => <option>{item}</option>)}
        </select> */}
  
        {!fieldsRight && !fields[props.type] && <div className="validateMessage" style={{ color: 'red' }}>{props.validateMessage}</div>}
      </div>
    )
  }

  export default SelectComponent