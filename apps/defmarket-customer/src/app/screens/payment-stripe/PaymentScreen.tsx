import React from 'react';
import {
    CardField,
    CardFieldInput,
    useConfirmPayment,
} from '@stripe/stripe-react-native';
import { TextInput, View } from 'react-native';
import FormControl from '../../components/molecules/form-control/form-control';
import { close } from '../../theme/images';
import { danger, info } from '../../theme/colors';
import Button from '../../components/atomes/button/general-button/Button';

const PaymentScreen = () => {
    //const { confirmPayment } = useStripe();
    const [emailValue, setEmailValue] = React.useState('');

    const [
        cardDetails,
        setCardDetails,
    ] = React.useState<CardFieldInput.Details>();

    const { confirmPayment } = useConfirmPayment();

    const handlePayPress = async () => {
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails || !emailValue) {
            alert('Please enter Complete card details and Email');
            return;
        }
        const billingDetails = {
            email: emailValue,
        };

        //2.Fetch the intent client secret from the backend
        try {
            const clientSecret =
                'pi_3LMuXJFzCzsHVEc413C5LZaB_secret_J7lVO3k47WowvvEMJZlrm1ysC';
            //2. confirm the payment
            if (!clientSecret) {
                console.log('Unable to process payment');
            } else {
                const { paymentIntent, error } = await confirmPayment(
                    clientSecret,
                    {
                        type: 'Card',
                        billingDetails: billingDetails,
                    }
                );
                if (error) {
                    alert(`Payment Confirmation Error ${error.message}`);
                } else if (paymentIntent) {
                    alert('Payment Successful');
                    console.log('Payment successful ', paymentIntent);
                }
            }
        } catch (e) {
            console.log(e);
        }

        //3.Confirm the payment with the card details
    };
    return (
        <View
            style={{
                width: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <TextInput
                style={{
                    width: '80%',
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
                onChangeText={(email: string) => setEmailValue(email)}
                value={emailValue}
            />
            {/* <FormControl
                helperText="ton mail"
                placeholder="email"
                type="email"
            /> */}
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#ffffff',
                    textColor: '#000000',
                    borderRadius: 6,
                }}
                style={{
                    width: '90%',
                    height: 45,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    setCardDetails(cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            <Button
                //color={danger[50]}
                height={48}
                //rightIcon={close}
                viewWidth="80%"
                key="payment"
                title="Pay"
                onPress={handlePayPress}
            />
        </View>
    );
};

export default PaymentScreen;
