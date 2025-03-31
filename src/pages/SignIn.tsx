import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginService } from '../api/auth/authService';
import { useToast } from '../context/ToastContext';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../context/AuthContext';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = () => {
  const { showToast } = useToast();
  const { login } = useAuth();

  const { mutate } = useMutation({
    mutationFn: loginService,
    onSuccess: async (data) => {
      const { token, user } = data;
      login(token, user);
      navigate('/');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      // console.log(error);
      const errorMessage =
        error?.response?.data?.message || 'Đăng nhập thất bại!';
      showToast(errorMessage, { type: 'error' });
    },
  });

  const navigate = useNavigate();
  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // e.preventDefault();
    if (!email || !password) {
      showToast('Vui lòng nhập đầy đủ email và mật khẩu!', { type: 'warning' });
      return;
    }

    mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl h-auto bg-white max-[700px]:p-[50px] max-[500px]:p-[30px] py-[70px] px-[50px] rounded-2xl shadow-lg"
      >
        <h2 className="text-[32px] font-semibold text-center mb-4">
          Đăng nhập
        </h2>
        <p className="text-center text-gray-600 mb-[40px] text-[18px]">
          Vui lòng nhập email và mật khẩu để tiếp tục
        </p>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-[30px]">
                <label
                  className="block text-gray-700 text-[18px] font-medium mb-[15px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full h-[56px] p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-green-400'
                  }`}
                  id="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-[30px]">
                <label
                  className="block text-gray-700 text-[18px] font-medium mb-[15px]"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <Field
                  name="password"
                  type="password"
                  className={`w-full h-[56px] p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password && touched.password
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-green-400'
                  }`}
                  id="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex items-center justify-between mb-[30px]">
                <label className="flex items-center max-[400px]:text-[16px] text-[18px] text-gray-600">
                  <input type="checkbox" className="mr-2 w-[24px] h-[24px]" />{' '}
                  Nhớ mật khẩu
                </label>
                <Link
                  to="#"
                  className="max-[400px]:text-[16px] text-[18px] text-gray-500 hover:text-green-700"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <motion.button
                type="submit"
                className="w-full h-[56px] bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Đăng Nhập
              </motion.button>
            </Form>
          )}
        </Formik>

        <p className="text-center max-[400px]:text-[16px] text-[20px] text-gray-600 mt-4">
          Bạn chưa có tài khoản?{' '}
          <Link to={'/sign-up'} className="text-blue-500 hover:underline">
            Tạo tài khoản
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
