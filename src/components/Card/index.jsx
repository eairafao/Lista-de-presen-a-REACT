import './styles.css'

function Card(props){
  return(
    <div className="card">
      <strong className="fundo">{props.name}</strong>
      <small className="fundo">{props.time}</small>
    </div>
  )
}

export default Card