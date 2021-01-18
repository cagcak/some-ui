import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1 class="page-header">{{ 'Home' | translate }}</h1>
    <div fxLayout="row" fxLayoutAlign="center center">
      <figure>
        <blockquote
          cite="https://www.goodreads.com/author/quotes/2793859.Mustafa_Kemal_Atat_rk"
        >
          <p>
            {{
              'Authority, without any condition and reservation, belongs to the nation.'
                | translate
            }}
          </p>
        </blockquote>
        <figcaption>
          —{{ teller }}, <cite>{{ 'The Great Speech' | translate }}</cite>
        </figcaption>
      </figure>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  teller = 'Mustafa Kemal Atatürk';
}
