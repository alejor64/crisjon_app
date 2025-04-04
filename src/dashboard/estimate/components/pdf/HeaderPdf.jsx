import { Image, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  image: {
    marginHorizontal: 220,
    height: "40px",
    width: "60px",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    fontSize: "12px"
  },
});

export const HeaderPdf = ({name}) => {
  return (
    <>
      <Image
        style={styles.image}
        src="/images/logo.png"
      />
      <View style={styles.header}>
        <View style={styles.info}>
          <Text>Crisjon</Text>
          <Text>5 South Wabash Avenue - Suite 1312</Text>
          <Text>Chicago, Illinois, 60603</Text>
          <Text>Phone: +1(312)7959303 - +1(312)7950018</Text>
        </View>
        <View style={styles.estimate}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ textAlign: "right" }}>Estimate info</Text>
            <Text style={{ textAlign: "right" }}>Name: {name}</Text>
          </View>
        </View>
      </View>
    </>
  )
}