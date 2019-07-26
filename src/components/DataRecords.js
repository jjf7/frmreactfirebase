import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
class DataRecords extends Component {
    render() {
        return (
            <Table >
                <TableHead>
                    <TableRow>

                        <TableCell align="left">Nombres</TableCell>

                        <TableCell align="left">Email</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!this.props.Nodata ?
                        this.props.Employees.map(row => {

                            const { employee } = row;

                            return (
                                <TableRow key={employee.id}>
                                    <TableCell component="th" scope="row">
                                        {employee.basic.name}
                                    </TableCell>

                                    <TableCell align="left">{employee.basic.email}</TableCell>

                                    <TableCell align="right">
                                        <Button size="small" variant="outlined" color="primary" onClick={() => this.props.handleEdit(employee.id)}>
                                            Ver/Editar
                                                            </Button>
                                        <Button style={{ marginLeft: "10px" }} size="small" variant="outlined" color="secondary" onClick={() => this.handleDelete(employee.id)}>
                                            Eliminar
                                                            </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })

                        :
                        'No Data'
                    }

                </TableBody>

            </Table>
        )
    }
}

export default DataRecords;