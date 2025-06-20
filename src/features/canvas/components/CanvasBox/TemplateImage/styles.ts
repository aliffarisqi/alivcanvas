import { Colors } from '@/app/theme/colors';
import { Sizes } from '@/app/theme/siezs';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 300,
    zIndex: 20,
    padding: Sizes.paddingScreen,
    backgroundColor: Colors.dark,
    borderTopLeftRadius: Sizes.radius2XL,
    borderTopRightRadius:Sizes.radius2XL,
  },

  image: {
    width: 150,
    height: 160,
    resizeMode: 'cover',
    borderRadius: Sizes.radiusM,
    marginRight: Sizes.spaceXL,
  },
  press:{
    width: 150,
    height: 160,
    borderRadius: Sizes.radiusM,
    marginRight: Sizes.spaceXL,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.spaceXL,
  },
  selectedBorder: {
    borderWidth: 5,
    borderColor: Colors.gray,
  },
});
