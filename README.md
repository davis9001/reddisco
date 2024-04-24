# Reddisco

This is a web app using Svelte and Cloudflare Pages and Workers.

## Developing

After cloning the repo to your workstation, copy the `.env-example` file into `.env` and replace the values with your own.

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

> I like to use [cloudflare](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/)
