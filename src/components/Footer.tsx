import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {selectExercise} from '../actions';
import {IconX, ICON_TYPE} from '../assets/Icons';
import {RootState} from '../reducers';

export const Footer = ({setClickedWordIndex, clickedWordIndex, right}) => {
  const dispatch = useDispatch();
  const {selected, exercises} = useSelector(
    (store: RootState) => store.exercise,
  );

  const onContinue = React.useCallback(() => {
    setClickedWordIndex(-1);
    dispatch(selectExercise(selected));
  }, [selected, setClickedWordIndex]);

  return (
    <LinearGradient
      colors={
        clickedWordIndex == -1
          ? ['#3b6c81', '#3b6c81']
          : right
          ? ['#00deea', '#3feae9']
          : ['#ff7787', '#ff938c']
      }
      style={styles.footer}>
      {clickedWordIndex !== -1 && (
        <View
          style={{
            position: 'absolute',
            left: 30,
            top: 18,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: 'white',
              fontSize: 16,
            }}>
            {!right
              ? `Answer: ${
                  (
                    exercises[selected].words.find(
                      (val: any) =>
                        val.english ==
                        exercises[selected].problem[
                          exercises[selected].englishBlank - 1
                        ],
                    ) as any
                  ).german
                }`
              : 'Great Job!'}
          </Text>
          <IconX
            color={'white'}
            origin={ICON_TYPE.MATERIAL_COMMUNITY}
            name={'flag-variant'}
            size={25}
          />
        </View>
      )}
      <TouchableOpacity
        disabled={clickedWordIndex == -1}
        onPress={() => onContinue()}
        style={{
          ...styles.continueButton,
          ...(clickedWordIndex == -1 ? {} : {backgroundColor: 'white'}),
        }}>
        <Text
          style={{
            ...styles.continueText,
            ...(clickedWordIndex == -1
              ? {}
              : {color: right ? '#00deea' : '#ff7787'}),
          }}>
          CONTINUE
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 60,
    paddingBottom: 60,
    left: 0,
    bottom: 0,
  },
  continueButton: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#6392a7',
    justifyContent: 'center',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.43,
    shadowRadius: 3.51,
    elevation: 6,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});

export default React.memo(Footer);
