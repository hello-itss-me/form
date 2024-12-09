import React from 'react';
import { Toaster } from 'react-hot-toast';
import { MotorAssemblyForm } from './components/MotorAssemblyForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <MotorAssemblyForm />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;