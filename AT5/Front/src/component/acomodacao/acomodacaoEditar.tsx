import { BsPencil } from 'react-icons/bs';
import { useState } from 'react';
import { Acomodacao} from '../../type/acomodacaoInterface';
import Modal from 'react-modal';
import { Cliente2 } from '../../type/clienteInterface';
import './acomodacao.css'

type props = {
    cliente: Cliente2;
    acomodacao: Acomodacao;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '50%'
    },
};

export default function AcomodacaoEditar({cliente, acomodacao}: props) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}><BsPencil /></button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Editar Acomodação</h2>
                <form>
                    <button>Salvar</button>
                </form>
            </Modal>
        </div>
    );
}