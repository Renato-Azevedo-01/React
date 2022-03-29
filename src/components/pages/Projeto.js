import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import styles from './Projeto.module.css'
import Loading from '../layout/Loading'
import Form from '../layout/Form'
import ServiceForm from '../service/ServiceForm.js'
import Container from '../layout/Container'
import Message from '../layout/Message'

function Projeto() {
    const {id} = useParams()
    const [projeto,setProjeto] = useState([])
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
        .then((data) => {setProjeto(data)})
        .catch((err) => console.log(err))
    },[id])

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
                                {showServiceForm && (<ServiceForm />)}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                                <p>Itens de serviços</p>
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