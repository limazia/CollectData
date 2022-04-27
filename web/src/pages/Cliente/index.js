import React from 'react';
import { useNavigate } from "react-router-dom";
import { Head } from "~/components";
import style from './styles.module.css';

const Cliente = () => {

    const navigate = useNavigate();
    const goVolta = () => navigate(-1);

    return (
        <>
            <Head title="Cliente" />
            <header className={style.header}>
                <h1 className={style.clienteTitle}>Cliente</h1>
            </header>
            <div className={style.container}>
                <div className={style.containerBtn}>
                    <button className={style.btn}>Consultar</button>
                </div>
                <div className={style.containerBtn}>
                    <button className={style.btn}>Cadastrar</button>
                </div>
                <div className={style.containerBtn}>
                    <span className={style.back} onClick={goVolta}>Voltar</span>
                </div>
            </div>
        </>
    )
}

export default Cliente