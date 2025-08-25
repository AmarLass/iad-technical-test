# Iad coding Challenge

## Fixes

- Fix application not running

> **Console error:**
```text
[plugin:vite:import-analysis] Failed to resolve import "vuetify/lib/components/VApp" from "src/App.vue". Does the file exist?
```

To resolve this error, update your configuration as follows:

**In `vite.config.ts` (Line 31):**
```
vuetify({ autoImport: false })
```

**In `src/main.ts`:**
```ts
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// ...

app.use(createVuetify({
  components,
  directives,
  defaults: {
    VAlert: { variant: `tonal` },
    VCard: {},
    VBtn: { variant: `outlined` },
  },
}));
```
- Fix fetch error in `src/composables/restaurants.ts`
    ```
    # In useFetchRestaurant function
    Line 42:
        replace # const url = `restorants/${restaurantId}`;
        by      # const url = `restaurants/${restaurantId}`;
    ```

## Run the application

```bash
# install the dependencies
$ pnpm

# serve with hot reload at http://localhost:5173 (may change the port if already in use)
$ pnpm start

# run all checks (linter/typescript/test)
$ pnpm test:all

# test with live reload
$ pnpm test

# test unit (no watch/live release)
$ pnpm test:unit

# test coverage
$ pnpm test:coverage
```

## If you don't know VueJS

VueJS comes with a [solid documentation](https://vuejs.org/)  
You might be very interested in [computed properties](https://vuejs.org/guide/essentials/computed.html): it's a way to have derived that from your original one

## Other documentation

### Used libraries

| name               | description          | doc                               |
| ------------------ | -------------------- | --------------------------------- |
| Typescript         | typings in JS        | https://www.typescriptlang.org/   |
| Vue                | web framework        | https://vuejs.org/                |
| Vuetify            | material components  | https://vuetifyjs.com/en/         |
| Vue-Query          | query composables    | https://vue-query.vercel.app/     |
| Ky                 | fetch wrapper        | https://www.npmjs.com/package/ky  |
| Tailwind           | utility classes      | https://tailwindcss.com/          |

### API Endpoints

[API Swagger](http://localhost:5173/api/v3/openapi)
