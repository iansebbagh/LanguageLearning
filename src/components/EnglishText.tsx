import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers';

const EnglishText = () => {
  const {selected, exercises} = useSelector(
    (store: RootState) => store.exercise,
  );

  return (
    <React.Fragment>
      <Text style={styles.description}>Fill in the missing word</Text>
      <View style={styles.problem}>
        {selected !== -1 &&
          exercises &&
          exercises[selected].problem.map((word, index) => (
            <TouchableOpacity key={`problem_word_${index}`}>
              <Text
                style={{
                  ...styles.problemWord,
                  ...(index + 1 == exercises[selected].englishBlank
                    ? {
                        textDecorationLine: 'underline',
                        fontFamily: 'Montserrat-Bold',
                      }
                    : {}),
                }}>
                {index == exercises[selected].problem.length - 1
                  ? word + '.'
                  : word}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  description: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    fontSize: 13,
    marginTop: 60,
  },
  problem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  problemWord: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});
export default React.memo(EnglishText);
