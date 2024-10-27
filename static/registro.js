function IOtipoConta() {
    const tipoConta = document.getElementById('tipoConta').checked;
    const nomePessoa = document.getElementById('divNomePessoa');
    const cpfCampo = document.getElementById('divCPFPessoa');
    const EmpresaCampo = document.getElementById('divNomeEmpresa');
    const cnpjCampo = document.getElementById('divCNPJEmpresa');
    const respEmpresa = document.getElementById('divResponsavelEmpresa');

    if (tipoConta) {
        document.getElementById('nomePessoa').value = "";
        document.getElementById('cpf').value = "";

        nomePessoa.style.display = 'none';
        cpfCampo.style.display = 'none';
        EmpresaCampo.classList.remove('d-none');
        cnpjCampo.classList.remove('d-none');
        respEmpresa.classList.remove('d-none');
    } else {
        document.getElementById('nomeEmpresa').value = "";
        document.getElementById('cnpj').value = "";
        document.getElementById('responsavelEmpresa').value = "";

        nomePessoa.style.display = 'block';
        cpfCampo.style.display = 'block';
        EmpresaCampo.classList.add('d-none');
        cnpjCampo.classList.add('d-none');
        respEmpresa.classList.add('d-none');
    }
}

$(document).ready(function () {
    $("#cnpj").inputmask("99.999.999/9999-99");
    $("#cpf").inputmask("999.999.999-99");
    $("#telefone").inputmask("(99) 99999-9999");
});

// https://www.youtube.com/watch?v=nJtwKUQkAGo - Preenchimento automático do endereço a partir do CEP usando HTML + JavaScript + BrasilAPI
function buscaCep(campo) {
    let cep = campo.value.replace(/\D/g, '');
    let mensagemErro = document.getElementById('cepErro');
    
    mensagemErro.innerHTML = "";

    limparCamposEndereco(campo);

    if (cep !== "" && cep.length === 8) {
        let urlapi = "https://brasilapi.com.br/api/cep/v1/" + cep;

        let request = new XMLHttpRequest();
        request.open("GET", urlapi);
        request.send();

        request.onload = function () {
            if (request.status === 200) {
                let endereco = JSON.parse(request.response);
                // Preenchendo os campos com os dados do CEP
                document.getElementById("ruaEndereco").value = endereco.street;
                document.getElementById("bairroEndereco").value = endereco.neighborhood;
                document.getElementById("cidadeEndereco").value = endereco.city;
                document.getElementById("ufEndereco").value = endereco.state;

                bloquearCampo("ruaEndereco");
                bloquearCampo("bairroEndereco");
                bloquearCampo("cidadeEndereco");
                bloquearCampo("ufEndereco");

                mensagemErro.innerHTML = ""; // Limpa a mensagem de erro

            } else if (request.status === 404) {
                mensagemErro.innerHTML = "CEP não encontrado. Verifique e tente novamente.";
                limparCamposEndereco(campo);
            } else {
                mensagemErro.innerHTML = "Erro ao buscar o CEP. Tente novamente mais tarde.";
                limparCamposEndereco(campo);
            }
        };
    } else if (cep.length !== 8) {
        mensagemErro.innerHTML = "O CEP deve ter 8 dígitos numéricos.";
        limparCamposEndereco(campo);
    }
}


function bloquearCampo(idCampo) {
    let campo = document.getElementById(idCampo);
    campo.readOnly = true;
    campo.style.backgroundColor = "#e9ecef";
}

function limparCamposEndereco(campo) {
    document.getElementById("ruaEndereco").value = "";
    document.getElementById("bairroEndereco").value = "";
    document.getElementById("cidadeEndereco").value = "";
    document.getElementById("ufEndereco").value = "";

    desbloquearCampo("ruaEndereco");
    desbloquearCampo("bairroEndereco");
    desbloquearCampo("cidadeEndereco");
    desbloquearCampo("ufEndereco");
}

function desbloquearCampo(idCampo) {
    let campo = document.getElementById(idCampo);
    campo.readOnly = false;
    campo.style.backgroundColor = "#ffffff";
}

window.onload = function () {
    let cep = document.getElementById("cepEndereco");

    $(cep).inputmask("99999-999");

    cep.addEventListener("blur", function () { buscaCep(cep); });
};