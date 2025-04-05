<script lang="ts">
  import Popover from "./meltui/Popover.svelte";
  let count: number = $state(0);
  const increment = () => {
    count += 1;
  };
</script>

<div class="flex p-2 header-bg">
  <button>Home</button>
  <button class="ml-auto" onclick={increment}> See Tonks </button>
  <Popover />
  <button class="ml-2" onclick={increment}> View Other Cute Pets </button>
</div>

<style>
  .header-bg {
    background-color: #131313;
  }
</style>
