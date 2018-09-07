import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import swal from 'sweetalert';
import { LoaderService } from "../../UI/loader/loader.component";
import { ResultService } from "../result-window/result-window.component";
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  map: any;
  selectedReportType;
  reportTypeName;
  show = false;
  reportType=[
    {name:"Water Consumption Report",value:"GetWaterApplication"},
    {name:"Fertilizer Consumption Report",value:"GetFertiliserApplication"},
    {name:"Pesticide Consumption Report",value:"GetPesticideApplication"}
]
  queryURL = "http://192.168.1.14:7700/Service.svc/";
  constructor(
    private globals: Globals,
    private http: HttpClient,
    private loader: LoaderService,  
    private resservice: ResultService,
  ) {
    this.map = this.globals.map
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

  }
  GenerateReport() {
    if (!this.selectedReportType) swal({ text: "Please Select Report Type" });
    else {
      this.reportTypeName = (this.reportType.filter(r => r.value === this.selectedReportType)[0].name) ;
      this.http
        .get(this.queryURL + this.selectedReportType)
        .subscribe((res: any) => {
          
          this.resservice.showReportData(
            {
              response: JSON.parse(res),
              reportType : this.reportTypeName
            }
          
          );
          
        },
          (error) => {
            this.show = true;
            swal({ text: "Something Went Wrong" });
          }
        )
    }
  }


}
