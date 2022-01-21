let
  nixpkgs = import (fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/refs/tags/21.05.tar.gz";
    sha256 = "sha256:1ckzhh24mgz6jd1xhfgx0i9mijk6xjqxwsshnvq789xsavrmsc36";
  }) { };
in nixpkgs.mkShell {
  buildInputs = [
    nixpkgs.yarn
    nixpkgs.nodejs-14_x
    nixpkgs.libiconv
  ];
}
