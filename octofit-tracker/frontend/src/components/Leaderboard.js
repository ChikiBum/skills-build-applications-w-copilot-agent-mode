import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaders(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning text-dark">
        <h2 className="mb-0">🏆 Leaderboard</h2>
      </div>
      <div className="card-body">
        {leaders.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Points</th>
                  <th>Activities</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx} className={idx < 3 ? 'table-warning' : ''}>
                    <td><strong>{idx + 1}</strong></td>
                    <td>{leader.name || leader.username || 'N/A'}</td>
                    <td>{leader.points || leader.score || '0'}</td>
                    <td>{leader.activities || leader.activity_count || '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            No leaderboard data available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
