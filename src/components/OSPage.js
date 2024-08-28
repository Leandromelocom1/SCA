import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const OSPage = () => {
  const [description, setDescription] = useState('');
  const [equipment, setEquipment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.0.78:5000/service-orders', {
        description,
        equipment,
      });

      if (response.status === 201) {
        setSubmitted(true);
        setDescription('');
        setEquipment('');
      }
    } catch (error) {
      console.error('Erro ao enviar a ordem de serviço', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Ordem de Serviço</h2>
      {submitted ? (
        <p>Ordem de serviço enviada com sucesso!</p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Descrição:</Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Equipamento:</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar Ordem de Serviço
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default OSPage;
