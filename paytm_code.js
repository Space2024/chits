"use strict";
let paytmParams = {};
const order_id = String(Math.floor(10000000 + Math.random() * 90000000));
const _paytmMid = "SreeKu73966647319041";
const mKey = "6QJLTvGM1kG44juX";
const _paytmTid = "25865798";
const date = new Date();
const todaysDate = date
    .toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
})
    .replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1 $4:$5:$6");
paytmParams.body = {
    requestType: "Payment",
    mid: "SreeKu73966647319041",
    websiteName: "https://securegw-edc.paytm.in",
    orderId: order_id,
    // callbackUrl: "https://securegw-edc.paytm.in/ecr/V2/payment/status",
    // txnAmount: {
    //   value: "1.00",
    //   currency: "INR",
    // },
    // userInfo: {
    //   custId: "CUST_001",
    // },
    paytmMid: _paytmMid,
    paytmTid: _paytmTid,
    transactionDateTime: todaysDate,
    merchantTransactionId: String(Math.floor(10000000 + Math.random() * 90000000)),
    merchantReferenceNo: String(Math.floor(10000000 + Math.random() * 90000000)),
    transactionAmount: "100",
    merchantExtendedInfo: { PaymentMode: "All" },
};
PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mKey).then(function (checksum) {
    paytmParams.head = {
        signature: checksum,
        channelId: "EDC",
        version: "3.1",
        requestTimeStamp: todaysDate,
    };
    var post_data = JSON.stringify(paytmParams);
    console.log(paytmParams);
    var options = {
        hostname: "securegw-edc.paytm.in",
        path: `/theia/api/v1/initiateTransaction?mid=${_paytmMid}&orderId=${order_id}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
        },
    };
    var response = "";
    var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
            response += chunk;
        });
        post_res.on("end", function () {
            console.log("Response: ", response);
        });
    });
    post_req.write(post_data);
    post_req.end();
    return response;
});
//# sourceMappingURL=paytm_code.js.map