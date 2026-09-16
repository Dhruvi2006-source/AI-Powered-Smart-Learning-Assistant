export const SAMPLE_STUDY_NOTES = `Generative Artificial Intelligence (GenAI) is a category of artificial intelligence systems capable of generating text, images, code, audio, and synthetic data in response to prompts.

Unlike conventional machine learning models that focus on classification or prediction tasks based on historical data, GenAI models use neural networks—most notably Transformer architectures—to understand deep contextual relationships within data. 

Key Concepts of Generative AI:
1. Large Language Models (LLMs): High-capacity models trained on vast text corpora using self-attention mechanisms to predict the next token.
2. Prompt Engineering: The art of crafting precise, contextual instructions to guide model outputs effectively.
3. Fine-tuning vs. RAG: Fine-tuning adjusts model parameters on domain-specific datasets, whereas Retrieval-Augmented Generation (RAG) injects real-time external knowledge into prompts.
4. Tokenization: The process of splitting input text into smaller sub-word units called tokens before processing.
5. Hallucination: A phenomenon where AI models generate plausible-sounding but factually incorrect or ungrounded statements.

Applications of GenAI include automated text summarization, intelligent code completion, interactive educational tutoring, creative writing assistance, and synthetic dataset generation for medical and financial research.`;

export const MOCK_SUMMARY_RESPONSE = {
  summary: "Generative Artificial Intelligence (GenAI) leverages advanced neural networks and Transformer architectures to create original text, code, audio, and visual content based on contextual prompts. Unlike classical machine learning models designed for pattern classification, GenAI focuses on creative synthesis and contextual understanding using Large Language Models (LLMs).",
  keyPoints: [
    "GenAI relies on Transformer neural networks and self-attention mechanisms.",
    "Large Language Models (LLMs) predict tokens using extensive training corpora.",
    "Prompt engineering directly influences the quality and relevance of AI outputs.",
    "Hallucination refers to models generating plausible but factually incorrect content.",
    "Applications span automatic summarization, code completion, tutoring, and synthetic data generation."
  ]
};

export const MOCK_QA_RESPONSES = [
  {
    keywords: ["generative ai", "what is", "definition", "genai"],
    answer: "Generative AI is a branch of artificial intelligence that creates new content (such as text, images, audio, and code) using deep neural networks and Transformer models trained on large datasets, rather than simply analyzing existing data."
  },
  {
    keywords: ["transformer", "architecture", "neural network"],
    answer: "Transformer architectures are deep learning models introduced in 2017 that use self-attention mechanisms to process sequential data simultaneously, making them the foundational core for modern Large Language Models."
  },
  {
    keywords: ["hallucination", "hallucinate", "wrong", "fact"],
    answer: "Hallucination in AI refers to a scenario where a generative model outputs plausible-sounding information that is inaccurate, fabricated, or ungrounded in facts."
  },
  {
    keywords: ["prompt", "engineering"],
    answer: "Prompt Engineering is the practice of designing, refining, and structuring text inputs to guide a Generative AI model toward generating accurate, relevant, and high-quality responses."
  }
];

export const DEFAULT_QA_RESPONSE = "Based on the provided study notes, Generative AI uses trained neural network models to process input context and generate relevant educational responses. Large Language Models analyze tokens and produce structured answers according to prompt instructions.";

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which neural network architecture forms the core foundation of modern Generative AI and LLMs?",
    options: [
      "Convolutional Neural Networks (CNN)",
      "Transformer Architecture with Self-Attention",
      "Recurrent Neural Networks (RNN)",
      "Support Vector Machines (SVM)"
    ],
    correctAnswer: 1,
    explanation: "Transformer architectures use self-attention mechanisms to process text tokens in parallel, serving as the foundation for modern LLMs."
  },
  {
    id: 2,
    question: "What term describes the phenomenon where an AI model generates plausible-sounding but factually incorrect information?",
    options: [
      "Overfitting",
      "Tokenization",
      "Hallucination",
      "Quantization"
    ],
    correctAnswer: 2,
    explanation: "Hallucination refers to AI outputs that appear convincing but are unsupported by real data or facts."
  },
  {
    id: 3,
    question: "What is the primary difference between conventional Machine Learning models and Generative AI models?",
    options: [
      "Conventional ML creates new images; GenAI predicts numbers.",
      "Conventional ML focuses on classification/prediction; GenAI synthesizes new content.",
      "GenAI requires no training data; conventional ML requires huge datasets.",
      "GenAI runs only on mobile phones; conventional ML runs on cloud servers."
    ],
    correctAnswer: 1,
    explanation: "Conventional ML classifies or predicts outcomes based on historical data, whereas GenAI generates new original content like text, code, or images."
  },
  {
    id: 4,
    question: "What is the process of breaking down text into smaller sub-word units before AI processing called?",
    options: [
      "Embedding",
      "Tokenization",
      "Fine-tuning",
      "Attention Mapping"
    ],
    correctAnswer: 1,
    explanation: "Tokenization is the conversion of raw text strings into discrete units (tokens) that LLMs can process mathematically."
  },
  {
    id: 5,
    question: "Which approach injects real-time external information into AI prompts without updating model parameters?",
    options: [
      "Retrieval-Augmented Generation (RAG)",
      "Supervised Fine-Tuning (SFT)",
      "Quantization",
      "Data Pre-processing"
    ],
    correctAnswer: 0,
    explanation: "Retrieval-Augmented Generation (RAG) retrieves relevant external documents and attaches them to the prompt at query time."
  }
];
