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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



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
        id: '',
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        telefono: '',
        sexo: '',
        fecha_nacimiento: '',

        registros: [],
        open: false,
        setOpen: false,
        nodata: false,
        titleButton: 'Guardar'
    }

    componentDidMount() {
        this.cargarData();
    }

    cargarData() {
        firebase.database().ref('frm01').on('value', snapshot => {
            const data = snapshot.val();
            if (data != null) {
                this.setState({ registros: data });
            } else {
                this.setState({ nodata: true });
            }
        });
    }


    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.id === '') {
            var newFrm = {
                id: this.state.registros.length,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                email: this.state.email,
                fecha_nacimiento: this.state.fecha_nacimiento,
                telefono: this.state.telefono,
                sexo: this.state.sexo
            }
        } else {
            var newFrm = {
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                email: this.state.email,
                fecha_nacimiento: this.state.fecha_nacimiento,
                telefono: this.state.telefono,
                sexo: this.state.sexo
            }
        }

        console.log(newFrm.id);


        firebase.database().ref('frm01/' + newFrm.id).set(newFrm);

        this.setState({ firstName: '', lastName: '', address: '', email: '', fecha_nacimiento: '', telefono: '', sexo: '', open: true, setOpen: true, nodata: false, titleButton: 'Guardar', id: '' });

    }


    handleDelete = (id) => {

        firebase.database().ref('frm01/' + id).remove();
        this.setState({ setOpen: true, open: true });

    }

    handleEdit = (id) => {


        firebase.database().ref('frm01/' + id).on('value', snapshot => {
            const data = snapshot.val();
            this.setState({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                email: data.email,
                telefono: data.telefono,
                fecha_nacimiento: data.fecha_nacimiento,
                sexo: data.sexo,
                titleButton: 'Editar'
            });
        });


    }


    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    handleClose = () => {

        this.setState({ open: false, setOpen: false });
    }


    render() {

        if (this.state.nodata == false) {
            var datarow = this.state.registros.map(row => {
                return (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.firstName}
                        </TableCell>

                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        
                        <TableCell align="right">
                            <Button size="small" variant="outlined" color="primary" onClick={() => this.handleEdit(row.id)}>
                                Editar
                                </Button>
                            <Button style={{ marginLeft: "10px" }} size="small" variant="outlined" color="secondary" onClick={() => this.handleDelete(row.id)}>
                                Eliminar
                                </Button>
                        </TableCell>
                    </TableRow>
                )
            })


        } else {
            var datarow = "No data";
        }

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

                                    <Grid item xs={12} sm={6}>
                                        <TextField onChange={this.onChange}
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="Nombres"
                                            fullWidth
                                            value={this.state.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField onChange={this.onChange}
                                            required
                                            id="lastName"
                                            name="lastName"
                                            label="Apellidos"
                                            fullWidth
                                            value={this.state.lastName}
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
                                            value={this.state.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField onChange={this.onChange}
                                            required
                                            id="telefono"
                                            name="telefono"
                                            label="Teléfono"
                                            fullWidth
                                            value={this.state.telefono}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField onChange={this.onChange}
                                            required
                                            id="address"
                                            name="address"
                                            label="Dirección"
                                            fullWidth
                                            value={this.state.address}
                                        />
                                    </Grid>



                                    <Grid item xs={12} sm={6}>
                                        <InputLabel htmlFor="fecha_nacimiento">Fecha Nacimiento</InputLabel>
                                        <Select name="fecha_nacimiento"
                                            fullWidth
                                            value={this.state.fecha_nacimiento}
                                            onChange={this.onChange}
                                            inputProps={{
                                                name: 'fecha_nacimiento',
                                                id: 'fecha_nacimiento',
                                            }}
                                        >


                                            <MenuItem value={1975}> 1975 </MenuItem><MenuItem value={1976}> 1976 </MenuItem><MenuItem value={1977}> 1977 </MenuItem><MenuItem value={1978}> 1978 </MenuItem><MenuItem value={1979}> 1979 </MenuItem><MenuItem value={1980}> 1980 </MenuItem><MenuItem value={1981}> 1981 </MenuItem><MenuItem value={1982}> 1982 </MenuItem><MenuItem value={1983}> 1983 </MenuItem><MenuItem value={1984}> 1984 </MenuItem><MenuItem value={1985}> 1985 </MenuItem><MenuItem value={1986}> 1986 </MenuItem><MenuItem value={1987}> 1987 </MenuItem><MenuItem value={1988}> 1988 </MenuItem><MenuItem value={1989}> 1989 </MenuItem><MenuItem value={1990}> 1990 </MenuItem><MenuItem value={1991}> 1991 </MenuItem><MenuItem value={1992}> 1992 </MenuItem><MenuItem value={1993}> 1993 </MenuItem><MenuItem value={1994}> 1994 </MenuItem><MenuItem value={1995}> 1995 </MenuItem><MenuItem value={1996}> 1996 </MenuItem><MenuItem value={1997}> 1997 </MenuItem><MenuItem value={1998}> 1998 </MenuItem><MenuItem value={1999}> 1999 </MenuItem><MenuItem value={2000}> 2000 </MenuItem><MenuItem value={2001}> 2001 </MenuItem><MenuItem value={2002}> 2002 </MenuItem><MenuItem value={2003}> 2003 </MenuItem><MenuItem value={2004}> 2004 </MenuItem><MenuItem value={2005}> 2005 </MenuItem><MenuItem value={2006}> 2006 </MenuItem><MenuItem value={2007}> 2007 </MenuItem><MenuItem value={2008}> 2008 </MenuItem><MenuItem value={2009}> 2009 </MenuItem><MenuItem value={2010}> 2010 </MenuItem><MenuItem value={2011}> 2011 </MenuItem><MenuItem value={2012}> 2012 </MenuItem><MenuItem value={2013}> 2013 </MenuItem><MenuItem value={2014}> 2014 </MenuItem><MenuItem value={2015}> 2015 </MenuItem><MenuItem value={2016}> 2016 </MenuItem><MenuItem value={2017}> 2017 </MenuItem><MenuItem value={2018}> 2018 </MenuItem><MenuItem value={2019}> 2019 </MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl component="fieldset" >
                                            <FormLabel component="legend">Sexo</FormLabel>
                                            <RadioGroup
                                                aria-label="Sexo"
                                                name="sexo"

                                                value={this.state.sexo}
                                                onChange={this.onChange}
                                            >
                                                <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                                                <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />

                                            </RadioGroup>
                                        </FormControl>
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


                            <Typography variant="h6" gutterBottom>
                                Registros
                                                </Typography>




                            <Table >
                                <TableHead>
                                    <TableRow>

                                        <TableCell align="left">Nombres</TableCell>
                                        <TableCell align="left">Apellidos</TableCell>
                                        <TableCell align="left">Email</TableCell>
<TableCell align="right">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {datarow}

                                </TableBody>


                            </Table>


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
