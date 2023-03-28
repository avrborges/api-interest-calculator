export const inputs = [
    {
      id: 3,
      name: "impuestoBruto",
      type: "text",
      errorMessage:
        "Solo numeros",
      label: "Importe Transacción ($AR)",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    },
    {
      id: 1,
      name: "tasa",
      type: "text",
      errorMessage:
        "Solo numeros",
      label: "Tasa (TNA - %)",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    },
    {
      id: 2,
      name: "diasAdelantado",
      type: "text",
      errorMessage:
        "Solo numeros",
      label: "Dias de Adelanto",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    },
  
    {
      id: 4,
      name: "porcentaje",
      type: "text",
      errorMessage:
        "Solo numeros",
      label: "Porcentaje de Arancel (%) ",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    },
    {
      id: 5,
      name: "cf",
      type: "text",
      errorMessage:
        "Solo numeros",
      label: "Costo Financiero ($AR)",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    },
    {
      id: 6,
      name: "promo",
      type: "text",
      errorMessage:
        "Solo numeros",
      label: "Descuento Promoción ($AR)",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    }
  ];