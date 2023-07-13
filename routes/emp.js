
const express = require("express");
const empRouter = express.Router();
const {EmployeeModel} = require("../model/emp.model");

empRouter.post('/employees', async (req, res) => {
    try {
      const employeeData = req.body;
  
  
      const employee = await EmployeeModel.create(employeeData);
  
  
      res.json(employee);
    } catch (error) {
     
      res.status(500).json({ error: 'Failed to add employee' });
    }
  });
  

  empRouter.put('/employees/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
      const updatedEmployeeData = req.body;
  
     
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        employeeId,
        updatedEmployeeData,
        { new: true }
      );
  
      
      res.json(updatedEmployee);
    } catch (error) {
      
      res.status(500).json({ error: 'Failed to update employee' });
    }
  });
  
  // DELETE route for removing employees
  empRouter.delete('/employees/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
  
     
      await EmployeeModel.findByIdAndRemove(employeeId);
  
      
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
     
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  });
  
  // GET route for retrieving employees with pagination, filter, search, and sort options
  empRouter.get('/employees', async (req, res) => {
    try {
      const { page, limit, department, search, sort } = req.query;
      const query = {};
  
      
      if (department) {
        query.department = department;
      }
  
      
      if (search) {
        query.firstName = { $regex: search, $options: 'i' };
      }
  
      
      const totalCount = await EmployeeModel.countDocuments(query);
  
      
      const sortOptions = sort ? { salary: sort === 'asc' ? 1 : -1 } : {};
  
      
      const employees = await EmployeeModel.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      
      res.json({
        totalCount,
        employees,
      });
    } catch (error) {
      
      res.status(500).json({ error: 'Failed to retrieve employees' });
    }
  });

module.exports = {empRouter};