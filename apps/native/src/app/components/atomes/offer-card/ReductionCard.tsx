import React from 'react';
import { Image, View } from 'native-base';
import { Text } from '../text/text';
import InfoIcon from '../../../../assets/images/png/information.png';
import Card from '../../../components/atomes/card/Card';
import Infodialog from '../../molecules/dialog/info-dialog/Infodialog';
import { TouchableOpacity } from 'react-native';

export interface IpropsReduction {
    backgroundColor: string;
    textColor?: string;
    value: any;
    description?: string;
    textSize?: number;
    hideDescription?: boolean;
}
export default function ReductionCard(props: IpropsReduction) {
    const [message, setMessage] = React.useState('');

    const [alert, setAlert] = React.useState<{
        open: boolean;
        title: string;
        msg: string;
    }>({
        open: false,
        title: '',
        msg: '',
    });

    React.useEffect(() => {
        switch (props.description) {
            case 'Offre minimum':
                return setMessage(
                    'Ce niveau d’offre est accessible à tous les utilisateurs de l’application Defmarket. '
                );
            case 'Offre medium':
                return setMessage(
                    'Ce niveau d’offre est accessible uniquement aux adhérents cotisants à l’association Hypérion Défense.'
                );
            case 'Offre premium':
                return setMessage(
                    'Ce niveau d’offre est accessible uniquement aux membres bénévoles de l’association Hypérion Défense et aux membres de ses structures partenaires. '
                );
        }
    }, [props.description]);

    return (
        <View alignItems="center" flexGrow={1} flexShrink={1}>
            <Infodialog
                isOpen={alert.open}
                onClose={() => setAlert((old) => ({ ...old, open: false }))}
                title={alert.title}
                body={alert.msg}
            />
            <Card
                backgroundColor={props.backgroundColor}
                width="100%"
                style={{ paddingLeft: 5, paddingRight: 5 }}
            >
                <TouchableOpacity
                    style={{
                        width: 20,
                        height: 15,
                        alignSelf: 'flex-end',
                        marginRight: 5,
                    }}
                    onPress={() =>
                        setAlert({
                            open: true,
                            title: 'Information',
                            msg: message,
                        })
                    }
                >
                    <Image
                        source={InfoIcon}
                        alt="infoIcon"
                        resizeMode="contain"
                        style={{
                            marginTop: -5,
                            width: 17,
                            height: 17,
                            alignSelf: 'flex-end',
                        }}
                    />
                </TouchableOpacity>

                <Text
                    color={props.textColor ?? 'white'}
                    fontSize={32}
                    fontFamily="bold"
                    textAlign="center"
                >
                    {props.value}
                </Text>
                {!props?.hideDescription && (
                    <Text
                        color={props.textColor ?? 'white'}
                        fontSize={props?.textSize ?? 'dm-p'}
                        textAlign="center"
                        fontFamily="bold"
                    >
                        {props.description}
                    </Text>
                )}
            </Card>
        </View>
    );
}
