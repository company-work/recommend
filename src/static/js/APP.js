/**
 * Created by mmcai on 2015/11/30.
 * QQ:3248544136
 * Email:caimengmeng@docard.net
 * update:2015/11/30
 */

module.exports = {
  /**
   * info
   *   ANDROID: 是否安卓系统
   *   DEVICE_INFO: 设备信息-->页面初始化的时候需要调用DEVICE_INFO()
   *   IPHONE: 是否ios系统
   *
   *   function
   *   APP_LIST(): 获取客户app列表
   *   ALERT(): 警告
   *   BACK(): 后退
   *   CHOOSE_ADDRESS(): 选择地址
   *   CLOSE_LOADING(): 关闭loading
   *   DEVICE(): 获取设备信息
   *   IS_INSTALL_APP(): 是否安装app
   *   IS_SUPPORT_API(): 是否支持api接口
   *   JUMP_TO(url): 跳转到某个页面
   *   LOGIN(): 登陆
   *   LOADING(): 显示loading
   *   MID_MENU(menus,index,handle): 下拉菜单
   *   NETWORK_STATUS()： 网络状态
   *   OPENWEBSITE(): 打开外部浏览器
   *   PAGE_WILL_LOAD(): 页面初始加载
   *   REFRESH(): 页面刷新
   *   SET_REFRESH(): 设置顶部刷新
   *   TOAST(): 提示
   *
   *
   */
  name: "APP",
  IOS: navigator.userAgent.match(/Mac OS/),
  IPHONE: navigator.userAgent.indexOf('iPhone') > -1,
  ANDROID: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1,
  BROWSER: {
    iPhone: navigator.userAgent.indexOf('iPhone') > -1,
    android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1,
    isclient: navigator.userAgent.indexOf('lyWb') > -1,
    ios: navigator.userAgent.match(/Mac OS/), //ios
    width: window.innerWidth,
    height: window.innerHeight,
    isWinClient: navigator.userAgent.indexOf('WinClient') > -1
  },
  DEVICE_INFO: null,
  getLocParams: function (name) {
    var href = window.location.href,
      subIndex = href.indexOf("?"),
      paramsObj = {};
    if (subIndex != -1) {
      var params = href.substr(subIndex + 1);
      var paramsMany = params.indexOf("&");
      if (paramsMany != -1) {
        var paramsArr = params.split("&");
        paramsArr.forEach(function (item, index) {
          paramsObj[item.split("=")[0]] = item.split("=")[1];
        })
      } else {
        paramsObj[params.split("=")[0]] = params.split("=")[1];
      }
    }

    if (paramsObj.hasOwnProperty(name)) {
      return paramsObj[name];
    } else {
      return null;
    }
  },
  JUMP_TO: function (url) {
    //跳转到
    if (this.BROWSER.isclient) {
      document.addEventListener('WinJSBridgeReady', function () {
        window.WinJSBridge.call('controller', 'jumpNextPage', {url: url});
      });
    } else {
      window.location.href = url;
    }

  },
  SAVE_CACHE: function (key, data) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('cache', 'save', {key: key, data: data});
    });
  },
  GET_CACHE: function (key) {
    if (!key) return;
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('cache', 'get', {key: key}, function (resp) {


      });
    });
  },
  CHECKTAUTH: function (fn, action) {
    if (!action) action = "DEPOSIT";
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('register', 'registerDispatch', {action: action}, function (resp) {
        //0为注册流程结束

        if (fn) {
          fn(resp)
        }
        /*

         */
      });
    });
  },
  JUMP: function (url) {
    this.JUMP_TO(url);
  },
  LOGIN_EVENT: function (fn) {
    document.addEventListener('WinJSBridgeReady', function () {
      document.addEventListener('LoginEvent', fn);
    })
  },
  LOGIN_EVENT_Remove: function () {
    document.addEventListener('WinJSBridgeReady', function () {
      document.removeeventlistener('LoginEvent', fn);
    })
  },
  pageClose: function () {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('marketing', 'close');
    });
  },
  BACK: function (num) {
    document.addEventListener('WinJSBridgeReady', function () {
      if (window.WinJSBridge) {
        if (num != null) {
          window.WinJSBridge.call('controller', 'back', {index: num});
        }
      } else if (app.browser.isclient) {
        app.sendCommand("yylc&back");
      } else {
        if (num != null) {
          history.go(num);
        } else {
          history.go(-1);
        }

      }
    })
  },
  MID_MENU: function (menus, index, handle) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call2('controller', 'setMenuTitle',
        {selected: index, items: menus}, handle);

    })
  },
  RIGHT_MENU: function (title, url) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'showOptionMenu', {
        title: title,
        onclick: 'APP.JUMP_TO("' + url + '")'

      });
    })
  },
  RIGHT_SHARE: function (title, obj) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'showOptionMenu', {
        title: title,
        onclick: 'APP.SHARE(' + JSON.stringify(obj) + ')'
      });
    })
  },
  RIGHT_SHARE_IMG: function (title, obj) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'showOptionMenu', {
        title: title,
        onclick: 'APP.SHARE_IMG(' + JSON.stringify(obj) + ')'
      });
    })
  },
  RIGHT_MENU_FN: function (title, FN) {
    document.addEventListener('WinJSBridgeReady', function () {
      var random = ("___callback___" + Math.random()).replace(".", "");
      window[random] = function () {
        FN();
      }

      window.WinJSBridge.call('controller', 'showOptionMenu', {
        title: title,
        onclick: random + "()"
      });
    })
  },
  JumpNative: function (des) {
    var br_url = 'yylc://tab.ly/' + des;
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'jumpNativePage', {url: br_url}, function (resp) {
        if (resp.code != 0) {
          console.log(JSON.stringify(resp));
        }
      });
    });
  },
  JumpNativePage: function (des) {
    var br_url = 'yylc://page.ly/' + des;
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'jumpNativePage', {url: br_url}, function (resp) {
        if (resp.code != 0) {
          console.log(JSON.stringify(resp));
        }
      });
    });
  },
  PAGE_WILL_LOAD: function (handle) {
    document.addEventListener('WinJSBridgeReady', function () {
      document.addEventListener('onpageshow', handle);
    })
  },
  REFRESH: function () {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'refresh', {pullRefresh: false});
    })
  },
  SET_REFRESH: function () {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'setPullRefresh', {enable: true});
    })
  },
  ALERT: function (title, content) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('notification', 'alert', {title: title, message: content}, function (resp) {
      });
    })
  },
  LOGIN: function () {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('login', 'login', function (resp) {

      });
    });
  },
  SET_TITLE: function (title, callback) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'setTitle', {title: title, onclick: 'callback()'});
    });

  },

  CONFIRM: function (title, msg, callback) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('notification', 'confirm', {title: title, message: msg, buttons: ['取消', '确定']},
        function (resp) {
          if (callback) callback(resp);
        });
    });
  },

  NETWORK_STATUS: function () {
    window.WinJSBridge.call('device', 'networkStatus', function (resp) {
      if (resp.response.status == 0) {
        APP.TOAST("当前网络不可用，请检查您的网络设置")
      } else {
        APP.ALERT('', "服务器正忙，请稍后重试")
      }
    });
  },
  TOAST: function (message, type) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('notification', 'toast', {message: message, type: type, offSet: 100});
    });
  },
  OPENWEBSITE: function (url) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'openURLOutside', {url: url});
    })
  },
  APP_LIST: function (fun) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('installApp', 'apps', function (resp) {
        fun(resp);
      });
    })
  },
  IS_INSTALL_APP: function (appId, fun) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('installApp', 'isInstall', {appId: appId}, function (resp) {
        fun(resp)
      });
    })
  },
  CHOOSE_ADDRESS: function (fun, aid) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('address', 'chooseAddress', {id: aid}, function (resp) {
        fun(resp)
      });
    })
  },
  TOBONUS: function () {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('mine', 'toBonus', {});
    });
  },
  SENDCOMMAND: function () {
    if (window.browser.iPhone || window.browser.ipad) {
      var iframeElem = document.createElement("iframe");
      iframeElem.setAttribute("src", url);
      iframeElem.setAttribute("style", "display:none;");
      iframeElem.setAttribute("height", "0px");
      iframeElem.setAttribute("width", "0px");
      iframeElem.setAttribute("frameborder", "0");
      document.body.appendChild(iframeElem);
      iframeElem.parentNode.removeChild(iframeElem);
      iframeElem = null;
    } else {
      if (typeof window.andcall == 'undefined') {
        window.location.href = url;
      } else {
        window.andcall.sendmsg(url);
      }
    }
  },
  SHARE: function (obj) {
    var $this = this;
    //转换指定的版本字符串
    var getVersionNum = function (v) {
      var split = v.split(".");
      var num = 0;
      var len = split.length;
      for (var i = 0; i < len; i++) {
        var tmp = Number(split[i]) * Math.pow(10000, len - i - 1);
        num += tmp;
      }
      return num;
    };
    //获取当前版本正则
    var m = /WinClient\/(\d+\.\d+(?:\.\d+)?)/.exec(window.navigator.userAgent);
    var currentVersion = "0.0.0";
    if (m) currentVersion = m[1];

    if (getVersionNum(currentVersion) >= getVersionNum("1.3.2")) {
      document.addEventListener('WinJSBridgeReady', function () {
        window.WinJSBridge.call('share', 'share',
          {
            title: obj.title,
            shareItems: obj.channel,
            shareTitle: "分享到",
            content: obj.title,
            url: obj.url,
            thumbIamge: obj.imgBase64,
            thumbImageUrl: obj.imgUrl,
            recipients: '',
            specialContent: {
              sms: obj.sms + obj.url,
              qqhy: obj.qqhy,
              sinawb: obj.sinawb + obj.url,
              tcwb: obj.tcwb + obj.url,
              wxhy: obj.wxhy,
              wxpyq: obj.wxpyq,
              qqhy_url: obj.url,
              wx_url: obj.url
            }
          }, function (resp) {
            var result = JSON.stringify(resp);
            var resultObj = JSON.parse(result);
            var sItem = resultObj.response.shareItem;
            var shareObj = {
              'sms': "短信分享成功",
              'wxhy': "分享到微信好友成功",
              'wxpyq': "分享到朋友圈成功",
              "sinawb": "分享到新浪微博成功"
            };
            var shareErrObj = {
              'sms': "短信分享失败",
              'wxhy': "分享到微信好友失败",
              'wxpyq': "分享到朋友圈失败",
              "sinawb": "分享到新浪微博失败"
            };
            if (APP.IOS) {
              if (resultObj.response.resultCode == "0") {
                APP.TOAST(shareObj[sItem], 0);
              } else if (resultObj.code == "0") {
                APP.TOAST(resultObj.message, 1);
              }
            } else {
              var _code = resultObj.response.resultCode;

              if (_code == "1") {
                //失败
                APP.TOAST(shareErrObj[sItem], 1); //错误
              } else if (_code == "0") {
                //成功
                APP.TOAST(shareObj[sItem], 0); //对勾
              } else {
                APP.TOAST("取消分享", 2);
              }
            }

            if (config.signFlag) {
              $.ajax({
                url: "/activity/share/click.do",
                data: {actId: obj.id},
                type: "GET",
                success: function () {

                },
                error: function () {
                  //alert("服务端繁忙");
                }

              });
            }
          });
      });
    }
    else {

      var
        title = obj.title, //标题
        smsTxt = obj.sms + obj.url,//短信
        wxhyTxt = obj.wxhy,//微信好友
        wxpyqTxt = obj.wxpyq,//微信朋友圈
        sinawbTxt = obj.sinawb + obj.url,//新浪微博
        qqhyTxt = obj.qqhy,//QQ好友
        tcwbTxt = obj.tcwb + obj.url,//腾讯微博
        url = obj.url,
        logodata = obj.imgBase64,
        imageUrl = obj.imgUrl;


      var specialContent = '{' +
        '"sms":"' + smsTxt + '", ' +
        '"qqhy":"' + qqhyTxt + '", ' +
        '"sinawb":"' + sinawbTxt + '", ' +
        '"tcwb":"' + tcwbTxt + '", ' +
        '"wxhy": "' + wxhyTxt + '",' +
        '"wxpyq": "' + wxpyqTxt + '",' +
        '"qqhy_url":"' + url + '", "wx_url":"' + url + '"}';

      var param = '{"title":"' + title + '", "content":"' + content + '","url":"' + url + '", "thumbIamge":"' + logodata + '", "thumbImageUrl":"' + imageUrl + '", "specialContent": ' + specialContent + ' ,"shareItems":[] }';
      var content = encodeURIComponent(param);

      //APP中分享
      this.SENDCOMMAND("yylc&share&" + content);
    }
  }
  ,
  SHARE_IMG: function (obj) {
    var shareContent = {
      imageUrl: obj.shareImgUrl,
      shareTitle: obj.shareTitle
    };
    window.WinJSBridge.call('share', 'shareImage', shareContent, function (resp) {
      var result = JSON.stringify(resp);
    });
  },
  LOADING: function (text) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'showLoading', {text: text});
    });
  }
  ,
  CLOSE_LOADING: function () {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('controller', 'hideLoading');
    });
  }
  ,
  ISLOGIN: function (fn) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('login', 'isLogin', function (resp) {
        fn(resp);
      });
    })

  },
  DEVICE: function (callback) {
    document.addEventListener('WinJSBridgeReady', function () {
      window.WinJSBridge.call('device', 'deviceInfo', function (resp) {
        APP.DEVICE_INFO = resp.response;
        if (callback) callback(resp.response);
      });
    })
  }
  ,
  IS_SUPPORT_API: function (apiName) {
    if (this.DEVICE_INFO == null) {
      return false;
    }
    var device = this.DEVICE_INFO.device;
    var version = this.DEVICE_INFO.appVersion;
    if (this.DEVICE_INFO.info != null) {
      device = this.DEVICE_INFO.info.device;
      version = this.DEVICE_INFO.info.appVersion;
    }
    device = device.toLowerCase()

    function computer(v) {
      var varry = v.split('.');
      var carry = version.split('.');

      if (Number(carry[0]) < Number(varry[0])) {
        return false
      } else if (Number(carry[1]) < Number(varry[1])) {
        return false
      } else if (Number(carry[2]) < Number(varry[2])) {
        return false
      }
      return true;
    }

    function versionAndroidOrIOS(androidVersion, iosVersion) {

      if (device == "android") {
        return computer(androidVersion);
      } else if (device == "ios") {

        return computer(iosVersion);
      }
    }

    switch (apiName) {
      case "address":
        return versionAndroidOrIOS("4.2.8.0", "2.12.0")
    }
    return false;
  }
};
