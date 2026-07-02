import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title={<span style={{ color: 'white', fontSize: '60px', fontWeight: 'bold' }}>404 Page Not Found</span>}
      subTitle={<span style={{ color: 'white', fontSize: '20px' }}>Sorry, the page you visited does not exist.</span>}
      style={{height: "100vh"}}
      extra={
        <button onClick={() => navigate("/dashboard")} className="tf-button tf-button-primary" style={{ padding: "1.5rem 1rem" }}>Back to Dashboard</button>
      }
    />
  );
};

export default NotFound;
