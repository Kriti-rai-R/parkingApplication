import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-parking-ticket-tool',
    templateUrl: './parking-ticket-tool.component.html',
    styleUrls: ['./parking-ticket-tool.component.css'],
    imports: [CommonModule,FormsModule],
    standalone: true
})
export class ParkingTicketToolComponent implements OnInit {

    constructor(private http: HttpClient) { 

    }
    parkedVehicles: any[] = []; 
    parkingObject: any = {
       "licence_plate":"",
       "mobileNo":"",
       "vehicle_type":"",  
       "entry_date":"string",
       "ticket_amount":"",
    }

    ngOnInit() : void {
        this.loadAllParking();
    }

    loadAllParking() {
        this.http.get('https://api.example.com/data').subscribe((res:any) => {
            const sortedData = res.data.sort();
            this.parkedVehicles = sortedData;
        }, error => {
            console.error('Error loading data', error);
        });
    }

    assignedVehicleType(vehicle_type: string) {
        this.parkingObject.vehicle_type = vehicle_type;
    }
    
    assignedTicketAmount(ticket_amount: number) {
        this.parkingObject.ticket_amount = ticket_amount;
    }

    createParking(){
        this.http.post('https://api.example.com/data', this.parkingObject).subscribe((res:any) => {
            if(res.status == 200){
                alert("Parking Created Successfully");
            this.loadAllParking();
            this.resetForm();
        }}, error => {
            console.error('Error creating parking', error);
        });
    }

    resetForm() {
        this.parkingObject = {
            "licence_plate":"",
            "mobileNo":"",
            "vehicle_type":"",  
            "entry_date":"",
            "ticket_amount":"",
         }
    }
    markOut(licence_plate:string){
        this.http.get('https://api.example.com/data' + licence_plate).subscribe((res:any) => {
            if(res.status == 200){
                alert("Vehicle Marked Out");
            this.loadAllParking();
        }}, error => {
            console.error('Error in Vehicle Marked Out', error);
        });
    }
}