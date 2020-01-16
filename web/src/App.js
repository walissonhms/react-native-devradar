import React,{ useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

/**
 * Componentes: Bloco isolado de HTML, CSS, e JS, o qual não interfere no restante da aplicação function App(){return();};
 * Propriedades: Informações que um componente PAI passa para o componente FILHO;
 * Estado: Informações mantida pelo componente (Lembrar: imutabilidade);
 */

export default function App() {
  const [devs, setDevs] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function loadDev(){
      const response = await api.get('/devs');

      setDevs(response.data);
      setLoad(false);
    }

    loadDev();
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
    setLoad(true);
  }

  return (

    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {load ? (
            <p>Carregando os dados da API...</p>
          ) : (
            devs.map(dev => (<DevItem key={dev._id} dev={dev}/>))
          )}
        </ul>
      </main>
    </div>

  );
}
