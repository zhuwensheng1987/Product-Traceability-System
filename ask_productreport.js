var loc = location.href;
var n1 = loc.length;//��ַ���ܳ���
var n2 = loc.indexOf("=");//ȡ��=�ŵ�λ��
var id = decodeURI(loc.substr(n2+1, n1-n2));//��=�ź��������
web3.eth.defaultAccount=id;

$("#report").val("���ҽ��:");
for( i=0;;i++)
{
    var myreport=product.report(i);
    if(myreport[1]=="")
        break;
    $("#report").val($("#report").val()+"\n�ٱ��ˣ�"+myreport[0]+"\n��Ʒ���ţ�"+myreport[1]+"\n");
}

$("#seven").click(function()
{

    if($("#six").val()=="")
        alert("���벻��Ϊ��")
    else
    {
        toaddress=product.name_address($("#six").val());
        if(0x0 == toaddress){
            alert("δ�ҵ����û�")
            return;
        }
        var myprocess=product.process_account.sendTransaction(toaddress,{from: web3.eth.defaultAccount,gas:300000});
        alert("����������ִ��")}
    //����Υ���˺�
    location.reload();
});

$("#sevens").click(function()
{

    if($("#sixs").val()=="")
        alert("���벻��Ϊ��")
    else
    {
        toaddress=product.name_address($("#sixs").val());
        if(0x0 == toaddress){
            alert("δ�ҵ����û�")
            return;
        }
        var myhuifu=product.huifu_account.sendTransaction(toaddress,{from: web3.eth.defaultAccount,gas:300000});
        alert("����������ִ��")}
    //�ָ�Υ���˺�
    location.reload();
});

var myevent=product.process_account_key();
myevent.watch(function(error, result) {
    if (!error)
    {
        if(result.args.key)
            alert("�����ɹ�")
        else
            alert("����ʧ��");

    } else {
        console.log(error);
    }
});

var myevent=product.huifu_account_key();
myevent.watch(function(error, result) {
    if (!error)
    {
        if(result.args.key)
            alert("�����ɹ�")
        else
            alert("����ʧ��");

    } else {
        console.log(error);
    }
});
	