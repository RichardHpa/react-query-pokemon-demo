import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';

import { Home } from './Home';
import { Users, AddUser, EditUser, User } from './Users';
import { Cards, AddCard, Card } from './Cards';
import { Error404 } from './Errors';

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

      <Route path="cards">
        <Route index element={<Cards />} />
        <Route path="add" element={<AddCard />} />
        <Route path=":cardId">
          <Route index element={<Card />} />
        </Route>
      </Route>

      <Route path="*" element={<Error404 />} />
    </RouterRoutes>
  );
};
