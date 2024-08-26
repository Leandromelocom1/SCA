const path = require('path');

const uploadManual = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const manual = req.files.manual;
  const uploadPath = path.join(__dirname, '..', 'uploads', manual.name);

  manual.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
};

module.exports = {
  uploadManual,
};
