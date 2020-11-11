using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI1.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        // GET: api/<EmployeeController>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {

            List<Employee> oEmployees = new List<Employee>()
            {
                new Employee() {Id = 007, FirstName = "James", LastName = "Bond"},
                new Employee() {Id = 1, FirstName = "Robbie", LastName = "Rotten"},
                new Employee() {Id = 2, FirstName = "Pepe", LastName = "Frog"}
            };

            return oEmployees;
        }

    }
}
