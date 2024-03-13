import './App.css';
import { Provider } from 'react-redux';
import store from './store/store'
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {


  return (
    <Provider store={store}>
      <div className='App'>
      <Router>
        <Routes>
          

            <Route path='/' element={<LandingPage/>}/>
          
          
        </Routes>
      </Router>
    </div>
    </Provider>
    
  )
}

export default App
