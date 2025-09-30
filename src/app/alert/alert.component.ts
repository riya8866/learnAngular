import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit{
  alertTitle=input<string>('')

  onClose=output<string>()            //output signal

  ngOnInit(): void{               
    this.onClose.emit('')
  }
}
