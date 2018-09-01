let showAdditions = function () {
    let urlParams = decodeURI(window.location.search);
    let msg = urlParams.split("=")[1];
    if ("AIN" === msg) {
        //全為空
    } else if ("NIN" === msg) {
        $(".tel").remove();
    } else if ("TIN" === msg) {
        $(".name").remove();
        $(".sex").remove();
    } else {
        $(".tel").remove();
        $(".name").remove();
        $(".sex").remove();
    }
}

let addMore = function () {
    let flag = true;
    if ($("#name").length > 0) {
        let name = $("#name").val();
        if (2 > name.length) {
            alert("请输入正确的名字");
            flag = false;
        }
    }
    if ($("#tel").length > 0) {
        let tel = $("#tel").val();
        if (11 != tel.length) {
            alert("手机号错误");
            flag = false;
        }
        let retel = $("#retel").val();
        if (retel != tel) {
            alert("两次手机号输入不一致");
            flag = false;
        }
    }
    if (flag) {
        let formData = new FormData($("#addition_form")[0]);
        $.ajax({
            url: "http://www.whatu1.com/dp-petshome-web/user/addAddition",
            type: "POST",
            dataType: "json",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data, status, jqXHR) {
                // 请求成功
                // alert("当前addition页面状态: " + data.status);
                if (null != data && 0 === data.status) {
                    alert("信息更新成功");
                    window.location.href = "./order.html";
                } else if (3 === data.status) {
                    alert("未登錄，系統將自動爲您登陆");
                    window.location.href = data.data.url;
                }
            },
            error: function (XMLHttpRequest, status, errorThrown) {
                // 请求失敗
                alert(status);
            }
        });
    }
}