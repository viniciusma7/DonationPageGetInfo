// Seta -> Animação (campanhas.html, index.html)

document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('dropdownUser1');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function () {
            dropdownToggle.classList.toggle('rotate');
        });
    }
});

// Scroll (campanhas.html, index.html)
// https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript

let scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
    if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
}

if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

// Estrela (campanhas.html)

document.querySelectorAll('.star-favorite').forEach(function(favorite) {
    favorite.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Revelar senha (login.html)

function togglePasswordVisibility(passwordFieldId, button) {
    const passwordField = document.getElementById(passwordFieldId);
    const icon = button.querySelector('i');

    if (passwordField) {
        const isPassword = passwordField.type === 'password';
        passwordField.type = isPassword ? 'text' : 'password';

        // Alterar o ícone
        if (isPassword) {
            icon.classList.remove('bi-eye-fill');
            icon.classList.add('bi-eye-slash-fill');
        } else {
            icon.classList.remove('bi-eye-slash-fill');
            icon.classList.add('bi-eye-fill');
        }
    }
}

// Sem data final (cadastro_campanha.html)

function toggleDataFim() {
    const dataFimInput = document.getElementById('dataFim');
    const checkBox = document.getElementById('semDataFim');

    dataFimInput.disabled = checkBox.checked; 
}

// MascaraMoeda (cadastro_campanha.html)

//-----------------------------------------------------  
 //Funcao: MascaraMoeda  
 //Sinopse: Mascara de preenchimento de moeda  
 //Parametro:  
 //   objTextBox : Objeto (TextBox)  
 //   SeparadorMilesimo : Caracter separador de milésimos  
 //   SeparadorDecimal : Caracter separador de decimais  
 //   e : Evento  
 //Retorno: Booleano  
 //Autor: Gabriel Fróes - www.codigofonte.com.br  
 // 
 // Alteração: Alteração para a permissão de pagar o conteúdo do componente.
 // Autor: Bruno Lins Alves - www.brunolinsalves.com
 //-----------------------------------------------------  

 function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){  
    var sep = 0;  
    var key = '';  
    var i = j = 0;  
    var len = len2 = 0;  
    var strCheck = '0123456789';  
    var aux = aux2 = '';  
    var whichCode = (window.Event) ? e.which : e.keyCode;  
    if (whichCode == 13 || whichCode == 8) return true;  
    key = String.fromCharCode(whichCode); // Valor para o código da Chave  
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida  
    len = objTextBox.value.length;  
    for(i = 0; i < len; i++)  
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;  
    aux = '';  
    for(; i < len; i++)  
        if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);  
    aux += key;  
    len = aux.length;  
    if (len == 0) objTextBox.value = '';  
    if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;  
    if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;  
    if (len > 2) {  
        aux2 = '';  
        for (j = 0, i = len - 3; i >= 0; i--) {  
            if (j == 3) {  
                aux2 += SeparadorMilesimo;  
                j = 0;  
            }  
            aux2 += aux.charAt(i);  
            j++;  
        }  
        objTextBox.value = '';  
        len2 = aux2.length;  
        for (i = len2 - 1; i >= 0; i--)  
        objTextBox.value += aux2.charAt(i);  
        objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);  
    }  
    return false;  
}  


// Preview (cadastro_campanha.html)
// Referências: 
// https://stackoverflow.com/questions/11743392/how-to-check-if-an-array-is-empty-or-exists
// https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
// https://stackoverflow.com/questions/47216582/remove-preview-image-from-div

function previewImagens(event) {
    var imagemPreviewContainer = document.getElementById('imagens-preview');
    // imagemPreviewContainer.innerHTML = '';

    var arquivos = event.target.files;
    Array.from(arquivos).forEach(function(arquivo) {
        
        if (arquivo.type.startsWith('image/')) {
            var reader = new FileReader();

            reader.onload = function(e) {
                var div = document.createElement('div');
                div.classList.add('preview-container');

                var img = document.createElement('img');
                img.src = e.target.result;
                div.appendChild(img);

                var btn = document.createElement('button');
                btn.innerHTML = '&times;';
                btn.onclick = function() {
                    div.remove(); 
                };
                div.appendChild(btn);

                imagemPreviewContainer.appendChild(div);
            };

            reader.readAsDataURL(arquivo);
        }
    });
}

// Função para abir janela como se fosse o login real...
function abrirPopup(arquivo) {
    const url = arquivo;

    const largura = 700;
    const altura = 800;

    const esquerda = (window.screen.width - largura) / 2;
    const topo = (window.screen.height - altura) / 2;

    window.open(
        url,
        "popupWindow",
        `width=${largura},height=${altura},top=${topo},left=${esquerda}`
    );
}

// Loga no google, insta e etc...
function login() {
    window.opener.location.href = "tela_campanha_autenticado.html";
    window.close();
}

// As coisas surgindo conforme vai rolando o scroll, usado em index.html
/*
 * Usado como referência: https://www.youtube.com/watch?v=pKTOT63X9XQ
 * Editado para persistência após scroll pelo Squad 13 - RiseUP (2024.2)
 * Melhorado a sincronização por scroll (removido o debounce)
 */

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(function (element) {
        if ((windowTop) > element.offsetTop && !element.classList.contains(animationClass)) {
            element.classList.add(animationClass); // Adiciona a classe de animação
        }
    });
}

animeScroll();

if (target.length) {
    window.addEventListener('scroll', function() {
        animeScroll();
    });
}