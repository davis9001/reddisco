<script lang="ts">
  import { onMount } from "svelte"
  import { subreddits } from "$lib"

  let inviteLink = ""
  let postTitle = ""
  let promptAdvice = ""

  let disableDiscordButton = false
  let disableAIButton = false

  const fetchServerDescription = async (inviteCode: string) => {
    try {
      const response = await fetch(
        `https://discord.com/api/invites/${inviteCode}`
      )
      if (!response.ok) {
        throw new Error("Invalid invite link")
      }
      const data = await response.json()
      postTitle = data.guild
        ? data.guild.description
        : "Server description not available"
    } catch (error) {
      console.error(error)
      postTitle = "Error retrieving server description"
    }
  }

  const inviteCodeFromInput = (input: string) => {
    // Regular expression to match the invite code
    const regex = /(https:\/\/discord\.gg\/)?([a-zA-Z0-9]+)/
    // Match the URL or code
    const match = input.match(regex)
    // Extract the code from the matched groups
    if (match && match[2]) {
      return match[2]
    } else {
      return "" // If no match found
    }
  }

  const handleDiscordSubmit = async () => {
    if (inviteLink.trim() !== "") {
      disableDiscordButton = true
      const inviteCode = inviteCodeFromInput(inviteLink)
      await fetchServerDescription(inviteCode)
      disableDiscordButton = false
    }
  }

  async function assistTitleWithAI() {
    disableAIButton = true
    const response = await fetch(
      `/api/ai?postTitle=${encodeURIComponent(postTitle)}&promptAdvice=${encodeURIComponent(promptAdvice)}`
    ).catch((error) => {
      console.error("Error:", error)
    })

    const data = await response?.json()
    postTitle = data.generatedPostTitle

    disableAIButton = false
  }

  onMount(() => {
    // fetchServerDescription()
  })
</script>

<main
  class="text-center min-h-svh bg-gradient-to-tr from-indigo-900 to-emerald-900 text-white p-8"
>
  <div class="flex flex-col gap-5 container max-w-5xl mx-auto">
    <h1 class="text-3xl">Discord Server Reddit Post Helper</h1>
    <div>
      <label>
        <div class="mb-2">Enter Discord Invite Link:</div>
        <input
          type="text"
          bind:value={inviteLink}
          placeholder="Discord Invite Link (https://discord.gg/[code])"
          class="border border-gray-300 rounded p-2 h-12 w-full text-white bg-transparent text-center"
        />
      </label>
      <div>
        <button
          on:click={handleDiscordSubmit}
          disabled={disableDiscordButton}
          class="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 my-2 rounded w-full"
          >{disableDiscordButton
            ? "Loading..."
            : "Get Server Description"}</button
        >
      </div>
    </div>
    <label>
      <div class="mb-2">Post Title:</div>
      <textarea
        type="text"
        bind:value={postTitle}
        placeholder="Reddit Post Title"
        class="border border-gray-300 rounded p-2 h-12 w-full text-white bg-transparent text-center"
      />
    </label>
    <label>
      <div class="mb-2">AI Prompt:</div>
      <input
        type="text"
        bind:value={promptAdvice}
        placeholder="AI prompt direction to help generate better post titles (optional)"
        class="border border-gray-300 rounded p-2 h-12 w-full text-white bg-transparent text-center"
      />
    </label>
    <button
      on:click={assistTitleWithAI}
      disabled={disableAIButton}
      class="bg-red-800 hover:bg-red-900 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded"
      >{disableAIButton ? "Loading..." : "AI Assist Title"}</button
    >
    <div>
      <h4 class="text-xl">Subreddits (ctrl+click):</h4>
      <div class="flex flex-col gap-2">
        {#each Object.entries(subreddits) as [category, links]}
          <h2 class="text-md mt-2">{category}:</h2>
          {#each links as subreddit}
            <a
              href="{subreddit}submit?title={postTitle}&url={inviteLink}"
              class="bg-amber-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded overflow-hidden"
              target="_blank"
            >
              {subreddit}
            </a>
          {/each}
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
</style>
