import Colors from '@/constants/Colors';
import { View, Text, StyleSheet} from 'react-native';

const Page = () => {
  return (
    <View style={{backgroundColor: Colors.background}}>
      <Text>Reporting</Text>   
    </View>
  );
};

const styles = StyleSheet.create({
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    }
  });

export default Page;