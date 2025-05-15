import './App.css';
import TraditionalDOM from './TraditionalDOM';
import ReactDOM from './ReactDOM';

function App() {
  return (
    <div className="App">
      <h1>DOM Manipulation Performance Test</h1>
      <TraditionalDOM />
      <ReactDOM />
    </div>
  );
}

export default App;
