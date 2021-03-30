var loc = location.href;
var n1 = loc.length;//地址的总长度
var n2 = loc.indexOf("=");//取得=号的位置
var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
web3.eth.defaultAccount=id;

var myrole=product.role(web3.eth.defaultAccount);
console.log("role :"+myrole);

if(myrole[0]!=="")
{
    alert("Hello !Dear "+myrole[0]+": Welcome to ProductSystem!");
    location.href="first.html?"+"txt="+encodeURI(web3.eth.defaultAccount);
}

$("#bb").click(function()
{

    console.log($("#selectone").val());
    if($("#selectone").val()=="生产商")
        chart_num=0;
    if($("#selectone").val()=="批发商")
        chart_num=1;
    if($("#selectone").val()=="商店")
        chart_num=2;
    if($("#selectone").val()=="消费者")
        chart_num=3;
    if($("#selectone").val()=="监管部门")
        chart_num=4;
    if($("#aa").val()!=="")
    {
        product.enroll.sendTransaction($("#aa").val(),chart_num,{from: web3.eth.defaultAccount,gas:300000});

        alert("稍等.请求已发送2");
    }
    else
        alert("名字不能为空!");


});
var myevent=product.enroll_key();
myevent.watch(function(error, result) {
    if (!error)
    {
        if(result.args.key)
            alert("操作成功")
        else
            alert("昵称不能重复或账户已存在");
        location.reload();
    } else {
        console.log(error);
    }
});
	 
		

