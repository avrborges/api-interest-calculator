import React, { useState } from "react";

import FormInput from "./components/Forminput";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { inputs } from "./seccion/Inputs";
import { result } from "./seccion/Results";


const columns = [
  { id: 'code', label: 'Cuota', minWidth: 30 , align: "center"},
  { id: 'año', label: 'Año', minWidth: 50 , align: "left"},
  { id: 'mes',label: 'Mes', minWidth: 50, align: "left",},
  { id: 'precio', label: 'Precio', minWidth: 170, align: "right" },

];

function createData(code, año, mes, precio) {
  return { code, año, mes, precio };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function CostoFinanciero() {

  const classes = useStyles();

  const [values, setValues] = useState({
    cuotas: 0,
    fPres: Date.now(),
    fPago: Date.now(),
    arancel: 0.8,
    tna: 0.8,
    importe: 0,
    sum: 0,
    precio: 0,
    rows: 0,
  });

  const [montoArancel, setMontoArancel] = useState(0);

  const [valorCuota, setValorCuota] = useState(0);

  const [arancelCuota, setArancelCuota] = useState(0);

  const [totalVan, setTotalVan] = useState(0);

  const [cF, setCF] = useState(0);

  const [rows] = useState([]);
 


  const handleSubmit = (e) => {
    e.preventDefault();
    setMontoArancel(getMontoArancel())
    setValorCuota(getValorCuota())
    setArancelCuota(getArancelCuota())
    setTotalVan(getTotalVan())
    setCF(values.importe-getMontoArancel()-getTotalVan())
    addData()
  };

  const onChange = (e) => {
    try {
      if(e.target === undefined){
        setValues({ ...values, arancel: parseFloat(e.value)})
      }else{
        setValues({ ...values, [e.target.name]: e.target.value });
      }
    } catch (error) {
    }
  };


  function createListData(size) {
    const arr = []
    for (let index = 1; index <= size; index++) {
      arr.push((getValorCuota()- getArancelCuota())/((1+values.tna/100*(30-((( new Date(values.fPago).getTime()- new Date(values.fPres).getTime())/(1000*60*60*24))))/360)* Math.pow((1+values.tna/100*30/360), (index-1))) )
    }
    return arr
  }


  function addData() {
    rows.length = 0
    createListData(values.cuotas).map((currentValue, index) => {
      const date = new Date(values.fPago);
      date.setMonth(date.getMonth()+index)
      rows.push(createData(index+1,
                            date.getFullYear(),
                            date.toLocaleString('default', { month: 'long' }).toUpperCase(),
                            new Intl.NumberFormat('es-AR',{currency:'ARS', style: 'currency', minimumFractionDigits: 2}).format((Math.floor(currentValue * 10000) / 10000).toFixed(4))
                            ))
    })
  }

  function getMontoArancel() {
    return values.importe*values.arancel/100
  }
  function getValorCuota() {
    return values.importe/values.cuotas
  }
  function getArancelCuota() {
    return (values.importe/values.cuotas)*values.arancel/100
  }

  function getTotalVan() {
    const datosCuotas = createListData(values.cuotas);
    let sum = 0;
    for (let i = 0; i < datosCuotas.length; i++) {
      sum += datosCuotas[i];
    }
    return sum
  }

  return (
    <>
    <div className="app">
      <div className="contenedor">
        <h1 className="titulo">Costo Financiero en Cuotas Acelerados</h1>
              <p className="descripcion">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id maximus sem. In hac habitasse platea dictumst. Nam neque ipsum, pharetra ac quam in, scelerisque imperdiet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras sollicitudin maximus mi ac.</p>
      <hr/>
        <form className="formizquierda" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              flag={true}
              types={input.name === "arancel" ? "porcentaje": "common"}
              key={input.id}
              min={input.name === "fPago" ? values.fPres : null }
              {...input}
              onChange={onChange}
            />
          ))}
          <button type='submit'>Calcular</button>
        </form>

        <form className="formderecha" onSubmit={handleSubmit}>
          {result.map((input) => (
            <FormInput
              flag={false}
              types="result"
              values={input.name === "Monto Arancel" ? montoArancel : 
                      input.name === "Valor Cuota" ? valorCuota : 
                      input.name === "Arancel Cuota" ? arancelCuota :  
                      input.name === "Total Neto" ? totalVan : cF }
              readOnly="readonly"
              key={input.id}
              {...input}
              onChange={onChange}
            />
          ))}
        </form>
      </div>

    </div>
    <div className="seccionCoutas">
      <div className="contenedor">
      <hr/>
        <h2 className="tituloCuotas">Cuotas a Valor Presente.</h2>
        <div className="subCuotas"> 
          Completar los campos para realizar el calculo de los valores mensuales</div>
      <Paper className={classes.root}>
      <TableContainer className={classes.container} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
      </div>
    </div>
  </>
  );
};


// export default function CostoFinanciero() {
//   return <h1>Costo Financiero CA</h1>
// }
