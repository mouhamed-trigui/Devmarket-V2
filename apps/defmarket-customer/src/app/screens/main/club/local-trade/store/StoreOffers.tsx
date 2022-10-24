import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { OfferItem } from '../../../../../components/atomes/card/offer-card/OfferItem';
import { GET_OFFER_BY_STORE } from '../../../../../services/constants';
import axiosInstance from '../../../../../services/constants/api';

function StoreOffers() {
    const isFocused = useIsFocused();
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        if (isFocused) {
            axiosInstance.get(GET_OFFER_BY_STORE(1)).then(({ data }) => {
                setOffers(data.data);
            });
        }
    }, [isFocused]);

    return (
        <>
            {offers?.map((offer, index) => (
                <OfferItem rowData={offer} key={index + 1} />
            ))}
        </>
    );
}

export default StoreOffers;
