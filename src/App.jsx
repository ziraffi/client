import './assets/styles/App.css'
import Header from './components/header/Header'
import Spacer from './components/Spacer'
import Footer from './components/footer/Footer'
import IndianPincodesAdv from './components/customComponents/IndianPincodesAdv'

function App() {
  return (
    <div className="App scroll-mr-0">
      {Header ? <Header /> : <p>Header component not found</p>}
      <Spacer/>
      <IndianPincodesAdv />
      <Footer/>
    </div>  
  )
}

export default App