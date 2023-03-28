export const result =[
    {
      id: 1,
      name: "ImpuestoPrisma",
      type: "text",
      errorMessage:
        "OnlyNumber",
      label: "Importe Arancel ($AR)",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    },
    {
      id: 2,
      name: "Neto",
      type: "text",
      errorMessage:
        "OnlyNumber",
      label: "Importe Base ($AR)",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    },
    {
      id: 3,
      name: "Total",
      type: "text",
      errorMessage:
        "OnlyNumber",
      label: "Intereses ($AR)",
      pattern: "^[0-9]+([.][0-9]+)?$",
      required: true,
    }
  ];