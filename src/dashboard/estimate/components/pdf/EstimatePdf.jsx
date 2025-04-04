import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { PDFViewer, Page, Document as DocumentPDF, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { ESTIMATED_PRICES } from "../../../../utils/constants"
import { Button, Grid2 } from "@mui/material";
import { HeaderPdf } from "./HeaderPdf";
import { FooterPdf } from "./FooterPdf";
import { TablePdf } from "./TablePdf";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: "20px 50px",
  },
});

export const EstimatePdf = ({estimateId}) => {
  const estimateInSS = JSON.parse(sessionStorage.getItem(ESTIMATED_PRICES))
  const estimate = estimateInSS.find(client => client._id === estimateId)
  const estimatePDF = useRef()
  const goldPrice = parseFloat(1 / estimate.goldenPrice).toFixed(2)

  const EstimatePdf = () => (
    <DocumentPDF>
      <Page size="A4" style={styles.page}>
        <HeaderPdf name={estimate.name} />
        <TablePdf estimate={estimate} />
        <FooterPdf />
      </Page>
    </DocumentPDF>
  )

  return (
    <>
      <Grid2 fullWidth style={{border: "1px solid black", height: "90vh", marginTop: "10px"}}>
        <PDFViewer height="100%" width="100%" >
          <EstimatePdf />
        </PDFViewer>
      </Grid2>
      <Grid2 fullWidth sx={{textAlign: "center", marginY: "30px"}}>
        <PDFDownloadLink document={<EstimatePdf />} fileName={`${estimate.name}.pdf`}>
          <Button variant="contained">
            <FontAwesomeIcon icon={faDownload} />
            <span className="ml-2">Download estimate</span>
          </Button>
        </PDFDownloadLink>
      </Grid2>
    </>
  )
}
