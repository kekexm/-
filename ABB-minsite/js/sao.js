
/**
 * 获取微信配置
 */
function ajaxGetWeiXinConf()
{
    $.ajax({
        url: 'http://abb2016.adtmr.com/weixin/getConfig',
        data: {
            url : location.href.split('#')[0],
            type : 'share',
            key : 'weige2016'
        },
        async: false,
        type: "post",
        dataType: "jsonp",
        success:function(jsonData){

            if(jsonData.state == "0")
            {
                initWeiXin(jsonData.data);
            }
        },
        error:function(){topTip("操作失败, 请稍候再试！");}
    });
}

/**
 * 初始化微信
 * @param data
 */
function initWeiXin(data)
{

    wx.config({
        debug: false,
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.noceStr,
        signature: data.signature,
        jsApiList: [
            'scanQRCode'
        ]
    });
    
    wx.ready(function() {

	    $('.saoBtn').bind('click', function(){
			wx.scanQRCode({
			    desc: 'scanQRCode desc',
			    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			    //scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			    success: function (res) {
			       // 回调
			    	var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果

                    window.location.href = result;

			    },
			    error: function(res){
			          if(res.errMsg.indexOf('function_not_exist') > 0){
			               syetemAlertMask('Please upgrade your mobile device system.');
			           }
			    }
			});
		})

    });
}
