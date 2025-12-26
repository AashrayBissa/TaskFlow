import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Result
    status="404"
    title={<span style={{ color: 'white', fontSize: '60px', fontWeight: 'bold' }}>404 Page Not Found</span>}
    subTitle={<span style={{ color: 'white', fontSize: '20px' }}>Sorry, the page you visited does not exist.</span>}
    style={{height: "100vh"}}
    extra={
      <Button
        type="primary"
        style={{ backgroundColor: '#2E95D9', borderColor: '#2E95D9', color: '#fff', padding: "1.5rem 1rem", borderRadius: "12px"}}
      ><Link to="/dashboard" className="font-bold">Back to Dashboard</Link></Button>
    }
  />
);

export default NotFound;
