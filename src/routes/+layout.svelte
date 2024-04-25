<script>
  import "../app.css"
  import Analytics from "$lib/analytics.svelte"
</script>

<Analytics />

<slot class="m-0 p-0" />

<footer class="text-center bg-black text-white p-8">
  <a href="https://starspace.group" target="_blank" class="font-bold"
    >Brought to you by *Space</a
  >
  | <i>Made with SvelteKit and hosted on Cloudflare</i> |
  <a
    href="https://github.com/davis9001/reddisco"
    target="_blank"
    class="font-bold">Open Source on Github</a
  >
</footer>
