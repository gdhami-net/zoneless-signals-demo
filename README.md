# zoneless-signals-demo

Companion repo for [Going zoneless in Angular: what breaks, and the safe migration order](https://gdhami.net/blog/going-zoneless-in-angular-what-breaks-and-the-safe-migration-order).

A minimal Angular app with **no zone.js at all** — it isn't in
`package.json`, there's no polyfill, and change detection runs on
`provideZonelessChangeDetection()`.

It demonstrates the two sides of the migration in one screen:

- **Signals just work** — a `signal` + `computed` counter under
  `ChangeDetectionStrategy.OnPush`, updating with no zone anywhere.
- **The mutation nobody announces** — one second after load, a `setTimeout`
  writes to a plain class field *and* to a signal. The signal updates on
  screen; the plain field visibly doesn't. That's the exact class of bug the
  migration order in the post exists to flush out.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:4200 and watch the second section at the
one-second mark.

MIT licensed. Argue with it.
