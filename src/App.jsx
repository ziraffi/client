import './assets/styles/App.css'
import Header from './components/header/Header'
import Spacer from './components/Spacer'
import FrontLayout from './components/frontpage/FrontLayout'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div className="App scroll-mr-0">
      {Header ? <Header /> : <p>Header component not found</p>}
      <Spacer/>
      <FrontLayout />
      <Footer/>
    </div>  
  )
}

export default App