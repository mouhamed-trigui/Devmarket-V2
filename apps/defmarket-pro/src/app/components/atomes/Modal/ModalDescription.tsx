import React, { FC } from 'react';
import { Modal } from 'native-base';
import ModalOffer from './offer/ModalOffer';
import ModalHome from './home/ModalHome';
import {
    IModalHomeTextProps,
    IModalOfferTextProps,
} from '../../../services/model/company';

const ModalDescription: FC<{
    type: 'offer' | 'home';
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    dataModalHome?: IModalHomeTextProps;
    dataModalOffer?: IModalOfferTextProps;
}> = ({ showModal, setShowModal, type, dataModalHome, dataModalOffer }) => {
    return (
        <Modal
            isOpen={showModal}
            size="full"
            animationPreset="slide"
            onClose={() => setShowModal(false)}
        >
            <Modal.Content
                width="100%"
                maxHeight="93%"
                style={{
                    marginBottom: 0,
                    marginTop: 'auto',
                    borderRadius: 0,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}
            >
                <Modal.CloseButton />
                {type === 'offer' ? (
                    <ModalOffer dataModalOffer={dataModalOffer} />
                ) : (
                    <ModalHome dataModalHome={dataModalHome} />
                )}
            </Modal.Content>
        </Modal>
    );
};

export default ModalDescription;
