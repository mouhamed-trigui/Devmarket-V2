import React, { useState } from 'react';
import { ScrollView, Button, Stack, Divider, Text } from 'native-base';
import FormControl from '../../components/molecules/form-control';

// services
import { login } from '../../services';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../stores/slices';

export default function Login() {
  // State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  // Function
  const loginUser = async (identifier, password) => {
    if (!identifier || !password) return;
    await login(identifier, password)
      .then((response) => {
        if (response.status === 200) {
          // Go to home
        }
      })
      .catch((err) => setError(err)); // error.identifier // error.password
  };

  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <ScrollView
      w={{
        base: '100%',
        md: '100%',
      }}
    >
      <Stack
        space={2.5}
        alignSelf="center"
        px="2"
        safeArea
        mt="40"
        w={{
          base: '100%',
          md: '25%',
        }}
      >
        <FormControl
          label={'Identifier'}
          type={'text'}
          placeholder={'Identifier'}
          value={identifier}
          errorMessage={error?.message ?? null}
          //   helperText="Helper msg"
          onChange={setIdentifier}
        />
        <FormControl
          label={'Password'}
          type={'password'}
          placeholder={'password'}
          value={password}
          //   helperText="Helper msg"
          onChange={setPassword}
        />
        <Divider />
        <Button onPress={loginUser}>Login</Button>
        <Text>{user}</Text>
        <Button onPress={() => dispatch(userActions.setUser('Taher user'))}>
          Test redux
        </Button>
      </Stack>
    </ScrollView>
  );
}
