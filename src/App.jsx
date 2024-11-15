import { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import AddEditEmployee from './components/AddEditEmployee';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/employees/${id}`, {
        method: 'DELETE',
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSubmit = async (employee) => {
    try {
      const method = employee.id ? 'PUT' : 'POST';
      const url = employee.id 
        ? `http://localhost:3001/employees/${employee.id}`
        : 'http://localhost:3001/employees';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      fetchEmployees();
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Employee Management System</h1>
      <AddEditEmployee 
        onSubmit={handleSubmit}
        employee={editingEmployee}
        onCancel={() => setEditingEmployee(null)}
      />
      <EmployeeList 
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
