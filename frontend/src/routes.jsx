import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index.jsx';
import ListUsers from './pages/users/list';

// import your route components too

function Routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Index />} />
          <Route path="users" element={<ListUsers />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routes;
