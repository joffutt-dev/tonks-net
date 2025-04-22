<script lang="ts">
  import Carousel from "./Carousel.svelte";
  import tonksHome from "../assets/tonks-cattree.webp";
  import cuteTonks1 from "../assets/IMG_0095.webp";
  import cuteTonks2 from "../assets/IMG_0499.webp";
  import cuteTonks3 from "../assets/IMG_0564.webp";
  import cuteTonks4 from "../assets/IMG_0790.webp";
  import cuteTonks5 from "../assets/IMG_1014.webp";
  import cuteTonks6 from "../assets/IMG_1595.webp";
  import cuteTonks7 from "../assets/IMG_2784.webp";
  import cuteTonks8 from "../assets/IMG_3292.webp";
  import cuteTonks9 from "../assets/IMG_5479.webp";

  const myImages: string[] = [
    cuteTonks1,
    tonksHome,
    cuteTonks2,
    cuteTonks3,
    cuteTonks4,
    cuteTonks5,
    cuteTonks6,
    cuteTonks7,
    cuteTonks8,
    cuteTonks9,
  ];
</script>

<Carousel images={myImages} startIndex={0} height="500px" width="80%" />

<!-- <div class="flex justify-center p-5 w-full">Coming Soon...</div> -->
