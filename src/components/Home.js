import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import DataRecords from './DataRecords'

import * as firebase from "firebase/app";

import "firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyA8yiFdmF33fHaGIOv6shiqn2n2uz8wQvg",
    authDomain: "formreactjsfirebase.firebaseapp.com",
    databaseURL: "https://formreactjsfirebase.firebaseio.com",
    projectId: "formreactjsfirebase",
    storageBucket: "",
    messagingSenderId: "859733713828",
    appId: "1:859733713828:web:28d02708c92a94ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Home extends React.Component {

    state = {

        employee: {
            id: '',
            basic: {
                name: '',
                email: '',
                address: '',
                phone: '',
                gender: '',
                birthdate: ''
            },
            job: {
                title: '',
                salary: ''
            },
            status: false
        },

        employees: [],
        open: false,
        setOpen: false,
        nodata: false,
        titleButton: 'Guardar'
    }

    componentDidMount() {
        this.cargarData();
    }

    cargarData() {

        firebase.database().ref('frm01/').on('value', snapshot => {
            const data = snapshot.val();

            if (data != null) {
                this.setState({ employees: data });
            } else {
                this.setState({ nodata: true });
            }
        });

    }


    onSubmit = (e) => {
        e.preventDefault();

        const { employee } = this.state;

        const id = employee.id === '' ? this.state.employees.length :  employee.id;

     
            var newEmployee = {
                employee: {
                    basic: {
                        name: employee.basic.name,
                        email: employee.basic.email,
                        address: employee.basic.address,
                        phone: employee.basic.phone,
                        gender: employee.basic.gender,
                        birthdate: employee.basic.birthdate
                    },
                    job: {
                        title: employee.job.title,
                        salary: employee.job.salary
                    },
                    id: id,
                    status: employee.status
                }
            }
        


        firebase.database().ref('frm01/' + newEmployee.employee.id).set(newEmployee);

        this.setState(prevState => ({ open: true, setOpen: true, nodata: false, titleButton: 'Guardar', employee: { ...prevState.employee, id: '' }, employee: { ...prevState.employee, basic: { ...prevState.employee.basic, name: '', phone: '', birthdate: '', email: '', gender: '', address: '' }, employee: { ...prevState.employee, job: { ...prevState.employee.job, title: '', salary: '' } } } }))


    }


    handleDelete = (id) => {

        firebase.database().ref('frm01/' + id).remove();
        this.setState({ setOpen: true, open: true });

    }

    handleEdit = (id) => {

        firebase.database().ref('frm01/' + id).on('value', snapshot => {
            const data = snapshot.val();

            this.setState({ employee: data.employee, titleButton: 'Editar' });

        });


    }


    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ employee: { ...this.state.employee, basic: { ...this.state.employee.basic, [name]: value } } });
    }


    onChangeJob = (e) => {
        const { name, value } = e.target;


        this.setState({ employee: { ...this.state.employee, job: { ...this.state.employee.job, [name]: value } } });



    }

    handleClose = () => {

        this.setState({ open: false, setOpen: false });
    }


    render() {
        return (
            <React.Fragment>
                <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={6} >
                            <Typography variant="h6" gutterBottom>
                                Rellene los campos
        </Typography>
                            <form onSubmit={this.onSubmit}>
                                <Grid container spacing={3}>

                                    <Grid item xs={12} sm={12}>
                                        <TextField onChange={this.onChange}
                                            required
                                            id="name"
                                            name="name"
                                            label="Nombre Completo"
                                            fullWidth
                                            value={this.state.employee.basic.name}
                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={6}>
                                        <TextField onChange={this.onChange}
                                            required
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            value={this.state.employee.basic.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField onChange={this.onChange}
                                            required
                                            id="phone"
                                            name="phone"
                                            label="Teléfono"
                                            fullWidth
                                            value={this.state.employee.basic.phone}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField onChange={this.onChange}
                                            required
                                            id="address"
                                            name="address"
                                            label="Dirección"
                                            fullWidth
                                            value={this.state.employee.basic.address}
                                        />
                                    </Grid>



                                    <Grid item xs={12} sm={6}>
                                        <InputLabel htmlFor="birthdate">Fecha Nacimiento</InputLabel>
                                        <Select name="birthdate"
                                            fullWidth
                                            value={this.state.employee.basic.birthdate}
                                            onChange={this.onChange}
                                            inputProps={{
                                                name: 'birthdate',
                                                id: 'birthdate',
                                            }}
                                        >


                                            <MenuItem value={1975}> 1975 </MenuItem><MenuItem value={1976}> 1976 </MenuItem><MenuItem value={1977}> 1977 </MenuItem><MenuItem value={1978}> 1978 </MenuItem><MenuItem value={1979}> 1979 </MenuItem><MenuItem value={1980}> 1980 </MenuItem><MenuItem value={1981}> 1981 </MenuItem><MenuItem value={1982}> 1982 </MenuItem><MenuItem value={1983}> 1983 </MenuItem><MenuItem value={1984}> 1984 </MenuItem><MenuItem value={1985}> 1985 </MenuItem><MenuItem value={1986}> 1986 </MenuItem><MenuItem value={1987}> 1987 </MenuItem><MenuItem value={1988}> 1988 </MenuItem><MenuItem value={1989}> 1989 </MenuItem><MenuItem value={1990}> 1990 </MenuItem><MenuItem value={1991}> 1991 </MenuItem><MenuItem value={1992}> 1992 </MenuItem><MenuItem value={1993}> 1993 </MenuItem><MenuItem value={1994}> 1994 </MenuItem><MenuItem value={1995}> 1995 </MenuItem><MenuItem value={1996}> 1996 </MenuItem><MenuItem value={1997}> 1997 </MenuItem><MenuItem value={1998}> 1998 </MenuItem><MenuItem value={1999}> 1999 </MenuItem><MenuItem value={2000}> 2000 </MenuItem><MenuItem value={2001}> 2001 </MenuItem><MenuItem value={2002}> 2002 </MenuItem><MenuItem value={2003}> 2003 </MenuItem><MenuItem value={2004}> 2004 </MenuItem><MenuItem value={2005}> 2005 </MenuItem><MenuItem value={2006}> 2006 </MenuItem><MenuItem value={2007}> 2007 </MenuItem><MenuItem value={2008}> 2008 </MenuItem><MenuItem value={2009}> 2009 </MenuItem><MenuItem value={2010}> 2010 </MenuItem><MenuItem value={2011}> 2011 </MenuItem><MenuItem value={2012}> 2012 </MenuItem><MenuItem value={2013}> 2013 </MenuItem><MenuItem value={2014}> 2014 </MenuItem><MenuItem value={2015}> 2015 </MenuItem><MenuItem value={2016}> 2016 </MenuItem><MenuItem value={2017}> 2017 </MenuItem><MenuItem value={2018}> 2018 </MenuItem><MenuItem value={2019}> 2019 </MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl component="fieldset" >
                                            <FormLabel component="legend">Genero</FormLabel>
                                            <RadioGroup
                                                aria-label="gender"
                                                name="gender"

                                                value={this.state.employee.basic.gender}
                                                onChange={this.onChange}
                                            >
                                                <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                                                <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />

                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>



                                    <Grid item xs={12} sm={6}>
                                        <InputLabel htmlFor="title">Cargo a desempeñar</InputLabel>
                                        <Select name="title"
                                            fullWidth
                                            value={this.state.employee.job.title}
                                            onChange={this.onChangeJob}
                                            inputProps={{
                                                name: 'title',
                                                id: 'title',
                                            }}
                                        >
                                            <MenuItem value={'Programador'}> Programador </MenuItem>
                                            <MenuItem value={'Diseñador'}> Diseñador </MenuItem>
                                            <MenuItem value={'Community Manager'}> Community Manager </MenuItem>
                                        </Select>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField onChange={this.onChangeJob}
                                            required
                                            id="salary"
                                            name="salary"
                                            label="Salario pretendido"
                                            fullWidth
                                            value={this.state.employee.job.salary}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox required color="secondary" name="saveAddress" value="yes" />}
                                            label="Aceptar los términos y condiciones"
                                        />
                                    </Grid>
                                    <Button variant="contained" color="primary" type="submit" >
                                        {this.state.titleButton}
                                    </Button>


                                </Grid>

                            </form>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ backgroundColor: "#f5f5f5" }}>

                            <Typography variant="h6" gutterBottom> Registros </Typography>

                            <DataRecords handleEdit={this.handleEdit} Nodata={this.state.nodata} Employees={this.state.employees} />

                        </Grid>

                    </Grid>

                </Container>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Se ha procesado satisfactoriamente."}</DialogTitle>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cerrar
                            </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}


export default Home;