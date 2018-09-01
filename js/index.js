let loadHomeInfo = function () {
    $.ajax({
        url: "http://www.whatu1.com/dp-petshome-web/home/loadHomeInfo",
        type: "GET",
        dataType: "json",
        async: true,
        cache: false,
        timeout: 50000,
        data: {},
        success: function (data, status, jqXHR) {
            // 请求成功
            if (null != data && 0 === data.status) {

                // alert(data.data.banners[0].img);
                for (let i = 0, banners_len = data.data.banners.length; i < banners_len; i++) {
                    let carousel_len = $(".carousel_img").length;

                    let carousel_imgs = $(".carousel_img");
                    for (let i = 0; i < carousel_len; i++) {
                        $(carousel_imgs[i]).attr("src", data.data.banners[i].img);
                    }
                }

                // alert(data.data.broadcasting.notice);
                $("#broadcasting").html(data.data.broadcasting.notice)

                // alert(data.data.activities[0].theme);
                for (let j = 0, activities_len = data.data.activities.length; j < activities_len; j++) {
                    $("#activities")
                        .append(
                            "<div class='activity' onclick='toActivityDetail(this)'><span class='activity_id'>"
                            + data.data.activities[j].id
                            + "</span><img class='activity_img' src='"
                            + data.data.activities[j].img
                            + "'><span class='activity_title_major'>"
                            + data.data.activities[j].theme
                            + "</span><span class='activity_title_date'>"
                            + stampToDateStr(data.data.activities[j].date)
                            + "</span><span class='activity_title_deputy'>"
                            + data.data.activities[j].detail
                            + "</span><span class='activity_address'>"
                            + data.data.activities[j].address
                            + "</span></div>");
                    $("#activities").trigger("create");
                }
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            // 請求失敗
            alert(status);
        }
    });
}

let toActivityDetail = function (button) {
    let theme = $(button).find(".activity_title_major").first().text();
    let date = $(button).find(".activity_title_date").first().text();
    let address = $(button).find(".activity_address").first().text();
    let detail = $(button).find(".activity_title_deputy").first().text();
    let img = $(button).find(".activity_img").first()[0].src;
    window.location.href = "./activity.html?theme="
        + theme
        + "&date="
        + date
        + "&address="
        + address
        + "&detail=" + detail + "&img=" + img;
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