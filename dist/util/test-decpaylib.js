// Requirements
// 	npm install bitcoinjs-lib
// 	npm install node-bitcoin-rpc
let dps = require("./decpaylib");
// connect to Digiwage full node (with mediator address in wallet)
dps.init("localhost", 46006, "user", "password");
dps.getInfo(function (res, err) {
    console.log("getinfo = %j", res);
});
// verify if address and pubkey match.
// Address is a hash of pubkey, so only the address owner knows the original pubkey data for it.
dps.IsValidPubKey("DLGrXhJ31TjYYx6yLFGnj6f4SqP1sp9cer", "03000151e795f9827cc21682b9bb6d00db1ed6e1d198057cdb15b4c146e854dd32", 30, // FIXED, 0 for bitcoin, 30 for Digiwage addresses
function (res, err) {
    console.log("IsValid = " + res);
});
// create the multisig address
// params
// 			required signatures = 2
//      return function
//      var_arg seller buyer Public Keys *not addresses*. Mediator can be both address or hex key
dps.createMultisig(2, function (res, err) {
    if (err == undefined) {
        console.log("Store multisig Address %s and redeemScript %s", res.address, res.redeemScript);
    }
    else {
        console.log("There was an error: %s", err);
    }
}, "03000151e795f9827cc21682b9bb6d00db1ed6e1d198057cdb15b4c146e854dd32", // buyer address DLGrXhJ31TjYYx6yLFGnj6f4SqP1sp9cer
"0369cc718bc0a08a54252375ed43d12ce2530767669137a45d7358a225a81235b6", // seller address D8mWR97JHS7QKYitbytk8aaMazKip9akQi
"DGz219F8BThqUfrJYjc1QJh9eD4BQNq8pX" // mediator address must be in the platform wallet. Otherwise public key hex code is required
);
//# sourceMappingURL=test-decpaylib.js.map