import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../../assets/scss/common.scss';
import '../../assets/scss/forms.scss';
import '../../assets/scss/footer.scss';
import '../../assets/scss/signin.scss';
import useAuthReducer from '../../stores/AuthReducer';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

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
    // login({ ...data, platform: "web" });
    navigate('/');
  };

  return (
    <div className="user-log-wrp">
      <div className="inner-wrp">
        {/* ✅ LEFT PANEL (UPDATED) */}
        <div className="panel-left no-bg">
          <div className="quotes-wrp">
            The access to Indian Consular Application CRM system is restricted
            to authorized personnel only. You are informed that its use must be
            limited only to the authorized users as mentioned in the security
            policy and all the access will be registered and logged.
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="panel-right">
          <div className="form-wrp-center login">
            <div className="top-blk">
              <div className="title">
                Welcome Back <span className="icon">👋</span>
              </div>
              <div className="desc">
                Today is a new day. It's your day. You shape it.
                <br /> Sign in to start managing your projects.
              </div>
            </div>

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

                <button className="btn btn-rounded" type="submit">
                  {isLoginLoading ? (
                    <Spinner
                      size="sm"
                      as="span"
                      animation="border"
                      variant="light"
                      aria-hidden="true"
                      className="custom-spinner"
                    />
                  ) : (
                    'Login'
                  )}
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
