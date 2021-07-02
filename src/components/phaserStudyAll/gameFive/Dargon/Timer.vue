<template>
  <section class="_count-down-wrap">
    <slot :day="day"
          :hour="hour"
          :minute="minute"
          :second="second"
          :ms="ms"
          :counting="counting" />
  </section>
</template>

<script>
export default {
  props: ["inited", "paused"],
  data: () => ({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    ms: 0,
    timer: null,
    end: 0,
    counting: false
  }),
  mounted() {
    if (typeof this.inited === "function") {
      this.inited();
    }
  },
  methods: {
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      clearInterval(this.timer);
      this.timer = null;
      this.day = 0;
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
      this.end = 0;
      this.ms = 0;
    },
    start(end) {
      this.reset();
      if (!end || this.end !== 0) return;
      this.counting = true;
      this.end = end;
      let restTime = this.end;
      this.format(restTime);
      clearInterval(this.timer);
      this.timer = setInterval(this.countTime, 100);
    },
    countTime() {
      try {
        if (this.paused) {
          return;
        }
        this.end -= 100;
        let restTime = this.end;
        this.format(restTime);
      } catch (e) {
        console.warn("'count down' error:", e);
        this.reset();
      }
    },
    format(restTime) {
      if (restTime > 0) {
        let ms = Math.floor(restTime % 1000);
        restTime = Math.floor(restTime / 1000);
        let second = Math.floor(restTime % 60);
        restTime = Math.floor(restTime / 60);
        let minute = Math.floor(restTime % 60);
        restTime = Math.floor(restTime / 60);
        let hour = Math.floor(restTime % 24);
        restTime = Math.floor(restTime / 24);
        let day = Math.floor(restTime % 60);
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.ms = ms;
      } else {
        this.reset();
        this.counting = false;
        this.$emit("end");
      }
    }
  },
  watch: {}
};
</script>

<style scoped></style>
