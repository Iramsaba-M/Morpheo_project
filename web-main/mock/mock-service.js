const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
const chats = new Map();
const conversations = [];
const dataProducts = [];
const sourceSystems = [];

// Helper function to generate mock data
function generateMockSourceSystem() {
  return {
    id: uuidv4(),
    type: ['salesforce', 'aws', 'sql'][Math.floor(Math.random() * 3)],
    system_description: 'Mock source system description',
    status: {
      overall: ['connected', 'disconnected', 'pending'][Math.floor(Math.random() * 3)],
      data: ['synced', 'pending', 'failed'][Math.floor(Math.random() * 3)],
      training: ['complete', 'in_progress', 'not_started'][Math.floor(Math.random() * 3)]
    },
    fields: [
      {
        name: 'username',
        type: 'string',
        placeholder: 'Enter username',
        value: 'mock_user'
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Enter password'
      }
    ]
  };
}

// Initialize some mock data
for (let i = 0; i < 3; i++) {
  sourceSystems.push(generateMockSourceSystem());
  dataProducts.push({
    id: uuidv4(),
    name: `Data Product ${i + 1}`,
    sourceSystems: [sourceSystems[i].id],
    dataOwner: `Owner ${i + 1}`,
    dataSteward: `Steward ${i + 1}`,
    useCases: ['Analytics', 'Reporting'],
    qualityScore: Math.random() * 100,
    description: `Description for Data Product ${i + 1}`
  });
}

// Chat endpoints
app.post('/api/chat', (req, res) => {
  const chatId = uuidv4();
  const response = {
    chatId,
    responseText: 'This is a mock response from the LLM.',
    options: [
      { text: 'Option 1', subtext: 'Description 1', clickable: true },
      { text: 'Option 2', subtext: 'Description 2', clickable: true }
    ],
    dataReferenceId: uuidv4()
  };

  chats.set(chatId, {
    history: [
      { message: req.body.text, source: 'user' },
      { message: response.responseText, source: 'agent', options: response.options, dataReferenceId: response.dataReferenceId }
    ]
  });

  res.json(response);
});

app.post('/api/chat/:chatId', (req, res) => {
  const chat = chats.get(req.params.chatId);
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  const response = {
    chatId: req.params.chatId,
    responseText: 'This is a follow-up response from the LLM.',
    options: [
      { text: 'Follow-up 1', subtext: 'Description 1', clickable: true },
      { text: 'Follow-up 2', subtext: 'Description 2', clickable: true }
    ],
    dataReferenceId: uuidv4()
  };

  chat.history.push(
    { message: req.body.text, source: 'user' },
    { message: response.responseText, source: 'agent', options: response.options, dataReferenceId: response.dataReferenceId }
  );

  res.json(response);
});

app.get('/api/chat/:chatId', (req, res) => {
  const chat = chats.get(req.params.chatId);
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }
  res.json({ chatId: req.params.chatId, history: chat.history });
});

// Graph endpoint
app.get('/api/graph/:id', (req, res) => {
  res.json([{
    graphType: 'domain',
    data: [
      {
        data: {
          id: '1',
          label: 'Node 1',
          icon: 'database'
        }
      },
      {
        data: {
          id: '2',
          label: 'Node 2',
          icon: 'server'
        }
      },
      {
        data: {
          source: '1',
          target: '2',
          label: 'connects to'
        }
      }
    ]
  }]);
});

// Prompts endpoint
app.get('/api/prompts', (req, res) => {
  res.json([
    'Tell me about data product X',
    'How is source system Y performing?',
    'What are the current data quality issues?'
  ]);
});

// Conversations endpoint
app.get('/api/conversations', (req, res) => {
  res.json([
    {
      chatId: uuidv4(),
      summary: 'Discussion about data quality',
      lastMessageDateTime: new Date().toISOString()
    },
    {
      chatId: uuidv4(),
      summary: 'Source system analysis',
      lastMessageDateTime: new Date().toISOString()
    }
  ]);
});

// Data Products endpoints
app.get('/api/data_products', (req, res) => {
  res.json(dataProducts);
});

app.get('/api/data_products/:dataProductId', (req, res) => {
  const dataProduct = dataProducts.find(dp => dp.id === req.params.dataProductId);
  if (!dataProduct) {
    return res.status(404).json({ error: 'Data product not found' });
  }
  res.json(dataProduct);
});

// Source Systems endpoints
app.get('/api/source_systems', (req, res) => {
  res.json(sourceSystems);
});

app.get('/api/source_systems/:id', (req, res) => {
  const sourceSystem = sourceSystems.find(ss => ss.id === req.params.id);
  if (!sourceSystem) {
    return res.status(404).json({ error: 'Source system not found' });
  }
  res.json(sourceSystem);
});

app.put('/api/source_systems/:id', (req, res) => {
  const sourceSystem = sourceSystems.find(ss => ss.id === req.params.id);
  if (!sourceSystem) {
    return res.status(404).json({ error: 'Source system not found' });
  }

  if (req.body.action === 'train') {
    sourceSystem.status.training = 'in_progress';
  } else if (req.body.action === 'remove') {
    const index = sourceSystems.findIndex(ss => ss.id === req.params.id);
    sourceSystems.splice(index, 1);
  }

  res.status(200).send();
});

// Health check endpoints
app.get('/healthz', (req, res) => {
  res.status(204).send();
});

app.get('/readiness', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
