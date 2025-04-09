import { Text, View } from '@react-pdf/renderer';
import { formatCurrency } from '../../../../utils/functions';
import { numericFormatter } from 'react-number-format';
import { FIXED_FIELDS, METAL_TYPES, MULTIPLIED_FIELDS } from '../../helpers/constants';

const style = {
  width: "25%",
  textAlign: "center",
  padding: "5px 0px",
  borderBottom: "1px solid grey",
};

const TableRowDefault = ({ first = "-", second = "-", third = "-", fourth = "-"}) => {

  return (
    <View style={{flexDirection: "row", fontSize: "12px"}}>
      <Text style={style}>{first}</Text>
      <Text style={style}>{second}</Text>
      <Text style={style}>{third}</Text>
      <Text style={style}>{fourth}</Text>
    </View>
  )
}

const TableRow = ({label = "", item, estimate}) => {
  const pricePerEach = estimate[`${item.toLowerCase()}Price`];
  const quantity = estimate[`${item.toLowerCase()}Quantity`];
  const total = pricePerEach * quantity;
  if (!total) return null;

  return (
    <View style={{flexDirection: "row", fontSize: "12px"}}>
      <Text style={style}>{label || item}</Text>
      <Text style={style}>{formatCurrency(pricePerEach)}</Text>
      <Text style={style}>{quantity}</Text>
      <Text style={style}>{formatCurrency(total)}</Text>
    </View>
  )
}

const Th = ({header}) => (
  <Text
    style={{
      width: "25%",
      textAlign: "center",
      borderTop:"1px solid black",
      borderBottom:"1px solid black",
      fontWeight: 600,
      padding: "5px 0px"
    }}
  >
    {header}
  </Text>
)

const calculateMUITotal = (estimate, rawMetal) => {
  let total = 0;

  FIXED_FIELDS.forEach(field => {
    total += Number(estimate[field]) || 0;
  });

  MULTIPLIED_FIELDS.forEach(([priceKey, qtyKey]) => {
    total += ((Number(estimate[priceKey]) || 0) * (Number(estimate[qtyKey]) || 0));
  });

  METAL_TYPES(rawMetal).forEach(([priceKey, qtyKey]) => {
    total += ((Number(estimate[priceKey]) || 0) * (Number(estimate[qtyKey]) || 0));
  });

  const totalFormatted = numericFormatter(String(total), {
    decimalScale: 2,
    thousandSeparator: true,
    prefix: '$',
    allowNegative: false,
  });

  return { total, totalFormatted };
}

export const TablePdf = ({estimate, metalType, isOld}) => {
  const rawMetal = metalType.replace("K", "");
  const price = isOld ? estimate.metalPrice : estimate[`metal${rawMetal}Price`];
  const quantity = isOld ? estimate.metalQuantity : estimate[`metal${rawMetal}Quantity`]
  const metalPrice = price * quantity;

  return (
    <View>
      <Text style={{textAlign: "center", fontSize: "14px", marginTop: "30px", marginBottom: "10px"}}>Estimated price</Text>
      <View style={{flexDirection: "row", fontSize: "12px"}}>
        <Th header="Item" />
        <Th header="Price per each" />
        <Th header="Quantity" />
        <Th header="Amount" />
      </View>
      {
        !!estimate.cadPrice &&
          <TableRowDefault
            first="Cad"
            second={formatCurrency(estimate.cadPrice)}
            fourth={formatCurrency(estimate.cadPrice)}
          />
      }
      <TableRow item='Wax' estimate={estimate} />
      <TableRow item='Casting' estimate={estimate} />
      {
        !!(metalPrice) &&
          <TableRowDefault
            first={`Metal ${isOld ? estimate.metalType : metalType}`}
            second={formatCurrency(price)}
            third={quantity}
            fourth={formatCurrency(metalPrice)}
          />
      }
      <TableRow label='Setting' item='Stone' estimate={estimate} />
      {
        !!estimate.centerStonePrice &&
          <TableRowDefault
            first="Center Stone"
            second={formatCurrency(estimate.centerStonePrice)}
            fourth={formatCurrency(estimate.centerStonePrice)}
          />
      }
      <TableRow item='Cleaning' estimate={estimate} />
      <TableRow item='Diamond' estimate={estimate} />
      {
        !!estimate.colorStone &&
          <TableRowDefault
            first="Color Stone"
            second={formatCurrency(estimate.colorStone)}
            fourth={formatCurrency(estimate.colorStone)}
          />
      }
      <TableRow item='Polishing' estimate={estimate} />
      <TableRow item='Assembling' estimate={estimate} />
      <TableRow item='Findings' estimate={estimate} />
      <TableRow item='Rhodioum' estimate={estimate} />
      <TableRow item='Engraving' estimate={estimate} />
      <TableRow item='Picture' estimate={estimate} />
      <TableRowDefault/>
      <TableRowDefault first="TOTAL" fourth={calculateMUITotal(estimate, rawMetal).totalFormatted} />
    </View>
  )
}