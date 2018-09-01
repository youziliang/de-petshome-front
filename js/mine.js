let loadUserInfo = function () {
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/wechat/loadUserInfo",
        type: "GET",
        dataType: "json",
        async: true,
        cache: false,
        timeout: 50000,
        data: {},
        success: function (data, status, jqXHR) {
            //檢查登陸狀態
            if (null != data && 3 === data.status) {
                alert("未登錄，系統將自動爲您登陆");
                window.location.href = data.data.url;
            }
            // 请求成功
            if (null != data && 0 === data.status) {
                if (null != data.data.user) {
                    $("#head_img").attr("src",
                        data.data.user.headImg);
                    $("#nickname")
                        .html(data.data.user.nickname)
                        .show();
                    $("#score").html(data.data.user.score);
                    $("#balance").html(data.data.user.balance);

                    // 创建发布活动/通知链接
                    if (0 === data.data.user.role) {
                        $(".publish").show();
                    } else {
                        $(".publish").hide();
                    }

                    // 动态遍历创建订单
                    if (null != data.data.orders) {
                        let orders = data.data.orders;
                        let role = data.data.user.role;
                        createOrdersList(orders, role, "my_unfinished_orders");
                    }
                }
            } else {
                // 獲取用戶信息失敗
                // alert("獲取用戶信息失敗");
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 請求失敗
            alert(status);
        }
    });
}

let getOrders = function (status, tagId) {
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/order/getOrders",
        type: "GET",
        dataType: "json",
        async: true,
        cache: false,
        timeout: 50000,
        data: {
            status: status
        },
        success: function (data, status, jqXHR) {
            // 请求成功
            if (null != data && 0 === data.status) {
                // 动态遍历创建订单
                if (null != data.data) {
                    $("#" + tagId).empty();
                    let orders = data.data;
                    createOrdersList(orders, orders[0].role, tagId);
                }
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 請求失敗
            alert(status);
        }
    });
}

let cancelOrder = function (button) {
    let orderId = $(button).parent().parent().find(".order_value")
        .first().text();
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/order/cancel",
        type: "POST",
        dataType: "json",
        async: true,
        cache: false,
        timeout: 50000,
        data: {
            orderId: orderId
        },
        success: function (data, status, jqXHR) {
            // 请求成功
            if (null != data && 0 === data.status) {
                alert("订单取消成功");
                window.location.href = "./mine.html";
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 請求失敗
            alert(status);
        }
    });
}

let orderExchange = function (button, orderStatus) {
    let orderId = $(button).parent().parent().find(".order_value").first().text();
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/order/exchange",
        type: "POST",
        dataType: "json",
        async: true,
        cache: false,
        timeout: 50000,
        data: {
            orderId: orderId,
            status: orderStatus
        },
        success: function (data, status, jqXHR) {
            // 请求成功
            if (null != data && 0 === data.status) {
                alert("订单状态改变");
                window.location.href = "./mine.html";
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 請求失敗
            alert(status);
        }
    });
}

let forceCancel = function () {
    alert("請致電商家: 15021170117");
}

