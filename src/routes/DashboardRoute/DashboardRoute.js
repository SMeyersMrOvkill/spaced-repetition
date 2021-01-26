import React, { Component } from 'react'

import UserDashboard from '../../components/UserDashboard/UserDashboard';

class DashboardRoute extends Component {
  render() {
    return (
      <section>
        <UserDashboard />
      </section>
    );
  }
}

export default DashboardRoute
