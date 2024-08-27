const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const Tool = require('./models/Tool');
const { markPartArrived } = require('./server'); // Certifique-se de ajustar o caminho correto

const imapConfig = {
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: 'imap.email-ssl.com.br',
  port: 993,
  tls: true,
  tlsOptions: {
    checkServerIdentity: () => null  // Ignora a verificação de hostname
  }
};


const imap = new Imap(imapConfig);

imap.once('ready', () => {
  imap.openBox('INBOX', false, (err, box) => {
    if (err) throw err;

    imap.on('mail', () => {
      const fetch = imap.seq.fetch('1:*', {
        bodies: '',
        markSeen: true
      });

      fetch.on('message', (msg, seqno) => {
        msg.on('body', (stream) => {
          simpleParser(stream, async (err, parsed) => {
            if (err) throw err;

            // Use fallback para garantir que subject e text estejam definidos
            const subject = parsed.subject || '';
            const text = parsed.text || '';

            // Verifica se o email contém a indicação de que a peça chegou
            if (subject.includes('Peça Disponível') || text.includes('Peça Chegou')) {
              const toolId = extractToolIdFromEmail(subject); // Extrai o ID da ferramenta do assunto do email
              if (toolId) {
                await markPartArrived({ params: { id: toolId } }, { status: () => ({ json: () => {} }) });
                console.log(`Peça marcada como chegada para a ferramenta com ID ${toolId}`);
              }
            }
          });
        });
      });
    });
  });
});

imap.connect();

function extractToolIdFromEmail(subject) {
  // Implementar lógica para extrair toolId do assunto ou conteúdo do email
  // Exemplo: return subject.split(' ')[2];
  return null;
}
