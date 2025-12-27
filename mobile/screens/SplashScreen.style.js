import { StyleSheet } from 'react-native';
import { COLORS } from '../style/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: 'cover', // full screen (bisa 'contain' kalau mau tidak ke-crop)
  },
});