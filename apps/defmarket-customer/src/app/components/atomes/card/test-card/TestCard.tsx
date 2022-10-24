import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getUser } from '../../../../services/methodes/user/index';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../../stores/slices';
import Button from '../../button/general-button/Button';
export default function TestCard() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state: any) => state);
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getUser()
            .then((res) => {
                setLoading(false);
                dispatch(userActions.setData(res));
            })
            .catch((err) => setLoading(false));
    };
    return (
        <View
            testID="test"
            style={{
                marginVertical: 20,
                padding: 10,
                backgroundColor: 'lightblue',
            }}
        >
            <Button title="get data" onPress={() => getData()} />
            {loading ? (
                <Text testID="test0">Loading</Text>
            ) : (
                user.data.map((item, index) => (
                    <Text testID="test2" key={index}>
                        {item}
                    </Text>
                ))
            )}
        </View>
    );
}
