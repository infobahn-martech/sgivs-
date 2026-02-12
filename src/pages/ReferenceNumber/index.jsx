import React, { useState } from 'react';

const ReferenceNumber = () => {
  const [arnNumbers, setArnNumbers] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!arnNumbers.trim()) {
      setError('ARN Numbers are required');
      return;
    }

    setError('');

    // Convert textarea into array (each line = one ARN)
    const arnArray = arnNumbers
      .split('\n')
      .map((num) => num.trim())
      .filter((num) => num !== '');

    console.log('Submitted ARN Numbers:', arnArray);

    // 👉 Call API here if needed

    alert('Submitted Successfully!');
    setArnNumbers('');
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h4 className="mb-3">ARN Numbers</h4>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">
              ARN Numbers ( Each Number should be in new Line )
              <span className="text-danger">*</span>
            </label>

            <textarea
              style={{ minBlockSize: "500px" }}
              className="form-control"
              rows={6}
              placeholder={`ARN123456\nARN987654\nARN111222`}
              value={arnNumbers}
              onChange={(e) => setArnNumbers(e.target.value)}
            />

            {error && <span className="text-danger">{error}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#051a53' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReferenceNumber;
