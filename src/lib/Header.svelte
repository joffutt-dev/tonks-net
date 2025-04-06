<script lang="ts">
  import { goto, type RouteResult } from "@mateothegreat/svelte5-router";
  import Popover from "./meltui/Popover.svelte";
  import OtherAnimalContent from "./header/OtherAnimalContent.svelte";
</script>

<div class="flex p-1 header-bg">
  <button onclick={() => goto(`${import.meta.env.VITE_BASE_URL}`)}>Home</button>
  <button
    class="ml-auto"
    onclick={() => goto(`${import.meta.env.VITE_BASE_URL}/see-tonks`)}
  >
    See Tonks
  </button>
  <button
    class="ml-2"
    onclick={() => goto(`${import.meta.env.VITE_BASE_URL}/about`)}
  >
    About
  </button>
  <Popover label="More Animals" popoverContent={OtherAnimalContent} />
</div>
