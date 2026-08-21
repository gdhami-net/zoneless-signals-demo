import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <h1>Life without Zone.js</h1>

      <section>
        <h2>Signals: change detection that knows what changed</h2>
        <p>
          Clicks: <strong>{{ clicks() }}</strong> · doubled:
          <strong>{{ doubled() }}</strong>
        </p>
        <button type="button" (click)="increment()">click me</button>
      </section>

      <section>
        <h2>The mutation nobody announces</h2>
        <p>
          One second after load, a <code>setTimeout</code> writes
          <code>99</code> to both fields below. Without Zone.js, nothing tells
          Angular about the plain field — the value changed, the screen didn't.
        </p>
        <p>plain field: <strong>{{ plainField }}</strong> (stays 0 on screen — the bug)</p>
        <p>signal: <strong>{{ announced() }}</strong> (updates — the fix)</p>
      </section>
    </main>
  `,
})
export class AppComponent {
  readonly clicks = signal(0);
  readonly doubled = computed(() => this.clicks() * 2);

  // The classic zoneless casualty: mutated in a timer callback, never
  // announced. Zone.js used to paper over this; nothing does now.
  plainField = 0;

  readonly announced = signal(0);

  constructor() {
    setTimeout(() => {
      this.plainField = 99; // changes the value, not the screen
      this.announced.set(99); // changes both
    }, 1000);
  }

  increment(): void {
    this.clicks.update((n) => n + 1);
  }
}
