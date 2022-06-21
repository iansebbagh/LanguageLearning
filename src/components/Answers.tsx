import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers';

export const Answers = ({clickedWordIndex, setClickedWordIndex}) => {
  const {selected, exercises} = useSelector(
    (store: RootState) => store.exercise,
  );

  const onClickWord = React.useCallback(
    (index: number) => {
      setClickedWordIndex(index);
    },
    [setClickedWordIndex],
  );

  return (
    <View style={styles.answers}>
      {selected !== -1 &&
        exercises &&
        exercises[selected].answers?.map((word, index) => (
          <TouchableOpacity
            disabled={clickedWordIndex !== -1}
            onPress={() => onClickWord(index)}
            style={{
              ...styles.answerWordButton,
              ...(clickedWordIndex == index
                ? {
                    backgroundColor: '#6392a7',
                  }
                : {}),
            }}
            key={`answers_${index}`}>
            <Text
              style={{
                ...styles.answerWordText,
                ...(clickedWordIndex == index
                  ? {
                      color: '#6392a7',
                    }
                  : {}),
              }}
              key={`problem_word_${index}`}>
              {word}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  answers: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
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
  answerWordText: {
    color: '#244f67',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
});

export default React.memo(Answers);
