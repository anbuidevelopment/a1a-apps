import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";
import {Dayjs} from "dayjs";

type FilterEmployeeProps = {
    dateFrom: Dayjs | null
    setDateFrom: (value: Dayjs | null) => void
    dateTo: Dayjs | null
    setDateTo: (value: Dayjs | null) => void
    nameSearch: string | ""
    onNameSearchChanged: any
}

const FilterTableEmployee =
    ({
         dateFrom,
         setDateFrom,
         dateTo,
         setDateTo,
         nameSearch,
         onNameSearchChanged,
     }: FilterEmployeeProps) => {
        return (
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div
                        className={"flex flex-col md:flex-row m-4"}>
                        <DatePicker
                            value={dateFrom}
                            onChange={(newValue) => setDateFrom(newValue)}
                            className={"w-64"}
                            format={"DD/MM/YYYY"}
                            slotProps={{textField: {size: 'small'}}}
                        />

                        <div className={"h-4 md:w-2"}/>

                        <DatePicker
                            value={dateTo}
                            onChange={(newValue) => setDateTo(newValue)}
                            className={"w-64"}
                            format={"DD/MM/YYYY"}
                            slotProps={{textField: {size: 'small'}}}
                        />

                        <div className={"h-4 md:w-2"}/>

                        <TextField
                            value={nameSearch}
                            onChange={e => onNameSearchChanged(e.target.value)}
                            className={"w-64"}
                            size={"small"}
                            placeholder={"Search by Firstname"}
                        />

                        <div className={"h-4 md:w-2"}/>

                    </div>
                </LocalizationProvider>
            </div>
        )
    }

export default FilterTableEmployee