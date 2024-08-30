import Banner from './components/Banner'
import { ContatoProvider } from './components/Context/ContatosContext'
import DadosCadastrados from './components/DadosCadastrados'
import Formulario from './components/Formulario'
import Rodape from './components/Rodape'

function App() {


  return (
    <>
      <Banner />
      <ContatoProvider>
        <Formulario />
        <hr />
        <DadosCadastrados />
      </ContatoProvider>
      <Rodape />
    </>
  )
}

export default App
