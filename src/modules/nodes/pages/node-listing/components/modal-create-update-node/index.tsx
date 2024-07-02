import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { ModalCreateNodeEx } from './modal-create-update-node';

export const ModalCreateNode = () => {
    const [modal, setModal] = useState(false);

    const reRender = () => {
        setModal(false);
        setTimeout(() => {
            if(modal == false) {
                setModal(true);
            } else {
                setTimeout(() => setModal(true), 50);
            }
        }, 50);
    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={reRender}>
                Create
            </Button>
            {modal && (<ModalCreateNodeEx/>)}
        </>
    );
};