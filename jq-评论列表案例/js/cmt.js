function getCommentList() {
  $.ajax({
    method: 'GET',
    url: 'http://www.liulongbin.top:3006/api/cmtlist',
    success: function (res) {
      if (res.status !== 200) { return alert('获取评论列表失败') }
      var rows = []
      $.each(res.data, function (i, item) {
        var str = '<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">评论时间：' + item.time + '</span><span class="badge" style="background-color: #5BC0DE;">评论人：' + item.username + '</span>' + item.content + '</li>'
        rows.push(str);
        $('#cmt-list').empty().append(rows.join(''))
      })
    }
  })
}

getCommentList();

$(function () {
  $('#formAddCmt').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.post('http://www.liulongbin.top:3006/api/addcmt',data,function(res){
      if(res.status!==201){
        return alert('发送失败');
      }
      getCommentList();
      //清空发表评论后输入框中的内容
      $('#formAddCmt')[0].reset();
    })
  })
})