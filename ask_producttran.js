  var loc = location.href;
  var n1 = loc.length;//��ַ���ܳ���
  var n2 = loc.indexOf("=");//ȡ��=�ŵ�λ��
  var id = decodeURI(loc.substr(n2+1, n1-n2));//��=�ź��������
 web3.eth.defaultAccount=id;
var myrole=product.role(web3.eth.defaultAccount);
if(myrole[1]!=4)
$("#pp").val(web3.eth.defaultAccount);

$("#vv").click(function() 
	{

	if($("#pp").val()!==""){
          myproduct_from=product.inquire($("#pp").val(),$("#tt").val());
	$("#product_from").val("�����\n"+myproduct_from);
	}
            });
