import validator from 'validator';
import { ERROR } from "../../constants/expenses.constants";
import { CustomError } from "../../utils/customError";
import { createCollectionFirebase } from "../../utils/findFirebase";
import { IExpense, IInstallmentExpenses, PaymentType, nameCollection } from './interfaces';

const validateAndSanitize = (value: any, validatorFn: (input: any) => boolean, sanitizerFn: (input: any) => any) => {
  return validatorFn(value) ? sanitizerFn(value) : null;
};

const validateRequiredFields = (request: any) => {
  return {
    userId: validateAndSanitize(request.userId, validator.isUUID, validator.escape),
    name: validateAndSanitize(request.name, (val) => validator.isLength(val, { min: 1 }), validator.escape),
    date: validateAndSanitize(request.date, validator.isISO8601, validator.escape),
    category: validateAndSanitize(request.category, (val) => validator.isLength(val, { min: 1 }), validator.escape),
    typePayments: validateAndSanitize(request.typePayments, (val) => validator.isIn(val, Object.values(PaymentType)), validator.escape),
    priceTotal: validateAndSanitize(request.priceTotal, validator.isNumeric, validator.escape),
  };
};

const validateOptionalFields = (request: any) => {
  return {
    qtyInstallments: validateAndSanitize(request.qtyInstallments?.toString(), validator.isNumeric, Number),
    hasInput: validator.toBoolean(request.hasInput?.toString()),
    inputValue: request.inputValue ? validator.escape(request.inputValue) : null,
  };
};

const validateInstallments = (typePayments: string) => {
  return typePayments === PaymentType.CREDIT_CARD || typePayments === PaymentType.LOAN;
};

export const createExpensesUseCase = async (request: any) => {
  console.log("createExpensesUseCase -> request", request)
  const requiredFields = validateRequiredFields(request);
  const optionalFields = validateOptionalFields(request);

  if (Object.values(requiredFields).includes(null)) {
    throw new CustomError("Invalid input data", 400);
  }

  const { userId, name, date, category, typePayments, priceTotal } = requiredFields;
  const { qtyInstallments, hasInput, inputValue } = optionalFields;

  const hasInstallments = validateInstallments(typePayments);

  const installments: IInstallmentExpenses = {
    qtyInstallments: hasInstallments && qtyInstallments ? qtyInstallments : 0,
    hasInput,
    inputValue,
  };

  const expense: IExpense = {
    customerId: userId,
    localName: name,
    date,
    category,
    typePayments,
    priceTotal,
    installments: hasInstallments ? installments : null,
  };

  try {
    await createCollectionFirebase(nameCollection, expense);
  } catch (error) {
    console.error(ERROR.CREATE, error);
    throw new CustomError(ERROR.CREATE, 422);
  }
};