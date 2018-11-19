<template>
<div class="lodop_chart_line">
  <div class="charttitle">
    {{charttitle}}
  </div>
  <div class="legend">
    <a class="A">产品A</a>
    <a class="B">产品B</a>
  </div>
  <svg>
    <defs>
      <filter x="0" y="0" width="1" height="1" id="solid">
        <feFlood flood-color="#FFFFCC"/>
        <feComposite in="SourceGraphic"/>
      </filter>
    </defs>
    <path :d='path' stroke='black'></path>
    <path :d='pathA' stroke='blue' stroke-width=3 :fill='type=="bar"?"blue":"none"'></path>
    <path :d='pathB' stroke='red' stroke-width=3 :fill='type=="bar"?"red":"none"'></path>
    <text v-for='(item,index) in xlabelpoint' :x=item.x :y=item.y>{{index+1}}号</text>
    <text v-for='(item,index) in ylabelpoint' :x=item.x :y=item.y>{{index*100}}</text>
    <template v-for='(item,index) in valueA' v-if='type=="line"'>
        <rect :x='item.x-(rectsize["text_"+index]?rectsize["text_"+index].w:0)/2'
        :y='item.y-12-(rectsize["text_"+index]?rectsize["text_"+index].h:0)/2'
        :width='rectsize["text_"+index]?rectsize["text_"+index].w:0'
        :height='rectsize["text_"+index]?rectsize["text_"+index].h:0'  fill='#FFFFCC' stroke='black' stroke-width='1'></rect>
        <text :ref='"text_"+index'   :x='item.x' :y='item.y-10' style="font-size:12px;">{{parseInt(item.y/yunit/5*100)}}</text>
    </template>
    <template v-for='(item,index) in valueB'  v-if='type=="line"'>
        <rect :x='item.x-(rectsize["text_"+index]?rectsize["text_"+index].w:0)/2'
        :y='item.y-12-(rectsize["text_"+index]?rectsize["text_"+index].h:0)/2'
        :width='rectsize["text_"+index]?rectsize["text_"+index].w:0'
        :height='rectsize["text_"+index]?rectsize["text_"+index].h:0'  fill='#FFFFCC' stroke='black' stroke-width='1'></rect>
        <text :ref='"text_"+index'   :x='item.x' :y='item.y-10' style="font-size:12px;">{{parseInt(item.y/yunit/5*100)}}</text>
    </template>

    <template v-for='(item,index) in valueA' v-if='type=="bar"'>
        <rect :x='item.x-(rectsize["text_"+index]?rectsize["text_"+index].w:0)/2-10'
        :y='item.y-12-(rectsize["text_"+index]?rectsize["text_"+index].h:0)/2'
        :width='rectsize["text_"+index]?rectsize["text_"+index].w:0'
        :height='rectsize["text_"+index]?rectsize["text_"+index].h:0'  fill='#FFFFCC' stroke='black' stroke-width='1'></rect>
        <text :ref='"text_"+index'   :x='item.x-10' :y='item.y-10' style="font-size:12px;">{{parseInt(item.y/yunit/5*100)}}</text>
    </template>
    <template v-for='(item,index) in valueB'  v-if='type=="bar"'>
        <rect :x='item.x-(rectsize["text_"+index]?rectsize["text_"+index].w:0)/2+10'
        :y='item.y-12-(rectsize["text_"+index]?rectsize["text_"+index].h:0)/2'
        :width='rectsize["text_"+index]?rectsize["text_"+index].w:0'
        :height='rectsize["text_"+index]?rectsize["text_"+index].h:0'  fill='#FFFFCC' stroke='black' stroke-width='1'></rect>
        <text :ref='"text_"+index'   :x='item.x+10' :y='item.y-10' style="font-size:12px;">{{parseInt(item.y/yunit/5*100)}}</text>
    </template>
  </svg>
  <div class="chartfoot">
    {{chartfoot}}
  </div>
