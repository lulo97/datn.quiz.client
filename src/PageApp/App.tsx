import { Link } from 'react-router-dom'
function App() {
  return (
    <div>
      <ul>
        <li><Link to="createquestion">Tạo câu hỏi</Link></li>
        <li><Link to="homepage">Trang chủ</Link></li>
        <li><Link to="createquiz">Tạo đề</Link></li>
        <li><Link to="quizdetail">Chi tiết đề</Link></li>
        <li><Link to="quizplaytime">Làm đề tính giờ</Link></li>
        <li><Link to="quizplayrevise">Làm đề ôn tập</Link></li>
      </ul>
    </div>
  )
}

export default App