let createOrdersList = function (orders, role, tagId) {
    let i = 0, len = orders.length;
    for (; i < len; i++) {
        switch (orders[i].status) {
            case 0:
                if (0 === role) {
                    // alert("狀態為0時，商家看到的");
                    $("#" + tagId)
                        .append(
                            "<div id='my_order'><div class='row'><span class='col-4 order_key'>訂&nbsp;單&nbsp;號</span><span class='col-8 order_value'>"
                            + orders[i].id
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>下&nbsp;單&nbsp;人</span><span class='col-8 order_value'>"
                            + orders[i].nickname
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>電&nbsp;&nbsp;話</span><span class='col-8 order_value'>"
                            + orders[i].tel
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>時&nbsp;&nbsp;間</span><span class='col-8 order_value'>"
                            + stampToDateStr(orders[i].date)
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>人&nbsp;&nbsp;數</span><span class='col-8 order_value'>"
                            + orders[i].count
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>套&nbsp;&nbsp;餐</span><span class='col-8 order_value'>"
                            + orders[i].suitName
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>留&nbsp;&nbsp;言</span><span class='col-8 order_value'>"
                            + orders[i].remark
                            + "</span></div><hr><div class='row'><button class='btn btn-outline-primary order_cancel' onclick='cancelOrder(this)'>取消預約</button>"
                            + "<button class='btn btn-outline-primary confirm_button' onclick='orderExchange(this, 1)'>商家確認</button></div></div>");
                } else {
                    // alert("狀態為0時，用戶看到的");
                    $("#" + tagId)
                        .append(
                            "<div id='my_order'><div class='row'><span class='col-4 order_key'>訂&nbsp;單&nbsp;號</span><span class='col-8 order_value'>"
                            + orders[i].id
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>時&nbsp;&nbsp;間</span><span class='col-8 order_value'>"
                            + stampToDateStr(orders[i].date)
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>人&nbsp;&nbsp;數</span><span class='col-8 order_value'>"
                            + orders[i].count
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>套&nbsp;&nbsp;餐</span><span class='col-8 order_value'>"
                            + orders[i].suitName
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>留&nbsp;&nbsp;言</span><span class='col-8 order_value'>"
                            + orders[i].remark
                            + "</span></div><hr><div class='row'><button class='btn btn-outline-primary order_cancel' onclick='cancelOrder(this)'>取消預約</button>"
                            + "<span class='confirm_prompt'>等待商家確認 ...</span></div></div>");
                }
                break;
            case 1:
                if (0 === role) {
                    // alert("狀態為1時，商家看到的");
                    $("#" + tagId)
                        .append(
                            "<div id='my_order'><div class='row'><span class='col-4 order_key'>訂&nbsp;單&nbsp;號</span><span class='col-8 order_value'>"
                            + orders[i].id
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>下&nbsp;單&nbsp;人</span><span class='col-8 order_value'>"
                            + orders[i].nickname
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>電&nbsp;&nbsp;話</span><span class='col-8 order_value'>"
                            + orders[i].tel
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>時&nbsp;&nbsp;間</span><span class='col-8 order_value'>"
                            + stampToDateStr(orders[i].date)
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>人&nbsp;&nbsp;數</span><span class='col-8 order_value'>"
                            + orders[i].count
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>套&nbsp;&nbsp;餐</span><span class='col-8 order_value'>"
                            + orders[i].suitName
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>留&nbsp;&nbsp;言</span><span class='col-8 order_value'>"
                            + orders[i].remark
                            + "</span></div><hr><div class='row'><button class='btn btn-outline-primary order_cancel' onclick='cancelOrder(this)'>取消預約</button>"
                            + "<span class='confirm_prompt'>等待用戶到店 ...</span></div></div>");
                } else {
                    // alert("狀態為1時，用戶看到的");
                    $("#" + tagId)
                        .append(
                            "<div id='my_order'><div class='row'><span class='col-4 order_key'>訂&nbsp;單&nbsp;號</span><span class='col-8 order_value'>"
                            + orders[i].id
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>時&nbsp;&nbsp;間</span><span class='col-8 order_value'>"
                            + stampToDateStr(orders[i].date)
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>人&nbsp;&nbsp;數</span><span class='col-8 order_value'>"
                            + orders[i].count
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>套&nbsp;&nbsp;餐</span><span class='col-8 order_value'>"
                            + orders[i].suitName
                            + "</span></div><hr><div class='row'><span class='col-4 order_key'>留&nbsp;&nbsp;言</span><span class='col-8 order_value'>"
                            + orders[i].remark
                            + "</span></div><hr><div class='row'><button class='btn btn-outline-primary order_cancel' onclick='forceCancel()'>如需取消</button>"
                            + "<button class='btn btn-outline-primary confirm_button' onclick='orderExchange(this, 2)'>到店確認</button></div></div>");
                }
                break;
            case 2:
                // alert("狀態為2時，所有人看到的");
                $("#" + tagId)
                    .append(
                        "<div id='my_order'><div class='row'><span class='col-4 order_key'>訂&nbsp;單&nbsp;號</span><span class='col-8 order_value'>"
                        + orders[i].id
                        + "</span></div><hr><div class='row'><span class='col-4 order_key'>下&nbsp;單&nbsp;人</span><span class='col-8 order_value'>"
                        + orders[i].nickname
                        + "</span></div><hr><div class='row'><span class='col-4 order_key'>電&nbsp;&nbsp;話</span><span class='col-8 order_value'>"
                        + orders[i].tel
                        + "</span></div><hr><div class='row'><span class='col-4 order_key'>時&nbsp;&nbsp;間</span><span class='col-8 order_value'>"
                        + stampToDateStr(orders[i].date)
                        + "</span></div><hr><div class='row'><span class='col-4 order_key'>人&nbsp;&nbsp;數</span><span class='col-8 order_value'>"
                        + orders[i].count
                        + "</span></div><hr><div class='row'><span class='col-4 order_key'>套&nbsp;&nbsp;餐</span><span class='col-8 order_value'>"
                        + orders[i].suitName
                        + "</span></div><hr><div class='row'><span class='col-4 order_key'>留&nbsp;&nbsp;言</span><span class='col-8 order_value'>"
                        + orders[i].remark
                        + "</span></div><hr><span class='alert alert-success confirm_prompt'>訂單完成</span></div><br></div>");
                break;
        }
        $("#" + tagId).trigger("create");
    }
}

//时间戳转化成时间格式
function stampToDateStr(timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;// 不够两位补充0
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second = date.getSeconds();
    second = second < 10 ? '0' + second : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}