using System;
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

        // GET: api/employee/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            Employee employee = await ec.Employees.FindAsync(id);
            employee.birthDate = employee.birthDate.Date;
            return Ok(employee);
        }

        // POST: api/employee/post --Post data in JSON format
        [HttpPost("post")]
        public async Task<IActionResult> AddEmployee(Employee newEmployee)
        {
            await ec.Employees.AddAsync(newEmployee);
            await ec.SaveChangesAsync();
            return Ok(newEmployee);
        }

        // PUT: api/employee/edit --Put updated employee in JSON format
        [HttpPut("edit")]
        public async Task<IActionResult> ModifyEmployee(Employee newEmployee)
        {
            Employee oldEmployee = await ec.Employees.FindAsync(newEmployee.id);
            if (oldEmployee != null)
            {
                oldEmployee.firstName = newEmployee.firstName;
                oldEmployee.lastName = newEmployee.lastName;
                oldEmployee.gender = newEmployee.gender;
                oldEmployee.birthDate = newEmployee.birthDate;
                oldEmployee.email = newEmployee.email;
                oldEmployee.phoneNumber = newEmployee.phoneNumber;
                await ec.SaveChangesAsync();
            } else
            {
                return NotFound("No employee with specified Id.");
            }

            return Ok(newEmployee);
        }

        // DELETE: api/employee/delete --Delete employee by Id
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
