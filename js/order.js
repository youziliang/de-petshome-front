let checkBeforeReservation = function () {
    // 判断是否登陆和是否注册手机号
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/order/checkBeforeReservation",
        type: "POST",
        dataType: "json",
        async: false,
        cache: false,
        timeout: 50000,
        data: {},
        success: function (data, status, jqXHR) {
            // 请求成功
            if (null != data) {
                // alert("order页当前状态: " + data.status)
                switch (data.status) {
                    case 0:
                        // 检查成功，无需作为
                        loadDateChoice("pickdate", "picktime");
                        loadCountChoice();
                        break;
                    case 1:
                        // 无手机号，跳转至addition
                        alert("請先完善您的個人資料");
                        window.location.href = "./addition.html?msg=" + data.msg;
                        break;
                    case 3:
                        // 无登陆
                        alert("未登錄，系統將自動爲您登陆");
                        window.location.href = data.data.url;
                        break;
                }
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 请求失敗
            alert(status);
        }
    });
}

let loadDateChoice = function (dateId, timeId) {
    $("#" + dateId).dateDropper();
    $("#" + timeId).timeDropper({
        format: "HH:mm A",
    });
}

let loadCountChoice = function () {
    $("#order_people").jRange({
        from: 1,
        to: 5,
        step: 1,
        scale: [1, 2, 3, 4, 5],
        format: '%s',
        width: 200,
        showLabels: false,
        snap: true,
        onstatechange: function (data) {
            onCountSelect(data);
        },
    });
}

let onCountSelect = function (data) {
    // ajax數據庫加載相應的套餐
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/suit/getSuitsByPeople",
        type: "GET",
        dataType: "json",
        async: true,
        cache: false,
        timeout: 50000,
        data: {
            people: data,
        },
        success: function (data, status, jqXHR) {
            // alert(data.data[0].description);
            // 请求成功
            if (null != data && 0 === data.status) {
                $("#order_suit").find("option").remove();
                $("#order_suits").find(".suit_description")
                    .remove();
                for (let i = 0, len = data.data.length; i < len; i++) {
                    $("#order_suit").append(
                        "<option value="
                        + data.data[i].id
                        + ">"
                        + data.data[i].name
                        + "</option>");
                    $("#order_suits")
                        .append(
                            "<span id="
                            + data.data[i].id
                            + " class='suit_description'>"
                            + "套餐"
                            + data.data[i].price
                            + "元  包含: "
                            + data.data[i].description
                            + "  可获得积分: "
                            + data.data[i].score
                            + "</span>");
                }
                $("#" + data.data[0].id).show();
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 请求失敗
            alert(status);
        }
    });
}

let onSuitChange = function (id) {
    // alert($("#" + id).text());
    $(".suit_description").each(function () {
        $(this).hide();
    });
    $("#" + id).show();
}

let reservate = function (form) {
    // 提交表單
    let formData = new FormData($(form).parent()[0]);
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/order/reservate",
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
                alert("預約成功，订单号: " + data.data + "，可在 '我的 > 我的预约' 下查看");
            } else if (3 === data.status) {
                alert("未登錄，系統將自動爲您登陆");
                window.location.href = data.data.url;
            } else if (4 === data.status) {
                alert("預約失敗，餘額不足");
            } else {
                alert("預約失敗，請刷新后重試");
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 请求失敗
            alert(status);
        }
    });
}