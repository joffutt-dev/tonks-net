<script>
  import SullyAvatar from "../../assets/sully-avatar.webp";
  //TODO replace with Yuji
  import YujiAvatar from "../../assets/yujiavatar.webp";
  import { createSeparator } from "@melt-ui/svelte";

  const {
    elements: { root: horizontal },
  } = createSeparator({
    orientation: "horizontal",
    decorative: true,
  });
</script>

<div class="bg-emerald-800 shadow-lg py-3 min-w-36">
  <ul>
    <li>
      <button
        class="ghost"
        onclick={() => window.open(import.meta.env.VITE_SULLY_URL, "_blank")}
        ><div class="flex">
          <img
            src={SullyAvatar}
            alt="Avatar"
            class="h-6 w-6 rounded-[inherit]"
          />
          <p class="ml-2">Sully</p>
        </div>
      </button>
    </li>
    <div
      {...$horizontal}
      use:horizontal
      class="my-3.5 h-[1px] w-full bg-emerald-950"
    ></div>
    <li class="">
      <button
        class="ghost"
        onclick={() => window.open(import.meta.env.VITE_YUJI_URL, "_blank")}
        ><div class="flex">
          <img
            src={YujiAvatar}
            alt="Avatar"
            class="h-6 w-6 rounded-[inherit]"
          />
          <p class="ml-2">Yuji</p>
        </div>
      </button>
    </li>
  </ul>
</div>
