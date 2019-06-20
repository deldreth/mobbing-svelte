<script>
  export let message;
  export let attribution;
  export let link = false;
</script>

<style>
  .quote {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>

<div class="quote nes-container is-dark">
  <p class="text-left">{message}</p>
  <p class="text-right">
    {#if link}
      <a target="_blank" class="nes-text is-primary" href={link}>
        - {attribution}
      </a>
    {:else}- {attribution}{/if}
  </p>
</div>
