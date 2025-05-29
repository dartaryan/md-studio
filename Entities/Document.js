// Entities/Document.js
export class Document {
  static async get(id) {
    // For now, ignore id and use the single localStorage item
    console.log(`Document.get called with id: ${id}, but will load from generic key.`);
    const saved = localStorage.getItem('markdown-studio-document');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure essential fields exist
        if (parsed && typeof parsed.title === 'string' && typeof parsed.markdown_content === 'string') {
          return Promise.resolve(parsed);
        }
      } catch (e) {
        console.error("Error parsing document from localStorage in Document.get:", e);
        return Promise.reject(new Error("Error parsing document."));
      }
    }
    return Promise.reject(new Error("No document found in localStorage.")); // Or resolve with null/default
  }

  static async update(id, data) {
    // For now, ignore id and use the single localStorage item
    console.log(`Document.update called with id: ${id}, but will save to generic key.`);
    try {
      localStorage.setItem('markdown-studio-document', JSON.stringify(data));
      return Promise.resolve(data);
    } catch (error) {
      console.error('Error saving document to localStorage in Document.update:', error);
      return Promise.reject(new Error("Error saving document."));
    }
  }

  static async create(data) {
    console.log("Document.create called.");
    const newId = Date.now().toString();
    const documentToSave = { ...data, id: newId }; // Add an ID to the document
    try {
      // Even though we have an ID, current Editor.js structure saves to one key.
      // For consistency with that, we'll use the generic key.
      // A more robust solution would use `markdown-studio-document-${newId}`
      localStorage.setItem('markdown-studio-document', JSON.stringify(documentToSave));
      return Promise.resolve(documentToSave); // Return the document with its new ID
    } catch (error) {
      console.error('Error creating document in localStorage in Document.create:', error);
      return Promise.reject(new Error("Error creating document."));
    }
  }
}
