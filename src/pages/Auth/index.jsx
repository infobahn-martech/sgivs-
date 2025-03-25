import React from 'react';
import '../../assets/scss/common.scss';
import '../../assets/scss/forms.scss';
import '../../assets/scss/footer.scss';
import '../../assets/scss/signin.scss';
import logo from '../../assets/images/logo.svg';

const Login = () => {
  return (
    <div class="user-log-wrp">
      <div class="inner-wrp">
        <div class="panel-left">
          <div class="logo-wrp">
            <img src={logo} alt="" />
          </div>
          <div class="quotes-wrp">
            Today is a new day. It's your day. You shape it.
            <br /> Sign in to start managing your projects
          </div>
        </div>
        <div class="panel-right">
          <div class="form-wrp-center login">
            <div class="top-blk">
              <div class="title">
                Welcome Back <span class="icon">👋</span>
              </div>
              <div class="desc">
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your projects.
              </div>
            </div>
            <div class="form-sec-wrp">
              <div class="form-group">
                <label class="form-label" for="">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  value="Example@email.com"
                />
                <span class="error">please check fields</span>
              </div>
              <div class="form-group">
                <label class="form-label" for="">
                  Password
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  value="Example@email.com"
                />
                <span class="error">please check fields</span>
              </div>
              <a href="#" class="link">
                Forgot Password?
              </a>
              <button class="btn btn-rounded">Login</button>
            </div>
          </div>
          <footer class="ftr">
            <p class="copy">© 2023 ALL RIGHTS RESERVED</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
