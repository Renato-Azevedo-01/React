import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import styles from './Projeto.module.css'
import Loading from '../layout/Loading'
import Form from '../layout/Form'
import ServiceForm from '../layout/ServiceForm.js'
import Container from '../layout/Container'
import Message from '../layout/Message'
import { parse, v4 as uuidv4 } from 'uuid'
import ServiceCard from '../layout/ServiceCard'

function Projeto() {
    const {id} = useParams()
    const [projeto,setProjeto] = useState([])
    const [services,setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, 
            {
                method: 'GET',
                headers:{'Content-Type' : 'application/json'}
            }
        )  
        .then(resp => resp.json())
        .then((data) => {setProjeto(data)
                         setServices(data.services)
                        })
        .catch((err) => console.log(err))
    },[id])

    function createService(projeto) {
        setMessage('')
        //last service
        const lastService = projeto.services[projeto.services.length -1]
        
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost    
        
        const newCost = parseFloat(projeto.cost) + parseFloat(lastServiceCost)

        // maximun value validtion
        if(newCost > parseFloat(projeto.budget)) {
            setMessage('Orçamento ultrapassado ! Verifique o valor do serviço.')
            setType('error')
            projeto.services.pop()
            return false
        }

        //add service cost to project total cost
        projeto.cost = newCost

        //update projeto
        
        fetch(`http://localhost:5000/projects/${projeto.id}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(projeto)
        })
        .then((resp) => resp.json())
        .then((data) => {setShowServiceForm(false)})  
        .catch((err) => console.log(err))      
    }

    function removeService(id, cost) {
        const servicesUpdated = projeto.services.filter((service) => service.id !== id)
        const projectUpdated = projeto

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method:'PATCH',
            headers:{'Content-Text' : 'application/json'},
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json()) 
          .then((data) => {
            setProjeto(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso !')
            
        })
        .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        {setShowProjectForm(!showProjectForm)}
    }

    function toggleServiceForm() {
        {setShowServiceForm(!showServiceForm)}
    }

    function editPost(projeto) {
        setMessage('')
        //console.log(projeto)
        //budget validation 
        if(projeto.budget <  projeto.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto !')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${projeto.id}`, {
            method: 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then(resp => resp.json())
        .then((data) => { 
            setProjeto(data)
            setShowProjectForm(false)            
            setMessage('Projeto atualizado !') 
            setType("success")             
            } )
        .catch(err => console.log(err))
    }

        return(<>
            {projeto.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} /> }
                        <div className={styles.details_container}>
                            <h1>Projeto: {projeto.name}</h1>
                            <button className= {styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p><span>Categoria: </span>{projeto.category.name}</p>
                                    <p><span>Total de Orçamento: </span>{projeto.budget}</p>
                                    <p><span>Total Utilizado: </span>{projeto.cost}</p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <Form 
                                        handleSubmit={editPost} 
                                        btnText="Concluir Edição" 
                                        projectData={projeto}
                                    />
                                </div>
                            )}

                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className= {styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                <ServiceForm
                                  handleSubmit={createService}
                                  btnText="Adicionar Serviço"
                                  projectData ={projeto}                                 
                                />)}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                                {services.length > 0 &&
                                  services.map((service) => (
                                      <ServiceCard
                                        id = {service.id}
                                        name = {service.name}
                                        cost = {service.cost}
                                        description = {service.description}
                                        key = {service.id}
                                        handleRemove = {removeService}
                                         />

                                  ))}
                                {services.length === 0 && <p>Não há serviços cadastrados</p> }
                        </Container>
                    </Container> 
                </div> 
                )
                : (<Loading/> )
            }
            </>
        )
}

export default Projeto