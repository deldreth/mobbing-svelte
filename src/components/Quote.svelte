<script>
  export let message;
  export let attribution;
  export let link = false;
</script>

<div class="quote box">
  <p class="text-left">{message}</p>
  <p class="text-right">
    {#if link}
      <a target="_blank" class="nes-text is-primary" href={link}>
        - {attribution}
      </a>
    {:else}- {attribution}{/if}
  </p>
</div>
