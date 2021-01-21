<template>
  <div class="svgBorder">
    <div class="go-back"
         @click="goBack">返回首页</div>
    <div class="skulls">
    </div>

    <div class="svg-study-box">
      <svg height="100%">
        <!-- Create mask that we'll use to define a slight gradient -->
        <mask maskUnits="userSpaceOnUse"
              id="fade">
          <!-- Here's that slight gradient -->
          <linearGradient id="gradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="100%">
            <stop offset="0"
                  style="stop-color: #FFFFFF"></stop>
            <stop offset="1"
                  style="stop-color: #000000"></stop>
          </linearGradient>
          <!-- The canvas for our mask -->
          <rect fill="url(#gradient)"
                width="100%"
                height="100%"></rect>
        </mask>

        <!-- Let's define the pattern -->
        <!-- The width and height should be double the circle radius we plan to use -->
        <pattern id="pattern-circles"
                 x="0"
                 y="0"
                 width="40"
                 height="40"
                 patternUnits="userSpaceOnUse">
          <!-- Now let's draw the circle -->
          <!-- We're going to define the `fill` in the CSS for flexible use -->
          <circle mask="url(#fade)"
                  cx="20"
                  cy="20"
                  r="20"></circle>
        </pattern>
        <!-- The canvas with our applied pattern -->
        <rect x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"></rect>

      </svg>

      <svg height="100%">

        <!-- Let's define the pattern -->
        <!-- The width and height should be double the size of a single checker -->
        <pattern id="pattern-checkers"
                 x="0"
                 y="0"
                 width="200"
                 height="200"
                 patternUnits="userSpaceOnUse">
          <!-- Two instances of the same checker, only positioned apart on the `x` and `y` axis -->
          <!-- We will define the `fill` in the CSS for flexible use -->
          <rect class="checker"
                x="0"
                width="100"
                height="100"
                y="0"></rect>
          <rect class="checker"
                x="100"
                width="100"
                height="100"
                y="100"></rect>
        </pattern>

        <!-- Define the shape that will contain our pattern as the fill -->
        <rect x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-checkers)"></rect>

      </svg>

      <svg height="100%">

        <!-- Define the pattern -->
        <pattern id="pattern-hex"
                 x="0"
                 y="0"
                 width="112"
                 height="190"
                 patternUnits="userSpaceOnUse"
                 viewBox="56 -254 112 190">

          <!-- Group the hexagon shapes -->
          <!-- Each path could have a class for more styling/animating options -->
          <!-- We're going to control the fill and stroke in the CSS for flexibility -->
          <g id="hexagon">
            <path
                  d="M168-127.1c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-0.3 c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5C167-127,167.5-127.1,168-127.1 L168-127.1z">
            </path>
            <path
                  d="M112-222.5c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2l-53.4,30.5 c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5 C111-222.4,111.5-222.5,112-222.5L112-222.5z">
            </path>
            <path
                  d="M168-317.8c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-191 c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5 C167-317.7,167.5-317.8,168-317.8L168-317.8z">
            </path>
          </g>

        </pattern>

        <!-- The canvas for our pattern -->
        <rect x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-hex)"></rect>

      </svg>

      <svg width="100%"
           height="100%">
        <!-- Define the pattern -->
        <pattern id="pattern-cubes"
                 x="0"
                 y="126"
                 patternUnits="userSpaceOnUse"
                 width="126"
                 height="200"
                 viewBox="0 0 10 16">

          <g id="cube">
            <!-- We'll apply the `fill` in the CSS for flexibility -->
            <path class="left-shade"
                  d="M0 0l5 3v5l-5 -3z"></path>
            <path class="right-shade"
                  d="M10 0l-5 3v5l5 -3"></path>
          </g>

          <!-- Apply the cube shapes -->
          <use x="5"
               y="8"
               xlink:href="#cube"></use>
          <use x="-5"
               y="8"
               xlink:href="#cube"></use>

        </pattern>

        <!-- The canvas for our pattern -->
        <rect x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-cubes)"></rect>

      </svg>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style lang="scss" scoped>
