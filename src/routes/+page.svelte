<script lang="ts">
  import { onMount } from "svelte"
  import { subreddits } from "$lib"

  let inviteLink = ""
  let postTitle = ""

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

  const handleSubmit = () => {
    if (inviteLink.trim() !== "") {
      const inviteCode = inviteCodeFromInput(inviteLink)
      console.log(inviteCode)
      fetchServerDescription(inviteCode)
    }
  }

  onMount(() => {
    // fetchServerDescription()
  })
</script>

<main class="text-center min-h-svh bg-slate-950 text-white p-8">
  <div class="flex flex-col gap-5 container max-w-5xl mx-auto">
    <h1 class="text-3xl">Discord Server Reddit Post Helper</h1>
    <div>
      <label>
        Enter Discord Invite Link:
        <input
          type="text"
          bind:value={inviteLink}
          class="border border-gray-300 rounded p-2 m-2 h-12 w-full text-black text-center"
        />
      </label>
      <div>
        <button
          on:click={handleSubmit}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >Get Server Description</button
        >
      </div>
    </div>
    <label for="">
      Post Title:
      <input
        type="text"
        bind:value={postTitle}
        placeholder="Reddit Post Title"
        class="border border-gray-300 rounded p-2 m-2 h-12 w-full text-black text-center"
      />
    </label>
    <label>
      AI Prompt:
      <input
        type="text"
        placeholder="AI prompt direction to help generate better post titles (optional)"
        class="border border-gray-300 rounded p-2 m-2 h-12 w-full text-black text-center"
        disabled
      />
    </label>
    <button
      on:click={handleSubmit}
      disabled
      class="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded"
      >AI Revamp Title</button
    >
    <div>
      <h4 class="text-xl m-2">Subreddits (ctrl+click):</h4>
      <div class="flex flex-col gap-2">
        {#each Object.entries(subreddits) as [category, links]}
          <h2 class="text-md mt-2">{category}:</h2>
          {#each links as subreddit}
            <a
              href="{subreddit}/submit?title={postTitle}&url={inviteLink}"
              class="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded overflow-hidden"
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
