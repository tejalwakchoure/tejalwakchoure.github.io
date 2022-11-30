<script>
  export let data;
  export let xScale;
  export let yScale;
</script>

<div id="tooltip" style="
    position: absolute;
    top: {yScale(data.hours)}px;
    left: {xScale(data.grade)}px;">
    <p class="bold">{data.name}</p>
    <p class="small">{data.hours} hours studied</p> 
</div>

<style>
  #tooltip {
    width: fit-content;
    padding: 10px;
    background: white;
    pointer-events: none;
    transition: all 300ms ease;
    border-radius: 2px;
    box-shadow: 0 0 5px 0px gray;
  }
  p {
    margin: 0;
  }
</style>