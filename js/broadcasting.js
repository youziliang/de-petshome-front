let publish = function () {
    const notice = $("#notice").val();
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/publish/publishBroadcasting",
        type: "POST",
        dataType: "json",
        async: true,
        cache: false,
        timeout: 50000,
        data: {
            notice: notice
        },
        success: function (data, status, jqXHR) {
            // 请求成功
            if (null != data && 0 === data.status) {
                alert("發佈通知成功");
                window.location.href = "./index.html";
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 请求失敗
            alert(status);
        }
    });
}