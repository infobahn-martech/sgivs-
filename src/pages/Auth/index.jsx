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
    <div className="user-log-wrp login-v2">
      <div className="inner-wrp login-v2__inner">
        {/* LEFT PANEL */}
        <div className="panel-left login-v2__left">
          <div className="login-v2__left-card">
            <div className="login-v2__left-title">Access Notice</div>
            <div className="login-v2__left-desc">
              The access to Indian Consular Application CRM system is restricted
              to authorized personnel only. You are informed that its use must
              be limited only to the authorized users as mentioned in the
              security policy and all the access will be registered and logged.
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="panel-right login-v2__right">
          <div className="form-wrp-center login login-v2__form-card">
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
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-control login-v2__input"
                    placeholder="Enter your email"
                    autoComplete="username"
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </div>

                <div
                  className={`form-group ${errors.password ? 'has-error' : ''
                    }`}
                >
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control login-v2__input"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="error">{errors.password.message}</span>
                  )}
                </div>

                <div className="login-v2__actions">
                  <Link
                    className="link login-v2__forgot"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  className="btn btn-rounded login-v2__btn"
                  type="submit"
                  disabled={isLoginLoading}
                >
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

          <footer className="ftr login-v2__footer">
            <p className="copy">© 2025 ALL RIGHTS RESERVED</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
