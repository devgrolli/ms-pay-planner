import * as yup from "yup";

export const clientSchema = yup.object().shape({
  address: yup.string().required(),
  cnpj: yup.string(),
  ie: yup.string(),
  name: yup.string().required(),
  neighborhood: yup.string().required(),
  observations: yup.string(),
  phone: yup.string(),
  purchaseFrequency: yup.string(),
  referencePoint: yup.string(),
  tradeName: yup.string().required(),
  typeTrade: yup.string().required(),
  zipCode: yup.string().required(),
  buyerNumberOne: yup.string(),
  buyerNumberTwo: yup.string(),
});
