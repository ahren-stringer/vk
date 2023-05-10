import { createContext, useContext, useState } from 'react';
import './App.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FieldsContext, FieldsRightContext, SetFieldsContext } from './Context';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SelectComponent from './SelectComponent';


let towers = ["А", "Б"];
let levels = Array.from({length: 27}, (_, index) => index + 1);
let rooms = Array.from({length: 10}, (_, index) => index + 1);
let timeIntervals = ["12:00 - 13:00", "13:00 - 14:00"];

function App() {

  // function getToodayDateString() {
  //   let objectDate = new Date();
  //   let day = objectDate.getDate();
  //   let month = objectDate.getMonth() + 1;
  //   let year = objectDate.getFullYear();
  //   return year + "-" + month + "-" + day;
  // }
  // const fieldsRight = useContext(FieldsRightContext);

  let [fields, setFields] = useState({
    tower: null,
    level: null,
    room: null,
    date: null,
    interval: null,
    // text: null,
  });
  const [text, setText] = useState('');
  const [succes, setSucces] = useState(false);

  const [fieldsRight, setFielsdRight] = useState(true); // Валидация

  function sendForm() {

    for (let key in fields) {
      if (!fields[key]) {
        setFielsdRight(false)
        return
      }
    }
    setFielsdRight(true)
    console.log("Башня: ", fields.tower)
    console.log("Этаж: ", fields.level)
    console.log("Кабинет: ", fields.room)
    console.log("Дата: ", fields.date.toString())
    console.log("Время: ", fields.interval)
    console.log("Коментарий: ", text)

    setSucces(true)
  }
  debugger
  return (
    <div className="container">
      <h1 className="title">Забронируйте переговорную</h1>
      <FieldsContext.Provider value={fields}>
        <SetFieldsContext.Provider value={setFields}>
          <FieldsRightContext.Provider value={fieldsRight}>
            <div className='controls_wrapp'>
              <SelectComponent
                type="tower"
                label="Башня"
                optionList={towers}
                validateMessage="Выберите Башню"
              />

              <SelectComponent
                type="level"
                label="Этаж"
                optionList={levels}
                validateMessage="Выберите этаж"
              />
              <SelectComponent
                type="room"
                label="Кабинет"
                optionList={rooms}
                validateMessage="Выберите кабинет"
              />
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      // format={'DD/MM/YYYY'}
                      disablePast={true}
                      label="Controlled picker"
                      value={fields.date}
                      onChange={(newValue) => setFields({ ...fields, date: newValue })}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {!fieldsRight && !fields.date && <div className="validateMessage" style={{ color: 'red' }}>Выберите день</div>}
              </div>
              <SelectComponent
                type="interval"
                label="Интервал"
                optionList={timeIntervals}
                validateMessage="Выберите Интервал"
              />
            </div>
            <textarea value={text} onChange={(event) => { setText(event.target.value) }}></textarea>

            <button onClick={sendForm}>Отправить</button>

            {succes && <div style={{ color: 'green' }}>Переговорная успешно забронирована</div>}
          </FieldsRightContext.Provider >
        </SetFieldsContext.Provider>
      </FieldsContext.Provider>
    </div>

  );
}

export default App;
