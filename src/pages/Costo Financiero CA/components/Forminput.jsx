import React, { useState } from "react";
import CreatableSelect from 'react-select/creatable';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, values, flag, id,types, ...inputProps } = props;


  const formatCreateLabel = (inputValue) => `Calcular con el ${inputValue}%`;

  const options = [
    { value: 0.80, label: 'Tarjeta de Débito (0.80%)'},
    { value: 1.80, label: 'Tarjeta de Crédito (1.80%)'},
  ]

  const colourStyles = {
    control: (styles) => ({ ...styles, 
    fontSize: "15px",
    padding: "5px",
    marginBottom: "5px",
    marginTop:"5px",
    border: "1px solid grey",
   })
  };

  const handleFocus = (e) => {
    setFocused(true);
  };

  switch (types) {
    case "common":
      return (
        // <div className="formInput">
          <div className={ id === 1 || id === 3 ? 'formInput left' : 
                           id === 2 || id === 5 ? 'formInput right' : 'formInput' }>

          <label>{label}</label>
          <input className="inputOne"
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            required= {true}
          />
          <span>{errorMessage}</span>
        </div>
      )
    case "result":
      return (
        <div className="formInputTwo">
          <label>{label}</label>
          
          <input className="inputTwo"
            {...inputProps}
            value={new Intl.NumberFormat('es-AR',{currency:'ARS', style: 'currency', minimumFractionDigits: 2}).format((Math.floor(values * 1000) / 1000).toFixed(2)) }
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            required= {true}
          />
          <span>{errorMessage}</span>
        </div>
      ) 
  

    case "porcentaje":
        return (
          <div className="formInput">
            <label>
              {label}
              <CreatableSelect   {...inputProps} styles={colourStyles} formatCreateLabel={formatCreateLabel} onChange={onChange} isClearable options={options} placeholder="Escriba el valor o seleccione una opción..."
 />
            </label>
          </div>
        )
    default:
      break;
  }
};

export default FormInput;
