import RegisterForm from './components/RegisterForm'
import './App.css'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Registration System</h1>
        <p>Simple MongoDB + React Registration Demo</p>
      </header>
      
      <main className="App-main">
        <div className="container">
          <div className="form-section">
            <RegisterForm  />
          </div>
          
        </div>
      </main>
    </div>
  )
}

export default App