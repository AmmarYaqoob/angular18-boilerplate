import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.css']
})
export class AlertCardComponent {
  @Input() Heading;
  @Input() Message;
  @Input() Type;
}
