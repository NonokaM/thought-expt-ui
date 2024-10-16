import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/questions/new">問題投稿</Link></li>
          <li><Link to="/questions/1">問題閲覧</Link></li>
          <li><Link to="/questions/1/answer">問題回答</Link></li>
          <li><Link to="/user/1">マイページ</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
