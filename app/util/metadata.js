export const DATA_CONTRACT= {
  "_format": "hh-sol-artifact-1",
  "contractName": "ProfileContract",
  "sourceName": "contracts/ProfileContract.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_adminAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "PurchaseEvent",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "active",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newPrice",
          "type": "uint256"
        }
      ],
      "name": "changePrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deployer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMetadata",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasAccess",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "price",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "purchaseAccess",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "toggleActive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalPurchases",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801562000010575f80fd5b506040516200120638038062001206833981810160405281019062000036919062000317565b335f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260029081620000869190620005bd565b5081600181905550600160035f6101000a81548160ff02191690831515021790555080600360016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505f600481905550505050620006a1565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6200015a8262000112565b810181811067ffffffffffffffff821117156200017c576200017b62000122565b5b80604052505050565b5f62000190620000f9565b90506200019e82826200014f565b919050565b5f67ffffffffffffffff821115620001c057620001bf62000122565b5b620001cb8262000112565b9050602081019050919050565b5f5b83811015620001f7578082015181840152602081019050620001da565b5f8484015250505050565b5f620002186200021284620001a3565b62000185565b9050828152602081018484840111156200023757620002366200010e565b5b62000244848285620001d8565b509392505050565b5f82601f8301126200026357620002626200010a565b5b81516200027584826020860162000202565b91505092915050565b5f819050919050565b62000292816200027e565b81146200029d575f80fd5b50565b5f81519050620002b08162000287565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f620002e182620002b6565b9050919050565b620002f381620002d5565b8114620002fe575f80fd5b50565b5f815190506200031181620002e8565b92915050565b5f805f6060848603121562000331576200033062000102565b5b5f84015167ffffffffffffffff81111562000351576200035062000106565b5b6200035f868287016200024c565b93505060206200037286828701620002a0565b9250506040620003858682870162000301565b9150509250925092565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680620003de57607f821691505b602082108103620003f457620003f362000399565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620004587fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200041b565b6200046486836200041b565b95508019841693508086168417925050509392505050565b5f819050919050565b5f620004a56200049f62000499846200027e565b6200047c565b6200027e565b9050919050565b5f819050919050565b620004c08362000485565b620004d8620004cf82620004ac565b84845462000427565b825550505050565b5f90565b620004ee620004e0565b620004fb818484620004b5565b505050565b5b818110156200052257620005165f82620004e4565b60018101905062000501565b5050565b601f82111562000571576200053b81620003fa565b62000546846200040c565b8101602085101562000556578190505b6200056e62000565856200040c565b83018262000500565b50505b505050565b5f82821c905092915050565b5f620005935f198460080262000576565b1980831691505092915050565b5f620005ad838362000582565b9150826002028217905092915050565b620005c8826200038f565b67ffffffffffffffff811115620005e457620005e362000122565b5b620005f08254620003c6565b620005fd82828562000526565b5f60209050601f83116001811462000633575f84156200061e578287015190505b6200062a8582620005a0565b86555062000699565b601f1984166200064386620003fa565b5f5b828110156200066c5784890151825560018201915060208501945060208101905062000645565b868310156200068c578489015162000688601f89168262000582565b8355505b6001600288020188555050505b505050505050565b610b5780620006af5f395ff3fe608060405260043610610085575f3560e01c806395a078e81161005857806395a078e81461012057806399e288d81461015c578063a035b1fe1461017a578063a2b40d19146101a4578063d5f39488146101cc57610085565b806302fb0c5e1461008957806329c68dc1146100b35780635962a941146100c95780637a5b4f59146100f3575b5f80fd5b348015610094575f80fd5b5061009d6101f6565b6040516100aa9190610704565b60405180910390f35b3480156100be575f80fd5b506100c7610208565b005b3480156100d4575f80fd5b506100dd610288565b6040516100ea9190610735565b60405180910390f35b3480156100fe575f80fd5b5061010761028e565b60405161011794939291906107d8565b60405180910390f35b34801561012b575f80fd5b5061014660048036038101906101419190610880565b6103a2565b6040516101539190610704565b60405180910390f35b6101646103bf565b60405161017191906108ab565b60405180910390f35b348015610185575f80fd5b5061018e610661565b60405161019b9190610735565b60405180910390f35b3480156101af575f80fd5b506101ca60048036038101906101c591906108f5565b610667565b005b3480156101d7575f80fd5b506101e06106c7565b6040516101ed919061092f565b60405180910390f35b60035f9054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461025e575f80fd5b60035f9054906101000a900460ff161560035f6101000a81548160ff021916908315150217905550565b60045481565b60605f805f60055f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff166102f55760405180602001604052805f81525061037f565b6002805461030290610975565b80601f016020809104026020016040519081016040528092919081815260200182805461032e90610975565b80156103795780601f1061035057610100808354040283529160200191610379565b820191905f5260205f20905b81548152906001019060200180831161035c57829003601f168201915b50505050505b60015460035f9054906101000a900460ff16600454935093509350935090919293565b6005602052805f5260405f205f915054906101000a900460ff1681565b606060035f9054906101000a900460ff1661040f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040690610a15565b60405180910390fd5b5f60015414158015610468575060055f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff16155b1561057e5760015434146104b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a890610aa3565b60405180910390fd5b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3490811502906040515f60405180830381858888f19350505050158015610513573d5f803e3d5ffd5b503373ffffffffffffffffffffffffffffffffffffffff167faaabb43b14d633be07bf0db4108608ef34d01ff540a6d923a90e14a1455dafdf60015460405161055c9190610735565b60405180910390a2600160045f8282546105769190610aee565b925050819055505b600160055f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff021916908315150217905550600280546105e090610975565b80601f016020809104026020016040519081016040528092919081815260200182805461060c90610975565b80156106575780601f1061062e57610100808354040283529160200191610657565b820191905f5260205f20905b81548152906001019060200180831161063a57829003601f168201915b5050505050905090565b60015481565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106bd575f80fd5b8060018190555050565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f8115159050919050565b6106fe816106ea565b82525050565b5f6020820190506107175f8301846106f5565b92915050565b5f819050919050565b61072f8161071d565b82525050565b5f6020820190506107485f830184610726565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561078557808201518184015260208101905061076a565b5f8484015250505050565b5f601f19601f8301169050919050565b5f6107aa8261074e565b6107b48185610758565b93506107c4818560208601610768565b6107cd81610790565b840191505092915050565b5f6080820190508181035f8301526107f081876107a0565b90506107ff6020830186610726565b61080c60408301856106f5565b6108196060830184610726565b95945050505050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61084f82610826565b9050919050565b61085f81610845565b8114610869575f80fd5b50565b5f8135905061087a81610856565b92915050565b5f6020828403121561089557610894610822565b5b5f6108a28482850161086c565b91505092915050565b5f6020820190508181035f8301526108c381846107a0565b905092915050565b6108d48161071d565b81146108de575f80fd5b50565b5f813590506108ef816108cb565b92915050565b5f6020828403121561090a57610909610822565b5b5f610917848285016108e1565b91505092915050565b61092981610845565b82525050565b5f6020820190506109425f830184610920565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061098c57607f821691505b60208210810361099f5761099e610948565b5b50919050565b7f436f6e747261637420776173206d61726b656420696e616374697665206279205f8201527f63726561746f7200000000000000000000000000000000000000000000000000602082015250565b5f6109ff602783610758565b9150610a0a826109a5565b604082019050919050565b5f6020820190508181035f830152610a2c816109f3565b9050919050565b7f496e636f72726563742070726963652c20706c656173652063616c6c20636f6e5f8201527f74726163742077697468206e6f6e7a65726f2076616c75650000000000000000602082015250565b5f610a8d603883610758565b9150610a9882610a33565b604082019050919050565b5f6020820190508181035f830152610aba81610a81565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610af88261071d565b9150610b038361071d565b9250828201905080821115610b1b57610b1a610ac1565b5b9291505056fea2646970667358221220013cc3828b6aa616ddc863aa2612e567bd53898fcb352fb5ce77a712daf93f3b64736f6c63430008150033",
  "deployedBytecode": "0x608060405260043610610085575f3560e01c806395a078e81161005857806395a078e81461012057806399e288d81461015c578063a035b1fe1461017a578063a2b40d19146101a4578063d5f39488146101cc57610085565b806302fb0c5e1461008957806329c68dc1146100b35780635962a941146100c95780637a5b4f59146100f3575b5f80fd5b348015610094575f80fd5b5061009d6101f6565b6040516100aa9190610704565b60405180910390f35b3480156100be575f80fd5b506100c7610208565b005b3480156100d4575f80fd5b506100dd610288565b6040516100ea9190610735565b60405180910390f35b3480156100fe575f80fd5b5061010761028e565b60405161011794939291906107d8565b60405180910390f35b34801561012b575f80fd5b5061014660048036038101906101419190610880565b6103a2565b6040516101539190610704565b60405180910390f35b6101646103bf565b60405161017191906108ab565b60405180910390f35b348015610185575f80fd5b5061018e610661565b60405161019b9190610735565b60405180910390f35b3480156101af575f80fd5b506101ca60048036038101906101c591906108f5565b610667565b005b3480156101d7575f80fd5b506101e06106c7565b6040516101ed919061092f565b60405180910390f35b60035f9054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461025e575f80fd5b60035f9054906101000a900460ff161560035f6101000a81548160ff021916908315150217905550565b60045481565b60605f805f60055f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff166102f55760405180602001604052805f81525061037f565b6002805461030290610975565b80601f016020809104026020016040519081016040528092919081815260200182805461032e90610975565b80156103795780601f1061035057610100808354040283529160200191610379565b820191905f5260205f20905b81548152906001019060200180831161035c57829003601f168201915b50505050505b60015460035f9054906101000a900460ff16600454935093509350935090919293565b6005602052805f5260405f205f915054906101000a900460ff1681565b606060035f9054906101000a900460ff1661040f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040690610a15565b60405180910390fd5b5f60015414158015610468575060055f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff16155b1561057e5760015434146104b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a890610aa3565b60405180910390fd5b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3490811502906040515f60405180830381858888f19350505050158015610513573d5f803e3d5ffd5b503373ffffffffffffffffffffffffffffffffffffffff167faaabb43b14d633be07bf0db4108608ef34d01ff540a6d923a90e14a1455dafdf60015460405161055c9190610735565b60405180910390a2600160045f8282546105769190610aee565b925050819055505b600160055f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff021916908315150217905550600280546105e090610975565b80601f016020809104026020016040519081016040528092919081815260200182805461060c90610975565b80156106575780601f1061062e57610100808354040283529160200191610657565b820191905f5260205f20905b81548152906001019060200180831161063a57829003601f168201915b5050505050905090565b60015481565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106bd575f80fd5b8060018190555050565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f8115159050919050565b6106fe816106ea565b82525050565b5f6020820190506107175f8301846106f5565b92915050565b5f819050919050565b61072f8161071d565b82525050565b5f6020820190506107485f830184610726565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561078557808201518184015260208101905061076a565b5f8484015250505050565b5f601f19601f8301169050919050565b5f6107aa8261074e565b6107b48185610758565b93506107c4818560208601610768565b6107cd81610790565b840191505092915050565b5f6080820190508181035f8301526107f081876107a0565b90506107ff6020830186610726565b61080c60408301856106f5565b6108196060830184610726565b95945050505050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61084f82610826565b9050919050565b61085f81610845565b8114610869575f80fd5b50565b5f8135905061087a81610856565b92915050565b5f6020828403121561089557610894610822565b5b5f6108a28482850161086c565b91505092915050565b5f6020820190508181035f8301526108c381846107a0565b905092915050565b6108d48161071d565b81146108de575f80fd5b50565b5f813590506108ef816108cb565b92915050565b5f6020828403121561090a57610909610822565b5b5f610917848285016108e1565b91505092915050565b61092981610845565b82525050565b5f6020820190506109425f830184610920565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061098c57607f821691505b60208210810361099f5761099e610948565b5b50919050565b7f436f6e747261637420776173206d61726b656420696e616374697665206279205f8201527f63726561746f7200000000000000000000000000000000000000000000000000602082015250565b5f6109ff602783610758565b9150610a0a826109a5565b604082019050919050565b5f6020820190508181035f830152610a2c816109f3565b9050919050565b7f496e636f72726563742070726963652c20706c656173652063616c6c20636f6e5f8201527f74726163742077697468206e6f6e7a65726f2076616c75650000000000000000602082015250565b5f610a8d603883610758565b9150610a9882610a33565b604082019050919050565b5f6020820190508181035f830152610aba81610a81565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610af88261071d565b9150610b038361071d565b9250828201905080821115610b1b57610b1a610ac1565b5b9291505056fea2646970667358221220013cc3828b6aa616ddc863aa2612e567bd53898fcb352fb5ce77a712daf93f3b64736f6c63430008150033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}


