<script lang="ts">
  import Carousel from "./meltui/Carousel.svelte";
  import tonksHome from "../assets/tonks-cattree.webp";

  const myImages: string[] = [tonksHome, tonksHome, tonksHome];
</script>

<Carousel images={myImages} startIndex={0} height="500px" width="80%" />

<!-- <div class="flex justify-center p-5 w-full">Coming Soon...</div> -->
