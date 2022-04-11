import { Component } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CityValidatorDirective } from '../../shared/validation/city.validator';

@Component({
  selector: 'flight-search-reactive',
  templateUrl: 'flight-search-reactive.component.html',
  providers: [FlightService],
  styleUrls: ['flight-search-reactive.component.css'],
})
export class FlightSearchReactiveComponent {
  public flights: Array<Flight> = [];
  public selectedFlight: Flight;

  public filter: FormGroup;

  public formDesc = [];

  constructor(private flightService: FlightService, private fb: FormBuilder) {
    this.formDesc.push({
      label: 'Von',
      name: 'from',
    });

    this.formDesc.push({
      label: 'Nach',
      name: 'to',
    });

    this.filter = fb.group({
      from: [
        'São Paulo',
        [
          Validators.required,
          Validators.minLength(3),
          (c: AbstractControl): any => {
            if (c.value != 'São Paulo' && c.value != 'Rio de Janeiro') {
              return {
                city: true,
              };
            }
            return {};
          },
        ],
      ],
      to: ['Rio de Janeiro'],
    });

    this.filter.valueChanges.subscribe((e) => {
      console.debug('formular changed', e);
    });

    this.filter.controls['from'].valueChanges.subscribe((e) => {
      console.debug('from changed', e);
    });
  }

  public select(f: Flight): void {
    this.selectedFlight = f;
  }

  public search(): void {
    var value = this.filter.value;

    this.flightService.find(value.from, value.to);

    // .map(function(resp) { return resp.json() })
  }
}
