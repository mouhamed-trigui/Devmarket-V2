import React, { useState, useEffect } from 'react';

import FirstPage from './screen_offre/FirstPage';
import SecondPage from './screen_offre/SecondPage';
import { useSelector } from 'react-redux';

export interface IOfferProps {
    first: boolean | undefined;
    setFirst: (first: boolean) => void;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AddOffre(props: IOfferProps) {
    //const [first, setFirst] = useState<boolean | undefined>(undefined);
    const { selectedStore } = useSelector((state: any) => state.company);

    useEffect(() => {
        //alert(selectedStore?.offerNbr);
        if (selectedStore?.offerNbr !== undefined) {
            selectedStore?.offerNbr > 0
                ? props.setFirst(false)
                : props.setFirst(true);
        }
    }, [selectedStore]);

    return props.first !== undefined ? (
        props.first ? (
            <FirstPage setFirst={props.setFirst} />
        ) : (
            <SecondPage show={props.show} setShow={props.setShow} />
        )
    ) : null;
}

export default AddOffre;
