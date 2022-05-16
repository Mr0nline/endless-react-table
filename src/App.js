import './App.css';
import { ERTable } from "./lib";

const columns = [{
  name: 'ABC',
}, {
  name: 'XYZ',
}]

const rows = []
for (let i = 0; i < 10000; i++) {
  rows.push({
    name: `Row ${i}`,
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ERTable columns={columns} rows={rows} rowHeight={30} lines={15}/>
      </header>
    </div>
  );
}

export default App;
