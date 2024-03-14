<script lang="ts">
  import { page } from "$app/stores"

  const gtag = process.env.GOOGLEANALYTICS_PROP_ID

  $: {
    if (typeof gtag !== "undefined") {
      gtag("config", gtag, {
        page_title: document.title,
        page_path: $page.url.pathname,
      })
    }
  }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id={gtag}">
  </script>
  <script>
    window.dataLayer = window.dataLayer || []

    function gtag() {
      dataLayer.push(arguments)
    }

    gtag("js", new Date())
    gtag("config", "MEASUREMENT_ID")
  </script>
</svelte:head>
