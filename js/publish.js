let loadDateChoice = function () {
    $("#pickdate").dateDropper();
    $("#picktime").timeDropper({
        format: "HH:mm",
    });
}

let publish = function (form) {
    let formData = new FormData($(form).parent()[0]);
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/publish/publishActivity",
        type: "POST",
        dataType: "json",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data, status, jqXHR) {
            // 请求成功
            if (null != data && 0 === data.status) {
                alert("發佈活動成功");
                window.location.href = "./index.html";
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 请求失敗
            alert(status);
        }
    });
}