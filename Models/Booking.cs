using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace roombooking.Models
{
    public class Booking
    {
        public int id { get; set; }
        public DateTime checkin { get; set; }
        public DateTime checkout { get; set; }
        public int roomid { get; set; }
    }
}
