import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import LinkBotton from '../layout/LinkButtoon';
import styles from './Projects.module.css';
import Message from "../layout/Message";
import Container from "../layout/Container";
import ProjectCard from "../projects/ProjectCard";
import Loading from "../layout/Loading";


function Projects (){

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation()
    let message = ""
    if (location.state){
        message = location.state.message
    }

    useEffect(()=> {
        //a unica função desse SETTIMEOUT é mostrar o SVG LOADING funcionando
        setTimeout(()=>{
            fetch("http://localhost:5000/projects", {
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                }
            })
            .then(resp => resp.json())
            .then(data=>{
                console.log(data);
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err)=>console.log(err))
        
        },1500)
       },[])

       function removeProject(id){

        fetch(`http://localhost:5000/projects/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso! ') 
        }).catch(err => console.log(err))

       }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
            <h1> Meus Projetos </h1>
            <LinkBotton to='/newproject' text='Criar Projeto' />
            </div>
            <Container customClass="start">
                {projects.length> 0 &&
                 projects.map((project)=> (
                    <ProjectCard
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                    />
                 ))}
                 {!removeLoading && <Loading/>}
                 {removeLoading && projects.length === 0 &&
                    <p> Não há projetos cadastrados </p>
                 }

            </Container>
            
            {message && <Message type="success" msg={message}/> }
            {projectMessage && <Message type="success" msg={projectMessage}/> }
        </div>
    )
}

export default Projects;