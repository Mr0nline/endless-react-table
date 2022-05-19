import './App.css'
import { ERTable } from './lib'

const columns = [{
  name: 'Column 1',
  width: 100,
  styles: {
    textAlign: 'center',
    header: {
      textAlign: 'right'
    },
    footer: {
      textAlign: 'right'
    }
  }
}, {
  name: 'Column 2',
  width: 300
}]

const rows = []
for (let i = 0; i < 10000; i++) {
  rows.push({
    name: `Row ${i}`
  })
}

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <ERTable columns={columns} rows={rows} rowHeight={30} lines={15} header footer />
      </header>
    </div>
  )
}

export default App
