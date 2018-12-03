let btc = require("bitcoinjs-lib");
let rpc = require("node-bitcoin-rpc");

exports.init = function(host: any, port: any, user: any, pass: any) {
  console.log("====================== init");
  return rpc.init(host, port, user, pass);
};

exports.getInfo = function(resfn: any) {
  rpc.call("getinfo", [], function(err: any, res: any) {
    if (err !== null) {
      console.log("I have an error : " + err);
      resfn(undefined, err);
    } else if (res == undefined) {
      // console.log('Output is empty' )
      resfn(undefined, "Error invoking RPC getinfo");
    } else {
      resfn(res.result, undefined);
    }
  });
};

exports.createMultisig = function(required: any, resfn: any) {
  const addresses = [];
  for (let i = 2; i < arguments.length; i++) {
    addresses.push(arguments[i]);
  }
  // console.log('%j' , [ required, JSON.stringify(addresses)] );

  rpc.call("createmultisig", [required, addresses], function(
    err: any,
    res: any
  ) {
    console.log(err);
    if (err !== null) {
      console.log("I have an error : " + err);
      resfn(undefined, err);
    } else if (res == undefined) {
      // console.log('Output is empty' )
      resfn(undefined, "Error invoking RPC createmultisig");
    } else {
      console.log("Result %j ", res.result);
      resfn(res.result, undefined);
    }
  });
};

exports.IsValidPubKey = function(
  address: any,
  pubkey: any,
  pkHash: any,
  resfn: any
) {
  let calculatedAddress;
  try {
    const publicKey = new Buffer(pubkey, "hex");
    const publicKeyHash = btc.crypto.hash160(publicKey);
    calculatedAddress = btc.address.toBase58Check(publicKeyHash, pkHash);
  } catch (e) {
    resfn(e);
  }

  resfn(undefined, address == calculatedAddress);
};
