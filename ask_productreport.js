var loc = location.href;
var n1 = loc.length;//地址的总长度
var n2 = loc.indexOf("=");//取得=号的位置
var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
web3.eth.defaultAccount=id;

$("#report").val("查找结果:");
for( i=0;;i++)
{
    var myreport=product.report(i);
    if(myreport[1]=="")
        break;
    $("#report").val($("#report").val()+"\n举报人："+myreport[0]+"\n产品批号："+myreport[1]+"\n");
}

$("#seven").click(function()
{

    if($("#six").val()=="")
        alert("输入不能为空")
    else
    {
        toaddress=product.name_address($("#six").val());
        if(0x0 == toaddress){
            alert("未找到该用户")
            return;
        }
        var myprocess=product.process_account.sendTransaction(toaddress,{from: web3.eth.defaultAccount,gas:300000});
        alert("处理结果正在执行")}
    //处理违法账号
    location.reload();
});

$("#sevens").click(function()
{

    if($("#sixs").val()=="")
        alert("输入不能为空")
    else
    {
        toaddress=product.name_address($("#sixs").val());
        if(0x0 == toaddress){
            alert("未找到该用户")
            return;
        }
        var myhuifu=product.huifu_account.sendTransaction(toaddress,{from: web3.eth.defaultAccount,gas:300000});
        alert("处理结果正在执行")}
    //恢复违法账号
    location.reload();
});

var myevent=product.process_account_key();
myevent.watch(function(error, result) {
    if (!error)
    {
        if(result.args.key)
            alert("操作成功")
        else
            alert("操作失败");

    } else {
        console.log(error);
    }
});

var myevent=product.huifu_account_key();
myevent.watch(function(error, result) {
    if (!error)
    {
        if(result.args.key)
            alert("操作成功")
        else
            alert("操作失败");

    } else {
        console.log(error);
    }
});
	