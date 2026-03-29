import { AppTextStyle, Typography } from "@/components/Typography";
import { COLORS } from "@/theme/colors";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TransferIcon from "../../assets/icons/transfer.svg";
// import * as SVG from '../../assets/icons';

const source = require('../../assets/images/bannerBg.png')
export default function Home() {
  const safeInsets = useSafeAreaInsets()

  return (

    <View
      style={{
        flex: 1,
        paddingTop: safeInsets.top,
        paddingBottom: safeInsets.bottom,
        paddingHorizontal: 10,

      }}
    >
      <View style={styles.bioContainer}>
        <View style={styles.avatar}>

        </View>
        <Typography color={COLORS.ledgerBlue}>Hi, Chukwu</Typography>
      </View>
      <View style={styles.banner}>

        <View style={styles.innerBanner}>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography color={COLORS.white} style={{ opacity: 0 }}>USD</Typography>
            <Typography color={COLORS.white} textstyle={AppTextStyle.bodyMedium} >Wallet Balance</Typography>
            <Typography color={COLORS.white}>USD</Typography>
          </View>
          {/* <Typography textstyle={AppTextStyle.bodyTiny} color={COLORS.white}>
            1 USD = EUR 0.95 = GBR 0.79
          </Typography> */}
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>

            <View style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: 4,
              paddingVertical: 4,
              borderRadius: 4
            }}>
              <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.ledgerBlue}> $ </Typography>
            </View>
            <Typography textstyle={AppTextStyle.heading3} color={COLORS.white}>100,000</Typography>
          </View>

          <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.white}>
            +$ 421.03
          </Typography>
          <Pressable>
           <Typography> Send</Typography>
          </Pressable>
          <Pressable>
            <Typography>Receive</Typography>
          </Pressable>
        </View>

      </View>
      <TransferIcon width={24} height={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 40,
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.grey50,
    borderRadius: 20
  },
  banner: {
    // height: 350,
    // height: 22,
    marginVertical: 20,
    backgroundColor: COLORS.white50,
    borderRadius: 40,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        spreadDistance: -1,
        blurRadius: 15,
        color: COLORS.grey100
      }, {
        offsetX: 0,
        offsetY: 2,
        spreadDistance: -2,
        blurRadius: 6,
        color: COLORS.grey100
      }
    ]
  },
  innerBanner: {
    height: 220,
    backgroundColor: COLORS.ledgerBlue,
    borderRadius: 40,
    // margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 25
  }
});

// 14213D