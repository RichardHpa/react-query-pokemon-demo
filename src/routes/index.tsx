import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';

import { Home } from './Home';
import { Users, AddUser, EditUser, User } from './Users';

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Home />} />
      <Route path="users">
        <Route index element={<Users />} />
        <Route path="add" element={<AddUser />} />
        <Route path=":userId">
          <Route index element={<User />} />
          <Route path="edit" element={<EditUser />} />
        </Route>
      </Route>
    </RouterRoutes>
  );
};
