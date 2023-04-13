import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
//페이지들 펑션들 다 각 파일들 안에서 서로 링크 걸어줄수 있게 필요한거 다 임포트 하고 밑에 라우트 달아준겁니당~~~~

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="App">
          <Routes>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;