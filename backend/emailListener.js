const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const Tool = require('./models/Tool');

module.exports = function (markPartArrived) {
  const imapConfig = {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: 'imap.email-ssl.com.br', // Ajuste para seu provedor de email
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false } // Ignorar erros de certificado
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

              const subject = parsed.subject || '';
              const text = parsed.text || '';

              // Verifica se o email indica que a peça chegou
              if (subject.includes('Peça Disponível') || text.includes('Peça Chegou')) {
                const toolId = extractToolIdFromEmail(subject);
                if (toolId) {
                  await markPartArrived(toolId);
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
};
