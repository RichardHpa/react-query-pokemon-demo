import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { Home } from './Home';
import { Users, AddUser } from './Users';

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<Home />} />
      <Route path="users">
        <Route index element={<Users />} />
        <Route path="add" element={<AddUser />} />
      </Route>
    </RouterRoutes>
  );
};
