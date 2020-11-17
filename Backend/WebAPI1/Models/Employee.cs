using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI1.Models
{
    public class Employee
    {
        public int id { get; set; } = 0;

        public string firstName { get; set; } = "";

        public string lastName { get; set; } = "";

        public int gender { get; set; } = 0;

        public DateTime birthDate { get; set; } = new DateTime();

        public string email { get; set; } = "";

        public int phoneNumber { get; set; } = 0;
    }
}
