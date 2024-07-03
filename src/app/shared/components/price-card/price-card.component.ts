import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.css']
})
export class PriceCardComponent {
  @Input() Text: string;
  @Input() Price: string;
  @Input() Currency: string;
  @Input() Icon: string;
}
