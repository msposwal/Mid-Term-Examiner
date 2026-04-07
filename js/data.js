// ── College & Exam Configuration ─────────────────────
const COLLEGE = {
  name:       "AI/ML Mid-Term Examination Portal",
  subject:    "Introduction to Artificial Intelligence & Machine Learning",
  code:       "AIML-301",
  department: "Computer Science & Engineering",
  duration:   30,   // minutes
  totalMarks: 20,   // final marks (out of 20)
  testMarks:  30    // raw test marks (out of 30)
};

// ── 90 Question Bank (30 per section) ────────────────
const BANK = {

  // ── BEGINNER (30 questions) ──────────────────────────
  b: [
    { q: "What does AI stand for?",
      c: ["Automated Integration", "Artificial Intelligence", "Analytical Interface", "Applied Iteration"],
      a: 1, e: "AI = Artificial Intelligence — building machines that perform tasks requiring human-like intelligence." },

    { q: "Which best describes Machine Learning?",
      c: ["Writing fixed rules for a computer", "A computer learning patterns from data", "Remote-controlling a robot", "A static database of facts"],
      a: 1, e: "ML enables machines to learn from data and improve without explicit hand-coded rules." },

    { q: "What is the main relationship between AI and ML?",
      c: ["They are the same thing", "ML is a subset of AI focused on data-driven learning", "AI is a subset of ML", "ML only works on images"],
      a: 1, e: "AI is the broad field; ML is one specific approach within AI where machines learn from data." },

    { q: "Which of these is a real-world AI application?",
      c: ["A basic calculator", "A fixed traffic timer", "A virtual assistant like Siri", "A manual spreadsheet"],
      a: 2, e: "Virtual assistants use NLP and ML — classic AI applications that understand and respond to language." },

    { q: "What is 'training data' in ML?",
      c: ["Data used to test a model", "A special AI processor", "The dataset used to teach a model", "Error logs from a program"],
      a: 2, e: "Training data is the labeled or raw dataset fed to a model so it can learn patterns." },

    { q: "What are the three main types of machine learning?",
      c: ["Fast, Medium, Slow", "Supervised, Unsupervised, Reinforcement", "Visual, Audio, Text", "Classification, Regression, Clustering"],
      a: 1, e: "Supervised (labeled), Unsupervised (unlabeled), and Reinforcement (reward-based) are the three core ML paradigms." },

    { q: "In supervised learning, the training data is:",
      c: ["Always unlabeled", "Labeled with correct answers", "Generated randomly", "Only images"],
      a: 1, e: "Supervised learning requires labeled input-output pairs so the model learns the correct mapping." },

    { q: "What does a classification model do?",
      c: ["Predicts a continuous number", "Assigns input to one of several categories", "Finds clusters in unlabeled data", "Generates new images"],
      a: 1, e: "Classification predicts discrete categories — e.g., spam vs not-spam, cat vs dog." },

    { q: "What does a regression model predict?",
      c: ["A category label", "A continuous numerical value", "An image", "A text sequence"],
      a: 1, e: "Regression predicts continuous values like house prices or temperature." },

    { q: "What is a 'label' in a supervised learning dataset?",
      c: ["A spreadsheet column name", "The correct output for each training example", "A type of neural network", "A chart type"],
      a: 1, e: "A label is the target output — the answer key the model is trained to predict." },

    { q: "What is a 'feature' in ML?",
      c: ["A software update", "An individual measurable input variable", "The model output", "A loss function type"],
      a: 1, e: "Features are input variables used by the model to make predictions — e.g., age, height, pixel values." },

    { q: "What is unsupervised learning used for?",
      c: ["Predicting labeled outputs", "Finding hidden patterns in unlabeled data", "Playing reward-based games", "Language translation"],
      a: 1, e: "Unsupervised learning discovers structure in data without predefined labels — e.g., clustering." },

    { q: "What is reinforcement learning?",
      c: ["Learning from labeled data", "Learning by trial and error using rewards and penalties", "Learning from unlabeled clusters", "Copying another model's weights"],
      a: 1, e: "In RL, an agent interacts with an environment and maximizes cumulative reward through trial and error." },

    { q: "What does a spam filter using ML do?",
      c: ["Blocks all emails", "Learns from past emails to predict spam", "Deletes old emails", "Encrypts your inbox"],
      a: 1, e: "An ML spam filter learns patterns from labeled emails and improves its spam detection over time." },

    { q: "What is the purpose of a test dataset?",
      c: ["To train the model", "To evaluate performance on unseen data", "To store raw data", "To visualize features"],
      a: 1, e: "The test set is held out during training and used only at the end to measure generalization." },

    { q: "What is overfitting?",
      c: ["Model too simple to learn", "Model memorizes training data, fails on new data", "Model trains too slowly", "Model has too many layers"],
      a: 1, e: "Overfitting: model learns training noise and fails to generalize to new examples." },

    { q: "Which is a common computer vision application?",
      c: ["Translating text", "Recognizing faces in photos", "Predicting stock prices", "Sending automated emails"],
      a: 1, e: "Computer vision enables machines to interpret images — facial recognition is a classic application." },

    { q: "What does model accuracy measure?",
      c: ["Training speed", "Percentage of correct predictions out of total", "Memory usage", "Number of features"],
      a: 1, e: "Accuracy = correct predictions / total predictions × 100. The most basic performance metric." },

    { q: "What is data preprocessing?",
      c: ["Running model on new data", "Cleaning and transforming raw data before training", "Evaluating model performance", "Selecting the best model"],
      a: 1, e: "Preprocessing: handling missing values, scaling, encoding to make data suitable for ML." },

    { q: "What is normalization in ML?",
      c: ["Removing duplicate rows", "Scaling features to a standard range like 0 to 1", "Converting labels to numbers", "Splitting data into train/test"],
      a: 1, e: "Normalization rescales features to a common range so no single feature dominates." },

    { q: "What is a validation set used for?",
      c: ["Final model evaluation", "Tuning hyperparameters without touching the test set", "Generating new data", "Storing model weights"],
      a: 1, e: "Validation set tunes hyperparameters — kept separate from test set to avoid data leakage." },

    { q: "What is a decision tree?",
      c: ["A training loss visualization", "A model making predictions using a tree of if-else conditions", "A type of neural network", "A clustering algorithm"],
      a: 1, e: "Decision trees split data using feature-based conditions, forming a tree for classification or regression." },

    { q: "What is a random forest?",
      c: ["A single large decision tree", "An ensemble of many decision trees combined to improve accuracy", "A type of neural network", "A feature selection method"],
      a: 1, e: "Random forests combine multiple decision trees trained on random data subsets, reducing variance." },

    { q: "What does high bias mean in the bias-variance tradeoff?",
      c: ["Unfair data collection", "Error from oversimplified models that underfit the data", "Error from overly complex models", "The learning rate value"],
      a: 1, e: "High bias = model too simple — it underfits and misses important patterns in the data." },

    { q: "What is k-nearest neighbors (KNN)?",
      c: ["A neural network type", "A model classifying a point based on majority label of its k closest neighbors", "A dimensionality reduction method", "A gradient-based optimizer"],
      a: 1, e: "KNN classifies by looking at k most similar training examples and taking a majority vote." },

    { q: "What is a confusion matrix?",
      c: ["A training loss visualization", "A table summarizing correct and incorrect classification predictions", "A feature distribution plot", "A hyperparameter selection tool"],
      a: 1, e: "Confusion matrix shows TP, TN, FP, FN — a complete picture of classifier prediction errors." },

    { q: "What is a support vector machine (SVM)?",
      c: ["A type of recurrent network", "A model finding the optimal hyperplane separating classes with maximum margin", "A clustering algorithm", "A reinforcement learning agent"],
      a: 1, e: "SVMs find the decision boundary maximizing margin between classes — robust classifiers." },

    { q: "What is the difference between training and validation loss?",
      c: ["They are always the same", "Training loss measures error on training data; validation on held-out data", "Validation loss is always lower", "Training loss is not used in ML"],
      a: 1, e: "A growing gap between training and validation loss is the key signal of overfitting." },

    { q: "What is k-fold cross-validation?",
      c: ["Splitting data into k random features", "Training and evaluating on k different data splits to get a robust estimate", "A k-layer neural network", "A k-step optimization"],
      a: 1, e: "k-fold CV gives a more robust accuracy estimate by averaging over k different train/test splits." },

    { q: "What is a hyperparameter?",
      c: ["A parameter learned during training", "A configuration set before training controlling the learning process", "A neural layer type", "A performance metric"],
      a: 1, e: "Hyperparameters (learning rate, batch size, layers) are set manually — not learned by gradient descent." }
  ],

  // ── INTERMEDIATE (30 questions) ──────────────────────
  i: [
    { q: "What is the role of a loss function?",
      c: ["Generate training data", "Measure how wrong the model's predictions are", "Split data into sets", "Visualize architecture"],
      a: 1, e: "The loss function quantifies prediction error — the model minimizes it during training." },

    { q: "What does gradient descent do?",
      c: ["Maximizes the loss function", "Randomly reshuffles data", "Iteratively adjusts weights to minimize loss", "Splits data into batches"],
      a: 2, e: "Gradient descent computes loss gradients and updates weights step-by-step to reduce error." },

    { q: "What is the learning rate in gradient descent?",
      c: ["Number of training examples", "Step size controlling how much weights change per update", "Number of layers", "Batch size"],
      a: 1, e: "Learning rate controls update step size. Too large = overshoot; too small = very slow convergence." },

    { q: "What are the three main layer types in a basic neural network?",
      c: ["Input, Hidden, Output", "Convolutional, Pooling, Dense", "Encoding, Processing, Decoding", "Feature, Weight, Bias"],
      a: 0, e: "Every feedforward network has Input (receives data), Hidden (learns representations), and Output layers." },

    { q: "What is an activation function and why is it used?",
      c: ["Normalizes input data", "Introduces non-linearity so the network learns complex patterns", "Measures the loss", "Shuffles batches"],
      a: 1, e: "Activation functions (ReLU, Sigmoid) add non-linearity — without them the entire network collapses to one linear equation." },

    { q: "What does ReLU do?",
      c: ["Adds recurrence to neurons", "Outputs max(0,x) — passes positive values, zeros out negatives", "Adds regularization noise", "Reduces overfitting directly"],
      a: 1, e: "ReLU = max(0, x). Simple and effective — the most widely used activation function." },

    { q: "What is backpropagation?",
      c: ["Feeding data forward through layers", "Computing gradients via chain rule and propagating them backward to update weights", "A regularization method", "A data augmentation step"],
      a: 1, e: "Backpropagation applies the chain rule to calculate gradients for every weight, enabling gradient descent across all layers." },

    { q: "What are CNNs primarily used for?",
      c: ["Time-series only", "Processing grid-like data like images using convolutional feature detectors", "Text classification only", "RL games"],
      a: 1, e: "CNNs use convolutions to detect spatial features automatically — ideal for computer vision." },

    { q: "What is an RNN designed to handle?",
      c: ["Image data", "Sequential or time-series data where order matters", "Tabular data", "Unlabeled clusters"],
      a: 1, e: "RNNs have memory loops allowing information to persist — suited for text, speech, and time series." },

    { q: "What is dropout in neural network training?",
      c: ["Removing bad training examples", "Randomly deactivating neurons during training to prevent overfitting", "A weight initialization method", "Reducing the learning rate"],
      a: 1, e: "Dropout randomly zeros a fraction of neurons per step, forcing the network to learn redundant representations." },

    { q: "What is batch normalization used for?",
      c: ["Splitting data into batches", "Normalizing layer activations across the batch to stabilize training", "Encoding categorical data", "A type of activation function"],
      a: 1, e: "Batch norm normalizes activations per batch, reducing internal covariate shift and enabling higher learning rates." },

    { q: "What is precision in classification?",
      c: ["How many real positives were found", "Of predicted positives, how many were actually positive", "Overall model accuracy", "Model prediction speed"],
      a: 1, e: "Precision = TP/(TP+FP). When the model says yes, how often is it right?" },

    { q: "What is recall (sensitivity)?",
      c: ["Of predicted positives how many were correct", "Of all real positives how many did the model catch", "The overall accuracy", "The F1 score"],
      a: 1, e: "Recall = TP/(TP+FN). Of all actual positives, how many did the model successfully detect?" },

    { q: "What is the F1 score?",
      c: ["Average of precision and recall", "Harmonic mean of precision and recall", "Product of precision and recall", "Difference between precision and recall"],
      a: 1, e: "F1 = 2×(P×R)/(P+R). Balances precision and recall — useful when classes are imbalanced." },

    { q: "What is the sigmoid activation function used for?",
      c: ["Outputs values between -1 and 1", "Squashes any value to (0,1), useful for binary classification output", "Outputs max(0,x)", "Normalizes activations across a batch"],
      a: 1, e: "Sigmoid = 1/(1+e^-x), mapping any input to (0,1) — used in binary output layers as probability." },

    { q: "What is stochastic gradient descent (SGD)?",
      c: ["Gradient descent using all data at once", "Gradient descent updating weights using one or a small batch of examples per step", "A second-order optimization method", "A regularization technique"],
      a: 1, e: "SGD updates weights using a single or mini-batch sample, making training faster and noisier." },

    { q: "What is the purpose of the softmax function?",
      c: ["Compute the loss", "Convert logits into a probability distribution summing to 1", "Initialize weights", "Normalize inputs"],
      a: 1, e: "Softmax converts raw output scores (logits) into probabilities that all add up to 1." },

    { q: "What is an epoch in ML training?",
      c: ["One update of a single weight", "One complete pass through the entire training dataset", "Number of layers", "Batch size"],
      a: 1, e: "One epoch = one full pass through all training data. Models are typically trained for many epochs." },

    { q: "What is an ROC curve used for?",
      c: ["Plotting training vs validation loss", "Visualizing the tradeoff between true positive and false positive rates at different thresholds", "Selecting the learning rate", "Visualizing feature importance"],
      a: 1, e: "ROC plots TPR vs FPR across thresholds. Larger Area Under Curve (AUC) = better classifier." },

    { q: "What is word embedding (e.g., Word2Vec)?",
      c: ["A tokenization method", "Dense vector representations of words capturing semantic meaning", "A stemming algorithm", "A type of RNN"],
      a: 1, e: "Word embeddings map words to vectors where semantic similarity = spatial closeness." },

    { q: "What is data augmentation used for?",
      c: ["Cleaning missing values", "Artificially expanding training data by creating modified copies of examples", "Normalizing test data", "Reducing model size"],
      a: 1, e: "Data augmentation (flipping, cropping, noise) creates more training variety, improving generalization." },

    { q: "What is PCA (Principal Component Analysis)?",
      c: ["A classification algorithm", "A dimensionality reduction technique projecting data onto directions of maximum variance", "A neural network type", "A loss function"],
      a: 1, e: "PCA reduces dimensions by finding orthogonal components capturing the most variance." },

    { q: "What is class imbalance and why is it a problem?",
      c: ["Features having different scales", "One class vastly outnumbers others, biasing the model toward the majority class", "Model has too many layers", "Data has missing values"],
      a: 1, e: "In imbalanced datasets, high accuracy can be achieved by always predicting the majority class — misleading." },

    { q: "What is a pooling layer in a CNN?",
      c: ["A layer that adds noise", "A layer that downsamples spatial dimensions reducing computation and adding spatial invariance", "A fully connected layer", "An attention layer"],
      a: 1, e: "Pooling (max or average) reduces spatial size of feature maps, making the network efficient and shift-tolerant." },

    { q: "What is weight initialization and why does it matter?",
      c: ["Assigning random labels to data", "Setting initial weight values — poor initialization causes vanishing/exploding gradients", "A data normalization method", "Choosing the learning rate"],
      a: 1, e: "Good initialization (Xavier, He) sets weights at appropriate scale so gradients flow well from training start." },

    { q: "What is mini-batch gradient descent?",
      c: ["Using all data per update", "Using a small subset of training data per update — balancing stability and speed", "Only updating weights once per epoch", "Updating weights without gradients"],
      a: 1, e: "Mini-batch GD (32–256 samples) is the standard — faster than full batch, more stable than single sample." },

    { q: "What is the vanishing gradient problem?",
      c: ["GPU memory running out", "Gradients shrinking to near-zero in early layers halting learning", "Loss increasing during training", "Weights growing too large"],
      a: 1, e: "Vanishing gradients: small values multiplied through many layers approach zero — early layers stop learning." },

    { q: "What does L2 regularization do?",
      c: ["Makes weights sparse by zeroing them", "Penalizes large weights by adding squared weights to the loss, shrinking all weights smoothly", "Drops neurons randomly", "Normalizes input data"],
      a: 1, e: "L2 (Ridge) penalizes large weights, encouraging them to stay small — reducing overfitting." },

    { q: "What is the difference between batch and online learning?",
      c: ["No difference", "Batch trains on full dataset at once; online updates incrementally with each new example", "Online learning is always better", "Batch learning is faster for all cases"],
      a: 1, e: "Batch learning is stable but requires all data upfront. Online learning adapts to new data continuously." },

    { q: "What is transfer learning?",
      c: ["Moving weights between GPUs", "Using a pre-trained model as a starting point and fine-tuning it on a new task", "Copying data between datasets", "Converting model formats"],
      a: 1, e: "Transfer learning reuses representations from large pre-training to new tasks — saving data and compute." }
  ],

  // ── ADVANCED (30 questions) ───────────────────────────
  a: [
    { q: "What causes the vanishing gradient problem?",
      c: ["Insufficient training data", "Repeated multiplication of small gradient values through many layers drives them toward zero", "Too high a learning rate", "Overfitting to training data"],
      a: 1, e: "Sigmoid/tanh derivatives < 1, multiplied through dozens of layers via backprop, approach zero — early layers stop learning." },

    { q: "What are residual connections (skip connections)?",
      c: ["Connections that randomly drop neurons", "Shortcuts adding layer input directly to its output enabling very deep networks to train", "Gradient normalization method", "An attention variant"],
      a: 1, e: "ResNet skip connections allow gradients to bypass layers, solving vanishing gradients and enabling 100+ layer networks." },

    { q: "What is self-attention in Transformers?",
      c: ["The model evaluates its own weights", "Each token attends to all other tokens in the same sequence to capture contextual relationships", "A form of dropout", "A normalization technique"],
      a: 1, e: "Self-attention computes attention scores between every token pair, capturing long-range dependencies." },

    { q: "What are the Q, K, V vectors in attention?",
      c: ["Input, Hidden, Output", "Query, Key, Value used to compute weighted relevance scores between tokens", "Alpha, Beta, Gamma", "Mean, Variance, Scale"],
      a: 1, e: "Q (what am I looking for?), K (what do I contain?), V (what do I contribute?). Attention = softmax(QK^T/√d)×V." },

    { q: "What is RLHF (Reinforcement Learning from Human Feedback)?",
      c: ["A standard RL algorithm for games", "A technique aligning LLMs with human preferences using human-labeled comparisons and a reward model", "A method for training image classifiers", "A regularization technique"],
      a: 1, e: "RLHF trains a reward model on human preferences, then uses RL (PPO) to fine-tune the LLM." },

    { q: "What is a GAN (Generative Adversarial Network)?",
      c: ["A network for time-series forecasting", "Two competing networks — Generator creating fake data and Discriminator detecting fakes", "A special CNN for video", "A clustering algorithm"],
      a: 1, e: "GANs pit a Generator vs Discriminator — they improve each other until Generator produces realistic data." },

    { q: "What is a Variational Autoencoder (VAE)?",
      c: ["A supervised classifier", "A generative model learning a probabilistic latent space to encode and sample new data", "A type of RNN", "Dimensionality reduction only"],
      a: 1, e: "VAEs encode inputs into a latent probability distribution (mean+variance), sample from it, and decode." },

    { q: "What does L1 regularization do?",
      c: ["Penalizes squared weights smoothly", "Penalizes absolute weight values encouraging sparse solutions where some weights become exactly zero", "Randomly drops neurons", "Normalizes activations"],
      a: 1, e: "L1 (Lasso) = |w| penalty. Creates sparsity — many weights zero out — useful for feature selection." },

    { q: "What is knowledge distillation?",
      c: ["Extracting features from raw data", "Training a small student model to mimic a large teacher model's output distribution", "A data augmentation method", "Compressing embeddings"],
      a: 1, e: "Distillation transfers a large model's soft probability outputs to a compact student model." },

    { q: "What is model quantization?",
      c: ["Evaluating model performance", "Reducing weight numerical precision (e.g., FP32 to INT8) to shrink model size and speed up inference", "Splitting a model across GPUs", "Pruning neurons"],
      a: 1, e: "Quantization lowers precision to INT8 or FP16, dramatically reducing memory and latency." },

    { q: "What is the Transformer architecture's core innovation?",
      c: ["Using recurrence for sequence modeling", "Replacing recurrence entirely with self-attention enabling full parallelization and scaling", "Using convolutions for text", "Training with RL rewards"],
      a: 1, e: "'Attention Is All You Need' (2017): Transformers use only attention — no recurrence — enabling massive parallelization." },

    { q: "What is fine-tuning in LLMs?",
      c: ["Training from scratch on new data", "Continuing training a pre-trained model with task-specific data to adapt its behavior", "Reducing model size via pruning", "Quantizing model weights"],
      a: 1, e: "Fine-tuning updates pre-trained model weights on smaller labeled data, specializing it for a task." },

    { q: "What is positional encoding in Transformers?",
      c: ["To add regularization", "To inject sequence order information since self-attention has no built-in notion of position", "To normalize attention scores", "To reduce embedding dimensionality"],
      a: 1, e: "Since self-attention is permutation-invariant, positional encodings are added to embeddings to convey token order." },

    { q: "What is multi-head attention?",
      c: ["Attention with multiple datasets", "Running self-attention in parallel with different learned projections to capture diverse relationships", "A dropout variant", "A pooling mechanism"],
      a: 1, e: "Multi-head attention runs h parallel attention operations with different Q/K/V projections simultaneously." },

    { q: "What is the difference between BERT and GPT architectures?",
      c: ["They are identical", "BERT is encoder-only (bidirectional) for understanding; GPT is decoder-only (causal) for generation", "BERT only handles images", "GPT is older than BERT"],
      a: 1, e: "BERT sees full bidirectional context for understanding. GPT generates left-to-right causally." },

    { q: "What is RAG (Retrieval-Augmented Generation)?",
      c: ["A type of GAN", "A method that retrieves relevant documents from an external knowledge base and feeds them to an LLM", "A reinforcement learning variant", "A weight pruning technique"],
      a: 1, e: "RAG retrieves relevant documents via vector search and injects them into the LLM's prompt for grounded responses." },

    { q: "What is catastrophic forgetting in neural networks?",
      c: ["Network forgetting to apply dropout", "When training on a new task rapidly overwrites what was learned on previous tasks", "A type of overfitting", "A hardware memory issue"],
      a: 1, e: "Catastrophic forgetting: sequential learning on task B erases task A knowledge. Fixed by EWC and similar techniques." },

    { q: "What is layer normalization in Transformers?",
      c: ["Weight decay regularization", "Normalizing activations across features per example stabilizing training in attention-based models", "Shuffling training batches", "Initializing weights"],
      a: 1, e: "Layer norm normalizes per sample across features (not across batch) — stable for variable-length sequences." },

    { q: "What is LoRA (Low-Rank Adaptation)?",
      c: ["A type of loss function", "A parameter-efficient fine-tuning method injecting trainable low-rank matrices into frozen model layers", "A GAN variant", "A data augmentation strategy"],
      a: 1, e: "LoRA freezes pre-trained weights and adds small trainable rank decomposition matrices — fine-tuning efficiently." },

    { q: "What is the difference between autoregressive and masked language modeling?",
      c: ["They are identical", "Autoregressive predicts next token left-to-right; masked predicts randomly masked tokens using full context", "Only autoregressive models generate text", "Masked models are always larger"],
      a: 1, e: "Autoregressive = causal generation. Masked LM = bidirectional — predicts [MASK] tokens seeing both left and right context." },

    { q: "What is in-context learning in LLMs?",
      c: ["The model updating its weights from context", "The ability of LLMs to learn new tasks from a few examples in the prompt without weight updates", "A training technique", "A type of fine-tuning"],
      a: 1, e: "ICL (few-shot prompting): the LLM adapts from examples in the prompt alone — no gradient updates needed." },

    { q: "What is a vector database used for in AI?",
      c: ["Storing model weights", "Storing and querying high-dimensional embeddings for semantic similarity search", "Training neural networks", "Logging model predictions"],
      a: 1, e: "Vector databases (Pinecone, Weaviate) index embeddings for fast nearest-neighbor search — essential for RAG pipelines." },

    { q: "What is the softmax temperature parameter?",
      c: ["The learning rate in fine-tuning", "A scaling factor applied to logits before softmax — higher temperature flattens distribution, lower sharpens it", "A regularization strength", "Number of attention heads"],
      a: 1, e: "Temperature T: logit/T before softmax. High T → more random, Low T → more confident. Used in sampling and distillation." },

    { q: "What is the exploding gradient problem?",
      c: ["Model trains too fast", "Gradients grow exponentially during backprop making weight updates unstable", "Loss becomes zero too quickly", "Too many layers in the network"],
      a: 1, e: "Exploding gradients cause catastrophic weight updates. Fixed by gradient clipping and careful initialization." },

    { q: "What is prompt engineering?",
      c: ["A method for training models", "Crafting input text strategically to guide LLM behavior and improve output quality without changing weights", "A hardware optimization", "A type of fine-tuning"],
      a: 1, e: "Prompt engineering designs inputs (few-shot, chain-of-thought) to steer LLMs toward better outputs without training." },

    { q: "What is model pruning?",
      c: ["Increasing model capacity", "Removing low-importance weights or neurons to create smaller, faster models with minimal accuracy loss", "Reducing training data", "A normalization technique"],
      a: 1, e: "Pruning removes near-zero weights (unstructured) or entire neurons/layers (structured) for efficient deployment." },

    { q: "What is constitutional AI?",
      c: ["A legal framework for AI", "A training method where the model critiques and revises its own outputs according to a set of principles", "A hardware safety system", "A type of RL without rewards"],
      a: 1, e: "Constitutional AI (Anthropic) uses principles for the model to self-critique and revise — reducing harm without per-output human feedback." },

    { q: "What is the 'Attention Is All You Need' paper significant for?",
      c: ["Introducing convolutional networks", "Proposing the Transformer architecture that replaced RNNs and became the foundation for modern LLMs", "Inventing backpropagation", "Introducing GANs"],
      a: 1, e: "Vaswani et al. (2017) introduced Transformers — the paper that launched the modern LLM era." },

    { q: "What is federated learning?",
      c: ["Training on one centralized server", "Training models across multiple decentralized devices while keeping data local for privacy", "A type of transfer learning", "A clustering algorithm"],
      a: 1, e: "Federated learning trains on distributed data without centralizing it — key for privacy-preserving ML on mobile devices." },

    { q: "What is the difference between discriminative and generative models?",
      c: ["No difference", "Discriminative models learn decision boundaries between classes; generative models learn the data distribution to generate new samples", "Generative models are always larger", "Discriminative models can generate images"],
      a: 1, e: "Discriminative = P(y|x) — classify input. Generative = P(x,y) — model data distribution and generate new examples." }
  ]
};