.svgBorder {
  padding: 30px;
  width: 100%;
  height: 100%;

  .go-back {
    display: inline-block;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    color: #f56c6c;
    padding-top: 20px;
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
    z-index: 1;
  }

  .skulls {
    position: relative;
    padding-top: 16px;
    max-width: 500px;
    height: 250px;
    margin: 0 auto;
    // border: 24px solid;
    // border-image: url("~@/assets/svgBorderOne.svg") 32 round;
    border: 64px solid;
    border-image: url("~@/assets/svgBorderTwo.svg") 64 round;
  }

  // .skulls:before {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   display: block;
  //   background: url('data:image/svg+xml;utf8,<svg width="24" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="m16.779 11.591c-0.344 0.085-0.515-0.296-0.541-0.610-0.063-0.740 0.076-1.182 0.008-1.576-0.076-0.447 0.192-1.170-0.420-0.931-0.348 0.136-0.059 0.488 0.067 0.857 0.125 0.370 0.093 1.615 0.093 1.877 0.000 0.455 0.282 0.722 1.033 0.967 0.864 0.282 0.176 2.121-0.657 2.332-0.866 0.219-1.352-0.324-1.972-0.227-1.095 0.171-0.876 1.138-1.095 1.451-0.219 0.313-0.219 0.313-0.594 0.654-0.276 0.251-0.457 0.452-0.650 0.611 0.030 0.024 0.052 0.065 0.057 0.134 0.024 0.299 0.288 0.528 0.288 0.827 0.000 0.299-0.105 0.405-0.527 0.490-0.422 0.086-0.608-0.064-0.632-0.191-0.023-0.128 0.035-0.595 0.103-0.844 0.022-0.082 0.053-0.132 0.086-0.166-0.343 0.056-0.771 0.078-1.071 0.078-0.011 0.000-0.022 0.000 -0.033 0.000 0.073 0.044 0.152 0.120 0.201 0.256 0.119 0.324 0.137 0.569 0.161 0.761 0.023 0.192-0.258 0.256-0.540 0.277-0.282 0.021-0.610-0.064-0.657-0.171-0.047-0.106 0.031-0.551 0.079-0.781 0.029-0.140 0.186-0.261 0.307-0.336-0.317 0.006-0.655 0.017-1.000 0.022 0.092 0.090 0.182 0.200 0.204 0.306 0.048 0.231 0.152 0.576 0.129 0.725-0.024 0.149-0.094 0.192-0.540 0.214-0.446 0.021-0.596-0.043-0.643-0.128-0.047-0.086 0.034-0.597 0.090-0.808 0.030-0.113 0.123-0.224 0.208-0.307-0.278-0.003-0.556-0.013-0.825-0.033 0.066 0.167 0.368 0.453 0.288 0.913-0.045 0.256-0.177 0.363-0.785 0.364-0.352 0.001 -0.515-0.214-0.516-0.363-0.002-0.409 0.188-0.694 0.288-0.987-0.338-0.035-0.543-0.060-0.710-0.123 0.023 0.138 0.114 0.502 0.163 0.875 0.031 0.234-0.094 0.363-0.399 0.363-0.305 0.000-0.493-0.149-0.493-0.277 0.000-0.341 0.552-0.976 0.597-1.003 0.005-0.003 0.010-0.007 0.015-0.011-0.032-0.018-0.064-0.037-0.096-0.060-0.282-0.199-0.626-0.482-0.809-1.204-0.183-0.722-0.118-1.162-0.729-1.495-0.611-0.333-1.712 0.464-2.262 0.412-0.612-0.058-1.387-1.172-1.436-1.697-0.058-0.613 0.600-0.329 0.974-1.105 0.238-0.494 0.001-1.112 0.001-2.500 0.000-1.388 0.525-2.095 0.857-2.776 0.241-0.496-0.093-0.864 0.332-2.160 0.364-1.106 0.691-1.518 0.691-1.518s-0.586 0.438-0.929 1.470c-0.305 0.914-0.212 1.374-0.456 2.096-0.244 0.722-0.614 1.197-0.797 2.307-0.183 1.110 0.124 2.464-0.183 2.913-0.207 0.302-0.893-0.024-0.982-1.139-0.077-0.956-0.213-2.846-0.030-3.956 0.183-1.110 0.291-0.698 0.937-2.739 0.761-2.406 4.081-3.871 8.044-3.920 3.462-0.043 4.728 0.977 5.859 1.948 1.180 1.013 2.003 2.430 2.253 3.340 0.250 0.910 0.469 1.288 0.626 2.056 0.157 0.768 0.072 1.883-0.080 2.438-0.170 0.617-0.503 1.696-0.952 1.808zm-9.499-2.444c-0.446-0.640-1.644-0.751-2.558-0.789-1.009-0.043-1.562 0.240-1.666 0.939-0.085 0.564 0.023 1.408 0.235 2.026 0.184 0.538 0.915 1.259 1.549 1.173 0.509-0.069 1.595-0.808 2.230-1.472 0.379-0.397 0.426-1.569 0.211-1.877zm1.408 1.728c-0.235 0.015-0.587 0.725-0.751 1.621-0.108 0.590-0.539 1.415-0.446 1.920 0.062 0.339 0.409 0.388 0.610 0.021 0.164-0.298 0.258-0.576 0.493-0.576 0.235 0.000 0.753 1.250 1.056 1.216 0.350-0.039 0.782-0.533 0.728-1.152-0.047-0.533-0.282-1.067-0.634-1.621-0.352-0.555-0.823-1.444-1.056-1.429zm5.703-1.728c-0.352-0.427-0.962-0.789-2.159-0.725-0.990 0.053-1.976 0.416-2.065 1.024-0.093 0.640 0.106 0.974 0.493 1.408 0.399 0.448 1.525 1.323 2.252 1.365 0.728 0.043 1.361-0.107 1.455-0.768 0.094-0.661 0.375-1.877 0.023-2.304zm-1.619 10.389c0.563-0.512 0.470-1.387 0.704-2.496 0.234-1.109 0.657-1.451 0.938-1.834 0.282-0.384 0.954-0.332 1.033-0.171 0.094 0.192-0.193 1.487-0.469 2.325-0.422 1.280-0.446 1.792-0.469 2.453-0.020 0.565-1.009 1.003-1.525 1.451-0.517 0.448-0.986 1.280-1.619 1.451-0.634 0.171-1.526-0.128-2.488-0.107-0.962 0.021-1.924 0.235-2.441 0.064-0.516-0.170-1.103-0.960-1.760-1.493-0.657-0.534-1.432-0.854-1.666-1.365-0.235-0.512 0.000-1.131-0.047-1.920-0.047-0.789-0.282-1.280-0.516-1.749-0.235-0.469-0.079-0.808 0.305-0.938 0.563-0.192 0.962 0.235 1.244 1.045 0.294 0.846 0.555 1.343 0.610 2.048 0.070 0.896 0.211 1.066 0.540 1.386 0.187 0.183 0.532 0.292 0.895 0.383-0.067-0.160-0.127-0.368-0.097-0.746 0.015-0.192 0.188-0.256 0.563-0.277 0.376-0.021 0.624 0.064 0.634 0.235 0.032 0.563-0.119 0.803-0.227 0.992 0.202 0.028 0.500 0.045 0.843 0.054-0.127-0.232-0.262-0.499-0.263-0.940-0.001 -0.253 0.211-0.213 0.563-0.234 0.352-0.021 0.714-0.025 0.727 0.192 0.027 0.439-0.138 0.724-0.288 0.992 0.253 0.000 0.510-0.002 0.757-0.005-0.103-0.289-0.193-0.662-0.140-0.987 0.021-0.129 0.329-0.171 0.611-0.192 0.281-0.021 0.624 0.105 0.634 0.256 0.021 0.333-0.090 0.655-0.217 0.907 0.169-0.004 0.316-0.008 0.427-0.011 0.106-0.003 0.213-0.010 0.320-0.020-0.121-0.208-0.239-0.470-0.225-0.683 0.010-0.172 0.422-0.534 0.751-0.512 0.262 0.017 0.542 0.068 0.557 0.196 0.031 0.270-0.062 0.563-0.177 0.808 0.368-0.125 0.708-0.308 0.981-0.556z" fill="red"/></svg>');
  //   background-position: 0px 0;
  //   animation: moveSkulls 1s infinite linear;
  //   content: " ";
  //   height: 24px;
  // }

  @keyframes moveSkulls {
    0% {
      background-position: 24px 0;
    }
  }

  .svg-study-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 300px;
    flex-wrap: wrap;
    svg {
      margin-top: 30px;
    }

    circle {
      fill: orange;
    }

    .checker {
      fill: #000;
    }

    #hexagon {
      path {
        fill: #fff;
        stroke: orange;
        stroke-width: 20;
      }
    }

    .left-shade {
      fill: orange;
    }
    .right-shade {
      fill: lighten(orange, 30%);
    }
  }
}
</style>
