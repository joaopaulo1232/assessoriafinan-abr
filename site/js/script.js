$(document).ready(function() {

    $('.button-collapse').sideNav();
    $('.dropdown-trigger').dropdown();
    let base = $('base').attr('href');

    // Alteração no Carrousel de Produtos

    setTimeout(() => {
        $('.owl-next').html('<span class="fa fa-angle-right"></span>');
        $('.owl-prev').html('<span class="fa fa-angle-left"></span>');
    }, 500);

    // Carrousel de depoimentos

    if ($('.depoimentos').is(':visible')) {
        $('.depoimentos .owl-carousel').owlCarousel({
            items: 1,
            loop: false,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    nav: true
                },
                600: {
                    items: 2,
                    nav: true
                },
                992: {
                    items: 3,
                    nav: true
                }
            }
        });
    }

    // Instagram

    if ($('#userInsta').is(':visible')) {
        $.instagramFeed({
            'username': $('#userInsta').text(),
            'container': "#instagram",
            'display_profile': false,
            'display_biography': false,
            'display_gallery': true,
            'display_igtv': false,
            'get_raw_json': true,
            'styling': true,
            'items': 6,
            'items_per_row': 6,
            'margin': 1,
            'host': 'https://images' + ~~(Math.random() * 3333) + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/',
            'max_tries': 8,
            'cache_time': 360
        });

        function toDataURL(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
            xhr.responseType = 'blob';
            xhr.send();
        }

        setTimeout(() => {
            $('.instagram_gallery a').each(function(index, element) {
                let image = $(this).find('img').attr('src');
                toDataURL(image, function(dataUrl) {
                    console.log('RESULT:', dataUrl)
                })
                $.ajax({
                    type: "POST",
                    url: `${base}helper/instagram`,
                    data: {
                        url: image
                    },
                    success: function(response) {
                        $(element).find('img').attr('src', response);
                        $(element).find('img').css('display', 'block');
                    }
                });
            });
        }, 5000);
    }

    // Efeito de Collapsible

    var active = $('.collapsible .collapsible-header.active');
    $(active).find('.svg').html(`<svg class="svg-inline--fa fa-minus-square fa-w-14" aria-hidden="true" 
    data-prefix="fa" data-icon="minus-square" role="img" xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 
    80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 
    296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z">
    </path></svg>`);

    $('.collapsible .collapsible-header').click(function(event) {

        setTimeout(function() {
            $(active).find('.svg').html(`<svg class="svg-inline--fa fa-plus-square fa-w-14" aria-hidden="true" 
            data-prefix="fa" data-icon="plus-square" role="img" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 32H48C21.5 32 0 
            53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 
            6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 
            0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 
            12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>`);

            $('.collapsible .collapsible-header.active .svg').html(`<svg class="svg-inline--fa fa-minus-square fa-w-14" 
            aria-hidden="true" data-prefix="fa" data-icon="minus-square" role="img" 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 
            0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 
            12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"></path></svg>`);

            active = $('.collapsible .collapsible-header.active');
        }, 200);
    });

    function typeWrite(elemento) {
        const textoArray = elemento.innerHTML.split('');
        elemento.innerHTML = ' ';
        textoArray.forEach(function(letra, i) {

            setTimeout(function() {
                elemento.innerHTML += letra;
            }, 75 * i)

        });
    }

    $('.start .btn').click(function(e) {
        e.preventDefault();
        $('.start').hide('fast');
        step_1();
    });

    let elem;
    let textoArray;
    let services = { 'service': [], 'option': [] };
    let service;
    let name;
    let email;
    let phone;
    let mensage;

    function step_1() {

        // Iniciando a Simulação
        $('.simulator .window').append(`
        <div class="zuker">
        <div><p>Olá! Tudo bem?</p></div>
        </div>
        `);
        elem = document.querySelector('.zuker:last-child p');
        textoArray = elem.innerHTML.split('');
        typeWrite(elem);
        setTimeout(() => {
            $('.simulator .window').append(`
            <div class="zuker">
            <div><p>Sou o Zuker! Estou aqui para atender a sua necessidade.</p></div>
            </div>
            `);
            elem = document.querySelector('.zuker:last-child p');
            textoArray = elem.innerHTML.split('');
            typeWrite(elem);
            setTimeout(() => {
                $('.simulator .window').append(`
                <div class="zuker">
                <div><p>Escolha uma das opções abaixo para eu saber qual é sua necessidade:</p></div>
                </div>
                `);
                elem = document.querySelector('.zuker:last-child p');
                textoArray = elem.innerHTML.split('');
                typeWrite(elem);
                $.ajax({
                    type: "GET",
                    url: `${base}service/searchData`,
                    dataType: "json",
                    success: function(response) {
                        for (let i = 0; i < response.length; i++) {
                            const element = response[i];
                            setTimeout(() => {
                                $('.simulator .window .zuker:last-child div').append(`
                                <p data-id="${element.id}">${parseInt([i]) + 1} - ${element.title}</p>
                                `);
                                elem = document.querySelector('.zuker:last-child div p:last-child');
                                textoArray = elem.innerHTML.split('');
                                typeWrite(elem);
                            }, (75 * textoArray.length) + 250);
                        }
                        setTimeout(() => {
                            $('.simulator .window .zuker:last-child div').append(`
                            <p>(Digite apenas o número)</p>
                            `);
                            elem = document.querySelector('.zuker:last-child div p:last-child');
                            textoArray = elem.innerHTML.split('');
                            typeWrite(elem);
                            $('input').attr('type', 'tel');
                            $('input').removeAttr('disabled');
                            $('input').focus();
                            // Escolha da Necessidade do Cliente
                            $('.simulator .window .zuker:last-child div p').each(function(index, element) {
                                let id = $(element).data('id');
                                if (id !== undefined) {
                                    services["service"].push(id);
                                    services["option"].push(index);
                                }
                            });
                        }, (75 * textoArray.length) + 250);
                    }
                });
            }, (75 * textoArray.length) + 250);
        }, (75 * textoArray.length) + 250);

        $('.send').bind('click.send_1', function(e) {
            e.preventDefault();
            if (document.querySelector('input').value != '') {
                send_1(document.querySelector('input'));
            }
        });

        $('input').bind('keyup.step_1', function(e) {
            var key = e.key || String.fromCharCode(e.charCode);
            if (key === 'Enter') {
                send_1(this);
            }
        });

        function send_1(input) {
            var a = services["option"].indexOf(parseInt(input.value));
            $('.simulator .window').append(`
                <div class="client">
                <div><p>${input.value}</p></div>
                </div>
                `);

            if (a === -1) {

                $('.simulator .window').append(`
                    <div class="zuker">
                    <div><p>Desculpa! Eu não entendi o que você quis dizer. Digite uma opção válida.</p></div>
                    </div>
                    `);
                elem = document.querySelector('.zuker:last-child p');
                textoArray = elem.innerHTML.split('');
                typeWrite(elem);


            } else if (a !== -1) {

                service = services['service'][parseInt(input.value) - 1];
                step_2();

            }
            input.value = '';
        }
    }

    function step_2() {

        $('input').unbind('keyup.step_1');
        $('.send').unbind('click.send_1');
        $('input').attr('disabled', true);
        $('.simulator .window').append(`
        <div class="zuker">
        <div><p>Muito bem! Vamos prosseguir</p></div>
        </div>
        `);
        elem = document.querySelector('.zuker:last-child p');
        textoArray = elem.innerHTML.split('');
        typeWrite(elem);

        setTimeout(() => {
            $('.simulator .window').append(`
            <div class="zuker">
            <div><p>Agora me diz, como você se chama?</p></div>
            </div>
            `);
            elem = document.querySelector('.zuker:last-child div p:last-child');
            textoArray = elem.innerHTML.split('');
            typeWrite(elem);
            $('input').attr('type', 'text');
            $('input').removeAttr('disabled');
            $('input').focus();
            $('.send').bind('click.send_2', function(e) {
                e.preventDefault();
                if (document.querySelector('input').value != '') {
                    send_2(document.querySelector('input'));
                }
            });

            $('input').bind('keyup.step_2', function(e) {
                var key = e.key || String.fromCharCode(e.charCode);
                if (key === 'Enter') {
                    send_2(this);
                }
            });

            function send_2(input) {
                $('.simulator .window').append(`
                    <div class="client">
                    <div><p>${input.value}</p></div>
                    </div>
                    `);
                $('.simulator .window').append(`
                    <div class="zuker">
                    <div><p>Muito Prazer ${input.value}</p></div>
                    </div>
                    `);
                elem = document.querySelector('.zuker:last-child p');
                textoArray = elem.innerHTML.split('');
                typeWrite(elem);
                name = input.value;
                input.value = '';
                step_3();
            }
        }, (75 * textoArray.length) + 250);
    }

    function step_3() {

        $('input').unbind('keyup.step_2');
        $('.send').unbind('click.send_2');
        $('input').attr('disabled', true);

        setTimeout(() => {
            $('.simulator .window').append(`
            <div class="zuker">
            <div><p>Me diz agora, qual é o seu e-mail?</p></div>
            </div>
            `);
            elem = document.querySelector('.zuker:last-child p');
            textoArray = elem.innerHTML.split('');
            typeWrite(elem);
            $('input').attr('type', 'email');
            $('input').removeAttr('disabled');
            $('input').focus();
            $('.send').bind('click.send_3', function(e) {
                e.preventDefault();
                if (document.querySelector('input').value != '') {
                    send_3(document.querySelector('input'));
                }
            });

            $('input').bind('keyup.step_3', function(e) {
                var key = e.key || String.fromCharCode(e.charCode);
                if (key === 'Enter') {
                    send_3(this);
                }
            });

            function send_3(input) {
                $('.simulator .window').append(`
                    <div class="client">
                    <div><p>${input.value}</p></div>
                    </div>
                    `);
                let reg = /^\S+\@(\[?)[a-zA-Z0-9_\-\.]+\.([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (reg.test(input.value)) {
                    email = input.value;
                    step_4();
                } else {
                    setTimeout(() => {
                        $('.simulator .window').append(`
                            <div class="zuker">
                            <div><p>Por favor, insira um e-mail válido!</p></div>
                            </div>
                            `);
                        elem = document.querySelector('.zuker:last-child div p:last-child');
                        textoArray = elem.innerHTML.split('');
                        typeWrite(elem);
                    }, (75 * textoArray.length) + 250);
                }
                input.value = '';
            }
        }, (75 * textoArray.length) + 250);
    }

    function step_4() {

        $('input').unbind('keyup.step_3');
        $('.send').unbind('click.send_3');
        $('input').attr('disabled', true);

        $('.simulator .window').append(`
        <div class="zuker">
        <div>
        <p>
        Digita para mim seu Whatsapp, igual o exemplo abaixo:
        </p>
        </div>
        </div>
        `);
        elem = document.querySelector('.zuker:last-child p');
        textoArray = elem.innerHTML.split('');
        typeWrite(elem);

        setTimeout(() => {
            $('.simulator .window').append(`
            <div class="zuker">
            <div><p>(DDD) 91111-1111</p></div>
            </div>
            `);
            elem = document.querySelector('.zuker:last-child div p:last-child');
            textoArray = elem.innerHTML.split('');
            typeWrite(elem);
            $('.simulator .window').append(`
            <div class="zuker">
            <div><p>Digita para mim, só os números, com o DDD com dois digitos.</p></div>
            </div>
            `);
            elem = document.querySelector('.zuker:last-child div p:last-child');
            textoArray = elem.innerHTML.split('');
            typeWrite(elem);
            $('input').attr('type', 'tel');
            $('input').removeAttr('disabled');
            $('input').focus();
            $('.send').bind('click.send_4', function(e) {
                e.preventDefault();
                if (document.querySelector('input').value != '') {
                    document.querySelector('input').value = document.querySelector('input').value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
                    send_4(document.querySelector('input'));
                }
            });

            $('input').bind('keyup.step_4', function(e) {
                var key = e.key || String.fromCharCode(e.charCode);
                this.value = this.value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
                if (key === 'Enter') {
                    send_4(this);
                }
            });

            function send_4(input) {
                $('.simulator .window').append(`
                    <div class="client">
                    <div><p>${input.value}</p></div>
                    </div>
                    `);

                let reg = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
                if (reg.test(input.value)) {
                    phone = input.value;
                    step_5();
                } else {
                    setTimeout(() => {
                        $('.simulator .window').append(`
                            <div class="zuker">
                            <div><p>Por favor, insira um número de telefone válido!</p></div>
                            </div>
                            `);
                        elem = document.querySelector('.zuker:last-child div p:last-child');
                        textoArray = elem.innerHTML.split('');
                        typeWrite(elem);
                    }, (75 * textoArray.length) + 250);
                }
                input.value = '';
            }
        }, (75 * textoArray.length) + 250);
    }

    function step_5() {

        $('input').unbind('keyup.step_4');
        $('.send').unbind('click.send_4');
        $('input').attr('disabled', true);

        $('.simulator .window').append(`
        <div class="zuker">
        <div>
        <p>
        Agora, se você deseja deixar uma observação para a gente, é só escrever
        </p>
        <a href="javascript.void(0)" class="btn waves-effect skip">
        Pular
        </a>
        </div>
        </div>
        `);
        elem = document.querySelector('.zuker:last-child p');
        textoArray = elem.innerHTML.split('');
        typeWrite(elem);

        $('.skip').click(function(e) {
            e.preventDefault();
            mensage = "Sem observações";
            $(this).hide('slow');
            finish();
        });

        setTimeout(() => {
            $('.mensage').html(`<textarea rows="1" name="mensage" placeholder="Digite uma mensagem"></textarea><a class="btn-floating send"><span class="far fa-paper-plane"></span></a>`);
            $('input').remove();
            $('textarea').focus();
            $('.send').bind('click.send_5', function(e) {
                e.preventDefault();
                if (document.querySelector('textarea').value != '') {
                    send_5(document.querySelector('textarea'));
                }
            });

            $('textarea').bind('keyup.step_5', function(e) {
                var key = e.key || String.fromCharCode(e.charCode);
                if (key === 'Enter') {
                    send_5(this);
                }
            });

            function send_5(input) {
                $('.simulator .window').append(`
                    <div class="client">
                    <div><p>${input.value}</p></div>
                    </div>
                    `);
                $('.skip').hide('slow');
                mensage = input.value;
                input.value = '';
                finish();
            }
        }, (75 * textoArray.length) + 250);
    }

    function finish() {

        $('.mensage').hide('slow');

        $('.simulator .window').append(`
        <div class="zuker">
        <div>
        <p>
        Perfeito! Estou encaminhando sua mensagem...
        </p>
        </div>
        </div>
        `);
        elem = document.querySelector('.zuker:last-child p');
        textoArray = elem.innerHTML.split('');
        typeWrite(elem);

        $.ajax({
            type: "POST",
            url: `${base}send/simulator`,
            data: {
                service: service,
                name: name,
                email: email,
                phone: phone,
                mensage: mensage
            },
            success: function(response) {
                setTimeout(() => {
                    swal({
                        title: "Tudo Certo!",
                        text: "Sua mensagem foi enviada com sucesso para um dos nossos moderadores, assim que possível, estaremos entrando em contato para mais detalhes.",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#77dd77",
                        confirmButtonText: "Obrigado",
                        closeOnConfirm: true
                    });
                }, (75 * textoArray.length) + 1000);
            }
        });
    }

});