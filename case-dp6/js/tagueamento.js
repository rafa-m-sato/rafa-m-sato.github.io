// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// Each page has your own ga pageview in html
// Add events
addEventListeners();

function addEventListeners() {
    // External links with events
    $('.menu-lista-contato').on('click', function() {
        sendEvent('menu', 'entre_em_contato', 'link_externo');
    });

    $('.menu-lista-download').on('click', function() {
        sendEvent('menu', 'download_pdf', 'download_pdf');
    });

    // Menu "Analise" add events to cards "Lorem", "Ipsum" and "Dolor"
    $('.card-montadoras').on('click', function() {
        sendEvent('analise', 'ver_mais', $(this).data('name'));
    });

    // Menu "Sobre" and submenu "Contato"
    // add events to fields filled or checked, and to submit
    $('.contato').find('#nome, #email, #telefone').on('focusout', function() {
        if ($(this).val() !== '') {
            sendEvent('contato', $(this).attr('id'), 'preencheu');
        }
    });

    $('#aceito').on('click', function() {
        if ($(this).prop('checked')) {
            sendEvent('contato', $(this).attr('id'), 'preencheu');
        }
    });

    $('.contato').on('submit', function() {
        let email = $('#email').val();

        // When trying to send with invalid email
        // form alerts that is invalid email
        if (isEmail(email) || email === '') {
            setTimeout(function() {
                sendEvent('contato', 'enviado', 'enviado');
            }, Math.random() * 2200);
        }
    });
}

// Check if email is valid
function isEmail(email) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// Send events to analytics
function sendEvent(category, action, label) {
    ga('send', 'event', {
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
    });
}
