<template>
  <div class="page-index">
    <div class="c-body" id="wrapper">
      <div class="c-body-wrap" id="scroller">
        <div class="c-body-inner">
          <div v-if="banner" class="c-banner">
            <img v-bind:src="banner"/>
          </div>
          <div class="c-content">
            <div v-if="goodsInfo.length" class="c-g-list">
              <div v-for="item in goodsInfo" class="g-item">

                <div v-on:click="jumpDetails(item.goodsId)" class="g-item-inner">
                  <div class="g-img">
                    <img v-bind:src="item.picIcon"/>
                  </div>
                  <div class="g-intro">
                    <div class="g-name">{{item.goodsTitle}}</div>
                    <div class="g-price">

                      <div v-if="item.pricePoint!=null" class="g-price-inner">
                        {{item.pricePoint}}
                      </div>
                      <div v-else>
                        <div v-if="item.minUnion!=null" class="g-price-inner">
                          {{item.minUnion.unionPoint}} + ￥{{item.minUnion.unionRmb}}
                        </div>
                      </div>

                      <del v-if="item.minPointRegular!=null" class="g-price-inner g-price-regular">
                        {{item.minPointRegular}}
                      </del>
                      <div v-else>
                        <del v-if="item.minUnionRegular!=null" class="g-price-inner g-price-regular">
                          {{item.minUnionRegular.unionPoint}} + ￥{{item.minUnionRegular.unionRmb}}
                        </del>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
              <div v-if="next" class="scroll-loader">上拉加载更多...</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style>

</style>
<script>

  var AlloyTouch = require('alloytouch');
  var Transform = require('css3transform');

  window.scrollHei;
  module.exports = {
    data: function () {
      return {
        banner: "",
        next: false,
        pageNum: 1,
        goodsInfo: []
      }
    },
    ready: function () {

      var
        self = this,
        scroller = document.querySelector("#scroller"),
        scrollHei = document.querySelector("#scroller").clientHeight,
        hei = (scrollHei > window.innerHeight) ? (window.innerHeight - scrollHei) : 0;


      if (GOKU.PIC_URL && GOKU.PIC_URL != "") {
        self.banner = GOKU.PIC_URL;
      }

      APP.SET_REFRESH();
      /*  Transform(scroller, true);
       var AT = new AlloyTouch({
       touch: "#wrapper",//反馈触摸的dom
       vertical: true,//不必需，默认是true代表监听竖直方向touch
       target: document.querySelector("#scroller"), //运动的对象
       property: "translateY",  //被运动的属性
       initialValue: 0,
       bindSelf: true,
       min: 0,
       max: 0,
       change: function (value) {
       //console.log(document.documentElement.clientHeight);
       },
       touchMove: function (evt, value) {
       var diff = this.min - value;
       if (diff > 50) {
       $(".scroll-loader").html("正在更新数据...");
       } else {
       $(".scroll-loader").html("上拉加载更多...");
       }
       },
       touchEnd: function (evt, value) {
       var diff = this.min - value;
       if (diff > 50) {
       console.log("距离底部还有100像素的时候就加载");

       /!*
       self.loadMore(function () {
       self.$nextTick(function () {
       var scrollHei = document.querySelector("#scroller").clientHeight;
       var hei = scrollHei > window.innerHeight ? (window.innerHeight - scrollHei - 70) : 0;
       AT.min = hei;
       });
       })
       *!/
       }
       }
       });*/


      self.loadMore(function () {
        /* self.$nextTick(function () {
         var scrollHei = document.querySelector("#scroller").clientHeight;
         var hei = scrollHei > window.innerHeight ? (window.innerHeight - scrollHei) : 0;
         AT.min = hei;
         });*/
      });

    },
    methods: {
      jumpDetails: function (id) {
        APP.JUMP_TO(GOKU.JUMP_URL + id+"&hotSale=Y");
      },
      loadMore: function (fn, at) {
        var self = this;
        $.ajax({
          url: GOKU.INITIAL_LINK,
          type: "get",
          beforeSend: function () {
            APP.LOADING("更新数据...");
          },
          success: function (res) {
            APP.CLOSE_LOADING();
            if (res.stat == "ok") {
              console.log(res);
              if (res.targetList && res.targetList.length) {
                self.goodsInfo = res.targetList
              }
              if (fn) fn();

            } else {
              APP.TOAST(res.msg, 2);
            }
          },
          error: function (err) {
            APP.CLOSE_LOADING();
            APP.TOAST(err, 2);
          }
        })
      }
    }
  }
</script>
