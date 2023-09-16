import { useState } from 'react';

import styles from './ServiceForm.module.css'
import Submit from '../form/Submit';
import Input from '../form/Input';


function ServiceForm({handleSubmit, btnText, projectData}){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.service.push(service)
        handleSubmit(projectData)
        return projectData

    }

    function handleChange (e){
        setService({...service,[e.target.name]: e.target.value})

    }

    return(
        <form onSubmit={submit}  className={styles.serviceFormContainer}>
            <Input
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço "
                handleOnChange={handleChange}
            />

            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total "
                handleOnChange={handleChange}
            />

            <Input
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder=" Descreva o serviço "
                handleOnChange={handleChange}
            />

            <Submit text={btnText}/>

        </form>
    )

}

export default ServiceForm;