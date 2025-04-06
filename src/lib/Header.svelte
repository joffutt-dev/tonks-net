<script lang="ts">
  import { goto, type RouteResult } from "@mateothegreat/svelte5-router";
  import Popover from "./meltui/Popover.svelte";
  import OtherAnimalContent from "./header/OtherAnimalContent.svelte";
</script>

<div class="flex p-1 header-bg">
  <button onclick={() => goto("/")}>Home</button>
  <button class="ml-auto" onclick={() => goto("/see-tonks")}>
    See Tonks
  </button>
  <button class="ml-2" onclick={() => goto("/about")}> About </button>
  <Popover label="More Animals" popoverContent={OtherAnimalContent} />
</div>
