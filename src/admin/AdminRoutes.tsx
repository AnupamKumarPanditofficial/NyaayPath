import { Routes, Route } from 'react-router-dom';
import AdminAuthOptions from './AdminAuthOptions';
import NationalLogin from './NationalAdmin/NationalLogin';
import NationalDashboard from './NationalAdmin/NationalDashboard';
import CreateStateAdmin from './NationalAdmin/CreateStateAdmin';
import StateLogin from './StateAdmin/StateLogin';
import StateDashboard from './StateAdmin/StateDashboard';
import CreateDistrictAdmin from './StateAdmin/CreateDistrictAdmin';
import DistrictLogin from './DistrictAdmin/DistrictLogin';
import DistrictDashboard from './DistrictAdmin/DistrictDashboard';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={<AdminAuthOptions />} />
      <Route path='/national-login' element={<NationalLogin />} />
      <Route path='/national-dashboard' element={<NationalDashboard />} />
      <Route path='/national-create-state' element={<CreateStateAdmin />} />
      <Route path='/state-login' element={<StateLogin />} />
      <Route path='/state-dashboard' element={<StateDashboard />} />
      <Route path='/state-create-district' element={<CreateDistrictAdmin />} />
      <Route path='/district-login' element={<DistrictLogin />} />
      <Route path='/district-dashboard' element={<DistrictDashboard />} />
    </Routes>
  );
}
