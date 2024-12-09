import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Wrench } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { InputField } from './InputField';

export const MotorAssemblyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    motorId: '',
    employeeId: '',
    assemblyDate: '',
    assemblyTime: '',
    bearingId: '',
    fanId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);

      // Insert bearing replacement record
      if (formData.bearingId) {
        const { data: bearingData, error: bearingError } = await supabase
          .from('motor_assembly')
          .insert([
            {
              motor_id: formData.motorId,
              employee_id: formData.employeeId,
              assembly_date: formData.assemblyDate,
              assembly_time: formData.assemblyTime,
              part_id: formData.bearingId,
            },
          ])
          .select();

        if (bearingError) {
          console.error('Error inserting bearing data:', bearingError);
          throw bearingError;
        }
        console.log('Bearing data inserted successfully:', bearingData);
      }

      // Insert fan replacement record
      if (formData.fanId) {
        const { data: fanData, error: fanError } = await supabase
          .from('motor_assembly')
          .insert([
            {
              motor_id: formData.motorId,
              employee_id: formData.employeeId,
              assembly_date: formData.assemblyDate,
              assembly_time: formData.assemblyTime,
              part_id: formData.fanId,
            },
          ])
          .select();

        if (fanError) {
          console.error('Error inserting fan data:', fanError);
          throw fanError;
        }
        console.log('Fan data inserted successfully:', fanData);
      }

      toast.success('Данные успешно сохранены');
      setFormData({
        motorId: '',
        employeeId: '',
        assemblyDate: '',
        assemblyTime: '',
        bearingId: '',
        fanId: '',
      });
    } catch (error: any) {
      console.error('Detailed error:', error);
      toast.error(
        `Ошибка при сохранении данных: ${error.message || 'Неизвестная ошибка'}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Wrench className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Регистрация сборки электродвигателя</h2>
      </div>

      <InputField
        label="ID Электродвигателя"
        type="text"
        value={formData.motorId}
        onChange={(value) => setFormData({ ...formData, motorId: value })}
        required
        placeholder="Введите ID электродвигателя"
      />

      <InputField
        label="ID Сотрудника"
        type="text"
        value={formData.employeeId}
        onChange={(value) => setFormData({ ...formData, employeeId: value })}
        required
        placeholder="Введите ID сотрудника"
      />

      <InputField
        label="Дата Сборки"
        type="date"
        value={formData.assemblyDate}
        onChange={(value) => setFormData({ ...formData, assemblyDate: value })}
        required
      />

      <InputField
        label="Время Сборки"
        type="time"
        value={formData.assemblyTime}
        onChange={(value) => setFormData({ ...formData, assemblyTime: value })}
        required
      />

      <InputField
        label="Замена Подшипника (ID)"
        type="text"
        value={formData.bearingId}
        onChange={(value) => setFormData({ ...formData, bearingId: value })}
        placeholder="Введите ID подшипника"
      />

      <InputField
        label="Замена Вентилятора (ID)"
        type="text"
        value={formData.fanId}
        onChange={(value) => setFormData({ ...formData, fanId: value })}
        placeholder="Введите ID вентилятора"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
};