var loc = location.href;
var n1 = loc.length;//��ַ���ܳ���
var n2 = loc.indexOf("=");//ȡ��=�ŵ�λ��
var id = decodeURI(loc.substr(n2+1, n1-n2));//��=�ź��������
web3.eth.defaultAccount=id;

$("#sevens").click(function()
{

    if($("#fives").val()=="")
        alert("���벻��Ϊ��")
    else
    {
        $("#product_ask").val("���ҽ��");
        for( i=0;;i++) {
            var myproduct = product.product(i);
            console.log(myproduct)
            if (myproduct[2] == "")
                break;
            if ($("#fives").val() == myproduct[2]) {
                var date = jutils.formatDate(new Date(myproduct[3]*1000),"YYYY-MM-DD HH:ii:ss");
                $("#product_ask").val($("#product_ask").val() + "\n��Ʒ����" + myproduct[0] + " ������" + myproduct[1] + "\n���ţ�" + myproduct[2] + " ����ʱ�䣺" + date + "\n���ң�" + myproduct[4] + "\n");
            }

        }
    }

});
	