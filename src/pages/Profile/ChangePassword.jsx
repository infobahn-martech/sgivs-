const ChangePassword = () => {
  return (
    <form className="change-pass">
      <div className="mb-3 row input-grp">
        <div className="col-md-6 input-wrp">
          <label className="form-label">Old password</label>
          <input
            type="password"
            className="form-control"
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
          <span className="error">Please check fields</span>
        </div>
      </div>
      <div className="mb-3 row input-grp">
        <div className="col-md-6 input-wrp">
          <label className="form-label">New password</label>
          <input
            type="password"
            className="form-control"
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
          <span className="error">Please check fields</span>
        </div>
        <div className="col-md-6 input-wrp">
          <label className="form-label">Re-enter the new password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter the new password"
            minLength={8}
            required
          />
          <span className="error">Please check fields</span>
        </div>
      </div>
      <div className="bottom-btn-sec">
        <button type="reset" className="btn btn-cancel">
          Clear
        </button>
        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
