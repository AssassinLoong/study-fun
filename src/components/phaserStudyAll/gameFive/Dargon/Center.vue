<template>
  <div class="_center-wrap">
    <div class="_center"><slot /></div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
._center-wrap {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
._center {
  position: relative;
  overflow: visible;
  width: 1px;
  height: 1px;
}
</style>
