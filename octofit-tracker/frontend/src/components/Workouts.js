import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results || data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-danger text-white">
        <h2 className="mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        {workouts.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Exercise</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <td>{workout.id || idx + 1}</td>
                    <td>{workout.name || workout.exercise || 'N/A'}</td>
                    <td>{workout.duration || 'N/A'}</td>
                    <td>{workout.calories || 'N/A'}</td>
                    <td>{workout.type || workout.category || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            No workouts found. Add your first workout!
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
