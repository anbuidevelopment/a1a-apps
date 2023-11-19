import React, {useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {CircularProgress, Paper} from "@mui/material";
import {camelCaseToTitleCase, useApi} from "../utils/utils";


type EmployeeInfo = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
}

type EmployeeContent = {
    pageIndex: number,
    rowsPerPage: number,
    totalElements: number,
    totalPages: number
    dataList: EmployeeInfo[]
}


type Employee = {
    headers: string[],
    content: EmployeeContent
}

type TableFilterProps = {
    name: string | ""
    dateFrom: string | undefined
    dateTo: string | undefined
}

const TableEmployeeData = (
    {
        name,
        dateFrom,
        dateTo
    } : TableFilterProps
) => {
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [paginationModel, setPaginationModel] = React.useState({
        page: page,
        pageSize: rowsPerPage,
    });

    const {data, loading, error} = useApi<Employee>('/api/v1/employees', "get", {
        page: page,
        rowsPerPage: rowsPerPage,
    })



    const columns: GridColDef[] = (data?.headers || []).map(header => {
        const field = header;
        const headerName = camelCaseToTitleCase(header);
        const minWidth = 100;
        const flex = 1;
        const headerClassName = 'col-header';

        return { field, headerName, minWidth, flex, headerClassName };
    });

    //
    // const columns: GridColDef[] = [
    //     {field: 'id', headerName: 'Id', minWidth: 100, flex: 1, headerClassName: 'col-header'},
    //     {field: 'firstName', headerName: 'FirstName', minWidth: 150, flex: 1, headerClassName: 'col-header'},
    //     {field: 'lastName', headerName: 'LastName', minWidth: 180, flex: 1, headerClassName: 'col-header'},
    //     {field: 'emailId', headerName: 'Email', minWidth: 120, flex: 1, headerClassName: 'col-header'},
    // ]

    return (
        <Paper sx={{
            width: '100%',
            minHeight: 100,
            marginTop: 4,
            '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold'
            },
            '& .col-header': {
                backgroundColor: "#D8E4FD",
            },
        }}>
            {error ? <h2 className={"text-red-500"}>Lỗi không xác định</h2> : <></>}

            {data != null ?
                <DataGrid
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                orderNo: false
                            }
                        }
                    }}
                    className={"h-[512px]"}
                    getRowId={(row) => row.id}
                    pageSizeOptions={[10, 25, 50]}
                    paginationMode={"server"}
                    paginationModel={paginationModel}
                    onPaginationModelChange={(model) => {
                        setPage(model.page)
                        setRowsPerPage(model.pageSize)
                        setPaginationModel(model)
                    }}
                    loading={loading}
                    columns={columns}
                    rowCount={data.content.totalElements}
                    rows={data.content.dataList}/> :
                <div className={"w-full h-48 flex justify-center items-center"}><CircularProgress
                    style={{}}></CircularProgress></div>
            }

        </Paper>
    )

}

export default TableEmployeeData