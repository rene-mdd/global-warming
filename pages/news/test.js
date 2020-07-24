import {
    NewsSearchClient,
    NewsSearchModels
  } from "@azure/cognitiveservices-newssearch";
  import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
   
  async function main(): Promise<void> {
    const newsSearchKey = process.env["feaf1751d8b142c68ca34b339e04dfbc"] || "feaf1751d8b142c68ca34b339e04dfbc";
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(
      newsSearchKey
    );
    const client = new NewsSearchClient(cognitiveServiceCredentials);
    const query = "Microsoft Azure";
    const options: NewsSearchModels.NewsSearchOptionalParams = {
      count: 10,
      freshness: "Month",
      safeSearch: "Strict"
    };
    client.news
      .search(query, options)
      .then(result => {
        console.log("The result is:");
        console.log(result);
      })
      .catch(err => {
        console.log("An error occurred:");
        console.error(err);
      });
  }
   
  main();