import React, {useState, useEffect} from 'react';
import './styles.css'
import Card from '../../components/Card'

var idGit = prompt('Insira seu ID/User do Github')
var linkGit = `https://github.com/${idGit}`;
function Home() {


  const [studentName, setStudentName] = useState(); //armazena o estado | função que atualiza o estado
  const [students, setStudents] = useState([]); //armazena o estado | função que atualiza o estado guardar em array
  const [user, setUser] = useState({name: '', avatar: ''})

  
  function handleAddStudent(){ // Função para adicionar estudante
    const newStudent = { //Objeto para instanciar o novo estudante
      name: studentName, //Pegando o nome que for digitado na variavel/estado studentName
      time: new Date().toLocaleTimeString("pt-br", { 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudents(prevState => [...prevState, newStudent]) //... = SpreadOperator = salvar o ultimo dado inputado e adicionar o novo | função que atualiza o estado

  }

  useEffect(()=>{
    //corpo do useEffect 
    fetch(`https://api.github.com/users/${idGit}`)
    .then(response=> response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })

    })

  },[]);
 return(
   <div className="container">  {/*Fragment = para passar mais de um elemento em 1 return */}

    <header>
    <h1 className="titulo">Lista de presença</h1>
    <div>
      <strong className="nomeProfessor">{user.name}</strong>
      
      <a href={linkGit} target="_blank"><img src={user.avatar} alt="Foto perfil"></img></a>
    </div>
    </header>


    <input 
    type="text" 
    placeholder="Digite seu nome..."
    onChange={e => setStudentName(e.target.value)} //pegar o valor do campo
    ></input>


    <button 
    id="botaum"
    disabled={!studentName}
    type="button"
    onClick={handleAddStudent}>Adicionar</button>

    {
      students.map(student => (
      <Card 
      key={student.time}
      name={student.name}
      time={student.time}></Card>)) //map = percorrer
      
    }

   </div>
 )
}

export default Home
 