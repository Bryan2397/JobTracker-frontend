const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4">Track Your Job Applications</h1>
          <p className="lead">
            Stay organized, monitor progress, and land your dream job faster.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <h3>Organize</h3>
              <p>
                Keep all your job applications in one place with easy tracking
                tools.
              </p>
            </div>
            <div className="col-md-4">
              <h3>Track</h3>
              <p>
                Monitor application statuses and deadlines with real-time
                updates.
              </p>
            </div>
            <div className="col-md-4">
              <h3>Analyze</h3>
              <p>
                Gain insights into your job search and improve your success
                rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2>Start tracking your job applications today</h2>
          <a href="/signup" className="btn btn-light btn-lg mt-3">
            Sign Up
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2026 JobTracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
