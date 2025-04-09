import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { PDFViewer, Page, Document as DocumentPDF, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { ESTIMATED_PRICES } from "../../../../utils/constants"
import { Button, Grid2 } from "@mui/material";
import { HeaderPdf } from "./HeaderPdf";
import { FooterPdf } from "./FooterPdf";
import { TablePdf } from "./TablePdf";
import { METAL_10_QUANTITY, METAL_14_QUANTITY, METAL_18_QUANTITY, METAL_PLATINUM_QUANTITY, METAL_QUANTITY, METAL_SILVER_QUANTITY, NEW_METALS } from "../../helpers/constants";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: "20px 50px",
  },
});

export const EstimatePdf = ({estimate, isOld}) => {
  const metalTypeOld =
        !!estimate[METAL_QUANTITY]
        && !estimate[METAL_10_QUANTITY]
        && !estimate[METAL_14_QUANTITY]
        && !estimate[METAL_18_QUANTITY]
        && !estimate[METAL_PLATINUM_QUANTITY]
        && !estimate[METAL_SILVER_QUANTITY];

  const EstimatePdfComponent = ({metal, isOld}) => (
    <DocumentPDF>
      <Page size="A4" style={styles.page}>
        <HeaderPdf name={estimate.name} />
        <TablePdf estimate={estimate} metalType={metal} isOld={isOld} />
        <FooterPdf />
      </Page>
    </DocumentPDF>
  )

  const ContainerPDF = ({metal, isOld = false}) => {
    const rawMetal = metal.replace("K", "");
    const price = isOld ? estimate.metalPrice : estimate[`metal${rawMetal}Price`];
    const quantity = isOld ? estimate.metalQuantity : estimate[`metal${rawMetal}Quantity`]
    const metalPrice = price * quantity;

    if(!metalPrice) return null;
    
    return (
      <>
        <Grid2 style={{border: "1px solid black", height: "90vh", marginTop: "10px"}}>
          <PDFViewer height="100%" width="100%" >
            <EstimatePdfComponent metal={metal} isOld={isOld} />
          </PDFViewer>
        </Grid2>
        <Grid2 sx={{textAlign: "center", marginY: "30px"}}>
          <PDFDownloadLink document={<EstimatePdfComponent metal={metal} isOld={isOld} />} fileName={`${estimate.name}_${metal}.pdf`}>
            <Button variant="contained">
              <FontAwesomeIcon icon={faDownload} />
              <span className="ml-2">Download {isOld ? "" : metal} estimate</span>
            </Button>
          </PDFDownloadLink>
        </Grid2>
      </>
    )
  }

  return (
    <>
      {
        metalTypeOld ?
          <ContainerPDF metal="metalType" isOld={true} />
          : NEW_METALS.map((metal) => (
              <ContainerPDF key={metal} metal={metal} />
            ))
      }
      
    </>
  )
}
