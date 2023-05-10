import dayjs from 'dayjs';
import { createContext } from 'react';

export const FieldsContext = createContext({
    tower: null,
    level: null,
    room: null,
    date: null,
    selectedInterval:null,
    text: null,
});

export const FieldsRightContext = createContext(true);
export const SetFieldsContext = createContext(null);