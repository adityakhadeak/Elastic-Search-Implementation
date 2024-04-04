import fs from "fs";
import elasticClient from "./elasticClient.js";

const indexName = "shakespeare"; // Name of the Elasticsearch index
const jsonFilePath = "./shakespeare_data.json"; // Path to your JSON file

const bulkIndexData = async () => {
  try {
    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");
    const documents = jsonData.trim().split('\n').map(JSON.parse); // Split each line and parse JSON

    // Index each document into Elasticsearch
    await Promise.all(
      documents.map(async (doc, index) => {
        try {
          await elasticClient.index({
            index: indexName,
            body: doc,
          });
          console.log(`Document ${index + 1} indexed`);
        } catch (error) {
          console.error(`Error indexing document ${index + 1}:`, error);
        }
      })
    );

    console.log("All documents indexed successfully");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

bulkIndexData();
