import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footer: {
    marginTop: 80,
    marginBottom: 20,
    fontSize: "12px",
  },
});

export const FooterPdf = () => {
  return (
    <View style={styles.footer}>
      <Text>_______________________</Text>
      <Text>Crisjon</Text>
      <Text>https://www.crisjon.com</Text>
    </View>
  )
}