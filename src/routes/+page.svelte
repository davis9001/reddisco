<script lang="ts">
  import { onMount } from "svelte"

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

<main class=" text-center min-h-svh bg-slate-950 text-white p-8">
  <div class="container max-w-5xl mx-auto">
    <h1 class="text-3xl">Discord Server Description</h1>
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
          >Get Description</button
        >
      </div>
    </div>
    <label for="">
      Post Title:
      <input
        type="text"
        bind:value={postTitle}
        class="border border-gray-300 rounded p-2 m-2 h-12 w-full text-black text-center"
      />
    </label>
    <input
      type="text"
      class="border border-gray-300 rounded p-2 m-2 h-12 w-full text-black text-center"
      placeholder="AI Summary of Server"
    />
    <button
      on:click={handleSubmit}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Get Description</button
    >
  </div>
</main>
