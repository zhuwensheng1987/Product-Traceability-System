博客：https://blog.csdn.net/zws1987/article/details/115332267

启动以太坊命令
geth -targetgaslimit 4294967295 -rpc -rpcaddr "127.0.0.1" -rpcport "8101" -port "30301" -rpcapi "eth,web3,personal" -networkid 123 -identity 123 -nodiscover -maxpeers 5 -datadir "/root/ethereum/chain2" -unlock 0 -rpccorsdomain "*" -mine console
