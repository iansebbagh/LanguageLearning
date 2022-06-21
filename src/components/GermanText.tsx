import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers';

const GermanText = ({clickedWordIndex, right}) => {
  const {selected, exercises} = useSelector(
    (store: RootState) => store.exercise,
  );

  return (
    <View style={styles.words}>
      {selected !== -1 &&
        exercises &&
        exercises[selected].words.map((word, index) =>
          index + 1 === exercises[selected].germanBlank ? (
            clickedWordIndex == -1 ? (
              <Text
                style={{
                  width: 100,
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: 22,
                  marginLeft: 8,
                  marginRight: 8,
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                }}>
                {' '}
              </Text>
            ) : (
              <LinearGradient
                key={`linear_gradient_${index}`}
                style={styles.answerWordButton}
                colors={
                  right ? ['#00deea', '#3feae9'] : ['#ff7787', '#ff938c']
                }>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 16,
                  }}>
                  {exercises[selected].answers[clickedWordIndex]}
                </Text>
              </LinearGradient>
            )
          ) : (
            <TouchableOpacity key={`words_${index}`}>
              <Text
                style={{
                  ...styles.germanWord,
                  ...(index + 1 !== exercises[selected].germanBlank
                    ? {
                        borderStyle: 'dashed',
                        borderBottomWidth: 1,
                        borderBottomColor: 'white',
                      }
                    : {}),
                }}>
                {index == exercises[selected].words.length - 1
                  ? word.german + '.'
                  : word.german}
              </Text>
            </TouchableOpacity>
          ),
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  words: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 60,
    padding: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  answerWordButton: {
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.43,
    shadowRadius: 3.51,
    elevation: 10,
  },
  germanWord: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 22,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default React.memo(GermanText);
