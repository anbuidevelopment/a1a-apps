import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TableEmployeeData from "./components/TableEmployeeData";
import dayjs, {Dayjs} from "dayjs";
import FilterTableEmployee from "./components/FilterTableEmployee";

function App() {
    const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs().subtract(3, 'day'))
    const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs().add(10, 'day'))
    const [nameField, onNameChanged] = useState("")

    return (
        <div className="App flex flex-col">
            <FilterTableEmployee
                dateFrom={dateFrom}
                setDateFrom={setDateFrom}
                dateTo={dateTo}
                setDateTo={setDateTo}
                nameSearch={nameField}
                onNameSearchChanged={onNameChanged}/>

            <TableEmployeeData
                name={nameField}
                dateFrom={dateFrom?.format("YYYY-MM-DD")}
                dateTo={dateTo?.format("YYYY-MM-DD")}/>
        </div>
    );
}

export default App;