</div>
</template>
<script>
export default {
  props: ["width", "height", "type","charttitle","chartfoot"],
  data() {
    return {
      startx: 40,
      starty: 0,
      xunit: 10,
      yunit: 8,
      valueA: [],
      valueB: [],
      rectsize: {}
    }
  },
  computed: {
    endx() {
      return this.width - 30;
    },
    endy() {
      return this.height - 20;
    },
    path() {
      return this.xypath + this.xpoint + this.ypoint;
    },
    xdata() {
      return ['周一', '周二', '周三', '周四', '周五', '周六', '，周日'];
    },
    ydata() {
      return [100, 200, 300, 400, 500];
    },
    xypath() {
      var line = ['M'];
      var point = this.startx + ' ' + this.endy;
      line.push(this.startx + ' ' + this.starty);
      line.push(" L");
      line.push(point);
      line.push(' M' + point);
      line.push(" L");
      line.push(this.endx + ' ' + this.endy);
      return line.join('');
    },
    xpoint() {
      var n = this.width / this.xunit;
      var points = [];
      var sx = this.startx;
      var sy = this.endy;
      for (var i = 0; i < n; i++) {
        points.push(" M" + sx + " " + sy);
        points.push(" L" + sx + " " + (i % 5 == 0 ? sy + 8 : sy + 3));
        sx += this.xunit;
        if (sx > this.endx)
          break;
      }
      return points.join('');
    },
    ypoint() {
      var n = this.height / this.yunit;
      var sx = this.startx;
      var sy = this.endy;

      var points = [];
      for (var i = 0; i < n; i++) {
        points.push(" M" + sx + " " + sy);
        points.push(" L" + (i % 5 == 0 ? sx - 8 : sx - 3) + " " + sy);
        sy -= this.yunit;
        if (sy < this.starty)
          break;
      }
      return points.join('');
    },
    xlabelpoint() {
      var n = (this.width / this.xunit) - 1;
      var points = [];
      var sx = this.startx;
      if (this.type == "bar") {
        sx += this.xunit * 5;
      }
      var sy = this.endy + 25;
      for (var i = 0; i < n; i++) {
        if (i % 5 == 0)
          points.push({
            x: sx,
            y: sy
          });
        sx += this.xunit;
        if (sx > this.endx)
          break;
      }
      return points;
    },
    ylabelpoint() {
      var n = this.height / this.yunit;
      var sx = this.startx;
      var sy = this.endy;

      var points = [];
      for (var i = 0; i < n; i++) {
        if (i % 5 == 0)
          points.push({
            x: sx - 20,
            y: sy
          });
        sy -= this.yunit;
        if (sy < this.starty)
          break;
      }
      return points;
    },
    linepathA() {
      var point = [];
      for (var i = 0; i < this.valueA.length; i++) {
        var item = this.valueA[i];
        point.push(item.x + " " + item.y);
      }
      return "M" + point.join(" L");
    },
    linepathB() {
      var point = [];
      for (var i = 0; i < this.valueB.length; i++) {
        var item = this.valueB[i];
        point.push(item.x + " " + item.y);
      }
      return "M" + point.join(" L");
    },
    barpathA() {
      var point = [];
      var w = this.xunit * 5;
      for (var i = 0; i < this.valueA.length; i++) {
        var item = this.valueA[i];
        point.push(" M");
        point.push(item.x - w / 2 + 5 + " " + this.endy);
        point.push(" L");
        point.push(item.x - w / 2 + 5 + " " + item.y);
        point.push(" L");
        point.push(item.x + " " + item.y);
        point.push(" L");
        point.push(item.x + " " + this.endy);
        point.push(" Z");
      }
      return point.join("");
    },
    barpathB() {
      var point = [];
      var w = this.xunit * 5;
      for (var i = 0; i < this.valueB.length; i++) {
        var item = this.valueB[i];
        point.push(" M");
        point.push(item.x + w / 2 - 5 + " " + this.endy);
        point.push(" L");
        point.push(item.x + w / 2 - 5 + " " + item.y);
        point.push(" L");
        point.push(item.x + " " + item.y);
        point.push(" L");
        point.push(item.x + " " + this.endy);
        point.push(" Z");
      }
      return point.join("");
    },
    pathA() {
      if (this.type == 'line')
        return this.linepathA;
      else if (this.type == "bar")
        return this.barpathA;
    },
    pathB() {
      if (this.type == 'line')
        return this.linepathB;
      else if (this.type == "bar")
        return this.barpathB;
    }
  },
  methods: {
    getserialval() {
      var serialpoint = [];
      var nx = this.width / this.xunit;
      var ny = this.height / this.yunit;
      var startx = this.startx;
      var max = this.endy;
      var min = 0;
      if (this.type == "bar") {
        nx -= 1;
        startx += this.xunit * 5;
      }
      for (var i = 0; i < nx; i = i + 5) {
        var x = this.xunit * i + startx;
        if (x > this.endx)
          x = this.endx;
        var yv = Math.floor(Math.random() * (max - min + 1) + min);
        serialpoint.push({
          x: x,
          y: yv
        });
      }
      this.$nextTick(function() {
        this.rectsize = {};
        debugger
        for (var key in this.$refs) {
          var box = this.$refs[key][0].getBBox();
          this.rectsize[key] = {
            w: box.width + 4,
            h: box.height + 4
          }
        }
      })
      return serialpoint;
    }
  },
  watch: {
    'width' (v) {
      this.valueA = this.getserialval();
      this.valueB = this.getserialval();
    },
    'height' (v) {
      this.valueA = this.getserialval();
      this.valueB = this.getserialval();
    },
    "type"(v){
      this.valueA = this.getserialval();
      this.valueB = this.getserialval();
    }
  },
  mounted() {
    this.valueA = this.getserialval();
    this.valueB = this.getserialval();
  }
}
</script>
<style lang='less'>
.lodop_chart_line {
    width: 100%;
    height: 100%;
    padding: 40px 50px 20px 20px;
    position: relative;
    .charttitle {
        position: absolute;
        top: 10px;
        left: 0;
        width: 100%;
        height: 20px;
        text-align: center;
    }
    .chartfoot {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        text-align: center;
    }
    svg {
        width: 100%;
        height: 100%;
        text {
            text-anchor: middle;
            font-size: 12px;
            dominant-baseline: middle;
        }
    }
    .legend {
        border: 1px solid black;
        padding: 0 3px;
        position: absolute;
        top: 10px;
        right: 10px;
        a {
            display: block;
            &::before {
                content: '';
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: blue;
                margin-right: 2px;
                border: 1px solid black;
            }
        }
        .A {
            &::before {
                background-color: blue;
            }
        }
        .B {
            &::before {
                background-color: red;
            }
        }
        font-size: 12px;
    }
}
</style>
