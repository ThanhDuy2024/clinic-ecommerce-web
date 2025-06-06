import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext.tsx';
import PublicPaths from '../../routes/public/pathPublic.ts';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) {
      showToast('Bạn chưa nhập email', { type: 'error' });
      return;
    }
    showToast('Đã gữi mã otp đến email của bạn', { type: 'success' });
    console.log('OTP requested for:', email);
  };
  return (
    <div className="flex items-center justify-center mb-[30px]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-[550px] max-[640px]:w-[400px] max-[430px]:w-[350px]"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[32px] font-semibold text-center text-black"
        >
          Quên mật khẩu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-[18px] text-center mt-2 mb-[40px]"
        >
          Vui lòng nhập email để tiếp tục
        </motion.p>
        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-gray-700 text-[18px] mb-[10px]">
            Email
          </label>
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            type="email"
            placeholder="Ví dụ: levana@gmail.com"
            className="mt-2 w-full p-2 border border-gray-300 rounded-lg h-[56px] mb-[15px] focus:outline-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 h-[50px]"
          >
            Gửi mã OTP
          </motion.button>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-600 mt-4"
        >
          Bạn đã nhớ mật khẩu?{' '}
          <Link
            to={PublicPaths.LOGIN}
            className="text-blue-500 hover:underline"
          >
            Đăng nhập
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
