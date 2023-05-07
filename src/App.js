import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
//import components
import CreateForm from './components/CreateForm';
function App() {
  return (
    <div className="App">
     <CreateForm />
    </div>
  );
}

export default App;
