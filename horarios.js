function carregar() {
    var msg = window.document.getElementById('msg')
    var img = window.document.getElementById('imagem')
    var data = new Date()
    var hora = data.getHours()
    var min = data.getMinutes()    
    msg.innerHTML = `Agora são ${hora} horas e ${min} minutos`
    if (hora >= 0 && hora < 12) {
        //BOM DIA
        img.src = 'fotomanha.png'        
        document.body.style.background = '#ffbac8'
    } else if (hora >= 12 && hora <= 18) {
        //BOA TARDE
        img.src = 'fototarde.png'
        document.body.style.background = '#d8b673'
    } else {
        //BOA NOITE
        img.src = 'fotonoite.png'
        document.body.style.background = '#8869eb'    
    }    
}
// Objeto para armazenar as reservas
var reservas = {};

// Função para limpar as reservas do dia anterior
function limparReservasAntigas() {
  var hoje = new Date().getDay();
  for (var chave in reservas) {
    if (reservas[chave].dia !== hoje) {
      delete reservas[chave];
    }
  }
}

// Chama a função de limpeza uma vez por dia
setInterval(limparReservasAntigas, 86400000); // 86400000ms = 24 horas

function confirmarReserva() {
  var dia = document.getElementById('dia').selectedIndex + 1; // 1 = Segunda-feira, 7 = Domingo
  var horario = document.getElementById('horario').value;
  var nome = document.getElementById('nome').value;
  var telefone = document.getElementById('telefone').value;
  
  // Cria uma chave única para a reserva
  var chaveReserva = dia + '-' + horario;
  
  // Verifica se o horário já está reservado
  if (reservas[chaveReserva]) {
    alert('Este horário já está reservado.');
  } else if (nome === '' || telefone === '') {
    alert('Por favor, preencha o nome e o telefone.');
  } else {
    reservas[chaveReserva] = { nome: nome, telefone: telefone, dia: dia };
    alert('Reserva confirmada para ' + nome + ' (' + telefone + ') no dia ' + dia + ' às ' + horario + 'h.');
    atualizarReservasConfirmadas();
  }
}

function atualizarReservasConfirmadas() {
  var reservasDiv = document.getElementById('reservasConfirmadas');
  reservasDiv.innerHTML = ''; // Limpa as reservas anteriores
  for (var chave in reservas) {
    var reserva = reservas[chave];
    var p = document.createElement('p');
    p.textContent = 'Reserva confirmada: ' + chave.split('-')[1] + 'h para ' + reserva.nome + ' (' + reserva.telefone + ')';
    reservasDiv.appendChild(p);
  }
}

// Inicializa o sistema de reservas
limparReservasAntigas();
