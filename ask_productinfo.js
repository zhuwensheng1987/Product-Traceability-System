var loc = location.href;
var n1 = loc.length;//地址的总长度
var n2 = loc.indexOf("=");//取得=号的位置
var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
web3.eth.defaultAccount=id;

$("#sevens").click(function()
{

    if($("#fives").val()=="")
        alert("输入不能为空")
    else
    {
        $("#product_ask").val("查找结果");
        for( i=0;;i++) {
            var myproduct = product.product(i);
            console.log(myproduct)
            if (myproduct[2] == "")
                break;
            if ($("#fives").val() == myproduct[2]) {
                var date = jutils.formatDate(new Date(myproduct[3]*1000),"YYYY-MM-DD HH:ii:ss");
                $("#product_ask").val($("#product_ask").val() + "\n产品名：" + myproduct[0] + " 数量：" + myproduct[1] + "\n批号：" + myproduct[2] + " 生产时间：" + date + "\n厂家：" + myproduct[4] + "\n");
            }

        }
    }

});
	