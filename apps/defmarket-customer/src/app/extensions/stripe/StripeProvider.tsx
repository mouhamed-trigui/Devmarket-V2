import React from 'react';
import { StripeProvider as SStripeProvider } from '@stripe/stripe-react-native';
export default function StripeProvider(props) {
    const publishableKey =
        'pk_test_51Jope2H3eJxnTaBj871loya8HYsmSybdhTmXuFRnUIKHqqYhnedyA7tuAegSJFaY7UWX06t8G6VY5TtjzT8fpcxC00Di6tFDiD';
    return (
        <SStripeProvider publishableKey={publishableKey}>
            {props.children}
        </SStripeProvider>
    );
}
