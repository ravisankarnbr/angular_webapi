using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using roombooking.Models;
using System.Net.Http;
using System.Net;


namespace roombooking.Controllers
{
    public class BookingController : ApiControllerAttribute
    {
        private readonly DBContext _dbcontext;


        public BookingController(DBContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        // [ProducesDefaultResponseType(typeof(JsonResult<Booking>))]
        [HttpGet]
        [Route("/api/booking/")]
        public IEnumerable<Booking> Get()
        {
            var bookingDetails = _dbcontext.BookingRecords.Select(x => x).ToList();
            return bookingDetails;

        }

        [HttpPost]
        [Route("/api/booking/")]
        public async Task<string> Post([FromForm] Booking book)
        {
            try
            {
                _dbcontext.BookingRecords.AddRange(new Booking
                {
                    roomid = book.roomid,
                    checkin = book.checkin,
                    checkout = book.checkout,
                });
                await _dbcontext.SaveChangesAsync();
                return "Booking Successful!";

            }
            catch (Exception)
            {
                return "Booking falied!";
                throw;
            }
        }

        [HttpGet("/api/booking/DeleteBooking/{id}")]       
        public object DeleteBooking(int id)
        {
            try
            {
                var obj = _dbcontext.BookingRecords.Where(s => s.id == id).ToList<Booking>().FirstOrDefault();
                _dbcontext.BookingRecords.Remove(obj);
                _dbcontext.SaveChanges();
                return new
                { Status = "Success", Message = "SuccessFully Delete." };
            }
            catch (Exception ex)
            {
                return new
                { Status = "Error", Message = ex.Message.ToString() };
            }
        }
    }

}
