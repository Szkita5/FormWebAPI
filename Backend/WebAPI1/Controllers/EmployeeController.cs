using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI1.Data;
using WebAPI1.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext ec;

        public EmployeeController(DataContext ec)
        {
            this.ec = ec;
        }

        // GET: api/employee
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await ec.Employees.ToListAsync();
            return Ok(employees);
        }

        // GET: api/employee
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            Employee employee = await ec.Employees.FindAsync(id);
            return Ok(employee);
        }

        // POST: api/employee/add?firstname=John&lastname=Johnson 
        [HttpPost("add")]
        public async Task<IActionResult> AddEmployee(string firstName, string lastName)
        {
            Employee newEmployee = new Employee();
            newEmployee.FirstName = firstName;
            newEmployee.LastName = lastName;
            await ec.Employees.AddAsync(newEmployee);
            await ec.SaveChangesAsync();
            return Ok(newEmployee);
        }

        // POST: api/employee/post --Post data in JSON format
        [HttpPost("post")]
        public async Task<IActionResult> AddEmployee(Employee newEmployee)
        {
            await ec.Employees.AddAsync(newEmployee);
            await ec.SaveChangesAsync();
            return Ok(newEmployee);
        }

        // POST: api/employee/delete --Delete employee by Id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            Employee employee = await ec.Employees.FindAsync(id);
            ec.Employees.Remove(employee);
            await ec.SaveChangesAsync();
            return Ok(id);
        }

    }
}
