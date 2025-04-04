import { Text, View } from '@react-pdf/renderer';
import { formatCurrency } from '../../../../utils/functions';

const TableRowDefault = ({ first = "-", second = "-", third = "-", fourth = "-"}) => {
  return (
    <View style={{flexDirection: "row", fontSize: "12px"}}>
      <Text style={{width: "25%", textAlign: "center", padding: "5px 0px", borderBottom: "1px solid grey"}}>{first}</Text>
      <Text style={{width: "25%", textAlign: "center", padding: "5px 0px", borderBottom: "1px solid grey"}}>{second}</Text>
      <Text style={{width: "25%", textAlign: "center", padding: "5px 0px", borderBottom: "1px solid grey"}}>{third}</Text>
      <Text style={{width: "25%", textAlign: "center", padding: "5px 0px", borderBottom: "1px solid grey"}}>{fourth}</Text>
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
      <Text style={{width: "25%", textAlign: "center", padding: "5px 0px", borderBottom: "1px solid grey"}}>{label || item}</Text>
      <Text style={{width: "25%", textAlign: "center", padding: "5px 0px", borderBottom: "1px solid grey"}}>{formatCurrency(pricePerEach)}</Text>
      <Text style={{width: "25%", textAlign: "center", padding: "5px 0px", borderBottom: "1px solid grey"}}>{quantity}</Text>
      <Text style={{width: "25%", textAlign: "center", padding: "5px 0px", borderBottom: "1px solid grey"}}>{formatCurrency(total)}</Text>
    </View>
  )
}

const Th = ({header}) => (
  <Text style={{width: "25%", textAlign: "center", borderTop:"1px solid black", borderBottom:"1px solid black", fontWeight: 600, padding: "5px 0px"}}>{header}</Text>
)

export const TablePdf = ({estimate}) => {
  return (
    <View>
      <Text style={{textAlign: "center", fontSize: "14px", marginTop: "30px", marginBottom: "10px"}}>Estimated price</Text>
      <View style={{flexDirection: "row", fontSize: "12px"}}>
        <Th header="Item" />
        <Th header="Price per each" />
        <Th header="Quantity" />
        <Th header="Amount" />
      </View>
      <TableRowDefault first="Cad" second={formatCurrency(estimate[`cadPrice`])} fourth={formatCurrency(estimate[`cadPrice`])} />
      <TableRow item='Wax' estimate={estimate} />
      <TableRow item='Casting' estimate={estimate} />
      <TableRowDefault first={`Metal ${estimate.metalType}`} second={formatCurrency(estimate.metalPrice)} third={estimate.metalQuantity} fourth={formatCurrency(estimate.metalPrice * estimate.metalQuantity)} />
      <TableRow label='Setting' item='Stone' estimate={estimate} />
      <TableRowDefault first="Center Stone" second={formatCurrency(estimate.centerStonePrice)} fourth={formatCurrency(estimate.centerStonePrice)} />
      <TableRow item='Cleaning' estimate={estimate} />
      <TableRow item='Diamond' estimate={estimate} />
      <TableRowDefault first="Color Stone" second={formatCurrency(estimate.colorStone)} fourth={formatCurrency(estimate.colorStone)} />
      <TableRow item='Polishing' estimate={estimate} />
      <TableRow item='Assembling' estimate={estimate} />
      <TableRow item='Findings' estimate={estimate} />
      <TableRow item='Rhodioum' estimate={estimate} />
      <TableRow item='Engraving' estimate={estimate} />
      <TableRow item='Picture' estimate={estimate} />
      <TableRowDefault/>
      <TableRowDefault first="TOTAL" fourth={formatCurrency(estimate.totalPrice)} />
    </View>
  )
}