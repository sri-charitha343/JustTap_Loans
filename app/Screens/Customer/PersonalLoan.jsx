import { SafeAreaView } from "react-native-safe-area-context";
import React,{ useState } from "react";
import Slider from "@react-native-community/slider";
import { StyleSheet ,Text,View,TouchableOpacity} from "react-native";
const PersonalLoan = () => {
    const [sliderState,setSliderState] = useState(0);
    return(
        <SafeAreaView>
            {/* <Slider 
            style={{  height: 40}}
            value={sliderState}
            onValueChange={(value) => setSliderState(value)}
            minimumValue={5}
            maximumValue={25}
            minimumTrackTintColor="#06b6d4"
            maximumTrackTintColor="#cbd5e1"
            />
            <View><Text>{sliderState.toString().slice(0,2)}</Text></View> */}
            <View>
                    <Text style={styles.Title}>Personal Loan</Text>
                  </View>
                  <View style={styles.container}>
                    <Text style={styles.amount}>Loan Amount</Text>
                    <Slider style={styles.getslider}/>
                    <View style={styles.inrow}>
                      <Text>5000</Text>
                      <Text>50,000</Text>
                    </View>
                    <Text style={styles.amount}>Loan Term</Text>
                    <Slider style={styles.getslider}/>
                    <View style={styles.inrow}>
                      <Text>5 days</Text>
                      <Text>30 days</Text>
                    </View>
                  </View>
                  <View style={styles.box}>
                    <View style={styles.inrow}>
                      <Text style={styles.Date}>Loan </Text>
                      <Text style={styles.Date}>30,000</Text>
                    </View>
                  </View>
                  <View style={styles.box}>
                    <View style={styles.inrow}>
                      <Text style={styles.Date}>Repayment Date</Text>
                      <Text style={styles.Date}>dd/mm/yy</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.money}><Text>Get Money</Text></TouchableOpacity>
        </SafeAreaView>
    );
};
export default PersonalLoan;

const styles = StyleSheet.create({
    Title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#1e3a8a',
      alignContent: 'center',
      padding: 42,
    },
    amount: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    container: {
      padding: 10,
      borderRadius: 25,
      height: 350,
      backgroundColor: '#8dd2f0',
    },
    // style={{  height: 40}}
    //           value={sliderState}
    //           onValueChange={(value) => setSliderState(value)}
    //           minimumValue={0}
    //           maximumValue={1}
    //           minimumTrackTintColor="#06b6d4"
    //           maximumTrackTintColor="#cbd5e1"
    getslider: {
      height: 40,
      minimumTrackTintColor :"#06b6d4",
      maximumTrackTintColor:"#cbd5e1",
    },
    box: {
      padding: 30,
      borderRadius: 25,
      height: 80,
      backgroundColor: '#8dd2f0',
    },
    Date: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    money: {
      backgroundColor: '#0F4A97',
      paddingHorizontal: 6,
      paddingVertical: 6,
      borderRadius: 12,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inrow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
