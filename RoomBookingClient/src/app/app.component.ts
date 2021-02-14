import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './services/http.service';
import { Booking } from './_interfaces/movie.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  bookings!: Booking[];
  bookForm!: FormGroup;
  model!: Booking; 
  submittedModel!: Booking; 
  powers!: string[];
  submitted: boolean = false;
  message: any;
  
  constructor(private httpService: HttpService,private formBuilder: FormBuilder,private http: HttpClient) { }
  
  ngOnInit() { 

    this.bookForm =new FormGroup({
      'checkin': new FormControl(null),
      'checkout': new FormControl(null),
      'roomid': new FormControl(null)
   })    
   }

    public getBooking = () => {
    let route: string = 'https://localhost:44310/api/booking/';
    
    this.httpService.getData(route)
    .subscribe((result) => {
      this.bookings = result as Booking[];
    },
    (error) => {
      console.error(error);
    });
  }

  onSubmit({ value, valid }: { value: Booking, valid: boolean }) {
    var formData: any = new FormData();
    formData.append("checkin", value.checkin);
    formData.append("checkout", value.checkout);
    formData.append("roomid", value.roomid);
   
    this.http.post<Booking>('https://localhost:44310/api/booking/',  formData  ).subscribe({
      next: data => {        
          responseType: 'text';
          this.message = "Booking Successful!" ;
      },
      error: error => {
          this.message = "Booking failed!";
          console.error('There was an error!', error);
      }
   })
   } 

   DeleteBooking(bookingId: number) {  

    let route: string = 'https://localhost:44310/api/booking/DeleteBooking/' + bookingId;    

    if (confirm("Are You Sure To Delete this Informations")) {  
      this.httpService.getData(route)
      .subscribe((result) => {              
                this.message = "Deleted Successfully";  
                this.getBooking();  
      },
      (error) => {
        console.error(error);
      });
    }  
   }
}


