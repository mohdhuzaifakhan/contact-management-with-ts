import { FC, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MapAndCharts from './MapAndCharts';
import Sidebar from './components/Sidebar';
import NavigationButton from './components/NavigationButton';
import Home from './Home';
import ContactsForm from './components/ContactsForm';
import ContactView from './components/ContactView';

interface AppProps {}

const App: FC<AppProps> = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* <CustomeSidebar /> */}
      <div className='flex'>
        <Sidebar open={open} setOpen={setOpen} />
        <div className='fixed top-3 left-2 h-8 w-8 rounded-full'>
          <NavigationButton open={open} setOpen={setOpen} />
        </div>
        <div className='w-full'>
          <Routes>
            <Route  path='/' element={<Home />} />
            <Route  path='/maps' element={<MapAndCharts />} />
            <Route  path='/user/:id' element={<ContactView />} />
            <Route  path='/create-contact' element={<ContactsForm />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
