<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Home from "./lib/Home.svelte";

  import { Router, type RouteConfig } from "@mateothegreat/svelte5-router";
  import SeeTonks from "./lib/SeeTonks.svelte";
  import AboutTonks from "./lib/AboutTonks.svelte";

  const routes: RouteConfig[] = [
    {
      component: Home,
    },
    {
      path: "see-tonks",
      component: SeeTonks,
    },
    {
      path: "about",
      component: AboutTonks,
    },
  ];
</script>

<main>
  <div>
    <Header />
    <div class="flex text-center ml-auto mr-auto">
      <Router {routes} />
    </div>
  </div>
</main>
