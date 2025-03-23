import { useState } from 'react';
import { motion } from 'framer-motion';
import PublicPaths from '../routes/public/pathPublic';
import { useNavigate } from 'react-router-dom';
import { Register } from '../components/Services/Api/auth_api';
import Alert from '@mui/material/Alert';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{
    type: 'error' | 'warning' | 'info' | 'success';
    content: string;
  }>({
    type: 'error',
    content: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setAlert({
        type: 'error',
        content: 'Bạn chưa nhập đầy đủ thông tin',
      });
      setTimeout(() => {
        setAlert({
          type: 'error',
          content: '',
        });
      }, 5000);
      return;
    }

    try {
      await Register(fullName, email, password);
      navigate(PublicPaths.LOGIN);
    } catch (err) {
      console.log(err);
      setAlert({
        type: 'error',
        content: 'email đã tồn tại',
      });
      setTimeout(() => {
        setAlert({
          type: 'error',
          content: '',
        });
      }, 5000);
    }
  };

  return (
    <>
      {alert.content !== '' && (
        <Alert
          severity={alert.type}
          style={{
            position: 'fixed',
            top: '10px',
            right: '5px',
          }}
        >
          {alert.content}
        </Alert>
      )}
      <div className="flex justify-center">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-[100%] p-6 shadow-lg bg-white rounded-2xl h-[380px]">
              <h2 className="text-center text-[35px] font-bold mb-4">
                Đăng Ký Tài Khoản
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nhập tên:"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 h-[50px]"
                />
                <input
                  type="email"
                  placeholder="Email:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 h-[50px]"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu:"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 h-[50px]"
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
