import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'

function ProjectForm ({btntext}){
    return (
        
        <form className={styles.form}>
            <Input 
            type='text'
            text='Nome do projeto'
            name='name'
            placeholder='Insira o nome do projeto ' 
            />
             <Input 
            type='number'
            text='Orçamento do projeto'
            name='Budget'
            placeholder='Insira o Orçamento total do projeto ' 
            />
                      
            <Select 
            name='category_id' 
            text='Selecione a categoria'
            />
           <Submit text={btntext}/>
        </form>
    )
}

export default ProjectForm