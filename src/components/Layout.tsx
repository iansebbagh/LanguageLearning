import React, {ReactNode} from 'react';
import {FlatList, View} from 'react-native';

const Layout = ({children}: any) => {
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#3b6c81',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {children}
    </View>
  );
};

export default Layout;
