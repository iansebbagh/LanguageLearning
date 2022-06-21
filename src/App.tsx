import React from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {useDispatch, useSelector} from 'react-redux';
import {getExercises} from './actions';
import Answers from './components/Answers';
import EnglishText from './components/EnglishText';
import Footer from './components/Footer';
import GermanText from './components/GermanText';
import Layout from './components/Layout';
import {showErrorToast} from './components/toast';
import {RootState} from './reducers';

const App = () => {
  const dispatch = useDispatch();
  const [right, setRight] = React.useState(false);
  const [clickedWordIndex, setClickedWordIndex] = React.useState(-1);
  const {isLoading, error} = useSelector((store: RootState) => store.common);
  const {selected, exercises} = useSelector(
    (store: RootState) => store.exercise,
  );

  React.useEffect(() => {
    if(clickedWordIndex !== -1)
      setRight(
        exercises[selected].answers[clickedWordIndex] ==
          (
            exercises[selected].words.find(
              (val: any) =>
                val.english ==
                exercises[selected].problem[exercises[selected].englishBlank - 1],
            ) as any
          ).german,
      );
  }, [clickedWordIndex]);

  React.useEffect(() => {
    if (selected == -1) dispatch(getExercises());
  }, [selected]);

  React.useEffect(() => {
    if (error) showErrorToast(error);
  }, [error, Toast]);

  return (
    <Layout>
      {isLoading ? (
        <View
          style={{
            width: '100%',
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0, .3)',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <ActivityIndicator
            size={Platform.OS == 'ios' ? 'large' : 60}
            color="#bc2b78"
          />
        </View>
      ) : null}
      <EnglishText />
      <GermanText clickedWordIndex={clickedWordIndex} right={right} />
      <Answers
        clickedWordIndex={clickedWordIndex}
        setClickedWordIndex={setClickedWordIndex}
      />
      <Footer
        setClickedWordIndex={setClickedWordIndex}
        clickedWordIndex={clickedWordIndex}
        right={right}
      />
    </Layout>
  );
};

export default App;
