import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../../assets/scss/common.scss';
import '../../assets/scss/forms.scss';
import '../../assets/scss/footer.scss';
import '../../assets/scss/signin.scss';
import logo from '../../assets/images/logo.svg';
import useAuthReducer from '../../stores/AuthReducer';
import { Link, useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email format'),
  password: z.string().nonempty('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoginLoading } = useAuthReducer((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login({ ...data, platform: 'web' });
  };

  return (
    <div className="user-log-wrp">
      <div className="inner-wrp">
        <div className="panel-left">
          <div className="logo-wrp">
            <img src={logo} alt="Logo" />
          </div>
          <div className="quotes-wrp">
            Today is a new day. It's your day. You shape it. Sign in to
            <br />
            start managing your projects.
          </div>
        </div>
        <div className="panel-right">
          <div className="form-wrp-center login">
            <div className="top-blk">
              <div className="title">
                Welcome Back <span className="icon">👋</span>
              </div>
              <div className="desc">
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your projects.
              </div>
            </div>
            {/* Wrap the form fields inside a form element */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-sec-wrp">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="error">{errors.password.message}</span>
                  )}
                </div>
                <Link
                  className="link"
                  onClick={() => {
                    navigate('/forgot-password');
                  }}
                >
                  Forgot Password?
                </Link>
                {/* Change button type to submit to enable Enter key functionality */}
                <button className="btn btn-rounded" type="submit">
                  {isLoginLoading ? 'Loading...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
          <footer className="ftr">
            <p className="copy">© 2025 ALL RIGHTS RESERVED</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
