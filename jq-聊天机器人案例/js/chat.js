$(function () {
  //初始化滚动条 ，使得滚动条滚动到最底部
  //这个方法定义在scroll.js中
  resetui();//这个方法会使滚动条滚动到最底部(非插件)

  //为发送按钮绑定鼠标点击事件
  $("#btnSend").on('click', function () {
    var text = $('#ipt').val().trim();
    if (text.length <= 0) {
      return $("#ipt").val('');
    }

    //如果用户输入了内容，则将内容追加到页面显示
    $("#talk_list").append('<li class="right_word"><img src="img/person02.png"> <span>' + text + '</span></li>')
    $("#ipt").val('');
    resetui();
    //发起请求，获取聊天内容
    getMsg(text);
  })

  // 为文本框绑定按下回车等同点击发送按钮的事件
  $("#ipt").on("keyup",function(e){
     if(e.keyCode===13){
      $("#btnSend").click();
     }
  })

  //获取聊天机器人发送回来的消息
  function getMsg(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text
      },
      success: function (res) {
        console.log(res);//返回的data中的info包含有机器人回应的文本
        if (res.message === 'success') {
          //接受机器人回应的消息
          var msg = res.data.info.text
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
          resetui();
          //调用getVoice函数转化文本为语音
          getVoice(msg)
        }
      }
    })
  }

  // 将机器人的聊天内容转为语音
  function getVoice(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: text
      },
      success: function (res) {
        console.log(res);
        //返回的data中包含了message，status，以及语音的url地址voiceUrl
        if (res.status === 200) {
          //播放语音
          $("#voice").attr('src', res.voiceUrl)
        }
      }
    })
  }

})