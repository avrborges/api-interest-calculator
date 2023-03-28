import React, { useState } from "react";
import FormInput from "./components/Forminput";
import { inputs } from "./seccion/Inputs";
import { result } from "./seccion/Results";
import jsPDF from "jspdf";

const Intereses = () => {
  const [values, setValues] = useState({
    tasa: 0,
    diasAdelantado: 0,
    impuestoBruto: 0,
    impuestoPrisma: 0,
    porcentaje: 0.8,
    cf: 0,
    promo: 0,
    aux: 0,
  });

  const [neto, setNeto] = useState(0);

  const [total, setTotal] = useState(0);

  const [impuestoPrisma, setmpuestoPrisma] = useState(0);

/// Redondea la tasa / 365 dias   
  function resTasa(){
    values.aux= values.tasa/365
    values.aux = Math.floor(values.aux * 10000) / 10000;   
    return values.aux
    // return new Intl.NumberFormat('es-AR',{minimumFractionDigits:4}).format(values.aux);
  }

  console.log("tasa -> " + values.tasa);

  function getImpuestoPrisma() {
    return (values.impuestoBruto*values.porcentaje)/100
  }

  function getNeto() {
    return values.impuestoBruto-(getImpuestoPrisma())-values.cf-values.promo
  }

  function getTotal() {
    return ((resTasa().toFixed(4)*values.diasAdelantado)*(getNeto().toFixed(6)))/100
  }

// const generarPDFIntereses = async () => {
//   console.log("Descargar PDF")
//   const pdf = new jsPDF("portrait", "pt", "a2");
//   const data = await document.querySelector("#appIntereses");
//   pdf.html(data).then(() => {
//     pdf.save("Intereses.pdf");
//   });
// }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setmpuestoPrisma(getImpuestoPrisma())
    setNeto(getNeto()) 
    setTotal(getTotal())

  };

  const onChange = (e) => {
    try {    
      if(e.target === undefined){
        // console.log("valores ->" + e.value)
        setValues({ ...values, porcentaje: parseFloat(e.value)})
      }else{
        setValues({ ...values, [e.target.name]: e.target.value });
      }
    } catch (error) { 
    }  };

 
  return (

    <div className="app">
      <div className="contenedor" id="appIntereses">
      <h1 className="titulo">Intereses de Pago Expreso</h1> 
      <p className="descripcion">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id maximus sem. In hac habitasse platea dictumst. Nam neque ipsum, pharetra ac quam in, scelerisque imperdiet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras sollicitudin maximus mi ac.</p>
      <hr/>         
      <form className="formizquierda" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            flag={true}
            impPrisma={values.impuestoPrisma}
            types={input.name === "porcentaje" ? "porcentaje": input.name === "impuestoPrisma" ? "impuestoPrisma" : "common"}
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}
        <button>Calcular</button>
        {/* <button className="btn-descargar" onClick={generarPDFIntereses}>
        Descargar PDF
      </button> */}
      </form>

      <form className="formderecha" onSubmit={handleSubmit}>
        {result.map((input) => (
          <FormInput
            flag={false}
            types="result"
            values={input.name === "Neto" ? neto: input.name === "Total" ? total : impuestoPrisma}
            readOnly="readonly"
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}
      </form>

    </div>
    </div>
  );
};

export default Intereses;