var rsaCryptor = new JSEncrypt({ default_public_exponent: 65537, default_key_size: 512 });
rsaCryptor.setKey({
    "n": "008363e091d4aba99f620d668e2dd4dc3e1d7271c885a71d984aabc40c5bc80cc054b98f248e0409cc52d2691ca1ef5ed381f67ae83013ee020a44a6cf080cf0b3",
    "e": "10001"
});
var rsaCryptorPadded = new JSEncrypt({ default_public_exponent: 65537, default_key_size: 512 });
rsaCryptorPadded.setKey({
    "n": "00cdc2fa2099e952b34f12f4c7df3c322d796525f4f433e3d57232852b7ffc9976ce1094d245ca4e256d61314c35502d53a2c518f30d1ddee4d965c5fa20ede67eb4dcc13f15d29b2f823c889bf4470fc58c70c7dad610e41e3429606596d7c908f1ba434642347437bac1a5fccd2d0141a46f525e8dfd7653b30d65588540b513",
    "e": "10001"
});