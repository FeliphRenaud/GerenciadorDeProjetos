import {json, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'


function Project(){

    const {id} = useParams()
    console.log(id);
    
    const [project, setProject] = useState([])
    const [services, setSetservices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    const [message , setMessage] = useState(false)
    const [type, setType] = useState()

    useEffect(()=> {

       setTimeout(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then(resp => resp.json())
        .then((data)=> {
            setProject(data)
            setSetservices(data.service)
        })
        .catch(err=>console.log(err))
       },1500) 

    },[id])

    function editPost(project){
        setMessage('')
        //budget validation
        if(project.budget< project.cost){
            setMessage(' O orçamento não pode ser menor que o custo do projeto ')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(project),
        }).then(resp => resp.json())
        .then((data) =>{
            setProject(data)
            setShowProjectForm(false)
            setMessage(' Projeto Atualizado')
            setType('success')
            
        })
        .catch(err=> console.log(err))

        
    }

    function createService(project){
        setMessage('')
        const lastService= project.service[project.service.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

         const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //validação de valor maximo 

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento Ultrapassado, verifique o valor do serviço')
            setType('error')
            project.service.pop()
            return false
        }

        //adicionando o custo ao valor total 
        project.cost = newCost


        //atualizando projeto
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            }, body: JSON.stringify(project)
        })
        .then((resp)=> resp.json())
        .then((data) => {
            //exibir os serviços 
            setSetservices(false)
        })
        .catch(err=> console.log(err))

        
    }

    function removeService (){

    }
 
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)

    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)

    }

    return (
        <>
        {project.name ? (
            <div className={styles.projectContainer}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/> }
                    <div className={styles.detailsContainer}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Categoria: </span> {project.category.name}
                                </p> 
                                <p>
                                    <span>Total de Orçamento: </span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.projectInfo}>
                                <ProjectForm 
                                handleSubmit={editPost}
                                btnText="Concluir Edição"
                                projectData={project}/> 
                            </div>
                            
                        )}
                       
                    </div>
                    <div className={styles.serviceFormContainer}>
                            <h2>Adicionar Serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço ' : 'Fechar'}
                            </button>
                            <div className={styles.projectInfo}>
                                {showServiceForm && <ServiceForm
                                handleSubmit={createService}
                                btnText="Adicionar serviço"
                                projectData={project}
                                />} 
                             
                            </div>
                        </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 &&
                        services.map((service) => (
                            <ServiceCard
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            key={service.id}
                            handleRemove={removeService}
                            />
                        ))
                        }
                        {services.length === 0 && <p>Não há serviços cadastrados </p>}

                    </Container>

                </Container>
            </div>
        ):(
            <Loading/>
        )}



        </>
    )
   
} 

export default Project;