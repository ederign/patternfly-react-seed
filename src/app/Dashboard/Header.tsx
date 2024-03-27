import * as React from 'react';
const Header: React.FunctionComponent = () => (
  <>
    <section className="pf-v5-c-page__main-breadcrumb pf-m-limit-width">
      <div className="pf-v5-c-page__main-body">
        <nav className="pf-v5-c-breadcrumb" aria-label="breadcrumb">
          <ol className="pf-v5-c-breadcrumb__list" role="list">
            <li className="pf-v5-c-breadcrumb__item">
              <a href="#" className="pf-v5-c-breadcrumb__link">
                Home
              </a>
            </li>
            <li className="pf-v5-c-breadcrumb__item">
              <span className="pf-v5-c-breadcrumb__item-divider">
                <i className="fas fa-angle-right" aria-hidden="true"></i>
              </span>

              <a href="#" className="pf-v5-c-breadcrumb__link pf-m-current" aria-current="page">
                Workspaces
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </section>
    <section className="pf-v5-c-page__main-section pf-m-limit-width pf-m-light">
      <div className="pf-v5-c-page__main-body">
        <div className="pf-v5-c-content">
          <h1>Kubeflow Workspaces</h1>
          <p>View your existing workspaces or create new workspaces.</p>
        </div>
      </div>
    </section>
  </>
);

export { Header };
