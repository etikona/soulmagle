import { pinecone } from "../config/pinecone.js";
export class Match {
  async findClosestMatch(vector) {
    const index = pinecone.Index("users");
    const queryResult = await index.query({
      vector,
      topK: 1,
      includeMetadata: true,
    });
    return queryResult.matches[0]?.metadata;
  }
}
