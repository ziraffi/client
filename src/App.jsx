import './assets/styles/App.css'
import Header from './components/header/Header'
import Spacer from './components/Spacer'
import Footer from './components/footer/Footer'
import FormCountryDropdown from './components/customComponents/FormCountryDropdown';

function App() {
  return (
    <div className="App scroll-mr-0 bg-indigo-950">
      {Header ? <Header /> : <p>Header component not found</p>}
      <Spacer/>
      <FormCountryDropdown />
      <Spacer height={40} />
      <Footer/>
    </div>  
  )
}


export default App