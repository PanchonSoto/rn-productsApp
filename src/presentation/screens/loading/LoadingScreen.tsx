import { Layout, Spinner } from "@ui-kitten/components";
import { StyleSheet } from "react-native";



export const LoadingScreen = () => {
  return (
    <Layout style={styles.layout}>
      <Spinner status="primary" size="large"/>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});
