import { numericFormatter } from "react-number-format";
import { FIXED_FIELDS, MULTIPLIED_FIELDS, OLD_METAL_TYPE } from "./constants";

/**
 * 
 * Se estableció el metalType como opcional porque al calcular el estimado total no se quería guardar un total por cada metal
 * Cuando se quiera saber el total, se debe sumar el tipo de metal que desea calcular, así se hizo en el pdf
*/
export const calculateMUITotal = (values, metalType = []) => {
  let total = 0;

  FIXED_FIELDS.forEach(field => {
    total += Number(values[field]) || 0;
  });

  MULTIPLIED_FIELDS.forEach(([priceKey, qtyKey]) => {
    total += ((Number(values[priceKey]) || 0) * (Number(values[qtyKey]) || 0));
  });

  if (metalType.length) {
    metalType.forEach(([priceKey, qtyKey]) => {
      total += ((Number(values[priceKey]) || 0) * (Number(values[qtyKey]) || 0));
    });
  } else {
    OLD_METAL_TYPE.forEach(([priceKey, qtyKey]) => {
      total += ((Number(values[priceKey]) || 0) * (Number(values[qtyKey]) || 0));
    });
  }


  const totalFormatted = numericFormatter(String(total), {
    decimalScale: 2,
    thousandSeparator: true,
    prefix: '$',
    allowNegative: false,
  });

  return { total, totalFormatted };
}