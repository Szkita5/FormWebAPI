using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI1.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public DateTimeOffset Birthday { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
