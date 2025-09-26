import './App.css'
import DancingDuffy from './components/DancingDuffy'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>더피의 댄스 타임!</h1>
        <p>케이팝 데몬 헌터스의 더피가 춤을 춥니다</p>
      </header>
      <main className="app-main">
        <DancingDuffy />
      </main>
    </div>
  )
}

export default App
