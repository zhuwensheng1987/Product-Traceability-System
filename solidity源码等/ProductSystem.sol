pragma solidity ^0.4.18;
contract ProductSystem{
    struct Product{//产品生产信息
        string name; //产品名称
        uint num;//库存量
        string key;//批号
        uint date;//生产时间
        address producer;//生产厂商
    }
    mapping(uint=>Product) public product;  //产品数组

    struct Warehouse{//仓库
        string name;//产品名称
        string key;//批号
        uint num;//库存量
        uint price;//价格
    }

    struct Message{//流通信息
        address seller;//卖方
        address buyer;//买方
        uint time;//交易日期
        uint num;//数量
        string key;//批号
    }
    struct Role{//角色
        string name;//名称
        uint typ;//角色类型
        uint flag;//可操作标记(0不可操作;1可以操作)
        uint ware_key;
        uint mess_key;
        mapping(uint=>Warehouse) ware;//仓库数据
        mapping(uint=>Message) mess;//购买记录
    }
    struct Role_address{//昵称与地址的映射
        string name;
        address add;
    }

    struct Report{//举报信息
        address people;//举报人
        string key;//产品批号
    }

    uint product_key;//批号的基准值
    uint report_key;//举报信息的基准值
    uint public name_address_key;//账户的基准值
    mapping(address=>Role) public role;
    mapping(uint=>Report) public report;
    mapping(uint=>Role_address) public role_address;
    event enroll_key(bool key);
    event product_production_key(bool key);
    event transaction_key(bool key);
    event reporting_key(bool key);
    event process_account_key(bool key);
    event huifu_account_key(bool key);


    function Productsystem()public{//初始化
        product_key=0;
        report_key=0;
        name_address_key=0;
    }

    function name_address(string _name)constant returns(address){
        uint i;
        for(i=0;i<name_address_key;i++){
            if(compare(_name,role_address[i].name)){
                return role_address[i].add;
            }
        }
        return;
    }

    function enroll(string _name,uint _type)public returns(bool)//注册角色
    {
        uint i;
        if(role[msg.sender].flag==1){
            emit enroll_key(false);
            return false;
        }
        for(i=0;i<name_address_key;i++){
            if(compare(_name,role_address[i].name)){
                emit enroll_key(false);
                return false;
            }
        }
        role_address[name_address_key].name=_name;
        role_address[name_address_key].add=msg.sender;
        name_address_key++;
        role[msg.sender].name=_name;
        role[msg.sender].typ=_type;
        role[msg.sender].flag=1;
        role[msg.sender].ware_key=0;
        role[msg.sender].mess_key=0;
        emit enroll_key(true);
        return true;
    }

    /*function product_inquire(uint i)constant public returns(string){
        string memory results;
        results="name:";
        results=strConcat(results,product[i].name);
        return results;
    }*/

    function product_production(string _name,uint _num,string _key,address _producer)public returns(bool){//生产产品
        uint w_key;
        if(role[_producer].typ!=0||role[_producer].flag!=1){
            emit product_production_key(false);
            return false;
        }
        if(_producer!=msg.sender){
            emit product_production_key(false);
            return false;
        }
        uint i;
        for(i=0;i<product_key;i++){
            if(compare(_key,product[i].key)){
                emit product_production_key(false);
                return false;
            }
        }
        product[product_key].name=_name;
        product[product_key].num=_num;
        product[product_key].key=_key;
        product[product_key].date=block.timestamp;
        product[product_key].producer=_producer;
        w_key=role[_producer].ware_key;
        product_key=product_key+1;
        role[_producer].ware[w_key].name=_name;
        role[_producer].ware[w_key].key=_key;
        role[_producer].ware[w_key].num=_num;
        role[_producer].ware[w_key].price=0;
        role[_producer].ware_key++;
        emit product_production_key(true);
        return true;
    }

    //function product_management_add(address account,Warehouse _ware)public{
    //    role[account].ware.push(_ware);
    //}

    function compare(string _a,string _b)returns(bool){//判断字符串是否相等
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
            return false;
        // @todo unroll this loop
        for (uint i = 0; i < a.length; i ++)
            if (a[i] != b[i])
                return false;
        return true;
    }

    function product_management_inquire(address account,string _name)constant public returns (uint){//监管者查询仓库中某产品的数量
        uint sum=0;
        uint i;
        if(role[msg.sender].typ!=4)
            return;
        for(i=0;i<role[account].ware_key;i++){
            if(compare(_name,role[account].ware[i].name)){
                sum+=role[account].ware[i].num;
            }
        }
        return sum;
    }

    function inquire_product(string _name)constant public returns (uint){//查询本人仓库中某产品的数量
        uint sum=0;
        uint i;
        for(i=0;i<role[msg.sender].ware_key;i++){
            if(compare(_name,role[msg.sender].ware[i].name)){
                sum+=role[msg.sender].ware[i].num;
            }
        }
        return sum;
    }

    function transaction(address _from,address to,string _name,string _key,uint _price)public returns(bool){//产品交易函数
        uint i;
        uint j;
        uint w_key;
        uint m_key;
        if(role[_from].typ==4||role[to].typ==4||role[to].typ==0){
            emit transaction_key(false);
            return false;
        }
        if(_from!=msg.sender){
            emit transaction_key(false);
            return false;
        }
        if(role[_from].flag==0){
            emit transaction_key(false);
            return false;
        }
        for(i=0;i<role[_from].ware_key;i++){
            if(compare(_key,role[_from].ware[i].key)){
                if(!compare(role[_from].ware[i].name,_name)){
                    emit transaction_key(false);
                    return false;
                }
                w_key=role[to].ware_key;//将交易产品的信息写入买方的仓库
                role[to].ware[w_key].name=_name;
                role[to].ware[w_key].key=_key;
                role[to].ware[w_key].price=_price;
                role[to].ware[w_key].num=role[_from].ware[i].num;
                for(j=i;j<role[_from].ware_key-1;j++){//从卖方仓库中删除交易产品的信息
                    role[_from].ware[j].name=role[_from].ware[j+1].name;
                    role[_from].ware[j].key= role[_from].ware[j+1].key;
                    role[_from].ware[j].num=role[_from].ware[j+1].num;
                    role[_from].ware[j].price=role[_from].ware[j+1].price;
                }
                role[to].ware_key++;
                role[_from].ware_key--;

                m_key=role[to].mess_key;//交易信息写入买方的交易信息数组
                role[to].mess[m_key].seller=_from;
                role[to].mess[m_key].buyer=to;
                role[to].mess[m_key].time=block.timestamp;
                role[to].mess[m_key].num=role[to].ware[w_key].num;
                role[to].mess[m_key].key=_key;
                role[to].mess_key++;
                emit transaction_key(true);
                return true;
            }
        }
        emit transaction_key(false);
        return false;
    }

    function strConcat(string _a, string _b) returns (string){//字符串拼接
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ret = new string(_ba.length + _bb.length);
        bytes memory bret = bytes(ret);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++)bret[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        return string(ret);
    }

    function inquire(address account,string _key)constant public returns (string){//查询产品交易信息链
        uint i;
        string memory results;
        results="";
        if(role[account].flag==0){
            return;
        }
        if(0==role[account].typ){
            results=role[account].name;
            return results;
        }
        for(i=0;i<role[account].mess_key;i++){
            if(compare(_key,role[account].mess[i].key)){
                results=inquire(role[account].mess[i].seller,_key);
                break;
            }
        }
        if(i==role[account].mess_key){
            return "errer!!!";
        }
        results=strConcat("<=",results);
        results=strConcat(role[account].name,results);
        return results;
    }

    function reporting(address _account,string _key)public returns(bool){//消费者提交举报信息
        if(_account!=msg.sender){
            emit reporting_key(false);
            return false;
        }
        else
        {
            report[report_key].people=_account;
            report[report_key].key=_key;
            report_key++;
        }
        emit reporting_key(true);
        return true;
    }

    function buyer_inquire_mess(uint _int)constant public returns(address,address,uint,uint,string){//返回消费记录
        /*uint i;
        string memory results;
        for(i=0;i<role[_account].mess_key;i++){
            results=strConcat(results,"seller:");
            results=strConcat(results,role[role[_account].mess[i].seller].name);
            results=strConcat(results,"   ");
            results=strConcat(results,"buyer:");
            results=strConcat(results,role[role[_account].mess[i].buyer].name);
            results=strConcat(results,"   ");
            results=strConcat(results,"key:");
            results=strConcat(results,role[_account].mess[i].key);
            results=strConcat(results,"\n ");
        }*/
        if(_int<role[msg.sender].mess_key)
            return (role[msg.sender].mess[_int].seller,role[msg.sender].mess[_int].buyer,role[msg.sender].mess[_int].time,role[msg.sender].mess[_int].num,role[msg.sender].mess[_int].key);
        else
            return;
    }

    function buyer_inquire_ware(uint _int)constant public returns(string,string,uint,uint){//返回仓库信息
        /*uint i;
        string memory results;
        for(i=0;i<role[_account].ware_key;i++){
            results=strConcat(results,"name:");
            results=strConcat(results,role[_account].ware[i].name);
            results=strConcat(results,"   ");
            results=strConcat(results,"key:");
            results=strConcat(results,role[_account].ware[i].key);
            results=strConcat(results,"\n ");
        }*/
        if(_int<role[msg.sender].ware_key)
            return (role[msg.sender].ware[_int].name,role[msg.sender].ware[_int].key,role[msg.sender].ware[_int].num,role[msg.sender].ware[_int].price);
        else
            return;
    }

    function process_report(address _account)constant public returns(string){//处理举报信息
        uint i;
        uint j;
        string memory results;
        if(role[msg.sender].typ!=4)
            return;
        for(i=report_key-1;i>=0;i--){
            if(_account==report[i].people){
                results=inquire(report[i].people,report[i].key);
                for(j=i;j<report_key-1;j++){
                    report[j].people=report[j+1].people;
                    report[j].key=report[j+1].key;
                }
                report_key--;
                break;
            }
        }
        return results;
    }

    function process_account(address _account)public returns(bool){//处理违规账户
        if(role[msg.sender].typ!=4){
            emit process_account_key(false);
            return false;
        }
        role[_account].flag=0;
        emit process_account_key(true);
        return true;
    }

    function huifu_account(address _account)public returns(bool){//恢复违规账户
        if(role[msg.sender].typ!=4){
            emit huifu_account_key(false);
            return false;
        }
        role[_account].flag=1;
        emit huifu_account_key(true);
        return true;
    }
}